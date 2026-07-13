import * as THREE from "https://unpkg.com/three@0.166.1/build/three.module.js";


/* =========================================================
   UNIVERSO PARA DANI
   VERSIÓN B PULIDA: UNIVERSO PROCEDIMENTAL REALISTA
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

const constellationMessageTitle =
    document.getElementById(
        "constellationMessageTitle"
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

const journeyCaption =
    document.getElementById(
        "journeyCaption"
    );

const journeyCaptionTitle =
    document.getElementById(
        "journeyCaptionTitle"
    );

const journeyCaptionText =
    document.getElementById(
        "journeyCaptionText"
    );

const journeyProgressBar =
    document.getElementById(
        "journeyProgressBar"
    );

const journeyFinalMessage =
    document.getElementById(
        "journeyFinalMessage"
    );

const cosmicNavigationHint =
    document.getElementById(
        "cosmicNavigationHint"
    );

const hiddenBirthdayHint =
    document.getElementById(
        "hiddenBirthdayHint"
    );

const backgroundMusic =
    document.getElementById(
        "backgroundMusic"
    );

const audioControl =
    document.getElementById(
        "audioControl"
    );

const audioControlIcon =
    document.getElementById(
        "audioControlIcon"
    );

const audioControlText =
    document.getElementById(
        "audioControlText"
    );

const audioStatus =
    document.getElementById(
        "audioStatus"
    );

const finalScene =
    document.getElementById(
        "finalScene"
    );

const finalSceneMessage =
    document.getElementById(
        "finalSceneMessage"
    );

const replayJourneyButton =
    document.getElementById(
        "replayJourneyButton"
    );

const continueExploringButton =
    document.getElementById(
        "continueExploringButton"
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

let shootingStarGroup;
let shootingStars = [];

let interactiveStarGroup;
let interactiveStars = [];

let stardustGroup;
let stardustBursts = [];

let lastJourneyCaptionStage = -1;
let finalJourneyMessageShown = false;
let journeyCaptionHideTimer = null;

let galaxyGroup;
let galaxies = [];

let asteroidGroup;
let asteroids = [];

let distantSun;
let distantSunGlow;

let detailedStarGroup;
let detailedStars = [];

let birthdayMessageGroup;
let birthdayMessagePoints;
let birthdayMessageTargetPositions;
let birthdayMessageScatterPositions;
let birthdayMessageState = "hidden";
let birthdayMessageTimer = 0;

let isDraggingUniverse = false;
let dragStartX = 0;
let dragStartY = 0;
let dragLastX = 0;
let dragLastY = 0;
let totalDragDistance = 0;
let universeYaw = 0;
let universePitch = 0;
let targetUniverseYaw = 0;
let targetUniversePitch = 0;

let isAudioAvailable = true;
let isAudioPlaying = false;
let isAudioFading = false;
let audioFadeFrame = null;
let userRequestedAudio = false;

let galacticBandGroup;
let galacticBandLayers = [];

let deepStarField;
let deepStarTwinkleData = [];

let solarCoronaGroup;
let solarCoronaLayers = [];
let solarFlareGroup;
let solarFlares = [];

let finalSceneShown = false;
let finalSceneTimeout = null;
let finalSceneDismissed = false;

let proceduralUniverseMesh;
let proceduralUniverseMaterial;

let milkyWayRibbonGroup;
let milkyWayRibbonLayers = [];
let cosmicDustGroup;
let cosmicDustLayers = [];
let starShockwaveGroup;
let starShockwaves = [];


const cosmicRaycaster = new THREE.Raycaster();
const cosmicPointer = new THREE.Vector2();

const temporaryVector = new THREE.Vector3();
const temporaryColor = new THREE.Color();

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
    },
    {
        name: "Cáncer",
        color: 0x9ed7ff,
        glowColor: 0x69bfff,
        points: [
            [-3.35, 1.4, 0],
            [-2.2, 2.15, 0.08],
            [-1.05, 1.35, -0.08],
            [0, 2.35, 0.1],
            [1.05, 1.35, -0.08],
            [2.2, 2.15, 0.08],
            [3.35, 1.4, 0],
            [2.55, 0.25, 0.08],
            [1.35, -0.4, -0.08],
            [0, 0.25, 0.12],
            [-1.35, -0.4, -0.08],
            [-2.55, 0.25, 0.08],
            [0, -1.55, 0],
            [-1.55, -2.2, 0.08],
            [1.55, -2.2, 0.08]
        ],
        connections: [
            [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],
            [6,7],[7,8],[8,9],[9,10],[10,11],[11,0],
            [9,12],[12,13],[12,14]
        ],
        messages: [
            "No me dejes volver a la oscuridad del océano; mientras esté contigo, todo estará bien.",
            "Es un dulce caos. Desde que apareciste en mi vida, mis sueños, mis metas y mi mundo entero han cambiado.",
            "Cuando me miras, el mundo se desvanece. Siempre nos recordaré así.",
            "Think I like you best when you're just with me and no one else.",
            "If you ever go, all the songs that we like will sound like bittersweet lullabies lost in the blue. They don't love me like you do."
        ]
    }
];
/* ---------------------------------------------------------
   CONFIGURACIÓN
--------------------------------------------------------- */

