/**
 * @author George
 * @date 2018/4/3 20:59
 * @description 游戏开始界面
 **/

var BeginScene = cc.Scene.extend({

    onEnter: function () {
        this._super();
        // var layer = new cc.Layer();
        var beginLogo = new cc.Sprite(res.scenesRes.begin_png);
        beginLogo.attr({
            x: Constants.GAME_WIN_SIZE.width / 2,
            y: Constants.GAME_WIN_SIZE.height / 2
        });
        this.addChild(beginLogo);

        this.scheduleOnce(function () {
            // MyLoaderScene.preload(guiScene, function () {
            //     //skin
            //     // cc.spriteFrameCache.addSpriteFrames(res.view_scenes.devildom.third_view_plist);
            //     // cc.spriteFrameCache.addSpriteFrames(res.view_scenes.greenBushes.third_view_plist);
            //     //
            //     // //mode
            //     // cc.spriteFrameCache.addSpriteFrames(res.modesRes.landMode.pedals_plist);
            //     // cc.spriteFrameCache.addSpriteFrames(res.modesRes.lowAltitudeMode.brambles_plist);
            //     // cc.spriteFrameCache.addSpriteFrames(res.modesRes.rewardScene.texture_plist);
            //     // cc.director.runScene(new cc.TransitionFade(2, new RewardScene()));
            //
            //     cc.director.runScene(new LoginAndRegisterScene());
            // }, this);

            MyLoaderScene.preload(g_resources, function () {
                cc.spriteFrameCache.addSpriteFrames(res.view_scenes.devildom.third_view_plist);
                cc.spriteFrameCache.addSpriteFrames(res.view_scenes.greenBushes.third_view_plist);

                //mode
                cc.spriteFrameCache.addSpriteFrames(res.modesRes.landMode.pedals_plist);
                cc.spriteFrameCache.addSpriteFrames(res.modesRes.lowAltitudeMode.brambles_plist);
                cc.spriteFrameCache.addSpriteFrames(res.modesRes.createrObj_plist);
                cc.spriteFrameCache.addSpriteFrames(res.scenesRes.mainMenu_scn.MainMenu0_plist);

                cc.spriteFrameCache.addSpriteFrames(res.modesRes.rewardScene.texture_plist);//奖励关图像等资源

                cc.director.runScene(new LoginAndRegisterScene());
            });

        }, 2);

        return true;
    }
});