/*==========================================================
                    UNIVERSO PARA DANI ❤️
                Proyecto creado con Three.js
============================================================

Autor: Alan + ChatGPT

Este archivo contiene todo el funcionamiento del universo.

Cada sección está separada por módulos para facilitar
su mantenimiento.

==========================================================*/





/*==========================================================
                    MÓDULO 1

            IMPORTACIONES Y CONFIGURACIÓN

¿Qué hace?
-----------

Importa todas las librerías necesarias y define las
constantes globales del proyecto.

Ningún otro módulo volverá a importar librerías.

==========================================================*/

import * as THREE from "https://unpkg.com/three@0.166.1/build/three.module.js";

import { OrbitControls }

from "https://unpkg.com/three@0.166.1/examples/jsm/controls/OrbitControls.js";



/*==========================================================
                    CONFIGURACIÓN GENERAL
==========================================================*/

const CONFIG = {

    /* Render */

    antialias: true,

    alpha: false,

    powerPreference: "high-performance",



    /* Cámara */

    fov: 60,

    near: 0.1,

    far: 6000,



    cameraStart: {

        x: 0,

        y: 5,

        z: 220

    },



    /* Universo */

    background: 0x010104,



    /* Calidad */

    pixelRatio:

        Math.min(window.devicePixelRatio, 2),



    /* FPS */

    targetFPS: 60,



    /* Movimiento */

    damping: 0.05

};





/*==========================================================
                CONFIGURACIÓN DEL UNIVERSO
==========================================================*/

const UNIVERSE = {

    stars: 20000,

    galaxies: 3,

    nebulas: 8,

    planets: 6,

    moons: 2,

    particles: 5000,

    comets: 5,

    shootingStars: 2

};





/*==========================================================
                        COLORES
==========================================================*/

const COLORS = {

    white: 0xffffff,

    blue: 0x70a9ff,

    red: 0xff5f7a,

    violet: 0xa176ff,

    galaxy: 0xcfe3ff,

    moon: 0xe8ebff,

    comet: 0xc5ecff,

    background: 0x010104

};





/*==========================================================
                VELOCIDADES DE ANIMACIÓN
==========================================================*/

const SPEED = {

    universe: 0.00002,

    stars: 0.00005,

    galaxy: 0.00003,

    nebulas: 0.00005,

    planets: 0.001,

    moon: 0.002,

    particles: 0.00008,

    comet: 0.04,

    intro: 0.25

};





/*==========================================================
                    MENSAJES OCULTOS
==========================================================*/

const SECRET_MESSAGES = [

    "Feliz cumpleaños, Dani ❤️",

    "Siempre habrá una estrella para ti.",

    "El universo también guarda recuerdos.",

    "Hay lugares infinitos... y aun así elegiría estar contigo.",

    "Gracias por existir."

];





/*==========================================================
                    INFORMACIÓN
==========================================================*/

console.log(

"%c✔ Módulo 1 cargado correctamente",

"color:#7ec8ff;font-size:15px;font-weight:bold;"

);
/*==========================================================
                    MÓDULO 2

            MOTOR DEL UNIVERSO

¿Qué hace?
-----------

• Crea la escena
• Crea la cámara
• Crea el renderer
• Configura Three.js
• Configura OrbitControls
• Crea el reloj interno
• Crea el Raycaster
• Crea todos los grupos principales
• Configura el resize

Este módulo NO crea estrellas.

==========================================================*/





/*==========================================================
                VARIABLES GLOBALES
==========================================================*/

let scene;

let camera;

let renderer;

let controls;

let clock;

let raycaster;

let mouse;



/*==========================================================
                GRUPOS DEL UNIVERSO
==========================================================*/

let universeGroup;

let starsGroup;

let galaxyGroup;

let nebulaGroup;

let planetsGroup;

let particlesGroup;

let effectsGroup;

let constellationsGroup;



/*==========================================================
                INICIALIZAR ESCENA
==========================================================*/

function createScene(){

    scene = new THREE.Scene();

    scene.background = new THREE.Color(

        CONFIG.background

    );



    scene.fog = new THREE.FogExp2(

        CONFIG.background,

        0.00025

    );

}





/*==========================================================
                INICIALIZAR CÁMARA
==========================================================*/

function createCamera(){

    camera = new THREE.PerspectiveCamera(

        CONFIG.fov,

        window.innerWidth /

        window.innerHeight,

        CONFIG.near,

        CONFIG.far

    );



    camera.position.set(

        CONFIG.cameraStart.x,

        CONFIG.cameraStart.y,

        CONFIG.cameraStart.z

    );

}





/*==========================================================
                INICIALIZAR RENDERER
==========================================================*/

function createRenderer(){

    renderer = new THREE.WebGLRenderer({

        canvas:

        document.getElementById(

            "universo"

        ),

        antialias:

        CONFIG.antialias,

        alpha:

        CONFIG.alpha,

        powerPreference:

        CONFIG.powerPreference

    });



    renderer.setSize(

        window.innerWidth,

        window.innerHeight

    );



    renderer.setPixelRatio(

        CONFIG.pixelRatio

    );



    renderer.outputColorSpace =

    THREE.SRGBColorSpace;





    renderer.shadowMap.enabled=false;

}





/*==========================================================
                CONTROLES
==========================================================*/

function createControls(){

    controls = new OrbitControls(

        camera,

        renderer.domElement

    );



    controls.enablePan=false;

    controls.enableZoom=true;

    controls.enableRotate=true;



    controls.enableDamping=true;

    controls.dampingFactor=

    CONFIG.damping;



    controls.rotateSpeed=0.35;

    controls.zoomSpeed=0.6;



    controls.minDistance=60;

    controls.maxDistance=600;

}





/*==========================================================
                RELOJ
==========================================================*/

function createClock(){

    clock = new THREE.Clock();

}





/*==========================================================
                RAYCASTER
==========================================================*/

function createRaycaster(){

    raycaster =

    new THREE.Raycaster();





    mouse =

    new THREE.Vector2();

}





/*==========================================================
                GRUPOS
==========================================================*/

function createGroups(){

    universeGroup=

    new THREE.Group();



    starsGroup=

    new THREE.Group();



    galaxyGroup=

    new THREE.Group();



    nebulaGroup=

    new THREE.Group();



    planetsGroup=

    new THREE.Group();



    particlesGroup=

    new THREE.Group();



    effectsGroup=

    new THREE.Group();



    constellationsGroup=

    new THREE.Group();





    universeGroup.add(

        starsGroup

    );



    universeGroup.add(

        galaxyGroup

    );



    universeGroup.add(

        nebulaGroup

    );



    universeGroup.add(

        planetsGroup

    );



    universeGroup.add(

        particlesGroup

    );



    universeGroup.add(

        effectsGroup

    );



    universeGroup.add(

        constellationsGroup

    );



    scene.add(

        universeGroup

    );

}





/*==========================================================
                LUCES
==========================================================*/

function createLights(){

    const ambient=

    new THREE.AmbientLight(

        0xffffff,

        1.4

    );



    scene.add(

        ambient

    );





    const directional=

    new THREE.DirectionalLight(

        0xffffff,

        0.4

    );



    directional.position.set(

        80,

        200,

        100

    );



    scene.add(

        directional

    );

}





/*==========================================================
                RESIZE
==========================================================*/

function resize(){



    camera.aspect=

    window.innerWidth/

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





window.addEventListener(

    "resize",

    resize

);





/*==========================================================
                INICIALIZACIÓN
==========================================================*/

function initializeEngine(){

    createScene();

    createCamera();

    createRenderer();

    createControls();

    createClock();

    createRaycaster();

    createGroups();

    createLights();

}



initializeEngine();





console.log(

"%c✔ Módulo 2 cargado",

"color:#6fb7ff;font-size:15px;font-weight:bold;"

);
/*==========================================================
                    MÓDULO 3

                SISTEMA DE UTILIDADES

¿Qué hace?
-----------

Contiene todas las funciones auxiliares del universo.

Los siguientes módulos utilizarán estas funciones para
crear estrellas, galaxias, nebulosas, planetas,
partículas y animaciones.

==========================================================*/





/*==========================================================
                NÚMEROS ALEATORIOS
==========================================================*/

function random(min, max){

    return Math.random() * (max - min) + min;

}



function randomInt(min, max){

    return Math.floor(random(min, max + 1));

}



function randomSign(){

    return Math.random() < 0.5 ? -1 : 1;

}





/*==========================================================
                INTERPOLACIÓN
==========================================================*/

function lerp(start, end, amount){

    return start + (end - start) * amount;

}



function smooth(current, target, speed){

    return current + (target - current) * speed;

}





/*==========================================================
                LIMITAR VALORES
==========================================================*/

function clamp(value, min, max){

    return Math.max(

        min,

        Math.min(

            max,

            value

        )

    );

}





/*==========================================================
                MAPEAR VALORES
==========================================================*/

function map(value,

             inMin,

             inMax,

             outMin,

             outMax){

    return (

        (value - inMin)

        *

        (outMax - outMin)

        /

        (inMax - inMin)

    )

    +

    outMin;

}





/*==========================================================
                ÁNGULOS
==========================================================*/

function degToRad(degrees){

    return degrees *

    Math.PI /

    180;

}



function radToDeg(radians){

    return radians *

    180 /

    Math.PI;

}





/*==========================================================
                DISTANCIA
==========================================================*/

function distance(x1,y1,z1,

                  x2,y2,z2){

    return Math.sqrt(

        (x2-x1)*(x2-x1)

        +

        (y2-y1)*(y2-y1)

        +

        (z2-z1)*(z2-z1)

    );

}





/*==========================================================
            VECTOR ALEATORIO EN UNA ESFERA
==========================================================*/

function randomSpherePoint(radius){

    const theta =

    Math.random() *

    Math.PI *

    2;



    const phi =

    Math.acos(

        (Math.random()*2)-1

    );



    return new THREE.Vector3(

        radius *

        Math.sin(phi) *

        Math.cos(theta),



        radius *

        Math.sin(phi) *

        Math.sin(theta),



        radius *

        Math.cos(phi)

    );

}





/*==========================================================
            COLOR ALEATORIO
==========================================================*/

function randomStarColor(){

    const colors=[

        COLORS.white,

        COLORS.blue,

        COLORS.red,

        COLORS.violet

    ];



    return colors[

        randomInt(

            0,

            colors.length-1

        )

    ];

}





/*==========================================================
            TAMAÑO ALEATORIO
==========================================================*/

function randomStarSize(){

    return random(

        0.3,

        2.4

    );

}





/*==========================================================
                TIEMPO
==========================================================*/

function getDelta(){

    return clock.getDelta();

}



function getElapsed(){

    return clock.getElapsedTime();

}





/*==========================================================
            CREAR MATERIAL BÁSICO
==========================================================*/

function createMaterial(color){

    return new THREE.MeshBasicMaterial({

        color:color

    });

}





/*==========================================================
            CREAR GEOMETRÍA ESFÉRICA
==========================================================*/

function createSphere(radius,

                      width,

                      height){

    return new THREE.SphereGeometry(

        radius,

        width,

        height

    );

}





/*==========================================================
                DEBUG
==========================================================*/

function debug(text){

    console.log(

        "%c"+text,

        "color:#7fd8ff;font-weight:bold;"

    );

}



debug("✔ Módulo 3 cargado");
/*==========================================================
                    MÓDULO 4

              SISTEMA DE ESTRELLAS

==========================================================*/





/*==========================================================
                VARIABLES
==========================================================*/

let starsGeometry;

let starsMaterial;

let stars;

let starPositions;

let starColors;

let starSizes;





/*==========================================================
            CREAR ESTRELLAS
==========================================================*/

function createStars(){

    starsGeometry = new THREE.BufferGeometry();



    starPositions = [];

    starColors = [];

    starSizes = [];



    const color = new THREE.Color();



    for(let i=0;i<UNIVERSE.stars;i++){

        const point = randomSpherePoint(

            random(600,1900)

        );



        starPositions.push(

            point.x,

            point.y,

            point.z

        );



        color.setHex(

            randomStarColor()

        );



        starColors.push(

            color.r,

            color.g,

            color.b

        );



        starSizes.push(

            randomStarSize()

        );

    }



    starsGeometry.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(

            starPositions,

            3

        )

    );



    starsGeometry.setAttribute(

        "color",

        new THREE.Float32BufferAttribute(

            starColors,

            3

        )

    );



    starsMaterial = new THREE.PointsMaterial({

        size:1.6,

        vertexColors:true,

        transparent:true,

        opacity:1,

        depthWrite:false,

        sizeAttenuation:true

    });



    stars = new THREE.Points(

        starsGeometry,

        starsMaterial

    );



    starsGroup.add(

        stars

    );

}






/*==========================================================
            PARPADEO SUAVE
==========================================================*/

function updateStars(time){

    if(!stars) return;



    stars.rotation.y += SPEED.stars;



    starsMaterial.opacity =

    0.92 +

    Math.sin(

        time*0.6

    )*0.08;

}





/*==========================================================
            INICIALIZACIÓN
==========================================================*/

createStars();



