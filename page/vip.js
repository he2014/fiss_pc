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
        'MAIN':'<div class="wrap clearfix">\
                    {0}\
                    <div class="vip_wrap clearfix">\
                    {1}{2}\
                    </div>\
                 </div>',
        'STORE_TAB':'<div class="menu clearfix">\
                            <h2 class="readStart"></h2>\
                            <ul data-role="menuUl" class="readStart">\
                                <li class="active"><a href="/store.shtml" target="_self" data-i18n="Store_ALL" data-stat="Store_ALL">{{Store_ALL}}</a></li>\
                                <li class="active" data-i18n="Store_VIP">{{Store_VIP}}</li>\
                            </ul>\
                        </div>',
        'VIP':'<div class="vip_block">\
                    <div data-role="vip" class="vip_top">\
                        <p class="vip_icon"><img src="/resource/static/image/store/icon_vip.png"></p>\
                        <div data-role="vipUl">\
                        </div>\
                        <a data-role="vipBuy" class="btn_buy" data-i18n="Store_BuyVIP" data-stat="Store_BuyVIP">{{Store_BuyVIP}}</a>\
                    </div>\
                    <table>\
                        <tbody data-role="vip-privilege">\
                        </tbody>\
                    </table>\
              </div>',
        'SVIP':'<div class="svip_block">\
                    <div data-role="svip" class="svip_top">\
                        <p class="vip_icon"><img src="/resource/static/image/store/icon_svip.png"></p>\
                        <div data-role="svipUl">\
                        \
                        </div>\
                        <a data-role="svipBuy" class="btn_buy" data-i18n="Store_BuySVIP" data-stat="Store_BuySVIP">{{Store_BuySVIP}}</a>\
                    </div>\
                    <table>\
                        <tbody data-role="svip-privilege">\
                        </tbody>\
                    </table>\
                </div>',

        'VIP_ITEM':'<p data-select="vip-{3}-{2}" class="vip_price {4}" data-stat="vip_price{2}">{0}<span class="price">{1}</span><span class="price_new">{2}</span></p>',
        'SVIP_ITEM':'<p data-select="svip-{3}-{2}" class="svip_price {4}" data-stat="svip_price{2}">{0}<span class="price">{1}</span><span class="price_new">{2}</span></p>',
        'PRIVILEGE_ITEM':'<tr>\
                                <th class="alignEnd"><img src="{0}"></th>\
                                <td class="alignStart">\
                                    <h3>{1}</h3>\
                                    <p>{2}</p>\
                                </td>\
                            </tr>',
        'POP':'<div class="popup" style="display: none;">\
                    <div class="wrap clearfix">\
                        <h2 data-role="caption" class="caption" data-i18n="Store_TitleChooseAmount">{{Store_TitleChooseAmount}}</h2>\
                        <div data-role="content" class="content">\
                            <h2 data-i18n="Store_TitleChooseAmount">{{Store_ChooseQuantityTobuy}}</h2>\
                            <div class="sel">\
                                <div class="sel_num">\
                                    <span data-role="minus" class="minus" data-stat="sel_num_minus">-</span>\
                                    <span class="num"><input data-role="num" type="text" value="1"></span>\
                                    <span data-role="plus" class="plus" data-stat="sel_num_plus">+</span>\
                                </div>\
                                <div class="spent_block" >\
                                    <h3 data-i18n="Store_Spend">{{Store_Spend}}:</h3>\
                                    <span data-role="price" class="price"></span>\
                                </div>\
                            </div>\
                            <p class="tips" style="display: none;"></p>\
                            <p class="warn" style="display: none;" data-i18n="Store_InsufficientFunds">{{Store_InsufficientFunds}}</p>\
                        </div>\
                        <div data-role="button" class="pop_button">\
                            <a href="javascript:;" data-role="pop-ok" class="ok" data-i18n="Store_OK" data-stat="Store_OK">{{Store_OK}}</a>\
                            <a href="javascript:;" data-role="close" class="cancel" data-i18n="Store_Cancel" data-stat="Store_Cancel">{{Store_Cancel}}</a>\
                        </div>\
                    </div>\
                    <div class="popBg"></div>\
                </div>'
    };

    var Page= {
        run:function(){
            this.load();
            this.render();
            this.compose();
            this.bind();
            this.start();
        },
        load:function(){
            this.cache={};
            this.isRequestedType = false;
            this.isVIP=false;
            this.isSVIP=false;
        },
        render:function(){
            this.container = $('#container');
            this.container.i18nHTML(Header.html() + stringFormat(TEMPLATE.MAIN,TEMPLATE.STORE_TAB,TEMPLATE.VIP,TEMPLATE.SVIP) + Footer.html());
        },
        compose:function(){
            I18N.init({
                'onLocalize': this.localize.bind(this)
            });
            login_util.setCallback(this.identifyFlow.bind(this));
            Header.init({
                'container': this.container
            });
        },
        bind:function(){

        },
        start:function(){
            var promise = new Promise(function(){
                Bussiness.postData('shop_list_info.fly',{
                    'language':language_NUM[I18N.language],
                    'shoptypeId':1,
                    'pagesize':10,
                    'pageNo':0
                },function(data){
                    //console.log(data);
                    if(data.code==0 && data.dataInfo){
                        this.renderVIP(this.cache['vipLists'] =this.formatVIPData(data.dataInfo.list));
                    }
                    promise.resolve();
                }.bind(this));
            }.bind(this)).then(function(){
					Bussiness.getData('data/static/v4/?vipprivilege',function(data){
                        if(data.code==0){
                            var vipPge= data.dataInfo.vipprivilege.d;
                            var arr_1 = {1:[]},
                                arr_2={2:[]},
                                k=1,
                                arr=[];
                            for(var i in vipPge[1]){
                                arr_1[1].push(vipPge[1][i].id);
                                arr.push(vipPge[1][i])
                            };
                            for(var i in vipPge[2]){
                                arr_2[2].push(vipPge[2][i].id);
                                arr.push(vipPge[2][i])
                            };
                            var golr ={};
                            for(var i in arr){
                                golr[k] = {
                                    id :arr[i].id,
                                    pic :arr[i].p,
                                    desc:arr[i].d,
                                    name:arr[i].n,
                                    no:arr[i].no,
                                    st:arr[i].st,
                                    t:arr[i].t,
                                    lg:arr[i].lg
                                }
                                k++;
                            }
                            this.cache['vip']= arr_1[1];
                            this.cache['svip'] = arr_2[2];
                            this.cache['privilege'] = this.cache['privilege'] || {};
                            this.cache['privilege']['all'] = golr;
                            promise.resolve();
                        };
                    }.bind(this),null,true);
 //                 Bussiness.getJSON('privilege/vip_privilege_data.json',function(data){
                      //约定�?1:vip  2:svip
 //                     console.log(data);
//                      if(data.vip && data.privilege){
//                          this.cache['vip']=data['vip'][1];
//                          this.cache['svip'] = data['vip'][2];
//                          this.cache['privilege'] = this.cache['privilege'] || {};
//                          console.log(this.cache['privilege'])
//                          this.cache['privilege']['all'] = data['privilege'];
//                          console.log(this.cache['privilege']['all'])
//                          promise.resolve();
//                      }
//                }.bind(this));
                }.bind(this)).then(function(){
              		Bussiness.getData('data/static/v4/?vipprivilege',function(data){
              			if(data.code==0){
	              			var iArr = [],s=1,enLanguage = {};
	              			var EN =data.dataInfo.vipprivilege.d;
	              			for(var i in EN[1]){
									iArr.push(EN[1][i].lg.en);
							};
							for(var i in EN[2]){
									iArr.push(EN[2][i].lg.en);
							};	
	              			for(var k in iArr){
	              				enLanguage[s]= iArr[k];
	              				enLanguage[s]['desc'] =iArr[k].d;
	              				enLanguage[s]['name'] =iArr[k].n;
	              				s++;
	              			};
	              			this.cache['privilege']['en'] = enLanguage;
              				promise.resolve();
                		};	
                	}.bind(this),null, true);
//                  Bussiness.getJSON('privilege/en_privilege_language_data.json',function(data){
//                  	console.log(data)
//                      this.cache['privilege']['en'] = data;
//                      promise.resolve();
//                  }.bind(this))
                }.bind(this)).then(function(){
                	Bussiness.getData('data/static/v4/?vipprivilege',function(data){
              			if(data.code==0){
	              			var iArr = [],s=1,arLanguage = {};
	              			var AR =data.dataInfo.vipprivilege.d;
	              			for(var i in AR[1]){
									iArr.push(AR[1][i].lg.ar);
							};
							for(var i in AR[2]){
									iArr.push(AR[2][i].lg.ar);
							};	
	              			for(var k in iArr){
	              				arLanguage[s]= iArr[k];
	              				arLanguage[s]['desc'] =iArr[k].d;
	              				arLanguage[s]['name'] =iArr[k].n;
	              				s++;
	              			};
	              			this.cache['privilege']['ar'] = arLanguage;
	              			//console.log(arLanguage)
              				promise.resolve();
                		};	
                	}.bind(this),null, true);
//                  Bussiness.getJSON('privilege/ar_privilege_language_data.json',function(data){
//                      this.cache['privilege']['ar'] = data;
//                      promise.resolve();
//                  }.bind(this))
                }.bind(this)).then(function(){
                    this.renderPrivilege();
                    promise.resolve();
                }.bind(this));

            this.identifyFlow();
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

        renderVIP:function(data){
            if(!data) return;
            var vip = $('[data-role="vip"]'),
                svip = $('[data-role="svip"]'),
                vipUl = vip.find('[data-role="vipUl"]'),
                svipUl = svip.find('[data-role="svipUl"]'),
                vipBtn = $('[data-role="vipBuy"]'),
                svipBtn = $('[data-role="svipBuy"]'),vipwrap =$('.vip_wrap'),vIndex=false,sIndex=false;

            data[1] && vipUl.i18nHTML(data[1]['current'].map(function(item,i){
                if(!vIndex){
                    vipBtn.data({'id':item.id ,'price':item.current,'sname':'vip'});
                }
                return stringFormat(TEMPLATE.VIP_ITEM,item.expire+i18nTranslate('Store_Days'),item.original==0?'':item.original,item.current,item.id, !vIndex ? (vIndex=true)&& ' active':'');
            }.bind(this)).join(''));

            data[2] && svipUl.i18nHTML(data[2]['current'].map(function(item,i){
                if(!sIndex){
                    svipBtn.data({'id':item.id ,'price':item.current,'sname':'svip'});
                }
                return stringFormat(TEMPLATE.SVIP_ITEM,item.expire+i18nTranslate('Store_Days'),item.original==0?'':item.original,item.current,item.id,  !sIndex ? (sIndex=true)&& ' active':'');
            }.bind(this)).join(''));

            this.bindEvents(vipwrap);
        },

        bindEvents:function(oParent){
            oParent && oParent.unbind('click').click(function(evt){
                var target = $(evt.target),flag,sel,id,price,name;
                if(target.data('role')=='vipBuy' || target.data('role')=='svipBuy'){
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

        purchase:function(id,num,price,name){
            this.popPurchase(id,num,price,name);
        },

        popPurchase:function(id,num,price,name){
            if (!user_util.user_info) {
                user_util.is_login(true);
            }else{
                var tpl= '<p>'+i18nTranslate('Store_ConfirmThePayments')+'</p>';
                Popup.show({
                    'template':TEMPLATE.POP,
                    'caption':i18nTranslate('Store_Notice'),
                    'content':stringFormat(tpl,price),
                    'buttons':'<a data-role="confirm-ok" data-stat="Vip_BtnBuy" class="ok">'+i18nTranslate('Store_OK')+'</a><a data-role="close" data-stat="Vip_BtnCancel" class="cancel">'+i18nTranslate('Store_Cancel')+'</a>'
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

        requestPurchase:function(id,num,name){
            Bussiness.postData('shop_buy.fly',{
                'shopId':id,
                'num':num
            },function(data){
                switch(data.code){
                    case 0:
                        var tpl = ((name == 'vip' && this.isVIP) || (name == 'svip' && this.isSVIP))? i18nTranslate('Store_CongratulationBuyForRenew') :i18nTranslate('Store_CongratulationToBeVIP');
                        Popup.rePaint({
                            'caption':i18nTranslate('Store_TitleSuccess'),
                            'content':stringFormat(tpl,i18nTranslate('Store_'+name.toUpperCase()))+ '.<br/>'+i18nTranslate('Store_ValidUntil')+DateTime.showtime(new Date(data.dataInfo.expire))+'<br/>'+i18nTranslate('Store_CongratulationGotPrivileges'),
                            'buttons':'<a data-role="close" class="ok" data-stat="Store_Pop_Close">'+i18nTranslate('Store_OK')+'</a>'
                        });
                        name=='vip' ? this.isVIP = true : this.isSVIP = true;
                        this.setUserVIPType();
                        return;
                    case 35:
                        Popup.rePaint({
                            'caption':i18nTranslate('Store_TitleInfficient'),
                            'content':i18nTranslate('Store_BalanceNotEnough'),
                            'buttons':'<a href="/myrecharge.shtml" target="_blank" data-role="recharge" class="recharge" data-stat="Store_Pop_BtnRecharge">'+i18nTranslate('Store_Charge')+'</a><a data-role="close" class="cancel" data-stat="Store_Pop_BtnCancel">'+i18nTranslate('Store_Cancel')+'</a>'
                        });
                        return;
                    default:
                        Popup.rePaint({
                            'caption':i18nTranslate('Store_TitleInfficient'),
                            'content':i18nTranslate('Store_FailToBuy'),
                            'buttons':'<a data-role="close" class="ok" data-stat="Store_Pop_Close">'+i18nTranslate('Store_OK')+'</a>'
                        });
                        return;
                }
            }.bind(this))
        },

        renderPrivilege:function(){
            var language = I18N.language;
            this.cache['vip']&& $('[data-role="vip-privilege"]').html(this.cache['vip'].map(function(item){
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
            var menuHTML= '<li><a href="/store.shtml" target="_self" data-stat="Store_ALL">'+i18nTranslate('Store_ALL')+'</a></li><li class="active">'+i18nTranslate('Store_NavVIP')+'</a></li>';
            $('[data-role="menuUl"]').html(menuHTML);
            this.renderVIP(this.cache['vipLists']);
            this.renderPrivilege();
            this.setUserVIPType();

            if (this.sign)
                this.sign.localize();
            if(top_util){
                //top_util.reset_popup_message();
            }
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
            Header.identified(this.identity);
            this.setUserVIPType();
        },

        setUserVIPType:function(){
            if(this.isRequestedType){
                this.isVIP? $('[data-role="vipBuy"]').html(i18nTranslate('Store_Renew')):$('[data-role="vipBuy"]').html(i18nTranslate('Store_Buy')+' VIP');
                this.isSVIP ? $('[data-role="svipBuy"]').html(i18nTranslate('Store_Renew')):$('[data-role="svipBuy"]').html(i18nTranslate('Store_Buy')+' SVIP');
                return;
            }
            Bussiness.postData('user_getUserVipInfo.fly',{},function(data){
                if(data.code==0 && data.dataInfo){
                    this.isRequestedType = true;
                    $.each(data.dataInfo,function(i,item){
                        if(item.vipType==1){
                            this.isVIP = true;
                            $('[data-role="vipBuy"]').html(i18nTranslate('Store_Renew'));
                        }else if(item.vipType==2){
                            this.isSVIP = true;
                            $('[data-role="svipBuy"]').html(i18nTranslate('Store_Renew'));
                        }
                    }.bind(this))
                }
            }.bind(this));
        }
    };


    I18N.init(null, true).localize(null, Page.run.bind(Page), true);
});