var Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        gameOverPanel: cc.Node,
        gameScreen: cc.Node,

        scoreManager: cc.Node,

        score: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        Emitter.instance.registerEvent("death", this.gameOver.bind(this));
        this._scoreManager = this.scoreManager.getComponent('scoreManager');
    },

    // update (dt) {},

    gameOver(){
        this.gameScreen.active = false;
        this.gameOverPanel.active = true;
        this.score.string = this._scoreManager.scoreCurrent
    }
});
