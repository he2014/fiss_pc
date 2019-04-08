define(function(require){

    var Utility = require('common/utility'),Kit = require('component/kit'),Bussiness = Kit.use('Bussiness');
    var loginKey = Utility.URL.queryString('login_key'),requestType= Utility.URL.queryString('requestType');

    var TEMPLATE={
            'MAIN':' <div id="content">\
                        <h1 >\
                            <span class="h1_top1">حمل النسخة التجريبية</span>\
                            <span class="h1_top2">من تطبيق 7 نجوم 3.0 وجربها الآن！</span>\
                        </h1>\
                        <div class="bg_header"></div>\
                        <div class="btn_taste">\
                            <strong id="showBtn">جربها الآن !</strong>\
                            <span>فترة التسجيل : من 8 إلى 14 أبريل</span>\
                        </div>\
                        <div class="popup " style="display:none" >\
                            <div class="popup_top">\
                                <span>قم بإدخال بياناتك بشكل صحيح لكي يتم التواصل معك مباشرة !</span>\
                            </div>\
                            <div class="popup_main">\
                                <div class="popup_main1">\
                                    <span class="popup_main_left">كود الدولة</span>\
                                    <span class="popup_main_right">رقم الجوال أو الواتس اب</span>\
                                </div>\
                                <div class="popup_main2 clearfix">\
                                    <input class="popup_mian2_input_left" id="userTelPre" maxlength="6" type="text"/>\
                                    <input class="popup_mian2_input_right" id="userTelSub" maxlength="25" type="text"/>\
                                </div>\
                                <div class="popup_main3">\
                                    <span class="popup_main3_cpnt"></span>\
                                    <span class="popup_main3_href"><a href="javascript:" id="postBtn">إرسال</a></span>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="content_main">\
                            <p>نعمل في 7 نجوم علي طرح نسخة جديدة من التطبيق بتصميم أجدد و أسهل في الاستخدام ، نضعها بين أيديكم لتجربتها ، ونتمني تزويدنا بآرائكم واقتراحاتكم للعمل على تطويرها بشكل يناسب ذوق المستخدم !</p>\
                            <p>قم بملء بيانات استمارة التسجيل وخلال 24 ساعة إذا تم  قبولك للاشتراك معنا سنقوم بإرسال رابط تحميل النسخة التجريبية و استمارة الاختبار  إلي جوالك أو رقم الواتس أب ، بعد تجربتك النسخة يرجي  ملء استمارة الاختبار  و إرسالها إلي البريد الألكتروني التالي :contact@7nujoom.com ، و أربح مركبة لامبورجيني مجاناً لمدة 30 يوماً .</p>\
                        </div>\
                       <div class="bg_footer"></div>\
                       <div class="">\
                            <div id="notice_popup" class="notice_popup">\
                                <div class="notice_wrap">\
                                    <h2 >تنبيه </h2>\
                                    <div id="notice_container">\
                                        <p id="notice_ok_tips">تم التسجيل بنجاح ، خلال 24 سيتم التواصل معك </p>\
                                    </div>\
                                    <div class="notice_ok">\
                                        <span id="notice_ok">إغلاق</span>\
                                    </div>\
                                    <span  id="btn_close" class="btn_close"></span>\
                                </div>\
                                <div class="bg"></div>\
                            </div>\
                       </div>\
                    </div>'
        };

    var Page={
        run:function(){
            this.load();
            this.render();
            this.compose();
            this.bind();
            this.start();
        },
        load:function(){

        },
        render:function(){
            this.container = $('#container');
            this.container.html(TEMPLATE.MAIN);

        },
        compose:function(){
            //window.scrollTo(0,1100);

        },
        bind:function(){
            var oShowBtn=$('#showBtn');
            var oPostBtn=$('#postBtn');
            var oSuccessPOP=$('#notice_popup');

            oShowBtn.click(function(){
                $('.btn_taste').hide();
                $('.popup').show();
                window.scrollTo(0,540);
            });

            oPostBtn.click(function(){
                var bSubmit=true;
                var oInfoSpan=$('.popup_main3_cpnt');
                var telPre=$.trim($('#userTelPre').val());
                var telSub=$.trim($('#userTelSub').val());
                var sContactWay='';

                if(telPre==''||telPre==null||telPre=='null'||telPre.length==0){
                    oInfoSpan.html('الرجاء إكمال كافة البيانات الشخصية ');
                    bSubmit=false;
                }

                if(telSub==''||telSub==null||telSub=='null'||telSub.length==0){
                    oInfoSpan.html('الرجاء إكمال كافة البيانات الشخصية ');
                    bSubmit=false;
                }

                if(bSubmit){
                    oInfoSpan.html('');
                    sContactWay=telPre+''+telSub;
                    Bussiness.postData('service/action/v3/epRequest',{'loginKey':loginKey,'contactWay':sContactWay,'version':3.0,'requestType':requestType || 4},function(data){
                        if(data.code==0){
                            $('.popup').hide();
                            oSuccessPOP.show();
                        }
                    });
                }
            });

            $('#btn_close , #notice_ok').click(function(){
                oSuccessPOP.hide();
                $('.btn_taste').show();
                window.scrollTo(0,0);
            });
        },
        start:function(){}
    };
    Page.run();
});

