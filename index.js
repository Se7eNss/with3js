


//loading
const textureloader = new THREE.TextureLoader();
const normaltexture = textureloader.load("static/texture/n1.png")
// Debug
// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.SphereBufferGeometry( .7, 64, 64, 100 );

// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material. roughness = 0.2
material.normalMap = normaltexture
material.color = new THREE.Color(0x292929)

// Mesh
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffbbaa, 0.1)
pointLight.position.x = 1
pointLight.position.y = 1
pointLight.position.z = 1
scene.add(pointLight)

const pointLight2 = new THREE.PointLight(0x3a9e87, 0.1)
pointLight2.position.set(-1,1,1)
pointLight2.intensity = 1
scene.add(pointLight2)

const pointLight3 = new THREE.PointLight(0xffffff, 0.1)
pointLight3.position.set(1,-2,1)
pointLight3.intensity = 1
scene.add(pointLight3)

// const pointLighthelper = new THREE.PointLightHelper(pointLight,0.11)
// scene.add(pointLighthelper)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

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
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 3
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha :true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
document.addEventListener('mousemove',MouseMove)
let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth/2;
const windowHalfY = window.innerHeight/2;

function MouseMove (event) {
  mouseX =(event.clientX - windowHalfX)
  mouseY = (event.clientY - windowHalfY)
}

const clock = new THREE.Clock()

const tick = () =>
{
    targetX = mouseX * .001
    targetY = mouseY * .001
    const elapsedTime = clock.getElapsedTime()
    
    // Update objects
    sphere.rotation.y = 0.5 * elapsedTime
    sphere.rotation.x += .3 * (targetY- sphere.rotation.x)
    sphere.rotation.y += .3 * (targetX- sphere.rotation.y)
    sphere.position.z += -.5 * (targetY- sphere.rotation.x)
    
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()