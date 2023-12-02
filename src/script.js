import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { SphereGeometry, TextureLoader, CubeTextureLoader } from "three";
import $ from "./Jquery";
import gsap from "gsap";
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};
const gltfLoader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();

// audioCup.volume=.5
// Canvas
const canvas = document.querySelector("canvas.webgl");
// Scene
const scene = new THREE.Scene();
//raycaster
const objectsToUpdate = [];
// Create sphere
const sphereGeometry = new THREE.SphereGeometry(1, 8, 8);
//global variables
let lidObject = new THREE.Object3D();
let Chocolateintersects = [];
let RibbonIntersects = [];
let lidIntersects = [];
let ribbonTrigger = "off";
let ribbonNudgeTrigger = "off";
let lidTrigger = "off";
let chocolatesTrigger = "off";
let chocolateBox = null;
let ribbon = null;
let lid = null;
let bow = null;
let ribbonMixer = null;
let GoldHeart = null;

let chocolate1;
let chocolate2;
let chocolate3;
let chocolate4;
let chocolate5;
let chocolate6;
let chocolate7;
let chocolate8;
let chocolate9;
let chocolate10;
let chocolate11;
let chocolate12;

let chocolate1Trigger = "on";
let chocolate2Trigger = "on";
let chocolate3Trigger = "on";
let chocolate4Trigger = "on";
let chocolate5Trigger = "on";
let chocolate6Trigger = "on";
let chocolate7Trigger = "on";
let chocolate8Trigger = "on";
let chocolate9Trigger = "on";
let chocolate10Trigger = "on";
let chocolate11Trigger = "on";
let chocolate12Trigger = "on";

let goldHeartTrigger = "off"

let Chocolateintersect1;
let Chocolateintersect2;
let Chocolateintersect3;
let Chocolateintersect4;
let Chocolateintersect5;
let Chocolateintersect6;
let Chocolateintersect7;
let Chocolateintersect8;
let Chocolateintersect9;
let Chocolateintersect10;
let Chocolateintersect11;
let Chocolateintersect12;
let goldHeartIntersects;

let ribbonAnimation;

const quotes = [
  "Words bounce. Words, if you let them, will do what they want to do and what they have to do.- Anne Carson",
  "To be running breathlessly, but not yet arrived, is itself delightful, a suspended moment of living hope. - Anne Carson",
  "As Sokrates tells it, your story begins the moment Eros enters you. That incursion is the biggest risk of your life. How you handle it is an index of the quality, wisdom, and decorum of the things inside you. As you handle it you come into contact with what is inside you, in a sudden and startling way. You perceive what you are, what you lack, what you could be.-Anne Carson",
  "For centuries poets, some poets, have tried to give a voice to the animals, and readers, some readers, have felt empathy and sorrow. If animals did have voices, and they could speak with the tongues of angels--at the very least with the tongues of angels--they would be unable to save themselves from us. What good would language do? Their mysterious otherness has not saved them, nor have their beautiful songs and coats and skins and shells and eyes. We discover the remarkable intelligence of the whale, the wolf, the elephant--it does not save them, nor does our awareness of the complexity of their lives. Their strength, their skills, their swiftness, the beauty of their flights. It matters not, it seems, whether they are large or small, proud or shy, docile or fierce, wild or domesticated, whether they nurse their young or brood patiently on eggs. If they eat meat, we decry their viciousness; if they eat grasses and seeds, we dismiss them as weak. There is not one of them, not even the songbird who cannot, who does not, conflict with man and his perceived needs and desires. St. Francis converted the wolf of Gubbio to reason, but he performed this miracle only once and as miracles go, it didn’t seem to capture the public’s fancy. Humans don’t want animals to reason with them. It would be a disturbing, unnerving, diminishing experience; it would bring about all manner of awkwardness and guilt.― Joy Williams",
  "Wouldn't it be wonderful if I won a helicopter in a crossword puzzle competition? There is not much hope though I am afraid, as they never give such practical prizes.-Leonora Carrington",
];
// ;rgb(1, 0.06859685480594635, 0.048684362322092056);
let transparentColor = new THREE.Color(1, 0.3, 0);
let transparentMaterial = new THREE.MeshBasicMaterial({
  color: transparentColor,
});
let transparentMaterial2 = new THREE.MeshBasicMaterial({
  color: transparentColor,
});

