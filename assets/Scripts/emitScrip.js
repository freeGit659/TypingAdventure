const Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    onHello(){
        Emitter.instance.emit('HELLO', "helloooooooo")
    },

    onWelcome(){
        Emitter.instance.emit('WELCOME', "Welcommeeeee")
    }

    // update (dt) {},
});
