import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';

/**
 * Card Class - Creates a 3D card with glassmorphism effect
 * Encapsulates all card logic for reusability
 */
export class Card {
  constructor(config) {
    this.config = {
      // Default values
      width: 2.5,
      height: 3.5,
      depth: 0.1,
      radius: 0.1,          // Corner radius
      color: 0x000000,      // Base color
      opacity: 0.3,         // Transparency (0-1)
      transmission: 0.9,    // Glass transmission
      roughness: 0.1,       // Surface roughness
      metalness: 0.05,      // Metallic property
      thickness: 0.5,       // Glass thickness
      ior: 1.5,             // Index of refraction
      clearcoat: 1.0,       // Glossy coating
      clearcoatRoughness: 0.1,
      position: { x: 0, y: 0, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
      ...config  // Override with provided config
    };

    this.mesh = null;
    this.geometry = null;
    this.material = null;
    
    this.create();
  }

  /**
   * Creates the card mesh with glassmorphism effect
   */
  create() {
    // Use RoundedBoxGeometry for rounded edges
    this.geometry = new RoundedBoxGeometry(
      this.config.width,
      this.config.height,
      this.config.depth,
      4,  // Segments for width/height/depth
      this.config.radius  // Corner radius
    );

    // MeshPhysicalMaterial for advanced glass effects
    this.material = new THREE.MeshPhysicalMaterial({
      color: this.config.color,
      transparent: true,
      opacity: this.config.opacity,
      transmission: this.config.transmission,  // Glass-like transparency
      roughness: this.config.roughness,
      metalness: this.config.metalness,
      thickness: this.config.thickness,
      ior: this.config.ior,  // Index of refraction (glass = ~1.5)
      clearcoat: this.config.clearcoat,
      clearcoatRoughness: this.config.clearcoatRoughness,
      side: THREE.DoubleSide,
      // Enable reflection/refraction
      envMapIntensity: 1.0,
    });

    // Create the mesh
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    // Set position
    this.mesh.position.set(
      this.config.position.x,
      this.config.position.y,
      this.config.position.z
    );

    // Set rotation (convert degrees to radians)
    this.mesh.rotation.x = this.config.rotation.x * (Math.PI / 180);
    this.mesh.rotation.y = this.config.rotation.y * (Math.PI / 180);
    this.mesh.rotation.z = this.config.rotation.z * (Math.PI / 180);
  }

  /**
   * Update card rotation
   */
  setRotation(x, y, z) {
    if (this.mesh) {
      this.mesh.rotation.x = x * (Math.PI / 180);
      this.mesh.rotation.y = y * (Math.PI / 180);
      this.mesh.rotation.z = z * (Math.PI / 180);
    }
  }

  /**
   * Update card position
   */
  setPosition(x, y, z) {
    if (this.mesh) {
      this.mesh.position.set(x, y, z);
    }
  }

  /**
   * Update material properties
   */
  updateMaterial(properties) {
    if (this.material) {
      Object.assign(this.material, properties);
    }
  }

  /**
   * Get the Three.js mesh
   */
  getMesh() {
    return this.mesh;
  }

  /**
   * Cleanup/dispose
   */
  dispose() {
    if (this.geometry) this.geometry.dispose();
    if (this.material) this.material.dispose();
  }
}