debug(

    "✔ Sistema de estrellas creado"

);
/*==========================================================
                    MÓDULO 5

               MOTOR DE ANIMACIÓN

¿Qué hace?
-----------

• Actualiza todos los sistemas del universo.
• Renderiza la escena.
• Controla el paso del tiempo.
• Será el único bucle principal del proyecto.

==========================================================*/





/*==========================================================
                    VARIABLES
==========================================================*/

let elapsedTime = 0;

let deltaTime = 0;

let animationStarted = false;





/*==========================================================
                ACTUALIZAR UNIVERSO
==========================================================*/

function updateUniverse(){

    /* Rotación extremadamente lenta
       para que el universo nunca
       permanezca completamente quieto. */

    universeGroup.rotation.y += SPEED.universe;

}





/*==========================================================
                ACTUALIZAR SISTEMAS
==========================================================*/


function updateSystems(){

    updateUniverse();

    updateStars(elapsedTime);

    updateGalaxies();

    updateNebulas();

    animatePlanetSystem();

    updateConstellations();

}



/*==========================================================
                    RENDER
==========================================================*/

function renderUniverse(){

    renderer.render(

        scene,

        camera

    );

}
/*==========================================================
                    MÓDULO 9

                PARTE 9.3

        CONSTELACIONES PRINCIPALES

Crea las primeras constelaciones del universo:

• Constelación azul decorativa
• Corazón oculto
• Letra D para Dani

==========================================================*/



/*==========================================================
        CONSTELACIÓN DECORATIVA AZUL
==========================================================*/

const blueConstellationPoints = [

    [-2.8,  0.4,  0.0],
    [-1.6,  1.8,  0.2],
    [-0.3,  1.1, -0.1],
    [ 0.9,  2.3,  0.1],
    [ 2.2,  1.0,  0.0],
    [ 1.4, -0.5, -0.2],
    [ 0.0, -1.2,  0.1],
    [-1.4, -0.6,  0.0]

];



const blueConstellationConnections = [

    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 0],

    [2, 6]

];



let blueConstellation = null;



function createBlueConstellation(){

    blueConstellation = createConstellation({

        name: "CieloAzul",

        points: blueConstellationPoints,

        connections: blueConstellationConnections,

        position: new THREE.Vector3(

            -380,

            180,

            -720

        ),

        scale: 32,

        starColor:

            CONSTELLATION_COLORS.white,

        lineColor:

            CONSTELLATION_COLORS.blue,

        hidden: false

    });

}



/*==========================================================
        CONSTELACIÓN CORAZÓN
==========================================================*/

const heartConstellationPoints = [

    [ 0.0, -2.8,  0.0],

    [-2.8, -0.2,  0.1],

    [-3.2,  1.8,  0.0],

    [-1.8,  3.1, -0.1],

    [ 0.0,  1.8,  0.2],

    [ 1.8,  3.1, -0.1],

    [ 3.2,  1.8,  0.0],

    [ 2.8, -0.2,  0.1]

];



const heartConstellationConnections = [

    [0, 1],

    [1, 2],

    [2, 3],

    [3, 4],

    [4, 5],

    [5, 6],

    [6, 7],

    [7, 0]

];



let heartConstellation = null;



function createHeartConstellation(){

    heartConstellation = createConstellation({

        name: "CorazonDani",

        points: heartConstellationPoints,

        connections: heartConstellationConnections,

        position: new THREE.Vector3(

            360,

            90,

            -850

        ),

        scale: 34,

        starColor:

            CONSTELLATION_COLORS.pink,

        lineColor:

            CONSTELLATION_COLORS.red,

        hidden: true

    });

}



/*==========================================================
        CONSTELACIÓN LETRA D
==========================================================*/

const letterDPoints = [

    [-2.0,  3.2, 0.0],

    [-2.0,  1.6, 0.1],

    [-2.0,  0.0, 0.0],

    [-2.0, -1.6, -0.1],

    [-2.0, -3.2, 0.0],

    [ 0.2,  3.0, 0.1],

    [ 2.0,  1.8, 0.0],

    [ 2.5,  0.0, -0.1],

    [ 2.0, -1.8, 0.0],

    [ 0.2, -3.0, 0.1]

];



const letterDConnections = [

    [0, 1],

    [1, 2],

    [2, 3],

    [3, 4],

    [0, 5],

    [5, 6],

    [6, 7],

    [7, 8],

    [8, 9],

    [9, 4]

];



let letterDConstellation = null;



function createLetterDConstellation(){

    letterDConstellation = createConstellation({

        name: "LetraD",

        points: letterDPoints,

        connections: letterDConnections,

        position: new THREE.Vector3(

            40,

            -140,

            -1050

        ),

        scale: 30,

        starColor:

            CONSTELLATION_COLORS.white,

        lineColor:

            CONSTELLATION_COLORS.violet,

        hidden: true

    });

}



/*==========================================================
        CREAR TODAS LAS CONSTELACIONES
==========================================================*/

function createMainConstellations(){

    createBlueConstellation();

    createHeartConstellation();

    createLetterDConstellation();

}



/*==========================================================
        MOSTRAR CORAZÓN
==========================================================*/

function revealHeartConstellation(){

    if(heartConstellation){

        heartConstellation.show();

    }

}



/*==========================================================
        MOSTRAR LETRA D
==========================================================*/

function revealLetterDConstellation(){

    if(letterDConstellation){

        letterDConstellation.show();

    }

}



/*==========================================================
        OCULTAR CONSTELACIONES ESPECIALES
==========================================================*/

function hideSecretConstellations(){

    if(heartConstellation){

        heartConstellation.hide();

    }

    if(letterDConstellation){

        letterDConstellation.hide();

    }

}



/*==========================================================
        MOSTRAR CONSTELACIONES ESPECIALES
==========================================================*/

function revealSecretConstellations(){

    revealHeartConstellation();

    setTimeout(

        () => {

            revealLetterDConstellation();

        },

        1800

    );

}



/*==========================================================
        INICIALIZACIÓN
==========================================================*/

createMainConstellations();



debug(

    "✔ Constelaciones principales creadas"

);
setTimeout(() => {

    revealSecretConstellations();

}, 5000);





/*==========================================================
                CONTROLES
==========================================================*/

function updateControls(){

    controls.update();

}





/*==========================================================
                LOOP PRINCIPAL
==========================================================*/

function animate(){

    requestAnimationFrame(

        animate

    );



    deltaTime =

    clock.getDelta();



    elapsedTime +=

    deltaTime;



    updateControls();



    updateSystems();



    renderUniverse();

}





/*==========================================================
                INICIAR MOTOR
==========================================================*/

function startUniverse(){

    if(animationStarted) return;

    animationStarted = true;

    animate();

}





/*==========================================================
                INICIAR
==========================================================*/

startUniverse();





debug(

"✔ Motor de animación iniciado"

);
/*==========================================================
                    MÓDULO 6

            SISTEMA DE GALAXIAS

PARTE 6.1

Variables, configuración y preparación
==========================================================*/





/*==========================================================
                VARIABLES GLOBALES
==========================================================*/

let galaxyGeometry;

let galaxyMaterial;

const galaxies = [];





/*==========================================================
            CONFIGURACIÓN DE GALAXIAS
==========================================================*/

const GALAXY = {

    /* Cantidad de galaxias */

    count: 3,



    /* Estrellas por galaxia */

    stars: 12000,



    /* Brazos espirales */

    arms: 5,



    /* Radio */

    radius: 260,



    /* Curvatura */

    spin: 2.7,



    /* Ruido */

    randomness: 0.42,



    randomnessPower: 3,



    /* Tamaño de estrellas */

    size: 0.055,



    /* Velocidad */

    rotationSpeed: 0.00002

};





/*==========================================================
            COLORES PRINCIPALES
==========================================================*/

const GALAXY_COLORS = {

    center:

        new THREE.Color(

            0x8fb8ff

        ),



    middle:

        new THREE.Color(

            0xb95eff

        ),



    outer:

        new THREE.Color(

            0xff4f7d

        )

};





/*==========================================================
        MATERIALES COMPARTIDOS
==========================================================*/

function createGalaxyMaterial(){

    galaxyMaterial =

    new THREE.PointsMaterial({

        size:

            GALAXY.size,



        transparent:true,



        opacity:0.95,



        depthWrite:false,



        vertexColors:true,



        blending:

        THREE.AdditiveBlending,



        sizeAttenuation:true

    });

}





/*==========================================================
        OBJETO GALAXIA
==========================================================*/

class Galaxy{

    constructor(){

        this.mesh = null;

        this.rotationOffset =

        random(

            0,

            Math.PI*2

        );



        this.speed =

        random(

            GALAXY.rotationSpeed*0.7,

            GALAXY.rotationSpeed*1.3

        );

    }



    update(){

        if(!this.mesh) return;



        this.mesh.rotation.y +=

        this.speed;



        this.mesh.rotation.z =

        Math.sin(

            elapsedTime*0.05+

            this.rotationOffset

        )*0.05;

    }

}
/*==========================================================
                    MÓDULO 6

              PARTE 6.2A

               VERTEX SHADER

Este shader controla:

• Tamaño de las estrellas
• Distancia
• Movimiento
• Profundidad
• Brillo

==========================================================*/

const galaxyVertexShader = `

attribute float scale;

attribute float randomness;

attribute vec3 color;

varying vec3 vColor;

varying float vAlpha;

uniform float uTime;

void main(){

    vColor = color;

    vec3 pos = position;

    float angle = uTime * 0.02;

    float distanceFromCenter = length(pos.xz);

    float wave =

        sin(

            distanceFromCenter * 0.08 +

            uTime * 0.4 +

            randomness * 5.0

        ) * 0.6;

    pos.y += wave;

    float cosA = cos(angle);

    float sinA = sin(angle);

    mat2 rotation = mat2(

        cosA,

        -sinA,

        sinA,

        cosA

    );

    pos.xz = rotation * pos.xz;

    vec4 modelPosition =

        modelMatrix *

        vec4(

            pos,

            1.0

        );

    vec4 viewPosition =

        viewMatrix *

        modelPosition;

    vec4 projectedPosition =

        projectionMatrix *

        viewPosition;

    gl_Position =

        projectedPosition;

    float size =

        scale *

        18.0;

    size *=

        1.0 /

        -viewPosition.z;

    gl_PointSize =

        max(

            size,

            1.0

        );

    vAlpha =

        smoothstep(

            0.0,

            250.0,

            distanceFromCenter

        );

}
`;
/*==========================================================
                    MÓDULO 6

              PARTE 6.2B

              FRAGMENT SHADER

Este shader controla:

• Color final
• Halo
• Brillo
• Transparencia
• Difuminado
==========================================================*/

const galaxyFragmentShader = `

precision highp float;

varying vec3 vColor;
varying float vAlpha;

uniform float uTime;

void main(){

    //------------------------------------
    // Coordenadas del punto
    //------------------------------------

    vec2 uv = gl_PointCoord;

    uv -= 0.5;

    //------------------------------------
    // Distancia al centro
    //------------------------------------

    float dist = length(uv);

    //------------------------------------
    // Disco principal
    //------------------------------------

    float core = smoothstep(

        0.20,

        0.0,

        dist

    );

    //------------------------------------
    // Halo exterior
    //------------------------------------

    float halo = smoothstep(

        0.55,

        0.10,

        dist

    );

    //------------------------------------
    // Brillo pulsante
    //------------------------------------

    float pulse =

        0.90 +

        sin(

            uTime * 2.0

        ) * 0.08;

    //------------------------------------
    // Intensidad
    //------------------------------------

    float intensity =

        core * 2.2 +

        halo * 0.8;

    intensity *= pulse;

    //------------------------------------
    // Transparencia
    //------------------------------------

    float alpha =

        halo *

        (1.0 - vAlpha);

    //------------------------------------
    // Color final
    //------------------------------------

    vec3 finalColor =

        vColor *

        intensity;

    //------------------------------------
    // Salida
    //------------------------------------

    gl_FragColor =

        vec4(

            finalColor,

            alpha

        );

}

`;
/*==========================================================
                    MÓDULO 6

              PARTE 6.2C

            GALAXY SHADER MATERIAL

Conecta el Vertex Shader y el Fragment Shader.

==========================================================*/





/*==========================================================
                    UNIFORMS
==========================================================*/

const galaxyUniforms = {

    /* Tiempo */

    uTime: {

        value: 0

    },



    /* Intensidad del brillo */

    uBrightness: {

        value: 1.0

    },



    /* Tamaño general */

    uSize: {

        value: GALAXY.size

    }

};





/*==========================================================
            CREAR MATERIAL SHADER
==========================================================*/

function createGalaxyMaterial(){



    galaxyMaterial =

    new THREE.ShaderMaterial({



        vertexShader:

            galaxyVertexShader,



        fragmentShader:

            galaxyFragmentShader,



        uniforms:

            galaxyUniforms,



        transparent: true,



        depthWrite: false,



        depthTest: true,



        vertexColors: true,



        blending:

            THREE.AdditiveBlending



    });



}





/*==========================================================
        ACTUALIZAR UNIFORMS
==========================================================*/

function updateGalaxyMaterial(){



    galaxyUniforms.uTime.value =

        elapsedTime;



}
/*==========================================================
                    MÓDULO 6

              PARTE 6.2D

        GEOMETRÍA DE LA GALAXIA

Genera la posición, color y atributos de todas
las estrellas que forman la galaxia.

==========================================================*/

