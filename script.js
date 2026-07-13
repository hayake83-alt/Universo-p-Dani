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
/*==========================================================
                    MÓDULO 9

                PARTE 9.8

      CIERRE DEFINITIVO DE CONSTELACIONES

Funciones:

• Iniciar la secuencia una sola vez
• Detener la secuencia
• Reiniciar la experiencia
• Ocultar constelaciones secretas
• Restaurar materiales y animaciones
• Liberar eventos cuando sea necesario
• Mostrar información final del sistema

==========================================================*/



/*==========================================================
            ESTADO FINAL DEL SISTEMA
==========================================================*/

const CONSTELLATION_SYSTEM = {

    initialized: false,

    sequenceEnabled: true,

    interactionEnabled: true,

    disposed: false

};



/*==========================================================
        DETENER SECUENCIA CINEMATOGRÁFICA
==========================================================*/

function stopConstellationSequence(){

    CONSTELLATION_SEQUENCE.started = false;

    CONSTELLATION_SEQUENCE.finished = true;

}



/*==========================================================
        REINICIAR SECUENCIA CINEMATOGRÁFICA
==========================================================*/

function resetConstellationSequence(){

    CONSTELLATION_SEQUENCE.started = false;

    CONSTELLATION_SEQUENCE.timer = 0;

    CONSTELLATION_SEQUENCE.stage = 0;

    CONSTELLATION_SEQUENCE.finished = false;

}



/*==========================================================
        REINICIAR CONSTELACIONES VISUALES
==========================================================*/

function resetConstellationVisuals(){

    for(const constellation of constellations){

        constellation.interactionPulse = 0;

        constellation.targetInteractionPulse = 0;

        constellation.lastTouchTime = 0;

        constellation.group.scale.setScalar(

            constellation.baseScale || 1

        );

        constellation.group.rotation.set(

            0,

            0,

            0

        );

        constellation.group.position.copy(

            constellation.position

        );

    }

}



/*==========================================================
        RESTAURAR ESTADO INICIAL
==========================================================*/

function resetConstellationExperience(){

    resetConstellationSequence();

    resetConstellationInteraction();

    resetConstellationVisuals();

    /*
        La constelación decorativa permanece visible.
        Las constelaciones especiales vuelven a ocultarse.
    */

    if(blueConstellation){

        blueConstellation.show();

    }

    if(heartConstellation){

        heartConstellation.hide();

    }

    if(letterDConstellation){

        letterDConstellation.hide();

    }

    if(CONSTELLATION_SYSTEM.sequenceEnabled){

        startConstellationSequence();

    }

    debug(

        "✔ Experiencia de constelaciones reiniciada"

    );

}



/*==========================================================
        ACTIVAR SECUENCIA AUTOMÁTICA
==========================================================*/

function enableConstellationSequence(){

    CONSTELLATION_SYSTEM.sequenceEnabled = true;

    if(

        !CONSTELLATION_SEQUENCE.started &&

        !CONSTELLATION_SEQUENCE.finished

    ){

        startConstellationSequence();

    }

}



/*==========================================================
        DESACTIVAR SECUENCIA AUTOMÁTICA
==========================================================*/

function disableConstellationSequence(){

    CONSTELLATION_SYSTEM.sequenceEnabled = false;

    stopConstellationSequence();

}



/*==========================================================
        ACTIVAR INTERACCIÓN
==========================================================*/

function enableConstellationInteraction(){

    CONSTELLATION_SYSTEM.interactionEnabled = true;

    enableConstellationEvents();

}



/*==========================================================
        DESACTIVAR INTERACCIÓN
==========================================================*/

function disableConstellationInteraction(){

    CONSTELLATION_SYSTEM.interactionEnabled = false;

    disableConstellationEvents();

}



/*==========================================================
        ACTUALIZACIÓN FINAL DEL SISTEMA
==========================================================*/

function updateConstellationSystem(){

    if(

        CONSTELLATION_SYSTEM.disposed ||

        constellationSystemDisposed

    ){

        return;

    }

    updateOptimizedConstellations();

    /*
        La secuencia solo se actualiza si está habilitada.
    */

    if(CONSTELLATION_SYSTEM.sequenceEnabled){

        updateConstellationSequence();

    }

}



/*==========================================================
        ELIMINAR SISTEMA COMPLETO
==========================================================*/

function disposeConstellationSystem(){

    if(CONSTELLATION_SYSTEM.disposed){

        return;

    }

    stopConstellationSequence();

    disableConstellationInteraction();

    disposeConstellations();

    window.removeEventListener(

        "keydown",

        onConstellationDebugKey

    );

    CONSTELLATION_SYSTEM.disposed = true;

    CONSTELLATION_SYSTEM.initialized = false;

    debug(

        "✔ Sistema de constelaciones eliminado"

    );

}



/*==========================================================
        RECONSTRUIR SISTEMA COMPLETO
==========================================================*/

function rebuildConstellationSystem(){

    if(!CONSTELLATION_SYSTEM.disposed){

        disableConstellationInteraction();

        disposeConstellations();

    }

    createMainConstellations();

    prepareConstellationAnimations();

    prepareConstellationInteraction();

    optimizeConstellationQuality();

    refreshConstellationMaterials();

    resetConstellationInteraction();

    resetConstellationSequence();

    CONSTELLATION_SYSTEM.disposed = false;

    CONSTELLATION_SYSTEM.initialized = true;

    if(CONSTELLATION_SYSTEM.interactionEnabled){

        enableConstellationEvents();

    }

    if(CONSTELLATION_SYSTEM.sequenceEnabled){

        startConstellationSequence();

    }

    debug(

        "✔ Sistema de constelaciones reconstruido"

    );

}



/*==========================================================
        INFORMACIÓN FINAL
==========================================================*/

function finalConstellationInformation(){

    console.log(

        "%c======= MÓDULO 9 COMPLETO =======",

        "color:#ff9fd3;font-size:14px;font-weight:bold;"

    );

    console.log(

        "Constelaciones creadas:",

        constellations.length

    );

    console.log(

        "Interacción activa:",

        CONSTELLATION_SYSTEM.interactionEnabled

    );

    console.log(

        "Secuencia automática:",

        CONSTELLATION_SYSTEM.sequenceEnabled

    );

    console.log(

        "Secuencia iniciada:",

        CONSTELLATION_SEQUENCE.started

    );

    console.log(

        "Sistema eliminado:",

        CONSTELLATION_SYSTEM.disposed

    );

}



/*==========================================================
        ATAJO DE REINICIO

Tecla X:
reinicia toda la experiencia de constelaciones.
==========================================================*/

function onConstellationSystemKey(event){

    if(

        event.key.toLowerCase() === "x"

    ){

        resetConstellationExperience();

    }

}



window.addEventListener(

    "keydown",

    onConstellationSystemKey

);



/*==========================================================
        INICIALIZACIÓN FINAL
==========================================================*/

function initializeConstellationSystem(){

    if(CONSTELLATION_SYSTEM.initialized){

        return;

    }

    CONSTELLATION_SYSTEM.initialized = true;

    CONSTELLATION_SYSTEM.disposed = false;

    if(CONSTELLATION_SYSTEM.interactionEnabled){

        enableConstellationInteraction();

    }

    if(CONSTELLATION_SYSTEM.sequenceEnabled){

        resetConstellationSequence();

        startConstellationSequence();

    }

    finalConstellationInformation();

}



initializeConstellationSystem();



debug(

    "✔ Módulo 9 finalizado completamente"

);
iniciarModulo10();
/* =========================================================
   MÓDULO 10 — EL CORAZÓN DEL UNIVERSO
   Regalo interactivo para Dani
========================================================= */

const modulo10 = {
  activo: false,
  contenedor: null,
  particulas: [],
  animacionId: null
};

/* ---------------------------------------------------------
   10.1 — CREAR LOS ESTILOS
--------------------------------------------------------- */

function crearEstilosModulo10() {
  if (document.getElementById("estilos-modulo-10")) return;

  const estilos = document.createElement("style");
  estilos.id = "estilos-modulo-10";

  estilos.textContent = `
    #modulo-10 {
      position: fixed;
      inset: 0;
      z-index: 10000;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background:
        radial-gradient(
          circle at center,
          rgba(83, 25, 110, 0.45) 0%,
          rgba(18, 6, 35, 0.94) 45%,
          rgba(2, 1, 10, 1) 100%
        );
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 2s ease,
        visibility 2s ease;
    }

    #modulo-10.modulo-10-visible {
      opacity: 1;
      visibility: visible;
    }

    #lienzo-corazon {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
    }

    .resplandor-final {
      position: absolute;
      left: 50%;
      top: 48%;
      width: min(72vw, 620px);
      height: min(72vw, 620px);
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background:
        radial-gradient(
          circle,
          rgba(255, 164, 218, 0.18) 0%,
          rgba(130, 100, 255, 0.12) 35%,
          transparent 72%
        );
      filter: blur(20px);
      animation: respirarResplandor 4s ease-in-out infinite;
      pointer-events: none;
    }

    .contenido-final {
      position: relative;
      z-index: 4;
      width: min(88%, 700px);
      padding: 30px 20px;
      text-align: center;
      color: white;
      opacity: 0;
      transform: translateY(25px);
      transition:
        opacity 2s ease 2.7s,
        transform 2s ease 2.7s;
      pointer-events: none;
    }

    #modulo-10.modulo-10-mensaje-visible .contenido-final {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    .titulo-final {
      margin: 0;
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(3rem, 12vw, 7rem);
      font-weight: 400;
      letter-spacing: 0.08em;
      color: #fff5fc;
      text-shadow:
        0 0 10px rgba(255, 255, 255, 0.8),
        0 0 28px rgba(255, 136, 209, 0.8),
        0 0 55px rgba(128, 106, 255, 0.65);
      animation: brilloNombre 3.5s ease-in-out infinite;
    }

    .frase-final {
      max-width: 560px;
      margin: 18px auto 0;
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(1rem, 4.3vw, 1.35rem);
      line-height: 1.7;
      color: rgba(255, 245, 252, 0.9);
      text-shadow: 0 0 12px rgba(255, 168, 220, 0.4);
    }

    .firma-final {
      margin-top: 17px;
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(0.9rem, 3.6vw, 1.05rem);
      font-style: italic;
      color: rgba(216, 203, 255, 0.85);
    }

    .botones-finales {
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 30px;
    }

    .boton-final {
      min-width: 170px;
      padding: 12px 22px;
      border: 1px solid rgba(255, 255, 255, 0.35);
      border-radius: 999px;
      color: white;
      background: rgba(255, 255, 255, 0.08);
      box-shadow:
        inset 0 0 20px rgba(255, 255, 255, 0.04),
        0 0 20px rgba(148, 111, 255, 0.12);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      cursor: pointer;
      font-family: inherit;
      font-size: 0.95rem;
      letter-spacing: 0.04em;
      transition:
        transform 0.3s ease,
        background 0.3s ease,
        box-shadow 0.3s ease;
    }

    .boton-final:hover,
    .boton-final:focus-visible {
      transform: translateY(-3px);
      background: rgba(255, 255, 255, 0.15);
      box-shadow:
        0 0 26px rgba(255, 140, 211, 0.28),
        0 0 50px rgba(115, 101, 255, 0.18);
      outline: none;
    }

    .boton-final:active {
      transform: scale(0.97);
    }

    .destello-modulo-10 {
      position: absolute;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: white;
      box-shadow:
        0 0 8px white,
        0 0 16px rgba(255, 168, 220, 0.8);
      opacity: 0;
      animation: aparecerDestello 3s ease-in-out infinite;
      pointer-events: none;
    }

    @keyframes respirarResplandor {
      0%, 100% {
        transform: translate(-50%, -50%) scale(0.88);
        opacity: 0.55;
      }

      50% {
        transform: translate(-50%, -50%) scale(1.12);
        opacity: 1;
      }
    }

    @keyframes brilloNombre {
      0%, 100% {
        filter: brightness(0.95);
        transform: scale(1);
      }

      50% {
        filter: brightness(1.18);
        transform: scale(1.025);
      }
    }

    @keyframes aparecerDestello {
      0%, 100% {
        opacity: 0;
        transform: scale(0.3);
      }

      45%, 60% {
        opacity: 1;
        transform: scale(1.4);
      }
    }

    @media (max-width: 600px) {
      .contenido-final {
        padding: 20px 18px;
      }

      .frase-final {
        line-height: 1.55;
      }

      .botones-finales {
        flex-direction: column;
        align-items: center;
      }

      .boton-final {
        width: min(100%, 260px);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .resplandor-final,
      .titulo-final,
      .destello-modulo-10 {
        animation: none;
      }

      #modulo-10,
      .contenido-final {
        transition-duration: 0.4s;
      }
    }
  `;

  document.head.appendChild(estilos);
}