let transparentMaterialchocolate1 = new THREE.MeshBasicMaterial({
  color: transparentColor,
});

let transparentMaterialchocolate2 = new THREE.MeshBasicMaterial({
  color: transparentColor,
});

let transparentMaterialchocolate3 = new THREE.MeshBasicMaterial({
  color: transparentColor,
});

let transparentMaterialchocolate4 = new THREE.MeshBasicMaterial({
  color: transparentColor,
});

let transparentMaterialchocolate5 = new THREE.MeshBasicMaterial({
  color: transparentColor,
});

let transparentMaterialchocolate6 = new THREE.MeshBasicMaterial({
  color: transparentColor,
});

let transparentMaterialchocolate7 = new THREE.MeshBasicMaterial({
  color: transparentColor,
});

let transparentMaterialchocolate8 = new THREE.MeshBasicMaterial({
  color: transparentColor,
});
let transparentMaterialchocolate9 = new THREE.MeshBasicMaterial({
  color: transparentColor,
});
let transparentMaterialchocolate10 = new THREE.MeshBasicMaterial({
  color: transparentColor,
});
let transparentMaterialchocolate11 = new THREE.MeshBasicMaterial({
  color: transparentColor,
});
let transparentMaterialchocolate12 = new THREE.MeshBasicMaterial({
  color: transparentColor,
});

transparentMaterial.transparent = true;
transparentMaterial2.transparent = true;

let colorfulMaterials = [
  new THREE.MeshStandardMaterial({ color: "#F3A56B" }),
  new THREE.MeshStandardMaterial({ color: "#7BE8F3" }),
  new THREE.MeshStandardMaterial({ color: "#5EF097" }),
  new THREE.MeshStandardMaterial({ color: "#EE5E92" }),
];

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  //   camera.aspect = sizes.width / sizes.height;
  //   camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  //   if (sizes.width > 860) {
  //     camera.position.set(0, 1.5, -2);
  //   } else if (sizes.width > 450) {
  //     camera.position.set(0, 1.5, -2);
  //   } else {
  //     camera.position.set(0, 1.5, -2);
  //   }
});

const mouse = new THREE.Vector2();
mouse.x = 100;
mouse.y = 100;

