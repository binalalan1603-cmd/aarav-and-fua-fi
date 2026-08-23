import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";

import { GAME } from "./config.js";


export class AI {

    constructor(team, ball) {

        this.team = team;

        this.ball = ball;

        this.enabled = true;
    }


    // ==================================================
    // UPDATE AI
    // ==================================================

    update() {

        if (!this.enabled) {
            return;
        }


        if (!this.ball) {
            return;
        }


        const ballPosition =
            this.ball.mesh.position;


        // Find the player closest to the ball

        let closestPlayer = null;

        let closestDistance =
            Infinity;


        for (const player of this.team.players) {

            const distance =
                player.mesh.position.distanceTo(
                    ballPosition
                );


            if (distance < closestDistance) {

                closestDistance =
                    distance;

                closestPlayer =
                    player;
            }
        }


        if (!closestPlayer) {
            return;
        }


        // Move the closest player toward the ball

        const direction =
            new THREE.Vector3(
                ballPosition.x -
                closestPlayer.mesh.position.x,

                0,

                ballPosition.z -
                closestPlayer.mesh.position.z
            );


        if (
            direction.lengthSq() >
            0.01
        ) {

            direction.normalize();

            closestPlayer.move(
                direction
            );
        }


        // Everyone else slowly returns toward
        // their original formation position.

        for (const player of this.team.players) {

            if (player === closestPlayer) {
                continue;
            }

            // Boundary protection is still handled
            // by Player.update().

            player.update();
        }
    }
}
