class livello3 extends Phaser.Scene{
    constructor(){
        super("livello3")
        this.mioTasto=""
    }
    preload(){
        this.load.image("sfondo", "./assets/sfondo.jpg")
        this.load.image("brick1", "./assets/brick1.png")
        this.load.image("brick2", "./assets/brick2.png")
        this.load.image("brick3", "./assets/brick3.png")
        this.load.image("base", "./assets/base.png")
        this.load.image("bomba", "./assets/bomba.png")
    }

    create(){
        this.punteggio=0
        this.giocoIniziato=false;
        this.sfondo=this.add.image(400,300,"sfondo")
        this.sfondo.setScale(1.3)
        this.base=this.physics.add.sprite(375,530, "base")
        this.base.setScale(0.3)
        this.base.setCollideWorldBounds(true);
        this.base.setImmovable(true)
        this.mioTasto=this.input.keyboard.createCursorKeys()
        this.bomba=this.physics.add.sprite(365,500,"bomba")
        this.bomba2=this.physics.add.sprite(390,500,"bomba")
        this.bomba.setScale(0.2)
        this.bomba2.setScale(0.2)
        this.physics.add.collider(this.bomba, this.base)
        this.physics.add.collider(this.bomba2, this.base)
        this.bomba.setCollideWorldBounds(true)
        this.bomba2.setCollideWorldBounds(true)
        this.gruppo1=this.physics.add.staticGroup({
            key:"brick1",
            repeat:6,
            setScale:{x:0.2, y:0.2},
            setXY:{
                x:80,
                y:110,
                stepX:100
            }
        })
        this.gruppo2=this.physics.add.staticGroup({
            key:"brick2",
            repeat:6,
            setScale:{x:0.2, y:0.2},
            
            setXY:{
                x:80,
                y:170,
                stepX:100
            }
        })
        this.gruppo3=this.physics.add.staticGroup({
            key:"brick3",
            repeat:6,
            setScale:{x:0.2, y:0.2},
            offset:{x:0,y:0},
            setXY:{
                x:80,
                y:230,
                stepX:100
            }
        })
        this.gruppo4=this.physics.add.staticGroup({
            key:"brick1",
            repeat:6,
            setScale:{x:0.2, y:0.2},
            offset:{x:0,y:0},
            setXY:{
                x:80,
                y:290,
                stepX:100
            }
        })
        this.gruppo1.children.iterateLocal('setSize', 80,30)
        this.gruppo2.children.iterateLocal('setSize', 80,30)
        this.gruppo3.children.iterateLocal('setSize', 80,30)
        this.gruppo4.children.iterateLocal('setSize', 80,30)
        this.score=this.data.set("score","")
        this.lives=this.data.set("lives",2)
        this.text= this.add.text(20,20,"",{font:"25px Arial", fill:"white"})
        this.text2= this.add.text(650,20,"",{font:"25px Arial", fill:"white"})
        this.livello3=this.add.text(300,310,"LEVEL 3",{font: "45px Arial", fill:"orange"})
        this.inizioLivello=this.add.text(50,360,"PRESS SPACE BAR TO START",{font:"45px Arial", fill:"orange"})
        this.text.setText([
            "Score: "+this.score.get("score")
        ])
        this.text2.setText([
            "Lives: "+this.lives.get("lives")
        ])
        this.fineLivello=this.add.text(50,350,"", {font:"45px Arial", fill:"orange"})
        this.bomba.setBounce(1,1)
        this.bomba2.setBounce(1,1)
        this.physics.world.checkCollision.down=false;
        this.physics.add.overlap(this.bomba, [this.gruppo1, this.gruppo2, this.gruppo3, this.gruppo4])
        this.physics.add.overlap(this.bomba2, [this.gruppo1, this.gruppo2, this.gruppo3, this.gruppo4])
        this.physics.add.collider(this.bomba, [this.gruppo1, this.gruppo2, this.gruppo3, this.gruppo4],(first,second)=>{
            second.destroy()
            this.punteggio+=10
            this.text.setText("Score: "+this.data.get("score")+String(this.punteggio))
            console.log(this.punteggio)
            if(this.bomba.body.velocity.x==0){
                let randNum= Math.random();
                if(randNum>=0.5){
                    this.bomba.setVelocityX(150)
                }else{
                    this.bomba.setVelocityX(-150)
                }
            }
        })
        this.physics.add.collider(this.bomba2, [this.gruppo1, this.gruppo2, this.gruppo3, this.gruppo3, this.gruppo4],(first,second)=>{
            second.destroy()
            this.punteggio+=10
            this.text.setText("Score: "+this.data.get("score")+String(this.punteggio))
            console.log(this.punteggio)
            if(this.bomba2.body.velocity.x==0){
                let randNum= Math.random();
                if(randNum>=0.5){
                    this.bomba2.setVelocityX(150)
                }else{
                    this.bomba2.setVelocityX(-150)
                }
            }
        })
        this.fine=false
    }

    update(){
        if(this.fine==false){
            if(this.mioTasto.right.isDown){
                this.base.setVelocityX(320)
            }
    
            if(Phaser.Input.Keyboard.JustUp(this.mioTasto.right)){
                this.base.setVelocityX(0);
            }
    
            if(this.mioTasto.left.isDown){
                this.base.setVelocityX(-320)
            }

            if(Phaser.Input.Keyboard.JustUp(this.mioTasto.left)){
                this.base.setVelocityX(0);
            }

            if (!this.giocoIniziato){
                this.bomba.setX(this.base.x)
                this.bomba2.setX(this.base.x)
                if(this.mioTasto.space.isDown){
                    this.giocoIniziato=true;
                    this.livello3.destroy()
                    this.inizioLivello.destroy()
                    this.bomba.setVelocityY(-100)
                    this.bomba2.setVelocityY(-100)
                }
            }

            if(this.bomba.y>this.base.y || this.bomba2.y>this.base.y){
                this.base.setX(375).setY(530)
                this.bomba.setX(365).setY(500)
                this.bomba2.setX(390).setY(500)
                this.bomba.setVelocityY(-100)
                this.bomba2.setVelocityY(-100)
                console.log(this.lives.list.lives)
                this.lives.list.lives-=1
                this.text2.setText("Lives: "+this.lives.list.lives)
                if(this.lives.list.lives==0){
                    this.scene.start("gameOver")
                    this.fine=true
                    this.bomba.setVelocityX(0)
                    this.bomba.setVelocityY(0)
                    this.bomba2.setVelocityX(0)
                    this.bomba2.setVelocityY(0)
                }
            }

            if(this.punteggio==280){
                this.bomba.setVelocityX(0)
                this.bomba.setVelocityY(0)
                this.bomba2.setVelocityX(0)
                this.bomba2.setVelocityY(0)
                this.fineLivello.setText("----------GAME FINISHED-----------\n TAP SPACE BAR TO RESTART")
                if(this.mioTasto.space.isDown){
                    this.scene.start("inizio")
                }
            }
        }
    }

}
export default livello3