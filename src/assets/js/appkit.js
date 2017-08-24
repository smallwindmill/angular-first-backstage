;var Appkit = function() {

    var obj = new Object();

    // 是否在微信浏览器中
    obj.isWeixin = function() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/micromessenger/i) == "micromessenger") {
            return true;
        }
        return false;
    };

    // 是否在微信APP版的浏览器中
    obj.isWeixinApp = function() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/micromessenger/i) == "micromessenger" &&  ua.match(/mobile/i) == "mobile") {
            return true;
        }
        return false;
    };

    // 是否在微信PC版的浏览器中
    obj.isWeixinPC = function() {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/micromessenger/i) == "micromessenger" &&  ua.match(/windowswechat/i) == "windowswechat") {
            return true;
        }
        return false;
    };

    // 是否在自家APP的Android浏览器中
    obj.isAndroid = function() {
        var ua = navigator.userAgent.toLowerCase();
        if (/android/.test(ua)){
            return true;
        }
        return false;
    };

    // 是否在自家APP的iOS浏览器中
    obj.isIOS = function() {
        var ua = navigator.userAgent.toLowerCase();
        if (/iphone|ipad|ipod/.test(ua))
        {
            return true;
        }
        return false;
    };

    // 是否在自家APP的浏览器中
    obj.isApp = function() {
        if (obj.isAndroid() || obj.isIOS()) {
            return true;
        }
        return false;
    };

    // JS调用App方法
    obj.callApp = function(json) {
        // var json = arguments[1] || null;
        // obj.callIOS(json);
        json.nonce=obj.randomStr(10);
        json.timestamp=''+new Date().getTime();
        json.sign=obj.sign(json);
        console.log(JSON.stringify(json));
        if (obj.isAndroid()) {
            obj.callAndroid(json);
        }
        if (obj.isIOS()) {
            obj.callIOS(json);
        }
    };

    // JS调用自家APP的Android方法
    obj.callAndroid = function(json) {
        window.adwebkit.call(JSON.stringify(json));
    };

    // JS调用自家APP的iOS方法
    obj.callIOS = function(json) {
        window.webkit.messageHandlers.call.postMessage(json);
    };

    obj.sign = function(json){
        var sign = md5(json.method + json.nonce + json.timestamp);
        return sign;
    }

    obj.randomStr = function(length){
          length = length || 32;
          var chars = 'abcdefghijklmnopqrstuvwxyz123456789';
          var maxPos = chars.length;
          var str = '';
          for (i = 0; i < length; i++) {
            str += chars.charAt(Math.floor(Math.random() * maxPos));
          }
          return str;
    }
    return obj;
};
var appkit = new Appkit();
