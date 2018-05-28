/**
 * @author George
 * @date 2018/4/9 23:58
 * @description 障碍物管理类
 **/

var ObstacleManager = cc.Class.extend({
    _coreView: null,
    _container: null,
    _obstaclesToAnimate: null,

    ctor: function (coreView) {
        this._container = coreView.itemBatchLayer;
        this._coreView = coreView;
        this._obstaclesToAnimate = [];
    },

    removeAll: function () {
        if (this._obstaclesToAnimate.length > 0) {
            for (var i = this._obstaclesToAnimate.length - 1; i >= 0; i--) {
                var item = this._obstaclesToAnimate[i];
                this._obstaclesToAnimate.splice(i, 1);
                cc.pool.putInPool(item);
                this._container.removeChild(item);
            }
        }
    },

    /** 生成单个障碍物 */
    createSingleObstacle: function (type, startX, startY, scale) {
        if (scale === null || scale === undefined)
            scale = 1;
        var obstacle = Obstacle.create(type);
        // obstacle.setScale(0.4);
        obstacle.setPosition(startX, startY);
        obstacle.setScale(scale);
        this._container.addChild(obstacle);
        this._obstaclesToAnimate.push(obstacle);
    },

    updateObstacles: function (dt, speed) {
        var obstacle;
        var boundCharacter = this._coreView.character.getBoundingBox();
        for (var i = this._obstaclesToAnimate.length - 1; i >= 0; i--) {
            obstacle = this._obstaclesToAnimate[i];

            if (obstacle) {
                obstacle.x -= speed * dt * 8;

                if (obstacle.x < -obstacle.getBoundingBox().width / 2
                    || Game.gameState === Constants.GAME_STATE.DEATH) {//消失
                    this._obstaclesToAnimate.splice(i, 1);
                    cc.pool.putInPool(obstacle);
                    this._container.removeChild(obstacle);
                } else {
                    //碰撞检测处理
                    //TODO 障碍物碰撞检测有问题
                    var boundObstacle = obstacle.getBoundingBox();
                    if (CollisionLogic.rectCollision(boundCharacter, boundObstacle)
                        && Game.character.buffValue.strong === 0) {//非无敌buff下发生碰撞
                        switch (obstacle.type) {
                            case Constants.OBSTACLE.POISON_ITEM_1:
                                break;
                            case Constants.OBSTACLE.POISON_ITEM_2:
                                break;
                            case Constants.OBSTACLE.POISON_ITEM_3:
                                break;
                            case Constants.OBSTACLE.BRAMBLE:
                                break;
                            case Constants.OBSTACLE.NETTLE_FISH:
                                break;
                            case Constants.OBSTACLE.SEAHORSE:
                                break;
                        }
                        // this._coreView.character.hurt();//角色受伤，执行特效动作


                        if (Game.character.collisionValues.bramble === 0) {
                            Game.character.collisionValues.bramble = 60;//满碰撞值
                            this._coreView.character.reduceCharacterLive();//生命值减少
                            Sound.playHurt();
                            cc.log("碰撞，扣血！");
                            this._coreView.character.runAction(cc.blink(0.5, 5));
                        }
                    }
                }
            }
        }

        if (Game.character.collisionValues.bramble > 0) {
            Game.character.collisionValues.bramble--;//消耗碰撞值
            this.showCollisionEffect(this._coreView);
            if (Game.character.collisionValues.bramble === 0) {
                //角色恢复正常
                this._coreView.character.setVisible(true);
            }
        }
    },

    //碰撞障碍物特效
    showCollisionEffect: function (gameScene) {
        if (Game.character.collisionValues.bramble > 0) {
            gameScene.x = parseInt(Math.random() * Game.character.collisionValues.bramble - Game.character.collisionValues.bramble * 0.5);
            gameScene.y = parseInt(Math.random() * Game.character.collisionValues.bramble - Game.character.collisionValues.bramble * 0.5);
        } else if (gameScene.x !== 0) {
            // If the shake value is 0, reset the stage back to normal. Reset to initial position.
            gameScene.x = 0;
            gameScene.y = 0;
        }
    },

    /** 创建障碍物1，在陆地关调用 */
    createObstacle_1: function () {
        var times = Math.ceil(Math.random() * 5);//创建障碍物1次数
        var posX = Constants.GAME_WIN_SIZE.width;
        for (var i = 0; i < times; i++) {
            this.createSingleObstacle(Constants.OBSTACLE.POISON_ITEM_1, posX + i * Math.ceil(Math.random() * 1200 + 600),
                Constants.GAME_WIN_SIZE.height + (GameBackground.BG_SIZE.height
                - Constants.GAME_WIN_SIZE.height) / 2);
        }
    },

    /** 创建障碍物2，在过渡陆地调用 */
    createObstacle_2: function (tranY) {
        var times = Math.ceil(Math.random() * 4);//创建障碍物4次数
        var posX = Constants.GAME_WIN_SIZE.width + 400;
        for (var i = 0; i < times; i++) {
            this.createSingleObstacle(Constants.OBSTACLE.POISON_ITEM_2,
                posX + i * Math.ceil(Math.random() * 500 + 800),
                tranY, 0.5);
        }
    }
});