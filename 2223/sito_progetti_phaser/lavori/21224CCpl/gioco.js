import inizio from "./inizio.js"
import gameOver from "./gameOver.js"
import livello2 from "./livello2.js"
import livello3 from "./livello3.js"

    let config = {
       type: Phaser.AUTO,
       backgroundColor: 0xCCFFFF,
       width: 750,
       height: 550,
       parent:"contenitore",

       pixelArt:true,
       physics: {
       default: 'arcade',
       arcade:{debug:true},
       
       },
       

       scene: [inizio,gameOver, livello2, livello3]
    };

    let game = new Phaser.Game(config);