/* ---------------------------------------------------------
   10.2 — CREAR LA ESCENA FINAL
--------------------------------------------------------- */

function crearModulo10() {
  if (document.getElementById("modulo-10")) {
    modulo10.contenedor = document.getElementById("modulo-10");
    return;
  }

  crearEstilosModulo10();

  const escena = document.createElement("section");
  escena.id = "modulo-10";
  escena.setAttribute("aria-hidden", "true");

  escena.innerHTML = `
    <canvas id="lienzo-corazon"></canvas>

    <div class="resplandor-final"></div>

    <div class="contenido-final">
      <h1 class="titulo-final">Dani</h1>

      <p class="frase-final">
        Entre todas las estrellas, todos los mundos y todas las posibilidades,
        siempre volvería a encontrarte a ti.
      </p>

      <p class="firma-final">
        Tú eres mi lugar favorito en el universo.
      </p>

      <div class="botones-finales">
        <button
          class="boton-final"
          id="boton-repetir-universo"
          type="button"
        >
          Recorrerlo otra vez
        </button>

        <button
          class="boton-final"
          id="boton-ver-estrellas"
          type="button"
        >
          Solo mirar las estrellas
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(escena);
  modulo10.contenedor = escena;

  crearDestellosModulo10(26);
  configurarBotonesModulo10();
}

/* ---------------------------------------------------------
   10.3 — DESTELLOS DEL FONDO
--------------------------------------------------------- */

function crearDestellosModulo10(cantidad = 25) {
  const escena = modulo10.contenedor;
  if (!escena) return;

  escena
    .querySelectorAll(".destello-modulo-10")
    .forEach((elemento) => elemento.remove());

  for (let i = 0; i < cantidad; i++) {
    const destello = document.createElement("span");

    destello.className = "destello-modulo-10";
    destello.style.left = `${Math.random() * 100}%`;
    destello.style.top = `${Math.random() * 100}%`;
    destello.style.animationDelay = `${Math.random() * 4}s`;
    destello.style.animationDuration = `${2.2 + Math.random() * 3}s`;

    const tamaño = 1 + Math.random() * 3;
    destello.style.width = `${tamaño}px`;
    destello.style.height = `${tamaño}px`;

    escena.appendChild(destello);
  }
}

/* ---------------------------------------------------------
   10.4 — PARTÍCULAS QUE FORMAN EL CORAZÓN
--------------------------------------------------------- */

function crearParticulasCorazon(canvas) {
  const cantidad = window.innerWidth < 600 ? 260 : 430;
  const particulas = [];

  const centroX = canvas.width / 2;
  const centroY = canvas.height * 0.45;

  const escalaBase = Math.min(
    canvas.width,
    canvas.height
  ) * 0.017;

  for (let i = 0; i < cantidad; i++) {
    const t = Math.random() * Math.PI * 2;

    /*
      Fórmula paramétrica de un corazón.
    */
    const formaX = 16 * Math.pow(Math.sin(t), 3);

    const formaY =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    const dispersion = 0.82 + Math.random() * 0.18;

    const destinoX =
      centroX +
      formaX *
        escalaBase *
        dispersion;

    const destinoY =
      centroY -
      formaY *
        escalaBase *
        dispersion;

    const bordeAleatorio = Math.floor(Math.random() * 4);

    let inicioX;
    let inicioY;

    if (bordeAleatorio === 0) {
      inicioX = Math.random() * canvas.width;
      inicioY = -40;
    } else if (bordeAleatorio === 1) {
      inicioX = canvas.width + 40;
      inicioY = Math.random() * canvas.height;
    } else if (bordeAleatorio === 2) {
      inicioX = Math.random() * canvas.width;
      inicioY = canvas.height + 40;
    } else {
      inicioX = -40;
      inicioY = Math.random() * canvas.height;
    }

    const tipoColor = Math.random();

    let color;

    if (tipoColor < 0.35) {
      color = "255, 255, 255";
    } else if (tipoColor < 0.7) {
      color = "255, 155, 218";
    } else {
      color = "158, 137, 255";
    }

    particulas.push({
      x: inicioX,
      y: inicioY,
      destinoX,
      destinoY,
      tamaño: 0.7 + Math.random() * 2.2,
      opacidad: 0.4 + Math.random() * 0.6,
      velocidad: 0.012 + Math.random() * 0.018,
      color,
      fase: Math.random() * Math.PI * 2,
      vibracion: 0.3 + Math.random() * 1.4
    });
  }

  return particulas;
}

/* ---------------------------------------------------------
   10.5 — ANIMAR EL CORAZÓN
--------------------------------------------------------- */

function animarCorazonModulo10() {
  const canvas = document.getElementById("lienzo-corazon");
  if (!canvas) return;

  const contexto = canvas.getContext("2d");
  if (!contexto) return;

  function ajustarCanvas() {
    const proporcion = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = window.innerWidth * proporcion;
    canvas.height = window.innerHeight * proporcion;

    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    modulo10.particulas = crearParticulasCorazon(canvas);
  }

  ajustarCanvas();

  let tiempoAnterior = performance.now();

  function dibujar(tiempoActual) {
    if (!modulo10.activo) return;

    const delta = Math.min(
      (tiempoActual - tiempoAnterior) / 16.67,
      2
    );

    tiempoAnterior = tiempoActual;

    contexto.clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    for (const particula of modulo10.particulas) {
      particula.x +=
        (particula.destinoX - particula.x) *
        particula.velocidad *
        delta;

      particula.y +=
        (particula.destinoY - particula.y) *
        particula.velocidad *
        delta;

      const pulso =
        Math.sin(
          tiempoActual * 0.0025 +
          particula.fase
        ) * particula.vibracion;

      const xVisual = particula.x + pulso;
      const yVisual = particula.y + pulso * 0.45;

      contexto.beginPath();

      contexto.arc(
        xVisual,
        yVisual,
        particula.tamaño *
          Math.min(window.devicePixelRatio || 1, 2),
        0,
        Math.PI * 2
      );

      contexto.fillStyle =
        `rgba(${particula.color}, ${particula.opacidad})`;

      contexto.shadowBlur = 14;
      contexto.shadowColor =
        `rgba(${particula.color}, 0.75)`;

      contexto.fill();
    }

    contexto.shadowBlur = 0;

    modulo10.animacionId =
      requestAnimationFrame(dibujar);
  }

  window.addEventListener(
    "resize",
    ajustarCanvas,
    { once: true }
  );

  modulo10.animacionId =
    requestAnimationFrame(dibujar);
}

/* ---------------------------------------------------------
   10.6 — ABRIR EL MÓDULO
--------------------------------------------------------- */

function iniciarModulo10() {
  crearModulo10();

  if (modulo10.activo) return;

  modulo10.activo = true;

  const escena = modulo10.contenedor;

  escena.setAttribute("aria-hidden", "false");

  requestAnimationFrame(() => {
    escena.classList.add("modulo-10-visible");
  });

  animarCorazonModulo10();

  setTimeout(() => {
    if (!modulo10.activo) return;

    escena.classList.add(
      "modulo-10-mensaje-visible"
    );
  }, 1800);

  /*
    Evento personalizado por si otros módulos
    necesitan saber que comenzó el final.
  */
  window.dispatchEvent(
    new CustomEvent("modulo10Iniciado")
  );
}

/* ---------------------------------------------------------
   10.7 — CERRAR EL MÓDULO
--------------------------------------------------------- */

function cerrarModulo10() {
  const escena = modulo10.contenedor;
  if (!escena) return;

  modulo10.activo = false;

  escena.classList.remove(
    "modulo-10-mensaje-visible"
  );

  escena.classList.remove(
    "modulo-10-visible"
  );

  escena.setAttribute("aria-hidden", "true");

  if (modulo10.animacionId) {
    cancelAnimationFrame(modulo10.animacionId);
    modulo10.animacionId = null;
  }
}

/* ---------------------------------------------------------
   10.8 — BOTONES DEL FINAL
--------------------------------------------------------- */

function configurarBotonesModulo10() {
  const botonRepetir = document.getElementById(
    "boton-repetir-universo"
  );

  const botonEstrellas = document.getElementById(
    "boton-ver-estrellas"
  );

  botonRepetir?.addEventListener("click", () => {
    cerrarModulo10();

    /*
      Reinicia la página y comienza el regalo
      desde el principio.
    */
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
      });

      window.location.reload();
    }, 900);
  });

  botonEstrellas?.addEventListener("click", () => {
    const contenido = modulo10.contenedor?.querySelector(
      ".contenido-final"
    );

    if (!contenido) return;

    contenido.style.transition =
      "opacity 1s ease, transform 1s ease";

    contenido.style.opacity = "0";
    contenido.style.transform =
      "translateY(18px) scale(0.96)";

    contenido.style.pointerEvents = "none";
  });
}

/* ---------------------------------------------------------
   10.9 — SOPORTE PARA TECLADO
--------------------------------------------------------- */

document.addEventListener("keydown", (evento) => {
  if (!modulo10.activo) return;

  if (evento.key === "Escape") {
    const contenido = modulo10.contenedor?.querySelector(
      ".contenido-final"
    );

    if (!contenido) return;

    contenido.style.opacity = "1";
    contenido.style.transform =
      "translateY(0) scale(1)";

    contenido.style.pointerEvents = "auto";
  }
});

/* ---------------------------------------------------------
   10.10 — PREPARAR EL MÓDULO
--------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  crearModulo10();
});
/* =========================================================
   MÓDULO 11 — LA CONSTELACIÓN DE LOS RECUERDOS
   Regalo interactivo para Dani
========================================================= */

const modulo11 = {
  activo: false,
  contenedor: null,
  canvas: null,
  contexto: null,
  estrellas: [],
  animacionId: null,
  estrellaActiva: null
};

/* ---------------------------------------------------------
   11.1 — MENSAJES DE LAS ESTRELLAS
--------------------------------------------------------- */

const recuerdosModulo11 = [
  {
    titulo: "Tu mirada",
    mensaje:
      "Hay algo en tus ojos que hace que incluso el universo parezca pequeño."
  },
  {
    titulo: "Tu risa",
    mensaje:
      "Tu risa tiene la capacidad de convertir cualquier día común en un recuerdo especial."
  },
  {
    titulo: "Tu presencia",
    mensaje:
      "No necesito que ocurra algo extraordinario. A veces, basta con que estés conmigo."
  },
  {
    titulo: "Nuestros momentos",
    mensaje:
      "Cada instante contigo se guarda en mí como una estrella que nunca deja de brillar."
  },
  {
    titulo: "Tu libertad",
    mensaje:
      "Amo la forma en la que existes, libre, auténtica y completamente tú."
  },
  {
    titulo: "Mi lugar favorito",
    mensaje:
      "Entre tantos lugares posibles, sigo prefiriendo aquel en el que estás tú."
  },
  {
    titulo: "Lo que siento",
    mensaje:
      "Hay sentimientos que no caben en palabras, por eso decidí esconderlos entre estrellas."
  }
];

/* ---------------------------------------------------------
   11.2 — CREAR ESTILOS
--------------------------------------------------------- */

function crearEstilosModulo11() {
  if (document.getElementById("estilos-modulo-11")) return;

  const estilos = document.createElement("style");
  estilos.id = "estilos-modulo-11";

  estilos.textContent = `
    #modulo-11 {
      position: fixed;
      inset: 0;
      z-index: 11000;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background:
        radial-gradient(
          circle at 50% 45%,
          rgba(55, 25, 105, 0.55),
          rgba(9, 4, 25, 0.96) 55%,
          #020108 100%
        );
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 1.8s ease,
        visibility 1.8s ease;
    }

    #modulo-11.modulo-11-visible {
      opacity: 1;
      visibility: visible;
    }

    #canvas-constelacion {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      cursor: pointer;
      touch-action: none;
    }

    .encabezado-modulo-11 {
      position: absolute;
      z-index: 3;
      top: 7%;
      left: 50%;
      width: min(88%, 700px);
      transform: translateX(-50%);
      text-align: center;
      color: white;
      pointer-events: none;
      opacity: 0;
      transition: opacity 1.5s ease 0.8s;
    }

    #modulo-11.modulo-11-visible .encabezado-modulo-11 {
      opacity: 1;
    }

    .titulo-modulo-11 {
      margin: 0;
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(1.8rem, 7vw, 3.8rem);
      font-weight: 400;
      letter-spacing: 0.06em;
      text-shadow:
        0 0 12px rgba(255, 255, 255, 0.6),
        0 0 35px rgba(173, 121, 255, 0.5);
    }

    .instruccion-modulo-11 {
      margin: 12px 0 0;
      font-size: clamp(0.9rem, 3.5vw, 1.08rem);
      color: rgba(238, 229, 255, 0.8);
    }

    .tarjeta-recuerdo {
      position: absolute;
      z-index: 6;
      left: 50%;
      bottom: 8%;
      width: min(84%, 480px);
      padding: 24px 22px;
      transform:
        translate(-50%, 25px)
        scale(0.94);
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 24px;
      background:
        linear-gradient(
          145deg,
          rgba(255, 255, 255, 0.12),
          rgba(154, 112, 255, 0.06)
        );
      box-shadow:
        0 15px 50px rgba(0, 0, 0, 0.35),
        0 0 35px rgba(158, 120, 255, 0.15);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      text-align: center;
      color: white;
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 0.7s ease,
        transform 0.7s ease,
        visibility 0.7s ease;
    }

    .tarjeta-recuerdo.tarjeta-visible {
      opacity: 1;
      visibility: visible;
      transform:
        translate(-50%, 0)
        scale(1);
    }

    .titulo-recuerdo {
      margin: 0;
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(1.35rem, 5vw, 2rem);
      font-weight: 400;
      color: #fff3fc;
      text-shadow:
        0 0 15px rgba(255, 151, 219, 0.45);
    }

    .texto-recuerdo {
      margin: 12px 0 0;
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(0.95rem, 3.8vw, 1.12rem);
      line-height: 1.65;
      color: rgba(255, 248, 253, 0.9);
    }

    .cerrar-recuerdo {
      position: absolute;
      top: 10px;
      right: 13px;
      width: 32px;
      height: 32px;
      border: none;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.08);
      color: white;
      cursor: pointer;
      font-size: 1.1rem;
      transition:
        background 0.3s ease,
        transform 0.3s ease;
    }

    .cerrar-recuerdo:hover {
      background: rgba(255, 255, 255, 0.18);
      transform: rotate(90deg);
    }

    .controles-modulo-11 {
      position: absolute;
      z-index: 5;
      right: 18px;
      bottom: 18px;
      display: flex;
      gap: 10px;
    }

    .boton-modulo-11 {
      padding: 10px 17px;
      border: 1px solid rgba(255, 255, 255, 0.24);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.08);
      color: white;
      font-family: inherit;
      cursor: pointer;
      backdrop-filter: blur(9px);
      -webkit-backdrop-filter: blur(9px);
      transition:
        transform 0.3s ease,
        background 0.3s ease;
    }

    .boton-modulo-11:hover {
      transform: translateY(-2px);
      background: rgba(255, 255, 255, 0.15);
    }

    .contador-estrellas {
      position: absolute;
      z-index: 4;
      left: 18px;
      bottom: 20px;
      padding: 9px 14px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.06);
      color: rgba(255, 255, 255, 0.78);
      font-size: 0.85rem;
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }

    @media (max-width: 600px) {
      .encabezado-modulo-11 {
        top: 5%;
      }

      .tarjeta-recuerdo {
        bottom: 13%;
        padding: 22px 18px;
      }

      .controles-modulo-11 {
        left: 50%;
        right: auto;
        bottom: 18px;
        transform: translateX(-50%);
      }

      .contador-estrellas {
        left: 50%;
        bottom: 68px;
        transform: translateX(-50%);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      #modulo-11,
      .encabezado-modulo-11,
      .tarjeta-recuerdo {
        transition-duration: 0.35s;
      }
    }
  `;

  document.head.appendChild(estilos);
}

/* ---------------------------------------------------------
   11.3 — CREAR ESTRUCTURA
--------------------------------------------------------- */

function crearModulo11() {
  if (document.getElementById("modulo-11")) {
    modulo11.contenedor =
      document.getElementById("modulo-11");

    modulo11.canvas =
      document.getElementById("canvas-constelacion");

    modulo11.contexto =
      modulo11.canvas?.getContext("2d");

    return;
  }

  crearEstilosModulo11();

  const escena = document.createElement("section");
  escena.id = "modulo-11";
  escena.setAttribute("aria-hidden", "true");

  escena.innerHTML = `
    <canvas
      id="canvas-constelacion"
      aria-label="Constelación interactiva de recuerdos"
    ></canvas>

    <header class="encabezado-modulo-11">
      <h2 class="titulo-modulo-11">
        Nuestra constelación
      </h2>

      <p class="instruccion-modulo-11">
        Toca las estrellas más brillantes para descubrir lo que guardan.
      </p>
    </header>

    <article
      class="tarjeta-recuerdo"
      id="tarjeta-recuerdo"
    >
      <button
        class="cerrar-recuerdo"
        id="cerrar-recuerdo"
        type="button"
        aria-label="Cerrar recuerdo"
      >
        ×
      </button>

      <h3
        class="titulo-recuerdo"
        id="titulo-recuerdo"
      ></h3>

      <p
        class="texto-recuerdo"
        id="texto-recuerdo"
      ></p>
    </article>

    <div
      class="contador-estrellas"
      id="contador-estrellas"
    >
      0 de ${recuerdosModulo11.length} recuerdos descubiertos
    </div>

    <div class="controles-modulo-11">
      <button
        class="boton-modulo-11"
        id="boton-finalizar-modulo-11"
        type="button"
      >
        Continuar
      </button>
    </div>
  `;

  document.body.appendChild(escena);

  modulo11.contenedor = escena;
  modulo11.canvas =
    document.getElementById("canvas-constelacion");
  modulo11.contexto =
    modulo11.canvas.getContext("2d");

  configurarEventosModulo11();
}

/* ---------------------------------------------------------
   11.4 — CREAR ESTRELLAS
--------------------------------------------------------- */

function generarEstrellasModulo11() {
  const canvas = modulo11.canvas;
  if (!canvas) return;

  const ancho = canvas.width;
  const alto = canvas.height;

  modulo11.estrellas = [];

  const posicionesPrincipales = [
    [0.22, 0.39],
    [0.35, 0.28],
    [0.5, 0.38],
    [0.65, 0.26],
    [0.78, 0.42],
    [0.62, 0.58],
    [0.38, 0.61]
  ];

  posicionesPrincipales.forEach((posicion, indice) => {
    modulo11.estrellas.push({
      x: ancho * posicion[0],
      y: alto * posicion[1],
      radio: 7,
      brillo: 1,
      fase: Math.random() * Math.PI * 2,
      principal: true,
      indiceRecuerdo: indice,
      descubierta: false
    });
  });

  const cantidadFondo =
    window.innerWidth < 600 ? 80 : 150;

  for (let i = 0; i < cantidadFondo; i++) {
    modulo11.estrellas.push({
      x: Math.random() * ancho,
      y: Math.random() * alto,
      radio: 0.5 + Math.random() * 1.8,
      brillo: 0.25 + Math.random() * 0.55,
      fase: Math.random() * Math.PI * 2,
      principal: false
    });
  }
}

/* ---------------------------------------------------------
   11.5 — AJUSTAR CANVAS
--------------------------------------------------------- */

function ajustarCanvasModulo11() {
  const canvas = modulo11.canvas;
  if (!canvas) return;

  const proporcion =
    Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = window.innerWidth * proporcion;
  canvas.height = window.innerHeight * proporcion;

  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  generarEstrellasModulo11();
}

/* ---------------------------------------------------------
   11.6 — DIBUJAR CONSTELACIÓN
--------------------------------------------------------- */

function dibujarModulo11(tiempo) {
  if (!modulo11.activo) return;

  const contexto = modulo11.contexto;
  const canvas = modulo11.canvas;

  contexto.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  dibujarLineasConstelacion(contexto);

  modulo11.estrellas.forEach((estrella) => {
    const pulso =
      Math.sin(tiempo * 0.002 + estrella.fase);

    const radio =
      estrella.radio +
      pulso * (estrella.principal ? 1.5 : 0.3);

    contexto.beginPath();

    contexto.arc(
      estrella.x,
      estrella.y,
      Math.max(radio, 0.3),
      0,
      Math.PI * 2
    );

    if (estrella.principal) {
      const descubierta = estrella.descubierta;

      contexto.fillStyle = descubierta
        ? "rgba(255, 167, 222, 1)"
        : "rgba(255, 255, 255, 1)";

      contexto.shadowBlur =
        descubierta ? 35 : 25;

      contexto.shadowColor =
        descubierta
          ? "rgba(255, 123, 205, 0.95)"
          : "rgba(181, 150, 255, 0.95)";
    } else {
      contexto.fillStyle =
        `rgba(255, 255, 255, ${estrella.brillo})`;

      contexto.shadowBlur = 5;
      contexto.shadowColor =
        "rgba(255, 255, 255, 0.4)";
    }

    contexto.fill();

    if (estrella.principal) {
      dibujarDestelloCruz(
        contexto,
        estrella.x,
        estrella.y,
        12 + pulso * 3,
        estrella.descubierta
      );
    }
  });

  contexto.shadowBlur = 0;

  modulo11.animacionId =
    requestAnimationFrame(dibujarModulo11);
}

function dibujarLineasConstelacion(contexto) {
  const principales =
    modulo11.estrellas.filter(
      (estrella) => estrella.principal
    );

  if (principales.length < 2) return;

  contexto.save();

  contexto.beginPath();
  contexto.moveTo(
    principales[0].x,
    principales[0].y
  );

  for (let i = 1; i < principales.length; i++) {
    contexto.lineTo(
      principales[i].x,
      principales[i].y
    );
  }

  contexto.lineTo(
    principales[2].x,
    principales[2].y
  );

  contexto.strokeStyle =
    "rgba(199, 178, 255, 0.18)";

  contexto.lineWidth = 1.3;
  contexto.shadowBlur = 8;
  contexto.shadowColor =
    "rgba(151, 112, 255, 0.35)";

  contexto.stroke();
  contexto.restore();
}

function dibujarDestelloCruz(
  contexto,
  x,
  y,
  tamaño,
  descubierta
) {
  contexto.save();

  contexto.beginPath();
  contexto.moveTo(x - tamaño, y);
  contexto.lineTo(x + tamaño, y);
  contexto.moveTo(x, y - tamaño);
  contexto.lineTo(x, y + tamaño);

  contexto.strokeStyle = descubierta
    ? "rgba(255, 177, 226, 0.7)"
    : "rgba(255, 255, 255, 0.65)";

  contexto.lineWidth = 1;
  contexto.stroke();

  contexto.restore();
}

/* ---------------------------------------------------------
   11.7 — DETECTAR ESTRELLA TOCADA
--------------------------------------------------------- */

function detectarEstrellaModulo11(evento) {
  if (!modulo11.activo) return;

  const rect =
    modulo11.canvas.getBoundingClientRect();

  const escalaX =
    modulo11.canvas.width / rect.width;

  const escalaY =
    modulo11.canvas.height / rect.height;

  const x =
    (evento.clientX - rect.left) * escalaX;

  const y =
    (evento.clientY - rect.top) * escalaY;

  const estrellaSeleccionada =
    modulo11.estrellas.find((estrella) => {
      if (!estrella.principal) return false;

      const distancia = Math.hypot(
        estrella.x - x,
        estrella.y - y
      );

      return distancia < 35;
    });

  if (!estrellaSeleccionada) return;

  mostrarRecuerdoModulo11(
    estrellaSeleccionada.indiceRecuerdo
  );

  estrellaSeleccionada.descubierta = true;
  modulo11.estrellaActiva = estrellaSeleccionada;

  actualizarContadorModulo11();
}

/* ---------------------------------------------------------
   11.8 — MOSTRAR RECUERDO
--------------------------------------------------------- */

function mostrarRecuerdoModulo11(indice) {
  const recuerdo = recuerdosModulo11[indice];

  if (!recuerdo) return;

  const tarjeta =
    document.getElementById("tarjeta-recuerdo");

  const titulo =
    document.getElementById("titulo-recuerdo");

  const texto =
    document.getElementById("texto-recuerdo");

  titulo.textContent = recuerdo.titulo;
  texto.textContent = recuerdo.mensaje;

  tarjeta.classList.add("tarjeta-visible");
}

function cerrarRecuerdoModulo11() {
  const tarjeta =
    document.getElementById("tarjeta-recuerdo");

  tarjeta?.classList.remove("tarjeta-visible");
}

/* ---------------------------------------------------------
   11.9 — CONTADOR
--------------------------------------------------------- */

function actualizarContadorModulo11() {
  const descubiertas =
    modulo11.estrellas.filter(
      (estrella) =>
        estrella.principal &&
        estrella.descubierta
    ).length;

  const contador =
    document.getElementById("contador-estrellas");

  if (!contador) return;

  contador.textContent =
    `${descubiertas} de ${recuerdosModulo11.length} recuerdos descubiertos`;

  if (descubiertas === recuerdosModulo11.length) {
    contador.textContent =
      "Has descubierto toda nuestra constelación ✦";
  }
}

/* ---------------------------------------------------------
   11.10 — EVENTOS
--------------------------------------------------------- */

function configurarEventosModulo11() {
  modulo11.canvas.addEventListener(
    "pointerdown",
    detectarEstrellaModulo11
  );

  document
    .getElementById("cerrar-recuerdo")
    ?.addEventListener(
      "click",
      cerrarRecuerdoModulo11
    );

  document
    .getElementById("boton-finalizar-modulo-11")
    ?.addEventListener("click", () => {
      finalizarModulo11();
    });
}

/* ---------------------------------------------------------
   11.11 — INICIAR MÓDULO
--------------------------------------------------------- */

function iniciarModulo11() {
  crearModulo11();

  if (modulo11.activo) return;

  cerrarModulo10();

  modulo11.activo = true;

  modulo11.contenedor.setAttribute(
    "aria-hidden",
    "false"
  );

  ajustarCanvasModulo11();

  requestAnimationFrame(() => {
    modulo11.contenedor.classList.add(
      "modulo-11-visible"
    );
  });

  modulo11.animacionId =
    requestAnimationFrame(dibujarModulo11);

  window.dispatchEvent(
    new CustomEvent("modulo11Iniciado")
  );
}

/* ---------------------------------------------------------
   11.12 — FINALIZAR MÓDULO
--------------------------------------------------------- */

function finalizarModulo11() {
  modulo11.activo = false;

  cerrarRecuerdoModulo11();

  modulo11.contenedor.classList.remove(
    "modulo-11-visible"
  );

  modulo11.contenedor.setAttribute(
    "aria-hidden",
    "true"
  );

  if (modulo11.animacionId) {
    cancelAnimationFrame(
      modulo11.animacionId
    );

    modulo11.animacionId = null;
  }

  window.dispatchEvent(
    new CustomEvent("modulo11Finalizado")
  );

  /*
    Aquí se podrá iniciar el módulo 12.
  */

  setTimeout(() => {
    if (typeof iniciarModulo12 === "function") {
      iniciarModulo12();
    }
  }, 1500);
}

/* ---------------------------------------------------------
   11.13 — REDIMENSIONAR
--------------------------------------------------------- */

window.addEventListener("resize", () => {
  if (!modulo11.activo) return;

  ajustarCanvasModulo11();
});

/* ---------------------------------------------------------
   11.14 — PREPARAR MÓDULO
--------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  crearModulo11();
});
/* =========================================================
   MÓDULO 12 — LA CÁPSULA DEL TIEMPO
   Regalo interactivo para Dani
========================================================= */

const modulo12 = {
  activo: false,
  contenedor: null,
  canvas: null,
  contexto: null,
  estrellas: [],
  particulas: [],
  animacionId: null,
  mensajeGuardado: "",
  estrellaEnviada: false
};

/* ---------------------------------------------------------
   12.1 — CREAR ESTILOS
--------------------------------------------------------- */

function crearEstilosModulo12() {
  if (document.getElementById("estilos-modulo-12")) return;

  const estilos = document.createElement("style");
  estilos.id = "estilos-modulo-12";

  estilos.textContent = `
    #modulo-12 {
      position: fixed;
      inset: 0;
      z-index: 12000;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      background:
        radial-gradient(
          circle at 50% 55%,
          rgba(84, 35, 120, 0.55),
          rgba(13, 6, 35, 0.97) 55%,
          #020108 100%
        );
      opacity: 0;
      visibility: hidden;
      transition:
        opacity 1.7s ease,
        visibility 1.7s ease;
    }

    #modulo-12.modulo-12-visible {
      opacity: 1;
      visibility: visible;
    }

    #canvas-capsula-tiempo {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    .panel-capsula {
      position: relative;
      z-index: 4;
      width: min(88%, 560px);
      padding: 32px 26px;
      border: 1px solid rgba(255, 255, 255, 0.22);
      border-radius: 28px;
      background:
        linear-gradient(
          145deg,
          rgba(255, 255, 255, 0.12),
          rgba(137, 93, 214, 0.05)
        );
      box-shadow:
        0 25px 80px rgba(0, 0, 0, 0.45),
        0 0 50px rgba(155, 107, 255, 0.12);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      color: white;
      text-align: center;
      opacity: 0;
      transform: translateY(35px) scale(0.96);
      transition:
        opacity 1.4s ease 0.6s,
        transform 1.4s ease 0.6s;
    }

    #modulo-12.modulo-12-visible .panel-capsula {
      opacity: 1;
      transform: translateY(0) scale(1);
    }

    .titulo-capsula {
      margin: 0;
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(1.8rem, 7vw, 3rem);
      font-weight: 400;
      letter-spacing: 0.05em;
      color: #fff7fd;
      text-shadow:
        0 0 12px rgba(255, 255, 255, 0.6),
        0 0 32px rgba(255, 137, 215, 0.35);
    }

    .descripcion-capsula {
      max-width: 450px;
      margin: 14px auto 22px;
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(0.95rem, 3.8vw, 1.08rem);
      line-height: 1.65;
      color: rgba(242, 232, 255, 0.84);
    }

    .contenedor-textarea-capsula {
      position: relative;
      width: 100%;
    }

    #mensaje-capsula-tiempo {
      box-sizing: border-box;
      width: 100%;
      min-height: 145px;
      resize: none;
      padding: 18px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      outline: none;
      background: rgba(6, 3, 18, 0.42);
      color: white;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 1rem;
      line-height: 1.55;
      box-shadow:
        inset 0 0 25px rgba(0, 0, 0, 0.2);
      transition:
        border-color 0.3s ease,
        box-shadow 0.3s ease;
    }

    #mensaje-capsula-tiempo::placeholder {
      color: rgba(230, 218, 243, 0.45);
    }

    #mensaje-capsula-tiempo:focus {
      border-color: rgba(255, 173, 225, 0.55);
      box-shadow:
        inset 0 0 25px rgba(0, 0, 0, 0.2),
        0 0 25px rgba(255, 128, 205, 0.12);
    }

    .contador-capsula {
      position: absolute;
      right: 13px;
      bottom: 10px;
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.45);
      pointer-events: none;
    }

    .botones-capsula {
      display: flex;
      justify-content: center;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 22px;
    }

    .boton-capsula {
      min-width: 180px;
      padding: 12px 20px;
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.08);
      color: white;
      font-family: inherit;
      font-size: 0.95rem;
      cursor: pointer;
      transition:
        transform 0.3s ease,
        background 0.3s ease,
        box-shadow 0.3s ease;
    }

    .boton-capsula:hover:not(:disabled) {
      transform: translateY(-3px);
      background: rgba(255, 255, 255, 0.15);
      box-shadow:
        0 0 28px rgba(255, 145, 212, 0.18);
    }

    .boton-capsula:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }

    .boton-capsula-principal {
      background:
        linear-gradient(
          135deg,
          rgba(255, 134, 208, 0.22),
          rgba(137, 108, 255, 0.2)
        );
    }

    .mensaje-confirmacion-capsula {
      min-height: 24px;
      margin-top: 17px;
      font-family: Georgia, "Times New Roman", serif;
      font-size: 0.95rem;
      color: rgba(255, 216, 240, 0.9);
      opacity: 0;
      transform: translateY(8px);
      transition:
        opacity 0.6s ease,
        transform 0.6s ease;
    }

    .mensaje-confirmacion-capsula.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .estrella-capsula-visual {
      position: absolute;
      z-index: 5;
      left: 50%;
      top: 50%;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: white;
      box-shadow:
        0 0 12px white,
        0 0 30px rgba(255, 144, 214, 0.95),
        0 0 60px rgba(151, 118, 255, 0.8);
      opacity: 0;
      pointer-events: none;
    }

    .estrella-capsula-visual.enviando {
      animation:
        viajarCapsula 4.5s cubic-bezier(.2,.8,.2,1) forwards;
    }

    .resumen-capsula {
      display: none;
      position: relative;
      z-index: 5;
      width: min(86%, 520px);
      padding: 30px 24px;
      border: 1px solid rgba(255, 255, 255, 0.23);
      border-radius: 28px;
      background: rgba(13, 7, 32, 0.74);
      backdrop-filter: blur(18px);
      -webkit-backdrop-filter: blur(18px);
      text-align: center;
      color: white;
      opacity: 0;
      transform: scale(0.92);
      transition:
        opacity 1s ease,
        transform 1s ease;
    }

    .resumen-capsula.visible {
      display: block;
      opacity: 1;
      transform: scale(1);
    }

    .titulo-resumen-capsula {
      margin: 0;
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(1.7rem, 6vw, 2.6rem);
      font-weight: 400;
      color: #fff4fc;
    }

    .texto-resumen-capsula {
      margin: 16px auto 0;
      max-width: 430px;
      font-family: Georgia, "Times New Roman", serif;
      font-size: clamp(0.95rem, 3.8vw, 1.1rem);
      line-height: 1.65;
      color: rgba(244, 234, 255, 0.87);
    }

    @keyframes viajarCapsula {
      0% {
        opacity: 0;
        transform:
          translate(-50%, -50%)
          scale(0.2);
      }

      12% {
        opacity: 1;
        transform:
          translate(-50%, -50%)
          scale(1.3);
      }

      45% {
        opacity: 1;
        transform:
          translate(80px, -120px)
          scale(1);
      }

      100% {
        opacity: 0;
        transform:
          translate(
            calc(48vw - 50%),
            calc(-55vh - 50%)
          )
          scale(0.2);
      }
    }

    @media (max-width: 600px) {
      .panel-capsula {
        padding: 25px 18px;
      }

      #mensaje-capsula-tiempo {
        min-height: 130px;
      }

      .botones-capsula {
        flex-direction: column;
        align-items: center;
      }

      .boton-capsula {
        width: min(100%, 260px);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      #modulo-12,
      .panel-capsula,
      .resumen-capsula {
        transition-duration: 0.35s;
      }

      .estrella-capsula-visual.enviando {
        animation-duration: 1s;
      }
    }
  `;

  document.head.appendChild(estilos);
}

/* ---------------------------------------------------------
   12.2 — CREAR LA ESTRUCTURA
--------------------------------------------------------- */

function crearModulo12() {
  if (document.getElementById("modulo-12")) {
    modulo12.contenedor =
      document.getElementById("modulo-12");

    modulo12.canvas =
      document.getElementById("canvas-capsula-tiempo");

    modulo12.contexto =
      modulo12.canvas?.getContext("2d");

    return;
  }

  crearEstilosModulo12();

  const escena = document.createElement("section");
  escena.id = "modulo-12";
  escena.setAttribute("aria-hidden", "true");

  escena.innerHTML = `
    <canvas
      id="canvas-capsula-tiempo"
      aria-hidden="true"
    ></canvas>

    <div class="estrella-capsula-visual"
         id="estrella-capsula-visual">
    </div>

    <div class="panel-capsula"
         id="panel-capsula">
      <h2 class="titulo-capsula">
        Una estrella para el futuro
      </h2>

      <p class="descripcion-capsula">
        Escribe un deseo, una promesa o algo que quieras que
        nuestro futuro recuerde. Lo guardaré dentro de una estrella.
      </p>

      <div class="contenedor-textarea-capsula">
        <textarea
          id="mensaje-capsula-tiempo"
          maxlength="280"
          placeholder="Escribe aquí algo para nuestro futuro..."
          aria-label="Mensaje para la cápsula del tiempo"
        ></textarea>

        <span class="contador-capsula"
              id="contador-capsula">
          0 / 280
        </span>
      </div>

      <div class="botones-capsula">
        <button
          class="boton-capsula boton-capsula-principal"
          id="boton-enviar-capsula"
          type="button"
          disabled
        >
          Enviar entre las estrellas
        </button>

        <button
          class="boton-capsula"
          id="boton-omitir-capsula"
          type="button"
        >
          Guardar una estrella vacía
        </button>
      </div>

      <p class="mensaje-confirmacion-capsula"
         id="mensaje-confirmacion-capsula">
      </p>
    </div>

    <div class="resumen-capsula"
         id="resumen-capsula">
      <h2 class="titulo-resumen-capsula">
        Tu mensaje ya viaja por el universo
      </h2>

      <p class="texto-resumen-capsula"
         id="texto-resumen-capsula">
        Algunas palabras se escriben para ser leídas.
        Otras se escriben para permanecer.
      </p>

      <div class="botones-capsula">
        <button
          class="boton-capsula boton-capsula-principal"
          id="boton-continuar-modulo-12"
          type="button"
        >
          Continuar el viaje
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(escena);

  modulo12.contenedor = escena;
  modulo12.canvas =
    document.getElementById("canvas-capsula-tiempo");
  modulo12.contexto =
    modulo12.canvas.getContext("2d");

  configurarEventosModulo12();
}

