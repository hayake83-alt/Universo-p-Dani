import * as THREE from "https://unpkg.com/three@0.166.1/build/three.module.js";


/* =========================================================
   UNIVERSO PARA DANI
   ETAPA 7: TRES CONSTELACIONES Y RECUERDOS
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
const constellationMessage =
    document.getElementById(
        "constellationMessage"
    );

const constellationMessageText =
    document.getElementById(
        "constellationMessageText"
    );

const closeConstellationMessage =
    document.getElementById(
        "closeConstellationMessage"
    );

const constellationHint =
    document.getElementById(
        "constellationHint"
    );

const constellationNavigation =
    document.getElementById(
        "constellationNavigation"
    );

const previousConstellationButton =
    document.getElementById(
        "previousConstellation"
    );

const nextConstellationButton =
    document.getElementById(
        "nextConstellation"
    );

const constellationNameElement =
    document.getElementById(
        "constellationName"
    );

const constellationCounterElement =
    document.getElementById(
        "constellationCounter"
    );

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

let planetSystem;
let planet;
let planetClouds;
let atmosphere;
let outerGlow;

let moonPivot;
let moon;
let moonGlow;
let moonOrbitLine;
let constellationContainer;
let constellationGroups = [];

let activeConstellationIndex = 0;
let activeConstellationGroup = null;
let activeConstellationStars = [];
let activeConstellationLines = null;

let isConstellationVisible = false;
let isConstellationMessageOpen = false;
let isChangingConstellation = false;
let hoveredConstellationStar = null;

const raycaster = new THREE.Raycaster();
const constellationPointer =
    new THREE.Vector2();

let keyLight;
let fillLight;
let ambientLight;

let animationFrameId = null;

let isUniverseReady = false;
let hasEntered = false;
let isPageVisible = true;


/* ---------------------------------------------------------
   RECORRIDO CINEMATOGRÁFICO
--------------------------------------------------------- */

let journeyStartTime = null;
let journeyProgress = 0;
let currentJourneyStage = 0;

const cameraTarget = new THREE.Vector3();
const desiredCameraPosition = new THREE.Vector3();
const desiredLookTarget = new THREE.Vector3();


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

const CAMERA_JOURNEY = {
    stageOneEnd: 0.28,
    stageTwoEnd: 0.58,
    stageThreeEnd: 0.82,
    journeyDuration: prefersReducedMotion ? 20 : 32
};
const CONSTELLATION_CONFIG = {
    position: isSmallScreen
        ? new THREE.Vector3(
            -3.8,
            0.4,
            -24
        )
        : new THREE.Vector3(
            -5.5,
            0.5,
            -28
        ),

    scale: isSmallScreen
        ? 0.82
        : 1,

    revealStart: 0.78
};

const CONSTELLATION_DATA = [
    {
        name: "Encuentro",
        color: 0xaec4ff,
        glowColor: 0x9fbbff,
        points: [
            [-3.4, 1.1, 0], [-2.1, 2.3, 0.15], [-0.7, 1.55, -0.1],
            [0.45, 2.65, 0.1], [1.85, 1.75, 0], [3.25, 2.35, -0.15],
            [2.55, 0.55, 0.1], [1.15, -0.4, 0], [-0.3, 0.25, 0.12],
            [-1.8, -0.55, -0.1], [-2.85, -1.85, 0],
            [-0.55, -2.05, 0.1], [1.65, -1.75, -0.1], [3.15, -0.95, 0]
        ],
        connections: [
            [0,1],[1,2],[2,3],[3,4],[4,5],[4,6],[6,7],[7,8],
            [8,2],[8,9],[9,10],[9,11],[11,12],[12,13],[13,6]
        ],
        messages: [
            "Entre todas las posibilidades del universo, mi favorita siempre será haberte encontrado.",
            "No sé cuántos caminos pudieron alejarnos, pero agradezco el que terminó llevándome hasta ti.",
            "Hay encuentros que parecen casualidad y otros que se sienten escritos desde antes de conocerse.",
            "Desde que llegaste, algunas canciones, algunos lugares y algunas noches llevan tu nombre.",
            "Encontrarte fue descubrir que incluso lo improbable puede convertirse en algo hermoso."
        ]
    },
    {
        name: "Refugio",
        color: 0xe0b1ff,
        glowColor: 0xd59cff,
        points: [
            [-3.5,0.2,0],[-2.8,1.7,0.1],[-1.45,2.45,-0.1],[0,1.6,0.12],
            [1.45,2.45,-0.1],[2.8,1.7,0.1],[3.5,0.2,0],[2.35,-1.15,0.1],
            [1.1,-2.2,-0.12],[0,-1.15,0.15],[-1.1,-2.2,-0.12],[-2.35,-1.15,0.1]
        ],
        connections: [
            [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],
            [7,8],[8,9],[9,10],[10,11],[11,0],[3,9]
        ],
        messages: [
            "Hay lugares que se sienten como hogar. Para mí, uno de ellos siempre será estar cerca de ti.",
            "Tu presencia tiene una forma hermosa de hacer que todo parezca un poco menos difícil.",
            "No siempre necesito respuestas. A veces me basta con saber que estás ahí.",
            "Mi refugio tiene tu voz, tus brazos y la calma de compartir la vida contigo.",
            "Hay días en los que el mundo pesa menos simplemente porque puedo pensarte."
        ]
    },
    {
        name: "Cielo",
        color: 0xffb5d9,
        glowColor: 0xf29ccc,
        points: [
            [-3.7,1.8,0],[-2.3,0.9,0.1],[-1.15,2.2,-0.1],[0,0.8,0.12],
            [1.15,2.2,-0.1],[2.3,0.9,0.1],[3.7,1.8,0],[2.75,-0.25,0.12],
            [1.6,-1.7,-0.08],[0,-0.7,0.15],[-1.6,-1.7,-0.08],
            [-2.75,-0.25,0.12],[0,-2.45,0]
        ],
        connections: [
            [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],
            [7,8],[8,9],[9,10],[10,11],[11,0],[3,9],[9,12]
        ],
        messages: [
            "Si el cielo pudiera llevar un nombre, algunas noches estoy seguro de que llevaría el tuyo.",
            "Entre millones de luces, seguiría reconociendo la forma en la que tú iluminas mi vida.",
            "No necesito poseer el cielo. Me basta con compartir contigo el mismo universo.",
            "Amarte se parece a mirar las estrellas: algo inmenso y, al mismo tiempo, profundamente cercano.",
            "En cualquier versión del universo, quisiera volver a elegirte."
        ]
    }
];
/* ---------------------------------------------------------
   CONFIGURACIÓN
--------------------------------------------------------- */

const STAR_CONFIG = {
    mainCount: isSmallScreen ? 1350 : 2500,
    distantCount: isSmallScreen ? 800 : 1500,
    coloredCount: isSmallScreen ? 170 : 340,
    closeCount: isSmallScreen ? 110 : 220,

    mainSpread: 115,
    distantSpread: 175,
    coloredSpread: 100,
    closeSpread: 70
};

const NEBULA_CONFIG = {
    count: isVerySmallScreen
        ? 4
        : isSmallScreen
            ? 6
            : 9
};

const PLANET_CONFIG = {
    radius: isSmallScreen ? 3.2 : 4.05,

    position: isSmallScreen
        ? new THREE.Vector3(3.55, -1.15, -16.5)
        : new THREE.Vector3(5.85, -1.05, -18.5),

    moonDistance: isSmallScreen ? 6.05 : 7.55,
    moonRadius: isSmallScreen ? 0.6 : 0.76
};

/* ---------------------------------------------------------
   INICIO
--------------------------------------------------------- */

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initializeUniverse,
        { once: true }
    );
} else {
    initializeUniverse();
}


