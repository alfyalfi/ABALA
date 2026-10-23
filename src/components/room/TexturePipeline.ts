import * as THREE from 'three';

/**
 * High-Fidelity Procedural PBR Texture & Normal Map Pipeline
 * 
 * Based on techniques from "3D Game Shaders For Beginners":
 * - Tangent Space Normal Mapping (Sobel Filter height-to-normal gradient conversion)
 * - PBR Roughness & Micro-surface scattering
 * - Procedural Wood Grain, Woven Fabric, and Carpet Fibers
 * 
 * Guaranteed 100% offline, zero network requests, ultra-crisp mipmapped textures.
 */

// Singleton texture cache
const textureCache = new Map<string, THREE.CanvasTexture>();

/**
 * Helper to convert heightmap canvas to tangent-space normal map using Sobel filter
 */
function heightmapToNormalMap(
  heightCtx: CanvasRenderingContext2D,
  width: number,
  height: number,
  intensity: number = 2.0
): HTMLCanvasElement {
  const normalCanvas = document.createElement('canvas');
  normalCanvas.width = width;
  normalCanvas.height = height;
  const normalCtx = normalCanvas.getContext('2d')!;

  const heightImgData = heightCtx.getImageData(0, 0, width, height);
  const hData = heightImgData.data;

  const normalImgData = normalCtx.createImageData(width, height);
  const nData = normalImgData.data;

  // Sample height at (x, y) with wrapping
  const getHeight = (x: number, y: number): number => {
    const wx = (x + width) % width;
    const wy = (y + height) % height;
    const idx = (wy * width + wx) * 4;
    return (hData[idx] + hData[idx + 1] + hData[idx + 2]) / (3 * 255.0);
  };

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Sobel kernel for horizontal gradient (dX)
      const tl = getHeight(x - 1, y - 1);
      const l  = getHeight(x - 1, y);
      const bl = getHeight(x - 1, y + 1);
      const tr = getHeight(x + 1, y - 1);
      const r  = getHeight(x + 1, y);
      const br = getHeight(x + 1, y + 1);

      // Sobel kernel for vertical gradient (dY)
      const t  = getHeight(x, y - 1);
      const b  = getHeight(x, y + 1);

      const dX = (tr + 2.0 * r + br) - (tl + 2.0 * l + bl);
      const dY = (bl + 2.0 * b + br) - (tl + 2.0 * t + tr);

      // Vector in tangent space
      let nx = -dX * intensity;
      let ny = -dY * intensity;
      let nz = 1.0;

      // Normalize
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
      nx /= len;
      ny /= len;
      nz /= len;

      // Map from [-1, 1] to [0, 255] RGB
      const pixelIdx = (y * width + x) * 4;
      nData[pixelIdx]     = Math.floor((nx * 0.5 + 0.5) * 255);
      nData[pixelIdx + 1] = Math.floor((ny * 0.5 + 0.5) * 255);
      nData[pixelIdx + 2] = Math.floor((nz * 0.5 + 0.5) * 255);
      nData[pixelIdx + 3] = 255;
    }
  }

  normalCtx.putImageData(normalImgData, 0, 0);
  return normalCanvas;
}

/**
 * 1. Warm Oak Wood Plank PBR Textures (Albedo, Normal Map, Roughness Map)
 */