/* ---------------------------------------------------------
   12.3 — CREAR EL CIELO DE FONDO
--------------------------------------------------------- */

function crearEstrellasModulo12() {
  const canvas = modulo12.canvas;
  if (!canvas) return;

  const cantidad =
    window.innerWidth < 600 ? 110 : 200;

  modulo12.estrellas = [];

  for (let i = 0; i < cantidad; i++) {
    modulo12.estrellas.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radio: 0.4 + Math.random() * 1.8,
      opacidad: 0.2 + Math.random() * 0.7,
      fase: Math.random() * Math.PI * 2,
      velocidad: 0.0008 + Math.random() * 0.0016
    });
  }
}

/* ---------------------------------------------------------
   12.4 — AJUSTAR EL CANVAS
--------------------------------------------------------- */

function ajustarCanvasModulo12() {
  const canvas = modulo12.canvas;
  if (!canvas) return;

  const proporcion =
    Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = window.innerWidth * proporcion;
  canvas.height = window.innerHeight * proporcion;

  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  crearEstrellasModulo12();
}

/* ---------------------------------------------------------
   12.5 — ANIMAR EL FONDO
--------------------------------------------------------- */

function animarFondoModulo12(tiempo) {
  if (!modulo12.activo) return;

  const contexto = modulo12.contexto;
  const canvas = modulo12.canvas;

  contexto.clearRect(
    0,
    0,
    canvas.width,
    canvas.height
  );

  modulo12.estrellas.forEach((estrella) => {
    const pulso =
      Math.sin(
        tiempo * estrella.velocidad +
        estrella.fase
      );

    const opacidad =
      estrella.opacidad +
      pulso * 0.18;

    contexto.beginPath();

    contexto.arc(
      estrella.x,
      estrella.y,
      Math.max(estrella.radio + pulso * 0.2, 0.2),
      0,
      Math.PI * 2
    );

    contexto.fillStyle =
      `rgba(255, 255, 255, ${Math.max(opacidad, 0.08)})`;

    contexto.shadowBlur = 6;
    contexto.shadowColor =
      "rgba(190, 160, 255, 0.45)";

    contexto.fill();
  });

  contexto.shadowBlur = 0;

  dibujarParticulasCapsula(contexto);

  modulo12.animacionId =
    requestAnimationFrame(animarFondoModulo12);
}

