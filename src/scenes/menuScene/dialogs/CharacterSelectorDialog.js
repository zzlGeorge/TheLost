/**
 * @author George
 * @date 2018/4/7 0:05
 * @description 角色选择
 **/

var CharacterSelectorDialog = cc.Layer.extend({
    characterSelectorDialog: null,
    listView: null,

    ctor: function () {
        this._super();

        this.characterSelectorDialog = new ModalDialogueBox(this);

        this.initMyContent();
        this.setContentLv();
    },

    initMyContent: function () {
        var root = ccs.uiReader.widgetFromJsonFile(res.scenesRes.mainMenu_scn.charactersSelector_json);
        this.addChild(root);

        this.listView = ccui.helper.seekWidgetByName(root, "char_lv");

        var back_btn = ccui.helper.seekWidgetByName(root, "back_btn");
        back_btn.addClickEventListener(function () {
            this.characterSelectorDialog._onCallback();
        }.bind(this));
    },

    setContentLv: function () {

        this.listView.setItemsMargin(10);//设置间距
    }
});