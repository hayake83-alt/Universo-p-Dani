/* ===========================================================
   UNIVERSO PERSONALIZADO PARA DANI ❤️
   Experiencia de Regalo Galáctico (Inspirado en TikTok)
   Three.js r166 - Código Completo y Corregido
   =========================================================== */
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

/* ===========================================================
   CONFIGURACIÓN GENERAL
   =========================================================== */
const SETTINGS = {
    stars: 25000,           // Más estrellas para mayor detalle
    interactiveStars: 150, // Estrellas que reaccionan al toque
    comets: 6,
    particles: 5000,        // Polvo cósmico
    galaxyRadius: 1500,
    textFadeDelay: 6000,   // Cuánto tarda el mensaje en empezar a desvanecerse (ms)
    fontUrl: 'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json' // Fuente necesaria
};

// Paleta de Colores (Rojos, Azules, Violetas y Blancos)
const COLORS = {
    blue: 0x2288ff,
    deepBlue: 0x050510,
    violet: 0x8d63ff,
    pink: 0xff3f9b,
    red: 0xff2d55,
    white: 0xffffff,
    glow: 0xfff6e0,
    text: 0xffffff
};

/* ===========================================================
   ELEMENTOS HTML
   =========================================================== */
const canvas = document.getElementById("universo");
const loader = document.getElementById("loader"); // Asumiendo que tienes un loader HTML
const overlay = document.getElementById("overlay"); // Contenedor para mensajes finales

/* ===========================================================
   MOTOR DE THREE.JS (Escena, Cámara, Render)
   =========================================================== */
let scene, camera, renderer, controls, clock, raycaster, mouse;
let elapsedTime = 0;

// Grupos para organizar la escena
const universeGroup = new THREE.Group();
const starsGroup = new THREE.Group();
const interactiveStarsGroup = new THREE.Group();
const nebulaGroup = new THREE.Group();
const planetsGroup = new THREE.Group();
const effectsGroup = new THREE.Group();
const textGroup = new THREE.Group(); // Grupo especial para los mensajes que se desvanecen

// Arrays para gestión de animaciones
const stars = [];
const nebulas = [];
const planets = [];
const interactiveStarMeshes = [];
const comets = [];
const particles = [];
const textsToFade = []; // Array para controlar el desvanecimiento del texto

/* ===========================================================
   FUNCIONES AUXILIARES
   =========================================================== */
const random = (min, max) => Math.random() * (max - min) + min;
const randomInt = (min, max) => Math.floor(random(min, max + 1));
const lerp = (start, end, amount) => start + (end - start) * amount;

/* ===========================================================
   1. INICIALIZACIÓN DEL MOTOR
   =========================================================== */
function initEngine() {
    // Escena y Niebla profunda
    scene = new THREE.Scene();
    scene.background = new THREE.Color(COLORS.deepBlue);
    scene.fog = new THREE.FogExp2(COLORS.deepBlue, 0.00015);

    // Cámara
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 8000);
    camera.position.set(0, 15, 200); // Empezamos un poco lejos para la intro

    // Renderer de alta performance
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    // Controles de orbita (suaves)
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false; // Zoom desactivado para mantener la inmersión
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.08; // Rotación global lenta
    controls.minPolarAngle = Math.PI * 0.30;
    controls.maxPolarAngle = Math.PI * 0.65;

    // Utilidades
    clock = new THREE.Clock();
    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // Añadir grupos a la escena
    scene.add(universeGroup);
    universeGroup.add(starsGroup, interactiveStarsGroup, nebulaGroup, planetsGroup, effectsGroup, textGroup);

    // Luces ambientales y de acento
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(COLORS.glow, 0.8);
    mainLight.position.set(100, 100, 50);
    scene.add(mainLight);

    // Eventos
    window.addEventListener("resize", onWindowResize);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("click", onStarClick);
    window.addEventListener("touchstart", onStarTouch, { passive: false });
}

/* ===========================================================
   2. CREACIÓN DEL CAMPO ESTELAR DETALLADO
   =========================================================== */
