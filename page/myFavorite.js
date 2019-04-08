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
    var Popup = require('component/popup');
    //UserTop=require('component/userTop');
    var TEMPLATE={
        'MAIN':'<div id="Favorite_List" class="wrap Self_Info_">\
                    <div class="new_user_con">\
                        <div class = "nav_list">\
                            <div class="nav_bar hidden"></div>\
                            <ul></ul>\
                        </div>\
                    	<div class="edit">\
                    		<span data-role="edit" data-i18n="Fav_edit" style="display:none;" data-stat="Fav_edit">{{Fav_edit}}</span>\
                    		<span data-role="save" data-i18n="MyProfile_Save" data-stat="MyProfile_Save">{{MyProfile_Save}}</span>\
                    	</div>\
                    </div>\
                    <div data-role ="ce_nav"></div>\
                    <div class="hidden" id="task_tan"></div>\
					<div class="task_con" data-role ="task"></div>\
					<div class="return_top hidden"></div>\
                </div>',
        'hostList':'<div class="list_main"><div class="list_hove"></div><dl>\
                        <dt>\
                            <img class="favPoster" src="{0}">\
                        </dt>\
                        <dd>\
                        	<p class = "onlivs">\
                                <img class="user_follow" src="/resource/static/image/newIndex/icon_line.png" alt="">\
                                <a>{3}</a>\
                            </p>\
                            <span>\
                                <!--<img class="user_badge" src="{1}" alt=""/>-->\
                                <p>{2}</p>\
                            </span>\
                        </dd>\
                        	<a href="javascript:void(0);" data-roomId="{4}" class="popshut"  style="display:none" ></a>\
                        <div class="room_bgz_hover" style="">\
                        	 {5}\
                        	 {7}\
                            <div class="room_bgz_opc"></div>\
                            <div class="room_bgz"><a href="live/{6}" target="_blank" class="room_play_btn"  data-surfing="{6}">\
                            </div>\
                        </div>\
                    </dl></div>',

        'hostLiving':'<span class="host_living" data-i18n="Icon_Lives">{{Icon_Lives}}</span>',
        'star':'<!--<span class ="stars"></span>-->'
    };

    var Page = {
        run:function(){
            this.load();
            this.render();
            // UserTop.Login_Btn();
            this.compose();
            this.bind();
            this.start();
            this.identifyFlow();
            this.returnTop();
        },
        load:function(){

			this.cates={};
        },

        render:function(){
            this.container = $('#container');
            this.container.i18nHTML(Header.html()  + TEMPLATE.MAIN + Footer.html());
            this.container.find('[data-role="ce_nav"]').i18nHTML(_nav.html());
            this.container.find('[data-role="task"]').i18nHTML(_task.html());
        },
        compose:function(){
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
            // UserTop.init({'container':this.container,'cur':'menu_myfavorite'});
        },
        bind:function(){

        },
        start:function(){
        
        },
        
//		渲染用户身份信息
        'identifyFlow': function() {
            this.promise = new Promise(this.identify.bind(this)).then(this.message.bind(this)) //move method identity to utility
                .then(function(){this.identified(1);}.bind(this));
        },
//		渲染用户身份信息
        'message':function(){
            Bussiness.getData('service/message/v3/sms/page/0/2',function(data){
                if(data.code==0){
                    this.messages_length = data['dataInfo']['list'].length;
                }
               this.promise.resolve();
            }.bind(this),null,true);
        },
//		渲染用户身份信息
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
            //
            //         if (data && data.code == 0)
            //
            //             this.promise.resolve(this.identity = data); //todo: JSON.stringify(dta)
            //         else
            //             this.promise.resolve();
            //     }.bind(this), function() {
                    this.promise.resolve();
            //     }.bind(this));
            // }
        },
        "returnTop":function(){
            var cenHeight = window.screen.height*0.5,returnDom = $("div.return_top");
            $(window).scroll(function(){
                var docHeight = $(window).scrollTop();
                if(docHeight>cenHeight){
                    returnDom.removeClass("hidden");
                }else {
                    returnDom.addClass("hidden");
                }
            });
            returnDom.on("click",function(){
                $("body,html").animate({scrollTop:0},500,function(){
                    returnDom.addClass("hidden");
                })

            })
        },
        'identified':function(){
            Header.identified(this.identify);
            _nav.identified(this.identity,this.messages_length);
            _task.identified(this.identify);
            var sign = this.sign = require('component/sign');
            sign.start();
            I18N.init({'onLocalize': this.localize.bind(this)});
            if(this.identity){
                $("span.sorry_loginout").hide();
                this.promiseFav();
                setInterval(this.refresh.bind(Page),3*60*1000);
            }else{
                login_util.show_login_div();
                $('[data-role="edit"]').hide();
                $("#Favorite_List").append('<span class="sorry_loginout"  style="position: absolute;top: 50%;left: 50%;margin-left: -200px;" data-i18n="Login_Out_Conts">'+i18nTranslate('Login_Out_Conts')+'</span>');

            }
        },
        'promiseFav':function(){
            var tab = $('.nav_list ul'),lan = I18N.language,bar = $('.nav_bar').addClass('hidden'),contents;
            tab.empty();
            $('.warp').remove();
            var promise = new Promise(function(){
                if(this.cates&&this.cates.length > 0){
                    promise.resolve(this.cates);
                }else{
                    Bussiness.getData('data/static/v4/?roomtag=&requestType=1',function(data){
                        var temp;
                        if(data.code == 0){
                            temp = data.dataInfo.roomtag.d;
                            $.each(temp,function(i,item){
                                var item_id = item.id,tab_li= tab.find('li[data-id="'+ item_id +'"]');
                                if(item_id == '99') return;
                                this.cates['cate_'+item_id] = item;//避免数组按数值key排序
                                if(tab_li.length<1){
                                    $(stringFormat('<li data-id="{1}">{0}</li>',item['lg'][lan],item_id)).appendTo(tab);
                                    if(item_id == '106' || item_id == '112'){
                                        contents=stringFormat('<div class="warp" style="display:none;"><div class="new_user_host host_list_{0} big clearfix"></div></div>',item_id)
                                    }else{
                                        contents=stringFormat('<div class="warp" style="display:none;"><div class="new_user_host host_list_{0} normal clearfix"></div></div>',item_id)
                                    }
                                    $(contents).appendTo($('.new_user_con'));
                                }
                            }.bind(this));
                            promise.resolve(this.cates);
                        }
                    }.bind(this),null,true);
                }
            }.bind(this)).then(function(cates){
                    var temp, hosts = [],items = [],i= 0,ele,_edit = $('[data-role="edit"]'),contents;

                    Bussiness.getData('service/room/v3/user/fav/get',function(info){
                        if(info.code==0){
                            temp = info['dataInfo']['data']['list'];
                            if(temp.length>0){
                                $.each(temp,function(i,item){
                                    //if(!cates[item.tc]) return;
                                    if(item.tc == '99') return;
                                    if(!hosts[item.tc])
                                        hosts[item.tc] = [];
                                    hosts[item.tc].push(item);
                                });
                                this.hosts = hosts;
                                //console.log(this)
                                if(this.hosts.length<1){
                                    $("div.new_user_host").html('<span class="sorry" data-i18n="Not_Following_Any_Host">'+i18nTranslate('Not_Following_Any_Host')+'</span>');
                                    _edit.hide();
                                    return;
                                }
                                _edit.show();
                                //$('.new_user_host').remove();
                                $.each(cates,function(index,cat){
                                    //cat:tab    index：id
                                    index = index.split('_')[1];
                                    item = {
                                        'index': i++,
                                        'element':tab.find('li[data-id="'+ index +'"]'),
                                        'list':$("div.new_user_host.host_list_" + index +"")//.i18nHTML(getList())
                                    };
                                    item['onenter'] = Page.renderFav;
                                    item['enter'] = function(){
                                        this.onenter (index,Page.hosts);
                                        lan==='ar'? bar.css({'left':this.element.position().left+parseInt(this.element.css('marginLeft'))+'px'}):bar.css('left',this.element.position().left+'px') ;
                                        bar.css('width',this.element.width());
                                        this.list.parent(".warp").show();
                                    }.bind(item);
                                    item['quit'] = function(){
                                        this.list.parent(".warp").hide();
                                    }.bind(item);
                                    items.push(item);
                                   // function getList(){
                                    //var listHTML = '<span class="sorry" data-i18n="Not_Following_Any_Host">'+i18nTranslate('Not_Following_Any_Host')+'</span>';
                                    //if(hosts[index] && hosts[index].length > 0){
                                    //    listHTML = hosts[index].map(function(data,i){
                                    //        userIco= DOMAIN_CONFIG['IMAGE_DOMAIN']+data["hp"];
                                    //        hostName=data["nn"]? data["nn"] : '';
                                    //        favoriteCount=data["ol"]? data["ol"] : '';
                                    //        hostRoomId=data["ri"]? data["ri"] : '';
                                    //        hotStar = (data['st']==1&&data['sti']==true)?TEMPLATE.star:"";
                                    //        hostLiving=(data["st"]==1)? (data['sti']? '<span class="host_living host_re_living" data-i18n="Icon_Lives">{{Icon_Lives}}</span>':TEMPLATE.hostLiving) : '';
                                    //        hostSurfing=data["sf"]? data["sf"] : '';
                                    //        return stringFormat(TEMPLATE.hostList,userIco,'',hostName,favoriteCount,hostRoomId,hostLiving,hostSurfing,hotStar);
                                    //    }).join('')
                                    //}
                                    //return listHTML;
                                    //  };
                                }.bind(this));
                                this.mutex = new(Kit.use('Mutex'))({
                                    'items': items
                                });
                                this.mutex.mutex(0,true);

                                bar.removeClass('hidden');
                                $('.big .favPoster').error(function(){
                                    $(this).attr('src','/resource/static/image/index/nophotobig.jpg');
                                });
                                $('.normal .favPoster').error(function(){
                                    $(this).attr('src','/resource/systemRes/img/default/nophoto.jpg');
                                });
                            }else{
                                $(".warp").eq(0).css("display","block");
                                $("div.new_user_host").html('<span class="sorry" data-i18n="Not_Following_Any_Host">'+i18nTranslate('Not_Following_Any_Host')+'</span>');
                            }
                        }else if(info.code == 99) {
                            login_util.show_login_div();
                            $('[data-role="edit"]').hide();
                            user_util.user_out('login_util', 'user_out');
                            $("div.new_user_host").html('<span class="sorry" data-i18n="Login_Out_Timeout">'+i18nTranslate('Login_Out_Timeout')+'</span>');
                        }else{
                            $("div.new_user_host").html('<span class="sorry" data-i18n="Failed_To_Retrieve_Host_list">'+i18nTranslate('Failed_To_Retrieve_Host_list')+'</span>');
                        }
                    }.bind(this),null,true);
                    promise.resolve();
                }.bind(this));
        },
        refresh:function(){
                var promise = new  Promise(function(){
                    Bussiness.getData('data/static/v4/?roomtag=&requestType=1',function(data){
                        var temp;
                        if(data.code == 0){
                            temp = data.dataInfo.roomtag.d;
                            $.each(temp,function(i,item){
                                var item_id = item.id;
                                if(item_id == '99') return;
                                this.cates['cate_'+item_id] = item;//避免数组按数值key排序
                            }.bind(this));
                            promise.resolve(this.cates);
                        }
                    }.bind(this),null,true);
                }.bind(this)).then(function(cates){
                        var temp,hosts = [],indexs;
                        Bussiness.getData('service/room/v3/user/fav/get',function(info){
                            if(info.code==0) {
                                temp = info['dataInfo']['data']['list'];
                                if (temp.length > 0) {
                                    $.each(temp, function (i, item) {
                                        //if(!cates[item.tc]) return;
                                        if (item.tc == '99') return;
                                        if (!hosts[item.tc])
                                            hosts[item.tc] = [];
                                        hosts[item.tc].push(item);
                                    });
                                    this.hosts = hosts;
                                    $.each(cates, function (index, cat) {
                                        //cat:tab    index：id
                                        indexs = index.split('_')[1];
                                        this.renderFav(indexs,this.hosts);
                                    }.bind(this));
                                }
                            }
                        }.bind(this),null,true);
                        promise.resolve();
                    }.bind(this))
        },
        renderFav:function(index,hosts){
          //  var hosts =this.hosts?this.hosts:hosts
            var listHTML = '<span class="sorry" data-i18n="Not_Following_Any_Host">'+i18nTranslate('Not_Following_Any_Host')+'</span>';
            if(hosts[index] && hosts[index].length > 0){
                //this.mutex.mutex(index,true);
                listHTML = hosts[index].map(function(data,i){
                    userIco= DOMAIN_CONFIG['IMAGE_DOMAIN']+data["hp"];
                    hostName=data["nn"]? data["nn"] : '';
                    favoriteCount=data["ol"]? data["ol"] : '';
                    hostRoomId=data["ri"]? data["ri"] : '';
                    hotStar = (data['st']==1&&data['sti']==true)?TEMPLATE.star:"";
                    hostLiving=(data["st"]==1)? (data['sti']? '<span class="host_living host_re_living" data-i18n="Icon_Lives">{{Icon_Lives}}</span>':TEMPLATE.hostLiving) : '';
                    hostSurfing=data["sf"]? data["sf"] : '';
                    return stringFormat(TEMPLATE.hostList,userIco,'',hostName,favoriteCount,hostRoomId,hostLiving,hostSurfing,hotStar);
                }).join('')
            }
            $("div.new_user_host.host_list_" + index +"").i18nHTML(listHTML);
            $("div.normal div.list_main").mouseenter(function (event) {
                $(this).find("div.list_hove").animate({width:"148px",height:"186px",marginTop:"-93px",marginLeft:"-74px"},200);
            }).mouseleave(function (event) {
                $(this).find("div.list_hove").animate({width:"0px",height:"0px"},0,function(){
                    $(this).css("margin",0);
                })
            });
            $("div.big div.list_main").mouseenter(function (event) {
                $(this).find("div.list_hove").stop().animate({width:"314px",height:"220px",marginTop:"-110px",marginLeft:"-157px"},200);
            }).mouseleave(function (event) {
                $(this).find("div.list_hove").stop().animate({width:"0px",height:"0px"},0,function(){
                    $(this).css("margin",0);
                });
            });
            Page.Edit();
            Page.Delete();
        },
        Delete:function(){
            var aHostRoomId=$('a.popshut');
            var _save = $('[data-role="save"]');
            var _edit = $('[data-role="edit"]');
            var ids = [];
            aHostRoomId.click(function(){
                $(this).parent("dl").parent("div.list_main").addClass("dis");
                ids.push($(this).attr('data-roomId'));
            });
            _save.unbind('click').click(function(){
                _save.hide();
                $('a.popshut').css("display","none");
                $(".room_bgz_hover").find("a").show();
                _edit.show();
                if(ids.length<1) return;
                Bussiness.postData("service/room/v3/user/fav/subs",{"ids":ids.join(",")},function(data){
                   this.promiseFav();
                }.bind(this));
            }.bind(this))
        },
        Edit:function(){
            var _edit = $('[data-role="edit"]');
            //_edit.show();
            var _save = $('[data-role="save"]');
            _edit.click(function(){
                _edit.hide();
                _save.show();
                $('a.popshut').css("display","block");
                $(".room_bgz_hover").find("a").hide();
            });

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
        'Login_Tips_Before':function(){
            this.container.i18nHTML(Header.html()  + TEMPLATE.Login_Before_Cont + Footer.html());
            Page.compose();
            //UserTop.Login_Btn();
        },
        'Login_Tips_After':function(){
            Page.render();
            Page.compose();
        },
        'localize': function () {
            this.promiseFav();
        }
    };
    I18N.init(null,true).localize(null,Page.run.bind(Page),true)
});