/**
 * @author George
 * @date 2018/3/14 22:04
 * @description 游戏核心场景
 **/

var GameScene = cc.Scene.extend({
    _background: null,
    _character: null,

    /** 皮肤类型 */
    skin_type: 0,

    /** 角色每帧y坐标变化量 */
    previousPosY: 0,

    /** 用于计算用户可视画面的y值偏移量 */
    viewOffset: 0,

    ctor: function (param) {
        this._super();
        //父层
        var parentLayer = new cc.Layer();
        this.addChild(parentLayer);

        this.initGameSceneParams(param);

        //注意，从主菜单场景切到此场景时，需要先调用 此类initGameSceneParams()函数。
        this._background = new GameBackground(this);
        parentLayer.addChild(this._background);

        this._character = this._background.core_view.character;//获取核心层的角色
        Sound.stop();
        Sound.playGameBgMusic();

        this.gameInit();

        return true;
    },

    onEnter: function () {
        this._super();

        return true;
    },

    /** 初始化游戏参数 */
    initGameSceneParams: function (params) {
        Game.character.lives = Constants.CHARACTER.LIVES;//初始化角色生命值
        Game.character.score = 0;
        Game.character.distance = 0;
        Game.character.assets.diamond = 0;
        Game.character.assets.coin = 0;
        Game.character.assets.revive = 0;
        Game.character.assets.rewardProp = 0;
        Game.character.assets.blueBottle = 0;
        Game.character.assets.bloodBottle = 0;

        this.skin_type = params.skin_type;
    },

    gameInit: function () {
        this.previousPosY = this._character.y;
        //初始化游戏数据
        this.scheduleUpdate();
    },

    update: function (dt) {
        //上浮下层动作
        // this._character.spriteActions.fRiseAndSink(this.touchState, dt);
        this.sceneOffset();

        this.keepRolePosY();//约束角色y坐标

        this.characterToCenter(dt, this._background.speed);//使角色回到屏幕中央
    },

    /** 场景相对角色的偏移 */
    sceneOffset: function () {
        var previousDeltaY = this._character.y - this.previousPosY;
        this.y -= previousDeltaY;

        this.viewOffset += previousDeltaY;

        this.previousPosY = this._character.y;

        if (this.y > (this._background.bgSize.height - Constants.GAME_WIN_SIZE.height) / 2) {
            this.y = (this._background.bgSize.height - Constants.GAME_WIN_SIZE.height) / 2;
        } else if (this.y < -(this._background.bgSize.height - Constants.GAME_WIN_SIZE.height) / 2) {
            this.y = -(this._background.bgSize.height - Constants.GAME_WIN_SIZE.height) / 2;
        }
    },

    characterToCenter: function (dt, speed) {
        if (this._character.x !== Constants.GAME_WIN_SIZE.width / 2) {
            if (this._character.x < Constants.GAME_WIN_SIZE.width / 2)
                this._character.x += Math.ceil(speed * dt * 8);

            if (this._character.x > Constants.GAME_WIN_SIZE.width / 2)
                this._character.x -= Math.ceil(speed * dt * 8);
        }
    },

    /** 约束角色y坐标位置 */
    keepRolePosY: function () {
        //顶端
        if (this._character.y + this._character.height / 2 > Constants.GAME_WIN_SIZE.height +
            (GameBackground.BG_SIZE.height - Constants.GAME_WIN_SIZE.height) / 2) {
            this._character.y = Constants.GAME_WIN_SIZE.height +
                (GameBackground.BG_SIZE.height - Constants.GAME_WIN_SIZE.height) / 2 -
                this._character.width / 2;
        }

        //底端
        if (this._character.y < -(GameBackground.BG_SIZE.height - Constants.GAME_WIN_SIZE.height) / 2) {
            this._character.y = -(GameBackground.BG_SIZE.height - Constants.GAME_WIN_SIZE.height) / 2;
        }
    }

});