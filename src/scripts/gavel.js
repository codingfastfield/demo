// gavel.js

import * as THREE from "three";
import { TDSLoader } from "three/examples/jsm/loaders/TDSLoader.js";

export function initGavel() {
  const canvas = document.getElementById("gavelCanvas");
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x111111, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 50, 150);

  // Lights
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(50, 100, 100).normalize();
  scene.add(light);
  scene.add(new THREE.AmbientLight(0x404040, 2));

  // Debug cube
  const geometry = new THREE.BoxGeometry(20, 20, 20);
  const material = new THREE.MeshNormalMaterial();
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();

  // Load gavel model
  const loader = new TDSLoader();
  loader.load("/models/Labor.3DS", (object) => {
    object.scale.set(0.5, 0.5, 0.5);
    object.position.y = -30;
    scene.add(object);
  });

  // Resize handling
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}
