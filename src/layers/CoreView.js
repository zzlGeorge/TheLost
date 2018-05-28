/**
 * @author George
 * @date 2018/3/26 20:35
 * @description 游戏核心层（精灵之间的交互）
 **/

var CoreView = cc.Layer.extend({

    /** 游戏ui层 */
    UILayer: null,
    gameSceneUI: null,

    /** 背景层对象 */
    bg: null,

    /** 角色 */
    character: null,

    /** 过渡层 */
    transitionPedal: null,

    /** （普通）陆地模式 */
    landMode: null,
    /** 湖中模式 */
    lakeMode: null,
    /** 低空模式 */
    lowAltitudeMode: null,

    /** 各种障碍物生成的处理层 */
    itemBatchLayer: null,

    usefulPropManager: null,
    obstacleManager: null,

    /** 踏板滚动速率 */
    speed: null,

    /** 踏板之间的距离 */
    distanceOfPedals: 0,

    /** 角色上一帧的y坐标 */
    previousPosY: 0,

    /** 切换模式标记 */
    switchModeFlag: true,
    /** 角色动作切换标记 */
    jumpFlag: true,
    riseAndSinkFlag: false,
    flyJumpFlag: false,

    /** 触摸或鼠标的y坐标 */
    locY: 0,

    /** 触摸或鼠标按下放开状态 */
    touchState: false,

    /** 画笔 ， 辅助工具*/
    drawNode: null,

    changeTime: 1,

    ctor: function (bg, speed) {
        this._super();

        this.bg = bg;
        this.speed = speed;//背景全局速度传来

        //画笔初始化
        this.drawNode = new cc.DrawNode();
        this.addChild(this.drawNode);

        //-------------------道具、障碍物
        this.itemBatchLayer = new cc.SpriteBatchNode(res.modesRes.createrObj_png);
        this.addChild(this.itemBatchLayer);

        this.usefulPropManager = new UsefulPropManager(this);//水果管理初始化
        this.obstacleManager = new ObstacleManager(this);

        //-------------------道具、障碍物


        //-----------------初始化模式
        this.landMode = new LandMode(this);
        this.addChild(this.landMode);

        this.lowAltitudeMode = new LowAltitudeMode(this);
        this.addChild(this.lowAltitudeMode);

        this.lakeMode = new LakeMode(this);//湖中模式
        this.addChild(this.lakeMode);

        this.transitionPedal = new TransitionPedal(res.modesRes.transitionPedal_png, this);
        this.addChild(this.transitionPedal);
        //-----------------初始化模式

        //角色加载
        ccs.armatureDataManager.addArmatureFileInfo(res.characters.character0.chter_Ejson);
        this.character = new Character("character");
        this.character.y = 2 * Constants.GAME_WIN_SIZE.height / 3;
        this.addChild(this.character);

        //加载游戏场景ui
        // this.UILayer = new cc.Layer();
        // this.addChild(this.UILayer);
        this.UILayer = bg.UILayer;//获取背景层ui层
        this.gameSceneUI = new GameSceneUI();
        this.UILayer.addChild(this.gameSceneUI);
        this.gameSceneUI.updateLabels();


        //监听事件绑定
        if ("touches" in cc.sys.capabilities)//触屏
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan: this.listenTouchDown.bind(this),
                onTouchMoved: this.listenTouchMove.bind(this),
                onTouchEnded: this.listenTouchUp.bind(this)
            }, this);
        else
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseMove: this.listenMouseMove.bind(this),
                onMouseUp: this.listenMouseUp.bind(this),
                onMouseDown: this.listenMouseDown.bind(this)
            }, this);

        this.initCoreView();

        return true;
    },

    initCoreView: function () {
        this.previousPosY = this.character.y;

        this.distanceOfPedals = Constants.GAME_WIN_SIZE.width * 0.3;

        Game.gameState = Constants.GAME_STATE.START;//游戏状态为开始状态
        Game.modeState = Constants.MODE_TYPE.LAND_MODE;//陆地模式
        // Game.modeState = Constants.MODE_TYPE.LOW_ALTITUDE_MODE;//低空模式
        // Game.modeState = Constants.MODE_TYPE.LAKE_MODE;//湖面模式

        this.scheduleUpdate();
    },

    /** 监听鼠标按下事件 */
    listenMouseDown: function () {
        if (this.jumpFlag)
            this.character.spriteActions.fJump();//跳
        else if (this.flyJumpFlag)
            this.character.spriteActions.fJumpFly();//连跳

        this.touchState = true;

        return true;
    },

    /** 监听鼠标移动事件 */
    listenMouseMove: function (event) {
        this.locY = event.getLocationY();
    },
    /** 监听鼠标放开事件 */
    listenMouseUp: function (event) {
        this.touchState = false;
    },

    listenTouchDown: function (touch, event) {
        if (this.jumpFlag)
            this.character.spriteActions.fJump();//跳
        else if (this.flyJumpFlag)
            this.character.spriteActions.fJumpFly();//连跳
        this.touchState = true;
        return true;
    },

    listenTouchMove: function (touch, event) {
        var pos = touch.getLocation();
        this.locY = pos.y;
    },
    /** 监听鼠标放开事件 */
    listenTouchUp: function (touch, event) {
        this.touchState = false;
    },

    jumpToAnotherFlagL: true,
    jumpToAnotherFlagR: true,

    update: function (dt) {
        //碰撞检测变量
        var transitionCollision = false;
        var pedalsCollision = false;

        switch (Game.gameState) {
            case Constants.GAME_STATE.START://开始
                if (this.character.moveToCenter(GameBackground.SPEED, dt)) {
                    Game.gameState = Constants.GAME_STATE.MOVING;
                    this.bg.changeSpeed(GameBackground.SPEED);
                }
                this.gameSceneUI.updateLabels();//更新状态数据
                Game.character.distance += this.speed * dt;//距离数据增加
                break;
            case Constants.GAME_STATE.MOVING:
                //跑酷中
                //陆地场景移动
                var pedalLastIsVisible = false;
                //低空场景移动
                var brambleLastIsVisible = false;
                //湖面模式
                var stoneRightIsVisible = false;
                //过渡场景移动
                var transitionRightIsVisible = this.transitionPedal.moveTransitionPedal(this.speed, dt);

                //更新陆地模式踏板
                pedalLastIsVisible = this.landMode.updatePedals(dt, Math.floor(Math.random()
                    * this.distanceOfPedals + this.distanceOfPedals / 2), this.speed);
                //更新低空模式障碍物
                brambleLastIsVisible = this.lowAltitudeMode.updateBrambles(dt, Math.floor(Math.random()
                    * this.distanceOfPedals + this.distanceOfPedals / 2), this.speed);

                //更新水中模式场景
                stoneRightIsVisible = this.lakeMode.toggleLakeMove(dt, this.speed);

                if (transitionRightIsVisible) {//过渡最右端显示

                    switch (Game.modeState) {
                        case Constants.MODE_TYPE.TRANSITION://过渡阶段
                            if (this.changeTime < 3) {
                                this.changeTime++;
                                Game.modeState = this.changeTime;
                            } else
                                Game.modeState = Math.ceil(Math.random() * 3);//切换模式
                            // Game.modeState = 1;//切换模式
                            // Game.modeState = 2;//切换模式
                            break;
                        case Constants.MODE_TYPE.LAND_MODE://陆地模式
                            if (this.switchModeFlag) {
                                this.landMode.initCreateTimes(5);//给陆地模式创建踏板次数
                                this.landMode.pushPedalIntoArray(null);//初始化放入land模式中踏板
                                this.switchModeFlag = false;

                                this.obstacleManager.createObstacle_1();//创建障碍物1
                            }

                            if (this.landMode.pedalCreateTimes <= 0) {//踏板创建次数不够了
                                //切换模式
                                if (pedalLastIsVisible) {//最后一个踏板全部显示了
                                    // Game.modeState = 1;
                                    Game.modeState = Constants.MODE_TYPE.TRANSITION;//过渡
                                    this.transitionPedal.toggleMove();//过渡层启动
                                    this.switchModeFlag = true;
                                }
                            }
                            //两者其中之一都碰撞
                            break;
                        case Constants.MODE_TYPE.LOW_ALTITUDE_MODE://低空模式
                            if (this.switchModeFlag) {
                                this.lowAltitudeMode.initCreateTimes(5);
                                this.lowAltitudeMode.pushObstacleIntoArray(null);
                                this.switchModeFlag = false;
                            }

                            if (this.lowAltitudeMode.brambleCreateTimes <= 0) {
                                //切换模式
                                if (brambleLastIsVisible) {
                                    // Game.modeState = 1;
                                    Game.modeState = Constants.MODE_TYPE.TRANSITION;//过渡
                                    this.transitionPedal.toggleMove();//过渡层启动
                                    this.switchModeFlag = true;
                                }
                            }
                            break;
                        case Constants.MODE_TYPE.LAKE_MODE://湖中模式
                            if (this.switchModeFlag) {
                                this.lakeMode.initSpriteAttr();//初始化湖中模式精灵参数
                                stoneRightIsVisible = false;
                                this.switchModeFlag = false;
                            }
                            //切换模式
                            if (stoneRightIsVisible) {
                                Game.modeState = Constants.MODE_TYPE.TRANSITION;//过渡
                                this.transitionPedal.toggleMove();//过渡层启动
                                this.switchModeFlag = true;
                            }
                            break;
                    }
                }
                //踏板碰撞检测
                pedalsCollision = CollisionLogic.handlePedalsCollision(this.character, this.landMode.pedals_container,
                    Math.floor(this.previousPosY - this.character.y), dt, this);
                //荆棘藤碰撞检测
                CollisionLogic.handleBramblesCollision(this.character, this.lowAltitudeMode.brambles_container, dt, this);
                this.gameSceneUI.updateLabels();//更新状态数据

                Game.character.distance += this.speed * dt;//距离数据增加
                break;
            case Constants.GAME_STATE.DEATH://死亡
                this.obstacleManager.removeAll();
                this.usefulPropManager.removeAll();
                this.bg.unscheduleUpdate();
                this.unscheduleUpdate();
                this.bg.gameScene.unscheduleUpdate();
                //角色死亡动作
                this.character.runAction(cc.sequence(
                    cc.moveTo(1, cc.p(this.character.x, this.character.y + 100)),
                    cc.moveTo(1, cc.p(this.character.x, (Constants.GAME_WIN_SIZE.height - GameBackground.BG_SIZE.height) / 2 - this.character.width)),
                    cc.callFunc(function (tgt, ctNode) {
                        ctNode.initGameOver();
                    }, this.character, this)
                ));

                // this.initGameOver();//游戏结束弹出
                cc.log("游戏结束！");
                break;
        }
        //与过渡层的碰撞检测
        transitionCollision = CollisionLogic.handleTransitionPedalCollision(this.character, this.transitionPedal,
            Math.floor(this.previousPosY - this.character.y), dt, this);

        this.changeCharacterAction();//监听并切换角色动作
        if (this.riseAndSinkFlag) {//允许水下动作
            // if (this.jumpToAnotherFlagL) {
            //     this.character.stopAllActions();
            //     this.character.spriteActions.jumpTimes = 2;
            //     this.lakeMode.jumpToAnother(this);
            //     this.jumpToAnotherFlagL = false;
            // } else if (this.character.x >= this.lakeMode.waterTexture.x
            //     + this.lakeMode.waterTexture.width / 2 - 300 && this.jumpToAnotherFlagR) {//角色到水右边
            //     this.character.stopAllActions();
            //     this.character.spriteActions.jumpTimes = 2;
            //     this.lakeMode.jumpToAnother(this);
            //     this.jumpToAnotherFlagR = false;
            // } else {
            this.character.spriteActions.fRiseAndSink(this.touchState, dt);
            // }
        } else {
            this.jumpToAnotherFlagR = true;
            this.jumpToAnotherFlagL = true;
        }
        this.character.spriteActions.fDrop(transitionCollision || pedalsCollision || this.riseAndSinkFlag, dt);

        if (this.character.isCharacterDead()) {//角色生命值为0
            Game.gameState = Constants.GAME_STATE.DEATH;//切换为死亡模式
        }

        //更新各种道具
        this.usefulPropManager.updateItem(dt, this.speed);
        //更新障碍物
        this.obstacleManager.updateObstacles(dt, this.speed);

        this.uiLayerOffset();//实时调整ui层位置

        if (Game.character.buffValue.strong > 0) {
            Game.character.buffValue.strong--;
            RewardEffect.showWindEffect(this);

        }
        if (Game.character.buffState && Game.character.buffValue.strong <= 0) {
            Game.character.buffState = false;
            this.character.strongBuffOff();//调整buff
            RewardEffect.stopWindEffect(this);//关闭buff特效
        }

        this.previousPosY = this.character.y;
        // Game.character.distance += this.speed * dt * 8;//距离数据增加
        // this.drawCharacterBound();
    },

    /** 切换角色动作标记 */
    changeCharacterAction: function () {
        var transitionLeft = this.transitionPedal.x - this.transitionPedal.width / 2;
        var transitionRight = this.transitionPedal.x + this.transitionPedal.width / 2;
        if (transitionLeft <= this.character.x) {//角色刚好在过渡障碍物左边一个范围
            //切换跳跃动作
            this.changeActionFlag(true, false, false);
            // this.character.spriteActions.jumpTimes = 2;
        }
        if (transitionRight <= this.character.x) {//角色刚好在过渡障碍物右边
            switch (Game.modeState) {
                case Constants.MODE_TYPE.LAND_MODE:
                    this.changeActionFlag(true, false, false);
                    if (this.character.y < -100)
                        Game.gameState = Constants.GAME_STATE.DEATH;
                    // this.character.spriteActions.jumpTimes = 2;
                    break;
                case Constants.MODE_TYPE.LOW_ALTITUDE_MODE:
                    this.changeActionFlag(false, true, false);
                    break;
                case Constants.MODE_TYPE.LAKE_MODE:
                    this.changeActionFlag(false, false, true);
                    break;
            }
        }
    },

    changeActionFlag: function (jump, flyJump, riseAndSink) {
        this.jumpFlag = jump;
        this.flyJumpFlag = flyJump;
        this.riseAndSinkFlag = riseAndSink;
    },

    initGameOver: function () {
        var gameOver = new GameOverUI(this.bg.gameScene.skin_type);

        gameOver.refreshData();
        Sound.playLose();

        this.UILayer.addChild(gameOver.gameOverDialog);
        // gameOver.gameOverDialog.y = this.bg.gameScene.viewOffset/* + (this.character.y - this.bg.gameScene.previousPosY)*/;//弹出框y位置需要修整
        // cc.log(this.bg.gameScene.y);
        gameOver.gameOverDialog.popup();
    },

    /** ui层跟随角色偏移 */
    uiLayerOffset: function () {
        this.UILayer.y += this.character.y - this.previousPosY;

        this.previousPosY = this.character.y;

        if (this.UILayer.y > (GameBackground.BG_SIZE.height - Constants.GAME_WIN_SIZE.height) / 2) {
            this.UILayer.y = (GameBackground.BG_SIZE.height - Constants.GAME_WIN_SIZE.height) / 2;
        } else if (this.UILayer.y < -(GameBackground.BG_SIZE.height - Constants.GAME_WIN_SIZE.height) / 2) {
            this.UILayer.y = -(GameBackground.BG_SIZE.height - Constants.GAME_WIN_SIZE.height) / 2;
        }
    },


    /** 绘制角色轮廓 */
    drawCharacterBound: function () {
        this.drawNode.clear();
        CollisionLogic.drawBound(this.drawNode, this.character.getBoundingBox());
    }
});