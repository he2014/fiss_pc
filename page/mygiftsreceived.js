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
    var UserTop=require('component/userTop');
    require('js/reference/blockUI.js'); // blockUI.js?v=4.4
    require('wheel/date.js');//load_date_js();
    require('wheel/My97DatePicker/skin/WdatePicker.css');
    require('wheel/My97DatePicker/WdatePicker.js');
    require('cssComponent/page.css');
    //load_gift_language();

    var IMAGE_DOMAIN =DOMAIN_CONFIG['IMAGE_DOMAIN'];
    var language_NUM={
            'ar':1,
            'en':2,
            'tr':3,
            'es':4,
            'pt':5,
            'pl':6,
            'in':7
    },type_NUM={'1':'Store_VIP','2':'Store_SVIP','3':'Store_NavMount','4':'Store_NavItem','5':'Store_NavItem','6':'Store_NavItem','7':'Store_NavItem','8':'Store_NavItem'};
    var TEMPLATE={
        'MAIN':'<div class="newAccountBox">\
					<div class="newAccountTab" data-i18n="GiftsReceived_Nav">\
						{{GiftsReceived_Nav}}\
					</div>\
				</div>\
                <div class="new_user_con">\
                    <div class="chz_date readStart">\
                        <label data-i18n="GiftsReceived_From" class="readStart">{{GiftsReceived_From}}</label>\
                        <input type="text"  class="Wdate readStart"  id="stime" data-stat="GiftsReceived_From" readonly="readonly"/>\
                        <label data-i18n="GiftsReceived_To" class="readStart">{{GiftsReceived_To}}</label>\
                        <input type="text"  class="Wdate readStart"  id="etime" data-stat="GiftsReceived_To" readonly="readonly"/>\
                        <input type="button" data-i18n="GiftsReceived_Query" data-stat="GiftsReceived_Query" id="checkR" class="btnDef btnDefOther readStart" value="{{GiftsReceived_Query}}"/>\
                        <label id="cost_total"></label>\
                    </div>\
                    <div class="cons_tab">\
                        <div class="tab_title" id="tab_title">\
                            <ol class="fir_tr">\
                                <li class="reg_width1" data-i18n="GiftsReceived_Time">{{GiftsReceived_Time}}</li>\
                                <li class="reg_width3" data-i18n="GiftsReceived_Cost">{{GiftsReceived_Cost}}</li>\
                                <li class="reg_width4" data-i18n="GiftsReceived_Quantity">{{GiftsReceived_Quantity}}</li>\
                                <li class="reg_width5" data-i18n="GiftsReceived_Price">{{GiftsReceived_Price}}</li>\
                                <li class="reg_width6" data-i18n="GiftsReceived_Gift">{{GiftsReceived_Gift}}</li>\
                                <li class="reg_width7" style="border-right:none;" data-i18n="GiftsReceived_Sender">{{GiftsReceived_Sender}}</li>\
                            </ol>\
                        </div>\
                        <div class="tab_pay" id="showinfo"></div>\
                    </div>\
                    <div id="pagenation" class="page"></div>\
                </div>'
    };

    var Page = window.Page =  {
        run: function() {
            this.load();
            this.render();
            UserTop.Login_Btn();
            this.compose();
            this.bind();
            this.start();
        },

        load: function() {

        },

        render: function() {
            this.container = $('#container');
            this.container.i18nHTML(Header.html() + UserTop.html() + TEMPLATE.MAIN + Footer.html());
        },

        compose: function() {
            I18N.init({
                'onLocalize': UserTop.Login_Btn.bind(this)
            });
            login_util.setCallback(this.identifyFlow.bind(this));
            Header.init({
                'container': this.container
            });
            UserTop.init({'container':this.container,'cur':'menu_gift'});
        },

        bind: function() {
            $('#checkR').click(function(){this.getReceiveGifts(1);}.bind(this));
            $('#stime').click(function(evt){
                WdatePicker({dateFmt:'yyyy-MM-dd',lang:this.getWdatePickerLanguage()});
            }.bind(this));
            $('#etime').click(function(evt){
                WdatePicker({dateFmt:'yyyy-MM-dd',lang:this.getWdatePickerLanguage()});
            }.bind(this))
        },

        start: function() {
            this.identifyFlow();
            this.setNowTime();
        },

        setNowTime:function()
        {
            var now = new Date();
            var year = now.getFullYear();       //�?
            var month = now.getMonth() + 1;     //�?
            var day = now.getDate();
            var nowValue = year + "-" + month + "-" + day;
            $("#stime").val(nowValue);
            $("#etime").val(nowValue);
        },

        len:function(s) {
            var l = 0;
            var a = s.split("");
            for ( var i = 0; i < a.length; i++) {
                if (a[i].charCodeAt(0) < 299) {
                    l++;
                } else
                    l += 2;
            }
            return l;
        },


        getWdatePickerLanguage:function(){
            var language = I18N.language;
            if (language.toLowerCase() == 'zh') {
                return 'zh-cn';
            }
            if (language == 'ar') {
                return 'ar';
            }
            return "en";
        },

        getReceiveGifts:function(page)
        {
            var pagesize = 10;
            var stime = $('#stime').val();
            var etime = $('#etime').val();
            if(this.len(stime) < 1 || this.len(etime) < 1){
                $.tip_simple_alert(i18nTranslate('GiftsReceived_PleaseSelectQueryTime'));
                return;
            }
            if(!this.checkTimeSpanMonth(stime,etime,6)){
                return;
            }
            var balance_type = -1;
            $.blockUI({
                message : "<img style='width:23px;height:23px' src='"+IMAGE_DOMAIN+"systemRes/img/loading.gif'/>",
                css : {left : ($(window).width() -400) / 2 + 'px',top : ($(window).height())/ 2 + 'px'}
            });
            var sUrl='service/goods/v3/g/r?'+'no='+page+'&size='+pagesize+"&start="+stime+'&end='+etime;
            Bussiness.getData(sUrl,function(data){
                console.log(data);
                $.unblockUI();
                var html_str="";
                if(data.code == 0){
                    if(data.dataInfo.total > 0){
                        var pageCount = data.dataInfo.pageCount;
                        var page = data.dataInfo.page;
                        var counta = data.dataInfo.ext.total,diamond=data.dataInfo.ext.fansTotal;
                        var all_received='<span class="">'+counta+'<span class="coins_icon1"></span></span><span class="">'+diamond+'<span class="diamond_icon1"></span></span>';
                        $.each(data.dataInfo.list,function(idx,obj){
                            var datetime = i18nTranslate('GiftsReceived_No');
                            if(obj.t != null) datetime = formatDate(new Date(obj.t),"yyyy-MM-dd HH:mm:ss");
                            var nickname = obj.n == null ? i18nTranslate('GiftsReceived_No'): obj.n;
                            html_str += '<ul'+(idx%2!=0?' class="on"':'')+'>';
                            html_str += '<li class="con_width1">'+datetime+'</li>';
                            html_str += '<li class="con_width2">'+obj.nm*obj.pr+'<span class="'+(obj.pt==0?'coins_icon':'diamond_icon')+'"></span></li>';
                            html_str += '<li class="con_width3">'+obj.nm+'</li>';
                            html_str += '<li class="con_width4">'+obj.pr+'<span class="'+(obj.pt==0?'coins_icon':'diamond_icon')+'"></span></li>';
                            html_str += '<li class="con_width5">'+'<img style="height:50px;margin:5px auto;" src="/resource/'+obj.p+'" title="'+obj.p+'"/>'+'</li>';
                            html_str += '<li class="con_width6">'+nickname+'</li>';
                            html_str += '</ul>';
                        });
                        // 分页
                        this.page_html('pagenation',page,pageCount,'Page.getReceiveGifts');
                        $("#cost_total").html(stringFormat(i18nTranslate('GiftsReceived_CostAll'),all_received));
                    }
                    else{
                        $("#pagenation").html("");
                    }
                    if($.trim(html_str) == ''){
                        html_str = '<span class="readStart mt10px" data-i18n="GiftsReceived_NoFlowersRecord">'+i18nTranslate('GiftsReceived_NoFlowersRecord')+'</span>';
                    }
                }else if(data.code == 99) {
                    html_str = '<span class="readStart mt10px" data-i18n="GiftsReceived_TimeoutPleaseLoginAgain">'+i18nTranslate('GiftsReceived_TimeoutPleaseLoginAgain')+'</span>';
                    $("#pagenation").html("");
                }else
                {
                    html_str = '<span class="readStart mt10px" data-i18n="GiftsReceived_FailedToRetrieveGiftRecord">'+i18nTranslate('GiftsReceived_FailedToRetrieveGiftRecord')+'</span>';
                    $("#pagenation").html("");
                }
                if(html_str!='' && html_str.substr(0,31)=='<span class="readStart mt10px">')
                {
                    $("#tab_title").hide();
                }
                else
                {
                    $("#tab_title").show();
                }
                $("#showinfo").html(html_str);
            }.bind(this),null,'isV3');

        },
        page_html:function(pagenation,page,pageCount,method)
        {
            var html_str='<div class="digg">';
            if(page == 1){
                html_str+='<span class="span_1 disabled"></span>';
                html_str+='<span class="span_3 disabled"></span>';
            }else{
                html_str+='<span class="span_1" onclick="'+method+'(1)"></span>';
                html_str+='<span class="span_3" onclick="'+method+'('+(page-1)+')"></span>';
            }
            var start_page = 0,end_page = 0;
            if(pageCount > 10){
                start_page =  Math.max(page-3,1);
                if(start_page < 3){
                    end_page = 7;
                }else if(page + 6 >pageCount){
                    end_page = pageCount;
                }else{
                    end_page = Math.min(page+3,pageCount);
                }
            }else{
                start_page =  1;
                end_page = pageCount;
            }
            if(pageCount > 10 && end_page + 3 > pageCount){
                start_page = pageCount - 6;
                html_str+='<a href="javascript:void(0)" onclick="'+method+'(1)">1</a>';
                html_str+='<a href="javascript:void(0)" onclick="'+method+'(2)">2</a>';
                html_str+='<b>&hellip;</b>';
            }

            for(var i= start_page;i<=end_page;i++){
                if(page == i){
                    html_str+='<span class="current">'+i+'</span>';
                }else{
                    html_str+='<a href="javascript:void(0)" onclick="'+method+'('+i+')">'+i+'</a>';
                }
            }

            if(end_page + 2 < pageCount){
                html_str+='<b>&hellip;</b>';
                html_str+='<a href="javascript:void(0)" onclick="'+method+'('+(pageCount-1)+')">'+(pageCount-1)+'</a>';
                html_str+='<a href="javascript:void(0)" onclick="'+method+'('+pageCount+')">'+pageCount+'</a>';
            }

            if(page == pageCount){
                html_str+='<span class="span_4 disabled"></span>';
                html_str+='<span class="span_2 disabled"></span>';
            }else{
                html_str+='<span class="span_4" onclick="'+method+'('+(page+1)+')"></span>';
                html_str+='<span class="span_2" onclick="'+method+'('+pageCount+')"></span>';
            }
            html_str+='</div>';
            $("#"+pagenation).html(html_str);
            $("#"+pagenation).show();
        },
        checkTimeSpanMonth:function(start, end, max_month) {
            var startdate = new Date(start);
            var enddate = new Date(end);
            if (max_month > 0) {
                var now = new Date();
                var m1 = parseInt(now.getFullYear()) * 12 + parseInt(now.getMonth());
                var m2 = parseInt(startdate.getFullYear()) * 12 + parseInt(startdate.getMonth());
                var m3 = parseInt(enddate.getFullYear()) * 12 + parseInt(enddate.getMonth());
                if (m1 - m2 > max_month||m3 - m2 > max_month) {
                    $.tip_simple_alert(stringFormat(i18nTranslate('BuyHistory_AtMostRecordCanBeRetrieved'),max_month));
                    return false;
                }
            }
            return true;
        },

        localize: function() {
            if(top_util){
                //top_util.reset_popup_message();
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
            Header.identified(this.identity);
            UserTop.identifyFlow();
            if (this.identity) {
                UserTop.Login_Tips_After();
            }
            else
                UserTop.Login_Tips_Before();
            //    login_util.show_login_div();
        }

    };

    I18N.init(null,true).localize(null,Page.run.bind(Page));

});