const STAR_CONFIG = {
    mainCount: isSmallScreen ? 1200 : 2200,
    distantCount: isSmallScreen ? 700 : 1400,
    coloredCount: isSmallScreen ? 160 : 300,
    closeCount: isSmallScreen ? 100 : 180,

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

const COSMIC_CONFIG = {
    shootingStarCount: isSmallScreen ? 3 : 5,
    interactiveStarCount: isSmallScreen ? 9 : 14,
    stardustParticleCount: isSmallScreen ? 24 : 38,
    shootingStarMinimumDelay: 2.6,
    shootingStarMaximumDelay: 7.5
};

const JOURNEY_SCENES = [
    {
        title: "Un nuevo mundo",
        text: "Todo viaje comienza con una luz que decide quedarse."
    },
    {
        title: "Más cerca",
        text: "A veces acercarse también significa aprender a mirar despacio."
    },
    {
        title: "La misma órbita",
        text: "Incluso a la distancia, algunas presencias siguen encontrando el camino."
    },
    {
        title: "Entre estrellas",
        text: "Aquí empiezan los recuerdos que guardé para ti."
    }
];

const REALISM_CONFIG = {
    galaxyCount: isSmallScreen ? 2 : 3,
    asteroidCount: isSmallScreen ? 18 : 32,
    detailedStarCount: isSmallScreen ? 16 : 28,
    birthdayRevealDragDistance: isSmallScreen ? 520 : 760,
    birthdayHoldDuration: 7.5
};

const AUDIO_CONFIG = {
    targetVolume: 0.42,
    fadeDuration: 1800,
    storageKey: "universoDaniAudioEnabled"
};

const POLISH_CONFIG = {
    deepStarCount: isSmallScreen ? 1600 : 3200,
    galacticBandParticleCount: isSmallScreen ? 950 : 1850,
    galacticBandLayerCount: isSmallScreen ? 2 : 3,
    solarFlareCount: isSmallScreen ? 7 : 12,
    finalSceneDelay: 2400
};

const REFINED_COSMIC_CONFIG = {
    milkyWayLayers: isSmallScreen ? 3 : 5,
    dustLayers: isSmallScreen ? 4 : 7
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
        createProceduralUniverse();
        createMilkyWayRibbon();
        createCosmicDustLayers();
        createStarShockwaveSystem();
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

updateLoaderText("Encendiendo el cielo…");

createShootingStars();
createInteractiveStars();
createStardustSystem();

updateLoaderText("Formando galaxias…");

createDetailedStars();
createGalaxies();
createAsteroidField();
createDistantSun();
createHiddenBirthdayMessage();

updateLoaderText("Dando profundidad al universo…");

createDeepStarField();
createGalacticBand();
enhanceDistantSun();

initializeAudio();

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
   FONDO PROCEDIMENTAL
--------------------------------------------------------- */

function createProceduralUniverse() {
    const geometry =
        new THREE.SphereGeometry(
            240,
            isSmallScreen ? 48 : 72,
            isSmallScreen ? 32 : 48
        );

    proceduralUniverseMaterial =
        new THREE.ShaderMaterial({
            side: THREE.BackSide,
            depthWrite: false,
            transparent: false,
            uniforms: {
                uTime: {
                    value: 0
                },
                uResolution: {
                    value: new THREE.Vector2(
                        window.innerWidth,
                        window.innerHeight
                    )
                }
            },
            vertexShader: `
                varying vec3 vWorldPosition;

                void main() {
                    vec4 worldPosition =
                        modelMatrix *
                        vec4(position, 1.0);

                    vWorldPosition =
                        worldPosition.xyz;

                    gl_Position =
                        projectionMatrix *
                        viewMatrix *
                        worldPosition;
                }
            `,
            fragmentShader: `
                precision highp float;

                uniform float uTime;
                varying vec3 vWorldPosition;

                float hash(vec3 p) {
                    p = fract(
                        p * 0.3183099 +
                        vec3(0.1, 0.2, 0.3)
                    );

                    p *= 17.0;

                    return fract(
                        p.x * p.y * p.z *
                        (p.x + p.y + p.z)
                    );
                }

                float noise(vec3 p) {
                    vec3 i = floor(p);
                    vec3 f = fract(p);

                    f = f * f *
                        (3.0 - 2.0 * f);

                    return mix(
                        mix(
                            mix(
                                hash(i + vec3(0.0,0.0,0.0)),
                                hash(i + vec3(1.0,0.0,0.0)),
                                f.x
                            ),
                            mix(
                                hash(i + vec3(0.0,1.0,0.0)),
                                hash(i + vec3(1.0,1.0,0.0)),
                                f.x
                            ),
                            f.y
                        ),
                        mix(
                            mix(
                                hash(i + vec3(0.0,0.0,1.0)),
                                hash(i + vec3(1.0,0.0,1.0)),
                                f.x
                            ),
                            mix(
                                hash(i + vec3(0.0,1.0,1.0)),
                                hash(i + vec3(1.0,1.0,1.0)),
                                f.x
                            ),
                            f.y
                        ),
                        f.z
                    );
                }

                float fbm(vec3 p) {
                    float value = 0.0;
                    float amplitude = 0.5;

                    for (int i = 0; i < 5; i++) {
                        value +=
                            amplitude *
                            noise(p);

                        p =
                            p * 2.03 +
                            vec3(11.7, 7.3, 5.1);

                        amplitude *= 0.5;
                    }

                    return value;
                }

                void main() {
                    vec3 direction =
                        normalize(vWorldPosition);

                    vec3 p =
                        direction * 3.4;

                    p +=
                        vec3(
                            uTime * 0.008,
                            -uTime * 0.004,
                            uTime * 0.006
                        );

                    float cloudA =
                        fbm(p);

                    float cloudB =
                        fbm(
                            p * 1.8 +
                            vec3(4.0, -2.0, 3.0)
                        );

                    float band =
                        exp(
                            -pow(
                                abs(direction.y * 2.8 +
                                direction.x * 0.75),
                                2.0
                            ) * 3.5
                        );

                    vec3 deepColor =
                        vec3(
                            0.006,
                            0.008,
                            0.025
                        );

                    vec3 blueNebula =
                        vec3(
                            0.12,
                            0.20,
                            0.55
                        );

                    vec3 violetNebula =
                        vec3(
                            0.42,
                            0.12,
                            0.50
                        );

                    vec3 pinkNebula =
                        vec3(
                            0.52,
                            0.12,
                            0.34
                        );

                    vec3 color =
                        deepColor;

                    color +=
                        blueNebula *
                        smoothstep(
                            0.48,
                            0.84,
                            cloudA
                        ) *
                        0.65;

                    color +=
                        violetNebula *
                        smoothstep(
                            0.55,
                            0.88,
                            cloudB
                        ) *
                        0.55;

                    color +=
                        pinkNebula *
                        band *
                        smoothstep(
                            0.36,
                            0.8,
                            cloudA + cloudB * 0.25
                        ) *
                        0.45;

                    float dust =
                        smoothstep(
                            0.5,
                            0.82,
                            fbm(
                                p * 3.2 +
                                vec3(3.0)
                            )
                        );

                    color *=
                        1.0 -
                        dust *
                        band *
                        0.48;

                    float stars =
                        step(
                            0.9975,
                            hash(
                                floor(
                                    direction *
                                    900.0
                                )
                            )
                        );

                    float brightStars =
                        step(
                            0.99935,
                            hash(
                                floor(
                                    direction *
                                    420.0 +
                                    17.0
                                )
                            )
                        );

                    color +=
                        vec3(0.85, 0.92, 1.0) *
                        stars *
                        0.75;

                    color +=
                        vec3(1.0, 0.82, 0.68) *
                        brightStars *
                        1.35;

                    gl_FragColor =
                        vec4(
                            color,
                            1.0
                        );
                }
            `
        });

    proceduralUniverseMesh =
        new THREE.Mesh(
            geometry,
            proceduralUniverseMaterial
        );

    proceduralUniverseMesh.name =
        "ProceduralUniverse";

    scene.add(
        proceduralUniverseMesh
    );
}


function animateProceduralUniverse(
    elapsedTime
) {
    if (
        !proceduralUniverseMaterial
    ) {
        return;
    }

    proceduralUniverseMaterial.uniforms
        .uTime.value =
        elapsedTime;
}

function createRefinedStarTexture() {
    const c=document.createElement("canvas"); c.width=256; c.height=256;
    const x=c.getContext("2d");
    const g=x.createRadialGradient(128,128,0,128,128,128);
    g.addColorStop(0,"rgba(255,255,255,1)"); g.addColorStop(0.055,"rgba(255,255,255,1)");
    g.addColorStop(0.14,"rgba(222,235,255,0.92)"); g.addColorStop(0.34,"rgba(130,175,255,0.32)");
    g.addColorStop(1,"rgba(0,0,0,0)"); x.fillStyle=g; x.fillRect(0,0,256,256);
    x.save(); x.translate(128,128);
    const b=x.createLinearGradient(-128,0,128,0);
    b.addColorStop(0,"rgba(255,255,255,0)"); b.addColorStop(0.46,"rgba(220,235,255,0.08)");
    b.addColorStop(0.5,"rgba(255,255,255,0.86)"); b.addColorStop(0.54,"rgba(220,235,255,0.08)"); b.addColorStop(1,"rgba(255,255,255,0)");
    x.fillStyle=b; x.fillRect(-128,-2,256,4); x.rotate(Math.PI/2); x.fillRect(-128,-1.3,256,2.6); x.restore();
    const t=new THREE.CanvasTexture(c); t.colorSpace=THREE.SRGBColorSpace; return t;
}

function createMilkyWayRibbonTexture() {
    const c=document.createElement("canvas"); c.width=1400; c.height=360; const x=c.getContext("2d");
    const g=x.createLinearGradient(0,0,0,c.height);
    g.addColorStop(0,"rgba(0,0,0,0)"); g.addColorStop(0.25,"rgba(90,110,170,0.035)");
    g.addColorStop(0.47,"rgba(236,240,255,0.20)"); g.addColorStop(0.53,"rgba(255,255,255,0.26)");
    g.addColorStop(0.72,"rgba(115,90,155,0.06)"); g.addColorStop(1,"rgba(0,0,0,0)");
    x.fillStyle=g; x.fillRect(0,0,c.width,c.height);
    for(let i=0;i<950;i++){ const px=randomBetween(0,c.width); const cy=c.height/2+Math.sin(px*0.008)*16; const py=cy+randomBetween(-92,92); const d=Math.abs(py-cy); const a=Math.max(0,1-d/105)*randomBetween(0.08,0.75); x.fillStyle=i%5===0?`rgba(255,224,205,${a})`:i%3===0?`rgba(204,219,255,${a})`:`rgba(255,255,255,${a})`; x.beginPath(); x.arc(px,py,randomBetween(0.45,2.3),0,Math.PI*2); x.fill(); }
    for(let i=0;i<55;i++){ x.globalAlpha=randomBetween(0.025,0.11); x.fillStyle="#070914"; x.beginPath(); x.ellipse(randomBetween(0,c.width),c.height/2+randomBetween(-55,55),randomBetween(45,175),randomBetween(5,21),randomBetween(-0.16,0.16),0,Math.PI*2); x.fill(); }
    x.globalAlpha=1; const t=new THREE.CanvasTexture(c); t.colorSpace=THREE.SRGBColorSpace; return t;
}

function createMilkyWayRibbon(){ milkyWayRibbonGroup=new THREE.Group(); const tex=createMilkyWayRibbonTexture();
    for(let i=0;i<REFINED_COSMIC_CONFIG.milkyWayLayers;i++){ const m=new THREE.SpriteMaterial({map:tex,transparent:true,opacity:0.22-i*0.025,depthWrite:false,blending:THREE.AdditiveBlending}); const s=new THREE.Sprite(m); s.position.set(-8+i*3.2,-1+i*0.6,-74-i*8); s.scale.set(128+i*20,29+i*5,1); s.material.rotation=-0.26+i*0.012; s.userData={baseOpacity:m.opacity,phase:i*0.7}; milkyWayRibbonLayers.push(s); milkyWayRibbonGroup.add(s);} scene.add(milkyWayRibbonGroup); }

function createCosmicDustTexture(color){ const c=document.createElement("canvas"); c.width=512;c.height=512;const x=c.getContext("2d"); for(let i=0;i<90;i++){ const px=randomBetween(30,482),py=randomBetween(30,482),r=randomBetween(16,88),a=randomBetween(0.012,0.055); const g=x.createRadialGradient(px,py,0,px,py,r); g.addColorStop(0,color.replace("{a}",a.toFixed(3))); g.addColorStop(1,"rgba(0,0,0,0)"); x.fillStyle=g;x.beginPath();x.arc(px,py,r,0,Math.PI*2);x.fill(); } const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;return t; }
function createCosmicDustLayers(){ cosmicDustGroup=new THREE.Group(); const ts=[createCosmicDustTexture("rgba(88,125,255,{a})"),createCosmicDustTexture("rgba(195,90,180,{a})"),createCosmicDustTexture("rgba(225,175,235,{a})")]; for(let i=0;i<REFINED_COSMIC_CONFIG.dustLayers;i++){ const m=new THREE.SpriteMaterial({map:ts[i%ts.length],transparent:true,opacity:randomBetween(0.08,0.18),depthWrite:false,blending:THREE.AdditiveBlending}); const d=new THREE.Sprite(m); d.position.set(randomBetween(-36,36),randomBetween(-18,18),randomBetween(-42,-120)); const sc=randomBetween(34,74);d.scale.set(sc,sc*randomBetween(0.62,1.2),1);d.material.rotation=randomBetween(0,Math.PI*2);d.userData={baseOpacity:m.opacity,phase:randomBetween(0,Math.PI*2)};cosmicDustLayers.push(d);cosmicDustGroup.add(d);} scene.add(cosmicDustGroup); }
function createStarShockwaveSystem(){ starShockwaveGroup=new THREE.Group(); scene.add(starShockwaveGroup); }
function createStarShockwave(p,color){ const r=new THREE.Mesh(new THREE.RingGeometry(0.18,0.22,48),new THREE.MeshBasicMaterial({color,transparent:true,opacity:0.75,side:THREE.DoubleSide,depthWrite:false,blending:THREE.AdditiveBlending})); r.position.copy(p);r.lookAt(camera.position);r.userData={age:0,duration:0.8};starShockwaves.push(r);starShockwaveGroup.add(r); }
function triggerConstellationStarEffect(star){ if(!star)return; star.getWorldPosition(temporaryVector); const color=star.userData.glow?.material?.color?.getHex()??0xffffff; createStardustBurst(temporaryVector,color);createStarShockwave(temporaryVector,color); }
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
function createConstellationStar(position,starIndex,constellationIndex,texture,data){ const g=new THREE.Group();g.position.set(position[0],position[1],position[2]);g.userData={constellationIndex,constellationStarIndex:starIndex,baseScale:starIndex%4===0?0.74:0.54,phase:starIndex*0.72,isConstellationStar:true};const hit=new THREE.Mesh(new THREE.SphereGeometry(starIndex%4===0?0.2:0.15,12,8),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}));hit.userData={isConstellationStar:true,constellationIndex,constellationStarIndex:starIndex};const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:createRefinedStarTexture(),color:data.glowColor,transparent:true,opacity:0.84,depthWrite:false,blending:THREE.AdditiveBlending}));const sc=g.userData.baseScale;glow.scale.set(sc,sc,1);glow.userData={isConstellationStar:true,constellationIndex,constellationStarIndex:starIndex};g.add(hit,glow);g.userData.core=hit;g.userData.glow=glow;g.scale.setScalar(0.001);return g;}


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
   DETALLES CÓSMICOS INTERACTIVOS
--------------------------------------------------------- */

