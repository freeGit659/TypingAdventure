var Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        ani: cc.Animation,
    },

    onLoad(){
        
    },

    start(){
        Emitter.instance.registerEvent("INCORRECT", this.fire.bind(this));
        Emitter.instance.registerEvent("CORRECT", this.hurt.bind(this));
    },

    fire(){
        this.ani.stop();

        this.ani.play('green_fire2');
        this.ani.on('finished', ()=>{
            this.ani.play('green_idle');
        });
    },

    moving(duration, movePositionX){
        this.ani.play('green_run');
        cc.tween(this.node)
            .to(duration, { x: movePositionX })
            .call(()=>{
                this.ani.stop();
                this.ani.play('green_idle');
            })
            .start()
    },

    hurt(){
        this.ani.stop();
        this.ani.play('green_hurt');
        this.ani.on('finished', ()=>{
            this.ani.play('green_idle');
        });
    }
});
