/**
 * @author George
 * @date 2018/3/17 17:24
 * @description 陆地模式
 **/

var LandMode = cc.Layer.extend({
    /** 踏板层 */
    pedals: null,
    /** 跳板存放容器 */
    pedals_container: [],

    /** 障碍物创建次数 */
    pedalCreateTimes: null,

    coreView: null,

    /** 画笔 */
    drawNode: null,

    ctor: function (coreView) {
        this._super();
        this.coreView = coreView;

        this.drawNode = new cc.DrawNode();
        this.addChild(this.drawNode);

        this.pedals = new cc.SpriteBatchNode(res.modesRes.landMode.pedals_png);
        this.addChild(this.pedals);

        this.initViews();
        return true;
    },

    /** 初始化踏板 */
    initViews: function () {
        this.initPedals();
    },

    /** 初始化随机生成跳板 */
    initPedals: function () {
        // var onePedal = Pedal.create(1, cc.p(0.5, 0.5));
        // var boundingBox = onePedal.getBoundingBox();//获取实际轮廓
        //
        // onePedal.attr({
        //     // scaleX: 0.5,
        //     // scaleY: 0.5,
        //     x: Constants.GAME_WIN_SIZE.width + boundingBox.width * 2 / 3,
        //     y: this.randomPosY(onePedal)
        // });
        // this.pedals.addChild(onePedal);
        // this.pedals_container.push(onePedal);
    },

    /** 随机y坐标 */
    randomPosY: function (onePedal, maxheight) {
        var pedalHeight = onePedal.height / 2;
        return Math.floor(Math.random() * (maxheight - pedalHeight) + pedalHeight);
    },

    /**
     *  更新踏板,
     *  @param dt
     *  @param distance
     *  @param speed
     *  @return boolean 最后一个view全部显示出来标记
     *  */
    updatePedals: function (dt, distance, speed) {
        var lastOneIsVisible = false; //最后一个踏板全部展示标记

        var length = this.pedals_container.length;
        var tempArray = [];//替代数组
        for (var i = 0; i < length; i++) {
            var onePedal = this.pedals_container[i];
            onePedal.x -= Math.ceil(speed * dt * 8);

            var boundingBox = onePedal.getBoundingBox();//获取实际轮廓

            if (onePedal.x < -boundingBox.width) {//滚动到屏幕左边,移除
                cc.pool.putInPool(onePedal);
                this.pedals.removeChild(onePedal);
                continue;
            }

            tempArray.push(onePedal);
            if (i === length - 1) {//最后的view
                if (onePedal.x < Constants.GAME_WIN_SIZE.width -
                    (distance + boundingBox.width / 2)) {//最右端达到屏幕distance时，添加新view
                    if (this.pedalCreateTimes-- > 0) {//创建次数够，才能创建
                        this.pushPedalIntoArray(tempArray, onePedal);//添加踏板
                    }
                }
                if (onePedal.x + onePedal.width / 2 <= Constants.GAME_WIN_SIZE.width) {
                    lastOneIsVisible = true;//满足最后一个view全部显示出来
                }
            }
        }
        this.pedals_container = tempArray;

        return lastOneIsVisible;
        // this.drawPedalsBound();
    },

    /**
     * 将踏板放入数组里。
     * */
    pushPedalIntoArray: function (tempArray, previousPedal) {
        var newPedal = Pedal.create(Math.ceil(Math.random() * 3), cc.p(0.5, 0.5));
        var boundingBox1 = newPedal.getBoundingBox();//获取实际轮廓

        //设计踏板高度
        var posY = previousPedal !== undefined && previousPedal !== null
            ? this.randomPosY(newPedal,
                previousPedal.y + this.coreView.character.spriteActions.jumpHeight) : 400;

        newPedal.attr({
            x: Constants.GAME_WIN_SIZE.width + boundingBox1.width * 2 / 3,
            y: posY
        });
        this.pedals.addChild(newPedal);
        if (tempArray !== null) {
            tempArray.push(newPedal);

            //生成道具
            var randomDeltaX = Math.floor(Math.random() * 100);
            var randomDeltaY = Math.floor(Math.random() * 200);
            if (Math.random() <= 0.4)//40%几率生成水果
                this.coreView.usefulPropManager.createFruit(newPedal.x - newPedal.getBoundingBox().width / 2 + randomDeltaX,
                    newPedal.y + newPedal.getBoundingBox().height + randomDeltaY);//加入水果

            //创建各种道具
            if (Math.random() <= 0.3) {//30%几率生成金币
                this.coreView.usefulPropManager.createGoodThing(
                    Constants.PROPS.COIN,
                    newPedal.x - newPedal.getBoundingBox().width / 2 + Math.floor(Math.random() * 100),
                    newPedal.y + newPedal.getBoundingBox().height + Math.floor(Math.random() * 200));
            }
            if (Math.random() <= 0.2) //10%几率
                this.coreView.usefulPropManager.createGoodThing(
                    Constants.PROPS.BLOOD_BOTTLE,
                    newPedal.x - newPedal.getBoundingBox().width / 2 + Math.floor(Math.random() * 100),
                    newPedal.y + newPedal.getBoundingBox().height + Math.floor(Math.random() * 200));

            if (Math.random() <= 0.2) //10%几率
                this.coreView.usefulPropManager.createGoodThing(//10%几率生成无敌药水
                    Constants.PROPS.BLUE_BOTTLE,
                    newPedal.x - newPedal.getBoundingBox().width / 2 + Math.floor(Math.random() * 100),
                    newPedal.y + newPedal.getBoundingBox().height + Math.floor(Math.random() * 200));

            if (Math.random() <= 0.2) //10%几率
                this.coreView.usefulPropManager.createGoodThing(//10%几率生成奖励关道具
                    Constants.PROPS.REWARD_PROP,
                    newPedal.x - newPedal.getBoundingBox().width / 2 + Math.floor(Math.random() * 100),
                    newPedal.y + newPedal.getBoundingBox().height + Math.floor(Math.random() * 200));

            if (Math.random() <= 0.1) {//6%几率生成复活水
                this.coreView.usefulPropManager.createGoodThing(
                    Constants.PROPS.REVIVE,
                    newPedal.x - newPedal.getBoundingBox().width / 2 + Math.floor(Math.random() * 100),
                    newPedal.y + newPedal.getBoundingBox().height + Math.floor(Math.random() * 200));
            }

            if (Math.random() <= 0.5) {
                this.coreView.obstacleManager.createSingleObstacle(//生成障碍物3
                    Constants.OBSTACLE.POISON_ITEM_3,
                    newPedal.x - newPedal.getBoundingBox().width / 2 + Math.ceil(Math.random() * newPedal.getBoundingBox().width),
                    newPedal.y + newPedal.getBoundingBox().height / 2);
            }
        }
        else //外部调用的
            this.pedals_container.push(newPedal);
    },

    initCreateTimes: function (times) {//5
        this.pedalCreateTimes = times - 1;
    },

    /**
     * 画轮廓
     * */
    drawPedalsBound: function () {
        this.drawNode.clear();
        for (var o in this.pedals_container) {
            var pedal = this.pedals_container[o];
            CollisionLogic.drawBound(this.drawNode, pedal.getBoundingBox());
        }
    }

});