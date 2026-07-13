import * as THREE from "https://unpkg.com/three@0.166.1/build/three.module.js";


/* =========================================================
   UNIVERSO PARA DANI
   ETAPA 3: NEBULOSAS Y PROFUNDIDAD ESPACIAL
   ========================================================= */


/* ---------------------------------------------------------
   ELEMENTOS DEL HTML
--------------------------------------------------------- */

const canvas = document.getElementById("universe");
const intro = document.getElementById("intro");
const startButton = document.getElementById("startButton");

const loader = document.getElementById("loader");
const loaderText = document.getElementById("loaderText");

const statusElement = document.getElementById("status");

const errorPanel = document.getElementById("errorPanel");
const errorMessage = document.getElementById("errorMessage");


/* ---------------------------------------------------------
   VARIABLES PRINCIPALES
--------------------------------------------------------- */

let scene;
let camera;
let renderer;
let clock;

let mainStars;
let distantStars;
let coloredStars;
let closeStars;

let nebulaGroup;
let glowGroup;

let animationFrameId = null;

let isUniverseReady = false;
let hasEntered = false;
let isPageVisible = true;

const pointer = {
    x: 0,
    y: 0
};

const smoothPointer = {
    x: 0,
    y: 0
};


/* ---------------------------------------------------------
   DETECCIÓN DEL DISPOSITIVO
--------------------------------------------------------- */

const isSmallScreen = window.matchMedia(
    "(max-width: 700px)"
).matches;

const isVerySmallScreen = window.matchMedia(
    "(max-width: 420px)"
).matches;

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;


/* ---------------------------------------------------------
   CONFIGURACIÓN DE RENDIMIENTO
--------------------------------------------------------- */

const STAR_CONFIG = {
    mainCount: isSmallScreen ? 1400 : 2600,
    distantCount: isSmallScreen ? 850 : 1600,
    coloredCount: isSmallScreen ? 180 : 360,
    closeCount: isSmallScreen ? 120 : 240,

    mainSpread: 115,
    distantSpread: 175,
    coloredSpread: 100,
    closeSpread: 70
};

const NEBULA_CONFIG = {
    count: isVerySmallScreen
        ? 5
        : isSmallScreen
            ? 7
            : 11
};


/* ---------------------------------------------------------
   INICIO
--------------------------------------------------------- */

document.addEventListener(
    "DOMContentLoaded",
    initializeUniverse
);


/**
 * Inicia la escena completa.
 */
async function initializeUniverse() {
    try {
        validateRequiredElements();

        updateStatus("Comprobando el navegador…");
        updateLoaderText("Preparando el espacio…");

        if (!supportsWebGL()) {
            throw new Error(
                "WebGL no está disponible. Abre la página con Chrome, " +
                "Edge, Firefox o Safari actualizado."
            );
        }

        createScene();
        createCamera();
        createRenderer();

        updateLoaderText("Creando estrellas…");

        createStarFields();

        updateLoaderText("Formando nebulosas…");

        createNebulas();
        createAmbientGlows();

        createEventListeners();
        handleResize();

        clock = new THREE.Clock();

        startAnimation();

        await wait(750);

        revealUniverse();

    } catch (error) {
        handleFatalError(error);
    }
}


/* ---------------------------------------------------------
   COMPROBACIONES
--------------------------------------------------------- */

/**
 * Comprueba que todos los elementos necesarios existan.
 */
function validateRequiredElements() {
    const requiredElements = [
        canvas,
        intro,
        startButton,
        loader,
        loaderText,
        statusElement,
        errorPanel,
        errorMessage
    ];

    const missingElement = requiredElements.some(
        (element) => !element
    );

    if (missingElement) {
        throw new Error(
            "Falta uno o más elementos necesarios en index.html. " +
            "No cambies los identificadores id del proyecto."
        );
    }
}


/**
 * Comprueba si el navegador puede utilizar WebGL.
 */
function supportsWebGL() {
    try {
        const testCanvas = document.createElement("canvas");

        const context =
            testCanvas.getContext("webgl2") ||
            testCanvas.getContext("webgl") ||
            testCanvas.getContext("experimental-webgl");

        return Boolean(context);

    } catch (error) {
        console.error(
            "Error al comprobar WebGL:",
            error
        );

        return false;
    }
}


