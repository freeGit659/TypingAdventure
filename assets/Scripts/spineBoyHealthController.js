var Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        hpMax: 100,
        hpCurrent: 0,

        ani: cc.Animation,

        health : cc.ProgressBar,

        healthPopup: cc.Label,
    },

    onLoad () {
        
    },

    start () {
        this.healthPopup.node.active = false;
        this.hpCurrent = this.hpMax;
        Emitter.instance.registerEvent("INCORRECT", this.hurt.bind(this));
    },

    updateHealth(){
        var progress = this.hpCurrent/this.hpMax;
        this.health.progress = progress;
    },

    hurt(){
        this.hpCurrent -= 10;
        this.createHealthPopup(-10);
        this.ani.play('hurt');
        
    },

    update (dt) {
        this.updateHealth();
        this.death();
    },

    death(){
        if(this.hpCurrent <= 0){
            Emitter.instance.emit("death");
        }
    },

    createHealthPopup(damage){
        this.healthPopup.node.active = true;
        this.healthPopup.string = damage;
        this.healthPopup.node.x = -200;
        this.healthPopup.node.y = 600;
        this.healthPopup.node.scale = 1;
        cc.tween(this.healthPopup.node)
        .to(0.3, {x:-500,y: 1100, scale: 3})
        .call(()=>{
            this.healthPopup.node.active = false;
            this.isDead = false;
        })
        .start()
    }
});
