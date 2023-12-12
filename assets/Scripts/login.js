const Emitter = require('mEmitter');

cc.Class({
    extends: cc.Component,

    properties: {
        gameScreen: cc.Node,
        editBoxName: cc.EditBox,
        errorLabel: cc.Label
    },

    onLogin(){
        let textInput = this.editBoxName.string;

        if (textInput.trim() === ''){
            this.errorLabel.node.active = true;
        } else {
            this.node.active = false;
            this.gameScreen.active = true;
            Emitter.instance.emit('userName', textInput);
        }
    }

});
