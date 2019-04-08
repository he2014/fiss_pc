define(function(require){
    var STRING_EMPTY = '',
        DISPLAY_NONE = ' style="display:none;"',
        Utility =require(JS_UTILITY),
        Cookie = Utility['Cookie'],
        OOP=Utility['OOP'],
        Promise = Utility['Promise'],
        stringFormat = Utility['String']['stringFormat'],
        DateTime = Utility['DateTime'];
    var Kit = require(useJSComponent('kit')),
        I18N = Kit.use('I18N'),
        Body=Kit.use('Body'),
        Header=Body.Header,
        _nav = Body.nav,
        _task=Body.TASKS,
        Footer=Body.Footer,
        Lazyload=Kit.use('Lazyload'),
        Trigger=Kit.use('Trigger'),
        Bussiness = Kit.use('Bussiness');
   // var UserTop=require('component/userTop');
    require('js/reference/blockUI.js'); // blockUI.js?v=4.4
    require('wheel/date.js');//load_date_js();
    require('wheel/My97DatePicker/skin/WdatePicker.css');
    require('wheel/My97DatePicker/WdatePicker.js');
    require('cssComponent/page.css');
    //load_gift_language();

    var IMAGE_DOMAIN =DOMAIN_CONFIG['IMAGE_DOMAIN'];
    var language_NUM={
            'en':1,
            'ar':2,
            'tr':3
    },type_NUM={'1':'Store_VIP','2':'Store_SVIP','3':'Store_NavMount','4':'Store_NavItem','5':'Store_NavItem','6':'Store_NavItem','7':'Store_NavItem','8':'Store_NavItem'};
    var TEMPLATE={
        'MAIN':'<div class="user_sys_par">\
     	<div class="user_sys_mesg clearfix">\
        			<div class="user_sys_title" data-i18n="Message_Top_Title">{{Message_Top_Title}}</div>\
                    <div class="user_sys_mesg_cont">\
                        <table>\
                            <tr class="sys_mesg_nav clearfix">\
                                <th class="sys_mesg_nav1 sysmesg_border sys_mesg_padding readStart" id="selectAllBtn" name="select_all"><span data-i18n="Message_SelectAll">{{Message_SelectAll}}</span></th>\
                            	<th class="sys_mesg_nav2 sysmesg_border readStart"><img src="/resource/systemRes/img/user_img/sysmesg.png" width="14px" height="11px"></th>\
                                <th class="sys_mesg_nav3 sysmesg_border readStart" data-i18n="Message_Sender">{{Message_Sender}}</th>\
                                <th class="sys_mesg_nav4 sysmesg_border readStart2" data-i18n="Message_Title">{{Message_Title}}</th>\
                                <th class="sys_mesg_nav5 sysmesg_border readStart2" data-i18n="Message_Content">{{Message_Content}}</th>\
                                <th class="sys_mesg_nav6 sysmesg_border readStart2" data-i18n="Message_Time">{{Message_Time}}</th>\
                            </tr>\
                        </table>\
                        <div class="sorry_reSign " data-i18n="Login_Out_Conts" data-stat="Login_Out_Conts" style="color:#fff; width:1020px;height:200px;line-height:200px;text-align:center;vertical-align:middle">{{Login_Out_Conts}}</div>\
        				<div class="no_sysmesg" style="display:none" data-i18n="Message_Nofication">{{Message_Nofication}}</div>\
                        <div class="sysmesg_botm clearfix">\
                        	<ul class="user_sys_mesg_list clearfix">\
		                        <li class="user_sys_mesg_btn readStart" id="Message_Ignore"  data-i18n="Message_Ignore">{{Message_Ignore}}</li>\
		                        <li class="user_sys_mesg_btn readStart" id="Message_Delete" data-i18n="Message_Delete">{{Message_Delete}}</li>\
		                    </ul>\
                            <div class="show_to_page-pra">\
	                            <p id="showToPage" name="show_to_page" data-i18n="Message_GoTo">{{Message_GoTo}}</p>\
	                           	<input type="text" class="goto_cont_num" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,\'\')}else{this.value=this.value.replace(/\\D/g,\'\')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,\'\')}else{this.value=this.value.replace(/\\D/g,\'\')}">\
	                            <div class="sysmesg_botm_btn" name="pre_button" data-i18n="Message_Previous"><</div>\
	                            <div class="sysmesg_botm_num">0/0</div>\
	                            <div class="sysmesg_botm_btn" name="next_button" data-i18n="Message_Next">></div>\
                            <div>\
                        </div>\
                    </div>\
                </div>\
                <div class="popup_cont" style="\
                \
                display:none">\
                    <div class="sysmesg_shadow"></div>\
                    <div class="ignore_all_popup" style="display:none">\
                        <img src="/resource/systemRes/img/user_img/sysmesg_pop_close.png" width="15.5px" height="15.5px" id="closeIgnoreAllMsgImg" >\
                        <p class="ignore_all_title" data-i18n="Message_IgnAll">{{Message_IgnAll}}</p>\
                        <p class="ignore_all_txt" data-i18n="Message_IgnAllNotice">{{Message_IgnAllNotice}}</p>\
                        <ul class="ignoreall_btn clearfix">\
                            <li class="ignore_all_btn" id="closeIgnoreAllMsgBtn" data-i18n="Message_Cancel">{{Message_Cancel}}</li>\
                            <li class="ignore_all_btn" id="ignoreAllMsgBtn"  data-i18n="Message_Confirm">{{Message_Confirm}}</li>\
                        </ul>\
                    </div>\
                    <div class="delete_all_popup" style="display:none">\
                        <img src="/resource/systemRes/img/user_img/sysmesg_pop_close.png" width="15.5px" height="15.5px" id="closeDeleteAllMsgImg">\
                        <p class="ignore_all_title" data-i18n="Message_DelAll">{{Message_DelAll}}</p>\
                        <p class="ignore_all_txt" data-i18n="Message_DelAllNotice">{{Message_DelAllNotice}}</p>\
                        <ul class="ignoreall_btn clearfix">\
                            <li class="ignore_all_btn" id="closeDeleteAllMsgBtn"  data-i18n="Message_Cancel">{{Message_Cancel}}</li>\
                            <li class="ignore_all_btn" id="deleteAllMsgBtn" data-i18n="Message_Confirm">{{Message_Confirm}}</li>\
                        </ul>\
                    </div>\
                    <div class="sysmesg_desc_txt_popup" style="display:none">\
                        <img src="/resource/systemRes/img/user_img/sysmesg_pop_close.png" width="15.5px" height="15.5px" class="sysmesg_pop_close closeMsgDetail" >\
                        <p class="ignore_all_title"></p>\
                        <div class="sysmesg_desc_md clearfix">\
                            <p class="sysmesg_desc_from readStart3" data-i18n="Message_From">{{Message_From}}:<span></span></p>\
                            <p class="sysmesg_desc_time readStart"></p>\
                        </div>\
                        <div class="sysmesg_desc_cont">\
                            <div class="scrollbar" id="ex3">\
                                <div class="sysmesg_desc_txt">\
                                    <div style="display:none" class="readStart2"></div>\
                                    <div style="display:none"><a href="#" class="sysmesg_desc_txt2" target="_blank" data-i18n="Message_More">{{Message_More}}</a></div>\
                                    <div style="display:none"><img src="" class="sysmesg_pop_img"></div>\
                                </div>\
                            </div>\
                            <div class="sysmesg_desc_btn closeMsgDetail"  data-i18n="Message_Confirm">{{Message_Confirm}}</div>\
                        </div>\
                    </div>\
                </div> </div> </div>\
        		<div data-role ="ce_nav"></div>\
        		<div class="hidden" id="task_tan"></div>\
        		<div class="task_con" data-role ="task"></div>\
        		<div data-message ="notice" style="display:none"></div>\
        		<div data-errorMessage="error" style="display:none"></div>\
        		</div>',
        Notice:'<div class="pop_message ">\
                 <div class = "notice_title" data-i18n ="Store_Notice" >{{Store_Notice}}<div> \
                  <div class ="notice_content" data-i18n="Message_Notice">{{Message_Notice}}</div>\
                  <div class="notice_footer">\
                  <div class="message_ok" data-i18n ="Store_OK">{{Store_OK}}</div>\
                  <div class=" message_cancle" data-i18n="Store_Cancel">{{Store_Cancel}}</div>\
                  </div>\
        </div>'


    };

    var Page = window.Page =  {
        run: function() {
            this.load();
            this.render();
            //UserTop.Login_Btn();
            this.compose();
            this.bind();
            this.start();
        },
        load: function() {

        },
        render: function() {
            this.container = $('#container');
            this.container.i18nHTML(Header.html() + TEMPLATE.MAIN + Footer.html());
            this.container.find('[data-role="ce_nav"]').i18nHTML(_nav.html());
            this.container.find('[data-role="task"]').i18nHTML(_task.html());
            this.container.find('div[data-message="notice"]').i18nHTML(TEMPLATE.Notice);
        },
        compose: function() {
            this.show_message_map={};
            this.page_no=1;
            this.page_length=10;
            this.language=1;
            this.page_count=0;
            this.bool1=false;
            this.bool2=false;
//          I18N.init({
//              'onLocalize': UserTop.Login_Btn.bind(this)
//          });
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
            //UserTop.init({'container':this.container,'cur':'menu_sysmessage'});
        },
        bind: function() {
            var _this=this;
            $('.closeMsgDetail').click(function(){
                _this.closeMessageDetail();
            });
            $('#showToPage').click(function(){
                _this.showToPage();
            });
            $('#toPage').click(function(){
                _this.toPage();
            });
            $("[name='show_to_page']").hover(function(){
                _this.bool1 = true;
            },function(){
                _this.bool1 = false;
            });
            $(document).mousedown(function(e) {
                var val = e.which;
                if (val == 1) {
                    if(!_this.bool1){
                        $(".goto_cont").hide();
                    }
                }
            });
            $("input.goto_cont_num").focus(function(){
                _this.bool2 = true;
            });

            $("input.goto_cont_num").blur(function(){
                _this.bool2 = false;
            });
            $(document).keydown(
                function(e){
                    var ev = document.all ? window.event : e;
                    if(ev.keyCode==13 && !$(".goto_cont").is(":hidden") &&  _this.bool2) {
                        _this.toPage();
                    }
                }
            );
            $('#Message_Delete').click(function(){
                var select = $("input[name='choose_mesg']:checked").length;
                if(select>0)$('div[data-message="notice"]').show();
            });
            $("div.message_ok").click(function(){
                _this.deleteMsgs();

            });
            $('div.message_cancle').click(function(){
                $('div[data-message="notice"]').hide();
            });
            $('#Message_Ignore').click(function(){
                _this.ignoreMsgs();
            });

            $('#selectAllBtn').click(function(){
                _this.selectAllMessage();
            });

            $('#closeIgnoreAllMsgImg,#closeIgnoreAllMsgBtn').click(function(){
                _this.closeIgnoreAllMsg();
            });

            $('#ignoreAllMsgBtn').click(function(){
                _this.ignoreAllMsg();
            });

            $("#showDeleteAllMsgBtn").click(function(){
                _this.showDeleteAllMsg();
            });

            $('#closeDeleteAllMsgImg,#closeDeleteAllMsgBtn').click(function(){
                _this.closeDeleteAllMsg();
            });

            $('#deleteAllMsgBtn').click(function(){
                _this.deleteAllMsg();
            });

        },
        start: function() {
            this.identifyFlow();
        },
        'identifyFlow': function() {
            this.promise = new Promise(this.identify.bind(this)).then(this.message.bind(this)) //move method identity to utility
                .then(this.identified.bind(this));
        },
         'message':function(){
        	Bussiness.getData('service/message/v3/sms/page/0/2',function(data){
        			if(data.code==0){
        				 this.messages_length = data['dataInfo']['list'].length;
        			}
                  this.promise.resolve();
			}.bind(this),null,true);
        },
        'identify': function() {
            this.identity = null;
            var user = Cookie.get(Cookie.key['user_info']);
            console.log(user)
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
        	_nav.identified(this.identity,this.messages_length);
			_task.identified(this.identity);
            var sign = this.sign = require('component/sign');
			sign.start();
			
            //UserTop.identifyFlow();
            if (this.identity) {
            	$("div.sorry_reSign").hide();	
              //  UserTop.Login_Tips_After();
                this.getAllMsg(1);
            } else {

            	$("div.sorry_reSign").show();
               // UserTop.Login_Tips_Before();
                //login_util.show_login_div();
            }

        },
        'getMessage':function(page,length){
            var _this=this;
            var sUrl='service/message/v3/sms/all/'+_this.language+'?no='+page+'&size='+_this.page_length;
            Bussiness.getData(sUrl,function(obj){
            	console.log(obj)
                $(".evlp_btn .red_dot2").hide();
                var message_html_str = '';
                _this.show_message_map={};
                if(obj && obj.code == 0){
                    if(obj.dataInfo && obj.dataInfo.list && obj.dataInfo.list.length > 0){
                        //console.log(obj);
                        $(".btn_message>.red_dots").html(obj.dataInfo.total);
                        $.each(obj.dataInfo.list,function(idx,message){
                            if(message){
                                _this.show_message_map[message.i]=message;
                                //ALL = -1;  UNREAD = 0;  READ = 1;  DEL = 2;
                                var bool = false;
                                if(message['state'] == 0 && message_html_str == '' && obj.dataInfo.page == 1){
                                    //bool = true;
                                }

                                var date = new Date(message['tm']);
                                var year = date.getFullYear();       //年
                                var month = date.getMonth() + 1;     //月
                                if(month<10){
                                	month = '0'+month;
                                }
                                var day = date.getDate();
                                if(day<10){
                                	day = '0'+day;
                                }
                                var nowValue = year + "/" + month + "/" + day;
								
                                message_html_str+='<tr class="sys_mesg_list clearfix" message_id="'+message.i+'" name="message">';
                                message_html_str+=' <td class="sys_mesg_nav1 readStart"><label><input type="checkbox" name="choose_mesg" class="chosmesg_style" value="'+message['i']+'"/><span class="your style about checkbox"></span></label></td>';
                                message_html_str+=' <td class="readStart2 '+(message['state'] == 0 ? 'sys_mesg_nav2':'sysmesg_active')+'"></td>';
                                message_html_str+=' <td class="readStart2 '+(message['state'] == 0 ? 'sys_mesg_nav3':'sys_mesg_nav3_read')+(bool ? ' sys_mesg_nav3_new':'')+'" name="show">'+message['f']+'</td>';
                                message_html_str+=' <td class="readStart2 '+(message['state'] == 0 ? 'sys_mesg_nav4':'sys_mesg_nav4_read')+'" name="show">'+message['t']+'</td>';
                                message_html_str+=' <td class="readStart2 '+(message['state'] == 0 ? 'sys_mesg_nav5':'sys_mesg_nav5_read')+'" name="show">'+message['a']+'</td>';
                                message_html_str+=' <td class="readStart2 '+(message['state'] == 0 ? 'sys_mesg_nav6':'sys_mesg_nav6_read')+'" name="show">'+nowValue+'</td>';
                     			message_html_str+='</tr>';
                            }
                        });
                    }
                    if('' == $.trim(message_html_str)){
                        $(".no_sysmesg").show();
                        $(".sys_mesg_list").remove();
                        $(".btn_message>.red_dots").remove();
                    }else{
                        $(".no_sysmesg").hide();
                        $(".sys_mesg_list").remove();

                        _this.updateSelectMessage();
                        _this.page_no = obj.dataInfo.page;
                        _this.page_count = obj.dataInfo.pageCount;
                        $(".user_sys_mesg_cont table").append(message_html_str);
                        $(".user_sys_mesg").show();
                        $(".sysmesg_botm .sysmesg_botm_num").text(_this.page_no+"/"+_this.page_count);

                        $("[name='choose_mesg']").unbind("click").click(function(){
                            _this.updateSelectMessage();
                        });

                        $("[name='show']").unbind("click").click(function(){
                           _this.showMessage($(this).parent().attr("message_id"));
                        });

                        $(".sys_mesg_nav7").unbind("click").click(function(){
                            _this.deleteMsg($(this).parent().attr("message_id"));
                        });

                        $("[name='pre_button']").unbind("click");
                        $("[name='pre_button']").addClass("sysmesg_botm_disbtn");
                        if(_this.page_no > 1){
                            $("[name='pre_button']").removeClass("sysmesg_botm_disbtn");
                            $("[name='pre_button']").click(function(){
                               _this.prePage();
                            });
                        }

                        $("[name='next_button']").unbind("click");
                        $("[name='next_button']").addClass("sysmesg_botm_disbtn");
                        if(_this.page_no < _this.page_count){
                            $("[name='next_button']").removeClass("sysmesg_botm_disbtn");
                            $("[name='next_button']").click(function(){
                               _this.nextPage();
                            });
                        }

                        $(".goto_cont_num").val('');
                    }
                }
            },null,'isV3');
        },
        'getAllMsg':function(page,length){
            this.language=language_NUM[Cookie.get('locale')?Cookie.get('locale'):'en'];
            this.getMessage(page,length);
        },
        'updateSelectMessage':function (){
            var state = 0;
            var num = $("input[name='choose_mesg']:checked").length,max_num = $("input[name='choose_mesg']").length;
            $("tr[name='message']").removeClass('sys_mesg_list_chose');
            if(num > 0){
                $(".sys_mesg_title li").removeClass("sysmesg_empty noSelect").addClass("sysmesg_title");
                if(num < max_num){
                    $("[name='select_all'] span").hide();
                    $("[name='select_all'] span:eq(0)").show();
                }
                // else{
                //    $("[name='select_all'] span").hide();
                //    $("[name='select_all'] span:eq(1)").show();
                //}
            }else{
                $(".sys_mesg_title li").removeClass("sysmesg_title").addClass("sysmesg_empty noSelect");
                $("[name='select_all'] span").hide();
                $("[name='select_all'] span:eq(0)").show();
            }
            $("input[name='choose_mesg']:checked").parent().parent().parent().addClass("sys_mesg_list_chose");
        },
        'showMessage':function(id){
            var message  = this.show_message_map[id];
            if(message){
                if(message['state'] == 0){
                    message['state'] = 1;
                    $("[message_id='"+message['i']+"'] td.sys_mesg_nav2").removeClass("sys_mesg_nav2").addClass("sysmesg_active");
                    $("[message_id='"+message['i']+"'] td.sys_mesg_nav3").removeClass("sys_mesg_nav3").removeClass("sys_mesg_nav3_new").addClass("sys_mesg_nav3_read");
                    $("[message_id='"+message['i']+"'] td.sys_mesg_nav4").removeClass("sys_mesg_nav4").addClass("sys_mesg_nav4_read");
                    $("[message_id='"+message['i']+"'] td.sys_mesg_nav5").removeClass("sys_mesg_nav5").addClass("sys_mesg_nav5_read");
                    $("[message_id='"+message['i']+"'] td.sys_mesg_nav6").removeClass("sys_mesg_nav6").addClass("sys_mesg_nav6_read");


                    Bussiness.postData('service/message/v3/sms/batch/1',{ids:message['i']},function(obj){});
                }

                var date = new Date(message['tm']);
                var year = date.getFullYear();       //年
                var month = date.getMonth() + 1;     //月
                var day = date.getDate();
                var nowValue = year + "/" + month + "/" + day;
                $(".sysmesg_desc_txt_popup .ignore_all_title").html("").html(message['t']);
                $(".sysmesg_desc_txt_popup .sysmesg_desc_from span").html("").html(message['f']);
                $(".sysmesg_desc_txt_popup .sysmesg_desc_time").html("").html(nowValue);

                $(".sysmesg_desc_txt_popup .sysmesg_desc_txt div").hide();
                var contentText = message['m'];
                content = contentText.replace(/\r\n|\r|\n/gi,"<br />");
                if(content && $.trim(content) != ''){
                    $(".sysmesg_desc_txt_popup .sysmesg_desc_txt div:eq(0)").html("").html(content).show();
                }

                var link = message['u'];
                if(link && $.trim(link) != ''){
                    $(".sysmesg_desc_txt_popup .sysmesg_desc_txt div:eq(1) a").attr("href",link);
                    $(".sysmesg_desc_txt_popup .sysmesg_desc_txt div:eq(1)").show();
                }

                var pic_url = message['p'];
                if(pic_url && $.trim(pic_url) != ''){
                    pic_url = pic_url.indexOf("http://") > -1 ? pic_url : ('/resource/'+pic_url);
                    $(".sysmesg_desc_txt_popup .sysmesg_desc_txt div:eq(2) img").attr("src",pic_url);
                    $(".sysmesg_desc_txt_popup .sysmesg_desc_txt div:eq(2)").show();
                }

                $(".popup_cont").show();
                $(".sysmesg_desc_txt_popup").show();
            }
        },
        'closeMessageDetail':function (){
            $(".popup_cont").hide();
            $(".sysmesg_desc_txt_popup").hide();
        },
        'gotoPage':function (){
        	
        },
        'nextPage':function (){
            if(this.page_no >= this.page_count){
                return;
            }
            this.getAllMsg(this.page_no + 1,this.page_length);
        },
        'prePage':function (){
            var page = 1;
            if(this.page_no > 1){
                page = this.page_no - 1;
            }
            this.getAllMsg(this.page_no - 1,this.page_length);
        },
        'deleteMsg':function (id){
            Bussiness.postData("service/message/v3/sms/batch/2",{ids:id},function(obj){
                if(obj && obj.code == 0){
                    this.getAllMsg(this.page_no,this.page_length);
                }
            }.bind(this));
        },
        'showToPage':function(){   
            var nowPage = parseInt($(".goto_cont_num").val());
            if(nowPage > this.page_count){
                return;
            }
            this.getAllMsg( nowPage , this.page_length);
        }, 
        'toPage':function (){
            var page = parseInt($(".goto_cont_num").val());
            if(page > this.page_count){
                page = this.page_count;
            }
            this.getAllMsg(page,this.page_length);
        },
        'deleteMsgs':function (){
            var num = $("input[name='choose_mesg']:checked").length;
                    var max_num = $("input[name='choose_mesg']").length;
                    if(num > 0 && num == max_num && this.page_no > 1){
                        this.page_no--;
                    };
            this.updateMsgs('service/message/v3/sms/batch/2');
            $('div[data-message="notice"]').hide();
        },
        'updateMsgs':function (url){
            var _this=this;
            var ids= _this.getSelectMessage();
            if(ids == ''){
                return;
            }
            Bussiness.postData(url,{ids:ids},function(obj){
                if(obj && obj.code == 0){
                    _this.getAllMsg(_this.page_no,_this.page_length);
                }
            });
        },
        'getSelectMessage':function (){
            var ids='';
            $.each($("input[name='choose_mesg']:checked"),function(idx,obj){
                ids+=$(obj).val()+",";
            });
            return ids;
        },
        'unreadMsgs':function (){
            this.updateMsgs('service/message/v3/sms/batch/0');
        },
        'ignoreMsgs':function (){
            this.updateMsgs('service/message/v3/sms/batch/1');
        },
        'selectAllMessage':function (){
            var bool = $("[name='select_all'] span:eq(0)").is(":hidden");
            $("input[name='choose_mesg']").prop("checked",bool ? false :true);
            this.updateSelectMessage();
        },
        'showIgnoreAllMsg':function (){
            $(".popup_cont").show();
            $(".ignore_all_popup").show();
        },
        'closeIgnoreAllMsg':function (){
            $(".popup_cont").hide();
            $(".ignore_all_popup").hide();
        },
        'ignoreAllMsg':function(){
            var _this=this;
            Bussiness.postData('service/message/v3/sms/all/1',{},function(obj){
                if(obj && obj.code == 0){
                    _this.getAllMsg(_this.page_no,_this.page_length);
                }
                _this.closeIgnoreAllMsg();
            });
        },
        'showDeleteAllMsg':function (){
            $(".popup_cont").show();
            $(".delete_all_popup").show();
        },
        'closeDeleteAllMsg':function (){
            $(".popup_cont").hide();
            $(".delete_all_popup").hide();
        },
        'deleteAllMsg':function(){
            var _this=this;
            Bussiness.postData('service/message/v3/sms/all/2',{},function(obj){
                if(obj && obj.code == 0){
                    _this.getAllMsg(_this.page_no,_this.page_length);
                }
                _this.closeDeleteAllMsg();
            });
//          window.location.reload();
        }
    };

    I18N.init(null,true).localize(null,Page.run.bind(Page));

});