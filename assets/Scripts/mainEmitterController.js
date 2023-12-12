var Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        Emitter.instance = new Emitter();
        cc.log('main');
    },

    start () {

    },

    // update (dt) {},
});