window.addEventListener("mousemove", (event) => {
  mouse.x = (event.clientX / sizes.width) * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;

  // console.log(lidIntersects);
  // console.log(lidTrigger);

  
  if (
    goldHeartIntersects.length > 0 &&
    chocolatesTrigger === "on" &&
    goldHeartTrigger ==="on"

  ) {
    gsap.to(GoldHeart.position, { duration: 0.5, y: .7 });
    
  } else {
    gsap.to(GoldHeart.position, { duration: 0.5, y: .2 });
  }
  

  if (
    Chocolateintersect1.length > 0 &&
    chocolatesTrigger === "on" &&
    chocolate1Trigger === "on"
  ) {
    gsap.to(chocolate1.position, { duration: 0.5, y: 0 });
  } else {
    gsap.to(chocolate1.position, { duration: 0.5, y:  -0.4 });
  }
  if (
    Chocolateintersect2.length > 0 &&
    chocolatesTrigger === "on" &&
    chocolate2Trigger === "on"
  ) {
    gsap.to(chocolate2.position, { duration: 0.5, y: 0 });
  } else {
    gsap.to(chocolate2.position, { duration: 0.5, y:  -0.4 });
  }
  if (
    Chocolateintersect3.length > 0 &&
    chocolatesTrigger === "on" &&
    chocolate3Trigger === "on"
  ) {
    gsap.to(chocolate3.position, { duration: 0.5, y: 0 });
  } else {
    gsap.to(chocolate3.position, { duration: 0.5, y:  -0.4 });
  }
  if (
    Chocolateintersect4.length > 0 &&
    chocolatesTrigger === "on" &&
    chocolate4Trigger === "on"
  ) {
    console.log(chocolate4Trigger)
    gsap.to(chocolate4.position, { duration: 0.5, y: 0 });
  } else {
    gsap.to(chocolate4.position, { duration: 0.5, y:  -0.4 });
  }
  if (
    Chocolateintersect5.length > 0 &&
    chocolatesTrigger === "on" &&
    chocolate5Trigger === "on"
  ) {
    gsap.to(chocolate5.position, { duration: 0.5, y: 0 });
  } else {
    gsap.to(chocolate5.position, { duration: 0.5, y:  -0.4 });
  }
  if (
    Chocolateintersect6.length > 0 &&
    chocolatesTrigger === "on" &&
    chocolate6Trigger === "on"
  ) {
    gsap.to(chocolate6.position, { duration: 0.5, y: 0 });
  } else {
    gsap.to(chocolate6.position, { duration: 0.5, y:  -0.4 });
  }
  if (
    Chocolateintersect7.length > 0 &&
    chocolatesTrigger === "on" &&
    chocolate7Trigger === "on"
  ) {
    gsap.to(chocolate7.position, { duration: 0.5, y: 0 });
  } else {
    gsap.to(chocolate7.position, { duration: 0.5, y:  -0.4 });
  }
  if (
    Chocolateintersect8.length > 0 &&
    chocolatesTrigger === "on" &&
    chocolate8Trigger === "on"
  ) {
    gsap.to(chocolate8.position, { duration: 0.5, y: 0 });
  } else {
    gsap.to(chocolate8.position, { duration: 0.5, y:  -0.4 });
  }
  if (
    Chocolateintersect9.length > 0 &&
    chocolatesTrigger === "on" &&
    chocolate9Trigger === "on"
  ) {
    gsap.to(chocolate9.position, { duration: 0.5, y: 0 });
  } else {
    gsap.to(chocolate9.position, { duration: 0.5, y:  -0.4 });
  }
  if (
    Chocolateintersect10.length > 0 &&
    chocolatesTrigger === "on" &&
    chocolate10Trigger === "on"
  ) {
    gsap.to(chocolate10.position, { duration: 0.5, y: 0 });
  } else {
    gsap.to(chocolate10.position, { duration: 0.5, y:  -0.4 });
  }
  if (
    Chocolateintersect11.length > 0 &&
    chocolatesTrigger === "on" &&
    chocolate11Trigger === "on"
  ) {
    gsap.to(chocolate11.position, { duration: 0.5, y: 0 });
  } else {
    gsap.to(chocolate11.position, { duration: 0.5, y:  -0.4 });
  }
  if (
    Chocolateintersect12.length > 0 &&
    chocolatesTrigger === "on" &&
    chocolate12Trigger === "on"
  ) {
    gsap.to(chocolate12.position, { duration: 0.5, y: 0.2 });
  } else {
    gsap.to(chocolate12.position, { duration: 0.5, y: 0 });
  }

  if (lidIntersects.length > 0 && lidTrigger === "on") {
    gsap.to(lid.position, { duration: 0.5, y: 0.2 });
  } else {
    gsap.to(lid.position, { duration: 0.5, y: 0 });
  }
});

// gltfLoader.load("/teaset2.glb", (gltf) => {
//   teaset = gltf.scene;
//   console.log(teaset);
//   // teaset.scale.set(0.25, 0.25, 0.25)
//   cups[1] = teaset.children[4];
//   cups[2] = teaset.children[2];
//   cups[3] = teaset.children[3];
//   cups[4] = teaset.children[7];
//   cups[5] = teaset.children[5];
//   cups[6] = teaset.children[6];
//   plates[1] = teaset.children[13];
//   plates[2] = teaset.children[12];
//   plates[3] = teaset.children[10];
//   plates[4] = teaset.children[9];
//   plates[5] = teaset.children[8];
//   plates[6] = teaset.children[14];
//   scene.add(teaset);
// });

