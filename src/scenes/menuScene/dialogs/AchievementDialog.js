/**
 * @author George
 * @date 2018/4/7 0:02
 * @description 成就
 **/
var AchievementDialog = cc.Layer.extend({

    achievementDialog: null,
    listView: null,

    ctor: function () {
        this._super();
        this.achievementDialog = new ModalDialogueBox(this);

        this.initMyContent();

        // this.putContentIntoLv();
    },

    //读cocostudio内资源内容
    initMyContent: function () {
        var root = ccs.uiReader.widgetFromJsonFile(res.scenesRes.mainMenu_scn.achievements_json);
        this.addChild(root);

        this.listView = ccui.helper.seekWidgetByName(root, "ach_lv");
        // this.listView.setDirection(ccui.ScrollView.DIR_VERTICAL);
        // this.listView.setTouchEnabled(true);
        // this.listView.setBounceEnabled(true);
        // this.listView.setBackGroundImage("ccs-res/cocosui/green_edit.png");
        // this.listView.setBackGroundImageScale9Enabled(true);
        // this.listView.addEventListener(this.selectedItemEvent, this);

        // this.listView.refreshView();


        var back_btn = ccui.helper.seekWidgetByName(root, "back_btn");
        back_btn.addClickEventListener(function () {
            this.achievementDialog._onCallback();
        }.bind(this));
    },

    /** 放内容到listview中 */
    putContentIntoLv: function () {

        var default_item = new ccui.Layout();
        default_item.setContentSize(cc.size(this.listView.width, 100));

        var honourTx = new ccui.Text();
        honourTx.setPosition(cc.p(default_item.x, default_item.y));
        honourTx.setScale(3, 3);
        honourTx.setTag(1);
        default_item.addChild(honourTx);

        var conditionTx = new ccui.Text();
        conditionTx.setPosition(cc.p(default_item.x + 100, default_item.y));
        conditionTx.setScale(3, 3);
        conditionTx.setTag(2);
        default_item.addChild(conditionTx);

        var rewardTx = new ccui.Text();
        rewardTx.setPosition(cc.p(default_item.x + 200, default_item.y));
        rewardTx.setScale(3, 3);
        rewardTx.setTag(3);
        default_item.addChild(rewardTx);

        //设置内容模板
        this.listView.setItemModel(default_item);

        for (var i = 0; i < 10; i++) {
            var item = default_item.clone();
            item.setTag(i);
            var tx1 = item.getChildByTag(1);
            tx1.setString("成就" + (i + 1));
            var tx2 = item.getChildByTag(2);
            tx2.setString("条件" + (i + 1));
            var tx3 = item.getChildByTag(3);
            tx3.setString("奖励" + (i + 1));

            this.listView.pushBackCustomItem(item);
        }

        this.listView.setItemsMargin(10);//设置间距

    }
});