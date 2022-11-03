var cammina=0

class blackOut extends Phaser.Scene{
    constructor(){
        super("blackOut")
    }
    preload(){
        this.load.audio('basso', 'assets/audio/tempoBasso.mp3');
        this.load.image("tiles","./assets/casa.png");
        this.load.image("tiles2","./assets/casaSpenta.png");
        this.load.tilemapTiledJSON('map',"./assets/map1.json");
        this.load.atlas('bob', './assets/bob/bob.png', './assets/bob/bob.json');
        this.load.image("dialogo","./assets/dialoghi/blackout.png");
        this.load.image("avanti","./assets/dialoghi/freccia.png");
        this.load.image("achievement","./assets/achievement.png");
    }
    create(){

        this.omino = this.physics.add.sprite(660, 915, 'bob').setDragX(500).setDragY(500).setScale(1.2).setDepth(4);
        this.mioTasto = this.input.keyboard.createCursorKeys();

        let dial
        let nom
        let achv
        let sblocco

        //suono
        this.sottof = this.sound.add('basso', { loop: -1 });
        this.sottof.setVolume(vol);
        this.sottof.play();

        //animazioni

        this.anims.create({ key: 'right', frames: this.anims.generateFrameNames('bob', { prefix: 'right', end: 5, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'left', frames: this.anims.generateFrameNames('bob', { prefix: 'left', end: 5, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'up', frames: this.anims.generateFrameNames('bob', { prefix: 'up', end: 5, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'down', frames: this.anims.generateFrameNames('bob', { prefix: 'down', end: 5, zeroPad: 4}), frameRate: 10, repeat: -1});
        this.anims.create({ key: 'turn', frames: this.anims.generateFrameNames('bob', { prefix: 'idle', end: 5, zeroPad: 4}), frameRate: 10, repeat: -1});
        
        setTimeout(() =>{
            dial= this.add.image(-2.5,0,"dialogo").setDepth(1).setScale(0.5).setOrigin(0);
            nom = this.add.text(20, 290, "Bob:", {font: "18px Courier", fill: "black"}).setDepth(2);
            achv=this.add.image(130,-10,"achievement").setOrigin(0).setDepth(3).setScale(0.25);
            if(lingua=="ita"){
                sblocco = this.add.text(193, 23, "Chiave trovata", {font: "13px Courier", fill: "white"}).setDepth(4);
            } else if(lingua=="ing"){
                sblocco = this.add.text(210, 23, "key found", {font: "13px Courier", fill: "white"}).setDepth(4);
            }
        }, 1000)
        setTimeout(() => {
            if(lingua=="ita"){
            var scr1 = this.add.text(20, 315, "E' saltata la corrente...", {font: "13px Courier", fill: "black"}).setDepth(2);
            } else if(lingua=="ing"){
                 var scr1 = this.add.text(20, 315, "The power went out...", {font: "13px Courier", fill: "black"}).setDepth(2);
            }
            setTimeout(() => {
                if(lingua=="ita"){
                     var scr2 = this.add.text(20, 330, "Devo andare a ricollegare il generatore prima di\npoter andare in cantina!", {font: "13px Courier", fill: "black"}).setDepth(2);
                } else if(lingua=="ing"){
                     var scr2 =this.add.text(20, 330, "I have to go and reconnect the generator before\nI can go to the cellar!", {font: "13px Courier", fill: "black"}).setDepth(2);
                }
                setTimeout(() => {
                    let playButton= this.add.image(400,295,"avanti").setOrigin(0).setDepth(4).setScale(0.075);
                    playButton.setInteractive();
                    playButton.on('pointerdown', ()=>{
                        dial.setVisible(false);
                        cammina=1;
                        playButton.setVisible(false);
                        nom.setVisible(false);
                        scr1.setVisible(false);
                        scr2.setVisible(false);
                        achv.setVisible(false);

                        //mappa
                        const map = this.make.tilemap({key:"map",tileWidth:35,tileHeight:35});
                        const tileset = map.addTilesetImage("casaSpenta","tiles2");
                        const layer = map.createLayer("spento", tileset, 0, 0);
                        const ostacoli2 = map.createLayer("ostacoli", tileset, 0, 0);
                        const ostacoli = map.createLayer("ostacoli2", tileset, 0, 0);
                        const elettricita2 = map.createLayer("elettricita", tileset, 0, 0);
                        const elettricita = map.createLayer("elettricita2", tileset, 0, 0);

                        this.physics.add.collider(this.omino,ostacoli2);
                        ostacoli2.setCollisionByProperty({colliders:true});
                        ostacoli2.setCollisionBetween(164,180);
                        ostacoli2.setCollisionBetween(388,392);
                        ostacoli2.setCollisionBetween(420,429);
                        ostacoli2.setCollisionBetween(205,211);
                        ostacoli2.setCollisionBetween(436,439);
                        ostacoli2.setCollisionBetween(712,729);
                        ostacoli2.setCollision([456,488,213,196,197,198,199,228,229,230,260,261,262,263,264,292,293,294,295,296,324,325,326,327,328,356,267,204,236,268,333,364,301,269,237,239,272,273,304,336,368,400,431,432,433,465,245,277,309,341,373,405,472,504,530,531,532,503,535,568,536,537,569,601,632,665,697,728,696,596,597,628,629,630,685,620,621,622,590,591,592,593,594,684,652,588,589,557,617,618,619,649,650,651,681,682,683,553,521,526,527,558,559,560]);
                        
                        this.physics.world.setBounds(0,0,map.widthInPixels,map.heightInPixels);
                        this.cameras.main.startFollow(this.omino); 

                        this.physics.add.collider(this.omino, elettricita2,(primo, secondo) =>{
                            this.sottof.stop();
                            this.scene.start("amongUs");
                            
                        });

                        elettricita2.setCollisionByProperty({colliders:true});
                        elettricita2.setCollision(212);

                    });
                }, 2000)
            }, 1800)
        }, 500)

    }

    update(time,delta){

        if (this.mioTasto.left.isDown && cammina==1)
        {
            this.omino.setVelocityX(-160);

            this.omino.anims.play('left', true);
        }
        else if (this.mioTasto.right.isDown && cammina==1)
        {
            this.omino.setVelocityX(160);

            this.omino.anims.play('right', true);
        }
        else if (this.mioTasto.down.isDown && cammina==1)
        {
            this.omino.setVelocityY(160);

            this.omino.anims.play('down', true);
        }
        else if (this.mioTasto.up.isDown && cammina==1)
        {
            this.omino.setVelocityY(-160);

            this.omino.anims.play('up', true);
        }
        else
        {
            this.omino.setVelocityX(0);

            this.omino.anims.play('turn', true);
        }
        
    }

}