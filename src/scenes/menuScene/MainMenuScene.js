/**
 * @author George
 * @date 2018/4/6 0:39
 * @description 主菜单场景
 **/

var MainMenuScene = cc.Scene.extend({

    mainMenuView: null,

    //各模块对话框
    sceneSkinSelectorLayer: null,
    achievementDialog: null,
    characterSelectorDialog: null,
    dayRewardDialog: null,
    missionDialog: null,
    myPropsDialog: null,
    rankDialog: null,
    settingDialog: null,
    shopDialog: null,


    ctor: function () {
        this._super();

        this.mainMenuWidgetsInit();
        this.dialogInit();
        // if (Game.sysState === 1)
        //     DataHandler.getPlayerData();
        this.scheduleUpdate();
        return true;
    },

    mainMenuWidgetsInit: function () {
        var bg = new cc.Sprite(res.scenesRes.lgrg_scn.mainMenuBg);
        bg.setAnchorPoint(cc.p(0, 0));
        this.addChild(bg);

        //主菜单内容
        this.mainMenuView = ccs.uiReader.widgetFromJsonFile(res.scenesRes.mainMenu_scn.MainMenu_1_json);
        this.addChild(this.mainMenuView);

        //选择场景功能
        var selectSceneBtn = ccui.helper.seekWidgetByName(this.mainMenuView, "scenesSkin_btn");
        selectSceneBtn.addClickEventListener(function () {//选择场景
            this.sceneSkinSelectorLayer.sceneSkinSelectorDialog.popup();
        }.bind(this));

        //成就
        var achementsBtn = ccui.helper.seekWidgetByName(this.mainMenuView, "achements_btn");
        achementsBtn.addClickEventListener(function () {
            this.achievementDialog.achievementDialog.popup();
        }.bind(this));

        //角色选择
        var characterBtn = ccui.helper.seekWidgetByName(this.mainMenuView, "character_btn");
        characterBtn.addClickEventListener(function () {
            this.characterSelectorDialog.characterSelectorDialog.popup();
        }.bind(this));

        //连续登陆
        var today_btn = ccui.helper.seekWidgetByName(this.mainMenuView, "today_btn");
        today_btn.addClickEventListener(function () {
            this.dayRewardDialog.dayRewardDialog.popup();
        }.bind(this));

        //排行榜
        var rank_btn = ccui.helper.seekWidgetByName(this.mainMenuView, "rank_btn");
        rank_btn.addClickEventListener(function () {
            if (Game.sysState === 1) {
                this.rankDialog.rankDialog.popup();
            } else {
                AlertUi.alert("此功能需要联网才可使用！", this);
            }
        }.bind(this));

        //任务
        var mission_btn = ccui.helper.seekWidgetByName(this.mainMenuView, "mission_btn");
        mission_btn.addClickEventListener(function () {
            this.missionDialog.missionDialog.popup();
        }.bind(this));

        //我的道具
        var myProps_btn = ccui.helper.seekWidgetByName(this.mainMenuView, "myProps_btn");
        myProps_btn.addClickEventListener(function () {
            this.myPropsDialog.myPropsDialog.popup();
        }.bind(this));

        //商店
        var shop_btn = ccui.helper.seekWidgetByName(this.mainMenuView, "shop_btn");
        shop_btn.addClickEventListener(function () {
            this.shopDialog.shopDialog.popup();
        }.bind(this));

        //设置
        var settings_btn = ccui.helper.seekWidgetByName(this.mainMenuView, "settings_btn");
        settings_btn.addClickEventListener(function () {
            this.settingDialog.settingDialog.popup();
        }.bind(this));

        //开始游戏
        var startBtn = ccui.helper.seekWidgetByName(this.mainMenuView, "start_btn");
        startBtn.addClickEventListener(function () {

            var gameScene = new GameScene({
                skin_type: this.sceneSkinSelectorLayer.skin_type
            });

            // gameScene.retain();
            cc.director.pushScene(gameScene);
            // gameScene.release();

            // MyLoaderScene.preload(gameScene, function () {
            //     //根据选择的场景加载不同的资源
            //     switch (this.sceneSkinSelectorLayer.skin_type) {
            //         case Constants.SKIN_TYPE.DEVILDOM:
            //             cc.spriteFrameCache.addSpriteFrames(res.view_scenes.devildom.third_view_plist);
            //             break;
            //         case Constants.SKIN_TYPE.GREEN_BUSHES:
            //             cc.spriteFrameCache.addSpriteFrames(res.view_scenes.greenBushes.third_view_plist);
            //             break;
            //     }
            //
            //     //mode
            //     cc.spriteFrameCache.addSpriteFrames(res.modesRes.landMode.pedals_plist);
            //     cc.spriteFrameCache.addSpriteFrames(res.modesRes.lowAltitudeMode.brambles_plist);
            //     cc.spriteFrameCache.addSpriteFrames(res.modesRes.createrObj_plist);
            //     cc.spriteFrameCache.addSpriteFrames(res.scenesRes.mainMenu_scn.MainMenu0_plist);
            //
            //     cc.spriteFrameCache.addSpriteFrames(res.modesRes.rewardScene.texture_plist);//奖励关图像等资源
            //     // cc.spriteFrameCache.addSpriteFrames(res.modesRes.rewardScene.texture_plist);
            //     // cc.director.runScene(new cc.TransitionFade(2, new RewardScene()));
            //
            //     var gameScene = new GameScene({
            //         skin_type: this.sceneSkinSelectorLayer.skin_type
            //     });
            //
            //     // gameScene.retain();
            //     cc.director.runScene(gameScene);
            //     // gameScene.release();
            //
            // }.bind(this), this);
        }.bind(this));

        this.fillWidgets();
    },

    /** 将获得的数据填充 */
    fillWidgets: function () {
        var userInfo_lb = ccui.helper.seekWidgetByName(this.mainMenuView, "userInfo_lb");
        if (Game.sysState === 1)
            userInfo_lb.setString(Game.player["userName"]);
        else userInfo_lb.setString("游客");

        var coin_lb = ccui.helper.seekWidgetByName(this.mainMenuView, "coin_lb");
        var coinQuan = Game.character.fixedAssets.coin ? Game.character.fixedAssets.coin : 0;
        coin_lb.setString(coinQuan);

        var diamond_lb = ccui.helper.seekWidgetByName(this.mainMenuView, "diamond_lb");
        var diamondQuan = Game.character.fixedAssets.diamond ? Game.character.fixedAssets.diamond : 0;
        diamond_lb.setString(diamondQuan);
    },

    /** 各种场景对话框初始化 */
    dialogInit: function () {
        this.sceneSkinSelectorLayer = new SceneSkinSelectorDialog();
        this.sceneSkinSelectorLayer.retain();
        this.addChild(this.sceneSkinSelectorLayer.sceneSkinSelectorDialog);

        this.achievementDialog = new AchievementDialog();
        this.addChild(this.achievementDialog.achievementDialog);

        this.characterSelectorDialog = new CharacterSelectorDialog();
        this.addChild(this.characterSelectorDialog.characterSelectorDialog);

        this.dayRewardDialog = new DayRewardDialog();
        this.addChild(this.dayRewardDialog.dayRewardDialog);

        this.rankDialog = new RankDialog();
        this.addChild(this.rankDialog.rankDialog);

        this.missionDialog = new MissionDialog();
        this.addChild(this.missionDialog.missionDialog);

        this.myPropsDialog = new MyPropsDialog();
        this.addChild(this.myPropsDialog.myPropsDialog);

        this.shopDialog = new ShopDialog();
        this.addChild(this.shopDialog.shopDialog);

        this.settingDialog = new SettingDialog();
        this.addChild(this.settingDialog.settingDialog);
    },

    coinTemp: null,
    diamondTemp: null,

    update: function (dt) {
        if (Game.character.assets.coin !== this.coinTemp
            || Game.character.assets.diamond !== this.diamondTemp) {
            this.fillWidgets();
            DataHandler.saveOrUpdatePlayerProps();//存储到数据库
        }
        this.coinTemp = Game.character.assets.coin;
        this.diamondTemp = Game.character.assets.diamond;
    }
});