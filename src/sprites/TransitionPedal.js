/**
 * @author George
 * @date 2018/3/31 13:59
 * @description 过渡层精灵
 **/

var TransitionPedal = cc.Sprite.extend({
    /** 过渡层可移动标记 */
    moveFlag: null,
    coreView: null,

    ctor: function (transitionUrl, coreView) {
        this._super(transitionUrl);
        this.coreView = coreView;
        //调整精灵位置
        this.attr({
            anchorY: 0,
            x: 0,
            y: -(GameBackground.BG_SIZE.height / 2 - Constants.GAME_WIN_SIZE.height / 2)
        });

        this.toggleMove(true);
    },

    /**
     *  开放移动过渡层，返回过渡层最右端是否出现在屏幕中
     *  @param speed
     *  @param dt
     *  @return
     *  */
    moveTransitionPedal: function (speed, dt) {
        if (this.moveFlag)
            this.x -= speed * dt * 8;
        if (this.x <= -this.width / 2) {
            this.toggleStop();//到达最左端，停止移动
            //设置位置到最右端,等待下次滚动
            // this.x = Constants.GAME_WIN_SIZE.width + this.width / 2;
        }
        return this.x + this.width / 2 <= Constants.GAME_WIN_SIZE.width;
    },

    toggleMove: function (firstLoad) {
        if (!firstLoad) {
            this.x = Constants.GAME_WIN_SIZE.width + this.width / 2;//非开始阶段，需调位置

            //生成水果
            this.coreView.usefulPropManager.createFruit(this.x - this.getBoundingBox().width / 2 + Math.floor(Math.random() * 400),
                this.y + this.getBoundingBox().height + Math.floor(Math.random() * 200));//加入水果

            this.coreView.usefulPropManager.createFruit(this.x + Math.floor(Math.random() * 200),
                this.y + this.getBoundingBox().height + Math.floor(Math.random() * 200));//加入水果

            this.coreView.usefulPropManager.createFruit(this.x + this.getBoundingBox().width / 2 - Math.floor(Math.random() * 400),
                this.y + this.getBoundingBox().height + Math.floor(Math.random() * 200));//加入水果

            //过渡层高度的0.8，创建障碍物2
            this.coreView.obstacleManager.createObstacle_2(this.getBoundingBox().height * 0.5);
        }
        this.moveFlag = true;
    },

    toggleStop: function () {
        this.moveFlag = false;
    }

});