gltfLoader.load("/box2.glb", (gltf) => {
  chocolateBox = gltf.scene;
  // console.log(gltf);
  console.log(chocolateBox);

  // console.log(mixer)

  ribbon = chocolateBox.children[0];
  bow = chocolateBox.children[4];
  lid = chocolateBox.children[2];
  chocolate1 = chocolateBox.children[7];
  chocolate2 = chocolateBox.children[14];
  chocolate3 = chocolateBox.children[6];
  chocolate4 = chocolateBox.children[8];
  chocolate5 = chocolateBox.children[15];
  GoldHeart = chocolate5.children[3]
  chocolate6 = chocolateBox.children[9];
  chocolate7 = chocolateBox.children[10];
  chocolate8 = chocolateBox.children[11];
  chocolate9 = chocolateBox.children[12];
  chocolate10 = chocolateBox.children[13];
  chocolate11 = chocolateBox.children[17];
  chocolate12 = chocolateBox.children[16];

  ribbonMixer = new THREE.AnimationMixer(ribbon);
  ribbonAnimation = ribbonMixer.clipAction(gltf.animations[26]);
  ribbonAnimation.timeScale = 0.6;
  ribbonAnimation.clampWhenFinished = true;
  ribbonAnimation.setLoop(THREE.LoopOnce);
  ribbonAnimation.play();
  ribbonAnimation.time = 0;

  ribbonAnimation.paused = true;

  //   chocolateBox.remove(chocolateBox.children[2]);
  scene.add(chocolateBox);
  // console.log(lid);

  //   gsap;

  // console.log(chocolateBox.children[0]);

  //   chocolateBox.remove(chocolateBox.children[0]);
  //   chocolateBox.remove(chocolateBox.children[1]);
  //     chocolateBox.remove(chocolateBox.children[2]);
  // chocolateBox.remove(chocolateBox.children[3]);

  // console.log(chocolateBox);
});
const color = 0xffffff;
const skyColor = 0xb1e1ff; // light blue
const groundColor = 0xb97a20; // brownish orange
const intensity = 3;
const light5 = new THREE.AmbientLight(color, intensity);
const light4 = new THREE.HemisphereLight(skyColor, groundColor, intensity);
scene.add(light4);
/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight("#7FFFD4", 1);
scene.add(ambientLight);
//light target
const targetObject = new THREE.Object3D();
scene.add(targetObject);
// console.log("target object");
// console.log(targetObject);
const directionalLight = new THREE.DirectionalLight("#F5F5DC", 1);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(0, 7, -3);
directionalLight.target = targetObject;
scene.add(directionalLight);
const directionalLight2 = new THREE.DirectionalLight("#5F9EA0", 2);
directionalLight2.castShadow = true;
directionalLight2.shadow.mapSize.set(1024, 1024);
directionalLight2.shadow.camera.far = 15;
directionalLight2.shadow.camera.left = -7;
directionalLight2.shadow.camera.top = 7;
directionalLight2.shadow.camera.right = 7;
directionalLight2.shadow.camera.bottom = -7;
directionalLight2.position.set(-2, -2, 1);
directionalLight2.target = targetObject;

scene.add(directionalLight2);
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  60,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.focus = 20;
camera.position.set(1, 3, 2);
// if (sizes.width > 860) {
//   camera.position.set(1, 3, 2);
// } else if (sizes.width > 450) {
//   camera.position.set(0, 1.5, -2);
// } else {
//   camera.position.set(0, 1.5, -2);
// }
scene.add(camera);
camera.target = targetObject;
// Controls
const controls = new OrbitControls(camera, canvas);
// controls.target.set(4, 2, 0)
controls.enableDamping = true;
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setClearColor("black", 0.5);
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

let oldElapsedTime = null;

const clock = new THREE.Clock();
let previousTime = 0;
const raycaster = new THREE.Raycaster();

