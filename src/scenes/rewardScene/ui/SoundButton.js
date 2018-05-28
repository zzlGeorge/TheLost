var SoundButton = cc.MenuItemToggle.extend({
    ctor: function () {

        //声音按钮播放效果
        var sprite = new cc.Sprite("#soundOn0000.png");
        var animation = new cc.Animation();
        animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("soundOn0000.png"));
        animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("soundOn0001.png"));
        animation.addSpriteFrame(cc.spriteFrameCache.getSpriteFrame("soundOn0002.png"));
        animation.setDelayPerUnit(1 / 3);
        var action = cc.animate(animation).repeatForever();
        sprite.runAction(action);

        this._super(new cc.MenuItemSprite(sprite, null, null), new cc.MenuItemImage("#soundOff.png"));
        this.setCallback(this._soundOnOff, this);//设置点击回调处理
    },

    _soundOnOff: function () {
        // Sound.toggleOnOff();
    }
});