export function getWoodPlankTextures(): {
  albedo: THREE.CanvasTexture;
  normal: THREE.CanvasTexture;
  roughness: THREE.CanvasTexture;
} {
  const cacheKey = 'wood_planks_pbr';
  if (
    textureCache.has(`${cacheKey}_albedo`) &&
    textureCache.has(`${cacheKey}_normal`) &&
    textureCache.has(`${cacheKey}_roughness`)
  ) {
    return {
      albedo: textureCache.get(`${cacheKey}_albedo`)!,
      normal: textureCache.get(`${cacheKey}_normal`)!,
      roughness: textureCache.get(`${cacheKey}_roughness`)!,
    };
  }

  const width = 512;
  const height = 512;

  // Albedo Canvas
  const albedoCanvas = document.createElement('canvas');
  albedoCanvas.width = width;
  albedoCanvas.height = height;
  const aCtx = albedoCanvas.getContext('2d')!;

  // Height Canvas (for normal map)
  const heightCanvas = document.createElement('canvas');
  heightCanvas.width = width;
  heightCanvas.height = height;
  const hCtx = heightCanvas.getContext('2d')!;

  // Roughness Canvas
  const roughCanvas = document.createElement('canvas');
  roughCanvas.width = width;
  roughCanvas.height = height;
  const rCtx = roughCanvas.getContext('2d')!;

  // Draw 8 wooden planks with seam bevels and grain
  const numPlanks = 8;
  const plankHeight = height / numPlanks;

  const woodTones = [
    { base: '#C89D68', grain: '#A87D48', rough: 140 },
    { base: '#D4A872', grain: '#B58852', rough: 130 },
    { base: '#BF925E', grain: '#9E7440', rough: 155 },
    { base: '#DDB17B', grain: '#BF935D', rough: 125 },
    { base: '#C49864', grain: '#A57945', rough: 145 },
    { base: '#CCA06C', grain: '#AD814D', rough: 135 },
    { base: '#B88B57', grain: '#986C38', rough: 160 },
    { base: '#D1A56F', grain: '#B28650', rough: 130 },
  ];

  for (let i = 0; i < numPlanks; i++) {
    const yStart = i * plankHeight;
    const tone = woodTones[i % woodTones.length];

    // Albedo base
    aCtx.fillStyle = tone.base;
    aCtx.fillRect(0, yStart, width, plankHeight);

    // Height base
    hCtx.fillStyle = '#C0C0C0';
    hCtx.fillRect(0, yStart, width, plankHeight);

    // Roughness base
    rCtx.fillStyle = `rgb(${tone.rough}, ${tone.rough}, ${tone.rough})`;
    rCtx.fillRect(0, yStart, width, plankHeight);

    // Wood grain lines (sinusoidal fiber noise)
    aCtx.strokeStyle = tone.grain;
    aCtx.lineWidth = 1.2;
    aCtx.globalAlpha = 0.35;

    hCtx.strokeStyle = '#808080';
    hCtx.lineWidth = 1.0;
    hCtx.globalAlpha = 0.4;

    for (let g = 0; g < 14; g++) {
      const lineY = yStart + (g / 14) * plankHeight + (Math.sin(g) * 3);
      aCtx.beginPath();
      hCtx.beginPath();
      aCtx.moveTo(0, lineY);
      hCtx.moveTo(0, lineY);

      for (let x = 0; x < width; x += 16) {
        const wave = Math.sin(x * 0.05 + g * 2.1) * 2.2 + Math.cos(x * 0.02) * 1.5;
        aCtx.lineTo(x, lineY + wave);
        hCtx.lineTo(x, lineY + wave);
      }
      aCtx.stroke();
      hCtx.stroke();
    }

    aCtx.globalAlpha = 1.0;
    hCtx.globalAlpha = 1.0;

    // Plank Seam Groove (Deep bevel)
    // Dark groove at bottom of each plank
    aCtx.fillStyle = '#5A3D1E';
    aCtx.fillRect(0, yStart + plankHeight - 3, width, 3);

    // Highlight edge at top of each plank
    aCtx.fillStyle = 'rgba(255, 240, 220, 0.35)';
    aCtx.fillRect(0, yStart, width, 1.5);

    // Deep crevice in heightmap
    hCtx.fillStyle = '#202020';
    hCtx.fillRect(0, yStart + plankHeight - 3, width, 3);
    hCtx.fillStyle = '#E8E8E8';
    hCtx.fillRect(0, yStart, width, 1.5);

    // Roughness groove
    rCtx.fillStyle = '#F0F0F0';
    rCtx.fillRect(0, yStart + plankHeight - 3, width, 3);
  }

  const normalCanvas = heightmapToNormalMap(hCtx, width, height, 3.2);

  const albedoTex = new THREE.CanvasTexture(albedoCanvas);
  albedoTex.wrapS = THREE.RepeatWrapping;
  albedoTex.wrapT = THREE.RepeatWrapping;
  albedoTex.repeat.set(2, 2);
  albedoTex.colorSpace = THREE.SRGBColorSpace;

  const normalTex = new THREE.CanvasTexture(normalCanvas);
  normalTex.wrapS = THREE.RepeatWrapping;
  normalTex.wrapT = THREE.RepeatWrapping;
  normalTex.repeat.set(2, 2);

  const roughTex = new THREE.CanvasTexture(roughCanvas);
  roughTex.wrapS = THREE.RepeatWrapping;
  roughTex.wrapT = THREE.RepeatWrapping;
  roughTex.repeat.set(2, 2);

  textureCache.set(`${cacheKey}_albedo`, albedoTex);
  textureCache.set(`${cacheKey}_normal`, normalTex);
  textureCache.set(`${cacheKey}_roughness`, roughTex);

  return { albedo: albedoTex, normal: normalTex, roughness: roughTex };
}

