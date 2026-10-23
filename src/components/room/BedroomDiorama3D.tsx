'use client';

import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { ROOM_SLOTS, COLLECTIBLE_CATALOG } from '../../data/collectibleCatalog';
import { RenderCollectible3D } from './Procedural3DModels';
import {
  getWoodPlankTextures,
  getFabricNormalTexture,
  getCarpetNormalTexture,
  getWallNormalTexture,
} from './TexturePipeline';
import { ContactShadow } from './ShaderPipeline';

interface BedroomDiorama3DProps {
  placedDecorations: Record<string, string>; // slotId -> collectibleId
  onSelectSlot: (slotId: string) => void;
  selectedSlotId: string | null;
}

const DEFAULT_CAMERA_POS: [number, number, number] = [3.8, 3.8, 4.4];
const DEFAULT_TARGET: [number, number, number] = [0, 1.1, 0];

// First-class Camera Controls with smooth damping, zoom support, and tuned speed
function RoomCameraControls({
  controlsRef,
}: {
  controlsRef: React.MutableRefObject<ThreeOrbitControls | null>;
}) {
  const { camera, gl } = useThree();

  useEffect(() => {
    const controls = new ThreeOrbitControls(camera, gl.domElement);
    controlsRef.current = controls;

    // Smooth inertia damping
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;

    // Responsive camera speed
    controls.rotateSpeed = 1.35;
    controls.zoomSpeed = 1.35;
    controls.panSpeed = 0.8;
    controls.enablePan = false; // Lock target on room center

    // Zoom in / out range
    controls.enableZoom = true;
    controls.minDistance = 2.2; // Close-up zoom in limit
    controls.maxDistance = 7.5; // Wide view zoom out limit

    // Polar angles (vertical pitch)
    controls.minPolarAngle = Math.PI / 10;
    controls.maxPolarAngle = Math.PI / 2.05; // Prevent going underneath the floor

    // Azimuth bounds (keeps focus on isometric front of the room)
    controls.minAzimuthAngle = -Math.PI / 1.35;
    controls.maxAzimuthAngle = Math.PI / 2.2;

    controls.target.set(...DEFAULT_TARGET);
    controls.update();

    return () => {
      controls.dispose();
      controlsRef.current = null;
    };
  }, [camera, gl, controlsRef]);

  useFrame(() => {
    controlsRef.current?.update();
  });

  return null;
}

// Interactive Glowing Slot Pedestal Component
function SlotPedestal({
  slot,
  placedItem,
  isSelected,
  onSelect,
}: {
  slot: (typeof ROOM_SLOTS)[0];
  placedItem: (typeof COLLECTIBLE_CATALOG)[0] | null | undefined;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const haloRef = useRef<THREE.Mesh | null>(null);

  useFrame(({ clock }) => {
    if (haloRef.current) {
      const t = clock.getElapsedTime();
      const pulse = Math.sin(t * 3.0) * 0.15 + 1.0;
      haloRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group position={slot.position}>
      {/* Clickable Target / Beveled Brass Pedestal Base */}
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          if (e.delta > 5) return;
          onSelect();
        }}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.24, 0.26, 0.03, 32]} />
        <meshStandardMaterial
          color={isSelected ? '#DC2626' : placedItem ? '#D97706' : '#0284C7'}
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>

      {/* Glowing Selection / Empty Slot Indicator Ring */}
      <mesh ref={haloRef} position={[0, 0.02, 0]}>
        <torusGeometry args={[0.22, 0.018, 16, 32]} />
        <meshStandardMaterial
          color={isSelected ? '#EF4444' : placedItem ? '#F59E0B' : '#38BDF8'}
          emissive={isSelected ? '#EF4444' : placedItem ? '#F59E0B' : '#38BDF8'}
          emissiveIntensity={isSelected ? 1.0 : placedItem ? 0.35 : 0.8}
          transparent
          opacity={placedItem ? 0.45 : 0.85}
        />
      </mesh>

      {/* Render 3D Collectible if equipped */}
      {placedItem && (
        <RenderCollectible3D
          modelType={placedItem.modelType}
          position={[0, 0.02, 0]}
          onClick={onSelect}
        />
      )}
    </group>
  );
}

