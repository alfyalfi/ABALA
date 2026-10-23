'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { getFabricNormalTexture } from './TexturePipeline';

interface ModelProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  onClick?: () => void;
}

// 1. High-Fidelity Gold Trophy Cup with Scrolled Handles & Marble Base
export const TrophyCup3D: React.FC<ModelProps> = ({ position = [0, 0, 0], scale = 1, onClick }) => {
  return (
    <group position={position} scale={scale} onClick={onClick}>
      {/* Heavy Beveled Marble Pedestal */}
      <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.26, 0.08, 0.26]} />
        <meshStandardMaterial color="#1E293B" roughness={0.25} metalness={0.1} />
      </mesh>
      {/* Gold Plaque on Front */}
      <mesh position={[0, 0.04, 0.132]}>
        <planeGeometry args={[0.18, 0.04]} />
        <meshStandardMaterial color="#F59E0B" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Turned Brass Base Ring */}
      <mesh position={[0, 0.09, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.14, 0.03, 32]} />
        <meshStandardMaterial color="#D97706" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Turned Riser Stem */}
      <mesh position={[0, 0.16, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.07, 0.12, 32]} />
        <meshStandardMaterial color="#FBBF24" metalness={0.9} roughness={0.18} />
      </mesh>
      {/* Fluted Gold Chalice / Bowl */}
      <mesh position={[0, 0.28, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.06, 0.18, 32]} />
        <meshStandardMaterial color="#F59E0B" metalness={0.92} roughness={0.15} />
      </mesh>
      {/* Beveled Cup Rim */}
      <mesh position={[0, 0.37, 0]}>
        <torusGeometry args={[0.16, 0.015, 16, 32]} />
        <meshStandardMaterial color="#FBBF24" metalness={0.95} roughness={0.15} />
      </mesh>
      {/* Left Ornate Scrolled Handle */}
      <mesh position={[-0.17, 0.28, 0]} rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[0.07, 0.018, 16, 24, Math.PI * 1.3]} />
        <meshStandardMaterial color="#D97706" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Right Ornate Scrolled Handle */}
      <mesh position={[0.17, 0.28, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <torusGeometry args={[0.07, 0.018, 16, 24, Math.PI * 1.3]} />
        <meshStandardMaterial color="#D97706" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Embossed Golden Star Emblem */}
      <mesh position={[0, 0.28, 0.13]} castShadow>
        <octahedronGeometry args={[0.045]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#F59E0B" emissiveIntensity={0.6} metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
};

// 2. High-Fidelity Superhero Cape with Folded Fabric Drapes & Wall Peg
export const SuperheroCape3D: React.FC<ModelProps> = ({ position = [0, 0, 0], scale = 1, onClick }) => {
  const fabricNormal = getFabricNormalTexture();

  return (
    <group position={position} scale={scale} onClick={onClick}>
      {/* Polished Brass Wall Mount Plate */}
      <mesh position={[0, 0.28, -0.02]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.02, 24]} />
        <meshStandardMaterial color="#D97706" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Wall Hook Peg */}
      <mesh position={[0, 0.28, 0.02]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.018, 0.02, 0.06, 16]} />
        <meshStandardMaterial color="#F59E0B" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Golden Superhero Crest Clasp */}
      <mesh position={[0, 0.26, 0.05]} castShadow>
        <cylinderGeometry args={[0.055, 0.055, 0.02, 6]} />
        <meshStandardMaterial color="#FBBF24" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.26, 0.065]}>
        <octahedronGeometry args={[0.03]} />
        <meshStandardMaterial color="#DC2626" metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Main Draping Cape Fabric (Multi-Folded Geometry) */}
      <group position={[0, 0, 0.04]}>
        {/* Center fold */}
        <mesh position={[0, 0.02, 0.01]} castShadow>
          <cylinderGeometry args={[0.09, 0.24, 0.46, 16, 1, false, -Math.PI / 2, Math.PI]} />
          <meshStandardMaterial
            color="#DC2626"
            normalMap={fabricNormal}
            roughness={0.7}
            metalness={0.05}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Left deep drape fold */}
        <mesh position={[-0.09, 0.02, -0.01]} rotation={[0, 0.2, -0.08]} castShadow>
          <cylinderGeometry args={[0.06, 0.16, 0.44, 16, 1, false, -Math.PI / 2, Math.PI]} />
          <meshStandardMaterial
            color="#B91C1C"
            normalMap={fabricNormal}
            roughness={0.75}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Right deep drape fold */}
        <mesh position={[0.09, 0.02, -0.01]} rotation={[0, -0.2, 0.08]} castShadow>
          <cylinderGeometry args={[0.06, 0.16, 0.44, 16, 1, false, -Math.PI / 2, Math.PI]} />
          <meshStandardMaterial
            color="#B91C1C"
            normalMap={fabricNormal}
            roughness={0.75}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Golden Bottom Border Piping */}
        <mesh position={[0, -0.21, 0.01]}>
          <boxGeometry args={[0.42, 0.018, 0.02]} />
          <meshStandardMaterial color="#FBBF24" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
};

