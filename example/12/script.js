import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import * as dat from "dat.gui";

// debug
const gui = new dat.GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// textures
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

const doorColorTexture = textureLoader.load("./assets/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("./assets/textures/door/alpha.jpg");
const doorHeightTexture = textureLoader.load(
  "./assets/textures/door/height.jpg"
);
const doorNormalTexture = textureLoader.load(
  "./assets/textures/door/normal.jpg"
);
const doorAmbientOcclusionTexture = textureLoader.load(
  "./assets/textures/door/ambientOcclusion.jpg"
);
const doorMetalnessTexture = textureLoader.load(
  "./assets/textures/door/metalness.jpg"
);
const doorRoughnessTexture = textureLoader.load(
  "./assets/textures/door/roughness.jpg"
);
const matcapTexture = textureLoader.load("./assets/textures/matcaps/8.png");
const gradientTexture = textureLoader.load("./assets/textures/gradients/5.jpg");
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;

// environment map with cubetextureloader 
const environmentMapTexture= cubeTextureLoader.load([
    '/assets/textures/environmentMaps/4/px.png',
    '/assets/textures/environmentMaps/4/nx.png',
    '/assets/textures/environmentMaps/4/py.png',
    '/assets/textures/environmentMaps/4/ny.png',
    '/assets/textures/environmentMaps/4/pz.png',
    '/assets/textures/environmentMaps/4/nz.png',
])

// objects
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture
// material.color = new THREE.Color(0x00ff00)
// material.wireframe = true
// material.opacity = 0.5
// material.transparent = true
// material.alphaMap = doorAlphaTexture
// material.side = THREE.DoubleSide

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// const material = new THREE.MeshDepthMaterial()

// const material = new THREE.MeshLambertMaterial()

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

// const material = new THREE.MeshToonMaterial()
// material.gradientMap = gradientTexture

// const material = new THREE.MeshStandardMaterial();
// material.metalness = 0.15;
// material.roughness = 0.65;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.09
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// material.normalMap=doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.alphaMap = doorAlphaTexture
// material.transparent = true

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.envMap = environmentMapTexture

gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);
gui.add(material, "aoMapIntensity").min(0).max(10).step(0.0001);
gui.add(material, "displacementScale").min(0).max(1).step(0.0001);


// mesh 
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
sphere.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);
plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material
);
torus.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);
torus.position.x = 1.5;
sphere.position.x = -1.5;

scene.add(sphere, plane, torus);

// lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 10);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;

scene.add(pointLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // // update object
  // sphere.rotation.y = 0.1 * elapsedTime
  // plane.rotation.y = 0.1 * elapsedTime
  // torus.rotation.y = 0.1 * elapsedTime

  // sphere.rotation.x = 0.15 * elapsedTime
  // plane.rotation.x = 0.15 * elapsedTime
  // torus.rotation.x = 0.15 * elapsedTime

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
