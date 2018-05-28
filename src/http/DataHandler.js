/**
 * @author George
 * @date 2018/4/11 20:17
 * @description  请求服务器数据
 **/

var DataHandler = {

    /** 处理玩家数据（服务端） */
    handlePlayerFromServer: function () {
        var playerData = Game.player;
        //fill props
        var props = playerData["gameProps"];
        var prop;
        for (var i = 0; i < props.length; i++) {
            prop = props[i];
            switch (parseInt(prop["id"])) {
                case Constants.PROPS.COIN://1
                    Game.character.fixedAssets.coin = prop["ownQuan"];
                    break;
                case Constants.PROPS.DIAMOND://2
                    Game.character.fixedAssets.diamond = prop["ownQuan"];
                    break;
                case Constants.PROPS.BLOOD_BOTTLE://4
                    Game.character.fixedAssets.bloodBottle = prop["ownQuan"];
                    break;
                case Constants.PROPS.BLUE_BOTTLE://5
                    Game.character.fixedAssets.blueBottle = prop["ownQuan"];
                    break;
                case Constants.PROPS.REWARD_PROP://3，奖励关道具
                    Game.character.fixedAssets.rewardProp = prop["ownQuan"];
                    break;
                case Constants.PROPS.REVIVE://6
                    Game.character.fixedAssets.revive = prop["ownQuan"];
                    break;
            }
        }
        //fill character
        Game.character.fixedAssets.characters = playerData["gameCharacters"];
        //fill viewSkins
        Game.character.fixedAssets.viewSkin = playerData["viewSkins"];
        //fill achievements
        Game.character.fixedAssets.reward = playerData["achievements"];
    },
    /** 处理玩家数据（本地端） */
    handlePlayerFromLocal: function () {
        //TODO 本地数据读入
    },

    /** 保存游戏结束的日志，并进行处理 */
    handleEndGameData: function () {
        if (Game.sysState === 1) {//必须有网络状态才可
            Http.sendHttpPost(
                ServerApi.GAME_LOG.SAVE_ENDGAME_LOG,//url
                {
                    playerId: Game.player.id,
                    // playerId: 3,
                    getFruitsQuan: Game.character.score,
                    getCoinsQuan: Game.character.assets.coin,
                    getDiamondsQuan: Game.character.assets.diamond,
                    getBloodVialQuan: Game.character.assets.bloodBottle,
                    getRewardsQuan: Game.character.assets.rewardProp,
                    getInvinciblePotionsQuan: Game.character.assets.blueBottle,
                    getRevivesQuan: Game.character.assets.revive,
                    totalScore: Game.character.score
                },
                function (sc, rc, response) {//回调
                    var respTxt;
                    if (sc === -1)//网络错误情况
                        cc.log("网络错误...");
                    else {//请求成功情况
                        cc.log(response);
                    }
                    // AlertUi.alert(respTxt, self.loginDialog, callBack);
                });
        }

        DataHandler.transferLogDataToFixedAssets();//转换资产到固定资产中
        DataHandler.saveOrUpdatePlayerProps();//存储到数据库
    },

    /** 将临时游戏数据转化到固定资产中 */
    transferLogDataToFixedAssets: function () {
        var assets = Game.character.assets;//游戏临时资产
        for (var o in assets) {
            Game.character.fixedAssets[o] += assets[o];//更新游戏固定资产
            Game.character.assets[o] = 0;//初始化游戏过程资产
        }
    },

    /** 及时存储更新用户数据 */
    saveOrUpdatePlayerProps: function () {
        if (Game.sysState === 1) {//必须有网络状态才可
            var fixedAssets = Game.character.fixedAssets;
            var data = [];

            for (var o in fixedAssets) {
                if (!(fixedAssets[o] instanceof Array) && fixedAssets[o] !== 0) {
                    data.push({
                        playerId: Game.player.id,
                        propId: Game.getPropsId(o),
                        ownQuan: fixedAssets[o]
                    });
                }
            }

            Http.sendHttpPost(
                ServerApi.PLAYER_PROP.SAVE_OR_UPDATE,//url
                {
                    playerProps: JSON.stringify(data)
                },
                function (sc, rc, response) {//回调
                    var respTxt;
                    if (sc === -1)//网络错误情况
                        cc.log("网络错误...");
                    else {//请求成功情况
                        cc.log(response);
                    }
                    // AlertUi.alert(respTxt, self.loginDialog, callBack);
                });
        }
    },

    //得分排行
    getScoreRank: function () {
        if (Game.sysState === 1) {//必须有网络状态才可
            Http.sendHttpPost(
                ServerApi.GAME_LOG.SCORE_RANK,//url
                {},
                function (sc, rc, response) {//回调
                    if (sc === -1)//网络错误情况
                        cc.log("网络错误...");
                    else {//请求成功情况
                        cc.log(response);
                        return response.dataList;

                    }
                });
        }
        return null;
    },

    //道具拥有量排行
    getPropRank: function (propId) {
        if (Game.sysState === 1) {//必须有网络状态才可
            Http.sendHttpPost(
                ServerApi.PLAYER_PROP.PROP_RANK,//url
                {propId: propId},
                function (sc, rc, response) {//回调
                    if (sc === -1)//网络错误情况
                        cc.log("网络错误...");
                    else {//请求成功情况
                    }
                });
        }
    }

};