/**
 * Card Data Configuration
 * 
 * This file contains all card definitions for the 3D card system.
 * Future expansion: "Idea" -> "Prototype" -> "Product" cards with sub-cards
 */

export const cardConfigs = {
  // Base card configuration (currently displayed)
  baseCard: {
    width: 3.5,
    height: 2.5,
    depth: 0.25,
    radius: 0.05,           // Rounded corner radius
    color: 0xefefef,        // White base
    opacity: 1,          // Slight transparency
    transmission: 0.9,     // High glass transmission for frosted effect
    roughness: 0.05,        // Very smooth for glossy look
    metalness: 0.1,        // Minimal metallic
    thickness: 0.8,         // Glass thickness for refraction
    ior: 1.5,              // Glass index of refraction
    clearcoat: 1.0,        // Full glossy coating
    clearcoatRoughness: 0.05, // Smooth clearcoat
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: -43, y: 14, z: 33 },
  },

  // Future: Three base cards for the full system
  ideaCard: {
    width: 2.5,
    height: 3.5,
    depth: 0.1,
    radius: 0.15,
    color: 0x60a5fa,        // Blue tint
    opacity: 0.3,
    transmission: 0.9,
    roughness: 0.05,
    metalness: 0.02,
    thickness: 0.8,
    ior: 1.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    position: { x: -4, y: 0, z: 0 },
    rotation: { x: 15, y: -25, z: 0 },
    label: "Idea",
  },

  prototypeCard: {
    width: 2.5,
    height: 3.5,
    depth: 0.1,
    radius: 0.15,
    color: 0x34d399,        // Green tint
    opacity: 0.3,
    transmission: 0.9,
    roughness: 0.05,
    metalness: 0.02,
    thickness: 0.8,
    ior: 1.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 15, y: -25, z: 0 },
    label: "Prototype",
  },

  productCard: {
    width: 2.5,
    height: 3.5,
    depth: 0.1,
    radius: 0.15,
    color: 0xf472b6,        // Pink tint
    opacity: 0.3,
    transmission: 0.9,
    roughness: 0.05,
    metalness: 0.02,
    thickness: 0.8,
    ior: 1.5,
    clearcoat: 1.0,
    clearcoatRoughness: 0.05,
    position: { x: 4, y: 0, z: 0 },
    rotation: { x: 15, y: -25, z: 0 },
    label: "Product",
  },
};

// Sub-card configurations (floating cards above each base)
export const subCardConfigs = {
  // These will float out from each base card
  idea: [
    // Sub-cards for "Idea" base card
    { label: "Research", position: { x: -4, y: 1, z: 0.5 } },
    { label: "Brainstorm", position: { x: -4, y: 1.5, z: 0.8 } },
    { label: "Validate", position: { x: -4, y: 2, z: 1.1 } },
  ],
  prototype: [
    // Sub-cards for "Prototype" base card
    { label: "Design", position: { x: 0, y: 1, z: 0.5 } },
    { label: "Build", position: { x: 0, y: 1.5, z: 0.8 } },
    { label: "Test", position: { x: 0, y: 2, z: 1.1 } },
  ],
  product: [
    // Sub-cards for "Product" base card
    { label: "Launch", position: { x: 4, y: 1, z: 0.5 } },
    { label: "Scale", position: { x: 4, y: 1.5, z: 0.8 } },
    { label: "Optimize", position: { x: 4, y: 2, z: 1.1 } },
  ],
};