// High-Fidelity Diorama Room Mesh & Environment
function DioramaRoomMesh({
  placedDecorations,
  onSelectSlot,
  selectedSlotId,
}: {
  placedDecorations: Record<string, string>;
  onSelectSlot: (slotId: string) => void;
  selectedSlotId: string | null;
}) {
  const [texturesLoaded, setTexturesLoaded] = useState(false);

  useEffect(() => {
    setTexturesLoaded(true);
  }, []);

  const woodTextures = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return getWoodPlankTextures();
  }, [texturesLoaded]);

  const fabricNormal = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return getFabricNormalTexture();
  }, [texturesLoaded]);

  const carpetNormal = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return getCarpetNormalTexture();
  }, [texturesLoaded]);

  const wallNormal = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return getWallNormalTexture();
  }, [texturesLoaded]);

  return (
    <group>
      {/* 1. ROOM PLATFORM FOUNDATION (Dark Mahogany Pedestal with Beveled Edge) */}
      <mesh position={[0, -0.16, 0]} receiveShadow>
        <boxGeometry args={[4.65, 0.22, 4.65]} />
        <meshStandardMaterial color="#331A08" roughness={0.35} metalness={0.1} />
      </mesh>

      {/* 2. REALISTIC HARDWOOD FLOOR (Multi-Tone Planks with Tangent Normal Map & Roughness) */}
      <mesh position={[0, -0.04, 0]} receiveShadow>
        <boxGeometry args={[4.5, 0.08, 4.5]} />
        {woodTextures ? (
          <meshStandardMaterial
            map={woodTextures.albedo}
            normalMap={woodTextures.normal}
            roughnessMap={woodTextures.roughness}
            roughness={0.4}
            metalness={0.05}
          />
        ) : (
          <meshStandardMaterial color="#C89D68" roughness={0.45} />
        )}
      </mesh>

      {/* 3. WALLS WITH ARCHITECTURAL WAINSCOTING & BASEBOARDS */}
      {/* Back Wall */}
      <group position={[0, 1.45, -2.2]}>
        {/* Upper Plaster Wall */}
        <mesh position={[0, 0.5, 0]} receiveShadow>
          <boxGeometry args={[4.5, 2.0, 0.12]} />
          <meshStandardMaterial
            color="#F8FAFC"
            normalMap={wallNormal || undefined}
            roughness={0.85}
          />
        </mesh>
        {/* Lower Classic Wainscoting Paneling */}
        <mesh position={[0, -0.9, 0.01]} receiveShadow>
          <boxGeometry args={[4.5, 0.95, 0.13]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.6} />
        </mesh>
        {/* Wainscoting Chair Rail Molding */}
        <mesh position={[0, -0.42, 0.02]} castShadow>
          <boxGeometry args={[4.5, 0.06, 0.04]} />
          <meshStandardMaterial color="#CBD5E1" roughness={0.4} />
        </mesh>
        {/* Stepped Baseboard / Skirting Board */}
        <mesh position={[0, -1.33, 0.025]} castShadow>
          <boxGeometry args={[4.5, 0.2, 0.05]} />
          <meshStandardMaterial color="#94A3B8" roughness={0.35} />
        </mesh>
        {/* Crown Ceiling Molding (Top Trim) */}
        <mesh position={[0, 1.45, 0.03]} castShadow>
          <boxGeometry args={[4.5, 0.1, 0.06]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.4} />
        </mesh>
        {/* Superhero Red & Gold Satin Accent Stripe */}
        <mesh position={[0, 0.95, 0.065]}>
          <boxGeometry args={[4.5, 0.14, 0.015]} />
          <meshStandardMaterial color="#DC2626" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.85, 0.065]}>
          <boxGeometry args={[4.5, 0.035, 0.015]} />
          <meshStandardMaterial color="#FBBF24" metalness={0.8} roughness={0.25} />
        </mesh>
      </group>

      {/* Left Wall */}
      <group position={[-2.2, 1.45, 0]}>
        {/* Upper Plaster Wall */}
        <mesh position={[0, 0.5, 0]} receiveShadow>
          <boxGeometry args={[0.12, 2.0, 4.5]} />
          <meshStandardMaterial
            color="#F1F5F9"
            normalMap={wallNormal || undefined}
            roughness={0.85}
          />
        </mesh>
        {/* Lower Wainscoting */}
        <mesh position={[0.01, -0.9, 0]} receiveShadow>
          <boxGeometry args={[0.13, 0.95, 4.5]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.6} />
        </mesh>
        {/* Chair Rail Molding */}
        <mesh position={[0.02, -0.42, 0]} castShadow>
          <boxGeometry args={[0.04, 0.06, 4.5]} />
          <meshStandardMaterial color="#CBD5E1" roughness={0.4} />
        </mesh>
        {/* Baseboard */}
        <mesh position={[0.025, -1.33, 0]} castShadow>
          <boxGeometry args={[0.05, 0.2, 4.5]} />
          <meshStandardMaterial color="#94A3B8" roughness={0.35} />
        </mesh>
        {/* Crown Ceiling Molding */}
        <mesh position={[0.03, 1.45, 0]} castShadow>
          <boxGeometry args={[0.06, 0.1, 4.5]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.4} />
        </mesh>
      </group>

      {/* 4. ARCHITECTURAL DOUBLE-HUNG WINDOW & CURTAINS (Left Wall) */}
      <group position={[-2.12, 1.65, 0]}>
        {/* Window Stepped Outer Casing Frame */}
        <mesh position={[0.02, 0, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
          <boxGeometry args={[1.5, 1.7, 0.1]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.3} />
        </mesh>
        {/* Window Sill / Ledge */}
        <mesh position={[0.08, -0.86, 0]} rotation={[0, Math.PI / 2, 0]} castShadow>
          <boxGeometry args={[1.7, 0.08, 0.22]} />
          <meshStandardMaterial color="#F1F5F9" roughness={0.3} />
        </mesh>
        {/* Translucent Window Glass Pane with Sky Blue Emissive Glow */}
        <mesh position={[0.01, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[1.28, 1.48]} />
          <meshPhysicalMaterial
            color="#BAE6FD"
            emissive="#38BDF8"
            emissiveIntensity={0.25}
            roughness={0.08}
            metalness={0.1}
            transmission={0.85}
            ior={1.5}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Window Mullion Grid Bars */}
        <mesh position={[0.02, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[0.04, 1.48, 0.03]} />
          <meshStandardMaterial color="#E2E8F0" />
        </mesh>
        <mesh position={[0.02, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[1.28, 0.04, 0.03]} />
          <meshStandardMaterial color="#E2E8F0" />
        </mesh>
        {/* Brass Curtain Rod & Turned Finials */}
        <mesh position={[0.14, 0.92, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.02, 0.02, 1.8, 16]} />
          <meshStandardMaterial color="#D97706" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Draped Fabric Curtains (Left & Right) with Natural Folds */}
        <group position={[0.13, 0.05, -0.72]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.1, 0.16, 1.7, 16, 1, false, 0, Math.PI]} />
            <meshStandardMaterial
              color="#38BDF8"
              normalMap={fabricNormal || undefined}
              roughness={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[0.02, -0.2, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.18, 12]} />
            <meshStandardMaterial color="#FBBF24" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
        <group position={[0.13, 0.05, 0.72]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.1, 0.16, 1.7, 16, 1, false, 0, Math.PI]} />
            <meshStandardMaterial
              color="#38BDF8"
              normalMap={fabricNormal || undefined}
              roughness={0.7}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh position={[0.02, -0.2, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.18, 12]} />
            <meshStandardMaterial color="#FBBF24" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>
      </group>

      {/* 5. HIGH-FIDELITY HERO BED */}
      <group position={[1.0, 0, 0.8]}>
        {/* Soft Contact Shadow beneath Bed */}
        <ContactShadow position={[0, 0.005, 0]} scale={[1.8, 2.4]} opacity={0.65} />

        {/* Walnut Bed Base & Posts */}
        <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.52, 0.22, 2.22]} />
          <meshStandardMaterial color="#3E2723" roughness={0.4} />
        </mesh>
        {/* 4 Turned Wooden Bed Legs */}
        {[
          [-0.68, 0.08, -1.02],
          [0.68, 0.08, -1.02],
          [-0.68, 0.08, 1.02],
          [0.68, 0.08, 1.02],
        ].map(([lx, ly, lz], idx) => (
          <mesh key={idx} position={[lx, ly, lz]} castShadow>
            <cylinderGeometry args={[0.045, 0.035, 0.16, 16]} />
            <meshStandardMaterial color="#2E1B0F" roughness={0.4} />
          </mesh>
        ))}

        {/* Upholstered Headboard with Channel Tufting & Walnut Frame */}
        <group position={[0, 0.72, -1.1]}>
          {/* Wooden Perimeter Frame */}
          <mesh castShadow>
            <boxGeometry args={[1.56, 0.84, 0.12]} />
            <meshStandardMaterial color="#3E2723" roughness={0.4} />
          </mesh>
          {/* Upholstered Cushion Panels */}
          <mesh position={[0, 0, 0.04]} castShadow>
            <boxGeometry args={[1.42, 0.72, 0.06]} />
            <meshStandardMaterial
              color="#1E3A8A"
              normalMap={fabricNormal || undefined}
              roughness={0.7}
            />
          </mesh>
          {/* Gold Inlay Trim */}
          <mesh position={[0, 0.38, 0.07]}>
            <boxGeometry args={[1.44, 0.02, 0.01]} />
            <meshStandardMaterial color="#FBBF24" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Thick Multi-Layer Mattress with Edge Piping */}
        <mesh position={[0, 0.36, 0.02]} castShadow receiveShadow>
          <boxGeometry args={[1.42, 0.2, 2.1]} />
          <meshStandardMaterial
            color="#F8FAFC"
            normalMap={fabricNormal || undefined}
            roughness={0.65}
          />
        </mesh>
        {/* Mattress Edge Piping Seam */}
        <mesh position={[0, 0.44, 0.02]}>
          <boxGeometry args={[1.43, 0.02, 2.11]} />
          <meshStandardMaterial color="#CBD5E1" roughness={0.5} />
        </mesh>

        {/* Indented Soft Pillow with Edge Welt */}
        <group position={[0, 0.52, -0.74]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.94, 0.14, 0.46]} />
            <meshStandardMaterial
              color="#FFFFFF"
              normalMap={fabricNormal || undefined}
              roughness={0.55}
            />
          </mesh>
          {/* Gold Pillow Accent Band */}
          <mesh position={[0, 0.01, 0]}>
            <boxGeometry args={[0.2, 0.145, 0.47]} />
            <meshStandardMaterial color="#FEF08A" roughness={0.6} />
          </mesh>
        </group>

        {/* Fluffy Superhero Duvet Comforter Draped over Sides */}
        <group position={[0, 0.48, 0.32]}>
          {/* Main Blanket Body */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.46, 0.12, 1.44]} />
            <meshStandardMaterial
              color="#DC2626"
              normalMap={fabricNormal || undefined}
              roughness={0.6}
            />
          </mesh>
          {/* Draped Left Side Drop */}
          <mesh position={[-0.72, -0.08, 0]} castShadow>
            <boxGeometry args={[0.04, 0.24, 1.44]} />
            <meshStandardMaterial
              color="#B91C1C"
              normalMap={fabricNormal || undefined}
              roughness={0.65}
            />
          </mesh>
          {/* Draped Right Side Drop */}
          <mesh position={[0.72, -0.08, 0]} castShadow>
            <boxGeometry args={[0.04, 0.24, 1.44]} />
            <meshStandardMaterial
              color="#B91C1C"
              normalMap={fabricNormal || undefined}
              roughness={0.65}
            />
          </mesh>
          {/* Golden Embroidered Hem Border */}
          <mesh position={[0, 0.05, -0.68]}>
            <boxGeometry args={[1.46, 0.025, 0.08]} />
            <meshStandardMaterial color="#FBBF24" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Folded Throw Blanket at Foot of Bed */}
          <mesh position={[0, 0.08, 0.52]} castShadow>
            <boxGeometry args={[1.48, 0.08, 0.36]} />
            <meshStandardMaterial
              color="#1E3A8A"
              normalMap={fabricNormal || undefined}
              roughness={0.7}
            />
          </mesh>
        </group>
      </group>

      {/* 6. HIGH-FIDELITY STUDY DESK & ERGONOMIC CHAIR */}
      <group position={[-1.15, 0, -1.05]}>
        {/* Soft Contact Shadow beneath Desk */}
        <ContactShadow position={[0, 0.005, 0]} scale={[1.5, 1.2]} opacity={0.6} />

        {/* Solid Chamfered Oak Tabletop */}
        <mesh position={[0, 0.76, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.32, 0.07, 0.84]} />
          <meshStandardMaterial color="#78350F" roughness={0.3} metalness={0.05} />
        </mesh>
        {/* Desk Drawer Tower Unit (Right Side) */}
        <group position={[0.42, 0.42, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.38, 0.62, 0.74]} />
            <meshStandardMaterial color="#451A03" roughness={0.4} />
          </mesh>
          {/* 3 Drawers with Brushed Brass Cup Pull Handles */}
          {[-0.18, 0, 0.18].map((dy, idx) => (
            <group key={idx} position={[0, dy, 0.375]}>
              <mesh>
                <boxGeometry args={[0.34, 0.16, 0.01]} />
                <meshStandardMaterial color="#58240C" roughness={0.35} />
              </mesh>
              {/* Brass Cup Pull Handle */}
              <mesh position={[0, 0, 0.015]} rotation={[0, 0, Math.PI / 2]}>
                <torusGeometry args={[0.025, 0.006, 12, 16, Math.PI]} />
                <meshStandardMaterial color="#F59E0B" metalness={0.9} roughness={0.2} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Left Tapered Legs with Brass Ferrules */}
        {[
          [-0.56, 0.38, -0.34],
          [-0.56, 0.38, 0.34],
        ].map(([lx, ly, lz], idx) => (
          <group key={idx} position={[lx, ly, lz]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.028, 0.022, 0.72, 16]} />
              <meshStandardMaterial color="#1E293B" roughness={0.5} />
            </mesh>
            {/* Brass Ferrule End Cap */}
            <mesh position={[0, -0.34, 0]}>
              <cylinderGeometry args={[0.024, 0.024, 0.04, 16]} />
              <meshStandardMaterial color="#F59E0B" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>
        ))}

        {/* Desk Accessories: Ceramic Pencil Holder & Illustrated Notebook */}
        <group position={[-0.45, 0.83, -0.22]}>
          {/* White Glazed Ceramic Mug */}
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.045, 0.04, 0.09, 24]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.2} />
          </mesh>
          {/* 4 Colored Pencils */}
          {[
            { c: '#EF4444', r: 0.1 },
            { c: '#3B82F6', r: -0.15 },
            { c: '#10B981', r: 0.2 },
            { c: '#F59E0B', r: -0.05 },
          ].map((p, idx) => (
            <mesh key={idx} position={[0, 0.05, 0]} rotation={[p.r, idx * 0.8, 0]}>
              <cylinderGeometry args={[0.005, 0.005, 0.12, 8]} />
              <meshStandardMaterial color={p.c} roughness={0.3} />
            </mesh>
          ))}
        </group>

        {/* Open Illustrated Adventure Book on Desk */}
        <group position={[-0.1, 0.8, 0.08]} rotation={[0, -0.15, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.26, 0.018, 0.36]} />
            <meshStandardMaterial color="#FEF3C7" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.01, 0]}>
            <boxGeometry args={[0.24, 0.002, 0.34]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.8} />
          </mesh>
        </group>

        {/* Ergonomic Molded Plywood Study Chair */}
        <group position={[-0.05, 0, 0.68]}>
          <ContactShadow position={[0, 0.005, 0]} scale={[0.6, 0.6]} opacity={0.5} />
          {/* Curved Plywood Seat Pan */}
          <mesh position={[0, 0.44, 0]} castShadow>
            <boxGeometry args={[0.44, 0.045, 0.42]} />
            <meshStandardMaterial color="#DC2626" roughness={0.4} />
          </mesh>
          {/* Curved Backrest */}
          <mesh position={[0, 0.72, 0.19]} rotation={[-0.1, 0, 0]} castShadow>
            <boxGeometry args={[0.42, 0.32, 0.04]} />
            <meshStandardMaterial color="#DC2626" roughness={0.4} />
          </mesh>
          {/* Chair Legs with Stretcher Cross Bracing */}
          {[
            [-0.17, 0.22, -0.16],
            [0.17, 0.22, -0.16],
            [-0.17, 0.22, 0.16],
            [0.17, 0.22, 0.16],
          ].map(([cx, cy, cz], idx) => (
            <mesh key={idx} position={[cx, cy, cz]} castShadow>
              <cylinderGeometry args={[0.018, 0.014, 0.44, 12]} />
              <meshStandardMaterial color="#1E293B" roughness={0.5} />
            </mesh>
          ))}
        </group>
      </group>

      {/* 7. WALL SHELVES WITH BRASS BRACKETS & ENCYCLOPEDIAS */}
      {/* Left Wall Shelf (Toy Display) */}
      <group position={[-0.95, 1.8, -1.9]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.96, 0.045, 0.36]} />
          <meshStandardMaterial color="#58240C" roughness={0.35} />
        </mesh>
        {/* Brass Shelf Brackets */}
        {[-0.38, 0.38].map((bx, idx) => (
          <mesh key={idx} position={[bx, -0.06, -0.12]}>
            <boxGeometry args={[0.025, 0.12, 0.12]} />
            <meshStandardMaterial color="#D97706" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* Right Wall Shelf (Trophy Display) */}
      <group position={[0.8, 1.8, -1.9]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.96, 0.045, 0.36]} />
          <meshStandardMaterial color="#58240C" roughness={0.35} />
        </mesh>
        {/* Brass Shelf Brackets */}
        {[-0.38, 0.38].map((bx, idx) => (
          <mesh key={idx} position={[bx, -0.06, -0.12]}>
            <boxGeometry args={[0.025, 0.12, 0.12]} />
            <meshStandardMaterial color="#D97706" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* 8. PLUSH WOVEN STAR CREST ROUND CARPET */}
      <group position={[-0.15, 0.005, 0.55]}>
        <ContactShadow position={[0, 0.005, 0]} scale={[2.3, 2.3]} opacity={0.5} />
        {/* Outer Beveled Navy Border */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[1.05, 48]} />
          <meshStandardMaterial
            color="#1E3A8A"
            normalMap={carpetNormal || undefined}
            roughness={0.85}
          />
        </mesh>
        {/* Inner Azure Medallion */}
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[0.94, 48]} />
          <meshStandardMaterial
            color="#2563EB"
            normalMap={carpetNormal || undefined}
            roughness={0.8}
          />
        </mesh>
        {/* Golden Embroidered Star Crest Center */}
        <mesh position={[0, 0.008, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.3, 0.34, 32]} />
          <meshStandardMaterial color="#FBBF24" roughness={0.6} />
        </mesh>
      </group>

      {/* 9. DECORATION SLOTS & PLACED COLLECTIBLES */}
      {ROOM_SLOTS.map((slot) => {
        const placedItemId = placedDecorations[slot.slotId];
        const placedItem = placedItemId
          ? COLLECTIBLE_CATALOG.find((c) => c.id === placedItemId)
          : null;
        const isSelected = selectedSlotId === slot.slotId;

        return (
          <SlotPedestal
            key={slot.slotId}
            slot={slot}
            placedItem={placedItem}
            isSelected={isSelected}
            onSelect={() => onSelectSlot(slot.slotId)}
          />
        );
      })}
    </group>
  );
}

