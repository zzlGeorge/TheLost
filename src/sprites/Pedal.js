/**
 * @author George
 * @date 2018/3/18 20:11
 * @description 陆地踏板类
 **/

var Pedal = cc.Sprite.extend({
    type: 0,

    ctor: function (type, scale) {
        this._super("#pedals_0" + type + ".png");

        if (scale === undefined || scale === null)
            scale = cc.p(1, 1);
        this.attr({
            scaleX: scale.x,
            scaleY: scale.y
            // width: this.width * scale.x,
            // height: this.height * scale.y
        });

        this.type = type;
        return true;
    },

    reuse: function (type, scale) {
        this.setSpriteFrame("pedals_0" + type + ".png");
        this.type = type;

        this.attr({
            scaleX: scale.x,
            scaleY: scale.y
            // width: this.width * scale.x,
            // height: this.height * scale.y
        });
    },

    unuse: function () {

    }
});

Pedal.create = function (type, scale) {
    if (cc.pool.hasObject(Pedal)) {
        return cc.pool.getFromPool(Pedal, type, scale);
    }
    else {
        return new Pedal(type, scale)
    }
};