$(window).click(() => {
  //chocolate1

  if (Chocolateintersect1.length > 0 && chocolatesTrigger === "on") {
    // console.log(chocolate1);
    chocolate1.children[6].children[0].material = transparentMaterialchocolate1;
    chocolate1.children[6].children[1].material = transparentMaterialchocolate1;
    transparentMaterialchocolate1.transparent = true;
    gsap.to(chocolate1.position, { duration: 0.5, y: -0.4 });
    gsap.to(chocolate1.children[6].position, {
      duration: 0.3,
      y: 2,
    });
    gsap.to(chocolate1.children[6].children[0].material, {
      duration: 0.3,
      opacity: 0,
    });
    gsap.to(chocolate1.children[6].children[1].material, {
      duration: 0.3,
      opacity: 0,
    });
    chocolate1Trigger = "off";
  }

  //chocolate2

  if (Chocolateintersect2.length > 0 && chocolatesTrigger === "on") {
    console.log(chocolate2);
    chocolate2.children[3].children[0].material = transparentMaterialchocolate2;
    chocolate2.children[3].children[1].material = transparentMaterialchocolate2;
    transparentMaterialchocolate2.transparent = true;
    gsap.to(chocolate2.position, { duration: 0.5, y: -0.4 });
    gsap.to(chocolate2.children[3].position, {
      duration: 0.3,
      y: 2,
    });
    gsap.to(chocolate2.children[3].children[0].material, {
      duration: 0.3,
      opacity: 0,
    });
    gsap.to(chocolate2.children[3].children[1].material, {
      duration: 0.3,
      opacity: 0,
    });
    chocolate2Trigger = "off";
  }

  //chocolare3
  if (Chocolateintersect3.length > 0 && chocolatesTrigger === "on") {
    console.log(chocolate3);
    chocolate3.children[3].children[0].material = transparentMaterialchocolate3;
    chocolate3.children[3].children[1].material = transparentMaterialchocolate3;
    transparentMaterialchocolate3.transparent = true;
    gsap.to(chocolate3.position, { duration: 0.5, y: -0.4 });
    gsap.to(chocolate3.children[3].position, {
      duration: 0.3,
      y: 2,
    });
    gsap.to(chocolate3.children[3].children[0].material, {
      duration: 0.3,
      opacity: 0,
    });
    gsap.to(chocolate3.children[3].children[1].material, {
      duration: 0.3,
      opacity: 0,
    });
    chocolate3Trigger = "off";
  }

  //chocolate4
  if (Chocolateintersect4.length > 0 && chocolatesTrigger === "on") {
    console.log(chocolate4);
    chocolate4.children[0].children[0].material = transparentMaterialchocolate4;
    chocolate4.children[0].children[1].material = transparentMaterialchocolate4;
    transparentMaterialchocolate4.transparent = true;
    gsap.to(chocolate4.position, { duration: 0.5, y: -0.4 });
    gsap.to(chocolate4.children[0].position, {
      duration: 0.3,
      y: 2,
    });
    gsap.to(chocolate4.children[0].children[0].material, {
      duration: 0.3,
      opacity: 0,
    });
    gsap.to(chocolate4.children[0].children[1].material, {
      duration: 0.3,
      opacity: 0,
    });
    chocolate4Trigger = "off";
  }

  //chocolate5
  if (Chocolateintersect5.length > 0 && chocolatesTrigger === "on") {
    // console.log(chocolate5);
    chocolate5.children[2].children[0].material = transparentMaterialchocolate5;
    chocolate5.children[2].children[1].material = transparentMaterialchocolate5;
    transparentMaterialchocolate5.transparent = true;
    gsap.to(chocolate5.position, { duration: 0.5, y: -0.4 });
    gsap.to(chocolate5.children[2].position, {
      duration: 0.3,
      y: 2,
    });
    gsap.to(chocolate5.children[2].children[0].material, {
      duration: 0.3,
      opacity: 0,
    });
    gsap.to(chocolate5.children[2].children[1].material, {
      duration: 0.3,
      opacity: 0,
    });
    chocolate5Trigger = "off";
    goldHeartTrigger = "on";
  }

  //chocolate6
  if (Chocolateintersect6.length > 0 && chocolatesTrigger === "on") {
    // console.log(chocolate6);
    chocolate6.children[3].children[0].material = transparentMaterialchocolate6;
    chocolate6.children[3].material = transparentMaterialchocolate6;
    transparentMaterialchocolate6.transparent = true;
    gsap.to(chocolate6.position, { duration: 0.5, y: -0.4 });
    gsap.to(chocolate6.children[3].position, {
      duration: 0.3,
      y: 2,
    });
    gsap.to(chocolate6.children[3].children[0].material, {
      duration: 0.3,
      opacity: 0,
    });
    gsap.to(chocolate6.children[3].material, {
      duration: 0.3,
      opacity: 0,
    });
    chocolate6Trigger = "off";
  }

  //chocolate7
  if (Chocolateintersect7.length > 0 && chocolatesTrigger === "on") {
    console.log(chocolate7);
    chocolate7.children[2].children[0].material = transparentMaterialchocolate7;
    chocolate7.children[2].children[1].material = transparentMaterialchocolate7;
    transparentMaterialchocolate7.transparent = true;
    gsap.to(chocolate7.position, { duration: 0.5, y: -0.4 });
    gsap.to(chocolate7.children[2].children[1].position, {
      duration: 0.3,
      y: 2,
    });
    gsap.to(chocolate7.children[2].children[0].material, {
      duration: 0.3,
      opacity: 0,
    });
    gsap.to(chocolate7.children[3].children[1].material, {
      duration: 0.3,
      opacity: 0,
    });
    chocolate7Trigger = "off";
  }
  //chocolate8
  if (Chocolateintersect8.length > 0 && chocolatesTrigger === "on") {
    // console.log(chocolate8);
    chocolate8.children[2].children[0].material = transparentMaterialchocolate8;
    chocolate8.children[2].children[1].material = transparentMaterialchocolate8;
    transparentMaterialchocolate8.transparent = true;
    gsap.to(chocolate8.position, { duration: 0.5, y: -0.4 });
    gsap.to(chocolate8.children[2].position, {
      duration: 0.3,
      y: 2,
    });
    gsap.to(chocolate8.children[2].children[0].material, {
      duration: 0.3,
      opacity: 0,
    });
    gsap.to(chocolate8.children[2].children[1].material, {
      duration: 0.3,
      opacity: 0,
    });
    chocolate8Trigger = "off";
  }

  //chocolate9
  if (Chocolateintersect9.length > 0 && chocolatesTrigger === "on") {
    chocolate9.children[3].children[0].material = transparentMaterialchocolate9;
    chocolate9.children[3].children[1].material = transparentMaterialchocolate9;
    transparentMaterialchocolate9.transparent = true;
    gsap.to(chocolate9.position, { duration: 0.5, y: -0.4 });
    gsap.to(chocolate9.children[3].position, {
      duration: 0.3,
      y: 2,
    });
    gsap.to(chocolate9.children[3].children[0].material, {
      duration: 0.3,
      opacity: 0,
    });
    gsap.to(chocolate9.children[3].children[1].material, {
      duration: 0.3,
      opacity: 0,
    });
    chocolate9Trigger = "off";
  }

  //chocolate10
  if (Chocolateintersect10.length > 0 && chocolatesTrigger === "on") {
    console.log(chocolate10);
    chocolate10.children[4].children[0].material =
      transparentMaterialchocolate10;
    chocolate10.children[4].children[1].material =
      transparentMaterialchocolate10;
    transparentMaterialchocolate10.transparent = true;
    gsap.to(chocolate10.position, { duration: 0.5, y: -0.4 });
    gsap.to(chocolate10.children[4].position, {
      duration: 0.3,
      y: 2,
    });
    gsap.to(chocolate10.children[4].children[0].material, {
      duration: 0.3,
      opacity: 0,
    });
    gsap.to(chocolate10.children[4].children[1].material, {
      duration: 0.3,
      opacity: 0,
    });
    chocolate10Trigger = "off";
  }
  //chocolate11
  if (Chocolateintersect11.length > 0 && chocolatesTrigger === "on") {
    chocolate11.children[3].children[0].material =
      transparentMaterialchocolate11;
    chocolate11.children[3].children[1].material =
      transparentMaterialchocolate11;
    transparentMaterialchocolate11.transparent = true;
    gsap.to(chocolate11.position, { duration: 0.5, y: -0.4 });
    gsap.to(chocolate11.children[3].position, {
      duration: 0.3,
      y: 2,
    });
    gsap.to(chocolate11.children[3].children[0].material, {
      duration: 0.3,
      opacity: 0,
    });
    gsap.to(chocolate11.children[3].children[1].material, {
      duration: 0.3,
      opacity: 0,
    });

    chocolate11Trigger = "off";
  }

  //chocolate12
  if (Chocolateintersect12.length > 0 && chocolatesTrigger === "on") {
    console.log(chocolate12);
    chocolate12.children[3].children[0].material =
      transparentMaterialchocolate12;
    chocolate12.children[3].material = transparentMaterialchocolate12;
    transparentMaterialchocolate12.transparent = true;
    gsap.to(chocolate12.position, { duration: 0.5, y: 0 });
    gsap.to(chocolate12.children[3].position, {
      duration: 0.3,
      y: 0.5,
    });
    gsap.to(chocolate12.children[3].children[0].material, {
      duration: 0.3,
      opacity: 0,
    });
    gsap.to(chocolate12.children[3].material, {
      duration: 0.3,
      opacity: 0,
    });

    chocolate12Trigger = "off";
  }

  if (lidIntersects.length > 0 && lidTrigger === "on") {
    gsap.to(lid.position, { duration: 0.8, y: 1.5 });
    setTimeout(() => {
      lid.material = transparentMaterial2;
      gsap.to(lid.material, { duration: 0.8, opacity: 0 });
      chocolatesTrigger = "on";
    }, 200);
  }
  if (RibbonIntersects.length > 0) {
    // ribbonAnimation.play()
    ribbonTrigger = "on";
    setTimeout(() => {
      ribbon.children[1].material = transparentMaterial;
      bow.material = transparentMaterial;
      gsap.to(ribbon.position, { duration: 0.6, y: 1.5 });
      gsap.to(bow.position, { duration: 0.8, y: 1.5 });

      gsap.to(ribbon.children[1].material, { duration: 0.8, opacity: 0 });

      // console.log(ribbon.children[1].material)
    }, 10);
    setTimeout(() => {
      lidTrigger = "on";
    }, 200);
  }
  // if(intersects.length>0){
  //     if(play==="on"){
  //     createSingleSet(CANNON, THREE, intersects,defaultMaterial, singleGroup,scene, world, objectsToUpdate,plateArray)
  //     }
  //     else if(createSinglesetProperTrigger==="on"){
  //     createSingleSetProper(CANNON, THREE, intersects,defaultMaterial, singleGroup,scene, world, objectsToUpdate,plateArray)
  //     createSinglesetProperTrigger="off"
  //     singleSetDisplay="off"
  //     singleGroup.visible=false
  //     $(".menue").addClass("invisibleP")
  //     $(".monitor").removeClass("invisibleP")
  //     teaSetTriggers[currentTrigger]="off"
  //     }
  // }
  // if(plateIntersects.length>0){
  //     createMacaroon(plateIntersects[0])
  // }
});

