import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

// cursor
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);

  // console.log(cursor)
});

const canvas = document.querySelector(".webgl");
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", (event) => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // camera update
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize(sizes.width, sizes.height);
  // setting the device pixel ration
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

window.addEventListener("dblclick", () => {
  const fullScreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;
  if (!fullScreenElement) {
    if (canvas.requestFullscreen) {
      
    canvas.requestFullscreen();
    }else if(canvas.webkitRequestFullscreen){
      canvas.webkitRequestFullscreen()
    }
  } else {

    if (document.exitFullscreen()) {
      document.exitFullscreen()
    }else if(document.webkitExitFullscreen()){

      document.webkitExitFullscreen()
    }
  }
});

const scene = new THREE.Scene();

//red cube
const geometry = new THREE.BoxGeometry(1, 1, 1, 5, 5, 5);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// perspective camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);

// OrthographicCamera
// const aspectRatio = sizes.width / sizes.height;
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );

// camera positioning
// camera.position.x = 2;
// camera.position.y = 2;
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
// controls.target.y= 2
// controls.update()

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);
// setting the device pixel ration
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// clock
const clock = new THREE.Clock();

// animation
const tick = () => {
  // clock
  const elapsedTime = clock.getElapsedTime();

  // update objects
  // mesh.rotation.y = elapsedTime;

  // update perspectivecam
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
  camera.position.y = cursor.y * 5
  camera.lookAt(mesh.position)

  // update controls
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};
tick();