var Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent("CORRECT", this.onHello.bind(this));
    },

    onHello(data){
        cc.log(data)
    },

    onWelcome(data){
        cc.log('welcome', data)
    },

    start () {

    },

    // update (dt) {},
});
