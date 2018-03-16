/*
 * PPO
 * +++++++++ a utility-belt library for JavaScript +++++++++
 * (c) 2011-2018 halld add
 * https://github.com/jiayi2/ppo
 * version 1.3.13
 */

(function(global, factory) {
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof module !== "undefined" && module.exports) {
        module.exports = factory();
    } else {
        global.ppo = factory();
    }
})(this, function() {
    function ppo() {}
    /************************************************************************
     * Detecting
     *************************************************************************/
    /**
     * detect IOS
     * From https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
     */
    ppo.isIOS = ppo.isIos = function() {
        return /iPad|iPhone|iPod/.test(ppo.ua());
    };

    ppo.isiPhone = function() {
        return /iPhone/.test(ppo.ua());
    };

    ppo.isIPad = function() {
        return /iPad/.test(ppo.ua());
    };

    /**
     * detect Android
     * From https://stackoverflow.com/questions/6031412/detect-android-phone-via-javascript-jquery
     */
    ppo.isAndroid = function() {
        return ppo.ua("l").indexOf("android") > -1;
    };

    /**
     * detect PC / Mobile
     * From https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device-in-jquery
     */
    ppo.isMobile = function() {
        return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
            ppo.ua("l")
        );
    };

    ppo.isPC = function() {
        return !this.isMobile();
    };

    ppo.isWeixin = function() {
        return /MicroMessenger/i.test(ppo.ua("l"));
    };

    ppo.isNewsApp = function(e) {
        return /qqnews/.test(ppo.ua());
    };

    /**
     * detect ie
     * From https://stackoverflow.com/questions/10964966/detect-ie-version-prior-to-v9-in-javascript
     */
    ppo.isIE = function() {
        return ppo.ieVer() > 0;
    };

    /**
     * ie version
     * From https://codepen.io/gapcode/pen/vEJNZN
     * IE 10 ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
     * IE 11 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
     * Edge 12 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
     * Edge 13 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
     */
    ppo.ieVersion = ppo.ieVer = function() {
        var ua = ppo.ua();
        var msie = ua.indexOf("MSIE ");
        if (msie > 0) {
            return parseInt(ua.substring(msie + 5, ua.indexOf(".", msie)), 10);
        }

        var trident = ua.indexOf("Trident/");
        if (trident > 0) {
            var rv = ua.indexOf("rv:");
            return parseInt(ua.substring(rv + 3, ua.indexOf(".", rv)), 10);
        }

        var edge = ua.indexOf("Edge/");
        if (edge > 0) {
            return parseInt(ua.substring(edge + 5, ua.indexOf(".", edge)), 10);
        }

        return "";
    };

    /**
     * navigator.userAgent
     */
    ppo.ua = function(lower) {
        return lower ?
            window.navigator.userAgent.toLowerCase() :
            window.navigator.userAgent;
    };

    /************************************************************************
     * LOGS
     *************************************************************************/
    /**
     * log on mobile html body
     */
    ppo.log = function(msg, styles) {
        var ele = document.getElementById("_ppo_log");
        if (ele === null) {
            ele = document.createElement("div");
            ele.setAttribute("id", "_ppo_log");
            ele.setAttribute(
                "style",
                "position:fixed;left:0;top:0;z-index:9999;padding:4px;"
            );
            document.body.appendChild(ele);
        }

        if (styles) {
            for (var style in styles) {
                ele.style[style] = styles[style];
            }
        }
        ele.innerHTML = msg;
    };

    /**
     * ppo.logs('onlyid&10', 1, 2);
     */
    ppo.logs = function() {
        if (window.console && window.console.log) {
            var onlyid = arguments[0] + "";
            var times = parseInt(onlyid.split("&")[1]) || 10;
            var logsCache = ppo._cache.logs;

            if (!logsCache[onlyid]) logsCache[onlyid] = {};
            if (!logsCache[onlyid].once) logsCache[onlyid].once = 1;

            if (logsCache[onlyid].once <= times) {
                console.log.apply(console, ppo.args(arguments, 1));
                logsCache[onlyid].once++;
            }
        }
    };

    ppo.removeConsole = function(clear) {
        try {
            if (!window.console) window.console = {};
            window.console.log = window.console.info = window.console.dir = window.console.warn = window.console.trace =
                ppo.noop;
            if (clear === "clear" && window.console.clear) window.console.clear();
        } catch (e) {}
    };

    /************************************************************************
     * Bom and Dom
     *************************************************************************/
    /**
     * open new url dont not blocked by browser
     */
    ppo.open = function(href) {
        var id = "_ppo_open_proxy";
        var a = document.getElementById(id) || document.createElement("a");
        a.setAttribute("id", id);
        a.setAttribute("href", href);
        a.setAttribute("target", "_blank");
        a.style.display = "none";

        if (!a.parentNode) document.body.appendChild(a);
        this.trigger(a, "click", "MouseEvents");
    };

    ppo.stopPropagation = function(e) {
        var e = e || window.event;
        if (e.stopPropagation) {
            e.stopPropagation(); //W3C
        } else {
            e.cancelBubble = true; //IE
        }
    };

    //极简路由
    ppo.Router = function() {
        this.hash = window.location.hash.substring(1);
    };

    ppo.Router.prototype = {
        // 设置路由
        add: function(_hash, callback) {
            var _this = this;
            _checkRouter(_this.hash);
            _this.bindHashChange(function(__hash) {
                _checkRouter(__hash);
            });

            function _checkRouter(__hash) {
                if (_hash == __hash) {
                    if (typeof callback == 'function') {
                        callback();
                    }
                }
            }
        },
        // hashChange事件监听
        bindHashChange: function(callback) {
            var _this = this;
            if ('onhashchange' in window) {
                _this.addEvent(window, 'hashchange', function() {
                    _this.hash = window.location.hash.substring(1);
                    if (typeof callback == 'function') {
                        callback(_this.hash);
                    }
                });
            } else {
                setInterval(function() {
                    var ischanged = _this.hash != window.location.hash.substring(1);
                    if (ischanged) {
                        _this.hash = window.location.hash.substring(1);
                        if (typeof callback == 'function') {
                            callback(_this.hash);
                        }
                    }
                }, 150);
            }
        },
        // 事件绑定函数兼容
        addEvent: function(el, eventType, callback) {
            if (el.addEventListener) {
                return el.addEventListener(eventType, callback, false);
            } else if (el.attachEvent) {
                return el.attachEvent(eventType, callback);
            } else {
                return el['on' + eventType] = callback;
            }
        }
    };
    // 实例化
    ppo.Router.init = function() {
        var router = new ppo.Router();
        return router;
    };
    /**
     * trigger event
     * https://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript
     */
    ppo.trigger = function(element, event, eventType) {
        if (document.createEventObject) {
            var e = document.createEventObject();
            return element.fireEvent("on" + event, e);
        } else {
            var e = document.createEvent(eventType || "HTMLEvents");
            e.initEvent(event, true, true);
            element.dispatchEvent(e);
        }
    };

    /**
     * setInterval func fix times
     * https://stackoverflow.com/questions/2956966/javascript-telling-setinterval-to-only-fire-x-amount-of-times
     */
    ppo.setTimesout = function() {
        var func = arguments[0];
        var delay = arguments[1] === undefined ? 0 : parseFloat(arguments[1]);
        var times = arguments[2] === undefined ? 1 : parseInt(arguments[2]);
        var args = arguments.length > 3 ? ppo.args(arguments, 3) : null;
        var target = { index: 0, times: times, over: false };

        var id = setInterval(function() {
            target.index++;
            if (target.index > times) {
                clearInterval(id);
            } else {
                if (target.index == times) target.over = true;
                func.apply(target, args);
            }
        }, delay);

        return id;
    };

    ppo.clearTimesout = function(id) {
        clearInterval(id);
    };

    /**
     * construct
     * https://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible
     */
    ppo.construct = function() {
        var classs = arguments[0];
        return new(Function.prototype.bind.apply(classs, arguments))();
    };

    /**
     * Gets all the formal parameter names of a function
     * https://www.zhihu.com/question/28912825
     */
    ppo.paramsName = function(fn) {
        return /\(\s*([\s\S]*?)\s*\)/.exec(fn.toString())[1].split(/\s*,\s*/);
    };

    /************************************************************************
     * Date
     *************************************************************************/
    /**
     * getDate
     * https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
     */
    ppo.getDate = function(d1, d2) {
        var today = new Date();

        var dd = today.getDate();
        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        var hh = today.getHours();
        var ms = today.getMinutes();
        var ss = today.getSeconds();

        dd = ppo.fill0(dd);
        mm = ppo.fill0(mm);
        hh = ppo.fill0(hh);
        ms = ppo.fill0(ms);
        ss = ppo.fill0(ss);

        d1 = d1 || "/";
        d2 = d2 || ":";

        return yyyy + d1 + mm + d1 + dd + " " + hh + d2 + ms + d2 + ss;
    };



    /**
     * @desc   格式化${startTime}距现在的已过时间
     * @param  {Date} startTime 
     * @return {String}
     */
    ppo.formatPassTime = function(startTime) {
        var currentTime = Date.parse(new Date()),
            time = currentTime - startTime,
            day = parseInt(time / (1000 * 60 * 60 * 24)),
            hour = parseInt(time / (1000 * 60 * 60)),
            min = parseInt(time / (1000 * 60)),
            month = parseInt(day / 30),
            year = parseInt(month / 12);
        if (year) return year + "年前";
        if (month) return month + "个月前";
        if (day) return day + "天前";
        if (hour) return hour + "小时前";
        if (min) return min + "分钟前";
        else return '刚刚';
    };

    /**
     * 
     * @desc   格式化现在距${endTime}的剩余时间
     * @param  {Date} endTime  
     * @return {String}
     */
    ppo.formatRemainTime = function(endTime) {
        var startDate = new Date(); //开始时间
        var endDate = new Date(endTime); //结束时间
        var t = endDate.getTime() - startDate.getTime(); //时间差
        var d = 0,
            h = 0,
            m = 0,
            s = 0;
        if (t >= 0) {
            d = Math.floor(t / 1000 / 3600 / 24);
            h = Math.floor(t / 1000 / 60 / 60 % 24);
            m = Math.floor(t / 1000 / 60 % 60);
            s = Math.floor(t / 1000 % 60);
        }
        return d + "天 " + h + "小时 " + m + "分钟 " + s + "秒";
    };

    /************************************************************************
     * About Url Params
     *************************************************************************/

    /**
     * getUrlParam / deleteUrlParam
     * From https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
     */
    ppo.getUrlParam = function(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return "";

        return decodeURIComponent(results[2].replace(/\+/g, " "));
    };

    /**
     * setUrlParam
     * From https://stackoverflow.com/questions/5999118/add-or-update-query-string-parameter
     */
    ppo.setUrlParam = function(key, value, url) {
        if (!url) url = window.location.href;
        var re = new RegExp("([?|&])" + key + "=.*?(&|#|$)", "i");

        if (url.match(re)) {
            return url.replace(
                re,
                "$1" + key + "=" + encodeURIComponent(value) + "$2"
            );
        } else {
            var hash = "";
            if (url.indexOf("#") !== -1) {
                hash = url.replace(/.*#/, "#");
                url = url.replace(/#.*/, "");
            }
            var separator = url.indexOf("?") !== -1 ? "&" : "?";
            return url + separator + key + "=" + encodeURIComponent(value) + hash;
        }
    };

    ppo.deleteUrlParam = ppo.delUrlParam = function(param, url) {
        if (!url) url = window.location.href;
        //prefer to use l.search if you have a location/link object
        var urlparts = url.split("?");
        if (urlparts.length >= 2) {
            var prefix = encodeURIComponent(param) + "=";
            var pars = urlparts[1].split(/[&;]/g);

            //reverse iteration as may be destructive
            for (var i = pars.length; i-- > 0;) {
                //idiom for string.startsWith
                if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                    pars.splice(i, 1);
                }
            }

            url = urlparts[0] + (pars.length > 0 ? "?" + pars.join("&") : "");
            return url;
        } else {
            return url;
        }
    };

    /************************************************************************
     * Cookies
     *************************************************************************/
    /**
     * setCookie / getCookie / deleteCookie
     * From https://stackoverflow.com/questions/1458724/how-do-i-set-unset-cookie-with-jquery/1458728#1458728
     * change by a-jie
     */
    ppo.setCookie = function(name, value, option) {
        var longTime = 10;
        var path = "; path=/";
        var val = option && option.raw ? value : encodeURIComponent(value);
        var cookie = encodeURIComponent(name) + "=" + val;

        if (option) {
            if (option.days) {
                var date = new Date();
                var ms = option.days * 24 * 3600 * 1000;
                date.setTime(date.getTime() + ms);
                cookie += "; expires=" + date.toGMTString();
            } else if (option.hour) {
                var date = new Date();
                var ms = option.hour * 3600 * 1000;
                date.setTime(date.getTime() + ms);
                cookie += "; expires=" + date.toGMTString();
            } else {
                var date = new Date();
                var ms = longTime * 365 * 24 * 3600 * 1000;
                date.setTime(date.getTime() + ms);
                cookie += "; expires=" + date.toGMTString();
            }

            if (option.path) cookie += "; path=" + option.path;
            if (option.domain) cookie += "; domain=" + option.domain;
            if (option.secure) cookie += "; true";
        }

        document.cookie = cookie;
    };

    ppo.getCookie = function(name) {
        var nameEQ = encodeURIComponent(name) + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === " ") c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0)
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }

        return null;
    };

    ppo.deleteCookie = ppo.delCookie = function(name) {
        this.setCookie(name, "", {
            hour: -1
        });
    };
    /**
     * cookie
     * https://github.com/jiayi2/onavo/blob/master/onavo.js#L209
     */
    ppo.cookie = function() {
        function _extend() {
            var i = 0;
            var result = {};
            for (; i < arguments.length; i++) {
                var attributes = arguments[i];
                for (var key in attributes) {
                    result[key] = attributes[key];
                }
            }
            return result;
        }

        function init(converter) {
            function api(key, value, attributes) {
                var result;
                if (typeof document === "undefined") {
                    return;
                }
                if (arguments.length > 1) {
                    attributes = _extend({ path: "/" }, api.defaults, attributes);

                    if (typeof attributes.expires === "number") {
                        var expires = new Date();
                        expires.setMilliseconds(
                            expires.getMilliseconds() + attributes.expires * 864e5
                        );
                        attributes.expires = expires;
                    }

                    try {
                        result = JSON.stringify(value);
                        if (/^[\{\[]/.test(result)) {
                            value = result;
                        }
                    } catch (e) {}

                    if (!converter.write) {
                        value = encodeURIComponent(String(value)).replace(
                            /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
                            decodeURIComponent
                        );
                    } else {
                        value = converter.write(value, key);
                    }

                    key = encodeURIComponent(String(key));
                    key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                    key = key.replace(/[\(\)]/g, escape);

                    return (document.cookie = [
                        key,
                        "=",
                        value,
                        attributes.expires ?
                        "; expires=" + attributes.expires.toUTCString() :
                        "",
                        attributes.path ? "; path=" + attributes.path : "",
                        attributes.domain ? "; domain=" + attributes.domain : "",
                        attributes.secure ? "; secure" : ""
                    ].join(""));
                }
                if (!key) {
                    result = {};
                }
                var cookies = document.cookie ? document.cookie.split("; ") : [];
                var rdecode = /(%[0-9A-Z]{2})+/g;
                var i = 0;

                for (; i < cookies.length; i++) {
                    var parts = cookies[i].split("=");
                    var cookie = parts.slice(1).join("=");

                    if (cookie.charAt(0) === '"') {
                        cookie = cookie.slice(1, -1);
                    }

                    try {
                        var name = parts[0].replace(rdecode, decodeURIComponent);
                        cookie = converter.read ?
                            converter.read(cookie, name) :
                            converter(cookie, name) ||
                            cookie.replace(rdecode, decodeURIComponent);

                        if (this.json) {
                            try {
                                cookie = JSON.parse(cookie);
                            } catch (e) {}
                        }

                        if (key === name) {
                            result = cookie;
                            break;
                        }

                        if (!key) {
                            result[name] = cookie;
                        }
                    } catch (e) {}
                }

                return result;
            }

            api.set = api;
            api.get = function(key) {
                return api.call(api, key);
            };
            api.getJSON = api.getjson = api.getJson = function() {
                return api.apply({ json: true }, [].slice.call(arguments));
            };
            api.defaults = {};

            api.remove = function(key, attributes) {
                api(
                    key,
                    "",
                    _extend(attributes, {
                        expires: -1
                    })
                );
            };

            api.withConverter = init;

            return api;
        }
        return init(function() {});
    };

    /************************************************************************
     * Random And Math
     *************************************************************************/
    ppo.randomColor = function() {
        return (
            "#" +
            ("00000" + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6)
        );
    };

    ppo.randomFromArray = ppo.randomfArr = function(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    };

    ppo.randomFromA2B = ppo.randomA2B = function(a, b, int) {
        var result = Math.random() * (b - a) + a;
        return int ? Math.floor(result) : result;
    };

    ppo.randomKey = function(length) {
        var key = "";
        var possible =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        length = length || 6;

        for (var i = 0; i < length; i++)
            key += possible.charAt(Math.floor(Math.random() * possible.length));
        return key;
    };

    ppo.floor = function(n, m) {
        m = m || 0;
        return Math.floor(n * Math.pow(10, m)) / Math.pow(10, m);
    };

    ppo.fill0 = function(num) {
        num = parseFloat(num);
        return num < 10 ? "0" + num : num;
    };

    ppo.currency = function(val) {
        m = m || 0;
        return Math.floor(n * Math.pow(10, m)) / Math.pow(10, m);
    };

    /************************************************************************
     * Mobile
     *************************************************************************/
    /**
     * lock touch in mobile phone
     */
    ppo.lockTouch = function() {
        document.addEventListener(
            "touchmove",
            function(e) {
                e.preventDefault();
            }, !1
        );
        document.addEventListener("touchstart", preventDefault, !1);
        document.addEventListener("touchend", preventDefault, !1);

        function not(e, tag) {
            return (
                e.target.tagName != tag.toUpperCase() &&
                e.target.tagName != tag.toLowerCase()
            );
        }

        function preventDefault(e) {
            if (
                not(e, "input") &&
                not(e, "textarea") &&
                not(e, "select") &&
                not(e, "menus")
            )
                e.preventDefault();
        }
    };

    /************************************************************************
     * Assets
     *************************************************************************/
    /**
     * load js
     * 1. ppo.loadjs("//your_url/a.js",func);
     * 2. ppo.loadjs("//your_url/a.js","only_id",func);
     */
    ppo.loadjs = function(url, b, c) {
        var onlyId, callback;

        if (typeof b == "function") {
            onlyId = this.hash(url + "") + "";
            callback = b;
        } else if (typeof b == "undefined") {
            onlyId = this.hash(url + "") + "";
            callback = null;
        } else {
            onlyId = b + "";
            callback = c;
        }

        if (ppo._cache.urls[onlyId]) {
            callback && callback();
        } else {
            var func = typeof url == "string" ? _insertScript : _insertScripts;
            func.call(this, url, function() {
                ppo._cache.urls[onlyId] = true;
                callback && callback();
            });
        }
    };
    /*
     * https://gist.github.com/pete-otaqui/3912307
     */
    ppo.loadcss = function(url, callback) {
        var promise,
            resolutions = [],
            rejections = [],
            resolved = false,
            rejected = false,
            count,
            id;

        this.count = this.count ? ++this.count : 1;
        count = this.count;
        id = "load-css-" + count;

        promise = {
            done: function(callback) {
                resolutions.push(callback);
                if (resolved) callback();
                return promise;
            },
            fail: function(callback) {
                rejections.push(callback);
                if (rejected) callback();
                return promise;
            }
        };

        function resolve() {
            resolved = true;
            for (var i = 0, len = resolutions.length; i < len; i++) resolutions[i]();
        }

        function reject() {
            rejected = true;
            for (var i = 0, len = rejections.length; i < len; i++) rejections[i]();
        }

        var link = document.createElement("link");
        link.setAttribute("id", id);
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        if (typeof link.addEventListener !== "undefined") {
            link.addEventListener("load", resolve, false);
            link.addEventListener("error", reject, false);
        } else if (typeof link.attachEvent !== "undefined") {
            link.attachEvent("onload", function() {
                // IE 8 gives us onload for both success and failure
                // and also readyState is always "completed", even
                // for failure.  The only way to see if a stylesheet
                // load failed from an external domain is to try and
                // access its cssText, and then catch the error
                // ... sweet :/
                var txt,
                    cur,
                    i = document.styleSheets.length;
                try {
                    while (i--) {
                        cur = document.styleSheets[i];
                        if (cur.id === id) {
                            txt = cur.cssText;
                            resolve();
                            return;
                        }
                    }
                } catch (e) {}
                if (!resolved) {
                    reject();
                }
            });
        }
        document.getElementsByTagName("head")[0].appendChild(link);
        link.setAttribute("href", url);
        return promise;
    };

    /*数组方法 s */
    //除了es5 forEach, map, filter, every, some, indexOf, lastIndexOf 新增的方法外
    //isArray unique random 都是自己实现的
    A = (function() {
        var ret = {
            isArray: function(obj) {
                return Object.prototype.toString.call(obj) === "[object Array]";
            },
            unique: function(target) {
                //数组去重
                var temp = [];
                _that: for (var i = 0, len = target.length; i < len; i++) {
                    for (var j = i + 1; j < len; j++) {
                        if (target[i] === target[j]) {
                            continue _that;
                        }
                    }
                    temp.push(target[i]);
                }
                return temp;
            },
            random: function(target) {
                //在数组中随机取一个
                return target[Math.floor(Math.random() * target.length)];
            },
            shuffle: function(target) {
                //打乱数组返回新数组
                if (!target.length == 0) {
                    var temp = target,
                        j,
                        x,
                        i = target.length;
                    for (; i > 0; j = parseInt(Math.random() * i),
                        x = target[--i],
                        target[i] = target[j],
                        target[j] = x
                    ) {}
                    return temp;
                    //target.sort(function(){return 0.5 - Math.random()});
                }
                return;
            },
            equal: function(arr1, arr2) {
                if (arr1 === arr2) return true;
                if (arr1.length != arr2.length) return false;
                for (var i = 0; i < arr1.length; ++i) {
                    if (arr1[i] !== arr2[i]) return false;
                };
                return true;
            },
            contains: function(target, item) {
                //是否包含指定元素
                return target.indexOf(item) > -1;
            },
            removeAt: function(target, index) {
                //在参数1中删除参数2指定位的元素返回布尔
                return !!target.splice(index, 1).length;
            },
            remove: function(target, item) {
                //在参数1中删除参数2返回布尔
                var index = target.indexOf(item);
                return index > -1 ? this.removeAt(target, index) : false;
            },
            compact: function(target) {
                //去除数组中的undefined和Null
                if (!type.isArray(target)) {
                    throw new Error("target error type");
                }
                return target.filter(function(item) {
                    return item != undefined;
                });
            },
            pluck: function(target, name) {
                //获取数组对象中的属性值，组合成新数组
                var result = [],
                    temp;
                target.forEach(function(item) {
                    temp = item[name];
                    if (temp != null) {
                        result.push(temp);
                    }
                });
                return result;
            },
            union: function(t1, t2) {
                //2个数组的并集
                return this.unique(t1.concat(t2));
            },
            intersect: function(t1, t2) {
                // 取2个数组的交集
                return t1.filter(function(item) {
                    return ~t2.indexOf(item);
                });
            },
            diff: function(t1, t2) {
                //取差集
                var r = t1;
                for (var i = 0; i < t1.length; i++) {
                    for (var j = 0; j < t2.length; j++) {
                        if (r[i] === t2[j]) {
                            r.splice(i, 1);
                            i--;
                            break;
                        }
                    }
                }
                return r;
            },
            max: function(target) {
                //max
                return Math.max.apply(0, target);
            },
            min: function(target) {
                //min
                return Math.min.apply(0, target);
            },
            indexOf: function(array, elt, from) {
                //以下es5新增
                if (array.indexOf) {
                    return isNaN(from) ? array.indexOf(elt) : array.indexOf(elt, from);
                } else {
                    var len = array.length;
                    from = isNaN(from) ?
                        0 :
                        from < 0 ? Math.ceil(from) + len : Math.floor(from);

                    for (; from < len; from++) {
                        if (array[from] === elt) return from;
                    }
                    return -1;
                }
            },
            lastIndexOf: function(array, elt, from) {
                if (array.lastIndexOf) {
                    return isNaN(from) ?
                        array.lastIndexOf(elt) :
                        array.lastIndexOf(elt, from);
                } else {
                    var len = array.length;
                    from =
                        isNaN(from) || from >= len - 1 ?
                        len - 1 :
                        from < 0 ? Math.ceil(from) + len : Math.floor(from);

                    for (; from > -1; from--) {
                        if (array[from] === elt) return from;
                    }
                    return -1;
                }
            }
        };

        function each(object, callback) {
            if (undefined === object.length) {
                for (var name in object) {
                    if (false === callback(object[name], name, object)) break;
                }
            } else {
                for (var i = 0, len = object.length; i < len; i++) {
                    if (i in object) {
                        if (false === callback(object[i], i, object)) break;
                    }
                }
            }
        }

        each({
                forEach: function(object, callback, thisp) {
                    each(object, function() {
                        callback.apply(thisp, arguments);
                    });
                },
                map: function(object, callback, thisp) {
                    var ret = [];
                    each(object, function() {
                        ret.push(callback.apply(thisp, arguments));
                    });
                    return ret;
                },
                filter: function(object, callback, thisp) {
                    var ret = [];
                    each(object, function(item) {
                        callback.apply(thisp, arguments) && ret.push(item);
                    });
                    return ret;
                },
                every: function(object, callback, thisp) {
                    var ret = true;
                    each(object, function() {
                        if (!callback.apply(thisp, arguments)) {
                            ret = false;
                            return false;
                        }
                    });
                    return ret;
                },
                some: function(object, callback, thisp) {
                    var ret = false;
                    each(object, function() {
                        if (callback.apply(thisp, arguments)) {
                            ret = true;
                            return false;
                        }
                    });
                    return ret;
                }
            },
            function(method, name) {
                ret[name] = function(object, callback, thisp) {
                    if (object[name]) {
                        return object[name](callback, thisp);
                    } else {
                        return method(object, callback, thisp);
                    }
                };
            }
        );

        return ret;
    })();
    ppo.Array = A;
    /* 数组方法 e */
    /* 字符串s */
    S = {
        // 去空格
        trim: function(str) {
            str = str.replace(/^\s+/, "");
            for (var i = str.length - 1; i >= 0; i--) {
                if (/\S/.test(str.charAt(i))) {
                    str = str.slice(0, i + 1);
                    break;
                }
            }
            return str;
        },
        print: function(str, object) {
            // 模仿C语言print方法
            var arr = [].slice.call(arguments, 1),
                index;
            return str.replace(/#{([^{}]+)}/gm, function(match, name) {
                index = Number(name);
                if (index >= 0) {
                    return arr[index];
                }
                if (object && object[name] !== "") {
                    return object[name];
                }
                return "";
            });
        },
        //补零
        fillZero: function(target, n) {
            var z = new Array(n).join("0"),
                str = z + target,
                result = str.slice(-n);
            return result;
            //return (Math.pow(10,n) + '' + target).slice(-n);
        },
        //字符串去重
        longUnique: function(target) {

            // var newStr = "";
            // for (var i = 0; i < target.length; i++) {
            //     if (newStr.indexOf(target[i]) == -1) {
            //         newStr += target[i];
            //     }
            // }
            // return newStr;

            // if (!_this.isTypeof(target, "string")) {
            //     return;
            // } else if (target.length == 1) {
            //     return target;
            // };

            var json = {};
            for (var index = 0; index < target.length; index++) {
                if (!json[target[index]]) {
                    json[target[index]] = -1;
                };
            };

            var longString = '';
            for (var index = 0; index < target.length; index++) {
                if (json[target[index]]) {
                    json[target[index]] = 0;
                    longString = longString + target[index]
                };
            };

            return longString;
        },
        // 去掉script内部的html标签
        stripTags: function(target) {
            if (type.getType(target) === "String") {
                return target
                    .replace(/<script[^>]*>(\S\s*?)<\/script>/gim, "")
                    .replace(/<[^>]+>/g, "");
            }
        },
        capitalize: function(target) {
            //首字母大写
            return target.charAt(0).toUpperCase() + target.slice(1).toLowerCase();
        }, // camelize: function(s) { //驼峰转化（备用） 如margin-top转化为marginTop
        //  return s.replace(/-([a-z])/ig, function(all, letter) {
        //      return letter.toUpperCase();
        //  });
        // },
        //_ - 转驼峰命名
        camelize: function(target) {
            if (target.indexOf("-") < 0 && target.indexOf("_") < 0) {
                return target;
            }
            return target.replace(/[-_][^-_]/g, function(match) {
                //console.log(match) 匹配测试
                return match.charAt(1).toUpperCase();
            });
        },
        underscored: function(target) {
            // 把驼峰转换成_
            return target.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();
        },
        dasherize: function(target) {
            //把字符串中的_转成-
            return this.underscored(target).replace(/_/g, "-");
        },
        truncate: function(target, len, truncation) {
            //字符串截断方法 目标 长度默认30，截断后符号默认...
            len = len || 30;
            truncation = truncation ? truncation : "...";
            return target.length > len ?
                target.slice(0, len - truncation.length) + truncation :
                target.toString();
        },
        byteLen: function(str, charset) {
            //获得字符串字节长度 参数2 utf-8 utf8 utf-16 utf16
            var target = 0,
                charCode,
                i,
                len;
            charset = charset ? charset.toLowerCase() : "";
            if (charset === "utf-16" || charset === "utf16") {
                for (i = 0, len = str.length; i < len; i++) {
                    charCode = str.charCodeAt(i);
                    if (charCode <= 0xffff) {
                        target += 2;
                    } else {
                        target += 4;
                    }
                }
            } else {
                for (i = 0, len = str.length; i < len; i++) {
                    charCode = str.charCodeAt(i);
                    if (charCode <= 0x007f) {
                        target += 1;
                    } else if (charCode <= 0x07ff) {
                        target += 2;
                    } else if (charCode <= 0xffff) {
                        target += 3;
                    } else {
                        target += 4;
                    }
                }
            }
            return target;
        },
        repeat: function(item, times) {
            //重复item,times次
            var s = item,
                target = "";
            while (times > 0) {
                if (times % 2 == 1) {
                    target += s;
                }
                if (times == 1) {
                    break;
                }
                s += s;
                times = times >> 1;
            }
            return target;
            //retrun new Array(times).join(item)
        },
        endsWith: function(target, item, ignorecase) {
            //参2是参1的结尾么？参数3忽略大小写
            var str = target.slice(-item.length);
            return ignorecase ?
                str.toLowerCase() === item.toLowerCase() :
                str === item;
        },
        startsWith: function(target, item, ignorecase) {
            //参数2是参数1的开头么？参数3忽略大小写
            var str = target.slice(0, item.length);
            return ignorecase ?
                str.toLowerCase() === item.toLowerCase() :
                str === item;
        },
        containsClass: function(target, item, separator) {
            // 类名中，参数1 是否包含参数2，类名中的分隔符
            return separator ?
                (separator + target + separator).indexOf(
                    separator + item + separator
                ) > -1 :
                this.contains(target, item);
        },
        contains: function(target, item) {
            //判定一个字符串是否包含另一个字符串
            return target.indexOf(item) != -1;
            //return target.indexOf(item) > -1;
        }
    };
    ppo.String = S;
    /* 字符串e */

    loadImage = (function() {
        function loadImages(options) {
            var len = 0, //资源总数
                index = 0, //循环资源数组用
                curIndex = 0, //记录当前加载完成资源个数
                stepTimer = null, //记录当前setTimeout对象句柄
                stepTimeValue = 5, //步进时间间隔
                percentageValue = 0, //当前百分比
                targetPercent = 0, //目标百分比
                data = options.data || [],
                step = options.step || function() {},
                complete = options.complete || function() {},
                needOneStep = options.needOneStep || false,
                path = options.path || false;

            if (typeof data !== "object" || data.length === 0) {
                step(100);
                return false;
            }

            len = data.length;
            if (path) {
                for (var i = len - 1; i > -1; i--) {
                    data[i] = path + data[i];
                    //console.info(data[i]);
                }
            }

            var processStep = function() {
                percentageValue++;
                // console.info("processStep = ",percentageValue)
                step(percentageValue);
                if (percentageValue < targetPercent) {
                    stepTimer = setTimeout(function() {
                        processStep();
                    }, stepTimeValue);
                } else if (targetPercent === 100 && percentageValue === targetPercent) {
                    if (complete && typeof complete === "function") {
                        complete();
                    }
                }
            };

            function onload() {
                curIndex++;
                targetPercent = Math.floor(curIndex / len * 100);
                if (needOneStep) {
                    if (stepTimer) {
                        clearTimeout(stepTimer);
                    }
                    processStep();
                } else {
                    step(targetPercent);
                    if (targetPercent === 100) {
                        complete();
                    }
                }
            }

            for (index; index < len; index++) {
                var strUrl = data[index];
                new loadImageItem(strUrl, onload).start();
            }
        }
        /**
         * @name loadImageItem
         * @param  {string} url - images full url
         * @callback cb - called when load image completed
         */
        function loadImageItem(url, cb) {
            var self = this;

            this.img = new Image();

            //readyState为complete和loaded则表明图片已经加载完毕。测试IE6-IE10支持该事件，其它浏览器不支持。
            var onReadyStateChange = function() {
                removeEventHandlers();
                console.info("onReadyStateChange");
                cb(this, "onReadyStateChange");
            };

            var onError = function() {
                console.info("onError");
                removeEventHandlers();
                cb(this, "onError");
            };

            var onLoad = function() {
                removeEventHandlers();
                cb(this, "onload");
            };

            var removeEventHandlers = function() {
                self.unbind("load", onLoad);
                self.unbind("readystatechange", onReadyStateChange);
                self.unbind("error", onError);
            };

            this.start = function() {
                this.bind("load", onLoad);
                this.bind("readystatechange", onReadyStateChange);
                this.bind("error", onError);

                this.img.src = url;
                if (self.img.complete) {
                    removeEventHandlers();
                    cb(this, "onload");
                }
            };
        }

        /**
         * @name bind
         * @description cross-browser event binding
         * @param  {string} eventName
         * @param  {function} eventHandler
         */
        loadImageItem.prototype.bind = function(eventName, eventHandler) {
            if (this.img.addEventListener) {
                this.img.addEventListener(eventName, eventHandler, false);
            } else if (this.img.attachEvent) {
                this.img.attachEvent("on" + eventName, eventHandler);
            }
        };

        /**
         * @name unbind
         * @description cross-browser event un-binding
         * @param  {string} eventName
         * @param  {function} eventHandler
         */
        loadImageItem.prototype.unbind = function(eventName, eventHandler) {
            if (this.img.removeEventListener) {
                this.img.removeEventListener(eventName, eventHandler, false);
            } else if (this.img.detachEvent) {
                this.img.detachEvent("on" + eventName, eventHandler);
            }
        };

        // AMD module support
        if (typeof define === "function" && define.amd) {
            define("loadImages", [], function() {
                return loadImages;
            });
        }
        return loadImages;
    })();
    ppo.loadImage = loadImage;
    /************************************************************************
     * Other
     *************************************************************************/
    /**
     * generate uuid
     * From https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
     */
    ppo.uuid = function() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
            var r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    };

    /**
     * string hash map
     * From https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
     */
    ppo.hash = function(str) {
        str += "";
        var hash = 0,
            i,
            chr;
        if (str.length === 0) return hash;
        for (i = 0; i < str.length; i++) {
            chr = str.charCodeAt(i);
            hash = (hash << 5) - hash + chr;
            hash |= 0; // Convert to 32bit integer
        }

        return hash;
    };

    /**
     * map condition judge
     */
    ppo.judge = ppo.judgment = function(v, vals, strict) {
        if (!this.isTypeof(vals, "array")) return false;

        for (var key in vals) {
            if (strict) {
                if (v === vals[key]) return true;
            } else {
                if (v == vals[key]) return true;
            }
        }

        return false;
    };

    /**
     * is typeof type
     */
    ppo.isTypeof = function(val, type) {
        return (
            Object.prototype.toString
            .call(val)
            .slice(8, -1)
            .toLowerCase() === type
        );
    };
    ppo.getType = function(ele) {
        if (!ele) return undefined;
        if (window == document && document != window) {
            return 'window';
        } else if (ele.nodeType === 9) {
            return 'document';
        } else if (ele.callee) {
            return 'arguments';
        } else if (isFinite(ele.length) && ele.item) {
            return 'nodeList';
        } else {
            var temp = Object.prototype.toString.call(ele),
                reg = /\[object (.*)\]/,
                arr = reg.exec(temp);
            return arr[1].toLowerCase();
        }
    };

    /**
     * to json
     */
    ppo.toJSON = ppo.tojson = ppo.toJson = function(res) {
        if (!res) return null;

        if (typeof res == "string") {
            try {
                return JSON.parse(res);
            } catch (e) {
                return eval("(" + res + ")");
            }
        } else if (this.isTypeof(res.json, "function")) {
            return res.json();
        } else {
            return res;
        }
    };

    /**
     * arguments to array
     */
    ppo.args = function($arguments, first) {
        return Array.prototype.slice.call($arguments, first || 0);
    };

    /**
     * a trash object
     */
    ppo.trash = {
        clear: function() {
            for (var key in ppo.trash) {
                if (key !== "log" && key !== "clear") delete ppo.trash[key];
            }
        },
        log: function() {
            for (var key in ppo.trash) {
                if (key !== "log" && key !== "clear")
                    console.log("ppo.trash:: ", key, ppo.trash[key]);
            }
        }
    };

    ppo.noop = function() {};

    /************************************************************************
     *
     *   Private Method
     *
     *************************************************************************/
    ppo._cache = { urls: {}, logs: {} };

    var _insertScripts = function(arr, callback) {
        for (var i = 0; i < arr.length; i++) {
            _insertScript(arr[i], loaded);
        }

        var _index = 0;

        function loaded() {
            _index++;
            if (_index >= arr.length) {
                callback && callback();
            }
        }
    };

    var _insertScript = function(src, callback) {
        var script = document.createElement("script");
        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", src);
        document.getElementsByTagName("head")[0].appendChild(script);

        if (/msie/.test(ppo.ua("l"))) {
            script.onreadystatechange = function() {
                if (this.readyState == "loaded" || this.readyState == "complete") {
                    callback();
                }
            };
        } else if (/gecko/.test(ppo.ua("l"))) {
            script.onload = function() {
                callback();
            };
        } else {
            setTimeout(function() {
                callback();
            }, 50);
        }
    };

    return ppo;
});