function generateGalaxyGeometry(){

    // Eliminar la geometría anterior si existe
    if(galaxyGeometry){

        galaxyGeometry.dispose();

    }

    galaxyGeometry = new THREE.BufferGeometry();

    const positions = [];
    const colors = [];
    const scales = [];
    const randomness = [];

    const colorInside = GALAXY_COLORS.center.clone();
    const colorMiddle = GALAXY_COLORS.middle.clone();
    const colorOutside = GALAXY_COLORS.outer.clone();

    const mixedColor = new THREE.Color();

    for(let i = 0; i < GALAXY.stars; i++){

        const radius = Math.random() * GALAXY.radius;

        const branch =
            (i % GALAXY.arms) *
            ((Math.PI * 2) / GALAXY.arms);

        const spin = radius * GALAXY.spin;

        const randomX =
            Math.pow(Math.random(), GALAXY.randomnessPower) *
            GALAXY.randomness *
            radius *
            randomSign();

        const randomY =
            Math.pow(Math.random(), GALAXY.randomnessPower) *
            GALAXY.randomness *
            radius *
            0.2 *
            randomSign();

        const randomZ =
            Math.pow(Math.random(), GALAXY.randomnessPower) *
            GALAXY.randomness *
            radius *
            randomSign();

        positions.push(

            Math.cos(branch + spin) * radius + randomX,

            randomY,

            Math.sin(branch + spin) * radius + randomZ

        );

        //------------------------------------
        // Color
        //------------------------------------

        if(radius < GALAXY.radius * 0.4){

            mixedColor.copy(colorInside);

            mixedColor.lerp(

                colorMiddle,

                radius / (GALAXY.radius * 0.4)

            );

        }else{

            mixedColor.copy(colorMiddle);

            mixedColor.lerp(

                colorOutside,

                (radius - GALAXY.radius * 0.4) /

                (GALAXY.radius * 0.6)

            );

        }

        colors.push(

            mixedColor.r,

            mixedColor.g,

            mixedColor.b

        );

        //------------------------------------
        // Tamaño individual
        //------------------------------------

        scales.push(

            random(

                0.6,

                2.5

            )

        );

        //------------------------------------
        // Valor aleatorio para el shader
        //------------------------------------

        randomness.push(

            Math.random()

        );

    }

    galaxyGeometry.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(

            positions,

            3

        )

    );

    galaxyGeometry.setAttribute(

        "color",

        new THREE.Float32BufferAttribute(

            colors,

            3

        )

    );

    galaxyGeometry.setAttribute(

        "scale",

        new THREE.Float32BufferAttribute(

            scales,

            1

        )

    );

    galaxyGeometry.setAttribute(

        "randomness",

        new THREE.Float32BufferAttribute(

            randomness,

            1

        )

    );

}
/*==========================================================
                    MÓDULO 6

                PARTE 6.3

            CREAR GALAXIAS

Convierte la geometría y el shader en galaxias
reales dentro del universo.

==========================================================*/





/*==========================================================
                CREAR GALAXIAS
==========================================================*/

function createGalaxies(){

    /*--------------------------------------
        Limpiar galaxias anteriores
    --------------------------------------*/

    while(galaxyGroup.children.length > 0){

        galaxyGroup.remove(

            galaxyGroup.children[0]

        );

    }



    galaxies.length = 0;



    /*--------------------------------------
        Material
    --------------------------------------*/

    createGalaxyMaterial();



    /*--------------------------------------
        Crear galaxias
    --------------------------------------*/

    for(

        let i = 0;

        i < GALAXY.count;

        i++

    ){

        generateGalaxyGeometry();



        const galaxy = new Galaxy();



        galaxy.mesh = new THREE.Points(

            galaxyGeometry,

            galaxyMaterial

        );



        /*----------------------------------
            Posición
        ----------------------------------*/

        galaxy.mesh.position.set(

            random(-700,700),

            random(-250,250),

            random(-900,-300)

        );



        /*----------------------------------
            Rotación
        ----------------------------------*/

        galaxy.mesh.rotation.x =

            random(

                -0.4,

                0.4

            );



        galaxy.mesh.rotation.y =

            random(

                0,

                Math.PI*2

            );



        galaxy.mesh.rotation.z =

            random(

                -0.3,

                0.3

            );



        /*----------------------------------
            Escala
        ----------------------------------*/

        const scale =

            random(

                0.7,

                1.8

            );



        galaxy.mesh.scale.set(

            scale,

            scale,

            scale

        );



        /*----------------------------------
            Añadir
        ----------------------------------*/

        galaxies.push(

            galaxy

        );



        galaxyGroup.add(

            galaxy.mesh

        );

    }

}





/*==========================================================
            REGENERAR GALAXIAS
==========================================================*/

function regenerateGalaxies(){

    createGalaxies();

}





/*==========================================================
            INICIALIZACIÓN
==========================================================*/

createGalaxies();





debug(

    "✔ Galaxias creadas"

);
/*==========================================================
                    MÓDULO 6

                PARTE 6.4

            ANIMACIÓN GALÁCTICA

==========================================================*/





/*==========================================================
        ACTUALIZAR GALAXIAS
==========================================================*/

function updateGalaxies(){

    //------------------------------------
    // Actualizar tiempo del shader
    //------------------------------------

    if(galaxyUniforms){

        galaxyUniforms.uTime.value = elapsedTime;

    }

    //------------------------------------
    // Actualizar cada galaxia
    //------------------------------------

    for(const galaxy of galaxies){

        galaxy.update();

    }

    //------------------------------------
    // Movimiento del grupo completo
    //------------------------------------

    galaxyGroup.rotation.y +=

        GALAXY.rotationSpeed * 0.25;

    //------------------------------------
    // Respiración
    //------------------------------------

    galaxyGroup.position.y =

        Math.sin(

            elapsedTime * 0.18

        ) * 4;

    //------------------------------------
    // Inclinación muy suave
    //------------------------------------

    galaxyGroup.rotation.x =

        Math.sin(

            elapsedTime * 0.05

        ) * 0.03;

}
/*==========================================================
                    MÓDULO 6

                PARTE 6.5

        FINALIZACIÓN DEL SISTEMA
==========================================================*/





/*==========================================================
            ELIMINAR GALAXIAS
==========================================================*/

function disposeGalaxies(){

    for(const galaxy of galaxies){

        if(galaxy.mesh){

            galaxyGroup.remove(

                galaxy.mesh

            );

        }

    }

    galaxies.length = 0;

    if(galaxyGeometry){

        galaxyGeometry.dispose();

    }

    if(galaxyMaterial){

        galaxyMaterial.dispose();

    }

}





/*==========================================================
            REINICIAR GALAXIAS
==========================================================*/

function rebuildGalaxies(){

    disposeGalaxies();

    createGalaxies();

}





/*==========================================================
            OPTIMIZACIÓN
==========================================================*/

function optimizeGalaxies(){

    galaxyGroup.frustumCulled = false;

    galaxyGroup.matrixAutoUpdate = true;

}





/*==========================================================
            DEPURACIÓN
==========================================================*/

function galaxyInformation(){

    console.log(

        "%c========== GALAXIAS ==========",

        "color:#8fd3ff;font-weight:bold;"

    );



    console.log(

        "Cantidad:",

        galaxies.length

    );



    console.log(

        "Estrellas por galaxia:",

        GALAXY.stars

    );



    console.log(

        "Brazos:",

        GALAXY.arms

    );



    console.log(

        "Radio:",

        GALAXY.radius

    );

}





/*==========================================================
        REGENERAR CON TECLA G
==========================================================*/

window.addEventListener(

    "keydown",

    (event)=>{

        if(

            event.key.toLowerCase()

            ===

            "g"

        ){

            rebuildGalaxies();

        }

    }

);





/*==========================================================
            INICIALIZACIÓN
==========================================================*/

optimizeGalaxies();

galaxyInformation();





debug(

"✔ Sistema de galaxias finalizado"

);
/*==========================================================
                    MÓDULO 7

              SISTEMA DE NEBULOSAS

                PARTE 7.1

Variables y configuración
==========================================================*/





/*==========================================================
                VARIABLES
==========================================================*/

let nebulaGeometry;

let nebulaMaterial;

const nebulas = [];





/*==========================================================
            CONFIGURACIÓN
==========================================================*/

const NEBULA = {

    /* Cantidad */

    count: 8,



    /* Partículas */

    particles: 8500,



    /* Radio */

    radius: 180,



    /* Grosor */

    thickness: 90,



    /* Tamaño */

    size: 18,



    /* Movimiento */

    rotationSpeed: 0.00004,



    /* Opacidad */

    opacity: 0.35,



    /* Ruido */

    noise: 1.3

};





/*==========================================================
                COLORES
==========================================================*/

const NEBULA_COLORS = {

    blue: new THREE.Color(0x6da9ff),

    cyan: new THREE.Color(0x79e9ff),

    violet: new THREE.Color(0xa06eff),

    red: new THREE.Color(0xff5575),

    pink: new THREE.Color(0xff89cf)

};





/*==========================================================
                CLASE
==========================================================*/

class Nebula{

    constructor(){

        this.mesh = null;

        this.rotationOffset =

            random(

                0,

                Math.PI * 2

            );



        this.speed =

            random(

                0.00002,

                0.00006

            );



        this.floatSpeed =

            random(

                0.1,

                0.3

            );

    }






    update(){

        if(!this.mesh) return;



        this.mesh.rotation.y +=

            this.speed;



        this.mesh.rotation.z +=

            this.speed * 0.2;



        this.mesh.position.y =

            Math.sin(

                elapsedTime *

                this.floatSpeed +

                this.rotationOffset

            ) * 18;

    }

}
/*==========================================================
                    MÓDULO 7

                PARTE 7.2

            NEBULA VERTEX SHADER

Controla:

• Movimiento de la nebulosa
• Ondulación
• Profundidad
• Tamaño de partículas
• Animación

==========================================================*/

const nebulaVertexShader = `

attribute float scale;
attribute float randomness;
attribute vec3 color;

varying vec3 vColor;
varying float vAlpha;
varying float vDistance;

uniform float uTime;

void main(){

    vColor = color;

    vec3 pos = position;

    //----------------------------------
    // Distancia al centro
    //----------------------------------

    float radius = length(pos.xyz);

    vDistance = radius;

    //----------------------------------
    // Movimiento orgánico
    //----------------------------------

    float wave1 =

        sin(

            pos.x * 0.02 +

            uTime * 0.18 +

            randomness * 8.0

        );

    float wave2 =

        cos(

            pos.z * 0.03 +

            uTime * 0.15 +

            randomness * 6.0

        );

    float wave3 =

        sin(

            radius * 0.04 +

            uTime * 0.25

        );

    pos.x += wave1 * 2.0;

    pos.y += wave2 * 3.0;

    pos.z += wave3 * 2.5;

    //----------------------------------
    // Posiciones
    //----------------------------------

    vec4 modelPosition =

        modelMatrix *

        vec4(

            pos,

            1.0

        );

    vec4 viewPosition =

        viewMatrix *

        modelPosition;

    vec4 projectedPosition =

        projectionMatrix *

        viewPosition;

    gl_Position =

        projectedPosition;

    //----------------------------------
    // Tamaño
    //----------------------------------

    float pointSize =

        scale *

        35.0;

    pointSize *=

        1.0 /

        -viewPosition.z;

    gl_PointSize =

        max(

            pointSize,

            2.0

        );

    //----------------------------------
    // Alpha
    //----------------------------------

    vAlpha =

        smoothstep(

            0.0,

            NEBULA_RADIUS,

            radius

        );

}
`;
/*==========================================================
                    MÓDULO 7

                PARTE 7.2

            NEBULA VERTEX SHADER

Controla:

• Movimiento de la nebulosa
• Ondulación
• Profundidad
• Tamaño de partículas
• Animación

==========================================================*/

const nebulaVertexShader = `

attribute float scale;
attribute float randomness;
attribute vec3 color;

varying vec3 vColor;
varying float vAlpha;
varying float vDistance;

uniform float uTime;

void main(){

    vColor = color;

    vec3 pos = position;

    //----------------------------------
    // Distancia al centro
    //----------------------------------

    float radius = length(pos.xyz);

    vDistance = radius;

    //----------------------------------
    // Movimiento orgánico
    //----------------------------------

    float wave1 =

        sin(

            pos.x * 0.02 +

            uTime * 0.18 +

            randomness * 8.0

        );

    float wave2 =

        cos(

            pos.z * 0.03 +

            uTime * 0.15 +

            randomness * 6.0

        );

    float wave3 =

        sin(

            radius * 0.04 +

            uTime * 0.25

        );

    pos.x += wave1 * 2.0;

    pos.y += wave2 * 3.0;

    pos.z += wave3 * 2.5;

    //----------------------------------
    // Posiciones
    //----------------------------------

    vec4 modelPosition =

        modelMatrix *

        vec4(

            pos,

            1.0

        );

    vec4 viewPosition =

        viewMatrix *

        modelPosition;

    vec4 projectedPosition =

        projectionMatrix *

        viewPosition;

    gl_Position =

        projectedPosition;

    //----------------------------------
    // Tamaño
    //----------------------------------

    float pointSize =

        scale *

        35.0;

    pointSize *=

        1.0 /

        -viewPosition.z;

    gl_PointSize =

        max(

            pointSize,

            2.0

        );

    //----------------------------------
    // Alpha
    //----------------------------------

    vAlpha =

        smoothstep(

            0.0,

            NEBULA_RADIUS,

            radius

        );

}
`;
/*==========================================================
                    MÓDULO 7

                PARTE 7.4

        SHADER MATERIAL DE NEBULOSAS

Conecta el Vertex Shader y el Fragment Shader.

==========================================================*/