// 3. High-Fidelity Star Desk Lamp with Functional Warm Glow
export const StarLamp3D: React.FC<ModelProps> = ({ position = [0, 0, 0], scale = 1, onClick }) => {
  const lightRef = useRef<THREE.PointLight | null>(null);

  // Subtle breathing pulse for magical star ambience
  useFrame(({ clock }) => {
    if (lightRef.current) {
      const t = clock.getElapsedTime();
      lightRef.current.intensity = 1.1 + Math.sin(t * 2.5) * 0.12;
    }
  });

  return (
    <group position={position} scale={scale} onClick={onClick}>
      {/* Turned Mahogany Wooden Base */}
      <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.13, 0.15, 0.04, 32]} />
        <meshStandardMaterial color="#451A03" roughness={0.35} />
      </mesh>
      {/* Brass Accent Bezel */}
      <mesh position={[0, 0.045, 0]}>
        <cylinderGeometry args={[0.09, 0.11, 0.015, 32]} />
        <meshStandardMaterial color="#D97706" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Articulated Brass Neck Stem */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.018, 0.02, 0.26, 16]} />
        <meshStandardMaterial color="#F59E0B" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Brass Neck Hinge Knuckle */}
      <mesh position={[0, 0.31, 0]} castShadow>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshStandardMaterial color="#D97706" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Translucent Frosted Glowing Star Shade */}
      <group position={[0, 0.42, 0]}>
        <mesh castShadow>
          <octahedronGeometry args={[0.13]} />
          <meshStandardMaterial
            color="#FEF08A"
            emissive="#FBBF24"
            emissiveIntensity={0.85}
            roughness={0.2}
            transparent
            opacity={0.92}
          />
        </mesh>
        {/* Inner Core */}
        <mesh>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>
      {/* Genuine Functional Light Source (Warm 2700K Daylight Fill) */}
      <pointLight
        ref={lightRef}
        position={[0, 0.42, 0]}
        color="#FEF08A"
        intensity={1.2}
        distance={2.5}
        decay={2}
        castShadow
        shadow-bias={-0.001}
      />
    </group>
  );
};