/* ---------------------------------------------------------
   12.6 — PARTÍCULAS DE LA ESTRELLA ENVIADA
--------------------------------------------------------- */

function crearParticulasCapsula() {
  const canvas = modulo12.canvas;
  if (!canvas) return;

  const centroX = canvas.width / 2;
  const centroY = canvas.height / 2;

  modulo12.particulas = [];

  for (let i = 0; i < 55; i++) {
    const angulo = Math.random() * Math.PI * 2;
    const velocidad = 0.8 + Math.random() * 3;

    modulo12.particulas.push({
      x: centroX,
      y: centroY,
      velocidadX: Math.cos(angulo) * velocidad,
      velocidadY: Math.sin(angulo) * velocidad,
      radio: 0.8 + Math.random() * 2.4,
      vida: 1,
      reduccion: 0.008 + Math.random() * 0.014,
      color:
        Math.random() > 0.5
          ? "255, 158, 220"
          : "174, 145, 255"
    });
  }
}

function dibujarParticulasCapsula(contexto) {
  if (!modulo12.particulas.length) return;

  modulo12.particulas =
    modulo12.particulas.filter(
      (particula) => particula.vida > 0
    );

  modulo12.particulas.forEach((particula) => {
    particula.x += particula.velocidadX;
    particula.y += particula.velocidadY;

    particula.velocidadX *= 0.985;
    particula.velocidadY *= 0.985;

    particula.vida -= particula.reduccion;

    contexto.beginPath();

    contexto.arc(
      particula.x,
      particula.y,
      particula.radio,
      0,
      Math.PI * 2
    );

    contexto.fillStyle =
      `rgba(${particula.color}, ${particula.vida})`;

    contexto.shadowBlur = 12;
    contexto.shadowColor =
      `rgba(${particula.color}, 0.8)`;

    contexto.fill();
  });
}

