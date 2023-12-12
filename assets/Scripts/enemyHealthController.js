var Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        hpMax: 50,
        hpCurrent: 0,

        health : cc.ProgressBar,
    },

    onLoad () {
        cc.log('enemyController');
    },

    start () {
        this.hpCurrent = this.hpMax;
        Emitter.instance.registerEvent("CORRECT", this.hurt.bind(this));
    },

    updateHealth(){
        var progress = this.hpCurrent/this.hpMax;
        this.health.progress = progress;
    },

    hurt(){
        this.hpCurrent -= 10;
    },

    update (dt) {
        this.updateHealth();
    },
});
