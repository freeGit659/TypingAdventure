var Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        hpMax: 20,
        hpCurrent: 0,
        scoreGiven: 1,

        isDead: false,

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
        if(this.hpCurrent <= 0){
            this.dead();
            cc.log('dead');
        }
    },

    update (dt) {
        this.updateHealth();
    },

    dead(){
        this.hpCurrent = this.hpMax;
        const ani =  this.node.parent.getComponent(cc.Animation);
        ani.play('die');
        this.node.parent.active =false;
        this.isDead = false;
        cc.log(this.hpCurrent);
        Emitter.instance.emit('AlienDead', this.scoreGiven);
        // this.scheduleOnce(function() {
        //     // this.node.parent.active =false;
        //     // this.isDead = false;
        //     // cc.log(this.node.parent);
        //     // Emitter.instance.emit('AlienDead', this.scoreGiven);
        // }, ani.play('die').duration/ani.play('die').speed );
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
        })
        .start()
    }
});
