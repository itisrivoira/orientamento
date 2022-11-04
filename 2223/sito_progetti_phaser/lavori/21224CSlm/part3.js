class part3 extends Phaser.Scene {
    constructor() {
        super("part3")
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
        this.load.image("bg3", "./assets/Backgrounds/Battleground3.png")
    }

    create() {
        this.enemys_number = 4
        this.bg = this.add.image((960 / 2), (540 / 2), "bg3")
        this.scaleX = this.cameras.main.width / this.bg.width
        this.scaleY = this.cameras.main.height / this.bg.height
        this.scale = Math.max(this.scaleX, this.scaleY)
        this.bg.setScale(this.scale).setScrollFactor(0)

        this.lastScene = false

        this.voidSpace = this.physics.add.staticSprite(0, 200)
        this.voidSpace.setSize(2000, 20)

        this.create_player()

        this.player.life = this.life

        this.arrows = this.input.keyboard.createCursorKeys()
        this.WASD = this.input.keyboard.addKeys("W,A,S,D")

        this.enemies = []
        for (let i = 0; i < this.enemys_number; i++) {
            let x = Math.floor(Math.random() * 200 + 600);
            let y = Math.floor(Math.random() * 200 + 200);
            this.enemies[i] = this.physics.add.sprite(800, y, "t3I0").setSize(480, 500).setOffset(550, 380)
            this.enemies[i].displayWidth = 350
            this.enemies[i].displayHeight = 200
            this.enemies[i].life = 90
            this.enemies[i].died = false
            this.enemies[i].frames = [`t3I`, `t3R`, `t3A`, `t3H`, `t3D`]
            this.enemies[i].setCollideWorldBounds(true)
            this.enemies[i].setDragX(3000).setDragY(3000)
            this.physics.add.collider(this.enemies[i], this.voidSpace)
        }

        this.damage = 2

        for (let i = 0; i < this.names.length; i++) {
            var f = 0
            if (this.names[i].includes("RUN") || this.names[i].includes("IDLE")) {
                f = -1
            }
            for (let j = 0; j < this.enemies.length; j++) {
                this.enemies[j].anims.create({
                    key: this.names[i],
                    frames: [
                        { key: `${this.enemies[j].frames[i]}0`, frame: null },
                        { key: `${this.enemies[j].frames[i]}1`, frame: null },
                        { key: `${this.enemies[j].frames[i]}2`, frame: null },
                        { key: `${this.enemies[j].frames[i]}3`, frame: null },
                        { key: `${this.enemies[j].frames[i]}4`, frame: null },
                        { key: `${this.enemies[j].frames[i]}5`, frame: null },
                        { key: `${this.enemies[j].frames[i]}6`, frame: null },
                        { key: `${this.enemies[j].frames[i]}7`, frame: null },
                        { key: `${this.enemies[j].frames[i]}8`, frame: null },
                        { key: `${this.enemies[j].frames[i]}9`, frame: null },
                    ],
                    frameRate: 15,
                    repeat: f
                })
            }
        }

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
                setTimeout(() => {
                    let prob = Math.floor(Math.random() * 100)
                    if (prob % 2 == 0) {
                        console.log("MEAT")
                        let meat = this.physics.add.sprite(e.x, e.y, "meat").setSize(150, 80)
                        meat.displayHeight = 40
                        meat.displayWidth = 60
                        this.physics.add.overlap(this.player, meat, (p, m) => {
                            meat.destroy()
                            p.life = p.life + 2
                            console.log(p.life)
                            if (p.life > 300) {
                                p.life = 300
                            }
                        })
                    }
                    e.setVisible(false)
                }, 600);

            } else {
                e.body.touching.left = true
                e.body.touching.right = true
                e.body.touching.up = true
                e.body.touching.down = true
            }
        })

        this.kills = this.add.text(800, 10, "Kills: " + this.nKills, { fontFamily: "MedievalSharp", fontSize: 40 })
        for (let i = 0; i < this.enemys_number; i++) {
            this.enemies[i].anims.play("IDLE", true)
        }

    }

    update(time, delta) {
        this.Game_update("part4")
    }

}
export default part3