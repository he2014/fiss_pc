define(function(require){
    var Kit = require('component/kit');
    var Bussiness = Kit.use('Bussiness');
    var Utility = require('common/utility');
    var Promise = Utility['Promise'];
    var DateTime = Utility['DateTime'];
    var stringFormat = Utility['String']['stringFormat'];
    var Bridge=Utility['Bridge'];
    var Kit = require(useJSComponent('kit')),
        I18N = Kit.use('I18N');

    var TEMPLATE={
                'MAIN':' <div class="wrap">\
                            <div class = "violation_1 temp_bg" style="display:none"><img src="/resource/static/image/ugc_h5/content_1.png"/></div>\
                            <div class="unSelectedBtn_1 temp_unBtn"><img src="/resource/static/image/ugc_h5/btn_1.png"/></div>\
                            <div class="selectedBtn_1 temp_btn"><img src="/resource/static/image/ugc_h5/selected_1.png"/></div>\
                            <div class="violation_2 temp_bg"><img src="/resource/static/image/ugc_h5/content_2.png"/></div>\
                            <div class="unSelectedBtn_2 temp_unBtn"><img src="/resource/static/image/ugc_h5/btn_2.png"/></div>\
                            <div class="selectedBtn_2 temp_btn"><img src="/resource/static/image/ugc_h5/selected_2.png"/></div>\
                            <div class="violation_3 temp_bg" style="display:block"><img src="/resource/static/image/ugc_h5/content_3.png"/></div>\
                            <div class="unSelectedBtn_3 temp_unBtn"><img src="/resource/static/image/ugc_h5/btn_3.png"/></div>\
                            <div class="selectedBtn_3 temp_btn"><img src="/resource/static/image/ugc_h5/select_3.png"/></div>\
                         </div>',
                 'MAIN1':' <div class="wrap">\
                            <div class = "violation_1 temp_bg"  style="display:none"><img src="/resource/static/image/ugc_h5/enContent_1.png"/></div>\
                            <div class="unSelectedBtn_1 temp_unBtn"><img src="/resource/static/image/ugc_h5/enBtn_1.png"/></div>\
                            <div class="selectedBtn_1 temp_btn"><img src="/resource/static/image/ugc_h5/enSelected_1.png"/></div>\
                            <div class="violation_2 temp_bg"><img src="/resource/static/image/ugc_h5/enContent_2.png"/></div>\
                            <div class="unSelectedBtn_2 temp_unBtn"><img src="/resource/static/image/ugc_h5/enBtn_2.png"/></div>\
                            <div class="selectedBtn_2 temp_btn"><img src="/resource/static/image/ugc_h5/enSelected_2.png"/></div>\
                            <div class="violation_3 temp_bg"  style="display:block"><img src="/resource/static/image/ugc_h5/enContent_3.png"/></div>\
                            <div class="unSelectedBtn_3 temp_unBtn"><img src="/resource/static/image/ugc_h5/enBtn_3.png"/></div>\
                            <div class="selectedBtn_3 temp_btn"><img src="/resource/static/image/ugc_h5/enSelected_3.png"/></div>\
                         </div>'
        };



    var Page={
        run:function(){
            this.render();
        },
        changeBackground:function(){

            $('.temp_unBtn').eq(0).click(function(){
                $(".temp_bg").eq(0).show().siblings(".temp_bg").hide()
                $(this).css("zIndex",60);
                $('.temp_unBtn').eq(1).css("zIndex",60)
                $('.temp_unBtn').eq(2).css("zIndex",60)
                $(".temp_btn").eq(0).css("zIndex",80).show()
                $(".temp_btn").eq(1).css("zIndex",20).hide()
                $(".temp_btn").eq(2).css("zIndex",20).hide()
            })
            $('.temp_unBtn').eq(1).click(function(){
                $(".temp_bg").eq(1).show().siblings(".temp_bg").hide()
                $(this).css("zIndex",60);
                $('.temp_unBtn').eq(0).css("zIndex",80)
                $('.temp_unBtn').eq(2).css("zIndex",80)
                $(".temp_btn").eq(0).css("zIndex",20).hide()
                $(".temp_btn").eq(1).css("zIndex",90).show()
                $(".temp_btn").eq(2).css("zIndex",20).hide()
            })
            $('.temp_unBtn').eq(2).click(function(){
                $(".temp_bg").eq(2).show().siblings(".temp_bg").hide()
                $(this).css("zIndex",60);
                $('.temp_unBtn').eq(0).css("zIndex",60)
                $('.temp_unBtn').eq(2).css("zIndex",60)
                $(".temp_btn").eq(0).css("zIndex",20).hide()
                $(".temp_btn").eq(1).css("zIndex",20).hide()
                $(".temp_btn").eq(2).css("zIndex",80).show()
            })
        },
        render:function(){
            this.container = $('#container');
            var loginKey = Utility.URL.queryString('login_key');
            console.log(loginKey)
            var lg= Utility.URL.queryString('lg')?Utility.URL.queryString('lg'):'en';
            var oLg={
                'en':'en',
                'ar':'ar'
            };
            if(oLg[lg]=="ar"){
                this.container.i18nHTML(stringFormat(TEMPLATE.MAIN) );
            }else{
                this.container.i18nHTML(stringFormat(TEMPLATE.MAIN1) );
            }
            this.changeBackground();
        }
    };
    Page.run();
});


