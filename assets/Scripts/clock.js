cc.Class({
    extends: cc.Component,

    properties: {
        time: 60,
        currentTime: 0,

        isTyping: false,

        cover: cc.Node,
        clockTime: cc.Label,

        //gameOverPanel: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.currentTime = this.time;
        this.coverSprite = this.cover.getComponent(cc.Sprite);
    },

    update (dt) {
        if(!this.isTyping) return;
        if(this.currentTime >= (this.time*0.4)){
            this.cover.color = new cc.Color(0,255,0);
        }
        if(this.currentTime <= (this.time*0.4) && this.currentTime >= (this.time*0.1)){
            this.cover.color = new cc.Color(255,255,0);
        }
        if(this.currentTime <= (this.time*0.1)){
            this.cover.color = new cc.Color(255,0,0);
        }
        this.clockTime.string = Math.round(this.currentTime);
        this.coverSprite.fillRange = this.currentTime/60;
        // if(this.currentTime <= 0){
        //     this.gameOver();
        // }
        this.currentTime -= dt;
    },

    gameOver(){
        this.gameOverPanel.active = true;
        this.gameOverPanel.getComponent(cc.Animation).play('GameOver');
        this.gameOverPanel.getComponent('gameOver').setWPM();

        this.node.parent.active = false;
    },

    restartGame(){
        this.currentTime = this.time;
        this.clockTime.string = Math.round(this.currentTime);
        this.cover.color = new cc.Color(0,255,0);
        this.coverSprite.fillRange = this.currentTime/60;
        this.isTyping = false;
    }
});
