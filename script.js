/* ===========================================================
   UNIVERSO PARA DANI ❤️
   Script principal
   Three.js r166
   MÓDULO 1A
   =========================================================== */

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

/* ===========================================================
   HTML
   =========================================================== */

const canvas = document.getElementById("universo");

const loader = document.getElementById("loader");
const overlay = document.getElementById("overlay");
const flash = document.getElementById("flash");

const titulo = document.getElementById("titulo");
const subtitulo = document.getElementById("subtitulo");

/* ===========================================================
   ESCENA
   =========================================================== */

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x000000);

scene.fog = new THREE.FogExp2(
    0x050510,
    0.00018
);

/* ===========================================================
   CÁMARA
   =========================================================== */

const camera = new THREE.PerspectiveCamera(

    60,

    window.innerWidth / window.innerHeight,

    0.1,

    6000

);

camera.position.set(

    0,

    8,

    140

);

/* ===========================================================
   RENDERER
   =========================================================== */

const renderer = new THREE.WebGLRenderer({

    canvas,

    antialias: true,

    alpha: false,

    powerPreference: "high-performance"

});

renderer.setSize(

    window.innerWidth,

    window.innerHeight

);

renderer.setPixelRatio(

    Math.min(window.devicePixelRatio,2)

);

renderer.outputColorSpace =
THREE.SRGBColorSpace;

renderer.toneMapping =
THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure = 1.25;

renderer.shadowMap.enabled = true;

renderer.shadowMap.type =
THREE.PCFSoftShadowMap;

/* ===========================================================
   CONTROLES
   =========================================================== */

const controls = new OrbitControls(

    camera,

    renderer.domElement

);

controls.enablePan = false;

controls.enableZoom = false;

controls.enableDamping = true;

controls.dampingFactor = 0.04;

controls.autoRotate = true;

controls.autoRotateSpeed = 0.05;

controls.minPolarAngle = Math.PI * 0.35;

controls.maxPolarAngle = Math.PI * 0.65;

/* ===========================================================
   RELOJ
   =========================================================== */

const clock = new THREE.Clock();

/* ===========================================================
   RAYCASTER
   =========================================================== */

const raycaster = new THREE.Raycaster();

const mouse = new THREE.Vector2();

/* ===========================================================
   CURSOR
   =========================================================== */

const cursor = {

    x:0,

    y:0,

    targetX:0,

    targetY:0

};

/* ===========================================================
   GRUPOS PRINCIPALES
   =========================================================== */

const universe = new THREE.Group();

const starsGroup = new THREE.Group();

const nebulaGroup = new THREE.Group();

const planetsGroup = new THREE.Group();

const particlesGroup = new THREE.Group();

const cometsGroup = new THREE.Group();

const effectsGroup = new THREE.Group();

scene.add(universe);

universe.add(starsGroup);

universe.add(nebulaGroup);

universe.add(planetsGroup);

universe.add(particlesGroup);

universe.add(cometsGroup);

universe.add(effectsGroup);

/* ===========================================================
   PALETA
   =========================================================== */

const COLORS={

    blue:0x6da8ff,

    violet:0x8d63ff,

    red:0xff5d7d,

    white:0xffffff,

    moon:0xe7ecff,

    deep:0x050510

};

/* ===========================================================
   ARRAYS GLOBALES
   =========================================================== */

const stars=[];

const interactiveStars=[];

const nebulas=[];

const planets=[];

const particles=[];

const comets=[];

/* ===========================================================
   CONFIGURACIÓN
   =========================================================== */

const SETTINGS={

    stars:18000,

    interactiveStars:120,

    nebulas:8,

    planets:7,

    comets:5,

    particles:3500,

    galaxyRadius:1300

};

console.log("🌌 Universo inicializado");
/* ===========================================================
   UNIVERSO PARA DANI ❤️
   MÓDULO 1B (CORREGIDO)
   Luces · Utilidades · Eventos · Preparación del motor
   =========================================================== */


