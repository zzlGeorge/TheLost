/**
 * @author George
 * @date 2018/4/6 13:20
 * @description 场景选择页
 **/

var SceneSkinSelectorDialog = cc.Layer.extend({

    sceneSkinSelectorDialog: null,
    skin_type: null,
    skinPageView: null,
    /** 页内容 */
    pageContent: [],

    ctor: function () {
        this._super();

        this.sceneSkinSelectorDialog = new ModalDialogueBox(this);
        // this.addChild(this.sceneSkinSelectorDialog);

        this.skin_type = Constants.SKIN_TYPE.DEVILDOM;//默认魔界

        this.initSkinPageView();
        this.initPageContent();
        this.fillSkinPageView();
    },

    initSkinPageView: function () {
        //读pageView
        var root = ccs.uiReader.widgetFromJsonFile(res.scenesRes.mainMenu_scn.sceneSkinSelector_json);
        this.addChild(root);

        this.skinPageView = ccui.helper.seekWidgetByName(root, "skin_pv_0");
        this.skinPageView.setIndicatorEnabled(true);
        this.skinPageView.setIndicatorSpaceBetweenIndexNodes(5);
        this.skinPageView.setIndicatorIndexNodesScale(0.5);
        //pageView索引素材
        // this.skinPageView.setIndicatorIndexNodesTexture("ccs-res/cocosui/green_edit.png");
        this.skinPageView.setIndicatorIndexNodesColor(cc.color.RED);

        var confirmBtn = ccui.helper.seekWidgetByName(root, "confirm_btn_0");
        confirmBtn.addClickEventListener(function () {
            this.sceneSkinSelectorDialog._onCallback();
        }.bind(this));
    },

    initPageContent: function () {
        var skins = Game.character.fixedAssets.viewSkin;
        for (var i = 0; i < 2; i++) {
            var layout = new ccui.Layout();
            layout.setContentSize(this.skinPageView.getContentSize());

            var imageView = new ccui.ImageView();//背景皮肤图
            var skinName;

            imageView.setContentSize(this.skinPageView.getContentSize());
            imageView.attr({
                anchorX: 0,
                anchorY: 0,
                x: layout.x,
                y: layout.y
            });
            layout.addChild(imageView);

            var checkBox = new ccui.CheckBox(); //场景选择框
            checkBox.setTouchEnabled(true);
            checkBox.loadTextures("res/images/gui/test/check_box_normal.png",
                "res/images/gui/test/check_box_normal_press.png",
                "res/images/gui/test/check_box_active.png",
                "res/images/gui/test/check_box_normal_disable.png",
                "res/images/gui/test/check_box_active_disable.png");
            checkBox.setPosition(cc.p(layout.width / 2, layout.height / 4));
            checkBox.setScale(2, 2);
            layout.addChild(checkBox, 2, "checkBox" + i);


            if (i === 0 || this.hasTheSkin(i + 1, skins)) {
                checkBox.addEventListener(function (sender, type) {
                    switch (type) {
                        case  ccui.CheckBox.EVENT_UNSELECTED:
                            // cc.log(111);
                            break;
                        case ccui.CheckBox.EVENT_SELECTED:
                            this.skin_type = this.skinPageView.getCurrentPageIndex();
                            this.unSelectedCheckbox();//关闭其他checkbox选中状态
                            break;
                        default:
                            break;
                    }
                }, this);
            } else {//没有此皮肤
                checkBox.setEnabled(false);

                var text = new ccui.Text();
                text.attr({
                    string: "当前没有此皮肤！",
                    font: "30px AmericanTypewriter",
                    x: layout.width / 2,
                    y: layout.height / 2 + text.height / 4
                });
                layout.addChild(text);
            }

            switch (i) {
                case Constants.SKIN_TYPE.DEVILDOM:
                    imageView.loadTexture(res.scenesRes.mainMenu_scn.bgskin.devildom_png);
                    skinName = new ccui.Text();
                    skinName.attr({
                        string: "魔界场景",
                        font: "70px AmericanTypewriter",
                        x: layout.width / 2,
                        y: 3 * layout.height / 4 + skinName.height / 4
                    });
                    layout.addChild(skinName);
                    break;
                case Constants.SKIN_TYPE.GREEN_BUSHES:
                    imageView.loadTexture(res.scenesRes.mainMenu_scn.bgskin.greenbushes_png);
                    skinName = new ccui.Text();
                    skinName.attr({
                        string: "绿木丛",
                        font: "70px AmericanTypewriter",
                        x: layout.width / 2,
                        y: 3 * layout.height / 4 + skinName.height / 4
                    });
                    layout.addChild(skinName);
                    break;
            }

            this.pageContent.push(layout);
        }
    },

    hasTheSkin: function (id, skins) {
        // for (var i = 0; i < skins.length; i++) {
        //     if (skins[i]["id"] === id)
        //         return true;
        // }
        // return false;

        //默认都有
        return true;
    },

    //填充界面内容
    fillSkinPageView: function () {
        for (var i = 0; i < this.pageContent.length; i++) {
            this.skinPageView.insertPage(this.pageContent[i], i);
        }

        /** 页容器加入监听事件 */
        this.skinPageView.addEventListener(function (sender, type) {
            switch (type) {
                case ccui.PageView.EVENT_TURNING:
                    cc.log("page:" + sender.getCurPageIndex());
                    break;
                default:
                    // cc.log("page:" + sender.getCurPageIndex());
                    // this.currentPageNumber = sender.getCurPageIndex();
                    break;
            }
        }, this);
    },

    /** 关闭其他选中的 */
    unSelectedCheckbox: function () {
        var curPageNumber = this.skinPageView.getCurrentPageIndex();
        cc.log(curPageNumber);
        for (var i = 0; i < this.pageContent.length; i++) {
            if (i === curPageNumber)
                continue;
            var layout = this.pageContent[i];
            var checkBox = layout.getChildByName("checkBox" + i);
            checkBox.setSelected(false);
        }
    }

});