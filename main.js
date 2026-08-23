import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";

// --------------------------------------------------
// SCENE
// --------------------------------------------------

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x87ceeb);


// --------------------------------------------------
// CAMERA
// --------------------------------------------------

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 25, 30);

camera.lookAt(0, 0, 0);


// --------------------------------------------------
// RENDERER
// --------------------------------------------------

const renderer = new THREE.WebGLRenderer({
    antialias: true
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.shadowMap.enabled = true;

document
    .getElementById("game")
    .appendChild(renderer.domElement);


// --------------------------------------------------
// LIGHTING
// --------------------------------------------------

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    0.7
);

scene.add(ambientLight);


const sun = new THREE.DirectionalLight(
    0xffffff,
    1.5
);

sun.position.set(
    20,
    40,
    20
);

sun.castShadow = true;

scene.add(sun);


// --------------------------------------------------
// TEMPORARY FIELD
// --------------------------------------------------

const fieldGeometry = new THREE.PlaneGeometry(
    100,
    64
);

const fieldMaterial = new THREE.MeshStandardMaterial({
    color: 0x168a35
});

const field = new THREE.Mesh(
    fieldGeometry,
    fieldMaterial
);

field.rotation.x = -Math.PI / 2;

field.receiveShadow = true;

scene.add(field);


// --------------------------------------------------
// RESIZE
// --------------------------------------------------

window.addEventListener(
    "resize",
    () => {

        camera.aspect =
            window.innerWidth /
            window.innerHeight;

        camera.updateProjectionMatrix();

        renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );

    }
);


// --------------------------------------------------
// GAME LOOP
// --------------------------------------------------

function animate() {

    requestAnimationFrame(animate);

    renderer.render(
        scene,
        camera
    );

}

animate();