function createShootingStars() {
    shootingStarGroup = new THREE.Group();
    shootingStarGroup.name = "ShootingStarGroup";
    shootingStars = [];

    for (
        let index = 0;
        index < COSMIC_CONFIG.shootingStarCount;
        index += 1
    ) {
        const geometry = new THREE.BufferGeometry();

        const positions = new Float32Array([
            0, 0, 0,
            -4.5, 0, 0
        ]);

        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(
                positions,
                3
            )
        );

        const material =
            new THREE.LineBasicMaterial({
                color:
                    index % 2 === 0
                        ? 0xcfe2ff
                        : 0xf6c8ff,

                transparent: true,
                opacity: 0,

                blending:
                    THREE.AdditiveBlending,

                depthWrite: false
            });

        const shootingStar =
            new THREE.Line(
                geometry,
                material
            );

        shootingStar.visible = false;

        shootingStar.userData = {
            active: false,
            speed:
                randomBetween(
                    14,
                    22
                ),

            delay:
                randomBetween(
                    COSMIC_CONFIG
                        .shootingStarMinimumDelay,
                    COSMIC_CONFIG
                        .shootingStarMaximumDelay
                ),

            elapsed: 0,
            life: 0,
            duration:
                randomBetween(
                    0.8,
                    1.35
                )
        };

        shootingStars.push(
            shootingStar
        );

        shootingStarGroup.add(
            shootingStar
        );
    }

    scene.add(
        shootingStarGroup
    );
}


function resetShootingStar(
    shootingStar
) {
    const side =
        Math.random() > 0.5
            ? 1
            : -1;

    shootingStar.position.set(
        side *
            randomBetween(
                18,
                34
            ),

        randomBetween(
            8,
            22
        ),

        randomBetween(
            -20,
            -70
        )
    );

    shootingStar.rotation.z =
        side > 0
            ? randomBetween(
                2.55,
                2.85
            )
            : randomBetween(
                0.25,
                0.55
            );

    shootingStar.userData.active =
        true;

    shootingStar.userData.life =
        0;

    shootingStar.userData.duration =
        randomBetween(
            0.8,
            1.35
        );

    shootingStar.userData.speed =
        randomBetween(
            14,
            22
        );

    shootingStar.visible =
        true;
}


function createInteractiveStars(){ interactiveStarGroup=new THREE.Group();interactiveStars=[];const tex=createRefinedStarTexture();
for(let i=0;i<COSMIC_CONFIG.interactiveStarCount;i++){ const g=new THREE.Group();const p=createInteractiveStarPosition(i);g.position.copy(p);g.userData={basePosition:p.clone(),phase:i*0.83,escaped:false,escapeProgress:0,escapeDirection:new THREE.Vector3(),isInteractiveCosmicStar:true};
const hit=new THREE.Mesh(new THREE.SphereGeometry(isSmallScreen?0.35:0.3,12,8),new THREE.MeshBasicMaterial({transparent:true,opacity:0,depthWrite:false}));hit.userData={isInteractiveCosmicStar:true,starIndex:i};
const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:tex,color:i%3===0?0xffffff:i%3===1?0x9fc7ff:0xffb5de,transparent:true,opacity:randomBetween(0.72,0.94),depthWrite:false,blending:THREE.AdditiveBlending}));const sc=randomBetween(isSmallScreen?1.2:0.95,isSmallScreen?2.2:1.8);sp.scale.set(sc,sc,1);sp.userData={isInteractiveCosmicStar:true,starIndex:i,baseScale:sc};g.add(hit,sp);g.userData.core=hit;g.userData.glow=sp;interactiveStars.push(g);interactiveStarGroup.add(g);}scene.add(interactiveStarGroup);}


function createInteractiveStarPosition(
    index
) {
    const angle =
        (
            index /
            COSMIC_CONFIG
                .interactiveStarCount
        ) *
        Math.PI *
        2 +
        randomBetween(
            -0.2,
            0.2
        );

    const radius =
        randomBetween(
            12,
            25
        );

    const x =
        Math.cos(angle) *
        radius;

    const y =
        randomBetween(
            -10,
            11
        );

    const z =
        randomBetween(
            -10,
            -42
        );

    return new THREE.Vector3(
        x,
        y,
        z
    );
}


function createStardustSystem() {
    stardustGroup =
        new THREE.Group();

    stardustGroup.name =
        "StardustGroup";

    stardustBursts = [];

    scene.add(
        stardustGroup
    );
}


function createStardustBurst(
    worldPosition,
    colorValue
) {
    if (!stardustGroup) {
        return;
    }

    const count =
        COSMIC_CONFIG
            .stardustParticleCount;

    const geometry =
        new THREE.BufferGeometry();

    const positions =
        new Float32Array(
            count *
            3
        );

    const velocities = [];

    for (
        let index = 0;
        index < count;
        index += 1
    ) {
        const offset =
            index *
            3;

        positions[offset] =
            worldPosition.x;

        positions[offset + 1] =
            worldPosition.y;

        positions[offset + 2] =
            worldPosition.z;

        const direction =
            new THREE.Vector3(
                randomBetween(
                    -1,
                    1
                ),
                randomBetween(
                    -1,
                    1
                ),
                randomBetween(
                    -0.7,
                    0.7
                )
            )
            .normalize()
            .multiplyScalar(
                randomBetween(
                    1.2,
                    4.8
                )
            );

        velocities.push(
            direction
        );
    }

    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );

    const material =
        new THREE.PointsMaterial({
            size:
                isSmallScreen
                    ? 0.34
                    : 0.27,

            color:
                colorValue,

            transparent: true,
            opacity: 1,

            depthWrite: false,

            blending:
                THREE.AdditiveBlending,

            map:
                createGlowTexture(),

            alphaMap:
                createGlowTexture()
        });

    const points =
        new THREE.Points(
            geometry,
            material
        );

    points.userData = {
        age: 0,
        duration:
            randomBetween(
                0.85,
                1.35
            ),

        velocities
    };

    stardustBursts.push(
        points
    );

    stardustGroup.add(
        points
    );
}


function triggerInteractiveStar(
    star
) {
    if (
        !star ||
        star.userData.escaped
    ) {
        return;
    }

    star.getWorldPosition(
        temporaryVector
    );

    const glowColor =
        star.userData.glow
            ?.material
            ?.color
            ?.getHex() ??
        0xffffff;

    createStardustBurst(
        temporaryVector,
        glowColor
    );

    createStarShockwave(temporaryVector, glowColor);

    star.userData.escaped =
        true;

    star.userData.escapeProgress =
        0;

    star.userData.escapeDirection
        .set(
            randomBetween(
                -1,
                1
            ),
            randomBetween(
                0.2,
                1.1
            ),
            randomBetween(
                -0.5,
                0.2
            )
        )
        .normalize()
        .multiplyScalar(
            randomBetween(
                7,
                12
            )
        );

    window.setTimeout(
        () => {
            resetInteractiveStar(
                star
            );
        },
        1800
    );
}


function resetInteractiveStar(
    star
) {
    const index =
        interactiveStars.indexOf(
            star
        );

    const newPosition =
        createInteractiveStarPosition(
            Math.max(
                index,
                0
            )
        );

    star.position.copy(
        newPosition
    );

    star.userData.basePosition
        .copy(
            newPosition
        );

    star.userData.escaped =
        false;

    star.userData.escapeProgress =
        0;

    star.scale.setScalar(
        1
    );

    star.visible =
        true;
}



/* ---------------------------------------------------------
   MÚSICA Y AMBIENTE SONORO
--------------------------------------------------------- */

function initializeAudio() {
    if (!backgroundMusic) {
        return;
    }

    backgroundMusic.volume = 0;
    backgroundMusic.loop = true;
    backgroundMusic.preload = "metadata";

    const storedPreference =
        window.localStorage.getItem(
            AUDIO_CONFIG.storageKey
        );

    userRequestedAudio =
        storedPreference === "true";

    updateAudioControl(
        false,
        "Activar música"
    );
}


async function toggleBackgroundMusic() {
    if (!isAudioAvailable) {
        showAudioStatus(
            "Agrega el archivo musica.mp3 al repositorio."
        );

        return;
    }

    if (isAudioPlaying) {
        userRequestedAudio = false;

        window.localStorage.setItem(
            AUDIO_CONFIG.storageKey,
            "false"
        );

        fadeOutBackgroundMusic();

        return;
    }

    userRequestedAudio = true;

    window.localStorage.setItem(
        AUDIO_CONFIG.storageKey,
        "true"
    );

    await playBackgroundMusic();
}


async function playBackgroundMusic() {
    if (
        !backgroundMusic ||
        !isAudioAvailable ||
        isAudioFading
    ) {
        return;
    }

    try {
        backgroundMusic.volume = 0;

        await backgroundMusic.play();

        fadeAudioTo(
            AUDIO_CONFIG.targetVolume,
            AUDIO_CONFIG.fadeDuration
        );

        showAudioStatus(
            "Música activada"
        );
    } catch (error) {
        console.warn(
            "El navegador bloqueó el audio:",
            error
        );

        updateAudioControl(
            false,
            "Toca para activar"
        );

        showAudioStatus(
            "Toca nuevamente para iniciar la música."
        );
    }
}


function fadeOutBackgroundMusic() {
    if (!backgroundMusic) {
        return;
    }

    fadeAudioTo(
        0,
        900,
        () => {
            backgroundMusic.pause();
            backgroundMusic.currentTime =
                backgroundMusic.currentTime;
        }
    );

    showAudioStatus(
        "Música en silencio"
    );
}


function fadeAudioTo(
    targetVolume,
    duration,
    onComplete = null
) {
    if (!backgroundMusic) {
        return;
    }

    if (audioFadeFrame !== null) {
        window.cancelAnimationFrame(
            audioFadeFrame
        );
    }

    isAudioFading = true;

    const initialVolume =
        backgroundMusic.volume;

    const startTime =
        performance.now();

    const animateFade =
        (currentTime) => {
            const progress =
                THREE.MathUtils.clamp(
                    (
                        currentTime -
                        startTime
                    ) /
                    duration,
                    0,
                    1
                );

            const easedProgress =
                1 -
                Math.pow(
                    1 -
                    progress,
                    3
                );

            backgroundMusic.volume =
                THREE.MathUtils.lerp(
                    initialVolume,
                    targetVolume,
                    easedProgress
                );

            if (progress < 1) {
                audioFadeFrame =
                    window.requestAnimationFrame(
                        animateFade
                    );

                return;
            }

            isAudioFading = false;
            audioFadeFrame = null;

            if (
                typeof onComplete ===
                "function"
            ) {
                onComplete();
            }
        };

    audioFadeFrame =
        window.requestAnimationFrame(
            animateFade
        );
}


function handleAudioPlaying() {
    isAudioPlaying = true;

    updateAudioControl(
        true,
        "Silenciar música"
    );
}


function handleAudioPaused() {
    isAudioPlaying = false;

    updateAudioControl(
        false,
        "Activar música"
    );
}


function handleAudioCanPlay() {
    isAudioAvailable = true;

    audioControl.disabled = false;
}


