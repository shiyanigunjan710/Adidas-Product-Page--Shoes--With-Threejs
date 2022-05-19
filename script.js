// Reference CDN link from https://www.jsdelivr.com/package/npm/three

import * as THREE from 'three';

import Stats from 'https://cdn.jsdelivr.net/npm/three@0.140.2/examples/jsm/libs/stats.module.js';

import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.140.2/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'https://cdn.jsdelivr.net/npm/three@0.140.2/examples/jsm/environments/RoomEnvironment.js';

import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.140.2/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.140.2/examples/jsm/loaders/DRACOLoader.js';

let mixer;
let cameraDirection = new THREE.Vector3()
let camPositionSpan, camLookAtSpan

const clock = new THREE.Clock();
// const container = document.getElementById('container');
const container = document.getElementById('threejsContainer');
// camPositionSpan = document.querySelector("#position");
// camLookAtSpan = document.querySelector("#lookingAt");

// const stats = new Stats();
// container.appendChild(stats.dom);

const sizes = {
    width: container.offsetWidth,
    height: container.offsetHeight
    // width: document.getElementById('threejsSizes').offsetWidth,
    // height: document.getElementById('threejsSizes').offsetHeight
}

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setSize(sizes.width, sizes.height);
renderer.outputEncoding = THREE.sRGBEncoding;
container.appendChild(renderer.domElement);

// const pmremGenerator = new THREE.PMREMGenerator(renderer);

const scene = new THREE.Scene();
// scene.add(new THREE.AxesHelper(5))
// scene.background = new THREE.Color(0xbfe3dd);
scene.background = new THREE.Color(0xefefef);
// scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;

// const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
const camera = new THREE.PerspectiveCamera(40, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0.36, 0, 0);
// camera.lookAt(98.9, -6.2, 8.3);

const controls = new OrbitControls(camera, container);
// controls.target.set(0, 0, 0.25);
controls.minDistance = 0.36;
controls.maxDistance = 1;
// controls.target.set(0, 0.5, 0);
controls.update();
// controls.enablePan = false;
// controls.enableDamping = true;

// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath('./three.js-master/examples/js/libs/draco/gltf/');

const loader = new GLTFLoader();
// loader.setDRACOLoader( dracoLoader );
loader.load('scene.gltf', function (gltf) {

    const model = gltf.scene;
    model.position.set(0.01, 0.30, 0.35);
    model.rotation.set(0.2, 0, 0);
    // model.scale.set(1, 1, 1);
    scene.add(model);

    // mixer = new THREE.AnimationMixer(model);
    // mixer.clipAction(gltf.animations[0]).play();

    animate();

}, undefined, function (e) {

    console.error(e);

});


window.onresize = function () {

    // camera.aspect = window.innerWidth / window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(sizes.width, sizes.height);

};

//Color Changing of Shoes
document.querySelectorAll('.shoeColor').forEach(item => {
    item.addEventListener('click', event => {
      var productColor = item.getAttribute("data-image");
      if(productColor != null){
          console.log(productColor + " selected")
      }
    })
  })


function animate() {

    // // Reference Link -> https://medium.com/geekculture/how-to-control-three-js-camera-like-a-pro-a8575a717a2
    // // 5. calculate and display the vector values on screen
    // // this copies the camera's unit vector direction to cameraDirection
    // camera.getWorldDirection(cameraDirection)
    // // scale the unit vector up to get a more intuitive value
    // cameraDirection.set(cameraDirection.x * 100, cameraDirection.y * 100, cameraDirection.z * 100)
    // // update the onscreen spans with the camera's position and lookAt vectors
    // camPositionSpan.innerHTML = `Position: (${camera.position.x.toFixed(1)}, ${camera.position.y.toFixed(1)}, ${camera.position.z.toFixed(1)})`
    // camLookAtSpan.innerHTML = `LookAt: (${(camera.position.x + cameraDirection.x).toFixed(1)}, ${(camera.position.y + cameraDirection.y).toFixed(1)}, ${(camera.position.z + cameraDirection.z).toFixed(1)})`

    requestAnimationFrame(animate);

    // const delta = clock.getDelta();

    // mixer.update(delta);

    controls.update();

    // stats.update();

    renderer.render(scene, camera);

}