// 4. High-Fidelity Mini Globe with Inscribed Continents & Brass Meridian
export const MiniGlobe3D: React.FC<ModelProps> = ({ position = [0, 0, 0], scale = 1, onClick }) => {
  const globeGroupRef = useRef<THREE.Group | null>(null);

  useFrame(() => {
    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group position={position} scale={scale} onClick={onClick}>
      {/* Turned Wooden Pedestal Plinth */}
      <mesh position={[0, 0.03, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.12, 0.15, 0.06, 32]} />
        <meshStandardMaterial color="#581C87" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Brass Column Riser */}
      <mesh position={[0, 0.09, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.05, 0.07, 24]} />
        <meshStandardMaterial color="#D97706" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Meridian Brass Arc (23.5° Axial Tilt) */}
      <group position={[0, 0.25, 0]} rotation={[0, 0, 0.41]}>
        <mesh castShadow>
          <torusGeometry args={[0.18, 0.016, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#F59E0B" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Polar Axis Spindle */}
        <mesh rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.008, 0.008, 0.38, 12]} />
          <meshStandardMaterial color="#D97706" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Rotating Globe Sphere */}
        <group ref={globeGroupRef}>
          {/* Azure Ocean Sphere */}
          <mesh castShadow receiveShadow>
            <sphereGeometry args={[0.14, 32, 32]} />
            <meshStandardMaterial color="#0284C7" roughness={0.3} metalness={0.15} />
          </mesh>
          {/* Polar Ice Caps */}
          <mesh position={[0, 0.13, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.4} />
          </mesh>
          <mesh position={[0, -0.13, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial color="#F8FAFC" roughness={0.4} />
          </mesh>
          {/* Stylized Continents Relief Patches */}
          <mesh position={[0.06, 0.04, 0.11]} rotation={[0.2, 0.5, 0]}>
            <boxGeometry args={[0.08, 0.09, 0.02]} />
            <meshStandardMaterial color="#16A34A" roughness={0.6} />
          </mesh>
          <mesh position={[-0.08, 0.02, 0.09]} rotation={[-0.2, -0.3, 0.1]}>
            <boxGeometry args={[0.07, 0.08, 0.02]} />
            <meshStandardMaterial color="#22C55E" roughness={0.6} />
          </mesh>
          <mesh position={[0.04, -0.05, -0.11]} rotation={[0.4, 0.1, 0]}>
            <boxGeometry args={[0.09, 0.08, 0.02]} />
            <meshStandardMaterial color="#15803D" roughness={0.6} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

// 5. High-Fidelity Retro Rocket with Aerodynamic Curves, Glazed Porthole & Fins
export const ToyRocket3D: React.FC<ModelProps> = ({ position = [0, 0, 0], scale = 1, onClick }) => {
  return (
    <group position={position} scale={scale} onClick={onClick} rotation={[0, 0.4, 0.1]}>
      {/* Streamlined Rocket Fuselage (Glossy Ceramic White) */}
      <mesh position={[0, 0.22, 0]} castShadow>
        <cylinderGeometry args={[0.075, 0.11, 0.28, 32]} />
        <meshStandardMaterial color="#F8FAFC" roughness={0.15} metalness={0.1} />
      </mesh>
      {/* Aerodynamic Cherry Red Nose Cone */}
      <mesh position={[0, 0.44, 0]} castShadow>
        <coneGeometry args={[0.075, 0.18, 32]} />
        <meshStandardMaterial color="#DC2626" roughness={0.2} metalness={0.2} />
      </mesh>
      {/* Needle Antenna Tip */}
      <mesh position={[0, 0.55, 0]}>
        <cylinderGeometry args={[0.005, 0.01, 0.08, 12]} />
        <meshStandardMaterial color="#FBBF24" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Cockpit Porthole Bezel */}
      <mesh position={[0, 0.26, 0.09]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.04, 0.01, 16, 24]} />
        <meshStandardMaterial color="#F59E0B" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Cockpit Porthole Convex Glass */}
      <mesh position={[0, 0.26, 0.092]} castShadow>
        <sphereGeometry args={[0.038, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color="#38BDF8"
          emissive="#0284C7"
          emissiveIntensity={0.4}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>
      {/* 3 Swept-Back Aerodynamic Wing Fins */}
      {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, idx) => (
        <group key={idx} rotation={[0, angle, 0]}>
          <mesh position={[0.11, 0.12, 0]} rotation={[0, 0, -0.22]} castShadow>
            <boxGeometry args={[0.06, 0.16, 0.016]} />
            <meshStandardMaterial color="#DC2626" roughness={0.25} metalness={0.1} />
          </mesh>
        </group>
      ))}
      {/* Dark Titanium Exhaust Nozzle */}
      <mesh position={[0, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.05, 0.06, 24]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
};

// 6. High-Fidelity Sculpted Potted Bonsai Plant
export const PlantPot3D: React.FC<ModelProps> = ({ position = [0, 0, 0], scale = 1, onClick }) => {
  return (
    <group position={position} scale={scale} onClick={onClick}>
      {/* Ceramic Saucer Tray */}
      <mesh position={[0, 0.015, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.16, 0.14, 0.03, 32]} />
        <meshStandardMaterial color="#E2E8F0" roughness={0.25} />
      </mesh>
      {/* Fluted Ceramic Pot */}
      <mesh position={[0, 0.11, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.14, 0.1, 0.16, 32]} />
        <meshStandardMaterial color="#F8FAFC" roughness={0.2} metalness={0.05} />
      </mesh>
      {/* Beveled Pot Rim */}
      <mesh position={[0, 0.19, 0]} castShadow>
        <torusGeometry args={[0.14, 0.015, 16, 32]} />
        <meshStandardMaterial color="#CBD5E1" roughness={0.25} />
      </mesh>
      {/* Rich Soil Bed */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.02, 24]} />
        <meshStandardMaterial color="#3F2212" roughness={0.9} />
      </mesh>

      {/* Main Organic Branching Stems */}
      <group position={[0, 0.19, 0]}>
        <mesh position={[0, 0.1, 0]} rotation={[0.05, 0, -0.08]} castShadow>
          <cylinderGeometry args={[0.016, 0.024, 0.2, 12]} />
          <meshStandardMaterial color="#582F0E" roughness={0.7} />
        </mesh>
        <mesh position={[0.03, 0.16, 0.02]} rotation={[0.2, 0.4, 0.3]} castShadow>
          <cylinderGeometry args={[0.012, 0.018, 0.14, 12]} />
          <meshStandardMaterial color="#582F0E" roughness={0.7} />
        </mesh>

        {/* 7 Organic Cupped Stylized Leaves */}
        {[
          { pos: [0.08, 0.22, 0.06], rot: [0.3, 0.4, 0.2], s: 1.1 },
          { pos: [-0.07, 0.19, -0.04], rot: [-0.2, -0.6, -0.4], s: 1.0 },
          { pos: [0.02, 0.28, -0.05], rot: [0.5, -0.2, 0.1], s: 1.2 },
          { pos: [-0.04, 0.25, 0.06], rot: [0.1, 0.8, -0.3], s: 0.95 },
          { pos: [0.1, 0.16, -0.04], rot: [-0.4, 0.5, 0.5], s: 0.85 },
          { pos: [0, 0.32, 0.01], rot: [0.1, 0.1, 0.05], s: 1.15 },
          { pos: [-0.08, 0.14, 0.03], rot: [0.2, -0.4, -0.5], s: 0.8 },
        ].map((leaf, idx) => (
          <group key={idx} position={leaf.pos as [number, number, number]} rotation={leaf.rot as [number, number, number]} scale={leaf.s}>
            <mesh castShadow>
              <sphereGeometry args={[0.055, 16, 12]} />
              <meshStandardMaterial
                color="#15803D"
                roughness={0.4}
                metalness={0.1}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};

// 7. High-Fidelity Smart Companion Robot with Glowing Visor & Articulated Arms
export const SmartRobot3D: React.FC<ModelProps> = ({ position = [0, 0, 0], scale = 1, onClick }) => {
  const headRef = useRef<THREE.Group | null>(null);

  useFrame(({ clock }) => {
    if (headRef.current) {
      const t = clock.getElapsedTime();
      headRef.current.rotation.y = Math.sin(t * 1.5) * 0.25;
    }
  });

  return (
    <group position={position} scale={scale} onClick={onClick}>
      {/* Track Base / Chassis */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.26, 0.08, 0.22]} />
        <meshStandardMaterial color="#1E293B" roughness={0.4} metalness={0.7} />
      </mesh>
      {/* Rubber Track Treads */}
      <mesh position={[-0.14, 0.05, 0]} castShadow>
        <boxGeometry args={[0.04, 0.09, 0.24]} />
        <meshStandardMaterial color="#0F172A" roughness={0.8} />
      </mesh>
      <mesh position={[0.14, 0.05, 0]} castShadow>
        <boxGeometry args={[0.04, 0.09, 0.24]} />
        <meshStandardMaterial color="#0F172A" roughness={0.8} />
      </mesh>

      {/* Pearlescent Torso */}
      <mesh position={[0, 0.18, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.12, 0.16, 24]} />
        <meshStandardMaterial color="#6366F1" roughness={0.25} metalness={0.3} />
      </mesh>
      {/* Chest Energy Meter */}
      <mesh position={[0, 0.18, 0.115]}>
        <boxGeometry args={[0.09, 0.04, 0.01]} />
        <meshStandardMaterial color="#10B981" emissive="#10B981" emissiveIntensity={0.6} />
      </mesh>

      {/* Mechanical Arms */}
      <mesh position={[-0.14, 0.17, 0]} rotation={[0, 0, 0.3]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.12, 12]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0.14, 0.17, 0]} rotation={[0, 0, -0.3]} castShadow>
        <cylinderGeometry args={[0.02, 0.02, 0.12, 12]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.8} roughness={0.25} />
      </mesh>

      {/* Articulated Head & Visor */}
      <group ref={headRef} position={[0, 0.31, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.1, 24, 24]} />
          <meshStandardMaterial color="#F8FAFC" roughness={0.2} metalness={0.1} />
        </mesh>
        {/* Curved Black Visor Screen */}
        <mesh position={[0, 0.01, 0.07]} rotation={[0.1, 0, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.05, 16, 1, false, -Math.PI / 2, Math.PI]} />
          <meshStandardMaterial color="#0F172A" roughness={0.1} metalness={0.5} />
        </mesh>
        {/* Expressive Glowing Cyan LED Eyes */}
        <mesh position={[-0.035, 0.01, 0.095]}>
          <sphereGeometry args={[0.015, 12, 12]} />
          <meshBasicMaterial color="#38BDF8" />
        </mesh>
        <mesh position={[0.035, 0.01, 0.095]}>
          <sphereGeometry args={[0.015, 12, 12]} />
          <meshBasicMaterial color="#38BDF8" />
        </mesh>
        {/* Antenna Stem */}
        <mesh position={[0, 0.13, 0]}>
          <cylinderGeometry args={[0.006, 0.008, 0.08, 12]} />
          <meshStandardMaterial color="#F59E0B" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Pulsing Beacon Orb */}
        <mesh position={[0, 0.18, 0]}>
          <sphereGeometry args={[0.022, 16, 16]} />
          <meshStandardMaterial color="#FBBF24" emissive="#F59E0B" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </group>
  );
};

// 8. High-Fidelity Astronomical Telescope with Wooden Tripod & Brass Barrel
export const Telescope3D: React.FC<ModelProps> = ({ position = [0, 0, 0], scale = 1, onClick }) => {
  return (
    <group position={position} scale={scale} onClick={onClick}>
      {/* 3 Angled Mahogany Wooden Legs */}
      {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, idx) => (
        <group key={idx} rotation={[0, angle, 0]}>
          <mesh position={[0.08, 0.18, 0]} rotation={[0, 0, -0.26]} castShadow>
            <cylinderGeometry args={[0.014, 0.018, 0.38, 12]} />
            <meshStandardMaterial color="#78350F" roughness={0.4} />
          </mesh>
          {/* Brass Ferrule Tip */}
          <mesh position={[0.13, 0.015, 0]} rotation={[0, 0, -0.26]}>
            <cylinderGeometry args={[0.014, 0.014, 0.03, 12]} />
            <meshStandardMaterial color="#F59E0B" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Brass Gimbal Head */}
      <mesh position={[0, 0.36, 0]} castShadow>
        <cylinderGeometry args={[0.045, 0.055, 0.04, 24]} />
        <meshStandardMaterial color="#D97706" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Optical Tube (Aimed at the Stars: 32° Pitch) */}
      <group position={[0, 0.4, 0]} rotation={[0.4, 0.2, -0.3]}>
        {/* Main Brass Barrel */}
        <mesh castShadow>
          <cylinderGeometry args={[0.045, 0.055, 0.44, 32]} />
          <meshStandardMaterial color="#F59E0B" metalness={0.92} roughness={0.18} />
        </mesh>
        {/* Objective Lens Hood */}
        <mesh position={[0, 0.23, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.05, 0.06, 32]} />
          <meshStandardMaterial color="#D97706" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Coated Glass Lens */}
        <mesh position={[0, 0.25, 0]}>
          <circleGeometry args={[0.05, 24]} />
          <meshStandardMaterial color="#0284C7" metalness={0.8} roughness={0.1} />
        </mesh>
        {/* Eyepiece Extension & Focusing Wheel */}
        <mesh position={[0, -0.23, 0]}>
          <cylinderGeometry args={[0.025, 0.03, 0.08, 24]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0.035, -0.21, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.018, 0.018, 0.03, 16]} />
          <meshStandardMaterial color="#D97706" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
};

