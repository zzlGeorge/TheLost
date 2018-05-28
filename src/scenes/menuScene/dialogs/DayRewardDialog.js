/**
 * @author George
 * @date 2018/4/7 0:08
 * @description 每日奖励
 **/

var DayRewardDialog = cc.Layer.extend({

    dayRewardDialog: null,

    ctor: function () {
        this._super();

        this.dayRewardDialog = new ModalDialogueBox(this);

        this.initMyContent();
    },

    initMyContent:function () {
        var root = ccs.uiReader.widgetFromJsonFile(res.scenesRes.mainMenu_scn.dayReward_json);
        this.addChild(root);

        var back_btn = ccui.helper.seekWidgetByName(root, "cancel_btn");
        back_btn.addClickEventListener(function () {
            this.dayRewardDialog._onCallback();
        }.bind(this));
    }
});