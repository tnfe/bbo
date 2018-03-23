/**
 * @description [description]
 * @author halld
 * ppo.ajax.load('file',function(res){},'filetype','type');
 * ppo.ajax.load('json.json', function(data) {console.log(data)}, 'json', 'get');
 * see demo http://www.openjs.com/scripts/jx/
 */
ppo.ajax = {
    getHTTPObject: function() {
        var http = false;
        if (typeof ActiveXObject != 'undefined') {
            try {
                http = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e) {
                try {
                    http = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (E) {
                    http = false;
                };
            };
        } else if (window.XMLHttpRequest) {
            try {
                http = new XMLHttpRequest();
            } catch (e) {
                http = false;
            };
        };
        return http;
    },
    load: function(url, callback, format) {
        var http = this.init();
        if (!http || !url) return;
        if (http.overrideMimeType) http.overrideMimeType('text/xml');

        if (!format) var format = "text";
        format = format.toLowerCase();

        var now = "uid=" + new Date().getTime();
        url += (url.indexOf("?") + 1) ? "&" : "?";
        url += now;

        http.open("GET", url, true);

        http.onreadystatechange = function() {
            if (http.readyState == 4) {
                if (http.status == 200) {
                    var result = "";
                    if (http.responseText) result = http.responseText;

                    if (format.charAt(0) == "j") {
                        result = result.replace(/[\n\r]/g, "");
                        result = eval('(' + result + ')');
                    };

                    if (callback) callback(result);
                } else {
                    if (error) error(http.status);
                };
            };
        };
        http.send(null);
    },
    init: function() {
        return this.getHTTPObject();
    }
};