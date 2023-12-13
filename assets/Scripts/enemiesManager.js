var Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        enemy: [cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Emitter.instance.registerEvent("Spawn", this.selectEnemySpawn.bind(this));
    },

    start () {
        this.enemy.forEach(element => {
            element.active = false;
        });
    },

    // update (dt) {},

    selectEnemySpawn(data){
        this.enemy[Math.floor(Math.random() * 2)].active = true;
        Emitter.instance.emit('Spawned',data);
    }
});
