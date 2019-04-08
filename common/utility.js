define(function(require, exports, module) {
    module.exports = (function(host, undefined) {
        var UNDEFINED = typeof undefined,STRING_EMPTY = '';
        var exports = {
            'OOP': {
                'Namespace': function(namespace, value) {
                    if (!namespace || !namespace.length)
                        return null;
                    if (typeof value == UNDEFINED)
                        value = {};
                    var parent = host,
                        levels = namespace.split(".");
                    for (var i = (levels[0] == "window") ? 1 : 0, count = levels.length, limit = count - 1, key; i < levels.length; ++i) {
                        key = levels[i];
                        parent = (parent[key] = parent[key] || (i == limit ? value : {}));
                    }
                    if (typeof value != 'undefined')
                        parent = value;
                    return parent;
                },

                'create': function(identifier, init, proto) {
                    init.prototype = proto;
                    init.prototype.constructor = init;
                    if (identifier)
                        return host[identifier] = init;
                    else
                        return init;
                }
            },

            'Language': {
                'isArray': function(source) {
                    return '[object Array]' == Object.prototype.toString.call(source);
                },

                'isString': function(source) {
                    return '[object String]' == Object.prototype.toString.call(source);
                }
            },

            'Function': {
                'bind': function(func, scope) {
                    var t = this;
                    var xargs = arguments.length > 2 ? [].slice.call(arguments, 2) : null;
                    return function() {
                        var fn = module.exports.Language.isString(func) ? scope[func] : func,
                            args = (xargs) ? xargs.concat([].slice.call(arguments, 0)) : arguments;
                        return fn.apply(scope || fn, args);
                    };
                }
            },

            'String': {
                'stringFormat': function() {
                    if (arguments.length == 0)
                        return null;
                    var value = arguments[0];
                    for (var i = 1, count = arguments.length; i < count; i++) {
                        var pattern = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
                        value = value.replace(pattern, arguments[i]);
                    }
                    return value;
                },

                'trim': function(source) {
                    return source.replace(/^\s+|\s+$/gi, '');
                },

                'getByteLength': function(source) {
                    return String(source).replace(/[^\x00-\xff]/g, "ci").length;
                },

                'subByte': function(source, length, tail) {
                    source = String(source);
                    tail = tail || '';
                    if (length < 0 || this.getByteLength(source) <= length) {
                        return source;
                    }
                    source = source.substr(0, length).replace(/([^\x00-\xff])/g, "\x241 ")
                        .substr(0, length)
                        .replace(/[^\x00-\xff]$/, "")
                        .replace(/([^\x00-\xff]) /g, "\x241");
                    return source + tail;
                },

                'xssFilter': function(source){
                    return source && source.replace(/</gi, '&lt;').replace(/>/gi, '&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
                }


            },

            'DateTime': {
                'showtime': function(source) {
                    var month = source.getMonth() + 1
                    return source.getFullYear() + '-' + (month < 10 ? '0' + month : month) + '-' + (source.getDate() < 10 ? '0' + source.getDate() : source.getDate());
                },

                'fulltime': function(source){
                    var hours = source.getHours(),minutes = source.getMinutes(),seconds = source.getSeconds();
                    return this.showtime(source) + ' ' 
                            + (hours < 10 ? '0' + hours : hours) 
                            + ':' + (minutes < 10 ? '0' + minutes : minutes) 
                            + ':' + (seconds < 10 ? '0' + seconds : seconds);
                },

                'countdownTime':function(timestamp,useUnit){
                    var day = 24 * 60 * 60 * 1000,
                        hour = 60 * 60 * 1000,
                        minutes = 60 * 1000,
                        timeFormat;
                    if ((timeFormat = parseInt(timestamp / day)) >= 1) {
                        timeFormat += useUnit? i18nTranslate('Store_Days'):'';
                    } else if ((timeFormat = parseInt(timestamp / hour)) >= 1) {
                        timeFormat += useUnit ?i18nTranslate('Store_Hours'):"";
                    } else if ((timeFormat = parseInt(timestamp / minutes)) >= 1) {
                        timeFormat += useUnit ?i18nTranslate('Store_Minutes'):"";
                    } else {
                        timeFormat = timestamp<=0 ? 0:parseInt(timestamp/ 1000) +i18nTranslate('Store_Seconds');
                    }
                    return timeFormat;
                }
            },

            'URL': {
                'queryString': function(key) {
                    var result = location.search.match(new RegExp("[\?\&]" + key + "=([^\&]+)", "i"));
                    if (result == null || result.length < 1)
                        return "";
                    return result[1];
                }
            },

            'AJAX': {
                'Request': function(option) {
                    var xhr = new XMLHttpRequest,
                        data, params = null,
                        method = (option['method'] || 'get').toLowerCase(),
                        url = option['url'];
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == 4) {
                            var status = xhr.status,
                                result = xhr.responseText ? eval('(' + xhr.responseText + ')') : null,
                                successHandler, failHandler;
                            if (status >= 200 && status < 300 || status == 304)
                                (successHandler = option['success']) && successHandler(result);
                            else
                                (failHandler = option['fail']) && failHandler(result);
                        }
                    }
                    if (data = option['data']) {
                        var params = [];
                        for (var key in data)
                            params.push(key + "=" + data[key]);
                        params = params.join('&');
                    }
                    url += '?t=' + Math.ceil(Math.random() * 1000000);
                    if (method == 'get' && params)
                        url += '&' + params
                    xhr.open(method, url, true);
                    if (method == 'post')
                        xhr.setRequestHeader("content-type", "x-www-form-urlencoded");
                    else
                        params = null
                    xhr.send(params);
                },
                'JSONP': function(params) {
                    var option = {
                        'url': params['url'],
                        'dataType': 'jsonp'
                    }
                    var data = params['data'],
                        callback = params['callback'];
                    if (data)
                        option['data'] = data;
                    if (callback)
                        option['jsonpCallback'] = callback;
                    $.ajax(option);
                }
            },

            'Image': {
                'preload': function(src, callback) {
                    var cache = arguments.callee['cache'] = arguments.callee['cache'] || {};
                    var store = function(image) {
                        var imageSRC = image.src;
                        cache[src] = {
                            'src': imageSRC,
                            'width': image.width,
                            'height': image.height
                        };
                    };
                    var handler = function(image) {
                        store(image);
                        callback(cache[image['src']]);
                    };
                    switch (Object.prototype.toString.call(src)) {
                        case '[object String]':
                            var data = cache[src];
                            if (data)
                                callback(data);
                            else {
                                var temp = new Image;
                                temp.setAttribute('src', src);
                                //temp.onerror = function() {}; //todo
                                if (temp.getAttribute('complete'))
                                    handler(temp);
                                else
                                    $(temp).one('load', function() {
                                        handler(temp)
                                    });
                            }
                            break;
                        case '[object Array]':
                            var preload = arguments.callee;
                            if (src.length == 0)
                                callback();
                            else {
                                var source = src.shift();
                                preload(source, function() {
                                    preload(src, callback);
                                });
                            }
                            break;
                    }
                },

                'resize': function(size, limit) {
                    var result = {
                        'width': size.width,
                        'height': size.height
                    }
                    if (size.width > limit.width)
                        result = {
                            'width': limit.width,
                            'height': Math.ceil(limit.width / size.width * size.height)
                        };
                    return result;
                }
            },

            'DOM': {
                '$': function $(selector, context) {
                    context = context || document;
                    var obj1 = context.querySelector(selector);
                    return obj1;
                    var obj2 = context.querySelectorAll(selector);
                    var old = context.id,
                        id = context.id = "__sizzle__";
                    try {
                        var query = '#' + context + ' ' + selector;

                    } catch (e) {} finally {
                        old ? context.id = old : context.removeAttribute("id");
                    }
                },

                'setHTML': function(element, position, html) {
                    if (element.insertAdjacentHTML) {
                        element.insertAdjacentHTML(position, html);
                    } else {
                        var range = element.ownerDocument.createRange();
                        position = position.toUpperCase();
                        if (position == 'AFTERBEGIN' || position == 'BEFOREEND') {
                            range.selectNodeContents(element);
                            range.collapse(position == 'AFTERBEGIN');
                        } else {
                            var begin = position == 'BEFOREBEGIN';
                            range[begin ? 'setStartBefore' : 'setEndAfter'](element);
                            range.collapse(begin);
                        }
                        range.insertNode(range.createContextualFragment(html));
                    }
                    return element;
                },

                'appendHTML': function(element, html) {
                    this.setHTML(element, 'BEFOREEND', html)
                },

                'afterHTML': function(element, html) {
                    this.setHTML(element, 'AFTEREND', html)
                },

                'on': function(target, event, handler) {
                    if (target)
                        target.addEventListener(event, handler);
                },

                'show': function(target) {
                    if (target)
                        target.style.display = 'block';
                },

                'hide': function(target) {
                    if (target)
                        target.style.display = 'none';
                }
            },

            'Storage': {
                hname: location.hostname ? location.hostname : 'localStatus',
                isLocalStorage: window.localStorage ? true : false,
                dataDom: null,

                initDom: function() { //初始化userData
                    if (!this.dataDom) {
                        try {
                            this.dataDom = document.createElement_x('input'); //这里使用hidden的input元素
                            this.dataDom.type = 'hidden';
                            this.dataDom.style.display = "none";
                            this.dataDom.addBehavior('#default#userData'); //这是userData的语法
                            document.body.appendChild(this.dataDom);
                            var exDate = new Date();
                            exDate = exDate.getDate() + 30;
                            this.dataDom.expires = exDate.toUTCString(); //设定过期时间
                        } catch (ex) {
                            return false;
                        }
                    }
                    return true;
                },
                set: function(key, value) {
                    if (this.isLocalStorage) {
                        window.localStorage.setItem(key, value);
                    } else {
                        if (this.initDom()) {
                            this.dataDom.load(this.hname);
                            this.dataDom.setAttribute(key, value);
                            this.dataDom.save(this.hname)
                        }
                    }
                },
                get: function(key) {
                    if (this.isLocalStorage) {
                        return window.localStorage.getItem(key);
                    } else {
                        if (this.initDom()) {
                            this.dataDom.load(this.hname);
                            return this.dataDom.getAttribute(key);
                        }
                    }
                },
                remove: function(key) {
                    if (this.isLocalStorage) {
                        localStorage.removeItem(key);
                    } else {
                        if (this.initDom()) {
                            this.dataDom.load(this.hname);
                            this.dataDom.removeAttribute(key);
                            this.dataDom.save(this.hname)
                        }
                    }
                }
            },

            'Cookie': {
                'duration': 7 * 24 * 60 * 60 * 1000,

                'key': {
                    login_key: "loginKey",
                    login_name: "login_name",
                    user_info: "login_userinfo",
                    goods_num: "login_goods_num",
                    rank: "rank",
                    recharge_state: "rcg",
                    locale: "locale",
                    twitter_token: "twitter-token",
                    twitter_tokenSecret: "twitter-tokenSecret",
                    data_resource_folder: "data_resource_folder",
                    is_register: 'is_reg',
                    login_auto_key: 'login_auto_key',
                    login_auto_type: 'login_auto_type',
                    last_view: 'last_view',
                    eid_festival: 'e_f_s',
                    task_update: 'task_update',
                    guide_step1: 'guide_step1',
                    guide_step2: 'guide_step2',
                    room_logo: 'room_logo',
                    room_step1: 'room_step1',
                    room_step2: 'room_step2',
                    room_step3: 'room_step3',
                    room_step4: 'room_step4',
                    room_step5: 'room_step5',
                    room_step6: 'room_step6',
                    room_step7: 'room_step7',
                    room_step8: 'room_step8'
                },

                'cookieDomain': DOMAIN_CONFIG['COOKIE_DOMAIN'],

                'get': function(cookie_name) {
                    if (!cookie_name || cookie_name == '') {
                        return null;
                    }
                    var reg = new RegExp("(^| )" + cookie_name + "=([^;]*)(;|$)");
                    var arr = document.cookie.match(reg);
                    if (arr) {
                        return unescape(arr[2]);
                    } else {
                        return null;
                    }
                },
                'set': function(cookie_name, cookie_val, time) {
                    time = time || this.duration;
                    if (!cookie_name || cookie_name == '') {
                        return;
                    }
                    var cookie_str = cookie_name + "=" + escape(cookie_val) + ";";
                    if (time > 0) {
                        var date = new Date();
                        date.setTime(date.getTime() + time);
                        cookie_str += "expires=" + date.toGMTString() + ";";
                    }
                    cookie_str += "path=/;domain=" + this.cookieDomain + ";";
                    document.cookie = cookie_str;
                },
                'delete': function(cookie_name) {
                    if (!cookie_name || cookie_name == '') {
                        return;
                    }
                    var date = new Date();
                    date.setTime(date.getTime() - 10000);
                    document.cookie = cookie_name + "=; expires=" + date.toGMTString() + ";path=/;domain=" + this.cookieDomain + ";";
                }
            },

            'Flash': {
                'holder': '<span id="{0}"></span>',

                'option': function(){
                    return {
                        'container': this.container || (this.container = $(document.body)),
                        'src': STRING_EMPTY,
                        'id': STRING_EMPTY,
                        'width': 1,
                        'height': 1,
                        'version': '9.0.0',
                        'expressInstall': STRING_EMPTY,
                        'falshvars': null,
                        'params': {
                            'allowFullScreen': true,
                            'allowScriptAccess': 'sameDomain',
                            'allowNetworking ': 'all',
                            'quality ': 'high',
                            'bgcolor': 'ffffff',
                            'wmode': 'transparent'
                        },
                        'attributes': null,
                        'callback': null
                    };
                },

                'render': function(option){
                    option = $.extend(this.option(),option);
                    var id = option['id'];
                    option['container'].append(exports['String'].stringFormat(this.holder,id));
                    swfobject.embedSWF(option['src'], id, option['width'], option['height'],'9.0.0',
                        option['expressInstall'],option['falshvars'],option['params'],option['attributes'],
                        option['callback']);
                    return document.getElementById(id);
                },

                'stringify': function(data){
                    var result = [];
                    for(var key in data)
                        result.push(key + '='+ JSON.stringify(data[key].toString().replace(/"/gi,'\'')).replace(/^"|"$/gi,''));
                    return result.join('&amp;');
                }
            }
        };

        exports['Bridge'] = {
            'link': {
                'format': 'fission://action?',
                'prefix': 'fission',

                'makeLink': function(action, data) {
                    return this.format.replace('action', action) + encodeURIComponent(JSON.stringify(data));
                },

                'view': function(url, onReactivate, slient, title) {
                    if (!window['onReactivate'])
                        window['onReactivate'] = slient ? emptyFunction : (onReactivate || reloadFunction);

                    // 没有version
                    if (!~url.indexOf('version=')) {
                        url += ((!!~url.indexOf('?') ? '&' : '?') + 'version=' + (exports.URL.queryString('version') || '1.0'));
                    }

                    return this.makeLink('view', $.extend({
                        "url": url
                    }, title ? {
                        "title": title + ''
                    } : {}));
                },

                'logic': function(handler, params, callback, tag) {
                    var json = {
                        "handler": handler
                    };
                    if (params)
                        json["params"] = params;
                    if (callback)
                        json['callback'] = exports.Bridge.nativeCall(callback, tag);
                    return this.makeLink('logic', json);
                },

                'functional': function(handler, params, callback, tag) {
                    // TODO:: phoneMsg： JSON.stringify({"number": "88888", "message": "hahahahahha"})
                    var json = {
                        "handler": handler
                    };
                    if (params)
                        json["params"] = params;
                    if (callback)
                        json['callback'] = exports.Bridge.nativeCall(callback, tag);
                    return this.makeLink('functional', json);
                },

                'bussiness': function(handler, params, callback, tag) {
                    var json = {
                        "handler": handler
                    };
                    if (params)
                        json["params"] = params;
                    if (callback)
                        json['callback'] = exports.Bridge.nativeCall(callback, tag);
                    return this.makeLink('bussiness', json);
                }
            },

            'callNative': function(protocolLink) {
                window.location.href = protocolLink;
            },

            'nativeCall': function(callback, tag) {
                window[tag || (tag = this.link.prefix + (Math.random() + '').substr(2))] = callback || emptyFunction;
                return tag;
            },

            'setNative': function(title) {
                this.callNative(this.link.logic('setNative', {
                    "title": title
                }));
            },

            'goHome': function() {
                this.callNative(this.link.logic('gohome'));
            },

            'goBack': function() {
                this.callNative(this.link.logic('goback'));
            },

            'device': (function() {
                var ua = /(iPhone|iPad|Android)/gi.test(navigator.userAgent);
                if (!RegExp.$1)
                    return 'PC';
                switch (RegExp.$1.toString().toLowerCase()) {
                    case 'iphone':
                    case 'ipad':
                        return 'IOS';
                    case 'android':
                        return 'Android';
                    default:
                        return 'PC';
                }
            })()
        };

        exports['Promise'] = exports['OOP'].create('Promise',
            function(init) {
                this.thens = [];
                if (init)
                    this.then(init);
                this.resolve();
                return this;
            }, {
                resolve: function(data) {
                    var t = this.thens.shift(),
                        n;
                    if (!t) return;
                    setTimeout(exports['Function'].bind(function() {
                        t && (n = t.apply(null, arguments), n && this.resolve(n));
                    }, this, data), 0);
                    return this;
                },
                then: function(n) {
                    return this.thens.push(n), this;
                },

                wait: function(time) {
                    return this.then(this.delay(time));
                },

                delay: function(time) {
                    return function(timeout) {
                        setTimeout(this.resolve.bind(this), timeout);
                    }.bind(this, time);
                }
            });

        return exports;
    })(window, undefined);
});