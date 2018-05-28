/**
 * 游戏场景UI
 * */

var RewardSceneUI = cc.Layer.extend({
    _lifeText: null,  //生命值
    _distanceText: null,//里程
    _scoreText: null,//分数

    ctor: function () {
        this._super();

        var winSize = cc.director.getWinSize();

        // var lifeLabel = new cc.LabelBMFont("L I V E S", fnt);
        var lifeLabel = new cc.LabelTTF("L I V E S", "Arial", 24);
        this.addChild(lifeLabel);
        lifeLabel.x = 360;
        lifeLabel.y = winSize.height - 25;

        // this._lifeText = new cc.LabelBMFont("0", fnt);
        this._lifeText = new cc.LabelTTF("0", "Arial", 24);
        this.addChild(this._lifeText);
        this._lifeText.x = 360;
        this._lifeText.y = winSize.height - 60;

        // var distanceLabel = new cc.LabelBMFont("D I S T A N C E", fnt);
        var distanceLabel = new cc.LabelTTF("D I S T A N C E", "Arial", 24);
        this.addChild(distanceLabel);
        distanceLabel.x = 680;
        distanceLabel.y = winSize.height - 25;

        // this._distanceText = new cc.LabelBMFont("50", fnt);
        this._distanceText = new cc.LabelTTF("50", "Arial", 24);
        this.addChild(this._distanceText);
        this._distanceText.x = 680;
        this._distanceText.y = winSize.height - 60;

        // var scoreLabel = new cc.LabelBMFont("S C O R E", fnt);
        var scoreLabel = new cc.LabelTTF("S C O R E", "Arial", 24);
        this.addChild(scoreLabel);
        scoreLabel.x = 915;
        scoreLabel.y = winSize.height - 25;

        // this._scoreText = new cc.LabelBMFont("100", fnt);
        this._scoreText = new cc.LabelTTF("100", "Arial", 24);
        this.addChild(this._scoreText);
        this._scoreText.x = 915;
        this._scoreText.y = winSize.height - 60;

        var pauseButton = new cc.MenuItemImage("#pauseButton.png", "#pauseButton.png", this._pauseResume);
        var soundButton = new SoundButton();
        var menu = new cc.Menu(soundButton, pauseButton);
        menu.alignItemsHorizontallyWithPadding(30);
        menu.x = 80;
        menu.y = winSize.height - 45;
        this.addChild(menu);

        return true;
    },

    _pauseResume: function () {//暂停、继续按钮
        if (cc.director.isPaused())
            cc.director.resume();
        else
            cc.director.pause();
    },

    update: function (dt) {//更新游戏数据
        this._lifeText.setString(RewardSceneProps.user.lives.toString());
        this._distanceText.setString(parseInt(RewardSceneProps.user.distance).toString());
        this._scoreText.setString(RewardSceneProps.user.score.toString());
    }
});