define(function(require){
    require('js/reference/jquery.js');
    var Kit = require('component/kit');
    var Bussiness = Kit.use('Bussiness');
    var Utility = require('common/utility');
    var Promise = Utility['Promise'];
    var stringFormat = Utility['String']['stringFormat'];
    var Bridge=Utility['Bridge'];

    var TEMPLATE={
        'Main':'<div class="wrap">\
                    <span class="page_back hidden">\
                        <a href="javascript:;"></a>\
                    </span>\
                    <div class="Activity_Produce_Detail hidden">\
                        <span class="Rules_Details_Close">\
                            <a href="javascript:;"></a>\
                        </span>\
                        <div class="rules1">\
                            <h1 class="rules1_title">قواعد مسابقة نجوم الجامعات </h1>\
                            <span class="rules1_1">1- هذه المسابقة عبارة عن منافسة بين المتقدمين ، والمطلوب من جميع المتقدمين تقديم أفضل عرض بث مباشر على تطبيق 7 نجوم للعروض المباشرة في الشرق الأوسط .</span>\
                            <span class="rules1_2">2- في هذا المسابقة  يشترط أن يكون المتقدم من الدول العربية ، وأن يكون طالب جامعي سواء كان بكالوريوس أو ماجستير أو دكتوراة .</span>\
                            <span class="rules1_3">3- سيتم اختيار عدد من المتقدمين لإجراء مسابقة نجوم الجامعات ، علماً أن الأولوية هي لأصحاب المواهب مثل : الغناء ، الشعر ، الطرب ، الرقص وغيرها من المواهب .</span>\
                            <span class="rules1_4">4- فترة التسجيل : من يوم 1 إلى 20 شهر نوفمبر .</span>\
                            <span class="rules1_5">5- مسابقة نجوم الجامعات تنقسم إلى ثلاث جولات ، الجولة الأولى مكونة من 6 مجموعات ، وتبدأ الجولة الأولى من يوم 22 إلى يوم 28 شهر نوفمبر ، والفائزين الثلاثة من كل مجموعة سيتصدرون للجولة الثانية من المسابقة .</span>\
                            <span class="rules1_6">6- الجولة الثانية : تبدأ من يوم 1 إلى يوم 7 شهر ديسمبر ، الفائزين الـ 18 مستابق من الجولة الأولى ستقام مسابقة بينهم كالتالي : الـ 18 متسابق ينقسمون إلى 9 مجموعات ، كل مجموعة فيها مسابقة  بين شخصين ، والفائز من كل مجموعة سيكون متصدر إلى الجولة الثالثة .<br />\
            ملاحظة : توجد هناك فرصة أخيرة للمتسابقين الـ 9  الذين لم يحالفهم الحظ للصعود إلى الجولة الثالثة ، حيث سيتم إجراء مسابقة بينهم ، وسيتم اختيار شخصاً واحداً من بين الـ 9 المتسابقين ، وبهذا سيكون لدينا 10 من المتسابقين للجولة الثالثة .</span>\
                            <span class="rules1_7">7- الجولة الثالثة : تبدأ من يوم 11 إلى يوم 12 شهر ديسمبر ، والمسابقة ستكون بين الـ 10 الفائزين من الجولة الثانية ، المسابقة ستكون بين كل شخصين منهم ، والفائزين الـ 5 سيتم إجراء مسابقة كبرى بينهم وبين خمسة من مضيفي 7 نجوم ، والحاصلين على الـ 3  المراكز الأولى سيحصلون على جوائز قيمة .</span>\
                            <span class="rules1_8">8- جوائز المسابقة : الحاصل على المركز الأول سيحصل على 5000 دولار ، والحاصل على المركز الثاني سيحصل على 3000 دولار ، والحاصل على المركز الثالث سيحصل على 1000 دولار  ، بالإضافة إلى فرصة السفر إلى تركيا .</span>\
                            <span class="rules1_9">9- الرجاء الإلتزام بقواعد منصة 7 نجوم ، واحترام قوانين البلد وعدم الإخلال بأمن وسلامة البلد ، لمعرفة قائمة المخالفات يرجى النظر إلى المرفق .</span>\
                            <span class="rules1_10">10- الرجاء كتابة المعلومات الشخصية للمتقدمين بشكل صحيح ، مالم سيتم حرمانك من الأشتراك بالمسابقة ، وأيضاً لن تستطيع الحصول على أي جائزة قد تحصل عليها.</span>\
                            <span class="rules1_11">11- هذا النشاط تحت إشراف شركة 7 نجوم</span>\
                        </div>\
                        <div class="rules2">\
                            <h1 class="rules2_title"> قائمة بجميع المخالفات :</h1>\
                            <span class="rules2_1">1- يمنع تجاهل تعليمات ادمن الإدارة الموجهة للمضيف أثناء البث .</span>\
                            <span class="rules2_2">2- مرور خمس دقائق من البث ولم يكن المضيف موجود أو كانت الشاشة سوداء .</span>\
                            <span class="rules2_3">3- يمنع القيام بأي حركات أو أصوات بها إيحاءات جنسية أو تقديم أي مواد إباحية أثناء البث المباشر .</span>\
                            <span class="rules2_4">4- الإستلقاء على السرير أثناء البث المباشر .</span>\
                            <span class="rules2_5">5- يمنع تواجد شخص آخر نيابةً عن المضيف الأصلي .</span>\
                            <span class="rules2_6">6- إرتداء الملابس الغير لائقة مثل الملابس الشفافة أو القصيرة أو الملابس التي تكشف منطقة الصدر .</span>\
                            <span class="rules2_7">7- التدخين أثناء البث المباشر .</span>\
                            <span class="rules2_8">8- يمنع استعمال المضيف لفيديو مسجل أو وضع تسجيلات صوتية أو تثبيت صورة بهدف المراوغة واستهلاك الوقت دون تفاعل المضيف مع المستخدمين .</span>\
                            <span class="rules2_9">9- يمنع تبادل السب مع المستخدمين والمضيفين الآخرين أو التشهير والعنصرية ضد الآخرين .</span>\
                            <span class="rules2_10">10- نشر اشاعات لتشويه صورة الموقع .</span>\
                            <span class="rules2_11">11- الدعوة إلى التشجار بين المستخدمين .</span>\
                            <span class="rules2_12">12- الخوض في مواضيع لها علاقة بالسياسة أو الدين أو معارضة للقانون .</span>\
                            <span class="rules2_13">13- يمنع عرض إعلانات أو عمل دعاية لأي موقع تقدم محتوى مشابة للمحتوى المقدم من موقع 7 نجوم أو العمل لدى أي موقع مشابه .</span>\
                            <span class="rules2_14">14- عدم تناول أي أطعمة بشكل أو طريقة تثير اشمئزاز المستخدمين.</span>\
                            <span class="rules2_15">15- تقديم العروض الخطرة التي تهدد السلامة الشخصية أو العامة .</span>\
                            <span class="rules2_16"> 16- يمنع الترويج لتعاطي أي ممنوعات مثل المخدرات وغيرها .</span>\
                            <span class="rules2_17">17- يمنع التحريض على العنف أو الإرهاب أو ارتكاب الجرائم .</span>\
                            <span class="rules2_18">18- يمنع مخالفة المضيف لقوانيين الدولة التي يقدم البث من خلالها .</span>\
                        </div>\
                    </div>\
                    <div class="Main_Match">\
                        <div class="Page_Top">\
                            <span class="Page_Share">\
                                <a href="javascript:;"></a>\
                            </span>\
                            <img src="/resource/static/image/2016School_Star_Match/Page_Top_Img_Third2.png" alt=""/>\
                            <div class="Activity_Produce ">\
                                <span class="Produces">\
                                    <h1 class="Produce_Title">شاهد من سيأخذ لقب نجم نجوم الجامعات ! </h1>\
                                    <span class="Produce_Details">\
                                        <a href="javascript:;"></a>\
                                    </span>\
                                </span>\
                                <span class="Activity_Time">الجولة النهائية المرحلة الأخيرة  : 16/12/2016</span>\
                                <span class="Produce_1">1- سيتصدر من المرحلة الأولى 5 فائزين .</span>\
                                <span class="Produce_2">2- سيتصدر من المرحلة الأخيرة 3 فائزين ، مع جوائز قيمة و فرصة السفر إلى تركيا .</span>\
                                <span class="Produce_3">3- نتائج كل هذه المراحل يعتمد على عدد بطاقة التصويت <img src="/resource/static/image/2016School_Star_Match/Tickets_Img.png" alt=""/>الحاصل عليها المتسابق .</span>\
                            </div>\
                        </div>\
                        <div class="Host_Finals_List ">\
                            {0}\
                        </div>\
                        \
                        \
                    </div>\
                </div>',
        'Item':'<div class="Host_Finals">\
                    <a class="Host_Finals_Info" data-surfingId="{0}">\
                        <img src="{1}" alt=""/>\
                        <span class="{2}"></span>\
                        <span class="Host_Rank Host_Rank_1 hidden"></span>\
                        <span class="Host_Name">{3}</span>\
                        <span class="City_Name Host_Address">{4}</span>\
                        <span class="Host_School">{5}</span>\
                        <span class="Host_Topic">{6}</span>\
                    </a>\
                    <span class="Host_Tickets">{7}</span>\
                </div>',
        'LoadErrorTpl':'<a id="ReLoadBtn" style="text-align:center;margin-top:20px;color:red;">فشل في التحميل ، الرجاء إعادة المحاولة !</a>'
    };

    var Page={
        'run':function(){
            this.load();
        },
        'load':function(){
            var that=this,
                sImg='',
                sLive='',
                sUsername='',
                sLoaction='',
                sSchool='',
                sTopic='',
                iNum= 0;

            that.openWay = Utility.URL.queryString('type')?true:false;
            that.ajaxGet('/service/activity/v3/15',
                {'type':3},
                function(data){
                    //console.log(data);
                    if(data['code']==0){
                        data=data['dataInfo'][0]['divisionUsers'];
                        that.sMain=data.map(function(value,index,array){
                            sImg=value['userPic']?'/resource/'+value['userPic']:DOMAIN_CONFIG['IMAGE_DOMAIN']+'systemRes/img/default/nophoto2.png?123';
                            sLive=value['actorIng']==1?'Living':'';
                            sUsername=value['userName']||'';
                            sLoaction=value['location']||'';
                            sSchool=value['universityName']||'';
                            sTopic=value['introduction']||'';
                            iNum=value['number']||0;
                            return stringFormat(TEMPLATE.Item,value['surfing'],sImg,sLive,sUsername,sLoaction,sSchool,sTopic,iNum);
                        }).join('');
                    }else{
                        that.sMain=TEMPLATE.LoadErrorTpl;
                    }
                    that.render();
                    that.bind();
                },function(){
                    that.sMain=TEMPLATE.LoadErrorTpl;
                    that.render();
                    that.bind();
                });
        },
        'render':function(){
            this.container = $('#container');
            this.container.html(stringFormat(TEMPLATE.Main,this.sMain));
        },
        'bind':function(){
            var that=this,
                oPageShare=$('.Page_Share');

            if(!that.openWay){
                oPageShare.addClass('hidden');
            }else{
                oPageShare.removeClass('hidden');
            }

            $('.Produce_Details a').bind('click',function(){
                $('.Activity_Produce_Detail').removeClass('hidden');
                $('.Main_Match').addClass('hidden')
            });
            $('.Rules_Details_Close a').bind('click',function(){
                $('.Activity_Produce_Detail').addClass('hidden');
                $('.Main_Match').removeClass('hidden')
            });
            jQuery(window).scroll(function(){
                if(jQuery(window).scrollTop()>jQuery('.Page_Top img').height()){
                    jQuery('.page_back').removeClass('hidden');
                }else{
                    jQuery('.page_back').addClass('hidden');
                }
            });


            //回到页面顶部
            jQuery(".page_back").bind("click",function(){
                jQuery("body").animate({scrollTop: 0},600);
                jQuery('.page_back').addClass('hidden')
            });

            //relaod
            $(".Host_Finals_List").delegate("#ReLoadBtn", "click", function(){
                that.loadErrorData();
            });

            //跳转直播间
            $(".Host_Finals_List").delegate(".Host_Finals_Info", "click", function(){
                var surfing=parseInt($(this).attr('data-surfingid'));
                if(that.openWay){
                    var sMakeLink= Bridge.link.logic('live',{'surfing':surfing});
                    Bridge.callNative(sMakeLink);
                }else{
                    window.location.href='/html5/show.html?sf='+surfing+'&lg=ar';
                }
            });

            //站内分享
            $('.Page_Share').click(function(){
                if(that.openWay){
                    var sMakeLink= Bridge.link.logic('share',{'content':'يلا نشاهد مع بعض مسابقة نجوم الجامعات !','link':'http://www.7nujoom.com/mobile/2016School_Star_Match.shtml'});
                    Bridge.callNative(sMakeLink);
                }
            });

            //...
            var html_obj=$('.Host_Finals_List .Host_Finals'),length=html_obj.length,array=[];
            for(var i=0;i<length;i++){
                array.push(html_obj.eq(i))
            };
            array.map(function(data,index,array){
                var html=array[index].children('a').children('.Host_Topic');
                var leng=html.html().length,htm;
                if(leng>110){
                    htm=html.html().slice(0,110)+'...';
                    html.html(htm)
                }
            });

        },
        'ajaxGet':function(path, data, success, error) {
            var option = {
                url:path,
                cache:false,
                type: "get",
                dataType: 'json'
            };
            if (data)
                option['data'] = data;
            if (success)
                option['success'] = success;
            if (error)
                option['error'] = error;
            $.ajax(option);
        },
        'loadErrorData':function(){

            var that=this,
                sImg='',
                sLive='',
                sUsername='',
                sLoaction='',
                sSchool='',
                sTopic='',
                iNum= 0;

            that.ajaxGet('/service/activity/v3/15',
                {'type':3},
                function(data){
                    if(data['code']==0){
                        data=data['dataInfo'][0]['divisionUsers'];
                        that.sMain=data.map(function(value,index,array){
                            sImg=value['userPic']?'/resource/'+value['userPic']:DOMAIN_CONFIG['IMAGE_DOMAIN']+'systemRes/img/default/nophoto2.png?123';
                            sLive=value['actorIng']==1?'Living':'';
                            sUsername=value['userName']||'';
                            sLoaction=value['location']||'';
                            sSchool=value['universityName']||'';
                            sTopic=value['introduction']||'';
                            iNum=value['number']||0;
                            return stringFormat(TEMPLATE.Item,value['surfing'],sImg,sLive,sUsername,sLoaction,sSchool,sTopic,iNum);
                        }).join('');
                        $('.Host_Finals_List').html(that.sMain);
                    }else{
                        that.sMain=TEMPLATE.LoadErrorTpl;
                        $('.Host_Finals_List').html(that.sMain);
                    }
                },function(){
                    that.sMain=TEMPLATE.LoadErrorTpl;
                    $('.Host_Finals_List').html(that.sMain);
                });
        }
    };

    Page.run();
});

