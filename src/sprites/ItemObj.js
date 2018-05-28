/**
 * @author George
 * @date 2018/4/8 20:56
 * @description
 **/

var ItemObj = cc.Sprite.extend({

    type: 0,

    ctor: function (type) {
        this._super("#item_" + type + ".png");
        this.type = type;
        return true;
    },

    reuse: function (type) {
        this.setSpriteFrame("item_" + type + ".png");
        this.type = type;
    },

    unuse: function () {
    }

});

ItemObj.create = function (type) {
    if (cc.pool.hasObject(ItemObj)) {
        //需要在project.json中的modules属性里加入extensions，
        // 解决cc.pool其中某些api不能调的问题
        return cc.pool.getFromPool(ItemObj, type);
    } else {
        return new ItemObj(type);
    }
};