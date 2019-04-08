define(function(require){
    var Kit = require('component/kit');
    var Utility = require('common/utility');
    var TEMPLATE={
        'MAIN':{
            'en':'<div class="containers">\
                        <div class="wrap">\
                            <div class="Tips1">\
                            <h1 class="Tips1_Title">1. What does the star mean?</h1>\
                            <span class="Tips1_Bg">\
                                <img src="/resource/static/image/Hosts_Stars/Tips1_Img.png" alt=""/>\
                                <span class="Tips1_Bg_tips">Every braodcaster has 7 tasks to accomplish everyday, which is called 7 stars. The broadcaster could earn bonus and prerogative performace effects by acquiring stars. The broadcasters need your kind help to accomplish the star tasks.</span>\
                            </span>\
                            </div>\
                            <div class="Tips2">\
                                <h1 class="Tips2_Title">2. Where can I know more details about the 7-stars tasks?</h1>\
                                <div class="Tips2_Detail">\
                                    <span class="Tips2_Detail1">Please click the star in the live broadcast rooms.</span>\
                                    \
                                </div>\
                            </div>\
                            <div class="Tips4">\
                                <h1 class="Tips4_Title">3. What is the bonus amount of the stars tasks?</h1>\
                                <span class="Tips4_Detail">The system calculates the monthly amount of each broadcaster\'s stars and give bonus according to the form below:</span>\
                                <table class="Star_Table">\
                                    <tr>\
                                        <th>stars/month</th>\
                                        <th>proceeds($)</th>\
                                    </tr>\
                                    <tr>\
                                        <td>80</td>\
                                        <td>140</td>\
                                    </tr>\
                                    <tr>\
                                        <td>90</td>\
                                        <td>170</td>\
                                    </tr>\
                                    <tr>\
                                        <td>100</td>\
                                        <td>200</td>\
                                    </tr>\
                                    <tr>\
                                        <td>110</td>\
                                        <td>250</td>\
                                    </tr>\
                                    <tr>\
                                        <td>120</td>\
                                        <td>300</td>\
                                    </tr>\
                                    <tr>\
                                        <td>130</td>\
                                        <td>370</td>\
                                    </tr>\
                                    <tr>\
                                        <td>140</td>\
                                        <td>450</td>\
                                    </tr>\
                                    <tr>\
                                        <td>150</td>\
                                        <td>550</td>\
                                    </tr>\
                                    <tr>\
                                        <td>160</td>\
                                        <td>660</td>\
                                    </tr>\
                                    <tr>\
                                        <td>170</td>\
                                        <td>810</td>\
                                    </tr>\
                                    <tr>\
                                        <td>180</td>\
                                        <td>980</td>\
                                    </tr>\
                                    <tr>\
                                        <td>190</td>\
                                        <td>1100</td>\
                                    </tr>\
                                    <tr>\
                                        <td>200</td>\
                                        <td>1500</td>\
                                    </tr>\
                                    <tr>\
                                        <td>210</td>\
                                        <td>1800</td>\
                                    </tr>\
                                </table>\
                            </div>\
                        </div>\
                    </div>',
            'ar':'<div class="containers">\
                    <div class="wrap arabic">\
                        <div class="Tips1">\
                            <h1 class="Tips1_Title">1- ماهي نجمة المضيف ؟</h1>\
                            <span class="Tips1_Bg">\
                            <img src="/resource/static/image/Hosts_Stars/Tips1_Img.png" alt=""/>\
                            <span class="Tips1_Bg_tips">هي عبارة عن 7 نجمات بمثابة مهام يومية يقوم المضيف بإتمامها ، وكلما أتم المضيف هذه النجمات كلما زاد نسبة الدخل لديه .</span>\
                            </span>\
                        </div>\
                        <div class="Tips2">\
                            <h1 class="Tips2_Title">2- عن ماذا تعبر كل نجمة ؟</h1>\
                            <div class="Tips2_Detail">\
                                <span class="Tips2_Detail1">النجمة الأولى : تعني أن المضيف قام بعمل بث لمدة ساعة .</span>\
                                <span class="Tips2_Detail2">النجمة الثانية : تعني أن المضيف قام بعمل بث لمدة ساعتين .</span>\
                                <span class="Tips2_Detail3">النجمة الثالثة : تعني أن المضيف حصل على عدد 5000 من العملات النجمية .</span>\
                                <span class="Tips2_Detail4">النجمة الرابعة : تعني أن المضيف حصل على عدد 10000 من العملات النجمية .</span>\
                                <span class="Tips2_Detail5">النجمة الخامسة : تعني أن المضيف حصل على عدد 20000 من الجواهر .</span>\
                                <span class="Tips2_Detail6">النجمة السادسة : تعني أن المضيف حصل على عدد 5000 من الجواهر .</span>\
                                <span class="Tips2_Detail7">النجمة السابعة : تعني أن المضيف حصل على عدد 10000 من الجواهر .</span>\
                            </div>\
                        </div>\
                        <div class="Tips3">\
                            <h1 class="Tips3_Title">3- كيف تلمع نجمة المضيف ؟</h1>\
                            <img src="/resource/static/image/Hosts_Stars/Tips3_Img_ar.png" alt="" class="Tips3_Img"/>\
                            <span class="Tips3_Detail">على المضيف أن ينتهي من جميع المهام الخاصة بكل نجمة ، ليتمكن من لمعان النجمة .</span>\
                        </div>\
                        <div class="Tips4">\
                            <h1 class="Tips4_Title">4- ما هي أهمية نجمة المضيف ؟</h1>\
                            <span class="Tips4_Detail">كل يوم يستطيع المضيف الحصول على 7 نجمات كأكبر عدد يمكنه الحصول عليه ، وكلما زاد عدد النجمات كلما زاد عدد المكافأت للمضيف ، وأيضاً سيحتل المضيف الصدارة في الصفحة الرئيسية .</span>\
                            <table class="Star_Table">\
                                <tr>\
                                    <th>عدد النجمات الشهرية</th>\
                                    <th>المقابل لعدد النجمات بالدولار</th>\
                                </tr>\
                                <tr>\
                                    <td>80</td>\
                                    <td>140</td>\
                                </tr>\
                                <tr>\
                                    <td>90</td>\
                                    <td>170</td>\
                                </tr>\
                                <tr>\
                                    <td>100</td>\
                                    <td>200</td>\
                                </tr>\
                                <tr>\
                                    <td>110</td>\
                                    <td>250</td>\
                                </tr>\
                                <tr>\
                                    <td>120</td>\
                                    <td>300</td>\
                                </tr>\
                                <tr>\
                                    <td>130</td>\
                                    <td>370</td>\
                                </tr>\
                                <tr>\
                                    <td>140</td>\
                                    <td>450</td>\
                                </tr>\
                                <tr>\
                                    <td>150</td>\
                                    <td>550</td>\
                                </tr>\
                                <tr>\
                                    <td>160</td>\
                                    <td>660</td>\
                                </tr>\
                                <tr>\
                                    <td>170</td>\
                                    <td>810</td>\
                                </tr>\
                                <tr>\
                                    <td>180</td>\
                                    <td>980</td>\
                                </tr>\
                                <tr>\
                                    <td>190</td>\
                                    <td>1100</td>\
                                </tr>\
                                <tr>\
                                    <td>200</td>\
                                    <td>1500</td>\
                                </tr>\
                                <tr>\
                                    <td>210</td>\
                                    <td>1800</td>\
                                </tr>\
                            </table>\
                        </div>\
                </div>\
            </div>'
        }
    };

    var Page={
        run:function(){
            this.load();
            this.render();
            this.start();
        },
        load:function(){

        },
        render:function(){
            this.container = $('#container');
        },
        start:function(){
            var lg= Utility.URL.queryString('lg')?Utility.URL.queryString('lg'):'en';
            var oLg={
                    'en':'en',
                    'ar':'ar'
                };
            if(oLg[lg]==undefined){
               lg='en';
            }
            this.lg=lg;
            this.Main =TEMPLATE.MAIN[this.lg];
            this.container.html(this.Main);
        }
    };

    Page.run();
});


