(function(window, undefined) {

    var kotori = {

        library: [],

        config: function(o) {
            kotori.library = o;
        },

        loadScript: function(url, callback) {
            var scriptId = kotori.hashCode(url);
            if (!document.getElementById(scriptId)) {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.id = scriptId;

                if (script.readyState) { // IE
                    script.onreadystatechange = function() {
                        if (script.readyState == 'loaded' || script.readyState == 'complete') {
                            script.onreadystatechange = null;
                            callback();
                        }
                    };
                } else { // Others
                    script.onload = function() {
                        callback();
                    };
                }
                script.src = url;
                document.getElementsByTagName('head')[0].appendChild(script);
            } else {
                callback();
            }
        },

        loadStyle: function(url, callback) {
            var cssId = kotori.hashCode(url);
            if (!document.getElementById(cssId)) {
                var head = document.getElementsByTagName('head')[0];
                var link = document.createElement('link');
                link.id = cssId;
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = url;
                link.media = 'all';
                head.appendChild(link);
            }
            callback();
        },

        require: function(name, callback) {

            if (typeof name == 'object') {
                var cmd = '',
                    length = name.length,
                    url = null;
                for (key in name) {
                    if (typeof kotori.library[name[key]] == 'undefined') {
                        url = name[key];
                    } else {
                        url = kotori.library[name[key]];
                    }
                    switch (url.substr(url.length - 3, 3)) {
                        case 'css':
                            cmd += 'kotori.loadStyle(';
                            break;
                        case '.js':
                            cmd += 'kotori.loadScript(';
                            break;
                        default:
                            throw new Error('Load error');
                    }

                    cmd += '\'' + url + '\'' + ',function(){';
                    if (key == (length - 1)) {
                        cmd += '!' + callback.toString() + '();';
                    }
                }
                for (key in name) {
                    cmd += '});'
                }
                eval(cmd);
                return false;
            }

            eval('kotori.require([' + '\'' + name + '\'' + '],' + callback.toString() + ')');
        },

        page: function(name, callback) {
            var page = document.getElementsByTagName('body')[0].getAttribute('data-page');
            if (page == null) {
                return false;
            }
            for (key in name) {
                if (name[key] == page) {
                    callback();
                }
            }
        },

        hashCode: function(s) {
            var hash = 0,
                i, chr, len;
            if (s.length === 0) return hash;
            for (i = 0, len = s.length; i < len; i++) {
                chr = s.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0; // Convert to 32bit integer
            }
            return hash;
        }

    }

    if (typeof define === "function" && define.amd) {
        define('kotori', [], function() {
            return kotori;
        });
    };

    if (typeof window === "object" && typeof window.document === "object") {
        window.kotori = kotori;
    }

})(window);