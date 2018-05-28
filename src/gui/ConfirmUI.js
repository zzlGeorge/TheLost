/**
 * @author George
 * @date 2018/4/11 11:31
 * @description 确认提示框
 **/

var ConfirmUI = cc.Layer.extend({

    dialog: null,

    ctor: function (txt, callBack, cancelBack, stopAll) {
        this._super();

        this.dialog = new ModalDialogueBox(this);
        this.initContent(txt, callBack, cancelBack, stopAll);
    },

    initContent: function (txt, callBack, cancelBack, stopAll) {
        var root = ccs.uiReader.widgetFromJsonFile(res.scenesRes.mainMenu_scn.confirmUi_json);
        this.addChild(root);

        var tipTxt = ccui.helper.seekWidgetByName(root, "TextField_8");
        tipTxt.setString(txt.toString());

        var confirm_btn = ccui.helper.seekWidgetByName(root, "confirm_btn");
        confirm_btn.addClickEventListener(function () {
            callBack();
        });

        var cancel_btn = ccui.helper.seekWidgetByName(root, "cancel_btn");
        cancel_btn.setTitleText("退出");
        cancel_btn.addClickEventListener(function () {
            cc.log("cancel...");
            if (cancelBack !== undefined && cancelBack !== null)
                cancelBack();
            this.dialog._onCallback();
        }.bind(this));

        this.dialog.popup(null, stopAll);
    }

});

ConfirmUI.create = function (txt, callBack, cancelBack, stopAll) {
    return new ConfirmUI(txt, callBack, cancelBack, stopAll);
};