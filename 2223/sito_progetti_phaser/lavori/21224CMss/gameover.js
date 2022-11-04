class Gameover extends Phaser.Scene{
    constructor(){
        super("Gameover")
    }

    preload(){
        this.load.image("background", "./assets/background.png")
        this.load.image("dino", "./assets/character/dino.png")
        this.load.image("start", "./assets/start.png")
        this.load.image("gameover", "./assets/gameover.jpg")
    }
    create(){
        this.add.image(325,175, "background").setScale(0.35)
        this.add.image(325,125, "gameover").setScale(0.30).setDepth(1);
        this.buttonStart=this.add.image(325,225, "start").setScale(0.30).setDepth(1);
        this.buttonStart.setInteractive()
        this.buttonStart.on('pointerdown', function (pointer) {
            this.scene.start('game');
        }, this);
    }
    update(time,delta){

    }
}

export default Gameover