// 9. High-Fidelity 3-Volume Leather Encyclopedia Set with Gold Tooling
export const Bookshelf3D: React.FC<ModelProps> = ({ position = [0, 0, 0], scale = 1, onClick }) => {
  return (
    <group position={position} scale={scale} onClick={onClick}>
      {/* Book 1 (Royal Sapphire Blue) */}
      <group position={[-0.09, 0.16, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.065, 0.32, 0.22]} />
          <meshStandardMaterial color="#1E3A8A" roughness={0.5} />
        </mesh>
        {/* Gilded Spine Lines */}
        <mesh position={[-0.033, 0.06, 0]}>
          <boxGeometry args={[0.002, 0.02, 0.21]} />
          <meshStandardMaterial color="#FBBF24" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Page Block (Textured Cream) */}
        <mesh position={[0.005, 0, 0.02]}>
          <boxGeometry args={[0.05, 0.3, 0.18]} />
          <meshStandardMaterial color="#FEF3C7" roughness={0.8} />
        </mesh>
      </group>

      {/* Book 2 (Deep Emerald Green) */}
      <group position={[-0.01, 0.18, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.075, 0.36, 0.24]} />
          <meshStandardMaterial color="#065F46" roughness={0.5} />
        </mesh>
        {/* Gold Emblem on Spine */}
        <mesh position={[-0.038, 0.08, 0]}>
          <octahedronGeometry args={[0.018]} />
          <meshStandardMaterial color="#F59E0B" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Page Block */}
        <mesh position={[0.005, 0, 0.02]}>
          <boxGeometry args={[0.06, 0.34, 0.2]} />
          <meshStandardMaterial color="#FEF3C7" roughness={0.8} />
        </mesh>
      </group>

      {/* Book 3 (Crimson Hero Red, Tilted Natural Lean) */}
      <group position={[0.08, 0.15, 0]} rotation={[0, 0, -0.15]}>
        <mesh castShadow>
          <boxGeometry args={[0.06, 0.3, 0.22]} />
          <meshStandardMaterial color="#991B1B" roughness={0.5} />
        </mesh>
        {/* Page Block */}
        <mesh position={[0.005, 0, 0.02]}>
          <boxGeometry args={[0.048, 0.28, 0.18]} />
          <meshStandardMaterial color="#FEF3C7" roughness={0.8} />
        </mesh>
      </group>

      {/* Bookmark Ribbon Draped Forward */}
      <mesh position={[-0.01, 0.04, 0.13]} rotation={[0.4, 0, 0]}>
        <boxGeometry args={[0.014, 0.16, 0.004]} />
        <meshStandardMaterial color="#FBBF24" roughness={0.6} />
      </mesh>
    </group>
  );
};

