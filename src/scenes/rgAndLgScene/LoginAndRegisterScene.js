/**
 * @author George
 * @date 2018/4/3 23:47
 * @description 登陆注册场景
 **/

var LgRgUILayer = cc.Layer.extend({
    loginBtn: null,
    aboutBtn: null,
    noLoginBtn: null,
    registerBtn: null,

    aboutDialog: null,
    registerDialog: null,
    loginDialog: null,

    mainMenuScene: null,

    male_cb: null,
    female_cb: null,

    ctor: function () {
        this._super();

        Game.sysState = 0;//默认游戏状态为离线状态

        // this.mainMenuScene = new MainMenuScene();

        this.initUI();
        Sound.playMenuBgMusic();
        // this.initTestUI();
    },

    initUI: function () {
        var bg = new cc.Sprite(res.scenesRes.lgrg_scn.bg);
        bg.setAnchorPoint(cc.p(0, 0));
        this.addChild(bg);

        var root = ccs.uiReader.widgetFromJsonFile(res.scenesRes.lgrg_scn.lgrg_ui_json);
        this.addChild(root);

        this.loginBtn = ccui.helper.seekWidgetByName(root, "login_btn");
        this.loginBtn.addClickEventListener(function () {
            this.loginDialog.popup();
        }.bind(this));

        this.noLoginBtn = ccui.helper.seekWidgetByName(root, "noLogin_btn");
        this.noLoginBtn.addClickEventListener(function () {
            // MyLoaderScene.preload(guiScene, function () {
            // cc.director.runScene(this.mainMenuScene);//进入主菜单
            DataHandler.handlePlayerFromLocal();//游客本地数据读入
            cc.director.pushScene(new MainMenuScene());//进入主菜单
            // }.bind(this), this);
        }.bind(this));

        this.registerBtn = ccui.helper.seekWidgetByName(root, "register_btn");
        this.registerBtn.addClickEventListener(function () {
            this.registerDialog.popup();
        }.bind(this));
        //
        this.aboutBtn = ccui.helper.seekWidgetByName(root, "about_btn");
        this.aboutBtn.addClickEventListener(function () {
            this.aboutDialog.popup();
        }.bind(this));


        this.aboutLayerInit();//关于框
        this.registerLayerInit();//注册框
        this.loginLayerInit();//登陆框
    },

    aboutLayerInit: function () {
        var root = ccs.uiReader.widgetFromJsonFile(res.scenesRes.lgrg_scn.about_ui_json);

        this.aboutDialog = new ModalDialogueBox(root);
        this.addChild(this.aboutDialog);

        var back_btn = ccui.helper.seekWidgetByName(root, "back_btn");
        back_btn.addClickEventListener(function () {
            this.aboutDialog._onCallback();
        }.bind(this));
    },

    registerLayerInit: function () {
        var root = ccs.uiReader.widgetFromJsonFile(res.scenesRes.lgrg_scn.register_ui_json);

        this.registerDialog = new ModalDialogueBox(root);
        this.addChild(this.registerDialog);

        var userName = ccui.helper.seekWidgetByName(root, "username_tf");
        var password = ccui.helper.seekWidgetByName(root, "psw_tf");
        var confirm_psw = ccui.helper.seekWidgetByName(root, "cfpsw_tf");
        var area = ccui.helper.seekWidgetByName(root, "area_tf");


        this.male_cb = ccui.helper.seekWidgetByName(root, "male_cb");
        this.male_cb.addEventListener(
            function (sender, type) {
                switch (type) {
                    case  ccui.CheckBox.EVENT_UNSELECTED:
                        break;
                    case ccui.CheckBox.EVENT_SELECTED:
                        sender.setSelected(true);
                        this.female_cb.setSelected(false);
                        break;
                    default:
                        break;
                }
            }, this);
        this.female_cb = ccui.helper.seekWidgetByName(root, "female_cb");
        this.female_cb.addEventListener(
            function (sender, type) {
                switch (type) {
                    case  ccui.CheckBox.EVENT_UNSELECTED:
                        break;
                    case ccui.CheckBox.EVENT_SELECTED:
                        sender.setSelected(true);
                        this.male_cb.setSelected(false);
                        break;
                    default:
                        break;
                }
            }, this);

        var registerBtn = ccui.helper.seekWidgetByName(root, "register_btn");
        registerBtn.addClickEventListener(function () {

            var self = this;
            var confirm = ConfirmUI.create("确定注册吗？", function () {
                //发送注册数据
                Http.sendHttpPost(
                    ServerApi.PLAYER.REGISTER,//url
                    {
                        userName: userName.getString(),
                        password: password.getString(),
                        sex: self.male_cb.isSelected() ? "男" : "女",
                        area: area.getString()
                    },//参数
                    function (sc, rc, response) {//回调
                        var respTxt;
                        //弹出提示
                        if (sc === -1)//网络错误情况
                            respTxt = "网络连接出问题，请检查...";
                        else//请求成功情况
                            respTxt = response.message !== "" && response.message !== null
                                ? response.message : "OK.";
                        AlertUi.alert(respTxt, self.registerDialog);
                    });

            });
            this.registerDialog.addChild(confirm.dialog);

        }.bind(this));

        var backBtn = ccui.helper.seekWidgetByName(root, "back_btn");
        backBtn.addClickEventListener(function () {
            this.registerDialog._onCallback();
        }.bind(this));
    },

    loginLayerInit: function () {
        var root = ccs.uiReader.widgetFromJsonFile(res.scenesRes.lgrg_scn.login_ui_json);
        this.loginDialog = new ModalDialogueBox(root);
        this.addChild(this.loginDialog);

        var userName = ccui.helper.seekWidgetByName(root, "username_tf");
        var password = ccui.helper.seekWidgetByName(root, "psw_tf");

        var loginBtn = ccui.helper.seekWidgetByName(root, "confirm_btn");
        loginBtn.addClickEventListener(function () {
            var self = this;
            Http.sendHttpPost(
                ServerApi.PLAYER.LOGIN,//url
                {
                    userName: userName.getString(),
                    password: password.getString()
                },//参数
                function (sc, rc, response) {//回调
                    var respTxt;
                    //弹出提示
                    if (sc === -1)//网络错误情况
                        respTxt = "网络连接出问题，请检查...";
                    else {//请求成功情况
                        respTxt = response.message !== "" && response.message !== null
                            ? response.message : "OK.";
                        var callBack;
                        if (response.code > 0) {
                            Game.player = response.dataList;
                            DataHandler.handlePlayerFromServer();//将服务器数据转化到全局数据结构
                            callBack = function () {
                                Game.sysState = 1;//游戏为网络状态
                                cc.director.runScene(new MainMenuScene());
                            };

                        }
                    }
                    AlertUi.alert(respTxt, self.loginDialog, callBack);
                });
        }.bind(this));
        var cancelBtn = ccui.helper.seekWidgetByName(root, "cancel_btn");
        cancelBtn.addClickEventListener(function () {
            this.loginDialog._onCallback();
        }.bind(this));
    },

    createObj: function (pic1, pic2, callBack) {
        var obj = new cc.MenuItemImage(pic1, pic2, callBack);
        obj.attr({
            x: Constants.GAME_WIN_SIZE.width / 2,
            y: Constants.GAME_WIN_SIZE.height / 2
        });

        return obj;
    },

    buttonTouchEvent: function (sender, type) {
        switch (type) {
            case ccui.Widget.TOUCH_BEGAN:
                cc.log("loginButton Touch Began");
                break;
            case ccui.Widget.TOUCH_MOVED:
                cc.log("loginButton Touch Moved");
                break;
            case ccui.Widget.TOUCH_ENDED:
                cc.log("loginButton Touch Ended");
                break;
            case ccui.Widget.TOUCH_CANCELED:
                cc.log("loginButton Touch Canceled");
                break;
        }
    }
});

var LoginAndRegisterScene = cc.Scene.extend({
    onEnter: function () {
        this._super();

        var layer = new LgRgUILayer();
        this.addChild(layer);

        return true;
    }
});