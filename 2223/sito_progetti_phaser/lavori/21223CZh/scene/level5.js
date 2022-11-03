import eventsCenter from "../eventCenter.js";
import Common from "../Common.js";

class quintoLivello extends Common{

    constructor(){
        super("level5", 5);
    }

    preload() {
        super.preload();
        this.load.tilemapTiledJSON("level5", "assets/level5.json");
    }

    create(){
        super.create();

        eventsCenter.emit("updateLevel", this.level);

        let floor = [25, 1, 2, 32, 33, 34];

        // create map
        const map = this.make.tilemap({
            key: "level5",
            tileWidth: 32,
            tileHeight: 32
        });

        this.enemies = this.createEnemies({context: this, enemies: [
            ["hyena", 253, 425, 256, 550],
            ["scorpio", 305, 425, 305, 385],
            ["mummy", 70, 585, 70, 306],
            ["deceased", 206,585, 206,376],
            ["snake", 673, 265, 673, 875],
            ["hyena", 803, 265, 803, 970],
            ["deceased", 1056,265, 1056,1173],
            ["scorpio", 1113, 265, 1113, 1276],
            ["mummy", 1370, 361, 1370, 1533],
            ["snake", 1443, 361, 1443, 1663],
            ["scorpio", 1466, 585, 1680],
            ["mummy", 1590, 585, 1817]
        ]});

        eventsCenter.emit("setEnemyNumber", this.enemies.length);

        let enemyArr =[];

        this.enemies.forEach((val) =>{
            enemyArr.push(val.obj);
        });

        // set tilesets
        const backgroundTileset = map.addTilesetImage("background", "backgroundTileset");
        const coinTileset = map.addTilesetImage("coin", "coinsTileset");

        // set layers 
        const backgroundLayer = map.createLayer("background", backgroundTileset, 0, 0);
        const coinLayer = map.createLayer("coins", coinTileset, 0, 0);

        // set collision
        backgroundLayer.setCollision([5, 14, 13, 25, 32, 33, 1, 2, 3, 11, 34, 16]);
        coinLayer.setCollision(61);
        this.uped = 2;

        // set collision callback
        this.physics.add.collider(this.player, backgroundLayer, (player, layer) => {
                
                if(floor.indexOf(layer.index) != -1 && this.uped < 2)
                {
                    player.anims.play("player_walk");
                    this.uped = 2;
                }

            }
        );

        this.physics.add.overlap(this.player, coinLayer, (player, coin) => {
            if(coin.index == 61)
            {
                coin.layer.tilemapLayer.removeTileAt(coin.x, coin.y);
                eventsCenter.emit("updateScore", this.level);
                eventsCenter.emit("updateHP", this.level, this.level);
            }
        })

        this.f = true;
        this.time.addEvent({
            delay: 1000,
            callback: () =>{
                this.f = true;
            },
            callbackScope:this,
            loop:true
        });

        this.physics.add.collider(enemyArr, backgroundLayer);

        this.physics.add.overlap(this.player, enemyArr, (player, enemy) => {
            let key = this.input.keyboard.createCursorKeys();

            if(this.player.hp <= 0){
                eventsCenter.emit("gameover","1");
            }
            
            if(enemy.hp <= 0){
                eventsCenter.emit("updateEnemyNumber");
                enemy.destroy();
                enemy.text.destroy();
            }

            if(player.scene != undefined){
                if(Phaser.Input.Keyboard.JustDown(key.space)){
                    player.anims.play("player_attack");
                    player.anims.chain("player_idle");

                    if(enemy.scene != undefined){
                        enemy.hp -= player.attackValue; 
                    }
                }
            }

            if(enemy.scene != undefined){
                enemy.setVelocityX(0);

                if(enemy.anims.currentAnim.key != `${enemy.name}_attack`){
                    enemy.play(`${enemy.name}_attack`);
                }

                if(this.f){
                    eventsCenter.emit("updateHP", -enemy.attackValue*this.level, this.level);
                    this.f = false;
                }

                if(player.scene != undefined){
                    let offset = player.x-enemy.x;

                    if(offset < 0 )
                    {
                        enemy.flipX = false;
        
                        if(enemy.name == "snake"){
                            enemy.body.setOffset(19,30);
                            enemy.body.setSize(30,18, false);
                        }else if(enemy.name == "scorpio"){
                            enemy.body.setOffset(14,24);
                            enemy.body.setSize(32,24, false);
                        }else if(enemy.name == "hyena"){
                            enemy.body.setOffset(5,22);
                            enemy.body.setSize(42,26, false);
                        }else if( enemy.name == "deceased"){
                            enemy.body.setOffset(25,11);
                            enemy.body.setSize(20,37, false);
                        }else if(enemy.name == "mummy"){
                            enemy.body.setOffset(25,15);
                            enemy.body.setSize(20,34, false);
                        }
                    }else{
                        enemy.flipX = true;
        
                        if(enemy.name == "snake"){
                            enemy.body.setOffset(-1,30);
                            enemy.body.setSize(30,18, false);
                        }else if(enemy.name == "scorpio"){
                            enemy.body.setOffset(0,24);
                            enemy.body.setSize(32,24, false);
                        }else if(enemy.name == "hyena"){
                            enemy.body.setOffset(0,22);
                            enemy.body.setSize(42,26, false);
                        }else if( enemy.name == "deceased"){
                            enemy.body.setOffset(5,11);
                            enemy.body.setSize(20,37, false);
                        }else if(enemy.name == "mummy"){
                            enemy.body.setOffset(5,15);
                            enemy.body.setSize(20,34, false);
                        }
                    }
                }
                
            }
            
        });

        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            this.enemies.forEach((val) => {
                val.timer.remove();
            });
        });

        this.showed=false;
    }
    
    update(time,delta){
        super.update();

        let key = this.input.keyboard.createCursorKeys();

        this.enemies.forEach((val, index, arr)=>{
            if(val.obj.scene != undefined){
                val.obj.text.setX(val.obj.x-10);
                val.obj.text.setY(val.obj.y-20);
                val.obj.text.setText(val.obj.hp);
            }else{
                val.timer.remove();
                arr.splice(index, 1);
            }
        });

        if(this.enemies.length == 0){
            if(key.shift.isDown){
                eventsCenter.emit("gameover", this.level, "vinto");
            }
            
            if(!this.showed){
                eventsCenter.emit("levelUpText", true);
                this.showed = true;
            }
        }

    }

}


export default quintoLivello;