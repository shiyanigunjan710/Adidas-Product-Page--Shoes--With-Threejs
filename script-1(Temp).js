import * as THREE from 'three';
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js';
import Stats from './three.js-master/examples/jsm/libs/stats.module.js'

console.log(THREE);
const canvas = document.querySelector('.webgl');

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const renderer = new THREE.WebGL1Renderer({
    canvas: canvas
})
renderer.setPixelRatio( window.devicePixelRatio );

renderer.setSize(sizes.width, sizes.height);

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5))

const light = new THREE.SpotLight()
light.position.set(5, 5, 5)
scene.add(light)

const camera = new THREE.PerspectiveCamera(
    85,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)
camera.position.z = 2

const controls = new OrbitControls( camera, renderer.domElement );
controls.target.set( 5, 5, 5 );
controls.enableDamping = true
// camera.rotation.y = 45/180*Math.PI;
// controls.update();

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
// const cube = new THREE.Mesh( geometry, material );
// scene.add(cube);

const loader = new GLTFLoader();
loader.load(
	// resource URL
	'scene.gltf',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );

		// gltf.animations; // Array<THREE.AnimationClip>
		// gltf.scene; // THREE.Group
		// gltf.scenes; // Array<THREE.Group>
		// gltf.cameras; // Array<THREE.Camera>
		// gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);
// camera.position.set(0,-0.5,4);
// scene.add(camera);

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

const stats = Stats()
document.body.appendChild(stats.dom)

function animate() {

	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	render();

}

function render() {

    renderer.render( scene, camera );

}

animate();