class game extends Phaser.Scene{
    constructor(){
        super("game")
    }

    preload(){
        this.load.image("background", "./assets/background.png")
        this.load.image("street", "./assets/road.png")
        this.load.image("pizza", "./assets/pizza.png")
        this.load.image("bomb", "./assets/bomb.png")
        this.load.image("bonus", "./assets/bonus.png")
        this.load.image("hotdog", "./assets/hotdog.png")
        this.load.image("hamburger", "./assets/hamburger.png")
        this.load.image("chicken", "./assets/chicken.png")
        this.load.image("start", "./assets/start.png")
        this.load.image("pause", "./assets/pause.jpg")
        this.load.spritesheet("dino", "./assets/character/DinoSprites.png", {
             frameWidth: 40,
             frameHeight: 24
         }) 
    }
    create(){
        this.add.image(325,175, "background").setScale(0.35)
        this.street=this.physics.add.sprite(320,340,"street").setScale(0.33);
        this.buttonPause=this.add.image(600,20, "pause").setScale(0.17)
        this.dino = this.physics.add.sprite(200,285, "dino").setScale(1.8)
        this.physics.add.collider(this.dino, this.street)
        this.street.setBounce(0)
        this.dino.setCollideWorldBounds(true)
        this.street.setCollideWorldBounds(true)
        this.dino.setDragX(2000)
        this.buttonPause.setInteractive()
        var punteggio = 0
        const stringa=this.add.text(10,10,"Punteggio: " + punteggio)
        this.buttonPause.on('pointerdown', function (pointer) {
            this.scene.start('Menu2');
        }, this);
        this.cibo=this.physics.add.group()
        this.bombe=this.physics.add.group()
        this.cibi=["pizza","chicken","bonus","hotdog"]
        const velocity = 200
      
        this.cibario=this.cibo.create(Phaser.Math.Between(0, 640), 0,this.cibi[Phaser.Math.Between(0,3)]).setScale(0.13)
        
        this.bomb=this.bombe.create(Phaser.Math.Between(0,640),16,"bomb").setScale(0.2)
        
        this.physics.add.collider(this.cibo,this.street,()=>{
            this.cibario.destroy()
            this.bomb=this.bombe.create(Phaser.Math.Between(0,640),16,"bomb").setScale(0.2)
            this.cibario=this.cibo.create(Phaser.Math.Between(0, 640), 0,this.cibi[Phaser.Math.Between(0,3)]).setScale(0.13)
        })
        this.physics.add.collider(this.cibo,this.dino,()=>{
            this.cibario.destroy()
            this.cibario=this.cibo.create(Phaser.Math.Between(0, 640), 0,this.cibi[Phaser.Math.Between(0,3)]).setScale(0.13)
            punteggio=punteggio+1
            this.bomb=this.bombe.create(Phaser.Math.Between(0,640),0,"bomb").setScale(0.2)
            this.bombe.setVelocityY(velocity+10)
            stringa.setText("Punteggio: " + punteggio)
            this.cibo.setVelocityY(velocity+10)
        })
        if (punteggio>5){
            this.bomb=this.bombe.create(Phaser.Math.Between(0,640),16,"bomb").setScale(0.2)
        }
        this.physics.add.collider(this.dino,this.bombe,()=>{
            this.scene.start('Gameover');
        })
        this.myKey=this.input.keyboard.createCursorKeys()
        }
    update(time,delta){  
        if(this.myKey.right.isDown){
            this.dino.setVelocityX(300)
            this.dino.setFlipX(false)
        }
        else if(this.myKey.left.isDown){
            this.dino.setFlipX(true)
            this.dino.setVelocityX(-300)
        }
        else{
            
        }
    }
}

export default game