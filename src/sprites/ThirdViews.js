/**
 * @author George
 * @date 2018/3/18 20:09
 * @description 三级场景
 **/

var ThirdViews = cc.Sprite.extend({
    type: 0,
    picNamePrefix: null,

    ctor: function (type, picNamePrefix) {
        this._super("#" + picNamePrefix + type + ".png");
        this.type = type;
        this.picNamePrefix = picNamePrefix;
        return true;
    },

    reuse: function (type) {
        this.setSpriteFrame(this.picNamePrefix + type + ".png");//注意不要加#号
        this.type = type;
    },

    unuse: function () {
    }
});

/**
 * @param type
 * @param picNamePrefix 图片前缀名
 * */
ThirdViews.create = function (type, picNamePrefix) {
    if (cc.pool.hasObject(ThirdViews)) {
        //需要在project.json中的modules属性里加入extensions，
        // 解决cc.pool其中某些api不能调的问题
        return cc.pool.getFromPool(ThirdViews, type);
    }
    else {
        return new ThirdViews(type, picNamePrefix);
    }
};