/**
 * @author George
 * @date 2018/3/12 23:13
 * @description 游戏常量
 **/

var Constants = {

    /** 服务器请求url */
    SERVER_CONTEXT: "http://192.168.1.104:8666/theLost",

    /** 游戏状态 */
    GAME_STATE: {
        START: 1,//开始
        MOVING: 2,//跑酷中
        DEATH: 3 //死亡
    },

    CHARACTER: {
        //角色血量
        LIVES: 10,
        STRONG: 600//约10s的无敌时间
    },

    /** 模式类别 */
    MODE_TYPE: {
        TRANSITION: 0,//过渡层
        LAND_MODE: 1,
        LOW_ALTITUDE_MODE: 2,
        LAKE_MODE: 3
    },

    /** 动作标签 */
    CHARACTER_ACTION_TAG: {
        DROP: 1
    },

    /** 游戏界面尺寸 */
    GAME_WIN_SIZE: cc.size(1280, 720), //按照1920:1080配置的

    /** 皮肤类型 */
    SKIN_TYPE: {
        DEVILDOM: 0,//魔界（默认）
        GREEN_BUSHES: 1//绿木丛
    },

    CHARACTER_TYPE: {
        GOBLINS_1: 0
    },

    //道具枚举
    PROPS: {
        COIN: 1,
        DIAMOND: 2,
        REWARD_PROP: 3,
        BLOOD_BOTTLE: 4,
        BLUE_BOTTLE: 5,
        REVIVE: 6,

        FRUIT: 11
    },

    /** 障碍物枚举 */
    OBSTACLE: {
        POISON_ITEM_1: 1,
        POISON_ITEM_2: 2,
        POISON_ITEM_3: 3,
        NETTLE_FISH: 4,
        BRAMBLE: 5,
        SEAHORSE: 6
    }

};