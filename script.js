import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 5000);
camera.position.set(0, -250, 500);
camera.lookAt(0, -250, 0);
camera.updateProjectionMatrix();
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth * 0.7, (window.innerWidth * 0.7) * 0.7);
document.getElementById('viewer3D').appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Pour un mouvement fluide
controls.dampingFactor = 0.2;
controls.screenSpacePanning = false;
controls.enableZoom = true;
controls.minDistance = 0.5;
controls.maxDistance = 400; 
controls.enablePan = false;
controls.panSpeed = 10;
controls.zoomSpeed = 10.0;
  
let lightFront = new THREE.DirectionalLight(0xffffff, 0.5);
lightFront.position.set(1000, -1000, 1000);
scene.add(lightFront);

let lightBack = new THREE.DirectionalLight(0xffffff, 0.5);
lightBack.position.set(-1000, 1000, -1000);
scene.add(lightBack);
 
const loader = new GLTFLoader();
loader.load('xxx.gltf', function (gltf) {
    scene.add(gltf.scene);
}, undefined, function (error) {
    console.error("Erreur de chargement :", error);
});

function animate() {
    requestAnimationFrame(animate);
    console.log("Position de la caméra : ", camera.position);
    controls.update();
    renderer.render(scene, camera);
}

animate();