export const BedroomDiorama3D: React.FC<BedroomDiorama3DProps> = ({
  placedDecorations,
  onSelectSlot,
  selectedSlotId,
}) => {
  const controlsRef = useRef<ThreeOrbitControls | null>(null);

  const handleZoomIn = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyIn(1.25);
      controlsRef.current.update();
    }
  };

  const handleZoomOut = () => {
    if (controlsRef.current) {
      controlsRef.current.dollyOut(1.25);
      controlsRef.current.update();
    }
  };

  const handleResetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
      controlsRef.current.target.set(...DEFAULT_TARGET);
      controlsRef.current.object.position.set(...DEFAULT_CAMERA_POS);
      controlsRef.current.update();
    }
  };

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      {/* Floating On-Screen Camera & Zoom Controls */}
      <div className="absolute top-3 right-3 z-30 flex flex-col gap-1.5 pointer-events-auto">
        <button
          onClick={handleZoomIn}
          title="Perbesar Kamera (+)"
          className="w-8 h-8 rounded-xl liquid-glass flex items-center justify-center text-slate-700 hover:text-hero-red hover:scale-105 active:scale-95 transition-all shadow-md"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={handleZoomOut}
          title="Perkecil Kamera (-)"
          className="w-8 h-8 rounded-xl liquid-glass flex items-center justify-center text-slate-700 hover:text-hero-red hover:scale-105 active:scale-95 transition-all shadow-md"
        >
          <ZoomOut size={16} />
        </button>
        <button
          onClick={handleResetCamera}
          title="Kembalikan Tampilan Sudut Kamar"
          className="w-8 h-8 rounded-xl liquid-glass flex items-center justify-center text-slate-700 hover:text-hero-red hover:scale-105 active:scale-95 transition-all shadow-md"
        >
          <RotateCcw size={15} />
        </button>
      </div>

      {/* Three.js R3F Canvas with ACESFilmicToneMapping & Soft Shadows */}
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: DEFAULT_CAMERA_POS, fov: 42, near: 0.1, far: 50 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
          alpha: true,
        }}
      >
        {/* CINEMATIC NATURAL LIGHTING PIPELINE */}
        {/* Soft Ambient Sky & Ground Bounce Fill */}
        <hemisphereLight
          args={['#E0F2FE', '#FEF3C7', 0.85]}
        />

        {/* Primary Key Light: Sunlight Streaming through Left Window */}
        <directionalLight
          position={[-4.5, 5.0, 1.5]}
          intensity={1.8}
          color="#FFFBEB"
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.0001}
          shadow-camera-near={0.5}
          shadow-camera-far={15}
          shadow-camera-left={-3.5}
          shadow-camera-right={3.5}
          shadow-camera-top={3.5}
          shadow-camera-bottom={-3.5}
        />

        {/* Soft Daylight Window Point Light */}
        <pointLight
          position={[-2.1, 2.0, 0]}
          color="#FEF08A"
          intensity={1.4}
          distance={4.2}
          decay={2}
        />

        {/* Subtle Warm Fill Light from Front-Right to balance shadows */}
        <directionalLight
          position={[3.5, 3.8, 3.5]}
          intensity={0.55}
          color="#FDE68A"
        />

        {/* Rim Backlight to accentuate furniture contours */}
        <directionalLight
          position={[0, 4.0, -4.0]}
          intensity={0.4}
          color="#BAE6FD"
        />

        {/* First-class Camera Controls */}
        <RoomCameraControls controlsRef={controlsRef} />

        {/* High-Fidelity Room Diorama Mesh */}
        <DioramaRoomMesh
          placedDecorations={placedDecorations}
          onSelectSlot={onSelectSlot}
          selectedSlotId={selectedSlotId}
        />
      </Canvas>
    </div>
  );
};
