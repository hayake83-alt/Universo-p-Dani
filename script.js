import * as THREE from "https://unpkg.com/three@0.166.1/build/three.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.166.1/examples/jsm/controls/OrbitControls.js";

/* =========================================================
   UNIVERSO PARA DANI — VERSIÓN ESTABLE
   Reemplaza por completo el script anterior.
========================================================= */

const $ = (selector) => document.querySelector(selector);
const canvas = document.getElementById("universo");
const loader = document.getElementById("loader");
const overlay = document.getElementById("overlay");
const titulo = document.getElementById("titulo");
const subtitulo = document.getElementById("subtitulo");
const flash = document.getElementById("flash");

if (!canvas) {
  throw new Error('No existe <canvas id="universo"></canvas> en index.html.');
}

const isMobile = matchMedia("(max-width: 768px)").matches;
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

const CONFIG = {
  stars: isMobile ? 4500 : 9000,
  galaxyStars: isMobile ? 2200 : 5000,
  nebulaStars: isMobile ? 1200 : 2600,
  pixelRatio: Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2),
};

let scene;
let camera;
let renderer;
let controls;
let clock;
let raycaster;
let pointer;
let animationId = null;
let started = false;

const animated = [];
const interactive = [];
const root = new THREE.Group();

function random(min, max) {
  return min + Math.random() * (max - min);
}

function randomSphere(radiusMin, radiusMax) {
  const radius = random(radiusMin, radiusMax);
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi)
  );
}

function initEngine() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x010104);
  scene.fog = new THREE.FogExp2(0x010104, 0.00045);

  camera = new THREE.PerspectiveCamera(58, innerWidth / innerHeight, 0.1, 5000);
  camera.position.set(0, 8, 230);

  renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !isMobile,
    powerPreference: "high-performance",
  });
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(CONFIG.pixelRatio);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.045;
  controls.enablePan = false;
  controls.minDistance = 70;
  controls.maxDistance = 520;
  controls.rotateSpeed = 0.28;
  controls.zoomSpeed = 0.55;

  clock = new THREE.Clock();
  raycaster = new THREE.Raycaster();
  pointer = new THREE.Vector2();

  scene.add(root);
  scene.add(new THREE.AmbientLight(0xffffff, 1.25));

  const light = new THREE.DirectionalLight(0xbfd4ff, 1.3);
  light.position.set(150, 220, 180);
  scene.add(light);
}

