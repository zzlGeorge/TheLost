/**
 * @author George
 * @date 2018/4/8 21:00
 * @description 有益处的道具管理类
 **/

var UsefulPropManager = cc.Class.extend({
    _coreView: null,
    _container: null,
    _itemsToAnimate: null,

    ctor: function (coreView) {
        this._container = coreView.itemBatchLayer;
        this._coreView = coreView;
        this._itemsToAnimate = [];
    },

    removeAll: function () {
        if (this._itemsToAnimate.length > 0) {
            for (var i = this._itemsToAnimate.length - 1; i >= 0; i--) {
                var item = this._itemsToAnimate[i];
                this._itemsToAnimate.splice(i, 1);
                cc.pool.putInPool(item);
                this._container.removeChild(item);
            }
        }
    },

    /** 生成单个item */
    createSingleItem: function (type, startX, startY) {
        var item = ItemObj.create(type);
        item.setScale(0.4);
        item.setPosition(startX, startY);
        this._container.addChild(item);
        this._itemsToAnimate.push(item);
    },

    /** 随机生成水果，并排列 */
    createFruit: function (startX, startY) {//最多生成3*10的水果矩阵
        var quan = Math.floor(Math.random() * 21 + 10);//随机生成的数量
        var item;//最多3*5
        for (var i = 0; i < quan; i++) {
            item = ItemObj.create(Math.floor(Math.random() * 5 + 7));
            item.setScale(0.3);
            item.setPosition(cc.p(startX + i % 10 * item.getBoundingBox().width * 1.5,
                startY + Math.floor(i / 10) * item.getBoundingBox().height * 2));//10个一行
            this._container.addChild(item);
            this._itemsToAnimate.push(item);
        }
    },

    /** 生成比较珍贵的物品 */
    createGoodThing: function (type, startX, startY) {
        var item;
        if (type === Constants.PROPS.COIN) {//金币生成，  2*5的金币矩阵
            for (var i = 0; i < 10; i++) {//默认先10个
                item = ItemObj.create(type);
                item.setScale(0.4);
                item.setPosition(cc.p(startX + i % 5 * item.getBoundingBox().width * 1.5,
                    startY + Math.floor(i / 5) * item.getBoundingBox().height * 2));//5个一行
                this._container.addChild(item);
                this._itemsToAnimate.push(item);
            }
        } else {
            item = ItemObj.create(type);
            item.setScale(0.4);
            item.setPosition(startX, startY);
            this._container.addChild(item);
            this._itemsToAnimate.push(item);
        }
    },

    /** 30*3矩阵生成水过生成器 */
    rectCreater: function () {

    },


    /** 更新item */
    updateItem: function (dt, speed) {
        var item;
        var boundCharacter = this._coreView.character.getBoundingBox();
        for (var i = this._itemsToAnimate.length - 1; i >= 0; i--) {
            item = this._itemsToAnimate[i];

            if (item) {
                item.x -= speed * dt * 8;

                if (item.x < -item.getBoundingBox().width / 2
                    || Game.gameState === Constants.GAME_STATE.DEATH) {//消失
                    this._itemsToAnimate.splice(i, 1);
                    cc.pool.putInPool(item);        //必须先放进池（自己在Item中写了retain操作，再removeChild
                    this._container.removeChild(item);
                } else {
                    //碰撞检测处理
                    var boundItem = item.getBoundingBox();
                    if (CollisionLogic.rectCollision(boundCharacter, boundItem)) {
                        switch (item.type) {
                            case Constants.PROPS.COIN://1
                                Game.character.assets.coin++;//金币增加
                                break;
                            case Constants.PROPS.DIAMOND://2
                                Game.character.assets.diamond++;
                                break;
                            case Constants.PROPS.BLOOD_BOTTLE://3
                                // Game.character.assets.bloodBottle++;
                                if (Game.character.lives < Constants.CHARACTER.LIVES) {//加血
                                    Game.character.lives++;
                                }
                                break;
                            case Constants.PROPS.BLUE_BOTTLE://4
                                // Game.character.assets.blueBottle++;
                                Game.character.buffValue.strong = Constants.CHARACTER.STRONG;//无敌buff
                                Game.character.buffState = true;
                                this._coreView.character.strongBuffOn();
                                break;
                            case Constants.PROPS.REWARD_PROP://5，奖励关道具
                                // Game.character.assets.rewardProp++;
                                this.goToRewardScene();//跳转至奖励关
                                break;
                            case Constants.PROPS.REVIVE://6
                                Game.character.assets.revive++;//复活水
                                break;
                            case Constants.PROPS.REVIVE + 1:
                            case Constants.PROPS.REVIVE + 2:
                            case Constants.PROPS.REVIVE + 3:
                            case Constants.PROPS.REVIVE + 4:
                            case Constants.PROPS.FRUIT://11
                                //吃到水果
                                Game.character.score++;//得分增加
                                break;
                        }

                        RewardEffect.showEatEffect(this._coreView, item.x, item.y);
                        Sound.playEat();
                        //道具全移除
                        this._itemsToAnimate.splice(i, 1);
                        cc.pool.putInPool(item);
                        this._container.removeChild(item);
                    }
                }
            }
        }
    },

    /** 跳转至奖励关 */
    goToRewardScene: function () {
        // cc.director.pushScene(new cc.TransitionSlideInT(2, new RewardScene()));
        this._coreView.bg.pause();
        cc.director.pushScene(new RewardScene());
    }
});