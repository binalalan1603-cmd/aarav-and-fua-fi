import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";

import { GAME } from "./config.js";


export class Ball {

    constructor(scene) {

        this.scene = scene;


        // ==============================================
        // BALL
        // ==============================================

        const geometry =
            new THREE.SphereGeometry(
                GAME.BALL.RADIUS,
                24,
                24
            );


        const material =
            new THREE.MeshStandardMaterial({
                color: 0xffffff
            });


        this.mesh =
            new THREE.Mesh(
                geometry,
                material
            );


        this.mesh.castShadow = true;


        // ==============================================
        // PHYSICS
        // ==============================================

        this.velocity =
            new THREE.Vector3();


        this.mesh.position.set(
            0,
            GAME.BALL.RADIUS,
            0
        );


        scene.add(this.mesh);
    }


    // ==================================================
    // RESET
    // ==================================================

    reset(x = 0, z = 0) {

        this.mesh.position.set(
            x,
            GAME.BALL.RADIUS,
            z
        );


        this.velocity.set(
            0,
            0,
            0
        );
    }


    // ==================================================
    // KICK
    // ==================================================

    kick(direction, power = GAME.BALL.KICK_POWER) {

        if (!direction) {
            return;
        }


        const kickDirection =
            direction.clone();


        kickDirection.y = 0;


        if (kickDirection.lengthSq() === 0) {
            return;
        }


        kickDirection.normalize();


        this.velocity.copy(
            kickDirection.multiplyScalar(power)
        );
    }


    // ==================================================
    // UPDATE
    // ==================================================

    update() {

        this.mesh.position.x +=
            this.velocity.x;

        this.mesh.position.z +=
            this.velocity.z;


        // Friction

        this.velocity.multiplyScalar(
            GAME.BALL.FRICTION
        );


        // Stop extremely small movement

        if (this.velocity.lengthSq() < 0.00001) {

            this.velocity.set(
                0,
                0,
                0
            );
        }


        // Keep ball on ground

        this.mesh.position.y =
            GAME.BALL.RADIUS;
    }
}
