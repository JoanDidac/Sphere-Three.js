import * as THREE from 'three';
import { gsap } from 'gsap';

let sceneCubes = new THREE.Scene();

// let cameraCubes = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// cameraCubes.position.z = 5;
let cubeSection = document.querySelector('#cube-section');

let cameraCubes = new THREE.PerspectiveCamera(75, cubeSection.offsetWidth / cubeSection.offsetHeight, 0.1, 1000);
cameraCubes.position.z = 6.6;

let canvasCubeDiv = document.querySelector('.webgl-Cubes');
// canvasCubeDiv.appendChild(rendererCubes.domElement);
let cubeDiv = document.querySelector('#canvas-cube');

let rendererCubes = new THREE.WebGLRenderer({ canvas: canvasCubeDiv, antialias: true });
rendererCubes.setClearColor("#F2F0EB");
rendererCubes.setSize(cubeSection.offsetWidth, cubeSection.offsetHeight);

window.addEventListener('resize', () => {
    // rendererCubes.setSize(cubeDiv.offsetWidth, cubeDiv.offsetHeight);
    // cameraCubes.aspect = cubeDiv.offsetWidth / cubeDiv.offsetHeight;
    rendererCubes.setSize(cubeSection.offsetWidth, cubeSection.offsetHeight);
    cameraCubes.aspect = cubeSection.offsetWidth / cubeSection.offsetHeight;

    cameraCubes.updateProjectionMatrix();
})

let raycaster = new THREE.Raycaster();
let mouseCubes = new THREE.Vector2();

let geometryCubes = new THREE.BoxGeometry(1, 1, 1);
let materialCubes = new THREE.MeshLambertMaterial({ color: 0xe0fed7 });
let meshCubes = new THREE.Mesh(geometryCubes, materialCubes);

sceneCubes.add(meshCubes);

for(let i = 0; i<115;i++) {
    let mesh = new THREE.Mesh(geometryCubes, materialCubes);
    mesh.position.x = (Math.random() - 0.5) * 10;
    mesh.position.y = (Math.random() - 0.5) * 10;
    mesh.position.z = (Math.random() - 0.5) * 10;
    sceneCubes.add(mesh);
}

let lightCubes = new THREE.PointLight(0xf4fed7, 1.3, 1000);
lightCubes.position.set(0,1,5);
sceneCubes.add(lightCubes);

let renderCubes = function() {
    requestAnimationFrame(renderCubes);
    rendererCubes.render(sceneCubes, cameraCubes);
}

function onMouseMoveCubes(event) {
    event.preventDefault();

    mouseCubes.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouseCubes.y = - (event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouseCubes, cameraCubes);

    let intersects = raycaster.intersectObjects(sceneCubes.children, true);
    for (let i = 0; i < intersects.length; i++) {
        let tl = gsap.timeline();
        tl.to(intersects[i].object.scale, {duration: 1, x: 2, ease: "expo.out"});
        // tl.to(intersects[i].object.scale, {duration: .5, x: 3, ease: "expo.out"});
        tl.to(intersects[i].object.position, {duration: 2, x: 2.8, ease: "expo.out"});
        tl.to(intersects[i].object.rotation, {duration: 5, y: Math.PI*.5, ease: "expo.out"});
    }
}

window.addEventListener('mousemove', onMouseMoveCubes);
renderCubes();