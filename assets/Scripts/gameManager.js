var Emitter = require('mEmitter');

cc.Class({
    extends: cc.Component,

    properties: {
        alineGreen: cc.Node,
        gameOverPanel: cc.Node,

        nameLabel: cc.Label,
        background: cc.Node,
        speed: 50,
        spineBoy: sp.Skeleton,
        typingScene: cc.Node,
        typingBox: cc.EditBox,
        alineHead: cc.Node,
    },

    onLoad() {
        Emitter.instance.registerOnce('userName', this.getUserName.bind(this));
        Emitter.instance.registerOnce('completePortal', this.loadTyping.bind(this));
        Emitter.instance.registerOnce('death', this.gameOver.bind(this));

        this._alineGreen = this.alineGreen.getComponent('alineController');
    },

    start(){
        this.gameOverPanel.active = false;
        //this.typingScene.active = false;
    },

    // moveBackground() {
    //     const movePositionX= -280;

    //     cc.tween(this.background)
    //         .to(2, { x: movePositionX })
    //         .start();
    // },

    spineBoyMoving(){
        const movePositionX= -80;

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
        this.typingBox.blur();
        this.typingScene.active = false;
        this.alineHead.active = true;
        // this.moveBackground();
        this.spineBoyMoving();
        this._alineGreen.moving(2,70);

    },

    gameOver(){
        Emitter.instance.emit('GameOver');
        // this.gameOverPanel.active = true;
        this.typingScene.active = false;
    }
});