function handleAudioError() {
    isAudioAvailable = false;
    isAudioPlaying = false;

    audioControl.disabled = false;

    updateAudioControl(
        false,
        "Sin archivo de música"
    );

    showAudioStatus(
        "No se encontró musica.mp3"
    );
}


function updateAudioControl(
    playing,
    label
) {
    if (
        !audioControl ||
        !audioControlIcon ||
        !audioControlText
    ) {
        return;
    }

    audioControl.classList.toggle(
        "is-playing",
        playing
    );

    audioControl.setAttribute(
        "aria-pressed",
        String(playing)
    );

    audioControlIcon.textContent =
        playing
            ? "♫"
            : "♪";

    audioControlText.textContent =
        label;
}


function showAudioStatus(
    message
) {
    if (!audioStatus) {
        return;
    }

    audioStatus.textContent =
        message;

    audioStatus.classList.add(
        "is-visible"
    );

    window.setTimeout(
        () => {
            audioStatus.classList.remove(
                "is-visible"
            );
        },
        2400
    );
}


/* ---------------------------------------------------------
   REALISMO GALÁCTICO
--------------------------------------------------------- */

function createDetailedStarTexture() {
    const textureCanvas =
        document.createElement("canvas");

    textureCanvas.width = 256;
    textureCanvas.height = 256;

    const context =
        textureCanvas.getContext("2d");

    const radial =
        context.createRadialGradient(
            128, 128, 0,
            128, 128, 128
        );

    radial.addColorStop(
        0,
        "rgba(255,255,255,1)"
    );

    radial.addColorStop(
        0.045,
        "rgba(255,255,255,1)"
    );

    radial.addColorStop(
        0.12,
        "rgba(210,225,255,0.9)"
    );

    radial.addColorStop(
        0.35,
        "rgba(120,160,255,0.26)"
    );

    radial.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );

    context.fillStyle = radial;
    context.fillRect(0, 0, 256, 256);

    context.save();
    context.translate(128, 128);

    const beam =
        context.createLinearGradient(
            -128, 0, 128, 0
        );

    beam.addColorStop(
        0,
        "rgba(255,255,255,0)"
    );

    beam.addColorStop(
        0.48,
        "rgba(220,235,255,0.42)"
    );

    beam.addColorStop(
        0.5,
        "rgba(255,255,255,0.9)"
    );

    beam.addColorStop(
        0.52,
        "rgba(220,235,255,0.42)"
    );

    beam.addColorStop(
        1,
        "rgba(255,255,255,0)"
    );

    context.fillStyle = beam;
    context.fillRect(
        -128,
        -2,
        256,
        4
    );

    context.rotate(Math.PI / 2);

    context.fillStyle = beam;
    context.fillRect(
        -128,
        -1.4,
        256,
        2.8
    );

    context.restore();

    const texture =
        new THREE.CanvasTexture(
            textureCanvas
        );

    texture.colorSpace =
        THREE.SRGBColorSpace;

    return texture;
}


function createDetailedStars() {
    detailedStarGroup =
        new THREE.Group();

    detailedStarGroup.name =
        "DetailedStarGroup";

    const texture =
        createDetailedStarTexture();

    detailedStars = [];

    for (
        let index = 0;
        index < REALISM_CONFIG
            .detailedStarCount;
        index += 1
    ) {
        const material =
            new THREE.SpriteMaterial({
                map: texture,
                color:
                    index % 4 === 0
                        ? 0xffd9f1
                        : index % 4 === 1
                            ? 0xbcd5ff
                            : 0xffffff,
                transparent: true,
                opacity:
                    randomBetween(
                        0.42,
                        0.88
                    ),
                depthWrite: false,
                blending:
                    THREE.AdditiveBlending
            });

        const star =
            new THREE.Sprite(
                material
            );

        const radius =
            randomBetween(
                18,
                70
            );

        const angle =
            randomBetween(
                0,
                Math.PI * 2
            );

        star.position.set(
            Math.cos(angle) *
                radius,
            randomBetween(
                -22,
                22
            ),
            randomBetween(
                -18,
                -100
            )
        );

        const scale =
            randomBetween(
                0.7,
                2.2
            );

        star.scale.set(
            scale,
            scale,
            1
        );

        star.userData = {
            baseScale: scale,
            baseOpacity:
                material.opacity,
            phase:
                randomBetween(
                    0,
                    Math.PI * 2
                )
        };

        detailedStars.push(
            star
        );

        detailedStarGroup.add(
            star
        );
    }

    scene.add(
        detailedStarGroup
    );
}


function createGalaxyTexture(
    innerColor,
    outerColor
) {
    const textureCanvas =
        document.createElement("canvas");

    textureCanvas.width = 512;
    textureCanvas.height = 512;

    const context =
        textureCanvas.getContext("2d");

    context.translate(
        256,
        256
    );

    for (
        let arm = 0;
        arm < 4;
        arm += 1
    ) {
        context.save();
        context.rotate(
            arm *
            Math.PI /
            2
        );

        for (
            let index = 0;
            index < 150;
            index += 1
        ) {
            const t =
                index /
                150;

            const angle =
                t *
                Math.PI *
                3.2;

            const radius =
                t *
                205;

            const x =
                Math.cos(angle) *
                radius;

            const y =
                Math.sin(angle) *
                radius *
                0.36;

            const size =
                randomBetween(
                    1,
                    4.5
                ) *
                (1 - t * 0.55);

            context.fillStyle =
                index % 3 === 0
                    ? innerColor
                    : outerColor;

            context.globalAlpha =
                randomBetween(
                    0.08,
                    0.42
                ) *
                (1 - t * 0.35);

            context.beginPath();
            context.arc(
                x +
                randomBetween(-12, 12),
                y +
                randomBetween(-8, 8),
                size,
                0,
                Math.PI * 2
            );
            context.fill();
        }

        context.restore();
    }

    const core =
        context.createRadialGradient(
            0, 0, 0,
            0, 0, 95
        );

    core.addColorStop(
        0,
        "rgba(255,255,255,0.95)"
    );

    core.addColorStop(
        0.2,
        innerColor
    );

    core.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );

    context.globalAlpha = 1;
    context.fillStyle = core;
    context.fillRect(
        -256,
        -256,
        512,
        512
    );

    const texture =
        new THREE.CanvasTexture(
            textureCanvas
        );

    texture.colorSpace =
        THREE.SRGBColorSpace;

    return texture;
}


function createGalaxies() {
    galaxyGroup =
        new THREE.Group();

    galaxyGroup.name =
        "GalaxyGroup";

    galaxies = [];

    const textures = [
        createGalaxyTexture(
            "rgba(180,205,255,0.7)",
            "rgba(90,120,255,0.25)"
        ),
        createGalaxyTexture(
            "rgba(255,188,230,0.62)",
            "rgba(160,80,190,0.24)"
        ),
        createGalaxyTexture(
            "rgba(240,220,255,0.62)",
            "rgba(120,95,210,0.22)"
        )
    ];

    const positions = isSmallScreen
        ? [
            [-18, 10, -70],
            [24, -12, -92]
        ]
        : [
            [-24, 12, -72],
            [29, -16, -98],
            [8, 26, -120]
        ];

    positions.forEach(
        (
            position,
            index
        ) => {
            const material =
                new THREE.SpriteMaterial({
                    map:
                        textures[
                            index %
                            textures.length
                        ],
                    transparent: true,
                    opacity:
                        index === 0
                            ? 0.34
                            : 0.24,
                    depthWrite: false,
                    blending:
                        THREE.AdditiveBlending
                });

            const galaxy =
                new THREE.Sprite(
                    material
                );

            galaxy.position.set(
                position[0],
                position[1],
                position[2]
            );

            const scale =
                index === 0
                    ? 34
                    : 27;

            galaxy.scale.set(
                scale,
                scale * 0.62,
                1
            );

            galaxy.material.rotation =
                randomBetween(
                    0,
                    Math.PI * 2
                );

            galaxy.userData = {
                baseOpacity:
                    material.opacity,
                phase:
                    index *
                    1.7,
                rotationSpeed:
                    randomBetween(
                        -0.0008,
                        0.0008
                    )
            };

            galaxies.push(
                galaxy
            );

            galaxyGroup.add(
                galaxy
            );
        }
    );

    scene.add(
        galaxyGroup
    );
}


function createAsteroidField() {
    asteroidGroup =
        new THREE.Group();

    asteroidGroup.name =
        "AsteroidGroup";

    asteroids = [];

    for (
        let index = 0;
        index < REALISM_CONFIG
            .asteroidCount;
        index += 1
    ) {
        const geometry =
            new THREE.IcosahedronGeometry(
                randomBetween(
                    0.18,
                    0.72
                ),
                1
            );

        const positionAttribute =
            geometry.getAttribute(
                "position"
            );

        for (
            let vertexIndex = 0;
            vertexIndex < positionAttribute.count;
            vertexIndex += 1
        ) {
            const factor =
                randomBetween(
                    0.78,
                    1.18
                );

            positionAttribute.setXYZ(
                vertexIndex,
                positionAttribute.getX(vertexIndex) * factor,
                positionAttribute.getY(vertexIndex) * factor,
                positionAttribute.getZ(vertexIndex) * factor
            );
        }

        positionAttribute.needsUpdate =
            true;

        geometry.computeVertexNormals();

        const material =
            new THREE.MeshStandardMaterial({
                color:
                    index % 2 === 0
                        ? 0x3f4250
                        : 0x5b5361,
                roughness: 0.94,
                metalness: 0.08
            });

        const asteroid =
            new THREE.Mesh(
                geometry,
                material
            );

        const angle =
            randomBetween(
                0,
                Math.PI * 2
            );

        const radius =
            randomBetween(
                12,
                28
            );

        asteroid.position.set(
            Math.cos(angle) *
                radius,
            randomBetween(
                -11,
                12
            ),
            randomBetween(
                -18,
                -68
            )
        );

        asteroid.rotation.set(
            randomBetween(
                0,
                Math.PI
            ),
            randomBetween(
                0,
                Math.PI
            ),
            randomBetween(
                0,
                Math.PI
            )
        );

        asteroid.userData = {
            rotationSpeed:
                new THREE.Vector3(
                    randomBetween(
                        -0.006,
                        0.006
                    ),
                    randomBetween(
                        -0.008,
                        0.008
                    ),
                    randomBetween(
                        -0.005,
                        0.005
                    )
                ),
            drift:
                randomBetween(
                    0.0008,
                    0.0024
                ),
            phase:
                index *
                0.71
        };

        asteroids.push(
            asteroid
        );

        asteroidGroup.add(
            asteroid
        );
    }

    scene.add(
        asteroidGroup
    );
}