// 10. High-Fidelity Faceted Crystal Polyhedron Trophy with Refraction & Dispersion
export const CrystalTrophy3D: React.FC<ModelProps> = ({ position = [0, 0, 0], scale = 1, onClick }) => {
  const crystalRef = useRef<THREE.Mesh | null>(null);

  useFrame(({ clock }) => {
    if (crystalRef.current) {
      const t = clock.getElapsedTime();
      crystalRef.current.rotation.y = t * 0.6;
    }
  });

  return (
    <group position={position} scale={scale} onClick={onClick}>
      {/* Dark Obsidian Beveled Base */}
      <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.22, 0.08, 0.22]} />
        <meshStandardMaterial color="#0F172A" roughness={0.15} metalness={0.3} />
      </mesh>
      {/* Brushed Platinum Stem Mount */}
      <mesh position={[0, 0.11, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.07, 0.06, 24]} />
        <meshStandardMaterial color="#E2E8F0" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Precision Cut Faceted Crystal Diamond */}
      <mesh ref={crystalRef} position={[0, 0.28, 0]} castShadow>
        <dodecahedronGeometry args={[0.15]} />
        <meshPhysicalMaterial
          color="#06B6D4"
          emissive="#0891B2"
          emissiveIntensity={0.3}
          roughness={0.06}
          metalness={0.1}
          transmission={0.88}
          ior={1.65}
          thickness={0.4}
          transparent
          opacity={0.95}
        />
      </mesh>

      {/* Floating Gold Core Star */}
      <mesh position={[0, 0.28, 0]}>
        <octahedronGeometry args={[0.04]} />
        <meshStandardMaterial color="#FEF08A" emissive="#F59E0B" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
};