function createStars() {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(CONFIG.stars * 3);
  const colors = new Float32Array(CONFIG.stars * 3);
  const palette = [0xffffff, 0x7fb6ff, 0xff8eb8, 0xb99aff];
  const color = new THREE.Color();

  for (let i = 0; i < CONFIG.stars; i++) {
    const point = randomSphere(480, 1900);
    const index = i * 3;
    positions[index] = point.x;
    positions[index + 1] = point.y;
    positions[index + 2] = point.z;
    color.setHex(palette[Math.floor(Math.random() * palette.length)]);
    colors[index] = color.r;
    colors[index + 1] = color.g;
    colors[index + 2] = color.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: isMobile ? 1.35 : 1.65,
    vertexColors: true,
    transparent: true,
    opacity: 0.95,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const stars = new THREE.Points(geometry, material);
  root.add(stars);
  animated.push((time) => {
    stars.rotation.y += 0.000035;
    material.opacity = 0.9 + Math.sin(time * 0.55) * 0.08;
  });
}

function createGalaxy(position, colors, scale = 1) {
  const geometry = new THREE.BufferGeometry();
  const count = CONFIG.galaxyStars;
  const positions = new Float32Array(count * 3);
  const colorArray = new Float32Array(count * 3);
  const inside = new THREE.Color(colors[0]);
  const outside = new THREE.Color(colors[1]);
  const mixed = new THREE.Color();
  const arms = 5;
  const radiusMax = 180;

  for (let i = 0; i < count; i++) {
    const radius = Math.pow(Math.random(), 0.7) * radiusMax;
    const arm = (i % arms) / arms * Math.PI * 2;
    const spin = radius * 0.027;
    const noise = Math.pow(Math.random(), 2.8) * radius * 0.32;
    const index = i * 3;

    positions[index] = Math.cos(arm + spin) * radius + random(-noise, noise);
    positions[index + 1] = random(-noise * 0.12, noise * 0.12);
    positions[index + 2] = Math.sin(arm + spin) * radius + random(-noise, noise);

    mixed.copy(inside).lerp(outside, radius / radiusMax);
    colorArray[index] = mixed.r;
    colorArray[index + 1] = mixed.g;
    colorArray[index + 2] = mixed.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colorArray, 3));

  const material = new THREE.PointsMaterial({
    size: isMobile ? 1.1 : 1.45,
    vertexColors: true,
    transparent: true,
    opacity: 0.82,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const galaxy = new THREE.Points(geometry, material);
  galaxy.position.copy(position);
  galaxy.scale.setScalar(scale);
  galaxy.rotation.x = random(-0.35, 0.35);
  galaxy.rotation.z = random(-0.28, 0.28);
  root.add(galaxy);

  const speed = random(0.00003, 0.00008);
  animated.push((time) => {
    galaxy.rotation.y += speed;
    galaxy.position.y += Math.sin(time * 0.2 + position.x) * 0.003;
  });
}

function createNebula(position, colorA, colorB, scale = 1) {
  const geometry = new THREE.BufferGeometry();
  const count = CONFIG.nebulaStars;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const a = new THREE.Color(colorA);
  const b = new THREE.Color(colorB);
  const mixed = new THREE.Color();

  for (let i = 0; i < count; i++) {
    const point = randomSphere(0, 130);
    point.y *= 0.52;
    const index = i * 3;
    positions[index] = point.x + random(-20, 20);
    positions[index + 1] = point.y + random(-14, 14);
    positions[index + 2] = point.z + random(-20, 20);
    mixed.copy(a).lerp(b, Math.random());
    colors[index] = mixed.r;
    colors[index + 1] = mixed.g;
    colors[index + 2] = mixed.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: isMobile ? 5 : 7,
    vertexColors: true,
    transparent: true,
    opacity: 0.11,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });

  const nebula = new THREE.Points(geometry, material);
  nebula.position.copy(position);
  nebula.scale.setScalar(scale);
  root.add(nebula);

  animated.push((time) => {
    nebula.rotation.y += 0.000025;
    material.opacity = 0.09 + Math.sin(time * 0.22 + position.z) * 0.025;
  });
}

function createPlanet(radius, color, position, rings = false) {
  const geometry = new THREE.SphereGeometry(radius, isMobile ? 32 : 48, isMobile ? 24 : 36);
  const material = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.78,
    metalness: 0.05,
    emissive: new THREE.Color(color).multiplyScalar(0.08),
  });
  const planet = new THREE.Mesh(geometry, material);
  planet.position.copy(position);
  root.add(planet);

  if (rings) {
    const ringGeo = new THREE.RingGeometry(radius * 1.35, radius * 2.15, 96);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xe1c7a5,
      transparent: true,
      opacity: 0.55,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.35;
    planet.add(ring);
  }

  const baseY = position.y;
  const phase = Math.random() * Math.PI * 2;
  animated.push((time) => {
    planet.rotation.y += 0.0012;
    planet.position.y = baseY + Math.sin(time * 0.28 + phase) * 4;
  });
  return planet;
}

function createConstellation(points, position, color = 0xffffff, hidden = false, name = "") {
  const group = new THREE.Group();
  group.position.copy(position);
  group.userData.name = name;

  const vertices = [];
  const starGeometry = new THREE.SphereGeometry(1.65, 16, 12);
  const starMaterial = new THREE.MeshBasicMaterial({ color });

  points.forEach((point, index) => {
    const p = new THREE.Vector3(...point);
    const star = new THREE.Mesh(starGeometry, starMaterial.clone());
    star.position.copy(p);
    star.userData.constellation = name;
    star.userData.message = name === "Corazón" ? "Entre todas las estrellas, siempre te elegiría a ti." : "Dani, este universo también lleva tu nombre.";
    group.add(star);
    interactive.push(star);
    if (index > 0) vertices.push(...points[index - 1], ...point);
  });

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  const lineMaterial = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.42 });
  group.add(new THREE.LineSegments(lineGeometry, lineMaterial));
  group.visible = !hidden;
  root.add(group);

  animated.push((time) => {
    group.position.y = position.y + Math.sin(time * 0.32 + position.x) * 2;
    group.rotation.z = Math.sin(time * 0.08) * 0.015;
  });

  return group;
}