/**
 * Inicializa toda la experiencia.
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
        createLights();

        updateLoaderText("Creando estrellas…");

        createStarFields();

        updateLoaderText("Formando nebulosas…");

        createNebulas();
        createAmbientGlows();

       updateLoaderText("Creando un nuevo mundo…");

createPlanetSystem();

updateLoaderText("Uniendo estrellas…");

createConstellation();

createEventListeners();
        handleResize();

        clock = new THREE.Clock();

        startAnimation();

        await wait(900);

        revealUniverse();

    } catch (error) {
        handleFatalError(error);
    }
}


/* ---------------------------------------------------------
   COMPROBACIONES
--------------------------------------------------------- */

function validateRequiredElements() {
    const requiredElements = [
    canvas,
    intro,
    startButton,
    loader,
    loaderText,
    statusElement,
    errorPanel,
    errorMessage,
    constellationMessage,
    constellationMessageText,
    closeConstellationMessage,
    constellationHint
];

    const missingElement = requiredElements.some(
        (element) => !element
    );

    if (missingElement) {
        throw new Error(
            "Falta uno o más elementos necesarios en index.html."
        );
    }
}


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

function createScene() {
    scene = new THREE.Scene();

    scene.background = new THREE.Color(
        0x02030a
    );

    scene.fog = new THREE.FogExp2(
        0x02030a,
        0.0065
    );
}


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
            isSmallScreen ? 1.6 : 2
        )
    );

    renderer.setSize(
        window.innerWidth,
        window.innerHeight,
        false
    );

    renderer.outputColorSpace =
        THREE.SRGBColorSpace;

    renderer.toneMapping =
        THREE.ACESFilmicToneMapping;

    renderer.toneMappingExposure =
        1.08;

    renderer.setClearColor(
        0x02030a,
        1
    );
}


/* ---------------------------------------------------------
   LUCES
--------------------------------------------------------- */

function createLights() {
    ambientLight =
        new THREE.AmbientLight(
            0x7180b8,
            0.58
        );

    keyLight =
        new THREE.DirectionalLight(
            0xbfd4ff,
            2.7
        );

    keyLight.position.set(
        -10,
        8,
        14
    );

    fillLight =
        new THREE.PointLight(
            0xea79cc,
            32,
            90,
            2
        );

    fillLight.position.set(
        18,
        -10,
        5
    );

    scene.add(
        ambientLight,
        keyLight,
        fillLight
    );
}


/* ---------------------------------------------------------
   TEXTURAS GENERADAS CON CANVAS
--------------------------------------------------------- */

function createStarTexture() {
    const textureCanvas =
        document.createElement("canvas");

    textureCanvas.width = 128;
    textureCanvas.height = 128;

    const context =
        textureCanvas.getContext("2d");

    if (!context) {
        throw new Error(
            "No se pudo crear la textura de las estrellas."
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
        0.24,
        "rgba(180,210,255,0.72)"
    );

    gradient.addColorStop(
        0.5,
        "rgba(110,150,255,0.2)"
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

    return texture;
}


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
            "No se pudo crear la textura de la nebulosa."
        );
    }

    const gradient =
        context.createRadialGradient(
            256,
            256,
            0,
            256,
            256,
            255
        );

    gradient.addColorStop(
        0,
        innerColor
    );

    gradient.addColorStop(
        0.25,
        middleColor
    );

    gradient.addColorStop(
        0.65,
        outerColor
    );

    gradient.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );

    context.fillStyle = gradient;

    context.fillRect(
        0,
        0,
        512,
        512
    );

    for (
        let index = 0;
        index < 18;
        index += 1
    ) {
        const x =
            randomBetween(
                90,
                422
            );

        const y =
            randomBetween(
                90,
                422
            );

        const radius =
            randomBetween(
                35,
                120
            );

        const cloud =
            context.createRadialGradient(
                x,
                y,
                0,
                x,
                y,
                radius
            );

        const opacity =
            randomBetween(
                0.025,
                0.09
            );

        cloud.addColorStop(
            0,
            `rgba(255,255,255,${opacity})`
        );

        cloud.addColorStop(
            0.5,
            `rgba(170,190,255,${opacity * 0.35})`
        );

        cloud.addColorStop(
            1,
            "rgba(0,0,0,0)"
        );

        context.fillStyle = cloud;

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

    const texture =
        new THREE.CanvasTexture(
            textureCanvas
        );

    texture.colorSpace =
        THREE.SRGBColorSpace;

    return texture;
}


function createGlowTexture() {
    const textureCanvas =
        document.createElement("canvas");

    textureCanvas.width = 256;
    textureCanvas.height = 256;

    const context =
        textureCanvas.getContext("2d");

    if (!context) {
        throw new Error(
            "No se pudo crear el brillo."
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
        "rgba(255,255,255,0.9)"
    );

    gradient.addColorStop(
        0.14,
        "rgba(180,205,255,0.5)"
    );

    gradient.addColorStop(
        0.45,
        "rgba(105,120,255,0.12)"
    );

    gradient.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );

    context.fillStyle = gradient;

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


/**
 * Genera la textura del planeta.
 */
function createPlanetTexture() {
    const textureCanvas =
        document.createElement("canvas");

    textureCanvas.width = 1024;
    textureCanvas.height = 512;

    const context =
        textureCanvas.getContext("2d");

    if (!context) {
        throw new Error(
            "No se pudo crear la textura del planeta."
        );
    }

    const background =
        context.createLinearGradient(
            0,
            0,
            1024,
            512
        );

    background.addColorStop(
        0,
        "#101b4d"
    );

    background.addColorStop(
        0.3,
        "#263c86"
    );

    background.addColorStop(
        0.58,
        "#422b73"
    );

    background.addColorStop(
        0.82,
        "#7a315f"
    );

    background.addColorStop(
        1,
        "#24154e"
    );

    context.fillStyle = background;

    context.fillRect(
        0,
        0,
        1024,
        512
    );

    drawPlanetBands(context);
    drawPlanetCloudDetails(context);
    drawPlanetHighlights(context);

    const texture =
        new THREE.CanvasTexture(
            textureCanvas
        );

    texture.colorSpace =
        THREE.SRGBColorSpace;

    texture.wrapS =
        THREE.RepeatWrapping;

    texture.wrapT =
        THREE.ClampToEdgeWrapping;

    texture.anisotropy =
        Math.min(
            renderer.capabilities.getMaxAnisotropy(),
            8
        );

    return texture;
}


function drawPlanetBands(context) {
    const colors = [
        "rgba(119,164,255,0.22)",
        "rgba(158,109,215,0.16)",
        "rgba(255,125,192,0.14)",
        "rgba(64,92,180,0.2)",
        "rgba(225,177,255,0.12)"
    ];

    for (
        let index = 0;
        index < 42;
        index += 1
    ) {
        const y =
            randomBetween(
                10,
                502
            );

        const height =
            randomBetween(
                8,
                38
            );

        const wave =
            randomBetween(
                10,
                45
            );

        context.beginPath();

        context.moveTo(
            0,
            y
        );

        for (
            let x = 0;
            x <= 1024;
            x += 32
        ) {
            context.lineTo(
                x,
                y +
                Math.sin(
                    x * 0.012 +
                    index
                ) *
                wave
            );
        }

        context.lineTo(
            1024,
            y + height
        );

        context.lineTo(
            0,
            y + height
        );

        context.closePath();

        context.fillStyle =
            colors[
                index %
                colors.length
            ];

        context.fill();
    }
}


function drawPlanetCloudDetails(context) {
    for (
        let index = 0;
        index < 105;
        index += 1
    ) {
        const x =
            randomBetween(
                0,
                1024
            );

        const y =
            randomBetween(
                0,
                512
            );

        const width =
            randomBetween(
                35,
                170
            );

        const height =
            randomBetween(
                6,
                28
            );

        const opacity =
            randomBetween(
                0.025,
                0.11
            );

        context.fillStyle =
            `rgba(210,225,255,${opacity})`;

        context.beginPath();

        context.ellipse(
            x,
            y,
            width,
            height,
            randomBetween(
                -0.25,
                0.25
            ),
            0,
            Math.PI * 2
        );

        context.fill();
    }
}


function drawPlanetHighlights(context) {
    const glow =
        context.createRadialGradient(
            760,
            170,
            0,
            760,
            170,
            280
        );

    glow.addColorStop(
        0,
        "rgba(255,190,232,0.24)"
    );

    glow.addColorStop(
        0.5,
        "rgba(125,148,255,0.08)"
    );

    glow.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );

    context.fillStyle = glow;

    context.fillRect(
        0,
        0,
        1024,
        512
    );
}


