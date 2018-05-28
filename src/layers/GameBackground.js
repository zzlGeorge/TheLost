/**
 * @author George
 * @date 2018/3/14 22:10
 * @description 游戏视差滚动背景设计
 **/

var GameBackground = cc.Layer.extend({
    bgSize: null,

    UILayer: null,

    /** 皮肤类型 */
    skinType: 0,

    /** 一级背景 */
    first_view: null,
    /** 核心游戏场景 */
    core_view: null,
    /** 三级背景 */
    third_view: null,
    third_view_container: [],
    /** 四级背景 */
    forth_view: null,
    /** 远景 */
    staticBg: null,

    /** 当前三级场景精灵前缀名 */
    currentPicPrefixName: null,


    /** 三级背景精灵数量 */
    spriteQuantity: 0,
    // stoneDistance: 200,
    // viewStonesContainer: [],

    /** 滚动速度 */
    speed: null,
    gameScene: null,

    ctor: function (gameScene) {
        this._super();

        this.bgSize = GameBackground.BG_SIZE;
        this.speed = 0;

        this.skinType = gameScene.skin_type;
        this.gameScene = gameScene;

        this.UILayer = new cc.Layer();
        this.addChild(this.UILayer, 5);//ui层，最顶端

        this.initSkin(this.skinType);

        this.scheduleUpdate();
        return true;
    },

    /**
     * 皮肤初始化
     * */
    initSkin: function () {
        switch (this.skinType) {
            case Constants.SKIN_TYPE.DEVILDOM:
                this.initDevildomSkin();
                break;
            case Constants.SKIN_TYPE.GREEN_BUSHES:
                this.initGreenBushes();
                break;

        }
        //暂时没变化,核心层初始化
        this.core_view = new CoreView(this, this.speed);
        this.addChild(this.core_view, 3);
    },

    /** 初始化魔界 */
    initDevildomSkin: function () {
        this.spriteQuantity = 5;
        this.currentPicPrefixName = "stone_0";

        this.staticBg = this.buildParallaxBackground(res.view_scenes.devildom.staticBg_png,
            this.bgSize.width, this.bgSize.height);
        this.addChild(this.staticBg, 0);

        this.forth_view = this.buildParallaxBackground(res.view_scenes.devildom.forth_view_png,
            this.bgSize.width, this.bgSize.height);
        this.addChild(this.forth_view, 1);

        this.third_view = new cc.SpriteBatchNode(res.view_scenes.devildom.third_view_png);
        this.addChild(this.third_view, 2);
        this.initThirdViews();

        this.first_view = this.buildParallaxBackground(res.view_scenes.devildom.first_view_png,
            this.bgSize.width, this.bgSize.height);
        this.addChild(this.first_view, 4);
    },

    /** 初始化绿木丛 */
    initGreenBushes: function () {
        this.spriteQuantity = 6;
        this.currentPicPrefixName = "node_0";

        this.staticBg = this.buildParallaxBackground(res.view_scenes.greenBushes.staticBg_png,
            this.bgSize.width, this.bgSize.height);
        this.addChild(this.staticBg, 0);

        this.forth_view = this.buildParallaxBackground(res.view_scenes.greenBushes.forth_view_png,
            this.bgSize.width, this.bgSize.height);
        this.addChild(this.forth_view, 1);

        this.third_view = new cc.SpriteBatchNode(res.view_scenes.greenBushes.third_view_png);
        this.addChild(this.third_view, 2);
        this.initThirdViews();

        this.first_view = this.buildParallaxBackground(res.view_scenes.greenBushes.first_view_png,
            this.bgSize.width, this.bgSize.height);
        this.addChild(this.first_view, 4);
    },


    /**
     * 初始化三级场景
     * */
    initThirdViews: function () {
        var oneView = ThirdViews.create(Math.ceil(Math.random() * this.spriteQuantity), this.currentPicPrefixName);
        oneView.attr({
            anchorY: 0,
            x: Constants.GAME_WIN_SIZE.width + oneView.width * 2 / 3,
            y: -(this.bgSize.height - Constants.GAME_WIN_SIZE.height) / 2
        });
        this.third_view.addChild(oneView);
        this.third_view_container.push(oneView);
    },

    update: function (dt) {
        this.staticBg.x -= Math.ceil(this.speed * dt);
        if (this.staticBg.x < -this.bgSize.width)
            this.staticBg.x = 0;

        this.forth_view.x -= Math.ceil(this.speed * dt * 2);
        if (this.forth_view.x < -this.bgSize.width)
            this.forth_view.x = 0;


        this.updateThirdViews(dt, Constants.GAME_WIN_SIZE.width / 3);

        this.first_view.x -= Math.ceil(this.speed * dt * 16);
        if (this.first_view.x < -this.bgSize.width)
            this.first_view.x = 0;
    },


    /** 每层上下移动控制 */
    viewsPosYMove: function (moveVal) {
        this.staticBg.y -= moveVal / 6;

        this.forth_view.y -= moveVal / 4;
    },

    /** 视差滚动层制造 */
    buildParallaxBackground: function (texture, w, h) {
        // var scaleX = Constants.GAME_WIN_SIZE.width / w;
        // w = scaleX * w;

        var layer = new cc.Layer();
        var bg1 = new cc.Sprite(texture);
        bg1.attr({
            x: w / 2,
            y: h / 2 - Math.abs(Constants.GAME_WIN_SIZE.height - h) / 2
        });
        layer.addChild(bg1);

        var bg2 = new cc.Sprite(texture);
        bg2.attr({
            x: w / 2 + w,
            y: h / 2 - Math.abs(Constants.GAME_WIN_SIZE.height - h) / 2
        });
        layer.addChild(bg2);

        return layer;
    },

    /**
     * 更新三层场景
     * @param dt
     * @param distance 每个精灵间距
     * */
    updateThirdViews: function (dt, distance) {
        var length = this.third_view_container.length;
        var tempArray = [];//替代数组
        for (var i = 0; i < length; i++) {
            var oneView = this.third_view_container[i];
            oneView.x -= Math.ceil(this.speed * dt * 4);

            if (oneView.x < -oneView.width) {//精灵达到屏幕最左端消失
                cc.pool.putInPool(oneView);
                // this.third_view_container.pop();
                this.third_view.removeChild(oneView);
                continue;
            }

            tempArray.push(oneView);
            if (i === length - 1 && oneView.x < Constants.GAME_WIN_SIZE.width -
                (distance + oneView.width / 2)) {//最后一个精灵达到指定间距
                var newView = ThirdViews.create(Math.ceil(Math.random() * this.spriteQuantity), this.currentPicPrefixName);
                newView.attr({
                    anchorY: 0,
                    x: Constants.GAME_WIN_SIZE.width + newView.width * 2 / 3,
                    y: -(this.bgSize.height - Constants.GAME_WIN_SIZE.height) / 2
                });
                // this.third_view_container.push(newView);//遍历数组时不能操作数组
                this.third_view.addChild(newView);
                tempArray.push(newView);
            }
        }
        this.third_view_container = tempArray;
    },

    /** 开放速度 */
    changeSpeed: function (speed) {
        this.speed = speed;
        this.core_view.speed = speed;
    }
});

GameBackground.BG_SIZE = cc.size(4096, 1024);
GameBackground.SPEED = 50;