/* ---------------------------------------------------------
   ESCENA, CÁMARA Y RENDERIZADOR
--------------------------------------------------------- */

/**
 * Crea el espacio principal.
 */
function createScene() {
    scene = new THREE.Scene();

    scene.background = new THREE.Color(
        0x02030a
    );

    scene.fog = new THREE.FogExp2(
        0x02030a,
        0.0075
    );
}


/**
 * Crea la cámara.
 */
function createCamera() {
    camera = new THREE.PerspectiveCamera(
        61,
        window.innerWidth / window.innerHeight,
        0.1,
        500
    );

    camera.position.set(
        0,
        0,
        18
    );
}


/**
 * Crea el renderizador de Three.js.
 */
function createRenderer() {
    renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: !isSmallScreen,
        alpha: false,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false
    });

    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio || 1,
            isSmallScreen ? 1.7 : 2
        )
    );

    renderer.setSize(
        window.innerWidth,
        window.innerHeight,
        false
    );

    renderer.outputColorSpace =
        THREE.SRGBColorSpace;

    renderer.setClearColor(
        0x02030a,
        1
    );
}


/* ---------------------------------------------------------
   TEXTURAS GENERADAS CON CANVAS
--------------------------------------------------------- */

/**
 * Crea una textura circular para las estrellas.
 */
function createStarTexture() {
    const textureCanvas =
        document.createElement("canvas");

    textureCanvas.width = 128;
    textureCanvas.height = 128;

    const context =
        textureCanvas.getContext("2d");

    if (!context) {
        throw new Error(
            "No fue posible crear la textura de las estrellas."
        );
    }

    const gradient =
        context.createRadialGradient(
            64,
            64,
            0,
            64,
            64,
            64
        );

    gradient.addColorStop(
        0,
        "rgba(255,255,255,1)"
    );

    gradient.addColorStop(
        0.08,
        "rgba(255,255,255,0.98)"
    );

    gradient.addColorStop(
        0.22,
        "rgba(190,215,255,0.75)"
    );

    gradient.addColorStop(
        0.48,
        "rgba(120,160,255,0.22)"
    );

    gradient.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );

    context.fillStyle = gradient;

    context.fillRect(
        0,
        0,
        128,
        128
    );

    const texture =
        new THREE.CanvasTexture(
            textureCanvas
        );

    texture.colorSpace =
        THREE.SRGBColorSpace;

    texture.needsUpdate = true;

    return texture;
}


/**
 * Crea una textura suave para una nebulosa.
 */
function createNebulaTexture({
    innerColor,
    middleColor,
    outerColor
}) {
    const textureCanvas =
        document.createElement("canvas");

    textureCanvas.width = 512;
    textureCanvas.height = 512;

    const context =
        textureCanvas.getContext("2d");

    if (!context) {
        throw new Error(
            "No fue posible crear la textura de la nebulosa."
        );
    }

    context.clearRect(
        0,
        0,
        512,
        512
    );

    const mainGradient =
        context.createRadialGradient(
            256,
            256,
            0,
            256,
            256,
            255
        );

    mainGradient.addColorStop(
        0,
        innerColor
    );

    mainGradient.addColorStop(
        0.24,
        middleColor
    );

    mainGradient.addColorStop(
        0.64,
        outerColor
    );

    mainGradient.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );

    context.fillStyle =
        mainGradient;

    context.fillRect(
        0,
        0,
        512,
        512
    );

    addNebulaClouds(
        context,
        512,
        512
    );

    const texture =
        new THREE.CanvasTexture(
            textureCanvas
        );

    texture.colorSpace =
        THREE.SRGBColorSpace;

    texture.needsUpdate = true;

    return texture;
}


/**
 * Agrega manchas suaves dentro de la nebulosa.
 */
