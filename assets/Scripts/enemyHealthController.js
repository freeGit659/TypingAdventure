var Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        hpMax: 20,
        hpCurrent: 0,
        scoreGiven: 1,

        isDead: true,

        healthPopup: cc.Label,
    },

    onLoad () {
        
    },

    start () {
        this.healthPopup.node.active = false;
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
        this.createHealthPopup(-10);
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
                Emitter.instance.emit('AlienDead', this.scoreGiven);
        }, ani.play('die').duration/ani.play('die').speed );
    },

    createHealthPopup(damage){
        this.healthPopup.node.active = true;
        this.healthPopup.string = damage;
        this.healthPopup.node.y = 250;
        this.healthPopup.node.scale = 1;
        cc.tween(this.healthPopup.node)
        .to(0.3, {y: 450, scale: 3})
        .call(()=>{
            this.healthPopup.node.active = false;
            this.isDead = false;
            cc.log('pop');
        })
        .start()
    }
});
