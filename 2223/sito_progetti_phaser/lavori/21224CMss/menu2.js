class Menu2 extends Phaser.Scene{
    constructor(){
        super("Menu2")
    }

    preload(){
        this.load.image("background", "./assets/background.png")
        this.load.image("dino", "./assets/character/dino.png")
        this.load.image("start", "./assets/start.png")
    }
    create(){
        this.add.image(325,175, "background").setScale(0.35)
        this.buttonStart=this.add.image(325,225, "start").setScale(0.30).setDepth(1);
        this.buttonStart.setInteractive()
        this.buttonStart.on('pointerdown', function (pointer) {
            this.scene.start('game');
        }, this);
    }
    update(time,delta){

    }
}

export default Menu2