/* ---------------------------------------------------------
   12.7 — CONTROL DEL TEXTO
--------------------------------------------------------- */

function actualizarMensajeCapsula() {
  const textarea =
    document.getElementById("mensaje-capsula-tiempo");

  const contador =
    document.getElementById("contador-capsula");

  const boton =
    document.getElementById("boton-enviar-capsula");

  if (!textarea || !contador || !boton) return;

  const cantidad = textarea.value.length;

  contador.textContent = `${cantidad} / 280`;
  boton.disabled = textarea.value.trim().length === 0;
}

/* ---------------------------------------------------------
   12.8 — GUARDAR EL MENSAJE
--------------------------------------------------------- */

function guardarMensajeCapsula() {
  const textarea =
    document.getElementById("mensaje-capsula-tiempo");

  const mensaje = textarea?.value.trim() || "";

  modulo12.mensajeGuardado = mensaje;

  /*
    Se guarda en el navegador del dispositivo.
    Así el mensaje puede recuperarse incluso si
    la página se recarga.
  */

  try {
    localStorage.setItem(
      "mensajeCapsulaDani",
      mensaje
    );

    localStorage.setItem(
      "fechaCapsulaDani",
      new Date().toISOString()
    );
  } catch (error) {
    console.warn(
      "No se pudo guardar la cápsula localmente:",
      error
    );
  }

  enviarEstrellaCapsula(false);
}

