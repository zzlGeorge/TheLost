/**
 * @author George
 * @date 2018/4/10 15:10
 * @description 游戏结束UI
 **/

var GameOverUI = cc.Layer.extend({

    gameOverDialog: null,
    contentRoot: null,
    skin_type: 0,

    ctor: function (skin_type) {
        this._super();
        this.gameOverDialog = new ModalDialogueBox(this);
        this.skin_type = skin_type;
        this.initContent();
    },

    initContent: function () {
        this.contentRoot = ccs.uiReader.widgetFromJsonFile(res.scenesRes.mainMenu_scn.gameOver_json);
        this.addChild(this.contentRoot);

        // var cancel_btn = ccui.helper.seekWidgetByName(root, "cancel_btn");
        // cancel_btn.addClickEventListener(function () {
        //     this.missionDialog._onCallback();
        // }.bind(this));

        return true;
    },

    refreshData: function () {
        //星级评定
        var star1 = ccui.helper.seekWidgetByName(this.contentRoot, "star1_img");
        var star2 = ccui.helper.seekWidgetByName(this.contentRoot, "star2_img");
        var star3 = ccui.helper.seekWidgetByName(this.contentRoot, "star3_img");
        star1.loadTexture("res/images/gui/mainMenu/bgskin/unstar.png");
        star2.loadTexture("res/images/gui/mainMenu/bgskin/unstar.png");
        var finalScore = Game.character.score;
        if (finalScore > 100 && finalScore <= 250) {
            star1.loadTexture("res/images/gui/mainMenu/bgskin/star.png");
        } else if (finalScore > 250 && finalScore <= 500) {
            star1.loadTexture("res/images/gui/mainMenu/bgskin/star.png");
            star2.loadTexture("res/images/gui/mainMenu/bgskin/star.png");
        } else if (finalScore > 500) {
            star1.loadTexture("res/images/gui/mainMenu/bgskin/star.png");
            star2.loadTexture("res/images/gui/mainMenu/bgskin/star.png");
            star3.loadTexture("res/images/gui/mainMenu/bgskin/star.png");
        }

        //设置分数
        var scoreLabel = ccui.helper.seekWidgetByName(this.contentRoot, "score_lb");
        scoreLabel.setString(finalScore.toString());

        //距离
        var distanceLabel = ccui.helper.seekWidgetByName(this.contentRoot, "distance_lb");
        distanceLabel.setString(parseInt(Game.character.distance).toString());

        //时间
        var time_lb = ccui.helper.seekWidgetByName(this.contentRoot, "time_lb");
        time_lb.setString("null");

        var coin_lb = ccui.helper.seekWidgetByName(this.contentRoot, "coin_lb");
        coin_lb.setString(Game.character.assets.coin.toString());

        var diamond_lb = ccui.helper.seekWidgetByName(this.contentRoot, "diamond_lb");
        diamond_lb.setString(Game.character.assets.diamond.toString());

        //重来
        var repeat_btn = ccui.helper.seekWidgetByName(this.contentRoot, "repeat_btn");
        repeat_btn.addClickEventListener(function () {
            var gameScene = new GameScene({
                skin_type: this.skin_type
            });

            cc.director.runScene(gameScene);
            // this.gameOverDialog._onCallback();
        }.bind(this));

        //返回
        var back_btn = ccui.helper.seekWidgetByName(this.contentRoot, "back_btn");
        back_btn.addClickEventListener(function () {
            cc.director.runScene(new MainMenuScene());
            this.gameOverDialog._onCallback();
        }.bind(this));

        DataHandler.handleEndGameData();//保存游戏结束日志
    }


});