function createDistantSun(){ const radius=isSmallScreen?3.2:4.2;const c=document.createElement("canvas");c.width=512;c.height=256;const x=c.getContext("2d");const g=x.createLinearGradient(0,0,512,256);g.addColorStop(0,"#ff7a1f");g.addColorStop(0.26,"#ffb234");g.addColorStop(0.52,"#fff2a6");g.addColorStop(0.76,"#ffc14a");g.addColorStop(1,"#ff6e1c");x.fillStyle=g;x.fillRect(0,0,512,256);for(let i=0;i<260;i++){x.globalAlpha=randomBetween(0.025,0.16);x.fillStyle=i%3===0?"#fff8d7":i%3===1?"#f06c1b":"#ffd46c";x.beginPath();x.arc(randomBetween(0,512),randomBetween(0,256),randomBetween(2,16),0,Math.PI*2);x.fill();}x.globalAlpha=1;const tex=new THREE.CanvasTexture(c);tex.colorSpace=THREE.SRGBColorSpace;tex.wrapS=THREE.RepeatWrapping;distantSun=new THREE.Mesh(new THREE.SphereGeometry(radius,64,48),new THREE.MeshBasicMaterial({map:tex,color:0xffffff}));distantSun.position.set(-34,18,-105);distantSunGlow=new THREE.Sprite(new THREE.SpriteMaterial({map:createSolarCoronaTexture(),color:0xffaa42,transparent:true,opacity:0.42,depthWrite:false,blending:THREE.AdditiveBlending}));distantSunGlow.position.copy(distantSun.position);distantSunGlow.scale.set(25,25,1);scene.add(distantSun,distantSunGlow);}


function createHiddenBirthdayMessage() {
    birthdayMessageGroup =
        new THREE.Group();

    birthdayMessageGroup.name =
        "BirthdayMessageGroup";

    const textCanvas =
        document.createElement("canvas");

    textCanvas.width = 900;
    textCanvas.height = 220;

    const context =
        textCanvas.getContext("2d");

    context.clearRect(
        0,
        0,
        textCanvas.width,
        textCanvas.height
    );

    context.fillStyle =
        "#ffffff";

    context.font =
        "700 92px Georgia";

    context.textAlign =
        "center";

    context.textBaseline =
        "middle";

    context.fillText(
        "Feliz cumpleaños Dani",
        textCanvas.width / 2,
        textCanvas.height / 2
    );

    const imageData =
        context.getImageData(
            0,
            0,
            textCanvas.width,
            textCanvas.height
        );

    const targetPositions = [];

    const step =
        isSmallScreen
            ? 10
            : 8;

    for (
        let y = 0;
        y < textCanvas.height;
        y += step
    ) {
        for (
            let x = 0;
            x < textCanvas.width;
            x += step
        ) {
            const alpha =
                imageData.data[
                    (
                        y *
                        textCanvas.width +
                        x
                    ) *
                    4 +
                    3
                ];

            if (
                alpha > 120
            ) {
                targetPositions.push(
                    new THREE.Vector3(
                        (
                            x -
                            textCanvas.width /
                            2
                        ) *
                        0.018,
                        (
                            textCanvas.height /
                            2 -
                            y
                        ) *
                        0.018,
                        0
                    )
                );
            }
        }
    }

    const maxPoints =
        isSmallScreen
            ? 520
            : 820;

    birthdayMessageTargetPositions =
        targetPositions
            .sort(
                () =>
                    Math.random() -
                    0.5
            )
            .slice(
                0,
                maxPoints
            );

    birthdayMessageScatterPositions =
        birthdayMessageTargetPositions
            .map(
                () =>
                    new THREE.Vector3(
                        randomBetween(
                            -18,
                            18
                        ),
                        randomBetween(
                            -8,
                            8
                        ),
                        randomBetween(
                            -8,
                            8
                        )
                    )
            );

    const positions =
        new Float32Array(
            birthdayMessageTargetPositions
                .length *
            3
        );

    birthdayMessageScatterPositions
        .forEach(
            (
                position,
                index
            ) => {
                positions[
                    index * 3
                ] =
                    position.x;

                positions[
                    index * 3 + 1
                ] =
                    position.y;

                positions[
                    index * 3 + 2
                ] =
                    position.z;
            }
        );

    const geometry =
        new THREE.BufferGeometry();

    geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(
            positions,
            3
        )
    );

    const material =
        new THREE.PointsMaterial({
            size:
                isSmallScreen
                    ? 0.19
                    : 0.15,
            color: 0xf4e7ff,
            transparent: true,
            opacity: 0.5,
            depthWrite: false,
            blending:
                THREE.AdditiveBlending,
            map:
                createStarTexture(),
            alphaMap:
                createStarTexture()
        });

    birthdayMessagePoints =
        new THREE.Points(
            geometry,
            material
        );

    birthdayMessageGroup.add(
        birthdayMessagePoints
    );

    birthdayMessageGroup.position.set(
        0,
        2,
        -32
    );

    birthdayMessageGroup.rotation.y =
        0.26;

    birthdayMessageGroup.visible =
        true;

    scene.add(
        birthdayMessageGroup
    );
}


function revealHiddenBirthdayMessage() {
    if (
        birthdayMessageState !==
        "hidden"
    ) {
        return;
    }

    birthdayMessageState =
        "revealing";

    birthdayMessageTimer =
        0;

    hiddenBirthdayHint.classList.add(
        "is-visible"
    );

    hiddenBirthdayHint.setAttribute(
        "aria-hidden",
        "false"
    );
}


function scatterHiddenBirthdayMessage() {
    birthdayMessageState =
        "scattering";

    birthdayMessageTimer =
        0;

    hiddenBirthdayHint.classList.remove(
        "is-visible"
    );

    hiddenBirthdayHint.setAttribute(
        "aria-hidden",
        "true"
    );
}



/* ---------------------------------------------------------
   PROFUNDIDAD Y REALISMO DEL UNIVERSO
--------------------------------------------------------- */

function createDeepStarField() {
    const count =
        POLISH_CONFIG.deepStarCount;

    const geometry =
        new THREE.BufferGeometry();

    const positions =
        new Float32Array(
            count *
            3
        );

    const colors =
        new Float32Array(
            count *
            3
        );

    deepStarTwinkleData = [];

    for (
        let index = 0;
        index < count;
        index += 1
    ) {
        const offset =
            index *
            3;

        const radius =
            randomBetween(
                75,
                230
            );

        const theta =
            randomBetween(
                0,
                Math.PI *
                2
            );

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

        const temperature =
            Math.random();

        if (
            temperature <
            0.64
        ) {
            colors[offset] =
                randomBetween(
                    0.72,
                    1
                );

            colors[offset + 1] =
                randomBetween(
                    0.76,
                    1
                );

            colors[offset + 2] =
                1;
        } else if (
            temperature <
            0.86
        ) {
            colors[offset] =
                1;

            colors[offset + 1] =
                randomBetween(
                    0.72,
                    0.92
                );

            colors[offset + 2] =
                randomBetween(
                    0.58,
                    0.78
                );
        } else {
            colors[offset] =
                randomBetween(
                    0.7,
                    0.88
                );

            colors[offset + 1] =
                randomBetween(
                    0.82,
                    0.96
                );

            colors[offset + 2] =
                1;
        }

        deepStarTwinkleData.push({
            phase:
                randomBetween(
                    0,
                    Math.PI *
                    2
                ),
            speed:
                randomBetween(
                    0.2,
                    1.1
                )
        });
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

    const material =
        new THREE.PointsMaterial({
            size:
                isSmallScreen
                    ? 0.22
                    : 0.17,

            map:
                createStarTexture(),

            alphaMap:
                createStarTexture(),

            transparent: true,
            opacity: 0.68,
            vertexColors: true,
            sizeAttenuation: true,
            depthWrite: false,
            blending:
                THREE.AdditiveBlending
        });

    deepStarField =
        new THREE.Points(
            geometry,
            material
        );

    deepStarField.name =
        "DeepStarField";

    scene.add(
        deepStarField
    );
}


function createGalacticBandTexture(
    colorA,
    colorB,
    dustColor
) {
    const textureCanvas =
        document.createElement(
            "canvas"
        );

    textureCanvas.width =
        1024;

    textureCanvas.height =
        256;

    const context =
        textureCanvas.getContext(
            "2d"
        );

    context.clearRect(
        0,
        0,
        1024,
        256
    );

    const bandGradient =
        context.createLinearGradient(
            0,
            0,
            0,
            256
        );

    bandGradient.addColorStop(
        0,
        "rgba(0,0,0,0)"
    );

    bandGradient.addColorStop(
        0.28,
        colorA
    );

    bandGradient.addColorStop(
        0.5,
        colorB
    );

    bandGradient.addColorStop(
        0.72,
        colorA
    );

    bandGradient.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );

    context.fillStyle =
        bandGradient;

    context.fillRect(
        0,
        0,
        1024,
        256
    );

    for (
        let index = 0;
        index < 420;
        index += 1
    ) {
        const x =
            randomBetween(
                0,
                1024
            );

        const y =
            randomBetween(
                58,
                198
            );

        const radius =
            randomBetween(
                0.5,
                2.8
            );

        context.globalAlpha =
            randomBetween(
                0.14,
                0.65
            );

        context.fillStyle =
            index % 3 === 0
                ? "#ffffff"
                : index % 3 === 1
                    ? "#c9d7ff"
                    : "#f0c7e8";

        context.beginPath();

        context.arc(
            x,
            y,
            radius,
            0,
            Math.PI *
            2
        );

        context.fill();
    }

    for (
        let index = 0;
        index < 36;
        index += 1
    ) {
        const x =
            randomBetween(
                0,
                1024
            );

        const y =
            randomBetween(
                88,
                168
            );

        const width =
            randomBetween(
                50,
                190
            );

        const height =
            randomBetween(
                5,
                18
            );

        context.globalAlpha =
            randomBetween(
                0.04,
                0.13
            );

        context.fillStyle =
            dustColor;

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
            Math.PI *
            2
        );

        context.fill();
    }

    context.globalAlpha =
        1;

    const texture =
        new THREE.CanvasTexture(
            textureCanvas
        );

    texture.colorSpace =
        THREE.SRGBColorSpace;

    return texture;
}


