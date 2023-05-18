import * as THREE from "three" ; 
import './stles.css'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'


const scene = new THREE.Scene();

//Add Sphere
const geometry = new THREE.SphereGeometry(3,64,64);
const material  = new THREE.MeshStandardMaterial({
    color:'#00ff84',
})
const mesh = new THREE.Mesh(geometry,material);

scene.add(mesh)


//Light 
const light = new THREE.PointLight(0xffffff, 1, 100)
light.position.set(0,10,10)
scene.add(light)


//Sizes
const sizes = {
    height:window.innerHeight,
    width:window.innerWidth,

}

//Add camera
const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 20
scene.add(camera)



//Rendered
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(sizes.width , sizes.height )
renderer.render(scene,camera)


//Controls
const controls = new OrbitControls(camera,canvas)



//Resizing
window.addEventListener('resize' , () => {
    //Update Size
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    //Update Camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize( sizes.width, sizes.height)
})

const loop = () => {
    
    renderer.render(scene,camera)
    window.requestAnimationFrame(loop)
}
loop()