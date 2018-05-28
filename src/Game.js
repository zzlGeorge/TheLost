/**
 * @author George
 * @date 2018/3/12 22:48
 * @description 游戏进行时的一些变量管理
 **/

var Game = {

    sysState: 0,//默认0为离线状态

    /** 游戏状态 */
    gameState: null,

    /** 模式状态 */
    modeState: null,

    collisionValue: {//碰撞检测，设置辅助值
        hurtValue: 60
    },

    character: {
        lives: Constants.CHARACTER.LIVES,
        score: 0,
        distance: 0,
        speed: 0,

        //一局游戏的临时资产
        assets: {
            coin: 0,
            diamond: 0,
            rewardProp: 0,
            bloodBottle: 0,
            blueBottle: 0,
            revive: 0
        },
        //固定资产
        fixedAssets: {
            coin: 0,
            diamond: 0,
            rewardProp: 2,
            bloodBottle: 2,
            blueBottle: 2,
            revive: 0,

            viewSkin: [],
            characters: [],
            reward: []
        },
        /** 角色buff值 */
        buffState: false,//buff状态
        buffValue: {
            strong: 0//无敌状态
        },
        collisionValues: {//碰撞属性
            bramble: 0//荆棘藤
        }
    },

    /** 玩家资产数据 */
    player: null,

    getPropsId: function (propKey) {
        var id;
        switch (propKey) {
            case "coin"://1
                id = Constants.PROPS.COIN;
                break;
            case "diamond"://2
                id = Constants.PROPS.DIAMOND;
                break;
            case "bloodBottle"://3
                id = Constants.PROPS.BLOOD_BOTTLE;
                break;
            case "blueBottle"://4
                id = Constants.PROPS.BLUE_BOTTLE;
                break;
            case "rewardProp"://5，
                id = Constants.PROPS.REWARD_PROP;
                // Game.character.assets.rewardProp++;
                break;
            case "revive"://6
                id = Constants.PROPS.REVIVE;
                break;
        }
        return id;
    }
};