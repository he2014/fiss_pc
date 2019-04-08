(function($) {
	jQuery.fn.extend({
		dialog: function(g) {
			var h = $(window);
			var j = $(this);
			var k = j.data("dialogid");
			var l;
			getFocus = function(a) {
				var b = NewGuid();
				var c = a.find(':text:first');
				if (c.length) {
					c.focus();
				} else {
					c = $('<input id="' + b + '" style="width:1px;height:1px;font-size:0;border:none" />').appendTo(a);
					c.focus().remove();
				}
			};
			eventCall = function(a, b, c) {
				if (!a) return;
				if ($.isFunction(a)) {
					a.call(b, c);
				}
			};
			draggable = function(a, b) {
				if ($.fn.draggable) {
					a.find(".popCont h1").mousedown(function() {
						a.find(":first").draggable({}, b);
					});
				}
			};
			resize = function(a) {
				$("#" + a + " .box_modal").css({
					width: getWidth(),
					height: getHeight()
				});
			};
			getZindex = function() {
				var a = $("div[dialogid]");
				return 2000 + (a == null ? 0 : a.length);
			};
			getWidth = function() {
				var a = h.width();
				var b = $(document).width();
				return a > b ? a : b;
			};
			getHeight = function() {
				var a = h.height();
				var b = $(document).height();
				return a > b ? a : b;
			};
			NewGuid = function() {
				var a = "";
				for (var i = 1; i <= 32; i++) {
					var n = Math.floor(Math.random() * 16.0).toString(16);
					a += n;
					if ((i == 8) || (i == 12) || (i == 16) || (i == 20)) a += "-";
				}
				return a;
			};
			if (k != null) {
				l = $("#" + k);
				switch (g) {
					case "iscreated":
						return true;
						break;
					case "getparent":
						return l;
						break;
					case "open":
						l.show();
						return j;
						break;
					case "toggle":
						l.toggle();
						return j;
						break;
					case "close":
						l.hide();
						return j;
						break;
					case "distory":
						l.hide();
						j.removeData("dialogid");
						j.remove();
						l.remove();
						l = j = null;
						return;
						break;
					default:
						j.appendTo($("body"));
						l.remove();
						break;
				}
			} else {
				if (typeof g != "object") {
					return false;
				}
			}

			var m = {
				title: '',
				icon: '',
				modal: false,
				draggable: true,
				width: 360,
				height: 185,
				opacity: 0.7,
				autoOpen: false,
				hasclose: true,
				buttons: null,
				position: null,
				autoscroll: true,
				autoresize: true,
				hasborder: true,
				background: '',
				mainpadding: ''
			};

			var g = $.extend(m, g);
			var o = $(document.body);
			var p = NewGuid();
			if (!g.position) {
				g.position = [0, 0];
				g.position[0] = (h.width() - g.width) / 2;
				g.position[1] = (h.height() - g.height) / 2 + h.scrollTop();
			}

			var q = '<div id="' + p + '" dialogid="' + p + '" style="width:100%;display:none;"><div class="dialog clearfix" style="' + (g.background.length == 0 ? "" : "background:" + g.background + ";") + 'width:' + g.width + 'px; height:auto;z-index:' + getZindex() + '; left:' + g.position[0] + 'px;top:' + g.position[1] + 'px;' + (g.hasborder ? "" : "") + '">';
			q += '<div class="popBox clearfix" ' + (g.background ? "style=\"background:" + g.background + "\"" : '') + '>';
			var r = $.trim(g.title).length > 0;
			if (r && g.hasclose) {
				q += '<a title="' + get_language_desc('1002') + '" class="dclose" href="#this"></a>';
			}

			q += '<div class="bgTop" ' + (g.background ? "style=\"background:" + g.background + "\"" : '') + '><div class="popCont"' + (!r ? ' style="padding:0;"' : '') + '>';
			if (r) {
				q += '<h1 style="cursor:' + (g.draggable ? "move" : "default") + '">' + g.title + '</h1>';
			}

			q += '<div class="box_main" style="padding:' + (!r ? '0' : g.mainpadding ? g.mainpadding : '') + ';' + (g.background ? 'background:' + g.background : '') + '"></div></div></div></div></div>';
			if (g.modal) {
				q += '<div class="box_modal" style="width:100%;height:' + getHeight() + 'px; z-index:' + (getZindex() - 1) + ';"></div>';
				h.resize(function() {
					resize(p);
				});
			}

			q += '</div>';
			l = $(q);
			var s = l.find(".box_main");
			j.show().appendTo(s);
			l.appendTo(o);
			if (g.icon != '') {
				var t = $('<div class="icons ' + g.icon + '"></div>');
				t.insertBefore(j).next().addClass("text");
			}

			if (g.buttons !== null && typeof g.buttons === 'object') {
				var u = $('<p class="foot"></p>');
				u.appendTo(s);
				$.each(g.buttons,
					function(b, c) {
						var d = "W_btn_";
						if (typeof b == "string" || b == "0") {
							d += "e";
						} else {
							d += "f";
						}

						c = $.isFunction(c) ? {
							click: c,
							text: b
						}

						: c;
						var f = $('<a class="' + d + '" href="#this"><span>' + c.text + '</span></a>').unbind('click').click(function(e) {
							eventCall(c.click, this, e);
							return false;
						}).appendTo(u);
						if (d == "W_btn_e") {
							l.keypress(function(a) {
								if (a.keyCode == 13) {
									eventCall(c.click, u[0], a);
									return false;
								}
							});
						}
					});
			}

			var v = l.find(".dialog");
			if (g.draggable) {
				if ($.fn.draggable) {
					draggable(l,
						function() {
							g.position = [parseInt(v.css('left')), parseInt(v.css('top')) - h.scrollTop()];
						});
				} else {
					$.getScript("onreg.draggable.min.js",
						function() {
							draggable(l,
								function() {
									g.position = [parseInt(v.css('left')), parseInt(v.css('top')) - h.scrollTop()];
								});
						});
				}
			}

			l.find("a.dclose").click(function(e) {
				l.hide();
				eventCall(g.close, this, e);
				return false;
			});

			j.data("dialogid", p);
			l.find(".box_modal").css({
				opacity: g.opacity
			});

			l.find(".ui-draggable,.box_modal").bgiframe();
			if (g.autoOpen) {
				l.show();
			}

			if (g.autoscroll) {
				h.scroll(function() {
					if (p) {
						var a = $("#" + p);
						if (a.length) {
							if (a.is(':visible')) a.find(".dialog").css("top", (h.height() - g.height) / 2 + h.scrollTop());
						} else {
							v = k = a = p = g = h = null;
						}
					}
				});
			}

			if (g.autoresize) {
				h.resize(function() {
					if (p) {
						var a = $("#" + p);
						if (a.length) {
							if (a.is(':visible')) {
								a.find(".dialog").css("left", (h.width() - g.width) / 2).css("top", (h.height() - g.height) / 2 + h.scrollTop());
							}
						} else {
							v = k = a = p = g = h = null;
						}
					}
				});
			}

			eventCall(g.load, this);
			return j;
		}
	});
	$.fn.bgiframe = false ?
		function(s) {
			s = $.extend({
					top: 'auto',
					left: 'auto',
					width: 'auto',
					height: 'auto',
					opacity: true,
					src: 'javascript:false;'
				},
				s);
			var a = '<iframe class="bgiframe" frameborder="0" tabindex="-1" src="' + s.src + '"' + ' style="display:block;position:absolute;z-index:-1;' + (s.opacity !== false ? 'filter:Alpha(opacity=\'0\');' : '') + 'top:' + (s.top == 'auto' ? 'expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+\'px\')' : prop(s.top)) + ';' + 'left:' + (s.left == 'auto' ? 'expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+\'px\')' : prop(s.left)) + ';' + 'width:' + (s.width == 'auto' ? 'expression(this.parentNode.offsetWidth+\'px\')' : prop(s.width)) + ';' + 'height:' + (s.height == 'auto' ? 'expression(this.parentNode.offsetHeight+\'px\')' : prop(s.height)) + ';' + '"/>';
			return this.each(function() {
				if ($(this).children('iframe.bgiframe').length === 0) this.insertBefore(document.createElement(a), this.firstChild);
			});

			function prop(n) {
				return n && n.constructor === Number ? n + 'px' : n;
			}
		} : function() {
			return this;
		};
	$.fn.bgIframe = $.fn.bgiframe;
	$.extend({
		alert: function(t, a, b, c, d, f) {
			f = (f == null ? true : f);
			if (f) {
				var g = $("div[dialogid]:visible .box_modal");
				if (g.length) return
			}

			var h, _position;
			if (window.urlQueryString) {
				var i = urlQueryString('from', true);
				if (i === 'xl') {
					_position = [($(window).width() - 400) / 2, 300];
				} else {
					_position = null;
				}
			}
			t = (t == null ? get_language_desc('1001') : t);
			return h = $('<div style="text-align:center;">' + a + '</div>').dialog({
				title: get_language_desc('1001'),
				icon: d,
				modal: f,
				autoOpen: true,
				position: _position,
				buttons: [{
					text: get_language_desc('1003'),
					click: function(e) {
						eventCall(b, this, e);
						h.dialog("distory");
						h = null;
					}
				}],
				close: function(e) {
					eventCall(c, this, e);
					h.dialog("distory");
					h = null;
				}
			});
		},
		confirm: function(a, b, c, d, f) {
			f = (f == null ? true : f);
			if (f) {
				var g = $("div[dialogid]:visible .box_modal");
				if (g.length) return
			}

			var h, _position;
			if (window.urlQueryString) {
				var i = urlQueryString('from', true);
				if (i === 'xl') {
					_position = [($(window).width() - 400) / 2, 300];
				} else {
					_position = null;
				}
			}

			return h = $('<div style="text-align:center;">' + a + '</div>').dialog({
				title: get_language_desc('1001'),
				icon: d,
				modal: f,
				autoOpen: true,
				position: _position,
				buttons: [{
					text: get_language_desc('1003'),
					click: function(e) {
						eventCall(b, this, e);
						h.dialog("distory");
						h = null;
					}
				}, {
					text: get_language_desc('1004'),
					click: function(e) {
						eventCall(c, this, e);
						h.dialog("distory");
						h = null;
					}
				}],
				close: function(e) {
					eventCall(c, this, e);
					h.dialog("distory");
					h = null;
				}
			});
		},
		iframe: function(a, b, c, d, e, f, g, h, i) {
			d = (d == null ? false : d);
			e = (e == null ? true : e);
			f = (f == null ? '' : f);
			h = h || 13;
			i = i || 0;
			var j = $('#weishow_dialog_iframe');
			var k = j.find('iframe');
			var l = j.length > 0;
			if (l) {
				if (a === 'close') {
					j.dialog(j.attr('isdistory') == '1' ? 'distory' : 'close');
					return j;
				} else if (a === 'distory') {
					j.dialog('distory');
					return j;
				}
			}

			if (l) {
				var m = k.attr('src');
				if (m === a) {
					j.dialog('open');
					return j;
				} else j.dialog('distory');
			} else j.dialog('distory');
			j = $('<div id="weishow_dialog_iframe" ' + (d ? 'isdistory="1"' : '') + ' style="display: none;"><div></div></div>').appendTo('body');
			k = $('<iframe frameborder="0" scrolling="no" marginheight="0" marginwidth="0" height="' + c + '" width="100%" src="about:blank" ></iframe>');
			j.append(k);
			j.dialog({
				title: f,
				autoOpen: true,
				hasborder: false,
				width: b,
				height: c,
				modal: e,
				background: ''
			}).hide();
			var n = $('<img style="width:23px;height:23px" src="' + (g || sysResource + 'img/loading.gif') + '"/>');
			var o = $('<div style="position:absolute;top:left:" name="loading_div"></div>').insertBefore(j);
			o.append(n);
			o.css("left", (b - i) / 2).css("top", (c - h) / 2);
			k.attr('src', a).load(function() {
				o.remove();
				o = null;
				j.fadeIn();
				// 支付iframe弹层增加close按钮
				j.parent().append('<a class="iframe_btn_close"></a>').click(function(){
					$('body').find('[dialogid]').remove();
				}.bind(this));
			});
			return j;
		},
		tip_alert: function(title, desc, is_show_close, auto_close_time) {
			var tip_alert_div = $("#tip_alert_div");
			if (!tip_alert_div || tip_alert_div.length < 1) {
				$('body').append('<div id="tip_alert_div" class="tip_alert"></div>');
				tip_alert_div = $("#tip_alert_div");
			}
			var tip_id = 'tip_' + (new Date().getTime()),
				top_temp = window.tip_alert_div.height;
			var html_str = '<div class="popBox" id="' + tip_id + '">';
			html_str += '<div class="bgTop">';
			if ($.trim(title) != '') {
				html_str += '<div class="title">' + $.trim(title) + '</div>';
			}
			if (is_show_close) {
				html_str += '<span class="close">x</span>';
			}
			html_str += '</div>';
			html_str += '<div class="context">' + $.trim(desc) + '</div>';
			html_str += '</div>';
			var html_obj = $(html_str);
			tip_alert_div.html(html_obj);
			tip_alert_div.css("left", ($(window).width() / 2 - tip_alert_div.width() / 2) + "px");
			tip_alert_div.css("top", ($(window).height() / 2 - tip_alert_div.height() - 50 + $(window).scrollTop()) + "px");
			tip_alert_div.css("opacity", 0);
			tip_alert_div.animate({
				opacity: '1',
				top: ($(window).scrollTop() + $(window).height() / 2 - tip_alert_div.height()) + "px"
			}, 1000, 'swing');
			if (auto_close_time > 0) {
				setTimeout(function() {
					html_obj.slideUp(function() {
						html_obj.remove();
					});
				}, auto_close_time * 1000);
			}

			$("#" + tip_id + " .close").click(function() {
				html_obj.slideUp(function() {
					html_obj.remove();
				});
				//html_obj.remove();
			});
		},
		tip_simple_alert: function(desc) {
			$.tip_alert('', desc, false, 3);
		}
	});
})(jQuery);