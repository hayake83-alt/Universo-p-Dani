/* ===========================================================
   UNIVERSO PARA DANI ❤️
   MÓDULO 1
   CONFIGURACIÓN GLOBAL
   =========================================================== */

/* ===========================================================
   COLORES DEL UNIVERSO
   =========================================================== */

export const COLORS = {

    background: 0x020308,

    star: 0xffffff,

    blueNebula: 0x4f8cff,

    redNebula: 0xff4b7d,

    violetNebula: 0x7a5cff,

    galaxy: 0xd8e6ff,

    moon: 0xe7ecff,

    comet: 0xbfe7ff,

    glow: 0xffffff

};


/* ===========================================================
   CONFIGURACIÓN GENERAL
   =========================================================== */

export const SETTINGS = {

    /* ---------- Estrellas ---------- */

    stars: 20000,

    interactiveStars: 150,

    starSize: 1.4,

    starFieldRadius: 1800,



    /* ---------- Galaxias ---------- */

    galaxies: 2,

    galaxyRadius: 1300,



    /* ---------- Nebulosas ---------- */

    nebulas: 8,



    /* ---------- Planetas ---------- */

    planets: 6,



    /* ---------- Cometas ---------- */

    comets: 5,



    /* ---------- Partículas ---------- */

    particles: 4000,



    /* ---------- Render ---------- */

    antialias: true,

    shadows: false,

    pixelRatio: Math.min(window.devicePixelRatio,2),



    /* ---------- Cámara ---------- */

    fov:60,

    near:0.1,

    far:6000,

    cameraStartZ:220



};


/* ===========================================================
   VELOCIDADES
   =========================================================== */

export const SPEED = {

    universe:0.00003,

    stars:0.00005,

    galaxy:0.00002,

    nebulas:0.00004,

    planets:0.0015,

    moon:0.003,

    particles:0.00008,

    comets:1.0,

    shootingStars:2.0

};



/* ===========================================================
   CURSOR
   =========================================================== */

export const CURSOR = {

    x:0,

    y:0,

    targetX:0,

    targetY:0

};



/* ===========================================================
   MOUSE
   =========================================================== */

export const MOUSE = {

    x:0,

    y:0

};



/* ===========================================================
   ESTADO DEL UNIVERSO
   =========================================================== */

export const STATE = {

    elapsedTime:0,

    introFinished:false,

    interactionEnabled:false,

    universeRotation:0

};



/* ===========================================================
   CONTENEDORES
   =========================================================== */

export const OBJECTS = {

    stars:[],

    interactiveStars:[],

    galaxies:[],

    nebulas:[],

    planets:[],

    particles:[],

    comets:[],

    shootingStars:[]

};



/* ===========================================================
   MENSAJES
   =========================================================== */

export const STAR_MESSAGES = [

    "Algunas luces permanecen incluso en la distancia.",

    "Hay personas que hacen más brillante el universo.",

    "Siempre existe una estrella esperando ser encontrada.",

    "El cielo también sabe guardar recuerdos.",

    "Feliz cumpleaños, Dani ❤️"

];



/* ===========================================================
   INFORMACIÓN
   =========================================================== */

console.log("%c✔ Configuración cargada",
"color:#6bb6ff;font-size:14px;");
/* ===========================================================
   UNIVERSO PARA DANI ❤️
   MÓDULO 2
   SCENE.JS
   Motor gráfico del universo
   =========================================================== */

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import {
    SETTINGS,
    COLORS
} from "./config.js";

/* ===========================================================
   CANVAS
   =========================================================== */

const canvas = document.getElementById("universo");

/* ===========================================================
   ESCENA
   =========================================================== */

export const scene = new THREE.Scene();

scene.background = new THREE.Color(COLORS.background);

/* Una ligera niebla dará sensación de profundidad */

scene.fog = new THREE.FogExp2(
    COLORS.background,
    0.00035
);

/* ===========================================================
   CÁMARA
   =========================================================== */

export const camera = new THREE.PerspectiveCamera(

    SETTINGS.fov,

    window.innerWidth /
    window.innerHeight,

    SETTINGS.near,

    SETTINGS.far

);

