import * as THREE from "./node_modules/three"

const width = window.innerWidth
const height = window.innerHeight

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize( width, height )
document.body.appendChild( renderer.domElement )

const geometry = new THREE.BoxGeometry( 1, 1, 1 )
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } )
const cube = new THREE.Mesh( geometry, material )

scene.add(cube)

camera.position.z = 5

const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

function onClick(event) {

    mouse.x = (event.clientX / width) * 2 - 1
    mouse.y = -(event.clientY / height) * 2 + 1

    raycaster.setFromCamera( mouse, camera )

    const intersects = raycaster.intersectObjects(scene.children)

    if (intersects.length > 0  && intersects[0].object === cube) {
        let red = Math.floor(Math.random() * 256)
        let green = Math.floor(Math.random() * 256)
        let blue = Math.floor(Math.random() * 256)
    
        const newMaterial =  new THREE.MeshBasicMaterial({ color: `rgb(${red}, ${green}, ${blue})` })
        cube.material = newMaterial
    
        renderer.render( scene, camera )
    }
}

function handleKeyboardInput(event) {
    if(event.keyCode == 38) cube.position.y += 0.02
    if(event.keyCode == 40) cube.position.y -= 0.02
    if(event.keyCode == 37) cube.position.x -= 0.02
    if(event.keyCode == 39) cube.position.x += 0.02
}

window.addEventListener("click", onClick, false)
window.addEventListener("keydown", handleKeyboardInput, false)

function animate() {
    requestAnimationFrame( animate )
    cube.rotation.x += 0.001
    cube.rotation.y += 0.001
    renderer.render( scene, camera )
}

animate()