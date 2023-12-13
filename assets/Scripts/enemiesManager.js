
var Emitter = require('mEmitter');
cc.Class({
    extends: cc.Component,

    properties: {
        enemy: [cc.Prefab],
        player: cc.Node,

        parent: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var _selectEnemySpawn = this.selectEnemySpawn.bind(this)
        Emitter.instance.registerEvent("Spawn", _selectEnemySpawn);
    },

    start () {
        // this.enemy.forEach(element => {
        //     element.active = false;
        // });
    },

    // update (dt) {},

    selectEnemySpawn(){
        let randomEnemy = Math.floor(Math.random() * 3);
        const enemy = cc.instantiate(this.enemy[randomEnemy]);
        enemy.parent = this.parent;
        enemy.getComponent('alienController').setPositionSpawn(this.player.x + 1200, -125);
        // Emitter.instance.emit('Spawned',data);
    }
});