/* ===========================================================
   ILUMINACIÓN
   =========================================================== */

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    0.35
);

scene.add(ambientLight);


const blueLight = new THREE.PointLight(
    COLORS.blue,
    45,
    1800
);

blueLight.position.set(
    -250,
    140,
    180
);

scene.add(blueLight);


const redLight = new THREE.PointLight(
    COLORS.red,
    38,
    1800
);

redLight.position.set(
    260,
    -120,
    -200
);

scene.add(redLight);


const violetLight = new THREE.PointLight(
    COLORS.violet,
    40,
    1800
);

violetLight.position.set(
    -120,
    -220,
    -420
);

scene.add(violetLight);


const moonLight = new THREE.DirectionalLight(
    COLORS.moon,
    1.4
);

moonLight.position.set(
    150,
    240,
    90
);

scene.add(moonLight);


/* ===========================================================
   VARIABLES DEL MOTOR
   =========================================================== */

let elapsedTime = 0;

let universeRotation = 0;

let introFinished = false;

let allowInteraction = false;


/* ===========================================================
   FUNCIONES AUXILIARES
   =========================================================== */

function random(min,max){

    return Math.random() * (max-min) + min;

}


function randomInt(min,max){

    return Math.floor(
        random(min,max+1)
    );

}


function lerp(start,end,amount){

    return start + (end-start)*amount;

}


function clamp(value,min,max){

    return Math.min(
        Math.max(value,min),
        max
    );

}


function degrees(value){

    return value * Math.PI / 180;

}


/* ===========================================================
   MOVIMIENTO DE CÁMARA
   =========================================================== */

function updateCamera(){

    cursor.x = lerp(
        cursor.x,
        cursor.targetX,
        0.03
    );


    cursor.y = lerp(
        cursor.y,
        cursor.targetY,
        0.03
    );


    camera.position.x +=
        (cursor.x * 12 - camera.position.x)
        * 0.01;


    camera.position.y +=
        (cursor.y * 8 + 8 - camera.position.y)
        * 0.01;


}


/* ===========================================================
   EVENTOS DEL MOUSE
   =========================================================== */

window.addEventListener(
    "pointermove",
    (event)=>{

        cursor.targetX =
        (event.clientX / window.innerWidth)
        * 2 - 1;


        cursor.targetY =
        -(event.clientY / window.innerHeight)
        * 2 + 1;


        mouse.x = cursor.targetX;

        mouse.y = cursor.targetY;

    }
);



/* ===========================================================
   REDIMENSIONAR PANTALLA
   =========================================================== */