/*==========================================================
                    UNIFORMS
==========================================================*/

const nebulaUniforms = {

    /* Tiempo */

    uTime: {

        value: 0

    },



    /* Radio de la nebulosa */

    uRadius: {

        value: NEBULA.radius

    },



    /* Opacidad */

    uOpacity: {

        value: NEBULA.opacity

    }

};





/*==========================================================
            CREAR MATERIAL
==========================================================*/

function createNebulaMaterial(){

    nebulaMaterial = new THREE.ShaderMaterial({

        vertexShader: nebulaVertexShader,

        fragmentShader: nebulaFragmentShader,

        uniforms: nebulaUniforms,

        transparent: true,

        depthWrite: false,

        depthTest: true,

        vertexColors: true,

        blending: THREE.AdditiveBlending

    });

}





/*==========================================================
        ACTUALIZAR UNIFORMS
==========================================================*/

function updateNebulaMaterial(){

    nebulaUniforms.uTime.value = elapsedTime;

    nebulaUniforms.uRadius.value = NEBULA.radius;

    nebulaUniforms.uOpacity.value = NEBULA.opacity;

}
/*==========================================================
                    MÓDULO 7

                PARTE 7.5

            GEOMETRÍA NEBULOSA

Genera miles de partículas distribuidas
en forma de nube espacial.

==========================================================*/





/*==========================================================
            GENERAR GEOMETRÍA
==========================================================*/

function generateNebulaGeometry(){

    if(nebulaGeometry){

        nebulaGeometry.dispose();

    }

    nebulaGeometry = new THREE.BufferGeometry();





    const positions = [];

    const colors = [];

    const scales = [];

    const randomness = [];





    const tempColor = new THREE.Color();





    for(

        let i = 0;

        i < NEBULA.particles;

        i++

    ){

        //----------------------------------
        // Distribución esférica
        //----------------------------------

        const radius =

            Math.pow(

                Math.random(),

                0.55

            ) *

            NEBULA.radius;





        const theta =

            Math.random()

            *

            Math.PI

            *

            2;





        const phi =

            Math.acos(

                2 *

                Math.random()

                -

                1

            );





        const noise =

            random(

                -NEBULA.thickness,

                NEBULA.thickness

            );





        const x =

            Math.sin(phi)

            *

            Math.cos(theta)

            *

            radius

            +

            noise

            *

            0.25;





        const y =

            Math.cos(phi)

            *

            radius

            +

            noise

            *

            0.55;





        const z =

            Math.sin(phi)

            *

            Math.sin(theta)

            *

            radius

            +

            noise

            *

            0.25;





        positions.push(

            x,

            y,

            z

        );





        //----------------------------------
        // Color
        //----------------------------------

        const mix =

            radius /

            NEBULA.radius;





        if(mix < 0.25){

            tempColor.copy(

                NEBULA_COLORS.blue

            );



            tempColor.lerp(

                NEBULA_COLORS.cyan,

                mix / 0.25

            );

        }

        else if(mix < 0.60){

            tempColor.copy(

                NEBULA_COLORS.cyan

            );



            tempColor.lerp(

                NEBULA_COLORS.violet,

                (mix-0.25)/0.35

            );

        }

        else{

            tempColor.copy(

                NEBULA_COLORS.violet

            );



            tempColor.lerp(

                NEBULA_COLORS.red,

                (mix-0.60)/0.40

            );

        }





        colors.push(

            tempColor.r,

            tempColor.g,

            tempColor.b

        );





        //----------------------------------
        // Escala
        //----------------------------------

        scales.push(

            random(

                0.8,

                2.8

            )

        );





        //----------------------------------
        // Random Shader
        //----------------------------------

        randomness.push(

            Math.random()

        );

    }





    nebulaGeometry.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(

            positions,

            3

        )

    );





    nebulaGeometry.setAttribute(

        "color",

        new THREE.Float32BufferAttribute(

            colors,

            3

        )

    );





    nebulaGeometry.setAttribute(

        "scale",

        new THREE.Float32BufferAttribute(

            scales,

            1

        )

    );





    nebulaGeometry.setAttribute(

        "randomness",

        new THREE.Float32BufferAttribute(

            randomness,

            1

        )

    );



}
/*==========================================================
                    MÓDULO 7

                PARTE 7.6

            CREAR NEBULOSAS

Convierte la geometría y el shader en
nebulosas reales dentro del universo.

==========================================================*/





/*==========================================================
            CREAR NEBULOSAS
==========================================================*/

function createNebulas(){

    //----------------------------------
    // Limpiar anteriores
    //----------------------------------

    while(nebulaGroup.children.length > 0){

        nebulaGroup.remove(

            nebulaGroup.children[0]

        );

    }

    nebulas.length = 0;

    //----------------------------------
    // Material
    //----------------------------------

    createNebulaMaterial();

    //----------------------------------
    // Crear nebulosas
    //----------------------------------

    for(let i = 0; i < NEBULA.count; i++){

        generateNebulaGeometry();

        const nebula = new Nebula();

        nebula.mesh = new THREE.Points(

            nebulaGeometry,

            nebulaMaterial

        );

        //----------------------------------
        // Posición
        //----------------------------------

        nebula.mesh.position.set(

            random(-1200,1200),

            random(-500,500),

            random(-1600,-300)

        );

        //----------------------------------
        // Rotación
        //----------------------------------

        nebula.mesh.rotation.set(

            random(-Math.PI, Math.PI),

            random(-Math.PI, Math.PI),

            random(-Math.PI, Math.PI)

        );

        //----------------------------------
        // Escala
        //----------------------------------

        const scale = random(0.8,2.4);

        nebula.mesh.scale.set(

            scale,

            scale,

            scale

        );

        //----------------------------------
        // Opacidad inicial
        //----------------------------------

        nebula.mesh.renderOrder = -1;

        //----------------------------------
        // Guardar
        //----------------------------------

        nebulas.push(

            nebula

        );

        nebulaGroup.add(

            nebula.mesh

        );

    }

}





/*==========================================================
        REGENERAR NEBULOSAS
==========================================================*/

function regenerateNebulas(){

    createNebulas();

}





/*==========================================================
            INICIALIZACIÓN
==========================================================*/

createNebulas();





debug(

    "✔ Nebulosas creadas"

);
/*==========================================================
                    MÓDULO 7

                PARTE 7.7

            ANIMACIÓN NEBULOSAS

Controla:

• Rotación
• Movimiento flotante
• Respiración
• Escala
• Shader

==========================================================*/





/*==========================================================
        ACTUALIZAR NEBULOSAS
==========================================================*/

function updateNebulas(){

    //----------------------------------
    // Actualizar Shader
    //----------------------------------

    nebulaUniforms.uTime.value = elapsedTime;





    //----------------------------------
    // Actualizar cada nebulosa
    //----------------------------------

    for(const nebula of nebulas){

        nebula.update();

    }





    //----------------------------------
    // Movimiento del grupo
    //----------------------------------

    nebulaGroup.rotation.y +=

        NEBULA.rotationSpeed * 0.18;





    //----------------------------------
    // Respiración del conjunto
    //----------------------------------

    nebulaGroup.scale.setScalar(

        1.0 +

        Math.sin(

            elapsedTime * 0.08

        ) * 0.025

    );





    //----------------------------------
    // Movimiento vertical
    //----------------------------------

    nebulaGroup.position.y =

        Math.sin(

            elapsedTime * 0.04

        ) * 10;





    //----------------------------------
    // Balanceo lateral
    //----------------------------------

    nebulaGroup.rotation.x =

        Math.sin(

            elapsedTime * 0.03

        ) * 0.025;





    nebulaGroup.rotation.z =

        Math.cos(

            elapsedTime * 0.025

        ) * 0.02;

}





/*==========================================================
        CAMBIO SUAVE DE OPACIDAD
==========================================================*/

function setNebulaOpacity(value){

    nebulaUniforms.uOpacity.value = THREE.MathUtils.lerp(

        nebulaUniforms.uOpacity.value,

        value,

        0.04

    );

}





/*==========================================================
        CAMBIO SUAVE DEL RADIO
==========================================================*/

function setNebulaRadius(value){

    nebulaUniforms.uRadius.value = THREE.MathUtils.lerp(

        nebulaUniforms.uRadius.value,

        value,

        0.02

    );

}
/*==========================================================
                    MÓDULO 7

                PARTE 7.8

        FINALIZACIÓN Y OPTIMIZACIÓN

==========================================================*/





/*==========================================================
            ELIMINAR NEBULOSAS
==========================================================*/

function disposeNebulas(){

    for(const nebula of nebulas){

        if(nebula.mesh){

            nebulaGroup.remove(

                nebula.mesh

            );

        }

    }



    nebulas.length = 0;



    if(nebulaGeometry){

        nebulaGeometry.dispose();

    }



    if(nebulaMaterial){

        nebulaMaterial.dispose();

    }

}





/*==========================================================
            RECONSTRUIR
==========================================================*/

function rebuildNebulas(){

    disposeNebulas();

    createNebulas();

}





/*==========================================================
            CALIDAD GRÁFICA
==========================================================*/

function detectGraphicQuality(){

    const cores =

        navigator.hardwareConcurrency || 4;



    if(cores <= 4){

        console.log(

            "Modo móvil"

        );



        NEBULA.count = 5;

        NEBULA.particles = 5000;

    }

    else{

        console.log(

            "Modo escritorio"

        );



        NEBULA.count = 8;

        NEBULA.particles = 8500;

    }

}





/*==========================================================
            OPTIMIZACIÓN
==========================================================*/

function optimizeNebulas(){

    nebulaGroup.frustumCulled = false;

    nebulaGroup.matrixAutoUpdate = true;

}





/*==========================================================
            DEPURACIÓN
==========================================================*/

function nebulaInformation(){

    console.log(

        "%c========== NEBULOSAS ==========",

        "color:#9ad0ff;font-weight:bold;"

    );



    console.log(

        "Cantidad:",

        nebulas.length

    );



    console.log(

        "Partículas:",

        NEBULA.particles

    );



    console.log(

        "Radio:",

        NEBULA.radius

    );



    console.log(

        "Opacidad:",

        NEBULA.opacity

    );

}





/*==========================================================
            ATAJO DE TECLADO
==========================================================*/

window.addEventListener(

    "keydown",

    (event)=>{

        if(

            event.key.toLowerCase()

            ===

            "n"

        ){

            rebuildNebulas();

        }

    }

);





/*==========================================================
            INICIALIZACIÓN
==========================================================*/

detectGraphicQuality();

optimizeNebulas();

nebulaInformation();





debug(

"✔ Sistema de nebulosas finalizado"

);
/*==========================================================
                    MÓDULO 8

             SISTEMA PLANETARIO

                PARTE 8.1

Variables y configuración

==========================================================*/





/*==========================================================
                VARIABLES
==========================================================*/

const planets = [];

let moon = null;

let saturn = null;

let ring = null;





/*==========================================================
                GRUPO
==========================================================*/

const planetGroup = new THREE.Group();

universeGroup.add(

    planetGroup

);





/*==========================================================
            CONFIGURACIÓN
==========================================================*/

const PLANETS={

    count:7,



    minRadius:6,



    maxRadius:28,



    distance:240,



    orbitRadius:750,



    rotationSpeed:0.00045,



    orbitSpeed:0.00008,



    floating:4



};





/*==========================================================
                COLORES
==========================================================*/

const PLANET_COLORS=[

0x4FC3F7,

0x7C4DFF,

0xFF5252,

0xFFD740,

0x80CBC4,

0xFF80AB,

0x90CAF9,

0xF48FB1,

0xA5D6A7

];





/*==========================================================
            CLASE PLANETA
==========================================================*/

class Planet{

    constructor(mesh){

        this.mesh=mesh;



        this.angle=random(

            0,

            Math.PI*2

        );



        this.orbit=random(

            PLANETS.orbitRadius*0.6,

            PLANETS.orbitRadius

        );



        this.rotation=random(

            0.0004,

            0.0015

        );



        this.speed=random(

            PLANETS.orbitSpeed*0.5,

            PLANETS.orbitSpeed*1.5

        );



        this.offset=random(

            0,

            Math.PI*2

        );

    }





    update(){

        this.angle+=this.speed;



        this.mesh.position.x=

        Math.cos(

            this.angle

        )*

        this.orbit;



        this.mesh.position.z=

        Math.sin(

            this.angle

        )*

        this.orbit;



        this.mesh.position.y=

        Math.sin(

            elapsedTime*0.20+

            this.offset

        )*

        PLANETS.floating;



        this.mesh.rotation.y+=

        this.rotation;

    }

}
/*==========================================================
                    MÓDULO 8

                PARTE 8.2

            MATERIALES PLANETARIOS

==========================================================*/