camera.position.set(

    0,
    8,
    SETTINGS.cameraStartZ

);

/* ===========================================================
   RENDERER
   =========================================================== */

export const renderer = new THREE.WebGLRenderer({

    canvas,

    antialias: SETTINGS.antialias,

    alpha: false,

    powerPreference: "high-performance"

});

renderer.setSize(

    window.innerWidth,

    window.innerHeight

);

renderer.setPixelRatio(

    SETTINGS.pixelRatio

);

renderer.outputColorSpace =
THREE.SRGBColorSpace;

renderer.shadowMap.enabled =
SETTINGS.shadows;

/* ===========================================================
   CONTROLES
   =========================================================== */

export const controls =
new OrbitControls(

    camera,

    renderer.domElement

);

controls.enableDamping = true;

controls.enablePan = false;

controls.enableZoom = true;

controls.enableRotate = true;

controls.rotateSpeed = 0.25;

controls.zoomSpeed = 0.7;

controls.dampingFactor = 0.04;

controls.minDistance = 60;

controls.maxDistance = 450;

/* ===========================================================
   CLOCK
   =========================================================== */

export const clock =
new THREE.Clock();

/* ===========================================================
   RAYCASTER
   =========================================================== */

export const raycaster =
new THREE.Raycaster();

/* ===========================================================
   MOUSE
   =========================================================== */

export const mouse =
new THREE.Vector2();

/* ===========================================================
   UNIVERSO PRINCIPAL
   =========================================================== */

export const universe =
new THREE.Group();

scene.add(
    universe
);

/* ===========================================================
   GRUPOS
   =========================================================== */

export const starsGroup =
new THREE.Group();

export const galaxyGroup =
new THREE.Group();

export const nebulaGroup =
new THREE.Group();

export const planetsGroup =
new THREE.Group();

export const particlesGroup =
new THREE.Group();

export const effectsGroup =
new THREE.Group();

/* ===========================================================
   AGREGAR AL UNIVERSO
   =========================================================== */

universe.add(
    starsGroup
);

universe.add(
    galaxyGroup
);

universe.add(
    nebulaGroup
);

universe.add(
    planetsGroup
);

universe.add(
    particlesGroup
);

universe.add(
    effectsGroup
);

/* ===========================================================
   LUCES
   =========================================================== */

export const ambientLight =
new THREE.AmbientLight(

    0xffffff,

    1.2

);

scene.add(
    ambientLight
);

export const directionalLight =
new THREE.DirectionalLight(

    0xffffff,

    1.4

);

directionalLight.position.set(

    120,

    250,

    120

);

scene.add(
    directionalLight);

/* ===========================================================
   REDIMENSIONAR
   =========================================================== */

window.addEventListener(

    "resize",

    () => {

        camera.aspect =

        window.innerWidth /

        window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

        renderer.setPixelRatio(

            Math.min(

                window.devicePixelRatio,

                2

            )

        );

    }

);

/* ===========================================================
   INFORMACIÓN
   =========================================================== */

console.log(

"%c✔ Motor gráfico cargado",

"color:#78d6ff;font-size:14px;"

);
/* ===========================================================
   UNIVERSO PARA DANI ❤️
   MÓDULO 3
   UTILS.JS
   Biblioteca de utilidades
   =========================================================== */

import * as THREE from "three";

/* ===========================================================
   NÚMEROS ALEATORIOS
   =========================================================== */

export function random(min, max) {

    return Math.random() * (max - min) + min;

}

export function randomInt(min, max) {

    return Math.floor(random(min, max + 1));

}

export function randomSign() {

    return Math.random() < 0.5 ? -1 : 1;

}

/* ===========================================================
   INTERPOLACIÓN
   =========================================================== */

export function lerp(start, end, amount) {

    return start + (end - start) * amount;

}

export function inverseLerp(a, b, value) {

    return (value - a) / (b - a);

}

export function remap(value, inMin, inMax, outMin, outMax) {

    return lerp(
        outMin,
        outMax,
        inverseLerp(inMin, inMax, value)
    );

}

