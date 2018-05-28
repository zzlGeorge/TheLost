/**
 * @author George
 * @date 2018/4/7 0:11
 * @description 我的道具
 **/

var MyPropsDialog = cc.Layer.extend({

    myPropsDialog: null,

    listView: null,

    ctor: function () {
        this._super();

        this.myPropsDialog = new ModalDialogueBox(this);

        this.initMyContent();
        this.putContentIntoLv();
    },

    initMyContent: function () {
        var root = ccs.uiReader.widgetFromJsonFile(res.scenesRes.mainMenu_scn.myProps_json);
        this.addChild(root);

        this.listView = ccui.helper.seekWidgetByName(root, "myProps_lv");

        var cancel_btn = ccui.helper.seekWidgetByName(root, "cancel_btn");
        cancel_btn.addClickEventListener(function () {
            this.myPropsDialog._onCallback();
        }.bind(this));
    },

    putContentIntoLv: function () {

        var playerAssets = Game.character.fixedAssets;

        var itemInstanc;
        var img,quanlb;
        itemInstanc = this.listView.getItem(0);
        img = itemInstanc.getChildByName("locked_img");
        quanlb = img.getChildByName("propQuan_lb");
        quanlb.setString(playerAssets.coin.toString());

        itemInstanc = this.listView.getItem(1);
        img = itemInstanc.getChildByName("locked_img");
        quanlb = img.getChildByName("propQuan_lb");
        quanlb.setString(playerAssets.diamond.toString());

        itemInstanc = this.listView.getItem(2);
        img = itemInstanc.getChildByName("locked_img");
        quanlb = img.getChildByName("propQuan_lb");
        quanlb.setString(playerAssets.rewardProp.toString());

        itemInstanc = this.listView.getItem(3);
        img = itemInstanc.getChildByName("locked_img");
        quanlb = img.getChildByName("propQuan_lb");
        quanlb.setString(playerAssets.bloodBottle.toString());

        itemInstanc = this.listView.getItem(4);
        img = itemInstanc.getChildByName("locked_img");
        quanlb = img.getChildByName("propQuan_lb");
        quanlb.setString(playerAssets.blueBottle.toString());

        itemInstanc = this.listView.getItem(5);
        img = itemInstanc.getChildByName("locked_img");
        quanlb = img.getChildByName("propQuan_lb");
        quanlb.setString(playerAssets.revive.toString());


        this.listView.setItemsMargin(10);//设置间距
    }
});