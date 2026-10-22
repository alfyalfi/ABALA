'use client';

import React, { useRef } from 'react';
import * as THREE from 'three';

interface ModelProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  onClick?: () => void;
}

// 1. Gold Trophy Cup
export const TrophyCup3D: React.FC<ModelProps> = ({ position = [0, 0, 0], scale = 1, onClick }) => {
  return (
    <group position={position} scale={scale} onClick={onClick}>
      {/* Base */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.16, 0.2, 0.1, 16]} />
        <meshStandardMaterial color="#78350F" roughness={0.4} />
      </mesh>
      {/* Stem */}
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.14, 16]} />
        <meshStandardMaterial color="#F59E0B" metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Cup Bowl */}
      <mesh position={[0, 0.32, 0]}>
        <cylinderGeometry args={[0.2, 0.08, 0.22, 16]} />
        <meshStandardMaterial color="#FBBF24" metalness={0.7} roughness={0.25} />
      </mesh>
      {/* Golden Star on Front */}
      <mesh position={[0, 0.32, 0.14]}>
        <boxGeometry args={[0.08, 0.08, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#F59E0B" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

// 2. Star Desk Lamp
export const StarLamp3D: React.FC<ModelProps> = ({ position = [0, 0, 0], scale = 1, onClick }) => {
  return (
    <group position={position} scale={scale} onClick={onClick}>
      {/* Wooden / Brass Base */}
      <mesh position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.14, 0.16, 0.06, 16]} />
        <meshStandardMaterial color="#334155" roughness={0.5} />
      </mesh>
      {/* Stem */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.3, 12]} />
        <meshStandardMaterial color="#94A3B8" metalness={0.5} />
      </mesh>
      {/* Glowing Star Lamp Shade */}
      <mesh position={[0, 0.38, 0]}>
        <octahedronGeometry args={[0.16]} />
        <meshStandardMaterial color="#FEF08A" emissive="#FBBF24" emissiveIntensity={0.8} roughness={0.2} />
      </mesh>
      {/* Soft warm light source */}
      <pointLight position={[0, 0.4, 0]} color="#FEF08A" intensity={0.7} distance={1.8} />
    </group>
  );
};

// 3. Mini Globe
export const MiniGlobe3D: React.FC<ModelProps> = ({ position = [0, 0, 0], scale = 1, onClick }) => {
  return (
    <group position={position} scale={scale} onClick={onClick}>
      {/* Base */}
      <mesh position={[0, 0.04, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.08, 16]} />
        <meshStandardMaterial color="#78350F" roughness={0.6} />
      </mesh>
      {/* Brass Arm */}
      <mesh position={[0, 0.18, 0]} rotation={[0, 0, 0.2]}>
        <torusGeometry args={[0.18, 0.02, 8, 24, Math.PI]} />
        <meshStandardMaterial color="#D97706" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Earth Sphere */}
      <mesh position={[0, 0.22, 0]}>
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshStandardMaterial color="#38BDF8" roughness={0.5} />
      </mesh>
      {/* Continents Patch */}
      <mesh position={[0.04, 0.24, 0.11]}>
        <boxGeometry args={[0.08, 0.07, 0.02]} />
        <meshStandardMaterial color="#22C55E" roughness={0.7} />
      </mesh>
    </group>
  );
};