function buildUniverse() {
  createStars();
  createGalaxy(new THREE.Vector3(-360, 120, -700), [0xaac8ff, 0xff6f9d], 1.35);
  createGalaxy(new THREE.Vector3(460, -150, -980), [0x9fd9ff, 0xb06cff], 1.05);
  createGalaxy(new THREE.Vector3(40, 260, -1300), [0xffffff, 0xff719c], 1.55);

  createNebula(new THREE.Vector3(-450, -120, -760), 0x497dff, 0xb35eff, 1.65);
  createNebula(new THREE.Vector3(460, 170, -920), 0xff456f, 0x735cff, 1.4);
  createNebula(new THREE.Vector3(0, -260, -1150), 0x4f9cff, 0xff6aa5, 1.85);

  createPlanet(18, 0x6c88ff, new THREE.Vector3(-180, 75, -260));
  createPlanet(28, 0xd8ad79, new THREE.Vector3(260, -80, -520), true);
  createPlanet(11, 0xff6f91, new THREE.Vector3(520, 210, -900));

  const heart = [
    [0, -34, 0], [-32, -4, 0], [-38, 22, 0], [-20, 38, 0],
    [0, 22, 0], [20, 38, 0], [38, 22, 0], [32, -4, 0], [0, -34, 0]
  ];
  const letterD = [
    [-20, 36, 0], [-20, 12, 0], [-20, -12, 0], [-20, -36, 0],
    [4, 34, 0], [26, 18, 0], [30, 0, 0], [26, -18, 0], [4, -34, 0], [-20, -36, 0]
  ];

  const heartGroup = createConstellation(heart, new THREE.Vector3(220, 50, -360), 0xff8ac5, true, "Corazón");
  const dGroup = createConstellation(letterD, new THREE.Vector3(-240, -40, -430), 0xa98bff, true, "Dani");

  setTimeout(() => { heartGroup.visible = true; }, 3500);
  setTimeout(() => { dGroup.visible = true; }, 5200);
}

function showToast(message) {
  let toast = document.getElementById("universo-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "universo-toast";
    toast.style.cssText = `
      position:fixed;left:50%;bottom:8%;z-index:99999;max-width:min(86vw,520px);
      transform:translate(-50%,20px);padding:15px 20px;border:1px solid rgba(255,255,255,.24);
      border-radius:20px;background:rgba(10,4,24,.72);backdrop-filter:blur(14px);
      color:white;text-align:center;font-family:'Cormorant Garamond',serif;font-size:1.15rem;
      opacity:0;transition:.45s ease;pointer-events:none;box-shadow:0 12px 45px rgba(0,0,0,.38);
    `;
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = "1";
  toast.style.transform = "translate(-50%,0)";
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translate(-50%,20px)";
  }, 3600);
}

function onPointerDown(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(interactive, false);
  if (hits.length) {
    showToast(hits[0].object.userData.message || "Una estrella para Dani.");
  }
}

function intro() {
  if (flash) {
    flash.style.opacity = "1";
    requestAnimationFrame(() => {
      flash.style.transition = "opacity 1.4s ease";
      flash.style.opacity = "0";
    });
  }

  if (overlay) {
    overlay.style.opacity = "0";
    overlay.style.transition = "opacity 1.6s ease";
    requestAnimationFrame(() => { overlay.style.opacity = "1"; });
    setTimeout(() => { overlay.style.opacity = "0"; }, 6500);
  }

  if (titulo) titulo.textContent = "Feliz cumpleaños, Dani";
  if (subtitulo) subtitulo.textContent = "El universo siempre guarda un lugar para las personas especiales.";
}

function hideLoader() {
  if (!loader) return;
  loader.style.transition = "opacity .8s ease";
  loader.style.opacity = "0";
  loader.style.pointerEvents = "none";
  setTimeout(() => loader.remove(), 900);
}

function resize() {
  if (!camera || !renderer) return;
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
}

function animate() {
  animationId = requestAnimationFrame(animate);
  const time = clock.getElapsedTime();
  controls.update();
  root.rotation.y += reducedMotion ? 0 : 0.000018;
  animated.forEach((update) => update(time));
  renderer.render(scene, camera);
}

function start() {
  if (started) return;
  started = true;

  try {
    initEngine();
    buildUniverse();
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    addEventListener("resize", resize);
    animate();
    intro();
    hideLoader();
    console.log("✔ Universo para Dani iniciado correctamente");
  } catch (error) {
    console.error("No se pudo iniciar el universo:", error);
    hideLoader();
    showToast(`No se pudo iniciar el universo: ${error.message}`);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start, { once: true });
} else {
  start();
}

window.addEventListener("beforeunload", () => {
  if (animationId) cancelAnimationFrame(animationId);
  renderer?.dispose();
});
