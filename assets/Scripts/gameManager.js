var Emitter = require('mEmitter');

cc.Class({
    extends: cc.Component,

    properties: {
        alien1: cc.Node,

        gameOverPanel: cc.Node,

        nameLabel: cc.Label,
        background: cc.Node,
        speed: 50,
        spineBoy: sp.Skeleton,
        typingScene: cc.Node,
        typingBox: cc.EditBox,
    },

    onLoad() {
        var _nextEnemy = this.nextEnemy.bind(this);
        Emitter.instance.registerOnce('userName', this.getUserName.bind(this));
        Emitter.instance.registerOnce('prepare', this.preparing.bind(this));
        Emitter.instance.registerOnce('death', this.gameOver.bind(this));
        Emitter.instance.registerEvent('AlienDead', _nextEnemy);
    },

    start(){
        this.typingScene.active = false;
    },

    spineBoyMoving(distance){
        const movePositionX= this.spineBoy.node.x + distance;

        cc.tween(this.spineBoy.node)
            .to(2, { x: movePositionX })
            .call(()=>{
                this.typingScene.active = true;
            })
            .start();
    },

    // onKeyDown(event) {
    //     if (event.keyCode === cc.macro.KEY.space) {
    //         this.spineBoy.setAnimation(2, 'shoot', false);
    //     }
    // },

    preparing(){
        this.nextEnemy();
    },

    getUserName(data){
        this.nameLabel.string = data;
    },

    loadTyping(){
        //this.typingBox.blur();
        this.typingScene.active = true;
    },

    gameOver(){
        Emitter.instance.emit('GameOver');
        // this.gameOverPanel.active = true;
        this.typingScene.active = false;
    },

    nextEnemy(){
        const spawnData = {
            x: this.spineBoy.node.x + 1200,
        }
            Emitter.instance.emit('Spawn');
        this.spineBoyMoving(230);
    },

    restart(){

    }
});