var Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        login: cc.Node,
        nameEditBox: cc.EditBox,

        uiUsername: cc.Label,

        userName: cc.String,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    setUserName(){
        this.userName = this.nameEditBox.string;
        this.uiUsername.string = this.userName;
        Emitter.instance.emit('Login');
        this.login.active = false;
    }
});
