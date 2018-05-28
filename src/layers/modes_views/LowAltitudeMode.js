/**
 * @author George
 * @date 2018/3/17 17:26
 * @description 低空模式
 **/

var LowAltitudeMode = cc.Layer.extend({
    /** 障碍物层 */
    brambles: null,
    /** 障碍物容器 */
    brambles_container: [],

    /** 障碍物创建次数 */
    brambleCreateTimes: null,

    coreView: null,

    /** 上下障碍物的间距 */
    distanceOf: 0,

    /** 画笔 */
    drawNode: null,

    ctor: function (coreView) {
        this._super();
        this.coreView = coreView;

        this.drawNode = new cc.DrawNode();
        this.addChild(this.drawNode);

        this.brambles = new cc.SpriteBatchNode(res.modesRes.lowAltitudeMode.brambles_png);
        this.addChild(this.brambles);

        this.initParams();
        return true;
    },

    initParams: function () {
        this.distanceOf = Constants.GAME_WIN_SIZE.height * 0.15;
    },


    /**
     *  更新上下障碍物,
     *  @param dt
     *  @param distance
     *  @param speed
     *  @return boolean 最后一个view全部显示出来标记
     *  */
    updateBrambles: function (dt, distance, speed) {
        var lastOneIsVisible = false; //最后一对障碍物全部展示标记

        var length = this.brambles_container.length;
        var tempArray = [];//替代数组
        for (var i = 0; i < length; i++) {
            var oneObstacle = this.brambles_container[i];
            oneObstacle.x -= Math.ceil(speed * dt * 8);

            var boundingBox = oneObstacle.getBoundingBox();//获取实际轮廓

            if (oneObstacle.x < -boundingBox.width) {//滚动到屏幕左边,移除
                cc.pool.putInPool(oneObstacle);
                this.brambles.removeChild(oneObstacle);
                continue;
            }

            tempArray.push(oneObstacle);
            if (i === length - 1) {//最后的view
                if (oneObstacle.x < Constants.GAME_WIN_SIZE.width -
                    (distance + boundingBox.width / 2)) {//最右端达到屏幕distance时，添加新view
                    if (this.brambleCreateTimes-- > 0) {//创建次数够，才能创建
                        this.pushObstacleIntoArray(tempArray);//添加一对
                    }
                }
                if (oneObstacle.x + oneObstacle.width / 2 <= Constants.GAME_WIN_SIZE.width) {
                    lastOneIsVisible = true;//满足最后一个view全部显示出来
                }
            }
        }
        this.brambles_container = tempArray;

        return lastOneIsVisible;
        // this.drawBramblesBound();
    },

    /**
     * 将上下障碍物放入数组里。
     * */
    pushObstacleIntoArray: function (tempArray) {
        //上面的障碍物
        var upBramble = Bramble.create(Math.ceil(Math.random() * 3));
        var boundingBox = upBramble.getBoundingBox();//获取实际轮廓

        var range = this.calcScaleYRange(boundingBox.height);
        var scaleY1 = Math.random() * (range.y - range.x) + range.x;
        upBramble.attr({
            scaleY: scaleY1,
            anchorY: 1,
            x: Constants.GAME_WIN_SIZE.width + boundingBox.width * 2 / 3,
            y: GameBackground.BG_SIZE.height
        });
        this.brambles.addChild(upBramble);

        //下面的障碍物
        var downBramble = Bramble.create(Math.ceil(Math.random() * 3));
        var boundingBox1 = downBramble.getBoundingBox();//获取实际轮廓
        var scaleY2 = range.x + range.y - scaleY1;
        downBramble.attr({
            scaleY: scaleY2,
            anchorY: 0,
            x: Constants.GAME_WIN_SIZE.width + boundingBox1.width * 2 / 3,
            y: -(GameBackground.BG_SIZE.height - Constants.GAME_WIN_SIZE.height) / 2
        });
        this.brambles.addChild(downBramble);

        //障碍物放入滚动队列中
        if (tempArray !== null) {
            tempArray.push(upBramble);
            tempArray.push(downBramble);

            //生成相应的道具
            if (Math.random() <= 0.1)  //10%概率生成道具
                this.coreView.usefulPropManager.createGoodThing(
                    Math.ceil(Math.random() * 6),
                    upBramble.x - upBramble.getBoundingBox().width,
                    Math.random() * Constants.GAME_WIN_SIZE.height);
        } else {//外部调用的
            this.brambles_container.push(upBramble);
            this.brambles_container.push(downBramble);
        }
    },

    /** 计算障碍物长度scaleY取值范围 */
    calcScaleYRange: function (length) {
        var minLength = (GameBackground.BG_SIZE.height - this.distanceOf) * 0.3;
        var maxLength = (GameBackground.BG_SIZE.height - this.distanceOf) * 0.7;
        return cc.p(minLength / length, maxLength / length);
    },

    /** 初始化创建次数 */
    initCreateTimes: function (times) {
        this.brambleCreateTimes = times - 1;
    },

    /**
     * 画轮廓
     * */
    drawBramblesBound: function () {
        this.drawNode.clear();
        for (var o in this.brambles_container) {
            var obstacle = this.brambles_container[o];
            CollisionLogic.drawBound(this.drawNode, obstacle.getBoundingBox());
        }
    }
});