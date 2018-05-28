/**
 * Created by George on 2018/2/2.
 * 游戏的一些特效
 */

var RewardEffect = {
    _shakeAnimation: function (gameScene) {
        //撞击时画面抖动
        // Animate quake effect, shaking the camera a little to the sides and up and down.
        if (RewardSceneProps.user.hitObstacle > 0) {
            gameScene.x = parseInt(Math.random() * RewardSceneProps.user.hitObstacle - RewardSceneProps.user.hitObstacle * 0.5);
            gameScene.y = parseInt(Math.random() * RewardSceneProps.user.hitObstacle - RewardSceneProps.user.hitObstacle * 0.5);
        } else if (gameScene.x !== 0) {
            // If the shake value is 0, reset the stage back to normal. Reset to initial position.
            gameScene.x = 0;
            gameScene.y = 0;
        }
    },

    showWindEffect: function (gameScene) {
        if (gameScene._windEffect)
            return;
        gameScene._windEffect = new cc.ParticleSystem(res.modesRes.rewardScene.wind_plist);
        gameScene._windEffect.x = cc.director.getWinSize().width;
        gameScene._windEffect.y = cc.director.getWinSize().height / 2;
        gameScene._windEffect.setScaleX(100);
        gameScene.addChild(gameScene._windEffect);
    },

    stopWindEffect: function (gameScene) {
        if (gameScene._windEffect) {
            gameScene._windEffect.stopSystem();
            gameScene.removeChild(gameScene._windEffect);
            gameScene._windEffect = null;
        }
    },

    showCoffeeEffect: function (gameScene) {
        if (gameScene._coffeeEffect)
            return;
        gameScene._coffeeEffect = new cc.ParticleSystem(res.modesRes.rewardScene.coffee_plist);
        gameScene.addChild(gameScene._coffeeEffect);
        gameScene._coffeeEffect.x = gameScene._hero.x + gameScene._hero.width / 4;
        gameScene._coffeeEffect.y = gameScene._hero.y;
    },

    stopCoffeeEffect: function (gameScene) {
        if (gameScene._coffeeEffect) {
            gameScene._coffeeEffect.stopSystem();
            gameScene.removeChild(gameScene._coffeeEffect);
            gameScene._coffeeEffect = null;
        }
    },

    showMushroomEffect: function (gameScene) {
        if (gameScene._mushroomEffect)//对象存在
            return;
        gameScene._mushroomEffect = new cc.ParticleSystem(res.modesRes.rewardScene.mushroom_plist);
        gameScene.addChild(gameScene._mushroomEffect);
        gameScene._mushroomEffect.x = gameScene._hero.x + gameScene._hero.width / 4;
        gameScene._mushroomEffect.y = gameScene._hero.y;
    },

    stopMushroomEffect: function (gameScene) {
        if (gameScene._mushroomEffect) {
            gameScene._mushroomEffect.stopSystem();
            gameScene.removeChild(gameScene._mushroomEffect);
            gameScene._mushroomEffect = null;
        }
    },

    showEatEffect: function (gameScene, itemX, itemY) {
        var eat = new cc.ParticleSystem(res.modesRes.rewardScene.eat_plist);
        eat.setAutoRemoveOnFinish(true);
        eat.x = itemX;
        eat.y = itemY;
        gameScene.addChild(eat);
    }
};
