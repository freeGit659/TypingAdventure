var Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        enemy: [cc.Node],
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var _selectEnemySpawn = this.selectEnemySpawn.bind(this)
        Emitter.instance.registerEvent("Spawn", _selectEnemySpawn);
    },

    start () {
        this.enemy.forEach(element => {
            element.active = false;
        });
    },

    // update (dt) {},

    selectEnemySpawn(data){
        let randomEnemy = Math.floor(Math.random() * 3);
        this.enemy[randomEnemy].active = true;
        cc.log(`random: `,randomEnemy);
        Emitter.instance.emit('Spawned',data);
    }
});
