var Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        gameOverPanel: cc.Node,
        gameScreen: cc.Node,

        scoreManager: cc.Node,

        score: cc.Label,

        typingScene: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        Emitter.instance.registerEvent("death", this.gameOver.bind(this));
        this._scoreManager = this.scoreManager.getComponent('scoreManager');
        this._typingScene = this.typingScene.getComponent('typingController');
    },

    // update (dt) {},

    gameOver(){
        this._typingScene.clearEditBox();
        this.gameScreen.active = false;
        this.gameOverPanel.active = true;
        this.score.string = this._scoreManager.scoreCurrent
    }
});