function createGalacticBand() {
    galacticBandGroup =
        new THREE.Group();

    galacticBandGroup.name =
        "GalacticBandGroup";

    galacticBandLayers = [];

    const textures = [
        createGalacticBandTexture(
            "rgba(74,98,190,0.08)",
            "rgba(160,185,255,0.18)",
            "rgba(8,8,22,0.8)"
        ),
        createGalacticBandTexture(
            "rgba(130,72,160,0.07)",
            "rgba(230,156,210,0.14)",
            "rgba(12,7,20,0.82)"
        ),
        createGalacticBandTexture(
            "rgba(78,112,170,0.05)",
            "rgba(188,205,255,0.1)",
            "rgba(5,8,20,0.82)"
        )
    ];

    for (
        let index = 0;
        index < POLISH_CONFIG
            .galacticBandLayerCount;
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
                        0.16,
                        0.31
                    ),

                depthWrite: false,

                blending:
                    THREE.AdditiveBlending
            });

        const layer =
            new THREE.Sprite(
                material
            );

        layer.position.set(
            randomBetween(
                -8,
                8
            ),
            randomBetween(
                -4,
                4
            ),
            -110 -
            index *
            12
        );

        const width =
            185 +
            index *
            16;

        layer.scale.set(
            width,
            38 +
            index *
            7,
            1
        );

        layer.material.rotation =
            -0.34 +
            randomBetween(
                -0.05,
                0.05
            );

        layer.userData = {
            baseOpacity:
                material.opacity,

            phase:
                index *
                0.9,

            rotationSpeed:
                randomBetween(
                    -0.00012,
                    0.00012
                )
        };

        galacticBandLayers.push(
            layer
        );

        galacticBandGroup.add(
            layer
        );
    }

    galacticBandGroup.rotation.z =
        -0.16;

    scene.add(
        galacticBandGroup
    );
}


function createSolarCoronaTexture() {
    const textureCanvas =
        document.createElement(
            "canvas"
        );

    textureCanvas.width =
        512;

    textureCanvas.height =
        512;

    const context =
        textureCanvas.getContext(
            "2d"
        );

    const gradient =
        context.createRadialGradient(
            256,
            256,
            0,
            256,
            256,
            256
        );

    gradient.addColorStop(
        0,
        "rgba(255,255,255,1)"
    );

    gradient.addColorStop(
        0.09,
        "rgba(255,244,203,0.98)"
    );

    gradient.addColorStop(
        0.22,
        "rgba(255,187,86,0.78)"
    );

    gradient.addColorStop(
        0.48,
        "rgba(255,112,34,0.24)"
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
        512,
        512
    );

    const texture =
        new THREE.CanvasTexture(
            textureCanvas
        );

    texture.colorSpace =
        THREE.SRGBColorSpace;

    return texture;
}


function createSolarFlareTexture() {
    const textureCanvas =
        document.createElement(
            "canvas"
        );

    textureCanvas.width =
        256;

    textureCanvas.height =
        128;

    const context =
        textureCanvas.getContext(
            "2d"
        );

    const gradient =
        context.createLinearGradient(
            0,
            64,
            256,
            64
        );

    gradient.addColorStop(
        0,
        "rgba(255,230,150,0)"
    );

    gradient.addColorStop(
        0.25,
        "rgba(255,205,110,0.28)"
    );

    gradient.addColorStop(
        0.58,
        "rgba(255,124,38,0.5)"
    );

    gradient.addColorStop(
        1,
        "rgba(255,90,18,0)"
    );

    context.fillStyle =
        gradient;

    context.beginPath();

    context.ellipse(
        128,
        64,
        118,
        26,
        0,
        0,
        Math.PI *
        2
    );

    context.fill();

    const texture =
        new THREE.CanvasTexture(
            textureCanvas
        );

    texture.colorSpace =
        THREE.SRGBColorSpace;

    return texture;
}


function enhanceDistantSun() {
    if (!distantSun) {
        return;
    }

    distantSun.material.dispose();

    const sunTextureCanvas =
        document.createElement(
            "canvas"
        );

    sunTextureCanvas.width =
        512;

    sunTextureCanvas.height =
        256;

    const context =
        sunTextureCanvas.getContext(
            "2d"
        );

    const baseGradient =
        context.createLinearGradient(
            0,
            0,
            512,
            256
        );

    baseGradient.addColorStop(
        0,
        "#ff8a2d"
    );

    baseGradient.addColorStop(
        0.32,
        "#ffc45c"
    );

    baseGradient.addColorStop(
        0.58,
        "#fff1af"
    );

    baseGradient.addColorStop(
        1,
        "#ff982e"
    );

    context.fillStyle =
        baseGradient;

    context.fillRect(
        0,
        0,
        512,
        256
    );

    for (
        let index = 0;
        index < 210;
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
                2,
                17
            );

        context.globalAlpha =
            randomBetween(
                0.03,
                0.17
            );

        context.fillStyle =
            index % 2 === 0
                ? "#fff8d8"
                : "#e97020";

        context.beginPath();

        context.arc(
            x,
            y,
            radius,
            0,
            Math.PI *
            2
        );

        context.fill();
    }

    context.globalAlpha =
        1;

    const surfaceTexture =
        new THREE.CanvasTexture(
            sunTextureCanvas
        );

    surfaceTexture.colorSpace =
        THREE.SRGBColorSpace;

    surfaceTexture.wrapS =
        THREE.RepeatWrapping;

    distantSun.material =
        new THREE.MeshBasicMaterial({
            map:
                surfaceTexture,

            color:
                0xffffff
        });

    solarCoronaGroup =
        new THREE.Group();

    solarCoronaGroup.position.copy(
        distantSun.position
    );

    solarCoronaLayers = [];

    const coronaTexture =
        createSolarCoronaTexture();

    for (
        let index = 0;
        index < 4;
        index += 1
    ) {
        const corona =
            new THREE.Sprite(
                new THREE.SpriteMaterial({
                    map:
                        coronaTexture,

                    color:
                        index < 2
                            ? 0xffb24f
                            : 0xff6f2f,

                    transparent: true,

                    opacity:
                        0.22 -
                        index *
                        0.035,

                    depthWrite: false,

                    blending:
                        THREE.AdditiveBlending
                })
            );

        const scale =
            17 +
            index *
            7;

        corona.scale.set(
            scale,
            scale,
            1
        );

        corona.userData = {
            baseScale:
                scale,

            baseOpacity:
                corona.material.opacity,

            phase:
                index *
                0.8
        };

        solarCoronaLayers.push(
            corona
        );

        solarCoronaGroup.add(
            corona
        );
    }

    solarFlareGroup =
        new THREE.Group();

    solarFlareGroup.position.copy(
        distantSun.position
    );

    solarFlares = [];

    const flareTexture =
        createSolarFlareTexture();

    for (
        let index = 0;
        index < POLISH_CONFIG
            .solarFlareCount;
        index += 1
    ) {
        const flare =
            new THREE.Sprite(
                new THREE.SpriteMaterial({
                    map:
                        flareTexture,

                    color:
                        index % 2 === 0
                            ? 0xffb34f
                            : 0xff7f36,

                    transparent: true,

                    opacity:
                        randomBetween(
                            0.12,
                            0.29
                        ),

                    depthWrite: false,

                    blending:
                        THREE.AdditiveBlending
                })
            );

        const angle =
            (
                index /
                POLISH_CONFIG
                    .solarFlareCount
            ) *
            Math.PI *
            2;

        const radius =
            randomBetween(
                3.8,
                5.8
            );

        flare.position.set(
            Math.cos(angle) *
                radius,
            Math.sin(angle) *
                radius,
            0
        );

        flare.material.rotation =
            angle;

        const width =
            randomBetween(
                4.5,
                8.5
            );

        flare.scale.set(
            width,
            randomBetween(
                0.8,
                1.9
            ),
            1
        );

        flare.userData = {
            baseOpacity:
                flare.material
                    .opacity,

            phase:
                index *
                0.73,

            orbitSpeed:
                randomBetween(
                    -0.00045,
                    0.00045
                )
        };

        solarFlares.push(
            flare
        );

        solarFlareGroup.add(
            flare
        );
    }

    scene.add(
        solarCoronaGroup,
        solarFlareGroup
    );
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
    handleCosmicPointerDown,
    { passive: true }
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

journeyFinalMessage.addEventListener(
    "click",
    hideJourneyFinalMessage
);

audioControl.addEventListener(
    "click",
    toggleBackgroundMusic
);

backgroundMusic.addEventListener(
    "playing",
    handleAudioPlaying
);

backgroundMusic.addEventListener(
    "pause",
    handleAudioPaused
);

backgroundMusic.addEventListener(
    "error",
    handleAudioError
);

backgroundMusic.addEventListener(
    "canplay",
    handleAudioCanPlay
);

replayJourneyButton.addEventListener(
    "click",
    replayJourney
);

continueExploringButton.addEventListener(
    "click",
    hideFinalScene
);

