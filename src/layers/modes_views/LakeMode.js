/**
 * @author George
 * @date 2018/3/17 17:25
 * @description 水中模式
 **/

var LakeMode = cc.Layer.extend({

    waterTexture: null,
    verticalStoneLeft: null,
    verticalStoneRight: null,
    coreView: null,

    lakeHeight:null,

    createFruitYTemp: null,
    distanceConstant: 80,//水果间距常量
    distanceOfFruit: 0,//水果间的间距
    itemHeight: 50,//水果高度

    distanceOfObstacle: 0,
    distanceOfItem: 0,
    distanceOfObjRange: null,
    distanceOfItemRange: null,


    ctor: function (coreView) {
        this._super();

        this.coreView = coreView;

        this.waterTexture = new cc.Sprite(res.modesRes.lakeMode.water_png);
        this.verticalStoneLeft = new cc.Sprite(res.modesRes.lakeMode.stoneVertical_png);
        this.verticalStoneRight = new cc.Sprite(res.modesRes.lakeMode.stoneVertical_png);

        //初始化位置
        this.verticalStoneRight.attr({
            anchorY: 0,
            x: -this.verticalStoneRight.width / 2,
            y: -(GameBackground.BG_SIZE.height / 2 - Constants.GAME_WIN_SIZE.height / 2),
            flippedX: true
        });
        this.waterTexture.attr({
            anchorY: 0,
            x: this.verticalStoneRight.x - this.waterTexture.width / 2 - this.verticalStoneRight.width / 4,
            y: -(GameBackground.BG_SIZE.height / 2 - Constants.GAME_WIN_SIZE.height / 2)
        });
        this.verticalStoneLeft.attr({
            anchorY: 0,
            x: this.waterTexture.x - this.verticalStoneLeft.width / 4 - this.waterTexture.width / 2,
            y: -(GameBackground.BG_SIZE.height / 2 - Constants.GAME_WIN_SIZE.height / 2)
        });

        this.addChild(this.waterTexture);
        this.addChild(this.verticalStoneRight);
        this.addChild(this.verticalStoneLeft);

        LakeMode.LAKE_HEIGHT = this.waterTexture.height -
            (GameBackground.BG_SIZE.height - Constants.GAME_WIN_SIZE.height);
        this.lakeHeight = this.waterTexture.height -
            (GameBackground.BG_SIZE.height - Constants.GAME_WIN_SIZE.height);

        return true;
    },

    /** 初始化排列三个精灵位置，在最右端 */
    initSpriteAttr: function () {
        //初始化水果生成y坐标为屏幕底部
        this.createFruitYTemp = -(GameBackground.BG_SIZE.height - Constants.GAME_WIN_SIZE.height) / 2;
        this.distanceOfFruit = 0;

        this.distanceOfObjRange = this.randomObstacleDistance();
        this.distanceOfItemRange = this.randomObstacleDistance();

        this.verticalStoneLeft.attr({
            anchorY: 0,
            x: Constants.GAME_WIN_SIZE.width + this.verticalStoneLeft.width / 2,
            y: -(GameBackground.BG_SIZE.height / 2 - Constants.GAME_WIN_SIZE.height / 2)
        });

        this.waterTexture.attr({
            anchorY: 0,
            x: this.verticalStoneLeft.x + this.verticalStoneLeft.width / 4 + this.waterTexture.width / 2,
            y: -(GameBackground.BG_SIZE.height / 2 - Constants.GAME_WIN_SIZE.height / 2)
        });

        this.verticalStoneRight.attr({
            anchorY: 0,
            x: this.waterTexture.x + this.waterTexture.width / 2 + this.verticalStoneRight.width / 4,
            y: -(GameBackground.BG_SIZE.height / 2 - Constants.GAME_WIN_SIZE.height / 2)
        });
    },

    /**
     * 移动湖，返回湖最右端是否显示在屏幕上（bool型）
     * @param dt
     * @param speed
     * @return
     * */
    toggleLakeMove: function (dt, speed) {
        if (this.verticalStoneRight.x + this.verticalStoneRight.width / 2 > 0) {//最右端没有淹没在屏幕中
            this.verticalStoneLeft.x -= Math.ceil(speed * dt * 8);
            this.waterTexture.x -= Math.ceil(speed * dt * 8);
            this.verticalStoneRight.x -= Math.ceil(speed * dt * 8);
        }
        if (this.waterTexture.x + this.waterTexture.getBoundingBox().width / 2 >
            Constants.GAME_WIN_SIZE.width) {//水果等障碍物生成代码块
            //w型水果生成
            this.distanceOfFruit += Math.ceil(speed * dt * 8);
            if (this.distanceOfFruit >= this.distanceConstant) {
                this.wShapeCreater();
                this.distanceOfFruit = 0;
            }

            //随机生成障碍物
            this.distanceOfObstacle += Math.ceil(speed * dt * 8);
            if (this.distanceOfObstacle > this.distanceOfObjRange) {
                this.createRandomObstacle();
                this.distanceOfObstacle = 0;
                this.distanceOfObjRange = this.randomObstacleDistance();
            }
            //随机生成道具
            this.distanceOfItem += Math.ceil(speed * dt * 8);
            if (this.distanceOfItem > this.distanceOfItemRange) {
                this.createRandomItem();
                this.distanceOfItem = 0;
                this.distanceOfItemRange = this.randomObstacleDistance();
            }
        }
        return this.verticalStoneRight.x + this.verticalStoneRight.width / 2 < Constants.GAME_WIN_SIZE.width;
    },

    /** 跳入其他场景 */
    jumpToAnother: function (ctx) {
        // ctx.bg.changeSpeed(0);
        var character = ctx.character;

        // var jumpAction = character.spriteActions.jumpAction((Constants.GAME_WIN_SIZE.height - character.y) * 2);
        var jumpAction = cc.jumpBy(
            1
            , cc.p(2 * Constants.GAME_WIN_SIZE.width / 3, Constants.GAME_WIN_SIZE.height / 2 - character.y)
            , (Constants.GAME_WIN_SIZE.height - character.y) * 2
            , 1
        );
        character.runAction(cc.sequence(jumpAction, cc.callFunc(
            function (invokedTarget, currentNode) {
                // pctx.resume();
                // ctx.bg.changeSpeed(GameBackground.SPEED);
            },
            character,
            this
        )));
    },

    /** W 型生成水果器 */
    wShapeCreater: function () {
        if (this.createFruitYTemp - Math.abs(this.itemHeight) > LakeMode.LAKE_HEIGHT) {//生成的y坐标大于湖面高度
            this.itemHeight = -this.itemHeight;
        } else if (this.createFruitYTemp + Math.abs(this.itemHeight) * 2 <
            -(GameBackground.BG_SIZE.height - Constants.GAME_WIN_SIZE.height) / 2) {//生成的y坐标小于湖底高度
            this.itemHeight = -this.itemHeight;
        }

        this.createFruitYTemp = this.createFruitYTemp + this.itemHeight;

        //生成某个水果
        this.coreView.usefulPropManager.createSingleItem(
            Math.ceil(Math.random() * 5 + 6),
            Constants.GAME_WIN_SIZE.width + 50,
            this.createFruitYTemp);

    },

    /** 随机生成障碍物 */
    createRandomObstacle: function () {
        var type = Math.ceil(Math.random() * 3 + 3);
        this.coreView.obstacleManager.createSingleObstacle(
            type,
            Constants.GAME_WIN_SIZE.width + 200,
            Math.ceil(Math.random() * this.lakeHeight - 20));
    },

    /** 随机生成道具 */
    createRandomItem: function () {
        this.coreView.usefulPropManager.createSingleItem(
            Math.ceil(Math.random() * 5),
            Constants.GAME_WIN_SIZE.width + 50,
            Math.ceil(Math.random() * this.lakeHeight - 20));
    },


    /** 随机障碍物生成距离 */
    randomObstacleDistance: function () {
        return Math.ceil(Math.random() * 300 + 400);
    }

});

LakeMode.LAKE_HEIGHT = null;