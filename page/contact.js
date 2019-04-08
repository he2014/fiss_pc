define(function(require){
    var Utility =require(JS_UTILITY),
        Cookie = Utility['Cookie'],
        OOP=Utility['OOP'],
        Promise = Utility['Promise'],
        stringFormat = Utility['String']['stringFormat'],
        Bridge=Utility['Bridge'];
    var Kit = require(useJSComponent('kit')),
        I18N = Kit.use('I18N'),
        Body=Kit.use('Body'),
        Header=Body.Header,
        Footer=Body.Footer,
        _nav = Body.nav,
        _task = Body.TASKS,
        Bussiness = Kit.use('Bussiness');
    var Popup = require('component/popup'),
        helpTop=require('component/helpTop');
    var TEMPLATE={
        'MAIN':'<div class="user_wrap">\
                        <div class="new_user_con new_user_con2">\
                            <div class="support_box3">\
                                <div class="support_web_site"></div>\
                                <div class="support_conus_div support_right">\
                                    <em class="support_conus"><a href="mailto:contact@fissionjoy.com"></a></em><label data-i18n="Support_Contact_Email">{{Support_Contact_Email}}</label><b id="contact_email">contact@fissionjoy.com</b>\
                                    <div class="support_tab">\
                                            <span>Fission Technology Co., Limited</span>\
                                            <span>Room 1501(112), 15/F., SPA Center, 53-55 Lockhart Road, Wanchai, Hong Kong</span>\
                                            <span>https://www.facebook.com/7nujoom.Customer.service/</span>\
                                    </div>\
                                </div>\
                                <div class="support_conus_div support_center">\
                                    <div data-href="" data-layout="standard" data-action="like" data-show-faces="false" data-share="false"></div>\
                                    <em class="support_fff"><a href="https://www.facebook.com/7nujoom" target="_blank"></a></em><label data-i18n="Support_Contact_Facebook">{{Support_Contact_Facebook}}</label><b id="contact_facebook">7nujoom.facebook</b>\
                                </div>\
                                <div class="support_conus_div support_left">\
                                    <em class="support_ttt"><a href="https://twitter.com/7nujoom" target="_blank"></a></em><label data-i18n="Support_Contact_Twitter">{{Support_Contact_Twitter}}</label><b id="contact_twitter">7nujoom.twitter</b>\
                                </div>\
                            </div>\
                        </div>\
                </div>',
           "contents":'<div class="contents"></div>' ,
           "Task":'<div class="hidden" id="task_tan"></div>\
				<div class="task_con" data-role ="task"></div>'
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
            this.container.i18nHTML(Header.html() +TEMPLATE.contents+Footer.html());
          	this.container.find('.contents').i18nHTML(helpTop.html()+TEMPLATE.MAIN +_nav.html()+TEMPLATE.Task);
          	this.container.find('[data-role="task"]').i18nHTML(_task.html());
        },
        compose:function(){
            login_util.setCallback(this.identifyFlow.bind(this));
            Header.init({
                'container': this.container
            });
             _nav.init({
                'container': this.container
            });
            _task.init({
            	"container":this.container
            })
            helpTop.init({'container':this.container,'cur':'support_contact'});
        },
        bind:function(){

        },
        start:function(){
        },
        'message':function(){
        	Bussiness.getData('service/message/v3/sms/page/0/2',function(data){
        			if(data.code==0){
        				 this.messages_length = data['dataInfo']['list'].length;
        			}
                  this.promise.resolve();
			}.bind(this),null,true);
        },

        'identifyFlow': function() {
            this.promise = new Promise(this.identify.bind(this)).then(this.message.bind(this)).then(this.identified.bind(this));

        },

        'identify': function() {
            this.identity = null;
            var user = Cookie.get(Cookie.key['user_info']);
            if (user)
                return this.identity = JSON.parse(user);
            // else {
            //     var userName = Cookie.get(Cookie.key['login_name']);
            //     if (!userName)
            //         return 'anonymous';
            //     Bussiness.postData('user_init_user_info.fly', {
            //         'loginName': userName
            //     }, function(data) {
            //         if (data && data.code == 0)
            //             this.promise.resolve(this.identity = data); //todo: JSON.stringify(dta)
            //         else
            //             this.promise.resolve();
            //     }.bind(this), function() {
                    this.promise.resolve();
            //     }.bind(this));
            // }
        },
        'identified': function() {
			Header.identified(this.identity);
            _nav.identified(this.identity,this.messages_length);
            _task.identified(this.identity);
        }
    };
    I18N.init(null,true).localize(null,Page.run.bind(Page),true)
});