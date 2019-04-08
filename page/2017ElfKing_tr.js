define(function(require){
    var Kit = require('component/kit');
    var Bussiness = Kit.use('Bussiness');
    var Utility = require('common/utility');
    var Promise = Utility['Promise'];
    var stringFormat = Utility['String']['stringFormat'];
    var Bridge=Utility['Bridge'];
	var	Cookie = Utility['Cookie'];

    var TEMPLATE={
            'Main':'<div class="content">\
            <div class="banner">\
            	<img class="title" src="../resource/static/image/2017ElfKing_tr/title_ar.png" />\
				<p class="time">Etkinlik Tarihi: 26 Mayıs - 1 Haziran</p>\
				<img class="lamp" src="../resource/static/image/2017ElfKing_tr/lamp.png" />\
				<div class="luckDraw">\
					<div id="draw10">\
						<span><img src="../resource/static/image/2017ElfKing_tr/icon.png" /><b>99</b></span>\
						<div>10 Kez Ovala</div>\
					</div>\
					<div id="draw1">\
						<span style="display:none;">Bedava</span>\
						<span style="display:block;"><img src="../resource/static/image/2017ElfKing_tr/icon.png" /><b>10</b></span>\
						<div>1 Kez Ovala</div>\
					</div>\
				</div>\
				<div class="bannerRule">Lamba ovalayarak 100% kazanma şansı! En fazla 111 Lamba Cini, sınırsız Elmas ve muhteşem binekler bu lambalarda!  </div>\
			</div>\
			<div class="king">\
				<div>\
					<div class="allKing">\
						<h3>Lambanın Sahibi</h3>\
						<div><span class="name"></span><span class="pic"><img src="../resource/static/image/2017ElfKing_tr/pic.png"><span></div>\
						<span class="allGain">Tüm ovalamanızın toplamı olarak <b></b> adet Lamba Cini <img class="jinnicon" src="../resource/static/image/2017ElfKing_tr/jinngift.png"/> çıkardınız!</span>\
					</div>\
					<div class="luckKing">\
						<h3>Lambanın Şanslı Sahibi</h3>\
						<div><span class="name"></span><span class="pic"><img src="../resource/static/image/2017ElfKing_tr/pic.png"><span></div>\
						<span class="luckGain"> Tek ovalamadan <b></b> adet Lamba Cini <img class="jinnicon" src="../resource/static/image/2017ElfKing_tr/jinngift.png"/> çıkardınız! </span>\
					</div>\
				</div>	\
				<div class="kingRule">\
				<p>Lambayı <b class="usertime"></b> kez ovaladım, toplamda <b class="userall"></b> Lamba Cini çıkardım   <img class="jinnicon" src="../resource/static/image/2017ElfKing_tr/jinngift.png"/> , Tek ovalamada en fazla  <b class="usermost"></b>  Lamba Cini <img class="jinnicon" src="../resource/static/image/2017ElfKing_tr/jinngift.png"/>  çıkardım! .\
				</p>\
				</div>\
				<p class="rule">* Aynı Lamba Cini sayısına sahip iki kullanıcıdan, yalnızca ovalama sayısı daha fazla olan kazanır!</p>\
			</div>\
			<div class="anchor">\
				<span>En Popüler Lamba Sahibi : En çok Lamba Cini <img class="jinnicon" src="../resource/static/image/2017ElfKing_tr/jinngift.png"/> çıkaran ilk 5 yayıncı </span>\
				<dl id="pos">\
					<dd class="pos3"><img src="../resource/static/image/2017ElfKing_tr/poster.png"/></dd>\
					<dd class="pos4"><img src="../resource/static/image/2017ElfKing_tr/poster.png"/></dd>\
					<dd class="pos5"><img src="../resource/static/image/2017ElfKing_tr/poster.png"/></dd>\
					<dd><img src="../resource/static/image/2017ElfKing_tr/poster.png"/></dd>\
					<dd><img src="../resource/static/image/2017ElfKing_tr/poster.png"/></dd>\
				</dl>\
			</div>\
			<div class="userInfo">\
				<h3>Etkinlik Kuralları :</h3>\
				<p>1. Her kullanıcı günde yalnızca 1 kez lambayı ovalayabilir. Daha fazla lambayı ovalamak isteyen kullanıcılarımız 10 Pul ödeyerek bir ovalama hakkı satın alabilir yada tek seferde 10 ovalama hakkı satın alabilir. Lambadan; Lamba Cini, Elmas yada Binek çıkabilir. (Lamba Cini çıkan kullanıcılarımız, Çantasını kontrol edebilir)</p>\
				<p>2. Lamba Cini Sahibi: Toplamda en çok Lamba Cini <img class="jinnicon" src="../resource/static/image/2017ElfKing_tr/jinngift.png"/> çıkaran kullanıcımız, etkinlik bitiminden sonra ödül olarak 10.000 pul ve 7 günlük Lamba Cini Sahibi rozeti kazanacaktır.</p>\
				<p>3. Şanslı Lamba Cini Sahibi: Tek seferde en çok Lamba Cini <img class="jinnicon" src="../resource/static/image/2017ElfKing_tr/jinngift.png"/> hediyesi çıkaran kullanıcımız, etkinlik bitiminden sonra 5000 pul ve 7 günlük Şanslı Lamba Cini Sahibi rozeti kazanacaktır.</p>\
				<p>4. Popüler Lamba Cini Sahibi: Etkinlik bitiminden sonra, en çok Lamba Cini <img class="jinnicon" src="../resource/static/image/2017ElfKing_tr/jinngift.png"/> çıkaran ilk 3 yayıncımız sıralamalarına göre sırasıyla 300 TL, 200 TL ve 100 TL kazanacaktır.</p>\
			</div>\
			<div class="backtop" id="backtop">\
				<img src="../resource/static/image/2017ElfKing_tr/backtop.png" />\
			</div>\
			<div class="slideShow" id="slideShow">\
			<p class="slideContent"></p>\
			</div>\
			<div class="drawResult" id="drawResult">\
				<div class="bg"></div>\
				<div class="smoke" id="smoke">\
					<img src="../resource/static/image/2017ElfKing_tr/smoke_assets/11.png"/>\
					<img src="../resource/static/image/2017ElfKing_tr/smoke_assets/jinn.png"/>\
					<img src="../resource/static/image/2017ElfKing_tr/smoke_assets/1.png"/>\
					<img class="close" src="../resource/static/image/2017ElfKing_tr/close.png"/>\
					<div id="gift"></div>\
				</div>\
			</div>\
			<div class="1101bg" style="display:none;position: fixed;top: 0rem;left: 0rem;color: #fff;z-index: 111111;font-size: 0.2rem;text-align: center;">\
			<div style="position:absolute;top: 0rem;left: 0rem;background: #000;opacity: 0.8;width:100%;height:100%"></div>\
			<p style="position:absolute;top: 0rem;left: 0rem;z-index: 1111111;width:100%;margin-top:1rem;">انتهاء النشاط</p>\
			</div>\
			</div>'

        };

    var Page= {
        'run': function () {
            this.load();
        },
//      请求数据
        'load': function () {
            this.container = $('#container');
            this.sMain =stringFormat(TEMPLATE.Main);
            this.container.html( this.sMain );
        	$(".1101bg").width($(window).width());
        	$(".1101bg").height($(window).height());
            this.loginKey = Utility.URL.queryString('login_key');
            if(this.loginKey==""||this.loginKey==undefined){
            	this.loginKey = Utility.URL.queryString('loginKey');
            }
            var sUrl='service/activity/v3/17?type=1&loginKey='+this.loginKey;
            console.log(sUrl)
            Bussiness.getData(sUrl,function(data){
            	console.log(data)
                 if (data.code==0) {
                 	this.data=data.dataInfo;
					this.render();
                 }else if(data.code==1101){
                 	$(".1101bg").show();
                 }
            }.bind(this),null,'isV3');
        },
        'render': function () {
            this.setnum();
            this.dynamic();
            this.bind();
        },
        'compose': function () {
			
        },
        'setnum':function(){
        	$("#drawResult").width($(window).width());
        	$("#drawResult").height($(window).height());
        	console.log($("#drawResult").width());
//      	console.log(this.data)
//      是否免费
console.log(this.loginKey)
        	if(this.data.userDayFreeNum!=0||this.loginKey==''||this.loginKey==undefined){
				$("#draw1").children("span").eq(0).show();
				$("#draw1").children("span").eq(1).hide();
				$("#draw1").children("div").addClass("drawLight");
			}
//			幸运王
			$(".allKing").children("div").children().eq(0).html(this.data.luckyName);
			$(".allKing").children("div").children().eq(1).children("img").attr("src","../resource/"+this.data.luckyPic);
			$(".allGain").children("b").html(this.data.giftNum);
			$(".luckKing").children("div").children().eq(0).html(this.data.singleLuckyName);
			$(".luckKing").children("div").children().eq(1).children("img").attr("src","../resource/"+this.data.singleLuckyPic);
			$(".luckGain").children("b").html(this.data.singleGiftNum);
			$(".pic").children("img").error(function(){
				$(this).attr("src","../resource/static/image/2017ElfKing_tr/pic.png");
				
			})
//			自己的数据
			$(".usertime").html(this.data.userDrawNum);
			$(".usermost").html(this.data.userSingleLuckyNum);
			$(".userall").html(this.data.userLuckyNum);
//			主播前五
			$.each(this.data.hostRank, function(index,val) {
				$("#pos").children("dd").eq(index).children("img").attr("src","../resource/"+val.pic);
			});
			$("#pos").children("dd").children("img").error(function(){
				$(this).attr("src","../resource/static/image/2017ElfKing_tr/poster.png")
			})
//			轮播信息
			var _this=this;
			$.each(this.data.crouselRank,function(index,val){
				console.log();
				if(val.name.length>9){
//					console.log(val.name)
					val.name=val.name.slice(0,3)+"***"+val.name.slice(val.name.length-3,val.name.length);
//					console.log(val.name)
				}
				if(val.giftNum>=_this.data.minGiftNum){    //jinn  
					var slide='<span> '+ val.name +' , '+val.giftNum+' adet <img class="iconslide" src="../resource/static/image/2017ElfKing_tr/jinngift.png"/> kazandı! </span>'
					$(".slideContent").append(slide);
				}
				if(val.fanNum>=_this.data.minFanNum){  //钻石
					var slide='<span> '+ val.name +' , '+val.fanNum+' adet <img class="iconslide" src="../resource/static/image/2017ElfKing_tr/diamondgift.png"/> kazandı! </span>'
					$(".slideContent").append(slide);
				}
				if(val.expire>=_this.data.minExpire){	//座驾
					var slide='<span> '+ val.name +' , '+val.expire+' adet <img class="iconslide" src="../resource/static/image/2017ElfKing_tr/cargift.png"/> kazandı! </span>'
					$(".slideContent").append(slide);
				}
			})
			this.slide();
        },
//      主播动画效果&回到顶部&轮播消息
        'dynamic': function(){
        	//	主播滑动效果
	var centerpos=1;
	$("#pos").bind("swipeleft",function(){
		if(centerpos==1){
			$(this).children().eq(0).removeClass().addClass("pos2").next().removeClass().addClass("pos3").next().removeClass().addClass("pos4").next().removeClass().addClass("pos5");
		}else if(centerpos==2){
			$(this).children().eq(0).removeClass().addClass("pos1").next().removeClass().addClass("pos2").next().removeClass().addClass("pos3").next().removeClass().addClass("pos4").next().removeClass().addClass("pos5");
		}else if(centerpos==3){
			$(this).children().eq(0).removeClass().addClass("pos6").next().removeClass().addClass("pos1").next().removeClass().addClass("pos2").next().removeClass().addClass("pos3").next().removeClass().addClass("pos4");
		}else if(centerpos==4){
			$(this).children().eq(1).removeClass().addClass("pos6").next().removeClass().addClass("pos1").next().removeClass().addClass("pos2").next().removeClass().addClass("pos3");
		}
		centerpos+=1;
	})
	$("#pos").bind("swiperight",function(){
		if(centerpos==5){
			$(this).children().eq(0).removeClass().next().removeClass().addClass("pos1").next().removeClass().addClass("pos2").next().removeClass().addClass("pos3").next().removeClass().addClass("pos4");
		}else if(centerpos==4){
			$(this).children().eq(0).removeClass().addClass("pos1").next().removeClass().addClass("pos2").next().removeClass().addClass("pos3").next().removeClass().addClass("pos4").next().removeClass().addClass("pos5");
		}else if(centerpos==3){
			$(this).children().eq(0).removeClass().addClass("pos2").next().removeClass().addClass("pos3").next().removeClass().addClass("pos4").next().removeClass().addClass("pos5").next().removeClass().addClass("pos7");	
		}else if(centerpos==2){
			$(this).children().eq(0).removeClass().addClass("pos3").next().removeClass().addClass("pos4").next().removeClass().addClass("pos5").next().removeClass().addClass("pos7");	
		}
		centerpos-=1;
	})
//	回到顶部出现
	$(document).bind("scrollstop",function(){
		if($(window).height()<$(window).scrollTop()){
			$("#backtop").show();
		}else{
			$("#backtop").hide();
		}
	})
//	回到顶部点击
	$("#backtop").bind("tap",function(){
		$('body,html').animate({ scrollTop: 0 }, 300);
        return false;
	})
        },
//  轮播动画  
    'slide':function(){
    	//	中奖信息
    	setInterval(function(){
    		$(".slideContent").animate({"left":"-6.4rem"},3000,
    		function(){
				$(".slideContent").css("left","0");	
    			$(".slideContent").children().last().after($(".slideContent").children().first());
    		});
    	},3500)
    },
//  抽奖动画
	'smoke':function(time,datas){
		$("#drawResult").show();
		var sheight=$(window).height()/2;
		$("#smoke").css("top",sheight);
//		礼物函数
		var _this=this;
        function gift(){
        	var usertimes=parseInt($(".usertime").html());
        	var usermosts=parseInt($(".usermost").html());
        	var useralls=parseInt($(".userall").html());
//      	console.log(usertimes)
//      	console.log(usermosts)
//      	console.log(useralls)
        	usertimes=usertimes+time;
        	$("#gift").show();
        	console.log(datas)
			if(datas.name.length>9){
					datas.name=datas.name.slice(0,3)+"***"+datas.name.slice(datas.name.length-3,datas.name.length);
			}
//      	抽一次
        	if(time==1){
        		$("#gift").append('<dl class="gift1"></dl>');
//      		jinn蓝鬼
				if(datas.rank[0].giftNum!=0){
					useralls=useralls+datas.rank[0].giftNum;
					if(datas.rank[0].giftNum>usermosts){
						usermosts=datas.rank[0].giftNum;
					}
//					如果达标轮播
				if(datas.rank[0].giftNum>=_this.data.minGiftNum){ 
					var slide='<span> '+datas.name+' , '+datas.rank[0].giftNum+' adet <img class="iconslide" src="../resource/static/image/2017ElfKing_tr/jinngift.png"/> kazandı! </span>'
					$(".slideContent").children().first().after(slide);
					}
//				添加数据
        		var giftcontent='<dd><img src="../resource/static/image/2017ElfKing_tr/drawLight.png"><img src="../resource/static/image/2017ElfKing_tr/jinngift.png"><span class="giftnum">'+datas.rank[0].giftNum+'</span></dd>';
        		$(".gift1").append(giftcontent);
				}
//				钻石
				if(datas.rank[0].fanNum!=0){
//					如果达标轮播
				if(datas.rank[0].fanNum>=_this.data.minFanNum){  
					var slide='<span> '+datas.name+' , '+datas.rank[0].fanNum+' adet <img class="iconslide" src="../resource/static/image/2017ElfKing_tr/diamondgift.png"/> kazandı! </span>'
					$(".slideContent").children().first().after(slide);
					}
//				添加数据
        		var giftcontent='<dd><img src="../resource/static/image/2017ElfKing_tr/drawLight.png"><img src="../resource/static/image/2017ElfKing_tr/diamondgift.png"><span class="giftnum">'+datas.rank[0].fanNum+'</span></dd>';
        		$(".gift1").append(giftcontent);
				}
				//				座驾
				if(datas.rank[0].expire!=0){
//					如果达标轮播
				if(datas.rank[0].expire>=_this.data.minExpire){  
					var slide='<span> '+datas.name+' , '+datas.rank[0].expire+' adet <img class="iconslide" src="../resource/static/image/2017ElfKing_tr/cargift.png"/> kazandı! </span>'
					$(".slideContent").children().first().after(slide);
					}
//				添加数据
        		var giftcontent='<dd><img src="../resource/static/image/2017ElfKing_tr/drawLight.png"><img src="../resource/static/image/2017ElfKing_tr/cargift.png"><span class="giftnum">'+datas.rank[0].expire+'</span></dd>';
        		$(".gift1").append(giftcontent);
				}
				$(".giftnum").show();
				setTimeout(function(){
        		$(".close").show();  
        		},3000)	
//      	抽十次	
        	}else if(time==10){
        		$("#gift").append('<dl class="gift10"></dl>');
        		$.each(datas.rank,function(index,val){
					useralls=useralls+datas.rank[index].giftNum;
					if(datas.rank[index].giftNum>usermosts){
						usermosts=datas.rank[index].giftNum;
					}
        		var giftcontent="<dd>";
//      			console.log(val)
        			//      		jinn蓝鬼
				if(val.giftNum!=0){
//					如果达标轮播
				
				if(val.giftNum>=_this.data.minGiftNum){ 
					var slide='<span> '+datas.name+' , '+val.giftNum+' adet <img class="iconslide" src="../resource/static/image/2017ElfKing_tr/jinngift.png"/> kazandı! </span>'
					$(".slideContent").children().first().after(slide);
					}
//				添加数据
        		giftcontent=giftcontent+'<div><img src="../resource/static/image/2017ElfKing_tr/drawbg.png"><img src="../resource/static/image/2017ElfKing_tr/drawLight.png"><img src="../resource/static/image/2017ElfKing_tr/jinngift.png"><span class="giftnum">'+val.giftNum+'</span></div>';
				}
//				钻石
				if(val.fanNum!=0){
//					如果达标轮播
				if(val.giftNum>=_this.data.minFanNum){ 
					var slide='<span> '+datas.name+' , '+val.fanNum+' adet <img class="iconslide" src="../resource/static/image/2017ElfKing_tr/diamondgift.png"/> kazandı! </span>'
					$(".slideContent").children().first().after(slide);
					}
//				添加数据
        		giftcontent=giftcontent+'<div><img src="../resource/static/image/2017ElfKing_tr/drawbg.png"><img src="../resource/static/image/2017ElfKing_tr/drawLight.png"><img src="../resource/static/image/2017ElfKing_tr/diamondgift.png"><span class="giftnum">'+val.fanNum+'</span></div>';
				}
//				座驾
				if(val.expire!=0){
//					如果达标轮播
				if(val.expire>=_this.data.minExpire){ 
					var slide='<span> '+datas.name+' , '+val.expire+' adet <img class="iconslide" src="../resource/static/image/2017ElfKing_tr/cargift.png"/> kazandı! </span>'
					$(".slideContent").children().first().after(slide);
					}
//				添加数据
        		giftcontent=giftcontent+'<div><img src="../resource/static/image/2017ElfKing_tr/drawbg.png"><img src="../resource/static/image/2017ElfKing_tr/drawLight.png"><img src="../resource/static/image/2017ElfKing_tr/cargift.png"><span class="giftnum">'+val.expire+'</span></div>';
				}
        		giftcontent=giftcontent+"</dd>";
//      		console.log(giftcontent)
        		$(".gift10").append(giftcontent);
        	})
        		var delindex=0;
        	function del10(){
        		if(delindex!=9){
        			$(".gift10").children("dd").eq(delindex).children("div").children().show();
        			delindex+=1;
        		}else{
        			$(".gift10").children("dd").eq(delindex).children("div").children().show();
        			clearInterval(del10timer);
        			delindex=0;
        		}
        	}
        	del10timer=setInterval(del10,1000);
        	
			setTimeout(function(){
        		$(".close").show();  
        	},10000)	
        	}
//      	console.log(usertimes)
//      	console.log(usermosts)
//      	console.log(useralls)
        	$(".usertime").html(usertimes);
			$(".usermost").html(usermosts);
			$(".userall").html(useralls);
			_this.bind();
        }
        
		var num=1;
		var nums=0;
//		白烟动画
		function a(){
			timer=setInterval(function(){
				if(num<10){
				num+=1;
				picurl="../resource/static/image/2017ElfKing_tr/smoke_assets/"+num+".png";
				$("#smoke").children("img").eq(2).attr("src",picurl);
				}else{
					if(nums==0){
						num=1;
						nums=1;
					}else{
						clearTimeout(timer);
						$("#smoke").children("img").eq(2).hide();
						$("#smoke").children("img").eq(1).attr("src","../resource/static/image/2017ElfKing_tr/jinngray.png");
						gift();
					}
				}
			},100);
		}
//		黄烟动画
		$("#smoke").children("img").eq(0).addClass("fog");
//		出来鬼
		setTimeout(function(){
			$("#smoke").children("img").eq(1).addClass("jinnshow").show().next("img").show();
			a();
        },2000);
	},
	'buss':function(){
		  var sUrl='service/activity/v3/17?type=1&loginKey='+this.loginKey;
            Bussiness.getData(sUrl,function(data){
            	console.log(data)
                 if (data.code==0) {
                 	this.data=data.dataInfo;
                 	this.container = $('#container');
            		this.container.html("");
           	 		this.sMain =stringFormat(TEMPLATE.Main);
            		this.container.html(this.sMain);
					this.render();
                 }
            }.bind(this),null,'isV3');
	},
    'toLoginFollow':function(){
    	 var that=this;
            var sMakeLink= Bridge.link.logic('login',null,function(login_key){ //Bridge 登录
          		that.loginKey=login_key;
                that.buss();
            });
            Bridge.callNative(sMakeLink);
        },
        
        'toPay':function(){
           var that=this;
            var sMakeLink= Bridge.link.logic('pay',null,function(){ //Bridge 登录
                that.buss();
            });
            Bridge.callNative(sMakeLink);
        },
//	抽奖次数
		'drawtime' :function(time){
//			请求抽奖
            var sUrl='service/activity/v3/17?type=2&loginKey='+this.loginKey+'&num='+time+'&activityId='+this.data.activityId;
//			console.log(sUrl)
            Bussiness.getData(sUrl,function(datas){
			console.log(datas)
//			console.log(time)
                 if (datas.code==0) {
                 	if(time==1){
                 		$("#draw1").children("div").removeClass("drawLight");
                 		$("#draw1").children("span").eq(0).hide();
                 		$("#draw1").children("span").eq(1).show();
                 	}
                 	datas=datas.dataInfo;
					this.smoke(time,datas); 
				}else if(datas.code==35){
					console.log("金币不足")
					this.toPay();
					this.bind();
				}else if(datas.code==1102){
					this.toLoginFollow();
					this.bind();
				}
            }.bind(this),null,'isV3');
			
		},
        'bind': function () {
        	var _this=this;
			$("#draw10 div").bind("click",function(){
        		$("#gift").html("");
				_this.drawtime(10);
				$(this).addClass("btnactive");
				if(_this.loginKey!=''&&_this.loginKey!=undefined){
					$(".luckDraw").children("div").children("div").unbind();
				}
			})
			$("#draw1 div").bind("click",function(){
        		$("#gift").html("");
				_this.drawtime(1);
				$(this).addClass("btnactive");
				if(_this.loginKey!=""&&_this.loginKey!=undefined){
					$(".luckDraw").children("div").children("div").unbind();
				}
			})
			$(".close").bind("click",function(){
				$(this).hide();
				$("#drawResult").hide();
				$("#smoke").children("img").eq(0).removeClass("fog");
				$("#smoke").children("img").eq(1).removeClass("jinnshow");
				$("#smoke").children("img").eq(1).hide();
				$("#draw1 div").removeClass("btnactive")
				$("#draw10 div").removeClass("btnactive");
				$("#smoke").children("img").eq(1).attr("src","../resource/static/image/2017ElfKing_tr/jinn.png");
			})
			
        },
		

    }
    Page.run();
});

