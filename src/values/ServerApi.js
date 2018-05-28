/**
 * @author George
 * @date 2018/3/24 1:03
 * @description 服务器端的api
 **/

var ServerApi = {

    /** 玩家模块 */
    PLAYER: {
        TEST: Constants.SERVER_CONTEXT + "/hello/test",
        REGISTER: Constants.SERVER_CONTEXT + "/player/save", //用户注册
        LOGIN: Constants.SERVER_CONTEXT + "/player/login",
        /** 获取当前登录玩家的基本游戏数据 */
        GET_CT_PLAYER_DATA: Constants.SERVER_CONTEXT + "/player/getCtPlayer"
    },

    /** 游戏日志模块 */
    GAME_LOG: {
        SAVE_ENDGAME_LOG: Constants.SERVER_CONTEXT + "/gameLog/saveEndGameData",
        SCORE_RANK: Constants.SERVER_CONTEXT + "/gameLog/getScoreRank"
    },

    /** 玩家道具模块 */
    PLAYER_PROP: {
        SAVE_OR_UPDATE: Constants.SERVER_CONTEXT + "/playerProp/saveOrUpdatePlayerProps",
        PROP_RANK: Constants.SERVER_CONTEXT + "/playerProp/getPropRank"
    }

};