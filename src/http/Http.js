/**
 * @author George
 * @date 2018/3/24 16:11
 * @description
 **/

var Http = {
    /*
   * 网络请求之GET
   * url 请求的网络地址
   * callback 回调参数
   * */
    sendHttpGet: function (url, callback) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr["onloadend"] = function () {
            err = !(xhr.readyState === 4 && (xhr.status >= 200 && xhr.status <= 207));
            var response = xhr.responseText;
            callback(err, response);
        };
        xhr.send();
    },

    /*
     * 网络请求之POST
     * url 请求的网络地址
     * params  请求参数
     * callback 回调参数
    ['loadstart', 'abort', 'error', 'load', 'loadend', 'timeout']
    * */
    sendHttpPost: function (url, params, callback) {

        var paramStr = formatParams(params);
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open("POST", url);
        // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr["onloadend"] = function () {

            var sc = -1;
            var json;
            if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status <= 207)) {
                sc = 0;
                json = JSON.parse(xhr.responseText);//成功，解析返回数据
                var rc = parseInt(json["code"]);
            }

            callback(sc, rc, json);
        };
        xhr.send(paramStr);
    }
};

/**
 * 将请求参数的js对象转换为  a=1&b=2&c=1格式
 * */
function formatParams(params) {
    if (typeof(params) === 'undefined' || params === null || typeof(params) !== 'object') {
        return '';
    }
    var paramStr = '';
    for (var k in params) {
        paramStr += ((paramStr.indexOf("=") !== -1) ? "&" : "") + k + "=" + params[k];
    }
    return paramStr;
}

//调用案例
// var params = {
//     userName: "test4",
//     password: "111111",
//     sex: "男",
//     area: "浙江嘉兴",
//     str: "编码啊！！"
// };
//
// Http.sendHttpPost(ServerApi.PLAYER.REGISTER,
//     params, function (sc, rc, response) {
//         cc.log(response);
//     });