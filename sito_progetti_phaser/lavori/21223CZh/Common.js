class Common extends Phaser.Scene{

    constructor(name, level){
        super(name)
        this.level = level;
    }

    preload() {
        this.load.image("backgroundTileset", "assets/background/1 Tiles/Tileset.png")<
        this.load.image("coinsTileset", "assets/Coin_01.png");

        // player walk anim
        this.load.multiatlas("player_walk", "assets/character/1 Woodcutter/walk/walk.json", "assets/character/1 Woodcutter/walk");

        // player idle anim
        this.load.multiatlas("player_idle", "assets/character/1 Woodcutter/idle/idle.json", "assets/character/1 Woodcutter/idle");

        // player jump anim
        this.load.multiatlas("player_jump", "assets/character/1 Woodcutter/jump/jump.json", "assets/character/1 Woodcutter/jump");

        // player attack anim
        this.load.multiatlas("player_attack", "assets/character/1 Woodcutter/attack1/attack1.json","assets/character/1 Woodcutter/attack1")
        
        // player death anim
        this.load.multiatlas("player_death", "assets/character/1 Woodcutter/death/death.json", "assets/character/1 Woodcutter/death");

        //player hurt anim
        this.load.multiatlas("player_hurt" ,"assets/character/1 Woodcutter/hurt/hurt.json", "assets/character/1 Woodcutter/hurt");

        this.loadEnemyAnims(["deceased", "hyena", "mummy", "scorpio", "snake"], ["attack", "hurt", "walk", "death"])
        
    
    }

    create(){

        // set bounds
        this.cameras.main.setBounds(0, 0, 1900, 800);
        this.physics.world.setBounds(0, 0, 2000, 700);

        // cerate player
        this.player = this.physics.add.sprite(100, 745, "player_walk", "walker-0.png");
        this.player.body.setOffset(6,10);
        this.player.body.setSize(20,37, false);

        // player anims
        this.player.anims.create({
            key: "player_walk",
            frames:this.anims.generateFrameNames('player_walk', {
                start: 0, end: 5, zeroPad: 0,
                prefix: "walker-", suffix: '.png'
            }),
            frameRate:10,
            repeat: -1
        });

        this.player.anims.create({
            key: "player_idle",
            frames:this.anims.generateFrameNames('player_idle', {
                start: 0, end: 3, zeroPad: 0,
                prefix: "idle-", suffix: '.png'
            }),
            frameRate:10,
            repeat: -1
        });

        this.player.anims.create({
            key: "player_jump",
            frames:this.anims.generateFrameNames('player_jump', {
                start: 0, end: 3, zeroPad: 0,
                prefix: "jump-", suffix: '.png'
            }),
            frameRate:10,
            repeat: -1
        });

        this.player.anims.create({
            key: "player_attack",
            frames:this.anims.generateFrameNames('player_attack', {
                start: 0, end: 5, zeroPad: 0,
                prefix: "attack1-", suffix: '.png'
            }),
            frameRate:15,
            repeat: 0
        });

        this.player.anims.create({
            key: "player_death",
            frames:this.anims.generateFrameNames('player_death', {
                start: 0, end: 5, zeroPad: 0,
                prefix: "death-", suffix: '.png'
            }),
            frameRate:10,
            repeat: 1
        });

        this.player.anims.create({
            key: "player_hurt",
            frames:this.anims.generateFrameNames('player_hurt', {
                start: 0, end: 2, zeroPad: 0,
                prefix: "hurt-", suffix: '.png'
            }),
            frameRate:10,
            repeat: 1
        });

        // set default animation
        this.player.anims.play("player_idle");

        this.player.attackValue = 10;

        // set camera
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
        this.cameras.main.setZoom(2);
    }

    update(time,delta){
        let key = this.input.keyboard.createCursorKeys();

        if(Phaser.Input.Keyboard.JustDown(key.right)){

            this.walk("player", this);
            this.player.setVelocityX(200);
            this.player.flipX = false;
            this.player.body.setOffset(6,10);
            this.physics.add.staticGroup()


        }else if(Phaser.Input.Keyboard.JustDown(key.left)){

            this.walk("player", this);
            this.player.setVelocityX(-200);
            this.player.flipX = true;
            this.player.body.setOffset(20,10);

        }

        if(Phaser.Input.Keyboard.JustUp(key.left) || Phaser.Input.Keyboard.JustUp(key.right)){
            this.player.anims.play("player_idle");
            this.player.setVelocityX(0);
        }

        if(Phaser.Input.Keyboard.JustDown(key.up)){

            if(this.uped > 0){
                this.player.setVelocityY(-300);
                this.player.anims.play("player_jump");
                this.uped--;
            }
            else{
                this.player.anims.play("player_walk");
            }
        }

        

    }

    walk(obj, context) {
        if(! (context.player.anims.currentAnim.key == `${obj}_jump`)){
            context.player.anims.play(`${obj}_walk`);
        }
    }

    createSpriteWithAnims(key, x, y){

        let framesEnds = {
            "deceased": {
                attackEnd:3,
                deathEnd:5,
                walkEnd:5,
                hurtEnd:1
            },
            "mummy":{
                attackEnd:5,
                deathEnd:5,
                walkEnd:5,
                hurtEnd:1
            },
            "hyena":{
                attackEnd:5,
                deathEnd:5,
                walkEnd:5,
                hurtEnd:1
            },
            "snake":{
                attackEnd:5,
                deathEnd:3,
                walkEnd:3,
                hurtEnd:1
            },
            "scorpio":{
                attackEnd:3,
                deathEnd:3,
                walkEnd:3,
                hurtEnd:1
            }
        }

        let obj = this.physics.add.sprite(x, y, `${key}_walk`, `walk-0.png`);

        if(!obj.anims.exists(`${key}_walk`)){
            obj.anims.create({
                key: `${key}_walk`,
                frames:this.anims.generateFrameNames(`${key}_walk`, {
                    start: 0, end: framesEnds[key].walkEnd, zeroPad: 0,
                    prefix: "walk-", suffix: '.png'
                }),
                frameRate:10,
                repeat: -1
            });
        }
        
        if(!obj.anims.exists(`${key}_attack`)){
            obj.anims.create({
                key: `${key}_attack`,
                frames:this.anims.generateFrameNames(`${key}_attack`, {
                    start: 0, end: framesEnds[key].attackEnd, zeroPad: 0,
                    prefix: "attack-", suffix: '.png'
                }),
                frameRate:10,
                repeat: 0
            });
        }
        
        if(!obj.anims.exists(`${key}_death`)){
            obj.anims.create({
                key: `${key}_death`,
                frames:this.anims.generateFrameNames(`${key}_death`, {
                    start: 0, end: framesEnds[key].deathEnd, zeroPad: 0,
                    prefix: "death-", suffix: '.png'
                }),
                frameRate:10,
                repeat: 0
            });
        }
        
        if(!obj.anims.exists(`${key}_hurt`)){
            obj.anims.create({
                key: `${key}_hurt`,
                frames:this.anims.generateFrameNames(`${key}_hurt`, {
                    start: 0, end: framesEnds[key].hurtEnd, zeroPad: 0,
                    prefix: "hurt-", suffix: '.png'
                }),
                frameRate:10,
                repeat: 0
            });
        }
        

        obj.name = key;

        let val = 0;

        if(key == "snake"){
            obj.body.setOffset(19,30);
            obj.body.setSize(30,18, false);
            val = 2;
        }else if(key == "scorpio"){
            obj.body.setOffset(14,24);
            obj.body.setSize(32,24, false);
            val = 4;
        }else if(key == "hyena"){
            obj.body.setOffset(5,22);
            obj.body.setSize(42,26, false);
            val = 3;
        }else if( key == "deceased"){
            obj.body.setOffset(25,11);
            obj.body.setSize(20,37, false);
            val = 5;
        }else if(key == "mummy"){
            obj.body.setOffset(25,15);
            obj.body.setSize(20,34, false);
            val = 6;
        }
        obj.attackValue = val;

        obj.anims.play(`${key}_walk`);

        obj.setVelocityX(60);
        obj.velocity = 60;
        obj.flipX = true;
        

        obj.hp = 100;
        obj.text = this.add.text(obj.x-10, obj.y-20, obj.hp, {
            color: "#0000ff"
        });

        return obj;
        
    }

    loadEnemyAnims(names, actions){
        actions.forEach((action) =>{
            names.forEach((name) =>{
                
                this.load.multiatlas(`${name}_${action}`, `assets/enemy/${name}/${action}/${action}.json`, `assets/enemy/${name}/${action}`)
            })
        });
    }

    enemyActionsTimer(enemy, minX, maxX){
        return this.time.addEvent({
            delay: 500,
            callback: this.enemyActions,
            args: [enemy,minX, maxX],
            callbackScope:this,
            loop:true
        });
    }

    enemyActions(enemy,minX, maxX){
        if(enemy.scene != undefined){
            enemy.anims.play(`${enemy.name}_walk`);
            if(enemy.x <= minX ){
                enemy.flipX = true;
                this.onFlipChange(enemy.flipX, enemy);
                enemy.body.velocity.x = enemy.velocity;
            }else if(enemy.x >= maxX){
                enemy.flipX = false;
                this.onFlipChange(enemy.flipX, enemy);

                enemy.body.velocity.x = -enemy.velocity;
            }else if(enemy.body.velocity.x == 0){
                if(Math.random() >= 0.5){
                    enemy.flipX = true;
                    this.onFlipChange(enemy.flipX, enemy);
                    enemy.body.velocity.x = enemy.velocity;
                }else{
                    enemy.flipX = false;
                    this.onFlipChange(enemy.flipX, enemy);
                    enemy.body.velocity.x = -enemy.velocity;
                }
            }

        }
    }

    

    createEnemies(json){
        
        let context = json.context;

        let result = [];

        json.enemies.forEach((val) =>{

            let t = {};

            t.obj = context.createSpriteWithAnims(val[0], val[1], val[2]);
            t.timer =  context.enemyActionsTimer(t.obj, val[3], val[4]);
            result.push(t);
        });

        return result;
        
    }

    onFlipChange(flip, enemy){
        if(!flip){
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

export default Common;