/*==========================================================
                VARIABLES
==========================================================*/

const planetMaterials = [];

let moonMaterial = null;

let saturnMaterial = null;

let ringMaterial = null;





/*==========================================================
        CREAR MATERIAL PLANETA
==========================================================*/

function createPlanetMaterial(color){

    return new THREE.MeshPhysicalMaterial({

        color: color,

        roughness: 0.85,

        metalness: 0.08,

        clearcoat: 0.15,

        clearcoatRoughness: 0.75,

        emissive: new THREE.Color(color),

        emissiveIntensity: 0.04

    });

}





/*==========================================================
            CREAR MATERIALES
==========================================================*/

function createPlanetMaterials(){

    planetMaterials.length = 0;

    //----------------------------------
    // Planetas principales
    //----------------------------------

    for(

        let i = 0;

        i < PLANET_COLORS.length;

        i++

    ){

        planetMaterials.push(

            createPlanetMaterial(

                PLANET_COLORS[i]

            )

        );

    }

    //----------------------------------
    // Luna
    //----------------------------------

    moonMaterial =

        new THREE.MeshStandardMaterial({

            color: 0xd7d7d7,

            roughness: 1,

            metalness: 0,

            emissive: 0xffffff,

            emissiveIntensity: 0.02

        });

    //----------------------------------
    // Saturno
    //----------------------------------

    saturnMaterial =

        new THREE.MeshPhysicalMaterial({

            color: 0xd7b27b,

            roughness: 0.9,

            metalness: 0.05,

            clearcoat: 0.1,

            emissive: 0xb98d55,

            emissiveIntensity: 0.03

        });

    //----------------------------------
    // Anillos
    //----------------------------------

    ringMaterial =

        new THREE.MeshBasicMaterial({

            color: 0xd6c1a1,

            transparent: true,

            opacity: 0.55,

            side: THREE.DoubleSide

        });

}





/*==========================================================
            CAMBIAR BRILLO
==========================================================*/

function setPlanetGlow(value){

    for(

        const material

        of

        planetMaterials

    ){

        material.emissiveIntensity = value;

    }

}





/*==========================================================
            CAMBIAR COLOR
==========================================================*/

function tintPlanets(color){

    for(

        const material

        of

        planetMaterials

    ){

        material.color.set(color);

    }

}





/*==========================================================
            INICIALIZACIÓN
==========================================================*/

createPlanetMaterials();





debug(

"✔ Materiales planetarios creados"

);
/*==========================================================
                    MÓDULO 8

                PARTE 8.3

            CREAR PLANETAS

==========================================================*/





/*==========================================================
            GEOMETRÍA BASE
==========================================================*/

function createPlanetGeometry(radius){

    return new THREE.SphereGeometry(

        radius,

        64,

        64

    );

}





/*==========================================================
            CREAR PLANETAS
==========================================================*/

function createPlanets(){

    //----------------------------------
    // Limpiar anteriores
    //----------------------------------

    while(

        planetGroup.children.length > 0

    ){

        planetGroup.remove(

            planetGroup.children[0]

        );

    }

    planets.length = 0;





    //----------------------------------
    // Crear todos
    //----------------------------------

    for(

        let i = 0;

        i < PLANETS.count;

        i++

    ){

        const radius = random(

            PLANETS.minRadius,

            PLANETS.maxRadius

        );





        const geometry =

            createPlanetGeometry(

                radius

            );





        const material =

            planetMaterials[

                i %

                planetMaterials.length

            ].clone();





        const mesh =

            new THREE.Mesh(

                geometry,

                material

            );





        //----------------------------------
        // Sombras
        //----------------------------------

        mesh.castShadow = true;

        mesh.receiveShadow = true;





        //----------------------------------
        // Escala inicial
        //----------------------------------

        mesh.scale.set(

            1,

            1,

            1

        );





        //----------------------------------
        // Crear planeta
        //----------------------------------

        const planet =

            new Planet(

                mesh

            );





        //----------------------------------
        // Posición inicial
        //----------------------------------

        mesh.position.set(

            random(-900,900),

            random(-180,180),

            random(-1500,-350)

        );





        //----------------------------------
        // Rotación inicial
        //----------------------------------

        mesh.rotation.set(

            random(0,Math.PI),

            random(0,Math.PI),

            random(0,Math.PI)

        );





        //----------------------------------
        // Inclinación
        //----------------------------------

        mesh.rotation.z +=

            random(

                -0.5,

                0.5

            );





        //----------------------------------
        // Guardar
        //----------------------------------

        planets.push(

            planet

        );





        planetGroup.add(

            mesh

        );

    }

}





/*==========================================================
            REGENERAR
==========================================================*/

function regeneratePlanets(){

    createPlanets();

}





/*==========================================================
            INICIALIZACIÓN
==========================================================*/

createPlanets();





debug(

    "✔ Planetas creados"

);
/*==========================================================
                    MÓDULO 8

                PARTE 8.4

            PLANETA CON ANILLOS

Crea un planeta especial con un sistema
de anillos generado por geometría.

==========================================================*/





/*==========================================================
            CREAR SATURNO
==========================================================*/

function createSaturn(){

    //----------------------------------
    // Geometría del planeta
    //----------------------------------

    const radius = 34;

    const geometry = new THREE.SphereGeometry(

        radius,

        64,

        64

    );



    saturn = new THREE.Mesh(

        geometry,

        saturnMaterial

    );



    saturn.position.set(

        950,

        120,

        -1300

    );



    saturn.rotation.z =

        THREE.MathUtils.degToRad(27);



    planetGroup.add(

        saturn

    );



    //----------------------------------
    // Geometría del anillo
    //----------------------------------

    const ringGeometry =

        new THREE.RingGeometry(

            radius * 1.45,

            radius * 2.35,

            128,

            8

        );



    //----------------------------------
    // Ajustar UV
    //----------------------------------

    const position =

        ringGeometry.attributes.position;



    const uv = [];



    for(

        let i = 0;

        i < position.count;

        i++

    ){

        const x = position.getX(i);

        const y = position.getY(i);

        const distance =

            Math.sqrt(

                x*x +

                y*y

            );



        uv.push(

            distance /

            (radius * 2.35),

            0

        );

    }



    ringGeometry.setAttribute(

        "uv",

        new THREE.Float32BufferAttribute(

            uv,

            2

        )

    );



    //----------------------------------
    // Crear anillo
    //----------------------------------

    ring = new THREE.Mesh(

        ringGeometry,

        ringMaterial

    );



    ring.rotation.x =

        Math.PI * 0.5;



    saturn.add(

        ring

    );



    //----------------------------------
    // Sombras
    //----------------------------------

    saturn.castShadow = true;

    saturn.receiveShadow = true;

}





/*==========================================================
        ACTUALIZAR SATURNO
==========================================================*/

function updateSaturn(){

    if(!saturn) return;



    saturn.rotation.y +=

        0.0012;



    ring.rotation.z +=

        0.00045;

}





/*==========================================================
        INICIALIZACIÓN
==========================================================*/

createSaturn();





debug(

"✔ Saturno creado"

);
/*==========================================================
                    MÓDULO 8

                PARTE 8.5

            LUNA Y SATÉLITE

La Luna orbita alrededor del primer
planeta del sistema.

==========================================================*/





/*==========================================================
                VARIABLES
==========================================================*/

let moonPivot = null;

let moonAngle = 0;





/*==========================================================
            CREAR LUNA
==========================================================*/

function createMoon(){

    //----------------------------------
    // Debe existir al menos un planeta
    //----------------------------------

    if(planets.length === 0){

        return;

    }

    //----------------------------------
    // Planeta principal
    //----------------------------------

    const parentPlanet =

        planets[0].mesh;





    //----------------------------------
    // Punto de órbita
    //----------------------------------

    moonPivot = new THREE.Object3D();

    parentPlanet.add(

        moonPivot

    );





    //----------------------------------
    // Geometría
    //----------------------------------

    const geometry =

        new THREE.SphereGeometry(

            6,

            48,

            48

        );





    moon =

        new THREE.Mesh(

            geometry,

            moonMaterial

        );





    //----------------------------------
    // Distancia
    //----------------------------------

    moon.position.set(

        38,

        0,

        0

    );





    //----------------------------------
    // Sombras
    //----------------------------------

    moon.castShadow = true;

    moon.receiveShadow = true;





    //----------------------------------
    // Añadir
    //----------------------------------

    moonPivot.add(

        moon

    );

}





/*==========================================================
            ACTUALIZAR LUNA
==========================================================*/

function updateMoon(){

    if(

        !moon ||

        !moonPivot

    ) return;





    //----------------------------------
    // Órbita
    //----------------------------------

    moonAngle +=

        0.008;





    moonPivot.rotation.y =

        moonAngle;





    //----------------------------------
    // Rotación propia
    //----------------------------------

    moon.rotation.y +=

        0.0025;





    //----------------------------------
    // Ligero balanceo
    //----------------------------------

    moon.position.y =

        Math.sin(

            elapsedTime *

            0.6

        ) * 1.5;

}
/*==========================================================
                    MÓDULO 8

                PARTE 8.6

            SISTEMA DE ÓRBITAS

Controla las órbitas de todos los
planetas del sistema.

==========================================================*/





/*==========================================================
            ACTUALIZAR PLANETAS
==========================================================*/

function updatePlanets(){

    //----------------------------------
    // Todos los planetas
    //----------------------------------

    for(const planet of planets){

        planet.update();

    }

    //----------------------------------
    // Saturno
    //----------------------------------

    updateSaturn();

    //----------------------------------
    // Luna
    //----------------------------------

    updateMoon();

    //----------------------------------
    // Movimiento del sistema completo
    //----------------------------------

    planetGroup.rotation.y +=

        PLANETS.rotationSpeed;





    //----------------------------------
    // Respiración
    //----------------------------------

    planetGroup.position.y =

        Math.sin(

            elapsedTime * 0.08

        ) * 8;





    //----------------------------------
    // Inclinación suave
    //----------------------------------

    planetGroup.rotation.x =

        Math.sin(

            elapsedTime * 0.03

        ) * 0.02;

}





/*==========================================================
        CAMBIAR VELOCIDAD ORBITAL
==========================================================*/

function setPlanetOrbitSpeed(value){

    for(const planet of planets){

        planet.speed = value;

    }

}





/*==========================================================
        CAMBIAR VELOCIDAD ROTACIÓN
==========================================================*/

function setPlanetRotationSpeed(value){

    for(const planet of planets){

        planet.rotation = value;

    }

}





/*==========================================================
        REINICIAR ÓRBITAS
==========================================================*/

function resetPlanetOrbits(){

    for(const planet of planets){

        planet.angle = random(

            0,

            Math.PI * 2

        );

    }

}
/*==========================================================
                    MÓDULO 8

                PARTE 8.7

        ANIMACIÓN CINEMATOGRÁFICA

==========================================================*/





/*==========================================================
        ANIMACIÓN PLANETARIA
==========================================================*/

function animatePlanetSystem(){

    //----------------------------------
    // Movimiento general
    //----------------------------------

    updatePlanets();





    //----------------------------------
    // Respiración del sistema
    //----------------------------------

    const breathe =

        1 +

        Math.sin(

            elapsedTime * 0.05

        ) * 0.015;



    planetGroup.scale.set(

        breathe,

        breathe,

        breathe

    );





    //----------------------------------
    // Rotación lenta del grupo
    //----------------------------------

    planetGroup.rotation.y +=

        PLANETS.rotationSpeed * 0.35;





    //----------------------------------
    // Balanceo suave
    //----------------------------------

    planetGroup.rotation.z =

        Math.sin(

            elapsedTime * 0.025

        ) * 0.015;





    //----------------------------------
    // Desplazamiento vertical
    //----------------------------------

    planetGroup.position.y =

        Math.sin(

            elapsedTime * 0.06

        ) * 6;

}
/*==========================================================
                    MÓDULO 8

                PARTE 8.8

    FINALIZACIÓN DEL SISTEMA PLANETARIO

==========================================================*/





/*==========================================================
            ELIMINAR PLANETAS
==========================================================*/

function disposePlanets(){

    //----------------------------------
    // Eliminar planetas
    //----------------------------------

    for(const planet of planets){

        if(planet.mesh){

            if(planet.mesh.geometry){

                planet.mesh.geometry.dispose();

            }

            if(planet.mesh.material){

                planet.mesh.material.dispose();

            }

            planetGroup.remove(

                planet.mesh

            );

        }

    }

    planets.length = 0;





    //----------------------------------
    // Saturno
    //----------------------------------

    if(saturn){

        if(saturn.geometry){

            saturn.geometry.dispose();

        }

        if(saturn.material){

            saturn.material.dispose();

        }

        planetGroup.remove(

            saturn

        );

        saturn = null;

    }





    //----------------------------------
    // Anillo
    //----------------------------------

    if(ring){

        if(ring.geometry){

            ring.geometry.dispose();

        }

        ring = null;

    }





    //----------------------------------
    // Luna
    //----------------------------------

    if(moon){

        if(moon.geometry){

            moon.geometry.dispose();

        }

        if(moon.material){

            moon.material.dispose();

        }

        moon = null;

    }

}