/**
 * 2. Fabric / Bed Linen Micro-Weave Normal Map
 */
export function getFabricNormalTexture(): THREE.CanvasTexture {
  const cacheKey = 'fabric_weave_normal';
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const size = 256;
  const heightCanvas = document.createElement('canvas');
  heightCanvas.width = size;
  heightCanvas.height = size;
  const hCtx = heightCanvas.getContext('2d')!;

  hCtx.fillStyle = '#808080';
  hCtx.fillRect(0, 0, size, size);

  // Cross-weave pattern
  const step = 4;
  for (let y = 0; y < size; y += step) {
    for (let x = 0; x < size; x += step) {
      const isEven = (x / step + y / step) % 2 === 0;
      hCtx.fillStyle = isEven ? '#A8A8A8' : '#585858';
      hCtx.fillRect(x, y, step, step);
    }
  }

  const normalCanvas = heightmapToNormalMap(hCtx, size, size, 1.8);
  const tex = new THREE.CanvasTexture(normalCanvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(12, 12);

  textureCache.set(cacheKey, tex);
  return tex;
}

/**
 * 3. Carpet Plush Fiber Normal Map
 */
export function getCarpetNormalTexture(): THREE.CanvasTexture {
  const cacheKey = 'carpet_plush_normal';
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const size = 256;
  const heightCanvas = document.createElement('canvas');
  heightCanvas.width = size;
  heightCanvas.height = size;
  const hCtx = heightCanvas.getContext('2d')!;

  hCtx.fillStyle = '#808080';
  hCtx.fillRect(0, 0, size, size);

  // Dense fiber stippling
  for (let i = 0; i < 4000; i++) {
    const rx = Math.floor(Math.random() * size);
    const ry = Math.floor(Math.random() * size);
    const rad = 1.0 + Math.random() * 2.0;
    const lum = Math.floor(60 + Math.random() * 140);
    hCtx.fillStyle = `rgb(${lum}, ${lum}, ${lum})`;
    hCtx.beginPath();
    hCtx.arc(rx, ry, rad, 0, Math.PI * 2);
    hCtx.fill();
  }

  const normalCanvas = heightmapToNormalMap(hCtx, size, size, 2.5);
  const tex = new THREE.CanvasTexture(normalCanvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 6);

  textureCache.set(cacheKey, tex);
  return tex;
}

/**
 * 4. Plaster Wall Micro-Texture Normal Map
 */
export function getWallNormalTexture(): THREE.CanvasTexture {
  const cacheKey = 'wall_plaster_normal';
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const size = 256;
  const heightCanvas = document.createElement('canvas');
  heightCanvas.width = size;
  heightCanvas.height = size;
  const hCtx = heightCanvas.getContext('2d')!;

  hCtx.fillStyle = '#808080';
  hCtx.fillRect(0, 0, size, size);

  // Fine stippled paint bumps
  for (let i = 0; i < 6000; i++) {
    const rx = Math.floor(Math.random() * size);
    const ry = Math.floor(Math.random() * size);
    const lum = Math.random() > 0.5 ? 160 : 96;
    hCtx.fillStyle = `rgb(${lum}, ${lum}, ${lum})`;
    hCtx.fillRect(rx, ry, 1, 1);
  }

  const normalCanvas = heightmapToNormalMap(hCtx, size, size, 1.2);
  const tex = new THREE.CanvasTexture(normalCanvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 8);

  textureCache.set(cacheKey, tex);
  return tex;
}

/**
 * 5. Soft Contact Shadow Radial Alpha Texture
 * Creates smooth ambient contact darkening underneath furniture pieces
 */
export function getContactShadowTexture(): THREE.CanvasTexture {
  const cacheKey = 'contact_shadow_radial';
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  const center = size / 2;
  const grad = ctx.createRadialGradient(center, center, 0, center, center, center * 0.95);
  grad.addColorStop(0.0, 'rgba(15, 23, 42, 0.75)'); // Dark slate center
  grad.addColorStop(0.4, 'rgba(15, 23, 42, 0.45)');
  grad.addColorStop(0.7, 'rgba(15, 23, 42, 0.18)');
  grad.addColorStop(1.0, 'rgba(15, 23, 42, 0.0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);

  const tex = new THREE.CanvasTexture(canvas);
  textureCache.set(cacheKey, tex);
  return tex;
}