/* ===========================================================
   LIMITES
   =========================================================== */

export function clamp(value, min, max) {

    return Math.min(
        Math.max(value, min),
        max
    );

}

/* ===========================================================
   ÁNGULOS
   =========================================================== */

export function degrees(value) {

    return value * Math.PI / 180;

}

export function radians(value) {

    return value * 180 / Math.PI;

}

/* ===========================================================
   DISTANCIA
   =========================================================== */

export function distance3D(a, b) {

    return a.distanceTo(b);

}

/* ===========================================================
   VECTOR ALEATORIO
   =========================================================== */

export function randomVector3(radius = 100) {

    return new THREE.Vector3(

        random(-radius, radius),

        random(-radius, radius),

        random(-radius, radius)

    );

}

/* ===========================================================
   POSICIÓN ESFÉRICA
   =========================================================== */

export function randomSpherePoint(radius) {

    const theta = Math.random() * Math.PI * 2;

    const phi = Math.acos(
        2 * Math.random() - 1
    );

    return new THREE.Vector3(

        radius * Math.sin(phi) * Math.cos(theta),

        radius * Math.sin(phi) * Math.sin(theta),

        radius * Math.cos(phi)

    );

}

/* ===========================================================
   COLOR
   =========================================================== */

export function randomColor(colors) {

    return colors[
        randomInt(0, colors.length - 1)
    ];

}

/* ===========================================================
   SUAVIZADO
   =========================================================== */

export function smoothStep(edge0, edge1, x) {

    x = clamp(

        (x - edge0) / (edge1 - edge0),

        0,

        1

    );

    return x * x * (3 - 2 * x);

}

/* ===========================================================
   OSCILACIÓN
   =========================================================== */

export function pingPong(time, length) {

    time = time % (length * 2);

    return length - Math.abs(time - length);

}

/* ===========================================================
   RANGO
   =========================================================== */

export function insideRange(value, min, max) {

    return value >= min && value <= max;

}

/* ===========================================================
   FORMATO
   =========================================================== */

export function round(value, decimals = 2) {

    return Number(

        value.toFixed(decimals)

    );

}

/* ===========================================================
   TIEMPO
   =========================================================== */

export function seconds(ms) {

    return ms / 1000;

}

/* ===========================================================
   CREAR COLOR THREE
   =========================================================== */

export function color(hex) {

    return new THREE.Color(hex);

}

/* ===========================================================
   ESPERA
   =========================================================== */

export function wait(time) {

    return new Promise(resolve => {

        setTimeout(resolve, time);

    });

}

/* ===========================================================
   UUID SIMPLE
   =========================================================== */

export function uid() {

    return Math.random()

        .toString(36)

        .substring(2, 12);

}

/* ===========================================================
   DEBUG
   =========================================================== */

export function debug(text) {

    console.log(

        `%c${text}`,

        "color:#78d6ff;font-weight:bold;"

    );

}

debug("✔ Utils cargado correctamente");
/* ===========================================================
   UNIVERSO PARA DANI ❤️
   MÓDULO 4
   MAIN.JS

   Punto de entrada del proyecto
   =========================================================== */

/* ===========================================================
   IMPORTACIONES
   =========================================================== */

import {
    scene,
    camera,
    renderer,
    controls,
    clock,
    universe
} from "./scene.js";

import {
    debug
} from "./utils.js";

import {
    SETTINGS
} from "./config.js";

/* ===========================================================
   VARIABLES GLOBALES
   =========================================================== */

let initialized = false;

/* ===========================================================
   FUNCIÓN DE INICIALIZACIÓN
   =========================================================== */

function initializeUniverse() {

    if (initialized) return;

    initialized = true;

    debug("Inicializando Universo...");

    console.log(
        "%c✔ Universo iniciado",
        "color:#6de6ff;font-size:14px;"
    );

}

/* ===========================================================
   ACTUALIZACIÓN
   =========================================================== */

function update(deltaTime, elapsedTime) {

    // Movimiento extremadamente lento
    // para que el universo nunca esté
    // completamente inmóvil.

    universe.rotation.y += 0.00002;

}

