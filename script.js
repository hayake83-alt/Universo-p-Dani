import * as THREE from "https://unpkg.com/three@0.166.1/build/three.module.js";

const canvas = document.querySelector("#universe");
const statusElement = document.querySelector("#status");
const introElement = document.querySelector("#intro");
const startButton = document.querySelector("#startButton");

if (!canvas || !statusElement || !introElement || !startButton) {
  throw new Error("No se encontraron todos los elementos necesarios del HTML.");
}

function showFatalError(message) {
  console.error(message);

  statusElement.classList.remove("is-ready");
  statusElement.textContent = `Error: ${message}`;
  statusElement.style.color = "#ffd7d7";
  statusElement.style.borderColor = "rgba(255, 120, 120, 0.45)";
  statusElement.style.background = "rgba(70, 0, 10, 0.72)";
}

function supportsWebGL() {
  try {
    const testCanvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
      (testCanvas.getContext("webgl2") || testCanvas.getContext("webgl"))
    );
  } catch (error) {
    console.error("Error al comprobar WebGL:", error);
    return false;
  }
}

if (!supportsWebGL()) {
  showFatalError("Este navegador o dispositivo no tiene WebGL disponible.");
  throw new Error("WebGL no disponible.");
}

try {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x02030a);
  scene.fog = new THREE.FogExp2(0x02030a, 0.018);

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 18);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance"
  });

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const starCount = window.innerWidth < 700 ? 1800 : 3200;
  const starPositions = new Float32Array(starCount * 3);
  const starColors = new Float32Array(starCount * 3);

  const blue = new THREE.Color(0x8ba8ff);
  const white = new THREE.Color(0xffffff);
  const pink = new THREE.Color(0xf5b8d7);
  const mixedColor = new THREE.Color();

  for (let index = 0; index < starCount; index += 1) {
    const i3 = index * 3;
    const radius = 18 + Math.random() * 95;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    starPositions[i3 + 2] = radius * Math.cos(phi);

    const colorChoice = Math.random();
    if (colorChoice < 0.68) {
      mixedColor.copy(white);
    } else if (colorChoice < 0.88) {
      mixedColor.copy(blue);
    } else {
      mixedColor.copy(pink);
    }

    const brightness = 0.55 + Math.random() * 0.45;
    starColors[i3] = mixedColor.r * brightness;
    starColors[i3 + 1] = mixedColor.g * brightness;
    starColors[i3 + 2] = mixedColor.b * brightness;
  }

  const starGeometry = new THREE.BufferGeometry();
  starGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(starPositions, 3)
  );
  starGeometry.setAttribute(
    "color",
    new THREE.BufferAttribute(starColors, 3)
  );

  const starMaterial = new THREE.PointsMaterial({
    size: window.innerWidth < 700 ? 0.12 : 0.1,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.92,
    vertexColors: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
  });

  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);

  const ambientGlowGeometry = new THREE.SphereGeometry(7, 48, 48);
  const ambientGlowMaterial = new THREE.MeshBasicMaterial({
    color: 0x26356f,
    transparent: true,
    opacity: 0.045,
    side: THREE.BackSide,
    depthWrite: false
  });
  const ambientGlow = new THREE.Mesh(
    ambientGlowGeometry,
    ambientGlowMaterial
  );
  scene.add(ambientGlow);

  const pointer = new THREE.Vector2(0, 0);
  const targetRotation = new THREE.Vector2(0, 0);

  function updatePointer(clientX, clientY) {
    pointer.x = (clientX / window.innerWidth) * 2 - 1;
    pointer.y = -((clientY / window.innerHeight) * 2 - 1);

    targetRotation.y = pointer.x * 0.08;
    targetRotation.x = pointer.y * 0.05;
  }

  window.addEventListener(
    "pointermove",
    (event) => updatePointer(event.clientX, event.clientY),
    { passive: true }
  );

  window.addEventListener(
    "touchmove",
    (event) => {
      const touch = event.touches[0];
      if (touch) updatePointer(touch.clientX, touch.clientY);
    },
    { passive: true }
  );

  function handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
  }

  window.addEventListener("resize", handleResize, { passive: true });
  window.addEventListener("orientationchange", handleResize, { passive: true });

  startButton.addEventListener("click", () => {
    introElement.classList.add("is-hidden");
  });

  const clock = new THREE.Clock();
  let animationFrameId = 0;

  function animate() {
    animationFrameId = window.requestAnimationFrame(animate);

    const elapsed = clock.getElapsedTime();

    stars.rotation.y += (targetRotation.y - stars.rotation.y) * 0.018;
    stars.rotation.x += (targetRotation.x - stars.rotation.x) * 0.018;
    stars.rotation.z = elapsed * 0.0025;

    ambientGlow.scale.setScalar(1 + Math.sin(elapsed * 0.55) * 0.025);

    camera.position.x = Math.sin(elapsed * 0.09) * 0.32;
    camera.position.y = Math.cos(elapsed * 0.075) * 0.22;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener("beforeunload", () => {
    window.cancelAnimationFrame(animationFrameId);
    starGeometry.dispose();
    starMaterial.dispose();
    ambientGlowGeometry.dispose();
    ambientGlowMaterial.dispose();
    renderer.dispose();
  });

  statusElement.textContent = "Universo cargado correctamente";
  window.setTimeout(() => statusElement.classList.add("is-ready"), 900);

  console.info("Universo-p-Dani: base cargada correctamente.");
} catch (error) {
  const readableMessage =
    error instanceof Error ? error.message : "Ocurrió un error desconocido.";
  showFatalError(readableMessage);
  throw error;
}
