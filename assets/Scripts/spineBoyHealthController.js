var Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        hpMax: 100,
        hpCurrent: 0,

        health : cc.ProgressBar,
    },

    onLoad () {
        
    },

    start () {
        this.hpCurrent = this.hpMax;
        Emitter.instance.registerEvent("INCORRECT", this.hurt.bind(this));
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
        this.death();
    },

    death(){
        if(this.hpCurrent <= 0){
            Emitter.instance.emit("death");
        }
    }
});
