var config = {
    
    width: 460,
    height: 375,
    zoom: 2,
    backgroundColor: 0x000000,
    physics:{
        default:"arcade",
        arcade:{debug:false},
        
    },
    scene: [Menu, Presentazione, Inizio, DialogSangue, Opz, TrovaChiave, blackOut, amongUs, cantina, scendi, Elnath, dialogoLab, lab, finalFight] 
}

var game = new Phaser.Game(config);
var vol=4;
var lingua="ita";
var on_off="aS";
var arma=0
var Xp=0