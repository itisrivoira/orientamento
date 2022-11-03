import eventsCenter from "../eventCenter.js";

class Gameover extends Phaser.Scene{

    constructor(){
        super("gameover");
        eventsCenter.on("receiveData", this.receiveData, this);
    }

    preload() {
        
    }

    create(){
        eventsCenter.emit("getData");
        
        this.Text = this.add.text(200,400,"Premi [shift] per ripartire",{
            color: "red",
            fontSize: 'calc(100vw / 40)',
        });


    }

    update(time,delta){
        let key = this.input.keyboard.createCursorKeys();

        if(key.shift.isDown){
            eventsCenter.emit("restart");
        }
    }

    receiveData(score, type){
        this.score = score;
        this.type=type;
        this.winText = this.add.text(300,100,`Hai ${this.type}`,{
            color: "red",
            fontSize: 'calc(100vw / 20)',
        });
        this.scoreText = this.add.text(350,200,`con ${this.score} punti`,{
            color: "red",
            fontSize: 'calc(100vw / 40)',
        });
    }

}

export default Gameover;