// 4. Toy Rocket
export const ToyRocket3D: React.FC<ModelProps> = ({ position = [0, 0, 0], scale = 1, onClick }) => {
  return (
    <group position={position} scale={scale} onClick={onClick} rotation={[0, 0.3, 0.1]}>
      {/* Body */}
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.26, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
      </mesh>
      {/* Nose Cone */}
      <mesh position={[0, 0.42, 0]}>
        <coneGeometry args={[0.08, 0.16, 16]} />
        <meshStandardMaterial color="#DC2626" roughness={0.3} />
      </mesh>
      {/* Cockpit Window */}
      <mesh position={[0, 0.28, 0.085]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshStandardMaterial color="#38BDF8" roughness={0.2} metalness={0.5} />
      </mesh>
      {/* Fins */}
      <mesh position={[0.09, 0.14, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.04, 0.1, 0.12]} />
        <meshStandardMaterial color="#DC2626" />
      </mesh>
      <mesh position={[-0.09, 0.14, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.04, 0.1, 0.12]} />
        <meshStandardMaterial color="#DC2626" />
      </mesh>
    </group>
  );
};

// 5. Superhero Cape
export const SuperheroCape3D: React.FC<ModelProps> = ({ position = [0, 0, 0], scale = 1, onClick }) => {
  return (
    <group position={position} scale={scale} onClick={onClick}>
      {/* Wall Hook */}
      <mesh position={[0, 0.4, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.08, 12]} />
        <meshStandardMaterial color="#F59E0B" metalness={0.6} />
      </mesh>
      {/* Draped Red Cape */}
      <mesh position={[0, 0.15, 0.02]} rotation={[0.05, 0, 0]}>
        <boxGeometry args={[0.34, 0.48, 0.04]} />
        <meshStandardMaterial color="#DC2626" roughness={0.7} />
      </mesh>
      {/* Yellow Trim / Emblem */}
      <mesh position={[0, 0.22, 0.045]}>
        <circleGeometry args={[0.08, 16]} />
        <meshStandardMaterial color="#FBBF24" />
      </mesh>
    </group>
  );
};

// 6. Bonsai Plant Pot
export const PlantPot3D: React.FC<ModelProps> = ({ position = [0, 0, 0], scale = 1, onClick }) => {
  return (
    <group position={position} scale={scale} onClick={onClick}>
      {/* Terracotta Pot */}
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.14, 0.1, 0.16, 16]} />
        <meshStandardMaterial color="#B45309" roughness={0.8} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.02, 16]} />
        <meshStandardMaterial color="#451A03" roughness={0.9} />
      </mesh>
      {/* Plant Foliage (Clusters of green spheres) */}
      <mesh position={[0, 0.28, 0]}>
        <sphereGeometry args={[0.14, 12, 12]} />
        <meshStandardMaterial color="#16A34A" roughness={0.6} />
      </mesh>
      <mesh position={[0.08, 0.34, 0.04]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshStandardMaterial color="#22C55E" roughness={0.6} />
      </mesh>
      <mesh position={[-0.06, 0.32, -0.04]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color="#15803D" roughness={0.6} />
      </mesh>
    </group>
  );
};

// 7. Smart Robot
export const SmartRobot3D: React.FC<ModelProps> = ({ position = [0, 0, 0], scale = 1, onClick }) => {
  return (
    <group position={position} scale={scale} onClick={onClick}>
      {/* Wheel Base */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.22, 0.08, 0.18]} />
        <meshStandardMaterial color="#334155" roughness={0.5} />
      </mesh>
      {/* Body */}
      <mesh position={[0, 0.18, 0]}>
        <boxGeometry args={[0.18, 0.18, 0.14]} />
        <meshStandardMaterial color="#6366F1" roughness={0.3} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.33, 0]}>
        <boxGeometry args={[0.14, 0.12, 0.12]} />
        <meshStandardMaterial color="#818CF8" roughness={0.3} />
      </mesh>
      {/* Eyes Screen */}
      <mesh position={[0, 0.33, 0.065]}>
        <boxGeometry args={[0.1, 0.04, 0.01]} />
        <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={0.8} />
      </mesh>
      {/* Antenna */}
      <mesh position={[0, 0.43, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.08, 8]} />
        <meshStandardMaterial color="#F59E0B" />
      </mesh>
      <mesh position={[0, 0.48, 0]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#EF4444" emissive="#EF4444" emissiveIntensity={0.6} />
      </mesh>
    </group>
  );
};

