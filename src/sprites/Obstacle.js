/**
 * @author George
 * @date 2018/4/9 23:51
 * @description 障碍物
 **/

var Obstacle = cc.Sprite.extend({

    type: 0,

    ctor: function (type) {
        this._super("#obstacle_" + type + ".png");
        this.reuse(type);

        return true;
    },

    reuse: function (type) {
        this.setSpriteFrame("obstacle_" + type + ".png");
        this.type = type;
        this.animateObstacle();
    },

    unuse: function () {
        this.stopAllActions();
    },

    /** 障碍物动态 */
    animateObstacle: function () {
        switch (this.type) {
            case Constants.OBSTACLE.POISON_ITEM_1:
                this.runAction(this.scaleAction(2, 1, 1.8));
                break;
            case Constants.OBSTACLE.POISON_ITEM_2:
                this.runAction(cc.spawn(this.scaleAction(2, 1, 0.5, 0.5, 0.5), this.fadeAction()));
                break;
            case Constants.OBSTACLE.POISON_ITEM_3:
                this.runAction(cc.spawn(this.scaleAction(2, 0.8, 0.8), this.fadeAction()));
                break;
            case Constants.OBSTACLE.BRAMBLE:
                this.runAction(this.scaleAction(2, 1, 1.5));
                break;
            case Constants.OBSTACLE.NETTLE_FISH:

                this.runAction(cc.spawn(this.scaleAction(2, 1.5, 1.5), this.rotateAction(2)));
                break;
            case Constants.OBSTACLE.SEAHORSE:
                this.runAction(this.upAndDownAction());
                break;
        }
    },

    scaleAction: function (delay, x, y, nx, ny) {
        if (nx === undefined || nx === null)
            nx = ny = 1;
        return cc.sequence(cc.scaleTo(delay, x, y),
            cc.scaleTo(delay, nx, ny)).repeatForever();//重复放大缩小动作
    },

    rotateAction: function (delay) {
        return cc.rotateBy(delay, 360).repeatForever();
    },

    fadeAction: function () {
        return cc.sequence(cc.fadeTo(1.0, 100), cc.fadeTo(1.0, 255)).repeatForever();
    },

    upAndDownAction: function () {
        return cc.sequence(cc.moveBy(1, cc.p(this.x, LakeMode.LAKE_HEIGHT - this.y)),
            cc.moveBy(1, cc.p(this.x, -LakeMode.LAKE_HEIGHT))).repeatForever();
    }

});

Obstacle.create = function (type) {
    if (cc.pool.hasObject(Obstacle)) {
        return cc.pool.getFromPool(Obstacle, type);
    } else {
        return new Obstacle(type);
    }
};