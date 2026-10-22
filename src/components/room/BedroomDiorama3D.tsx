'use client';

import React, { useRef, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { ROOM_SLOTS, COLLECTIBLE_CATALOG } from '../../data/collectibleCatalog';
import { RenderCollectible3D } from './Procedural3DModels';

interface BedroomDiorama3DProps {
  placedDecorations: Record<string, string>; // slotId -> collectibleId
  onSelectSlot: (slotId: string) => void;
  selectedSlotId: string | null;
}

const DEFAULT_CAMERA_POS: [number, number, number] = [3.4, 3.6, 4.2];
const DEFAULT_TARGET: [number, number, number] = [0, 1.0, 0];

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

    // Snappier, responsive camera speed (addresses: "tambahkan sedikit kecepatan camera control nya")
    controls.rotateSpeed = 1.35;
    controls.zoomSpeed = 1.35;
    controls.panSpeed = 0.8;
    controls.enablePan = false; // Lock target on room center

    // Zoom in / out range (addresses: "perbaiki juga 3D dioramanya tidak bisa zoom in/out")
    controls.enableZoom = true;
    controls.minDistance = 2.4; // Close-up zoom in limit
    controls.maxDistance = 8.5; // Wide view zoom out limit

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

// Room Diorama Scene Geometry
function DioramaRoomMesh({
  placedDecorations,
  onSelectSlot,
  selectedSlotId,
}: {
  placedDecorations: Record<string, string>;
  onSelectSlot: (slotId: string) => void;
  selectedSlotId: string | null;
}) {
  return (
    <group>
      {/* 1. ROOM FLOOR (Warm Wood Planks) */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[4.4, 0.1, 4.4]} />
        <meshStandardMaterial color="#DEB887" roughness={0.6} />
      </mesh>

      {/* 2. BACK WALL */}
      <mesh position={[0, 1.45, -2.15]}>
        <boxGeometry args={[4.4, 3.0, 0.1]} />
        <meshStandardMaterial color="#F1F5F9" roughness={0.8} />
      </mesh>

      {/* Superhero Accent Stripe on Wall */}
      <mesh position={[0, 1.45, -2.09]}>
        <boxGeometry args={[4.4, 0.18, 0.02]} />
        <meshStandardMaterial color="#DC2626" />
      </mesh>
      <mesh position={[0, 1.33, -2.09]}>
        <boxGeometry args={[4.4, 0.04, 0.02]} />
        <meshStandardMaterial color="#FBBF24" />
      </mesh>

      {/* 3. LEFT WALL */}
      <mesh position={[-2.15, 1.45, 0]}>
        <boxGeometry args={[0.1, 3.0, 4.4]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.8} />
      </mesh>

      {/* 4. BED (Superhero Reza's Bed) */}
      <group position={[0.9, 0, 0.8]}>
        {/* Bed Frame */}
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[1.5, 0.35, 2.2]} />
          <meshStandardMaterial color="#475569" roughness={0.5} />
        </mesh>
        {/* Mattress */}
        <mesh position={[0, 0.45, 0]}>
          <boxGeometry args={[1.4, 0.18, 2.1]} />
          <meshStandardMaterial color="#F8FAFC" />
        </mesh>
        {/* Superhero Red Blanket */}
        <mesh position={[0, 0.49, 0.3]}>
          <boxGeometry args={[1.42, 0.14, 1.4]} />
          <meshStandardMaterial color="#DC2626" roughness={0.6} />
        </mesh>
        {/* Yellow Trim on Blanket */}
        <mesh position={[0, 0.53, -0.38]}>
          <boxGeometry args={[1.42, 0.08, 0.06]} />
          <meshStandardMaterial color="#FBBF24" />
        </mesh>
        {/* Pillow */}
        <mesh position={[0, 0.54, -0.75]}>
          <boxGeometry args={[0.9, 0.12, 0.45]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
        </mesh>
        {/* Headboard */}
        <mesh position={[0, 0.65, -1.08]}>
          <boxGeometry args={[1.52, 0.7, 0.1]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
      </group>

      {/* 5. STUDY DESK & CHAIR */}
      <group position={[-1.1, 0, -1.1]}>
        {/* Tabletop */}
        <mesh position={[0, 0.75, 0]}>
          <boxGeometry args={[1.2, 0.08, 0.8]} />
          <meshStandardMaterial color="#854D0E" roughness={0.4} />
        </mesh>
        {/* Desk Legs */}
        <mesh position={[-0.52, 0.36, -0.32]}>
          <cylinderGeometry args={[0.03, 0.03, 0.72, 8]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
        <mesh position={[0.52, 0.36, -0.32]}>
          <cylinderGeometry args={[0.03, 0.03, 0.72, 8]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
        <mesh position={[-0.52, 0.36, 0.32]}>
          <cylinderGeometry args={[0.03, 0.03, 0.72, 8]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
        <mesh position={[0.52, 0.36, 0.32]}>
          <cylinderGeometry args={[0.03, 0.03, 0.72, 8]} />
          <meshStandardMaterial color="#1E293B" />
        </mesh>
        {/* Chair Seat */}
        <mesh position={[0, 0.42, 0.65]}>
          <boxGeometry args={[0.45, 0.06, 0.45]} />
          <meshStandardMaterial color="#DC2626" />
        </mesh>
        <mesh position={[0, 0.68, 0.85]}>
          <boxGeometry args={[0.45, 0.45, 0.05]} />
          <meshStandardMaterial color="#DC2626" />
        </mesh>
      </group>

      {/* 6. WALL SHELVES (Left & Right) */}
      {/* Left Wall Shelf (Toys) */}
      <mesh position={[-0.95, 1.8, -1.8]}>
        <boxGeometry args={[0.9, 0.05, 0.35]} />
        <meshStandardMaterial color="#78350F" />
      </mesh>
      {/* Right Wall Shelf (Trophies) */}
      <mesh position={[0.8, 1.8, -1.8]}>
        <boxGeometry args={[0.9, 0.05, 0.35]} />
        <meshStandardMaterial color="#78350F" />
      </mesh>

      {/* 7. BRIGHT WINDOW (Right Side Wall) */}
      <group position={[2.08, 1.6, 0]}>
        {/* Frame */}
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[1.4, 1.6, 0.08]} />
          <meshStandardMaterial color="#F8FAFC" />
        </mesh>
        {/* Glass panes with sky glow */}
        <mesh position={[-0.01, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[1.2, 1.4]} />
          <meshStandardMaterial color="#BAE6FD" emissive="#38BDF8" emissiveIntensity={0.3} transparent opacity={0.8} />
        </mesh>
        {/* Sunlight source */}
        <pointLight position={[-0.4, 0.2, 0]} color="#FEF08A" intensity={0.9} distance={3.5} />
      </group>

      {/* 8. STAR ROUND CARPET ON FLOOR */}
      <mesh position={[-0.2, 0.01, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.95, 32]} />
        <meshStandardMaterial color="#1E3A8A" roughness={0.8} />
      </mesh>
      <mesh position={[-0.2, 0.015, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.85, 32]} />
        <meshStandardMaterial color="#2563EB" roughness={0.8} />
      </mesh>

      {/* 9. DECORATION SLOTS & PLACED ITEMS */}
      {ROOM_SLOTS.map((slot) => {
        const placedItemId = placedDecorations[slot.slotId];
        const placedItem = placedItemId
          ? COLLECTIBLE_CATALOG.find((c) => c.id === placedItemId)
          : null;
        const isSelected = selectedSlotId === slot.slotId;

        return (
          <group key={slot.slotId} position={slot.position}>
            {/* Clickable Target / Empty Slot Glowing Disc */}
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                // Prevent click if pointer was dragging/orbiting the camera
                if (e.delta > 5) return;
                onSelectSlot(slot.slotId);
              }}
              position={[0, 0, 0]}
            >
              <cylinderGeometry args={[0.22, 0.22, 0.02, 16]} />
              <meshStandardMaterial
                color={isSelected ? '#DC2626' : placedItem ? '#F59E0B' : '#38BDF8'}
                emissive={isSelected ? '#DC2626' : '#F59E0B'}
                emissiveIntensity={isSelected ? 0.6 : 0.2}
                transparent
                opacity={placedItem ? 0.4 : 0.8}
              />
            </mesh>

            {/* Render 3D Collectible if equipped */}
            {placedItem && (
              <RenderCollectible3D
                modelType={placedItem.modelType}
                position={[0, 0, 0]}
                onClick={() => {
                  onSelectSlot(slot.slotId);
                }}
              />
            )}
          </group>
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
          title="Perbesar (Zoom In)"
          className="w-8 h-8 rounded-xl liquid-glass text-slate-800 hover:text-hero-red flex items-center justify-center shadow-md active:scale-95 transition-all liquid-interactive"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={handleZoomOut}
          title="Perkecil (Zoom Out)"
          className="w-8 h-8 rounded-xl liquid-glass text-slate-800 hover:text-hero-red flex items-center justify-center shadow-md active:scale-95 transition-all liquid-interactive"
        >
          <ZoomOut size={16} />
        </button>
        <button
          onClick={handleResetCamera}
          title="Reset Sudut Pandang Kamera"
          className="w-8 h-8 rounded-xl liquid-glass text-slate-800 hover:text-hero-red flex items-center justify-center shadow-md active:scale-95 transition-all liquid-interactive"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      <Canvas
        camera={{ position: DEFAULT_CAMERA_POS, fov: 42 }}
        shadows={false}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Soft Ambient Light for warm cozy bedroom */}
        <ambientLight intensity={0.85} color="#FFFFFF" />

        {/* Sunlight coming from window */}
        <directionalLight position={[4, 5, 2]} intensity={1.1} color="#FFFBEB" />

        {/* Soft Fill Light from front */}
        <directionalLight position={[-2, 3, 4]} intensity={0.4} color="#E0F2FE" />

        <RoomCameraControls controlsRef={controlsRef} />

        <DioramaRoomMesh
          placedDecorations={placedDecorations}
          onSelectSlot={onSelectSlot}
          selectedSlotId={selectedSlotId}
        />
      </Canvas>
    </div>
  );
};
