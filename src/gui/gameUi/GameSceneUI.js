/**
 * @author George
 * @date 2018/4/10 21:01
 * @description
 **/

var GameSceneUI = cc.Layer.extend({

    core_view: null,

    contentRoot: null,

    soundBtn: null,
    pauseBtn: null,

    coin_lb: null,
    diamond_lb: null,
    score_lb: null,
    distance_lb: null,
    blood_pb: null,

    blood_lb: null,
    blue_lb: null,
    revive_lb: null,
    reward_lb: null,

    soundOn: true,//声音开关标记
    pauseOn: false,//暂停开关标记

    bloodUnit: null,//单位血量占百分比

    ctor: function (core_view) {
        this._super();
        this.core_view = core_view;
        this.initContent();
        return true;
    },

    initContent: function () {
        var self = this;

        this.contentRoot = ccs.uiReader.widgetFromJsonFile(res.scenesRes.mainMenu_scn.gameScene_json);
        this.addChild(this.contentRoot);

        this.soundBtn = ccui.helper.seekWidgetByName(this.contentRoot, "sound_btn");
        this.soundBtn.addClickEventListener(function () {
            if (this.soundOn) {
                //TODO 关闭声音
            } else {
                //TODO 开启声音
            }
            this.soundOn = !this.soundOn;
        }.bind(this));
        this.pauseBtn = ccui.helper.seekWidgetByName(this.contentRoot, "pause_btn");
        this.pauseBtn.addClickEventListener(function () {
            if (this.pauseOn) {
                cc.director.pause();
            } else {
                cc.director.resume();
            }
            this.pauseOn = !this.pauseOn;
        }.bind(this));

        var home_btn = ccui.helper.seekWidgetByName(this.contentRoot, "home_btn");
        home_btn.addClickEventListener(function () {
            //询问的ui弹出框需要
            var confirm = ConfirmUI.create("确定返回主菜单？游戏数据将不保存。",
                function () {
                    cc.director.popScene();
                }.bind(this),
                function () {
                    cc.director.resume();
                }.bind(this),
                true);
            this.addChild(confirm.dialog);
        }.bind(this));


        this.coin_lb = ccui.helper.seekWidgetByName(this.contentRoot, "coin_lb");
        this.diamond_lb = ccui.helper.seekWidgetByName(this.contentRoot, "diamod_lb");
        this.score_lb = ccui.helper.seekWidgetByName(this.contentRoot, "score_lb");
        this.distance_lb = ccui.helper.seekWidgetByName(this.contentRoot, "distance_lb");
        this.blood_pb = ccui.helper.seekWidgetByName(this.contentRoot, "blood_pb");//血量进度条
        this.bloodUnit = 100 / Game.character.lives;
        this.blood_pb.setPercent(100);


        var bloodBt = ccui.helper.seekWidgetByName(this.contentRoot, "bloodBt");
        bloodBt.setTitleText(Game.character.fixedAssets.bloodBottle);
        bloodBt.addClickEventListener(function () {//选择场景
            var quan = Game.character.fixedAssets.bloodBottle;
            if (quan !== 0) {
                Game.character.fixedAssets.bloodBottle--;
                if (Game.character.lives < Constants.CHARACTER.LIVES) {//加血
                    Game.character.lives++;
                }
                this.setTitleText(Game.character.fixedAssets.bloodBottle);
            }
        });

        var core_view = this.core_view;
        var blueBt = ccui.helper.seekWidgetByName(this.contentRoot, "blueBt");
        blueBt.setTitleText(Game.character.fixedAssets.blueBottle);
        blueBt.addClickEventListener(function () {
            var quan = Game.character.fixedAssets.blueBottle;
            if (quan !== 0) {
                Game.character.fixedAssets.blueBottle--;
                Game.character.buffValue.strong = Constants.CHARACTER.STRONG;//无敌buff
                Game.character.buffState = true;
                core_view.character.strongBuffOn();
                this.setTitleText(Game.character.fixedAssets.blueBottle);
            }
        });
        var reviveTool = ccui.helper.seekWidgetByName(this.contentRoot, "lifeUpBt");
        reviveTool.setTitleText(Game.character.fixedAssets.revive);
        reviveTool.addClickEventListener(function () {
            var quan = Game.character.fixedAssets.revive;
            if (quan !== 0) {
                Game.character.fixedAssets.revive--;
                this.setTitleText(Game.character.fixedAssets.revive);
            }
        });

        var rewardTool = ccui.helper.seekWidgetByName(this.contentRoot, "rewardBt");
        rewardTool.setTitleText(Game.character.fixedAssets.rewardProp);
        rewardTool.addClickEventListener(function () {
            var quan = Game.character.fixedAssets.rewardProp;
            if (quan !== 0) {
                Game.character.fixedAssets.rewardProp--;
                this.setTitleText(Game.character.fixedAssets.rewardProp);
                core_view.usefulPropManager.goToRewardScene();//跳至奖励关
            }
        });

        // var cancel_btn = ccui.helper.seekWidgetByName(root, "cancel_btn");
        // cancel_btn.addClickEventListener(function () {
        //     this.missionDialog._onCallback();
        // }.bind(this));
    },

    /** 实时更新标签内容 */
    updateLabels: function () {//更新游戏数据
        this.coin_lb.setString(Game.character.assets.coin.toString());
        this.distance_lb.setString(parseInt(Game.character.distance).toString());
        this.diamond_lb.setString(Game.character.assets.diamond.toString());
        // this.blood_pb.setString(Game.character.assets.diamond.toString());
        this.blood_pb.setPercent(this.bloodUnit * Game.character.lives);
        this.score_lb.setString(Game.character.score.toString());
    }
});