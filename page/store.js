define(function(require) {
    var STRING_EMPTY = '',
        DISPLAY_NONE = ' style="display:none;"',
        Utility = require(JS_UTILITY),
        Cookie = Utility['Cookie'],
        OOP = Utility['OOP'],
        Promise = Utility['Promise'],
        stringFormat = Utility['String']['stringFormat'],
        DateTime = Utility['DateTime'],
        Flash = Utility['Flash'];
    var Kit = require(useJSComponent('kit')),
        I18N = Kit.use('I18N'),
        Body = Kit.use('Body'),
        Header = Body.Header,
        Footer = Body.Footer,
        Lazyload = Kit.use('Lazyload'),
        Trigger = Kit.use('Trigger'),
        Bussiness = Kit.use('Bussiness');
    var Popup = require('component/popup'); //弹层js

    var IMAGE_DOMAIN = DOMAIN_CONFIG['IMAGE_DOMAIN'],
        fullDefaultHead = IMAGE_DOMAIN + 'systemRes/img/default/nophoto.jpg';
    var language_NUM = {
            'en': 1,
            'ar': 2,
            'tr': 3,
            'es': 4,
            'pt': 5,
            'pl': 6,
            'in': 7
        },
        shopType_Num = {
            "ALL":4,
            'VIP': 1,
            'MOUNT': 2,
            'ITEM': 3
        },
        specialType_Num = {
            'Store_VIP': 1,
            'Store_SVIP': 2,
            'Store_Mount': 3,
            'Store_Gift': 4,
            'Store_Flower': 5,
            'Store_Exp': 6,
            'Store_Badge': 7,
            'Store_libao': 8
        };
    var flash_Num = {
        '1': 'moto',
        '3': 'camel',
        '4': 'mini',
        '5': 'lamborghini',
        '157': 'clap',
        '158': 'xiaolong',
        '159': 'yaoming',
        '160': 'woman'
    };
    //var flash_Num = {'1':'moto','3':'camel','4':'mini','5':'lamborghini','162':'clap','163':'xiaolong','164':'yaoming','165':'woman'};/*线上*/
    var TEMPLATE = {
        'MAIN': '<div class="wrap clearfix">\
                    {0}{1}{2}{3}{4}\
                 </div>',
        'STORE_TAB': '<div class="menu clearfix">\
                            <h2 class="readStart"></h2>\
                            <ul data-role="menuUl" class="readStart">\
                                <li class="active" data-i18n="Store_ALL">{{Store_ALL}}</li>\
                                <li><a href="/vip.shtml" target="_self" data-i18n="Store_NavVIP" data-stat="Store_NavVIP">{{Store_NavVIP}}</a></li>\
                            </ul>\
                        </div>',
        'RECOMMEND': '<div id="recommend"  data-key="' + shopType_Num.ALL + '" class="vip">\
                            <ul data-role="recommendUl" class="clearfix">\
                            </ul>\
                        </div>',
        'RECOMMEND_ITEM': '<li>\
                                <div class="vip_block newitem">\
                                    {0}{1}{2}\
                                    <div class="vip_data">\
                                        <h3>{3}</h3>\
                                        <p class="info" {11}>\
                                            {9}\
                                        </p>\
                                        {6}\
                                        <p class="price {7}"><strong>{4}</strong>{5}</p>\
                                        {10}{12}\
                                        <a data-buy="{8}" class="btn_buy" href="javascript:;" data-i18n="Store_Buy" data-stat="Store_Buy_{8}">{{Store_Buy}}</a>\
                                    </div>\
                                </div>\
                             </li>',
        'VIP': '<p id="vip" data-key="' + shopType_Num.VIP + '" class="banner"><a href="/vip.shtml" style="display:block;width:100%;height:100%;" data-stat="Store_NavVIP"></a></p>',
        'MOUNT': '<div id="mount" data-key="' + shopType_Num.MOUNT + '" class="product clearfix" name="mount">\
                        <div id="" class="title_mount"><h2 class="readStart" data-i18n="Store_MountMarket">{{Store_MountMarket}}</h2></div>\
                        <ul data-role="mountUl" class="clearfix"></ul>\
                  </div>',
        'MOUNT_ITEM': '<li>\
                            <div class="product_top">\
                                <img class="product_img" src="{0}" alt="{3}">\
                                {1}\
                                <span data-preview="{2}" data-name="{3}" class="preview" data-i18n="Store_Preview" data-stat="Store_Preview_{3}">{{Store_Preview}}</span>\
                                <span class="available" {10}>{{Store_RemainPurchaseTime}}{11}</span>\
                                <span class="available" {12}>{{Store_AvaliableUnit}}{13}</span>\
                            </div>\
                            <div class="product_bottom">\
                                <div class="product_info">\
                                    <div class="name_block">\
                                    <p class="product_name">\
                                    <span>{3}</span>\
                                    <span class="product_price_old" {4}><strong>{8}</strong>/<span class="price_day">{9}</span><span>{{Store_Days}}</span>\
                                    </p>\
                                    </div>\
                                    <p class="product_price"><strong>{5}</strong>/<span class="price_day">{6}</span><span>{{Store_Days}}</span></p>\
                                </div>\
                                <a data-buy="{7}" class="btn_buy" href="javascript:;" data-i18n="Store_Buy" data-stat="Store_Buy_{7}">{{Store_Buy}}</a>\
                            </div>\
                       </li>',
        'ITEM': '<div id="item" data-key="' + shopType_Num.ITEM + '" class="product clearfix">\
                        <div class="title_item"><h2 class="readStart" data-i18n="Store_Item">{{Store_Item}}</h2></div>\
                        <ul data-role="itemUl" class="clearfix"></ul>\
                  </div>',
        'ITEM_ITEM': '<li>\
                            <div class="product_top">\
                                <img class="product_img" src="{0}" alt="{3}">\
                                {1}\
                                <span data-audition="{2}" class="audition" data-i18n="Store_Audition" data-stat="Store_Audition_{2}">{{Store_Audition}}</span>\
                                <span class="available" {10}>{{Store_RemainPurchaseTime}}{11}</span>\
                                <span class="available" {12}>{{Store_AvaliableUnit}}{13}</span>\
                            </div>\
                            <div class="product_bottom">\
                                <div class="product_info">\
                                    <div class="name_block">\
                                    <p class="product_name">\
                                    <span>{3}</span>\
                                    <span class="product_price_old" {4}><strong>{8}</strong>{9}</span>\
                                    </p>\
                                    </div>\
                                    <p class="product_price"><strong>{5}</strong>{6}</p>\
                                </div>\
                                <a data-buy="{7}" class="btn_buy" href="javascript:;" data-i18n="Store_Buy" data-stat="Store_Buy_{7}">{{Store_Buy}}</a>\
                            </div>\
                       </li>',
        'POP': '<div class="popup" style="display: none;">\
                    <div class="wrap clearfix">\
                        <h2 data-role="caption" class="caption" data-i18n="Store_Notice">{{Store_Notice}}</h2>\
                        <div data-role="content" class="content">\
                            <h2 data-i18n="Store_TitleChooseAmount">{{Store_ChooseQuantityTobuy}}</h2>\
                            <div class="sel">\
                                <div class="sel_num">\
                                    <span data-role="minus" class="minus" data-stat="sel_num_minus">-</span>\
                                    <span class="num"><input data-role="num" type="text" value="1"></span>\
                                    <span data-role="plus" class="plus" data-stat="sel_num_plus">+</span>\
                                </div>\
                                <div class="spent_block" >\
                                    <h3 data-i18n="Store_Spend">{{Store_Spend}}:</h3>\
                                    <span data-role="price" class="price"></span>\
                                </div>\
                            </div>\
                            <p class="tips" style="display: none;"></p>\
                            <p class="warn" style="display: none;" data-i18n="Store_InsufficientFunds">{{Store_InsufficientFunds}}</p>\
                        </div>\
                        <div data-role="button" class="pop_button">\
                            <a href="javascript:;" data-role="pop-ok" class="ok" data-i18n="Store_OK" data-stat="Store_OK">{{Store_OK}}</a>\
                            <a href="javascript:;" data-role="close" class="cancel" data-i18n="Store_Cancel" data-stat="Store_Cancel">{{Store_Cancel}}</a>\
                        </div>\
                    </div>\
                    <div class="popBg"></div>\
                </div>',
        'POP_ITEM': '<div class="popup" style="display: none;">\
                    <div class="wrap clearfix">\
                        <h2 data-role="caption" class="caption" data-i18n="Store_Notice">{{Store_Notice}}</h2>\
                        <div data-role="content" class="content">\
                            <h2 data-i18n="Store_ChooseTimeTobuy">{{Store_ChooseTimeTobuy}}</h2>\
                            <div class="sel">\
                                <ul class="item_times">\
                                    <li class="active" data-role="item_time" data-times="1" data-i18n="Store_30days" data-stat="Store_30days">{{Store_30days}}</li>\
                                    <li data-role="item_time" data-times="2" data-i18n="Store_60days" data-stat="Store_60days">{{Store_60days}}</li>\
                                    <li data-role="item_time" data-times="3" data-i18n="Store_90days" data-stat="Store_90days">{{Store_90days}}</li>\
                                </ul>\
                                <div class="spent_block"  style="margin:10px auto 0;float:none;">\
                                    <h3 data-i18n="Store_Spend">{{Store_Spend}}:</h3>\
                                    <span data-role="price" class="price"></span>\
                                </div>\
                                <input data-role="num" type="hidden" value="1">\
                                <span style="display:none;" data-role="price"></span>\
                            </div>\
                            <p class="tips" style="display: none;"></p>\
                            <p class="warn" style="display: none;" data-i18n="Store_InsufficientFunds">{{Store_InsufficientFunds}}</p>\
                        </div>\
                        <div data-role="button" class="pop_button">\
                            <a href="javascript:;" data-role="pop-ok" class="ok" data-i18n="Store_OK" data-stat="Store_OK">{{Store_OK}}</a>\
                            <a href="javascript:;" data-role="close" class="cancel" data-i18n="Store_Cancel" data-stat="Store_Cancel">{{Store_Cancel}}</a>\
                        </div>\
                    </div>\
                    <div class="popBg"></div>\
                </div>'
    };
    console.log(shopType_Num.ALL)
    var Page = {
        run: function() {
            this.load();
            this.render();
            this.compose();
            this.bind();
            //this.start();
        },
        load: function() {
            this.cache = {};
        },
        render: function() {
            this.container = $('#container');
            this.container.i18nHTML(Header.html() + stringFormat(TEMPLATE.MAIN, TEMPLATE.STORE_TAB, TEMPLATE.RECOMMEND, TEMPLATE.VIP, TEMPLATE.MOUNT, TEMPLATE.ITEM) + Footer.html());
            this.wraper = $('.wrap');
            $('.menu_nav a[href="/store.shtml"]').attr({'target':'_self'}).addClass('active');
        },
        compose: function() {
            I18N.init({
                'onLocalize': this.localize.bind(this)
            });
            login_util.setCallback(this.identifyFlow.bind(this));
            Header.init({
                'container': this.container
            });
        },
        bind: function() {

        },
        start: function() {
            var promise = new Promise(function() {
                if (this.cache['mallTypes']) {
                    promise.resolve();
                } else {
                    Bussiness.postData('shop_type_list.fly', {
                        'language': language_NUM[I18N.language]
                    }, function(data) {
                        if (data && data.dataInfo) {
                            console.log(data);
                            this.cache['mallTypes'] = this.formatType(data.dataInfo);
                            promise.resolve();
                        }
                    }.bind(this));
                }
            }.bind(this)).then(function() {
                this.cache['mallDatas'] = this.cache['mallDatas'] || {};
                if (this.cache['mallDatas'][I18N.language]) {
                    promise.resolve();
                } else {
                    var shoptypeIds = Object.keys(this.cache['mallTypes']).join(',').replace(/type/gi, '');
                    Bussiness.postData('shop_index.fly', {
                        'language': language_NUM[I18N.language],
                        'shoptypeIds': shoptypeIds
                    }, function(data) {
                        console.log(data);
                        if (data && data.dataInfo) {
                            Object.keys(data.dataInfo).forEach(function(item, key) {
                                this.cache['mallDatas'][I18N.language] = this.cache['mallDatas'][I18N.language] || {};
                                this.cache['mallDatas'][I18N.language]['type' + item] = data.dataInfo[item];
                            }.bind(this));
                            promise.resolve();
                        }
                    }.bind(this))
                }
            }.bind(this)).then(function() {
                this.showRecommends();
                //this.showVipAD();
                this.showMounts();
                this.showItems();
                this.countDownInit();
                this.bindEvents(this.wraper);
                this.locateHash();
            }.bind(this));

            this.identifyFlow();
        },
        locateHash: function() {
            var url = window.location.toString();
            var id = url.split('#')[1];
            if (id) {
                $(window).scrollTop($('#' + id).offset().top);
            }
        },
        formatType: function(data) {
            var result = {};
            if (data['parent']) {
                result['type' + data['parent']['id']] = data['parent'];
            }
            if (Array.isArray(data['types'])) {
                data['types'].forEach(function(item, index) {
                    result['type' + item['current']['id']] = item['current'];
                });
            }
            return result;
        },
        bindEvents: function(oParent) {
            oParent && oParent.unbind('click').click(function(evt) {
                var target = $(evt.target),
                    pId, previewID;
                if (pId = target.data('buy')) {
                    this.popPurchase(this.cache['mallDatas'][I18N.language][pId.split('-')[0]][pId.split('-')[1]]);
                    //
                } else if (pId = target.data('preview')) {
                    if (this.mountResource) {
                        (previewID = this.mountResource[pId]) && this.previewSWF(previewID.webResource, shopType_Num.MOUNT, pId, target.data('name'));
                        return;
                    }
                    Bussiness.getJSON('car/car_data.json', function(data) {
                        this.mountResource = data;
                        (previewID = this.mountResource[pId]) && this.previewSWF(previewID.webResource, shopType_Num.MOUNT, pId, target.data('name'));
                    }.bind(this));

                } else if (pId = target.data('audition')) {
                    if (this.itemResource) {
                        (previewID = this.itemResource[pId]) && this.previewSWF(previewID.web, shopType_Num.ITEM, pId);
                        return;
                    }
                    Bussiness.getJSON('gift/gift_data.json', function(data) {
                        this.itemResource = data;
                        (previewID = this.itemResource[pId]) && this.previewSWF(previewID.web, shopType_Num.ITEM, pId);
                    }.bind(this));
                }
            }.bind(this));
        },
        showRecommends: function() {
            this.recommend = $('#recommend');
            var key = this.recommend.data('key');
            if(this.cache['mallDatas'][I18N.language]['type' + key]==undefined){
                return
            };
            this.recommend.find('[data-role="recommendUl"]').i18nHTML(this.cache['mallDatas'][I18N.language]['type' + key].map(function(item, i) {
                if (i > 3) return;
                var isSamePrice = item.price.current == item.price.original ? true : false,
                    old_html = (isSamePrice || item.price.original == 0) ? '' : stringFormat('<p class="price_old"><strong>{1}</strong>{0}</p>', (0 == item.expire) ? '' : '/<span class="price_day">' + item.expire + '</span><span>' + i18nTranslate('Store_Days') + '</span>', item.price.original),
                    flagImg = item.label && item.label.icon ? '<img class="flag" src="' + IMAGE_DOMAIN + item.label.icon + '" alt="">' : '',
                    bgImg = item.background && item.background.image ? '<img class="bg" src="' + IMAGE_DOMAIN + item.background.image + '" alt="background">' : '',
                    photoImg = item.pic ? '<img class="photo" src="' + IMAGE_DOMAIN + item.pic + '" alt="' + item.name + '">' : '',
                    remainTpl = '<p class="remain" {1}>{0}</p>',
                    rewardTpl = '<span><em>{0}×{1}</em></span>',
                    remainTime = item.period ? stringFormat(remainTpl, i18nTranslate('Store_RemainPurchaseTime') + ' ' +this.formatTime(item.period.endInterval), ' data-time=' + item.period.endInterval) : stringFormat(remainTpl, '', DISPLAY_NONE),
                    remainCount = item.stock ? stringFormat(remainTpl, i18nTranslate('Store_AvaliableUnit') + (item.stock.total - item.stock.sold), '') : stringFormat(remainTpl, '', DISPLAY_NONE),
                    rewardHTML = '';

                item.rewards && item.rewards.forEach(function(value, k) {
                    if (k < 4) {
                        rewardHTML += stringFormat(rewardTpl, value.name, [1, 2].indexOf(value.special) > -1 ? value.expire + ' ' +i18nTranslate('Store_Days') : value.number);
                    }

                });
                return stringFormat(TEMPLATE.RECOMMEND_ITEM, flagImg, bgImg, photoImg,
                    item.name, item.price.current, (0 == item.expire) ? '' : '/<span class="price_day">' + item.expire + '</span><span>'+ i18nTranslate('Store_Days') + '</span>', old_html,
                    isSamePrice ? '' : 'no_margin',
                    'type' + key + '-' + i,
                    rewardHTML, remainTime,
                    item.rewards && item.rewards.length > 0 ? '' : DISPLAY_NONE,
                    remainCount
                );
            }.bind(this)).join(''));

        },
        countDownInit: function() {
            this.wraper.find(['data-time']).each(function(i, item) {
                if (item.data('time') < 60000) {
                    item.timer = window.setInterval(function() {
                        var nTime = item.data('time');
                        if (nTime > 0) {
                            nTime -= 1000;
                            item.data('time', nTime);
                            item.html(nTime / 1000 + i18nTranslate('Store_Seconds'));
                        } else {
                            item.timer && window.clearInterval(item.timer);
                        }
                    }, 1000);
                }
            });
        },
        formatTime: function(time) {
            var day = 24 * 60 * 60 * 1000,
                hour = 60 * 60 * 1000,
                minutes = 60 * 1000,
                timeFormat;
            if ((timeFormat = parseInt(time / day)) >= 1) {
                timeFormat +=  ' '+i18nTranslate('Store_Days');
            } else if ((timeFormat = +parseInt(time / hour)) >= 1) {
                timeFormat += ' '+i18nTranslate('Store_Hours');
            } else if ((timeFormat = parseInt(time / minutes)) >= 1) {
                timeFormat += ' '+i18nTranslate('Store_Minutes');
            } else {
                timeFormat = time <= 0 ? 0 : parseInt(time / 1000) + ' '+ i18nTranslate('Store_Seconds');
            }
            return timeFormat;
        },
        showMounts: function() {
            this.mount = $('#mount');
            var key = this.mount.data('key'),mountCache = this.cache['mallDatas'][I18N.language]['type' + key];
            if(!mountCache) return;
            this.mount.find('[data-role="mountUl"]').i18nHTML(mountCache.map(function(item, i) {
                //if (i > 3) return;
                var isSamePrice = item.price.current == item.price.original ? true : false;

                return stringFormat(TEMPLATE.MOUNT_ITEM, item.pic ? IMAGE_DOMAIN + item.pic : '',
                    item.label && item.label.icon ? stringFormat('<img class="flag" src="{0}" alt="">', IMAGE_DOMAIN + item.label.icon) : '',
                    item.specialId,
                    item.name, (isSamePrice || item.price.original == 0) ? DISPLAY_NONE : '',
                    item.price.current,
                    item.expire,
                    'type' + key + '-' + i,
                    item.price.original,
                    item.expire,
                    remainTime = item.period ? ' data-time=' + item.period.endInterval : DISPLAY_NONE,
                    item.period ? this.formatTime(item.period.endInterval) : '',
                    item.stock ? '' : DISPLAY_NONE,
                    item.stock ? item.stock.total - item.stock.sold : ''
                );
            }.bind(this)).join(''));

        },
        showItems: function() {
            this.item = $('#item');
            var key = this.item.data('key'),itemCache = this.cache['mallDatas'][I18N.language]['type' + key];
            if(!itemCache) return;
            this.item.find('[data-role="itemUl"]').i18nHTML(itemCache.map(function(item, i) {
                if (i > 3) return;
                var isSamePrice = item.price.current == item.price.original ? true : false;

                return stringFormat(TEMPLATE.ITEM_ITEM, item.pic ? IMAGE_DOMAIN + item.pic : '',
                    item.label && item.label.icon ? stringFormat('<img class="flag" src="{0}" alt="">', IMAGE_DOMAIN + item.label.icon) : '',
                    item.specialId,
                    item.name,
                    isSamePrice ? DISPLAY_NONE : '',
                    item.price.current,
                    '', //item expire unshown
                    'type' + key + '-' + i,
                    item.price.original || '',
                    '', //item expire unshown
                    remainTime = item.period ? ' data-time=' + item.period.endInterval : DISPLAY_NONE,
                    item.period ? this.formatTime(item.period.endInterval) : '',
                    item.stock ? '' : DISPLAY_NONE,
                    item.stock ? item.stock.total - item.stock.sold : ''
                );
            }.bind(this)).join(''));

        },
        showVipAD: function() {},
        popPurchase: function(data) {
            if (!user_util.user_info) {
                user_util.is_login(true);
            } else {
                console.log(data);
                if (data.stock && data.stock.total == data.stock.sold) { // all sold
                    Popup.show({
                        'template': TEMPLATE.POP,
                        'caption': i18nTranslate('Store_TitleInfficient'),
                        'content': i18nTranslate('Store_TotalCountNotEnough'),
                        'buttons': '<a data-role="close" class="ok">' + i18nTranslate('Store_OK') + '</a>'
                    });
                    this.bindButton();
                    return false;
                } else if (data.period && data.period.endInterval <= 0) { //out of date
                    Popup.show({
                        'template': TEMPLATE.POP,
                        'caption': i18nTranslate('Store_TitleInfficient'),
                        'content': i18nTranslate('Store_OutOfDate'),
                        'buttons': '<a data-role="close" class="ok">' + i18nTranslate('Store_OK') + '</a>'
                    });
                    this.bindButton();
                    return false;
                } else if (data.period && data.period.beginInterval > 0) { //not start yet
                    Popup.show({
                        'template': TEMPLATE.POP,
                        'caption': i18nTranslate('Store_TitleInfficient'),
                        'content': i18nTranslate('Store_HasNotStarted') + '<br/>' + stringFormat(i18nTranslate('Store_StartTime'), DateTime.showtime(new Date(data.period.startTime))),
                        'buttons': '<a data-role="close" class="ok">' + i18nTranslate('Store_OK') + '</a>'
                    });
                    this.bindButton();
                    return false;
                } else {
                    data.shopTypeId == shopType_Num['MOUNT'] && data.specialType != specialType_Num['Store_libao'] ? Popup.show({
                        'template': TEMPLATE.POP_ITEM
                    }) : Popup.show({
                        'template': TEMPLATE.POP
                    });
                    this.bindButton(data);
                    var singlePrice = data.price.current || 0;
                    //var totalLeft = data.stock ? data.stock.total - data.stock.Sold : Number.POSITIVE_INFINITY;
                    Popup.price.html(singlePrice); //set price
                    data.trriger && Popup.container.find('.tips').html(stringFormat(i18nTranslate('Store_BuyForGift'), data.name, data.trriger.name)).show(); //set trigger tips
                    this.checkBalance(singlePrice);
                }

                Popup.content.bind('input', function(evt) {
                    var target = $(evt.target);
                    if ('num' == target.data('role')) {
                        var val = parseInt(target.val()),
                            totalPrice = isNaN(val) ? 0 : val * singlePrice;
                        target.attr('value', totalPrice / singlePrice);
                        Popup.price.html(totalPrice);
                        this.checkBalance(totalPrice);
                    }
                }.bind(this));

                Popup.content.click(function(evt) {
                    var target = $(evt.target),
                        role = target.data('role'),
                        totalPrice;
                    if (!role) return;
                    var inputValue = parseInt(Popup.inputNum.val());
                    switch (role) {
                        case 'minus':
                            inputValue > 1 ? inputValue-- : 1;
                            Popup.inputNum.val(isNaN(inputValue) ? inputValue = 1 : inputValue);
                            Popup.inputNum.attr('value', inputValue);
                            totalPrice = inputValue * singlePrice;
                            Popup.price.html(totalPrice);
                            this.checkBalance(totalPrice);
                            return;
                        case 'plus':
                            Popup.inputNum.val(isNaN(inputValue) ? inputValue = 1 : ++inputValue);
                            Popup.inputNum.attr('value', inputValue);
                            totalPrice = inputValue * singlePrice;
                            Popup.price.html(totalPrice);
                            this.checkBalance(totalPrice);
                            return;
                        case 'item_time':
                            target.addClass('active').siblings().removeClass('active');
                            var item_time = target.data('times');
                            Popup.inputNum.val(item_time);
                            Popup.price.html(item_time * singlePrice)
                    }
                }.bind(this));
            }
        },
        checkBalance: function(balance) {
            if (balance > this.getBanlance()) { //check balance only
                Popup.container.find('.warn').html(i18nTranslate('Store_InsufficientFunds')).show();
            } else {
                Popup.container.find('.warn').hide();
            }
        },
        getBanlance: function() {
            return user_util.user_info.returnBalance + user_util.user_info.balance;
        },
        bindButton: function(data) {
            Popup.button.click(function(evt) {
                var target = $(evt.target),
                    role = target.data('role');
                if (!role) return;
                switch (role) {
                    case 'pop-ok':
                        this.confirmPurchase(data.id, Popup.price.html());
                        return;
                    case 'confirm-ok':
                        this.requestPurchase(data.id, data.name, Popup.inputNum.val(), data.shopTypeId);
                        return;
                    case 'close':
                        Popup.close();
                        return;
                    case 'recharge':
                        setTimeout(window.location.reload(), 1000);
                        return;
                    case 'back':
                        Popup.back();
                        return;
                }
            }.bind(this));
        },
        confirmPurchase: function(id, price) {
            if (price == 0) return;
            if (Popup.container.find('.warn').is(':visible')) {
                Popup.rePaint({
                    'caption': i18nTranslate('Store_TitleInfficient'),
                    'content': i18nTranslate('Store_BalanceNotEnough'),
                    'buttons': '<a href="/myrecharge.shtml" target="_blank" data-role="recharge" class="recharge">' + i18nTranslate('Store_Charge') + '</a><a data-role="close" class="cancel">' + i18nTranslate('Store_Cancel') + '</a>',
                    'closeHandler': null
                });
                return;
            }
            var tpl = '<p>' + i18nTranslate('Store_ConfirmThePayments') + '</p>';
            Popup.rePaint({
                'caption': i18nTranslate('Store_Notice'),
                'content': stringFormat(tpl, price),
                'buttons': '<a data-role="confirm-ok" class="ok" data-stat="Btn_Confirm_Ok">' + i18nTranslate('Store_OK') + '</a><a data-role="close" class="cancel" data-stat="Btn_Confirm_Cancel">' + i18nTranslate('Store_Cancel') + '</a>',
                'closeHandler': null
            });
        },
        requestPurchase: function(id, name, num, isItem) {
            Bussiness.postData('shop_buy.fly', {
                'shopId': id,
                'num': num
            }, function(data) {
                switch (data.code) {
                    case 0:
                        var content = stringFormat(i18nTranslate('Store_CongratulationGotGoods'), name);
                        isItem != shopType_Num['ITEM'] ? content += '.<br/>' + i18nTranslate('Store_ValidUntil') + DateTime.showtime(new Date(data.dataInfo.expire)) : content += '.<br/> ' + i18nTranslate('Store_BuySuccessItemIntoBag');
                        Popup.rePaint({
                            'caption': i18nTranslate('Store_TitleSuccess'),
                            'content': content,
                            'buttons': '<a data-role="close" class="ok" data-stat="Store_Pop_Close">' + i18nTranslate('Store_OK') + '</a>',
                            'closeHandler': null
                        });
                        console.log('购买成功');
                        return;
                    case 35:
                        Popup.rePaint({
                            'caption': i18nTranslate('Store_TitleInfficient'),
                            'content': i18nTranslate('Store_BalanceNotEnough'),
                            'buttons': '<a href="/myrecharge.shtml" target="_blank" data-role="recharge" class="recharge">' + i18nTranslate('Store_Charge') + '</a><a data-role="close" class="cancel" data-stat="Store_Pop_BtnCancel">' + i18nTranslate('Store_Cancel') + '</a>',
                            'closeHandler': null
                        });
                        console.log('余额不足');
                        return;
                    case 2001:
                        Popup.rePaint({
                            'caption': i18nTranslate('Store_TitleInfficient'),
                            'content': i18nTranslate('Store_TotalCountNotEnough'),
                            'buttons': '<a data-role="close" class="ok" data-stat="Store_Pop_Close">' + i18nTranslate('Store_OK') + '</a>',
                            'closeHandler': null
                        });
                        console.log('库存不足');
                        return;
                    case 2002:
                        Popup.rePaint({
                            'caption': i18nTranslate('Store_TitleInfficient'),
                            'content': i18nTranslate('Store_NotExistOrOffShore'),
                            'buttons': '<a data-role="close" class="ok" data-stat="Store_Pop_Close">' + i18nTranslate('Store_OK') + '</a>',
                            'closeHandler': null
                        });
                        console.log('不存在或已下架');
                        return;
                    case 2003:
                        Popup.rePaint({
                            'caption': i18nTranslate('Store_TitleInfficient'),
                            'content': i18nTranslate('Store_HasNotStarted'),
                            'buttons': '<a data-role="close" class="ok" data-stat="Store_Pop_Close">' + i18nTranslate('Store_OK') + '</a>',
                            'closeHandler': null
                        });
                        console.log('未到购买时间');
                        return;
                    case 2004:
                        Popup.rePaint({
                            'caption': i18nTranslate('Store_TitleInfficient'),
                            'content': i18nTranslate('Store_OutOfDate'),
                            'buttons': '<a data-role="close" class="ok" data-stat="Store_Pop_Close">' + i18nTranslate('Store_OK') + '</a>',
                            'closeHandler': null
                        });
                        console.log('购买时间已过期');
                        return;
                    default:
                        Popup.rePaint({
                            'caption': i18nTranslate('Store_TitleInfficient'),
                            'content': i18nTranslate('Store_FailToBuy'),
                            'buttons': '<a data-role="close" class="ok" data-stat="Store_Pop_Close">' + i18nTranslate('Store_OK') + '</a>',
                            'closeHandler': null
                        });
                        console.log('购买失败');
                        return;
                }
            }.bind(this))
        },
        previewSWF: function(id, type, specialId, name) {
            if (!/(\.swf)$/.test(id)) return;

            if (this.instance) {
                $(this.instance).css({
                    'width': '1200px',
                    'height': '400px'
                });
                $('#mallMask').css({
                    'width': '100%',
                    'height': '100%'
                });
                if (type == shopType_Num['MOUNT']) {
                    this.instance.StartDrive(IMAGE_DOMAIN + id, flash_Num[specialId], name, true);
                } else {
                    this.instance.StartMagic(IMAGE_DOMAIN + id, flash_Num[specialId], '', true);
                }
            } else {
                this.container.append($('<div id="mallMask" class="store_mask"><a class="preview_clz"></a></div>'));
                this.instance = Flash.render({
                    'container': this.container.find('#mallMask'),
                    'src': '/room/swf/magic.swf',
                    'id': 'mountSWF',
                    'width': '1200',
                    'height': '400',
                    'callback': function() {
                        new Promise().wait(200).then(function() {
                            if (type == shopType_Num['MOUNT']) {
                                this.instance.StartDrive(IMAGE_DOMAIN + id, flash_Num[specialId], name, true);
                            } else {
                                this.instance.StartMagic(IMAGE_DOMAIN + id, flash_Num[specialId], '', true);
                            }
                        }.bind(this)).resolve();
                    }.bind(this)
                });

                $('#mallMask .preview_clz').click(function() {
                    this.instance.EndMagic();
                    $(this.instance).css({
                        'width': '0',
                        'height': '0'
                    });
                    $('#mallMask').css({
                        'width': '0',
                        'height': '0',
                        'overflow': 'hidden'
                    });
                }.bind(this));
            }
        },
        localize: function() {
            var language = I18N.language;
            var menuHTML = '<li class="active">' + i18nTranslate('Store_ALL') + '</li><li><a href="/vip.shtml" target="_self" data-stat="Store_NavVIP">' + i18nTranslate('Store_NavVIP') + '</a></li>';
            $('[data-role="menuUl"]').html(menuHTML);
            this.start();
            if (top_util) {
                //top_util.reset_popup_message();
            }
        },
        'identifyFlow': function() {
            this.promise = new Promise(this.identify.bind(this)) //move method identity to utility
                .then(this.identified.bind(this));
        },

        'identify': function() {
            this.identity = null;
            var user = Cookie.get(Cookie.key['user_info']);
            if (user)
                return this.identity = JSON.parse(user);
            else {
                var userName = Cookie.get(Cookie.key['login_name']);
                if (!userName)
                    return 'anonymous';
                Bussiness.postData('user_init_user_info.fly', {
                    'loginName': userName
                }, function(data) {
                    if (data && data.code == 0)
                        this.promise.resolve(this.identity = data); //todo: JSON.stringify(dta)
                    else
                        this.promise.resolve();
                }.bind(this), function() {
                    this.promise.resolve();
                }.bind(this));
            }
        },

        'identified': function() {
            Header.identified(this.identity);
        }
    };

    I18N.init(null, true).localize(null, Page.run.bind(Page), true);
});