/* ---------------------------------------------------------
   12.9 — ENVIAR ESTRELLA VACÍA
--------------------------------------------------------- */

function guardarEstrellaVacia() {
  modulo12.mensajeGuardado = "";

  try {
    localStorage.setItem(
      "mensajeCapsulaDani",
      ""
    );

    localStorage.setItem(
      "fechaCapsulaDani",
      new Date().toISOString()
    );
  } catch (error) {
    console.warn(
      "No se pudo guardar la cápsula vacía:",
      error
    );
  }

  enviarEstrellaCapsula(true);
}

/* ---------------------------------------------------------
   12.10 — ANIMACIÓN DE ENVÍO
--------------------------------------------------------- */

function enviarEstrellaCapsula(estaVacia = false) {
  if (modulo12.estrellaEnviada) return;

  modulo12.estrellaEnviada = true;

  const panel =
    document.getElementById("panel-capsula");

  const estrella =
    document.getElementById("estrella-capsula-visual");

  const confirmacion =
    document.getElementById("mensaje-confirmacion-capsula");

  if (confirmacion) {
    confirmacion.textContent = estaVacia
      ? "La estrella guardará el espacio para un deseo futuro."
      : "Tu mensaje ha quedado guardado dentro de la estrella.";

    confirmacion.classList.add("visible");
  }

  crearParticulasCapsula();

  if (estrella) {
    estrella.classList.remove("enviando");

    void estrella.offsetWidth;

    estrella.classList.add("enviando");
  }

  setTimeout(() => {
    if (panel) {
      panel.style.opacity = "0";
      panel.style.transform =
        "translateY(25px) scale(0.95)";
      panel.style.pointerEvents = "none";
    }
  }, 1800);

  setTimeout(() => {
    mostrarResumenModulo12(estaVacia);
  }, 4200);

  window.dispatchEvent(
    new CustomEvent("capsulaEnviada", {
      detail: {
        mensaje: modulo12.mensajeGuardado,
        vacia: estaVacia
      }
    })
  );
}

/* ---------------------------------------------------------
   12.11 — MOSTRAR RESUMEN
--------------------------------------------------------- */

function mostrarResumenModulo12(estaVacia) {
  const panel =
    document.getElementById("panel-capsula");

  const resumen =
    document.getElementById("resumen-capsula");

  const texto =
    document.getElementById("texto-resumen-capsula");

  if (panel) {
    panel.style.display = "none";
  }

  if (texto) {
    texto.textContent = estaVacia
      ? "Incluso una estrella vacía puede guardar la promesa de algo hermoso que todavía no ha ocurrido."
      : "Hay palabras que no necesitan perderse. Esta estrella llevará las tuyas a través de todo nuestro universo.";
  }

  if (resumen) {
    resumen.style.display = "block";

    requestAnimationFrame(() => {
      resumen.classList.add("visible");
    });
  }
}

/* ---------------------------------------------------------
   12.12 — CONFIGURAR EVENTOS
--------------------------------------------------------- */

function configurarEventosModulo12() {
  const textarea =
    document.getElementById("mensaje-capsula-tiempo");

  const botonEnviar =
    document.getElementById("boton-enviar-capsula");

  const botonOmitir =
    document.getElementById("boton-omitir-capsula");

  const botonContinuar =
    document.getElementById("boton-continuar-modulo-12");

  textarea?.addEventListener(
    "input",
    actualizarMensajeCapsula
  );

  botonEnviar?.addEventListener(
    "click",
    guardarMensajeCapsula
  );

  botonOmitir?.addEventListener(
    "click",
    guardarEstrellaVacia
  );

  botonContinuar?.addEventListener(
    "click",
    finalizarModulo12
  );
}

/* ---------------------------------------------------------
   12.13 — INICIAR MÓDULO
--------------------------------------------------------- */

function iniciarModulo12() {
  crearModulo12();

  if (modulo12.activo) return;

  if (
    typeof modulo11 !== "undefined" &&
    modulo11.activo
  ) {
    modulo11.activo = false;

    modulo11.contenedor?.classList.remove(
      "modulo-11-visible"
    );

    modulo11.contenedor?.setAttribute(
      "aria-hidden",
      "true"
    );

    if (modulo11.animacionId) {
      cancelAnimationFrame(
        modulo11.animacionId
      );

      modulo11.animacionId = null;
    }
  }

  modulo12.activo = true;
  modulo12.estrellaEnviada = false;
  modulo12.particulas = [];

  const panel =
    document.getElementById("panel-capsula");

  const resumen =
    document.getElementById("resumen-capsula");

  const textarea =
    document.getElementById("mensaje-capsula-tiempo");

  const confirmacion =
    document.getElementById("mensaje-confirmacion-capsula");

  if (panel) {
    panel.style.display = "block";
    panel.style.opacity = "";
    panel.style.transform = "";
    panel.style.pointerEvents = "";
  }

  if (resumen) {
    resumen.classList.remove("visible");
    resumen.style.display = "none";
  }

  if (textarea) {
    textarea.value = "";
  }

  if (confirmacion) {
    confirmacion.textContent = "";
    confirmacion.classList.remove("visible");
  }

  actualizarMensajeCapsula();
  ajustarCanvasModulo12();

  modulo12.contenedor.setAttribute(
    "aria-hidden",
    "false"
  );

  requestAnimationFrame(() => {
    modulo12.contenedor.classList.add(
      "modulo-12-visible"
    );
  });

  modulo12.animacionId =
    requestAnimationFrame(animarFondoModulo12);

  window.dispatchEvent(
    new CustomEvent("modulo12Iniciado")
  );
}

/* ---------------------------------------------------------
   12.14 — FINALIZAR MÓDULO
--------------------------------------------------------- */

function finalizarModulo12() {
  if (!modulo12.activo) return;

  modulo12.activo = false;

  modulo12.contenedor.classList.remove(
    "modulo-12-visible"
  );

  modulo12.contenedor.setAttribute(
    "aria-hidden",
    "true"
  );

  if (modulo12.animacionId) {
    cancelAnimationFrame(
      modulo12.animacionId
    );

    modulo12.animacionId = null;
  }

  window.dispatchEvent(
    new CustomEvent("modulo12Finalizado", {
      detail: {
        mensaje: modulo12.mensajeGuardado
      }
    })
  );

  setTimeout(() => {
    if (typeof iniciarModulo13 === "function") {
      iniciarModulo13();
    }
  }, 1500);
}

/* ---------------------------------------------------------
   12.15 — REDIMENSIONAR
--------------------------------------------------------- */

window.addEventListener("resize", () => {
  if (!modulo12.activo) return;

  ajustarCanvasModulo12();
});

/* ---------------------------------------------------------
   12.16 — PREPARAR EL MÓDULO
--------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  crearModulo12();
});
/* =========================================================
   MÓDULO 14 — INTEGRADOR Y ARRANQUE FINAL
   Regalo interactivo para Dani

   IMPORTANTE:
   Este código debe ir al FINAL de script.js.
========================================================= */

