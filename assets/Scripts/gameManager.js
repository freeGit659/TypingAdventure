var Emitter = require('mEmitter');

cc.Class({
    extends: cc.Component,

    properties: {
        alineGreen: cc.Node,

        nameLabel: cc.Label,
        background: cc.Node,
        speed: 50,
        spineBoy: sp.Skeleton,
        typingScene: cc.Node,
        alineHead: cc.Node,
    },

    onLoad() {
        Emitter.instance.registerOnce('userName', this.getUserName.bind(this));
        Emitter.instance.registerOnce('completePortal', this.loadTyping.bind(this));

        this._alineGreen = this.alineGreen.getComponent('alineController');
        //this.background.width = 100000;
        // cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

        // this.spineBoy.setAnimation(0, 'portal', false);
        // this.spineBoy.setCompleteListener(() => {
        //     this.spineBoy.addAnimation(1, 'hoverboard', false);
        //     // this.moveBackground();
        // });
    },

    // moveBackground() {
    //     const movePositionX= -280;

    //     cc.tween(this.background)
    //         .to(2, { x: movePositionX })
    //         .start();
    // },

    spineBoyMoving(){
        const movePositionX= -90;

        cc.tween(this.spineBoy.node)
            .to(2, { x: movePositionX })
            .call(()=>{
                
            })
            .start();
    },

    // onKeyDown(event) {
    //     if (event.keyCode === cc.macro.KEY.space) {
    //         this.spineBoy.setAnimation(2, 'shoot', false);
    //     }
    // },

    getUserName(data){
        this.nameLabel.string = data;
    },

    loadTyping(){
        this.typingScene.active = true;
        this.alineHead.active = true;
        // this.moveBackground();
        this.spineBoyMoving();
        this._alineGreen.moving(2,100);

    }
});