// 11. High-Fidelity Knight's Honor Shield with Steel Rim & Crossed Broadswords
export const HonorShield3D: React.FC<ModelProps> = ({ position = [0, 0, 0], scale = 1, onClick }) => {
  return (
    <group position={position} scale={scale} onClick={onClick}>
      {/* Crossed Steel Broadsword 1 */}
      <mesh position={[0, 0.22, -0.015]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <boxGeometry args={[0.02, 0.54, 0.008]} />
        <meshStandardMaterial color="#CBD5E1" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Crossed Steel Broadsword 2 */}
      <mesh position={[0, 0.22, -0.015]} rotation={[0, 0, -Math.PI / 4]} castShadow>
        <boxGeometry args={[0.02, 0.54, 0.008]} />
        <meshStandardMaterial color="#CBD5E1" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Brass Sword Pommels */}
      <mesh position={[-0.18, 0.04, -0.015]}>
        <sphereGeometry args={[0.022, 16, 16]} />
        <meshStandardMaterial color="#D97706" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.18, 0.04, -0.015]}>
        <sphereGeometry args={[0.022, 16, 16]} />
        <meshStandardMaterial color="#D97706" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Curved Convex Heater Shield Plate */}
      <group position={[0, 0.22, 0.01]}>
        {/* Main Body */}
        <mesh castShadow>
          <boxGeometry args={[0.32, 0.4, 0.024]} />
          <meshStandardMaterial color="#1E3A8A" roughness={0.25} metalness={0.4} />
        </mesh>
        {/* Tapered Bottom Point */}
        <mesh position={[0, -0.24, 0]} rotation={[0, 0, Math.PI]} castShadow>
          <coneGeometry args={[0.16, 0.16, 4]} />
          <meshStandardMaterial color="#1E3A8A" roughness={0.25} metalness={0.4} />
        </mesh>
        {/* Polished Brass Rim Trim */}
        <mesh position={[0, 0.2, 0.015]}>
          <boxGeometry args={[0.34, 0.025, 0.015]} />
          <meshStandardMaterial color="#F59E0B" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Embossed Golden Lion / Star Crest */}
        <mesh position={[0, 0.02, 0.025]}>
          <octahedronGeometry args={[0.075]} />
          <meshStandardMaterial color="#FBBF24" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>
    </group>
  );
};

