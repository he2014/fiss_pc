define(function(require,exports,module){
    require('wheel/jquery');
    var login_util =  window['login_util']=new function(){
        this.find_password_send_email_val= '';
        this.is_load_facebook=false;
        this.is_find_password =  false;

        this.setCallback = function(handler){
            this.successHandler = handler;
        }

        this.init_login=function(){
            /*$("[name='register_buttom']").unbind("click").click(function(){login_util.show_register_div();});
             $("[name='login_buttom']").unbind("click").click(function(){login_util.show_login_div();});
             $("[name='login_out_buttom']").unbind("click").click(function(){user_util.user_out('login_util','user_out');});*/

            $("#change_language").unbind("click").click(function(){
                var language = null;
                if(system_info.base_attr.local_language == 'ar'){
                    language = 'en';
                }else{
                    language = 'ar';
                }
                system_util.add_or_update_language(language);
            });
            user_util.init_user_info();
            //login_util.init_facebook();
            //login_util.init_google();
        };
        this.init_facebook=function () {
            if(!login_util.is_load_facebook){
                window.fbAsyncInit = function() {
                    FB.init({
                        appId      : system_info.base_attr.facebook_key ,
                        xfbml      : true,
                        version    : 'v2.2'
                    });
                    $('img[name="facebook_loading"]').hide();
                    login_util.is_load_facebook =  true;
                };

                (function(d, s, id){
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) {return;}
                    js = d.createElement(s); js.id = id;
                    js.src = "//connect.facebook.net/en_US/sdk.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            }else{
                $('img[name="facebook_loading"]').hide();
            }
        };

        this.init_google=function(){
            var po = document.createElement('script');
            po.type = 'text/javascript';
            po.async = true;
            po.id="google_login_js";
            po.src = 'https://apis.google.com/js/client:platform.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(po, s);
        };

        this.init_block_div_html=function (){
            if($("#block_div_id").length < 1){
                //$('#container').append('<div id="block_div_id" style="background-color: #000000;left: 0;position: fixed;top: 0;width: 100%; height: 100%; z-index: 999; opacity: 0.7;display:none;"></div>');
            }
        };
        this.init_login_register_html=function (){
            login_util.init_block_div_html();
            if($("#login_register_div_id").length > 0){
                $("#login_register_div_id .div1").hide();
                $("input.txt_login5").removeClass("txt_login5").addClass("txt_login");
                $("#block_div_id").show();
                return;
            }
            var init_login_register_html_str  = '<div id="block_div_id" style="background-color: rgba(0,0,0,0.7);left: 0;position: fixed;top: 0;width: 100%; height: 100%; z-index: 9999;display:none;">';
            init_login_register_html_str+='<div class="login_wrap" id="login_register_div_id">';
            init_login_register_html_str+='<a href="javascript:void(0);" class="popshut" onclick="window[\'login_util\'][\'hide_login_register_div\']();" data-stat="login_popshut"></a>';
            init_login_register_html_str+='';
            init_login_register_html_str+='<div class="login_tab">';
            init_login_register_html_str+='<div class="tab_hide">';
            init_login_register_html_str+='<div class="div1 login_count" id="login_div_id">';
            init_login_register_html_str+='<div class="login_title">';
            init_login_register_html_str+='<h2><img src="'+system_info.base_attr.staticResource+'static/image/index/logo.png" alt="7NUJOOM" title="7NUJOOM" /></h2>';


            init_login_register_html_str+='</div>';
            init_login_register_html_str+='<div class="login_page">';
            init_login_register_html_str+='<div class="tp_login">';
            init_login_register_html_str+="<div class='tp_title'data-i18n='sing_in_with'>{{sing_in_with}}</div>"
            //init_login_register_html_str+='<img src="'+system_info.base_attr.sysResource+'imgNew/loginImg_3/loading-facebook.gif" alt="" class="pos_img" name="facebook_loading"/>';
            init_login_register_html_str+='<a href="javascript:void(0);" onclick="window[\'login_util\'][\'facebook_login\']();" class="facebook_3" data-i18n="SignBox_SignByFacebook" data-stat="SignBox_SignByFacebook">{{SignBox_SignByFacebook}}</a>';
            init_login_register_html_str+='<a href="javascript:void(0);" onclick="window[\'login_util\'][\'twitter_login\']();" class="twitter_3" data-i18n="SignBox_SignByTwitter" data-stat="SignBox_SignByTwitter">{{SignBox_SignByTwitter}}</a>';
            init_login_register_html_str+='<span class="google_3 g-signin" data-callback="google_login_back"  data-clientid="'+system_info.base_attr.google_key+'" data-cookiepolicy="single_host_origin" data-scope="https://www.googleapis.com/auth/plus.login" data-i18n="SignBox_SignByGoogle" data-stat="SignBox_SignByGoogle">{{SignBox_SignByGoogle}}</span>';
            init_login_register_html_str+='</div>';
            //init_login_register_html_str+='<div class="login_Tup alignStart"><span data-i18n="SignBox_NotHaveAccount">{{SignBox_NotHaveAccount}}</span><a href="javascript:void(0);" onclick="window[\'login_util\'][\'login_to_register\']()"  data-stat="SignBox_SignInNow"></a></div>';
            //init_login_register_html_str+='<div class="login_or"><img src="'+system_info.base_attr.sysResource+'imgNew/loginImg_3/or_icon.png" alt="OR" title="OR" /></div>';
            init_login_register_html_str+='<div class="btm_login">';
            init_login_register_html_str+='<p class="new_pwd_err fix_hide readStart" id="login_error_id"></p>';
            init_login_register_html_str+='<input type="text" name="loginName" id="login_login_name" class="login3_base email_icon txt_login alignStart readStart" autocomplete="off" maxlengtd="12" data-i18n="SignBox_Email" data-i18n="SignBox_Email" placeholder="{{SignBox_Email}}"/>';
            init_login_register_html_str+='<input type="password" id="login_password" name="password" class="login3_base pswd_icon mg_tp_12 txt_login alignStart readStart" maxlength="20" data-i18n="SignBox_Password_NoHint" placeholder="{{SignBox_Password_NoHint}}"/>';
            init_login_register_html_str+='<div id="vcodeBox" class="clearfix hidden"><input type="text"  id="login_vcode" name="vcode" class="login3_base vcode_icon mg_tp_12 txt_login alignStart readEnd" maxlength="20" data-i18n="SignBox_Vcode_NoHint" placeholder="{{SignBox_Vcode_NoHint}}"/><img src="/image.shtml" id="vcodeImg" style="width:82px;height:37px;margin-top:14px;" class="readStart" /><a id="vcodeRefBtn" class="readStart hidden" style="margin-top:14px;color:#17bd98;text-decoration: underline;font-size:14px;" href="javascript:void(0);" onclick="window[\'login_util\'][\'login_to_refresh_vcode\']();" data-stat="SignBox_ClickToRefresh"></a></div>';
            init_login_register_html_str+='<div class="clearfix  "><a href="javascript:void(0);" class="forget_pwd " onclick="window[\'login_util\'][\'login_to_find_password\']();" data-i18n="SignBox_IsForgotPassword" data-stat="SignBox_IsForgotPassword">{{SignBox_IsForgotPassword}}</a></div>';
            init_login_register_html_str+='<input type="button" class="login_base btn_login readStart" id="login_btn_submit" data-i18n="Header_SIGNIN" data-stat="Header_SIGNIN" value="{{Header_SIGNIN}}" onclick="window[\'login_util\'][\'login\']();">';
            init_login_register_html_str+='</div>';
            init_login_register_html_str+='</div>';
            init_login_register_html_str+='<span class="logo_head"></span>';
            init_login_register_html_str+='</div>';
            init_login_register_html_str+='<div class="div1 reg_count" id="register_div_id">';
            init_login_register_html_str+='<div class="login_title">';
            init_login_register_html_str+='<h2><img src="'+system_info.base_attr.staticResource+'static/image/index/logo.png" alt="7NUJOOM" title="7NUJOOM" /></h2>';
            init_login_register_html_str+='</div>';
            init_login_register_html_str+='<div class="reg_page">';
            init_login_register_html_str+='<div class="tp_login">';
            //init_login_register_html_str+='<img src="'+system_info.base_attr.sysResource+'imgNew/loginImg_3/loading-facebook.gif" alt="" class="pos_img" name="facebook_loading"/>';
            init_login_register_html_str+="<div class='tp_title'data-i18n='sing_in_with'>{{sing_in_with}}</div>";
            init_login_register_html_str+='<a href="javascript:void(0);" onclick="window[\'login_util\'][\'facebook_login\']();" class="facebook_3" data-i18n="SignBox_SignByFacebook"  data-stat="SignBox_SignByFacebook">{{SignBox_SignByFacebook}}</a>';
            init_login_register_html_str+='<a href="javascript:void(0);" onclick="window[\'login_util\'][\'twitter_login\']();" class="twitter_3" data-i18n="SignBox_SignByTwitter" data-stat="SignBox_SignByTwitter">{{SignBox_SignByTwitter}}</a>';
            init_login_register_html_str+='<span class="google_3 g-signin"  data-callback="google_login_back"  data-clientid="'+system_info.base_attr.google_key+'" data-cookiepolicy="single_host_origin" data-scope="https://www.googleapis.com/auth/plus.login" data-i18n="SignBox_SignByGoogle" data-stat="SignBox_SignByGoogle">{{SignBox_SignByGoogle}}</span>';
            init_login_register_html_str+='</div>';
            init_login_register_html_str+='<div class="login_Tup alignStart"><a href="javascript:void(0);" onclick="window[\'login_util\'][\'register_to_login\']();" data-stat="SignBox_IsSignInNow" data-i18n="Other_singn">{{Other_singn}}</a></div>';
            /**
             init_login_register_html_str+='<div class="login_or login_or_reg"><img src="'+system_info.base_attr.sysResource+'imgNew/loginImg_3/or_icon.png" alt="OR" title="OR" /></div>';
             init_login_register_html_str+='<div class="new_pwd_box"><p class="new_pwd_err fix_hide" id="register_error_id"></p></div>';
             init_login_register_html_str+='<div class="btm_login">';
             init_login_register_html_str+='<input type="text" class="reg_base3 alignStart email_icon txt_login" id="reg_Email" name="reg_Email" onblur="window[\'login_util\'].register_check_login_name(true)" autocomplete="off" maxlengdt="12" data-i18n="SignBox_Email" placeholder="{{SignBox_Email}}"/>';
             init_login_register_html_str+='<input type="text" class="reg_base3 alignStart user_icon mg_tp_8 txt_login" id="reg_nickName" name="reg_nickName" onblur="window[\'login_util\'].register_check_nick_name(true)" onfocus="window[\'login_util\'].init_nick_name()" maxlengdt="20" data-i18n="SignBox_UserName" placeholder="{{SignBox_UserName}}"/>';
             init_login_register_html_str+='<input type="password" class="reg_base3 alignStart pswd_icon mg_tp_8 txt_login" id="reg_pwd" name="password" onblur="window[\'login_util\'].register_check_password();" maxlengdt="20" data-i18n="SignBox_Password" placeholder="{{SignBox_Password}}"/>';
             init_login_register_html_str+='<input type="text" class="reg_base3 alignStart txt_login txt_login_sma readEnd" autocomplete="off" maxlength="4" id="reg_valid" name="reg_valid" onblur="window[\'login_util\'].register_check_validate(true);"/>';
             init_login_register_html_str+='<img id="img_validata" src="'+system_info.base_attr.domain+'image.shtml?r=' + Math.random()+'" title="{{SignBox_IsRefresh}}" class="codeNum readStart" onclick="window[\'login_util\'][\'change_validate\']();"/>';
             init_login_register_html_str+='<p class="reg_word alignStart"><em class="checked readStart"><input type="radio" class="radioImg" checked="checked" id="reg_agree"/></em><a href="javascript:void(0);" onclick="window[\'login_util\'][\'show_service_terms\']();" class="reg_service" data-i18n="SignBox_HaveReadAgreement"></a></p>';
             //init_login_register_html_str+='<input type="button" class="login_base btn_login" id="reg_submit" data-i18n="Header_SIGNUP" value="{{Header_SIGNUP}}" onclick="window[\'login_util\'][\'register\']();">';
             //init_login_register_html_str+='</div>';
             **/
            init_login_register_html_str+='</div>';
            init_login_register_html_str+='<span class="logo_tail"></span>';
            init_login_register_html_str+='</div>';
            init_login_register_html_str+='</div>';
            init_login_register_html_str+='</div>';
            init_login_register_html_str+='</div>';
            init_login_register_html_str+='</div>';
            $('#container').i18nAppend(init_login_register_html_str);
            $("#block_div_id").show();

            $("#login_div_id input").keydown(function(e) {
                if (e.keyCode == 13) {
                    login_util.login();
                }
            });

            $("#register_div_id input").keydown(function(e) {
                if (e.keyCode == 13) {
                    login_util.register();
                }
            });
            $(".login3_base").focus(function(){

                this.removeAttribute("placeholder");
            })


            login_util.init_facebook();
//			$(".facebook_3").hover(function() {
//				$(".pos_img").attr("src",system_info.base_attr.sysResource+"imgNew/loginImg_3/loading-facebook_on.gif");
//			}, function() {
//				$(".pos_img").attr("src",system_info.base_attr.sysResource+"imgNew/loginImg_3/loading-facebook.gif");
//			});

            login_util.init_google();
        };

        this.init_find_password_html=function (){
            login_util.init_block_div_html();
            var init_find_password_html_str='';
            if($("#find_password_div_id").length < 1){
                init_find_password_html_str+='<div class="popcont login_tab2" id="find_password_div_id">';
                init_find_password_html_str+='<div class="new_top_opc"></div>';
                init_find_password_html_str+='<h2 class="new_top_h2"><a href="javascript:void(0);" onclick="window[\'login_util\'][\'hide_password_div\']();"  class="popshut readEnd" data-stat="Email_Popshut"></a><span class="readStart" data-i18n="Forgot_Password">{{Forgot_Password}}</span></h2>';
                init_find_password_html_str+='<div class="loginDl">';
                init_find_password_html_str+='<dl class="new_pwd_err" style="display:none" id="find_password_error_id">';
                init_find_password_html_str+='<dt class="alignEnd readStart">&nbsp;</dt>';
                init_find_password_html_str+='<dd class="readStart"><span class="new_reg_pul"><a><img class="readStart" src="/resource/static/image/forget_pswd_err.png" alt=""><label id="find_password_error_context_id" class="readStart alignStart readStart"></label></a></span></dd>';
                init_find_password_html_str+='</dl>';
                init_find_password_html_str+='<dl class="find_pwd1"><dd class="readStart" data-i18n="Forgot_PasswordEnterEmail">{{Forgot_PasswordEnterEmail}}</dd></dl>';
                init_find_password_html_str+='<dl><dd class="readStart"><span class="new_reg_pul"><input type="text" class="txt_login readStart alignStart" id="find_password_login_name" autocomplete="off" placeholder="name@example.com" onblur="window[\'login_util\'][\'find_password_check_login_name\']()"/></span></dd></dl>';
                init_find_password_html_str+='<dl class="new_login_btn"><dd class="readStart"><input type="button" class="btn_base readStart" data-i18n="Forgot_PasswordSend" data-stat="Forgot_PasswordSend" value="{{Forgot_PasswordSend}}" id="find_password_send_emali_submit" onclick="window[\'login_util\'][\'find_password_first_send_email\']()"/></dd></dl>';
                init_find_password_html_str+='</div>';
                init_find_password_html_str+='</div>';
            }

            if($("#find_password_send_email_div_id").length < 1){
                init_find_password_html_str+='<div class="popcont login_tab3" id="find_password_send_email_div_id">';
                init_find_password_html_str+='<div class="new_top_opc"></div>';
                init_find_password_html_str+='<h2 class="new_top_h2"><a href="javascript:void(0);" onclick="window[\'login_util\'][\'hide_password_div\']();" class="popshut readEnd"></a><span class="readStart" data-i18n="Forgot_Password">{{Forgot_Password}}</span></h2>';
                init_find_password_html_str+='<div class="loginDl">';
                init_find_password_html_str+='<div class="err2"><em class="readStart"><img src="/resource/static/image/forget_tip_success.png" alt=""></em><p class="readStart" data-i18n="Forgot_PasswordConfirmationEmailSend">{{Forgot_PasswordConfirmationEmailSend}}</p></div>';
                init_find_password_html_str+='<div class="find_email"><b class="spec_b" id="again_passwod_time">3</b><label data-i18n="Forgot_PasswordSecondsLater">{{Forgot_PasswordSecondsLater}}</label><a href="javascript:void(0);"  id="again_find_password" data-i18n="Forgot_PasswordResend">{{Forgot_PasswordResend}}</a></div>';
                init_find_password_html_str+='</div>';
                init_find_password_html_str+='</div>';
            }
            if($.trim(init_find_password_html_str).length > 0){
                $('#container').i18nAppend(init_find_password_html_str);
            }
            $("#find_password_div_id").hide();
            $("#find_password_send_email_div_id").hide();
            $("#block_div_id").show();

        };

        this.show_login_register_div=function (show_id){
            if(!system_util.is_show(show_id)){
                login_util.register_commit_end();
                $("#login_register_div_id input[type='text'],#login_register_div_id input[type='password']").val('');
                $("#login_register_div_id").show();
                $("#container").css("overflow","hidden");
                $("#"+show_id).show();
                login_util.hide_password_about_div();
            }
        };

        this.hide_block_div=function (){
            $("#block_div_id").hide();
            $("#container").css("overflow","");
        };

        this.hide_login_register_div=function (){
            $('#login_register_div_id .login_Tup a').unbind('click');
            $("#login_register_div_id").hide();
            login_util.hide_block_div();
            cookie_util.delete_cookie(cookie_util.base_attr.rank);
            /*if (typeof task_util != "undefined"){
             task_util.task_update_cookie("task_update",'yes',{ expires:1/86400});
             }*/
        };

        this.show_login_div_back=function (){
            $("#login_error_id").html("").addClass("fix_hide");
            $("#login_btn_submit").val(i18nTranslate('Header_SIGNIN')).attr('disabled', false);
            var ln = user_util.get_login_name();
            if (ln && $.trim(ln) != '') {
                $("#login_login_name").val($.trim(ln));
                $("#upass").focus();
            }else{
                $("#uname").focus();
            }
        };

        this.show_login_div=function (){
            top_util.no_login_top();
            if(!system_util.is_show('login_register_div_id')){
                login_util.init_login_register_html();
                login_util.show_login_register_div("login_div_id");
                login_util.show_login_div_back();
                $(".tab_hide").css({"left":"0px"});
            }
            fbq('track', 'Lead');
        };

        this.show_register_div_back=function (){
            $("#register_div_id input").removeClass("txt_login_err").removeClass("txt_login_succ");
            $("#register_error_id").html("").addClass("fix_hide");
            login_util.change_validate();
            $('#register_div_id .reg_word em').attr('class', 'checked readStart');
        };

        this.show_register_div=function (){
            top_util.no_login_top();
            if(!system_util.is_show('login_register_div_id')){
                login_util.init_login_register_html();
                login_util.show_login_register_div("register_div_id");
                login_util.show_register_div_back();
                $(".login_count").css("display","block");
                $(".tab_hide").css({"left":"-361px"});
            }
        };

        this.login_register_show_animate=function (type){
            $('#login_register_div_id .div1').show();
            if(type==1){
                login_util.show_register_div_back();
                $(".tab_hide").css({"left":"-361px"});
            }else if(type == 0){
                login_util.show_login_div_back();
                $(".tab_hide").css({"left":"0px"});
            }
        };

        this.login_to_register=function () {
            login_util.login_register_show_animate(1);
        };

        this.login_to_find_password=function () {
            login_util.hide_login_register_div();
            login_util.show_find_password_div();
        };

        this.login_to_refresh_vcode=function () {
            var random=Math.ceil(Math.random()*10000),
                oImg=$('#vcodeImg'),
                oldSrc=oImg.attr('src');
            oImg.attr('src',oldSrc+'?random'+random);
        };

        this.register_to_login=function () {
            login_util.login_register_show_animate(0);
        };

        this.change_validate=function () {
            $("#img_validata").attr("src",system_info.base_attr.domain+"image.shtml?r=" + Math.random());
        };

        this.show_login_error=function (obj,text){
            $("#login_error_id").text($.trim(text));
            $("#login_error_id").removeClass("fix_hide");
            if(obj){
                $(obj).addClass("txt_login_err");
                $(obj).focus();
            }
        };

        this.hide_login_error=function (){
            $("#login_error_id").addClass("fix_hide");
        };

        this.remove_login_error=function (){
            login_util.hide_login_error();
            $("#login_div_id input").removeClass("txt_login_err");
        };
        this.login=function (){
            login_util.remove_login_error();
            var username = $.trim($("#login_login_name").val());
            if (username == "") {
                login_util.show_login_error($("#login_login_name"),i18nTranslate('SignBox_EnterEmail'));
                return;
            }
            var passwd = $("#login_password").val();
            if (passwd == "") {
                login_util.show_login_error($("#login_password"),i18nTranslate('SignBox_EnterPassword'));
                return;
            }
            var vcode='';
            if(!$('#vcodeBox').hasClass('hidden')){
                vcode= $("#login_vcode").val();
                if (vcode == "") {
                    login_util.show_login_error($("#login_vcode"),i18nTranslate('SignBox_EnterVcode'));
                    return;
                }
            }
            $("#login_btn_submit").attr('disabled', true);
            $("#login_btn_submit").val(i18nTranslate('SignBox_Signing'));
            var ajaxLogin = $.ajax({
                type : "post",
                timeout : 30000,
                url : system_info.base_attr.domain + "service/user/v3/login/web",
                dataType: 'jsonp',
                jsonp: "callbackparam",
                jsonpCallback:"window['login_util']['login_back']",
                data : {
                    loginName : username,
                    password : passwd,
                    srank : vcode,
                    fromType : 1
                },
                complete : function(XMLHttpRequest,status){ //请求完成后最终执行参�?\
                    if(status=='timeout'){//超时,status还有success,error等值的情况
                        $("#login_btn_submit").val(i18nTranslate('Header_SIGNIN')).attr('disabled', false);
                        login_util.show_login_error(null,i18nTranslate('SignBox_SignFailed'));
                    }
                },
                error:function(XMLHttpRequest, textStatus, errorThrown) {
                }
            });

        };

        this.login_success=function (data){
            if(data && data.code == 0){
                user_util.reset_user_info(data);
                if(data.dataInfo.firstLogin){
                    promotion_util.submit_user_register(data.dataInfo.userId);
                }
                if(this.successHandler)
                    this.successHandler();
                else
                {
                    if(system_info.base_attr.web_site == 0){
                        top_util.load_rich_or_host_level();
                    }else if(system_info.base_attr.web_site == 1){
                        chat_util.reconnection();
                    }else{
                        window.location.reload();
                    }
                }
                login_util.hide_login_register_div();
            }
            //top_util.init_ticket_show();

            if (typeof eid_festvial_util != "undefined"){
                eid_festvial_util.eid_end();
            }
            if (typeof task_util != "undefined"){
                task_util.init_task();
            }
            /*if (typeof room_util != "undefined"){
             room_util.init_eid_mail();
             }*/
        };

        this.login_back=function (data){
            if (data.code == 0) {
                login_util.login_success(data);
            } else if(data.code == 66){
                login_util.show_login_error(null,i18nTranslate('SignBox_AccountBeenBanned'));
            } else if(data.code == 4005) {
                $('#vcodeBox').removeClass('hidden');
                $('#vcodeRefBtn').removeClass('hidden').css("display","block");
                $('#login_vcode').focus();
            } else if(data.code == 4000){
                $("#upass").val("");
                login_util.show_login_error($("#upass"),i18nTranslate('SignBox_VcodeIncorrect'));
            } else {
                $("#upass").val("");
                login_util.show_login_error($("#upass"),i18nTranslate('SignBox_EmailPasswordIncorrect'));
            }
            $("#login_btn_submit").attr('disabled', false);
            $("#login_btn_submit").val(i18nTranslate('Header_SIGNIN'));

            this.login_to_refresh_vcode();


        };

        this.check_fackbook_login_status=function (){
            FB.getLoginStatus(function(response) {
                if (response.status === 'connected') {
                    var token=response.authResponse.accessToken;
                    FB.api('/me', function(responseMe) {
                        login_util.trd_register_login(responseMe.id,token,responseMe.name,2);
                    });
                }else if (response.status === 'not_authorized') {
                    login_util.facebook_login();
                }else {
                    login_util.facebook_login();
                }
            });
        };

        this.facebook_login=function (){
            loading_tip.loading_body();
            FB.login(function(response){
                loading_tip.loading_hide();
                var token=response.authResponse.accessToken;
                if (response.status === 'connected') {
                    FB.api('/me', function(responseMe) {
                        login_util.trd_register_login(responseMe.id,token,responseMe.name,2);
                    });
                }else if (response.status === 'not_authorized'){
                } else{
                }
            });
        };
        this.twitter_login=function () {

            loading_tip.loading_body();
            $.ajax({
                type : "post",
                url : system_info.base_attr.domains + "user_twitterLogin.fly",
                dataType: 'jsonp',
                jsonp: "callbackparam",
                jsonpCallback:"window['login_util']['twitter_to_login']"
            });
        };

        this.twitter_to_login=function(data){
            if(data.code == 0){
                system_util.open_win(data.dataInfo);
            }else{
                loading_tip.loading_hide();
            }
        };

        this.twitter_login_cancel=function (){
            loading_tip.loading_hide();
        };

        this.twitter_login_back=function (userId,token,userName){
            login_util.trd_register_login(userId,token,userName,3);
        };

        this.google_login_back=function (authResult){
            if(authResult && authResult['error'] == undefined){
                gapi.auth.setToken(authResult)
                gapi.client.load('oauth2', 'v2', function() {
                    var request = gapi.client.oauth2.userinfo.get();
                    request.execute(login_util.google_user_info);
                });
            }
        };

        this.google_user_info=function(obj){
            if(obj){
                login_util.trd_register_login(obj.id,gapi.auth.getToken().access_token,obj.name,4);
            }
        };

        this.trd_login_back=function (data){
            loading_tip.loading_hide();
            if (data.code == 0) {
                console.log(data)
                login_util.login_success(data);
                system_util.clear_trd_cookie();
                login_util.hide_login_register_div();
                fbq('track', 'CompleteRegistration');
            }else if(data.code==7){
                var nickname = data.dataInfo.nickName;
                nickname += (Math.random()+'').substr(2,4);
                login_util.trd_register_login(data.dataInfo.loginName,data.dataInfo.password,nickname,data.dataInfo.fromType);
            }else if(data.code==601){
                var nickname = (Math.random()+'').substr(2,6);
                login_util.trd_register_login(data.dataInfo.loginName,data.dataInfo.password,nickname,data.dataInfo.fromType);
            }else{
                $.tip_simple_alert(i18nTranslate('Email or password is incorrect'));
                FB.logout(function(response) {
                });
            }
        };

        this.trd_register_login=function (id,pwd,nickname,fromType){
            // 第三方登录回调
            $.ajax({
                type : "post",
                url : system_info.base_attr.domains + "service/user/v3/login/web",

                data : {
                    loginName : id,
                    password : pwd,
                    nickName : nickname,
                    fromType : fromType
                },
                dataType: 'jsonp',
                jsonp: "callbackparam",
                jsonpCallback:"window['login_util']['trd_login_back']"
            });

        };

        this.show_register_error=function(obj,error_str){
            $(obj).removeClass("txt_login2");
            if(error_str && $.trim(error_str) != '0'){
                $("#register_error_id").html(error_str).removeClass("fix_hide");
                if(obj){
                    $(obj).removeClass("txt_login5");
                    $(obj).addClass("txt_login_err");
                }
            }else if(error_str && $.trim(error_str) == '0'){
                login_util.hide_register_error();
                if(obj){
                    $(obj).removeClass("txt_login_err");
                    $(obj).addClass("txt_login5");
                }
            }
            login_util.register_commit_end();
            $("#reg_submit").attr('disabled', $("#register_div_id .txt_login_on").length > 0);
        };

        this.hide_register_error=function (){
            $("#register_error_id").addClass("fix_hide");
        };

        this.remove_register_error=function (){
            login_util.hide_register_error();
            $("#register_error_id input").removeClass("txt_login_err");;
        };

        this.register_check_login_name=function (is_async){
            var obj =  $("#reg_Email");
            return login_util.check_login_name(is_async,obj,'show_register_error');
        };

        this.register_check_nick_name=function (is_async){
            var obj =  $("#reg_nickName");
            return login_util.check_nick_name(is_async,obj,'show_register_error');
        };

        this.register_check_password=function (){
            return login_util.check_password($("#reg_pwd"),'show_register_error');
        };

        this.register_check_validate=function (is_async){
            return login_util.check_validate(is_async,$("#reg_valid"),'show_register_error');
        };

        this.show_service_terms=function (){
            var user_service_url = system_info.base_attr.domain + 'support/agreement';
            system_util.open_win(user_service_url);
        };

        this.register_committing=function (){
            login_util.remove_register_error();
            $("#reg_submit").attr('disabled', true);
            $("#reg_submit").val(i18nTranslate('SignBox_Registering'));
        };

        this.register_commit_end=function (){
            $("#reg_submit").attr('disabled', false);
            $("#reg_submit").val(i18nTranslate('Header_SIGNUP'));
        };

        this.register=function () {
            login_util.register_committing();
            if (!login_util.register_check_login_name(false)) {
                login_util.register_commit_end();
                return false;
            }

            if (!login_util.register_check_nick_name(false)) {
                login_util.register_commit_end();
                return false;
            }

            if (!login_util.register_check_password()) {
                login_util.register_commit_end();
                return false;
            }

            if (!login_util.register_check_validate(false)) {
                login_util.register_commit_end();
                return false;
            }

            var ln = $.trim($("#reg_Email").val());
            var nn = $.trim($("#reg_nickName").val());
            var pwd = $.trim($("#reg_pwd").val());
            var rank = $.trim($("#reg_valid").val());
            loading_tip.loading_body();
            //注册，本版本放弃；
            //$.ajax({
            //    url : system_info.base_attr.domains + "user_register.fly",
            //    type : "post",
            //    data : {
            //        loginName : ln,
            //        nickName : nn,
            //        sex : 1,
            //        password : pwd,
            //        srank : rank
            //    },
            //    dataType: 'jsonp',
            //    jsonp: "callbackparam",
            //    jsonpCallback:"window['login_util']['register_back']"
            //});
        };

        this.register_back=function (data){
            loading_tip.loading_hide();
            if (data.code == 0) {
                login_util.login_success(data);
            } else if(data.code == 601){
                login_util.show_register_error(null,string_util.format(i18nTranslate('SignBox_NotAllowedNickname'),data.dataInfo['nickName']));
            } else {
                login_util.show_register_error(null,i18nTranslate('SignBox_RegisterFrequently'));
            }
            login_util.register_commit_end();
        };

        this.check_login_name=function (is_async,obj,back_obj,back_fun) {

            var login_name = $(obj).val();
            var fun_obj = back_fun? window[back_obj][back_fun]:window['login_util'][back_obj];
            if(!login_name || login_name ==''){
                fun_obj(obj,i18nTranslate('SignBox_EnterEmail'));
                return false;
            }

            if(!system_util.check_email(login_name)){
                fun_obj(obj,i18nTranslate('SignBox_EnterValidEmail'));
                return false;
            }

            var regex_uid = /^[a-z|A-Z|0-9|\@|\.|\_|\-]{5,40}$/;
            if (!regex_uid.test(login_name)) {
                fun_obj(obj,i18nTranslate('SignBox_EnterEmailLength'));
                return false;
            }

            $.ajax({
                url : system_info.base_attr.domain + "service/user/v3/name/valid",
                type : "get",
                async: is_async,
                data : {loginName : login_name},
                dataType : "json",
                success : function(data) {
                    console.log(data)
                    var bool = $("#find_password_div_id").length > 0 ? $("#find_password_div_id").is(":hidden") : true;
                    if (data.code != 0) {
                        if(!bool && data.code == 4){
                            fun_obj(obj,data.code);
                            return true;
                        }else{
                            fun_obj(obj,i18nTranslate('SignBox_EmailRegistered'));
                            return false;
                        }
                    }else{
                        fun_obj(obj,'0');
                        return bool ? true : false;
                    }
                }
            });
            return true;
        };

        this.check_nick_name=function (is_async,obj,back_obj,back_fun) {
            var nick_name = $.trim($(obj).val());
            var fun_obj = back_fun? window[back_obj][back_fun]:window['login_util'][back_obj];
            if(!nick_name || nick_name==''){
                fun_obj(obj,i18nTranslate('SignBox_EnterNickname'));
                return false;
            }

            if (!system_util.check_name(nick_name)) {
                fun_obj(obj,string_util.format(i18nTranslate('SignBox_NotAllowedNickname'),nick_name));
                return false;
            }

            var len =  system_util.get_byte_length(nick_name);
            if(len < 2 || len > 25) {
                fun_obj(obj,i18nTranslate('SignBox_NicknameLength'));
                return false;
            }

            $.ajax({
                url : system_info.base_attr.domain + "service/user/v3/nick/valid",
                type : "get",
                async: is_async,
                data : {
                    nick : nick_name
                },
                dataType : "json",
                success : function(data) {
                    console.log(data)
                    if (data.code != 0) {
                        if(data.code == 601){
                            fun_obj(obj,string_util.format(i18nTranslate('SignBox_NotAllowedNickname'),nick_name));
                            return false;
                        }
                        fun_obj(obj,i18nTranslate('SignBox_NicknameInUse'));
                        return false;
                    }else{
                        fun_obj(obj,'0');
                        return true;
                    }
                }
            });
            return true;
        };

        this.check_password=function (obj,back_obj,back_fun) {
            var password = $.trim($(obj).val());
            var fun_obj = back_fun? window[back_obj][back_fun]:window['login_util'][back_obj];
            if(!password || password == ''){
                fun_obj(obj,i18nTranslate('SignBox_EnterPassword'));
                return false;
            }
            var regex_pwd = /^(.){6,20}$/;
            if (!regex_pwd.test(password)) {
                fun_obj(obj,i18nTranslate('SignBox_EmailPasswordIncorrect'));
                return false;
            } else {
                fun_obj(obj,'0');
                return true;
            }
        };

        this.check_validate=function (is_async,obj,back_obj,back_fun) {
            var validate = $.trim($(obj).val());
            var fun_obj = back_fun? window[back_obj][back_fun]:window['login_util'][back_obj];
            if(!validate || validate.length<1){
                fun_obj(obj,i18nTranslate('SignBox_EnterVerificationCode'));
                return false;
            }

            if(validate.length<4){
                fun_obj(obj,i18nTranslate('SignBox_EnterCorrectVerificationCode'));
                return false;
            }

            $.ajax({
                url:system_info.base_attr.domain+"service/user/v3/validate/valid",
                type:"get",
                async: is_async,
                data:{srank:validate},
                dataType:"json",
                success:function(data){
                    console.log(data);
                    if(data.code==0) {
                        fun_obj(obj,'0');
                        return true;
                    } else{
                        fun_obj(obj,i18nTranslate('SignBox_EnterCorrectVerificationCode'));
                        return false;
                    }
                }});
            return true;
        };

        this.init_nick_name=function (){
            var nick_name = $.trim($("#reg_nickName").val());
            if(nick_name == ''){
                var login_name = $.trim($("#reg_Email").val());
                if(login_name != ''){
                    var nick_name_temp = login_name.split('@',1)[0];
                    login_util.check_db_nick_name(nick_name_temp,'register_set_nick_name');
                }
            }
        };

        this.register_set_nick_name=function (nick_name){
            $("#reg_nickName").val($.trim(nick_name));
        };

        this.check_db_nick_name=function (nick_name,back_obj,back_fun){
            var fun_obj = back_fun? window[back_obj][back_fun]:window['login_util'][back_obj];
            $.ajax({
                url : system_info.base_attr.domain + "service/user/v3/nick/valid",
                type : "get",
                async: false,
                data : {
                    nick : nick_name
                },
                dataType : "json",
                success : function(data) {
                    console.log(data)
                    if (data.code != 0) {
                        if(data.code == 601){
                            nick_name = (Math.random()+'').substr(2,6);
                        }else{
                            nick_name += (Math.random()+'').substr(2,4);
                        }
                        login_util.check_db_nick_name(nick_name,back_obj,back_fun);
                    }else{
                        fun_obj(nick_name);
                    }
                }
            });
        };

        this.hide_password_div=function (){
            login_util.hide_block_div();
            login_util.hide_password_about_div();
        };

        this.hide_password_about_div=function (){
            $("#find_password_div_id").hide();
            $("#find_password_send_email_div_id").hide();
        };

        this.remove_find_password_error=function (){
            $("#find_password_error_context_id").text('');
            $("#find_password_error_id").hide();
            $("#find_password_div_id input").removeClass("txt_login_err");
        };

        this.show_find_password_div_back=function (){
            login_util.remove_find_password_error();
            $("#find_password_login_name").val('');
        };

        this.show_find_password_div=function (){
            login_util.hide_login_register_div();
            login_util.init_find_password_html();
            login_util.show_find_password_div_back();
            $("#find_password_div_id").show();
        };

        this.show_find_password_send_email_div=function (){
            login_util.hide_login_register_div();
            login_util.init_find_password_html();
            $("#find_password_send_email_div_id").show();
        };

        this.find_password_check_login_name=function(){
            var obj =  $("#find_password_login_name");
            return login_util.check_login_name(true,obj,'login_util','find_password_check_login_name_back');
        };

        this.find_password_check_login_name_back=function (obj,text){
            if($.trim(text) != 4){
                if($.trim(text) == 0){
                    text = $.trim(i18nTranslate('SignBox_EmailNotRegistered'));
                }
                $("#find_password_error_context_id").html($.trim(text));
                $("#find_password_error_id").show();
                if(obj){
                    $(obj).addClass("txt_login_err");
                    $(obj).focus();
                }
            }else{
                login_util.remove_find_password_error();
            }
        };

        this.find_password_first_send_email=function (){
            $("#find_password_send_emali_submit").val(i18nTranslate('Forgot_PasswordSending')).attr('disabled', true);
            if (!login_util.check_login_name(true,$("#find_password_login_name"),'find_password_check_login_name_back')) {
                $("#find_password_send_emali_submit").val(i18nTranslate('Forgot_PasswordSend')).attr('disabled',false);
                return false;
            }
            var login_name = $("#find_password_login_name").val();
            login_util.find_password_send_email_val = '';
            login_util.find_password_send_email(login_name);
        };

        this.find_password_send_email=function (login_name){

            if(login_util.is_find_password){
                return;
            }
            login_util.is_find_password = true;
            var langurage = require(useJSComponent('kit')).use('I18N').language;
               // I18N = Kit.use('I18N')
           // var langurage = Cookie.get(Cookie.key['locale']);
            console.log(langurage)
            if(!login_name){
                login_name = login_util.find_password_send_email_val;
            }
            $.ajax({
                url : system_info.base_attr.domain + "service/user/v3/forgetPwd",
                type : "post",
                data : {
                    login_name : login_name,
                    lg:langurage
                },
                dataType : "json",
                success : function(data) {
                    console.log(data)
                    $("#find_password_send_emali_submit").val(i18nTranslate('Forgot_PasswordSend')).attr('disabled',false);
                    if (data.code == 0) {
                        if(login_util.find_password_send_email_val != $.trim(login_name)){
                            login_util.find_password_send_email_val = $.trim(login_name);
                            login_util.show_find_password_send_email_div();
                        }
                        //$("#again_find_password").hide();
                        $("#again_find_password").attr("onclick","")
                        $("#again_find_password").css("background","#a6a6a6")
                        $("#again_passwod_time").text(3);
                        var timer = setInterval(function(){
                            var time = parseInt($.trim($("#again_passwod_time").text()))-1;
                            $("#again_passwod_time").text(time < 1 ? 0 : time);
                            if(time < 1){
                                clearInterval(timer);
                                //$("#again_find_password").show();
                                $("#again_find_password").attr("onclick","window['login_util']['find_password_send_email']();");
                                $("#again_find_password").css("background","#0ba29a");
                                login_util.is_find_password = false;
                            }
                        },1000);


                    }else{
                        login_util.find_password_check_login_name_back($("#find_password_login_name"),i18nTranslate('Forgot_PasswordSendError'));
                        login_util.is_find_password = false;
                    }
                },error:function(){
                    login_util.is_find_password = false;
                }
            });
        };
        //退出登录
        this.user_out=function(){
            window.location.reload();
        };

    };

    var top_util =window['top_util']=new function(){
        this.base_attr={
            on_top_user_detail_state:0,
            popup_message_timer:null,
            popup_message_time:5*1000*60,
            message_state_time:5*1000*60
        };

        this.load_rich_or_host_level=function(){
            if(user_util.user_info){
                if(user_util.user_info.hostInfo){
                    if(typeof(host_level_data) == 'undefined'){
                        system_data_util.load_async_host_level_data("top_util","init_top");
                        return;
                    }
                }else{
                    if(typeof(rich_level_data) == 'undefined'){
                        system_data_util.load_async_rich_level_data("top_util","init_top");
                        return;
                    }
                }
            }
            top_util.init_top();
        };

        this.no_login_top=function(){
            $("[name='user_balance']").text(0);
            $("#top_no_login").show();
            $("#top_login_info").hide();
            $(".evlp_btn_block").hide();
            $(".lev_signin").show();
            $(".lev_pro").hide();
            $(".user_exp_circle").hide();

            if($("#trd_login_new").length > 0){
                $("[name='google_login']").attr('data-callback',"google_login_back");
                $("#trd_login_new").show();
            }

            if($("#sign").length > 0 &&  typeof(sign_util) != 'undefined'){
                sign_util.sign_highlight();
            }

            if($("#favorite").length > 0 && typeof(index_left_util) != 'undefined' ){
                index_left_util.init_favorite();
            }
        };

        this.init_top=function(identity) {
            if(identity)
            {

                user_util.is_init_user_info = true;
                user_util.user_info = identity;
            }
            if(!user_util.is_init_user_info){
                setTimeout(function(){top_util.init_top();}, 500);
                return;
            }

            if (!user_util.user_info) {
                top_util.no_login_top();
            } else {
                if($("#trd_login_new").length > 0){
                    $("#trd_login_new").hide();
                }

                $("#top_no_login").hide();
                $("#top_login_info").show();
                $(".lev_signin").hide();
                $(".lev_pro").show();
                $(".user_exp_circle").show();

                $("[name='nick_name']").text(user_util.user_info.nickName);
                if(!user_util.user_info.headPic)
                    user_util.user_info.headPic = 'systemRes/img/default/nophoto.jpg'
                $("[name='user_head']").attr('src', system_info.base_attr.imageUrl + user_util.user_info.headPic);
                $('#control_box_nick_name_input').val(user_util.user_info.nickName);
                if ((user_util.user_info.userType == 1 && user_util.user_info.actorflg == 1)||(identity['host']&&identity['userType']==1)) {
                    var  userSurfing=user_util.user_info.surfing?user_util.user_info.surfing:identity['userSurfing'];
                    $("#top_self_living").attr("href", system_info.base_attr.domain + 'live/' + userSurfing);
                    $("#top_self_living").removeClass("hidden");
                }
                else {
                    //$("#top_self_living").attr("href", system_info.base_attr.domain + 'live/' + user_util.user_info.surfing);
                    $("#top_self_living").hide();
                    //$('#control_my_favorite').addClass("only_a");
                }

                /*$("#div_top_manage").hover(function() {
                 $('#top_user_detail').show();
                 }, function() {
                 top_util.hide_user_detail();
                 $('#top_user_detail').hide();
                 });

                 $("#top_user_detail").hover(function() {
                 $('#top_user_detail').show();
                 }, function() {
                 top_util.hide_user_detail();
                 $('#top_user_detail').hide();
                 });*/
                top_util.show_user_detail();

                user_util.reset_user_info_blance('top_util','reset_user_balance');

                if($("#sign").length > 0 && typeof(sign_util) != 'undefined'){
                    sign_util.base_attr.user_sgin_info = null;
                    sign_util.init_sign();
                }

                if($("#favorite").length > 0 && typeof(index_left_util) != 'undefined' ){
                    index_left_util.init_favorite();
                }

                if($(".evlp_btn_block") && $(".evlp_btn_block").length > 0){
                    $(".evlp_btn_block").show();
                    $(".evlp_btn_block").unbind("click").click(function(){
                        if (!user_util.is_login(true)) {
                            return;
                        }
                        $(".red_dot2").css("display","none");

                    });
                    top_util.reset_message_state();
                }

                if($(".sysmesg_box") && $(".sysmesg_box").length > 0){
                    top_util.reset_popup_message();
                }
            }
            login_util.init_login();
        };

        this.reset_user_balance=function(){
            if(user_util.user_info){
                $("[name='user_balance']").text(user_util.user_info.balance + user_util.user_info.returnBalance);
            }else{
                user_util.user_sure('top_util','reset_user_balance');
            }
        };

        this.show_user_detail=function(){
            if(!system_util.is_show('top_user_detail')){
                top_util.reset_user_balance();
                top_util.reset_user_level();
            }
            top_util.base_attr.on_top_user_detail_state = 1;
        };

        this.hide_user_detail=function(){
            top_util.base_attr.on_top_user_detail_state =  2;
            setTimeout(function() {
                if (top_util.base_attr.on_top_user_detail_state == 2) {
                    top_util.base_attr.on_top_user_detail_state = 0;
                }
            }, 500);
        };

        this.init_control_box=function(){
            $('#errorTip').hide();
            var l_nickname = $('#control_box_nick_name_lable').text();
            $('#control_box_nick_name_input').val(l_nickname);
            $("#control_box_nick_name_display").show();
        };

        this.reset_user_level=function(){
            var level = 0, level_score = 0, level_obj = null, next_level_obj = null;
            if (!user_util.user_info.hostInfo) {
                level = user_util.user_info.richLevel;
                level_score = user_util.user_info.richScore;
                level_obj = system_data_util.get_rich_level_info(user_util.user_info.richLevel);
                next_level_obj = system_data_util.get_rich_level_info(user_util.user_info.richLevel + 1);
                //等级曲线图坐标点
                //if($(".user_exp_circle")){
                //	$(".user_exp_circle").removeClass().addClass("user_exp_circle user_exp_circle_lv"+level);
                //	$(".user_exp_circle").show();
                //}
            } else {
                level = user_util.user_info.hostInfo.hostLevel;
                level_score = user_util.user_info.hostInfo.hostScore;
                level_obj = system_data_util.get_host_level_info(user_util.user_info.hostInfo.hostLevel);
                next_level_obj = system_data_util.get_host_level_info(user_util.user_info.hostInfo.hostLevel + 1);
                if($(".user_exp_circle")){
                    $(".user_exp_circle").hide();
                }
            }
            //等级曲线图坐标点
            if($(".user_exp_circle")){
                $(".user_exp_circle").removeClass().addClass("user_exp_circle user_exp_circle_lv"+level);
                $(".user_exp_circle").show();
            }
            var exp = 100;
            if (level_obj) {
                if (next_level_obj) {
                    exp = (((level_score - level_obj.score) / (next_level_obj.score - level_obj.score)) * 100).toFixed(0);
                }
                $("[name='level_img']").attr("src", system_info.base_attr.imageUrl + level_obj.pic);
            }
            exp = exp > 100 ? 100 : exp < 0 ? 0 : exp;
            $("[name='level_persent']").css({width : (exp < 15 ? (exp < 1? 0:15) : exp) + '%'});
            if(exp < 1){
                $("[name='level_persent'] font").attr('color','#868181');
            }else{
                $("[name='level_persent'] font").removeAttr('color');
            }
            $("[name='level_persent'] font").text(exp + '%');
            var score = 0;
            if (next_level_obj) {
                score = next_level_obj.score - level_score;
            }
            $("[name='next_exp']").text(score > 0 ? score : (score < 0 ? 0 : score));
            $(".contr_set_info dd .lev_hover a").text(score > 0 ? score : (score < 0 ? 0 : score));
            $("#control_box_nick_name_edit span").hover(function(){
                $('.control_box .lev_hover').show();
            },function(){
                $('.control_box .lev_hover').hide();
            });

        };
        this.select_top_nemu=function (idx) {
            $("#top .load_top_right .hall_top_load li a").removeClass("on");
            $("#top .load_top_right .hall_top_load li a").eq(idx).addClass("on");
        };

        //升级提醒窗口
        this.init_upgrade_level = function(level_num,DATASOURCE){
            var detail_html_str="";
            var DATASOURCE =DATASOURCE;
            var level_obj = DATASOURCE['richLevel'][user_util.user_info.richLevel];
            if(level_num > 22 && level_num!=25 && level_num!=30 && level_num!=40 && level_num!=50 || level_num < 10){
                detail_html_str+='<div class="upgrade_level">';
                detail_html_str+='<div class="upgrade_close"></div>';
                detail_html_str+='<div class="upgrade_word">'+string_util.format(i18nTranslate('LevelUp_Congrats'),level_num)+'</div>';
                //detail_html_str+='<p class="upgrade_level_icon"><img src="'+system_info.base_attr.imageUrl + level_obj.pic+'" alt=""></p>';
                detail_html_str+='</div>';
            }else{
                detail_html_str+='<div class="upgrade_gift">';
                detail_html_str+='<div class="upgrade_close"></div>';
                detail_html_str+='<div class="upgrade_word">'+string_util.format(i18nTranslate('LevelUp_Congrats'),level_num)+'</div>';
                //detail_html_str+='<p class="upgrade_level_icon"><img src="'+system_info.base_attr.imageUrl + level_obj.pic+'" alt=""></p>';
                detail_html_str+='<div class="upgrade_word2" data-i18n="LevelUp_GetPrivileges">{{LevelUp_GetPrivileges}}</div>';
                detail_html_str+='<ul class="upgrade_gift_icon">';
                switch (level_num)
                {
                    case 10:
                        detail_html_str+='<li class="icon_01 icon_03"><img src="'+system_info.base_attr.imageUrl+'face/man_hi.png" alt="man_hi"></li>';
                        detail_html_str+='<li class="icon_01 icon_03"><img src="'+system_info.base_attr.sysResource+'imgNew/home_img/gift_bg32.png" alt=""><em>4</em></li>';
                        detail_html_str+='<li class="icon_01 icon_03"><img src="'+system_info.base_attr.sysResource+'imgNew/home_img/gift_bg33.png" alt=""><b>9&prime;</b></li>';
                        break;
                    case 11:
                        detail_html_str+='<li class="icon_01"><img src="'+system_info.base_attr.imageUrl+'face/man_bye.png" alt="man_bye"></li>';
                        break;
                    case 12:
                        detail_html_str+='<li class="icon_01"><img src="'+system_info.base_attr.imageUrl+'face/man_laugh.png" alt="man_laugh"></li>';
                        break;
                    case 13:
                        detail_html_str+='<li class="icon_01"><img src="'+system_info.base_attr.imageUrl+'face/man_cry.png" alt="man_cry"></li>';
                        break;
                    case 14:
                        detail_html_str+='<li class="icon_01"><img src="'+system_info.base_attr.imageUrl+'face/man_query.png" alt="man_query"></li>';
                        break;
                    case 15:
                        detail_html_str+='<li class="icon_01 icon_03"><img src="'+system_info.base_attr.imageUrl+'face/man_sleep.png" alt="man_sleep"></li>';
                        detail_html_str+='<li class="icon_01 icon_03"><img src="'+system_info.base_attr.sysResource+'imgNew/home_img/gift_bg32.png" alt=""><em>5</em></li>';
                        detail_html_str+='<li class="icon_01 icon_03"><img src="'+system_info.base_attr.sysResource+'imgNew/home_img/gift_bg33.png" alt=""><b>8&prime;</b></li>';
                        break;
                    case 16:
                        detail_html_str+='<li class="icon_01 icon_02"><img src="'+system_info.base_attr.imageUrl+'face/man_embarrassed.png" alt="man_embarrassed"></li>';
                        detail_html_str+='<li class="icon_01 icon_02"><img src="'+system_info.base_attr.imageUrl+'face/man_dizzy.png" alt="man_dizzy"></li>';
                        break;
                    case 17:
                        detail_html_str+='<li class="icon_01 icon_02"><img src="'+system_info.base_attr.imageUrl+'face/man_knock.png" alt="man_knock"></li>';
                        detail_html_str+='<li class="icon_01 icon_02"><img src="'+system_info.base_attr.imageUrl+'face/man_funny.png" alt="man_funny"></li>';
                        break;
                    case 18:
                        detail_html_str+='<li class="icon_01 icon_02"><img src="'+system_info.base_attr.imageUrl+'face/man_welcome.png" alt="man_welcome"></li>';
                        detail_html_str+='<li class="icon_01 icon_02"><img src="'+system_info.base_attr.imageUrl+'face/man_surprised.png" alt="man_surprised"></li>';
                        break;
                    case 19:
                        detail_html_str+='<li class="icon_01 icon_02"><img src="'+system_info.base_attr.imageUrl+'face/man_angry.png" alt="man_angry"></li>';
                        detail_html_str+='<li class="icon_01 icon_02"><img src="'+system_info.base_attr.imageUrl+'face/man_sliver.png" alt="man_sliver"></li>';
                        break;
                    case 20:
                        detail_html_str+='<li class="icon_01 icon_04"><img src="'+system_info.base_attr.imageUrl+'face/man_wow.png" alt="man_wow"></li>';
                        detail_html_str+='<li class="icon_01 icon_04"><img src="'+system_info.base_attr.imageUrl+'face/man_walk.png" alt="man_walk"></li>';
                        detail_html_str+='<li class="icon_01 icon_04"><img src="'+system_info.base_attr.sysResource+'imgNew/home_img/gift_bg32.png" alt=""><em>6</em></li>';
                        detail_html_str+='<li class="icon_01 icon_04"><img src="'+system_info.base_attr.sysResource+'imgNew/home_img/gift_bg33.png" alt=""><b>7&prime;</b></li>';
                        break;
                    case 21:
                        detail_html_str+='<li class="icon_01 icon_02"><img src="'+system_info.base_attr.imageUrl+'face/man_dance.png" alt="man_dance"></li>';
                        detail_html_str+='<li class="icon_01 icon_02"><img src="'+system_info.base_attr.imageUrl+'face/man_sing.png" alt="man_sing"></li>';
                        break;
                    case 22:
                        detail_html_str+='<li class="icon_01 icon_02"><img src="'+system_info.base_attr.imageUrl+'face/man_love.png" alt="man_love"></li>';
                        detail_html_str+='<li class="icon_01 icon_02"><img src="'+system_info.base_attr.imageUrl+'face/man_kiss.png" alt="man_kiss"></li>';
                        break;
                    case 25:
                        detail_html_str+='<li class="icon_01"><img src="'+system_info.base_attr.sysResource+'imgNew/home_img/gift_bg32.png" alt=""><em>7</em></li>';
                        break;
                    case 30:
                        detail_html_str+='<li class="icon_01 icon_02"><img src="'+system_info.base_attr.sysResource+'imgNew/home_img/gift_bg32.png" alt=""><em>8</em></li>';
                        detail_html_str+='<li class="icon_01 icon_02"><img src="'+system_info.base_attr.sysResource+'imgNew/home_img/gift_bg33.png" alt=""><b>6&prime;</b></li>';
                        break;
                    case 40:
                        detail_html_str+='<li class="icon_01"><img src="'+system_info.base_attr.sysResource+'imgNew/home_img/gift_bg32.png" alt=""><em>9</em></li>';
                        break;
                    case 50:
                        detail_html_str+='<li class="icon_01 icon_02"><img src="'+system_info.base_attr.sysResource+'imgNew/home_img/gift_bg32.png" alt=""><em>10</em></li>';
                        detail_html_str+='<li class="icon_01 icon_02"><img src="'+system_info.base_attr.sysResource+'imgNew/home_img/gift_bg33.png" alt=""><b>5&prime;</b></li>';
                        break;
                };
                detail_html_str+='</ul>';
                detail_html_str+='<a href="/act/level " target="_blank" data-i18n="LevelUp_LearnMore">{{LevelUp_LearnMore}}</a>';
                detail_html_str+='</div>';
            };
            $("#container").i18nAppend(detail_html_str);
            $('#container').append('<div id="block_div_id02" style="background-color: #000000;left: 0;position: fixed;top: 0;width: 100%; height: 100%; z-index: 9999; opacity: 0.7;display:none;"></div>');
            $("#block_div_id02").show();
            $(".upgrade_close").click(function(){
                $(".upgrade_level, .upgrade_gift").hide();
                $("#block_div_id02").hide();
            });
        };

        this.reset_popup_message=function(){
            //console.log(1)
            //$(".sysmesg_box").hide();
            //if(top_util.base_attr.popup_message_timer){
            //    clearTimeout(top_util.base_attr.popup_message_timer);
            //    top_util.base_attr.popup_message_timer = null;
            //}
            //top_util.get_popup_message();
        }

        this.get_popup_message=function(){
            //console.log(2)
            //if(!user_util.is_login(false)){
            //    $(".sysmesg_box").hide();
            //    return;
            //}
            //
            //var language=1,language_str = 'ar';
            //var reg = new RegExp("(^| )locale=([^;]*)(;|$)");
            //var arr = document.cookie.match(reg);
            //if (arr) {
            //    language_str = unescape(arr[2])
            //}
            //if(language_str == 'en'){
            //    language = 2;
            //}
            //$.ajax({
            //    type : "post",
            //    url : system_info.base_attr.domain + "user_getUserPopupMessage.fly",
            //    dataType: 'json',
            //    data:{language:language},
            //    success:function(data){
            //        if(data.code == 0 && data.dataInfo){
            //            if(!$(".sysmesg_box").is(":hidden")){
            //                var context = $(".sysmesg_box .sysmesg_box_nomtxt").html();
            //                var broadcastId = $(".sysmesg_box .sysmesg_box_nomtxt").attr("broadcastId");
            //                if(data.dataInfo["id"] == broadcastId && data.dataInfo['content'] == context){
            //                    return;
            //                }
            //            }
            //
            //            $(".sysmesg_box").hide();
            //            var link = data.dataInfo['linkUrl'];
            //            var contentText = data.dataInfo['content'];
            //            content = contentText.replace(/\r\n|\r|\n/gi,"<br />");
            //            $(".sysmesg_box a.sysmesg_box_hrf").hide();
            //            $(".sysmesg_box .sysmesg_box_nomtxt").attr("broadcastId",data.dataInfo['id'])
            //            $(".sysmesg_box .sysmesg_box_nomtxt").html(content);
            //            if(link && $.trim(link) != ''){
            //                //$(".sysmesg_box a.sysmesg_box_hrf").attr("href",link).show();
            //                $(".sysmesg_box a.sysmesg_box_hrf").show();
            //                $(".sysmesg_box a.sysmesg_box_hrf").unbind("click").click(function(){
            //                    var a = document.createElement("a");
            //                    a.setAttribute("href",link);
            //                    a.setAttribute("target", "_blank");
            //                    $("body").append(a);
            //                    a.click();
            //                    top_util.update_popup_message(data.dataInfo["id"]);
            //                });
            //            }
            //            $(".sysmesg_box .sysmesg_box_cls").unbind("click").click(function(){
            //                top_util.update_popup_message(data.dataInfo["id"]);
            //            });
            //            $(".sysmesg_box").show();
            //        }
            //    }
            //});
            //if(top_util.base_attr.popup_message_timer){
            //    clearTimeout(top_util.base_attr.popup_message_timer);
            //    top_util.base_attr.popup_message_timer = null;
            //}
            //top_util.base_attr.popup_message_timer = setTimeout(function(){top_util.get_popup_message();}, top_util.base_attr.popup_message_time);
        };

        this.update_popup_message=function(broadcastId){
            //console.log(3)
            //if(!user_util.is_login(false)){
            //    return;
            //}
            //$(".sysmesg_box").hide();
            //$.ajax({
            //    type : "post",
            //    url : system_info.base_attr.domain + "user_updateUserPopupMessage.fly",
            //    dataType: 'json',
            //    data:{broadcastId:broadcastId}
            //});
        };

        this.reset_message_state=function(){
            //console.log(4)
            //if(!user_util.is_login(false)){
            //    return;
            //}
            //$.ajax({
            //    type : "post",
            //    url : system_info.base_attr.domain + "user_initSmsCountByHot.fly",
            //    dataType: 'json',
            //    success:function(data){
            //        $(".red_dot2").css("display","none");
            //        if(data.code == 0 && data.dataInfo > 0){
            //            $(".red_dot2").css("display","block");
            //        }
            //    }
            //});
            //setTimeout(function(){top_util.reset_message_state();}, top_util.base_attr.message_state_time);
        };
    };
    login_util.init_login();
    /*
     if (typeof eid_festvial_util != "undefined"){
     eid_festvial_util.eid_end();
     }
     if (typeof task_util != "undefined"){
     setTimeout(function(){task_util.init_task();},1000);
     }*/
});
function google_login_back(authResult){
    login_util.google_login_back(authResult);
};
function twitter_login_cancel (){
    loading_tip.loading_hide();
};
function twitter_login_back(userId,token,userName){
    login_util.trd_register_login(userId,token,userName,3);
};
