import Menu from "./menu.js"
import Game from "./game.js"
import Menu2 from "./menu2.js"
import Gameover from "./gameover.js"


    let config = {
       type: Phaser.AUTO,
       backgroundColor: 0xCCFFFF,
       width: 640,
       height: 360,
       parent:"contenitore",

       pixelArt:true,
      
       physics: {
       default: 'arcade',
       arcade:{gravity:{y:100},debug:true},
       
       },
       
    

       scene: [Menu, Game, Menu2, Gameover]
    };
   
    let game = new Phaser.Game(config);
    

  