const modulo14 = {
  iniciado: false,
  preparado: false,
  regaloTerminado: false,
  moduloActual: null,
  errores: [],
  modulosDisponibles: {},
  tiempoInicio: null
};

/* ---------------------------------------------------------
   14.1 — CONFIGURACIÓN GENERAL
--------------------------------------------------------- */

const configuracionModulo14 = {
  /*
    Cambia este valor por el primer módulo real
    que quieras ejecutar.

    Si todo el proyecto empieza en el módulo 1,
    deja "iniciarModulo1".

    Para probar desde el módulo 10, puedes usar:
    "iniciarModulo10"
  */

  funcionInicial: "iniciarModulo1",

  /*
    Si la función inicial no existe, el sistema
    buscará automáticamente el primer módulo
    disponible.
  */

  inicioAutomatico: true,

  /*
    Tiempo antes de comenzar el regalo.
  */

  retrasoInicial: 700,

  /*
    Mostrar mensajes técnicos en la consola.
  */

  mostrarDepuracion: true,

  /*
    Mostrar una pantalla de error si algo falla.
  */

  mostrarErroresEnPantalla: true
};

/* ---------------------------------------------------------
   14.2 — REGISTRO DE MENSAJES
--------------------------------------------------------- */

function registroModulo14(mensaje, tipo = "info") {
  if (!configuracionModulo14.mostrarDepuracion) return;

  const prefijo = "[Regalo para Dani]";

  if (tipo === "error") {
    console.error(prefijo, mensaje);
    return;
  }

  if (tipo === "advertencia") {
    console.warn(prefijo, mensaje);
    return;
  }

  if (tipo === "correcto") {
    console.log(
      `%c${prefijo} ${mensaje}`,
      "color: #ff8fd8; font-weight: bold;"
    );

    return;
  }

  console.log(prefijo, mensaje);
}

/* ---------------------------------------------------------
   14.3 — DETECTAR FUNCIONES DISPONIBLES
--------------------------------------------------------- */

function detectarModulosDisponibles() {
  modulo14.modulosDisponibles = {};

  /*
    Se revisan los módulos del 1 al 30.
    Puedes aumentar el número si luego añades más.
  */

  for (let numero = 1; numero <= 30; numero++) {
    const nombreFuncion = `iniciarModulo${numero}`;

    modulo14.modulosDisponibles[numero] =
      typeof window[nombreFuncion] === "function";
  }

  return modulo14.modulosDisponibles;
}

/* ---------------------------------------------------------
   14.4 — MOSTRAR RESULTADO DE LA REVISIÓN
--------------------------------------------------------- */

function mostrarEstadoModulos() {
  detectarModulosDisponibles();

  const disponibles = [];
  const ausentes = [];

  Object.entries(
    modulo14.modulosDisponibles
  ).forEach(([numero, existe]) => {
    if (existe) {
      disponibles.push(numero);
    } else {
      ausentes.push(numero);
    }
  });

  registroModulo14(
    `Módulos disponibles: ${
      disponibles.length
        ? disponibles.join(", ")
        : "ninguno"
    }`
  );

  /*
    Solo se informa de módulos ausentes dentro
    del rango realmente utilizado.
  */

  const ultimoModulo =
    disponibles.length > 0
      ? Math.max(...disponibles.map(Number))
      : 0;

  const faltantesIntermedios =
    ausentes.filter(
      (numero) =>
        Number(numero) <= ultimoModulo
    );

  if (faltantesIntermedios.length > 0) {
    registroModulo14(
      `Módulos intermedios no encontrados: ${
        faltantesIntermedios.join(", ")
      }`,
      "advertencia"
    );
  }

  return {
    disponibles: disponibles.map(Number),
    faltantes: faltantesIntermedios.map(Number)
  };
}

/* ---------------------------------------------------------
   14.5 — OBTENER PRIMER MÓDULO DISPONIBLE
--------------------------------------------------------- */

function obtenerPrimerModuloDisponible() {
  detectarModulosDisponibles();

  for (let numero = 1; numero <= 30; numero++) {
    if (modulo14.modulosDisponibles[numero]) {
      return numero;
    }
  }

  return null;
}

/* ---------------------------------------------------------
   14.6 — EJECUTAR UN MÓDULO DE FORMA SEGURA
--------------------------------------------------------- */

function ejecutarModuloSeguro(numero) {
  const nombreFuncion = `iniciarModulo${numero}`;
  const funcion = window[nombreFuncion];

  if (typeof funcion !== "function") {
    const mensaje =
      `No se encontró la función ${nombreFuncion}().`;

    modulo14.errores.push(mensaje);

    registroModulo14(
      mensaje,
      "advertencia"
    );

    return false;
  }

  try {
    modulo14.moduloActual = numero;

    registroModulo14(
      `Iniciando módulo ${numero}...`
    );

    funcion();

    registroModulo14(
      `Módulo ${numero} iniciado correctamente.`,
      "correcto"
    );

    return true;
  } catch (error) {
    manejarErrorModulo14(
      error,
      `al iniciar el módulo ${numero}`
    );

    return false;
  }
}

/* ---------------------------------------------------------
   14.7 — INICIAR POR NOMBRE DE FUNCIÓN
--------------------------------------------------------- */

function ejecutarFuncionInicialModulo14() {
  const nombreFuncion =
    configuracionModulo14.funcionInicial;

  const funcionInicial =
    window[nombreFuncion];

  if (typeof funcionInicial === "function") {
    try {
      const coincidencia =
        nombreFuncion.match(/\d+/);

      if (coincidencia) {
        modulo14.moduloActual =
          Number(coincidencia[0]);
      }

      registroModulo14(
        `Ejecutando ${nombreFuncion}()...`
      );

      funcionInicial();

      registroModulo14(
        "El regalo comenzó correctamente.",
        "correcto"
      );

      return true;
    } catch (error) {
      manejarErrorModulo14(
        error,
        `al ejecutar ${nombreFuncion}()`
      );

      return false;
    }
  }

  registroModulo14(
    `${nombreFuncion}() no existe. Buscando otro módulo disponible...`,
    "advertencia"
  );

  const primerModulo =
    obtenerPrimerModuloDisponible();

  if (primerModulo === null) {
    manejarErrorModulo14(
      new Error(
        "No se encontró ninguna función iniciarModuloX()."
      ),
      "durante el arranque"
    );

    return false;
  }

  return ejecutarModuloSeguro(primerModulo);
}

/* ---------------------------------------------------------
   14.8 — PANTALLA DE CARGA
--------------------------------------------------------- */

function crearPantallaCargaModulo14() {
  if (
    document.getElementById(
      "pantalla-carga-regalo"
    )
  ) {
    return;
  }

  const estilos =
    document.createElement("style");

  estilos.id =
    "estilos-pantalla-carga-regalo";

  estilos.textContent = `
    #pantalla-carga-regalo {
      position: fixed;
      inset: 0;
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      background:
        radial-gradient(
          circle at center,
          #26123f 0%,
          #0b0617 55%,
          #020105 100%
        );
      opacity: 1;
      visibility: visible;
      transition:
        opacity 1s ease,
        visibility 1s ease;
    }

    #pantalla-carga-regalo.oculta {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }

    .contenido-carga-regalo {
      width: min(85%, 420px);
      text-align: center;
      color: white;
      font-family:
        Georgia,
        "Times New Roman",
        serif;
    }

    .estrella-carga-regalo {
      display: block;
      margin-bottom: 18px;
      font-size: 3rem;
      color: #fff4fc;
      text-shadow:
        0 0 12px white,
        0 0 30px rgba(255, 143, 215, 0.9),
        0 0 60px rgba(142, 111, 255, 0.7);
      animation:
        pulsoCargaRegalo
        1.8s ease-in-out infinite;
    }

    .texto-carga-regalo {
      margin: 0;
      font-size: clamp(
        1rem,
        4vw,
        1.25rem
      );
      letter-spacing: 0.05em;
      color: rgba(
        255,
        245,
        252,
        0.9
      );
    }

    .barra-carga-regalo {
      position: relative;
      width: 100%;
      height: 4px;
      margin-top: 22px;
      overflow: hidden;
      border-radius: 999px;
      background:
        rgba(255, 255, 255, 0.1);
    }

    .barra-carga-regalo::after {
      content: "";
      position: absolute;
      inset: 0;
      width: 45%;
      border-radius: inherit;
      background:
        linear-gradient(
          90deg,
          transparent,
          rgba(255, 151, 219, 0.95),
          rgba(157, 133, 255, 0.95),
          transparent
        );
      animation:
        moverBarraCargaRegalo
        1.6s ease-in-out infinite;
    }

    @keyframes pulsoCargaRegalo {
      0%, 100% {
        transform: scale(0.9);
        opacity: 0.72;
      }

      50% {
        transform: scale(1.16);
        opacity: 1;
      }
    }

    @keyframes moverBarraCargaRegalo {
      0% {
        transform: translateX(-120%);
      }

      100% {
        transform: translateX(270%);
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .estrella-carga-regalo,
      .barra-carga-regalo::after {
        animation: none;
      }
    }
  `;

  document.head.appendChild(estilos);

  const pantalla =
    document.createElement("div");

  pantalla.id =
    "pantalla-carga-regalo";

  pantalla.innerHTML = `
    <div class="contenido-carga-regalo">
      <span
        class="estrella-carga-regalo"
        aria-hidden="true"
      >
        ✦
      </span>

      <p class="texto-carga-regalo">
        Preparando tu universo...
      </p>

      <div
        class="barra-carga-regalo"
        aria-hidden="true"
      ></div>
    </div>
  `;

  document.body.appendChild(pantalla);
}

/* ---------------------------------------------------------
   14.9 — OCULTAR PANTALLA DE CARGA
--------------------------------------------------------- */

function ocultarPantallaCargaModulo14() {
  const pantalla =
    document.getElementById(
      "pantalla-carga-regalo"
    );

  if (!pantalla) return;

  pantalla.classList.add("oculta");

  setTimeout(() => {
    pantalla.remove();
  }, 1200);
}

/* ---------------------------------------------------------
   14.10 — MANEJAR ERRORES
--------------------------------------------------------- */

function manejarErrorModulo14(
  error,
  contexto = ""
) {
  const mensaje =
    error instanceof Error
      ? error.message
      : String(error);

  const mensajeCompleto =
    `Error ${contexto}: ${mensaje}`;

  modulo14.errores.push(
    mensajeCompleto
  );

  registroModulo14(
    mensajeCompleto,
    "error"
  );

  console.error(error);

  if (
    configuracionModulo14
      .mostrarErroresEnPantalla
  ) {
    mostrarErrorEnPantallaModulo14(
      mensajeCompleto
    );
  }
}

