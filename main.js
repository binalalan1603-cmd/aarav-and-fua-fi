import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";

import { GAME } from "./game/config.js";
import { Stadium } from "./game/stadium.js";
import { Team } from "./game/team.js";
import { Ball } from "./game/ball.js";
import { BallController } from "./game/ballController.js";
import { AI } from "./game/ai.js";


// ==================================================
// SCENE
// ==================================================

const scene =
    new THREE.Scene();

scene.background =
    new THREE.Color(0x87ceeb);


// ==================================================
// CAMERA
// ==================================================

const camera =
    new THREE.PerspectiveCamera(
        GAME.CAMERA.FOV,

        window.innerWidth /
        window.innerHeight,

        GAME.CAMERA.NEAR,

        GAME.CAMERA.FAR
    );


camera.position.set(
    0,
    GAME.CAMERA.HEIGHT,
    GAME.CAMERA.DISTANCE
);


camera.lookAt(
    0,
    0,
    0
);


// ==================================================
// RENDERER
// ==================================================

const renderer =
    new THREE.WebGLRenderer({
        antialias: true
    });


renderer.setSize(
    window.innerWidth,
    window.innerHeight
);


renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        2
    )
);


renderer.shadowMap.enabled =
    true;


document
    .getElementById("game")
    .appendChild(
        renderer.domElement
    );


// ==================================================
// LIGHTING
// ==================================================

const ambientLight =
    new THREE.AmbientLight(
        0xffffff,
        0.7
    );


scene.add(
    ambientLight
);


const sun =
    new THREE.DirectionalLight(
        0xffffff,
        1.5
    );


sun.position.set(
    20,
    40,
    20
);


sun.castShadow =
    true;


scene.add(
    sun
);


// ==================================================
// STADIUM
// ==================================================

const stadium =
    new Stadium(scene);


// ==================================================
// BALL
// ==================================================

const ball =
    new Ball(scene);


const ballController =
    new BallController(ball);


// ==================================================
// TEAMS
// ==================================================

const homeTeam =
    new Team(
        scene,
        {
            name: "Home",
            color: 0x0055ff
        }
    );


const awayTeam =
    new Team(
        scene,
        {
            name: "Away",
            color: 0xff2222,

            formation:
                createAwayFormation()
        }
    );


// ==================================================
// AI
// ==================================================

const awayAI =
    new AI(
        awayTeam,
        ball
    );


// ==================================================
// AWAY FORMATION
// ==================================================

function createAwayFormation() {

    return [

        { x: 0, z: 27 },

        { x: -30, z: 20 },
        { x: -10, z: 20 },
        { x: 10, z: 20 },
        { x: 30, z: 20 },

        { x: -25, z: 8 },
        { x: -8, z: 5 },
        { x: 8, z: 5 },
        { x: 25, z: 8 },

        { x: -12, z: -8 },
        { x: 12, z: -8 }
    ];
}


// ==================================================
// KEYBOARD CONTROLS
// ==================================================

const keys = {};


window.addEventListener(
    "keydown",
    event => {

        keys[
            event.key.toLowerCase()
        ] = true;
    }
);


window.addEventListener(
    "keyup",
    event => {

        keys[
            event.key.toLowerCase()
        ] = false;
    }
);


// ==================================================
// CONTROL PLAYER
// ==================================================

const controlledPlayer =
    homeTeam.players[10];


function updateControls() {

    const direction =
        new THREE.Vector3();


    if (keys["w"] || keys["arrowup"]) {

        direction.z -= 1;
    }


    if (keys["s"] || keys["arrowdown"]) {

        direction.z += 1;
    }


    if (keys["a"] || keys["arrowleft"]) {

        direction.x -= 1;
    }


    if (keys["d"] || keys["arrowright"]) {

        direction.x += 1;
    }


    if (
        direction.lengthSq() > 0
    ) {

        controlledPlayer.move(
            direction
        );
    }
}


// ==================================================
// KICK
// ==================================================

window.addEventListener(
    "keydown",
    event => {

        if (
            event.code === "Space"
        ) {

            const direction =
                new THREE.Vector3(
                    0,
                    0,
                    -1
                );


            ballController.kickFromPlayer(
                controlledPlayer,
                direction,
                GAME.BALL.KICK_POWER
            );
        }
    }
);


// ==================================================
// RESIZE
// ==================================================

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


// ==================================================
// GAME LOOP
// ==================================================

function animate() {

    requestAnimationFrame(
        animate
    );


    updateControls();


    homeTeam.update();


    awayAI.update();


    ballController.update();


    renderer.render(
        scene,
        camera
    );
}


animate();
