import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const canvas = document.getElementById('scene');

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x05070d);


const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(8, 6, 12);


const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);


const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;

controls.dampingFactor = 0.05;

controls.minDistance = 5;

controls.maxDistance = 30;


const ambientLight = new THREE.AmbientLight(
    0xffffff,
    1.5
);

scene.add(ambientLight);


const pointLight = new THREE.PointLight(
    0xffffff,
    70
);

pointLight.position.set(5, 8, 6);

scene.add(pointLight);


const planetGeometry = new THREE.SphereGeometry(
    2.4,
    32,
    32
);

const planetMaterial = new THREE.MeshStandardMaterial({
    color: 0x5267d9,
    roughness: 0.7,
    metalness: 0.1
});

const planet = new THREE.Mesh(
    planetGeometry,
    planetMaterial
);

scene.add(planet);


const moonGeometry = new THREE.SphereGeometry(
    0.6,
    24,
    24
);

const moonMaterial = new THREE.MeshStandardMaterial({
    color: 0xb7bcc7,
    roughness: 1
});

const moon = new THREE.Mesh(
    moonGeometry,
    moonMaterial
);

moon.position.set(4.5, 0, 0);

scene.add(moon);


const ringGeometry = new THREE.TorusGeometry(
    3.8,
    0.05,
    16,
    100
);

const ringMaterial = new THREE.MeshBasicMaterial({
    color: 0x7d89ff
});

const ring = new THREE.Mesh(
    ringGeometry,
    ringMaterial
);

ring.rotation.x = Math.PI / 2.6;

scene.add(ring);


const cubeGeometry = new THREE.BoxGeometry(
    1,
    1,
    1
);

const cubeMaterial = new THREE.MeshStandardMaterial({
    color: 0xd5ff62,
    roughness: 0.5
});

const cube = new THREE.Mesh(
    cubeGeometry,
    cubeMaterial
);

cube.position.set(-4, 2.5, -1);

scene.add(cube);


const starGeometry = new THREE.BufferGeometry();

const starCount = 700;

const positions = [];

for (let i = 0; i < starCount; i++) {

    const x = (Math.random() - 0.5) * 80;
    const y = (Math.random() - 0.5) * 80;
    const z = (Math.random() - 0.5) * 80;

    positions.push(x, y, z);
}

starGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 3)
);

const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.08
});

const stars = new THREE.Points(
    starGeometry,
    starMaterial
);

scene.add(stars);


const loader = new GLTFLoader();

let truck;

loader.load(

    'models/truck.glb',

    function(gltf) {

        truck = gltf.scene;

        truck.position.set(4, -2, 0);

        truck.scale.set(0.7, 0.7, 0.7);

        scene.add(truck);

    },

    undefined,

    function(error) {

        console.error(error);

    }

);


let angle = 0;


function animate() {

    requestAnimationFrame(animate);

    planet.rotation.y += 0.003;

    ring.rotation.z += 0.002;

    cube.rotation.x += 0.01;

    cube.rotation.y += 0.012;


    angle += 0.01;

    moon.position.x = Math.cos(angle) * 4.5;

    moon.position.z = Math.sin(angle) * 4.5;


    if (truck) {

        truck.rotation.y += 0.004;

    }


    stars.rotation.y += 0.0002;


    controls.update();

    renderer.render(scene, camera);

}


animate();


window.addEventListener('resize', function() {

    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});