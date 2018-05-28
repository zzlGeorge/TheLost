/**
 * @author George
 * @date 2018/4/7 0:10
 * @description 商店
 **/

var ShopDialog = cc.Layer.extend({

    shopDialog: null,
    listView: null,

    ctor: function () {
        this._super();

        this.shopDialog = new ModalDialogueBox(this);

        this.initMyContent();
        this.putContentIntoLv();
    },

    initMyContent: function () {
        var root = ccs.uiReader.widgetFromJsonFile(res.scenesRes.mainMenu_scn.shop_json);
        this.addChild(root);

        this.listView = ccui.helper.seekWidgetByName(root, "shop_lv");

//-------------------------------------
        var items = this.listView.getItems();
        var cell;
        for (var i = 0; i < items.length; i++) {
            cell = items[i].getChildByName("buy_btn");
            switch (i) {
                case 0:
                    cell.addClickEventListener(function () {
                        if (Game.character.fixedAssets.coin < 18) {
                            AlertUi.alert("金币不够，不可购买！", this.shopDialog);
                        } else {
                            var getQuan = parseInt(Game.character.fixedAssets.coin / 18);
                            var confirm = ConfirmUI.create("您能购买的数量为" + getQuan + "，确定购买吗？",
                                function () {
                                    Game.character.fixedAssets.diamond += getQuan;
                                    Game.character.fixedAssets.coin -= getQuan * 18;
                                    confirm.dialog._onCallback();
                                }.bind(this),
                                function () {
                                    confirm.dialog._onCallback();
                                }.bind(this)
                            );
                            this.shopDialog.addChild(confirm.dialog);
                        }
                    }.bind(this));
                    break;
                case 1:
                    cell.addClickEventListener(function () {
                        if (Game.character.fixedAssets.coin < 288) {
                            AlertUi.alert("金币不够，不可购买！", this.shopDialog);
                        } else {
                            var getQuan = parseInt(Game.character.fixedAssets.coin / 288);
                            var confirm = ConfirmUI.create("您能购买的数量为" + getQuan + "，确定购买吗？",
                                function () {
                                    Game.character.fixedAssets.rewardProp += getQuan;
                                    Game.character.fixedAssets.coin -= getQuan * 288;
                                    confirm.dialog._onCallback();
                                }.bind(this),
                                function () {
                                    confirm.dialog._onCallback();
                                }.bind(this)
                            );
                            this.shopDialog.addChild(confirm.dialog);
                        }
                    }.bind(this));
                    break;
                case 2:
                    cell.addClickEventListener(function () {
                        cc.log(111);
                        if (Game.character.fixedAssets.coin < 28) {
                            AlertUi.alert("金币不够，不可购买！", this.shopDialog);
                        } else {
                            var getQuan = parseInt(Game.character.fixedAssets.coin / 28);
                            var confirm = ConfirmUI.create("您能购买的数量为" + getQuan + "，确定购买吗？",
                                function () {
                                    Game.character.fixedAssets.bloodBottle += getQuan;
                                    Game.character.fixedAssets.coin -= getQuan * 28;
                                    confirm.dialog._onCallback();
                                }.bind(this),
                                function () {
                                    confirm.dialog._onCallback();
                                }.bind(this)
                            );
                            this.shopDialog.addChild(confirm.dialog);
                        }
                    }.bind(this));
                    break;
                case 3:
                    cell.addClickEventListener(function () {
                        cc.log(111);
                        if (Game.character.fixedAssets.coin < 38) {
                            AlertUi.alert("金币不够，不可购买！", this.shopDialog);
                        } else {
                            var getQuan = parseInt(Game.character.fixedAssets.coin / 38);
                            var confirm = ConfirmUI.create("您能购买的数量为" + getQuan + "，确定购买吗？",
                                function () {
                                    Game.character.fixedAssets.blueBottle += getQuan;
                                    Game.character.fixedAssets.coin -= getQuan * 38;
                                    confirm.dialog._onCallback();
                                }.bind(this),
                                function () {
                                    confirm.dialog._onCallback();
                                }.bind(this)
                            );
                            this.shopDialog.addChild(confirm.dialog);
                        }
                    }.bind(this));
                    break;
                case 4:
                    cell.addClickEventListener(function () {
                        cc.log(111);
                        if (Game.character.fixedAssets.coin < 188) {
                            AlertUi.alert("金币不够，不可购买！", this.shopDialog);
                        } else {
                            var getQuan = parseInt(Game.character.fixedAssets.coin / 188);
                            var confirm = ConfirmUI.create("您能购买的数量为" + getQuan + "，确定购买吗？",
                                function () {
                                    Game.character.fixedAssets.revive += getQuan;
                                    Game.character.fixedAssets.coin -= getQuan * 188;
                                    confirm.dialog._onCallback();
                                }.bind(this),
                                function () {
                                    confirm.dialog._onCallback();
                                }.bind(this)
                            );
                            this.shopDialog.addChild(confirm.dialog);
                        }
                    }.bind(this));
                    break;
            }

        }
//-------------------------------------

        var back_btn = ccui.helper.seekWidgetByName(root, "back_btn");
        back_btn.addClickEventListener(function () {
            this.shopDialog._onCallback();
        }.bind(this));
    },

    putContentIntoLv: function () {
        this.listView.setItemsMargin(10);//设置间距
    }
});