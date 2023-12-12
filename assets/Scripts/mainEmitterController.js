var Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad () {
        Emitter.instance = new Emitter();
    },

    start () {

    },

    // update (dt) {},
});