/*==========================================================
            REGENERAR SISTEMA
==========================================================*/

function rebuildPlanets(){

    disposePlanets();

    createPlanetMaterials();

    createPlanets();

    createSaturn();

    createMoon();

}





/*==========================================================
            OPTIMIZACIÓN
==========================================================*/

function optimizePlanets(){

    planetGroup.frustumCulled = false;

    planetGroup.matrixAutoUpdate = true;

}





/*==========================================================
            DEPURACIÓN
==========================================================*/

function planetInformation(){

    console.log(

        "%c========== PLANETAS ==========",

        "color:#87CEEB;font-weight:bold;"

    );



    console.log(

        "Planetas:",

        planets.length

    );



    console.log(

        "Saturno:",

        saturn !== null

    );



    console.log(

        "Luna:",

        moon !== null

    );



    console.log(

        "Grupo:",

        planetGroup.children.length

    );

}





/*==========================================================
        ATAJO DE REGENERACIÓN
==========================================================*/

window.addEventListener(

    "keydown",

    (event)=>{

        if(

            event.key.toLowerCase()

            ===

            "p"

        ){

            rebuildPlanets();

        }

    }

);





/*==========================================================
            INICIALIZACIÓN
==========================================================*/

optimizePlanets();

planetInformation();





debug(

    "✔ Sistema planetario finalizado"

);
/*==========================================================
                    MÓDULO 9

            SISTEMA DE CONSTELACIONES

                PARTE 9.1

        VARIABLES, CONFIGURACIÓN Y CLASE BASE

¿Qué hará este sistema?
-----------------------

• Creará constelaciones con estrellas y líneas.
• Las líneas aparecerán progresivamente.
• Algunas constelaciones estarán ocultas al inicio.
• Habrá una constelación especial para Dani.
• Podrán reaccionar a la interacción más adelante.

==========================================================*/



/*==========================================================
                VARIABLES PRINCIPALES
==========================================================*/

const constellations = [];

let constellationStarMaterial = null;

let constellationLineMaterial = null;



/*==========================================================
                CONFIGURACIÓN
==========================================================*/

const CONSTELLATION = {

    /* Tamaño general de las constelaciones */

    scale: 42,


    /* Tamaño de las estrellas */

    starSize: 2.8,


    /* Brillo normal */

    starOpacity: 0.9,


    /* Brillo de las líneas */

    lineOpacity: 0.42,


    /* Velocidad con la que se dibujan */

    drawSpeed: 0.23,


    /* Velocidad de flotación */

    floatingSpeed: 0.18,


    /* Intensidad de flotación */

    floatingDistance: 6,


    /* Velocidad de rotación */

    rotationSpeed: 0.00015,


    /* Distancia mínima de la cámara */

    minVisibleDistance: 100,


    /* Distancia máxima de la cámara */

    maxVisibleDistance: 1800

};



/*==========================================================
                COLORES
==========================================================*/

const CONSTELLATION_COLORS = {

    white: new THREE.Color(0xffffff),

    blue: new THREE.Color(0x89bbff),

    violet: new THREE.Color(0xb69cff),

    red: new THREE.Color(0xff7896),

    pink: new THREE.Color(0xffa8ca)

};



/*==========================================================
        MATERIAL DE LAS ESTRELLAS
==========================================================*/

function createConstellationStarMaterial(){

    constellationStarMaterial =

        new THREE.PointsMaterial({

            color: CONSTELLATION_COLORS.white,

            size: CONSTELLATION.starSize,

            transparent: true,

            opacity: CONSTELLATION.starOpacity,

            depthWrite: false,

            sizeAttenuation: true,

            blending: THREE.AdditiveBlending

        });

}



/*==========================================================
        MATERIAL DE LAS LÍNEAS
==========================================================*/

function createConstellationLineMaterial(){

    constellationLineMaterial =

        new THREE.LineBasicMaterial({

            color: CONSTELLATION_COLORS.blue,

            transparent: true,

            opacity: CONSTELLATION.lineOpacity,

            depthWrite: false,

            blending: THREE.AdditiveBlending

        });

}



/*==========================================================
                CLASE CONSTELLATION
==========================================================*/

class Constellation {

    constructor({

        name,

        points,

        position = new THREE.Vector3(),

        scale = CONSTELLATION.scale,

        starColor = CONSTELLATION_COLORS.white,

        lineColor = CONSTELLATION_COLORS.blue,

        hidden = false

    }){

        this.name = name;

        this.points = points;

        this.position = position;

        this.scale = scale;

        this.starColor = starColor;

        this.lineColor = lineColor;

        this.hidden = hidden;


        /* Grupo principal */

        this.group = new THREE.Group();


        /* Objetos visuales */

        this.stars = null;

        this.lines = null;


        /* Animación */

        this.drawProgress = hidden ? 0 : 1;

        this.targetProgress = hidden ? 0 : 1;

        this.opacity = hidden ? 0 : 1;

        this.targetOpacity = hidden ? 0 : 1;


        /* Movimiento individual */

        this.floatOffset = random(

            0,

            Math.PI * 2

        );


        this.rotationOffset = random(

            -0.00008,

            0.00008

        );


        /* Estado */

        this.created = false;

        this.active = !hidden;

    }



    /*======================================================
                    MOSTRAR
    ======================================================*/

    show(){

        this.active = true;

        this.targetProgress = 1;

        this.targetOpacity = 1;

    }



    /*======================================================
                    OCULTAR
    ======================================================*/

    hide(){

        this.active = false;

        this.targetProgress = 0;

        this.targetOpacity = 0;

    }



    /*======================================================
                    ALTERNAR
    ======================================================*/

    toggle(){

        if(this.active){

            this.hide();

        }else{

            this.show();

        }

    }



    /*======================================================
                    ACTUALIZAR
    ======================================================*/

    update(){

        if(!this.created) return;


        //----------------------------------
        // Aparición suave
        //----------------------------------

        this.drawProgress = lerp(

            this.drawProgress,

            this.targetProgress,

            CONSTELLATION.drawSpeed * deltaTime

        );


        this.opacity = lerp(

            this.opacity,

            this.targetOpacity,

            CONSTELLATION.drawSpeed * deltaTime

        );


        //----------------------------------
        // Opacidad de estrellas
        //----------------------------------

        if(this.stars){

            this.stars.material.opacity =

                this.opacity *

                CONSTELLATION.starOpacity;

        }


        //----------------------------------
        // Opacidad de líneas
        //----------------------------------

        if(this.lines){

            this.lines.material.opacity =

                this.opacity *

                CONSTELLATION.lineOpacity;

        }


        //----------------------------------
        // Flotación
        //----------------------------------

        this.group.position.y =

            this.position.y +

            Math.sin(

                elapsedTime *

                CONSTELLATION.floatingSpeed +

                this.floatOffset

            ) *

            CONSTELLATION.floatingDistance;


        //----------------------------------
        // Movimiento muy lento
        //----------------------------------

        this.group.rotation.y +=

            CONSTELLATION.rotationSpeed +

            this.rotationOffset;


        this.group.rotation.z =

            Math.sin(

                elapsedTime * 0.08 +

                this.floatOffset

            ) * 0.025;

    }

}



/*==========================================================
        CREAR MATERIALES PRINCIPALES
==========================================================*/

createConstellationStarMaterial();

createConstellationLineMaterial();



debug(

    "✔ Base del sistema de constelaciones creada"

);
/*==========================================================
                    MÓDULO 9

                PARTE 9.2

        CONSTRUCCIÓN DE CONSTELACIONES

Convierte coordenadas en estrellas y líneas
reales dentro del universo.

==========================================================*/



/*==========================================================
        NORMALIZAR UN PUNTO

Acepta estas dos formas:

new THREE.Vector3(1, 2, 0)

o:

[1, 2, 0]
==========================================================*/

function normalizeConstellationPoint(point){

    if(point instanceof THREE.Vector3){

        return point.clone();

    }

    if(

        Array.isArray(point) &&

        point.length >= 2

    ){

        return new THREE.Vector3(

            point[0],

            point[1],

            point[2] || 0

        );

    }

    console.warn(

        "Punto inválido en una constelación:",

        point

    );

    return new THREE.Vector3();

}



/*==========================================================
        CREAR GEOMETRÍA DE ESTRELLAS
==========================================================*/

function createConstellationStarsGeometry(

    points,

    scale

){

    const positions = [];

    for(const originalPoint of points){

        const point =

            normalizeConstellationPoint(

                originalPoint

            );

        positions.push(

            point.x * scale,

            point.y * scale,

            point.z * scale

        );

    }

    const geometry =

        new THREE.BufferGeometry();

    geometry.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(

            positions,

            3

        )

    );

    geometry.computeBoundingSphere();

    return geometry;

}



/*==========================================================
        CREAR CONEXIONES AUTOMÁTICAS

Conecta:

0 → 1
1 → 2
2 → 3
etc.
==========================================================*/

function createSequentialConnections(

    pointCount

){

    const connections = [];

    for(

        let index = 0;

        index < pointCount - 1;

        index++

    ){

        connections.push([

            index,

            index + 1

        ]);

    }

    return connections;

}



/*==========================================================
        CREAR GEOMETRÍA DE LÍNEAS
==========================================================*/

function createConstellationLinesGeometry(

    points,

    connections,

    scale

){

    const positions = [];

    for(const connection of connections){

        const startIndex = connection[0];

        const endIndex = connection[1];

        const startPoint = points[startIndex];

        const endPoint = points[endIndex];

        if(

            startPoint === undefined ||

            endPoint === undefined

        ){

            console.warn(

                "Conexión inválida:",

                connection

            );

            continue;

        }

        const start =

            normalizeConstellationPoint(

                startPoint

            );

        const end =

            normalizeConstellationPoint(

                endPoint

            );

        positions.push(

            start.x * scale,

            start.y * scale,

            start.z * scale,

            end.x * scale,

            end.y * scale,

            end.z * scale

        );

    }

    const geometry =

        new THREE.BufferGeometry();

    geometry.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(

            positions,

            3

        )

    );

    /*
        Al principio no se dibuja ninguna línea.

        drawRange será actualizado de acuerdo
        con drawProgress.
    */

    geometry.setDrawRange(

        0,

        0

    );

    geometry.computeBoundingSphere();

    return geometry;

}



/*==========================================================
        CREAR MATERIAL INDIVIDUAL
==========================================================*/

function createIndividualConstellationStarMaterial(

    color

){

    const material =

        constellationStarMaterial.clone();

    material.color.copy(color);

    material.opacity = 0;

    return material;

}



function createIndividualConstellationLineMaterial(

    color

){

    const material =

        constellationLineMaterial.clone();

    material.color.copy(color);

    material.opacity = 0;

    return material;

}



/*==========================================================
        CONSTRUIR UNA CONSTELACIÓN

Parámetros:

name:
Nombre interno.

points:
Lista de coordenadas.

connections:
Pares de índices que se conectan.

position:
Posición dentro del universo.

scale:
Tamaño.

starColor:
Color de las estrellas.

lineColor:
Color de las líneas.

hidden:
Si comienza oculta.
==========================================================*/

function createConstellation({

    name,

    points,

    connections = null,

    position = new THREE.Vector3(),

    scale = CONSTELLATION.scale,

    starColor = CONSTELLATION_COLORS.white,

    lineColor = CONSTELLATION_COLORS.blue,

    hidden = false

}){

    if(

        !Array.isArray(points) ||

        points.length < 2

    ){

        console.warn(

            `La constelación "${name}" no tiene suficientes puntos.`

        );

        return null;

    }

    /*
        Si no se especifican conexiones,
        los puntos se conectan en orden.
    */

    const finalConnections =

        Array.isArray(connections)

            ? connections

            : createSequentialConnections(

                points.length

            );

    const constellation =

        new Constellation({

            name,

            points,

            position,

            scale,

            starColor,

            lineColor,

            hidden

        });



    /*--------------------------------------
            Crear estrellas
    --------------------------------------*/

    const starsGeometry =

        createConstellationStarsGeometry(

            points,

            scale

        );

    const starsMaterial =

        createIndividualConstellationStarMaterial(

            starColor

        );

    constellation.stars =

        new THREE.Points(

            starsGeometry,

            starsMaterial

        );



    /*--------------------------------------
            Crear líneas
    --------------------------------------*/

    const linesGeometry =

        createConstellationLinesGeometry(

            points,

            finalConnections,

            scale

        );

    const linesMaterial =

        createIndividualConstellationLineMaterial(

            lineColor

        );

    constellation.lines =

        new THREE.LineSegments(

            linesGeometry,

            linesMaterial

        );



    /*--------------------------------------
            Datos internos
    --------------------------------------*/

    constellation.connections =

        finalConnections;

    constellation.lineVertexCount =

        linesGeometry.attributes.position.count;

    constellation.group.name =

        `Constellation_${name}`;

    constellation.group.userData.type =

        "constellation";

    constellation.group.userData.constellation =

        constellation;



    /*--------------------------------------
            Composición
    --------------------------------------*/

    constellation.group.add(

        constellation.lines

    );

    constellation.group.add(

        constellation.stars

    );

    constellation.group.position.copy(

        position

    );



    /*--------------------------------------
            Estado inicial
    --------------------------------------*/

    if(hidden){

        constellation.stars.material.opacity = 0;

        constellation.lines.material.opacity = 0;

        constellation.lines.geometry.setDrawRange(

            0,

            0

        );

    }else{

        constellation.stars.material.opacity =

            CONSTELLATION.starOpacity;

        constellation.lines.material.opacity =

            CONSTELLATION.lineOpacity;

        constellation.lines.geometry.setDrawRange(

            0,

            constellation.lineVertexCount

        );

    }



    /*--------------------------------------
            Guardar y añadir
    --------------------------------------*/

    constellation.created = true;

    constellations.push(

        constellation

    );

    constellationsGroup.add(

        constellation.group

    );

    return constellation;

}



