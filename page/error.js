define(function(require){
    var Utility =require(JS_UTILITY),
        Cookie = Utility['Cookie'],
        Promise = Utility['Promise'];
    var Kit = require(useJSComponent('kit')),
        I18N = Kit.use('I18N'),
        Body=Kit.use('Body'),
        Header=Body.Header;
    var TEMPLATE={
        'MAIN':'<div class="page_undefind">\
                            <div class="page404_img"></div>\
                            <a class="btn_base" href="/index.shtml" target="_self" data-i18n="Error_Return" >{{Error_Return}}</a>\
                </div>'
    };

    var Page = {
        run:function(){
            this.load();
            this.render();
            this.compose();
            this.bind();
            this.start();
            this.identifyFlow();
        },
        load:function(){

        },
        render:function(){
            this.container = $('#container');
            this.container.i18nHTML(Header.html() + TEMPLATE.MAIN);
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
        },

        'identifyFlow': function() {
            this.promise = new Promise(this.identify.bind(this)).then(this.identified.bind(this));

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
                        this.promise.resolve(this.identity = data);
                    else
                        this.promise.resolve();
                }.bind(this), function() {
                    this.promise.resolve();
                }.bind(this));
            }
        },
        'identified': function() {
            //if(this.identity)
           // Header.identified(this.identity);
           $("#top_self_living").hide();
         
        }
    };
    I18N.init(null,true).localize(null,Page.run.bind(Page),true)
});