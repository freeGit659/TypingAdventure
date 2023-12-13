var Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        target: cc.Node,

        isFollow: false,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance.registerEvent('start', ()=>{this.isFollow = true});
    },

    start () {

    },

    update (dt) {
        if(this.isFollow) {
            let targetPosition = new cc.Vec2(this.target.x+70, this.target.y + 120 )
            // let currentPosition = new cc.Vec2(this.node.x, 0);
            // let _currentPosition = currentPosition.lerp(targetPosition, 0, currentPosition);
            //this.node.setPosition(_currentPosition);
            this.node.setPosition(targetPosition);
        }
    },

});
