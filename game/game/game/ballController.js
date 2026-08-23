import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";

import { GAME } from "./config.js";


export class BallController {

    constructor(ball) {

        this.ball = ball;

        this.controlDistance = 1.5;
    }


    // ==================================================
    // KICK BALL
    // ==================================================

    kickFromPlayer(
        player,
        direction,
        power = GAME.BALL.KICK_POWER
    ) {

        if (!player) {
            return;
        }


        if (!direction) {
            return;
        }


        const distance =
            player.mesh.position.distanceTo(
                this.ball.mesh.position
            );


        if (
            distance >
            this.controlDistance
        ) {

            return;
        }


        const kickDirection =
            direction.clone();


        kickDirection.y = 0;


        if (
            kickDirection.lengthSq() === 0
        ) {

            return;
        }


        kickDirection.normalize();


        this.ball.kick(
            kickDirection,
            power
        );
    }


    // ==================================================
    // KEEP BALL INSIDE FIELD
    // ==================================================

    keepBallInsideField() {

        const radius =
            GAME.BALL.RADIUS;


        this.ball.mesh.position.x =
            THREE.MathUtils.clamp(
                this.ball.mesh.position.x,

                GAME.FIELD.MIN_X + radius,

                GAME.FIELD.MAX_X - radius
            );


        this.ball.mesh.position.z =
            THREE.MathUtils.clamp(
                this.ball.mesh.position.z,

                GAME.FIELD.MIN_Z + radius,

                GAME.FIELD.MAX_Z - radius
            );
    }


    // ==================================================
    // UPDATE
    // ==================================================

    update() {

        this.ball.update();

        this.keepBallInsideField();
    }
}
