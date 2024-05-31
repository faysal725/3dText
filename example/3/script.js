import * as THREE from "three";
import gsap from "gsap";

const canvas = document.querySelector(".webgl");
const scene = new THREE.Scene();

//red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const sizes = {
  width: 800,
  height: 600,
};
// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
scene.add(camera);

// camera positioning
camera.position.z = 4;
// camera.position.y = 2
// camera.position.x = 3

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);



// clock 
// const clock = new THREE.Clock()



gsap.to(mesh.position,   { duration:1 , delay: 1, x: 2})
gsap.to(mesh.position,   { duration:1 , delay: 2, x: 0})

// animation
const tick = () => {

  // clock 
  // const elapsedTime = clock.getElapsedTime();

  // update objects
  // mesh.rotation.x += 0.01;
  // mesh.rotation.y = Math.cos(elapsedTime) ;

  // camera.position.y = Math.sin(elapsedTime)
  // camera.position.y = Math.sin(elapsedTime)
  // camera.lookAt(mesh.position)


  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();
