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
        _nav = Body.nav,
        _task = Body.TASKS,
        Footer=Body.Footer,
        Bussiness = Kit.use('Bussiness');
    var Popup = require('component/popup'),
        helpTop=require('component/helpTop');
    var TEMPLATE={
        'MAIN':'<div  class="user_wrap">\
                        <div class="new_user_con">\
                            <div class="support_box2">\
                                <textarea class="sup_txt"  id="support_content" placeholder="" />\
                                <table class="suport_tab">\
                                    <tr class="SelectOpt">\
                                        <td class="wid_50 Countrys" ><span data-i18n="Support_Feedback_Country_title" class="select_cou">{{Support_Feedback_Country_title}}</span><span>*</span></td>\
                                        <td><select id="selected" data-i18n="Support_Counrty_List">{{Support_Counrty_List}}</select></td>\
                                    </tr>\
                                    <tr>\
                                        <td class="wid_50 Phone_Emil"><span>*</span></td>\
                                        <td class="Number">\
                                            <input id="Numers" class="Country_Nums" readonly>\
                                            <input class="Phone_Email" type="number" value="" placeholder="{{Support_Feedback_Whatsapp}}" id="contact_way" data-i18n="Support_Feedback_Whatsapp"/>\
                                        </td>\
                                    </tr>\
                                    <tr>\
                                        <td class="wid_50"></td>\
                                        <td class="Checked" colspan="2" >\
                                            <a class="no_whatsapp" data-i18n="Support_Feedback_No_Whatsapp">{{Support_Feedback_No_Whatsapp}}</a>\
                                        </td>\
                                    </tr>\
                                </table>\
                                <p data-i18n="Support_Feedback_Bottom_Tips">{{Support_Feedback_Bottom_Tips}}</p>\
                                <input type="button" value="{{Support_Feedback_Send}}" class="sup_btn" data-i18n="Support_Feedback_Send" />\
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
            this.changeLang();
            this.lang();
            this.changeCont();
            this.submitInfo();
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
            I18N.init({
                'onLocalize': this.identifyFlow.bind(this)
            });
            login_util.setCallback(this.identifyFlow.bind(this));
            Header.init({
                'container': this.container
            });
            _nav.init({
                'container': this.container
            });
            _task.init({
                'container': this.container
            });
            
            helpTop.init({'container':this.container,'cur':'support_feedback'});
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
            //if(this.identity)
            Header.identified(this.identity);
            _nav.identified(this.identity,this.messages_length);
             _task.identified(this.identity);
            $("#support_content").blur(function(){
                if ($.trim($("#support_content").val()).length == 0) {
                    $("#support_content").addClass("err_border");
                }else{
                    $("#support_content").removeClass("err_border");
                }
            });
            $("#support_content").attr("placeholder",i18nTranslate("Support_Feedback_Textarea_placeholder"));
            $("#contact_way").blur(function(){
                if ($.trim($('#contact_way').val()).length == 0) {
                    $("#contact_way").addClass("err_border");
                }else{
                    $("#contact_way").removeClass("err_border");
                }
            });

            $("#selected").blur(function(){
                if ($.trim($('#selected').val()).length == 0) {
                    $("#selected").addClass("err_border");
                }else{
                    $("#selected").removeClass("err_border");
                }
            });
            window["Country_Numb"]=false;
            $(".language_nav").bind("click",function(){
                Page.changeLang();
                Page.lang();
                $(".Number>input:nth-child(1)").val("");
            });
            $("#support_content").bind("keyup",function(){
                var obj = document.getElementById("support_content");
                var obj2 = document.getElementById("contact_way");
                if (obj.value.length > 300) {
                    obj.value = obj.value.substr(0, 300);
                    return;
                }
                if (obj2.value.length > 300) {
                    obj2.value = obj2.value.substr(0, 300);
                    return;
                }
            })
            $("#selected").bind("click",function(){
                var val=$("#selected option:selected").val();
                $(".Number>input:nth-child(1)").val(val);
            })
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
        },
        'lang':function(){
            var language=Page.changeLang();
            window["language"]=language;
            var PlaceHolder_en=["Please enter your e-mail","Whatsapp"],PlaceHolder_ar=["من فضلك قم بإدخال البريد الإلكتروني","الواتس اب"],InnerText_en=["I don’t have a email >>","I don't have WhatsApp >>"],InnerText_ar=["لا يوجد بريد إلكتروني >>","لايوجد واتس اب >>"],TextArea=["Dude! Its your turn , suggest something our ears listening …","نحن نستمع إليك ، برجاء كتابة مقترحك ...."];
            window["PlaceHolder_en"]=PlaceHolder_en;
            window["PlaceHolder_ar"]=PlaceHolder_ar;
            window["InnerText_en"]=InnerText_en;
            window["InnerText_ar"]=InnerText_ar;
            window["TextArea"]=TextArea;
            if(language=='en'){
                //$("#support_content").attr("placeholder",TextArea[0]);
                $(".Phone_Email").attr({"placeholder":PlaceHolder_en[1]});
                $("td.Checked a").html(InnerText_en[1]);
            }
            else{
                //$("#support_content").attr("placeholder",TextArea[1]);
                $(".Phone_Email").attr({"placeholder":PlaceHolder_ar[1]});
                $("td.Checked a").html(InnerText_ar[1]);
            }
        },
        'changeCont':function(){
            $("td.Checked").bind("click",function(){
                var language=Page.changeLang();
                window["Country_Numb"]=!window["Country_Numb"];
                if(window["Country_Numb"]){
                    $("input.Country_Nums").hide();
                    $("tr.SelectOpt").hide();
                    if(language=='en'){
                        $(".Phone_Email").attr({"placeholder":window["PlaceHolder_en"][0]});
                        $("td.Checked a").html(window["InnerText_en"][0]);
                    }else{
                        $(".Phone_Email").attr({"placeholder":window["PlaceHolder_ar"][0]});
                        $("td.Checked a").html(window["InnerText_ar"][0]);
                    }
                }else{
                    $("input.Country_Nums").show();
                    $("tr.SelectOpt").show();
                    if(language=='en'){
                        $(".Phone_Email").attr({"placeholder":window["PlaceHolder_en"][1]});
                        $("td.Checked a").html(window["InnerText_en"][1]);
                    }else{
                        $(".Phone_Email").attr({"placeholder":window["PlaceHolder_ar"][1]});
                        $("td.Checked a").html(window["InnerText_ar"][1]);
                    }
                }
            });

        },
        'submitInfo':function(){
            $(".sup_btn").bind("click",function(){
                var context = $("#support_content").val();
                var numers=$("#Numers").val();
                var contact_way = $('#contact_way').val();
                var selected = $("#selected").val();
                var Info_Empty_Tips='<span class="Support_Info_Empty">'+i18nTranslate("Support_Info_Empty")+'</span>',Info_Success_Tips='<span class="Support_Info_Empty">'+i18nTranslate("Support_Info_Success")+'</span>';
                if ($.trim(context).length == 0 || $.trim(contact_way).length == 0 || $.trim(selected).length == 0 && !Country_Numb) {
                    if ($.trim(context).length == 0){
                        $("#support_content").addClass("err_border");
                    }
                    if ($.trim(contact_way).length == 0){
                        $("#contact_way").addClass("err_border");
                    }
                    if ($.trim(selected).length == 0 && !Country_Numb){
                        $("#selected").addClass("err_border");
                    }
                    $(".new_user_con").append(Info_Empty_Tips);
                    setTimeout(function(){
                        $(".Support_Info_Empty").remove();
                    },1800);
                    return;
                }
                if(Country_Numb)
                    Resour1 = contact_way;
                else
                    Resour1 = numers+contact_way;
                var url="service/report/v3/0/1";
                Bussiness.postData(url,{msg:context,relation:Resour1},function(data){
                    $(".new_user_con").append(Info_Success_Tips);
                    setTimeout(function(){
                        $(".Support_Info_Empty").remove();
                    },1800);
                    $("#support_content").val('');
                    $('#contact_way').val('');
                }.bind(this))
            })
        }
    };
    I18N.init(null,true).localize(null,Page.run.bind(Page),true)
});