/*==========================================================
        ACTUALIZAR EL DIBUJO DE LÍNEAS
==========================================================*/

function updateConstellationDrawing(

    constellation

){

    if(

        !constellation.lines ||

        !constellation.lines.geometry

    ){

        return;

    }

    const totalVertices =

        constellation.lineVertexCount;

    let visibleVertices = Math.floor(

        totalVertices *

        clamp(

            constellation.drawProgress,

            0,

            1

        )

    );

    /*
        LineSegments necesita pares de vértices.
        Convertimos el número a un valor par.
    */

    visibleVertices -=

        visibleVertices % 2;

    constellation.lines.geometry.setDrawRange(

        0,

        visibleVertices

    );

}



/*==========================================================
        ACTUALIZAR TODAS LAS CONSTELACIONES
==========================================================*/

function updateConstellations(){

    for(

        const constellation

        of

        constellations

    ){

        constellation.update();

        updateConstellationDrawing(

            constellation

        );

    }

}



/*==========================================================
        BUSCAR CONSTELACIÓN POR NOMBRE
==========================================================*/

function getConstellationByName(name){

    return constellations.find(

        constellation =>

            constellation.name === name

    ) || null;

}



/*==========================================================
        MOSTRAR CONSTELACIÓN POR NOMBRE
==========================================================*/

function showConstellation(name){

    const constellation =

        getConstellationByName(name);

    if(constellation){

        constellation.show();

    }

}



/*==========================================================
        OCULTAR CONSTELACIÓN POR NOMBRE
==========================================================*/

function hideConstellation(name){

    const constellation =

        getConstellationByName(name);

    if(constellation){

        constellation.hide();

    }

}



/*==========================================================
                INFORMACIÓN
==========================================================*/

debug(

    "✔ Constructor de constelaciones preparado"

);
/*==========================================================
                    MÓDULO 9

                PARTE 9.4

      ANIMACIÓN AVANZADA DE CONSTELACIONES

Añade:

• Parpadeo individual
• Pulsación de estrellas
• Brillo dinámico
• Movimiento con profundidad
• Visibilidad según la cámara

==========================================================*/



/*==========================================================
        PREPARAR DATOS DE ANIMACIÓN
==========================================================*/

function prepareConstellationAnimations(){

    for(const constellation of constellations){

        constellation.twinkleOffset = random(

            0,

            Math.PI * 2

        );

        constellation.twinkleSpeed = random(

            0.7,

            1.5

        );

        constellation.pulseStrength = random(

            0.05,

            0.14

        );

        constellation.depthOffset = random(

            0,

            Math.PI * 2

        );

        constellation.baseScale =

            constellation.group.scale.x || 1;

        constellation.baseStarOpacity =

            CONSTELLATION.starOpacity;

        constellation.baseLineOpacity =

            CONSTELLATION.lineOpacity;

    }

}



/*==========================================================
        DISTANCIA ENTRE CÁMARA Y CONSTELACIÓN
==========================================================*/

function getConstellationCameraDistance(

    constellation

){

    const worldPosition =

        new THREE.Vector3();

    constellation.group.getWorldPosition(

        worldPosition

    );

    return camera.position.distanceTo(

        worldPosition

    );

}



/*==========================================================
        VISIBILIDAD SEGÚN DISTANCIA
==========================================================*/

function calculateConstellationVisibility(

    constellation

){

    const distance =

        getConstellationCameraDistance(

            constellation

        );

    const nearFade =

        THREE.MathUtils.smoothstep(

            distance,

            CONSTELLATION.minVisibleDistance * 0.45,

            CONSTELLATION.minVisibleDistance

        );

    const farFade =

        1 -

        THREE.MathUtils.smoothstep(

            distance,

            CONSTELLATION.maxVisibleDistance * 0.72,

            CONSTELLATION.maxVisibleDistance

        );

    return clamp(

        nearFade * farFade,

        0,

        1

    );

}



/*==========================================================
        PARPADEO DE ESTRELLAS
==========================================================*/

function updateConstellationTwinkle(

    constellation

){

    if(!constellation.stars){

        return;

    }

    const twinkle =

        0.88 +

        Math.sin(

            elapsedTime *

            constellation.twinkleSpeed +

            constellation.twinkleOffset

        ) * 0.12;

    const visibility =

        calculateConstellationVisibility(

            constellation

        );

    constellation.stars.material.opacity =

        constellation.opacity *

        constellation.baseStarOpacity *

        twinkle *

        visibility;

}



/*==========================================================
        BRILLO DE LÍNEAS
==========================================================*/

function updateConstellationLineGlow(

    constellation

){

    if(!constellation.lines){

        return;

    }

    const glow =

        0.82 +

        Math.sin(

            elapsedTime * 0.65 +

            constellation.twinkleOffset

        ) * 0.18;

    const visibility =

        calculateConstellationVisibility(

            constellation

        );

    constellation.lines.material.opacity =

        constellation.opacity *

        constellation.baseLineOpacity *

        glow *

        visibility;

}



/*==========================================================
        PULSACIÓN DE LA CONSTELACIÓN
==========================================================*/

function updateConstellationPulse(

    constellation

){

    const pulse =

        1 +

        Math.sin(

            elapsedTime * 0.45 +

            constellation.twinkleOffset

        ) *

        constellation.pulseStrength;

    constellation.group.scale.setScalar(

        constellation.baseScale *

        pulse

    );

}



/*==========================================================
        MOVIMIENTO DE PROFUNDIDAD
==========================================================*/

function updateConstellationDepth(

    constellation

){

    constellation.group.position.z =

        constellation.position.z +

        Math.sin(

            elapsedTime * 0.07 +

            constellation.depthOffset

        ) * 10;

}



/*==========================================================
        ANIMACIÓN ESPECIAL DEL CORAZÓN
==========================================================*/

function updateHeartConstellation(){

    if(

        !heartConstellation ||

        !heartConstellation.active

    ){

        return;

    }

    const heartbeat =

        1 +

        Math.pow(

            Math.max(

                0,

                Math.sin(

                    elapsedTime * 2.2

                )

            ),

            8

        ) * 0.08;

    heartConstellation.group.scale.multiplyScalar(

        heartbeat

    );

}



/*==========================================================
        ANIMACIÓN ESPECIAL DE LA LETRA D
==========================================================*/

function updateLetterDConstellation(){

    if(

        !letterDConstellation ||

        !letterDConstellation.active

    ){

        return;

    }

    letterDConstellation.group.rotation.y +=

        0.00035;

}



/*==========================================================
        ACTUALIZACIÓN AVANZADA
==========================================================*/

function updateAdvancedConstellationEffects(){

    for(const constellation of constellations){

        updateConstellationTwinkle(

            constellation

        );

        updateConstellationLineGlow(

            constellation

        );

        updateConstellationPulse(

            constellation

        );

        updateConstellationDepth(

            constellation

        );

    }

    updateHeartConstellation();

    updateLetterDConstellation();

}



/*==========================================================
        INICIALIZACIÓN
==========================================================*/

prepareConstellationAnimations();



debug(

    "✔ Animación avanzada de constelaciones preparada"

);
/*==========================================================
                    MÓDULO 9

                PARTE 9.5

       INTERACCIÓN CON CONSTELACIONES

Permite tocar las constelaciones para:

• Encender sus estrellas
• Crear un pulso de luz
• Revelar constelaciones ocultas
• Descubrir el corazón
• Descubrir la letra D
• Funcionar con ratón y pantalla táctil

==========================================================*/



/*==========================================================
                CONFIGURACIÓN
==========================================================*/

const CONSTELLATION_INTERACTION = {

    /* Distancia máxima permitida entre
       el inicio y el final de un toque */

    tapDistance: 14,


    /* Tiempo máximo de un toque */

    tapDuration: 450,


    /* Distancia de detección de puntos */

    pointThreshold: 14,


    /* Toques necesarios para revelar
       la constelación del corazón */

    heartTouches: 3,


    /* Toques necesarios para revelar
       la letra D */

    letterDTouches: 6,


    /* Duración del pulso visual */

    pulseDuration: 850

};



/*==========================================================
                ESTADO
==========================================================*/

let constellationTouchCount = 0;

let pointerStartX = 0;

let pointerStartY = 0;

let pointerStartTime = 0;

let pointerMoved = false;

let lastConstellationTouched = null;



/*==========================================================
        CONFIGURAR EL RAYCASTER
==========================================================*/

raycaster.params.Points.threshold =

    CONSTELLATION_INTERACTION.pointThreshold;



/*==========================================================
        PREPARAR OBJETOS INTERACTIVOS
==========================================================*/

function prepareConstellationInteraction(){

    for(const constellation of constellations){

        if(constellation.stars){

            constellation.stars.userData.type =

                "constellation-star";

            constellation.stars.userData.constellation =

                constellation;

        }

        if(constellation.lines){

            constellation.lines.userData.type =

                "constellation-line";

            constellation.lines.userData.constellation =

                constellation;

        }

        constellation.group.userData.type =

            "constellation";

        constellation.group.userData.constellation =

            constellation;


        /* Valores utilizados durante el pulso */

        constellation.interactionPulse = 0;

        constellation.targetInteractionPulse = 0;

        constellation.lastTouchTime = 0;

    }

}



/*==========================================================
        CONVERTIR POSICIÓN DEL PUNTERO
==========================================================*/

function setPointerCoordinates(event){

    const rect =

        renderer.domElement.getBoundingClientRect();

    mouse.x =

        (

            (event.clientX - rect.left) /

            rect.width

        ) * 2 - 1;

    mouse.y =

        -(

            (event.clientY - rect.top) /

            rect.height

        ) * 2 + 1;

}



/*==========================================================
        OBTENER OBJETOS INTERACTIVOS
==========================================================*/

function getConstellationInteractiveObjects(){

    const interactiveObjects = [];

    for(const constellation of constellations){

        if(

            constellation.stars &&

            constellation.opacity > 0.08

        ){

            interactiveObjects.push(

                constellation.stars

            );

        }

    }

    return interactiveObjects;

}



/*==========================================================
        DETECTAR CONSTELACIÓN
==========================================================*/

function findTouchedConstellation(event){

    setPointerCoordinates(event);

    raycaster.setFromCamera(

        mouse,

        camera

    );

    const interactiveObjects =

        getConstellationInteractiveObjects();

    const intersections =

        raycaster.intersectObjects(

            interactiveObjects,

            false

        );

    if(intersections.length === 0){

        return null;

    }

    const selectedObject =

        intersections[0].object;

    return (

        selectedObject.userData.constellation ||

        null

    );

}



/*==========================================================
        PULSO DE UNA CONSTELACIÓN
==========================================================*/

function pulseConstellation(

    constellation

){

    if(!constellation){

        return;

    }

    constellation.targetInteractionPulse = 1;

    constellation.lastTouchTime =

        performance.now();

    if(constellation.stars){

        constellation.stars.material.opacity =

            1;

    }

    if(constellation.lines){

        constellation.lines.material.opacity =

            Math.min(

                1,

                CONSTELLATION.lineOpacity * 2.2

            );

    }

}



/*==========================================================
        REVELAR CONSTELACIONES SECRETAS
==========================================================*/

function checkSecretConstellationProgress(){

    if(

        constellationTouchCount >=

        CONSTELLATION_INTERACTION.heartTouches

    ){

        if(

            heartConstellation &&

            !heartConstellation.active

        ){

            revealHeartConstellation();

            pulseConstellation(

                heartConstellation

            );

        }

    }

    if(

        constellationTouchCount >=

        CONSTELLATION_INTERACTION.letterDTouches

    ){

        if(

            letterDConstellation &&

            !letterDConstellation.active

        ){

            revealLetterDConstellation();

            pulseConstellation(

                letterDConstellation

            );

        }

    }

}



/*==========================================================
        ACTIVAR CONSTELACIÓN
==========================================================*/

function activateConstellation(

    constellation

){

    if(!constellation){

        return;

    }

    lastConstellationTouched =

        constellation;

    constellationTouchCount += 1;

    pulseConstellation(

        constellation

    );

    checkSecretConstellationProgress();

    console.log(

        "Constelación tocada:",

        constellation.name,

        "| Total:",

        constellationTouchCount

    );

}



