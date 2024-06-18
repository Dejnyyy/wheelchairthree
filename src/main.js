import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Scene, camera, and renderer setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Orbit controls
const controls = new OrbitControls(camera, renderer.domElement);

// Add lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5).normalize();
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
scene.add(ambientLight);

// Basic Wheelchair Model
const wheelchair = new THREE.Group();

// Create the seat
const seatGeometry = new THREE.BoxGeometry(1, 0.1, 1);
const seatMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const seat = new THREE.Mesh(seatGeometry, seatMaterial);
seat.position.set(0, 0.5, 0);
wheelchair.add(seat);

// Create the backrest
const backrestGeometry = new THREE.BoxGeometry(1, 1, 0.1);
const backrestMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
const backrest = new THREE.Mesh(backrestGeometry, backrestMaterial);
backrest.position.set(0, 1, -0.45);
wheelchair.add(backrest);

// Create the large wheels
const largeWheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.1, 32);
const largeWheelMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
const largeWheel1 = new THREE.Mesh(largeWheelGeometry, largeWheelMaterial);
largeWheel1.rotation.z = Math.PI / 2;
largeWheel1.position.set(-0.6, 0.25, 0.5);

const largeWheel2 = largeWheel1.clone();
largeWheel2.position.set(0.6, 0.25, 0.5);

wheelchair.add(largeWheel1);
wheelchair.add(largeWheel2);

// Create the small wheels
const smallWheelGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.05, 32);
const smallWheelMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
const smallWheel1 = new THREE.Mesh(smallWheelGeometry, smallWheelMaterial);
smallWheel1.rotation.z = Math.PI / 2;
smallWheel1.position.set(-0.5, 0.1, -0.5);

const smallWheel2 = smallWheel1.clone();
smallWheel2.position.set(0.5, 0.1, -0.5);

wheelchair.add(smallWheel1);
wheelchair.add(smallWheel2);

scene.add(wheelchair);

camera.position.z = 5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    wheelchair.rotation.y += 0.01;

    controls.update();

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
