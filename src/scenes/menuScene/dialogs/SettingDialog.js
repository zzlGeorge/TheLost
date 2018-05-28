/**
 * @author George
 * @date 2018/4/7 0:10
 * @description 设置
 **/

var SettingDialog =cc.Layer.extend({

    settingDialog:null,

    ctor: function () {
        this._super();

        this.settingDialog = new ModalDialogueBox(this);

        this.initMyContent();
    },

    initMyContent: function () {
        var root = ccs.uiReader.widgetFromJsonFile(res.scenesRes.mainMenu_scn.setting_json);
        this.addChild(root);

        var cancel_btn = ccui.helper.seekWidgetByName(root, "cancel_btn");

        cancel_btn.addClickEventListener(function () {
            this.settingDialog._onCallback();
        }.bind(this));

        // var about_btn = ccui.helper.seekWidgetByName(root, "about_btn");
        // about_btn.addClickEventListener(function () {
        //     var root = ccs.uiReader.widgetFromJsonFile(res.scenesRes.lgrg_scn.about_ui_json);
        //     this.aboutDialog = new ModalDialogueBox(root);
        //     this.addChild(this.settingDialog.aboutDialog);
        // }.bind(this));
    }
});