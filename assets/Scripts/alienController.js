var Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        scoreGiven: 1,
    },

    onEnable(){
        this.ani = this.node.getComponent(cc.Animation);
        this._fire = this.fire.bind(this);
        this._hurt = this.hurt.bind(this);
        Emitter.instance.registerEvent("INCORRECT", this._fire );
        Emitter.instance.registerEvent("CORRECT", this._hurt);
    },

    onDestroy() {
        Emitter.instance.removeEvent("INCORRECT", this._fire );
        Emitter.instance.removeEvent("CORRECT", this._hurt);
        Emitter.instance.emit('AlienDead', this.scoreGiven);
        this.ani = null;
    },

    onLoad(){
        // var _setPositionSpawn = this.setPositionSpawn.bind(this)
        // Emitter.instance.registerEvent("Spawned", _setPositionSpawn);
    },

    start(){

    },

    update(){
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

    setPositionSpawn(x, y){
        cc.log('spawn');
        this.node.x = x;
        this.node.y = y;
        this.moving(2, 675)
    }
});