/* ===========================================================
   RENDER
   =========================================================== */

function render() {

    renderer.render(
        scene,
        camera
    );

}

/* ===========================================================
   LOOP PRINCIPAL
   =========================================================== */

import {

    startAnimation

} from "./animation.js";

initializeUniverse();

animate();
/* ===========================================================
   UNIVERSO PARA DANI ❤️
   MÓDULO 5
   CAMERA.JS

   Control cinematográfico de la cámara
   =========================================================== */

import * as THREE from "three";

import {

    camera,
    controls

} from "./scene.js";

import {

    CURSOR,
    SPEED

} from "./config.js";

import {

    lerp

} from "./utils.js";

/* ===========================================================
   CLASE
   =========================================================== */

class UniverseCamera {

    constructor() {

        this.target = new THREE.Vector3(
            0,
            0,
            0
        );

        this.initialPosition = new THREE.Vector3(
            camera.position.x,
            camera.position.y,
            camera.position.z
        );

        this.floatTime = 0;

        this.enabled = true;

    }

    /* =======================================================
       Movimiento automático
       ======================================================= */

    idle(delta) {

        if (!this.enabled) return;

        this.floatTime += delta;

        camera.position.x =
            this.initialPosition.x +
            Math.sin(this.floatTime * 0.18) * 3;

        camera.position.y =
            this.initialPosition.y +
            Math.cos(this.floatTime * 0.14) * 2;

        camera.lookAt(this.target);

    }

    /* =======================================================
       Seguimiento del cursor
       ======================================================= */

    followCursor() {

        camera.position.x = lerp(

            camera.position.x,

            this.initialPosition.x +
            CURSOR.x * 8,

            0.02

        );

        camera.position.y = lerp(

            camera.position.y,

            this.initialPosition.y +
            CURSOR.y * 5,

            0.02

        );

    }

    /* =======================================================
       Zoom suave
       ======================================================= */

    zoom(value) {

        camera.position.z = lerp(

            camera.position.z,

            value,

            0.03

        );

    }

    /* =======================================================
       Actualización
       ======================================================= */

    update(delta) {

        controls.update();

        this.idle(delta);

        this.followCursor();

    }

}

/* ===========================================================
   INSTANCIA
   =========================================================== */

export const universeCamera =
new UniverseCamera();
/* ===========================================================
   UNIVERSO PARA DANI ❤️
   MÓDULO 6
   ANIMATION.JS

   Motor de actualización del universo
   =========================================================== */

/* ===========================================================
   IMPORTACIONES
   =========================================================== */

import {

    renderer,
    scene,
    camera,
    clock

} from "./scene.js";

/* ===========================================================
   SISTEMA DE ACTUALIZACIÓN
   =========================================================== */

const updatables = [];

/* ===========================================================
   REGISTRAR OBJETOS
   =========================================================== */

export function register(object){

    if(
        object &&
        typeof object.update === "function"
    ){

        updatables.push(object);

    }

}

/* ===========================================================
   ELIMINAR OBJETOS
   =========================================================== */

export function unregister(object){

    const index =
    updatables.indexOf(object);

    if(index !== -1){

        updatables.splice(index,1);

    }

}

/* ===========================================================
   ACTUALIZAR TODOS
   =========================================================== */

function update(delta,time){

    for(const object of updatables){

        object.update(delta,time);

    }

}

/* ===========================================================
   RENDER
   =========================================================== */

function render(){

    renderer.render(

        scene,

        camera

    );

}

/* ===========================================================
   LOOP PRINCIPAL
   =========================================================== */

export function startAnimation(){

    renderer.setAnimationLoop(()=>{

        const delta =
        clock.getDelta();

        const elapsed =
        clock.getElapsedTime();

        update(

            delta,

            elapsed

        );

        render();

    });

}

/* ===========================================================
   DETENER
   =========================================================== */

export function stopAnimation(){

    renderer.setAnimationLoop(null);

}

/* ===========================================================
   DEBUG
   =========================================================== */

console.log(

"%c✔ Animation Engine listo",

"color:#8fd4ff;font-size:14px;"

);
