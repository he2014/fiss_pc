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
               "MAIN":'<div class="main">\
               				<div class="list" id="list_1">\
               					<div class="listDonw hidden">\
               						<div class ="titles">\
               							<div class="title1"></div>\
               							<div class="pic1"></div>\
               						</div>\
               						<ul class="hostList_big"></ul>\
               						<div class="samllTab_big"><span></span></div>\
               					</div>\
               					<div class="listUp" id="11111">\
               						<div class ="titles">\
               							<div class="title1"></div>\
               							<div class="pic1"></div>\
               						</div>\
               						<ul class="hostList_sam"></ul>\
               						<div class="samllTab_sam"><span></span></div>\
               					</div>\
               				</div>\
               				<div class="list" id="list_2">\
               					<div class="listDonw hidden">\
               						<div class ="titles">\
               							<div class="title2"></div>\
               							<div class="pic2"></div>\
               						</div>\
               						<ul class="hostList_big"></ul>\
               						<div class="samllTab_big"><span></span></div>\
               					</div>\
               					<div  class="listUp">\
               						<div class ="titles">\
               							<div class="title2"></div>\
               							<div class="pic2"></div>\
               						</div>\
               						<ul class="hostList_sam"></ul>\
               						<div class="samllTab_sam"><span></span></div>\
               					</div>\
               				</div>\
               				<div class="list" id="list_3">\
               					<div class="listDonw hidden">\
               						<div class ="titles">\
               							<div class="title3"></div>\
               							<div class="pic3"></div>\
               						</div>\
               						<ul class="hostList_big"></ul>\
               						<div class="samllTab_big"><span></span></div>\
               					</div>\
               					<div class="listUp">\
               						<div class ="titles">\
               							<div class="title3"></div>\
               							<div class="pic3"></div>\
               						</div>\
               						<ul class="hostList_sam"></ul>\
               						<div class="samllTab_sam"><span></span></div>\
               					</div>\
               				</div>\
               				<div class="list" id="list_4">\
               					<div class="listDonw hidden">\
               						<div class ="titles">\
               							<div class="title4"></div>\
               							<div class="pic4"></div>\
               						</div>\
               						<ul class="hostList_big"></ul>\
               						<div class="samllTab_big"><span></span></div>\
               					</div>\
               					<div class="listUp">\
               						<div class ="titles">\
               							<div class="title4"></div>\
               							<div class="pic4"></div>\
               						</div>\
               						<ul class="hostList_sam"></ul>\
               						<div class="samllTab_sam"><span></span></div>\
               					</div>\
               				</div>\
               				<div class="list" id="list_5">\
               					<div class="listDonw hidden">\
               						<div class ="titles">\
               							<div class="title5"></div>\
               							<div class="pic5"></div>\
               						</div>\
               						<ul class="hostList_big"></ul>\
               						<div class="samllTab_big"><span></span></div>\
               					</div>\
               					<div class="listUp">\
               						<div class ="titles">\
               							<div class="title5"></div>\
               							<div class="pic5"></div>\
               						</div>\
               						<ul class="hostList_sam"></ul>\
               						<div class="samllTab_sam"><span></span></div>\
               					</div>\
               			</div>\
               			<div class="footers"></div>'
            
        };



    var Page={
        run:function(){
            this.render();
            this.start();
        },
        
        render:function(){
            var header = '<div class="headers"></div>';
            $("body").prepend(header);
           this.container = $("#container");
           this.container.html(stringFormat(TEMPLATE.MAIN));
           this.cach = {};

           
        },
        start:function(){
				var _this = this;
				var path = DOMAIN_CONFIG['SITE_DOMAIN'];
				$.ajax({
						url:path+"service/activity/v3/18?type=1",
//						url:"/resource/static/js/page/2.json",
						type:"get",
						dataType:"json",
						success:function(data){
							console.log(data)
							if(data.code==0){
								$.each(data["dataInfo"], function(index,item) {
									_this.renderList(item["hostRank"],item.sortNum);
								});
								
							}
						}
				})
        },
        getImgPath:function(url){
        	var path = ''
        	if(url){
        		path=DOMAIN_CONFIG['SITE_DOMAIN']+"resource/"+url;
        	}else{
        		path=DOMAIN_CONFIG['SITE_DOMAIN'] + "/Administor/image/nophoto.jpg";
        	}
        	return path;
        },
        renderList:function(giftdatas,sortNum){
        	var _this = this;
        	if(giftdatas&&giftdatas.length!=0){
        		var list = giftdatas;
        		var html = "",htmlAll="";
        		$.each(list, function(val,item) {
    				if(val<10){
    					htmlAll+='<li><div>'+item["num"]+'</div><div><i>'+item["userName"]+'</i><img src="'+_this.getImgPath(item["userPic"])+'"/><span>'+(val+1)+'</span></div></li>';
  					}
  					if(val<3){
  						html+='<li><div>'+item["num"]+'</div><div><i>'+item["userName"]+'</i><img src="'+_this.getImgPath(item["userPic"])+'"/><span>'+(val+1)+'</span></div></li>';
  					}
        		});
        		
        		$("#list_"+sortNum+">.listUp>.hostList_sam").html(html);
        		$("#list_"+sortNum+">.listDonw>.hostList_big").html(htmlAll);
        		
        		$(".samllTab_sam>span").on('click',function(elt){
        			var target = $(elt.target);
        			var par = target.parent().parent();
        			par.addClass("hidden");
        			var prevPar =par.prev();
        			prevPar.removeClass("hidden");
        		})
        		$(".samllTab_big>span").on('click',function(elt){
        			var target = $(elt.target);
        			var par = target.parent().parent();
        			par.addClass("hidden");
        			var nextPar =par.next();
        			nextPar.removeClass("hidden");
        		})
        	}
        }
    };
    Page.run();
});


