import * as THREE from '../three.js-master/build/three.module.js'
import {GLTFLoader} from '../three.js-master/examples/jsm/loaders/GLTFLoader.js'
//import {STLLoader} from "../three.js-master/examples/jsm/loaders/STLLoader.js"
import {OrbitControls} from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";
import {rooms} from './suggestions.js'
import * as sceneryHandler from './sceneryHandler.js'

const canvas = document.querySelector('.webgl')
const scene = new THREE.Scene()
const loader = new GLTFLoader()

const sphereMesh = sceneryHandler.createSphere()
const arrow = sceneryHandler.createArrow()
load("Models/ELEKARTA.glb", 0.14, -12, -16, 8, -Math.PI/2)
load("Models/Våning0.glb", 0.1, 0, -20, 0,0)

scene.add(sceneryHandler.createSkybox())
scene.add(sphereMesh)
scene.add(arrow)

const camera = setupCamera()
scene.add(camera)
const renderer = setupRenderer()
let controls = setupControls()

setupLights()
animate()

//_________________________________________________________________________

function setupCamera(){
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 5000)
    camera.position.set(0, 1, 2)

    return camera
}

function setupRenderer(){
    const renderer = new THREE.WebGLRenderer({canvas});
    renderer.setClearColor( 0xb3e3ff, 1 )
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min (window. devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.gammaOuput = true

    return renderer
}

function setupControls(){
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.maxDistance = 1500
    controls.maxZoom = 0.1
    controls.target.set(-10,-9,6)
    controls.maxPolarAngle = Math.PI/2
    controls.update()

    return controls
}
   
function setupLights(){
    const light1 = new THREE.DirectionalLight(0xfffade,0.8)
    const light2 = new THREE.AmbientLight(0xfffade, 0.3)

    light1.position.set(0,1,1)

    scene.add(light1)
    scene.add(light2)
}

export function load(adress, scale, x, y, z, rotation){
    loader.load(adress, function(glb){      
        let object = glb.scene 
        object.scale.set(scale,scale*0.7,scale)
        object.rotateY(rotation)
        object.position.set(x,y,z)
        object.material = new THREE.MeshNormalMaterial()
        scene.add(object)
        
        camera.position.set(sphereMesh.position.x, parseFloat(sphereMesh.position.y) + 15, sphereMesh.position.z)
        camera.lookAt(sphereMesh.position)
        
        //fult. Finns bättre lösning?

    })
    
}

export function moveHighlighter(vector){
    sphereMesh.position.set(vector.x, vector.y, vector.z)
    arrow.position.set(vector.x, parseFloat(vector.y) + 2, vector.z) 
    controls.target.set(parseFloat(vector.x), parseFloat(vector.y), parseFloat(vector.z))
}

function animate(){
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}