define(function(require, exports, module) {
	module.exports = (function(host, undefined) {
		var UNDEFINED = typeof undefined;
		var Utility = require(JS_UTILITY),
			OOP = Utility['OOP'],
			Cookie = Utility['Cookie'],
			Promise = Utility['Promise'],
			stringFormat = Utility['String']['stringFormat'];

		var sign_util = new function() {
			this.base_attr = {
				init_sign_data: 0,
				user_sgin_info: null,
				sign_pool: {},
				fragment_back_pic: null,
				is_sign: false
			};
			this.init_system_data = function() {
				if (typeof(sys_data) == 'undefined') {
					system_data_util.load_async_system_data("sign_util", "init_system_data_back");
				} else {
					sign_util.init_system_data_html();
				}
			};
			this.init_system_data_back = function() {
				sign_util.init_system_data_html();
			};
			this.init_system_data_html = function() {
				if (sys_data.sign_badge_frament_id) {
					sign_util.init_fragment_compound();
				}
			};

			this.init_fragment_compound = function() {
				if (typeof(fragment_compound_data) == 'undefined') {
					system_data_util.load_async_fragment_compound_data("sign_util", "init_fragment_compound_back");
				} else {
					sign_util.init_fragment_compound_html();
				}
			};
			this.init_fragment_compound_back = function() {
				sign_util.init_fragment_compound_html();
			};
			this.init_fragment_compound_html = function() {
				if (sys_data.sign_badge_frament_id) {
					var fragment_compound_detail = fragment_compound_data[sys_data.sign_badge_frament_id];
					if (fragment_compound_detail) {
						sign_util.base_attr.fragment_back_pic = system_info.base_attr.staticResource + fragment_compound_detail.pic;
						$("#fragment_compound_block").html('<img src="' + sign_util.base_attr.fragment_back_pic + '"/>');
					}
				}
			};

			this.init_fragment = function() {
				if (typeof(fragment_data) == 'undefined') {
					system_data_util.load_async_fragment_data("sign_util", "init_fragment_data_back");
				} else {
					sign_util.init_fragment_data_html();
				}
			};
			this.init_fragment_data_back = function() {
				sign_util.init_fragment_data_html();
			};
			var detail_img = '';
			this.init_fragment_data_html = function() {
				if (!sign_util.base_attr.user_sgin_info) {
					return;
				}
				sign_data && $.each(sign_data.signData, function(idx, obj) {
					if (obj && obj.signIndex <= sign_util.base_attr.user_sgin_info.sch && obj.awards && obj.awards.length > 0) {
						$.each(obj.awards, function(idx2, obj2) {
							if (obj2.type == 6 || obj2.type == 7) {
								if (sys_data.sign_badge_frament_id == obj2.compoundId) {
									var special = obj2.special;
									var fragment_detail = fragment_data[special];
									if (fragment_detail) {
										var fragmen_img_url = system_info.base_attr.staticResource + fragment_detail.pic;
										if (fragment_detail.detail) {
											var detail = jQuery.parseJSON(fragment_detail.detail),
												x = detail.x,
												y = detail.y;
											detail_img += '<div style="position:absolute;left:' + x + 'px;top:' + y + 'px;">';
											detail_img += '<img src="' + fragmen_img_url + '"/>';
											detail_img += '</div>';
										}
									}
								}
							}
						});
					}
				});
				sign_util.add_detail_img();
			};

			this.add_detail_img = function() {
				$("#fragment_detail_blcok").html($(detail_img));
			};

			this.init_sign = function() {
				if (typeof(sign_data) == 'undefined') {
					sign_util.base_attr.init_sign_data = 1;
					system_data_util.load_async_sign_data("sign_util", "init_sign_back");
				} else {
					sign_util.init_sign_html();
				}
			};
			this.init_sign_back = function() {
				sign_util.base_attr.init_sign_data = 2;
				sign_util.init_sign_html();
			};

			this.init_sign_html = function() {
				/*var url = window.location.href,
					sign_guide_bool = false;
				if (typeof(room_guide_util) == 'undefined') {
					sign_guide_bool = false;
				} else {
					if (!cookie_util.get_cookie(cookie_util.base_attr.room_step6) && url.indexOf("live")) {
						sign_guide_bool = true;
					}
				}*/
				if (!user_util.user_info) {
					$("#sign").unbind("click").click(function() {
						//if (sign_guide_bool) {
						//	room_guide_util.room_guide_step6();
						//} else {
							if (!user_util.user_info) {
								user_util.is_login(true);
							} else {
								sign_util.init_sign_html();
								$("#sign").click();
							}
						//}
					});
					$("#tip_popshut").click(function() {
						$("#sign_tip").hide();
						$("#lightBox_blackbg").hide();
					});
					return;
				}
				$("#sign").unbind("click");

				var sign_obj = $("#sign_tip");
				var sign_pop = $("#sign_pop");
				if ($(sign_obj).length < 1) {
					sign_obj = $('<div class="daily_sign" style="display:none" id="sign_tip"></div>');
					sign_pop = $('<div class="sign_pop" style="display:none" id="sign_pop"></div>');
					$("#container").append(sign_obj);
					$("#container").append(sign_pop);
					$("#container").append('<div id="lightBox_blackbg" style="background-color: #000000;left: 0;position: fixed;top: 0;width: 100%; height: 100%; z-index: 1002; opacity: 0.7;display:none;"></div>');
				}

				var sign_html = '';
				sign_html += '<h2 class="tip_title"></h2>';
				sign_html += '<a class="sign_close" id="tip_popshut" data-stat="sign_close"></a>';
				sign_html += '<div class="sign_word">';
				sign_html += '<div id="bg_fragment_block">';
				sign_html += '<div id="fragment_compound_block"></div>';
				sign_html += '<div id="fragment_detail_blcok"></div>';
				sign_html += '<h3></h3>';
				sign_html += '</div>';
				sign_html += '<p name="sgind_date"></p>';
				sign_html += '</div>';
				sign_html += '<div class="sign_gift">';
				sign_html += '<ul id="sign_detail">';
				sign_html += sign_util.get_sign_detail_html();
				sign_html += '</ul>';
				sign_html += '<p class="gift_tip"></p>';
				sign_html += '</div>';
				sign_html += '<div class="kind_tips_wrap">';
				//sign_html += '<h3></h3>';
				sign_html += '<div class="kind_tips_top"><div class="kind_tips_bottom"><div class="kind_tips"><dl>';
				sign_html += '<dt data-i18n="Sign_KindTips">{{Sign_KindTips}}</dt>';
				sign_html += '<dd data-i18n="Sign_KindTips1">{{Sign_KindTips1}}</dd>';
				sign_html += '<dd data-i18n="Sign_KindTips2">{{Sign_KindTips2}}</dd>';
				sign_html += '<dd data-i18n="Sign_KindTips3">{{Sign_KindTips3}}</dd>';
				sign_html += '</dl></div></div></div>';
				sign_html += '</div>';
				
				
				var pop_html = '';
				pop_html += '<a class="pop_close" id="badge_close" data-stat="pop_close"></a>';
				pop_html += '<p class="pop_img"><img src="" alt="">';
				pop_html += '<p class="pop_info" data-i18n="Sign_PopInfo"></p>';
				$(sign_obj).i18nHTML(sign_html);
				$(sign_pop).html(pop_html);
				if (sign_util.base_attr.fragment_back_pic) {
					$("#bg_fragment_block").append('<img class="bg_fragment_img" src="' + sign_util.base_attr.fragment_back_pic + '"/>');
				}
				sign_util.reset_sign_state();
				$("#sign").unbind("click").click(function() {
					/*var url = window.location.href,
						sign_guide_bool = false;
					if (typeof(room_guide_util) == 'undefined') {
						sign_guide_bool = false;
					} else {
						if (!cookie_util.get_cookie(cookie_util.base_attr.room_step6) && url.indexOf("live")) {
							sign_guide_bool = true;
						}
					}*/
					//if (sign_guide_bool) {
					//	room_guide_util.room_guide_step6();
					//} else {
						if (!user_util.user_info) {
							user_util.is_login(true);
						} else {
							$("#sign_tip").show();
							$("#lightBox_blackbg").show();
						}
					//}
				});
				$("#tip_popshut").click(function() {
					$("#sign_tip").hide();
					$("#lightBox_blackbg").hide();
				});
			};

			this.get_sign_detail_html = function() {
				var sign_html = '';
				sign_data.signData && $.each(sign_data.signData, function(idx, obj) {
					if (obj) {
						var img_url = system_info.base_attr.sysResource + 'imgNew/top_img/min_1427685772713.gif';
						var num = 0;
						if (obj.awards && obj.awards.length > 0) {
							var award = obj.awards[0];
							if (award) {
								num = award.number;
								// UNKNOW(-1), FLOWER(0), EXP(1), BLANCE(2), SCENCE(3),
								// GIFT(4), CAR(5),6 勋章碎片 7 礼物碎片;
								if (award.image && $.trim(award.image) != '') {
									img_url = system_info.base_attr.staticResource + $.trim(award.image);
								} else if (award.type == 0) {
									img_url = system_info.base_attr.sysResource + 'imgNew/home_img/flower54.png';
								} else if (award.type == 1) {
									img_url = system_info.base_attr.sysResource + 'imgNew/home_img/exp54.png';
								} else if (award.type == 2) {
									img_url = system_info.base_attr.sysResource + 'imgNew/home_img/gold54.png';
								} else if (award.type == 6) {
									img_url = system_info.base_attr.staticResource + $.trim(award.image);
								} else if (award.type == 7) {
									img_url = system_info.base_attr.staticResource + $.trim(award.image);
								}else if(award.type == 12){
									img_url = system_info.base_attr.sysResource + 'imgNew/home_img/diamond54.png';
								}
							}
						}
						var json_str = '{"img_url":"' + img_url + '","date":' + obj.signIndex + ',"num":' + num + ',"pool":' + obj.poolId + ',"type":' + award.type + '}';
						sign_util.base_attr.sign_pool[obj.signIndex] = jQuery.parseJSON(json_str);
						if (obj.signType != 1) {
							sign_html += '<li id="sign_' + obj.signIndex + '" data-stat="sign_' + obj.signIndex + '"><a><img src="' + img_url + '" alt="" tag_id="12014"><em></em><b>' + (num > 0 ? 'x' + num : '') + '</b></a></li>';
						} else {
							sign_html += '<li name="mysterious" id="sign_' + obj.signIndex + '" data-stat="sign_' + obj.signIndex + '"><a class="flipper"><div class="front"><img src="' + system_info.base_attr.sysResource + 'imgNew/home_img/game_li_bg3.png" alt=""></div><div class="back"><img src="' + img_url + '" alt="" tag_id="12014"></div><em></em><b>' + (num > 0 ? 'x' + num : '') + '</b></a></li>';
						}
					}
				});
				return sign_html;
			};

			this.get_user_sign_info = function() {
				if (!sign_util.base_attr.user_sgin_info) {
					$.ajax({
						url: system_info.base_attr.domain + "service/user/v3/sign/",
						type: "get",
						dataType: "json",
						success: function(data) {
                            console.log(data);
							if (data.code == 0) {
								sign_util.base_attr.user_sgin_info = data.dataInfo;
								sign_util.reset_sign_state();
							}
						}
					});
				}
			};
			
			this.localize = function(){
				$("[name='sgind_date']").html(stringFormat(i18nTranslate('Sign_Times'),this.num));
			};

			this.sign_highlight = function() {
				$("#sign").addClass("daily_tip");
			};

			this.reset_sign_state = function() {
				if (sign_util.base_attr.user_sgin_info) {
					sign_util.base_attr.is_sign = false;
					$("#sign_detail li").unbind("hover").unbind("click").removeClass();
					sign_util.sign_highlight();
					$("#sign_detail li span").remove();
					$("#sign_detail li em").removeClass('tip_today');
					$("#sign_detail li b").removeClass('gray');
					$("#sign_detail li[name='mysterious']").addClass("gift_bg4").addClass("flip-container");
					var num = this.num = sign_util.base_attr.user_sgin_info.sch;
					$("[name='sgind_date']").html(stringFormat(i18nTranslate('Sign_Times'),num));
					var current = new Date(sign_util.base_attr.user_sgin_info.tm);
					var curMonthDays = new Date(current.getFullYear(), (current.getMonth() + 1), 0).getDate();
					var curMonth = new Date(current.getFullYear(), (current.getMonth() + 1), 0).getMonth() + 1;

					switch (curMonth) {
						case 1:
							x = '2811';
							break;
						case 2:
							x = '2812';
							break;
						case 3:
							x = '2813';
							break;
						case 4:
							x = '2814';
							break;
						case 5:
							x = '2815';
							break;
						case 6:
							x = '2816';
							break;
						case 7:
							x = '2817';
							break;
						case 8:
							x = '2818';
							break;
						case 9:
							x = '2819';
							break;
						case 10:
							x = '2820';
							break;
						case 11:
							x = '2821';
							break;
						case 12:
							x = '2822';
							break;
					}
					//var Mon_x = (x);
					//$('.tip_gift h3').text(Mon_x);
					var total_li = $("#sign_detail li").length;
					for (var i = curMonthDays + 1; i < total_li + 1; i++) {
						$("#sign_" + i).hide();
					}
					var date = num + 1;
					if (!sign_util.base_attr.user_sgin_info.isSign) {
						$("#sign_" + date).addClass('gift_bg3');
						$("#sign_" + date).append('<span class="sign_unsign"></span>');
						$("#sign_" + date).hover(function() {
							var name = $("#sign_" + date).attr("name");
							if (name == 'mysterious') {
								var tip_y = $(this).position().top;
								var tip_x = $(this).position().left;
								$('.tip_gift .gift_tip').text(('2809')).append("<em></em>");
								var tip_w = $('.tip_gift .gift_tip').width();
								$('.tip_gift .gift_tip').css({
									"top": tip_y - 30,
									"left": tip_x - tip_w / 2
								}).show();
							}
						}, function() {
							$('.tip_gift .gift_tip').hide();
						});
						$("#sign_" + date).click(function() {
							sign_util.sign(date);
						});
					} else {
						$("#sign").removeClass("daily_tip");
					}

					$("#sign_detail li").each(function() {
						$(this).hover(function() {
							if (sign_util.base_attr.is_sign) {
								var tip_y = $(this).position().top;
								var tip_x = $(this).position().left;
								$('.tip_gift .gift_tip').text(('2802')).append("<em></em>");
								var tip_w = $('.tip_gift .gift_tip').width();
								$('.tip_gift .gift_tip').css({
									"top": tip_y - 30,
									"left": tip_x - tip_w / 2
								}).show();
							}
						}, function() {
							$('.tip_gift .gift_tip').hide();
						});
					});

					for (var i = 1; i < date; i++) {
						$("#sign_" + i).append('<span class="sign_signed"></span>');
					};
					if (sign_util.base_attr.user_sgin_info.signList && sign_util.base_attr.user_sgin_info.signList.length > 0) {
						$.each(sign_util.base_attr.user_sgin_info.signList, function(idx, obj) {
							if (obj) {
								$("#sign_" + obj.index + "sign_signed").remove();
								$("#sign_" + obj.index).addClass('gift_bg6');
								$("#sign_" + obj.index + " em").addClass('tip_today');
								$("#sign_" + obj.index + " b").addClass('gray');
								var name = $("#sign_" + obj.index).attr("name");
								if (name == 'mysterious') {
									$("#sign_" + obj.index).find(".back").addClass('back_active');
									$("#sign_" + obj.index).find(".front").addClass('front_active');
									$("#sign_" + obj.index).find("b").css("z-index", "2");
								} else {
									$("#sign_" + obj.index).find(".back").removeClass('back_active');;
									$("#sign_" + obj.index).find(".front").removeClass('front_active');
									$("#sign_" + obj.index).find("b").css("z-index", "1");
								}
								if (date == obj.index) {
									sign_util.base_attr.is_sign = true;
									$("#sign_" + obj.index + " span").addClass('tip_today'); // 今日领取
								} else {
									$("#sign_" + obj.index + " span").removeClass('tip_today'); // 今日领取
								}
							}
						});
					}
					sign_util.init_fragment();
				} else {
					sign_util.get_user_sign_info();
				}
			};

			this.sign = function(date) {

			
				var obj = sign_util.base_attr.sign_pool[date];
				$.ajax({
					url: system_info.base_attr.domain + "service/user/v3/sign/",
					type: "post",
					dataType: "json",
					//data: {
					//	poolId: obj.pool
					//},
					success: function(data) {
						console.log(data);
						if (data.code == 99) {
							login_util.show_login_div();
							return;
						}

						if (data.code == 0) {
							var name = $("#sign_" + date).attr("name");
							if (name == 'mysterious') {
								$("#sign_" + date).find(".back").css({
									"transform": "rotateY(0deg)",
									"-webkit-transform": "rotateY(0deg)",
									"-moz-transform": "rotateY(0deg)",
									"-ms-transform": "rotateY(0deg)",
									"-o-transform": "rotateY(0deg)",
									"z-index": "2"
								});
								$("#sign_" + date).find(".front").css({
									"transform": "rotateY(180deg)",
									"-webkit-transform": "rotateY(180deg)",
									"-moz-transform": "rotateY(180deg)",
									"-ms-transform": "rotateY(180deg)",
									"-o-transform": "rotateY(180deg)",
									"z-index": "1"
								});
							}
							sign_util.base_attr.user_sgin_info = null;
							sign_util.base_attr.is_sign = true;
							sign_util.reset_sign_state();
							var str = string_util.format(('2803'), '<img src="' + obj.img_url + '">', obj.num);
							$('.tip_gift .gift_tip').html(str).append("<em></em>");
							if (obj.type == 0) {

							} else if (obj.type == 1) {
								if (data.dataInfo[0].type != 1) {
									//user_util.update_user_exp(data.dataInfo[0].level, data.dataInfo.levelScore);
                                    user_util.update_user_exp(data.dataInfo[0].level);
								} else {
									//user_util.update_host_exp(data.dataInfo[0].level, data.dataInfo.levelScore);
                                    user_util.update_host_exp(data.dataInfo[0].level);
								}
							} else if (obj.type == 2) {
								user_util.add_user_return_balance(obj.num);
							}
							/** add 徽章合成弹层*/
							if(data.dataInfo[0].badge && data.dataInfo[0].status==1){
								$("#sign_tip").css('z-index','996');
								sign_util.showBadge();
							}
						} else {
							$('.tip_gift .gift_tip').text(('2804')).append("<em></em>");
						}
						var tip_y = $("#sign_" + obj.date).position().top;
						var tip_x = $("#sign_" + obj.date).position().left;
						var tip_w = $('.tip_gift .gift_tip').width();
						if (tip_w > 248 && tip_x == 466) {
							$('.tip_gift .gift_tip').css({
								"top": tip_y - 30,
								"left": '260px'
							}).show();
						} else {
							$('.tip_gift .gift_tip').css({
								"top": tip_y - 30,
								"left": tip_x - tip_w / 2
							}).show();
						}
						setTimeout(function() {
							$('.tip_gift .gift_tip').hide();
						}, 10000);
					}
				});
			};

			this.hide_sign = function() {
				$("#sign_tip").hide();
				$("#lightBox_blackbg").hide();
			};

			this.showBadge=function(){
				console.log(sign_data.badgeData);
				if(sign_data.badgeData){
					$('#sign_pop').find('.pop_img img')[0].src = system_info.base_attr.staticResource+sign_data.badgeData.bpic;
					var endTime = new Date(new Date().getTime()+sign_data.badgeData.expire);
					$('.pop_info').html(stringFormat(i18nTranslate('badge_Expires'),endTime.getFullYear()+'-'+(endTime.getMonth()+1)+'-'+endTime.getDate()));
					$('#sign_pop').show();
					$('#badge_close').click(function(){
						$('#sign_pop').hide();
						$('#sign_tip').css('z-index','10011');
					});
				}
			};

			this.start = function(){
				if(this.initialized)
					return;
				this.initialized = true;
				this.init_system_data();
				this.init_sign();
			}
		};

		return window['sign_util'] = sign_util;

	})(window, undefined);
});