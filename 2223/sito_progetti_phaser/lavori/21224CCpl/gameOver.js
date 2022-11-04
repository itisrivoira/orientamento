class gameOver extends Phaser.Scene{
    constructor(){
        super("gameOver")
        this.mioTasto=""
    }
    preload(){
        this.load.image("gameOver", "./assets/gameOver.png")
    }

    create(){
        this.gameOver=this.add.image(370,300,"gameOver")
        this.gameOver.setScale(1.35)
        this.mioTasto=this.input.keyboard.createCursorKeys()
    }

    update(){
        if(this.mioTasto.space.isDown){
            this.scene.start("inizio")
        }
    }
}



export default gameOver