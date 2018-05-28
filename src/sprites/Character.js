/**
 * @author George
 * @date 2018/3/26 19:26
 * @description 游戏角色类
 **/

var Character = ccs.Armature.extend({
    spriteActions: null,
    // hurtFlag: true,//角色受伤标记

    ctor: function (characterUrl) {
        this._super(characterUrl);
        this.spriteActions = new SpriteActions(this);

        this._characterInit();
    },

    /**
     * 角色基本数据初始化
     * */
    _characterInit: function () {
        this.attr({
            // x: Constants.GAME_WIN_SIZE.width / 2,
            y: Constants.GAME_WIN_SIZE.height / 2
            // scaleX: 1.5,
            // scaleY: 1.5
        });
        this.getAnimation().play("run");
        this.getAnimation().setSpeedScale(2);
    },

    /** 角色从最左端移到屏幕中心 */
    moveToCenter: function (speed, dt) {
        this.x += speed * dt * 8;
        if (this.x >= Constants.GAME_WIN_SIZE.width / 2) {
            this.x = Constants.GAME_WIN_SIZE.width / 2;
            return true;
        }
        return false;
    },

    /** 角色受伤 */
    hurt: function () {
        //TODO blink后角色可能会消失 BUG
        if (Game.collisionValue.hurtValue === 60) {
            this.runAction(cc.sequence(cc.tintTo(0.1, 100, 0, 0), cc.tintTo(0.1, 255, 255, 255)));//变红，再还原

            // this.runAction(
            //     cc.sequence(cc.blink(0.4, 4), cc.callFunc(
            //         function (invokedTarget) {
            //             invokedTarget.hurtFlag = true;
            //             invokedTarget.setVisible(true);
            //         },
            //         this
            //     ))
            // );//0.4s闪烁4次
            cc.log("扣血！");

        }
    },

    /** 无敌时的外观变化 */
    strongBuffOn: function () {
        this.runAction(cc.scaleTo(0.3, 1.8, 1.8));
    },

    strongBuffOff: function () {
        this.runAction(cc.scaleTo(0.3, 1, 1));
    },

    /** 减少生命值 */
    reduceCharacterLive: function () {
        Game.character.lives--;
    },

    /** 判断角色是否已死 */
    isCharacterDead: function () {
        return Game.character.lives <= 0;
    },
    /** 死亡动作 */
    deadAction: function () {
        this.runAction(cc.sequence(
            cc.moveTo(1, cc.p(this.x, this.y + 100)),
            cc.moveTo(1, cc.p(this.x, (Constants.GAME_WIN_SIZE.height - GameBackground.BG_SIZE.height) / 2 - this.width)),
            cc.callFunc(function (tgt) {

            }, this)
        ));
    }
});