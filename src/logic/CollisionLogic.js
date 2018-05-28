/**
 * @author George
 * @date 2018/3/28 20:42
 * @description 碰撞检测逻辑
 **/

var CollisionLogic = {
    /**
     * 角色与跳板之间的碰撞
     * @character 角色对象
     * @pedalsContainer 当前踏板集合
     * @characterDeltaY 允许碰撞（角色速度方向向下才可以碰撞,也就是角色上一帧的y坐标小于当前帧y坐标）
     * */
    pedalCollision: function (character, pedalsContainer, ctx) {
        // ctx.drawNode.clear();

        var characterRect = character.getBoundingBox();
        // characterRect.y = characterRect.y - (characterRect.height / 2);
        characterRect.height = characterRect.height / 2 * 0.2;
        // CollisionLogic.drawBound(ctx.drawNode, characterRect, cc.color(0, 0, 0));

        for (var i = 0; i < pedalsContainer.length; i++) {//遍历踏板容器
            var onePedal = pedalsContainer[i];

            var onePedalRect = onePedal.getBoundingBox();
            onePedalRect.y = onePedalRect.y + onePedalRect.height / 2 * 0.8;
            onePedalRect.height = onePedalRect.height / 2 * 0.8;
            // CollisionLogic.drawBound(ctx.drawNode, onePedalRect, cc.color(0, 255, 0));

            if (this.rectCollision(characterRect, onePedalRect)) {//发生碰撞
                return true;
            }
        }
        return false;
    },

    /**
     * 踏板碰撞时的处理
     *
     * @param character 角色对象
     * @param pedalsContainer 当前踏板集合
     * @param characterDeltaY 允许碰撞（角色速度方向向下才可以碰撞,也就是角色上一帧的y坐标小于当前帧y坐标）
     * @param dt 两帧之差
     * @param ctx 调用此函数的上下文
     * */
    handlePedalsCollision: function (character, pedalsContainer, characterDeltaY, dt, ctx) {
        // cc.log(characterDeltaY);
        var isCollision = CollisionLogic.pedalCollision(character, pedalsContainer, ctx);
        if (isCollision && characterDeltaY > 0) {//碰撞，并且在动！！
            character.stopAllActions();//停掉所有动作
            character.spriteActions.jumpTimes = 2;//为下次二段跳初始化值
        }
        return isCollision;
    },

    /**
     * 过渡层碰撞时的处理
     *
     * @param character 角色对象
     * @param transitionPedal 过渡精灵
     * @param characterDeltaY 允许碰撞（角色速度方向向下才可以碰撞,也就是角色上一帧的y坐标小于当前帧y坐标）
     * @param dt 两帧之差
     * @param ctx 调用此函数的上下文
     * */
    handleTransitionPedalCollision: function (character, transitionPedal, characterDeltaY, dt, ctx) {
        // ctx.drawNode.clear();
        var characterRect = character.getBoundingBox();
        characterRect.height = characterRect.height / 2 * 0.2;

        var transitionPedalRect = transitionPedal.getBoundingBox();
        transitionPedalRect.y += transitionPedalRect.height / 2 + 30;
        transitionPedalRect.height = transitionPedalRect.height / 2 * 0.25;
        // CollisionLogic.drawBound(ctx.drawNode, transitionPedalRect);
        // CollisionLogic.drawBound(ctx.drawNode, characterRect, cc.color(0, 0, 255));

        var isCollision = this.rectCollision(characterRect, transitionPedalRect);
        if (isCollision && characterDeltaY > 0) {//发生碰撞
            character.stopAllActions();//停掉所有动作
            character.spriteActions.jumpTimes = 2;//为下次二段跳初始化值
        }

        return isCollision;
    },


    /**
     * 低空模式荆棘藤碰撞处理
     * @param character 角色对象
     * @param bramblesContainer 荆棘藤
     * @param dt 两帧之差
     * @param ctx 调用此函数的上下文
     * */
    handleBramblesCollision: function (character, bramblesContainer, dt, ctx) {
        // ctx.drawNode.clear();

        var characterBound = character.getBoundingBox();
        // CollisionLogic.drawBound(ctx.drawNode, characterBound, cc.color(255, 0, 0));

        for (var i = 0; i < bramblesContainer.length; i++) {

            var brambleUp = bramblesContainer[i++];//上荆棘
            var brambleBoundUp = brambleUp.getBoundingBox();
            brambleBoundUp.height -= brambleBoundUp.height * 0.2;
            brambleBoundUp.y += brambleBoundUp.height * 0.2 / 2;
            // CollisionLogic.drawBound(ctx.drawNode, brambleBoundUp, cc.color(0, 0, 255));

            var brambleBoundDown = cc.rect(0, 0, 0, 0);
            if (i < bramblesContainer.length) {
                var brambleDown = bramblesContainer[i];//下荆棘
                brambleBoundDown = brambleDown.getBoundingBox();
                brambleBoundDown.height -= brambleBoundDown.height * 0.2;
                brambleBoundDown.y -= brambleBoundDown.height * 0.2 / 2;
                // CollisionLogic.drawBound(ctx.drawNode, brambleBoundDown, cc.color(0, 0, 255));
            }

            if (Game.character.buffValue.strong === 0) {//非无敌状态下发生
                if (CollisionLogic.polygonCollision(characterBound, brambleBoundUp)
                    || CollisionLogic.polygonCollision(characterBound, brambleBoundDown)) {
                    if (Game.character.collisionValues.bramble === 0) {
                        Game.character.collisionValues.bramble = 60;//满碰撞值
                        character.reduceCharacterLive();//生命值减少
                        cc.log("碰撞荆棘条，扣血！");
                        character.runAction(cc.blink(0.5, 5));
                    }
                }
            }
        }

        if (Game.character.collisionValues.bramble > 0) {
            Game.character.collisionValues.bramble--;//消耗碰撞值
            if (Game.character.collisionValues.bramble === 0) {
                //角色恢复正常
                character.setVisible(true);
            }
        }

    },


    /** 矩形碰撞 */
    rectCollision: function (rect1, rect2) {
        return cc.rectIntersectsRect(rect1, rect2);
    },

    /** 多边形碰撞 */
    polygonCollision: function (bound1, bound2) {
        var bottom = cc.p(bound1.x + bound1.width / 2, bound1.y);
        var right = cc.p(bound1.x + bound1.width, bound1.y + bound1.height / 2);
        var left = cc.p(bound1.x, bound1.y + bound1.height / 2);
        var top = cc.p(bound1.x + bound1.width / 2, bound1.y + bound1.height);

        if (cc.rectContainsPoint(bound2, left)
            || cc.rectContainsPoint(bound2, right)
            || cc.rectContainsPoint(bound2, top)
            || cc.rectContainsPoint(bound2, bottom)) {
            //发生碰撞
            return true;
        }
        return false;
    },


    /**
     * 绘制精灵的轮廓，以便于观察碰撞检测  【碰撞辅助工具】
     * @param drawNode 画笔
     * @param spriteBounding 精灵对象的实际轮廓
     * @param color 颜色
     * */
    drawBound: function (drawNode, spriteBounding, color) {
        if (color === undefined || color === null)
            color = cc.color(255, 0, 0);

        var sx = spriteBounding.x;
        var sy = spriteBounding.y;
        var sw = spriteBounding.width;
        var sh = spriteBounding.height;

        var ltp = cc.p(sx, sy);
        var rbp = cc.p(sx + sw, sy + sh);
        drawNode.drawRect(ltp, rbp, color, 0);
    }
};