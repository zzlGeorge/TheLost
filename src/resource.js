var res = {

    /** 场景资源 */
    view_scenes: {
        devildom: {//魔界
            third_view_plist: "res/images/scene_skins/devildom/third_view/stones.plist",
            third_view_png: "res/images/scene_skins/devildom/third_view/stones.png",

            first_view_png: "res/images/scene_skins/devildom/first_view.png",
            forth_view_png: "res/images/scene_skins/devildom/forth_view.png",
            staticBg_png: "res/images/scene_skins/devildom/staticBg.png"
        },

        greenBushes: {//绿木丛
            third_view_plist: "res/images/scene_skins/greenBushes/third_view/third_view.plist",
            third_view_png: "res/images/scene_skins/greenBushes/third_view/third_view.png",

            first_view_png: "res/images/scene_skins/greenBushes/first_view.png",
            forth_view_png: "res/images/scene_skins/greenBushes/forth_view.png",
            staticBg_png: "res/images/scene_skins/greenBushes/staticBg.png"
        }
    },

    /** 角色资源 */
    characters: {
        character0: {
            chter_Ejson: "res/images/characters/character0/character.ExportJson",
            chter0_plist: "res/images/characters/character0/character0.plist",
            chter0_png: "res/images/characters/character0/character0.png"
        }
    },

    /** 模式中的资源 */
    modesRes: {
        /** 过渡物资源 */
        transitionPedal_png: "res/images/modes/transitionPedal.png",

        /** 陆地模式踏板资源 */
        landMode: {
            pedals_plist: "res/images/modes/landMode/pedals/pedals.plist",
            pedals_png: "res/images/modes/landMode/pedals/pedals.png"
        },

        /** 低空模式资源 */
        lowAltitudeMode: {
            brambles_plist: "res/images/modes/lowAltitudeMode/obstacles.plist",
            brambles_png: "res/images/modes/lowAltitudeMode/obstacles.png"
        },

        /** 湖中模式资源 */
        lakeMode: {
            stoneVertical_png: "res/images/modes/lakeMode/stoneVertical.png",
            water_png: "res/images/modes/lakeMode/water.png",
            lakeMode_list: "res/images/modes/lakeMode/lakeMode.plist",
            lakeMode_png: "res/images/modes/lakeMode/lakeMode.png"
        },

        /** 奖励关场景 */
        rewardScene: {
            bgLayer_png: "res/images/modes/rewardScene/bgLayer.png",
            bgLayer2_png: "res/images/modes/rewardScene/bgLayer2.png",
            texture_plist: "res/images/modes/rewardScene/texture.plist",
            texture_png: "res/images/modes/rewardScene/texture.png",

            coffee_plist: "res/particles/game/coffee.plist",
            eat_plist: "res/particles/game/eat.plist",
            mushroom_plist: "res/particles/game/mushroom.plist",
            wind_plist: "res/particles/game/wind.plist"
        },

        createrObj_plist: "res/images/modes/createrObj.plist",
        createrObj_png: "res/images/modes/createrObj.png"
    },

    /** 各gui场景资源 */
    scenesRes: {
        begin_png: "res/images/gui/begin.png",
        lgrg_scn: {//登陆注册场景
            bg: "res/images/gui/lgrg_scn/bg.png",
            mainMenuBg: "res/images/gui/lgrg_scn/mainMenuBg.png",

            lgrg_ui_json: "res/images/gui/lgrg_scn/lgrg_ui.ExportJson",
            register_ui_json: "res/images/gui/lgrg_scn/register_ui.ExportJson",
            login_ui_json: "res/images/gui/lgrg_scn/login_ui.ExportJson",
            about_ui_json: "res/images/gui/lgrg_scn/about_ui.ExportJson",
            theLostGUI0_plist: "res/images/gui/lgrg_scn/theLostGUI0.plist",
            theLostGUI0_png: "res/images/gui/lgrg_scn/theLostGUI0.png",
            theLostGUI1_plist: "res/images/gui/lgrg_scn/theLostGUI1.plist",
            theLostGUI1_png: "res/images/gui/lgrg_scn/theLostGUI1.png"
        },

        mainMenu_scn: {//主菜单场景
            MainMenu0_plist: "res/images/gui/mainMenu/MainMenu0.plist",
            MainMenu0_png: "res/images/gui/mainMenu/MainMenu0.png",
            MainMenu1_plist: "res/images/gui/mainMenu/MainMenu1.plist",
            MainMenu1_png: "res/images/gui/mainMenu/MainMenu1.png",
            MainMenu2_plist: "res/images/gui/mainMenu/MainMenu2.plist",
            MainMenu2_png: "res/images/gui/mainMenu/MainMenu2.png",

            MainMenu_1_json: "res/images/gui/mainMenu/MainMenu_1.ExportJson",

            sceneSkinSelector_json: "res/images/gui/mainMenu/sceneSkinSelector.ExportJson",
            achievements_json: "res/images/gui/mainMenu/achievements.ExportJson",
            charactersSelector_json: "res/images/gui/mainMenu/charactersSelector.ExportJson",
            dayReward_json: "res/images/gui/mainMenu/dayReward.ExportJson",
            mission_json: "res/images/gui/mainMenu/mission.ExportJson",
            myProps_json: "res/images/gui/mainMenu/myProps.ExportJson",
            rank_json: "res/images/gui/mainMenu/rank.ExportJson",
            setting_json: "res/images/gui/mainMenu/setting.ExportJson",
            shop_json: "res/images/gui/mainMenu/shop.ExportJson",
            gameScene_json: "res/images/gui/mainMenu/gameScene.ExportJson",
            gameOver_json: "res/images/gui/mainMenu/gameOver.ExportJson",
            confirmUi_json: "res/images/gui/mainMenu/confirmUi.ExportJson",

            bgskin: {
                devildom_png: "res/images/gui/mainMenu/bgskin/devildom.png",
                greenbushes_png: "res/images/gui/mainMenu/bgskin/greenbushes.png"
            }
        }

        // test: {
        //     testUI_json: "res/images/gui/test/testUI.ExportJson",
        //     theLostGUI0_plist: "res/images/gui/test/theLostGUI0.plist",
        //     theLostGUI0_png: "res/images/gui/test/theLostGUI0.png"
        // }
    }
};

var g_resources = [];

var guiScene = [];
var gameScene = [];// 游戏场景


pushResources(res.scenesRes, guiScene);
pushResources({
    view_scenes: res.view_scenes,
    characters: res.characters,
    modesRes: res.modesRes
}, gameScene);

pushResources(res, g_resources);//全局资源


// function pushResources(resource) {
//     for (var i in resource) {
//         if (resource[i] instanceof Object) {
//             pushResources(resource[i]);
//         } else {
//             g_resources.push(resource[i]);
//         }
//     }
// }
// pushResources(res);

/**
 * 加载资源
 * */
function pushResources(resource, target) {
    for (var i in resource) {
        if (resource[i] instanceof Object) {
            pushResources(resource[i], target);
        } else {
            target.push(resource[i]);
        }
    }
}