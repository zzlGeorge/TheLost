/**
 * @author George
 * @date 2018/3/26 19:38
 * @description 精灵动作组
 **/

var SpriteActions = cc.Class.extend({
    spriteObj: null,

    _jumpAction: null,

    _flyJumpAction: null,

    /** 陆上下落加速度 */
    LAND_FALL_ACCELERATION: 4000,

    /** 跳跃次数 */
    jumpTimes: 2,
    /** 跳跃高度 */
    jumpHeight: 200,

    /** 飞跳状态 */
    flyJumpState: false,

    /** 角色速度 */
    roleSpeed: 400,

    roleJumpState: false,

    // /** 角色掉落加速度 */
    // roleAcceleration: 1,
    // /** 角色掉落速度 */
    // roleDropSpeed: 400,

    ctor: function (spriteObj) {
        this.spriteObj = spriteObj;
        this.actionInit();
    },

    /**
     * 动作初始化
     * */
    actionInit: function () {
        // //上升
        // var dtUp = this.calcDurationTimeWater(Constants.GAME_WIN_SIZE.height - this.spriteObj.y);
        // this._riseAction = cc.moveBy(dtUp*2, cc.p(0,
        //     Constants.GAME_WIN_SIZE.height - this.spriteObj.y)).easing(cc.easeCubicActionIn());
    },

    /**
     * 陆上动作时间计算
     * */
    calcDurationTimeLand: function (height) {
        return Math.sqrt(2 * height / this.LAND_FALL_ACCELERATION);
    },

    /**
     * 跳动作
     * */
    jumpAction: function (jumpHeight) {
        var dtUp = this.calcDurationTimeLand(jumpHeight);
        var dtDown = this.calcDurationTimeLand(this.spriteObj.y + jumpHeight);
        var jumpUp = cc.moveBy(dtUp, cc.p(0, jumpHeight), null).easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(dtDown, cc.p(0, -this.spriteObj.y - jumpHeight), null).easing(cc.easeCubicActionIn());
        return cc.sequence(jumpUp, jumpDown);
    },

    /**
     * 跳跃主接口
     * */
    fJump: function () {
        if (this.jumpTimes > 0) {
            if (this.jumpTimes === 2) {
                this._jumpAction = cc.sequence(this.jumpAction(this.jumpHeight), cc.callFunc(//结束动作的回调
                    function (invokedTarget, currentNode) {
                        currentNode.jumpTimes = 2;
                        // invokedTarget.stopAction(currentNode._jumpAction);
                    },
                    this.spriteObj,
                    this
                ));
            } else if (this.jumpTimes === 1) {//一跳还在空中
                this.spriteObj.stopAction(this._jumpAction);//先停掉当前跳跃状态

                this._jumpAction = cc.sequence(this.jumpAction(this.jumpHeight), cc.callFunc(//结束动作的回调
                    function (invokedTarget, currentNode) {
                        currentNode.jumpTimes = 2;
                        // invokedTarget.stopAction(currentNode._jumpAction);
                    },
                    this.spriteObj,
                    this
                ));
            }

            // this.spriteObj.stopActionByTag(Constants.CHARACTER_ACTION_TAG.DROP);//停下掉落动作
            // this.spriteObj.stopAllActions();//停掉所有动作
            this.spriteObj.runAction(this._jumpAction);

            --this.jumpTimes;
        }
    },

    /**
     * 精灵下落（脱离踏板等平台执行下落动作），注意全没碰撞才执行！！
     *
     * @param isCollision 是否碰撞了
     * @param dt 两帧之差
     * */
    fDrop: function (isCollision, dt) {
        if (!isCollision && this.jumpTimes === 2) {//下落允许
            this.roleSpeed += 20;
            this.spriteObj.y -= this.roleSpeed * dt * 1.5;
        } else {//不允许的时候，初始化初速度
            this.roleSpeed = 400;
        }
    },

    /**
     * 上升下沉主接口
     * */
    fRiseAndSink: function (isClicked, dt) {
        if (isClicked) {
            this.spriteObj.y -= this.roleSpeed * dt * 2;
        } else if (this.spriteObj.y <= LakeMode.LAKE_HEIGHT) {//上升
            this.spriteObj.y += this.roleSpeed * dt;
        }

    },


    /**
     * 跳跃式飞行
     * */
    fJumpFly: function () {
        if (this.flyJumpState) {
            this.roleSpeed = 400;//初始化下落速度
            this.spriteObj.stopAction(this._flyJumpAction);
        }

        var dtUp = this.calcDurationTimeLand(this.jumpHeight * 2.5);
        this._flyJumpAction = cc.sequence(cc.moveBy(dtUp, cc.p(0, this.jumpHeight * 2.5), null)
            .easing(cc.easeCubicActionOut()), cc.callFunc(
            function (invokedTarget, currentNode) {
                currentNode.flyJumpState = false;
                currentNode.roleSpeed = 400;//初始化下落速度
                // invokedTarget.stopAction(currentNode._jumpAction);
            },
            this.spriteObj,
            this
        ));
        this.flyJumpState = true;

        this.spriteObj.runAction(this._flyJumpAction);
    },

    /**
     * 飞行控制
     * */
    fFlyControl: function (posY) {

    }
});