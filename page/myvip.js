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
        _nav=Body.nav,
        Footer=Body.Footer,
        Lazyload=Kit.use('Lazyload'),
        Trigger=Kit.use('Trigger'),
        Bussiness = Kit.use('Bussiness');
    var Popup = require('component/popup');

    var IMAGE_DOMAIN =DOMAIN_CONFIG['IMAGE_DOMAIN'],fullDefaultHead = IMAGE_DOMAIN + 'systemRes/img/default/nophoto.jpg';
    var language_NUM={
        'ar':1,
        'en':2,
        'tr':3,
        'es':4,
        'pt':5,
        'pl':6,
        'in':7
    };

    var TEMPLATE={
        'MAIN':'<div data-role="vipContainer" class="myvip clearfix"></div>',
        'NO_VIP':'<div class="no_vip">\
                        <div class="vip_wrap clearfix">\
                            <div class="vip_block">\
                                <div data-role="vip" class="vip_top">\
                                    <p class="vip_icon"><img src="/resource/static/image/store/Vip_icon.png"></p>\
                                     <div data-role="vipUl"></div>\
                                    <a class="btn_buy_vip" href="javascript:;" data-i18n="Store_Renew" data-stat="Store_Vip_Renew">{{Store_Renew}}</a>\
                                </div>\
                            </div>\
                            <div class="svip_block">\
                                <div data-role="svip" class="svip_top">\
                                    <p class="vip_icon"><img src="/resource/static/image/store/Svip_icon.png"></p>\
                                    <div data-role="svipUl">\
                                    </div>\
                                    <a class="btn_buy_svip" href="javascript:;" data-i18n="Store_Renew" data-stat="Store_Vip_Renew">{{Store_Renew}}</a>\
                                </div>\
                              </div>\
                        </div>\
                </div>',
        'IS_VIP':'<div class="is_svip clearfix">\
                        <div data-role="vip" class="is_vip_block">\
                        </div>\
                        <div data-role="svip" class="is_svip_block" style="display:none;">\
                        </div>\
                    </div>',
        'VIP_BLOCK':'	 <div class="is_vip_top">\
                                <p class="is_vip_icon"><img src="/resource/static/image/store/Vip_icon.png"></p>\
                                <p class="period" id="vipText" data-role="vip_end"><span data-i18n="{4}">{2}  </span><strong>{1}</strong></p>\
                                    <a class="btn_buy_vip" href="javascript:;" data-i18n="Store_Renew" data-stat="Store_Vip_Renew">{{Store_Renew}}</a>\
                                     <div data-role="vipUl"></div>\
                            </div>',
        'SVIP_BLOCK':'<div class="is_svip_top">\
                                <p class="is_vip_icon"><img src="/resource/static/image/store/Svip_icon.png"></p>\
                                <p class="period" id="svipText"><span data-i18n="MyVip_EndTime">{{MyVip_EndTime}}  </span><strong>{0}</strong></p>\
                                <div data-role="svipUl"></div>\
                                <a class="btn_buy_svip" href="javascript:;" data-i18n="Store_Renew" data-stat="Store_Vip_Renew">{{Store_Renew}}</a>\
                            </div>',
        'VIP_ITEM':'<p data-select="vip-{3}-{2}" class="vip_price {4}" data-stat="vip-{2}">{0} <span data-i18n="Store_Days">{{Store_Days}}</span><span class="price">{1}</span><span class="price_new">{2}</span></p>\
        <a data-role="vipBuy" class="btn_renew" href="javascript:;" data-i18n="Store_Renew" data-stat="Store_Vip_Renew">{{Store_Renew}}</a>',
        'SVIP_ITEM':'<p data-select="svip-{3}-{2}" class="svip_price {4}" data-stat="svip-{2}">{0} <span data-i18n="Store_Days">{{Store_Days}}</span><span class="price">{1}</span><span class="price_new">{2}</span></p>\
                                    <a data-role="svipBuy" class="btn_renew" href="javascript:;" data-i18n="Store_Renew" data-stat="Store_Svip_Renew">{{Store_Renew}}</a>',
        'PRIVILEGE_ITEM':'<tr>\
                                <th class="alignEnd"><img src="{0}"></th>\
                                <td class="alignStart">\
                                    <h3>{1}</h3>\
                                    <p>{2}</p>\
                                </td>\
                            </tr>',
        'POP':'<div class="popup" style="display: none;">\
                    <div class="wrap clearfix">\
                        <h2 data-role="caption" class="caption">{{Store_TitleChooseAmount}}</h2>\
                        <div id="popContent">\
                        <div data-role="content" class="content">\
                            <h2>{{Store_ChooseQuantityTobuy}}</h2>\
                            <div class="sel">\
                                <div class="sel_num">\
                                    <span data-role="minus" class="minus" >-</span>\
                                    <span class="num"><input data-role="num" type="text" value="1"></span>\
                                    <span data-role="plus" class="plus" >+</span>\
                                </div>\
                                <div class="spent_block" >\
                                    <h3>{{Store_Spend}}:</h3>\
                                    <span data-role="price" class="price"></span>\
                                </div>\
                            </div>\
                            <p class="tips" style="display: none;"></p>\
                            <p class="warn" style="display: none;">{{Store_InsufficientFunds}}</p>\
                        </div>\
                        <div data-role="button" class="pop_button">\
                            <a href="javascript:;" data-role="pop-ok" class="ok" data-stat="Store_Pop_OK">{{Store_OK}}</a>\
                            <a href="javascript:;" data-role="close" class="cancel" data-stat="Store_Pop_Cancel">{{Store_Cancel}}</a>\
                        </div>\
                        </div>\
                    </div>\
                    <div class="popBg"></div>\
                </div>'
    };

    var Page =window.Page= {
        run:function(){
            this.load();
            this.render();
            this.compose();
            this.bind();
            this.start();
        },
        load:function(){
            this.cache={};
            this.myVipData = [];
            this.isVIP=false;
            this.isSVIP=false;
        },
        render:function(){
            this.container = $('#container');
            this.container.i18nHTML(Header.html() + TEMPLATE.MAIN + Footer.html());
            this.vipContainer = this.container.find('[data-role="vipContainer"]');
            this.container.find('[data-role="ce_nav"]').i18nHTML(_nav.html());
        },
        compose:function(){
            login_util.setCallback(this.identifyFlow.bind(this));
            Header.init({
                'container': this.container
            });
            _nav.init({
                'container': this.container
            });
        },
        bind:function(){

        },
        start:function(){
            this.identifyFlow();
        },
        startPromise:function(){
            var promise = new Promise(function(){
                if(this.myVipData === false || this.myVipData['vip'] ||this.myVipData['svip'] ) return true;
                Bussiness.postData('user_getUserVipInfo.fly',{},function(data){
//              	判断是否有VIP
                    if(data.code==0 && data.dataInfo.length>0){
                        $.each(data.dataInfo,function(i,item){
                            if(item.vipType==1){
                                this.myVipData['vip'] = item;	//1 :vip 2:svip
                                this.isVIP = true;
                            }else if(item.vipType==2){
                                this.myVipData['svip'] = item;
                                this.isSVIP = true;
                            }
                        }.bind(this));
                        console.log(data.dataInfo);
//                      让另一个VIP出现
                        if(data.dataInfo.length==1&&data.dataInfo[0].vipType==1){
                        	this.myVipData['svip']=data.dataInfo[0];
                        }else if(data.dataInfo.length==1&&data.dataInfo[0].vipType==2){
							this.myVipData['vip']=data.dataInfo[0];
						}
                    }else{
                        this.myVipData = false;
                    }
                    promise.resolve();
                }.bind(this));
            }.bind(this)).then(function(){
                    if(!this.isVIP && !this.isSVIP){
                        this.vipContainer.i18nHTML(TEMPLATE.NO_VIP);
                        this.promiseNoVIP();
                    }else{
                        this.vipContainer.i18nHTML(TEMPLATE.IS_VIP);
                        this.promiseIsVIP();
                    }
                    promise.resolve();
                }.bind(this));
        },
        promiseNoVIP:function(){
            var promise = new Promise(function(){
                if(this.cache['vipLists']){
                    this.renderVIP(this.cache['vipLists']);
                    return true;
                }
                Bussiness.postData('shop_list_info.fly',{
                    'language':language_NUM[I18N.language],
                    'shoptypeId':1,
                    'pagesize':10,
                    'pageNo':0
                },function(data){
//                  console.log(data);
                    if(data.code==0 && data.dataInfo){
                        this.renderVIP(this.cache['vipLists'] = this.formatVIPData(data.dataInfo.list));
                    }
                    promise.resolve();
                }.bind(this));
            }.bind(this)).then(function(){
                    if(this.cache['privilege']) return true;
                    Bussiness.getJSON('privilege/vip_privilege_data.json',function(data){
                        //约定  1:vip  2:svip
//                      console.log(data);
                        if(data.vip && data.privilege){
                            this.cache['vip']=data['vip'][1];
                            this.cache['svip'] = data['vip'][2];
                            this.cache['privilege'] = this.cache['privilege'] || {};
                            this.cache['privilege']['all'] = data['privilege'];
                            promise.resolve();
                        }
                    }.bind(this));
                }.bind(this)).then(function(){
                    if(this.cache['privilege']['en']) return true;
                    Bussiness.getJSON('privilege/en_privilege_language_data.json',function(data){
                        this.cache['privilege']['en'] = data;
                        promise.resolve();
                    }.bind(this))
                }.bind(this)).then(function(){
                    if(this.cache['privilege']['ar']) return true;
                    Bussiness.getJSON('privilege/ar_privilege_language_data.json',function(data){
                        this.cache['privilege']['ar'] = data;
                        promise.resolve();
                    }.bind(this))
                }.bind(this)).then(function(data){
                    this.renderPrivilege();
                    promise.resolve();
                }.bind(this));
        },
        promiseIsVIP:function(){
            var promise = new Promise(function(){
                var $myvipBlock = this.vipContainer.find('[data-role="vip"]');
                var $mySvipBlock = this.vipContainer.find('[data-role="svip"]');
                console.log(Object.keys(this.myVipData))
                if(Object.keys(this.myVipData).length==2 ){
                    $myvipBlock.i18nHTML(stringFormat(TEMPLATE.VIP_BLOCK,DateTime.showtime((new Date(this.myVipData['svip'].expireTime))),DateTime.showtime((new Date(this.myVipData['vip'].expireTime))),i18nTranslate('MyVip_ExpirationTime'),i18nTranslate('MyVip_startTime'),'MyVip_ExpirationTime','MyVip_startTime'));
                    $mySvipBlock.i18nHTML(stringFormat(TEMPLATE.SVIP_BLOCK,DateTime.showtime((new Date(this.myVipData['svip'].expireTime))),DateTime.countdownTime(this.myVipData['svip'].expireTime - new Date().getTime(),true),i18nTranslate('MyVip_CountDown'),'MyVip_CountDown'));
                    $mySvipBlock.show();
                }else{
                    this.myVipData['vip'] && $myvipBlock.i18nHTML(stringFormat(TEMPLATE.VIP_BLOCK,DateTime.showtime((new Date(this.myVipData['vip'].expireTime))),DateTime.countdownTime(this.myVipData['vip'].expireTime - new Date().getTime(),true),i18nTranslate('MyVip_CountDown'),i18nTranslate('MyVip_EndTime'),'MyVip_CountDown','MyVip_EndTime'));
                    this.myVipData['svip'] && $mySvipBlock.i18nHTML(stringFormat(TEMPLATE.SVIP_BLOCK,DateTime.showtime((new Date(this.myVipData['svip'].expireTime))),DateTime.countdownTime(this.myVipData['svip'].expireTime - new Date().getTime(),true),i18nTranslate('MyVip_CountDown'),'MyVip_CountDown'));
                    $mySvipBlock.removeClass().addClass('is_vip_block').show();
                }
                promise.resolve();
            }.bind(this)).then(function(){
                    if(this.cache['vipLists']){
                        this.renderVIP(this.cache['vipLists']);
                        return true;
                    }
                Bussiness.postData('shop_list_info.fly',{
                    'language':language_NUM[I18N.language],
                    'shoptypeId':1,
                    'pagesize':10,
                    'pageNo':0
                },function(data){
//                  console.log(data);
                    if(data.code==0 && data.dataInfo){
                        this.renderVIP(this.cache['vipLists'] =this.formatVIPData(data.dataInfo.list));
                    }
                    promise.resolve();
                }.bind(this));
            }.bind(this)).then(function(){

                }.bind(this));
        },
        renderVIP:function(data){
            if(!data) return;
            var vip = $('[data-role="vip"]'),
                svip = $('[data-role="svip"]'),
                vipUl = vip.find('[data-role="vipUl"]'),
                svipUl = svip.find('[data-role="svipUl"]'),
                vipBtn = $('[data-role="vipBuy"]'),
                svipBtn = $('[data-role="svipBuy"]'),vIndex=false,sIndex=false;
            data[1] && vipUl.i18nHTML(data[1]['current'].map(function(item,i){
                if(!vIndex){
                    vipBtn.data({'id':item.id ,'price':item.current,'sname':'vip'});
                }
                return stringFormat(TEMPLATE.VIP_ITEM,item.expire,item.original==0?'':item.original,item.current,item.id, !vIndex ? (vIndex=true)&& ' active':'');
            }.bind(this)).join(''));

            data[2] && svipUl.i18nHTML(data[2]['current'].map(function(item,i){
                if(!sIndex){
                    svipBtn.data({'id':item.id ,'price':item.current,'sname':'svip'});
                }
                return stringFormat(TEMPLATE.SVIP_ITEM,item.expire,item.original==0?'':item.original,item.current,item.id,  !sIndex ? (sIndex=true)&& ' active':'');
            }.bind(this)).join(''));
            this.bindEvents(this.vipContainer);
        },
        renderPrivilege:function(){
            var language = I18N.language;
            this.cache['vip'] && $('[data-role="vip-privilege"]').html(this.cache['vip'].map(function(item){
                var name = this.cache['privilege'][language][item] && this.cache['privilege'][language][item].name;
                var desc = this.cache['privilege'][language][item] && this.cache['privilege'][language][item].desc;
                return stringFormat(TEMPLATE.PRIVILEGE_ITEM,IMAGE_DOMAIN+this.cache['privilege']['all'][item].pic,name,desc);
            }.bind(this)));
            this.cache['svip'] && $('[data-role="svip-privilege"]').html(this.cache['svip'].map(function(item){
                var name = this.cache['privilege'][language][item] && this.cache['privilege'][language][item].name;
                var desc = this.cache['privilege'][language][item] && this.cache['privilege'][language][item].desc;
                return stringFormat(TEMPLATE.PRIVILEGE_ITEM,IMAGE_DOMAIN+this.cache['privilege']['all'][item].pic,name,desc);
            }.bind(this)));
        },
        formatVIPData:function(data){
            if(!data) return;
            var result = {};
            data.forEach(function(item,index){
                result[item['type']] = result[item['type']] || {};
                result[item['type']]['name']= item['name'];
                result[item['type']]['pic'] = item['pic'];
                result[item['type']]['current'] = result[item['type']]['current'] ||[];
                result[item['type']]['current'][index]=item['price'];
                result[item['type']]['current'][index]['expire']=item['expire'];
                result[item['type']]['current'][index]['id']=item['id'];
            });
            return result;
        },
        bindEvents:function(oParent){
        	console.log(this.isSVIP)
        	console.log(this.isVIP)
        	if(!this.isVIP){
        		$("#svipText").html("<span>you are not SVIP</span>");
          	}else if(!this.isSVIP){
        		$("#vipText").html("<span>you are not VIP</span>");
			}
        	$(".vip_price").parent("div").addClass("dialog_vip");
        	$(".vip_price").siblings("a").slice(0,-1).remove();
        	$(".svip_price").parent("div").addClass("dialog_vip");
        	$(".svip_price").siblings("a").slice(0,-1).remove();
        	$(".btn_buy_vip").click(function(){
        		$(".vip_price").parent("div").children("p").removeClass('active');
        		$(".vip_price").parent("div").show();
        	})
        	$(".btn_buy_svip").click(function(){
        		$(".svip_price").parent("div").children("p").removeClass('active');
        		$(".svip_price").parent("div").show();
        	})
        	$(".btn_renew").click(function(){
        		$(".vip_price").parent("div").hide();
        		$(".svip_price").parent("div").hide();
        	})
            oParent && oParent.unbind('click').click(function(evt){
                var target = $(evt.target),flag,sel,id,price,name;
                if(target.data('role')=='vipBuy' || target.data('role')=='svipBuy'){
                console.log($(target).data())
                    id = $(target).data('id');
                    price = $(target).data('price');
                    name = $(target).data('sname');
                    this.purchase(id,1,price,name);
                }
                if(sel = (target.data('select') || target.parent().data('select'))){
                    var tar = evt.target.nodeName.toLowerCase()=='p' ? target : target.parent();
                    tar.addClass('active');
                    tar.siblings().removeClass('active');
                    sel =sel.split('-'),flag = sel[0]+'Buy',id = sel[1],price = sel[2];
                    $('[data-role="'+flag+'"]').data('id',id);
                    $('[data-role="'+flag+'"]').data('price',price);
                    $('[data-role="'+flag+'"]').data('sname',sel[0]);//vip or svip
                }
            }.bind(this));
        },
//		购买,触发pop弹窗
        purchase:function(id,num,price,name){
            this.popPurchase(id,num,price,name);   
        },
//		购买弹窗
        popPurchase:function(id,num,price,name){
            if (!user_util.user_info) {
                user_util.is_login(true);
            }else{
                var tpl= '<p>'+i18nTranslate('Store_ConfirmThePayments')+'</p>';
                Popup.show({
                    'template':TEMPLATE.POP,
                    'caption':i18nTranslate('Store_Notice'),
                    'content':stringFormat(tpl,price),
                    'buttons':'<a data-role="confirm-ok" class="ok">'+i18nTranslate('Store_OK')+'</a><a data-role="close" class="cancel">'+i18nTranslate('Store_Cancel')+'</a>'
                });

                Popup.button.click(function(evt){
                    var target = $(evt.target),role = target.data('role');
                    if(!role) return;
                    switch(role){
                        case 'confirm-ok':
                            this.requestPurchase(id,num,name);
                            return;
                        case 'close':
                            Popup.close();
                            return;
                        case 'recharge':
                            setTimeout(window.location.reload(),1000);
                            return ;
                        case 'back':
                            Popup.back();
                            return;
                    }
                }.bind(this));
            }
        },
//		购买
        requestPurchase:function(id,num,name){
            Bussiness.postData('shop_buy.fly',{
                'shopId':id,
                'num':num
            },function(data){
                console.log(data);
                switch(data.code){
                    case 0:
                        var tpl = ((name == 'vip' && this.isVIP) || (name == 'svip' &&　this.isSVIP))? i18nTranslate('Store_CongratulationBuyForRenew') :i18nTranslate('Store_CongratulationToBeVIP');
                        var handler = function(){window.location.reload()};
                        Popup.rePaint({
                            'caption':i18nTranslate('Store_TitleSuccess'),
                            'content':stringFormat(tpl,i18nTranslate('Store_'+name.toUpperCase()))+ '.<br/>'+i18nTranslate('Store_ValidUntil')+DateTime.showtime(new Date(data.dataInfo.expire))+'<br/>'+i18nTranslate('Store_CongratulationGotPrivileges'),
                            'buttons':'<a data-role="close" class="ok">'+i18nTranslate('Store_OK')+'</a>',
                            'closeHandler':handler
                        });
                        console.log('购买成功');
                        return;
                    case 35:
                        Popup.rePaint({
                            'caption':i18nTranslate('Store_TitleInfficient'),
                            'content':i18nTranslate('Store_BalanceNotEnough'),
                            'buttons':'<a href="/myrecharge.shtml" target="_blank" data-role="recharge" class="recharge" data-stat="Store_Pop_BtnRecharge">'+i18nTranslate('Store_Charge')+'</a><a data-role="close" class="cancel" data-stat="Store_Pop_BtnCancel">'+i18nTranslate('Store_Cancel')+'</a>'
                        });
                        console.log('余额不足');
                        return;
                    default:
                        Popup.rePaint({
                            'caption':i18nTranslate('Store_TitleInfficient'),
                            'content':i18nTranslate('Store_FailToBuy'),
                            'buttons':'<a data-role="close" class="ok">'+i18nTranslate('Store_OK')+'</a>'
                        });
                        console.log('购买失败');
                        return;
                }
            }.bind(this))
        },

        renderPrivilege:function(){
            var language = I18N.language;
            this.cache['vip'] && $('[data-role="vip-privilege"]').html(this.cache['vip'].map(function(item){
                var name = this.cache['privilege'][language][item] && this.cache['privilege'][language][item].name;
                var desc = this.cache['privilege'][language][item] && this.cache['privilege'][language][item].desc;
                return stringFormat(TEMPLATE.PRIVILEGE_ITEM,IMAGE_DOMAIN+this.cache['privilege']['all'][item].pic,name,desc);
            }.bind(this)));
            this.cache['svip'] && $('[data-role="svip-privilege"]').html(this.cache['svip'].map(function(item){
                var name = this.cache['privilege'][language][item] && this.cache['privilege'][language][item].name;
                var desc = this.cache['privilege'][language][item] && this.cache['privilege'][language][item].desc;
                return stringFormat(TEMPLATE.PRIVILEGE_ITEM,IMAGE_DOMAIN+this.cache['privilege']['all'][item].pic,name,desc);
            }.bind(this)));
        },

        localize: function() {
            this.startPromise();
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
            _nav.identified(this.identity);
            var sign = this.sign = require('component/sign');
			sign.start();
            if(this.identity){
                I18N.init({
                    'onLocalize': this.localize.bind(this)
                });
                this.startPromise();
            }else{
                //login_util.show_login_div();
            }
        }
    }

    I18N.init(null,true).localize(null,Page.run.bind(Page),true)
});