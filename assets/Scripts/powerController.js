var Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        timeAttackMax: 3,
        timeAttackCurrent: 0,

        isStart: false,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.powerBar = this.node.getComponent(cc.ProgressBar);
        this.powerBar.progress = 0;
        Emitter.instance.registerEvent('start', ()=>{
            this.isStart = true;
        });
        Emitter.instance.registerEvent("CORRECT", ()=>{
            this.timeAttackCurrent = 0;
        });
        Emitter.instance.registerEvent("AlienDead", ()=>{
            this.isStart = false;
        });
    },

    update (dt) {
        if(!this.isStart) return;
        this.updateBar();
        this.timeAttackCurrent += dt;
        if(this.timeAttackCurrent >= this.timeAttackMax){
            this.timeAttackCurrent = 0;
            Emitter.instance.emit('INCORRECT');
        }
    },

    updateBar() {
        this.powerBar.progress = this.timeAttackCurrent/ this.timeAttackMax;
    }
});
