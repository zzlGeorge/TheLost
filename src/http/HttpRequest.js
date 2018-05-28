/**
 * @author George
 * @date 2018/3/21 22:48
 * @description
 **/
var HttpRequest = {
    /*
     * 网络请求之GET
     * url 请求的网络地址
     * callback 回调参数
     * */
    GET: function (url, callback) {
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onreadystatechange = function () {
            err = !(xhr.readyState === 4 && (xhr.status >= 200 && xhr.status <= 207));
            var response = xhr.responseText;
            callback(err, response);
        };
        xhr.send();
    },
    /*
     * 网络请求之POST
     * url 请求的网络地址
     * params  请求参数  ("id=1&id=2&id=3")
     * callback 回调参数
     * */
    POST: function (url, params, callback) {
        var nums = arguments.length;
        if (nums === 2) {
            callback = arguments[1];
            params = "";
        }
        var paramsStr = formatParams(params);
        // var paramsStr = params;
        cc.log(paramsStr);

        var xhr = cc.loader.getXMLHttpRequest();
        xhr.open("POST", url);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
        xhr.onreadystatechange = function () {
            err = !(xhr.readyState === 4 && (xhr.status >= 200 && xhr.status <= 207));
            var response = xhr.responseText;
            callback(err, response);
        };
        xhr.send(paramsStr);
    }
};

/**
 * 将对象转为url参数
 * @param url 请求URL
 * @param data 请求参数js对象
 * */
function format_url(url, data) {
    if (typeof(url) === 'undefined' || url === null || url === '') {
        return '';
    }
    if (typeof(data) === 'undefined' || data === null || typeof(data) !== 'object') {
        return '';
    }
    url += (url.indexOf("?") !== -1) ? "" : "?";
    for (var k in data) {
        url += ((url.indexOf("=") !== -1) ? "&" : "") + k + "=" + (data[k]);
    }
    return encodeURI(encodeURI(url));
}