window.addEventListener(
    "resize",
    ()=>{

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
   CARGA INICIAL
   =========================================================== */

function finishLoading(){

    loader.classList.add(
        "ocultar"
    );


    setTimeout(()=>{

        overlay.classList.add(
            "mostrar"
        );


        introFinished = true;

        allowInteraction = true;


    },1500);

}


/* ===========================================================
   FUNCIÓN INIT
   =========================================================== */

function init(){

    console.log(
        "🌌 Iniciando universo..."
    );


    renderer.render(
        scene,
        camera
    );

}


/* ===========================================================
   PREPARACIÓN
   =========================================================== */

init();


console.log(
    "💡 Módulo 1B corregido correctamente."
);
/* ===========================================================
   UNIVERSO PARA DANI ❤️
   MÓDULO 1C
   Animación · Loop principal · Táctil · Inicio
   =========================================================== */


/* ===========================================================
   EVENTOS TÁCTILES
   =========================================================== */

let touchStartX = 0;
let touchStartY = 0;


window.addEventListener(
    "touchstart",
    (event)=>{

        touchStartX =
        event.touches[0].clientX;


        touchStartY =
        event.touches[0].clientY;

    },
    {passive:true}
);



window.addEventListener(
    "touchmove",
    (event)=>{

        const touch =
        event.touches[0];


        const deltaX =
        touch.clientX - touchStartX;


        const deltaY =
        touch.clientY - touchStartY;


        cursor.targetX +=
        deltaX * 0.0005;


        cursor.targetY -=
        deltaY * 0.0005;


        touchStartX =
        touch.clientX;


        touchStartY =
        touch.clientY;

    },
    {passive:true}
);



/* ===========================================================
   LOOP DE ANIMACIÓN PRINCIPAL
   =========================================================== */

function animate(){

    requestAnimationFrame(
        animate
    );


    elapsedTime =
    clock.getElapsedTime();



    /*
       Movimiento global suave.
       Más adelante aquí conectaremos:
       - estrellas
       - nebulosas
       - planetas
       - partículas
    */

    universeRotation += 0.00008;


    universe.rotation.y =
    universeRotation;



    updateCamera();


    controls.update();



    renderer.render(
        scene,
        camera
    );

}



/* ===========================================================
   INTRODUCCIÓN
   =========================================================== */

function startUniverse(){

    animate();


    setTimeout(()=>{

        finishLoading();

    },2200);

}



/* ===========================================================
   INICIO DEFINITIVO
   =========================================================== */

startUniverse();



console.log(
    "🎬 Motor de animación iniciado."
);

console.log(
    "🌌 Universo preparado para recibir estrellas."
);
/* ===========================================================
   UNIVERSO PARA DANI ❤️
   MÓDULO 3
   NEBULOSAS CÓSMICAS
   =========================================================== */


/* ===========================================================
   CREAR UNA NEBULOSA
   =========================================================== */

function createNebula(
    color,
    position,
    size,
    particleCount
){

    const geometry =
    new THREE.BufferGeometry();


    const positions = [];

    const colors = [];



    const nebulaColor =
    new THREE.Color(color);



    for(
        let i = 0;
        i < particleCount;
        i++
    ){

        /*
          Distribución tipo nube:
          concentra partículas en el centro
        */

        const radius =
        Math.pow(
            Math.random(),
            1.8
        )
        *
        size;



        const angle =
        Math.random()
        *
        Math.PI
        *
        2;



        const height =
        random(
            -size * 0.35,
            size * 0.35
        );



        const x =
        Math.cos(angle)
        *
        radius
        +
        random(
            -15,
            15
        );



        const y =
        height
        +
        Math.sin(angle)
        *
        radius
        *
        0.35;



        const z =
        Math.sin(angle)
        *
        radius;



        positions.push(
            x,
            y,
            z
        );



        /*
          Variación suave del color
        */

        const variation =
        random(
            0.55,
            1
        );

        colors.push(

            nebulaColor.r *
            variation,

            nebulaColor.g *
            variation,

            nebulaColor.b *
            variation

        );

    }



    geometry.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(
            positions,
            3
        )

    );



    geometry.setAttribute(

        "color",

        new THREE.Float32BufferAttribute(
            colors,
            3
        )

    );



    const material =
    new THREE.PointsMaterial({

        size:
        random(
            2,
            5
        ),

        transparent:true,

        opacity:0.12,

        vertexColors:true,

        depthWrite:false,

        blending:
        THREE.AdditiveBlending

    });



    const nebula =
    new THREE.Points(
        geometry,
        material
    );



    nebula.position.copy(
        position
    );


    nebula.rotation.set(

        random(
            0,
            Math.PI
        ),

        random(
            0,
            Math.PI
        ),

        random(
            0,
            Math.PI
        )

    );



    nebulaGroup.add(
        nebula
    );


    nebulas.push(
        nebula
    );


}


/* ===========================================================
   CREACIÓN DE NEBULOSAS
   =========================================================== */

function createNebulas(){


    createNebula(

        COLORS.red,

        new THREE.Vector3(
            -350,
            120,
            -300
        ),

        350,

        900

    );



    createNebula(

        COLORS.blue,

        new THREE.Vector3(
            300,
            -80,
            -450
        ),

        420,

        1100

    );



    createNebula(

        COLORS.violet,

        new THREE.Vector3(
            0,
            250,
            -700
        ),

        500,

        1400

    );



    createNebula(

        0xff3f9b,

        new THREE.Vector3(
            450,
            100,
            200
        ),

        300,

        700

    );


}



/* ===========================================================
   MOVIMIENTO DE NEBULOSAS
   =========================================================== */

function updateNebulas(){

    nebulas.forEach(
        (nebula,index)=>{

            nebula.rotation.y +=
            0.0003 +
            index *
            0.00005;


            nebula.rotation.x +=
            0.00008;


        }
    );

}



/* ===========================================================
   INICIAR
   =========================================================== */

createNebulas();


console.log(
    "☁️ Nebulosas creadas."
);
/* ===========================================================
   UNIVERSO PARA DANI ❤️
   MÓDULO 4
   POLVO CÓSMICO · PARTÍCULAS AMBIENTALES
   =========================================================== */


/* ===========================================================
   CREAR POLVO ESTELAR
   =========================================================== */

function createCosmicDust(){

    const geometry =
    new THREE.BufferGeometry();


    const positions = [];

    const colors = [];


    const dustColors = [

        new THREE.Color(0x8db8ff),

        new THREE.Color(0xcbb7ff),

        new THREE.Color(0xff9fb5),

        new THREE.Color(0xffffff)

    ];



    for(
        let i = 0;
        i < SETTINGS.particles;
        i++
    ){

        const radius =
        random(
            200,
            1400
        );


        const angle =
        Math.random()
        *
        Math.PI
        *
        2;



        const spread =
        random(
            -500,
            500
        );



        const x =
        Math.cos(angle)
        *
        radius
        +
        spread;



        const y =
        random(
            -600,
            600
        );



        const z =
        Math.sin(angle)
        *
        radius
        +
        spread;



        positions.push(
            x,
            y,
            z
        );



        const color =
        dustColors[
            randomInt(
                0,
                dustColors.length - 1
            )
        ];



        colors.push(

            color.r,

            color.g,

            color.b

        );

    }



    geometry.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(
            positions,
            3
        )

    );



    geometry.setAttribute(

        "color",

        new THREE.Float32BufferAttribute(
            colors,
            3
        )

    );



    const material =
    new THREE.PointsMaterial({

        size:1.8,

        vertexColors:true,

        transparent:true,

        opacity:0.35,

        depthWrite:false,

        blending:
        THREE.AdditiveBlending

    });



    const dust =
    new THREE.Points(
        geometry,
        material
    );



    particlesGroup.add(
        dust
    );


    particles.push(
        dust
    );

}



