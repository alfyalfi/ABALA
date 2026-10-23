'use client';

import React from 'react';
import * as THREE from 'three';
import { getContactShadowTexture } from './TexturePipeline';

/**
 * Shader Pipeline for Stylized High-Fidelity Rendering
 * 
 * Implements core techniques adapted from "3D Game Shaders For Beginners":
 * - Fresnel & Rim Light calculation (Schlick approximation)
 * - Controlled Specular / Blinn-Phong highlights
 * - Soft contact shadows for deep spatial grounding
 */

/**
 * Creates a MeshStandardMaterial enhanced with a custom GLSL Fresnel Rim Glow
 */
export function createFresnelMaterial({
  color = '#FFFFFF',
  rimColor = '#38BDF8',
  rimPower = 3.0,
  rimIntensity = 1.8,
  roughness = 0.3,
  metalness = 0.2,
  transparent = false,
  opacity = 1.0,
}: {
  color?: string | number;
  rimColor?: string | number;
  rimPower?: number;
  rimIntensity?: number;
  roughness?: number;
  metalness?: number;
  transparent?: boolean;
  opacity?: number;
}): THREE.MeshStandardMaterial {
  const mat = new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness,
    transparent,
    opacity,
  });

  const parsedRimColor = new THREE.Color(rimColor);

  mat.onBeforeCompile = (shader) => {
    shader.uniforms.uRimColor = { value: parsedRimColor };
    shader.uniforms.uRimPower = { value: rimPower };
    shader.uniforms.uRimIntensity = { value: rimIntensity };

    // Inject uniform declaration in fragment shader
    shader.fragmentShader = `
      uniform vec3 uRimColor;
      uniform float uRimPower;
      uniform float uRimIntensity;
      ${shader.fragmentShader}
    `;

    // Inject Fresnel rim computation before tone mapping & output
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <dithering_fragment>',
      `
      // Fresnel Rim Light calculation from lettier 3d-game-shaders-for-beginners
      vec3 vViewDir = normalize(vViewPosition);
      vec3 vNormalNormalized = normalize(vNormal);
      float vDot = max(0.0, dot(vNormalNormalized, vViewDir));
      float fresnelFactor = pow(1.0 - vDot, uRimPower) * uRimIntensity;
      gl_FragColor.rgb += uRimColor * fresnelFactor;

      #include <dithering_fragment>
      `
    );
  };

  return mat;
}

/**
 * Contact Shadow Grounding Mesh Component (Soft Ambient Occlusion)
 */
export function ContactShadow({
  position = [0, 0.005, 0],
  scale = [1, 1],
  opacity = 0.6,
}: {
  position?: [number, number, number];
  scale?: [number, number];
  opacity?: number;
}) {
  const tex = getContactShadowTexture();

  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[scale[0], scale[1]]} />
      <meshBasicMaterial
        map={tex}
        transparent
        opacity={opacity}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}