// 12. High-Fidelity Space Medal of Honor with Grosgrain Ribbon & Faceted Star
export const SpaceBadge3D: React.FC<ModelProps> = ({ position = [0, 0, 0], scale = 1, onClick }) => {
  const fabricNormal = getFabricNormalTexture();

  return (
    <group position={position} scale={scale} onClick={onClick}>
      {/* Polished Brass Ribbon Clasp Bar */}
      <mesh position={[0, 0.36, 0.01]} castShadow>
        <boxGeometry args={[0.22, 0.035, 0.018]} />
        <meshStandardMaterial color="#F59E0B" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Woven Striped Ribbon (Red & Gold Grosgrain) */}
      <mesh position={[0, 0.25, 0.005]} castShadow>
        <boxGeometry args={[0.18, 0.2, 0.008]} />
        <meshStandardMaterial
          color="#DC2626"
          normalMap={fabricNormal}
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>
      {/* Golden Center Ribbon Stripe */}
      <mesh position={[0, 0.25, 0.01]}>
        <boxGeometry args={[0.045, 0.2, 0.002]} />
        <meshStandardMaterial color="#FBBF24" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Faceted 8-Point Golden Star Medallion */}
      <group position={[0, 0.1, 0.015]}>
        <mesh castShadow>
          <octahedronGeometry args={[0.095]} />
          <meshStandardMaterial color="#FBBF24" metalness={0.92} roughness={0.18} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 4]} castShadow>
          <octahedronGeometry args={[0.095]} />
          <meshStandardMaterial color="#F59E0B" metalness={0.92} roughness={0.18} />
        </mesh>
        {/* Center Blue Enamel Medallion with Electron Orbit Ring */}
        <mesh position={[0, 0, 0.07]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, 0.01, 24]} />
          <meshStandardMaterial color="#2563EB" metalness={0.7} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.078]}>
          <torusGeometry args={[0.03, 0.005, 12, 24]} />
          <meshStandardMaterial color="#FEF08A" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
};

