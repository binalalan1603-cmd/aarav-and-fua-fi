import { Player } from "./player.js";
import { GAME } from "./config.js";


export class Team {

    constructor(scene, options = {}) {

        this.scene = scene;

        this.name =
            options.name || "Team";

        this.color =
            options.color || 0x0055ff;

        this.players = [];

        this.formation =
            options.formation || this.createDefaultFormation();


        this.createPlayers();
    }


    // ==================================================
    // DEFAULT 11-PLAYER FORMATION
    // ==================================================

    createDefaultFormation() {

        return [

            // Goalkeeper
            { x: 0, z: -27 },

            // Defenders
            { x: -30, z: -20 },
            { x: -10, z: -20 },
            { x: 10, z: -20 },
            { x: 30, z: -20 },

            // Midfielders
            { x: -25, z: -8 },
            { x: -8, z: -5 },
            { x: 8, z: -5 },
            { x: 25, z: -8 },

            // Attackers
            { x: -12, z: 8 },
            { x: 12, z: 8 }
        ];
    }


    // ==================================================
    // CREATE PLAYERS
    // ==================================================

    createPlayers() {

        this.formation.forEach(
            (position, index) => {

                const player =
                    new Player(
                        this.scene,
                        {
                            name:
                                `${this.name} ${index + 1}`,

                            color:
                                this.color
                        }
                    );


                player.setPosition(
                    position.x,
                    position.z
                );


                player.team =
                    this;


                player.number =
                    index + 1;


                this.players.push(
                    player
                );
            }
        );
    }


    // ==================================================
    // UPDATE
    // ==================================================

    update() {

        for (const player of this.players) {

            player.update();
        }
    }
}
