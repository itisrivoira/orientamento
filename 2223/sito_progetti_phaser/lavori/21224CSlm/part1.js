class part1 extends Phaser.Scene {
    constructor() {
        super("part1")
    }

    preload() {
        // Background
        this.load.image("bg1", "./assets/Backgrounds/Battleground1.png")

        // PLayer
        for (let i = 0; i < 10; i++) {
            this.load.image(`pI${i}`, `./assets/Player/Knight_03__IDLE_00${i}-min.png`) // Player fermo
            this.load.image(`pR${i}`, `./assets/Player/Knight_03__RUN_00${i}-min.png`) // Player corsa
            this.load.image(`pA${i}`, `./assets/Player/Knight_03__ATTACK_00${i}-min.png`) // Player attacco
            this.load.image(`pH${i}`, `./assets/Player/Knight_03__HURT_00${i}-min.png`) // Player ferito
            this.load.image(`pD${i}`, `./assets/Player/Knight_03__DIE_00${i}-min.png`) // Player morto
            this.load.image(`t1I${i}`, `./assets/1_TROLL/Troll_01_1_IDLE_00${i}-min.png`) // troll1 fermo
            this.load.image(`t1R${i}`, `./assets/1_TROLL/Troll_01_1_RUN_00${i}-min.png`) // troll1 corsa
            this.load.image(`t1A${i}`, `./assets/1_TROLL/Troll_01_1_ATTACK_00${i}-min.png`) // troll1 attacco
            this.load.image(`t1H${i}`, `./assets/1_TROLL/Troll_01_1_HURT_00${i}-min.png`) // troll1 ferito
            this.load.image(`t1D${i}`, `./assets/1_TROLL/Troll_01_1_DIE_00${i}-min.png`) // troll1 morto
            this.load.image(`t2I${i}`, `./assets/2_TROLL/Troll_02_1_IDLE_00${i}-min.png`) // troll2 fermo
            this.load.image(`t2R${i}`, `./assets/2_TROLL/Troll_02_1_RUN_00${i}-min.png`) // troll2 corsa
            this.load.image(`t2A${i}`, `./assets/2_TROLL/Troll_02_1_ATTACK_00${i}-min.png`) // troll2 attacco
            this.load.image(`t2H${i}`, `./assets/2_TROLL/Troll_02_1_HURT_00${i}-min.png`) // troll2 ferito
            this.load.image(`t2D${i}`, `./assets/2_TROLL/Troll_02_1_DIE_00${i}-min.png`) // troll2 morto
            this.load.image(`t3I${i}`, `./assets/3_TROLL/Troll_03_1_IDLE_00${i}-min.png`) // troll3 fermo
            this.load.image(`t3R${i}`, `./assets/3_TROLL/Troll_03_1_RUN_00${i}-min.png`) // troll3 corsa
            this.load.image(`t3A${i}`, `./assets/3_TROLL/Troll_03_1_ATTACK_00${i}-min.png`) // troll3 attacco
            this.load.image(`t3H${i}`, `./assets/3_TROLL/Troll_03_1_HURT_00${i}-min.png`) // troll3 ferito
            this.load.image(`t3D${i}`, `./assets/3_TROLL/Troll_03_1_DIE_00${i}-min.png`) // troll3 morto
        }

        this.load.image("meat", `./assets/Meat/meat.png`) // Carne

        this.load.audio("theme", "./assets/theme.mp3") // Soundtrack
    }


    create() {
        // Creazione background
        this.enemies_number = 2
        this.bg = this.add.image((960 / 2), (540 / 2), "bg1")
        this.scaleX = this.cameras.main.width / this.bg.width
        this.scaleY = this.cameras.main.height / this.bg.height
        this.scale = Math.max(this.scaleX, this.scaleY)
        this.bg.setScale(this.scale).setScrollFactor(0)

        this.lastScene = false

        // Creazione soundtrack
        this.music = this.sound.add("theme")
        this.music.play()
        this.music.config.loop = true

        // Creazione spazio vuoto
        this.voidSpace = this.physics.add.staticSprite(0, 200)
        this.voidSpace.setSize(2000, 20)

        // Metodo creazione player
        this.create_player()
        this.player.life_div.style.width = 300 + "px"

        // Creazione tasti
        this.arrows = this.input.keyboard.createCursorKeys()
        this.WASD = this.input.keyboard.addKeys("W,A,S,D")
        this.input.setDefaultCursor("url(http://www.rw-designer.com/cursor-extern.php?id=30264), pointer")

        // Creazione nemici
        this.enemies = []
        for (let i = 0; i < this.enemies_number; i++) {
            let x = Math.floor(Math.random() * 200 + 600);
            let y = Math.floor(Math.random() * 200 + 200);
            this.enemies[i] = this.physics.add.sprite(x, y, "t1I0").setSize(480, 500).setOffset(550, 380)
            this.enemies[i].displayWidth = 350
            this.enemies[i].displayHeight = 200
            this.enemies[i].life = 80
            this.enemies[i].died = false
            this.enemies[i].frames = [`t1I`, `t1R`, `t1A`, `t1H`, `t1D`]
            this.enemies[i].setCollideWorldBounds(true)
            this.enemies[i].setDragX(3000).setDragY(3000).setFlipX(true)
            if (i > 0)
                this.physics.add.collider(this.enemies[i], this.enemies[i - 1])
            this.physics.add.collider(this.enemies[i], this.voidSpace)
        }

        this.damage = 1.5 // Danno causato dai nemici

        // Creazione animazioni nemici
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

        // Collisione player con lo spazio vuoto
        this.physics.add.collider(this.player, this.voidSpace)

        // Controllo collisione tra il player e il nemico
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
                        let meat = this.physics.add.sprite(e.x, e.y, "meat").setSize(150, 80)
                        meat.displayHeight = 40
                        meat.displayWidth = 60
                        this.physics.add.overlap(this.player, meat, (p, m) => {
                            p.life = p.life + 2
                            meat.destroy()
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

        // Contatore uccisioni
        this.nKills = 0
        this.kills = this.add.text(800, 10, "Kills: " + this.nKills, { fontFamily: "MedievalSharp", fontSize: 40 })

        // Creazione titolo gioco
        this.flag = false
        this.title = this.add.text(155, 150, "Knight Adventure", { fontFamily: "MedievalSharp", fontSize: 80 }).setDepth(2)
        this.info = this.add.text(380, 330, "Press spacebar to start", { fontFamily: "MedievalSharp", fontSize: 20 }).setDepth(2)
        this.command = this.add.text(10, 405, "Commands:\n   W → UP\n   A → LEFT\n   S → DOWN\n   D → RIGHT\n   LEFT CLICK → ATTACK", { fontFamily: "MedievalSharp", fontSize: 20 }).setDepth(2)

        // Play dell'animazione fermo
        for (let i = 0; i < this.enemies_number; i++) {
            this.enemies[i].anims.play("IDLE", true)
        }
    }

    create_player() {
        // Creazione player
        this.names = ['IDLE', 'RUN', 'ATTACK', 'HURT', 'DIE']
        this.player = this.physics.add.sprite(100, 370, "pI0").setSize(380, 480).setOffset(750, 200)
        this.player.displayWidth = 350
        this.player.displayHeight = 200
        this.player.life = 300
        this.player.hit = 0.5
        this.player.life_div = document.querySelector("#life")
        this.player.died = false
        this.player.setCollideWorldBounds(true)
        this.player.setDragX(3000).setDragY(3000)
        this.player.frames = [`pI`, 'pR', 'pA', 'pH', 'pD']

        // Creazione animazioni player
        for (let i = 0; i < this.names.length; i++) {
            var f = 0
            if (this.names[i].includes("RUN") || this.names[i].includes("IDLE")) {
                f = -1
            }
            this.player.anims.create({
                key: this.names[i],
                frames: [
                    { key: `${this.player.frames[i]}0`, frame: null },
                    { key: `${this.player.frames[i]}1`, frame: null },
                    { key: `${this.player.frames[i]}2`, frame: null },
                    { key: `${this.player.frames[i]}3`, frame: null },
                    { key: `${this.player.frames[i]}4`, frame: null },
                    { key: `${this.player.frames[i]}5`, frame: null },
                    { key: `${this.player.frames[i]}6`, frame: null },
                    { key: `${this.player.frames[i]}7`, frame: null },
                    { key: `${this.player.frames[i]}8`, frame: null },
                    { key: `${this.player.frames[i]}9`, frame: null },
                ],
                frameRate: 15,
                repeat: f
            })
        }
        this.player.setDepth(1)

        // PLay dell'animazione fermo
        this.player.anims.play("IDLE", true)
    }

    update(time, delta) {
        // Controllo che space sia premuto
        if (this.arrows.space.isDown && !this.flag) {
            this.flag = true
            this.title.destroy()
            this.info.destroy()
            this.command.destroy()
        } else if (this.flag) {
            // Richiamo il metodo Game_update
            this.Game_update("part2")
        }
    }

    // Passo come parametro la scena
    Game_update(scene) {
        // Controllo che il player sia vivo
        if (!this.player.died) {
            this.Player() // Richiamo metodo del player
            if (this.enemies.length != 0) { // Controllo che ci siano ancora nemici
                for (let i = 0; i < this.enemies.length; i++) {
                    if (!this.enemies[i].died)
                        this.Enemy(this.enemies[i])
                    else if (this.enemies.length != 0) {
                        setTimeout(() => {
                            if (this.enemies[i] != undefined) {
                                this.enemies[i].destroy() // Elimino il nemico ucciso
                                this.enemies.splice(i, 1)
                                this.nKills++ // Incremento il "punteggio"
                                    this.kills.setText("Kills: " + this.nKills)
                                if (!this.lastScene) {
                                    this.add.text(800, 450, "→", { fontFamily: "MedievalSharp", fontSize: 80 }).setDepth(2)
                                }
                            }
                        }, 800);
                    }
                }
            }
            this.player.life_div.style.width = this.player.life + "px" // Aggiorno la vita
        } else {
            if (this.player.anims.currentAnim.key != "DIE") {
                this.player.life_div.style.width = 0 + "px"
                this.add.text(280, 150, "Game Over", { fontFamily: "MedievalSharp", fontSize: 80 }).setDepth(2) // Creazione del game over
                this.add.text(360, 330, "Press spacebar to restart", { fontFamily: "MedievalSharp", fontSize: 20 }).setDepth(2)
                this.player.anims.play("DIE", true)
            }
            if (this.arrows.space.isDown) {
                window.location.reload(true) // Ricarico la pagina
            }
        }
        if (this.player.x >= 915 && this.enemies.length == 0 && !this.lastScene) { // Controllo che il player tocchi il margine destro
            this.scene.start(scene, { // Cambio scena
                "player": this.Player,
                "player_creator": this.create_player,
                "enemy": this.Enemy,
                "Game_update": this.Game_update,
                "game_over": this.game_over,
                "kills": this.nKills,
                "life": this.player.life,
            })
        }
    }


    Player() {
        // Controllo se ci sono tasti premuti
        if (this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0) {
            this.player.anims.play("RUN", true)
        }

        // Controllo tasto W
        if (this.WASD.W.isDown) {
            this.player.setVelocityY(-300)
            if (this.player.flipX) {
                this.player.setOffset(680, 200)
            } else {
                this.player.setOffset(750, 200)
            }
        }

        // Controllo tasto A
        if (this.WASD.A.isDown) {
            this.player.setVelocityX(-300).setOffset(680, 200).setFlipX(true)
        }

        // Controllo tasto S
        if (this.WASD.S.isDown) {
            this.player.setVelocityY(300)
            if (this.player.flipX) {
                this.player.setOffset(680, 200)
            } else {
                this.player.setOffset(750, 200)
            }
        }

        // Controllo tasto D
        if (this.WASD.D.isDown) {
            this.player.setVelocityX(300).setOffset(750, 200).setFlipX(false)
        }
        // Controllo se non ci sono tasti premuti

        // Controllo per l'input con il mouse
        this.input.on('pointerdown', (pointer) => {
            if (this.player.anims.currentAnim.key != "ATTACK" || (this.player.anims.currentFrame.isLast)) {
                if (this.player.flipX) {
                    this.player.setOffset(450, 200)
                } else {
                    this.player.setOffset(980, 200)
                }
                if (!this.player.died) {
                    this.player.anims.play("ATTACK", true)
                }
            }
        }, this);

        // Controllo se il player è morto
        if (this.player.life <= 0) {
            this.player.died = true
        } else {
            if (this.player.body.velocity.x == 0 && this.player.body.velocity.y == 0 && (this.player.anims.currentAnim.key == "RUN" || this.player.anims.currentFrame.isLast)) {
                this.player.setVelocityX(0)
                this.player.anims.play("IDLE", true);
                if (this.player.flipX) {
                    this.player.setOffset(680, 200)
                } else {
                    this.player.setOffset(750, 200)
                }
            }
        }
    }

    Enemy(nmy) {
        if (!nmy.visible) {
            nmy.destroy()
        } else {
            if (nmy.body.touching.down && nmy.body.touching.up && nmy.body.touching.left && nmy.body.touching.right) { // Controllo che il nemico sia in collisione con il player
                if (nmy.anims.currentFrame.isLast)
                    nmy.anims.play("ATTACK", true)
                if (nmy.anims.currentAnim.key == "ATTACK" && nmy.anims.currentFrame.isLast) {
                    this.player.life -= this.damage
                    this.player.anims.play("HURT", true)
                }
                nmy.setVelocityX(0)
                nmy.setVelocityY(0)
            } else {
                if (this.player.x < nmy.x) {
                    nmy.setFlipX(true)
                } else {
                    nmy.setFlipX(false)
                }
                this.physics.moveToObject(nmy, this.player, 150)
                nmy.anims.play("RUN", true)
            }
        }
    }
}
export default part1