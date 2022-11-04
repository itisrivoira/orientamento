class part4 extends Phaser.Scene {
    constructor() {
        super("part4")
    }

    init(e) {
        console.log(e)
        this.Player = e.player
        this.player = e.player_character
        this.Enemy = e.enemy
        this.Game_update = e.Game_update
        this.create_player = e.player_creator
        this.game_over = e.game_over
        this.nKills = e.kills
        this.life = e.life
    }

    preload() {

        this.load.image("bI1", "./assets/Boss/Idle1-min.png")
        this.load.image("bI2", "./assets/Boss/Idle2-min.png")
        this.load.image("bI3", "./assets/Boss/Idle3-min.png")

        this.load.image("bR1", "./assets/Boss/Walk1-min.png")
        this.load.image("bR2", "./assets/Boss/Walk2-min.png")
        this.load.image("bR3", "./assets/Boss/Walk3-min.png")
        this.load.image("bR4", "./assets/Boss/Walk4-min.png")
        this.load.image("bR5", "./assets/Boss/Walk5-min.png")
        this.load.image("bR6", "./assets/Boss/Walk6-min.png")

        this.load.image("bA1", "./assets/Boss/Attack1-min.png")
        this.load.image("bA2", "./assets/Boss/Attack2-min.png")
        this.load.image("bA3", "./assets/Boss/Attack3-min.png")
        this.load.image("bA4", "./assets/Boss/Attack4-min.png")

        this.load.image("bH1", "./assets/Boss/Hurt1-min.png")
        this.load.image("bH2", "./assets/Boss/Hurt2-min.png")

        this.load.image("bD1", "./assets/Boss/Death1-min.png")
        this.load.image("bD2", "./assets/Boss/Death2-min.png")
        this.load.image("bD3", "./assets/Boss/Death3-min.png")
        this.load.image("bD4", "./assets/Boss/Death4-min.png")
        this.load.image("bD5", "./assets/Boss/Death5-min.png")
        this.load.image("bD6", "./assets/Boss/Death6-min.png")
            // Background
        this.load.image("bg4", "./assets/Backgrounds/Battleground4.png")
    }

    create() {
        this.win = false // Flag controllo della vittoria
        this.enemies_number = 1
        this.bg = this.add.image((960 / 2), (540 / 2), "bg4")
        this.scaleX = this.cameras.main.width / this.bg.width
        this.scaleY = this.cameras.main.height / this.bg.height
        this.scale = Math.max(this.scaleX, this.scaleY)
        this.bg.setScale(this.scale).setScrollFactor(0)

        this.voidSpace = this.physics.add.staticSprite(0, 200)
        this.voidSpace.setSize(2000, 20)

        this.lastScene = true

        this.create_player()

        this.player.life = this.life

        // Creazione tasti
        this.arrows = this.input.keyboard.createCursorKeys()
        this.WASD = this.input.keyboard.addKeys("W,A,S,D")

        this.enemies = []

        for (let i = 0; i < this.enemies_number; i++) {
            this.enemies[i] = this.physics.add.sprite(600, 300, "bI1").setSize(70, 80).setOffset(125, 100)
            this.enemies[i].displayWidth = 800
            this.enemies[i].displayHeight = 600
            this.enemies[i].life = 100
            this.enemies[i].died = false
            this.enemies[i].frames = [`bI`, `bR`, `bA`, `bH`, `bD`]
            this.enemies[i].setCollideWorldBounds(true)
            this.enemies[i].setDragX(3000).setDragY(3000)
            this.physics.add.collider(this.enemies[i], this.voidSpace)
        }

        this.damage = 2.5

        this.enemies[0].anims.create({
            key: "IDLE",
            frames: [
                { key: "bI1", frame: null },
                { key: "bI2", frame: null },
                { key: "bI3", frame: null }
            ],
            frameRate: 10,
            repeat: -1
        })

        this.enemies[0].anims.create({
            key: "RUN",
            frames: [
                { key: "bR1", frame: null },
                { key: "bR2", frame: null },
                { key: "bR3", frame: null },
                { key: "bR4", frame: null },
                { key: "bR5", frame: null },
                { key: "bR6", frame: null }
            ],
            frameRate: 10,
            repeat: -1
        })

        this.enemies[0].anims.create({
            key: "ATTACK",
            frames: [
                { key: "bA1", frame: null },
                { key: "bA2", frame: null },
                { key: "bA3", frame: null },
                { key: "bA4", frame: null }
            ],
            frameRate: 10,
            repeat: -1
        })

        this.enemies[0].anims.create({
            key: "HURT",
            frames: [
                { key: "bH1", frame: null },
                { key: "bH2", frame: null }
            ],
            frameRate: 10,
            repeat: -1
        })

        this.enemies[0].anims.create({
            key: "DIE",
            frames: [
                { key: "bD1", frame: null },
                { key: "bD2", frame: null },
                { key: "bD3", frame: null },
                { key: "bD4", frame: null },
                { key: "bD5", frame: null },
                { key: "bD6", frame: null }
            ],
            frameRate: 10,
            repeat: -1
        })

        this.physics.add.collider(this.player, this.voidSpace)

        this.physics.add.overlap(this.player, this.enemies, (p, e) => {
            if (this.player.anims.currentAnim.key == "ATTACK") {
                e.life = e.life - this.player.hit
                if (e.anims.currentAnim.key == "ATTACK" && p.anims.currentAnim.key != "ATTACK")
                    p.anims.play("HURT", true)
            }
            if (e.life <= 0) {
                e.anims.play("DIE", true)
                e.died = true
            } else {
                e.body.touching.left = true
                e.body.touching.right = true
                e.body.touching.up = true
                e.body.touching.down = true
            }
        })

        this.kills = this.add.text(800, 10, "Kills: " + this.nKills, { fontFamily: "MedievalSharp", fontSize: 40 })

        this.flag = false

        for (let i = 0; i < this.enemies_number; i++) {
            this.enemies[i].anims.play("IDLE", true)
        }

    }

    update(time, delta) {
        this.Game_update("part4")
        if (this.enemies[0] != undefined) {
            if (this.enemies[0].x < this.player.x) {
                this.enemies[0].setOffset(60, 100)
            } else {
                this.enemies[0].setOffset(125, 100)
            }
        } else {
            if (!this.flag) {
                this.flag = true
                this.add.text(340, 150, "You Win", { fontFamily: "MedievalSharp", fontSize: 80 }).setDepth(2) // Creazione della vittoria
                this.add.text(380, 330, "Press spacebar to restart", { fontFamily: "MedievalSharp", fontSize: 20 }).setDepth(2)
            }
            if (this.arrows.space.isDown)
                window.location.reload(true)
        }
    }
}
export default part4