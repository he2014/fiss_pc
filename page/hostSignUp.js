define(function(require){
    var STRING_EMPTY = '',
        Utility =require(JS_UTILITY),
        Cookie = Utility['Cookie'],
        OOP=Utility['OOP'],
        Promise = Utility['Promise'],
        stringFormat = Utility['String']['stringFormat'],
        DateTime = Utility['DateTime'];
   	var Kit = require(useJSComponent('kit')),
        I18N = Kit.use('I18N'),
        Trigger = Kit.use('Trigger'),
        Bussiness = Kit.use('Bussiness'),
        ClickCollect = Kit.use('ClickCollect'),
        Body=Kit.use('Body'),
        _nav = Body.nav,
        _task = Body.TASKS,
        Header=Body.Header,
        Footer = Body.Footer;
        
    require('js/reference/ps.js'); 
    
    var IMAGE_DOMAIN =DOMAIN_CONFIG['IMAGE_DOMAIN'];
    var language_NUM={
            'en':1,
            'ar':2,
            'tr':3
    },
    type_NUM={
    	'1':'Store_VIP',
    	'2':'Store_SVIP',
    	'3':'Store_NavMount',
    	'4':'Store_NavItem',
    	'5':'Store_NavItem',
    	'6':'Store_NavItem',
    	'7':'Store_NavItem',
    	'8':'Store_NavItem'
    };
    var TEMPLATE={
        'MAIN':'<div class="host-sign-up-bg">\
			<div class="sign-up-content">\
				<div class="title">Registration Form</div>\
				<div class="input-warp">\
					<input id="fullName" maxLength="64" class="input_big" placeholder="Full name"/>\
				</div>\
				<div class="input-warp">\
					<input id="email" maxLength="64"  class="input_big"  placeholder="Email" />\
				</div>\
				<div class="input-warp">\
					<input id="whatsappNumber" maxLength="64"  class="input_big" placeholder="Whatsapp Number" />\
				</div>\
				<div class="input-warp">\
					<input id="facebookLink" maxLength="256"  class="input_big" placeholder="Facebook Link" />\
				</div>\
				<div class="input-warp">\
					<div class="input-warp-chooseGame">\
						<input type="hidden" id="gameId"/>\
						<input id="gameName" class="input_small" placeholder="Choose Game" readonly/>\
						<div class="taglistPs hidden">\
							<ul id="gameList"></ul>\
						</div>\
					</div>\
					<div class="input-warp-location">\
						<input id="locationCountry" maxLength="64"  class="input_small"  placeholder="Location(country)"/>\
					</div>\
				</div>\
				<div class="input-warp">\
					<input id="rank" maxLength="128"  class="input_big" placeholder="Rank" />\
				</div>\
				<div class="sign_up_btn">\
					<div id="signSubmit" class="sign_submit">Submit</div>\
				</div>\
			</div>\
			<div class="sign-up-help">\
				<div class="help-title">Competition Details</div>\
				<div class="help-content">\
					<div class="con-left">\
						<div class="title">\
							Now you can make money while playing any of your favorite games:\
						</div>\
						<ul>\
							<li>1- Overwatch</li>\
							<li>2- League of legends</li>\
							<li>3- World of Warcraft</li>\
							<li>4- Starcraft</li>\
						</ul>\
						<div class="details">\
							Details\
						</div>\
					</div>\
					<div class="con-conter">\
						<div class="circle-en"></div>\
						<div class="line-en1"></div>\
						<div class="circle-ar"></div>\
						<div class="line-en2"></div>\
					</div>\
					<div class="con-right">\
						<div class="title">\
							الآن يمكنك كسب المال بينما تلعب أي من الألعاب المفضلة لديك:\
						</div>\
						<ul>\
							<li>1- Overwatch</li>\
							<li>2- League of legends</li>\
							<li>3- World of Warcraft</li>\
							<li>4- Starcraft</li>\
						</ul>\
						<div class="details">التفاصيل</div>\
					</div>\
				</div>\
			</div>\
		</div>',
		'POPUPEN':'<div id="popupEn" class="notice_popup">\
			<div class="notice_wrap">\
				<div class="title">Detail</div>\
				<div class="content">\
					<ul id="popupEnLists">\
						<li class="con-title">Now you can make money while playing any of your favorite games:</li>\
						<li>1- Overwatch</li>\
						<li>2- League of legends</li>\
						<li>3- World of Warcraft</li>\
						<li>4- Starcraft</li>\
						<li>5- Dota2</li>\
						<li>6- Rocket League</li>\
						<li>7- Call of Duty</li>\
						<li>8- Counter Strike Go</li>\
						<li>9- Binding of Isaac</li>\
						<li>10- Path of Exile</li>\
						<li>11- Hearthstone</li>\
						<li>12- Smite</li>\
						<li>13- Heroes of the Storm</li>\
						<li>14- Battlefield</li>\
						<li style="padding:20px 0">For any other games you enjoy playing all you need to do is contact us; we will let you know how you can stream online while you are playing and make a career out of it.</li>\
						<li>Requirements:</li>\
						<li>Steady internet connection no less than 2MB/s</li>\
						<li>Great knowledge in games you choose so you can communicate with your audience</li>\
						<li>Willing to take the job seriously so you can complete daily targets (hours per day)</li>\
						<li>Streamers should speak Arabic</li>\
						<li>Should be 16+ of age.</li>\
						<li style="padding-top:20px">For more information please contact us: </li>\
						<li style="padding-bottom:20px">games@7nujoom.com </li>\
					</ul>\
				</div>\
				<div class="btns">\
					<div class="btn_close">OK</div>\
				</div>\
			</div>\
		</div>',
		'POPUPAR':'<div id="popupAr" class="notice_popup">\
			<div class="notice_wrap">\
				<div class="title">التفاصيل</div>\
				<div class="content">\
					<ul id="popupArLists">\
						<li class="con-title">الآن يمكنك كسب المال بينما تلعب أي من الألعاب المفضلة لديك:</li>\
						<li>1- Overwatch</li>\
						<li>2- League of legends</li>\
						<li>3- World of Warcraft</li>\
						<li>4- Starcraft</li>\
						<li>5- Dota2</li>\
						<li>6- Rocket League</li>\
						<li>7- Call of Duty</li>\
						<li>8- Counter Strike Go</li>\
						<li>9- Binding of Isaac</li>\
						<li>10- Path of Exile</li>\
						<li>11- Hearthstone</li>\
						<li>12- Smite</li>\
						<li>13- Heroes of the Storm</li>\
						<li>14- Battlefield</li>\
						<li style="padding-top:20px">أو أي لعبة أخرى تستمتع باللعب بها كل ما تحتاجه هو أن تتصل بنا وسوف نقول لكم كيف يمكنك</li>\
						<li style="padding-bottom:20px">البث على الانترنت وأنتتلعب وجعلها مهنة لك.</li>\
						<li>متطلبات:</li>\
						<li>اتصال إنترنت ثابت لا يقل عن 2 mb/s .</li>\
						<li>معرفة كبيرة في الألعاب التي تختارها حتى تتمكن من التواصل مع جمهورك</li>\
						<li>ساعات في اليوم الواحد( على أتم الاستعداد لإكمال الأهداف اليومية)</li>\
						<li>يجب أن يستخدم اللاعبون اللغة العربية في البث .</li>\
						<li>يجب أن يكون 16 سنة فما فوق</li>\
						<li style="padding-top:20px">للمزيد من المعلومات، يرجى الاتصال بنا : </li>\
						<li style="padding-bottom:20px">البريد الإلكتروني  games@7nujoom.com</li>\
					</ul>\
				</div>\
				<div class="btns">\
					<div class="btn_close">تأكيد</div>\
				</div>\
			</div>\
		</div>',
		'SUBSUCCESS': '	<div class="notice_popup submitPop">\
		                    <div class="notice_wrap">\
		                        <div class="title">notice</div>\
		                        <div class="content">Submit success</div>\
		                        <div class="btns">\
									<div class="btn_close">OK</div>\
								</div>\
							</div>\
		                </div>',
		'SUBFAILED': '	<div class="notice_popup submitPop">\
		                    <div class="notice_wrap">\
		                        <div class="title">notice</div>\
		                        <div class="content">Submit failed</div>\
		                        <div class="btns">\
									<div class="btn_close">OK</div>\
								</div>\
							</div>\
		                </div>'
                
    };

    var Page = window.Page =  {
        run: function() {
            this.load();
            this.render();
            this.compose();
            this.bind();
            this.start();
        },
        load: function() {
			
        },
        render: function() {
            this.container = $('#container');
            this.container.removeClass("arabic")
            this.container.i18nHTML(Header.html() + TEMPLATE.MAIN + Footer.html());
            this.container.find('[data-role="ce_nav"]').i18nHTML(_nav.html());
            this.container.find('[data-role="task"]').i18nHTML(_task.html());
        },
        compose: function() { 
            this.language=1;
            
            Header.init({
                'container': this.container
            });
            _nav.init({
                'container': this.container
            });
             _task.init({
                'container': this.container
            });
            //UserTop.init({'container':this.container,'cur':'menu_sysmessage'});
            
            this.getGameNames();
        },
        bind: function() {
            var _this=this;
           	$("#gameName").on('click', function (evt) {
           		_this.showGameName();
            }.bind(this));
            
			$("#signSubmit").click(function(evt){
				_this.submitSign();
			}.bind(this));
            $(".con-left").click(function(evt){
				_this.showPopEn();
			}.bind(this));
            $(".con-right").click(function(evt){
				_this.showPopAr();
			}.bind(this));
            
        },
        start: function() {
        	
        },
        getGameNames:function(){
        	$.ajax({
                type: "GET",
                url: system_info.base_attr.domain + "data/static/v4/?roomtag",
                cache: false,
                dataType: "json",
                success: function (data) {
                    var gametag=[];
                    $.each(data.dataInfo.roomtag.d, function(index,value) {
                    	if(value.id==106){
                    		gametag=value.sn;
                    	}
                    });
                    $(".gameList").empty();
                    $.each(gametag, function(index,value) {
                     		var gameName = value.lg.en;
                     		if($("#container").hasClass("arabic")){
                     			gameName = value.lg.ar;
                     		}
                    		$("#gameList").append($("<li class='tagitem' id='"+value.id+"'>"+gameName+"</li>"))
                    });
                    var taglistPanel = $("#gameList").parent()[0];
            		Ps.initialize(taglistPanel);
                    $(".tagitem").click(function(evt){
						var target = $(evt.target);
						$(".tagitem").removeClass("selected");
						target.addClass("selected");
						$("#gameName").val($(target).html());
						$("#gameId").val($(target).attr("id"));
						$(".taglistPs").addClass("hidden");
					}.bind(this));
                }
                
            });
        },
        showGameName: function() {
            $(".taglistPs").removeClass("hidden");
        },
        submitSign:function(){
        	var _this=this;
        	var fullName = $("#fullName").val(),
	        	email = $("#email").val(),
	        	whatsappNumber = $("#whatsappNumber").val(),
	        	facebookLink = $("#facebookLink").val(),
	        	gameId = $("#gameId").val(),
	        	gameName = $("#gameName").val(),
	        	locationCountry = $("#locationCountry").val(),
	        	rank = $("#rank").val();
        	if(!fullName || fullName==null){
        		$("#fullName").focus();
        		return;
        	}else if(!email || email==null){
        		$("#email").focus();
        		return;
        	}else if(!whatsappNumber || whatsappNumber==null){
        		$("#whatsappNumber").focus();
        		return;
        	}else if(!facebookLink || facebookLink==null){
        		$("#facebookLink").focus();
        		return;
        	}else if(!gameName || gameName==null){
        		$("#gameName").focus();
        		return;
        	}else if(!locationCountry || locationCountry==null){
        		$("#locationCountry").focus();
        		return;
        	}else if(!rank || rank==null){
        		$("#rank").focus();
        		return;
        	}		
        	var users = Cookie.get(Cookie.key['user_info']);
        	var userId = 0;
        	if (users){
        		users = JSON.parse(users);
        		userId = users.userId;
        	}
               
        	var dataObjs = {	
				userId:userId,
				fullName:fullName,
				userEmail:email,
				whatsappNum:whatsappNumber,
				fbLink:facebookLink,
				gameId:gameId,
				gameName:gameName,
				location:locationCountry,
				rank:rank
			};
        	Bussiness.postData('service/room/v3/host/rgs',dataObjs,function(data){
               if(data.code==0){
                	$('#container').append(TEMPLATE.SUBSUCCESS);
					_this.closePop();
                }else{
                	$('#container').append(TEMPLATE.SUBFAILED);
					_this.closePop();
                }
            }.bind(this))
        },
        showPopEn:function(){
        	$('#container').append(TEMPLATE.POPUPEN);
        	var popupEnListsPanel = $("#popupEnLists").parent()[0];
            Ps.initialize(popupEnListsPanel);
        	this.closePop();
        },
        showPopAr:function(){
        	$('#container').i18nAppend(TEMPLATE.POPUPAR);
        	var popupArListsPanel = $("#popupArLists").parent()[0];
            Ps.initialize(popupArListsPanel);
        	this.closePop();
        },
        closePop:function(){
        	$(".btn_close").click(function(evt){
				$(".notice_popup").remove();
			})
        }
    };

    I18N.init(null,true).localize(null,Page.run.bind(Page));

});