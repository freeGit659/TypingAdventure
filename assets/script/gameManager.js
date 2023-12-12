var Emitter = require('mEmitter');

cc.Class({
    extends: cc.Component,

    properties: {
        nameLabel: cc.Label,
        background: cc.Node,
        speed: 50,
        spineBoy: sp.Skeleton,
    },

    onLoad() {
        Emitter.instance = new Emitter();
        Emitter.instance.registerEvent('userName', this.getUserName.bind(this));

        this.background.width = 100000;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        this.spineBoy.setAnimation(0, 'portal', false);
        this.spineBoy.setCompleteListener(() => {
            this.spineBoy.addAnimation(1, 'hoverboard', false);
            // this.moveBackground();
        });
    },

    moveBackground() {
        const moveDuration = this.background.width / this.speed;

        cc.tween(this.background)
            .to(moveDuration, { x: -this.background.width })
            .call(() => {
                this.moveBackground();
            })
            .start();
    },

    onKeyDown(event) {
        if (event.keyCode === cc.macro.KEY.space) {
            this.spineBoy.setAnimation(2, 'shoot', false);
        }
    },

    getUserName(data){
        this.nameLabel.string = data;
    },


});
