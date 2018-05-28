/**
 * 英雄
 * */

var Hero = cc.Sprite.extend({

    // _animation: null,
    state: 0,
    /** 快慢飞行控制 */
    _fast: false,

    ctor: function () {
        // this._super("#fly_0001.png");
        this._super("res/images/modes/rewardScene/character.png");

        this.setRotation(180);
        // this._animation = new cc.Animation();
        // for (var i = 1; i < 20; i++) {
        //     this._animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("fly_00" + (i < 10 ? ('0' + i) : i) + ".png"));
        // }
        // this._animation.setDelayPerUnit(1 / 20);
        // var action = cc.animate(this._animation).repeatForever();
        // this.runAction(action);
        this._fast = false;

        return true;
    },

    /** 开放接口，控制英雄快慢飞行 */
    toggleSpeed: function (fast) {
        // if (fast === this._fast)
        //     return;
        // this._fast = fast;
        //
        // this.stopAllActions();
        // if (!fast)
        //     this._animation.setDelayPerUnit(1 / 20);
        // else
        //     this._animation.setDelayPerUnit(1 / 60);
        // var action = cc.animate(this._animation).repeatForever();
        // this.runAction(action);
    }
});