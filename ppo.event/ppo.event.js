/**
 * @description 扩展事件的代理
 * @author halld
 * @demo        [demo]
 */
void function(exports) {
    /* Debug Start */
    var logger = {
        log: function(text) {
            /*
             var dom = document.getElementById("log");
             if (dom) {
             dom.value += text + "\n";
             }
             */
            window.console && console.log(text)
        }
    };
    /* Debug End */

    var lib = {
        /**
         * 通过id获得DOM对象
         * @param {String|Element} id
         */
        g: function(id) {
            if (typeof id != "string") return id;
            return document.getElementById(id);
        },
        /**
         * 绑定事件
         * @param {String|Element} element 绑定事件对象，id或者是DOM
         * @param {String} eventName 事件名
         * @param {Function} callback 回调函数
         */
        on: function(element, eventName, callback) {
            element = lib.g(element);
            if (!element) return;
            if (element.addEventListener) {
                element.addEventListener(eventName, callback, false);
            } else element.attachEvent && element.attachEvent("on" + eventName, callback);
        },
        /**
         * 注销事件绑定
         * @param {String|Element} element 绑定事件对象，id或者是DOM
         * @param {String} eventName 事件名
         * @param {Function} callback 回调函数
         */
        un: function(element, eventName, callback) {
            element = lib.g(element);
            if (!element) return;
            if (element.removeEventListener) {
                element.removeEventListener(eventName, callback, false);
            } else element.detachEvent && element.detachEvent("on" + eventName, callback);
        },
        /**
         * 遍历数组
         * @param {Array} arr
         * @param {Function} scaner
         */
        each: function(arr, scaner) {
            if (!arr || !scaner) return;
            for (var i = 0; i < arr.length; i++) {
                if (scaner(arr[i], i) === false) return;
            }
        }
    };

    var eventDict = {};

    /**
     * 默认绑定的事件
     */
    var defaultEvents = ["mousedown", "click", "dblclick"];

    var handler = 0;

    /**
     * 扫描容器
     * @param {Element} element DOM对象
     * @param {Function} scaner 扫描方法，返回true则停止扫描
     */
    function scanParent(element, scaner) {
        if (!element || !scaner) return;
        while (element && !/^html$/i.test(element.tagName)) {
            if (scaner(element) == false) return;
            element = element.parentNode;
        }
    }

    /**
     * 注册事件
     * @param {String|Element} element 事件对象id
     * @param {Function} callback 回调函数
     * 	{String} command 命令字符串
     * 	{Element} element 响应的dom
     * 	{Event} e 事件信息
     * @param {String|Array} events 绑定事件列表
     * @return {Number} 返回事件句柄
     */
    exports.on = function(element, callback, events) {
        if (!callback) return;
        element = lib.g(element);
        if (!element) return;
        events = events || defaultEvents;
        if (!(events instanceof Array)) events = [events];
        if (!events.length) return;
        handler++;
        var eventItem = eventDict[handler] = {
            target: element,
            events: {},
            callback: callback
        };
        lib.each(events, function(eventName) {
            if (eventItem.events[eventName]) return;
            eventItem.events[eventName] = function(e) {
                e = e || event;
                var target = e.srcElement || e.target;

                if (/^(html|document)$/i.test(target.tagName)) {
                    target = document.body;
                }
                scanParent(target, function(node) {
                    if (element.parentNode == node) return false;
                    if (!node.getAttribute) return;
                    var command = node.getAttribute("event-" + eventName);
                    if (!command) { // 处理简写
                        switch (eventName) {
                            case "click":
                                command = node.getAttribute("cmd");
                                break;
                            case "mousedown":
                                command = node.getAttribute("down");
                                break;
                            case "contextmenu":
                                command = node.getAttribute("menu");
                                break;
                        }
                    }
                    if (!command) return;
                    callback(command, node, e);
                    return false;
                });
            };
            lib.on(element, eventName, eventItem.events[eventName]);
        });
        return handler;
    };

    /**
     * 派发事件
     * @param {Number} handler 事件句柄
     * @param {String} command 命令字符串
     * @param {Element} element 事件Dom对象
     * @param {Event} e 事件
     */
    exports.fire = function(handler, command, element, e) {
        var eventItem = eventDict[handler];
        eventItem && eventItem.callback(command, element, e);
    };

    /**
     * 注销事件
     * @param {Number} handler 事件对象句柄
     */
    exports.un = function(handler) {
        var eventItem = eventDict[handler];
        if (!eventItem) return;
        for (var eventName in eventItem.events) {
            lib.un(eventItem.target, eventName, eventItem.events[eventName]);
        }
        delete eventDict[handler];
    };
}(ppo.event);