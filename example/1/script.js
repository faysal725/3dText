import * as THREE from "three";


const scene = new THREE.Scene()


//red cube 
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 'red'})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


// mesh positioninng 
// mesh.position.x = 0.71
// mesh.position.y = -0.2
// mesh.position.z = 1
// or 
mesh.position.set(1.5, 2,  1)

// scale
// mesh.scale.x = 2
// mesh.scale.y = 2
// mesh.scale.z = 1
// or 
mesh.scale.set(2, 2,  1)

// rotation 
mesh.rotation.reorder('YXZ')    //rotation reorder
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI  * 0.25

// quortanion 


// axes helper 
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper)

const sizes = {
  width: 800, 
  height: 600
}
// camera 
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
scene.add(camera)

// camera positioning 
camera.position.z = 8
// camera.position.y = 2
// camera.position.x = 3

camera.lookAt(mesh.position)

// renderer
const canvas = document.querySelector('.webgl')
console.log(canvas)
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)


renderer.render(scene, camera)