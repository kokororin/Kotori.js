(function(window, undefined) {
    var Kotori = {
        ajax: function(obj) {
            var xhr = this.createXHR();
            obj.url = obj.url + "?rand=" + Math.random();
            obj.data = this.params(obj.data);
            if (obj.method === "get") {
                obj.url += obj.url.indexOf("?") == "-1" ? "?" + obj.data : "&" + obj.data;
            }
            if (obj.async === true) {
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        this.callBack(xhr, obj);
                    }
                }
            }
            xhr.open(obj.method, obj.url, obj.async);
            if (obj.method === "post") {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send(obj.data);
            } else {
                xhr.send(null);
            }

            if (obj.async === false) {
                this.callBack(xhr, obj);
            }
        },
        callBack: function(xhr, obj) {
            if (xhr.status == 200) {
                obj.success(xhr.responseText);
            } else {
                obj.Error("获取数据失败，错误代号为：" + xhr.status + "错误信息为：" + xhr.statusText);
            }
        },
        createXHR: function() {
            if (typeof XMLHttpRequest != "undefined") {
                return new XMLHttpRequest();
            } else if (typeof ActiveXObject != "undefined") {
                var version = [
                    "MSXML2.XMLHttp.6.0",
                    "MSXML2.XMLHttp.3.0",
                    "MSXML2.XMLHttp",
                ];
                for (var i = 0; i < version.length; i++) {
                    try {
                        return new ActiveXObject(version[i]);
                    } catch (e) {}
                }
            } else {
                throw new Error("您的系统或浏览器不支持XHR对象！");
            }
        },

        params: function(data) {
            var arr = [];
            for (var i in data) {
                arr.push(encodeURIComponent(i) + "=" + encodeURIComponent(data[i]));
            }
            return arr.join("&");
        }

    }

    if (typeof window === "object" && typeof window.document === "object") {
        window.Kotori = window.$ = Kotori;
    }

})(window);
