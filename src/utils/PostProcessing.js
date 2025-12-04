import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';

export function setupSMAA(renderer, scene, camera) {
  const composer = new EffectComposer(renderer);
  
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);
  
  const smaaPass = new SMAAPass(
    window.innerWidth * window.devicePixelRatio,
    window.innerHeight * window.devicePixelRatio
  );
  composer.addPass(smaaPass);
  
  return composer;
}

export function updateComposerSize(composer, width, height) {
  composer.setSize(width, height);
  composer.setPixelRatio(window.devicePixelRatio);
}