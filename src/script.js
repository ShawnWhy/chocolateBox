import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import {SphereGeometry, TextureLoader , CubeTextureLoader} from 'three'
import $ from "./Jquery"
import gsap from "gsap";
 const sizes = {
   width: window.innerWidth,
   height: window.innerHeight,
 };
const gltfLoader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader()
const floorTexture = textureLoader.load('/checker1.jpg')
floorTexture.repeat.set(6,6)
floorTexture.wrapT = THREE.MirroredRepeatWrapping
floorTexture.wrapS = THREE.MirroredRepeatWrapping

const floorMaterial = new THREE.MeshBasicMaterial({map:floorTexture})
var audioPorcelin = new Audio('/mug.wav');
// audioCup.volume=.5
// Canvas
const canvas = document.querySelector('canvas.webgl')
// Scene
const scene = new THREE.Scene()
//raycaster
const objectsToUpdate = []
// Create sphere
const sphereGeometry = new THREE.SphereGeometry(1, 8, 8)
//global variables
let Chocolateintersects=[]
let RibbonIntersects = [];
let lidIntersects = []
let ribbonTrigger = "on";
let lidTrigger = "off";
let chocolatesTrigger = "off"
let chcolateBox = null;
let ribbon = null;
let lid = null;
let ribbonMixer = null;
let GoldHeart = null




const quotes = [
    "Words bounce. Words, if you let them, will do what they want to do and what they have to do.- Anne Carson",
"To be running breathlessly, but not yet arrived, is itself delightful, a suspended moment of living hope. - Anne Carson",
"As Sokrates tells it, your story begins the moment Eros enters you. That incursion is the biggest risk of your life. How you handle it is an index of the quality, wisdom, and decorum of the things inside you. As you handle it you come into contact with what is inside you, in a sudden and startling way. You perceive what you are, what you lack, what you could be.-Anne Carson",
"For centuries poets, some poets, have tried to give a voice to the animals, and readers, some readers, have felt empathy and sorrow. If animals did have voices, and they could speak with the tongues of angels--at the very least with the tongues of angels--they would be unable to save themselves from us. What good would language do? Their mysterious otherness has not saved them, nor have their beautiful songs and coats and skins and shells and eyes. We discover the remarkable intelligence of the whale, the wolf, the elephant--it does not save them, nor does our awareness of the complexity of their lives. Their strength, their skills, their swiftness, the beauty of their flights. It matters not, it seems, whether they are large or small, proud or shy, docile or fierce, wild or domesticated, whether they nurse their young or brood patiently on eggs. If they eat meat, we decry their viciousness; if they eat grasses and seeds, we dismiss them as weak. There is not one of them, not even the songbird who cannot, who does not, conflict with man and his perceived needs and desires. St. Francis converted the wolf of Gubbio to reason, but he performed this miracle only once and as miracles go, it didn’t seem to capture the public’s fancy. Humans don’t want animals to reason with them. It would be a disturbing, unnerving, diminishing experience; it would bring about all manner of awkwardness and guilt.― Joy Williams",
"Wouldn't it be wonderful if I won a helicopter in a crossword puzzle competition? There is not much hope though I am afraid, as they never give such practical prizes.-Leonora Carrington"  

]

let colorfulMaterials = [

 new THREE.MeshStandardMaterial({color:"#F3A56B"}),
 new THREE.MeshStandardMaterial({color:"#7BE8F3"}),
new THREE.MeshStandardMaterial({color:"#5EF097"}),
new THREE.MeshStandardMaterial({color:"#EE5E92"}),
]

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    if(sizes.width>860){
        camera.position.set(0, 1.5, -2)
        }
        else if (sizes.width>450){
            camera.position.set(0,1.5,-2)
        }
        else{
            camera.position.set(0, 1.5, -2)
        }
})



const mouse = new THREE.Vector2()
mouse.x = null
mouse.y=null


window.addEventListener('mousemove', (event) =>
{
    mouse.x = event.clientX / sizes.width * 2 - 1
    mouse.y = - (event.clientY / sizes.height) * 2 + 1
    
})


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


gltfLoader.load(
    '/box.glb',
    (gltf) =>
    {
        chcolateBox=gltf.scene
        console.log(chcolateBox);

        scene.add(chcolateBox);
    }
)



/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight('#7FFFD4', .5)
scene.add(ambientLight)
const directionalLight = new THREE.DirectionalLight('#F5F5DC', 2)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.far = 15
directionalLight.shadow.camera.left = - 7
directionalLight.shadow.camera.top = 7
directionalLight.shadow.camera.right = 7
directionalLight.shadow.camera.bottom = - 7
directionalLight.position.set(- 5, 5, 0)
scene.add(directionalLight)
const directionalLight2 = new THREE.DirectionalLight('#5F9EA0', 1)
directionalLight2.castShadow = true
directionalLight2.shadow.mapSize.set(1024, 1024)
directionalLight2.shadow.camera.far = 15
directionalLight2.shadow.camera.left = - 7
directionalLight2.shadow.camera.top = 7
directionalLight2.shadow.camera.right = 7
directionalLight2.shadow.camera.bottom = - 7
directionalLight2.position.set(5, 5, 0)
scene.add(directionalLight2)
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(60, sizes.width / sizes.height, 0.1, 100)
camera.focus=20
if(sizes.width>860){
camera.position.set(0, 1.5, -2)
}
else if (sizes.width>450){
    camera.position.set(0,1.5,-2)
}
else{
    camera.position.set(0, 1.5, -2)
}
scene.add(camera)
// Controls
const controls = new OrbitControls(camera, canvas)
// controls.target.set(4, 2, 0)
controls.enableDamping = true
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})


renderer.setClearColor( 'orange',.5);
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */

let oldElapsedTime=null;

const clock = new THREE.Clock()
let previousTime = 0
const raycaster = new THREE.Raycaster()

$(window).click(()=>{
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
  
    
})







const tick = () =>
   
{
    
raycaster.setFromCamera(mouse, camera)



// if(plateArray.length>0){
        
//     plateIntersects = raycaster.intersectObjects(plateArray)
    
//     }
   

    
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - oldElapsedTime
    oldElapsedTime = elapsedTime



    if(ribbonMixer)
    {
        ribbonMixermixer.update(deltaTime)
    }

    controls.update()
    renderer.render(scene, camera)
    // effectComposer.render(scene, camera)
    // tableGroup.position.copy(tablebody.position)
    // tableGroup.quaternion.copy(tablebody.quaternion)
    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()