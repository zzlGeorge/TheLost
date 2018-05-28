/**
 * @author George
 * @date 2018/4/3 22:42
 * @description 自定义加载场景
 **/

var logoData = "data:image/png;base64,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"; //图片的base64数据

var MyLoaderScene = cc.Scene.extend({
    _interval: null,
    _length: 0,
    _count: 0,
    _label: null,
    _winSize: null,
    _className: "MyLoaderScene",
    _processLayer: null,
    _processLayerLength: null,

    init: function () {
        var self = this;

        //logo
        var logoWidth = 160;
        var logoHeight = 200;

        // bg
        var bgLayer = self._bgLayer = new cc.LayerColor(cc.color(32, 32, 32, 255));
        bgLayer.setPosition(cc.visibleRect.bottomLeft);
        self.addChild(bgLayer, 0);

        //image move to CCSceneFile.js
        var fontSize = 24, lblHeight = -logoHeight / 2 + 100;
        if (cc._loaderImage) {
            //loading logo
            cc.loader.loadImg(logoData, {isCrossOrigin: false}, function (err, img) {
                logoWidth = img.width;
                logoHeight = img.height;
                self._initStage(img, cc.visibleRect.center);
            });
            fontSize = 14;
            lblHeight = -logoHeight / 2 - 10;
        }
        //loading percent
        var label = self._label = cc.LabelTTF.create("Loading... 0%", "Arial", fontSize);
        label.setPosition(cc.pAdd(cc.visibleRect.center, cc.p(0, lblHeight)));
        label.setColor(cc.color(180, 180, 180));
        bgLayer.addChild(this._label, 10);

        // 定义进度条层
        this._winSize = cc.director.getWinSize();
        var centerPos = cc.p(this._winSize.width / 2, this._winSize.height / 2);
        self._processLayerLength = 500;
        self._processLayer = new cc.LayerColor(cc.color(255, 100, 100, 128), 1, 30);
        self._processLayer.setPosition(cc.pAdd(centerPos, cc.p(-this._processLayerLength / 2, -logoHeight / 2 - 50)));

        self._bgLayer.addChild(this._processLayer);
        return true;
    },

    _initStage: function (img, centerPos) {
        var self = this;
        var texture2d = self._texture2d = new cc.Texture2D();
        texture2d.initWithElement(img);
        texture2d.handleLoadedTexture();
        var logo = self._logo = cc.Sprite.create(texture2d);
        logo.setScale(cc.contentScaleFactor());
        logo.x = centerPos.x;
        logo.y = centerPos.y;
        self._bgLayer.addChild(logo, 10);
    },

    onEnter: function () {
        var self = this;
        cc.Node.prototype.onEnter.call(self);
        self.schedule(self._startLoading, 0.3);
    },

    onExit: function () {
        cc.Node.prototype.onExit.call(this);
        var tmpStr = "Loading... 0%";
        this._label.setString(tmpStr);
    },

    /**
     * init with resources
     * @param {Array} resources
     * @param {Function|String} cb
     */
    initWithResources: function (resources, cb) {
        if (typeof resources === "string") resources = [resources];
        this.resources = resources || [];
        this.cb = cb;
    },

    _startLoading: function () {
        var self = this;
        self.unschedule(self._startLoading);
        var res = self.resources;
        self._length = res.length;
        self._count = 0;
        cc.loader.load(res, function (result, count) {
            self._count = count;
        }, function () {
            if (self.cb)
                self.cb();
        });
        self.schedule(self._updatePercent);
    },

    _updatePercent: function () {
        var self = this;
        var count = self._count;
        var length = self._length;
        var percent = (count / length * 100) | 0;
        percent = Math.min(percent, 100);
        self._label.setString("Loading... " + percent + "%");

        // 更新进度条的长度
        this._processLayer.changeWidth(this._processLayerLength * percent / 100);

        if (count >= length) self.unschedule(self._updatePercent);
    }
});

MyLoaderScene.preload = function (resources, cb) {
    var _cc = cc;
    if (!_cc.myLoading) {
        _cc.myLoading = new MyLoaderScene();
        _cc.myLoading.init();
    }
    _cc.myLoading.initWithResources(resources, cb);

    cc.director.runScene(_cc.myLoading);
    return _cc.myLoading;
};