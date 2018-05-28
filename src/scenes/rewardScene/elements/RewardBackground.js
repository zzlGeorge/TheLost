/**
 * 游戏背景(视差技术)
 * */

var RewardBackground = cc.Layer.extend({
    _bg1: null,
    _bg2: null,
    _bg3: null,
    _bg4: null,

    speed: 5,

    ctor: function () {
        this._super();
        this.scheduleUpdate();

        var buildParallaxBackground = function (texture) {//构建视差背景
            var layer = new cc.Layer();
            var bg1 = new cc.Sprite(texture);
            bg1.x = bg1.width / 2;
            bg1.y = bg1.height / 2;
            layer.addChild(bg1);
            var bg2 = new cc.Sprite(texture);
            bg2.x = bg2.width / 2 + bg2.width;
            bg2.y = bg2.height / 2;
            layer.addChild(bg2);
            return layer;
        };

        //sky
        this._bg1 = buildParallaxBackground(res.modesRes.rewardScene.bgLayer_png);
        this.addChild(this._bg1);

        //hill
        this._bg2 = buildParallaxBackground(res.modesRes.rewardScene.bgLayer2_png);
        this.addChild(this._bg2);

        //buildings
        this._bg3 = buildParallaxBackground("#bgLayer3.png");
        this.addChild(this._bg3);

        //trees
        this._bg4 = buildParallaxBackground("#bgLayer4.png");
        this.addChild(this._bg4);

        return true;
    },

    update: function (dt) {
        var winSize = Constants.GAME_WIN_SIZE;
        this._bg1.x -= Math.ceil(this.speed * 0.02);
        if (this._bg1.x < -parseInt(winSize.width))
            this._bg1.x = 0;

        this._bg2.x -= Math.ceil(this.speed * 0.2);
        if (this._bg2.x < -parseInt(winSize.width))
            this._bg2.x = 0;

        this._bg3.x -= Math.ceil(this.speed * 0.5);
        if (this._bg3.x < -parseInt(winSize.width))
            this._bg3.x = 0;

        this._bg4.x -= Math.ceil(this.speed * 1.0);
        if (this._bg4.x < -parseInt(winSize.width))
            this._bg4.x = 0;
    }
});