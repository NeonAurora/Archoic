import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import DebugControls from './DebugControls';
import { Card } from '../../utils/Card';
import { cardConfigs } from '../../utils/CardData';
import { setupSMAA, updateComposerSize } from '../../utils/PostProcessing';

export default function ThreeScene() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const composerRef = useRef(null);
  const frameIdRef = useRef(null);
  const baseCardRef = useRef(null);
  const cardInstanceRef = useRef(null);

  const [rotation, setRotation] = useState({ 
    x: cardConfigs.baseCard.rotation.x, 
    y: cardConfigs.baseCard.rotation.y, 
    z: cardConfigs.baseCard.rotation.z 
  });

  useEffect(() => {
    if (!containerRef.current) return;

    // ===== CONFIGURATION VARIABLES (Easy Tweaking) =====
    const CONFIG = {
      // Camera Settings
      cameraZ: 6,
      cameraFOV: 50,
      
      // Ambient Light (Overall base brightness)
      ambientLightIntensity: 0.4,  // Reduced - let directional light dominate
      
      // DIRECTIONAL LIGHT (Sunlight - parallel rays from infinity)
      // This is the main light that illuminates the entire surface
      directionalLightIntensity: 5.0,  // Increased for strong illumination
      directionalLightDirection: {
        x: 1,   // Light direction vector (NOT position)
        y: 2,   // Positive Y = light from above
        z: 1    // Positive Z = light from front
      },
      // How to read direction: Light comes FROM the opposite direction
      // Example: {x:1, y:2, z:1} means light comes from top-right-front
      
      // Point Lights (Local light sources - for later use)
      pointLight1Intensity: 0.3,  // Reduced - kept for future use
      pointLight1Position: { x: -5, y: 3, z: 3 },
      pointLight2Intensity: 0.3,  // Reduced - kept for future use
      pointLight2Position: { x: 5, y: -3, z: 3 },
    };
    // ===== END CONFIGURATION =====

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      CONFIG.cameraFOV,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = CONFIG.cameraZ;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Setup SMAA post-processing
    const composer = setupSMAA(renderer, scene, camera);
    composerRef.current = composer;

    // Create Base Card
    const baseCard = new Card({
      ...cardConfigs.baseCard,
      rotation: { x: rotation.x, y: rotation.y, z: rotation.z }
    });
    
    cardInstanceRef.current = baseCard;
    baseCardRef.current = baseCard.getMesh();
    scene.add(baseCard.getMesh());

    // ===== LIGHTING SETUP =====
    
    // 1. Ambient Light - Soft overall illumination
    const ambientLight = new THREE.AmbientLight(0xffffff, CONFIG.ambientLightIntensity);
    scene.add(ambientLight);

    // 2. DIRECTIONAL LIGHT - Main sunlight (parallel rays from infinity)
    const directionalLight = new THREE.DirectionalLight(
      0xffffff, 
      CONFIG.directionalLightIntensity
    );
    
    // Set light direction (light comes FROM the opposite direction)
    directionalLight.position.set(
      CONFIG.directionalLightDirection.x,
      CONFIG.directionalLightDirection.y,
      CONFIG.directionalLightDirection.z
    );
    
    // Make it point at the origin (0,0,0) for consistent lighting
    directionalLight.target.position.set(0, 0, 0);
    scene.add(directionalLight);
    scene.add(directionalLight.target);

    // 3. Point Lights - Local highlights (kept for future use)
    const pointLight1 = new THREE.PointLight(0xffffff, CONFIG.pointLight1Intensity);
    pointLight1.position.set(
      CONFIG.pointLight1Position.x,
      CONFIG.pointLight1Position.y,
      CONFIG.pointLight1Position.z
    );
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xffffff, CONFIG.pointLight2Intensity);
    pointLight2.position.set(
      CONFIG.pointLight2Position.x,
      CONFIG.pointLight2Position.y,
      CONFIG.pointLight2Position.z
    );
    scene.add(pointLight2);

    // Render function
    function render() {
      composer.render();
    }
    render();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateComposerSize(composer, width, height);
      
      render();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (composerRef.current) {
        composerRef.current.dispose();
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (cardInstanceRef.current) {
        cardInstanceRef.current.dispose();
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update card rotation
  useEffect(() => {
    if (cardInstanceRef.current && composerRef.current && sceneRef.current && cameraRef.current) {
      cardInstanceRef.current.setRotation(rotation.x, rotation.y, rotation.z);
      composerRef.current.render();
    }
  }, [rotation]);

  const handleRotationChange = (newRotation) => {
    setRotation(newRotation);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '400px' }}>
      <div 
        ref={containerRef} 
        style={{ 
          width: '100%', 
          height: '100%',
          minHeight: '400px'
        }}
      />
      <DebugControls 
        onRotationChange={handleRotationChange} 
        initialRotation={rotation}
      />
    </div>
  );
}