function addNebulaClouds(
    context,
    width,
    height
) {
    for (
        let index = 0;
        index < 18;
        index += 1
    ) {
        const x = randomBetween(
            width * 0.18,
            width * 0.82
        );

        const y = randomBetween(
            height * 0.18,
            height * 0.82
        );

        const radius = randomBetween(
            32,
            120
        );

        const cloudGradient =
            context.createRadialGradient(
                x,
                y,
                0,
                x,
                y,
                radius
            );

        const opacity = randomBetween(
            0.025,
            0.1
        );

        cloudGradient.addColorStop(
            0,
            `rgba(255,255,255,${opacity})`
        );

        cloudGradient.addColorStop(
            0.45,
            `rgba(170,190,255,${opacity * 0.38})`
        );

        cloudGradient.addColorStop(
            1,
            "rgba(0,0,0,0)"
        );

        context.fillStyle =
            cloudGradient;

        context.beginPath();

        context.arc(
            x,
            y,
            radius,
            0,
            Math.PI * 2
        );

        context.fill();
    }
}


/**
 * Crea una textura ambiental circular.
 */
function createGlowTexture() {
    const textureCanvas =
        document.createElement("canvas");

    textureCanvas.width = 256;
    textureCanvas.height = 256;

    const context =
        textureCanvas.getContext("2d");

    if (!context) {
        throw new Error(
            "No fue posible crear el brillo ambiental."
        );
    }

    const gradient =
        context.createRadialGradient(
            128,
            128,
            0,
            128,
            128,
            128
        );

    gradient.addColorStop(
        0,
        "rgba(255,255,255,0.85)"
    );

    gradient.addColorStop(
        0.12,
        "rgba(180,205,255,0.48)"
    );

    gradient.addColorStop(
        0.42,
        "rgba(105,120,255,0.12)"
    );

    gradient.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );

    context.fillStyle =
        gradient;

    context.fillRect(
        0,
        0,
        256,
        256
    );

    const texture =
        new THREE.CanvasTexture(
            textureCanvas
        );

    texture.colorSpace =
        THREE.SRGBColorSpace;

    return texture;
}


/* ---------------------------------------------------------
   CAMPOS DE ESTRELLAS
--------------------------------------------------------- */

/**
 * Crea todas las capas de estrellas.
 */
function createStarFields() {
    const starTexture =
        createStarTexture();

    mainStars = createStars({
        count: STAR_CONFIG.mainCount,
        spread: STAR_CONFIG.mainSpread,
        size: isSmallScreen ? 0.5 : 0.42,
        opacity: 0.88,
        colorMode: "white",
        texture: starTexture
    });

    distantStars = createStars({
        count: STAR_CONFIG.distantCount,
        spread: STAR_CONFIG.distantSpread,
        size: isSmallScreen ? 0.25 : 0.2,
        opacity: 0.42,
        colorMode: "soft",
        texture: starTexture
    });

    coloredStars = createStars({
        count: STAR_CONFIG.coloredCount,
        spread: STAR_CONFIG.coloredSpread,
        size: isSmallScreen ? 0.7 : 0.58,
        opacity: 0.74,
        colorMode: "colored",
        texture: starTexture
    });

    closeStars = createStars({
        count: STAR_CONFIG.closeCount,
        spread: STAR_CONFIG.closeSpread,
        size: isSmallScreen ? 0.9 : 0.72,
        opacity: 0.72,
        colorMode: "bright",
        texture: starTexture,
        minimumRadius: 20
    });

    mainStars.rotation.x = 0.08;
    distantStars.rotation.x = -0.05;
    coloredStars.rotation.z = 0.03;
    closeStars.rotation.y = -0.08;

    scene.add(mainStars);
    scene.add(distantStars);
    scene.add(coloredStars);
    scene.add(closeStars);
}


/**
 * Genera una capa de partículas.
 */
