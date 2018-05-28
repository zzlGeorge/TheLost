/**
 * @author George
 * @date 2018/4/1 16:46
 * @description 低空层荆棘藤障碍物
 **/

var Bramble = cc.Sprite.extend({
    type: 0,

    ctor: function (type, scale) {
        this._super("#obstacle_0" + type + ".png");

        if (scale === undefined || scale === null)
            scale = cc.p(1, 1);
        this.attr({
            scaleX: scale.x,
            scaleY: scale.y
        });

        this.type = type;
        return true;
    },

    reuse: function (type, scale) {
        this.setSpriteFrame("obstacle_0" + type + ".png");
        this.type = type;
        if (scale === undefined || scale === null)
            scale = cc.p(1, 1);

        this.attr({
            scaleX: scale.x,
            scaleY: scale.y
        });
    },

    unuse: function () {

    }
});

Bramble.create = function (type, scale) {
    if (cc.pool.hasObject(Bramble)) {
        return cc.pool.getFromPool(Bramble, type, scale);
    }
    else {
        return new Bramble(type, scale)
    }
};