finalScene.addEventListener(
    "click",
    handleFinalSceneBackgroundClick
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



function handleUniverseDragStart(
    event
) {
    if (
        isConstellationMessageOpen ||
        event.target?.closest?.(
            "button, nav, section"
        )
    ) {
        return;
    }

    isDraggingUniverse =
        true;

    dragStartX =
        event.clientX;

    dragStartY =
        event.clientY;

    dragLastX =
        event.clientX;

    dragLastY =
        event.clientY;

    cosmicNavigationHint.classList.add(
        "is-active"
    );
}


function handleUniverseDragMove(
    event
) {
    if (!isDraggingUniverse) {
        return;
    }

    const deltaX =
        event.clientX -
        dragLastX;

    const deltaY =
        event.clientY -
        dragLastY;

    dragLastX =
        event.clientX;

    dragLastY =
        event.clientY;

    totalDragDistance +=
        Math.hypot(
            deltaX,
            deltaY
        );

    targetUniverseYaw +=
        deltaX *
        0.0028;

    targetUniversePitch +=
        deltaY *
        0.0022;

    targetUniversePitch =
        THREE.MathUtils.clamp(
            targetUniversePitch,
            -0.42,
            0.42
        );

    if (
        totalDragDistance >=
        REALISM_CONFIG
            .birthdayRevealDragDistance
    ) {
        revealHiddenBirthdayMessage();
    }
}


function handleUniverseDragEnd() {
    isDraggingUniverse =
        false;

    cosmicNavigationHint.classList.remove(
        "is-active"
    );
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


function handleCosmicPointerDown(
    event
) {
    if (
        !camera ||
        !interactiveStarGroup ||
        isConstellationMessageOpen
    ) {
        return;
    }

    cosmicPointer.x =
        (
            event.clientX /
            window.innerWidth
        ) *
        2 -
        1;

    cosmicPointer.y =
        -(
            (
                event.clientY /
                window.innerHeight
            ) *
            2 -
            1
        );

    cosmicRaycaster.setFromCamera(
        cosmicPointer,
        camera
    );

    const intersections =
        cosmicRaycaster.intersectObjects(
            interactiveStars,
            true
        );

    const selectedIntersection =
        intersections.find(
            (intersection) =>
                intersection.object
                    ?.userData
                    ?.isInteractiveCosmicStar
        );

    if (!selectedIntersection) {
        return;
    }

    const starIndex =
        selectedIntersection.object
            .userData
            .starIndex;

    triggerInteractiveStar(
        interactiveStars[
            starIndex
        ]
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

    const selectedStar = activeConstellationStars[selectedIndex];

    triggerConstellationStarEffect(selectedStar);

    const activeData =
        CONSTELLATION_DATA[activeConstellationIndex];

    const messages =
        activeData?.messages ?? [
            "Entre todas las estrellas, siempre elegiría encontrarte a ti."
        ];

    constellationMessageTitle.textContent =
        activeData?.name ?? "Siempre tú";

    constellationMessageText.textContent =
        messages[selectedIndex % messages.length];

    hideJourneyFinalMessage();
    hideFinalScene();

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

    if (proceduralUniverseMaterial) {
        proceduralUniverseMaterial.uniforms
            .uResolution.value
            .set(
                width,
                height
            );
    }
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

    if (
        userRequestedAudio &&
        isAudioAvailable
    ) {
        playBackgroundMusic();
    }

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
animateShootingStars(elapsedTime);
animateInteractiveStars(elapsedTime);
animateStardust(elapsedTime);
animateDetailedStars(elapsedTime);
animateProceduralUniverse(elapsedTime);
    animateRefinedMilkyWay(elapsedTime);
    animateCosmicDust(elapsedTime);
    animateStarShockwaves(elapsedTime);
    animateDeepStarField(elapsedTime);
animateGalacticBand(elapsedTime);
animateGalaxies(elapsedTime);
animateAsteroids(elapsedTime);
animateDistantSun(elapsedTime);
animateEnhancedSun(elapsedTime);
animateHiddenBirthdayMessage(elapsedTime);
applyUniverseNavigation();
animateConstellation(elapsedTime);
animateCamera(elapsedTime);
updateJourneyNarrative();
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



function animateShootingStars(
    elapsedTime
) {
    if (!shootingStarGroup) {
        return;
    }

    const delta =
        clock
            ? Math.min(
                clock.getDelta(),
                0.05
            )
            : 0.016;

    shootingStars.forEach(
        (shootingStar) => {
            const data =
                shootingStar.userData;

            if (!data.active) {
                data.elapsed +=
                    delta;

                if (
                    data.elapsed >=
                    data.delay
                ) {
                    data.elapsed =
                        0;

                    data.delay =
                        randomBetween(
                            COSMIC_CONFIG
                                .shootingStarMinimumDelay,
                            COSMIC_CONFIG
                                .shootingStarMaximumDelay
                        );

                    resetShootingStar(
                        shootingStar
                    );
                }

                return;
            }

            data.life +=
                delta;

            shootingStar.translateX(
                data.speed *
                delta
            );

            const normalizedLife =
                THREE.MathUtils.clamp(
                    data.life /
                    data.duration,
                    0,
                    1
                );

            shootingStar.material.opacity =
                Math.sin(
                    normalizedLife *
                    Math.PI
                ) *
                0.9;

            if (
                normalizedLife >=
                1
            ) {
                data.active =
                    false;

                shootingStar.visible =
                    false;

                shootingStar.material.opacity =
                    0;
            }
        }
    );
}


function animateInteractiveStars(
    elapsedTime
) {
    if (!interactiveStarGroup) {
        return;
    }

    const motionMultiplier =
        prefersReducedMotion
            ? 0.2
            : 1;

    interactiveStars.forEach(
        (star) => {
            const data =
                star.userData;

            if (data.escaped) {
                data.escapeProgress +=
                    0.028 *
                    motionMultiplier;

                star.position.addScaledVector(
                    data.escapeDirection,
                    0.025 *
                    motionMultiplier
                );

                star.scale.multiplyScalar(
                    0.965
                );

                if (
                    star.scale.x <
                    0.05
                ) {
                    star.visible =
                        false;
                }

                return;
            }

            star.position.y =
                data.basePosition.y +
                Math.sin(
                    elapsedTime *
                    0.7 +
                    data.phase
                ) *
                0.16 *
                motionMultiplier;

            star.position.x =
                data.basePosition.x +
                Math.cos(
                    elapsedTime *
                    0.45 +
                    data.phase
                ) *
                0.08 *
                motionMultiplier;

            const pulse =
                1 +
                Math.sin(
                    elapsedTime *
                    1.6 +
                    data.phase
                ) *
                0.12 *
                motionMultiplier;

            star.scale.setScalar(
                pulse
            );

            if (
                data.glow?.material
            ) {
                data.glow.material.opacity =
                    0.68 +
                    Math.sin(
                        elapsedTime *
                        1.4 +
                        data.phase
                    ) *
                    0.18 *
                    motionMultiplier;
            }
        }
    );
}


function animateStardust(
    elapsedTime
) {
    if (
        !stardustGroup ||
        stardustBursts.length === 0
    ) {
        return;
    }

    const delta =
        0.016;

    for (
        let burstIndex =
            stardustBursts.length -
            1;

        burstIndex >= 0;
        burstIndex -= 1
    ) {
        const burst =
            stardustBursts[
                burstIndex
            ];

        const data =
            burst.userData;

        data.age +=
            delta;

        const normalizedAge =
            THREE.MathUtils.clamp(
                data.age /
                data.duration,
                0,
                1
            );

        const positionAttribute =
            burst.geometry
                .getAttribute(
                    "position"
                );

        for (
            let index = 0;
            index < positionAttribute.count;
            index += 1
        ) {
            const velocity =
                data.velocities[
                    index
                ];

            positionAttribute.setXYZ(
                index,

                positionAttribute.getX(
                    index
                ) +
                velocity.x *
                delta,

                positionAttribute.getY(
                    index
                ) +
                velocity.y *
                delta,

                positionAttribute.getZ(
                    index
                ) +
                velocity.z *
                delta
            );

            velocity.multiplyScalar(
                0.972
            );
        }

        positionAttribute.needsUpdate =
            true;

        burst.material.opacity =
            1 -
            normalizedAge;

        burst.material.size =
            (
                isSmallScreen
                    ? 0.34
                    : 0.27
            ) *
            (
                1 -
                normalizedAge *
                0.45
            );

        if (
            normalizedAge >=
            1
        ) {
            stardustGroup.remove(
                burst
            );

            burst.geometry.dispose();

            burst.material.map
                ?.dispose();

            burst.material.alphaMap
                ?.dispose();

            burst.material.dispose();

            stardustBursts.splice(
                burstIndex,
                1
            );
        }
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

    constellationGroups.forEach((group, groupIndex) => {
        if (!group.visible) {
            return;
        }

        if (groupIndex === 3) {
            group.rotation.z =
                Math.sin(elapsedTime * 0.22) *
                0.035 *
                motionMultiplier;

            group.position.x =
                Math.sin(elapsedTime * 0.18) *
                0.12 *
                motionMultiplier;
        } else {
            group.rotation.z +=
                (0 - group.rotation.z) *
                0.06;

            group.position.x +=
                (0 - group.position.x) *
                0.06;
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




function animateDetailedStars(
    elapsedTime
) {
    if (!detailedStarGroup) {
        return;
    }

    detailedStars.forEach(
        (star) => {
            const pulse =
                1 +
                Math.sin(
                    elapsedTime *
                    1.45 +
                    star.userData.phase
                ) *
                0.16;

            const scale =
                star.userData
                    .baseScale *
                pulse;

            star.scale.set(
                scale,
                scale,
                1
            );

            star.material.opacity =
                star.userData
                    .baseOpacity +
                Math.sin(
                    elapsedTime *
                    1.7 +
                    star.userData.phase
                ) *
                0.14;
        }
    );
}


function animateGalaxies(
    elapsedTime
) {
    if (!galaxyGroup) {
        return;
    }

    galaxies.forEach(
        (galaxy) => {
            galaxy.material.rotation +=
                galaxy.userData
                    .rotationSpeed;

            galaxy.material.opacity =
                galaxy.userData
                    .baseOpacity +
                Math.sin(
                    elapsedTime *
                    0.2 +
                    galaxy.userData
                        .phase
                ) *
                0.04;
        }
    );
}


function animateAsteroids(
    elapsedTime
) {
    if (!asteroidGroup) {
        return;
    }

    asteroids.forEach(
        (asteroid) => {
            asteroid.rotation.x +=
                asteroid.userData
                    .rotationSpeed.x;

            asteroid.rotation.y +=
                asteroid.userData
                    .rotationSpeed.y;

            asteroid.rotation.z +=
                asteroid.userData
                    .rotationSpeed.z;

            asteroid.position.y +=
                Math.sin(
                    elapsedTime *
                    0.3 +
                    asteroid.userData
                        .phase
                ) *
                asteroid.userData
                    .drift;
        }
    );
}


function animateDistantSun(
    elapsedTime
) {
    if (
        !distantSun ||
        !distantSunGlow
    ) {
        return;
    }

    const pulse =
        1 +
        Math.sin(
            elapsedTime *
            0.42
        ) *
        0.045;

    distantSunGlow.scale.set(
        22 * pulse,
        22 * pulse,
        1
    );

    distantSunGlow.material.opacity =
        0.42 +
        Math.sin(
            elapsedTime *
            0.5
        ) *
        0.06;
}


function applyUniverseNavigation() {
    universeYaw +=
        (
            targetUniverseYaw -
            universeYaw
        ) *
        0.06;

    universePitch +=
        (
            targetUniversePitch -
            universePitch
        ) *
        0.06;

    const groups = [
        detailedStarGroup,
        galaxyGroup,
        asteroidGroup,
        shootingStarGroup,
        interactiveStarGroup,
        birthdayMessageGroup,
        milkyWayRibbonGroup,
        cosmicDustGroup,
        starShockwaveGroup
    ];

    groups.forEach(
        (group) => {
            if (!group) {
                return;
            }

            group.rotation.y =
                universeYaw;

            group.rotation.x =
                universePitch;
        }
    );
}


function animateHiddenBirthdayMessage(
    elapsedTime
) {
    if (
        !birthdayMessagePoints ||
        !birthdayMessageTargetPositions ||
        !birthdayMessageScatterPositions
    ) {
        return;
    }

    const positionAttribute =
        birthdayMessagePoints
            .geometry
            .getAttribute(
                "position"
            );

    let targetSet =
        birthdayMessageScatterPositions;

    let speed =
        0.035;

    if (
        birthdayMessageState ===
        "revealing" ||
        birthdayMessageState ===
        "shown"
    ) {
        targetSet =
            birthdayMessageTargetPositions;

        speed =
            0.07;
    }

    for (
        let index = 0;
        index < positionAttribute.count;
        index += 1
    ) {
        const target =
            targetSet[
                index
            ];

        positionAttribute.setXYZ(
            index,
            THREE.MathUtils.lerp(
                positionAttribute.getX(index),
                target.x,
                speed
            ),
            THREE.MathUtils.lerp(
                positionAttribute.getY(index),
                target.y,
                speed
            ),
            THREE.MathUtils.lerp(
                positionAttribute.getZ(index),
                target.z,
                speed
            )
        );
    }

    positionAttribute.needsUpdate =
        true;

    birthdayMessagePoints.material.opacity =
        birthdayMessageState ===
        "hidden"
            ? 0.32
            : birthdayMessageState ===
                "shown"
                ? 0.94
                : 0.72;

    birthdayMessageGroup.position.y =
        2 +
        Math.sin(
            elapsedTime *
            0.3
        ) *
        0.12;

    birthdayMessageTimer +=
        0.016;

    if (
        birthdayMessageState ===
        "revealing" &&
        birthdayMessageTimer >
        2.4
    ) {
        birthdayMessageState =
            "shown";

        birthdayMessageTimer =
            0;
    }

    if (
        birthdayMessageState ===
        "shown" &&
        birthdayMessageTimer >
        REALISM_CONFIG
            .birthdayHoldDuration
    ) {
        scatterHiddenBirthdayMessage();
    }

    if (
        birthdayMessageState ===
        "scattering" &&
        birthdayMessageTimer >
        2.6
    ) {
        birthdayMessageState =
            "hidden";

        birthdayMessageTimer =
            0;

        totalDragDistance =
            0;
    }
}



function animateDeepStarField(
    elapsedTime
) {
    if (!deepStarField) {
        return;
    }

    deepStarField.rotation.y +=
        0.000018;

    deepStarField.rotation.x =
        Math.sin(
            elapsedTime *
            0.025
        ) *
        0.008;

    deepStarField.material.opacity =
        0.62 +
        Math.sin(
            elapsedTime *
            0.17
        ) *
        0.06;
}


function animateGalacticBand(
    elapsedTime
) {
    if (!galacticBandGroup) {
        return;
    }

    galacticBandGroup.rotation.y =
        Math.sin(
            elapsedTime *
            0.018
        ) *
        0.025;

    galacticBandLayers.forEach(
        (
            layer,
            index
        ) => {
            layer.material.rotation +=
                layer.userData
                    .rotationSpeed;

            layer.material.opacity =
                layer.userData
                    .baseOpacity +
                Math.sin(
                    elapsedTime *
                    0.11 +
                    layer.userData
                        .phase
                ) *
                0.025;

            layer.position.y +=
                Math.sin(
                    elapsedTime *
                    0.035 +
                    index
                ) *
                0.0008;
        }
    );
}


function animateEnhancedSun(
    elapsedTime
) {
    if (
        !solarCoronaGroup ||
        !solarFlareGroup
    ) {
        return;
    }

    solarCoronaLayers.forEach(
        (
            corona,
            index
        ) => {
            const pulse =
                1 +
                Math.sin(
                    elapsedTime *
                    (
                        0.34 +
                        index *
                        0.08
                    ) +
                    corona.userData
                        .phase
                ) *
                0.055;

            const scale =
                corona.userData
                    .baseScale *
                pulse;

            corona.scale.set(
                scale,
                scale,
                1
            );

            corona.material.opacity =
                corona.userData
                    .baseOpacity +
                Math.sin(
                    elapsedTime *
                    0.41 +
                    corona.userData
                        .phase
                ) *
                0.025;
        }
    );

    solarFlareGroup.rotation.z +=
        0.00026;

    solarFlares.forEach(
        (flare) => {
            flare.material.rotation +=
                flare.userData
                    .orbitSpeed;

            flare.material.opacity =
                flare.userData
                    .baseOpacity +
                Math.sin(
                    elapsedTime *
                    0.72 +
                    flare.userData
                        .phase
                ) *
                0.05;
        }
    );

    if (
        distantSun.material?.map
    ) {
        distantSun.material.map.offset.x =
            (
                distantSun.material
                    .map.offset.x +
                0.00018
            ) %
            1;
    }

    distantSun.rotation.y +=
        0.0007;
}


function showFinalScene() {
    if (
        !finalScene ||
        isConstellationMessageOpen
    ) {
        return;
    }

    hideJourneyFinalMessage();

    finalScene.classList.add(
        "is-visible"
    );

    finalScene.setAttribute(
        "aria-hidden",
        "false"
    );
}


function hideFinalScene() {
    if (!finalScene) {
        return;
    }

    finalSceneDismissed =
        true;

    finalScene.classList.remove(
        "is-visible"
    );

    finalScene.setAttribute(
        "aria-hidden",
        "true"
    );
}


function handleFinalSceneBackgroundClick(
    event
) {
    if (
        event.target ===
        finalScene
    ) {
        hideFinalScene();
    }
}


function replayJourney() {
    hideFinalScene();

    finalSceneDismissed =
        false;

    finalSceneShown =
        false;

    finalJourneyMessageShown =
        false;

    lastJourneyCaptionStage =
        -1;

    journeyStartTime =
        clock
            ? clock.getElapsedTime()
            : 0;

    journeyProgress =
        0;

    currentJourneyStage =
        1;

    camera.position.set(
        0,
        0,
        18
    );

    cameraTarget.set(
        0,
        0,
        0
    );

    desiredCameraPosition.set(
        0,
        0,
        18
    );

    desiredLookTarget.set(
        0,
        0,
        0
    );

    journeyProgressBar.style
        .transform =
        "scaleX(0)";

    showJourneyCaption(
        JOURNEY_SCENES[0]
    );
}



function animateRefinedMilkyWay(elapsedTime){ if(!milkyWayRibbonGroup)return;milkyWayRibbonGroup.rotation.y=Math.sin(elapsedTime*0.018)*0.018;milkyWayRibbonLayers.forEach((l,i)=>{l.material.opacity=l.userData.baseOpacity+Math.sin(elapsedTime*0.08+l.userData.phase)*0.02;l.position.y+=Math.sin(elapsedTime*0.04+i)*0.0007;});}
function animateCosmicDust(elapsedTime){ if(!cosmicDustGroup)return;cosmicDustLayers.forEach((d,i)=>{d.material.opacity=d.userData.baseOpacity+Math.sin(elapsedTime*0.12+d.userData.phase)*0.018;d.material.rotation+=i%2===0?0.00005:-0.00004;});}
function animateStarShockwaves(){ if(!starShockwaveGroup)return;for(let i=starShockwaves.length-1;i>=0;i--){const w=starShockwaves[i];w.userData.age+=0.016;const p=THREE.MathUtils.clamp(w.userData.age/w.userData.duration,0,1);w.scale.setScalar(1+p*8);w.material.opacity=0.72*(1-p);if(p>=1){starShockwaveGroup.remove(w);w.geometry.dispose();w.material.dispose();starShockwaves.splice(i,1);}}}
/* ---------------------------------------------------------
   NARRATIVA DEL RECORRIDO
--------------------------------------------------------- */

function updateJourneyNarrative() {
    if (
        !hasEntered ||
        !journeyCaption ||
        !journeyProgressBar
    ) {
        return;
    }

    const progress =
        THREE.MathUtils.clamp(
            journeyProgress,
            0,
            1
        );

    journeyProgressBar.style.transform =
        `scaleX(${progress})`;

    const stageIndex =
        Math.max(
            0,
            Math.min(
                currentJourneyStage - 1,
                JOURNEY_SCENES.length - 1
            )
        );

    if (
        currentJourneyStage > 0 &&
        stageIndex !== lastJourneyCaptionStage
    ) {
        lastJourneyCaptionStage =
            stageIndex;

        showJourneyCaption(
            JOURNEY_SCENES[
                stageIndex
            ]
        );
    }

    if (
        progress >= 1 &&
        !finalJourneyMessageShown
    ) {
        finalJourneyMessageShown =
            true;

        window.setTimeout(
            showJourneyFinalMessage,
            1000
        );

        if (
            !finalSceneShown &&
            !finalSceneDismissed
        ) {
            finalSceneShown =
                true;

            finalSceneTimeout =
                window.setTimeout(
                    showFinalScene,
                    POLISH_CONFIG
                        .finalSceneDelay
                );
        }
    }
}


function showJourneyCaption(
    sceneData
) {
    if (
        !sceneData ||
        !journeyCaptionTitle ||
        !journeyCaptionText
    ) {
        return;
    }

    window.clearTimeout(
        journeyCaptionHideTimer
    );

    journeyCaptionTitle.textContent =
        sceneData.title;

    journeyCaptionText.textContent =
        sceneData.text;

    journeyCaption.classList.add(
        "is-visible"
    );

    journeyCaption.setAttribute(
        "aria-hidden",
        "false"
    );

    journeyCaptionHideTimer =
        window.setTimeout(
            () => {
                journeyCaption.classList.remove(
                    "is-visible"
                );

                journeyCaption.setAttribute(
                    "aria-hidden",
                    "true"
                );
            },
            4300
        );
}


function showJourneyFinalMessage() {
    if (
        !journeyFinalMessage ||
        isConstellationMessageOpen
    ) {
        return;
    }

    journeyFinalMessage.classList.add(
        "is-visible"
    );

    journeyFinalMessage.setAttribute(
        "aria-hidden",
        "false"
    );

    window.setTimeout(
        hideJourneyFinalMessage,
        5200
    );
}


function hideJourneyFinalMessage() {
    if (!journeyFinalMessage) {
        return;
    }

    journeyFinalMessage.classList.remove(
        "is-visible"
    );

    journeyFinalMessage.setAttribute(
        "aria-hidden",
        "true"
    );
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

disposeObject3D(
    shootingStarGroup
);

disposeObject3D(
    interactiveStarGroup
);

disposeObject3D(
    stardustGroup
);

disposeObject3D(
    detailedStarGroup
);

disposeObject3D(
    galaxyGroup
);

disposeObject3D(
    asteroidGroup
);

disposeObject3D(
    birthdayMessageGroup
);

disposeObject3D(
    proceduralUniverseMesh
);

disposeObject3D(milkyWayRibbonGroup);
disposeObject3D(cosmicDustGroup);
disposeObject3D(starShockwaveGroup);

disposeObject3D(
    deepStarField
);

disposeObject3D(
    galacticBandGroup
);

disposeObject3D(
    solarCoronaGroup
);

disposeObject3D(
    solarFlareGroup
);

disposeObject3D(
    distantSun
);

if (distantSunGlow) {
    distantSunGlow.material
        ?.map
        ?.dispose();

    distantSunGlow.material
        ?.dispose();
}

if (audioFadeFrame !== null) {
    window.cancelAnimationFrame(
        audioFadeFrame
    );

    audioFadeFrame = null;
}

if (finalSceneTimeout !== null) {
    window.clearTimeout(
        finalSceneTimeout
    );

    finalSceneTimeout = null;
}

if (backgroundMusic) {
    backgroundMusic.pause();
    backgroundMusic.removeAttribute(
        "src"
    );
}

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
