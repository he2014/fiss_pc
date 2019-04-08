define(function(require, exports, module) {
	module.exports = (function(host, undefined) {
		var UNDEFINED = typeof undefined,
			STRING_EMPTY = '';
		var Utility = require(JS_UTILITY),
			OOP = Utility['OOP'],
			Cookie = Utility['Cookie'],
			Promise = Utility['Promise'],
			xss = Utility['String']['xssFilter'],
			stringFormat = Utility['String']['stringFormat'];
		var DATASOURCE = {};
		var OUTPUT = {
				'use': function(key) {
					var instance = runtime[key];
					if(!instance && this.hasOwnProperty(key))
						instance = runtime[key] = this[key]();
					return instance;
				}
			},
			runtime = {};

		function compose(key, factory) {
			if(factory.active) {
				runtime[key] = factory();
				return;
			}
			OUTPUT[key] = factory;
		}
		var Environment = (function() {
			return {
				'drawImage': function(src) {
					return DOMAIN_CONFIG['IMAGE_DOMAIN'] + src;
				}
			};
		})();
		var UserHelper = (function() {
			var defaultHead = 'systemRes/img/default/nophoto.jpg',
				fullDefaultHead = Environment.drawImage(defaultHead);
			fullDefaultHead = fullDefaultHead.replace('/', '\/');
			fullDefaultHead = 'onerror="this.src=\'' + fullDefaultHead + '\';"';
			var badgeTemplate = '<img src="{0}" title="{1}" />';
			return {
				'validate': function() {
					var identified = DATASOURCE['identity'];
					if(!identified) {
						login_util.show_login_div();
					}
					return identified;
				},
				'portrait': function(src) {
					return stringFormat('<img src="{0}" {1} />',
						Environment.drawImage(src || defaultHead),
						fullDefaultHead);
				},
				'level': function(entity) {
					return stringFormat(imageTemplate, Environment.drawImage(DATASOURCE['richLevel'][entity['richLevel'] || 1]['pic']));
				},
				'badge': function(entity) {
					var data;
					data = (data = entity.userAttr) && (data = data[CONST.UserAttr.Badge]);
					if(!data || data.length == 0) {
						return STRING_EMPTY;
					}
					var temp;
					return data.map(function(item, index) {
						temp = DATASOURCE['badge'][item];
						if(temp) {
							return stringFormat(badgeTemplate, Environment.drawImage(temp['p']), STRING_EMPTY);
						}
						return STRING_EMPTY;
					}).join(STRING_EMPTY);
				},
				'consume': function(entity, type) {
					switch(type) {
						case 'top7':
							return entity['rankCost'];
						case 'top1':
							return entity['roomCost'];
					}
					return 0;
				},
				'estimate': function(entity) {
					var AdminType = CONST.AdminType,
						UserAttr = CONST.UserAttr,
						value = 0,
						ratio = Math.pow(10, 14),
						temp = 0;
					switch(entity['adminType']) {
						case AdminType.Host:
							temp = 3;
							break;
						case AdminType.Constable:
							temp = 2;
							break;
					}
					if(entity['roomAdmin'])
						temp = 1;
					value += ratio * temp;
					ratio = Math.pow(10, 13);
					temp = (temp = entity['userAttr']) && temp[UserAttr.Member] || 0;
					value += ratio * temp;
					ratio = Math.pow(10, 10);
					temp = entity['richLevel'];
					value += ratio * temp;
					value += entity['roomCost'];
					return value;
				}
			}
		})();

		function Body() {
			var CONST = {

			};

			var TEMPLATE = {
				'HEADER': '<div class="header" id ="index_header">\
	                            <div class="header_fixed">\
	                                <div class="header_wrap clearfix">\
	                                    <ul class="menu_nav ">\
	                                    	<li class="nav_last readStart"><a id="top_self_living" class = "hidden" href="javascript::"  data-stat="Header_Host_Apply">\
	                                       		 </a></li>\
	                                    	 <li class="readStart dow_list">\
	                                    	 	<a class="btn_apk_dl" href="javascript::" data-i18n="Index_Download">{{Index_Download}}</a>\
	                                            <a class = "btn_ph" href="http://app.appsflyer.com/com.fission.sevennujoom?pid=7Nujoom&c=promotion=90004" target="_blank">Google Play</a>\
	                                            <a class = "btn_ph" href="http://app.appsflyer.com/id917213988?pid=7nujoom_app&c=promotion_900041" target="_blank">App store</a>\
	                                            <a class="btn_ph" href="https://www.7nujoom.com/resource/package/7NUJOOM.apk">Google APK</a>\
	                                        </li>\
	                                    </ul>\
	                                    <h1>\
	                                        <a href="/index.shtml"><img src="/resource/static/image/index/logo.png" alt="7nujoom" width="94" height="20" /></a>\
	                                    </h1>\
	                                </div>\
	                            </div>\
                            </div>',
				"nav": '<div class="user_info readStart"  id="index_user" >\
	                                <ul class="sign_nav readEnd"  data-role="anonymous" >\
	                                       <li class="home"> <a href="/" data-i18n="Header_Home" data-stat="Header_Home" target="_self">{{Header_Home}}</a></li>\
	                                       <li class ="Hotanchor"> <a href="/index_next.shtml?107" class="107"  data-i18n="Index_107" data-stat="Index_107">{{Index_107}}</a></li>\
	                                       <li class ="Hotanchor"> <a href="/index_next.shtml?106" class="106"  data-i18n="Index_106" data-stat="Index_106">{{Index_106}}</a></li>\
	                                       <li class ="Hotanchor"> <a href="/index_next.shtml?112" class="112"  data-i18n="Index_112" data-stat="Index_112">{{Index_112}}</a></li>\
	                                      <!-- <li> <a href="javascript:;"  data-stat="Game_anchor" >Game anchor</a></li>-->\
	                                      <!-- <li> <a href="javascript:;"  data-stat="Sport_anchor">Sport anchor</a></li>-->\
	                                       <li class="myFavorite"> <a href="/myFavorite.shtml"  data-i18n="My_Follow" data-stat="My_Follow">{{My_Follow}}</a></li>\
	                                       <li class="rank"> <a class="rank_more readEnd"  href="/rank.shtml" data-i18n="Ranking_list" data-stat="Ranking_list">{{Ranking_list}}</a>\</li>\
	                                       <li style="margin-bottom:35px;position:relative"><span class ="span"></span> <a class="language_nav" href="javascript:;" data-role="i18n" data-i18n="Header_Language" data-stat="Header_Language">{{Header_Language}}</a></li>\
	                                        <li class="readEnd btn_sign" data-role="user">\
	                                       </li>\
	                                        <a style ="display:none;"   href="javascript:;" data-role="signup" data-i18n="" data-stat="Header_SIGNUP">Sign up</a>\
	                                </ul>\
	                            </div>',

				"no_user": ' <div class = "user_png"></div>\
	                        <a class="sigin_in" href="javascript:;" data-role="signup" data-i18n="Header_SIGNIN" data-stat="Header_SIGNIN">{{Header_SIGNIN}}</a>',

				'FOOTER': '<div id="footer" class="footer clearfix">\
                            <div class="footer_wrap">\
                                <div class="footer_box">\
                                	<div class = "footer_right">\
                                    <ul class="footer_nav clearfix">\
                                        <li><a href="/support/agreement" target="_blank" data-i18n="Footer_UserAgreement" data-stat="Footer_UserAgreement">{{Footer_UserAgreement}}</a></li>\
                                        <li><a href="/contact.shtml" target="_blank" data-i18n="Footer_ContactUs" data-stat="Footer_ContactUs">{{Footer_ContactUs}}</a></li>\
                                        <li><a href="/feedback.shtml" target="_blank" data-i18n="Footer_FeedBack" data-stat="Footer_FeedBack">{{Footer_FeedBack}}</a></li>\
                                        <li><a href="/help.shtml" target="_blank" data-i18n="Footer_FAQ" data-stat="Footer_FAQ">{{Footer_FAQ}}</a></li>\
                                    </ul>\
                                    <address>COPYRIGHT &copy; 2016 Fission Technology Co. Limited</address>\
                                    </div>\
                                    <div class="footer_bottom">\
                                    	<a class="footer_don" href="javascript::"   ></a>\
                                        <p class="footer_social">\
                                            <!--<span data-i18n="Footer_GetSocial">{{Footer_GetSocial}}</span>-->\
                                            <a href="https://plus.google.com/+7nujoom" target="_blank" data-stat="footer_twitter"><img src="/resource/static/image/newIndex/fenxiang2.png" alt=""></a>\
                                            <a href="https://twitter.com/7nujoom" target="_blank" data-stat="footer_facebook"><img src="/resource/static/image/newIndex/fengxiang1.png" alt=""></a>\
                                            <a href="https://www.facebook.com/7nujoom" target="_blank" data-stat="footer_google"><img src="/resource/static/image/newIndex/fenxiang.png" alt=""></a>\
                                        </p>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                        <div class="sysmesg_box clearfix" style="display: none">\
                            <div class="sysmesg_box_txt">\
                                <img src="/resource/systemRes/imgNew/hall_img/sysmesg_box_cls_03.png" width="11.5" height="11.5" class="sysmesg_box_cls">\
                                <p class="sysmesg_box_nomtxt">Recharge during Eid 100$ Can participate in the IPhone6 Recharge during Eid 100$ Can participate in the IPhone6 Recharge during...</p>\
                                <a href="#" class="sysmesg_box_hrf" style="display:none" target="_blank" data-i18n="Index_Learn_More">{{Index_Learn_More}}</a>\
                                <div class="sysmesg_triangle"></div>\
                            </div>\
                            <div class="sysmesg_box_img"></div>\
                        </div>',

				'USER': '<div class="user_detail" data-role="user_detail">\
                            <div class="detail_top clearfix">\
                                <div class="detail_top_left">\
                                	<a class="moer_message" href="/myinfo.shtml" target="_blank"></a>\
                                    <a  style="width:41px;height: 41px;position: relative;margin: 0 auto;display: block;" data-stat="user_img_profile" href="/myinfo.shtml" target="_blank">\
                                        <img id="top_user_head" src="{0}" alt="{1}"/>\
                                        {2}\
                                    </a>\
                                </div>\
                            </div>\
                            <div class="detail_main">\
                            <a class="detail_top_name" href="/myinfo.shtml" target="_blank">{1}</a>\
                            <p class="badge hidden" id="badge"></p>\
                            	<p class="btn_group clearfix">\
                                    <a id="sign" href="javascript:;" class="btn_daily  ">\
                                    	<span ><img src="/resource/static/image/newIndex/qiandao.png"/></span>\
                                    	<strong class=""></strong>\
                                    	<i class ="Users_Signs" data-i18n="Room_Show_Daily" data-stat="Users_Signs">{{Room_Show_Daily}}</i>\
                                    </a>\
                                     <a id="task_button" href="javascript:;" class="btn_task task_tip nav_quest" data-collector="task">\
                                     	<em class="hidden"></em>\
                                     	<span ><img src="/resource/static/image/newIndex/task.png"/></span>\
                                     	<i class ="Users_Task" data-i18n="Room_Show_Quest" data-stat="Room_Show_Quest">{{Room_Show_Quest}}</i>\
                                     </a>\
                                    <a class="btn_message evlp_btn_block  " target="_blank" href="/mymessage.shtml" data-stat="Header_message">\
                                        <span ><img src="/resource/static/image/newIndex/msg.png"/></span>\
                                            {7}\
                                            <i class ="Users_Message" data-i18n="Room_Show_Message" data-stat="Room_Show_Message">{{Room_Show_Message}}</i>\
                                    </a>\
                                </p>\
                                <p class="detail_recharge clearfix">\
                                    <span class="detail_blance readStart" name="user_balance">0</span>\
                                    <a class="btn_detail_recharge readEnd" href="/myrecharge.shtml" target="_blank" data-i18n="Room_Recharge" data-stat="Room_Recharge">{{Room_Recharge}}</a>\
                                </p>\
                                <!--<p class="detail_exp clearfix"><span id="userCenter_exp_persent"><i class="readStart" name="level_persent"></i></span></p>-->\
                                <!--<a id="top_self_living" style="{5}" class="btn_live clearfix" href="javascript:;" data-stat="Header_StartLive" data-i18n="Host_Live_Now">{{Host_Live_Now}}</a>-->\
                                <a class="btn_exit readEnd" ><span name="login_out_buttom" data-i18n="Header_LogOut" data-stat="Header_LogOut">{{Header_LogOut}}</span></a>\
                            </div>\
                            <div class = "login_out_popout hidden" data-role = "is_login_out">\
                            <div class= "login_out_pop "  >\
                            	<div class ="login_title" data-i18n="Store_Notice">{{Store_Notice}}</div>\
                            	<div class = "Quit_to_Login" data-i18n ="Quit_to_Login">{{Quit_to_Login}}</div>\
                            	<div>\
                            		<div class="londin_out_renew" data-i18n="Store_OK">{{Store_OK}}</div>\
                            		<div class= "londin_out_cancel" data-i18n="Store_Cancel">{{Store_Cancel}}</div>\
                            	</div>\
                            </div>\
                            </div>\
                        </div>',
				'TASK': '<div class="task_list hidden" id="task_detail_info" data-collector="task">\
                    <div class="task_list_con">\
                    <div class="task_list_ul">\
                        <div class="task_list_scroll" id="task_list_scroll">\
                            <ul id="user_task_list"></ul>\
                        </div>\
                        <div class="list_btm_mask"></div>\
                    </div>\
                </div>\
            </div>\
            <div class="task_list host hidden" data-role="task_list_host" data-collector="task">\
                <div class="task_list_con">\
                    <div class="task_user_info" data-role="task_user_info"></div>\
                    <span class="task_host_hr" data-i18n="Task_MyTask">{{Task_MyTask}}</span>\
                    <div class="host_task_con" style="height:410px;">\
                        <div data-role="host_flower" class="host_flower hidden">\
                            <p class="host_explain"></p>\
                            <div class="cont">\
                                <ul data-role="rewards_list"></ul>\
                                <div class="pg_bar">\
                                    <span class="level0"><i></i></span>\
                                    <span class="level1"><i></i></span>\
                                    <span class="level2"><i></i></span>\
                                    <span class="level3"><i></i></span>\
                                    <span class="level4"><i></i></span>\
                                    <span class="level5"><i></i></span>\
                                    <span class="level6"><i></i></span>\
                                </div>\
                            </div>\
                            <a class="host_arrow"></a>\
                            <div data-i18n="Task_HostFlowerMore" class="host_more hidden">{{Task_HostFlowerMore}}</div>\
                        </div>\
                        <div data-role="host_focus" class="host_focus">\
                            <p class="host_explain"></p>\
                            <div class="cont">\
                                <ul data-role="rewards_list"></ul>\
                                <div class="pg_bar">\
                                    <span class="level0"><i></i></span>\
                                    <span class="level1"><i></i></span>\
                                    <span class="level2"><i></i></span>\
                                    <span class="level3"><i></i></span>\
                                    <span class="level4"><i></i></span>\
                                    <span class="level5"><i></i></span>\
                                    <span class="level6"><i></i></span>\
                                </div>\
                            </div>\
                            <a class="host_arrow"></a>\
                            <div class="host_more hidden" data-i18n="Task_HostFocusMore">{{Task_HostFocusMore}}</div>\
                        </div>\
                        <div data-role="host_popular" class="host_popular hidden">\
                            <p class="host_explain"></p>\
                            <div class="cont">\
                                <ul data-role="rewards_list"></ul>\
                                <div class="pg_bar">\
                                    <span class="level0"><i></i></span>\
                                    <span class="level1"><i></i></span>\
                                    <span class="level2"><i></i></span>\
                                    <span class="level3"><i></i></span>\
                                    <span class="level4"><i></i></span>\
                                </div>\
                            </div>\
                            <a class="host_arrow"></a>\
                            <div data-i18n="Task_HostPopularMore" class="host_more hidden">{{Task_HostPopularMore}}</div>\
                        </div>\
                    </div>\
                    <p class="host_task_common" data-i18n="Task_HostCommonDesc">{{Task_HostCommonDesc}}</p>\
                </div>\
            </div>'
			};

			return {
				'nav': {
					'init': function(option) {
						this.load(option);
						this.render();
						this.compose();
						this.bind();
						this.start();
						this.BADGE = null;
					},

					'load': function(option) {
						$.extend(this, option);
					},

					'render': function() {
						this.container = $('#container');
						this.anonymous = this.container.find('[data-role="anonymous"]');
						this.user = this.container.find('[data-role="user"]');
						// this.headerVideo = this.container.find('[data-role="headerVideo"]');

					},

					'compose': function() {

					},

					'bind': function() {
						$('[data-role="signin"]', this.container).unbind("click").click(function() {
							login_util.show_login_div();
						});
						$('[data-role="signup"]', this.container).unbind("click").click(function() {
							login_util.show_register_div();
						});

						$('[data-role="i18n"]', this.container).unbind("click").click(function() {
							var I18N = require(useJSComponent('kit')).use('I18N');
							I18N.localize(I18N.reverse());
						});

						$('[data-role="facebook_login"]', this.container).unbind("click").click(function() {
							login_util.facebook_login();
						});
						$('[data-role="twitter_login"]', this.container).unbind("click").click(function() {
							login_util.twitter_login();
						});
						$('[data-role="google_login"]', this.container).unbind("click").click(function() {
							login_util.google_login_back();
						});

						//$("[name='login_out_buttom']").unbind("click").click(function(){user_util.user_out('login_util','user_out');});
					},

					'start': function() {

					},

					'html': function() {
						return TEMPLATE['nav']
						//return window.location.pathname.toLowerCase().indexOf('/index') == 0 ? TEMPLATE['HEADER'] : TEMPLATE['HEADER1'];
					},
					'getBadges': function(promise) {
						if(this.BADGE) {
							promise.resolve(this.BADGE);
							return;
						}
						Bussiness().getData('data/static/v4/?badge', function(data) {
							if(data.code == 0) {
								this.BADGE = data['dataInfo']['badge']['d'];
                                console.log(this.BADGE);
								promise.resolve(this.BADGE);
							}
						}.bind(this), null, true);
					},

					'genBadge': function(badges,entity) {
						var data;
						if(entity.badges&&entity.badges.length>0) {
                            data = entity.badges;
                        }
						if(!data || data.length == 0) {
							return '';
						}
						var temp, index;
						return data.map(function(item, index) {
								temp = badges[item.id];
								index = item.id;
							if(temp) {
								return stringFormat('<img src="{0}" title="{1}" data-id="{2}"/>', DOMAIN_CONFIG['IMAGE_DOMAIN'] + temp['p'], '', index);
							}
							return '';
						}).join('');
					},

					'badge': function(identity) {
						var promise = new Promise(function() {
							this.getBadges(promise);
						}.bind(this)).then(function(badge) {
                                Bussiness().getData("service/user/v3/property?badge", function (msg) {
                                    if (msg.code == 0) {
                                        this.badgeData = msg.dataInfo;
                                        promise.resolve(badge);
                                    }
                                }.bind(this), null, true);
                            }.bind(this))
                            .then(function(badge) {
							if(badge && badge != undefined) {
								var tpl = '<h2>{0}</h2><span>{1}</span>';
								$('#badge').html(this.genBadge(badge,this.badgeData)).append('<div class="badgeNotic hidden"></div>').removeClass("hidden");
								$('#badge').find('img').unbind('mouseenter').mouseenter(function() {
									var index = $(this).index(),
										id = $(this).data('id'),
										lang = Cookie.get(Cookie.key['locale']),
										temp = badge[id]['lg'][lang];
									timer = setTimeout(function() {
										$('.badgeNotic').html(stringFormat(tpl, temp['n'], temp["t"])).addClass('nav_badge_' + index).removeClass('hidden');
									}, 1000)
								}).mouseleave(function() {
									var index = $(this).index();
									$('.badgeNotic').removeClass('nav_badge_' + index).addClass('hidden');
									clearTimeout(timer);
								});
							}
						}.bind(this));
					},

					'identified': function(identity, msg) {
						//                  	console.log(identity)
						this.messages_length = msg;
						this.identity = identity;
						var sign = this.sign = require('component/sign');
						sign.start();
						if(this.identity) {
							if(!identity['headPic'])
								identity['headPic'] = 'systemRes/img/default/nophoto.jpg';
							var headerpic = DOMAIN_CONFIG['IMAGE_DOMAIN'] + identity['headPic'];
							if(window.location.pathname.indexOf("live") > -1) {
								identity['userHeadPic'] ? headerpic = DOMAIN_CONFIG['IMAGE_DOMAIN'] + identity['userHeadPic'] : DOMAIN_CONFIG['IMAGE_DOMAIN'] + identity['headPic'];
							}
							var vipIcon = identity['userAttr'][3] > 0 ? (identity['userAttr'][3] > 1 ? '<span class="svip_flag" style="display: block;position: absolute;top: 0;left: 0;"></span>' : '<span class="vip_flag" style="display: block;position: absolute;top: 0;left: 0;"></span>') : '';
							var messageIcon = this.messages_length > 0 ? (this.messages_length >= 99 ? '<strong class="red_dots" >' + this.messages_length + '+</strong>' : '<strong class="red_dots" >' + this.messages_length + '</strong>') : '';
							this.user.i18nHTML(
								stringFormat(TEMPLATE.USER, headerpic, xss(identity['nickName'] != undefined ? identity['nickName'] : identity['userNickName']),
									vipIcon, identity.userId, '', identity['userBalance'] + identity['userReturnBalance'], identity.host ? '' : 'display:none;', messageIcon));

							var detail = this.user.find('[data-role="user_detail"]'),
								user_detail_badge = this.user.find('[data-role="user_detail_badge"]');
							top_util.init_top(identity);
							this.badge();
							$("[name='login_out_buttom']").unbind("click").click(function() {

								$('[data-role = "is_login_out"]').removeClass("hidden");

							});
							$("div.londin_out_renew").unbind("click").click(function() {
								user_util.user_out('login_util', 'user_out');
							});

							$("div.londin_out_cancel").unbind("click").click(function() {

								$('[data-role = "is_login_out"]').addClass("hidden");

							});

						} else {
							this.user.i18nHTML(TEMPLATE.no_user);
							$('[data-role="signup"]', this.container).unbind("click").click(function() {
								login_util.show_register_div();
							});
						}
					}
				},
				'Header': {
					'init': function(option) {
						this.load(option);
						this.render();
						this.compose();
						this.bind();
						this.start();
					},

					'load': function(option) {
						$.extend(this, option);
					},

					'render': function() {

					},

					'compose': function() {

					},

					'bind': function() {

					},

					'start': function() {

						$(".dow_list a").eq(0).on("mouseenter", function() {
							$(".btn_ph").css("display", 'block');
							$(".dow_list").css("height", "130px");

						})
						$(".dow_list").on("mouseleave", function() {
							$(".btn_ph").css("display", 'none');
							$(".dow_list").css("height", "60px");
						})
					},

					'html': function() {
						return TEMPLATE.HEADER;
					},
					'identified': function(identity) {

					}
				},
				'TASKS': {
					'init': function(option) {
						this.load(option);
						this.render();
						this.compose();
						this.bind();
						this.start();
					},

					'load': function(option) {
						$.extend(this, option);
					},

					'render': function() {

					},

					'compose': function() {

					},

					'bind': function() {

					},

					'start': function() {

					},

					'html': function() {
						return TEMPLATE.TASK;
					},
					"identified": function(identity) {
						identity = identity;
						if(identity) {

							(identity['userType'] == 1 && identity['actorflg'] == 1) || identity['host'] ? this.initHostTask(identity) : this.initTask(identity);
						}

					},
					'initTask': function(identity) {
						var _this = this;
						DATASOURCE['identity'] = identity;
						this.task_map = {};
						this.task_tan = $("#task_tan");
						this.task_button = $("#task_button").removeClass('hidden');
						this.task_content = $(".task_content");
						this.task_detail_info = $("#task_detail_info");
						this.user_task_list = $("#user_task_list");
						this.task_num = $("#task_num");
						this.red = this.task_button.find("em");
						ClickCollect().register('task', $('#task_detail_info'));
						var promise = new Promise(function() {

							promise.resolve();
						}).then(function() {
							//用户等级
							Bussiness().getData('data/static/v4/?userlevel', function(data) {
								if(data.code == 0) {
									DATASOURCE['richLevel'] = data.dataInfo.userlevel.d;;
									promise.resolve();
								};
							}.bind(this), null, true)
						}).then(function() {
							//主播等级
							Bussiness().getData('data/static/v4/?hostlevel', function(data) {
								if(data.code == 0) {
									DATASOURCE['hostLevel'] = data.dataInfo.hostlevel.d;
									promise.resolve();
								}
							}.bind(this), null, true);
						}).then(function() {
							Bussiness().getData('data/static/v4/?taskuser', function(data) {
								if(data.code == 0) {
									var taskUser = data.dataInfo.taskuser.d;
                                    var TASKS = {};
                                    taskUser.forEach(function(item,i){
                                        TASKS[item.id] =item;
                                    })
									DATASOURCE['sys_task'] = TASKS;
									promise.resolve();
								}
							}.bind(this), null, true)

						}.bind(this))
                            .then(function() {
							var task = DATASOURCE['sys_task'],
								temp;
							for(var t in task) {
								task[t]['en'] = task[t]['lg']['en'] ? task[t]['lg']['en'] : "";
								task[t]['ar'] = task[t]['lg']['ar'] ? task[t]['lg']['ar'] : "";
							}
							_this.init_user_task_detail(false);
						}.bind(this));
						this.task_button.on("click", function() {
							var is_show = $("#task_detail_info").css("display") == "block";
							$("#task_tan").removeClass("hidden");
							$("#task_detail_info").removeClass("hidden");
							if(!is_show) {
								_this.init_user_task_detail(true);

							}
						});
						this.task_tan.on("click", function() {
							$("#task_tan").addClass("hidden")
							$("#task_detail_info").addClass("hidden");
						});
						this.user = function() {
								var user = Cookie.get(Cookie.key['user_info']);
								if(user)
									return JSON.parse(user);
							},
							this.init_task_map = function() {
								_this.task_map = {};
								var task_list = DATASOURCE['task'] ? DATASOURCE['task']['taskList'] : null;
								if(task_list && task_list.length > 0) {
									$.each(task_list, function(idx, obj) {
										_this.task_map[obj.id] = obj;
									});
								}
							},
							this.init_user_task_detail = function(bool) {
								var identified = DATASOURCE['identity'];
								if(DATASOURCE['sys_task']) {
									$.ajax({
										type: "GET",
										url: system_info.base_attr.domain+"service/user/v3/task?requestType=1",
										cache: false,
										dataType: "json",
										success: function(obj) {
											if(obj.code == 0) {
												if(!DATASOURCE['task']) {
													DATASOURCE['task'] = {};
												}
												DATASOURCE['task']['taskList'] = obj.dataInfo;
												_this.init_task_map();
												_this.show_task(bool);
											}
											obj = null;
										},
										complete: function(XHR, TS) {
											XHR = null;
										}
									});
									//}
								}
							};
						this.show_task = function(is_show) {
							var bool = is_show ? true : false;
							/*3月15号修改*/
							if(bool) {
								_this.show_task_user_info();
							}
							var finish_num = 0,
								task_num = 0;
							var bool = false;
							var language = Cookie.get(Cookie.key['locale']);
							var timer = setInterval(function() {
								language = Cookie.get(Cookie.key['locale']);
							});
							//console.log(I18N().language);
							//var language =getlocale();
							if(_this.task_map) {
								var task_finish_html_str_temp = '',
									task_unfinish_html_str_temp = '';

								$.each(_this.task_map, function(key, obj) {
									if(obj) {
										var task_obj = DATASOURCE['sys_task'][obj.id];
										if(task_obj) {
											var task_html_str_temp = '';
											task_num++;
                                            //finishType
											var task_finish_num = parseInt((task_obj.fn + task_obj.fo) / (task_obj.finishType == 2 ? (1000 * 60) : 1));
											var task_schedule = obj.st != 0 ? task_finish_num : parseInt((obj.sd + task_obj.fo) / (task_obj.finishType == 2 ? (1000 * 60) : 1));
											var task_li_class = (obj.st == 0 ? "" : obj.st == 1 ? "task_f1" : "task_f2");
											task_html_str_temp += '<li id="task_' + obj.id + '" class="' + task_li_class + '">';
											task_html_str_temp += '<dl>';
											task_html_str_temp += (obj.st == 0 && obj.id == 1 ? '<a href="/myinfo.shtml" target="_blank">' : '') + '<dt><img src="' + DOMAIN_CONFIG['IMAGE_DOMAIN'] + task_obj.ufp + '" alt="" tag_id="10057"></dt>' + (obj.st == 0 && obj.id == 1 ? '</a>' : '');
											task_html_str_temp += '<dd>';
											var task_name = task_obj["lg"][language] ? task_obj['lg'][language] : task_obj.n;
											task_html_str_temp += '<b>' + task_name + '</b>';
											// task_html_str_temp += '<strong data-i18n="Task_Rewards">{{Task_Rewards}}</strong><strong>:</strong>';
                                            //                              if (task_obj.taskAwards && task_obj.taskAwards.length > 0) {
                                            //                                  $.each(task_obj.taskAwards, function (taidx, taskAward) {
                                            //                                      if (taskAward) {
                                            //                                          //task_html_str_temp += '<img ' + (obj.state != 2 ? 'class="wordCol_01"' : '') + ' src="' + DOMAIN_CONFIG['IMAGE_DOMAIN'] + taskAward.imageUrl + '" alt=""><strong ' + (obj.state != 2 ? 'class="wordCol_01"' : '') + '>+</strong><strong ' + (obj.state != 2 ? 'class="wordCol_01"' : '') + '>' + taskAward.awardAmount + '</strong>';
                                            //                                      }
                                            //                                  });
                                            //                              }
											task_html_str_temp += '</dd>';
											var task_state_html_str = '';
											if(obj.st != 0) {
												task_state_html_str = '<p tag_id="10058" ' + (obj.st == 1 ? ' onclick="window[\'submit_user_task\'](' + obj.id + ');"' : '') + (obj.st == 2 ? '' : ' data-i18n="Task_GetRewards"') + '>' + (obj.st == 2 ? '' : '{{Task_GetRewards}}') + '</p>';
											} else {
												task_state_html_str = '<p tag_id="10058" ><i>' + task_schedule + '</i>/<i>' + task_finish_num + '</i></p>';
											}
											task_html_str_temp += task_state_html_str;
											task_html_str_temp += '</dl>';
											task_html_str_temp += '</li>';
											if(obj.st != 0) {
												if(obj.st == 1) {
													bool = true;
													task_finish_html_str_temp = task_finish_html_str_temp + task_html_str_temp;
												} else {
													task_unfinish_html_str_temp = task_unfinish_html_str_temp + task_html_str_temp;
												}
												finish_num++;
											} else {
												task_unfinish_html_str_temp = task_html_str_temp + task_unfinish_html_str_temp;
											}
										}
									}
								});
								var task_html_str = task_finish_html_str_temp + task_unfinish_html_str_temp;
								_this.user_task_list.i18nHTML(task_html_str);
								if(bool == true) {
									_this.red.removeClass("hidden");
								} else {
									_this.red.addClass("hidden");
								}
								if($(".task_f2")) {
									var finish_task = $(".task_f2");
									_this.user_task_list.not(finish_task).prependTo("#user_task_list");
								}
								if($(".task_f1")) {
									var receive_task = $(".task_f1");
									_this.user_task_list.not(receive_task).appendTo("#user_task_list");
								}
								var txt_num = finish_num >= task_num ? task_num : finish_num;
								_this.task_num.i18nHTML('<i class="task_over">' + txt_num + '</i>/<i class="task_all">' + task_num + '</i>');
							}

						};
						this.show_task_user_info = function() {
							var identity = DATASOURCE['identity'];
							var user = _this.user();
							if(identity && user) {
								$("#task_nick_name").text(user['nickName']);
								var user_photo = user['headPic'];
								if(user_photo == '') {
									user_photo = 'systemRes/img/default/nophoto.jpg'
								} else {
									user_photo = user['headPic'];
								}
								$('#task_user_head').attr('src', DOMAIN_CONFIG['IMAGE_DOMAIN'] + user_photo);
								var leval = 0,
									level_score = 0,
									level_obj = null,
									next_level_obj = null;
								if(!identity['host']) {
									leval = user['richLevel'];
									level_score = user['richScore'];
									level_obj = DATASOURCE['richLevel'][leval];
									next_level_obj = DATASOURCE['richLevel'][leval + 1];

								} else {
									leval = user['hostInfo']['hostLevel'];
									level_score = user['hostInfo']['hostScore'];
									level_obj = DATASOURCE['hostLevel'][leval];
									next_level_obj = DATASOURCE['hostLevel'][leval + 1];
								}
								$("#task_user_level").text(leval);
								var exp = '100';
								if(level_obj) {
									if(next_level_obj) {
										exp = (((level_score - level_obj.s) / (next_level_obj.s - level_obj.s)) * 100).toFixed(0);
									}
									$("#task_user_level_img").attr("src", DOMAIN_CONFIG['IMAGE_DOMAIN'] + level_obj.p);
								}
								exp = exp > 100 ? 100 : exp < 0 ? 0 : exp;
								$("#task_user_level_persent").css({
									width: (exp < 15 ? (exp < 1 ? 0 : 15) : exp) + '%'
								});
								if(exp < 1) {
									$("#task_user_level_persent font").attr('color', '#868181');
								} else {
									$("#task_user_level_persent font").removeAttr('color');
								}
								$("#task_user_level_persent font").text(exp + '%');
								var score = 0;
								if(next_level_obj) {
									score = next_level_obj.s - level_score;
								}
								$("#task_user_next_level").text(score > 0 ? score : (score < 0 ? 0 : score));
								$(".task_user_info dl .lev_hover a").text(score > 0 ? score : (score < 0 ? 0 : score));
								_this.task_detail_info.removeClass("hidden");
							}
						};
						this.update_user_task = function(task_id, task_state, task_schedule) {
							var task = _this.task_map[task_id];
							var is_show = $("#task_detail_info").css("display") == "block";
							if(task) {
								if(task.sd == parseInt(task_schedule) && task.st == task_state) {
									return;
								}
								if(task_state == 2) {
									$('#task_' + task_id + '.task_f1 dd img').css({
										'-webkit-animation': 'auto_scale 1.5s ease'
									});
									$('#task_' + task_id + '.task_f1 .wordCol_01').css({
										'-webkit-animation': 'auto_scale 1.5s ease'
									});
								}
								setTimeout(function() {
									task.sd = parseInt(task_schedule);
									task.st = task_state;
									var task_detail = DATASOURCE['sys_task'][task_id];
									if(task.st == 2) {
										_this.reset_user_task(is_show);
									} else if(task.st == 1) {
										if(is_show) {
											_this.show_task();
										} else {
											_this.reset_user_task(is_show);
											_this.show_task();
										}
									} else {
										if(is_show) {
											_this.reset_user_task(is_show);
											_this.show_task();
										}
									}
								}, task_state == 2 ? 500 : 0);
							} else {
								if(task_data[task_id]) {
									_this.reset_user_task(is_show);
								}
							}
						};
						// 更新主播等级信息
						this.update_host_exp_info = function(level, exp) {
							var identity = DATASOURCE['identity'];
							if(identity) {
								user_util.update_host_exp(exp, level);
								var is_show = $("#task_detail_info").css("display");
								if(is_show == "block") {
									_this.show_task_user_info();

								}
							}
						};
						// 更新自己的用户等级信�????????
						this.update_user_exp_info = function(level, exp) {
							var identity = DATASOURCE['identity'];
							var user = _this.user();
							if(user && level > user.richLevel) {
								setTimeout(function() {
									top_util.init_upgrade_level(level, DATASOURCE);
								}, 10);
							}
							user_util.update_user_exp(exp, level);
							var is_show = $("#task_detail_info").css("display");
							if(is_show == "block") {
								_this.show_task_user_info();
							}
						};
						this.reset_user_task = function(bool) {
							_this.init_user_task_detail(bool);
						};
						this.update_host_level = function(obj) {
							var identity = DATASOURCE['identity'];
							if(identity && !identity['host'] && identity.userId == obj.userId && obj.userType == 0) {
								_this.update_host_exp_info(obj.selfHostLevel, obj.selfHostScore);
							}
						};
						this.submit_user_task = function(task_id) {
							$.ajax({
								type: "post",
								url: system_info.base_attr.domain + "service/user/v3/task/"+task_id,
								cache: false,
								dataType: "json",
								data: {
									taskId: task_id
								},
								success: function(obj) {
									if(obj.code == 0) {
										DATASOURCE['task'] = null;
										if(obj.dataInfo) {
											if(obj.dataInfo.ul > 0 && obj.dataInfo.exp > 0) {

												if(obj.dataInfo.ut == 1) {

													_this.update_host_exp_info(obj.dataInfo.ul, obj.dataInfo.exp);
												} else {
													_this.update_user_exp_info(obj.dataInfo.ul, obj.dataInfo.exp);
												}
											}
										}
										var task = DATASOURCE['sys_task'][task_id];
										if(task) {

											//                              if (task.haveNextTask) {
											//                                  _this.reset_user_task(true);
											//                              } else {
											_this.update_user_task(task_id, 2, task.fn + task.fo);
											// }
										} else {
											_this.reset_user_task(true);
										}
									}
								},
								error: function(XMLHttpRequest, textStatus, errorThrown) {
									//alert("error");
								}
							});
						};
						window['submit_user_task'] = this.submit_user_task;

						//          Trigger().register('SocketTask', function (data) {
						//              var identity = DATASOURCE['identity'];
						//              if (identity && data.userId == identity.userId && data.userType == 0) {
						//                  _this.update_user_task(data.taskId, data.state, data.schedule);
						//              }
						//          });
						//          Trigger().register('SocketHostLevel', function (data) {
						//              _this.update_host_level(data);
						//          });
					},
					'initHostTask': function() {
						$("#task_button em").addClass('hidden');
						$('.Users_Task').addClass('hidden');
						$("#task_button").css({
							"opacity": " 0.1"
						});
						return;
						var _this = this;
						var itemTpl = ' <li>\
                    <a class="btn {0}" {1} href="javascript:;">{2}</a>\
                    <p class="{5}">{3}+</p>\
                    <p class="host_target"><em>{4}</em></p>\
                </li>',
							hostHeadTpl = '<dl>\
                    <dt>\
                        {0}\
                    </dt>\
                    <dd>\
                        <b>{2}</b><a href="/act/level" target="_blank"><img name="level_img" src="{1}" alt="" /></a><span><i name="level_persent" style="width: 0%;"><font size="0">0.00%</font></i></span>\
                    </dd>\
                    <p>\
                        <b data-i18n="Task_Level">{{Task_Level}}</b><b>&nbsp;:&nbsp;</b><b>{3}</b> <br>\
                        <em data-i18n="Task_ToNextLevel">{{Task_ToNextLevel}}</em><em>&nbsp;:&nbsp;</em><em name="next_level_score">{4}</em><img src="' + DOMAIN_CONFIG['IMAGE_DOMAIN'] + 'systemRes/imgNew/toplist/exp_icon.png" alt="">\
                    </p>\
                </dl>',
							Task_HostGotRewards = i18nTranslate('Task_HostGotRewards'),
							Task_HostGetRewards = i18nTranslate('Task_HostGetRewards'),
							$hostContainer = $('.task_list.host'),
							taskNumDOM = $('#task_num'),
							scrollDOM = $hostContainer.find('.host_task_con')[0],
							hostflowerDOM = $hostContainer.find('[data-role="host_flower"]'),
							focusDOM = $hostContainer.find('[data-role="host_focus"]'),
							popularDOM = $hostContainer.find('[data-role="host_popular"]');
						this.desc = {};
						this.lockFlag = {};
						this.hasReward = false;
						this.task_button = $('#task_button');
						this.redDot = this.task_button.find('em');
						this.task_button.on("click", function() {
							//if(!UserHelper.validate())
							//	return;
							if($hostContainer.is(':visible')) {
								$hostContainer.addClass('hidden');
							} else {
								show_task_host_info();
								this.init_host_task();
								$hostContainer.removeClass('hidden');
								//UIHelper.refreshScroller(scrollDOM);
							}
						}.bind(_this));
						taskNumDOM.hide();
						//UIHelper.initScroller(scrollDOM);
						ClickCollect().register('task', $hostContainer);
						this.renderHostTask = function() {
							if(!this.host_task_all) return;
							//UIHelper.refreshScroller(scrollDOM);
							$.each(this.host_task_all, function(i, item) {
								switch(item['typename']) {
									case 'flower':
										this.desc[0] = [i18nTranslate('Task_HostFlowerUnfinishedDesc'), i18nTranslate('Task_HostFlowerFinishedDesc')];
										this.renderItemReward(item['task'], 0, hostflowerDOM, i18nTranslate('Task_HostFlowerUnit'), true);
										return;
									case 'attention':
										this.desc[1] = [i18nTranslate('Task_HostFocusUnfinishedDesc'), i18nTranslate('Task_HostFocusFinishedDesc')];
										this.renderItemReward(item['task'], 1, focusDOM, i18nTranslate('Task_HostFocusUnit'), true);
										return;
									case 'popularity':
										this.desc[2] = [i18nTranslate('Task_HostPopularUnfinishedDesc'), i18nTranslate('Task_HostPopularFinishedDesc')];
										this.renderItemReward(item['task'], 2, popularDOM, i18nTranslate('Task_HostPopularUnit'), false);
										return;
								}
							}.bind(this));
							this.bindHostTask();
						};
						this.bindHostTask = function() {
							$hostContainer.unbind('click').click(function(evt) {
								var $tar = $(evt.target),
									taskId = $tar.data('task');
								if(typeof(taskId) !== 'undefined') {
									if(this.lockFlag[taskId]) return;
									this.lockFlag[taskId] = true;
									Bussiness.postData('user_submitUserTask.fly', {
										'taskId': taskId
									}, function(data) {
										if(data.code == 0) {
											$tar.html(i18nTranslate('Task_HostGotRewards'));
											$tar.removeClass('active');
											this.init_host_task();
											if(data.dataInfo) {
												if(data.dataInfo.level > 0 && data.dataInfo.exp > 0) {
													if(data.dataInfo.userType == 1) {
														this.update_host_exp_info(data.dataInfo.level, data.dataInfo.exp);
													}
												}
											}
										}
										this.lockFlag[taskId] = false;
									}.bind(this));
								} else if($tar.hasClass('host_arrow')) {
									var more_cnt = $tar.siblings('.host_more');
									$tar.toggleClass('open');
									more_cnt.toggleClass('hidden');
									//UIHelper.refreshScroller(scrollDOM);
								}
							}.bind(this));
						};

						function show_task_host_info() {
							var identity = DATASOURCE['identity'];
							if(!identity) return;
							if(!identity['userHeadPic'])
								identity['userHeadPic'] = 'systemRes/img/default/nophoto.jpg';
							var task_user_infoDOM = $hostContainer.find('[data-role="task_user_info"]');
							var vipIcon = identity['userAttr'][3] > 0 ? (identity['userAttr'][3] > 1 ? '<span class="svip_flag"></span>' : '<span class="vip_flag"></span>') : '';
							task_user_infoDOM.i18nHTML(stringFormat(hostHeadTpl, UserHelper.portrait(identity['userHeadPic']), DOMAIN_CONFIG['IMAGE_DOMAIN'] + 'systemRes/img/default/level1_01.png', identity.userNickName, identity.hostLevel, identity.userLevelScore || identity.hostLevelScore));
							Header.reset_user_level(identity);
						}
						this.init_host_task = function() {
							var promise = new Promise(function() {
								if(this.host_task_all != null) return true;
								Bussiness().getJSON('task/task_hot_data.json', function(data) {
									this.host_task_all = this.formatTaskAll(data);
									promise.resolve();
								}.bind(_this));
							}.bind(_this)).then(function() {
								Bussiness().postData('user_getUserTask.fly', {}, function(data) {
									//console.log(data)
									if(data['code'] == 0) {
										this.host_task_cur = data['dataInfo'];
										this.renderHostTask();
										promise.resolve();
									}
								}.bind(_this));
							}.bind(_this));
						};
						this.formatTaskAll = function(data) {
							$.each(data, function(i, item) {
								item.task.unshift({
									goal: 0,
									exp: 0
								});
							}.bind(this));
							return data;
						};
						this.update_host_exp_info = function(level, exp) {
							var identity = DATASOURCE['identity'];
							if(identity) {
								user_util.update_host_exp(exp, level);
								identity.hostLevelScore = exp;
								identity.hostLevel = level;
								if($hostContainer.is(':visible')) show_task_host_info();
							}
						};
						this.renderItemReward = function(flowers, index, hostflowerDOM, unit, exp_or_coin) {
							var curFlowerNum = this.host_task_cur[index]['current'],
								curObj = this.host_task_cur[index]['tasks'],
								f_len = flowers.length,
								len = curObj.length;
							var flowerDescDOM = hostflowerDOM.find('.host_explain'),
								pgBar = hostflowerDOM.find('.pg_bar span i');
							var limit = f_len - 1,
								start = 0,
								end = limit;
							if(len > 0)
								start = len;
							if(len < limit)
								end = start + 1;
							var desc_tpl = (len == limit ? this.desc[index][1] : this.desc[index][0]);
							flowerDescDOM.html(stringFormat(desc_tpl, curFlowerNum, flowers[start]['exp'], flowers[end]['goal'] - curFlowerNum, flowers[end]['exp']));
							hostflowerDOM.find('[data-role="rewards_list"]').i18nHTML(flowers.map(function(item, j) {
								if(j == 0) return;
								var i = j - 1;
								curItemObj = curObj[i],
									curAvaiable = curItemObj && (curItemObj['state'] == 0),
									curStyle = curAvaiable ? 'active' : '',
									curTask = curAvaiable ? 'data-task=' + curItemObj['taskId'] : '',
									curState = curItemObj ? (curItemObj['state'] == 1 ? Task_HostGotRewards : Task_HostGetRewards) : Task_HostGetRewards;
								curItemObj ? pgBar.eq(i).css('width', '100%') : '';
								if(curAvaiable) this.hasReward = true;
								return stringFormat(itemTpl, curStyle, curTask, curState, item['exp'], item['goal'] + ' ' + unit, exp_or_coin ? 'host_exp' : 'host_coin');
							}.bind(this)).join(''));
							this.hasReward ? this.redDot.removeClass('hidden') : this.redDot.addClass('hidden');
							if(len < limit) {
								var ex_goal = flowers[len]['goal'],
									goal = flowers[len + 1]['goal'];
								pgBar.eq(len).css('width', ((curFlowerNum - ex_goal) / (goal - ex_goal) * 100).toFixed(2) + '%');
							} else {
								pgBar.eq(len).css('width', '100%');
							}
						};
						this.init_host_task();
					}

				},
				'Footer': {
					'init': function(option) {
						this.load(option);
						this.render();
						this.compose();
						this.bind();
						this.start();
					},

					'load': function(option) {
						$.extend(this, option);
					},

					'render': function() {

					},

					'compose': function() {

					},

					'bind': function() {

					},

					'start': function() {

					},

					'html': function() {
						return TEMPLATE.FOOTER;
					}
				}
			};
		}
		compose('Body', Body);

		function Scroller() {
			return OOP.create('Scroller',
				function(option) {
					this.load(option);
					this.render();
					this.compose();
					this.bind();
					this.start();
				}, {
					'load': function(option) {
						$.extend(this, option);
						this.pager = {
							'previous': false,
							'next': false
						};
					},

					'render': function() {
						//this.model = this.container.find('data-role="model"');
						this.next = this.next || this.container.find('[data-role="next"]');
						this.previous = this.previous || this.container.find('[data-role="previous"]');
					},

					'compose': function() {

					},

					'bind': function() {
						this.next.bind('click', this.scroll.bind(this, 'next'));
						this.previous.bind('click', this.scroll.bind(this, 'previous'));
					},

					'start': function() {},

					set: function(option) {
						$.extend(this, option);
						this.model.css(this.attr, this.position = 0);
						this.limit = {
							'previous': 0,
							'next': this.container.width() - this.model.width()
						};
						this.pageniation();
						this.previous.show();
						this.next.show();
					},

					'scroll': function(direction) {
						var target;
						switch(direction) {
							case 'previous':
								if(!this.pager['previous'])
									return;
								else
									target = this.position + this.step;
								break;
							case 'next':
								if(!this.pager['next'])
									return;
								else
									target = this.position - this.step;
								break;
						}
						this.model.css(this.attr, this.position = target);
						this.pageniation();
					},

					'pageniation': function() {
						var disable = 'disable';
						if(this.pager['previous'] = (this.position < this.limit.previous))
							this.previous.removeClass(disable);
						else
							this.previous.addClass(disable);
						if(this.pager['next'] = (this.position > this.limit.next))
							this.next.removeClass(disable);
						else
							this.next.addClass(disable);
					},

					'hide': function() {
						this.previous.hide();
						this.next.hide();
					}
				});
		}
		compose('Scroller', Scroller);

		function Trigger() {
			return {
				'init': function() {
					this.load();
					this.start();
					return this;
				},

				'load': function() {
					this.container = {};
					this.hashcode = 0;
					this.cache = {};
				},

				'start': function() {

				},

				'register': function(key, handler) {
					var handlers = this.container[key];
					if(!handlers)
						handlers = this.container[key] = {};
					var hashcode = this.hashcode++;
					handlers[hashcode] = handler;
					var cache = this.cache[key];
					if(cache) {
						new Promise(this.flush.bind(this, key, cache));
						delete this.cache[key];
					}
					return hashcode;
				},

				'flush': function(key, cache) {
					cache.forEach(this.emit.bind(this, key));
				},

				'emit': function(key, params) {
					var handlers = this.container[key];
					if(handlers)
						Object.keys(handlers).forEach(function(item, index) {

							handlers[item].apply(null, params);
						});
					else {
						var cache;
						this.cache[key] = cache = this.cache[key] || [];
						cache.push(params);
					}
				},

				'detach': function(key, hashcode) {
					var handlers = this.container[key];
					if(!handlers)
						return;
					if(hashcode) {
						delete handlers[hashcode];
						if(Object.keys(handlers).length == 0)
							delete this.container[key];
					} else
						delete this.container[key];
				}
			}.init();
		}
		compose('Trigger', Trigger);

		function Mutex() {
			return OOP.create('Mutex',
				function(option) {
					this.load(option);
					this.render();
					this.compose();
					this.bind();
					this.start();
				}, {
					'load': function(option) {
						$.extend(this, option);

						//this.mutex = this.mutex.bind(this);
						this.current = -1;
					},

					'render': function() {

					},

					'compose': function() {

					},

					'bind': function() {
						if(!this.items)
							return;
						$.each(this.items, function(index, item) {
							item['element'].on(item['event'] || 'click', this.mutex.bind(this, item['index'], false));
						}.bind(this));
					},

					'start': function() {

						if(!this.lazy) {
							this.mutex(0);
						}

					},

					mutex: function(index, force) {
						if(this.current == index && !force)
							return;
						else {
							if(this.current >= 0 && !force)
								this.items[this.current].quit();
							this.current = index;
							this.items[this.current].enter();
						}
					},

					refresh: function() {
						if(this.current < 0) {

							this.mutex(0)
						} else
							this.mutex(this.current, true);
					}
				});
		}
		compose('Mutex', Mutex);

		function Effect() {
			var END_EVENT = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend animationend webkitAnimationEnd',
				CONTAINER = $(document.body),
				OVERTURN = 'overturn';
			return {
				'overturn': function(container) {
					var element = container || CONTAINER;
					element.one(END_EVENT, function() {
						element.removeClass(OVERTURN);
					}).addClass(OVERTURN);
				}
			};
		}
		compose('Effect', Effect);

		function I18N() {
			var i18n = $.i18n,
				filename = 'language';

			var output = {
				'language': '',

				'LANGUAGE': {
					'EN': 'en',
					'AR': 'ar'
				},

				'init': function(option, initial) {
					$.extend(this, option);
					if(initial) {
						var language = Cookie.get(Cookie.key['locale']);
						if(!language) {
							language = ((navigator.userLanguage || navigator.language).substring(0, 2).toLowerCase()) ||
								this.LANGUAGE.EN;
							Cookie.set(Cookie.key['locale'], language);
						};
						this.language = language;
						this.container = $('#container');
						this.effect = OUTPUT.use('Effect');
					}
					return this;
				},

				'load': function() {
					i18n.properties({
						name: filename,
						path: DOMAIN_CONFIG['RESOURCE_DOMAIN'] + 'i18n/',
						mode: 'map',
						language: this.language,
						cache: true,
						encoding: 'UTF-8',
						callback: function(data) {
							this.promise.resolve(data);
						}.bind(this)
					});
				},

				'render': function(callback, plain) {
					if(!plain)
						this.effect.overturn();
					if(this.language == this.LANGUAGE.AR)
						this.container.addClass('arabic');
					else
						this.container.removeClass('arabic');
					(callback || this.translate).call(this, i18n);
					if(this.onLocalize)
						this.onLocalize(i18n);
				},

				'reverse': function() {
					var Language;
					return this.language == (Language = this.LANGUAGE).EN ? Language.AR : Language.EN;
				},

				'evaluate': function(content) {

					var pattern = new RegExp('\\{\\{(.+?)\\}\\}', 'gmi');

					value = content.replace(pattern, function(a, b) {
						return i18n.prop(b);
					});
					return value;
				},

				'translate': function() {
					var content;
					$('[data-i18n]').each(function(index, element) {
						content = i18n.prop((element = $(element)).data('i18n'));
						if(element.is('input[type="text"]') || element.is('input[type="password"]'))
							element.attr('placeholder', content);
						else if(element.is('input[type="button"]'))
							element.val(content);
						else
							element.html(content);
					});
				},

				'localize': function(language, callback, plain) {
					if(language) {
						if(this.language == language)
							return;
						this.language = language;
						Cookie.set(Cookie.key['locale'], language);
					}
					this.promise = new Promise(this.load.bind(this))
						.then(this.render.bind(this, callback, plain));
				},

				'wrapKey': function(key) {
					return '{{' + key + '}}';
				}
			};

			$.fn.i18nHTML = function(content) {
				return $(this).html(output.evaluate(content));
			};

			$.fn.i18nAppend = function(content) {
				return $(this).append(output.evaluate(content));
			};

			$.fn.i18nPrepend = function(content) {
				return $(this).prepend(output.evaluate(content));
			};

			window['i18nTranslate'] = function(key) {
				return i18n.prop(key);
			};

			return output;
		}
		compose('I18N', I18N);

		function Bussiness() {
			var first = '?',
				other = '&';

			function wrapVersion(url, version) {
				if(version === true)
					return url;
				return url + (url.indexOf(first) > 0 ? other : first) + 'v=' + version;
			}

			function wrapRandom(url) {
				return url + (url.indexOf(first) > 0 ? other : first) + 'r=' + Math.ceil(Math.random() * 1000000);
			}

			function wrapURL(url) {
				if(url.toLowerCase().indexOf('http') != 0)
					url = DOMAIN_CONFIG['SITE_DOMAIN'] + url;
				return url;
			}

			return {
				'getJSON': function(path, callback, cache) {
					var url;
					if(path.toLowerCase().indexOf('http://') == 0)
						url = path;
					else
						url = DOMAIN_CONFIG['DATA_DOMAIN_NEW'] + path;
					url = cache ? wrapVersion(url, cache) : wrapRandom(url);
					$.getJSON(url, callback);
				},

				'getData': function(path, callback, cache, isV3) {
					var url = isV3 ? DOMAIN_CONFIG['SITE_DOMAIN'] + path : DOMAIN_CONFIG['DATA_DOMAIN'] + path;
					url = cache ? wrapVersion(url, cache) : wrapRandom(url);
					$.getJSON(url, callback);
				},

				'postData': function(path, data, success, error) {
					var option = {
						url: wrapRandom(wrapURL(path)),
						type: "post",
						dataType: 'json'
					};
					if(data)
						option['data'] = data;
					if(success)
						option['success'] = success;
					if(error)
						option['error'] = error;
					$.ajax(option);
				},

				'postForm': function(path, data, success, error) {
					var option = {
						url: wrapRandom(wrapURL(path)),
						type: "post"
					};
					if(data)
						option['data'] = data;
					if(success)
						option['success'] = success;
					if(error)
						option['error'] = error;
					$.ajax(option);
				}
			}
		}
		compose('Bussiness', Bussiness);

		function Lazyload() {
			var defaultHead = 'systemRes/img/default/nophoto.jpg',
				defaultHead = DOMAIN_CONFIG['IMAGE_DOMAIN'] + defaultHead,
				defaultHead = defaultHead.replace('/', '\/'),
				defaultHead = 'this.src=\'' + defaultHead + '\';';
			var interval = 500;

			return {
				'init': function(container) {
					this.container = $(container || window);
					this.render = this.render.bind(this);
					this.process = this.process.bind(this);
					this.judge = this.judge.bind(this);
					this.watch();
				},

				'watch': function() {
					this.container.on('scroll', this.render);
				},

				'render': function() {
					clearTimeout(this.timeout);
					this.timeout = setTimeout(this.process, interval);
				},

				'process': function() {
					var target = $('[data-lazy]');
					if(target.length == 0)
						return;
					var scrollTop = this.container.scrollTop(),
						clientHeight = this.container.height();
					this.limit = scrollTop + clientHeight;
					target.each(this.judge);
				},

				'judge': function(index, element) {
					var top = (element = $(element)).offset().top;
					if(top < this.limit)
						this.lazyload(element);
				},

				'lazyload': function(element) {
					var src = element.data('lazy');
					element.removeAttr('data-lazy');
					if(element.is('img'))
						this.attr(element, src);
					else
						element.prepend(this.attr($('<img>'), src));
				},

				'attr': function(img, src) {
					return img.attr({
						'src': src,
						'onerror': defaultHead
					});
				}
			}
		}
		compose('Lazyload', Lazyload);

		function ClickCollect() {

			return {
				'store': {},

				'init': function() {
					var t = this;
					$(document).mousedown(function(evt) {
						var target = $(evt.target),
							container = target.closest('[data-collector]'),
							flag = container.length > 0,
							id = container.attr('data-collector'),
							store, widget, callback;
						for(var key in t.store) {
							if(!(flag && id == key && !(flag = false))) {
								store = t.store[key];
								widget = store['widget'];
								widget.safeHide();
								if(callback = store['callback'])
									callback();
							}
						}
					});
				},

				'register': function(key, widget, callback) {
					this.store[key] = {
						'widget': widget,
						'callback': callback
					};
				}
			};
		}
		compose('ClickCollect', ClickCollect);

		function Statistics() {

			return {
				'init': function() {
					if(!this.initial) {
						this.initial = true;
						this.limit = 5;
						this.scalar = 60 * 1000;
						this.store = [];
						var locale = navigator.browserLanguage || navigator.language;
						this.params = {
							'req': location.pathname + location.search,
							'country': locale,
							'lan': locale
						};
						this.bind();
					}
					return this;
				},

				'bind': function() {
					var body = $(document.body);
					body.on('click', '[data-stat]', function(evt) {
						this.stat($(evt.currentTarget).data('stat'));
					}.bind(this));
					window.onbeforeunload = window.onfocus = this.request.bind(this);
				},

				'make': function(action) {
					var time = new Date;
					return $.extend({
						'action': action,
						'uid': user_util.user_info ? user_util.user_info.userId : 0,
						'time': time.getTime() + time.getTimezoneOffset() * this.scalar,
						'pid': (typeof this.pid == 'undefined') ? window['promotion_util'].get_promotion() : this.pid
					}, this.params);
				},

				'stat': function(action) {
					this.store.push(this.make(action));
					if(this.store.length >= this.limit)
						this.request();
				},

				'request': function() {
					if(this.store.length > 0) {

						OUTPUT.use('Bussiness').postData('counter/webreport', JSON.stringify(this.store));
						this.store = [];
						//console.log('stat');
					}
				}

			}.init();
		}
		Statistics.active = true;
		compose('Statistics', Statistics);
		//根据传入参数排序
		function Sort() {
			var TEMPLATE = {
				"HOT": '<div></div>'
			};
			return {
				'sort': function(options) {
					var defa = {
							"ele": [],
							"index": []
						},
						opt = $.extend(defa, options),
						arr = [];
					//重置ele顺序，获得新的排序模块；
					$.each(opt['index'], function(i, item) {
						arr.push(opt['ele'][item]);
					});
					return arr;
				},
				"tab": function(options) {
					var dafa = {
						"ele": null,
						"url": [],
						"tap": "click",
						"lock": null,
						"bool": true
					};
					var opt = $.extend(true, dafa, options);
					var _this = this;
					if(opt['bool']) {
						opt['ele'][0].addClass('select');
						Bussiness().getData(opt['url'][0], function(data) {
							tempnent(data)
						}.bind(this), null, true);
					}
					opt['ele'].on(opt['tap'], function() {
						var _this = this;
						var bool = opt['bool'] = false;
						var index = $(this).index();
						$(this).addClass("select").siblings().removeClass("select");
						Bussiness().getData(opt['url'][index], function(data) {
							tempnent(data)
						}.bind(this), null, true);
					})

					function tempnent(data, element) {
						if(data && element) {
							//
						}
					}

				}

			}
		}
		compose('Sort', Sort);
		return OUTPUT;
	})(window, undefined);
});