const tick = () => {
  raycaster.setFromCamera(mouse, camera);

  if (chocolate1) {
    Chocolateintersect1 = raycaster.intersectObject(chocolate1);
  }
  if (chocolate2) {
    Chocolateintersect2 = raycaster.intersectObject(chocolate2);
  }
  if (chocolate3) {
    Chocolateintersect3 = raycaster.intersectObject(chocolate3);
  }
  if (chocolate4) {
    Chocolateintersect4 = raycaster.intersectObject(chocolate4);
  }
  if (chocolate5) {
    Chocolateintersect5 = raycaster.intersectObject(chocolate5);
  }
  if (chocolate6) {
    Chocolateintersect6 = raycaster.intersectObject(chocolate6);
  }
  if (chocolate7) {
    Chocolateintersect7 = raycaster.intersectObject(chocolate7);
  }
  if (chocolate8) {
    Chocolateintersect8 = raycaster.intersectObject(chocolate8);
  }
  if (chocolate9) {
    Chocolateintersect9 = raycaster.intersectObject(chocolate9);
  }
  if (chocolate10) {
    Chocolateintersect10 = raycaster.intersectObject(chocolate10);
  }

  if (chocolate11) {
    Chocolateintersect11 = raycaster.intersectObject(chocolate11);
  }
  if (chocolate12) {
    Chocolateintersect12 = raycaster.intersectObject(chocolate12);
  }
  if (lid) {
    lidIntersects = raycaster.intersectObject(lid);
  }
  if (ribbon) {
    RibbonIntersects = raycaster.intersectObject(ribbon);
  }

    if (GoldHeart) {
      goldHeartIntersects = raycaster.intersectObject(GoldHeart);
    }
  //   if()

  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;

  if (ribbonMixer) {
    if (RibbonIntersects.length > 0) {
      ribbonNudgeTrigger = "on";
    } else {
      ribbonNudgeTrigger = "off";
    }
    ribbonMixer.update(deltaTime);

    if (
      ribbonAnimation.time < 0.6 &&
      ribbonNudgeTrigger == "on" &&
      ribbonTrigger == "off"
    ) {
      ribbonAnimation.time += 0.08;
    } else if (
      ribbonAnimation.time < 1 &&
      ribbonNudgeTrigger == "on" &&
      ribbonTrigger == "on"
    ) {
      ribbonAnimation.time += 0.05;
    } else if (
      ribbonAnimation.time >= 0 &&
      ribbonNudgeTrigger == "off" &&
      ribbonTrigger == "off"
    ) {
      ribbonAnimation.time -= 0.08;
    }
  }

  controls.update();
  renderer.render(scene, camera);
  // effectComposer.render(scene, camera)
  // tableGroup.position.copy(tablebody.position)
  // tableGroup.quaternion.copy(tablebody.quaternion)
  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