/* ===========================================================
   PARTÍCULAS DE LUZ PEQUEÑAS
   =========================================================== */

function createLightParticles(){

    const geometry =
    new THREE.BufferGeometry();


    const positions = [];



    for(
        let i = 0;
        i < 700;
        i++
    ){

        positions.push(

            random(
                -900,
                900
            ),

            random(
                -500,
                500
            ),

            random(
                -900,
                900
            )

        );

    }



    geometry.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(
            positions,
            3
        )

    );



    const material =
    new THREE.PointsMaterial({

        color:0xffffff,

        size:1.2,

        transparent:true,

        opacity:0.22,

        depthWrite:false,

        blending:
        THREE.AdditiveBlending

    });



    const particlesLight =
    new THREE.Points(
        geometry,
        material
    );



    effectsGroup.add(
        particlesLight
    );


    particles.push(
        particlesLight
    );

}



/* ===========================================================
   ANIMACIÓN DE PARTÍCULAS
   =========================================================== */

function updateParticles(){

    particles.forEach(
        (particle,index)=>{

            particle.rotation.y +=
            0.00015 +
            index * 0.00002;


            particle.rotation.x +=
            0.00005;


        }
    );

}



/* ===========================================================
   INICIAR PARTÍCULAS
   =========================================================== */

