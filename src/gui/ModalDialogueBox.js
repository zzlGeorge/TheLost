/**
 * @author George
 * @date 2018/4/5 17:58
 * @description 模糊框
 **/

var ModalDialogueBox = cc.LayerColor.extend({
    _listener: null,
    contentNode: null,//内容层

    //使用替代容器变化
    container: null,

    ctor: function (contentNode) {
        this._super(cc.color.BLACK);

        this.contentNode = contentNode;
        this.setOpacity(128);       //透明度

        this.container = new cc.LayerColor(cc.color(0, 0, 0, 0));
        this.container.addChild(this.contentNode);
        this.addChild(this.container);

        //初始化对话框
        this._initDialog();

        //监听器
        this._listener = new cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: false,
            onTouchBegan: function (touch, event) {
                return true;
            }
        });
        cc.eventManager.addListener(this._listener, this);

        return true;
    },

    //初始化对话框
    _initDialog: function () {
        this.setVisible(false);     //默认设置为不可见
    },

    _onCallback: function (action) {
        this.hidden(action);
    },

    //弹出
    popup: function (action, stopAll) {
        if (action === null || action === undefined) {
            this.container.setScale(0);
            this.setVisible(true);
            var scaleTo = new cc.ScaleTo(0.2, 1, 1);
            this.container.runAction(cc.sequence(scaleTo, cc.callFunc(function () {
                this._listener.setSwallowTouches(true);
                if (stopAll) {
                    cc.director.pause();
                }
            }, this)));
        } else {
            this.setVisible(true);
            this.container.runAction(cc.sequence(action, cc.callFunc(function () {
                this._listener.setSwallowTouches(true);
                if (stopAll) {
                    cc.director.pause();
                }
            }, this)));
        }
    },

    //隐藏
    hidden: function (action) {
        if (action === null || action === undefined) {
            var scaleTo = new cc.ScaleTo(0.2, 0);
            this.container.runAction(cc.sequence(scaleTo, cc.callFunc(function () {
                this.setVisible(false);
                this._listener.setSwallowTouches(false);
            }, this)));
        } else {
            this.container.runAction(cc.sequence(action, cc.callFunc(function () {
                this.setVisible(false);
                this._listener.setSwallowTouches(false);
            }, this)));
        }
    },

    onExit: function () {
        this._super();
        //移除触摸监听
        cc.eventManager.removeListeners(cc.EventListener.TOUCH_ONE_BY_ONE, true);
    }
});