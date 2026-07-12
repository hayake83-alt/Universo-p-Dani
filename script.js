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

const shootingStars=[];

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
   MÓDULO 2
   SISTEMA DE ESTRELLAS
   =========================================================== */


/* ===========================================================
   CREACIÓN DEL CAMPO ESTELAR
   =========================================================== */

function createStars(){

    const geometry =
    new THREE.BufferGeometry();


    const positions = [];

    const colors = [];

    const sizes = [];


    const colorPalette = [

        new THREE.Color(0xffffff),

        new THREE.Color(0x9ecbff),

        new THREE.Color(0xffc7d8),

        new THREE.Color(0xd8c5ff),

        new THREE.Color(0xff8fa3)

    ];



    for(
        let i = 0;
        i < SETTINGS.stars;
        i++
    ){

        /*
          Distribución esférica:
          crea profundidad en todas
          las direcciones.
        */


        const radius =
        Math.pow(
            Math.random(),
            0.55
        ) *
        SETTINGS.galaxyRadius;



        const theta =
        Math.random()
        *
        Math.PI
        *
        2;



        const phi =
        Math.acos(
            random(-1,1)
        );



        const x =
        radius *
        Math.sin(phi)
        *
        Math.cos(theta);



        const y =
        radius *
        Math.sin(phi)
        *
        Math.sin(theta);



        const z =
        radius *
        Math.cos(phi);



        positions.push(
            x,
            y,
            z
        );



        const starColor =
        colorPalette[
            randomInt(
                0,
                colorPalette.length-1
            )
        ];



        colors.push(
            starColor.r,
            starColor.g,
            starColor.b
        );



        /*
          Variación de tamaño.
          Algunas estrellas destacan.
        */

        sizes.push(
            random(
                0.4,
                2.8
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


    geometry.setAttribute(

        "color",

        new THREE.Float32BufferAttribute(
            colors,
            3
        )

    );


    geometry.setAttribute(

        "size",

        new THREE.Float32BufferAttribute(
            sizes,
            1
        )

    );



    const material =
    new THREE.PointsMaterial({

        size:1.5,

        vertexColors:true,

        transparent:true,

        opacity:0.9,

        depthWrite:false,

        blending:
        THREE.AdditiveBlending

    });



    const starField =
    new THREE.Points(
        geometry,
        material
    );


    starsGroup.add(
        starField
    );


    stars.push(
        starField
    );


}



/* ===========================================================
   ESTRELLAS DESTACADAS
   (Preparación para interacción)
   =========================================================== */

function createInteractiveStarPoints(){

    for(
        let i = 0;
        i < SETTINGS.interactiveStars;
        i++
    ){

        interactiveStars.push({

            id:i,

            active:false,

            intensity:
            random(
                0.8,
                2
            )

        });

    }

}



/* ===========================================================
   INICIALIZAR ESTRELLAS
   =========================================================== */

createStars();

createInteractiveStarPoints();


console.log(
    "⭐ Campo estelar creado:"
    ,
    SETTINGS.stars,
    "estrellas"
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

    emissive: options.color,

    emissiveIntensity: 0.5,

    roughness:0.35,

    metalness:0.15

});



    const planet =
    new THREE.Mesh(

        geometry,

        material

    );



    planet.position.copy(
        options.position
    );
    /* ===========================================================
   HALO LUMINOSO DEL PLANETA
   =========================================================== */


const glowGeometry =
new THREE.SphereGeometry(

    options.size * 1.35,

    64,

    64

);



const glowMaterial =
new THREE.MeshBasicMaterial({

    color:options.color,

    transparent:true,

    opacity:0.12,

    side:
    THREE.BackSide,

    blending:
    THREE.AdditiveBlending

});



const glow =
new THREE.Mesh(

    glowGeometry,

    glowMaterial

);



planet.add(
    glow
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

    color:color:0x2979ff,

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

    color:color:0xff1744,

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

    color:color:0x9c27ff,

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

    color:color:0xdde7ff,

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
   ANIMACIÓN DEL HALO DE PLANETAS
   =========================================================== */

function updatePlanetGlow(){

    planets.forEach((planet)=>{


        if(
            planet.children.length > 0
        ){

            const glow =
            planet.children[0];


            const pulse =
            1 +
            Math.sin(
                elapsedTime * 2
            ) * 0.03;


            glow.scale.set(
                pulse,
                pulse,
                pulse
            );

        }


    });

}


/* ===========================================================
   INICIO
   =========================================================== */

console.log(
    "🪐 Planetas y luna creados."
);
/* ===========================================================
   UNIVERSO PARA DANI ❤️
   MÓDULO 6
   COMETAS · ESTRELLAS FUGACES · EFECTOS
   =========================================================== */


/* ===========================================================
   CREAR COMETA
   =========================================================== */

function createComet(){

    const cometGroup =
    new THREE.Group();


    const headGeometry =
    new THREE.SphereGeometry(
        2.5,
        32,
        32
    );


    const headMaterial =
    new THREE.MeshBasicMaterial({

        color:0xffffff

    });


    const head =
    new THREE.Mesh(
        headGeometry,
        headMaterial
    );


    cometGroup.add(head);



    const tailGeometry =
    new THREE.BufferGeometry();


    const tailPositions = [];


    for(
        let i = 0;
        i < 80;
        i++
    ){

        tailPositions.push(

            -i * 1.8,

            random(
                -0.8,
                0.8
            ),

            random(
                -0.8,
                0.8
            )

        );

    }



    tailGeometry.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(
            tailPositions,
            3
        )

    );



    const tailMaterial =
    new THREE.PointsMaterial({

        color:0x9ecbff,

        size:1.5,

        transparent:true,

        opacity:0.65,

        blending:
        THREE.AdditiveBlending,

        depthWrite:false

    });



    const tail =
    new THREE.Points(
        tailGeometry,
        tailMaterial
    );


    cometGroup.add(tail);



    cometGroup.position.set(

        random(-900,900),

        random(-400,400),

        random(-1200,-600)

    );



    cometGroup.velocity =
    new THREE.Vector3(

        random(0.4,1),

        random(-0.15,0.15),

        random(0.1,0.4)

    );



    cometsGroup.add(
        cometGroup
    );


    comets.push(
        cometGroup
    );

}



/* ===========================================================
   CREAR VARIOS COMETAS
   =========================================================== */

function createComets(){

    for(
        let i = 0;
        i < SETTINGS.comets;
        i++
    ){

        createComet();

    }

}



/* ===========================================================
   ESTRELLAS FUGACES
   =========================================================== */

function createShootingStar(){


    const geometry =
    new THREE.BufferGeometry();


    const positions = [

        0,0,0,

        -60,
        15,
        0

    ];



    geometry.setAttribute(

        "position",

        new THREE.Float32BufferAttribute(
            positions,
            3
        )

    );



    const material =
    new THREE.LineBasicMaterial({

        color:0xffffff,

        transparent:true,

        opacity:0.8

    });



    const line =
    new THREE.Line(

        geometry,

        material

    );



    line.position.set(

        random(-600,600),

        random(-300,300),

        random(-800,-300)

    );


    line.speed =
    random(
        0.8,
        2
    );


    effectsGroup.add(
        line
    );


    shootingStars.push(
        line
    );

}



/* ===========================================================
   ACTUALIZAR COMETAS
   =========================================================== */

function updateComets(){

    comets.forEach(
        (comet)=>{


            comet.position.add(
                comet.velocity
            );


            if(
                comet.position.x > 1000
            ){

                comet.position.x =
                -1000;

            }

        }
    );

}



/* ===========================================================
   ACTUALIZAR ESTRELLAS FUGACES
   =========================================================== */

function updateShootingStars(){

    shootingStars.forEach(
        (star)=>{

            star.position.x +=
            star.speed;


            if(
                star.position.x > 800
            ){

                star.position.x =
                -800;

                star.position.y =
                random(
                    -300,
                    300
                );

            }

        }
    );

}



/* ===========================================================
   INICIO
   =========================================================== */

for(
    let i = 0;
    i < 3;
    i++
){

    createShootingStar();

}


createComets();


console.log(
    "☄️ Cometas y estrellas fugaces creados."
);
/* ===========================================================
   UNIVERSO PARA DANI ❤️
   MÓDULO 7
   INTERACCIÓN CON ESTRELLAS · EFECTOS
   =========================================================== */


/* ===========================================================
   PARTÍCULAS DE DESTELLO
   =========================================================== */

function createStarBurst(position){


    const geometry =
    new THREE.BufferGeometry();


    const positions = [];


    for(
        let i = 0;
        i < 80;
        i++
    ){

        positions.push(

            random(
                -2,
                2
            ),

            random(
                -2,
                2
            ),

            random(
                -2,
                2
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

        size:2.5,

        transparent:true,

        opacity:1,

        blending:
        THREE.AdditiveBlending,

        depthWrite:false

    });



    const burst =
    new THREE.Points(
        geometry,
        material
    );


    burst.position.copy(
        position
    );


    burst.userData.life =
    1;



    effectsGroup.add(
        burst
    );


    particles.push(
        burst
    );

}



/* ===========================================================
   EFECTO AL TOCAR ESTRELLA
   =========================================================== */

function activateStar(star){


    if(
        !star
    ) return;



    createStarBurst(
        star.position
    );



    star.scale.setScalar(
        3
    );


    setTimeout(()=>{

        star.scale.setScalar(
            1
        );

    },500);


}



/* ===========================================================
   DETECCIÓN DE CLIC / TOQUE
   =========================================================== */

function checkStarInteraction(event){


    const rect =
    renderer.domElement.getBoundingClientRect();



    mouse.x =
    ((event.clientX - rect.left)
    / rect.width)
    * 2 - 1;



    mouse.y =
    -((event.clientY - rect.top)
    / rect.height)
    * 2 + 1;



    raycaster.setFromCamera(
        mouse,
        camera
    );



    const hits =
    raycaster.intersectObjects(
        interactiveStars,
        true
    );



    if(
        hits.length > 0
    ){

        activateStar(
            hits[0].object
        );

    }

}



/* ===========================================================
   EVENTOS
   =========================================================== */

window.addEventListener(

    "click",

    checkStarInteraction

);



window.addEventListener(

    "pointerdown",

    (event)=>{

        checkStarInteraction(
            event
        );

    }

);



/* ===========================================================
   MENSAJES OCULTOS
   =========================================================== */

const starMessages = [

    "Algunas luces permanecen incluso en la distancia.",

    "Cada universo tiene una estrella especial.",

    "Hay personas que hacen más brillante nuestro cielo."

];



function showStarMessage(){


    const message =
    starMessages[
        randomInt(
            0,
            starMessages.length - 1
        )
    ];



    subtitulo.innerText =
    message;



    overlay.classList.add(
        "mostrar"
    );

}



/* ===========================================================
   ACTUALIZAR DESTELLOS
   =========================================================== */

function updateStarBursts(){


    particles.forEach(
        (particle,index)=>{


            if(
                particle.userData &&
                particle.userData.life
            ){

                particle.userData.life -=
                0.015;


                particle.material.opacity =
                particle.userData.life;


                particle.scale.multiplyScalar(
                    1.02
                );


                if(
                    particle.userData.life <= 0
                ){

                    effectsGroup.remove(
                        particle
                    );

                }

            }


        }
    );

}


console.log(
    "✨ Interacción estelar preparada."
);
/* ===========================================================
   UNIVERSO PARA DANI ❤️
   MÓDULO 8
   INTEGRACIÓN FINAL · ANIMACIÓN COMPLETA
   =========================================================== */


/* ===========================================================
   ACTUALIZACIÓN DE ESTRELLAS
   =========================================================== */

function updateStars(){

    stars.forEach((star)=>{

        star.rotation.y += 0.00005;

    });

}



/* ===========================================================
   MOVIMIENTO SUAVE DEL UNIVERSO
   =========================================================== */

function updateUniverse(){

    universe.rotation.y += 0.00003;

    universe.rotation.x =
    Math.sin(elapsedTime * 0.05)
    * 0.002;

}



/* ===========================================================
   EFECTO DE PARPADEO DE ESTRELLAS
   =========================================================== */

function twinkleStars(){

    stars.forEach((field)=>{

        if(field.material){

            field.material.opacity =
            0.75 +
            Math.sin(elapsedTime * 2)
            * 0.15;

        }

    });

}



/* ===========================================================
   ANIMACIÓN DE PLANETAS
   =========================================================== */

function animatePlanets(){

    updatePlanets();

}



/* ===========================================================
   ANIMACIÓN GENERAL
   =========================================================== */

function updateWorld(){
   
    updatePlanetGlow();

    updateUniverse();

    updateStars();

    updateNebulas();

    updateParticles();

    updateComets();

    updateShootingStars();

    animatePlanets();

    updateStarBursts();

    twinkleStars();

}



/* ===========================================================
   NUEVO LOOP PRINCIPAL
   =========================================================== */

function animateUniverse(){

    requestAnimationFrame(
        animateUniverse
    );


    elapsedTime =
    clock.getElapsedTime();



    controls.update();


    updateCamera();


    updateWorld();



    renderer.render(
        scene,
        camera
    );

}



/* ===========================================================
   INTRO CINEMÁTICA
   =========================================================== */

function cinematicStart(){

    camera.position.set(
        0,
        20,
        220
    );


    const startPosition =
    new THREE.Vector3(
        0,
        8,
        140
    );



    const duration = 5000;

    const startTime =
    performance.now();



    function cameraIntro(){

        const progress =
        Math.min(
            (performance.now()
            - startTime)
            / duration,
            1
        );



        camera.position.lerpVectors(

            new THREE.Vector3(
                0,
                20,
                220
            ),

            startPosition,

            progress

        );



        if(progress < 1){

            requestAnimationFrame(
                cameraIntro
            );

        }

    }


    cameraIntro();

}



/* ===========================================================
   INICIO FINAL
   =========================================================== */

function launchUniverse(){

    cinematicStart();

    animateUniverse();


    setTimeout(()=>{

        finishLoading();

    },2500);


}



launchUniverse();



console.log(
    "🌌 Universo completamente integrado."
);

console.log(
    "✨ Sistema listo."
);