// Dispatcher Component to Render Any Collectible by modelType
export const RenderCollectible3D: React.FC<{
  modelType: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  onClick?: () => void;
}> = ({ modelType, position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, onClick }) => {
  switch (modelType) {
    case 'trophy_cup':
      return <TrophyCup3D position={position} rotation={rotation} scale={scale} onClick={onClick} />;
    case 'superhero_cape':
      return <SuperheroCape3D position={position} rotation={rotation} scale={scale} onClick={onClick} />;
    case 'star_lamp':
      return <StarLamp3D position={position} rotation={rotation} scale={scale} onClick={onClick} />;
    case 'mini_globe':
      return <MiniGlobe3D position={position} rotation={rotation} scale={scale} onClick={onClick} />;
    case 'toy_rocket':
      return <ToyRocket3D position={position} rotation={rotation} scale={scale} onClick={onClick} />;
    case 'plant_pot':
      return <PlantPot3D position={position} rotation={rotation} scale={scale} onClick={onClick} />;
    case 'smart_robot':
      return <SmartRobot3D position={position} rotation={rotation} scale={scale} onClick={onClick} />;
    case 'telescope':
      return <Telescope3D position={position} rotation={rotation} scale={scale} onClick={onClick} />;
    case 'bookshelf':
      return <Bookshelf3D position={position} rotation={rotation} scale={scale} onClick={onClick} />;
    case 'crystal_trophy':
      return <CrystalTrophy3D position={position} rotation={rotation} scale={scale} onClick={onClick} />;
    case 'honor_shield':
      return <HonorShield3D position={position} rotation={rotation} scale={scale} onClick={onClick} />;
    case 'space_badge':
      return <SpaceBadge3D position={position} rotation={rotation} scale={scale} onClick={onClick} />;
    default:
      return <TrophyCup3D position={position} rotation={rotation} scale={scale} onClick={onClick} />;
  }
};