/**
 * Genera una textura secundaria para nubes.
 */
function createPlanetCloudTexture() {
    const textureCanvas =
        document.createElement("canvas");

    textureCanvas.width = 1024;
    textureCanvas.height = 512;

    const context =
        textureCanvas.getContext("2d");

    if (!context) {
        throw new Error(
            "No se pudo crear la textura de nubes."
        );
    }

    context.clearRect(
        0,
        0,
        1024,
        512
    );

    for (
        let index = 0;
        index < 130;
        index += 1
    ) {
        const x =
            randomBetween(
                0,
                1024
            );

        const y =
            randomBetween(
                0,
                512
            );

        const width =
            randomBetween(
                45,
                180
            );

        const height =
            randomBetween(
                4,
                20
            );

        const opacity =
            randomBetween(
                0.02,
                0.11
            );

        context.fillStyle =
            `rgba(225,235,255,${opacity})`;

        context.beginPath();

        context.ellipse(
            x,
            y,
            width,
            height,
            randomBetween(
                -0.3,
                0.3
            ),
            0,
            Math.PI * 2
        );

        context.fill();
    }

    const texture =
        new THREE.CanvasTexture(
            textureCanvas
        );

    texture.colorSpace =
        THREE.SRGBColorSpace;

    texture.wrapS =
        THREE.RepeatWrapping;

    return texture;
}


/**
 * Genera la textura de la luna.
 */
function createMoonTexture() {
    const textureCanvas =
        document.createElement("canvas");

    textureCanvas.width = 512;
    textureCanvas.height = 256;

    const context =
        textureCanvas.getContext("2d");

    if (!context) {
        throw new Error(
            "No se pudo crear la textura de la luna."
        );
    }

    const background =
        context.createLinearGradient(
            0,
            0,
            512,
            256
        );

    background.addColorStop(
        0,
        "#6d7287"
    );

    background.addColorStop(
        0.5,
        "#bbc1d0"
    );

    background.addColorStop(
        1,
        "#555b72"
    );

    context.fillStyle = background;

    context.fillRect(
        0,
        0,
        512,
        256
    );

    for (
        let index = 0;
        index < 90;
        index += 1
    ) {
        const x =
            randomBetween(
                0,
                512
            );

        const y =
            randomBetween(
                0,
                256
            );

        const radius =
            randomBetween(
                3,
                20
            );

        const opacity =
            randomBetween(
                0.04,
                0.19
            );

        context.fillStyle =
            `rgba(40,45,65,${opacity})`;

        context.beginPath();

        context.arc(
            x,
            y,
            radius,
            0,
            Math.PI * 2
        );

        context.fill();

        context.strokeStyle =
            `rgba(235,240,255,${opacity * 0.55})`;

        context.lineWidth =
            randomBetween(
                0.5,
                2
            );

        context.stroke();
    }

    const texture =
        new THREE.CanvasTexture(
            textureCanvas
        );

    texture.colorSpace =
        THREE.SRGBColorSpace;

    texture.wrapS =
        THREE.RepeatWrapping;

    return texture;
}


/* ---------------------------------------------------------
   ESTRELLAS
--------------------------------------------------------- */

function createStarFields() {
    const starTexture =
        createStarTexture();

    mainStars = createStars({
        count: STAR_CONFIG.mainCount,
        spread: STAR_CONFIG.mainSpread,
        size: isSmallScreen ? 0.48 : 0.4,
        opacity: 0.88,
        colorMode: "white",
        texture: starTexture
    });

    distantStars = createStars({
        count: STAR_CONFIG.distantCount,
        spread: STAR_CONFIG.distantSpread,
        size: isSmallScreen ? 0.24 : 0.19,
        opacity: 0.42,
        colorMode: "soft",
        texture: starTexture
    });

    coloredStars = createStars({
        count: STAR_CONFIG.coloredCount,
        spread: STAR_CONFIG.coloredSpread,
        size: isSmallScreen ? 0.67 : 0.55,
        opacity: 0.72,
        colorMode: "colored",
        texture: starTexture
    });

    closeStars = createStars({
        count: STAR_CONFIG.closeCount,
        spread: STAR_CONFIG.closeSpread,
        size: isSmallScreen ? 0.84 : 0.7,
        opacity: 0.68,
        colorMode: "bright",
        texture: starTexture,
        minimumRadius: 20
    });

    mainStars.rotation.x = 0.08;
    distantStars.rotation.x = -0.05;
    coloredStars.rotation.z = 0.03;
    closeStars.rotation.y = -0.08;

    scene.add(
        mainStars,
        distantStars,
        coloredStars,
        closeStars
    );
}


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

    const color =
        new THREE.Color();

    for (
        let index = 0;
        index < count;
        index += 1
    ) {
        const offset =
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

        positions[offset] =
            radius *
            Math.sin(phi) *
            Math.cos(theta);

        positions[offset + 1] =
            radius *
            Math.sin(phi) *
            Math.sin(theta);

        positions[offset + 2] =
            radius *
            Math.cos(phi);

        setStarColor(
            color,
            colorMode
        );

        colors[offset] =
            color.r;

        colors[offset + 1] =
            color.g;

        colors[offset + 2] =
            color.b;
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

    return points;
}


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

function createNebulas() {
    nebulaGroup =
        new THREE.Group();

    const blueTexture =
        createNebulaTexture({
            innerColor:
                "rgba(120,155,255,0.58)",

            middleColor:
                "rgba(52,79,194,0.25)",

            outerColor:
                "rgba(20,30,90,0.03)"
        });

    const violetTexture =
        createNebulaTexture({
            innerColor:
                "rgba(189,131,255,0.48)",

            middleColor:
                "rgba(103,47,167,0.21)",

            outerColor:
                "rgba(46,20,80,0.03)"
        });

    const pinkTexture =
        createNebulaTexture({
            innerColor:
                "rgba(255,137,204,0.42)",

            middleColor:
                "rgba(163,54,128,0.18)",

            outerColor:
                "rgba(72,20,58,0.025)"
        });

    const textures = [
        blueTexture,
        violetTexture,
        pinkTexture
    ];

    for (
        let index = 0;
        index < NEBULA_CONFIG.count;
        index += 1
    ) {
        const material =
            new THREE.SpriteMaterial({
                map:
                    textures[
                        index %
                        textures.length
                    ],

                transparent: true,

                opacity:
                    randomBetween(
                        0.09,
                        0.21
                    ),

                depthWrite: false,

                blending:
                    THREE.AdditiveBlending
            });

        const sprite =
            new THREE.Sprite(
                material
            );

        const distance =
            randomBetween(
                48,
                105
            );

        const angle =
            randomBetween(
                0,
                Math.PI * 2
            );

        sprite.position.set(
            Math.cos(angle) *
                distance,

            randomBetween(
                -30,
                30
            ),

            Math.sin(angle) *
                distance
        );

        const baseScale =
            randomBetween(
                25,
                50
            );

        sprite.scale.set(
            baseScale *
                randomBetween(
                    1.1,
                    1.6
                ),

            baseScale *
                randomBetween(
                    0.72,
                    1.1
                ),

            1
        );

        sprite.userData = {
            baseOpacity:
                material.opacity,

            baseScaleX:
                sprite.scale.x,

            baseScaleY:
                sprite.scale.y,

            speed:
                randomBetween(
                    0.03,
                    0.08
                ),

            phase:
                randomBetween(
                    0,
                    Math.PI * 2
                )
        };

        nebulaGroup.add(
            sprite
        );
    }

    scene.add(
        nebulaGroup
    );
}


