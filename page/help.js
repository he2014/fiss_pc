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
        _task =Body.TASKS,
        Bussiness = Kit.use('Bussiness');
    var Popup = require('component/popup'),
        helpTop=require('component/helpTop');
    var TEMPLATE={
        'MAIN':'<div class="user_wrap">\
                        <div class="new_user_con">\
                            <div class="new_support_list">\
                                <div class="new_support_right">\
                                    <ul id="support_help_index">\
                                    </ul>\
                                </div>\
                                <div class="new_support_left">\
                                    <ul id="support_answer">\
                                    </ul>\
                                </div>\
                            </div>\
                        </div>\
                </div>',
        "contents":'<div class="contents"></div>',
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
            window["List_num"]=0;
            window["List_Detail"]=3;
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
            helpTop.init({'container':this.container,'cur':'support_question'});
        },
        bind:function(){

        },
        start:function(){
            $(".language_nav").bind("click",function(){
                Page.identifyFlow();
            });
           
            
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
            this.promise = new Promise(this.identify.bind(this)).then(this.message.bind(this)).then(this.identified.bind(this)).then(this.SuccessData.bind(this)).then(this.ListsAll.bind(this));
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
            //if(this.identity)
            Header.identified(this.identity);
             _nav.identified(this.identity,this.messages_length);
            _task.identified(this.identity);
            var lang=Page.changeLang();
            //console.log(lang);
           // var URl="help/"+lang+"_web_help_type_language_data.json";
            //var URl1="help/"+lang+"_web_help_detail_language_data.json";
            Bussiness.getData("data/static/v4/?help",function(data){
                if(data.code == 0){
                    var helps = data.dataInfo.help.d;
                    window["ListDatas"]=helps;
                    window["Type_lang"] ='';
                    this.promise.resolve();
                }
            }.bind(this),null,true);

            this.promise.resolve();


        },
        'SuccessData':function(){
            if(!window["ListDatas"] || !window["Type_lang"] || !window["lang_Content"]) {
                // Page.identifyFlow();
            }
        },
        'ListsAll':function(){
            //console.log(window["ListDatas"]);
            $('#support_help_index').html('');
            if( window["ListDatas"]) {
                var lang=Page.changeLang();
                window["ListDatas"].forEach(function (val, index) {
                    var name = val.name;
                   // var ; //= window["Type_lang"][val.id];
                   // language_en[index]
                    if (lang=='en') {
                        name = val.lg.en; //language_obj.type;
                    }else{
                        name = val.lg.ar
                    }
                    window["List_Name"] = name;
                    var num = index, ids = val.id;
                    html = "<li id='dir_help_" + index + "'>" + name + "</li>";
                    $('#support_help_index').append(html);
                    $('#dir_help_' + num).bind("click", function () {
                        window["List_num"] = num;
                        window["List_Detail"] = ids;
                        Page.changeContent(num, ids);
                        //console.log(window["List_num"]+","+window["List_Detail"])
                    });
                    Page.changeContent(window["List_num"], window["List_Detail"]);
                    //console.log(window["List_num"]+",,,"+window["List_Detail"])
                });
            }
        },
        'changeContent':function(num,ids){
            var langs=Page.changeLang();
            var questionIndex = 0;
            $('#dir_help_' + num).addClass("sup_on").siblings().removeClass("sup_on");
            $('#support_answer').html("");
            var html='';
            window["ListDatas"].forEach(function(objs,index) {
                if (objs.id == ids) {
                    $.each(objs.ds, function(idx, help_data_id) {
                        var question;
                       if(langs =="en"){
                           question = help_data_id.lg.en;
                       }else{
                           question = help_data_id.lg.ar;
                       };
                       // var question = window["lang_Content"][help_data_id.id];
                        if (question != null) {
                            questionIndex++;
                            var title = question.t;
                            var answer = question.a;
                           // var language_obj = window["Type_lang"][question.id];
                            var hiddenFlowerCSS = questionIndex==1?' style="display:none;"':'';
                            //if (language_obj != null) {
                            //    title = language_obj.title;
                            //    answer = language_obj.answer;
                            //}
                            html += '<li id="que_li_'+questionIndex+'"'+ hiddenFlowerCSS+'>';
                            html += '<h2 id="questionTitle_'+questionIndex+'">'+title+'</h2>';
                            html += '<p id="questionAnswer_'+questionIndex+'">'+answer+'</p>';
                            html += '</li>';
                        }
                        //console.log(html)
                    });
                }
            });
            $('#support_answer').html(html);
            $('#que_li_' + questionIndex).addClass("no_bot");
        },
        'changeLang':function(){
            return getLanguage();
            function getCookie(name) {
                var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg))
                    return unescape(arr[2]);
                else
                    return null;
            }
            function getLanguage() {
                var language = getCookie("locale");
                if (!language | language == "" | language == 'null' | language == 'en') {
                    language = 'en';
                }
                else {
                    language = 'ar';
                }
                return language;
            }
        }
    };
    I18N.init(null,true).localize(null,Page.run.bind(Page),true)
});