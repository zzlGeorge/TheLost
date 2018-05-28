/**
 * @author George
 * @date 2018/4/11 16:52
 * @description 提示框
 **/

var AlertUi = cc.Layer.extend({

    dialog: null,

    ctor: function (txt, callBack) {
        this._super();

        this.ignoreAnchorPointForPosition(false);
        this.setScale(0.9);
        this.setPosition(Constants.GAME_WIN_SIZE.width / 2, Constants.GAME_WIN_SIZE.height / 2);

        this.dialog = new ModalDialogueBox(this);
        this.initContent(txt, callBack);
    },

    initContent: function (txt, callBack) {
        var root = ccs.uiReader.widgetFromJsonFile(res.scenesRes.mainMenu_scn.confirmUi_json);
        this.addChild(root);

        var tipTxt = ccui.helper.seekWidgetByName(root, "TextField_8");
        tipTxt.setString(txt.toString());

        var confirm_btn = ccui.helper.seekWidgetByName(root, "confirm_btn");
        confirm_btn.setVisible(false);

        var cancel_btn = ccui.helper.seekWidgetByName(root, "cancel_btn");
        cancel_btn.setTitleText("确定");
        cancel_btn.addClickEventListener(function () {
            cc.log("out...");
            this.dialog._onCallback();
            if (callBack)
                callBack();
        }.bind(this));

        this.dialog.popup();
    }

});

/**
 * @param txt 提示内容
 * @param pNode 需要加在的目标层
 * @param callBack 回调函数
 * */
AlertUi.alert = function (txt, pNode, callBack) {
    var alert = new AlertUi(txt, callBack);
    pNode.addChild(alert.dialog);
};