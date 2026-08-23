import * as THREE from
    "https://cdn.jsdelivr.net/npm/three@0.165/build/three.module.js";

import { GAME } from "./config.js";


export class Player {

    constructor(
        scene,
        options = {}
    ) {

        this.scene = scene;

        this.name =
            options.name || "Player";

        this.color =
            options.color || 0x0055ff;


        // ==============================================
        // PLAYER BODY
        // ==============================================

        const geometry =
            new THREE.CapsuleGeometry(
                GAME.PLAYER.RADIUS,
                GAME.PLAYER.HEIGHT,
                6,
                12
            );


        const material =
            new THREE.MeshStandardMaterial({
                color: this.color
            });


        this.mesh =
            new THREE.Mesh(
                geometry,
                material
            );


        this.mesh.castShadow = true;


        // ==============================================
        // MOVEMENT
        // ==============================================

        this.speed =
            GAME.PLAYER.SPEED;


        this.direction =
            new THREE.Vector3();


        // ==============================================
        // POSITION
        // ==============================================

        this.mesh.position.y =
            GAME.PLAYER.HEIGHT / 2;


        scene.add(this.mesh);
    }


    // ==================================================
    // SET POSITION
    // ==================================================

    setPosition(x, z) {

        this.mesh.position.x = x;

        this.mesh.position.z = z;

        this.keepInsideField();
    }


    // ==================================================
    // MOVE
    // ==================================================

    move(direction) {

        if (!direction) {
            return;
        }


        this.direction.copy(direction);


        // Normalize so diagonal movement isn't faster

        if (this.direction.lengthSq() > 0) {

            this.direction.normalize();

        }


        this.mesh.position.x +=
            this.direction.x *
            this.speed;


        this.mesh.position.z +=
            this.direction.z *
            this.speed;


        // VERY IMPORTANT:
        // Keep the player inside the field.

        this.keepInsideField();
    }


    // ==================================================
    // FIELD BOUNDARY
    // ==================================================

    keepInsideField() {

        this.mesh.position.x =
            THREE.MathUtils.clamp(
                this.mesh.position.x,

                GAME.FIELD.MIN_X
                + GAME.PLAYER.BOUNDARY_MARGIN,

                GAME.FIELD.MAX_X
                - GAME.PLAYER.BOUNDARY_MARGIN
            );


        this.mesh.position.z =
            THREE.MathUtils.clamp(
                this.mesh.position.z,

                GAME.FIELD.MIN_Z
                + GAME.PLAYER.BOUNDARY_MARGIN,

                GAME.FIELD.MAX_Z
                - GAME.PLAYER.BOUNDARY_MARGIN
            );
    }


    // ==================================================
    // UPDATE
    // ==================================================

    update() {

        // Player update system will be expanded later.

        this.keepInsideField();
    }
}