function createStars() {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const sizes = [];

    const starColors = [
        new THREE.Color(COLORS.white),
        new THREE.Color(COLORS.blue),
        new THREE.Color(COLORS.pink),
        new THREE.Color(COLORS.violet)
    ];

    for (let i = 0; i < SETTINGS.stars; i++) {
        // Distribución esférica expansiva
        const radius = Math.pow(Math.random(), 0.6) * SETTINGS.galaxyRadius;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(random(-1, 1));

        positions.push(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta) * 0.5, // Un poco aplanada
            radius * Math.cos(phi)
        );

        const color = starColors[randomInt(0, starColors.length - 1)];
        colors.push(color.r, color.g, color.b);
        sizes.push(random(0.5, 3.0)); // Variación de tamaño
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.Float32BufferAttribute(sizes, 1));

    // Material de puntos con textura de destello (sprite)
    const starTexture = new THREE.TextureLoader().load("https://threejs.org/examples/textures/sprites/disc.png");
    const material = new THREE.PointsMaterial({
        size: 2.0,
        map: starTexture,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    const starField = new THREE.Points(geometry, material);
    starsGroup.add(starField);
    stars.push(starField);
}

/* ===========================================================
   3. ESTRELLAS INTERACTIVAS (Sorpresas al tocar)
   =========================================================== */
function createInteractiveStars() {
    const geometry = new THREE.SphereGeometry(1.5, 12, 12); // Esferas pequeñas invisibles para click
    
    // Material básico brillante
    const material = new THREE.MeshBasicMaterial({
        color: COLORS.white,
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending
    });

    for (let i = 0; i < SETTINGS.interactiveStars; i++) {
        const star = new THREE.Mesh(geometry, material.clone());
        
        // Posicionarlas en zonas visibles pero dispersas
        star.position.set(
            random(-400, 400),
            random(-150, 150),
            random(-300, 300)
        );
        
        // Datos personalizados para la animación
        star.userData = {
            baseScale: random(0.8, 1.5),
            twinkleSpeed: random(1, 3),
            interacting: false
        };
        star.scale.setScalar(star.userData.baseScale);
        
        interactiveStarsGroup.add(star);
        interactiveStarMeshes.push(star);
    }
}

// Lógica de Interacción Surprise (Click/Toque)
function interactWithStar(star) {
    if (star.userData.interacting) return;
    star.userData.interacting = true;

    // Efecto 1: Brillo intenso y escalado rápido
    star.material.color.set(COLORS.glow);
    star.scale.setScalar(star.userData.baseScale * 4);

    // Efecto 2: Soltar brillos (Burst)
    createStarBurst(star.position);

    // Efecto 3: Pequeño temblor (Shake) - Implementado en el update loop

    // Resetear tras un tiempo
    setTimeout(() => {
        star.material.color.set(COLORS.white);
        star.scale.setScalar(star.userData.baseScale);
        star.userData.interacting = false;
    }, 800);
}

// Explosión de partículas (Brillos)
function createStarBurst(position) {
    const particleCount = 50;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];

    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = position.x;
        positions[i * 3 + 1] = position.y;
        positions[i * 3 + 2] = position.z;

        // Velocidad explosiva aleatoria
        velocities.push(new THREE.Vector3(
            random(-1.5, 1.5),
            random(-1.5, 1.5),
            random(-1.5, 1.5)
        ));
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const material = new THREE.PointsMaterial({
        color: COLORS.glow,
        size: 2.0,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const burstParticles = new THREE.Points(geometry, material);
    burstParticles.userData = { velocities: velocities, life: 1.0 }; // life de 1 a 0
    effectsGroup.add(burstParticles);
    particles.push(burstParticles);
}

/* ===========================================================
   4. NEBULOSAS AVANZADAS (Tonos Rojos, Azules, Violetas)
   =========================================================== */
function createNebulas() {
    // Definición de las nebulosas principales
    const nebulaConfigs = [
        { color: COLORS.red, pos: [-350, 50, -400], size: 400, scaleY: 0.4 },
        { color: COLORS.blue, pos: [300, -50, -500], size: 450, scaleY: 0.5 },
        { color: COLORS.violet, pos: [0, 150, -600], size: 500, scaleY: 0.3 },
        { color: COLORS.pink, pos: [450, 80, 100], size: 350, scaleY: 0.6 }
    ];

    nebulaConfigs.forEach(config => {
        createNebulaCloud(config.color, new THREE.Vector3(...config.pos), config.size, config.scaleY);
    });
}

function createNebulaCloud(color, position, size, scaleY) {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    const nebulaColor = new THREE.Color(color);

    // Crear miles de partículas pequeñas por nube
    const particleCount = 1500;

    for (let i = 0; i < particleCount; i++) {
        // Distribución Gaussian (concentrada en el centro)
        const radius = Math.pow(Math.random(), 1.5) * size;
        const angle = Math.random() * Math.PI * 2;
        
        positions.push(
            Math.cos(angle) * radius + random(-20, 20),
            (random(-size, size) * 0.2 + random(-10, 10)) * scaleY, // Aplanada en Y
            Math.sin(angle) * radius
        );

        // Variación sutil de color y opacidad
        const variation = random(0.6, 1.0);
        colors.push(nebulaColor.r * variation, nebulaColor.g * variation, nebulaColor.b * variation);
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: random(3, 7),
        transparent: true,
        opacity: 0.08, // Muy sutil para que se acumule
        vertexColors: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    const nebula = new THREE.Points(geometry, material);
    nebula.position.copy(position);
    nebula.rotation.set(random(0, Math.PI), random(0, Math.PI), 0);
    
    nebulaGroup.add(nebula);
    nebulas.push(nebula);
}

/* ===========================================================
   5. TEXTO DE ESTRELLAS: "Dani" y "Feliz Cumpleaños"
   =========================================================== */
function createBirthdayMessages() {
    const loader = new FontLoader();
    
    loader.load(SETTINGS.fontUrl, (font) => {
        // 1. Nombre "Dani" (Cerca, impacto inicial)
        createStarText("Dani", font, new THREE.Vector3(0, 10, 50), 12, COLORS.white, false);

        // 2. Mensaje "Feliz Cumpleaños" (Más lejos, se desvanece)
        // Usamos setTimeout para que aparezca un poco después
        setTimeout(() => {
            createStarText("Feliz Cumpleaños", font, new THREE.Vector3(0, -15, -50), 8, COLORS.glow, true);
        }, 2000);
    });
}

/**
 * Crea texto formado por partículas estelares.
 * @param {boolean} shouldFade - Si el texto debe desvanecerse y dispersarse
 */
function createStarText(text, font, position, size, color, shouldFade) {
    const textGeometry = new TextGeometry(text, {
        font: font,
        size: size,
        height: 1,
        curveSegments: 12,
        bevelEnabled: false
    });

    // Centrar geométricamente
    textGeometry.computeBoundingBox();
    const centerOffset = -0.5 * (textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x);
    
    // En lugar de un Mesh, extraemos los vértices para crear puntos (estrellas)
    const pointsGeometry = new THREE.BufferGeometry();
    const positions = textGeometry.attributes.position.array;
    pointsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Material de estrellas para el texto
    const material = new THREE.PointsMaterial({
        color: color,
        size: shouldFade ? 1.5 : 1.8, // Texto de cumple un poco más sutil
        transparent: true,
        opacity: 1.0,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });

    const starText = new THREE.Points(pointsGeometry, material);
    starText.position.set(position.x + centerOffset, position.y, position.z);
    
    textGroup.add(starText);

    // Preparar lógica de desvanecimiento
    if (shouldFade) {
        starText.userData = {
            isText: true,
            createdAt: elapsedTime,
            fading: false,
            // Guardar posiciones originales para dispersión
            originalPositions: pointsGeometry.attributes.position.clone()
        };
        textsToFade.push(starText);
    }
}

// Lógica de desvanecimiento y dispersión de texto (Aurora estelar)
function updateTextFading(delta) {
    textsToFade.forEach(textObj => {
        const userData = textObj.userData;
        const positions = textObj.geometry.attributes.position;
        const count = positions.count;

        // Comprobar si es hora de empezar a desvanecerse
        if (!userData.fading && (elapsedTime - userData.createdAt) > (SETTINGS.textFadeDelay / 1000)) {
            userData.fading = true;
        }

        if (userData.fading) {
            // 1. Reducir opacidad
            textObj.material.opacity -= delta * 0.25; // Velocidad de desvanecimiento

            // 2. Dispersar vértices (Efecto Aurora/Escapada)
            for (let i = 0; i < count; i++) {
                // Mover cada "estrella" del texto aleatoriamente hacia afuera
                positions.array[i * 3] += (Math.random() - 0.5) * 0.5;     // X
                positions.array[i * 3 + 1] += (Math.random() + 0.1) * 0.3; // Y (subiendo)
                positions.array[i * 3 + 2] += (Math.random() - 0.5) * 0.5; // Z
            }
            positions.needsUpdate = true;

            // Eliminar si es invisible
            if (textObj.material.opacity <= 0) {
                textGroup.remove(textObj);
                textsToFade.splice(textsToFade.indexOf(textObj), 1);
            }
        }
    });
}

/* ===========================================================
   6. PLANETAS Y OTROS EFECTOS
   =========================================================== */
function createPlanets() {
    // Un solo planeta principal elegante (Violeta/Azul)
    const geometry = new THREE.SphereGeometry(20, 64, 64);
    const material = new THREE.MeshStandardMaterial({
        color: COLORS.violet,
        emissive: 0x110022,
        roughness: 0.6,
        metalness: 0.2
    });
    const mainPlanet = new THREE.Mesh(geometry, material);
    mainPlanet.position.set(-200, -30, -300);
    planetsGroup.add(mainPlanet);
    planets.push(mainPlanet);

    // Añadir anillo elegante (Rojizo/Blanco)
    const ringGeometry = new THREE.RingGeometry(25, 40, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
        color: COLORS.red,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2.2;
    mainPlanet.add(ring);
}

// Polvo Cósmico Ambiental
function createCosmicDust() {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];

    const dustColors = [new THREE.Color(COLORS.blue), new THREE.Color(COLORS.violet)];

    for (let i = 0; i < SETTINGS.particles; i++) {
        positions.push(random(-800, 800), random(-400, 400), random(-800, 800));
        const color = dustColors[randomInt(0, 1)];
        colors.push(color.r, color.g, color.b);
    }

    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
        size: 1.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.2,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    const dust = new THREE.Points(geometry, material);
    effectsGroup.add(dust);
}

/* ===========================================================
   7. BUCLE DE ANIMACIÓN Y LÓGICA DE ACTUALIZACIÓN
   =========================================================== */
function animate() {
    requestAnimationFrame(animate);
    
    const delta = clock.getDelta();
    elapsedTime = clock.getElapsedTime();

    // Actualizar controles (requerido para damping)
    controls.update();

    // 1. Animación Estrellas Interactivas (Parpadeo y Sorpresas)
    interactiveStarMeshes.forEach(star => {
        // Parpadeo base
        const twinkle = 1 + Math.sin(elapsedTime * star.userData.twinkleSpeed) * 0.1;
        
        if (star.userData.interacting) {
            // Efecto temblor si se está tocando
            star.position.x += (Math.random() - 0.5) * 0.5;
            star.position.y += (Math.random() - 0.5) * 0.5;
        } else {
            star.scale.setScalar(star.userData.baseScale * twinkle);
        }
    });

    // 2. Actualizar Ráfagas de Brillos (Burst particles)
    particles.forEach(burst => {
        const userData = burst.userData;
        const positions = burst.geometry.attributes.position;
        
        userData.life -= delta * 1.2; // La vida cae
        burst.material.opacity = userData.life;

        for (let i = 0; i < positions.count; i++) {
            positions.array[i * 3] += userData.velocities[i].x;
            positions.array[i * 3 + 1] += userData.velocities[i].y;
            positions.array[i * 3 + 2] += userData.velocities[i].z;
            
            // Gravedad sutil hacia abajo
            userData.velocities[i].y -= 0.01;
        }
        positions.needsUpdate = true;

        if (userData.life <= 0) {
            effectsGroup.remove(burst);
            particles.splice(particles.indexOf(burst), 1);
        }
    });

    // 3. Actualizar Nebulosas (RotaciÃ³n sutilÃ­sima)
    nebulas.forEach((nebula, i) => {
        nebula.rotation.y += delta * (0.01 + i * 0.005);
        nebula.rotation.x += delta * 0.008;
    });

    // 4. Actualizar Planetas
    planets.forEach(planet => {
        planet.rotation.y += delta * 0.1;
    });

    // 5. LÃ³gica de Desvanecimiento del Texto
    updateTextFading(delta);

    // Renderizar la escena
    renderer.render(scene, camera);
}

/* ===========================================================
   8. EVENTOS Y LANZAMIENTO
   =========================================================== */
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onPointerMove(event) {
    // Normalizar coordenadas del mouse para Raycaster
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function checkStarClick() {
    raycaster.setFromCamera(mouse, camera);
    // Solo checkear contra el grupo de estrellas interactivas
    const intersects = raycaster.intersectObjects(interactiveStarMeshes);

    if (intersects.length > 0) {
        interactWithStar(intersects[0].object);
    }
}

function onStarClick(event) {
    checkStarClick();
}

function onStarTouch(event) {
    // Prevenir scroll
    if(event.touches.length > 0) {
        // Actualizar posiciÃ³n del mouse simulada para el toque
        mouse.x = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
        checkStarClick();
        event.preventDefault();
    }
}

// FunciÃ³n de Inicio (Intro CinemÃ¡tica)
function startExperience() {
    // AnimaciÃ³n de entrada de cÃ¡mara (Zoom in suave)
    const duration = 4000; // ms
    const startPos = { z: 500 };
    const endPos = { z: 200 };
    
    let startTime = null;

    function cameraIntro(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        
        // Easing suave (ease-out)
        const easeOut = 1 - Math.pow(1 - progress, 3);
        
        camera.position.z = startPos.z - (startPos.z - endPos.z) * easeOut;

        if (progress < 1) {
            requestAnimationFrame(cameraIntro);
        } else {
            // Ocultar loader HTML si existe
            if (loader) loader.style.display = 'none';
        }
    }

    requestAnimationFrame(cameraIntro);
    animate();
}

/* ===========================================================
   LANZAMIENTO FINAL
   =========================================================== */
// Asegurarnos de que el DOM estÃ© cargado
window.onload = () => {
    initEngine();
    createStars();
    createInteractiveStars();
    createNebulas();
    createPlanets();
    createCosmicDust();
    createBirthdayMessages();
    
    // Iniciar con la intro cinemÃ¡tica
    startExperience();
    
    console.log("ðŸŒŒ Universo para Dani cargado. Esperando interacciones...");
};