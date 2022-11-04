import part1 from "./part1.js"
import part2 from "./part2.js"
import part3 from "./part3.js"
import part4 from "./part4.js"

let config = {
    type: Phaser.AUTO,
    backgroundColor: 0xCCFFFF,
    width: 960,
    height: 540,
    parent: "container",

    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: { gravity: 0, debug: false },
    },

    scene: [part1, part2, part3, part4]
};

let game = new Phaser.Game(config);