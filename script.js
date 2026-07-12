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
           
