import * as THREE from "https://unpkg.com/three@0.166.1/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.166.1/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
60,
window.innerWidth/window.innerHeight,
0.1,
5000
);

camera.position.z = 80;

const renderer = new THREE.WebGLRenderer({
canvas:document.getElementById("universo"),
antialias:true
});

renderer.setSize(window.innerWidth,window.innerHeight);

renderer.setPixelRatio(window.devicePixelRatio);

const controls = new OrbitControls(
camera,
renderer.domElement
);

controls.enableDamping=true;

controls.enablePan=false;

controls.enableZoom=true;

controls.rotateSpeed=.35;

window.addEventListener("resize",()=>{

camera.aspect=window.innerWidth/window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(window.innerWidth,window.innerHeight);

});

function animate(){

requestAnimationFrame(animate);

controls.update();

renderer.render(scene,camera);

}

animate();
