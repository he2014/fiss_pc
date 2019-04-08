/**
 * Created by Vicky on 2016/8/30.
 */
define(function(require,exports,module){
    require('cssPage/helpTop.css');
    var Kit = require(useJSComponent('kit')),
        Body=Kit.use('Body'),
        Header=Body.Header,
        Bussiness = Kit.use('Bussiness');
    var Utility =require(JS_UTILITY),
        Promise = Utility['Promise'],
        Cookie = Utility['Cookie'],
        stringFormat = Utility['String']['stringFormat'];
    var TEMPLATE = {
        'MAIN' : '<div class="user_wrap">\
                    <div class="support_banner"></div>\
                    <div class="user_sel">\
                        <ul class="user_type">\
                            <li id="support_question" class="support_question">\
                                <a href="/help.shtml" data-i18n="Support_Question">{{Support_Question}}</a>\
                            </li>\
                            <li id="support_feedback" class="support_feedback">\
                                <a href="/feedback.shtml" data-i18n="Support_Feedback">{{Support_Feedback}}</a><em></em>\
                            </li>\
                            <li id="support_contact" class="support_contact">\
                                <a href="/contact.shtml" data-i18n="Support_Contact">{{Support_Contact}}</a><em></em>\
                            </li>\
                        </ul>\
                    </div>\
                </div>'
           
    };
    var helpTop =function() {
        return {
            init:function(option){
                this.load(option);
                this.render();
                this.compose();
                this.bind();
                this.start();
            },
            load:function(option){
                $.extend(this,option);
            },
            render:function(){
                this.container = this.container || $('#container');
                this.container.find('.'+this.cur).addClass('user_li_cur ');
            },
            compose:function(){

            },
            bind:function(){

            },
            start:function(){
                this.promise = new Promise(this.identify.bind(this)).then(this.identified.bind(this));
            },
            html:function(){
                return TEMPLATE.MAIN;
            },
            identify:function() {
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
            identified:function(){
               // Header.identified(this.identity);
            }
        }
    }();
    module.exports = helpTop;
});