define(function(require) {
	var STRING_EMPTY = '',
		DISPLAY_NONE = ' style="display:none;"',
		Utility = require(JS_UTILITY),
		Cookie = Utility['Cookie'],
		OOP = Utility['OOP'],
		Promise = Utility['Promise'],
		xss = Utility['String']['xssFilter'],
		stringFormat = Utility['String']['stringFormat'];
	var Kit = require(useJSComponent('kit')),
		I18N = Kit.use('I18N'),
		Body = Kit.use('Body'),
		Header = Body.Header,
		Footer = Body.Footer,
		_nav = Body.nav,
		_task = Body.TASKS,
		Lazyload = Kit.use('Lazyload'),
		Trigger = Kit.use('Trigger'),
		Bussiness = Kit.use('Bussiness');
	var CONST = {
		Event: {
			'UpdateLive': 'UpdateLive',
			'UpdateIMG': 'UpdateIMG'
		}
	};
		
	var TEMPLATE = {
		'MAIN': '<div class="content_wrap clearfix">\
					<div id="slider" class="top_slider clearfix">\
						{0}\
					</div>\
					<div id="content" class="content clearfix">\
					</div>\
					<div data-role ="ce_nav"></div>\
					<div class="hidden" id="task_tan"></div>\
					<div class="task_con" data-role ="task"></div>\
					<div class="return_top hidden"></div>\
				</div>',

		'SLIDER': '<ul id="pager"></ul><ul id="topSlider" style="display:none;"></ul>',

		'SLIDER_ITEM': '<li{0} style="" data-index="{4}"><a{7}><img src="{8}" width="978" height="285" alt="{9}" /></a></li>',

		'SLIDER_HOLDER': ' href="{0}" target="_blank"  data-stat="{0}" ',

		'SLIDER_CURRENT': ' class="active"',

		'MINE': '<div class="my_host_tab">\
							<h2 class="title_followed" data-role="tab-followed"><a href="javascript:;" data-i18n="Index_MyFollowed" data-stat="Index_MyFollowed">{{Index_MyFollowed}}</a></h2>\
							<h2 class="title_viewed" data-role="tab-viewed"><a href="javascript:;" data-i18n="Index_RecentViewed" data-stat="Index_RecentViewed">{{Index_RecentViewed}}</a></h2>\
						</div>\
						<div class="my_host_slider clearfix">\
							<div data-role="scroller" class="my_host_wrap">\
								<ul class="my_followed" data-role="list-followed" style="display:none;"></ul>\
								<ul class="my_viewed" data-role="list-viewed" style="display:none;"></ul>\
							</div>\
							<div class="direction_control">\
								<a href="javascript:;" class="btn_prev"  data-stat="btn_prev" data-role="previous" style="display:none;">&lt;</a>\
								<a href="javascript:;" class="btn_next"  data-stat="btn_next" data-role="next" style="display:none;">&gt;</a>\
							</div>\
						</div>',

		'ITEM_MINE': '<li class="{0}" data-live="{1}">\
						<div class="my_host_img readStart">\
							<a class="my_host_photo" href="{2}"  data-stat="{2}" target="_blank" data-lazy="{3}"></a>\
							<a class="my_recomend_hover" href="{2}"  data-stat="{2}" target="_blank"></a>\
							{4}\
						</div>\
						<div class="my_host_info readStart">\
							<div class="host_about clearfix">\
								<a class="icon_level" href="/level.shtml " data-stat="icon_level"><img src="{5}" /></a>\
								<h3 class="host_name"><a href="{2}" data-stat="{2}">{6}</a></h3>\
							</div>\
							<div class="host_follow clearfix">\
								<img class="follow_icon" src="/resource/static/image/icon_follow.png" alt="follow" />\
								<span class="follow_num">{7}</span>\
							</div>\
							<span class="icon_live"{8} data-role="live"><img class="icon_live" src="/resource/static/image/icon_live.gif" alt="live" /></span>\
						</div>\
					</li>',

		'HOT': '<div class ="_hotTab_warp">\
					<div class = "hot_moer"><!--<a href="javascript::" data-i18n="Index_More" data-stat="Index_More">{{Index_More}}</a>--></div>\
					<div id="hotTab" class="all_host_tab"></div>\
					<!--<div class ="hot_title" data-i18n="Index_Hotanchor">{{Index_Hotanchor}}</div>-->\
				</div>\
				<div class="all_host_list">\
					<ul id="hotList"></ul>\
				</div>',

		'TAB_HOT': '<h2><a href="javascript:;" data-type="{0}"  data-stat="{1}">{1}</a></h2>',

		'ITEM_HOT': '<li class="{0} readStart">\
						<div class ="list_hove"></div>\
						<div class="all_host_img">\
							<a class="all_host_photo" onclick="redirectCheck();" href="{1}" target="_blank" data-lazy="{2}" data-stat="{1}">\
								<span class="host_show_time"{9}>{10}</span>\
							</a>\
							{3}\
						</div>\
						{4}\
						<div class="all_host_info">\
						<div class="online_num clearfix">\
								<img src="/resource/static/image/newIndex/icon_line.png" />\
								{7}\
							</div>\
							<div class="host_about clearfix">\
								<h3 class="host_name"><a onclick="redirectCheck();" href="{1}" target="_blank" data-stat="{1}">{6}</a></h3>\
								<!--<a class="icon_level" href="/level.shtml " data-stat="LevelPage_Link"></a>-->\
							</div>\
						</div>\
					</li>',

		'SIDE': '<div class="sysmesg_box clearfix" style="display: none">\
						<div class="sysmesg_box_txt">\
							<img src="/resource/systemRes/imgNew/hall_img/sysmesg_box_cls_03.png" width="11.5" height="11.5" class="sysmesg_box_cls">\
							<p class="sysmesg_box_nomtxt">Recharge during Eid 100$ Can participate in the IPhone6 Recharge during Eid 100$ Can participate in the IPhone6 Recharge during...</p>\
							<a href="#" class="sysmesg_box_hrf" style="display:none" target="_blank" data-i18n="Index_Learn_More">{{Index_Learn_More}}</a>\
							<div class="sysmesg_triangle"></div>\
						</div>\
						<div class="sysmesg_box_img"></div>\
				    </div>\
				    <div id="recommendLive" class="recommend_live" style="background: #000;display:none;"></div>\
					<div id="topGift" class="side_block gift_rank"></div>\
					<div id="topFlower" class="side_block flower_rank hidden"></div>\
					<div id="topWealth" class="side_block wealth_rank"></div>\
					<div class="download_box">\
						<a href="http://app.appsflyer.com/id917213988?pid=Home_Right&amp;c=promotion=900111" target="_blank" class="app_icon_btn" data-stat="app_icon_btn"></a>\
						<a href="http://app.appsflyer.com/com.fission.sevennujoom?pid=Home_Right&amp;c=promotion=900101" target="_blank" class="andr_icon_btn" data-stat="andr_icon_btn"></a>\
					</div>',
		'SHIPING':'<object id="player" type="application/x-shockwave-flash" data="/room/swf3/SmallShow.swf" width="260" height="195" style="visibility: visible;">\
						<param name="allowFullScreen" value="false">\
						<param name="allowScriptAccess" value="sameDomain">\
						<param name="allowNetworking " value="all">\
						<param name="quality " value="high">\
						<param name="bgcolor" value="000000">\
						<param name="wmode" value="transparent">\
						<param name="flashvars" value="url={0}&amp;streamId={1}&amp;roomId={2}&amp;language={3}&amp;fs={4}&amp;userId={5}">\
					</object>\
					<div class="recommend_live_hover"><a href="/live/{6}" onclick="redirectCheck();" target="_blank" data-i18n="Index_Enter">{{Index_Enter}}</a></div>',
		'TOP_GIFT': '<h2 class="readStart" data-i18n="{0}">{1}</h2>\
						<a class="rank_more readEnd" href="/rank.shtml" data-i18n="Index_More" data-stat="Index_More">{{Index_More}}</a>\
						<ul>\
							{2}\
						</ul>',

		'ITEM_TOP': '<li data-live="{0}">\
						<span class="rank_num readStart">{1}.</span>\
						<a class="rank_img readStart" onclick="redirectCheck();" href="{2}"{7} data-stat="LevelPage_Link"><img src="{3}" alt="{4}" {6} />\
						</a>\
						<div class="rank_info readStart">\
							<img src="/resource/static/image/index/live_icon.png" class="side_live_icon readStart" alt="live" data-role="live" style="display:none;" />\
							<span class="rank_name readStart alignStart">{4}</span>\
							<span class="rank_detail readStart">{5}</span>\
						</div>\
					</li>',

		'RECOMMEND': '<!--<img class="icon_recommend" src="/resource/static/image/newIndex/star.png" alt="system recommend" />-->',

		'LIVE': '<span class="icon_live" data-i18n="Icon_Lives">{{Icon_Lives}}</span>',
	};


	var Page = {
		'run': function() {
			this.load();
			this.render();
            this.renderHot();
			this.compose();
			this.bind();
			this.start();
            this.returnTop();
		},

		'load': function() {
			this.identify = this.identify.bind(this);
			this.cache = {};
			
		},
		'render': function() {
			this.container = $('#container');
			this.container.i18nHTML(Header.html() +
			stringFormat(TEMPLATE.MAIN,
				TEMPLATE.SLIDER,
				//TEMPLATE.MINE,

				TEMPLATE.SIDE) + Footer.html());
			this.container.find('[data-role="ce_nav"]').i18nHTML(_nav.html());
			this.container.find('[data-role="task"]').i18nHTML(_task.html());
			this.hotList = $('#hotList');
			//$('.menu_nav a[href="/"]').attr({'target':'_self'}).addClass('active');
		},

		'compose': function() {
			I18N.init({
				'onLocalize': this.localize.bind(this)
			});
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
			Lazyload.init();
		},

		'bind': function() {
			var eventName = CONST.Event.UpdateLive;
//			Trigger.register(eventName, this.mineLive.bind(this));
//			Trigger.register(eventName, this.sideLive.bind(this));
			Trigger.register(CONST.Event.UpdateIMG, Lazyload.render.bind(Lazyload));
			var _this=this;
			$(".language_nav").bind("click",function(){
				_this.renderHot();
			})
			var index_bold="."+location.search.substr(1);
			$(".user_info li a").filter(index_bold).css("font-size","22px");
		},

		'start': function() {
			var promise = new Promise(function() {
				this.time();
				promise.resolve();
			}.bind(this))
			.then(function() {
						this.identifyFlow();
			}.bind(this));
		},
		"time":function(){
			setInterval(this.refresh.bind(Page),3*60*1000);
		},
		localize: function() {
			//Carousel.fetch();
			var language = I18N.language;
			if (this.sign)
				this.sign.localize();

			if(top_util){
				top_util.reset_popup_message();
			}
		},
		'heartbeat': function() {
		},
		renderHot:function () {
            $("#content").html("");
			var promise = new Promise(function () {
				Bussiness.getData("data/static/v4/?roomtag",function (data) {
						if(data.code==0){
                            this.roomtag = data['dataInfo']['roomtag']['d'];
                            promise.resolve(this.roomtag)
						}
                }.bind(this),null,true)
            }.bind(this)).then(function (roomtags) {
            		var loactions = window.location.search.substring(1);
            		console.log(loactions)
					roomtags&&roomtags.forEach(function (value,index) {
							if(value.id==99)return;
							//if(value.id==loactions){
                                if((loactions==112||loactions==106)){
                                    var hotFrame="<div class='all_host big' id="+value.id+"><div class='_hotTab_warp'><div class='hot_titles hidden' id='tab"+index+"'></div></div><div class='all_host_list'><ul class='hotList'></ul></div></div>";
                                }else {
                                    var hotFrame="<div class='all_host' id="+value.id+"><div class='_hotTab_warp'><div class='hot_titles  hidden' id='tab"+index+"'></div></div><div class='all_host_list'><ul class='hotList'></ul></div></div>";
                                }
                                $("#content").append(hotFrame);
                                console.log(roomtags)
                                if(value.sn.length>0){
                                  //  $("#tab"+index).removeClass("hidden");
									$("#"+loactions+" .hot_titles").removeClass("hidden");
                                    $.each(value.sn,function(indexs,values){
                                        var nextTab="<div class='next_tab' id='"+values.id+"'>"+values.lg[I18N.language]+"</div>";
                                        $("#tab"+index).append(nextTab);
                                    })
                                    $("#tab"+index).prepend($("<div class='alltab next_tab next_tab_active' id='"+value.id+"'></div>"));
                                    $(".alltab").html(i18nTranslate('Index_All'));
                                }
							//}
					}.bind(this));

					promise.resolve(roomtags);
            }.bind(this)).then(function () {
                Bussiness.getData('service/room/v3?allv',function(data){
                    if(data.code==0){
                        var hotData =data.dataInfo.ai.dt,hosts=[];
                        if(hotData.length>0) {
                            $.each(hotData, function (i, item) {
                                //if(!cates[item.tc]) return;
                                if (item.tc == '99') return;
                                // console.log(!hosts[item.tc])
                                if (!hosts[item.tc])
                                    hosts[item.tc] = [];
                                hosts[item.tc].push(item);
                            });
                        }
                        this.renderInfo(this.roomtag,hosts)
                        promise.resolve();
                    }
                }.bind(this),null,true);
            }.bind(this)).then(function () {
                var _this = this;
                $(".next_tab").bind("click",function(){
                    $(this).addClass("next_tab_active").siblings().removeClass("next_tab_active");
                    $(this).parent("div").parent("div").siblings("div").children("ul").children("li").hide();
                    $(this).parent("div").parent("div").siblings("div").children("ul").children("li").filter("."+$(this).attr("id")).show();
                    //保存二级标签ID，自动刷新时，二级标签下的主播不会重置为ALL标签
                    _this.flagIndex = $(".next_tab_active").attr("id");
                })
            }.bind(this));
        },
        'renderInfo':function(roomtags,data){
            var  tempnent = '<li class="readStart {0} {1} {8}" id={10}>\
					<div class="list_hove"></div>\
					<div class="all_host_img {2}">\
					                       {9}\
						<a class="all_host_photo" href={3} target="_blank">\
						  <img class={4}  src={5} alt=""/>\
						 </a> \
					</div>\
					<div class="all_host_info">\
						<div class="online_num clearfix">\
							<img src="/resource/static/image/newIndex/icon_line.png">{6}\
						</div>\
						<div class="host_about clearfix">\
							 <h3 class="host_name"> \
							  <a class="all_host_photo" onclick="redirectCheck();" href={3} target="_blank">{7}</a>\
							 </h3>\
						 </div>\
            		</div>\
				</li>'
            var roomtag = roomtags?roomtags:this.roomtag;
            var hotData = data ?data:this.hotData;
            var rocarr=[], rarr=[] ,host=[],hotType ={} ,hotLists="";
            var loactions = window.location.search.substring(1)
            $.each(roomtag,function (i,item) {
            	if(item.id==loactions){
                    if(item.id==99)return;
                    var indexs = item.id;
                    var  hotList= hotData[indexs].map(function (val,index) {
                        if(val.sc==undefined){
                            val.sc='';
                        };
                        if(val.is!=1){
                            if(val.tc==106)rocarr.push(val.roc);
                            var gameHot = val.tc==106||val.tc==112?"bigtag":"nomarl",
                                icon = "icon"+index,
                                live = "/live/"+val.ri,
                                poster = val.tc==106||val.tc==112?"bigposter":"poster",
                                posterSrc = "/resource/"+val.ci,
                                icon_live = val.sti==true?"<span class='icon_live icon_re_live'>"+i18nTranslate('Icon_Lives')+"</span>":val.st==1?"<span class='icon_live'>"+i18nTranslate('Icon_Lives')+"</span>":"";
                            return  stringFormat(tempnent, gameHot, val.tc, icon, live, poster, posterSrc, val.ol, val.nn, val.roc,icon_live,val.roc);
                        }

                    }.bind(this)).join("");
                    $(".hotList").eq(i).html(hotList);
				}

            })
            //判断二级签，放刷新；
            if(this.flagIndex!==undefined){
                // $(".hotList ").hide();
				console.log(this.flagIndex)
                $(".hotList li") .filter("."+this.flagIndex).siblings("li").hide();
                $(".hotList li") .filter("."+this.flagIndex).show();
            }else{
                $(".hotList li").show();
            } ;
            var rarr=[];
            for (i in rocarr) {
                if (!!rarr[rocarr[i]]) {
                    rarr[rocarr[i]]++;
                } else {
                    rarr[rocarr[i]] = 1;
                }
            }
            $.each($(".next_tab"),function(index,val) {
                var rocid = $(this).attr("id");
//						不对all标签做操作
                if (rocid != 106) {
//							如果没有这个主播标签
                    if (rarr[rocid] == undefined) {
                        $(this).hide();
                    } else {
//  						有这个主播标签判断
                        if (rarr[rocid] < 6) {
                            $(this).hide();
                        }
                    }
                }

            })
            $(".bigposter").error(function(){
                $(this).attr("src","/resource/static/image/index/nophotobig.jpg")
            })
            $(".poster").error(function(){
                $(this).attr("src","/resource/systemRes/img/default/nophoto.jpg")
            });
            $("ul.hotList li.nomarl ").mouseenter(function (event) {
                $(this).find("div.list_hove").animate({width:"148px",height:"186px",marginTop:"-93px",marginLeft:"-74px"},200);
            }).mouseleave(function (event) {
                $(this).find("div.list_hove").animate({width:"0px",height:"0px"},0,function(){
                    $(this).css("margin",0);
                })
            });
            $("ul.hotList li.bigtag ").mouseenter(function (event) {
                $(this).find("div.list_hove").animate({width:"314px",height:"220px",marginTop:"-110px",marginLeft:"-157px"},200);
            }).mouseleave(function (event) {
                $(this).find("div.list_hove").animate({width:"0px",height:"0px"},0,function(){
                    $(this).css("margin",0);
                });
            })
        },
		'refresh': function() {
            var promise = new Promise (function () {
                Bussiness.getData('data/static/v4/?roomtag',function(data){
                    if(data.code==0){
                        this.roomtag = data['dataInfo']['roomtag']['d'];
                        promise.resolve(this.roomtag);
                    }
                }.bind(this),null,true);
            }.bind(this)).then(function () {
                Bussiness.getData('service/room/v3?allv',function(data){
                    if(data.code==0){
                        var hotData =data.dataInfo.ai.dt,hosts=[];
                        if(hotData.length>0) {
                            $.each(hotData, function (i, item) {
                                //if(!cates[item.tc]) return;
                                if (item.tc == '99') return;
                                //console.log(!hosts[item.tc])
                                if (!hosts[item.tc])
                                    hosts[item.tc] = [];
                                hosts[item.tc].push(item);
                            });
                        }
                        this.renderInfo(this.roomtag,hosts)
                        promise.resolve();
                    }

                }.bind(this),null,true);
            }.bind(this))
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
			// else {
			// 	var userName = Cookie.get(Cookie.key['login_name']);
			// 	if (!userName)
			// 		return 'anonymous';
			// 	// Bussiness.postData('user_init_user_info.fly', {
			// 	// 	'loginName': userName
			// 	// }, function(data) {
			// 	// 	if (data && data.code == 0)
			// 	// 		this.promise.resolve(this.identity = data); //todo: JSON.stringify(dta)
			// 	// 	else
			// 	// 		this.promise.resolve();
			// 	// }.bind(this), function() {
			 		this.promise.resolve();
			// 	// }.bind(this));
			// }
		},
		'identified': function() {
			var promise = new Promise(function(){
				Bussiness.getData('service/message/v3/sms/page/0/2',function(data){
					if(data.code==0){
						 this.messages_length = data['dataInfo']['list'].length;
					}
                    promise.resolve();
				}.bind(this),null,true);
			}.bind(this)).then(function(){
				Header.identified(this.identity);
				_nav.identified(this.identity,this.messages_length);
				_task.identified(this.identity);
				var sign = this.sign = require('component/sign');
				sign.start();
			}.bind(this))
			
		},

		"returnTop":function(){
			var cenHeight = window.screen.height*0.5,returnDom =$("div.return_top");
			$(window).scroll(function(){
				var docHeight = $(window).scrollTop();
				if(docHeight>cenHeight){
                    returnDom.removeClass("hidden");
				}else {
                    returnDom.addClass("hidden");
				}
			});
            returnDom.on("click",function(){
				$("body,html").animate({scrollTop:0},500,function () {
                    returnDom.addClass("hidden");
                })
			})
		},

	};

	I18N.init(null, true).localize(null, Page.run.bind(Page), true);
	fbq('track', 'ViewContent');
	
});
