var Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        ani: cc.Animation,

    },

    onLoad(){
        var _setPositionSpawn = this.setPositionSpawn.bind(this)
        Emitter.instance.registerEvent("Spawned", _setPositionSpawn);
    },

    start(){
        Emitter.instance.registerEvent("INCORRECT", this.fire.bind(this));
        Emitter.instance.registerEvent("CORRECT", this.hurt.bind(this));
    },

    fire(){
        this.ani.stop();
        this.ani.play('attack');
        this.ani.on('finished', ()=>{
            this.ani.play('idle');
        });
    },

    moving(duration, distance){
        const movePositionX = this.node.x - distance;
        this.ani.play('walk');
        cc.tween(this.node)
            .to(duration, { x: movePositionX })
            .call(()=>{
                this.ani.stop();
                this.ani.play('idle');
                Emitter.instance.emit('start');
            })
            .start()
    },

    hurt(){
        this.ani.stop();
        this.ani.play('hurt');
        this.ani.on('finished', ()=>{
            this.ani.play('idle');
        });
    },

    setPositionSpawn(data){
        cc.log('spawn');
        this.node.x = data.x;
        this.moving(2, 675)
    }
});
