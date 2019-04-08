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
        Footer=Body.Footer,
        Lazyload=Kit.use('Lazyload'),
        Trigger=Kit.use('Trigger'),
        Bussiness = Kit.use('Bussiness');
    var IMAGE_DOMAIN =DOMAIN_CONFIG['IMAGE_DOMAIN'],
        fullDefaultHead = IMAGE_DOMAIN + 'systemRes/img/default/nophoto.jpg';
        window['domain'] = DOMAIN_CONFIG['SITE_DOMAIN'];
    require('js/reference/blockUI.js');
    require('js/reference/onreg.draggable.min.js');
    require('js/reference/upfile.js');
    require('js/reference/ajaxfileupload.js');
    require('js/reference/dialogV3.js');
    require('cssComponent/dialog.css');

    var oInfo={
        'Location':['Location','الدولة المتواجد بها'],
        'VideoLink':['Video link','رابط الفيديو'],
        'VideoLinkPH':['Please send us a video about you','يفضل إضافة رابط فيديو لموهبتك إن وجد']
    };
    var oLocation={  //oLocationData
        'firstOption':['Choose your location','اختر الدولة',''],
        'egypt':['Egypt','مصر','+20'],
        'algeria':['Algeria','الجزائر','+213'],
        'sudan':['Sudan','السودان','+249'],
        'iraq':['Iraq','العراق','+964'],
        'morocco':['Morocco','المغرب','+212'],
        'saudi Arabia':['Saudi Arabia','السعودية','+966'],
        'yemen':['Yemen','اليمن','+967'],
        'syria':['Syria','سوريا','+963'],
        'tunisia':['Tunisia','تونس','+216'],
        'somalia':['Somalia','الصومال','+252'],
        'jordan':['Jordan','الإمارات العربية المتحدة','+971'],
        'united Arab Emirates':['United Arab Emirates','الأردن','+962'],
        'libya':['Libya','ليبيا','+218'],
        'palestine':['Palestine','فلسطين','+970'],
        'lebanon':['Lebanon','لبنان','+961'],
        'oman':['Oman','عمان','+968'],
        'kuait':['Kuait','الكويت','+965'],
        'mauritania':['Mauritania','موريتانيا','+222'],
        'qatar':['Qatar','قطر','+974'],
        'bahrain':['Bahrain','البحرين','+973'],
        'djibouti':['Djibouti','جيبوتي','+253'],
        'comorin':['Comorin','جزر القمر','+269'],
        'others':['Others','أخرى','']
    };

    var TEMPLATE={
        'MAIN':'<div class="enroll_wrap">\
                    <div class="enroll_recruit">\
                        <h2 class="enroll_lan"></h2>\
                        <h6 data-i18n="13001">{{13001}}</h6>\
                    </div>\
                    <div class="enroll_highinfo">\
                        <h6 class="info" data-i18n="GoLive_info">{{GoLive_info}}</h6>\
                        <h6 data-i18n="GoLive_info2">{{GoLive_info2}}</h6>\
                    </div>\
                        <!-- 报名填写信息表单页面 -->\
                    <div class="enroll_host"  id="enroll_from">\
                    <div class="new_pwd_err"  style="display:none">\
                    <p>\
                    <img src="/resource/systemRes/img/new_login/new_login_err.png" alt="">\
                    <label></label>\
                    </p>\
                    </div>\
                    <form action="javascript:void(0);" name="enrollForm" id="enrollForm">\
                    <div class="enroll_tab">\
                    <h2 data-i18n="13018">{{13018}}</h2>\
                    <dl>\
                    <dt data-i18n="13019">{{13019}}</dt>\
                    <dd>\
                    <span class="new_reg_pul">\
                    <input type="text" name="userName" id="userName" class="txt_login txt_login_on" onblur="" onfocus="" maxlength="20" placeholder="{{13019}}"/>\
                    </span>\
                    </dd>\
                    </dl>\
                    <dl>\
                        <dt id="CountryTitle" data-i18n="GoLive_CountryTitle">{{GoLive_CountryTitle}}</dt><!-- 国家 -->\
                        <dd class="select_userCountry_box">\
                            <select name="userLanguage" id="userLanguage" class="select_userCountry">\
                            </select>\
                        </dd>\
                    </dl>\
                    <dl>\
                        <dt data-i18n="13021">{{13021}}</dt>\
                        <dd>\
                            <span class="new_reg_pul">\
                                <input type="text" name="userTelPre" id="userTelPre" class="txt_login txt_login2" onblur="" onfocus="" maxlength="5" placeholder="{{13039}}" />\
                                <input type="text" name="userTelSub" id="userTelSub" class="txt_login txt_login3" onblur="" onfocus="" maxlength="17" placeholder="{{13040}}" />\
                            </span>\
                        </dd>\
                    </dl>\
                    <dl>\
                        <dt data-i18n="13027">{{13027}}</dt><!-- 才艺特长 -->\
                        <input type="hidden" name="userAcquirement" id="userAcquirement"  value=""/>\
                        <dd>\
                            <ul id="ul_userAcquirement">\
                                <li id="li0_userAcquirement" data-i18n="13028">{{13028}}</li>\
                                <li id="li1_userAcquirement" data-i18n="13029">{{13029}}</li>\
                                <li id="li2_userAcquirement" data-i18n="13030">{{13030}}</li>\
                                <li id="li3_userAcquirement" data-i18n="GoLive_acq3">{{GoLive_acq3}}</li>\
                                <li id="li4_userAcquirement" data-i18n="GoLive_acq4">{{GoLive_acq4}}</li>\
                                <li id="li5_userAcquirement" class="enroll_input_txt">\
                                <label data-i18n="13031">{{13031}}</label>\
                                <input type="text"  value="" style="display:none;" class="txt_login_on" maxlength="20"/>\
                                </li>\
                            </ul>\
                        </dd>\
                    </dl>\
                    <dl class="enroll_prompt">\
                        <input type="hidden" name="uploadImage1" id="upload_image1" value=""/>\
                        <input type="hidden" name="uploadImage2" id="upload_image2" value=""/>\
                        <input type="hidden" name="uploadImage3" id="upload_image3" value=""/>\
                        <dt data-i18n="13032">{{13032}}</dt>\
                        <dd>\
                            <p data-i18n="13033">{{13033}}</p><!-- 上传照片 -->\
                            <a href="javascript:void(0);" class="enroll_on" id="photo_image1">\
                                <span class="middle_span"></span>\
                                <img id="echo_image1" alt="" src="" onerror="/resource/systemRes/img/enroll_img/photo_hover.png"/>\
                                <input type="file" name="file" id="image1" onchange="ajaxFileUploadEnroll(0,\'image1\',0)" accept="image/*"/>\
                            </a>\
                            <a href="javascript:void(0);" class="enroll_on" id="photo_image2">\
                                <span class="middle_span"></span>\
                                <img id="echo_image2" alt="" src="" onerror="/resource/systemRes/img/enroll_img/photo_hover.png"/>\
                                <input type="file" name="file" id="image2" onchange="ajaxFileUploadEnroll(0,\'image2\',0)" accept="image/*"/>\
                            </a>\
                            <a href="javascript:void(0);" class="enroll_on hidden" id="photo_image3" >\
                                <span class="middle_span"></span>\
                                <img id="echo_image3" alt="" src="" onerror="/resource/systemRes/img/enroll_img/photo_hover.png"/>\
                                <input type="file" name="file" id="image3" onchange="ajaxFileUploadEnroll(0,\'image3\',0)" accept="image/*"/>\
                            </a>\
                        </dd>\
                    </dl>\
                    <dl style="display:none;">\
                        <dt id="videoTitle"></dt>\
                        <dd>\
                            <span class="new_reg_pul">\
                            <input type="text"  maxlength="100" onfocus="" onblur="" class="txt_login" id="videoUrl" name="videoUrl">\
                            </span>\
                        </dd>\
                    </dl>\
                    <dl class="enroll_txt" style="display:none;">\
                        <dt data-i18n="13034">{{13034}}</dt>\
                        <dd><!-- 介绍 -->\
                        <textarea name="userIntroduce" id="userIntroduce" maxlength="1000" onfocus="return user_util[\'is_login\'](true)"></textarea>\
                        </dd>\
                    </dl>\
                    <a id="submitFormBtn" type="button" onclick="Page.submitForm()" class="btn_base" data-i18n="13035">{{13035}}</a>\
                    </div>\
                    </form>\
                    <div class="enroll_succ" style="display:none">\
                        <p data-i18n="13036">{{13036}}</p>\
                    </div>\
                    </div>\
                    </div>'
    };
    var Page = window.Page = {
        'run': function(){
            this.load();
            this.render();
            this.compose();
            this.bind();
            this.start();
        },

        'load':function(){
            //
        },

        'render':function(){
            this.container = $('#container');
            this.container.i18nHTML(Header.html() + TEMPLATE.MAIN + Footer.html() );
        },

        'compose':function(){
            I18N.init({
                'onLocalize': this.localize.bind(this)
            });
            login_util.setCallback(this.identifyFlow.bind(this));
            Header.init({
                'container': this.container
            });

        },

        'bind':function(){
            //给表单域加检验事件，用户必须登录后才可以填
            $('#enrollForm input[type=text]').each(function(i,o){
                $(this).focus(function(){
                    if(!user_util['is_login'](true)){
                        return true;
                    }
                });
            });

            //给3张宣传图添加点击事件，点击每张图之后下面会显示对应的文本
            $('.enroll_dls dl').click(function(){
                $('.enroll_dls dl dt').removeClass('dt_hover');
                $(this).find('dt').addClass('dt_hover');
                $('.enroll_dls p').hide().eq($(this).index()).show();
            });

            //var liCount1=$('#ul_userLanguage li').size();
            var liCount2=$('#ul_userAcquirement li').size();

            //才艺字段的选择事件处理
            for(var i=0;i<liCount2;i++){
                //如果点击了最后一个<li>标签（Other），打开<input>标签并给<input>添加失去焦点事件
                if(i==(liCount2-1)){
                    $('#li'+i+'_userAcquirement').click(function(){
                        $(this).css('border','none').siblings().removeClass("enroll_ul_on");
                        $(this).find('label').css({'display':'none'});
                        var input=$(this).find('input');
                        input.css({'display':'block'});
                        input.focus();
                        input.bind('focus',function(){
                            $('#userAcquirement').val('');
                            $(this).addClass('txt_login_on');
                        });
                        input.bind('blur',function(){
                            $('#userAcquirement').val($(this).val());
                        });
                    });
                }else{
                    $('#li'+i+'_userAcquirement').click(function(){
                        $(this).addClass('enroll_ul_on').siblings().removeClass("enroll_ul_on");//给当前选项加选中样式，删除其他选项的选中样式
                        $('#li'+(liCount2-1)+'_userAcquirement').find('input').removeClass('txt_login_on');//删除最后一个选项的外发光样式
                        $('#userAcquirement').val($(this).text());//给隐藏标签赋值
                    });
                }
            }
        },

        'start':function(){
            $('#submitFormBtn').removeAttr("disabled");
            //	清空表单域的值
            $('#userName').val('');
            //$('#userEmail').val('');
            $('#userTelPre').val('');
            $('#userTelSub').val('');

            $('#userLanguage').val('firstOption');
            $('#userAcquirement').val('');
            $('#upload_image1').val('');
            $('#upload_image2').val('');
            $('#upload_image3').val('');

            this.identifyFlow();
            I18N.language == "en" ? this.renderSelect(0) : this.renderSelect(1);
            //I18N.language == "en" ? this.showInfo(0) : this.showInfo(1);
        },

        'localize':function(){
            $('#userTelPre').attr('placeholder',i18nTranslate('13039'));
            $('#userTelSub').attr('placeholder',i18nTranslate('13040'));
            $('#userName').attr('placeholder',i18nTranslate('13019'));
            I18N.language == "en" ? this.renderSelect(0) : this.renderSelect(1);
            $('#userTelPre').val('');
        },


        'submitForm':function(){  //验证登录
            if(!this.identity){
                login_util.show_login_div();
            }
            //
            if(this.checkForm()){
                //location.href="#new_pwd_err";
                click_scroll();
                return;
            }
            //disnable提交按钮
            //....
            $('#submitFormBtn').attr('disabled','disabled');

            var userName=$.trim($('#userName').val());
            //var email=$.trim($('#userEmail').val());
            var telPre=$.trim($('#userTelPre').val());
            var telSub=$.trim($('#userTelSub').val());
            var language=$.trim($('#userLanguage').val());
            var acquirement=$.trim($('#userAcquirement').val());
            var image1=$.trim($('#upload_image1').val());
            var image2=$.trim($('#upload_image2').val());
            var image3=$.trim($('#upload_image3').val());
            //var introduce=$.trim($('#userIntroduce').val());
            //var videoUrl=$.trim($('#videoUrl').val());

            var tel=telPre+"-"+telSub;
            var images=image1+","+image2;
            var datas={
                userName:userName,
                email:'test@test.com',
                tel:tel,
                language:language,
                acquirement:acquirement,
                images:images,
                introduce:'introduce',
                age:0,
                internation:language
            };

            //if(videoUrl){
            //    datas['videoUrl']=videoUrl;
            //}

            //提交表单
            //...
            $.ajax({
                url:domain+'user_petitionHost.fly',
                typ:'POST',
                data:datas,
                dataType:'json',
                success: function(data){
                    switch(data.code){
                        case 0:
                            $('.enroll_tab').css('display','none');
                            $('.new_pwd_err').css('display','none');
                            $('.enroll_succ').css('display','block');
                            $('body,html').animate({'scrollTop':$('.enroll_succ').offset().top - 150});
                            break;
                        case 7009:
                            $.tip_simple_alert(i18nTranslate('7009'));
                            this.showTip('7009');
                            break;
                        case 36:
                            $.tip_simple_alert(i18nTranslate('Room_System_SystemBusy'));
                            this.showTip('Room_System_SystemBusy');
                            break;
                        default:
                            $.tip_simple_alert(i18nTranslate('Room_System_SystemBusy'));
                            this.showTip('Room_System_SystemBusy');
                    }
                }.bind(this)
            });
        },

        'checkForm':function(){
            var userName=$.trim($('#userName').val());
           //var email=$.trim($('#userEmail').val());
            var telPre=$.trim($('#userTelPre').val());
            var telSub=$.trim($('#userTelSub').val());

            var language=$.trim($('#userLanguage').val()); //county字段
            //var videoUrl=$.trim($('#videoUrl').val());     //videoUrl字段

            var acquirement=$.trim($('#userAcquirement').val());
            var image1=$.trim($('#upload_image1').val());
            var image2=$.trim($('#upload_image2').val());
            var image3=$.trim($('#upload_image3').val());
            //var introduce=$.trim($('#userIntroduce').val());

            if(userName==''||userName==null||userName=='null'||userName.length==0){
                this.showTip('7001');
                return true;
            }else if(this.getByteLen(userName)>20){
                this.showTip('7001');
                return true;
            }

            //var reg = /^([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            //if(email==''||email==null||email=='null'||email.length==0){
            //    this.showTip('7002');
            //    return true;
            //}else if(!reg.test(email)){
            //    this.showTip('7003');
            //    return true;
            //}
            var regTelPre = /^\d{1,4}$/;
            var regTelSub = /^\d{9,17}$/;
            if(telPre==''||telPre==null||telPre=='null'||telPre.length==0){
                this.showTip('7004');
                return true;
            }else if(!regTelPre.test(parseInt(telPre))){
                this.showTip('7004');
                return true;
            }

            if(telSub==''||telSub==null||telSub=='null'||telSub.length==0){
                this.showTip('7004');
                return true;
            }else if(!regTelSub.test(telSub)){
                this.showTip('7004');
                return true;
            }

            if(language=='firstOption'){
                this.showTip('7005');   //添加两个Country错误语言包提示
                return true;
            }

            if(acquirement==''||acquirement==null||acquirement=='null'||acquirement.length==0){
                this.showTip('7007');
                return true;
            }
            if(image1==''||image1==null||image1=='null'||image1.length==0){
                this.showTip('7009');
                return true;
            }
            if(image2==''||image2==null||image2=='null'||image2.length==0){
                this.showTip('7009');
                return true;
            }
            //if(image3==''||image3==null||image3=='null'||image3.length==0){
            //    this.showTip('7009');
            //    return true;
            //}

            //if(introduce==''||introduce==null||introduce=='null'||introduce.length==0){
            //    this.showTip('7010');
            //    return true;
            //}
        },

        'showTip':function(code){
            $('.new_pwd_err p label').html('');
            $('.new_pwd_err p label').html(i18nTranslate(code)).attr('data-i18n',code);
            $('.new_pwd_err').show();
            // 	setTimeout(function(){
            // 		$('.new_pwd_err').hide();
            // 	},10000);
        },

        'getByteLen':function(val) { //返回val的字节长度
            var len = 0;
            for (var i = 0; i < val.length; i++) {
                if (val[i].match(/[^\x00-\xff]/ig) != null) //全角
                    len += 2;
                else
                    len += 1;
            }
            return len;
        },

         'renderSelect':function(way){
            way=way||0;
            var sOptions='';
            for(var pro in oLocation){
                if(oLocation.hasOwnProperty(pro)){
                    if(way==0){
                        if(pro=="firstOption"){
                            sOptions+='<option value="'+pro+'" data-code="'+oLocation[pro][2] +'" selected >'+oLocation[pro][0]+'</option>'
                        }else{
                            sOptions+='<option value="'+pro+'" data-code="'+oLocation[pro][2] +'">'+oLocation[pro][0]+'</option>';
                        }
                    }else if(way==1){
                        if(pro=="firstOption"){
                            sOptions+='<option value="'+pro+'" data-code="'+oLocation[pro][2] +'"selected >'+oLocation[pro][1]+'</option>';
                        }else{
                            sOptions+='<option value="'+pro+'" data-code="'+oLocation[pro][2] +'">'+oLocation[pro][1]+'</option>';
                        }
                    }
                }
            }
            $("#userLanguage").html(sOptions);
            $('#userTelPre').on('blur',function(evt){
                var country=$('#userLanguage').val(),pre=oLocation[country][2];
                if(pre && $(evt.target).val()!= pre){
                    this.handset = true;
                }
            }.bind(this));
            $('#userLanguage').on('change',function(evt){
                var country  = $(evt.target).val(),code = oLocation[country][2];
                if(code &&  !this.handset){
                    $('#userTelPre').val(code);
                }
            }.bind(this));
        },

        'showInfo':function(way){
            way=way||0;
            if(way==0){
                $('#CountryTitle').html(oInfo['Location'][0]);
                $('#videoTitle').html(oInfo['VideoLink'][0]);
                //$('#videoUrl').attr('placeholder',oInfo['VideoLinkPH'][0]);

            }else if(way==1){
                $('#CountryTitle').html(oInfo['Location'][1]);
                $('#videoTitle').html(oInfo['VideoLink'][1]);
                //$('#videoUrl').attr('placeholder',oInfo['VideoLinkPH'][1]);
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
            var _this=this;
            Header.identified(this.identity);
            //UserTop.identifyFlow();
            if(this.identity){


            }else{
                login_util.show_login_div();
            }
        }

};
    window['click_scroll']=function(){  //定位到表单
        var scroll_offset = $("#enroll_from").offset();
        $("body,html").animate({
            scrollTop:scroll_offset.top - 40
        },0);
    };
    I18N.init(null,true).localize(null,Page.run.bind(Page));
});