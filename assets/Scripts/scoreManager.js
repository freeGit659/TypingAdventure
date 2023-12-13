var Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        scoreCurrent: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.scoreLabel = this.node.getComponent(cc.Label);
        this.scoreUpdate(this.scoreCurrent);
        let _scoreUpdate = this.scoreUpdate.bind(this);
        Emitter.instance.registerEvent('Alien1Dead', _scoreUpdate);
    },

    // update (dt) {},

    scoreUpdate(data){
        this.scoreCurrent += data;
        this.scoreLabel.string = this.scoreCurrent;
    }
});
