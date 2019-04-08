define(function(require){
    require('js/photoClip/jquery.photoClip.js');
    var Kit = require('component/kit');
    var Bussiness = Kit.use('Bussiness');
    var Utility = require('common/utility');
    var Promise = Utility['Promise'];
    var stringFormat = Utility['String']['stringFormat'];
    var Bridge=Utility['Bridge'];




    var TEMPLATE={
            'Main':'<div class="wrap">\
                        <a class="page_back" href="javascript:;"><span></span></a>\
                        <div class="page_bannar">\
                            {0}\
                        </div>\
                        <div class="User_List {1}" >\
                            {2}\
                            <div class="UserBox">\
                                {3}\
                            </div>\
                            <div class="UserBoxMore">\
                            </div>\
                            <a class="More_User {4}"><span>لمشاهدة المزيد</span></a>\
                        </div>\
                        <div class="Activity_Reg {5}" >\
                            <h2 class="Reg_Title">قسم تقديم الطلبات </h2>\
                            <span class="Reg_Detail">من فضلك قم بملأ البيانات  ، و إكمال الخطوات الخمسة لإتمام عملية التسجيل !</span>\
                            <div class="Register_Info">\
                                <span class="Name_User"><input type="text" id="hostName" placeholder="الاسم الحقيقي "/></span>\
                                <div class="Sex_User">\
                                    <span class="Male">\
                                        <input name="Sex_User" id="Male" checked type="radio" value="1" />ذكر\
                                    </span>\
                                    <span class="Female">\
                                        <input name="Sex_User" id="Female" type="radio" value="2"/>أنثى\
                                    </span>\
                                </div>\
                                <div class="Country">\
                                    <select id="Select_Country" ></select>\
                                </div>\
                                <div class="Whatsapp">\
                                    <input id="nums_card" type="text"  readonly  value="" /><input id="whatsapp" type="number"  placeholder="من فضلك قم بإدخال رقم الواتس اب"/>\
                                </div>\
                                <span class="Upload_Photo_Tips">\
                                    قم بتحميل 3 صور شخصية مناسبة لك ، علماً بأنها ستظهر للجميع بعد تقديمها للمراجعة \
                                </span>\
                                <div class="screen_blank">\
                                    <div class="Screen_Photo">\
                                        <div id="clipArea"></div>\
                                        <span class="btn_screen">\
                                            <a id="clipBtn" href="javascript:;">تأكيد</a>\
                                        </span>\
                                    </div>\
                                </div>\
                                <div class="Upload_Photo">\
                                    <div class="divs">\
                                        <input type="file" id="file1" accept="image/*">\
                                        <img id="view1" class="view" src=""/>\
                                        <span></span>\
                                    </div>\
                                    <div class="divs">\
                                        <input type="file" id="file2" accept="image/*">\
                                        <img id="view2" class="view" src=""/>\
                                        <span></span>\
                                    </div>\
                                    <div class="divs">\
                                        <input type="file" id="file3" accept="image/*">\
                                        <img id="view3" class="view" src=""/>\
                                        <span></span>\
                                    </div>\
                                </div>\
                                <span class="Show_Tips">من فضلك قم بكتابة مواضيع البث التي ستقدمها خلال فترة عيد الأضحى\
! فكلما كانت المواضيع هادفة كلما كانت فرصة قبولك أكبر</span>\
                                <div class="Show_Detail">\
                                    <textarea name="" id="hostText" maxlength="100" placeholder="اكتب ما لا يتجاوز عن 100 حرف عن مواضيع البث التي ستقوم بعملها خلال فترة عيد الأضحى !"></textarea>\
                                    <div class="allow_enter">\
                                        <span class="had_enter">0</span>\
                                        <span class="all_enter">/100</span>\
                                    </div>\
                                </div>\
                                <a class="Submit_Info" href="javascript:;"><span>تقديم </span></a>\
                            </div>\
                            <div class="Sub_Tips">\
                                <h2 class="Tips_title">تنبيه ! </h2>\
                                    <span class="Tips_Desc">تأكد من صحة بياناتك قبل التقديم\
                 فإذا قمت بإرسالها فلن تستطيع التعديل بعد ذلك ! </span>\
                                <div class="Sub_Btn">\
                                    <a class="Edit" href="javascript:;"><span>تعديل </span></a>\
                                    <a class="Confirm" href="javascript:;"><span>تأكيد </span></a>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="block_tips">\
                            <div class="info_tips">\
                            <span class="tips_detail"></span>\
                            </div>\
                        </div>\
                        <div class="pageError {6}">انتهى النشاط </div>\
                        <div class="Activity_Rreg_tips {7}">\
                            <h2 class="Rreg_tips_1">قواعد النشاط </h2>\
                            <span class="tips1_1">يستطيع أي مستخدم المشاركة في نشاط عيد الأضحى و الظهور في بث مباشر كمضيف ، كل ما عليك فعله هو ملأ بيانات استمارة التقديم  في الفترة ما بين 1 إلى 8 سبتمبر ، و إرسالها لنا وسوف يتم الرد بعد استلام الطلب بيوم أو يومين . </span>\
                            <span class="tips1_2">في حال تم قبول طلبك ، سيظهر اسمك في قائمة المقبولين لعمل بث مباشر خلال فترة عيد الأضحى . </span>\
                            <h2 class="Rreg_tips_2">الجائزة </h2>\
                            <span class="tips2_1">فترة عمل البث المباشر من 9 إلى 16 سبتمبر ، ومن يحصل على أكبر عدد من هدايا عيد الأضحى سيحصل على مكافأة بمقدار 1000 دولار .  </span>\
                            <span class="tips2_2">ملحوظة : لا يسمح للمضيفين الحاليين المشاركة في النشاط </span>\
                        </div>\
                        \
                    </div>',
             'BannerInfo':'<div class="page_bannar_detail"></div>\
                            <div class="page_bannar_btn  {0}">\
                                <a href="javascript:;" class="page_top_btn {1}">\
                                    <span class="page_top_btn_t"></span>\
                                </a>\
                            </div>\
                            <div class="page_bannar_user_num">\
                             قام <em id="page_bannar_user_num"> {2} </em>مستخدم بتقديم طلبات الاشتراك\
                            </div>',
             'HostInfo':' <div class="User_Info">\
                                <div class="User_Ico" followTag="{0}" surfingid="{1}">\
                                    <div class="user_live_icon">\
                                        <span class="{2}"></span>\
                                    </div>\
                                    <img src="{3}" alt=""  />\
                                </div>\
                                <div class="User_Detils">\
                                    <span class="User_Name">{4}</span>\
                                    <span class="User_Topic">{5}</span>\
                                    <span class="User_Coins">\
                                        {6}\
                                    </span>\
                                    <span class="Follow {7}"><a href="javascript:;" hostid="{8}" class="{9}">{10}</a></span>\
                                </div>\
                            </div>'

        };

    var Page= {
        'run': function () {
            this.load();
            this.compose();
        },
        'load': function () {
            this.loginKey = Utility.URL.queryString('login_key');
            var sUrl='service/activity/v3/14?loginKey='+this.loginKey+'&type=3&pageNum=20';

            Bussiness.getData(sUrl,function(data){
                if(data['code']==0){
                    this.bEorrInfo='nosee';
                    this.bRule='';
                    this.pageTitle='<h2 class="User_Selected">قائمة المقبولين</h2>\
                                    <span class="User_List_Tips">قم بعمل متابعة لمضيفك ، ليصلك إشعار عند تواجد المضيف أون لاين </span>';
                    //console.log(1111111);
                    //console.log(data);
                    //console.log(11111111);

                    var joinedLength=0;
                    data=data['dataInfo'];
                    this['activityStatus']=data['activityStatus'];

                    //通过审核数为0，展示报名模块不显示
                    joinedLength= data['userlist'].length;
                    if(joinedLength==0){
                        this.bHost='nosee';
                        this.HostInfo='';
                    }

                    //根据报名状态决定报名区域是否显示
                    if(data['joinFlag']==2){//没有报名
                        this.BannerInfo=stringFormat(TEMPLATE.BannerInfo,'','page_add_info',data['joinNum']);
                        this.bJoin='';
                        this.bRule='';
                    }else{//已经报名
                        this.BannerInfo=stringFormat(TEMPLATE.BannerInfo,'btn_after','',data['joinNum']);
                        this.bJoin='nosee';
                        this.bRule='nosee';
                    }

                    //根据活动时间节点渲染已通过报名主播
                    if(data['activityStatus']==2){ //活动开始
                        this.pageTitle='<h2 class="User_Selected">المتقدمين</h2>\
                                        <span class="User_List_Tips">أضغط على صورة المتسابق لمشاهدة البث !</span>';
                        this.bMore='nosee';
                        this.bJoin='nosee';
                        this.bRule='nosee';
                        this.BannerInfo ='<div class="page_bannar_detail"></div>';
                        this.HostInfo=data['userlist'].map(function(data,index){
                            var bOnline='',
                                bFollow='',
                                sFollowChar='متابعة ',
                                sImg=data['picUrl']?'/resource/'+data['picUrl']:DOMAIN_CONFIG['IMAGE_DOMAIN']+'systemRes/img/default/nophoto2.png?123',
                                sName=data['nickName']?data['nickName']:'',
                                sTitle=data['title']?data['title']:'',
                                iGiftNum=data['giftNum']?data['giftNum']: 0,
                                sGift='<span class="coins">'+iGiftNum+'</span>',
                                iHostId=data['userId']?data['userId']:'',
                                sFollowedA='followedA',
                                iSurfing=data['surfing']?data['surfing']:'',
                                bFllowTag='0';


                            if(data['onlineFlag']==1){
                                bOnline='live';
                            }
                            if(data['followFlag']==1){
                                bFollow='Followed';
                                sFollowChar='تمت المتابعة ';
                                sFollowedA='';
                                bFllowTag='1';

                            }
                            return stringFormat(TEMPLATE.HostInfo,bFllowTag,iSurfing,bOnline,sImg,sName,sTitle,sGift,bFollow,iHostId,sFollowedA,sFollowChar);
                        }).join('');
                    }else if(data['activityStatus']==1){ //已经报名 未开始
                        this.bMore='';

                        if(joinedLength>10){
                            this.firstPage=data['userlist'].slice(0,10);
                            this.secondPage=data['userlist'].slice(10);
                        }else{
                            this.firstPage=data['userlist'];
                            this.bMore='nosee';
                        }
                        this.HostInfo=this.firstPage.map(function(data,index){
                            var bFollow='',
                                sFollowChar='متابعة ',
                                sImg=data['picUrl']?'/resource/'+data['picUrl']:DOMAIN_CONFIG['IMAGE_DOMAIN']+'systemRes/img/default/nophoto2.png?123',
                                sName=data['nickName']?data['nickName']:'',
                                sTitle=data['title']?data['title']:'',
                                iHostId=data['userId']?data['userId']:'',
                                sFollowedA='followedA',
                                iSurfing=data['surfing']?data['surfing']:'',
                                bFllowTag='0';

                            if(data['followFlag']==1){
                                bFollow='Followed';
                                sFollowChar='تمت المتابعة ';
                                sFollowedA='';
                                bFllowTag='1';
                            }
                            return stringFormat(TEMPLATE.HostInfo,bFllowTag,iSurfing,'',sImg,sName,sTitle,'',bFollow,iHostId,sFollowedA,sFollowChar);
                        }).join('');
                    }

                    this.render();
                    this.bind();
                    this.uploadImg();
                    this.doJoin();
                    this.toFollow();
                    this.toLive();
                }else{
                    this.bRule='nosee';
                    this.bEorrInfo='';
                    this.BannerInfo='';
                    this.bHost='nosee';
                    this.HostInfo='';
                    this.bMore='nosee';
                    this.bJoin='nosee';
                    this.pageTitle='';
                    this.render()
                }

            }.bind(this),null,'isV3');
        },
        'render': function () {
            this.container = $('#container');
            this.sMain =stringFormat(TEMPLATE.Main, this.BannerInfo,this.bHost,this.pageTitle,this.HostInfo,this.bMore,this.bJoin,this.bEorrInfo,this.bRule);
            this.container.html( this.sMain );

        },
        'compose': function () {

        },
        'bind': function () {
            var that=this;

            //滚屏到报名位置
            var BannarHeight=jQuery(".page_bannar").height()
            jQuery(".page_add_info").bind("click",function(){
                var UserListHeight=jQuery(".User_List").height();
                jQuery("body").animate({'scrollTop':(BannarHeight+UserListHeight)},600);
            });

            //国家和whatapp号映射
            var Option,Lists,Options='',Country_Ar,Country_Num;
            Option={
                "Lists":jQuery(function(){
                    Country_Ar=[{
                        "name" : "أندورا",
                        "dial_code" : "+376",
                        "code" : "AD"
                    },
                        {
                            "name" : "الإمارات العربية المتحدة",
                            "dial_code" : "+971",
                            "code" : "AE"
                        },
                        {
                            "name" : "أفغانستان",
                            "dial_code" : "+93",
                            "code" : "AF"
                        },
                        {
                            "name" : "أنتيغوا وبربودا",
                            "dial_code" : "+1268",
                            "code" : "AG"
                        },
                        {
                            "name" : "أنغويلا",
                            "dial_code" : "+1 264",
                            "code" : "AI"
                        },
                        {
                            "name" : "ألبانيا",
                            "dial_code" : "+355",
                            "code" : "AL"
                        },
                        {
                            "name" : "أرمينيا",
                            "dial_code" : "+374",
                            "code" : "AM"
                        },
                        {
                            "name" : "أنغولا",
                            "dial_code" : "+244",
                            "code" : "AO"
                        },
                        {
                            "name" : "الأرجنتين",
                            "dial_code" : "+54",
                            "code" : "AR"
                        },
                        {
                            "name" : "ساموا الأمريكية",
                            "dial_code" : "+1 684",
                            "code" : "AS"
                        },
                        {
                            "name" : "النمسا",
                            "dial_code" : "+43",
                            "code" : "AT"
                        },
                        {
                            "name" : "أستراليا",
                            "dial_code" : "+61",
                            "code" : "AU"
                        },
                        {
                            "name" : "آروبا",
                            "dial_code" : "+297",
                            "code" : "AW"
                        },
                        {
                            "name" : "جزر آلاند",
                            "dial_code" : "+358",
                            "code" : "AX"
                        },
                        {
                            "name" : "أذربيجان",
                            "dial_code" : "+994",
                            "code" : "AZ"
                        },
                        {
                            "name" : "البوسنة والهرسك",
                            "dial_code" : "+387",
                            "code" : "BA"
                        },
                        {
                            "name" : "بربادوس",
                            "dial_code" : "+1 246",
                            "code" : "BB"
                        },
                        {
                            "name" : "بنجلاديش",
                            "dial_code" : "+880",
                            "code" : "BD"
                        },
                        {
                            "name" : "بلجيكا",
                            "dial_code" : "+32",
                            "code" : "BE"
                        },
                        {

                            "name" : "بوركينا فاسو",
                            "dial_code" : "+226",
                            "code" : "BF"
                        },
                        {
                            "name" : "بلغاريا",
                            "dial_code" : "+359",
                            "code" : "BG"
                        },
                        {
                            "name" : "البحرين",
                            "dial_code" : "+973",
                            "code" : "BH"
                        },
                        {
                            "name" : "بوروندي",
                            "dial_code" : "+257",
                            "code" : "BI"
                        },
                        {
                            "name" : "بنين",
                            "dial_code" : "+229",
                            "code" : "BJ"
                        },
                        {
                            "name" : "سان بارتليمي",
                            "dial_code" : "+590",
                            "code" : "BL"
                        },
                        {
                            "name" : "برمودا",
                            "dial_code" : "+1 441",
                            "code" : "BM"
                        },
                        {
                            "name" : "بروناي",
                            "dial_code" : "+673",
                            "code" : "BN"
                        },
                        {
                            "name" : "بوليفيا",
                            "dial_code" : "+591",
                            "code" : "BO"
                        },
                        {
                            "name" : "البرازيل",
                            "dial_code" : "+55",
                            "code" : "BR"
                        },
                        {
                            "name" : "الباهاما",
                            "dial_code" : "+1 242",
                            "code" : "BS"
                        },
                        {
                            "name" : "بوتان",
                            "dial_code" : "+975",
                            "code" : "BT"
                        },
                        {
                            "name" : "بتسوانا",
                            "dial_code" : "+267",
                            "code" : "BW"
                        },
                        {
                            "name" : "روسيا البيضاء",
                            "dial_code" : "+375",
                            "code" : "BY"
                        },
                        {
                            "name" : "بليز",
                            "dial_code" : "+501",
                            "code" : "BZ"
                        },
                        {
                            "name" : "كندا",
                            "dial_code" : "+1",
                            "code" : "CA"
                        },
                        {
                            "name" : "جزر كوكوس",
                            "dial_code" : "+61",
                            "code" : "CC"
                        },
                        {
                            "name" : "الكونغو - كينشاسا",
                            "dial_code" : "+243",
                            "code" : "CD"
                        },
                        {
                            "name" : "جمهورية أفريقيا الوسطى",
                            "dial_code" : "+236",
                            "code" : "CF"
                        },
                        {
                            "name" : "الكونغو - برازافيل",
                            "dial_code" : "+242",
                            "code" : "CG"
                        },
                        {
                            "name" : "سويسرا",
                            "dial_code" : "+41",
                            "code" : "CH"
                        },
                        {
                            "name" : "ساحل العاج",
                            "dial_code" : "+225",
                            "code" : "CI"
                        },
                        {
                            "name" : "جزر كوك",
                            "dial_code" : "+682",
                            "code" : "CK"
                        },
                        {
                            "name" : "شيلي",
                            "dial_code" : "+56",
                            "code" : "CL"
                        },
                        {
                            "name" : "الكاميرون",
                            "dial_code" : "+237",
                            "code" : "CM"
                        },
                        {
                            "name" : "الصين",
                            "dial_code" : "+86",
                            "code" : "CN"
                        },
                        {
                            "name" : "كولومبيا",
                            "dial_code" : "+57",
                            "code" : "CO"
                        },
                        {
                            "name" : "كوستاريكا",
                            "dial_code" : "+506",
                            "code" : "CR"
                        },
                        {
                            "name" : "كوبا",
                            "dial_code" : "+53",
                            "code" : "CU"
                        },
                        {
                            "name" : "الرأس الأخضر",
                            "dial_code" : "+238",
                            "code" : "CV"
                        },
                        {
                            "name" : "جزيرة الكريسماس",
                            "dial_code" : "+61",
                            "code" : "CX"
                        },
                        {
                            "name" : "قبرص",
                            "dial_code" : "+537",
                            "code" : "CY"
                        },
                        {
                            "name" : "جمهورية التشيك",
                            "dial_code" : "+420",
                            "code" : "CZ"
                        },
                        {
                            "name" : "ألمانيا",
                            "dial_code" : "+49",
                            "code" : "DE"
                        },
                        {
                            "name" : "جيبوتي",
                            "dial_code" : "+253",
                            "code" : "DJ"
                        },
                        {
                            "name" : "الدانمرك",
                            "dial_code" : "+45",
                            "code" : "DK"
                        },
                        {
                            "name" : "دومينيكا",
                            "dial_code" : "+1 767",
                            "code" : "DM"
                        },
                        {
                            "name" : "جمهورية الدومينيك",
                            "dial_code" : "+1 849",
                            "code" : "DO"
                        },
                        {
                            "name" : "الجزائر",
                            "dial_code" : "+213",
                            "code" : "DZ"
                        },
                        {
                            "name" : "الإكوادور",
                            "dial_code" : "+593",
                            "code" : "EC"
                        },
                        {
                            "name" : "أستونيا",
                            "dial_code" : "+372",
                            "code" : "EE"
                        },
                        {
                            "name" : "مصر",
                            "dial_code" : "+20",
                            "code" : "EG"
                        },
                        {
                            "name" : "أريتريا",
                            "dial_code" : "+291",
                            "code" : "ER"
                        },
                        {
                            "name" : "إسبانيا",
                            "dial_code" : "+34",
                            "code" : "ES"
                        },
                        {
                            "name" : "إثيوبيا",
                            "dial_code" : "+251",
                            "code" : "ET"
                        },
                        {
                            "name" : "فنلندا",
                            "dial_code" : "+358",
                            "code" : "FI"
                        },
                        {
                            "name" : "فيجي",
                            "dial_code" : "+679",
                            "code" : "FJ"
                        },
                        {
                            "name" : "جزر فوكلاند",
                            "dial_code" : "+500",
                            "code" : "FK"
                        },
                        {
                            "name" : "ميكرونيزيا",
                            "dial_code" : "+691",
                            "code" : "FM"
                        },
                        {
                            "name" : "جزر فارو",
                            "dial_code" : "+298",
                            "code" : "FO"
                        },
                        {
                            "name" : "فرنسا",
                            "dial_code" : "+33",
                            "code" : "FR"
                        },
                        {
                            "name" : "الجابون",
                            "dial_code" : "+241",
                            "code" : "GA"
                        },
                        {
                            "name" : "المملكة المتحدة",
                            "dial_code" : "+44",
                            "code" : "GB"
                        },
                        {
                            "name" : "غرينادا",
                            "dial_code" : "+1 473",
                            "code" : "GD"
                        },
                        {
                            "name" : "جورجيا",
                            "dial_code" : "+995",
                            "code" : "GE"
                        },
                        {
                            "name" : "غويانا الفرنسية",
                            "dial_code" : "+594",
                            "code" : "GF"
                        },
                        {
                            "name" : "غيرنزي",
                            "dial_code" : "+44",
                            "code" : "GG"
                        },
                        {
                            "name" : "غانا",
                            "dial_code" : "+233",
                            "code" : "GH"
                        },
                        {
                            "name" : "جبل طارق",
                            "dial_code" : "+350",
                            "code" : "GI"
                        },
                        {
                            "name" : "غرينلاند",
                            "dial_code" : "+299",
                            "code" : "GL"
                        },
                        {
                            "name" : "غامبيا",
                            "dial_code" : "+220",

                            "code" : "GM"
                        },
                        {
                            "name" : "غينيا",
                            "dial_code" : "+224",
                            "code" : "GN"
                        },
                        {
                            "name" : "جوادلوب",
                            "dial_code" : "+590",
                            "code" : "GP"
                        },
                        {
                            "name" : "غينيا الإستوائية",
                            "dial_code" : "+240",
                            "code" : "GQ"
                        },
                        {
                            "name" : "اليونان",
                            "dial_code" : "+30",
                            "code" : "GR"
                        },
                        {
                            "name" : "جورجيا الجنوبية وجزر ساندويتش الجنوبية",
                            "dial_code" : "+500",
                            "code" : "GS"
                        },
                        {
                            "name" : "غواتيمالا",
                            "dial_code" : "+502",
                            "code" : "GT"
                        },
                        {
                            "name" : "غوام",
                            "dial_code" : "+1 671",
                            "code" : "GU"
                        },
                        {
                            "name" : "غينيا بيساو",
                            "dial_code" : "+245",
                            "code" : "GW"
                        },
                        {
                            "name" : "غيانا",
                            "dial_code" : "+595",
                            "code" : "GY"
                        },
                        {
                            "name" : "هونغ كونغ الصينية",
                            "dial_code" : "+852",
                            "code" : "HK"
                        },
                        {
                            "name" : "هندوراس",
                            "dial_code" : "+504",
                            "code" : "HN"
                        },
                        {
                            "name" : "كرواتيا",
                            "dial_code" : "+385",
                            "code" : "HR"
                        },
                        {
                            "name" : "هايتي",
                            "dial_code" : "+509",
                            "code" : "HT"
                        },
                        {
                            "name" : "هنغاريا",
                            "dial_code" : "+36",
                            "code" : "HU"
                        },
                        {
                            "name" : "أندونيسيا",
                            "dial_code" : "+62",
                            "code" : "ID"
                        },
                        {
                            "name" : "أيرلندا",
                            "dial_code" : "+353",
                            "code" : "IE"
                        },
                        {
                            "name" : "إسرائيل",
                            "dial_code" : "+972",
                            "code" : "IL"
                        },
                        {
                            "name" : "جزيرة مان",
                            "dial_code" : "+44",
                            "code" : "IM"
                        },
                        {
                            "name" : "الهند",
                            "dial_code" : "+91",
                            "code" : "IN"
                        },
                        {
                            "name" : "الإقليم البريطاني في المحيط الهندي",
                            "dial_code" : "+246",
                            "code" : "IO"
                        },
                        {
                            "name" : "العراق",
                            "dial_code" : "+964",
                            "code" : "IQ"
                        },
                        {
                            "name" : "إيران",
                            "dial_code" : "+98",
                            "code" : "IR"
                        },
                        {
                            "name" : "أيسلندا",
                            "dial_code" : "+354",
                            "code" : "IS"
                        },
                        {
                            "name" : "إيطاليا",
                            "dial_code" : "+39",
                            "code" : "IT"
                        },
                        {
                            "name" : "جيرسي",
                            "dial_code" : "+44",
                            "code" : "JE"
                        },
                        {
                            "name" : "جامايكا",
                            "dial_code" : "+1 876",
                            "code" : "JM"
                        },
                        {
                            "name" : "الأردن",
                            "dial_code" : "+962",
                            "code" : "JO"
                        },
                        {
                            "name" : "اليابان",
                            "dial_code" : "+81",
                            "code" : "JP"
                        },
                        {
                            "name" : "كينيا",
                            "dial_code" : "+254",
                            "code" : "KE"
                        },
                        {
                            "name" : "قرغيزستان",
                            "dial_code" : "+996",
                            "code" : "KG"
                        },
                        {
                            "name" : "كمبوديا",
                            "dial_code" : "+855",
                            "code" : "KH"
                        },
                        {
                            "name" : "كيريباتي",
                            "dial_code" : "+686",
                            "code" : "KI"
                        },
                        {
                            "name" : "جزر القمر",
                            "dial_code" : "+269",
                            "code" : "KM"
                        },
                        {
                            "name" : "سانت كيتس ونيفيس",
                            "dial_code" : "+1 869",
                            "code" : "KN"
                        },
                        {
                            "name" : "كوريا الشمالية",
                            "dial_code" : "+850",
                            "code" : "KP"
                        },
                        {
                            "name" : "كوريا الجنوبية",
                            "dial_code" : "+82",
                            "code" : "KR"
                        },
                        {
                            "name" : "الكويت",
                            "dial_code" : "+965",
                            "code" : "KW"
                        },
                        {
                            "name" : "جزر الكايمن",
                            "dial_code" : "+ 345",
                            "code" : "KY"
                        },
                        {
                            "name" : "كازاخستان",
                            "dial_code" : "+7 7",
                            "code" : "KZ"
                        },
                        {
                            "name" : "لاوس",
                            "dial_code" : "+856",
                            "code" : "LA"
                        },
                        {
                            "name" : "لبنان",
                            "dial_code" : "+961",
                            "code" : "LB"
                        },
                        {
                            "name" : "سانت لوسيا",
                            "dial_code" : "+1 758",
                            "code" : "LC"
                        },
                        {
                            "name" : "ليختنشتاين",
                            "dial_code" : "+423",
                            "code" : "LI"
                        },
                        {
                            "name" : "سريلانكا",
                            "dial_code" : "+94",
                            "code" : "LK"
                        },
                        {
                            "name" : "ليبيريا",
                            "dial_code" : "+231",
                            "code" : "LR"
                        },
                        {
                            "name" : "ليسوتو",
                            "dial_code" : "+266",
                            "code" : "LS"
                        },
                        {
                            "name" : "ليتوانيا",
                            "dial_code" : "+370",
                            "code" : "LT"
                        },
                        {
                            "name" : "لوكسمبورغ",
                            "dial_code" : "+352",
                            "code" : "LU"
                        },
                        {
                            "name" : "لاتفيا",
                            "dial_code" : "+371",
                            "code" : "LV"
                        },
                        {
                            "name" : "ليبيا",
                            "dial_code" : "+218",
                            "code" : "LY"
                        },
                        {
                            "name" : "المغرب",
                            "dial_code" : "+212",
                            "code" : "MA"
                        },
                        {
                            "name" : "موناكو",
                            "dial_code" : "+377",
                            "code" : "MC"
                        },
                        {
                            "name" : "مولدافيا",
                            "dial_code" : "+373",
                            "code" : "MD"
                        },
                        {
                            "name" : "الجبل الأسود",
                            "dial_code" : "+382",
                            "code" : "ME"
                        },
                        {
                            "name" : "سانت مارتن",
                            "dial_code" : "+590",
                            "code" : "MF"
                        },
                        {
                            "name" : "مدغشقر",
                            "dial_code" : "+261",
                            "code" : "MG"
                        },
                        {
                            "name" : "جزر المارشال",
                            "dial_code" : "+692",
                            "code" : "MH"
                        },
                        {
                            "name" : "مقدونيا",
                            "dial_code" : "+389",
                            "code" : "MK"
                        },
                        {
                            "name" : "مالي",
                            "dial_code" : "+223",
                            "code" : "ML"
                        },
                        {
                            "name" : "ميانمار -بورما",
                            "dial_code" : "+95",
                            "code" : "MM"
                        },
                        {
                            "name" : "منغوليا",
                            "dial_code" : "+976",
                            "code" : "MN"
                        },
                        {
                            "name" : "مكاو الصينية (منطقة إدارية خاصة)",
                            "dial_code" : "+853",
                            "code" : "MO"
                        },
                        {
                            "name" : "جزر ماريانا الشمالية",
                            "dial_code" : "+1 670",
                            "code" : "MP"
                        },
                        {
                            "name" : "مارتينيك",
                            "dial_code" : "+596",
                            "code" : "MQ"
                        },
                        {
                            "name" : "موريتانيا",
                            "dial_code" : "+222",
                            "code" : "MR"
                        },
                        {
                            "name" : "مونتسرات",
                            "dial_code" : "+1664",
                            "code" : "MS"
                        },
                        {
                            "name" : "مالطا",
                            "dial_code" : "+356",
                            "code" : "MT"
                        },
                        {
                            "name" : "موريشيوس",
                            "dial_code" : "+230",
                            "code" : "MU"
                        },
                        {
                            "name" : "جزر المالديف",
                            "dial_code" : "+960",
                            "code" : "MV"
                        },
                        {
                            "name" : "ملاوي",
                            "dial_code" : "+265",
                            "code" : "MW"
                        },
                        {
                            "name" : "المكسيك",
                            "dial_code" : "+52",
                            "code" : "MX"
                        },
                        {
                            "name" : "ماليزيا",
                            "dial_code" : "+60",
                            "code" : "MY"
                        },
                        {
                            "name" : "موزمبيق",
                            "dial_code" : "+258",
                            "code" : "MZ"
                        },
                        {
                            "name" : "ناميبيا",
                            "dial_code" : "+264",
                            "code" : "NA"
                        },
                        {
                            "name" : "كاليدونيا الجديدة",
                            "dial_code" : "+687",
                            "code" : "NC"
                        },
                        {
                            "name" : "النيجر",
                            "dial_code" : "+227",
                            "code" : "NE"
                        },
                        {
                            "name" : "جزيرة نورفوك",
                            "dial_code" : "+672",
                            "code" : "NF"
                        },
                        {
                            "name" : "نيجيريا",
                            "dial_code" : "+234",
                            "code" : "NG"
                        },
                        {
                            "name" : "نيكاراغوا",
                            "dial_code" : "+505",
                            "code" : "NI"
                        },
                        {
                            "name" : "هولندا",
                            "dial_code" : "+31",
                            "code" : "NL"
                        },
                        {
                            "name" : "النرويج",
                            "dial_code" : "+47",
                            "code" : "NO"
                        },
                        {
                            "name" : "نيبال",
                            "dial_code" : "+977",
                            "code" : "NP"
                        },
                        {
                            "name" : "ناورو",
                            "dial_code" : "+674",
                            "code" : "NR"
                        },
                        {
                            "name" : "نيوي",
                            "dial_code" : "+683",
                            "code" : "NU"
                        },
                        {
                            "name" : "نيوزيلاندا",
                            "dial_code" : "+64",
                            "code" : "NZ"
                        },
                        {
                            "name" : "عُمان",
                            "dial_code" : "+968",
                            "code" : "OM"
                        },
                        {
                            "name" : "بنما",
                            "dial_code" : "+507",
                            "code" : "PA"
                        },
                        {
                            "name" : "بيرو",
                            "dial_code" : "+51",
                            "code" : "PE"
                        },
                        {
                            "name" : "بولينيزيا الفرنسية",
                            "dial_code" : "+689",
                            "code" : "PF"
                        },
                        {
                            "name" : "بابوا غينيا الجديدة",
                            "dial_code" : "+675",
                            "code" : "PG"
                        },
                        {
                            "name" : "الفلبين",
                            "dial_code" : "+63",
                            "code" : "PH"
                        },
                        {
                            "name" : "باكستان",
                            "dial_code" : "+92",
                            "code" : "PK"
                        },
                        {
                            "name" : "بولندا",
                            "dial_code" : "+48",
                            "code" : "PL"
                        },
                        {
                            "name" : "سانت بيير وميكولون",
                            "dial_code" : "+508",
                            "code" : "PM"
                        },
                        {
                            "name" : "جزر بيتكيرن",
                            "dial_code" : "+872",
                            "code" : "PN"
                        },
                        {
                            "name" : "بورتوريكو",
                            "dial_code" : "+1 939",
                            "code" : "PR"
                        },
                        {
                            "name" : "الأراضي الفلسطينية",
                            "dial_code" : "+970",
                            "code" : "PS"
                        },
                        {
                            "name" : "البرتغال",
                            "dial_code" : "+351",
                            "code" : "PT"
                        },
                        {
                            "name" : "بالاو",
                            "dial_code" : "+680",
                            "code" : "PW"
                        },
                        {
                            "name" : "باراغواي",
                            "dial_code" : "+595",
                            "code" : "PY"
                        },
                        {
                            "name" : "قطر",
                            "dial_code" : "+974",
                            "code" : "QA"
                        },
                        {
                            "name" : "روينيون",
                            "dial_code" : "+262",
                            "code" : "RE"
                        },
                        {
                            "name" : "رومانيا",
                            "dial_code" : "+40",
                            "code" : "RO"
                        },
                        {
                            "name" : "صربيا",
                            "dial_code" : "+381",
                            "code" : "RS"
                        },
                        {
                            "name" : "روسيا",
                            "dial_code" : "+7",
                            "code" : "RU"
                        },
                        {
                            "name" : "رواندا",
                            "dial_code" : "+250",
                            "code" : "RW"
                        },
                        {
                            "name" : "المملكة العربية السعودية",
                            "dial_code" : "+966",
                            "code" : "SA"
                        },
                        {
                            "name" : "جزر سليمان",
                            "dial_code" : "+677",
                            "code" : "SB"
                        },
                        {
                            "name" : "سيشل",
                            "dial_code" : "+248",
                            "code" : "SC"
                        },
                        {
                            "name" : "السودان",
                            "dial_code" : "+249",
                            "code" : "SD"
                        },
                        {
                            "name" : "السويد",
                            "dial_code" : "+46",
                            "code" : "SE"
                        },
                        {
                            "name" : "سنغافورة",
                            "dial_code" : "+65",
                            "code" : "SG"
                        },
                        {
                            "name" : "سانت هيلنا",
                            "dial_code" : "+290",
                            "code" : "SH"
                        },
                        {
                            "name" : "سلوفينيا",
                            "dial_code" : "+386",
                            "code" : "SI"
                        },
                        {
                            "name" : "سفالبارد وجان مايان",
                            "dial_code" : "+47",
                            "code" : "SJ"
                        },
                        {
                            "name" : "سلوفاكيا",
                            "dial_code" : "+421",
                            "code" : "SK"
                        },
                        {
                            "name" : "سيراليون",
                            "dial_code" : "+232",
                            "code" : "SL"
                        },
                        {
                            "name" : "سان مارينو",
                            "dial_code" : "+378",
                            "code" : "SM"
                        },
                        {
                            "name" : "السنغال",
                            "dial_code" : "+221",
                            "code" : "SN"
                        },
                        {
                            "name" : "الصومال",
                            "dial_code" : "+252",
                            "code" : "SO"
                        },
                        {
                            "name" : "سورينام",
                            "dial_code" : "+597",
                            "code" : "SR"
                        },
                        {
                            "name" : "ساو تومي وبرينسيبي",
                            "dial_code" : "+239",
                            "code" : "ST"
                        },
                        {
                            "name" : "السلفادور",
                            "dial_code" : "+503",
                            "code" : "SV"
                        },
                        {
                            "name" : "سوريا",
                            "dial_code" : "+963",
                            "code" : "SY"
                        },
                        {
                            "name" : "سوازيلاند",
                            "dial_code" : "+268",
                            "code" : "SZ"
                        },
                        {
                            "name" : "جزر الترك وجايكوس",
                            "dial_code" : "+1 649",
                            "code" : "TC"
                        },
                        {
                            "name" : "تشاد",
                            "dial_code" : "+235",
                            "code" : "TD"
                        },
                        {
                            "name" : "توجو",
                            "dial_code" : "+228",
                            "code" : "TG"
                        },
                        {
                            "name" : "تايلاند",
                            "dial_code" : "+66",
                            "code" : "TH"
                        },
                        {
                            "name" : "طاجكستان",
                            "dial_code" : "+992",
                            "code" : "TJ"
                        },
                        {
                            "name" : "توكيلو",
                            "dial_code" : "+690",
                            "code" : "TK"
                        },
                        {
                            "name" : "تيمور الشرقية",
                            "dial_code" : "+670",
                            "code" : "TL"
                        },
                        {
                            "name" : "تركمانستان",
                            "dial_code" : "+993",
                            "code" : "TM"
                        },
                        {
                            "name" : "تونس",
                            "dial_code" : "+216",
                            "code" : "TN"
                        },
                        {
                            "name" : "تونغا",
                            "dial_code" : "+676",
                            "code" : "TO"
                        },
                        {
                            "name" : "تركيا",
                            "dial_code" : "+90",
                            "code" : "TR"
                        },
                        {
                            "name" : "ترينيداد وتوباغو",
                            "dial_code" : "+1 868",
                            "code" : "TT"
                        },
                        {
                            "name" : "توفالو",
                            "dial_code" : "+688",
                            "code" : "TV"
                        },
                        {
                            "name" : "تايوان",
                            "dial_code" : "+886",
                            "code" : "TW"
                        },
                        {
                            "name" : "تانزانيا",
                            "dial_code" : "+255",
                            "code" : "TZ"
                        },
                        {
                            "name" : "أوكرانيا",
                            "dial_code" : "+380",
                            "code" : "UA"
                        },
                        {
                            "name" : "أوغندا",
                            "dial_code" : "+256",
                            "code" : "UG"
                        },
                        {
                            "name" : "الولايات المتحدة",
                            "dial_code" : "+1",
                            "code" : "US"
                        },
                        {
                            "name" : "أورغواي",
                            "dial_code" : "+598",
                            "code" : "UY"
                        },
                        {
                            "name" : "أوزبكستان",
                            "dial_code" : "+998",
                            "code" : "UZ"
                        },
                        {
                            "name" : "الفاتيكان",
                            "dial_code" : "+379",
                            "code" : "VA"
                        },
                        {
                            "name" : "سانت فنسنت وغرنادين",
                            "dial_code" : "+1 784",
                            "code" : "VC"
                        },
                        {
                            "name" : "فنزويلا",
                            "dial_code" : "+58",
                            "code" : "VE"
                        },
                        {
                            "name" : "جزر فرجين البريطانية",
                            "dial_code" : "+1 284",
                            "code" : "VG"
                        },
                        {
                            "name" : "جزر فرجين الأمريكية",
                            "dial_code" : "+1 340",
                            "code" : "VI"
                        },
                        {
                            "name" : "فيتنام",
                            "dial_code" : "+84",
                            "code" : "VN"
                        },
                        {
                            "name" : "فانواتو",
                            "dial_code" : "+678",
                            "code" : "VU"
                        },
                        {
                            "name" : "جزر والس وفوتونا",
                            "dial_code" : "+681",
                            "code" : "WF"
                        },
                        {
                            "name" : "ساموا",
                            "dial_code" : "+685",
                            "code" : "WS"
                        },
                        {
                            "name" : "اليمن",
                            "dial_code" : "+967",
                            "code" : "YE"
                        },
                        {
                            "name" : "مايوت",
                            "dial_code" : "+262",
                            "code" : "YT"
                        },
                        {
                            "name" : "جنوب أفريقيا",
                            "dial_code" : "+27",
                            "code" : "ZA"
                        },
                        {
                            "name" : "زامبيا",
                            "dial_code" : "+260",
                            "code" : "ZM"
                        },
                        {
                            "name" : "زيمبابوي",
                            "dial_code" : "+263",
                            "code" : "ZW"
                        }
                    ];
                    Country_Ar.forEach(function(num,index){
                        Options+='<option value='+num["dial_code"]+'>'+ num["name"]+'</option>';
                    });
                    jQuery("#Select_Country").append(Options);
                    jQuery(".Whatsapp>input:nth-child(1)").val(Country_Ar[0]["dial_code"]);
                    jQuery("#Select_Country").on("change",function(){
                        var val=jQuery("#Select_Country option:selected").val();
                        jQuery(".Whatsapp>input:nth-child(1)").val(val);
                    })
                })
            };

            //更多主播
            jQuery(".More_User").bind("click",function(){
              if(this['activityStatus']==1){ //已经报名 未开始
                    this.secondPageTpl=this.secondPage.map(function(data,index){
                        var bFollow='',
                            sFollowChar='متابعة ',
                            sImg=data['picUrl']?'/resource/'+data['picUrl']:DOMAIN_CONFIG['IMAGE_DOMAIN']+'systemRes/img/default/nophoto2.png?123',
                            sName=data['nickName']?data['nickName']:'',
                            sTitle=data['title']?data['title']:'',
                            iHostId=data['userId']?data['userId']:'',
                            sFollowedA='followedA',
                            iSurfing=data['surfing']?data['surfing']:'',
                            bFllowTag='0';

                        if(data['followFlag']==1){
                            bFollow='Followed';
                            sFollowChar='تمت المتابعة  ';
                            sFollowedA='';
                            bFllowTag='1';
                        }
                        return stringFormat(TEMPLATE.HostInfo,bFllowTag,iSurfing,'',sImg,sName,sTitle,'',bFollow,iHostId,sFollowedA,sFollowChar);
                    }).join('');
                }

                jQuery(".UserBoxMore").append(this.secondPageTpl);
                this.secondPage=[];
                jQuery('.More_User').hide();
            }.bind(this));


            //回到顶部
            jQuery(window).scroll(function(){
                if(jQuery(window).scrollTop()>=BannarHeight)
                    $(".page_back").show();
                else
                    $(".page_back").hide();
            });
            jQuery(".page_back").bind("click",function(){
                jQuery("body").animate({scrollTop: 0},600);
            })
        },
        'uploadImg':function(){
            //上传、压缩、剪切 base64图片
            var that=this;
            jQuery(".divs input").bind("click",function(){


                var image_type, id=jQuery(this).attr("id");
                var img=jQuery(this).next().attr("id");
                jQuery("#clipArea").photoClip({
                    width: 200,
                    height: 200,
                    file: "#"+id,
                    view: "#"+img,
                    ok: "#clipBtn",
                    loadComplete: function() {
                        jQuery(".screen_blank").show();
                    },
                    loadError:function(event){
                        console.log(event)
                    },
                    clipFinish:function(ImgType){
                        jQuery(".screen_blank").hide();
                        that.doUploadImg(img,ImgType);
                    }
                });
            });
        },
        'doUploadImg':function(imgId,ImgType){
            var imgName=ImgType.name;
            var imgData=jQuery('#'+imgId).attr('src');
            imgData=imgData.slice(imgData.indexOf(',')+1);
            jQuery('#'+imgId).attr('imgName',imgName);

            Bussiness.postData('service/upload/v3/act',{filename:imgName,file:imgData},function(data){
                if(data['code']==0){
                    jQuery('#'+imgId).attr('src','/resource/'+data['dataInfo']);
                    jQuery('#'+imgId).parents('.divs').find('span').text('تم رفع الصورة بنجاح ').show();
                }else{
                    jQuery('#'+imgId).attr('src','/resource/static/image/error.jpg');
                    jQuery('#'+imgId).parents('.divs').find('span').text('فشل في التحميل ').show();
                }
            });
        },
        'doJoin':function(){
            var that=this;
            var bConfirm=true;
            //描述内容剩余字数显示
            jQuery(".Show_Detail textarea").bind("keyup",function(){
                var cont=String(jQuery(this).val());
                cont=cont.length;
                jQuery(".had_enter").html(cont);
                if(cont==100)
                    jQuery(".had_enter").addClass("allow_enter_tip");
                else
                    jQuery(".had_enter").removeClass("allow_enter_tip")
            });
            if (navigator.userAgent.match(/iphone/i)) {
                jQuery(".Whatsapp input").eq(1).css("width",371)
            }
            //提交报名信息、编辑、确定
            jQuery(".Submit_Info").bind("click",function(){

                var hostName=jQuery('#hostName').val(),
                    hostSex=jQuery('input[name=Sex_User]:checked').val(),
                    hostCounty=jQuery('#Select_Country').val().slice(1),
                    hostWhatsapp=jQuery('#whatsapp').val(),
                    hostText=jQuery('#hostText').val(),
                    picOne=jQuery('#view3').attr('src').slice(10),
                    picTwo=jQuery('#view2').attr('src').slice(10),
                    picThree=jQuery('#view1').attr('src').slice(10),
                    picError='/resource/static/image/error.jpg';


                //验证hostName
                if(!hostName || jQuery.trim(hostName)==''){
                    jQuery('#hostName').val('').attr('placeholder','الاسم الحقيقي ');
                    jQuery('#hostName').addClass('errorTips');
                    jQuery("body").animate({scrollTop: jQuery('#hostName').offset().top-10},600);
                    jQuery('#hostName').focus();
                    bConfirm=false;
                    return;
                }else{
                    hostName=jQuery.trim(hostName);
                    jQuery('#hostName').removeClass('errorTips');
                    bConfirm=true;
                }

                //验证countryNum
                if(hostCounty=='01'){
                    jQuery('#Select_Country').addClass('errorTips');
                    jQuery("body").animate({scrollTop: jQuery('#Select_Country').offset().top-10},600);
                    bConfirm=false;
                    return;
                }else{
                    jQuery('#Select_Country').removeClass('errorTips');
                    bConfirm=true;
                }


                //验证whatapp
                if(!hostWhatsapp || jQuery.trim(hostWhatsapp)==''){
                    jQuery('#whatsapp').val('').attr('placeholder','من فضلك قم بإدخال رقم الواتس اب');
                    jQuery('#whatsapp').addClass('errorTips');
                    jQuery("body").animate({scrollTop: jQuery('#whatsapp').offset().top-10},600);
                    jQuery('#whatsapp').focus();
                    bConfirm=false;
                    return;
                }else{
                    hostWhatsapp=jQuery.trim(hostWhatsapp);
                    jQuery('#whatsapp').removeClass('errorTips');
                    bConfirm=true;
                }

                //验证三张图片
                if(!picOne || !picTwo || !picThree || picOne==picError || picOne==picError || picOne==picError){
                    jQuery('.Upload_Photo_Tips').addClass('errorTitle');
                    jQuery("body").animate({scrollTop: jQuery('.Upload_Photo').offset().top-10},600);
                    bConfirm=false;
                    return;
                }else{
                    jQuery('.Upload_Photo_Tips').removeClass('errorTitle');
                    bConfirm=true;
                }

                //hostText
                if(!hostText || jQuery.trim(hostText)==''){
                    jQuery('#hostText').val('').attr('placeholder','اكتب ما لا يتجاوز عن 100 حرف عن مواضيع البث التي ستقوم بعملها خلال فترة عيد الأضحى !');
                    jQuery('#hostText').addClass('errorTips');
                    bConfirm=false;
                    return;
                }else{
                    hostText=jQuery.trim(hostText);
                    jQuery('#hostText').removeClass('errorTips');
                    bConfirm=true;
                }

                that.toSubmit=function toSubmit(loginKey){
                    that.loginKey=that.loginKey?that.loginKey:loginKey;
                    var sUrl='service/activity/v3/14?loginKey='+that.loginKey+'&type=1&name='+hostName+'&sex='+hostSex+'&country='+hostCounty+'&whatsappId='+hostWhatsapp+'&text='+hostText+'&picOne='+picOne+'&picTwo='+picTwo+'&picThree='+picThree;
                    sUrl=encodeURI(sUrl);
                    if(this.loginKey){
                        Bussiness.getData(sUrl,function(data){

                            //console.log('报名结果start...');
                            //console.log(data);
                            //console.log('报名结果 end...');
                            if(data['code']==0){
                                //alert('报名成功！');
                                jQuery('.page_bannar_btn').addClass('btn_after');
                                jQuery('.page_bannar_btn > .page_top_btn ').removeClass('page_add_info');
                                jQuery('#page_bannar_user_num').text(parseInt(jQuery('#page_bannar_user_num').text())+1)
                                jQuery('.Activity_Reg').hide();
                                jQuery('.Activity_Rreg_tips').hide();
                                this.tipsShow(1000,'تم التسجيل بنجاح  ');

                            }else{
                                this.tipsShow(1000,'قمت بالتسجيل من قبل');
                            }
                        }.bind(this),null,'isV3')
                    }else{
                        this.toLoginSubmit(loginKey);
                    }

                }

                jQuery(".Sub_Tips").show();


            }.bind(this));
            jQuery(".Edit").bind("click",function(){
                jQuery(this).parents(".Sub_Tips").hide();
            });
            jQuery(".Confirm").bind("click",function(){
                jQuery(this).parents(".Sub_Tips").hide();
                that.toSubmit();
            });
        },
        'toFollow':function(){
            var that=this;
            jQuery(".User_List ").delegate(".followedA", "click", function(){

                var _this=this;
                that.toGaga=function toGaga(loginKey){
                   if(loginKey){
                      that.loginKey=loginKey;
                   }

                    var hostId=jQuery(_this).attr('hostid');
                    var sUrl='service/activity/v3/14?loginKey='+that.loginKey+'&type=2'+'&hostId='+hostId;

                    if(that.loginKey){
                        Bussiness.getData(sUrl,function(data){

                            if(data['code']==0){
                                //alert('关注成功！');
                                jQuery(_this).removeClass('followedA');
                                jQuery(_this).text('تمت المتابعة ');
                                jQuery(_this).parent('span').addClass('Followed');
                                jQuery(_this).parents('.User_Info').find('.User_Ico').attr('followTag','1')

                            }else{
                                //alert('关注成功');
                            }
                        }.bind(that),null,'isV3')
                    }else{
                        that.toLoginFollow();
                    }
                }

                that.toGaga();

            });
        },
        'toLoginFollow':function(){
            var that=this;
            var sMakeLink= Bridge.link.logic('login',null,function(login_key){ //Bridge 登录
                that.toGaga(login_key);
            });
            Bridge.callNative(sMakeLink);
        },
        'toLoginSubmit':function(loginKey){
            var that=this;
            var sMakeLink= Bridge.link.logic('login',null,function(login_key){ //Bridge 登录
                that.toSubmit(login_key);
            });
            Bridge.callNative(sMakeLink);
        },
        'tipsShow':function(iTtime,sInfo){
            jQuery('.block_tips').find('.tips_detail').text(sInfo);
            jQuery('.block_tips').show();

            setTimeout(function(){
                jQuery('.block_tips').find('.tips_detail').text('')
                jQuery('.block_tips').hide();
            },iTtime)

        },
        'toLive':function(){
            var that=this;

            jQuery(".User_List ").delegate(".User_Ico", "click", function(){
                if(jQuery(this).find('.live').size()==1){
                    var sSurfing=jQuery(this).attr('surfingid');
                    var sMakeLink= Bridge.link.logic('live',{'surfing':sSurfing});
                    Bridge.callNative(sMakeLink);
                }else if(jQuery(this).attr('followTag')=='1'){
                    that.tipsShow(1000,'المضيف غير متواجد ، قم بعمل متابعة لإشعارك عند تواجده أون لاين !');
                }else{
                    that.tipsShow(1000,'المضيف غير متواجد ، سيصلك إشعار في حالة تواجده أون لاين !');
                }
            })

        }
    }
    Page.run();
});