/* ---------------------------------------------------------
   14.11 — MOSTRAR ERROR EN PANTALLA
--------------------------------------------------------- */

function mostrarErrorEnPantallaModulo14(
  mensaje
) {
  ocultarPantallaCargaModulo14();

  let pantalla =
    document.getElementById(
      "error-regalo-dani"
    );

  if (!pantalla) {
    pantalla =
      document.createElement("div");

    pantalla.id =
      "error-regalo-dani";

    pantalla.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: 1000000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      box-sizing: border-box;
      background:
        radial-gradient(
          circle at center,
          #29163d,
          #090411 65%,
          #020104
        );
      color: white;
      font-family:
        Georgia,
        "Times New Roman",
        serif;
      text-align: center;
    `;

    pantalla.innerHTML = `
      <div style="
        width: min(100%, 520px);
        padding: 28px 22px;
        border: 1px solid
          rgba(255,255,255,.2);
        border-radius: 24px;
        background:
          rgba(255,255,255,.07);
        box-shadow:
          0 20px 70px
          rgba(0,0,0,.45);
        backdrop-filter: blur(14px);
      ">
        <div style="
          margin-bottom: 14px;
          font-size: 2.5rem;
        ">
          ✦
        </div>

        <h2 style="
          margin: 0;
          font-weight: 400;
        ">
          El universo tuvo un pequeño problema
        </h2>

        <p
          id="mensaje-error-regalo"
          style="
            margin: 15px 0 0;
            line-height: 1.55;
            color:
              rgba(255,240,250,.82);
          "
        ></p>

        <button
          id="boton-reintentar-regalo"
          type="button"
          style="
            margin-top: 22px;
            padding: 11px 22px;
            border: 1px solid
              rgba(255,255,255,.25);
            border-radius: 999px;
            background:
              rgba(255,255,255,.1);
            color: white;
            cursor: pointer;
          "
        >
          Intentar otra vez
        </button>
      </div>
    `;

    document.body.appendChild(
      pantalla
    );

    document
      .getElementById(
        "boton-reintentar-regalo"
      )
      ?.addEventListener(
        "click",
        () => {
          window.location.reload();
        }
      );
  }

  const elementoMensaje =
    document.getElementById(
      "mensaje-error-regalo"
    );

  if (elementoMensaje) {
    elementoMensaje.textContent =
      mensaje;
  }
}

/* ---------------------------------------------------------
   14.12 — CAPTURAR ERRORES GENERALES
--------------------------------------------------------- */

function configurarCapturaErroresModulo14() {
  window.addEventListener(
    "error",
    (evento) => {
      /*
        Evita repetir algunos errores que ya
        fueron procesados manualmente.
      */

      if (!evento.error) return;

      manejarErrorModulo14(
        evento.error,
        `en la línea ${
          evento.lineno || "desconocida"
        }`
      );
    }
  );

  window.addEventListener(
    "unhandledrejection",
    (evento) => {
      manejarErrorModulo14(
        evento.reason ||
          new Error(
            "Promesa rechazada sin controlar."
          ),
        "en una operación asíncrona"
      );
    }
  );
}

/* ---------------------------------------------------------
   14.13 — EVITAR DOBLE INICIO
--------------------------------------------------------- */

function regaloYaFueIniciadoModulo14() {
  if (modulo14.iniciado) {
    registroModulo14(
      "Se evitó un segundo inicio del regalo.",
      "advertencia"
    );

    return true;
  }

  return false;
}

/* ---------------------------------------------------------
   14.14 — PREPARAR EL REGALO
--------------------------------------------------------- */

function prepararRegaloModulo14() {
  if (modulo14.preparado) return;

  modulo14.preparado = true;
  modulo14.tiempoInicio =
    performance.now();

  crearPantallaCargaModulo14();
  configurarCapturaErroresModulo14();

  const estado =
    mostrarEstadoModulos();

  if (estado.disponibles.length === 0) {
    manejarErrorModulo14(
      new Error(
        "No se encontró ningún módulo para iniciar. Revisa que todos los códigos estén dentro de script.js."
      ),
      "durante la preparación"
    );

    return;
  }

  registroModulo14(
    "Sistema preparado.",
    "correcto"
  );
}

/* ---------------------------------------------------------
   14.15 — INICIAR TODO EL REGALO
--------------------------------------------------------- */

function iniciarRegaloDani() {
  if (regaloYaFueIniciadoModulo14()) {
    return;
  }

  modulo14.iniciado = true;

  prepararRegaloModulo14();

  setTimeout(() => {
    const iniciado =
      ejecutarFuncionInicialModulo14();

    if (!iniciado) {
      modulo14.iniciado = false;
      return;
    }

    ocultarPantallaCargaModulo14();

    const tiempoTotal =
      Math.round(
        performance.now() -
        modulo14.tiempoInicio
      );

    registroModulo14(
      `Regalo iniciado en ${tiempoTotal} ms.`,
      "correcto"
    );

    window.dispatchEvent(
      new CustomEvent(
        "regaloDaniIniciado",
        {
          detail: {
            moduloInicial:
              modulo14.moduloActual,
            tiempoCarga:
              tiempoTotal
          }
        }
      )
    );
  }, configuracionModulo14.retrasoInicial);
}

/* ---------------------------------------------------------
   14.16 — CAMBIAR DE MÓDULO MANUALMENTE
--------------------------------------------------------- */

function irAlModulo(numero) {
  if (
    !Number.isInteger(numero) ||
    numero < 1
  ) {
    registroModulo14(
      "El número de módulo no es válido.",
      "advertencia"
    );

    return false;
  }

  ocultarTodosLosModulosModulo14();

  return ejecutarModuloSeguro(numero);
}

/* ---------------------------------------------------------
   14.17 — OCULTAR TODOS LOS MÓDULOS
--------------------------------------------------------- */

function ocultarTodosLosModulosModulo14() {
  /*
    Busca elementos con identificadores:
    modulo-1, modulo-2, modulo-3, etc.
  */

  document.querySelectorAll(
    '[id^="modulo-"]'
  ).forEach((elemento) => {
    elemento.classList.forEach(
      (clase) => {
        if (
          clase.includes("visible")
        ) {
          elemento.classList.remove(
            clase
          );
        }
      }
    );

    elemento.setAttribute(
      "aria-hidden",
      "true"
    );

    elemento.style.pointerEvents =
      "none";
  });

  /*
    Reactivar los eventos del nuevo módulo
    depende de su propia función iniciarModuloX.
  */

  setTimeout(() => {
    document.querySelectorAll(
      '[id^="modulo-"]'
    ).forEach((elemento) => {
      elemento.style.pointerEvents = "";
    });
  }, 100);
}

/* ---------------------------------------------------------
   14.18 — REINICIAR TODO EL REGALO
--------------------------------------------------------- */

function reiniciarRegaloDani() {
  registroModulo14(
    "Reiniciando el regalo..."
  );

  try {
    /*
      No elimina la cápsula de Dani.
      Solo reinicia la experiencia.
    */

    sessionStorage.removeItem(
      "moduloActualRegaloDani"
    );
  } catch (error) {
    console.warn(error);
  }

  window.location.reload();
}

/* ---------------------------------------------------------
   14.19 — BORRAR PROGRESO Y CÁPSULA
--------------------------------------------------------- */

function borrarProgresoRegaloDani() {
  try {
    localStorage.removeItem(
      "mensajeCapsulaDani"
    );

    localStorage.removeItem(
      "fechaCapsulaDani"
    );

    sessionStorage.removeItem(
      "moduloActualRegaloDani"
    );

    registroModulo14(
      "El progreso y la cápsula fueron eliminados.",
      "correcto"
    );
  } catch (error) {
    manejarErrorModulo14(
      error,
      "al borrar el progreso"
    );
  }
}

/* ---------------------------------------------------------
   14.20 — GUARDAR MÓDULO ACTUAL
--------------------------------------------------------- */

function guardarModuloActual(numero) {
  if (!Number.isInteger(numero)) return;

  modulo14.moduloActual = numero;

  try {
    sessionStorage.setItem(
      "moduloActualRegaloDani",
      String(numero)
    );
  } catch (error) {
    console.warn(
      "No se pudo guardar el módulo actual.",
      error
    );
  }
}

/* ---------------------------------------------------------
   14.21 — EVENTOS DE LOS MÓDULOS 10 AL 13
--------------------------------------------------------- */

function conectarEventosModulosFinales() {
  window.addEventListener(
    "modulo10Iniciado",
    () => {
      guardarModuloActual(10);
    }
  );

  window.addEventListener(
    "modulo11Iniciado",
    () => {
      guardarModuloActual(11);
    }
  );

  window.addEventListener(
    "modulo12Iniciado",
    () => {
      guardarModuloActual(12);
    }
  );

  window.addEventListener(
    "modulo13Iniciado",
    () => {
      guardarModuloActual(13);
    }
  );

  window.addEventListener(
    "modulo13Finalizado",
    () => {
      modulo14.regaloTerminado = true;

      registroModulo14(
        "El recorrido llegó al final.",
        "correcto"
      );

      window.dispatchEvent(
        new CustomEvent(
          "regaloDaniFinalizado"
        )
      );
    }
  );
}

/* ---------------------------------------------------------
   14.22 — EXPONER FUNCIONES GLOBALMENTE
--------------------------------------------------------- */

/*
  Esto permite ejecutar estas funciones desde
  botones, consola o desde otros módulos.
*/

window.iniciarRegaloDani =
  iniciarRegaloDani;

window.irAlModulo =
  irAlModulo;

window.reiniciarRegaloDani =
  reiniciarRegaloDani;

window.borrarProgresoRegaloDani =
  borrarProgresoRegaloDani;

/* ---------------------------------------------------------
   14.23 — ARRANQUE DEFINITIVO
--------------------------------------------------------- */

function arrancarModulo14() {
  conectarEventosModulosFinales();

  if (
    configuracionModulo14
      .inicioAutomatico
  ) {
    iniciarRegaloDani();
  } else {
    registroModulo14(
      "El inicio automático está desactivado. Ejecuta iniciarRegaloDani()."
    );
  }
}

/*
  Este sistema funciona aunque script.js
  se cargue antes o después del HTML.
*/

if (
  document.readyState === "loading"
) {
  document.addEventListener(
    "DOMContentLoaded",
    arrancarModulo14,
    { once: true }
  );
} else {
  arrancarModulo14();
}
