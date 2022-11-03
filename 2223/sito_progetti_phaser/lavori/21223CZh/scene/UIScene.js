import eventsCenter from "../eventCenter.js";

class UIScena extends Phaser.Scene{

    constructor(){
        super("UIScena");
    }

    preload() {

    }

    create(){

        this.score = 0;
        this.playerHP = 100;

        this.levelText = this.add.text(100, 0, "LEVEL: 1", {
            fontSize: 'calc(100vw / 50)',
            color: '#000000',
            stroke: '#000',
            strokeThickness: 4,
        });
        this.scoreText = this.add.text(100, 50, "SCORE: 0", {
            fontSize: 'calc(100vw / 50)',
            color: '#fff',
            stroke: '#000',
            strokeThickness: 4,
        });
        this.hpText = this.add.text(
            100, 100, "HP: 100", {
            fontSize: 'calc(100vw / 50)',
            color: '#ff0000',
            stroke: '#000',
            strokeThickness: 4
        });

        this.enemyText = this.add.text(
            100, 150, "ENEMY: 100", {
            fontSize: 'calc(100vw / 50)',
            color: '#0000ff',
            stroke: '#000',
            strokeThickness: 4
        });

        this.levelUp = this.add.text(
            350, 650, "", {
            fontSize: 'calc(100vw / 50)',
            color: '#0000ff',
            stroke: '#000',
            strokeThickness: 4
        });

        this.uped = false;

        
        this.scoreText.setOrigin(0, 0);
        this.add.existing(this.scoreText);

        eventsCenter.on("updateScore", this.updateScore,this);
        eventsCenter.on("updateHP", this.updateHP, this);
        eventsCenter.on("setEnemyNumber", this.setEnemyNumber, this);
        eventsCenter.on("updateEnemyNumber", this.updateEnemyNumber,this);
        eventsCenter.on("updateLevel", this.updateLevel, this);
        eventsCenter.on("UIScenaRemove", this.remove, this);
        eventsCenter.on("levelUpText", this.levelUpText, this);
        eventsCenter.on("restoreText", this.restoreText, this);

        this.events.on(Phaser.Scenes.Events.SHUTDOWN, () => {
            eventsCenter.off('updateScore', this.updateScore, this);
            eventsCenter.off("updateHP", this.updateHP, this);
            eventsCenter.off("setEnemyNumber", this.setEnemyNumber, this);
            eventsCenter.off("updateEnemyNumber", this.updateEnemyNumber,this);
            eventsCenter.off("updateLevel", this.updateLevel, this);

        });
    }

    update(time,delta){
    }

    remove(){
        eventsCenter.emit("getScore", this.score);
    }

    restoreText(){
        this.levelUp.setText(" ");
    }

    updateScore(score){
        this.score += score;
        this.scoreText.setText(`SCORE: ${this.score}`);
    }

    updateHP(off, level){
        this.playerHP += off;
        if(this.playerHP <= 0 ){
            eventsCenter.emit("gameover", level, "perso");
        }else{
            this.hpText.setText(`HP: ${this.playerHP}`);
        }
    }

    updateEnemyNumber(){
        this.enemyText.setText(`ENEMY: ${parseInt(this.enemyText.text.substring(7))-1}`)
    }

    setEnemyNumber(n){
        this.enemyText.setText(`ENEMY: ${n}`);
    }

    updateLevel(level){
        this.levelText.setText(`LEVEL: ${level}`);
    }

    levelUpText(finished){

        if(!finished){
            this.levelUp.setText("Premi [shift] per andare \n al livello successivo").setX(350);
        }else{
            this.levelUp.setText("Premi [shift] per terminale  il gioco").setX(150);
        }

    }

}


export default UIScena;