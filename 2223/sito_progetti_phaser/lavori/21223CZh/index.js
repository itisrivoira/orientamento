import eventsCenter from "./eventCenter.js";

class Loader extends Phaser.Scene{

    constructor(){
        super("Loader")
    }

    preload() {

    }

    create(){
        this.scene.start("level1");
        this.scene.start("UIScena");
        
        eventsCenter.on("gameover", this.gameover, this);
        eventsCenter.on("levelUp", this.levelUp, this);
        eventsCenter.on("getScore", this.getScore, this);
        eventsCenter.on("getData", this.getData, this);
        eventsCenter.on("restart", this.restart, this);

    }

    update(time,delta){
    }

    gameover(level, type){
        this.type = type;
        this.scene.stop("level" + level);
        eventsCenter.emit("UIScenaRemove");
        
    }

    levelUp(level){
        this.scene.stop("level"+ level);
        this.scene.start("level"+(level+1));
        this.scene.bringToTop("UIScena");
        eventsCenter.emit("restoreText");
    }

    restart(){
        this.scene.stop("gameover");
        this.scene.start("level1");
        this.scene.start("UIScena");
    }

    getScore(score){
        this.score = score;
        this.scene.stop("UIScena");
        this.scene.start("gameover");
    }

    getData(){
        eventsCenter.emit("receiveData", this.score, this.type);
    }

}

export default Loader;