/* ---------------------------------------------------------
   DESTELLOS AMBIENTALES
--------------------------------------------------------- */

function createAmbientGlows() {
    glowGroup =
        new THREE.Group();

    const glowTexture =
        createGlowTexture();

    const glowData = [
        {
            position: [-18, 12, -28],
            scale: 7,
            color: 0x89aaff,
            opacity: 0.25
        },
        {
            position: [24, -9, -42],
            scale: 10,
            color: 0xf09bd2,
            opacity: 0.18
        },
        {
            position: [8, 18, -58],
            scale: 8,
            color: 0xc4a0ff,
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
                ...glowInformation.position
            );

            sprite.scale.setScalar(
                glowInformation.scale
            );

            sprite.userData = {
                baseOpacity:
                    glowInformation.opacity,

                baseScale:
                    glowInformation.scale,

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
   PLANETA PRINCIPAL
--------------------------------------------------------- */

function createPlanetSystem() {
    planetSystem =
        new THREE.Group();

    planetSystem.name =
        "PlanetSystem";

    planetSystem.position.copy(
        PLANET_CONFIG.position
    );

    createPlanet();
    createPlanetAtmosphere();
    createMoonSystem();

    planetSystem.rotation.z =
        -0.12;

    planetSystem.scale.setScalar(
        0.001
    );

    scene.add(
        planetSystem
    );
}


function createPlanet() {
    const planetTexture =
        createPlanetTexture();

    const cloudTexture =
        createPlanetCloudTexture();

    const planetGeometry =
        new THREE.SphereGeometry(
            PLANET_CONFIG.radius,
            isSmallScreen ? 48 : 72,
            isSmallScreen ? 32 : 48
        );

    const planetMaterial =
        new THREE.MeshStandardMaterial({
            map: planetTexture,

            roughness: 0.78,
            metalness: 0.04,

            emissive:
                new THREE.Color(
                    0x101329
                ),

            emissiveIntensity:
                0.18
        });

    planet =
        new THREE.Mesh(
            planetGeometry,
            planetMaterial
        );

    planet.rotation.z =
        -0.18;

    planet.userData.baseRotationZ =
        planet.rotation.z;

    planetSystem.add(
        planet
    );

    const cloudsGeometry =
        new THREE.SphereGeometry(
            PLANET_CONFIG.radius * 1.015,
            isSmallScreen ? 40 : 64,
            isSmallScreen ? 28 : 44
        );

    const cloudsMaterial =
        new THREE.MeshPhongMaterial({
            map: cloudTexture,

            transparent: true,
            opacity: 0.38,

            depthWrite: false,

            blending:
                THREE.AdditiveBlending
        });

    planetClouds =
        new THREE.Mesh(
            cloudsGeometry,
            cloudsMaterial
        );

    planetClouds.rotation.z =
        -0.16;

    planetSystem.add(
        planetClouds
    );
}


/* ---------------------------------------------------------
   ATMÓSFERA
--------------------------------------------------------- */

function createPlanetAtmosphere() {
    const atmosphereGeometry =
        new THREE.SphereGeometry(
            PLANET_CONFIG.radius * 1.065,
            isSmallScreen ? 42 : 64,
            isSmallScreen ? 30 : 48
        );

    const atmosphereMaterial =
        new THREE.MeshBasicMaterial({
            color: 0x779cff,

            transparent: true,
            opacity: 0.11,

            side: THREE.BackSide,

            depthWrite: false,

            blending:
                THREE.AdditiveBlending
        });

    atmosphere =
        new THREE.Mesh(
            atmosphereGeometry,
            atmosphereMaterial
        );

    planetSystem.add(
        atmosphere
    );

    const glowGeometry =
        new THREE.SphereGeometry(
            PLANET_CONFIG.radius * 1.14,
            isSmallScreen ? 38 : 56,
            isSmallScreen ? 26 : 40
        );

    const glowMaterial =
        new THREE.MeshBasicMaterial({
            color: 0xbc7fff,

            transparent: true,
            opacity: 0.035,

            side: THREE.BackSide,

            depthWrite: false,

            blending:
                THREE.AdditiveBlending
        });

    outerGlow =
        new THREE.Mesh(
            glowGeometry,
            glowMaterial
        );

    planetSystem.add(
        outerGlow
    );
}


/* ---------------------------------------------------------
   LUNA Y ÓRBITA
--------------------------------------------------------- */

function createMoonSystem() {
    moonPivot =
        new THREE.Group();

    moonPivot.rotation.x =
        0.32;

    moonPivot.rotation.z =
        -0.1;

    planetSystem.add(
        moonPivot
    );

    const moonGeometry =
        new THREE.SphereGeometry(
            PLANET_CONFIG.moonRadius,
            isSmallScreen ? 30 : 42,
            isSmallScreen ? 22 : 32
        );

    const moonMaterial =
        new THREE.MeshStandardMaterial({
            map:
                createMoonTexture(),

            roughness: 0.96,
            metalness: 0,

            emissive:
                new THREE.Color(
                    0x141827
                ),

            emissiveIntensity:
                0.12
        });

    moon =
        new THREE.Mesh(
            moonGeometry,
            moonMaterial
        );

    moon.position.x =
        PLANET_CONFIG.moonDistance;

    moonPivot.add(
        moon
    );

    const glowTexture =
        createGlowTexture();

    const moonGlowMaterial =
        new THREE.SpriteMaterial({
            map: glowTexture,
            color: 0xb8c8ff,

            transparent: true,
            opacity: 0.2,

            depthWrite: false,

            blending:
                THREE.AdditiveBlending
        });

    moonGlow =
        new THREE.Sprite(
            moonGlowMaterial
        );

    moonGlow.position.copy(
        moon.position
    );

    moonGlow.scale.setScalar(
        PLANET_CONFIG.moonRadius * 4.2
    );

    moonPivot.add(
        moonGlow
    );

    createMoonOrbit();
}


function createMoonOrbit() {
    const points = [];

    const segments = 160;

    for (
        let index = 0;
        index <= segments;
        index += 1
    ) {
        const angle =
            (
                index /
                segments
            ) *
            Math.PI *
            2;

        points.push(
            new THREE.Vector3(
                Math.cos(angle) *
                    PLANET_CONFIG.moonDistance,

                0,

                Math.sin(angle) *
                    PLANET_CONFIG.moonDistance
            )
        );
    }

    const geometry =
        new THREE.BufferGeometry()
            .setFromPoints(
                points
            );

    const material =
        new THREE.LineBasicMaterial({
            color: 0xb2c4ff,

            transparent: true,
            opacity: 0.13,

            depthWrite: false,

            blending:
                THREE.AdditiveBlending
        });

    moonOrbitLine =
        new THREE.LineLoop(
            geometry,
            material
        );

    moonPivot.add(
        moonOrbitLine
    );
}

/* ---------------------------------------------------------
   CONSTELACIÓN INTERACTIVA
--------------------------------------------------------- */

/**
 * Crea una constelación formada por
 * estrellas individuales y líneas.
 */
function createConstellation() {
    constellationContainer = new THREE.Group();
    constellationContainer.name = "ConstellationContainer";
    constellationContainer.position.copy(CONSTELLATION_CONFIG.position);
    constellationContainer.scale.setScalar(CONSTELLATION_CONFIG.scale);
    constellationContainer.visible = false;

    constellationGroups = CONSTELLATION_DATA.map(
        (data, constellationIndex) =>
            createConstellationGroup(data, constellationIndex)
    );

    constellationGroups.forEach((group) => {
        constellationContainer.add(group);
    });

    activeConstellationIndex = 0;
    updateActiveConstellationReferences();
    updateConstellationNavigationText();

    scene.add(constellationContainer);
}


/**
 * Crea una estrella que puede ser tocada.
 */
function createConstellationStar(
    position,
    starIndex,
    constellationIndex,
    texture,
    data
) {
    const starGroup = new THREE.Group();

    starGroup.position.set(
        position[0],
        position[1],
        position[2]
    );

    starGroup.userData = {
        constellationIndex,
        constellationStarIndex: starIndex,
        baseScale: starIndex % 4 === 0 ? 0.44 : 0.32,
        phase: starIndex * 0.72,
        isConstellationStar: true
    };

    const core = new THREE.Mesh(
        new THREE.SphereGeometry(
            starIndex % 4 === 0 ? 0.11 : 0.078,
            16,
            12
        ),
        new THREE.MeshBasicMaterial({
            color: data.color,
            transparent: true,
            opacity: 1
        })
    );

    core.userData = {
        isConstellationStar: true,
        constellationIndex,
        constellationStarIndex: starIndex
    };

    const glow = new THREE.Sprite(
        new THREE.SpriteMaterial({
            map: texture,
            color: data.glowColor,
            transparent: true,
            opacity: 0.76,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        })
    );

    const baseScale = starGroup.userData.baseScale;
    glow.scale.set(baseScale, baseScale, 1);

    glow.userData = {
        isConstellationStar: true,
        constellationIndex,
        constellationStarIndex: starIndex
    };

    starGroup.add(core, glow);
    starGroup.userData.core = core;
    starGroup.userData.glow = glow;
    starGroup.scale.setScalar(0.001);

    return starGroup;
}


/**
 * Une las estrellas mediante líneas.
 */
function createConstellationLines(
    positions,
    connections,
    lineColor
) {
    const linePoints = [];

    connections.forEach((connection) => {
        const first = positions[connection[0]];
        const second = positions[connection[1]];

        linePoints.push(
            new THREE.Vector3(first[0], first[1], first[2]),
            new THREE.Vector3(second[0], second[1], second[2])
        );
    });

    const geometry =
        new THREE.BufferGeometry().setFromPoints(linePoints);

    const material =
        new THREE.LineBasicMaterial({
            color: lineColor,
            transparent: true,
            opacity: 0,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

    return new THREE.LineSegments(geometry, material);
}

function createConstellationGroup(
    data,
    constellationIndex
) {
    const group = new THREE.Group();
    const starTexture = createGlowTexture();
    const stars = [];

    group.name = `Constellation-${constellationIndex}`;
    group.visible = constellationIndex === 0;
    group.scale.setScalar(constellationIndex === 0 ? 1 : 0.001);

    data.points.forEach((position, starIndex) => {
        const star = createConstellationStar(
            position,
            starIndex,
            constellationIndex,
            starTexture,
            data
        );

        stars.push(star);
        group.add(star);
    });

    const lines = createConstellationLines(
        data.points,
        data.connections,
        data.color
    );

    group.add(lines);

    group.userData = {
        stars,
        lines,
        opacity: constellationIndex === 0 ? 1 : 0,
        targetOpacity: constellationIndex === 0 ? 1 : 0
    };

    return group;
}


function updateActiveConstellationReferences() {
    activeConstellationGroup =
        constellationGroups[activeConstellationIndex] ?? null;

    activeConstellationStars =
        activeConstellationGroup?.userData?.stars ?? [];

    activeConstellationLines =
        activeConstellationGroup?.userData?.lines ?? null;
}


function updateConstellationNavigationText() {
    const data = CONSTELLATION_DATA[activeConstellationIndex];

    if (!data) {
        return;
    }

    constellationNameElement.textContent = data.name;
    constellationCounterElement.textContent =
        `${activeConstellationIndex + 1} / ${CONSTELLATION_DATA.length}`;
}


function showPreviousConstellation() {
    if (isChangingConstellation || isConstellationMessageOpen) {
        return;
    }

    const nextIndex =
        (activeConstellationIndex - 1 + constellationGroups.length) %
        constellationGroups.length;

    changeConstellation(nextIndex);
}


function showNextConstellation() {
    if (isChangingConstellation || isConstellationMessageOpen) {
        return;
    }

    const nextIndex =
        (activeConstellationIndex + 1) %
        constellationGroups.length;

    changeConstellation(nextIndex);
}


function changeConstellation(nextIndex) {
    if (
        nextIndex === activeConstellationIndex ||
        !constellationGroups[nextIndex]
    ) {
        return;
    }

    isChangingConstellation = true;
    clearConstellationHover();
    constellationNavigation.classList.add("is-changing");
    constellationHint.classList.remove("is-visible");

    const previousGroup = activeConstellationGroup;

    if (previousGroup) {
        previousGroup.userData.targetOpacity = 0;
    }

    window.setTimeout(() => {
        if (previousGroup) {
            previousGroup.visible = false;
            previousGroup.scale.setScalar(0.001);
        }

        activeConstellationIndex = nextIndex;
        updateActiveConstellationReferences();

        if (activeConstellationGroup) {
            activeConstellationGroup.visible = true;
            activeConstellationGroup.scale.setScalar(0.001);
            activeConstellationGroup.userData.opacity = 0;
            activeConstellationGroup.userData.targetOpacity = 1;
        }

        updateConstellationNavigationText();

        window.setTimeout(() => {
            isChangingConstellation = false;
            constellationNavigation.classList.remove("is-changing");

            if (!isConstellationMessageOpen) {
                constellationHint.classList.add("is-visible");
            }
        }, 650);
    }, 350);
}


/* ---------------------------------------------------------
   EVENTOS
--------------------------------------------------------- */

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
window.addEventListener(
    "pointerdown",
    handleConstellationPointerDown,
    { passive: true }
);

closeConstellationMessage.addEventListener(
    "click",
    closeConstellationPanel
);

previousConstellationButton.addEventListener(
    "click",
    showPreviousConstellation
);

nextConstellationButton.addEventListener(
    "click",
    showNextConstellation
);

constellationMessage.addEventListener(
    "click",
    handleConstellationBackgroundClick
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


function handleStartButtonClick(event) {
    event.preventDefault();
    event.stopPropagation();

    enterUniverse();
}


function handlePointerMove(event) {
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
   updateConstellationPointer(
    event.clientX,
    event.clientY
);

checkConstellationHover();
}


function handleTouchMove(event) {
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
 * Convierte las coordenadas de pantalla
 * a coordenadas utilizadas por Three.js.
 */
function updateConstellationPointer(
    clientX,
    clientY
) {
    constellationPointer.x =
        (
            clientX /
            window.innerWidth
        ) *
        2 -
        1;

    constellationPointer.y =
        -(
            (
                clientY /
                window.innerHeight
            ) *
            2 -
            1
        );
}


/**
 * Comprueba si el cursor está sobre
 * una estrella de la constelación.
 */
function checkConstellationHover() {
    if (
        !isConstellationVisible ||
        !activeConstellationGroup ||
        isConstellationMessageOpen ||
        isChangingConstellation
    ) {
        clearConstellationHover();
        return;
    }

    raycaster.setFromCamera(
        constellationPointer,
        camera
    );

    const intersections =
        raycaster.intersectObjects(
            activeConstellationStars,
            true
        );

    const firstIntersection =
        intersections.find(
            (intersection) =>
                intersection.object?.userData?.isConstellationStar
        );

    if (!firstIntersection) {
        clearConstellationHover();
        return;
    }

    const selectedStarIndex =
        firstIntersection.object
            .userData
            .constellationStarIndex;

    const selectedStar =
        activeConstellationStars[selectedStarIndex];

    if (hoveredConstellationStar !== selectedStar) {
        clearConstellationHover();
        hoveredConstellationStar = selectedStar;
        document.body.classList.add("constellation-hover");
    }
}


/**
 * Quita el estado de selección visual.
 */
function clearConstellationHover() {
    hoveredConstellationStar = null;

    document.body.classList.remove(
        "constellation-hover"
    );
}


/**
 * Detecta el toque o clic sobre una estrella.
 */
function handleConstellationPointerDown(
    event
) {
    if (
        !isConstellationVisible ||
        isConstellationMessageOpen ||
        isChangingConstellation
    ) {
        return;
    }

    updateConstellationPointer(
        event.clientX,
        event.clientY
    );

    raycaster.setFromCamera(
        constellationPointer,
        camera
    );

    const intersections =
        raycaster.intersectObjects(
            activeConstellationStars,
            true
        );

    const selectedIntersection =
        intersections.find(
            (intersection) =>
                intersection.object?.userData?.isConstellationStar
        );

    if (!selectedIntersection) {
        return;
    }

    const selectedStarIndex =
        selectedIntersection.object
            .userData
            .constellationStarIndex;

    openConstellationPanel(selectedStarIndex);
}


/**
 * Abre el mensaje oculto.
 */
function openConstellationPanel(
    selectedIndex
) {
    isConstellationMessageOpen = true;
    clearConstellationHover();

    const activeData =
        CONSTELLATION_DATA[activeConstellationIndex];

    const messages =
        activeData?.messages ?? [
            "Entre todas las estrellas, siempre elegiría encontrarte a ti."
        ];

    constellationMessageText.textContent =
        messages[selectedIndex % messages.length];

    constellationMessage.classList.add("is-visible");
    constellationMessage.setAttribute("aria-hidden", "false");

    constellationHint.classList.remove("is-visible");
    constellationHint.setAttribute("aria-hidden", "true");

    constellationNavigation.classList.remove("is-visible");
    constellationNavigation.setAttribute("aria-hidden", "true");

    updateStatus(
        `Se abrió un recuerdo de la constelación ${activeData?.name ?? ""}.`
    );
}


/**
 * Cierra el mensaje.
 */
function closeConstellationPanel() {
    if (!isConstellationMessageOpen) {
        return;
    }

    isConstellationMessageOpen = false;

    constellationMessage.classList.remove("is-visible");
    constellationMessage.setAttribute("aria-hidden", "true");

    if (isConstellationVisible) {
        constellationHint.classList.add("is-visible");
        constellationHint.setAttribute("aria-hidden", "false");

        constellationNavigation.classList.add("is-visible");
        constellationNavigation.setAttribute("aria-hidden", "false");
    }

    updateStatus("Mensaje de la constelación cerrado.");
}


/**
 * Permite cerrar al tocar fuera de la tarjeta.
 */
function handleConstellationBackgroundClick(
    event
) {
    if (
        event.target ===
        constellationMessage
    ) {
        closeConstellationPanel();
    }
}
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
            isSmallScreen ? 1.6 : 2
        )
    );

    renderer.setSize(
        width,
        height,
        false
    );
}


function handleOrientationChange() {
    window.setTimeout(
        handleResize,
        180
    );
}


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

function enterUniverse() {
    if (
        !isUniverseReady ||
        hasEntered
    ) {
        return;
    }

    hasEntered = true;
    journeyStartTime = clock
        ? clock.getElapsedTime()
        : 0;

    journeyProgress = 0;
    currentJourneyStage = 1;

    startButton.disabled = true;

    document.body.classList.add(
        "has-entered"
    );

    intro.style.opacity = "0";
    intro.style.visibility = "hidden";
    intro.style.pointerEvents = "none";

    updateStatus(
        "Comienza el recorrido por el universo."
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

function startAnimation() {
    if (
        animationFrameId !== null
    ) {
        return;
    }

    animate();
}


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
    animateStars(elapsedTime);
    animateNebulas(elapsedTime);
    animateAmbientGlows(elapsedTime);
animatePlanetSystem(elapsedTime);
animateConstellation(elapsedTime);
animateCamera(elapsedTime);
    renderer.render(
        scene,
        camera
    );
}


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


function animateStars(elapsedTime) {
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

    closeStars.rotation.y -=
        0.00012 *
        motionMultiplier;

    closeStars.position.x =
        smoothPointer.x *
        -0.5 *
        motionMultiplier;

    closeStars.position.y =
        smoothPointer.y *
        -0.3 *
        motionMultiplier;

    mainStars.material.opacity =
        mainStars.userData.baseOpacity +
        Math.sin(
            elapsedTime *
            0.65
        ) *
        0.03 *
        motionMultiplier;

    coloredStars.material.opacity =
        coloredStars.userData.baseOpacity +
        Math.sin(
            elapsedTime *
            1.1
        ) *
        0.065 *
        motionMultiplier;
}


function animateNebulas(elapsedTime) {
    if (!nebulaGroup) {
        return;
    }

    const motionMultiplier =
        prefersReducedMotion
            ? 0.12
            : 1;

    nebulaGroup.rotation.y +=
        0.00004 *
        motionMultiplier;

    nebulaGroup.children.forEach(
        (nebula) => {
            const data =
                nebula.userData;

            const pulse =
                Math.sin(
                    elapsedTime *
                    data.speed +
                    data.phase
                );

            nebula.material.opacity =
                data.baseOpacity +
                pulse *
                0.022 *
                motionMultiplier;

            nebula.scale.x =
                data.baseScaleX *
                (
                    1 +
                    pulse *
                    0.02 *
                    motionMultiplier
                );

            nebula.scale.y =
                data.baseScaleY *
                (
                    1 -
                    pulse *
                    0.015 *
                    motionMultiplier
                );
        }
    );
}


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

    glowGroup.children.forEach(
        (glow) => {
            const data =
                glow.userData;

            const pulse =
                Math.sin(
                    elapsedTime *
                    data.pulseSpeed +
                    data.phase
                );

            glow.material.opacity =
                data.baseOpacity +
                pulse *
                0.035 *
                motionMultiplier;

            const scale =
                data.baseScale *
                (
                    1 +
                    pulse *
                    0.035 *
                    motionMultiplier
                );

            glow.scale.setScalar(
                scale
            );
        }
    );
}

/**
 * Anima el planeta y su luna.
 */
function animatePlanetSystem(
    elapsedTime
) {
    if (
        !planetSystem ||
        !planet ||
        !moonPivot
    ) {
        return;
    }

    const motionMultiplier =
        prefersReducedMotion
            ? 0.16
            : 1;

    const targetScale =
        hasEntered
            ? 1
            : 0.78;

    planetSystem.scale.lerp(
        new THREE.Vector3(
            targetScale,
            targetScale,
            targetScale
        ),
        hasEntered
            ? 0.018
            : 0.01
    );

    planet.rotation.y +=
        0.00115 *
        motionMultiplier;

    if (planetClouds) {
        planetClouds.rotation.y +=
            0.00155 *
            motionMultiplier;
    }

    if (moon) {
        moon.rotation.y +=
            0.002 *
            motionMultiplier;
    }

    moonPivot.rotation.y +=
        0.00125 *
        motionMultiplier;

    const planetInteractionStrength =
        currentJourneyStage === 1
            ? 0.018
            : currentJourneyStage === 2
                ? 0.026
                : 0.032;

    planetSystem.rotation.y =
        smoothPointer.x *
        planetInteractionStrength *
        motionMultiplier;

    planetSystem.rotation.x =
        smoothPointer.y *
        planetInteractionStrength *
        0.65 *
        motionMultiplier;

    planetSystem.position.y =
        PLANET_CONFIG.position.y +
        Math.sin(
            elapsedTime *
            0.22
        ) *
        0.15 *
        motionMultiplier;

    if (atmosphere?.material) {
        atmosphere.material.opacity =
            0.105 +
            Math.sin(
                elapsedTime *
                0.8
            ) *
            0.018 *
            motionMultiplier;
    }

    if (outerGlow?.material) {
        outerGlow.material.opacity =
            0.034 +
            Math.sin(
                elapsedTime *
                0.55
            ) *
            0.009 *
            motionMultiplier;
    }

    if (moonGlow?.material) {
        moonGlow.material.opacity =
            0.18 +
            Math.sin(
                elapsedTime *
                1.1
            ) *
            0.045 *
            motionMultiplier;
    }

    if (moonOrbitLine?.material) {
        moonOrbitLine.material.opacity =
            hasEntered
                ? 0.13
                : 0.07;
    }
}


/**
 * Muestra y anima la constelación
 * al final del recorrido.
 */
function animateConstellation(
    elapsedTime
) {
    if (!constellationContainer) {
        return;
    }

    const shouldReveal =
        hasEntered &&
        journeyProgress >= CONSTELLATION_CONFIG.revealStart;

    if (shouldReveal) {
        constellationContainer.visible = true;
        isConstellationVisible = true;
    }

    if (!constellationContainer.visible) {
        return;
    }

    const motionMultiplier =
        prefersReducedMotion ? 0.15 : 1;

    const revealProgress =
        THREE.MathUtils.clamp(
            (
                journeyProgress -
                CONSTELLATION_CONFIG.revealStart
            ) /
            (
                1 -
                CONSTELLATION_CONFIG.revealStart
            ),
            0,
            1
        );

    const easedReveal =
        easeInOutCubic(revealProgress);

    constellationContainer.rotation.y =
        Math.sin(elapsedTime * 0.16) *
        0.025 *
        motionMultiplier;

    constellationContainer.rotation.x =
        Math.cos(elapsedTime * 0.12) *
        0.012 *
        motionMultiplier;

    constellationContainer.position.y =
        CONSTELLATION_CONFIG.position.y +
        Math.sin(elapsedTime * 0.3) *
        0.08 *
        motionMultiplier;

    constellationGroups.forEach((group) => {
        if (!group.visible) {
            return;
        }

        group.userData.opacity +=
            (
                group.userData.targetOpacity -
                group.userData.opacity
            ) *
            0.08;

        const groupScale =
            easedReveal *
            group.userData.opacity;

        group.scale.lerp(
            new THREE.Vector3(
                groupScale,
                groupScale,
                groupScale
            ),
            0.12
        );

        group.userData.stars.forEach((star, index) => {
            const delayedReveal =
                THREE.MathUtils.clamp(
                    easedReveal * 1.45 -
                    index * 0.035,
                    0,
                    1
                );

            const pulse =
                Math.sin(
                    elapsedTime * 1.25 +
                    star.userData.phase
                );

            const hoverScale =
                hoveredConstellationStar === star
                    ? 1.48
                    : 1;

            const targetScale =
                delayedReveal *
                hoverScale *
                (
                    1 +
                    pulse *
                    0.08 *
                    motionMultiplier
                );

            star.scale.lerp(
                new THREE.Vector3(
                    targetScale,
                    targetScale,
                    targetScale
                ),
                0.12
            );

            const glow = star.userData.glow;
            const core = star.userData.core;

            if (glow?.material) {
                glow.material.opacity =
                    group.userData.opacity *
                    (
                        0.64 +
                        pulse *
                        0.16 *
                        motionMultiplier
                    );
            }

            if (core?.material) {
                core.material.opacity =
                    group.userData.opacity;
            }
        });

        if (group.userData.lines?.material) {
            group.userData.lines.material.opacity =
                easedReveal *
                0.42 *
                group.userData.opacity;
        }
    });

    if (
        revealProgress > 0.86 &&
        !isConstellationMessageOpen &&
        !isChangingConstellation
    ) {
        constellationHint.classList.add("is-visible");
        constellationHint.setAttribute("aria-hidden", "false");

        constellationNavigation.classList.add("is-visible");
        constellationNavigation.setAttribute("aria-hidden", "false");
    }
}

     

/**
 * Movimiento cinematográfico de la cámara.
 */
function animateCamera(
    elapsedTime
) {
    const motionMultiplier =
        prefersReducedMotion
            ? 0.18
            : 1;

    if (!hasEntered) {
        animateIntroCamera(
            elapsedTime,
            motionMultiplier
        );

        return;
    }

    updateJourneyProgress(
        elapsedTime
    );

    calculateJourneyPosition(
        elapsedTime,
        motionMultiplier
    );

    applyCameraInteraction(
        motionMultiplier
    );

    moveCameraSmoothly();

    camera.lookAt(
        cameraTarget
    );
}


/**
 * Movimiento de cámara antes de entrar.
 */
function animateIntroCamera(
    elapsedTime,
    motionMultiplier
) {
    const targetX =
        smoothPointer.x *
        0.22 *
        motionMultiplier;

    const targetY =
        smoothPointer.y *
        0.16 *
        motionMultiplier;

    camera.position.x +=
        (
            targetX -
            camera.position.x
        ) *
        0.018;

    camera.position.y +=
        (
            targetY -
            camera.position.y
        ) *
        0.018;

    const introZ =
        18 +
        Math.sin(
            elapsedTime *
            0.15
        ) *
        0.18 *
        motionMultiplier;

    camera.position.z +=
        (
            introZ -
            camera.position.z
        ) *
        0.015;

    cameraTarget.set(
        smoothPointer.x * 0.04,
        smoothPointer.y * 0.03,
        0
    );

    camera.lookAt(
        cameraTarget
    );
}


/**
 * Calcula cuánto ha avanzado el recorrido.
 */
function updateJourneyProgress(
    elapsedTime
) {
    if (journeyStartTime === null) {
        journeyStartTime =
            elapsedTime;
    }

    const journeyElapsed =
        elapsedTime -
        journeyStartTime;

    journeyProgress =
        THREE.MathUtils.clamp(
            journeyElapsed /
            CAMERA_JOURNEY.journeyDuration,
            0,
            1
        );
}


/**
 * Decide qué tramo del recorrido está activo.
 */
function calculateJourneyPosition(
    elapsedTime,
    motionMultiplier
) {
    if (
        journeyProgress <
        CAMERA_JOURNEY.stageOneEnd
    ) {
        currentJourneyStage = 1;

        calculatePlanetApproach(
            elapsedTime,
            motionMultiplier
        );

        return;
    }

    if (
        journeyProgress <
        CAMERA_JOURNEY.stageTwoEnd
    ) {
        currentJourneyStage = 2;

        calculatePlanetOrbit(
            elapsedTime,
            motionMultiplier
        );

        return;
    }

    if (
        journeyProgress <
        CAMERA_JOURNEY.stageThreeEnd
    ) {
        currentJourneyStage = 3;

        calculateMoonView(
            elapsedTime,
            motionMultiplier
        );

        return;
    }

    currentJourneyStage = 4;

    calculateDeepSpaceExit(
        elapsedTime,
        motionMultiplier
    );
}


/**
 * Etapa 1:
 * acercamiento inicial al planeta.
 */
function calculatePlanetApproach(
    elapsedTime,
    motionMultiplier
) {
    const localProgress =
        normalizeJourneyProgress(
            journeyProgress,
            0,
            CAMERA_JOURNEY.stageOneEnd
        );

    const easedProgress =
        easeInOutCubic(
            localProgress
        );

    const startPosition =
        new THREE.Vector3(
            0,
            0,
            18
        );

    const destination =
        isSmallScreen
            ? new THREE.Vector3(
                0.3,
                0.15,
                10.8
            )
            : new THREE.Vector3(
                0.8,
                0.2,
                10.3
            );

    desiredCameraPosition.lerpVectors(
        startPosition,
        destination,
        easedProgress
    );

    desiredCameraPosition.y +=
        Math.sin(
            elapsedTime *
            0.32
        ) *
        0.08 *
        motionMultiplier;

    desiredLookTarget.set(
        PLANET_CONFIG.position.x * 0.52,
        PLANET_CONFIG.position.y * 0.45,
        PLANET_CONFIG.position.z * 0.35
    );
}


/**
 * Etapa 2:
 * movimiento lateral alrededor del planeta.
 */
function calculatePlanetOrbit(
    elapsedTime,
    motionMultiplier
) {
    const localProgress =
        normalizeJourneyProgress(
            journeyProgress,
            CAMERA_JOURNEY.stageOneEnd,
            CAMERA_JOURNEY.stageTwoEnd
        );

    const easedProgress =
        easeInOutSine(
            localProgress
        );

    const startPosition =
        isSmallScreen
            ? new THREE.Vector3(
                0.3,
                0.15,
                10.8
            )
            : new THREE.Vector3(
                0.8,
                0.2,
                10.3
            );

    const orbitDestination =
        isSmallScreen
            ? new THREE.Vector3(
                -1.3,
                1.2,
                8.4
            )
            : new THREE.Vector3(
                -1.8,
                1.45,
                7.9
            );

    desiredCameraPosition.lerpVectors(
        startPosition,
        orbitDestination,
        easedProgress
    );

    desiredCameraPosition.x +=
        Math.sin(
            localProgress *
            Math.PI
        ) *
        0.75 *
        motionMultiplier;

    desiredCameraPosition.y +=
        Math.sin(
            elapsedTime *
            0.24
        ) *
        0.1 *
        motionMultiplier;

    desiredLookTarget.set(
        PLANET_CONFIG.position.x * 0.63,
        PLANET_CONFIG.position.y * 0.5,
        PLANET_CONFIG.position.z * 0.5
    );
}


/**
 * Etapa 3:
 * la cámara dirige la atención hacia la luna.
 */
function calculateMoonView(
    elapsedTime,
    motionMultiplier
) {
    const localProgress =
        normalizeJourneyProgress(
            journeyProgress,
            CAMERA_JOURNEY.stageTwoEnd,
            CAMERA_JOURNEY.stageThreeEnd
        );

    const easedProgress =
        easeInOutCubic(
            localProgress
        );

    const startPosition =
        isSmallScreen
            ? new THREE.Vector3(
                -1.3,
                1.2,
                8.4
            )
            : new THREE.Vector3(
                -1.8,
                1.45,
                7.9
            );

    const moonViewPosition =
        isSmallScreen
            ? new THREE.Vector3(
                1.15,
                2.1,
                7.1
            )
            : new THREE.Vector3(
                1.6,
                2.45,
                6.6
            );

    desiredCameraPosition.lerpVectors(
        startPosition,
        moonViewPosition,
        easedProgress
    );

    desiredCameraPosition.y +=
        Math.sin(
            elapsedTime *
            0.3
        ) *
        0.07 *
        motionMultiplier;

    const moonWorldPosition =
        new THREE.Vector3();

    if (moon) {
        moon.getWorldPosition(
            moonWorldPosition
        );
    } else {
        moonWorldPosition.copy(
            PLANET_CONFIG.position
        );
    }

    desiredLookTarget.lerpVectors(
        new THREE.Vector3(
            PLANET_CONFIG.position.x,
            PLANET_CONFIG.position.y,
            PLANET_CONFIG.position.z
        ),
        moonWorldPosition,
        easedProgress * 0.62
    );
}


/**
 * Etapa 4:
 * la cámara deja atrás el planeta
 * y se dirige a otra zona del universo.
 */
function calculateDeepSpaceExit(
    elapsedTime,
    motionMultiplier
) {
    const localProgress =
        normalizeJourneyProgress(
            journeyProgress,
            CAMERA_JOURNEY.stageThreeEnd,
            1
        );

    const easedProgress =
        easeInOutSine(
            localProgress
        );

    const startPosition =
        isSmallScreen
            ? new THREE.Vector3(
                1.15,
                2.1,
                7.1
            )
            : new THREE.Vector3(
                1.6,
                2.45,
                6.6
            );

    const deepSpacePosition =
        isSmallScreen
            ? new THREE.Vector3(
                -3.3,
                1.1,
                2.8
            )
            : new THREE.Vector3(
                -4.8,
                1.35,
                1.6
            );

    desiredCameraPosition.lerpVectors(
        startPosition,
        deepSpacePosition,
        easedProgress
    );

    desiredCameraPosition.y +=
        Math.sin(
            elapsedTime *
            0.21
        ) *
        0.08 *
        motionMultiplier;

    const initialTarget =
        new THREE.Vector3(
            PLANET_CONFIG.position.x,
            PLANET_CONFIG.position.y,
            PLANET_CONFIG.position.z
        );

    const deepTarget =
        isSmallScreen
            ? new THREE.Vector3(
                -3.8,
                0.4,
                -24
            )
            : new THREE.Vector3(
                -5.5,
                0.5,
                -28
            );

    desiredLookTarget.lerpVectors(
        initialTarget,
        deepTarget,
        easedProgress
    );
}


/**
 * Permite una interacción ligera sin romper
 * el recorrido automático.
 */
function applyCameraInteraction(
    motionMultiplier
) {
    const stageInteraction =
        currentJourneyStage === 4
            ? 0.45
            : 0.28;

    desiredCameraPosition.x +=
        smoothPointer.x *
        stageInteraction *
        motionMultiplier;

    desiredCameraPosition.y +=
        smoothPointer.y *
        stageInteraction *
        0.65 *
        motionMultiplier;

    desiredLookTarget.x +=
        smoothPointer.x *
        0.16 *
        motionMultiplier;

    desiredLookTarget.y +=
        smoothPointer.y *
        0.1 *
        motionMultiplier;
}


/**
 * Aplica suavemente las posiciones calculadas.
 */
function moveCameraSmoothly() {
    const positionSmoothing =
        currentJourneyStage === 1
            ? 0.022
            : 0.018;

    camera.position.lerp(
        desiredCameraPosition,
        positionSmoothing
    );

    cameraTarget.lerp(
        desiredLookTarget,
        0.022
    );
}


/**
 * Convierte un tramo del recorrido a valores de 0 a 1.
 */
function normalizeJourneyProgress(
    value,
    minimum,
    maximum
) {
    if (maximum === minimum) {
        return 1;
    }

    return THREE.MathUtils.clamp(
        (
            value -
            minimum
        ) /
        (
            maximum -
            minimum
        ),
        0,
        1
    );
}


/**
 * Curva suave con aceleración y desaceleración.
 */
function easeInOutCubic(value) {
    return value < 0.5
        ? 4 * value * value * value
        : 1 -
            Math.pow(
                -2 * value + 2,
                3
            ) /
            2;
}


/**
 * Curva suave basada en seno.
 */
function easeInOutSine(value) {
    return -(
        Math.cos(
            Math.PI * value
        ) -
        1
    ) / 2;
}


/* ---------------------------------------------------------
   CARGA COMPLETADA
--------------------------------------------------------- */

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
   ERRORES
--------------------------------------------------------- */

function handleFatalError(error) {
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

function updateLoaderText(message) {
    if (loaderText) {
        loaderText.textContent =
            message;
    }
}


function updateStatus(message) {
    if (statusElement) {
        statusElement.textContent =
            message;
    }
}


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


function wait(milliseconds) {
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

    disposePoints(mainStars);
    disposePoints(distantStars);
    disposePoints(coloredStars);
    disposePoints(closeStars);

    disposeSpriteGroup(
        nebulaGroup
    );

    disposeSpriteGroup(
        glowGroup
    );

   disposeObject3D(
    planetSystem
);

disposeObject3D(
    constellationContainer
);

renderer?.dispose();
}


function disposePoints(points) {
    if (!points) {
        return;
    }

    points.geometry?.dispose();
    points.material?.map?.dispose();
    points.material?.dispose();
}


function disposeSpriteGroup(group) {
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


function disposeObject3D(object) {
    if (!object) {
        return;
    }

    object.traverse(
        (child) => {
            child.geometry?.dispose();

            if (Array.isArray(child.material)) {
                child.material.forEach(
                    disposeMaterial
                );
            } else {
                disposeMaterial(
                    child.material
                );
            }
        }
    );
}


function disposeMaterial(material) {
    if (!material) {
        return;
    }

    material.map?.dispose();
    material.alphaMap?.dispose();
    material.normalMap?.dispose();
    material.roughnessMap?.dispose();
    material.metalnessMap?.dispose();

    material.dispose?.();
}
