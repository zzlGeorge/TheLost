/**
 * @author George
 * @date 2018/4/7 0:09
 * @description 任务
 **/

var MissionDialog = cc.Layer.extend({

    missionDialog: null,

    ctor: function () {
        this._super();

        this.missionDialog = new ModalDialogueBox(this);

        this.initMyContent();
    },

    initMyContent: function () {
        var root = ccs.uiReader.widgetFromJsonFile(res.scenesRes.mainMenu_scn.mission_json);
        this.addChild(root);

        var cancel_btn = ccui.helper.seekWidgetByName(root, "cancel_btn");
        cancel_btn.addClickEventListener(function () {
            this.missionDialog._onCallback();
        }.bind(this));
    }
});