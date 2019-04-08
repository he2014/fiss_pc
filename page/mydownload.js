define(function(require){
    var STRING_EMPTY = '',
        DISPLAY_NONE = ' style="display:none;"',
        Utility =require(JS_UTILITY),
        Cookie = Utility['Cookie'],
        OOP=Utility['OOP'],
        Promise = Utility['Promise'],
        stringFormat = Utility['String']['stringFormat'],
        DateTime = Utility['DateTime'],
        Flash = Utility['Flash'];
    var Kit = require(useJSComponent('kit')),
        I18N = Kit.use('I18N'),
        Body=Kit.use('Body'),
        Header=Body.Header,
        Footer=Body.Footer,
        Lazyload=Kit.use('Lazyload'),
        Trigger=Kit.use('Trigger'),
        Bussiness = Kit.use('Bussiness');
    var Popup = require('component/popup'),UserTop=require('component/userTop');

    var IMAGE_DOMAIN =DOMAIN_CONFIG['IMAGE_DOMAIN'],fullDefaultHead = IMAGE_DOMAIN + 'systemRes/img/default/nophoto.jpg';
    require('js/reference/blockUI.js');
    require('js/reference/onreg.draggable.min.js');
    require('js/reference/upfile.js');
    require('js/reference/ajaxfileupload.js');
    require('js/reference/dialogV3.js');
    require('cssComponent/dialog.css');


    var TEMPLATE={
        'MAIN': '<div id="footer" class="footer clearfix">\
                    <div class="footerScreen">\
                    <div class="footer_app">\
                        <div class="clearfix footerPosBox">\
                            <div class="footer_dl_banner readStart">\
                                <img src="/resource/static/image/downloadImg.png" alt="" />\
                            </div>\
                            <div class="footer_dl_code readStart">\
                                <h2 data-i18n="Footer_EverydayLive">{{Footer_EverydayLive}}</h2>\
                                <h3 data-i18n="Footer_GetApp2">{{Footer_GetApp2}}</h3>\
                                <ul class="clearfix" style="margin-top:20px">\
                                    <li class="readStart">\
                                        <a href="http://app.appsflyer.com/id917213988?pid=7nujoom_app&c=promotion_900041" target="_blank"></a>\
                                        <p><img src="/resource/static/image/index/app_apple_code.png" alt="" /></p>\
                                    </li>\
                                    <li class="readEnd">\
                                        <a href="http://app.appsflyer.com/com.fission.sevennujoom?pid=7Nujoom&c=promotion=90004" target="_blank"></a>\
                                        <p><img src="/resource/static/image/index/app_google_code.png" alt="" /></p>\
                                    </li>\
                                </ul>\
                                <a class="btn_apk_dl" href="https://www.7nujoom.com/resource/package/7NUJOOM.apk"><img src="/resource/static/image/index/app_apk_code.png" alt="" /></a>\
                            </div>\
                        </div>\
                    </div>\
                    </div>\
                    <div class="footer_wrap">\
                        <div class="footer_box">\
                            <ul class="footer_info clearfix">\
                                <li>\
                                    <a href="javascript:;" class="heartLink">\
                                        <h6 data-i18n="Footer_PHTitle">{{Footer_PHTitle}}</h6>\
                                        <p data-i18n="Footer_PHInfo">{{Footer_PHInfo}}</p>\
                                    </a>\
                                </li>\
                                <li>\
                                    <a href="javascript:;" class="circleLink">\
                                        <h6 data-i18n="Footer_GLETitle">{{Footer_GLETitle}}</h6>\
                                        <p data-i18n="Footer_GLEInfo">{{Footer_GLEInfo}}</p>\
                                    </a>\
                                </li>\
                                <li>\
                                    <a href="javascript:;" class="personLink">\
                                        <h6 data-i18n="Footer_HSTitle">{{Footer_HSTitle}}</h6>\
                                        <p data-i18n="Footer_HSinfo">{{Footer_HSinfo}}</p>\
                                    </a>\
                                </li>\
                            </ul>\
                        </div>\
                    </div>\
                </div>'
    };

    var Page= {
        run:function(){
            this.load();
            this.render();
            this.compose();
            this.bind();
            this.start();
        },
        load:function(){},
        render:function(){
            this.container = $('#container');
            this.container.i18nHTML(Header.html() + TEMPLATE.MAIN );

        },
        compose:function(){
            login_util.setCallback(this.identifyFlow.bind(this));
            Header.init({
                'container': this.container
            });
        },
        bind:function(){

        },
        start:function(){
            this.identifyFlow();
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
            var _this=this;
            //Header.identified(this.identity);
            UserTop.identifyFlow();
            if(this.identity){


            }else{
               
            }
        }
};


    I18N.init(null, true).localize(null, Page.run.bind(Page), true);
});