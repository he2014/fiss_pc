define(function(require){
    var TEMPLATE={
        'MAIN':'<div class="wrap">\
                    <div class="Page_1">\
                        <h1 class="Page_Top_Tips">الآن تألق مع جواهر 7 نجوم الجديدة واحصل على مكافأة !</h1>\
                        <div class="Page_Top_Cont">\
                            <span class="Page_Top_Cont_Title">قواعد المسابقة :</span>\
                            <span class="Page_Top_Cont_Detail1">-1 المضيفين الحاصلين على المراكز العشرة الأولى في قائمة هذا اليوم سيحصلون على مكافأة كالتالي :</span>\
                            <span class="Top_Cont_Detail1">\
                            <span>المركز الأول</span> : يحصل على 30 دولار .</span>\
                            <span class="Top_Cont_Detail2">\
                            <span>المركز الثاني والمركز الثالث</span> : يحصل على 20 دولار .</span>\
                            <span class="Top_Cont_Detail3">\
                            <span>المركز الرابع إلى العاشر</span> : يحصل على 10 دولار .</span>\
                            <span class="Page_Top_Cont_Detail2">-2 المستخدمين الحاصلين على المراكز العشرة الأولى في قائمة هذا اليوم من خلال ارسال الجواهر للمضيفين ، سيحصلون على عملات بقيمة 10 دولار كـ مكافأة ، علماً أن هذه العملات ستضاف تلقائياً إلى حسابهم خلال 24 ساعة من بعد إنتهاء فترة المسابقة .</span>\
                            <span class="Page_Top_Cont_Detail3">-3 يومياً توجد قائمة جديدة في مسابقة الجواهر\
        ( للمضيفين والمستخدمين ) .</span>\
                            <span class="Page_Top_Cont_Detail4"><span>-4 فترة المسابقة</span> : 11/11/2016 - 17/11/2016 .</span>\
                        </div>\
                    </div>\
                    <div class="Page_2">\
                        <h1 class="Page_Center_Title">طريقة الحصول على الجواهر مجاناً :</h1>\
                        <span class="Page_2_Title1">الطريقة الأولى : </span>\
                        <span class="Page_2_Detail1"> "البيضة السحرية" : أولاً يجب عليك تحميل النسخة الجديدة 4.0 من تطبيق 7 نجوم ، ثانياً قم بالدخول إلى استوديو مضيفك المفضل ، وستشاهد البيضة السحرية موجودة بأسفل الاستوديو ، قم بالنقر عليها واحصل على الجواهر مجاناً .</span>\
                        <span class="Page_Cen_Img">\
                        <img class="Page_Center_Img1" src="/resource/static/image/2016Diamond/page_center_img1.png" alt=""/>\
                        </span>\
                        <span class="Page_2_Title2 hidden"></span>\
                        <span class="Page_2_Detail2 hidden"> </span>\
                        <span class="Page_Cen_Img2 hidden">\
                        <img class="Page_Center_Img2" src="/resource/static/image/2016Diamond/page_center_img2.png" alt=""/>\
                        </span>\
                    </div>\
                    <div class="Page_3">\
                        <h1 class="Page_Footer_Title">سجل نجم اليوم</h1>\
                        <span class="User_Host_TOP10"><img src="/resource/static/image/2016Diamond/Top10_List.png" alt=""/></span>\
                    </div>\
            </div>'
        };
    var Page={
        run: function () {
            this.load();
        },
        load: function () {
            this.container = $('#container');
            this.container.html(TEMPLATE.MAIN);
        }
    };
    Page.run();
});