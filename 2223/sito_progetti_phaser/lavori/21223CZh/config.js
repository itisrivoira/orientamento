import primoLivello from "./scene/level1.js"
import UIScena from "./scene/UIScene.js";
import Loader from "./index.js"
import Gameover from "./scene/gameover.js";
import secondoLivello from "./scene/level2.js";
import terzoLivello from "./scene/level3.js";
import quartoLivello from "./scene/level4.js";
import quintoLivello from "./scene/level5.js";

var config = {
    width:1123,
    height: 600,
    parent: 'idGame',
    backgroundColor: 0xCCFFFF,
    physics:{
        default:"arcade",
        arcade:{gravity:{y:400},debug: false},
        
    },
    scene: [Loader, primoLivello, UIScena, Gameover, secondoLivello, terzoLivello, quartoLivello, quintoLivello]
 };
 let game = new Phaser.Game(config);