function createStars({
    count,
    spread,
    size,
    opacity,
    colorMode,
    texture,
    minimumRadius = null
}) {
    const geometry =
        new THREE.BufferGeometry();

    const positions =
        new Float32Array(
            count * 3
        );

    const colors =
        new Float32Array(
            count * 3
        );

    const sizes =
        new Float32Array(
            count
        );

    const color =
        new THREE.Color();

    for (
        let index = 0;
        index < count;
        index += 1
    ) {
        const positionIndex =
            index * 3;

        const innerRadius =
            minimumRadius ??
            spread * 0.22;

        const radius =
            randomBetween(
                innerRadius,
                spread
            );

        const theta =
            Math.random() *
            Math.PI *
            2;

        const phi =
            Math.acos(
                randomBetween(
                    -1,
                    1
                )
            );

        positions[positionIndex] =
            radius *
            Math.sin(phi) *
            Math.cos(theta);

        positions[positionIndex + 1] =
            radius *
            Math.sin(phi) *
            Math.sin(theta);

        positions[positionIndex + 2] =
            radius *
            Math.cos(phi);

        setStarColor(
            color,
            colorMode
        );

        colors[positionIndex] =
            color.r;

        colors[positionIndex + 1] =
            color.g;

        colors[positionIndex + 2] =
            color.b;

        sizes[index] =
            randomBetween(
                0.65,
                1.35
            );
    }

    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );

    geometry.setAttribute(
        "color",
        new THREE.BufferAttribute(
            colors,
            3
        )
    );

    geometry.setAttribute(
        "randomSize",
        new THREE.BufferAttribute(
            sizes,
            1
        )
    );

    geometry.computeBoundingSphere();

    const material =
        new THREE.PointsMaterial({
            size,
            map: texture,
            alphaMap: texture,
            sizeAttenuation: true,
            transparent: true,
            opacity,
            vertexColors: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

    const points =
        new THREE.Points(
            geometry,
            material
        );

    points.userData.baseOpacity =
        opacity;

    points.userData.baseSize =
        size;

    return points;
}


/**
 * Asigna un color según la capa.
 */
function setStarColor(
    color,
    mode
) {
    if (mode === "colored") {
        const randomValue =
            Math.random();

        if (randomValue < 0.43) {
            color.setRGB(
                randomBetween(
                    0.5,
                    0.76
                ),
                randomBetween(
                    0.67,
                    0.88
                ),
                1
            );

            return;
        }

        if (randomValue < 0.78) {
            color.setRGB(
                1,
                randomBetween(
                    0.5,
                    0.72
                ),
                randomBetween(
                    0.72,
                    0.94
                )
            );

            return;
        }

        color.setRGB(
            1,
            randomBetween(
                0.8,
                0.97
            ),
            randomBetween(
                0.62,
                0.82
            )
        );

        return;
    }

    if (mode === "soft") {
        const brightness =
            randomBetween(
                0.44,
                0.72
            );

        color.setRGB(
            brightness * 0.82,
            brightness * 0.9,
            brightness
        );

        return;
    }

    if (mode === "bright") {
        const brightness =
            randomBetween(
                0.88,
                1
            );

        color.setRGB(
            brightness,
            brightness,
            randomBetween(
                0.93,
                1
            )
        );

        return;
    }

    const brightness =
        randomBetween(
            0.68,
            1
        );

    color.setRGB(
        brightness,
        brightness,
        randomBetween(
            brightness * 0.88,
            1
        )
    );
}


/* ---------------------------------------------------------
   NEBULOSAS
--------------------------------------------------------- */

/**
 * Crea varias nebulosas suaves.
 */
function createNebulas() {
    nebulaGroup =
        new THREE.Group();

    nebulaGroup.name =
        "NebulaGroup";

    const blueTexture =
        createNebulaTexture({
            innerColor:
                "rgba(120,155,255,0.6)",

            middleColor:
                "rgba(52,79,194,0.27)",

            outerColor:
                "rgba(20,30,90,0.03)"
        });

    const violetTexture =
        createNebulaTexture({
            innerColor:
                "rgba(189,131,255,0.5)",

            middleColor:
                "rgba(103,47,167,0.23)",

            outerColor:
                "rgba(46,20,80,0.03)"
        });

    const pinkTexture =
        createNebulaTexture({
            innerColor:
                "rgba(255,137,204,0.44)",

            middleColor:
                "rgba(163,54,128,0.2)",

            outerColor:
                "rgba(72,20,58,0.025)"
        });

    const textureOptions = [
        blueTexture,
        violetTexture,
        pinkTexture
    ];

    for (
        let index = 0;
        index < NEBULA_CONFIG.count;
        index += 1
    ) {
        const texture =
            textureOptions[
                index %
                textureOptions.length
            ];

        const material =
            new THREE.SpriteMaterial({
                map: texture,
                transparent: true,
                opacity: randomBetween(
                    0.1,
                    0.24
                ),
                depthWrite: false,
                depthTest: true,
                blending: THREE.AdditiveBlending
            });

        const sprite =
            new THREE.Sprite(
                material
            );

        const distance =
            randomBetween(
                42,
                105
            );

        const angle =
            randomBetween(
                0,
                Math.PI * 2
            );

        const verticalAngle =
            randomBetween(
                -0.8,
                0.8
            );

        sprite.position.set(
            Math.cos(angle) *
                distance,

            Math.sin(verticalAngle) *
                distance *
                0.45,

            Math.sin(angle) *
                distance
        );

        const baseScale =
            randomBetween(
                24,
                52
            );

        sprite.scale.set(
            baseScale *
                randomBetween(
                    1.1,
                    1.65
                ),

            baseScale *
                randomBetween(
                    0.72,
                    1.15
                ),

            1
        );

        sprite.material.rotation =
            randomBetween(
                0,
                Math.PI * 2
            );

        sprite.userData = {
            baseOpacity:
                material.opacity,

            baseScaleX:
                sprite.scale.x,

            baseScaleY:
                sprite.scale.y,

            driftSpeed:
                randomBetween(
                    0.03,
                    0.08
                ),

            phase:
                randomBetween(
                    0,
                    Math.PI * 2
                ),

            rotationSpeed:
                randomBetween(
                    -0.006,
                    0.006
                )
        };

        nebulaGroup.add(
            sprite
        );
    }

    nebulaGroup.rotation.x =
        0.06;

    scene.add(
        nebulaGroup
    );
}


/* ---------------------------------------------------------
   DESTELLOS AMBIENTALES
--------------------------------------------------------- */

/**
 * Agrega luces pequeñas en puntos concretos.
 */
function createAmbientGlows() {
    glowGroup =
        new THREE.Group();

    glowGroup.name =
        "GlowGroup";

    const glowTexture =
        createGlowTexture();

    const glowData = [
        {
            position: [-18, 12, -28],
            scale: 7,
            color: 0x89aaff,
            opacity: 0.28
        },
        {
            position: [24, -9, -42],
            scale: 10,
            color: 0xf09bd2,
            opacity: 0.2
        },
        {
            position: [8, 18, -58],
            scale: 8,
            color: 0xc4a0ff,
            opacity: 0.18
        },
        {
            position: [-27, -15, -54],
            scale: 9,
            color: 0x7898ff,
            opacity: 0.16
        }
    ];

    glowData.forEach(
        (
            glowInformation,
            index
        ) => {
            const material =
                new THREE.SpriteMaterial({
                    map: glowTexture,
                    color:
                        glowInformation.color,

                    transparent: true,
                    opacity:
                        glowInformation.opacity,

                    depthWrite: false,
                    blending:
                        THREE.AdditiveBlending
                });

            const sprite =
                new THREE.Sprite(
                    material
                );

            sprite.position.set(
                glowInformation.position[0],
                glowInformation.position[1],
                glowInformation.position[2]
            );

            sprite.scale.setScalar(
                glowInformation.scale
            );

            sprite.userData = {
                baseOpacity:
                    glowInformation.opacity,

                phase:
                    index * 1.7,

                pulseSpeed:
                    randomBetween(
                        0.35,
                        0.7
                    )
            };

            glowGroup.add(
                sprite
            );
        }
    );

    scene.add(
        glowGroup
    );
}


/* ---------------------------------------------------------
   EVENTOS
--------------------------------------------------------- */

/**
 * Registra eventos de pantalla y controles.
 */
function createEventListeners() {
    window.addEventListener(
        "resize",
        handleResize,
        { passive: true }
    );

    window.addEventListener(
        "orientationchange",
        handleOrientationChange,
        { passive: true }
    );

    window.addEventListener(
        "pointermove",
        handlePointerMove,
        { passive: true }
    );

    window.addEventListener(
        "touchmove",
        handleTouchMove,
        { passive: true }
    );

    startButton.addEventListener(
        "click",
        handleStartButtonClick
    );

    document.addEventListener(
        "visibilitychange",
        handleVisibilityChange
    );

    window.addEventListener(
        "beforeunload",
        cleanUp
    );
}


/**
 * Controla correctamente el botón.
 */
function handleStartButtonClick(
    event
) {
    event.preventDefault();
    event.stopPropagation();

    enterUniverse();
}


/**
 * Guarda la posición del mouse.
 */
function handlePointerMove(
    event
) {
    pointer.x =
        (
            event.clientX /
            window.innerWidth
        ) *
        2 -
        1;

    pointer.y =
        -(
            (
                event.clientY /
                window.innerHeight
            ) *
            2 -
            1
        );
}


/**
 * Guarda la posición del dedo.
 */
function handleTouchMove(
    event
) {
    const firstTouch =
        event.touches?.[0];

    if (!firstTouch) {
        return;
    }

    pointer.x =
        (
            firstTouch.clientX /
            window.innerWidth
        ) *
        2 -
        1;

    pointer.y =
        -(
            (
                firstTouch.clientY /
                window.innerHeight
            ) *
            2 -
            1
        );
}


/**
 * Adapta el universo a la pantalla.
 */
function handleResize() {
    if (!camera || !renderer) {
        return;
    }

    const width =
        Math.max(
            window.innerWidth,
            1
        );

    const height =
        Math.max(
            window.innerHeight,
            1
        );

    camera.aspect =
        width /
        height;

    camera.updateProjectionMatrix();

    renderer.setPixelRatio(
        Math.min(
            window.devicePixelRatio || 1,
            isSmallScreen ? 1.7 : 2
        )
    );

    renderer.setSize(
        width,
        height,
        false
    );
}


/**
 * Espera a que el teléfono termine de girar.
 */
function handleOrientationChange() {
    window.setTimeout(
        handleResize,
        180
    );
}


/**
 * Detiene temporalmente la animación en segundo plano.
 */
function handleVisibilityChange() {
    isPageVisible =
        !document.hidden;

    if (
        isPageVisible &&
        clock
    ) {
        clock.getDelta();
    }
}


/* ---------------------------------------------------------
   ENTRADA AL UNIVERSO
--------------------------------------------------------- */

/**
 * Oculta la introducción.
 *
 * Esta función incluye la corrección de la etapa anterior.
 */
function enterUniverse() {
    if (
        !isUniverseReady ||
        hasEntered
    ) {
        return;
    }

    hasEntered = true;

    startButton.disabled = true;

    document.body.classList.add(
        "has-entered"
    );

    intro.style.opacity = "0";
    intro.style.visibility = "hidden";
    intro.style.pointerEvents = "none";

    updateStatus(
        "Has entrado al universo."
    );

    window.setTimeout(
        () => {
            intro.setAttribute(
                "aria-hidden",
                "true"
            );

            intro.style.display =
                "none";
        },
        1300
    );
}


/* ---------------------------------------------------------
   ANIMACIÓN PRINCIPAL
--------------------------------------------------------- */

/**
 * Inicia la animación.
 */
function startAnimation() {
    if (
        animationFrameId !== null
    ) {
        return;
    }

    animate();
}


/**
 * Bucle principal de renderizado.
 */
function animate() {
    animationFrameId =
        window.requestAnimationFrame(
            animate
        );

    if (
        !isPageVisible ||
        !renderer ||
        !scene ||
        !camera
    ) {
        return;
    }

    const elapsedTime =
        clock
            ? clock.getElapsedTime()
            : 0;

    updatePointerSmoothing();

    animateStars(
        elapsedTime
    );

    animateNebulas(
        elapsedTime
    );

    animateAmbientGlows(
        elapsedTime
    );

    animateCamera(
        elapsedTime
    );

    renderer.render(
        scene,
        camera
    );
}


/**
 * Suaviza el movimiento del mouse y del dedo.
 */
function updatePointerSmoothing() {
    const smoothing =
        prefersReducedMotion
            ? 0.018
            : 0.045;

    smoothPointer.x +=
        (
            pointer.x -
            smoothPointer.x
        ) *
        smoothing;

    smoothPointer.y +=
        (
            pointer.y -
            smoothPointer.y
        ) *
        smoothing;
}


/**
 * Anima las distintas capas de estrellas.
 */
function animateStars(
    elapsedTime
) {
    if (
        !mainStars ||
        !distantStars ||
        !coloredStars ||
        !closeStars
    ) {
        return;
    }

    const motionMultiplier =
        prefersReducedMotion
            ? 0.18
            : 1;

    mainStars.rotation.y +=
        0.0002 *
        motionMultiplier;

    mainStars.rotation.x =
        0.08 +
        smoothPointer.y *
        0.018 *
        motionMultiplier;

    distantStars.rotation.y -=
        0.000075 *
        motionMultiplier;

    distantStars.rotation.z =
        Math.sin(
            elapsedTime *
            0.05
        ) *
        0.017 *
        motionMultiplier;

    coloredStars.rotation.y +=
        0.000145 *
        motionMultiplier;

    coloredStars.rotation.z =
        0.03 +
        Math.cos(
            elapsedTime *
            0.08
        ) *
        0.012 *
        motionMultiplier;

    closeStars.rotation.y -=
        0.00012 *
        motionMultiplier;

    closeStars.rotation.x =
        smoothPointer.y *
        0.012 *
        motionMultiplier;

    closeStars.position.x =
        smoothPointer.x *
        -0.55 *
        motionMultiplier;

    closeStars.position.y =
        smoothPointer.y *
        -0.35 *
        motionMultiplier;

    animateStarOpacity(
        elapsedTime,
        motionMultiplier
    );
}


/**
 * Produce un parpadeo muy suave.
 */
function animateStarOpacity(
    elapsedTime,
    motionMultiplier
) {
    const starLayers = [
        {
            object: mainStars,
            speed: 0.65,
            amount: 0.032
        },
        {
            object: coloredStars,
            speed: 1.12,
            amount: 0.07
        },
        {
            object: closeStars,
            speed: 0.86,
            amount: 0.055
        }
    ];

    starLayers.forEach(
        (
            layer,
            index
        ) => {
            if (
                !layer.object?.material
            ) {
                return;
            }

            const baseOpacity =
                layer.object.userData
                    .baseOpacity ??
                layer.object.material
                    .opacity;

            layer.object.material.opacity =
                baseOpacity +
                Math.sin(
                    elapsedTime *
                    layer.speed +
                    index
                ) *
                layer.amount *
                motionMultiplier;
        }
    );
}


/**
 * Mueve y transforma las nebulosas lentamente.
 */
function animateNebulas(
    elapsedTime
) {
    if (!nebulaGroup) {
        return;
    }

    const motionMultiplier =
        prefersReducedMotion
            ? 0.12
            : 1;

    nebulaGroup.rotation.y +=
        0.000045 *
        motionMultiplier;

    nebulaGroup.rotation.x =
        0.06 +
        Math.sin(
            elapsedTime *
            0.035
        ) *
        0.008 *
        motionMultiplier;

    nebulaGroup.children.forEach(
        (
            nebula,
            index
        ) => {
            const data =
                nebula.userData;

            const pulse =
                Math.sin(
                    elapsedTime *
                    data.driftSpeed +
                    data.phase
                );

            nebula.material.opacity =
                data.baseOpacity +
                pulse *
                0.025 *
                motionMultiplier;

            nebula.scale.x =
                data.baseScaleX *
                (
                    1 +
                    pulse *
                    0.025 *
                    motionMultiplier
                );

            nebula.scale.y =
                data.baseScaleY *
                (
                    1 -
                    pulse *
                    0.018 *
                    motionMultiplier
                );

            nebula.material.rotation +=
                data.rotationSpeed *
                0.01 *
                motionMultiplier;

            nebula.position.y +=
                Math.sin(
                    elapsedTime *
                    0.06 +
                    index
                ) *
                0.0005 *
                motionMultiplier;
        }
    );
}


/**
 * Hace respirar los destellos.
 */
function animateAmbientGlows(
    elapsedTime
) {
    if (!glowGroup) {
        return;
    }

    const motionMultiplier =
        prefersReducedMotion
            ? 0.16
            : 1;

    glowGroup.rotation.y =
        smoothPointer.x *
        0.012 *
        motionMultiplier;

    glowGroup.rotation.x =
        smoothPointer.y *
        0.008 *
        motionMultiplier;

    glowGroup.children.forEach(
        (
            glow,
            index
        ) => {
            const data =
                glow.userData;

            const pulse =
                Math.sin(
                    elapsedTime *
                    data.pulseSpeed +
                    data.phase +
                    index
                );

            glow.material.opacity =
                data.baseOpacity +
                pulse *
                0.045 *
                motionMultiplier;

            const scalePulse =
                1 +
                pulse *
                0.035 *
                motionMultiplier;

            glow.scale.multiplyScalar(
                scalePulse
            );

            glow.scale.divideScalar(
                scalePulse
            );
        }
    );
}


/**
 * Mueve la cámara.
 */
function animateCamera(
    elapsedTime
) {
    const motionMultiplier =
        prefersReducedMotion
            ? 0.15
            : 1;

    const interactionStrength =
        hasEntered
            ? 1
            : 0.48;

    const targetX =
        smoothPointer.x *
        0.62 *
        motionMultiplier *
        interactionStrength;

    const targetY =
        smoothPointer.y *
        0.38 *
        motionMultiplier *
        interactionStrength;

    camera.position.x +=
        (
            targetX -
            camera.position.x
        ) *
        0.022;

    camera.position.y +=
        (
            targetY -
            camera.position.y
        ) *
        0.022;

    const baseCameraZ =
        hasEntered
            ? 17.25
            : 18;

    camera.position.z =
        baseCameraZ +
        Math.sin(
            elapsedTime *
            0.15
        ) *
        0.32 *
        motionMultiplier;

    camera.lookAt(
        smoothPointer.x *
            0.13 *
            interactionStrength,

        smoothPointer.y *
            0.09 *
            interactionStrength,

        0
    );
}


/* ---------------------------------------------------------
   CARGA COMPLETADA
--------------------------------------------------------- */

/**
 * Muestra el universo.
 */
function revealUniverse() {
    isUniverseReady = true;

    document.body.classList.add(
        "is-ready"
    );

    startButton.disabled = false;

    updateLoaderText(
        "Universo listo"
    );

    updateStatus(
        "El universo está listo. Puedes entrar."
    );

    window.setTimeout(
        () => {
            loader.classList.add(
                "is-hidden"
            );
        },
        320
    );
}


/* ---------------------------------------------------------
   MANEJO DE ERRORES
--------------------------------------------------------- */

/**
 * Muestra cualquier error importante.
 */
function handleFatalError(
    error
) {
    console.error(
        "Error al iniciar el universo:",
        error
    );

    const message =
        error instanceof Error
            ? error.message
            : "Ocurrió un error desconocido.";

    errorMessage.textContent =
        message;

    errorPanel.hidden =
        false;

    updateLoaderText(
        "No se pudo completar la carga"
    );

    updateStatus(
        `Error: ${message}`
    );

    startButton.disabled =
        true;
}


/* ---------------------------------------------------------
   FUNCIONES AUXILIARES
--------------------------------------------------------- */

/**
 * Actualiza el texto del cargador.
 */
function updateLoaderText(
    message
) {
    if (loaderText) {
        loaderText.textContent =
            message;
    }
}


/**
 * Actualiza el estado accesible.
 */
function updateStatus(
    message
) {
    if (statusElement) {
        statusElement.textContent =
            message;
    }
}


/**
 * Genera un número aleatorio.
 */
function randomBetween(
    minimum,
    maximum
) {
    return (
        minimum +
        Math.random() *
        (
            maximum -
            minimum
        )
    );
}


/**
 * Espera una cantidad de milisegundos.
 */
function wait(
    milliseconds
) {
    return new Promise(
        (resolve) => {
            window.setTimeout(
                resolve,
                milliseconds
            );
        }
    );
}


/* ---------------------------------------------------------
   LIMPIEZA DE MEMORIA
--------------------------------------------------------- */

/**
 * Libera los recursos al cerrar.
 */
function cleanUp() {
    if (
        animationFrameId !== null
    ) {
        window.cancelAnimationFrame(
            animationFrameId
        );

        animationFrameId =
            null;
    }

    disposePoints(
        mainStars
    );

    disposePoints(
        distantStars
    );

    disposePoints(
        coloredStars
    );

    disposePoints(
        closeStars
    );

    disposeSpriteGroup(
        nebulaGroup
    );

    disposeSpriteGroup(
        glowGroup
    );

    renderer?.dispose();
}


/**
 * Libera una capa de estrellas.
 */
function disposePoints(
    points
) {
    if (!points) {
        return;
    }

    points.geometry?.dispose();

    if (
        points.material?.map
    ) {
        points.material.map.dispose();
    }

    points.material?.dispose();
}


/**
 * Libera un grupo de sprites.
 */
function disposeSpriteGroup(
    group
) {
    if (!group) {
        return;
    }

    group.children.forEach(
        (sprite) => {
            sprite.material?.map?.dispose();
            sprite.material?.dispose();
        }
    );
}
