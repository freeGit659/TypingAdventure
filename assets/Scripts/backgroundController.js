
cc.Class({
    extends: cc.Component,

    properties: {
        target: cc.Node,

        left: cc.Node,

        right: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        if(this.target.x>=this.right.x){
            this.left.x = this.right.x;
            this.right.x = this.left.x + 960;
        }
    },
});
