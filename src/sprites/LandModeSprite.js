/**
 * @author George
 * @date 2018/4/7 17:30
 * @description 陆地模式精灵
 **/

var LakeModeSprite = cc.Sprite.extend({

    ctor: function (picName) {
        this._super("#" + picName);
    },

    reuse: function (picName) {
        this.setSpriteFrame(picName);
    },

    unuse: function () {

    }
});

LakeModeSprite.create = function (picName) {
    if (cc.pool.hasObject(LakeModeSprite)) {
        return cc.pool.getFromPool(LakeModeSprite, picName);
    }
    else {
        return new LakeModeSprite(picName)
    }
};