/*==========================================================
        ACTUALIZAR PULSO DE INTERACCIÓN
==========================================================*/

function updateConstellationInteraction(){

    const currentTime =

        performance.now();

    for(const constellation of constellations){

        if(

            constellation.interactionPulse ===

            undefined

        ){

            continue;

        }

        const timeSinceTouch =

            currentTime -

            constellation.lastTouchTime;

        if(

            timeSinceTouch >

            CONSTELLATION_INTERACTION.pulseDuration

        ){

            constellation.targetInteractionPulse = 0;

        }

        constellation.interactionPulse =

            lerp(

                constellation.interactionPulse,

                constellation.targetInteractionPulse,

                0.08

            );

        const pulseScale =

            1 +

            constellation.interactionPulse *

            0.18;

        /*
            No sustituye la pulsación del Módulo 9.4.
            Solo añade una reacción breve al tocarla.
        */

        constellation.group.scale.multiplyScalar(

            pulseScale

        );

        if(constellation.stars){

            constellation.stars.material.opacity =

                Math.min(

                    1,

                    constellation.stars.material.opacity +

                    constellation.interactionPulse * 0.35

                );

        }

        if(constellation.lines){

            constellation.lines.material.opacity =

                Math.min(

                    1,

                    constellation.lines.material.opacity +

                    constellation.interactionPulse * 0.22

                );

        }

    }

}



/*==========================================================
        INICIO DEL TOQUE
==========================================================*/

function onConstellationPointerDown(event){

    pointerStartX =

        event.clientX;

    pointerStartY =

        event.clientY;

    pointerStartTime =

        performance.now();

    pointerMoved = false;

}



/*==========================================================
        MOVIMIENTO DEL PUNTERO
==========================================================*/

function onConstellationPointerMove(event){

    const movementX =

        event.clientX -

        pointerStartX;

    const movementY =

        event.clientY -

        pointerStartY;

    const movementDistance =

        Math.sqrt(

            movementX * movementX +

            movementY * movementY

        );

    if(

        movementDistance >

        CONSTELLATION_INTERACTION.tapDistance

    ){

        pointerMoved = true;

    }

}



/*==========================================================
        FINAL DEL TOQUE
==========================================================*/

function onConstellationPointerUp(event){

    const touchDuration =

        performance.now() -

        pointerStartTime;

    if(pointerMoved){

        return;

    }

    if(

        touchDuration >

        CONSTELLATION_INTERACTION.tapDuration

    ){

        return;

    }

    const constellation =

        findTouchedConstellation(event);

    if(constellation){

        activateConstellation(

            constellation

        );

    }

}



/*==========================================================
        EVENTOS
==========================================================*/

renderer.domElement.addEventListener(

    "pointerdown",

    onConstellationPointerDown,

    { passive: true }

);

renderer.domElement.addEventListener(

    "pointermove",

    onConstellationPointerMove,

    { passive: true }

);

renderer.domElement.addEventListener(

    "pointerup",

    onConstellationPointerUp,

    { passive: true }

);

renderer.domElement.addEventListener(

    "pointercancel",

    () => {

        pointerMoved = true;

    },

    { passive: true }

);



/*==========================================================
        REINICIAR DESCUBRIMIENTO
==========================================================*/

function resetConstellationInteraction(){

    constellationTouchCount = 0;

    lastConstellationTouched = null;

    hideSecretConstellations();

    for(const constellation of constellations){

        constellation.interactionPulse = 0;

        constellation.targetInteractionPulse = 0;

    }

}



/*==========================================================
                INICIALIZACIÓN
==========================================================*/

prepareConstellationInteraction();



debug(

    "✔ Interacción con constelaciones preparada"

);
/*==========================================================
                    MÓDULO 9

                PARTE 9.6

        OPTIMIZACIÓN Y FINALIZACIÓN
            DE CONSTELACIONES

Controla:

• Liberación de memoria
• Reconstrucción del sistema
• Calidad gráfica
• Estado de interacción
• Depuración
• Limpieza de eventos

==========================================================*/



/*==========================================================
            ESTADO DEL SISTEMA
==========================================================*/

let constellationEventsEnabled = true;

let constellationSystemDisposed = false;



/*==========================================================
        ELIMINAR UNA CONSTELACIÓN
==========================================================*/

function disposeConstellation(

    constellation

){

    if(!constellation){

        return;

    }

    //----------------------------------
    // Geometría de estrellas
    //----------------------------------

    if(

        constellation.stars &&

        constellation.stars.geometry

    ){

        constellation.stars.geometry.dispose();

    }

    //----------------------------------
    // Material de estrellas
    //----------------------------------

    if(

        constellation.stars &&

        constellation.stars.material

    ){

        constellation.stars.material.dispose();

    }

    //----------------------------------
    // Geometría de líneas
    //----------------------------------

    if(

        constellation.lines &&

        constellation.lines.geometry

    ){

        constellation.lines.geometry.dispose();

    }

    //----------------------------------
    // Material de líneas
    //----------------------------------

    if(

        constellation.lines &&

        constellation.lines.material

    ){

        constellation.lines.material.dispose();

    }

    //----------------------------------
    // Eliminar del grupo principal
    //----------------------------------

    if(constellation.group){

        constellationsGroup.remove(

            constellation.group

        );

        constellation.group.clear();

    }

    //----------------------------------
    // Limpiar referencias
    //----------------------------------

    constellation.stars = null;

    constellation.lines = null;

    constellation.group = null;

    constellation.created = false;

}



/*==========================================================
        ELIMINAR TODAS LAS CONSTELACIONES
==========================================================*/

function disposeConstellations(){

    for(

        const constellation

        of

        constellations

    ){

        disposeConstellation(

            constellation

        );

    }

    constellations.length = 0;

    blueConstellation = null;

    heartConstellation = null;

    letterDConstellation = null;

    lastConstellationTouched = null;

    constellationSystemDisposed = true;

}



/*==========================================================
        RECONSTRUIR CONSTELACIONES
==========================================================*/

function rebuildConstellations(){

    disposeConstellations();

    createMainConstellations();

    prepareConstellationAnimations();

    prepareConstellationInteraction();

    resetConstellationInteraction();

    constellationSystemDisposed = false;

    debug(

        "✔ Constelaciones reconstruidas"

    );

}



/*==========================================================
        ACTIVAR EVENTOS
==========================================================*/

function enableConstellationEvents(){

    if(constellationEventsEnabled){

        return;

    }

    renderer.domElement.addEventListener(

        "pointerdown",

        onConstellationPointerDown,

        { passive: true }

    );

    renderer.domElement.addEventListener(

        "pointermove",

        onConstellationPointerMove,

        { passive: true }

    );

    renderer.domElement.addEventListener(

        "pointerup",

        onConstellationPointerUp,

        { passive: true }

    );

    constellationEventsEnabled = true;

}



/*==========================================================
        DESACTIVAR EVENTOS
==========================================================*/

function disableConstellationEvents(){

    if(!constellationEventsEnabled){

        return;

    }

    renderer.domElement.removeEventListener(

        "pointerdown",

        onConstellationPointerDown

    );

    renderer.domElement.removeEventListener(

        "pointermove",

        onConstellationPointerMove

    );

    renderer.domElement.removeEventListener(

        "pointerup",

        onConstellationPointerUp

    );

    constellationEventsEnabled = false;

}



/*==========================================================
        CALIDAD PARA TELÉFONOS
==========================================================*/

function optimizeConstellationQuality(){

    const cores =

        navigator.hardwareConcurrency || 4;

    const mobileDevice =

        window.matchMedia(

            "(pointer: coarse)"

        ).matches;

    if(

        mobileDevice ||

        cores <= 4

    ){

        CONSTELLATION.starSize = 2.3;

        CONSTELLATION.lineOpacity = 0.32;

        CONSTELLATION.rotationSpeed = 0.0001;

        CONSTELLATION.floatingDistance = 4;

        CONSTELLATION_INTERACTION.pointThreshold = 18;

        raycaster.params.Points.threshold =

            CONSTELLATION_INTERACTION.pointThreshold;

        console.log(

            "Constelaciones: calidad móvil"

        );

    }else{

        CONSTELLATION.starSize = 2.8;

        CONSTELLATION.lineOpacity = 0.42;

        CONSTELLATION.rotationSpeed = 0.00015;

        CONSTELLATION.floatingDistance = 6;

        CONSTELLATION_INTERACTION.pointThreshold = 14;

        raycaster.params.Points.threshold =

            CONSTELLATION_INTERACTION.pointThreshold;

        console.log(

            "Constelaciones: calidad alta"

        );

    }

}



/*==========================================================
        ACTUALIZAR MATERIALES SEGÚN CALIDAD
==========================================================*/

function refreshConstellationMaterials(){

    for(

        const constellation

        of

        constellations

    ){

        if(constellation.stars){

            constellation.stars.material.size =

                CONSTELLATION.starSize;

            constellation.stars.material.needsUpdate =

                true;

        }

        if(constellation.lines){

            constellation.baseLineOpacity =

                CONSTELLATION.lineOpacity;

            constellation.lines.material.opacity =

                constellation.opacity *

                CONSTELLATION.lineOpacity;

            constellation.lines.material.needsUpdate =

                true;

        }

    }

}



/*==========================================================
        LIMITAR ANIMACIONES INVISIBLES
==========================================================*/

function shouldUpdateConstellation(

    constellation

){

    if(!constellation){

        return false;

    }

    if(

        constellation.opacity < 0.005 &&

        constellation.targetOpacity === 0

    ){

        return false;

    }

    const distance =

        getConstellationCameraDistance(

            constellation

        );

    return distance <=

        CONSTELLATION.maxVisibleDistance * 1.25;

}



/*==========================================================
        ACTUALIZACIÓN OPTIMIZADA
==========================================================*/

function updateOptimizedConstellations(){

    if(constellationSystemDisposed){

        return;

    }

    for(

        const constellation

        of

        constellations

    ){

        if(

            !shouldUpdateConstellation(

                constellation

            )

        ){

            continue;

        }

        constellation.update();

        updateConstellationDrawing(

            constellation

        );

    }

    updateAdvancedConstellationEffects();

    updateConstellationInteraction();

}



/*==========================================================
        INFORMACIÓN DEL SISTEMA
==========================================================*/

function constellationInformation(){

    console.log(

        "%c======= CONSTELACIONES =======",

        "color:#b89cff;font-weight:bold;"

    );

    console.log(

        "Cantidad:",

        constellations.length

    );

    console.log(

        "Toques registrados:",

        constellationTouchCount

    );

    console.log(

        "Corazón revelado:",

        Boolean(

            heartConstellation &&

            heartConstellation.active

        )

    );

    console.log(

        "Letra D revelada:",

        Boolean(

            letterDConstellation &&

            letterDConstellation.active

        )

    );

    console.log(

        "Eventos activos:",

        constellationEventsEnabled

    );

}



/*==========================================================
        ATAJOS DE PRUEBA

C = reconstruir
H = mostrar corazón
D = mostrar letra D
R = reiniciar secretos
==========================================================*/

function onConstellationDebugKey(

    event

){

    const key =

        event.key.toLowerCase();

    if(key === "c"){

        rebuildConstellations();

    }

    if(key === "h"){

        revealHeartConstellation();

    }

    if(key === "d"){

        revealLetterDConstellation();

    }

    if(key === "r"){

        resetConstellationInteraction();

    }

}



window.addEventListener(

    "keydown",

    onConstellationDebugKey

);



/*==========================================================
        LIMPIEZA AL CERRAR LA PÁGINA
==========================================================*/

window.addEventListener(

    "beforeunload",

    () => {

        disableConstellationEvents();

    }

);



/*==========================================================
        INICIALIZACIÓN
==========================================================*/

optimizeConstellationQuality();

refreshConstellationMaterials();

constellationInformation();



debug(

    "✔ Sistema de constelaciones finalizado"

);
/*==========================================================
                    MÓDULO 9

                PARTE 9.7

        SECUENCIA CINEMATOGRÁFICA

==========================================================*/

const CONSTELLATION_SEQUENCE = {

    started:false,

    timer:0,

    stage:0,

    finished:false

};



function startConstellationSequence(){

    CONSTELLATION_SEQUENCE.started = true;

    CONSTELLATION_SEQUENCE.timer = 0;

    CONSTELLATION_SEQUENCE.stage = 0;

    CONSTELLATION_SEQUENCE.finished = false;

}



function updateConstellationSequence(){

    if(!CONSTELLATION_SEQUENCE.started) return;

    if(CONSTELLATION_SEQUENCE.finished) return;

    CONSTELLATION_SEQUENCE.timer += deltaTime;



    switch(CONSTELLATION_SEQUENCE.stage){

        case 0:

            if(CONSTELLATION_SEQUENCE.timer > 8){

                revealHeartConstellation();

                CONSTELLATION_SEQUENCE.stage++;

            }

        break;



        case 1:

            if(CONSTELLATION_SEQUENCE.timer > 16){

                revealLetterDConstellation();

                CONSTELLATION_SEQUENCE.stage++;

            }

        break;



        case 2:

            if(CONSTELLATION_SEQUENCE.timer > 24){

                CONSTELLATION_SEQUENCE.finished = true;

            }

        break;

    }

}
