/**
 * @author George
 * @date 2018/4/7 0:09
 * @description 排行榜
 **/

var RankDialog = cc.Layer.extend({

    rankDialog: null,
    listView: null,
    modelItem: null,

    ctor: function () {
        this._super();

        this.rankDialog = new ModalDialogueBox(this);

        this.initMyContent();
        if (Game.sysState === 1)
            this.putScoreContentIntoLv();//默认得分排行
    },

    initMyContent: function () {
        var root = ccs.uiReader.widgetFromJsonFile(res.scenesRes.mainMenu_scn.rank_json);
        this.addChild(root);

        this.listView = ccui.helper.seekWidgetByName(root, "rank_lv");
        var model = this.listView.getItem(0);
        this.modelItem = model.clone();
        this.modelItem.retain();

        var coin_btn = ccui.helper.seekWidgetByName(root, "coin_btn");
        coin_btn.addClickEventListener(function () {
            this.putCoinContentIntoLv(1);
        }.bind(this));

        var score_btn = ccui.helper.seekWidgetByName(root, "score_btn");
        score_btn.addClickEventListener(function () {
            this.putScoreContentIntoLv();
        }.bind(this));

        var diamod_btn = ccui.helper.seekWidgetByName(root, "diamod_btn");
        diamod_btn.addClickEventListener(function () {
            this.putDiamondContentIntoLv(2);
        }.bind(this));

        var back_btn = ccui.helper.seekWidgetByName(root, "back_btn");
        back_btn.addClickEventListener(function () {
            this.rankDialog._onCallback();
        }.bind(this));
    },

    putScoreContentIntoLv: function () {
        this.listView.removeAllItems();
        Http.sendHttpPost(
            ServerApi.GAME_LOG.SCORE_RANK,//url
            {},
            function (sc, rc, response) {//回调
                if (sc === -1)//网络错误情况
                    AlertUi.alert("网络错误...", this.rankDialog);
                else {//请求成功情况
                    var scoreRankData = response.dataList;//取得数据
                    for (var i = 0; i < scoreRankData.length; i++) {
                        var item = this.modelItem.clone();
                        this.setWidgetAttr(item, scoreRankData[i], 1);
                        this.listView.pushBackCustomItem(item);
                        // cc.log(this.modelItem);
                    }
                    this.listView.setItemsMargin(-10)
                }
            }.bind(this));
    },

    putCoinContentIntoLv: function (propId) {
        this.listView.removeAllItems();
        Http.sendHttpPost(
            ServerApi.PLAYER_PROP.PROP_RANK,//url
            {propId: propId},
            function (sc, rc, response) {//回调
                if (sc === -1)//网络错误情况
                    AlertUi.alert("网络错误...", this.rankDialog);
                else {//请求成功情况
                    var coinRankData = response.dataList;//取得数据
                    for (var i = 0; i < coinRankData.length; i++) {
                        var item = this.modelItem.clone();
                        this.setWidgetAttr(item, coinRankData[i], 2);
                        this.listView.pushBackCustomItem(item);
                        // cc.log(this.modelItem);
                    }
                    this.listView.setItemsMargin(-10)
                }
            }.bind(this));
    },

    putDiamondContentIntoLv: function (propId) {
        this.listView.removeAllItems();
        Http.sendHttpPost(
            ServerApi.PLAYER_PROP.PROP_RANK,//url
            {propId: propId},
            function (sc, rc, response) {//回调
                if (sc === -1)//网络错误情况
                    AlertUi.alert("网络错误...", this.rankDialog);
                else {//请求成功情况
                    var diamondRankData = response.dataList;//取得数据
                    for (var i = 0; i < diamondRankData.length; i++) {
                        var item = this.modelItem.clone();
                        this.setWidgetAttr(item, diamondRankData[i], 3);
                        this.listView.pushBackCustomItem(item);
                        // cc.log(this.modelItem);
                    }
                    this.listView.setItemsMargin(-10)
                }
            }.bind(this));
    },

    setWidgetAttr: function (item, data, type) {
        var rankNo_lb = item.getChildByName("rankNo_lb");
        rankNo_lb.setString("No." + data["rankNum"]);

        var playerName_lb = item.getChildByName("playerName_lb");
        playerName_lb.setString(data["userName"]);

        var area_lb = item.getChildByName("area_lb");
        area_lb.setString(data["area"]);

        var texture = item.getChildByName("type_img");
        var quan_lb = item.getChildByName("quan_lb");
        if (type === 1) {//分数排名
            quan_lb.setString("score: " + data["totalScore"]);
            // item.removeChildByName("type_img");
            item.removeChild(texture);
        } else if (type === 2) {//金币
            texture.loadTexture("res/images/gui/mainMenu/bgskin/item_1.png");
            quan_lb.setString(data["propQuan"]);
        } else if (type === 3) {//钻石
            quan_lb.setString(data["propQuan"]);
        }
    }

});