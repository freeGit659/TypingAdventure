var Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        hpMax: 10,
        hpCurrent: 0,

        isDead: false,
    },

    onLoad () {
        
    },

    start () {
        this.health = this.getComponent(cc.ProgressBar);
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
        if(this.hpCurrent <= 0 && !this.isDead){
            this.dead();
            this.isDead = true;
        }
    },

    dead(){
        const ani =  this.node.parent.getComponent(cc.Animation);
        ani.play('die');
        this.scheduleOnce(function() {
            this.hpCurrent = this.hpMax;
                this.isDead = false;
                Emitter.instance.emit('Alien1Dead');
        }, ani.play('die').duration/ani.play('die').speed );
    }
});
