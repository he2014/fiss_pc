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
						<img src="/resource/static/image/newIndex/banner.png" style="position: absolute;bottom:0;left: 0;z-index: 998;"/>\
						{0}\
					</div>\
					<div id="content" class="content clearfix">\
						<div class="host_wrap readStart">\
							<div id="mine" class="my_host" style="display:none;"></div>\
						</div>\
					</div>\
					<div  data-role ="ce_nav"></div>\
					<div class="hidden" id="task_tan"></div>\
					<div class="task_con" data-role ="task"></div>\
				</div>',

		'SLIDER': '<ul id="pager"></ul><ul id="topSlider" style="display:none;"></ul>',

		'SLIDER_ITEM': '<li{0} style="" data-index="{4}"><a{7}><img src="{8}" width="978" height="285" alt="{9}" /></a></li>',

		'SLIDER_HOLDER': ' href="{0}" target="_blank"  data-stat="{0}" ',

		'SLIDER_CURRENT': ' class="active"',

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
		'LsIVE': '<span class="" style ="display:block;">{0}</span>',
	};

	var newSlider = function() {
		function id(name) {return document.getElementById(name);}
		function each(arr, callback, thisp) {
			if (arr.forEach) {arr.forEach(callback, thisp);}
			else { for (var i = 0, len = arr.length; i < len; i++) callback.call(thisp, arr[i], i, arr);}
		}
		function fadeIn(elem) {
			setOpacity(elem, 0)
			for ( var i = 0; i < 20; i++) {
				(function() {
					var pos = i * 5;
					setTimeout(function() {
						setOpacity(elem, pos)
					}, i * 25);
				})(i);
			}
		}
		function fadeOut(elem) {
			for ( var i = 0; i <= 20; i++) {
				(function() {
					var pos = 100 - i * 5;
					setTimeout(function() {
						setOpacity(elem, pos)
					}, i * 25);
				})(i);
			}
		}
		function setOpacity(elem, level) {
			if (elem.filters) {
				elem.style.filter = "alpha(opacity=" + level + ")";
			} else {
				elem.style.opacity = level / 100;
			}
		}
		return {
			scroll : function(count,wrapId,ulId) {
				var self=this;
				var targetIdx=0;
				var curIndex=0;
				var that=this;
				var frag=document.createDocumentFragment();
				this.num=[];
				this.ii=1;
				for(var i=0;i<count;i++){
					(this.num[i]=frag.appendChild(document.createElement("li")));
				}
				id(ulId).appendChild(frag);
				this.img = id(wrapId).getElementsByTagName("a");
				this.num.length>1 ? this.num[0].className="on" : this.num[0].style.display='none';
				each(this.img,function(elem,idx,arr){
					if (idx!=0) setOpacity(elem,0);
				});
				each(this.num,function(elem,idx,arr){
					elem.onmouseover=function(){
						self.fade(idx,curIndex);
						curIndex=idx;
						targetIdx=idx;
					}
				});
				clearInterval(that.itv);
				that.itv=setInterval(function(){
					if(targetIdx<self.num.length-1){
						targetIdx++;
					}else{
						targetIdx=0;
					}
					self.fade(targetIdx,curIndex);
					curIndex=targetIdx;
				},5000);
				id(ulId).onmouseover=function(){ clearInterval(that.itv)};
				id(ulId).onmouseout=function(){
					that.itv=setInterval(function(){
						if(targetIdx<self.num.length-1){
							targetIdx++;
						}else{
							targetIdx=0;
						}
						self.fade(targetIdx,curIndex);
						curIndex=targetIdx;
					},5000);
				}
			},
			fade:function(idx,lastIdx){
				if(idx==lastIdx) return;
				var self=this;
				fadeOut(self.img[lastIdx]);
				fadeIn(self.img[idx]);
				each(self.num,function(elem,elemidx,arr){
					if (elemidx!=idx) {
						self.num[elemidx].className='';
					}else{
						id("pager").style.background="";
						self.num[elemidx].className='on';
					}
				});

				self.img[idx].parentNode.style.zIndex=this.ii++;
			}
		}
	}();

	var Carousel = {
		'init': function(option) {
			this.load(option);
			this.render();
			this.compose();
			this.bind();
			this.start();
		},

		'load': function(option) {
			$.extend(this, option);
			this.datasource = {};
			this.cell = 1080;
			this.pile = 0;
			this.stage = 1080;
			this.span = 8;
			this.interval = 5000;
			this.lock = false;
			this.show = this.show.bind(this);
			this.automate = this.automate.bind(this);
			this.initialized = true;
			

		},

		'render': function() {
			//this.container.append(TEMPLATE.MAIN)
		},

		'compose': function() {

		},

		'bind': function() {
			this.container.on('mouseenter', function() {
				clearTimeout(this.timeout);
				this.lock = true;
			}.bind(this));
			this.container.on('mouseleave', function() {
				this.lock = false;
				this.automate();
			}.bind(this));
			this.container.on('mouseenter', 'li', this.show);
		},

		'start': function() {
			this.fetch();
		},

		'fetch': function() {
			if (!this.initialized)
				return;
			clearTimeout(this.timeout);
			var data = this.datasource;
			if (data[0]) {
				this.enter(data);
				return;
			}
			Bussiness.getData('data/static/v4/?banner&requestType=1',function(data){
				console.log(data)
				if(data.code == 0){
					this.datasource = data.dataInfo.banner.d;
					this.enter(this.datasource);
				}
			}.bind(this),null,true);
		},

		'enter': function(data) {
			this.container.hide();
			if (!data || data.length == 0)
				return;
			var template = TEMPLATE.SLIDER_ITEM,
				language = I18N.language,
				holdT = TEMPLATE.SLIDER_HOLDER,
				domain = DOMAIN_CONFIG['IMAGE_DOMAIN'],
				x = 0,
				length = data.length,
				limit = length - 1,
				cell = this.cell,
				pile = this.pile,
				temp = Math.floor((this.stage - cell - pile * limit) / limit),
				span = temp < 8 ? temp : this.span,
				scalar = span + pile,
				stage = this.cell + limit * scalar,
				current = this.current = Math.floor(limit / 2),
				isCurrent = false,
				front, after;
			this.container.html($.map(data, function(item, index) {
				var html = stringFormat(template,(isCurrent = (index == current)) ? TEMPLATE['SLIDER_CURRENT'] : STRING_EMPTY,
					isCurrent ? length : index, x, isCurrent ? cell : pile,
					index, front, after,
					(temp=item['u']) ? stringFormat(holdT,temp) : STRING_EMPTY, domain + ((temp = item['lg'][language] && item['lg'][language]['p']) ? temp :item['p']), (temp = item['lg'][language] && item['lg'][language]['ti']) ? temp : item['ti']);
				x += span + (index == current ? cell : pile);
				return html;
			}).join(''));
			/*this.actors = this.container.find('[data-index]');*/
			this.container.show();
			/*this.automate();*/
			$('#pager').empty();
			newSlider.scroll(length,"topSlider","pager");
		},


		'show': function(event) {
		},

		'play': function(target) {
		},

		'automate': function() {
		}
	};   

	var Page = {
		'run': function() {
			this.load();
			this.render();
			this.renderInfo();
			this.compose();
			this.bind();
			this.start();
		},

		'load': function() {
			this.identify = this.identify.bind(this);
			this.sideLive = this.sideLive.bind(this);
			this.cache = {};
			
		},
		'render': function() {
			this.container = $('#container');
			this.container.i18nHTML(Header.html() +
			stringFormat(TEMPLATE.MAIN,
				TEMPLATE.SLIDER) + Footer.html()+_task.html());
			this.container.find('[data-role="ce_nav"]').i18nHTML(_nav.html());
			this.container.find('[data-role="task"]').i18nHTML(_task.html());
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
			Trigger.register(eventName, this.mineLive.bind(this));
			Trigger.register(eventName, this.sideLive.bind(this));
			Trigger.register(CONST.Event.UpdateIMG, Lazyload.render.bind(Lazyload));
			$(".language_nav").bind("click",function(){
				this.renderInfo();
			}.bind(this))

		},
		
		'renderInfo':function(){
			$("#content").html("");
//			调用roomtag接口

			var promise = new Promise(function(){
				Bussiness.getData('data/static/v4/?roomtag',function(data){
					if(data.code==0){
						this.roomtag = data['dataInfo']['roomtag']['d'];
						promise.resolve(this.roomtag);
					} 
				}.bind(this),null,true);
				
			}.bind(this)).then(function(roomtags){
                $.each(roomtags,function(index,value){
//							console.log(value);
                    if(value.isr==1&&value.id!=99){
                        if(value.id==106||value.id==112){
                            var faframe="<div class='all_host big' id="+value.id+"><div class='_hotTab_warp'><div class='hot_title' id='title"+index+"'>"+value.lg[I18N.language]+"</div><div class='hot_titles' id='tab"+index+"'></div><div class='hot_moer'><a class='"+value.id+"' href='/index_next.shtml?"+value.id+"'></a></div></div><div class='all_host_list'><ul class='hotList'></ul></div></div>";
                        }else{
                            var faframe="<div class='all_host' id="+value.id+"><div class='_hotTab_warp'><div class='hot_title' id='title"+index+"'>"+value.lg[I18N.language]+"</div><div class='hot_titles' id='tab"+index+"'></div><div class='hot_moer'><a class='"+value.id+"' href='/index_next.shtml?"+value.id+"'></a></div></div><div class='all_host_list'><ul class='hotList'></ul></div></div>";
                        }
                        $("#content").append(faframe);
                        if(value.lg[I18N.language]==undefined){
                            $("#title"+index).html(value.v);
                        }
//								渲染二级标签
                        if(value.sn.length!=0){
                            $.each(value.sn,function(indexs,values){
//									console.log(values)
                                var nextTab="<div class='next_tab' id='"+values.id+"'>"+values.lg[I18N.language]+"</div>";
                                $("#tab"+index).append(nextTab);
                            })
                            $("#tab"+index).prepend($("<div class='alltab next_tab next_tab_active' id='"+value.id+"'></div>"));
                        }
                    }
                })
                $(".hot_moer a").html(i18nTranslate('Index_More'));
                $(".alltab").html(i18nTranslate('Index_All'))
//				主播数据
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
                        this.renderHOT(this.roomtag,hosts)
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
                   	_this.flagIndex  = $(".next_tab_active").attr("id");
                })
            }.bind(this))
		},
		renderHOT:function(roomtags,data){
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
            $.each(roomtag,function (i,item) {
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
            })
			//判断二级签，放刷新；
            if(this.flagIndex){
              // $(".hotList ").hide();
                $(".hotList li") .filter("."+this.flagIndex).siblings("li").hide();
                $(".hotList li") .filter("."+this.flagIndex).show();
            };
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
            });
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
		refrech:function () {
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
                        this.renderHOT(this.roomtag,hosts)
                        promise.resolve();
                    }

                }.bind(this),null,true);
            }.bind(this))
        },
		"time":function(){
			setInterval(this.refrech.bind(Page),3*60*1000);
		},
		'start': function() {
			var promise = new Promise(function() {
				this.time();
				promise.resolve();	
			}.bind(this)).then(function() {
				this.identifyFlow();
				this.publicFlow();	
			}.bind(this))
		},

		localize: function() {
			Carousel.fetch();
			if (this.sign)
				this.sign.localize();

			if(top_util){
				top_util.reset_popup_message();
			}
		},


		'syncLive': function(container) {
			var anchor = this.cache['anchor'],
				temp, live;
			if (!anchor)
				return;
			container.find('[data-live]').each(function(index, element) {
				temp = anchor[(element = $(element)).data('live')];
				if (temp) {
					live = element.find('[data-role="live"]');
					if (temp['st'] == 1)
						live.show();
					else
						live.hide();
				}
			}.bind(this));
		},

		'mineLive': function() {
			//this.syncLive($('.my_host_slider'));
		},

		'sideLive': function() {
			this.syncLive($('.sidebar'));
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
			// 	Bussiness.postData('user_init_user_info.fly', {
			// 		'loginName': userName
			// 	}, function(data) {
			// 		console.log(data)
			// 		if (data && data.code == 0)
			// 			this.promise.resolve(this.identity = data);//todo: JSON.stringify(dta)
			// 		else
			// 			this.promise.resolve();
			// 	}.bind(this), function() {
					this.promise.resolve();
				//}.bind(this));
			//}
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
                    console.log(this.identity);
				Header.identified(this.identity);
				_nav.identified(this.identity,this.messages_length);
				_task.identified(this.identity)
				var sign = this.sign = require('component/sign');
				sign.start();
			}.bind(this))
			
			
		},
		'publicFlow': function() {
			var sidePromise = new Promise(
				function() {
					Carousel.init({
						'container': $('#topSlider')
					});
					return true;
				})
				.then(this.sideLive);
		}
		
	};
	I18N.init(null, true).localize(null, Page.run.bind(Page), true);
	fbq('track', 'ViewContent');
	
});