createCosmicDust();

createLightParticles();


console.log(
    "✨ Polvo cósmico generado."
);
/* ===========================================================
   UNIVERSO PARA DANI ❤️
   MÓDULO 5
   PLANETAS · LUNA · CUERPOS CELESTES
   =========================================================== */


/* ===========================================================
   CREAR PLANETA
   =========================================================== */

function createPlanet(options){


    const geometry =
    new THREE.SphereGeometry(

        options.size,

        64,

        64

    );



    const material =
    new THREE.MeshStandardMaterial({

        color: options.color,

        roughness:0.75,

        metalness:0.1

    });



    const planet =
    new THREE.Mesh(

        geometry,

        material

    );



    planet.position.copy(
        options.position
    );


    planet.rotationSpeed =
    options.rotationSpeed ||
    0.002;



    planet.name =
    options.name;



    planetsGroup.add(
        planet
    );


    planets.push(
        planet
    );



    return planet;

}



/* ===========================================================
   PLANETAS PRINCIPALES
   =========================================================== */

const planetOne =
createPlanet({

    name:"Planeta azul",

    size:18,

    color:0x3868ff,

    position:new THREE.Vector3(
        -230,
        40,
        -450
    ),

    rotationSpeed:0.0015

});



const planetTwo =
createPlanet({

    name:"Planeta rojo",

    size:12,

    color:0xff405f,

    position:new THREE.Vector3(
        250,
        -40,
        -600
    ),

    rotationSpeed:0.0025

});



const planetThree =
createPlanet({

    name:"Planeta violeta",

    size:25,

    color:0x855cff,

    position:new THREE.Vector3(
        100,
        180,
        -900
    ),

    rotationSpeed:0.001

});



const planetFour =
createPlanet({

    name:"Planeta oscuro",

    size:9,

    color:0x29254a,

    position:new THREE.Vector3(
        -500,
        -130,
        -700
    ),

    rotationSpeed:0.003

});



/* ===========================================================
   ANILLO PLANETARIO
   =========================================================== */

function addRing(planet){


    const geometry =
    new THREE.RingGeometry(

        planet.geometry.parameters.radius * 1.5,

        planet.geometry.parameters.radius * 2.2,

        96

    );



    const material =
    new THREE.MeshBasicMaterial({

        color:0xd7c8ff,

        side:THREE.DoubleSide,

        transparent:true,

        opacity:0.55

    });



    const ring =
    new THREE.Mesh(

        geometry,

        material

    );



    ring.rotation.x =
    Math.PI / 2.5;



    planet.add(
        ring
    );


}


addRing(
    planetThree
);



/* ===========================================================
   LUNA
   =========================================================== */

function createMoon(parent){


    const moonGroup =
    new THREE.Group();



    const geometry =
    new THREE.SphereGeometry(

        4,

        48,

        48

    );



    const material =
    new THREE.MeshStandardMaterial({

        color:0xcfd7ff,

        roughness:1

    });



    const moon =
    new THREE.Mesh(

        geometry,

        material

    );



    moon.position.x =
    32;



    moonGroup.add(
        moon
    );


    parent.add(
        moonGroup
    );


    moonGroup.orbitSpeed =
    0.004;


    moonGroup.moon =
    moon;



    planets.push(
        moonGroup
    );

}


createMoon(
    planetOne
);



/* ===========================================================
   ACTUALIZACIÓN DE PLANETAS
   =========================================================== */

function updatePlanets(){

    planets.forEach(
        (planet)=>{


            if(
                planet.rotationSpeed
            ){

                planet.rotation.y +=
                planet.rotationSpeed;

            }


            if(
                planet.orbitSpeed
            ){

                planet.rotation.y +=
                planet.orbitSpeed;

            }


        }
    );

}



/* ===========================================================
   INICIO
   =========================================================== */

console.log(
    "🪐 Planetas y luna creados."
);