// 8. Telescope
export const Telescope3D: React.FC<ModelProps> = ({ position = [0, 0, 0], scale = 1, onClick }) => {
  return (
    <group position={position} scale={scale} onClick={onClick}>
      {/* Tripod Legs */}
      <mesh position={[0.06, 0.15, 0.06]} rotation={[0.2, 0, -0.2]}>
        <cylinderGeometry args={[0.015, 0.015, 0.32, 8]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <mesh position={[-0.06, 0.15, 0.06]} rotation={[0.2, 0, 0.2]}>
        <cylinderGeometry args={[0.015, 0.015, 0.32, 8]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <mesh position={[0, 0.15, -0.08]} rotation={[-0.2, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.32, 8]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      {/* Main Tube */}
      <mesh position={[0, 0.34, 0]} rotation={[0.35, 0.4, 0]}>
        <cylinderGeometry args={[0.05, 0.06, 0.45, 16]} />
        <meshStandardMaterial color="#D97706" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Lens */}
      <mesh position={[0.08, 0.48, -0.1]} rotation={[0.35, 0.4, 0]}>
        <cylinderGeometry args={[0.055, 0.055, 0.02, 16]} />
        <meshStandardMaterial color="#38BDF8" roughness={0.2} metalness={0.6} />
      </mesh>
    </group>
  );
};

// 9. Bookshelf / Books Stack
export const Bookshelf3D: React.FC<ModelProps> = ({ position = [0, 0, 0], scale = 1, onClick }) => {
  return (
    <group position={position} scale={scale} onClick={onClick}>
      {/* Book 1 (Blue) */}
      <mesh position={[-0.08, 0.14, 0]}>
        <boxGeometry args={[0.05, 0.28, 0.2]} />
        <meshStandardMaterial color="#2563EB" roughness={0.4} />
      </mesh>
      {/* Book 2 (Red) */}
      <mesh position={[-0.02, 0.16, 0]}>
        <boxGeometry args={[0.05, 0.32, 0.2]} />
        <meshStandardMaterial color="#DC2626" roughness={0.4} />
      </mesh>
      {/* Book 3 (Yellow) */}
      <mesh position={[0.04, 0.13, 0]}>
        <boxGeometry args={[0.05, 0.26, 0.19]} />
        <meshStandardMaterial color="#FBBF24" roughness={0.4} />
      </mesh>
      {/* Book 4 (Green tilted) */}
      <mesh position={[0.11, 0.12, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.05, 0.25, 0.18]} />
        <meshStandardMaterial color="#16A34A" roughness={0.4} />
      </mesh>
    </group>
  );
};

// 10. Crystal Trophy
export const CrystalTrophy3D: React.FC<ModelProps> = ({ position = [0, 0, 0], scale = 1, onClick }) => {
  return (
    <group position={position} scale={scale} onClick={onClick}>
      {/* Obsidian Base */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.14, 0.16, 0.1, 8]} />
        <meshStandardMaterial color="#0F172A" roughness={0.2} />
      </mesh>
      {/* Glowing Cyan Diamond Crystal */}
      <mesh position={[0, 0.26, 0]}>
        <octahedronGeometry args={[0.18]} />
        <meshStandardMaterial color="#06B6D4" emissive="#0891B2" emissiveIntensity={0.6} roughness={0.1} metalness={0.2} transparent opacity={0.9} />
      </mesh>
    </group>
  );
};

// 11. Honor Shield
export const HonorShield3D: React.FC<ModelProps> = ({ position = [0, 0, 0], scale = 1, onClick }) => {
  return (
    <group position={position} scale={scale} onClick={onClick}>
      {/* Outer Shield Plate */}
      <mesh position={[0, 0.25, 0.02]}>
        <boxGeometry args={[0.32, 0.42, 0.04]} />
        <meshStandardMaterial color="#F59E0B" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Inner Red Chevron */}
      <mesh position={[0, 0.25, 0.045]}>
        <boxGeometry args={[0.22, 0.32, 0.02]} />
        <meshStandardMaterial color="#DC2626" />
      </mesh>
      {/* Star Boss */}
      <mesh position={[0, 0.25, 0.06]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshStandardMaterial color="#FBBF24" emissive="#F59E0B" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
};

// 12. Space Badge
export const SpaceBadge3D: React.FC<ModelProps> = ({ position = [0, 0, 0], scale = 1, onClick }) => {
  return (
    <group position={position} scale={scale} onClick={onClick}>
      {/* Blue Crest */}
      <mesh position={[0, 0.22, 0.02]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.03, 16]} />
        <meshStandardMaterial color="#1D4ED8" metalness={0.3} roughness={0.4} />
      </mesh>
      {/* Gold Rim */}
      <mesh position={[0, 0.22, 0.025]}>
        <torusGeometry args={[0.16, 0.02, 8, 24]} />
        <meshStandardMaterial color="#F59E0B" metalness={0.7} />
      </mesh>
      {/* Center Star */}
      <mesh position={[0, 0.22, 0.045]}>
        <boxGeometry args={[0.07, 0.07, 0.02]} />
        <meshStandardMaterial color="#FBBF24" emissive="#F59E0B" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

// Generic Renderer Factory by Model Type
export const RenderCollectible3D: React.FC<{
  modelType: string;
  position?: [number, number, number];
  scale?: number;
  onClick?: () => void;
}> = ({ modelType, position, scale = 1, onClick }) => {
  switch (modelType) {
    case 'trophy_cup': return <TrophyCup3D position={position} scale={scale} onClick={onClick} />;
    case 'star_lamp': return <StarLamp3D position={position} scale={scale} onClick={onClick} />;
    case 'mini_globe': return <MiniGlobe3D position={position} scale={scale} onClick={onClick} />;
    case 'toy_rocket': return <ToyRocket3D position={position} scale={scale} onClick={onClick} />;
    case 'superhero_cape': return <SuperheroCape3D position={position} scale={scale} onClick={onClick} />;
    case 'plant_pot': return <PlantPot3D position={position} scale={scale} onClick={onClick} />;
    case 'smart_robot': return <SmartRobot3D position={position} scale={scale} onClick={onClick} />;
    case 'telescope': return <Telescope3D position={position} scale={scale} onClick={onClick} />;
    case 'bookshelf': return <Bookshelf3D position={position} scale={scale} onClick={onClick} />;
    case 'crystal_trophy': return <CrystalTrophy3D position={position} scale={scale} onClick={onClick} />;
    case 'honor_shield': return <HonorShield3D position={position} scale={scale} onClick={onClick} />;
    case 'space_badge': return <SpaceBadge3D position={position} scale={scale} onClick={onClick} />;
    default: return <TrophyCup3D position={position} scale={scale} onClick={onClick} />;
  }
};
