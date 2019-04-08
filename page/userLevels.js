define(function(require){
    var Kit = require('component/kit');
    var Bussiness = Kit.use('Bussiness');
    var Utility = require('common/utility');
    var Promise = Utility['Promise'];
    var DateTime = Utility['DateTime'];
    var stringFormat = Utility['String']['stringFormat'];
    var Bridge=Utility['Bridge'];

    var TEMPLATE={
            'en':{
                'MAIN':'<div class="wrap">\
                            <div class="top_en">\
                                <span><a class="top_medals" href="javascript:;">Badges</a></span>\
                                <span class="top_c"></span>\
                                <span><a class="top_levels" href="javascript:;">Levels</a></span>\
                            </div>\
                            <div id="userLevels">\
                                {0}\
                                <div class="border_b"></div>\
                                <div class="my_exp_line_en">\
                                    <h2>High</h2>\
                                    <span class="my_levle_tips_en">With higher eminent privilege</span>\
                                    <div class="my_exp_level_en">\
                                        <div>\
                                            <span class="lv0">LV0</span>\
                                            <span class="lv10">LV10</span>\
                                            <span class="lv20">LV20</span>\
                                            <span class="lv30">LV30</span>\
                                            <span class="lv40">LV40</span>\
                                            <span class="lv50">LV50</span>\
                                        </div>\
                                    </div>\
                                    <span class="my_level_exps_en">\
                                        <em>{1}</em>\
                                        <span></span>\
                                    </span>\
                                </div>\
                                <div id="Privilege_en" class="">\
                                    <div class="Privilege_en1">\
                                        <div class="border_b"></div>\
                                        <h2>Privilege 1</h2>\
                                        <div class="Privilege_en1_r">\
                                            <img src="/resource/static/image/level_h5/Privilege1-2.png" alt=""/>\
                                            <h2>Dignity</h2>\
                                            <span>To improve your Dignity, reach to higher levels.</span>\
                                        </div>\
                                    </div>\
                                    <div class="Privilege_en2">\
                                        <div class="border_b"></div>\
                                        <h2>Privilege 2</h2>\
                                        <span>Privilege Emoticons</span>\
                                    </div>\
                                    <div class="Privilege_en3 hidden">\
                                        <div class="border_b"></div>\
                                        <h2>Privilege 3</h2>\
                                        <div class="Flowers">\
                                            <span>More Flowers and Shortly</span>\
                                            <table>\
                                                <tr>\
                                                    <th class="table_l">Upper Limit</th>\
                                                    <th class="table_c">Flower\'s Time(s)</th>\
                                                    <th class="table_r">Level</th>\
                                                </tr>\
                                                <tr>\
                                                    <td class="table_l table_flower_en">x 3</td>\
                                                    <td class="table_c">10’</td>\
                                                    <td class="table_r">LV 1～9</td>\
                                                </tr>\
                                                <tr>\
                                                    <td class="table_l table_flower_en">x 4</td>\
                                                    <td class="table_c">9’</td>\
                                                    <td class="table_r">LV 10～14</td>\
                                                </tr>\
                                                <tr>\
                                                    <td class="table_l table_flower_en">x 5</td>\
                                                    <td class="table_c">8’</td>\
                                                    <td class="table_r">LV 15～19</td>\
                                                </tr>\
                                                <tr>\
                                                    <td class="table_l table_flower_en">x 6</td>\
                                                    <td class="table_c">7’</td>\
                                                    <td class="table_r">LV 20～24</td>\
                                                </tr>\
                                                <tr>\
                                                    <td class="table_l table_flower_en">x 7</td>\
                                                    <td class="table_c">7’</td>\
                                                    <td class="table_r">LV 25～29</td>\
                                                </tr>\
                                                <tr>\
                                                    <td class="table_l table_flower_en">x 8</td>\
                                                    <td class="table_c">6’</td>\
                                                    <td class="table_r">LV 30～39</td>\
                                                </tr>\
                                                <tr>\
                                                    <td class="table_l table_flower_en">x 9</td>\
                                                    <td class="table_c">6’</td>\
                                                    <td class="table_r">LV 40～49</td>\
                                                </tr>\
                                                <tr>\
                                                    <td class="table_l table_flower_en">&nbsp;&nbsp;x 10</td>\
                                                    <td class="table_c">5’</td>\
                                                    <td class="table_r">LV 50～59</td>\
                                                </tr>\
                                            </table>\
                                        </div>\
                                    </div>\
                                    <div class="Privilege_en4">\
                                        <div class="border_b"></div>\
                                        <h2>Privilege 3</h2>\
                                        <span class="priv_tip">Get exclusive gifts during events</span>\
                                        <div class="level_tipcal">\
                                            <span>What is my personal level? </span>\
                                            <p>·"My Level" can be defined as part of your personal identity on 7nujoom.com. You increase level as you increase experience by completing tasks. The higher your personal level the more honor you receive, opening up more services and privileges.</p>\
                                            <p>·In total there are 50 levels.</p>\
                                        </div>\
                                        <div class="level_list">\
                                            <span>Each stage has unique badges that add to your identity on 7nujoom.</span>\
                                            <table>\
                                                <tr class="table_tit">\
                                                    <th class="table_l">Badge</th>\
                                                    <th class="table_c">Experience</th>\
                                                    <th class="table_r">Level</th>\
                                                </tr>\
                                                <tr>\
                                                    <td class="table_l">LV 1～10</td>\
                                                    <td class="table_c table_img">52</td>\
                                                    <td class="table_r"><span class="lv1">LV 1</span></td>\
                                                </tr>\
                                                <tr>\
                                                    <td class="table_l">LV 11～20</td>\
                                                    <td class="table_c table_img">436</td>\
                                                    <td class="table_r"><span class="lv2">LV 20</span></td>\
                                                </tr>\
                                                <tr>\
                                                    <td class="table_l">LV 21～30</td>\
                                                    <td class="table_c table_img">1674</td>\
                                                    <td class="table_r"><span class="lv3">LV 30</span></td>\
                                                </tr>\
                                                <tr>\
                                                    <td class="table_l">LV 31～40</td>\
                                                    <td class="table_c table_img">4495</td>\
                                                    <td class="table_r"><span class="lv4">LV 40</span></td>\
                                                </tr>\
                                                <tr>\
                                                    <td class="table_l">LV 41～50</td>\
                                                    <td class="table_c table_img">9837</td>\
                                                    <td class="table_r"><span class="lv5">LV 50</span></td>\
                                                </tr>\
                                            </table>\
                                        </div>\
                                        <div class="Experience_tips">\
                                            <span class="Exp_title">How to obtain EXP?</span>\
                                            <span>Mission 1: Sign in 7Nujoom account = 1</span>\
                                            <span>Mission 2: Chatting in any live room = 1</span>\
                                            <span>Mission 3: Set up profile picture = 2</span>\
                                            <span>Mission 4: Sending gifts up to 4 coins = 2</span>\
                                            <span style="display:none;">Mission 5: Sending 1 flower to any host = 2</span>\
                                            <span>Mission 5: Sending up to any 10 gifts = 5</span>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                            <div id="userMedals">\
                                {2}\
                                {3}\
                            </div>\
                         </div>',
                'Login_show':'<div id="canvas" class="canvas_login">\
                                  <div class="login_show">\
                                    <div class="User_name">\
                                        <span class="">{0}</span>\
                                    </div>\
                                    <div class="levels">\
                                        <span class="level_l">{1}%</span>\
                                        <span class="level_r">Lv{2}</span>\
                                    </div>\
                                    <div class="{3}"></div>\
                                    <div class="level_tips_en">\
                                        <span class="tips_en1">You need</span>\
                                        <span class="level_exp">{4}</span>\
                                        <span>Exp to uprade to level</span>\
                                        <span class="level_next">{5}</span>\
                                        <span></span>\
                                    </div>\
                                    <div id="bg_cycle">\
                                        <img id="my_icon" src="{6}"/>\
                                    </div>\
                                    <canvas id="imgCanvas" width="130" height="130">\
                                        您的浏览器不支持HTML5，请尝试其他浏览器！\
                                    </canvas>\
                                </div>\
                            </div>',
                'Login_out':'<div id="canvas">\
                                <div class="out_login">\
                                    <a class="login_btn" href="javascript:;" >You can access to level status &  privilege specifications after sign-in.</a>\
                                </div>\
                             </div>',
                'MyMedalBox':'<div class="myMedalBox">\
                                    <div class="bindingLine">\
                                        <span style="l210px">My badge</span>\
                                    </div>\
                                    <div class="maybeMedals">\
                                        <div class="PMBox">\
                                        {0}\
                                        {1}\
                                        </div>\
                                    </div>\
                                </div>',
                'MedalInfoBox':'<div class="medalInfoBox">\
                                    <div class="bindingLine">\
                                        <span class="l160px">badge introduction</span>\
                                    </div>\
                                    <div>\
                                        {0}\
                                    </div>\
                               </div>',
                'HasPM':'<div style="display:block">\
                            <div class="greenTitleBox">\
                               <span class="greenTitle">Potential badge</span>\
                            </div>\
                            {0}\
                            {1}\
                            <div class="btnDiv">\
                               <a id="toPay">I want a badge</a>\
                            </div>\
                        </div>',
                'HasMedal':'<div>\
                                <div class="greenTitleBox ">\
                                   <span class="greenTitle">Your current badge</span>\
                                </div>\
                                <div class="gotMedalBox">\
                                    {0}\
                                </div>\
                            </div>',
                'GotMedal':'<div class="gotMedal clearfix">\
                               <div class="readStart w160px">\
                                   <img src="{0}" width="130px" height="130px" />\
                               </div>\
                               <div class="readEnd w3501px">\
                                   <h2>{1}</h2>\
                                   <p>The validity period:{2}</p>\
                                   <p>{3} Days<p />\
                               </div>\
                            </div>',
                'UserMedal':'<div class="userMedals">\
                                <div class="medals_l_en ">\
                                    <img src="{0}" alt=""/>\
                                </div>\
                                <span class="medals_c_en"></span>\
                                <div class="medals_r_en">\
                                    <h3 class="title">{1}</h3>\
                                    <span class="time"></span>\
                                    <p class="detal">{2}</p>\
                                </div>\
                            </div>',
                'PM':'<div class="potentialMedal clearfix">\
                       <div class="readStart w160px">\
                           <img src="{0}" width="130px" height="130px" />\
                       </div>\
                       <div class="readEnd w365px">\
                           <h2>{1}</h2>\
                           <p>You need ${2} more  to get the badge</p>\
                           <p class="redChar" style="display:{3}">Congrats! You got the Crown Badge, it will officially be in your account at the beginning of the month.\
                           </p>\
                       </div>\
                    </div>',
                'progressBar':' <div class="progressBarBox">\
                       <div class="progressBar">\
                           <div class="progressNum" style="width:{0}%"></div>\
                           <span class="curPointer" style="left:{1}%">\
                                 ${2}\
                           </span>\
                       </div>\
                       <img src="{3}" class="moneyOne {4}"/>\
                       <img src="{5}" class="moneyTwo {6}"/>\
                       <img src="{7}" class="moneyThree {8}"/>\
                    </div>'
            },
            'ar':{
                'MAIN':'<div class="wrap fontFamily_ar">\
                            <div class="top_ar">\
                                <span><a class="top_levels" href="javascript:;">المستويات </a></span>\
                                <span class="top_c"></span>\
                                <span><a class="top_medals" href="javascript:;">الأوسمة </a></span>\
                            </div>\
                            <div id="userLevels">\
                                {0}\
                                <div class="border_b"></div>\
                                <div class="my_exp_line_ar">\
                                    <h2>نقاط الخبرة</h2>\
                                    <span class="my_levle_tips_ar">كلما زادت نقاط الخبرة كلما ارتقى المستوى و كلما زادت الصلاحيات </span>\
                                    <div class="my_exp_level_ar">\
                                        <div>\
                                            <span class="lv0">LV50</span>\
                                            <span class="">LV40</span>\
                                            <span class="">LV30</span>\
                                            <span class="">LV20</span>\
                                            <span class="">LV10</span>\
                                            <span class="">LV0</span>\
                                        </div>\
                                    </div>\
                                    <span class="my_level_exps_ar">\
                                        <em>{1}</em>\
                                        <span></span>\
                                    </span>\
                                </div>\
                                <div id="Privilege_en" class="Privilege_ar">\
                                    <div class="Privilege_en1">\
                                        <div class="border_b"></div>\
                                        <h2>امتياز 1</h2>\
                                        <div class="Privilege_en1_r">\
                                            <img src="/resource/static/image/level_h5/Privilege1-2.png" alt=""/>\
                                            <h2>أسماء مميزة </h2>\
                                            <span>كلما زاد مستواك كلما تميز اللون المحدد لإسمك </span>\
                                        </div>\
                                    </div>\
                                    <div class="Privilege_en2 Privilege_en2_ar">\
                                        <div class="border_b"></div>\
                                        <h2>امتياز 2</h2>\
                                        <span>الأيموشنات الخاصة </span>\
                                    </div>\
                                    <div class="Privilege_en3">\
                                        <div class="border_b"></div>\
                                        <h2>امتياز 3</h2>\
                                        <div class="Flowers">\
                                            <span>تقليل وقت استلام الزهور </span>\
                                            <table>\
                                                <tr>\
                                                    <th class="table_l">الحد الأقصى للزهور </th>\
                                                    <th class="table_c">المدى الزمنى للزهور </th>\
                                                    <th class="table_r">المستوى </th>\
                                                </tr>\
                                                <tr>\
                                                    <td class="table_l table_flower">3 x </td>\
                                                    <td class="table_c">10’</td>\
                                                    <td class="table_r">LV 1～9</td>\
                                                </tr>\
                                                <tr>\
                                                    <td class="table_l table_flower">4 x</td>\
                                                    <td class="table_c">9’</td>\
                                                    <td class="table_r">LV 10～14</td>\
                                                </tr>\
                                                <tr>\
                                                    <td class="table_l table_flower">5 x</td>\
                                                    <td class="table_c">8’</td>\
                                                    <td class="table_r">LV 15～19</td>\
                                                </tr>\
                                                <tr>\
                                                    <td class="table_l table_flower">6 x</td>\
                                                    <td class="table_c">7’</td>\
                                                    <td class="table_r">LV 20～24</td>\
                                                </tr>\
                                                <tr>\
                                                    <td class="table_l table_flower">7 x</td>\
                                                    <td class="table_c">7’</td>\
                                                    <td class="table_r">LV 25～29</td>\
                                                </tr>\
                                                <tr>\
                                                    <td class="table_l table_flower">8 x</td>\
                                                    <td class="table_c">6’</td>\
                                                    <td class="table_r">LV 30～39</td>\
                                                </tr>\
                                                <tr>\
                                                    <td class="table_l table_flower">9 x</td>\
                                                    <td class="table_c">6’</td>\
                                                    <td class="table_r">LV 40～49</td>\
                                                </tr>\
                                                <tr>\
                                                    <td class="table_l table_flower">10 x</td>\
                                                    <td class="table_c">5’</td>\
                                                    <td class="table_r">LV 50～59</td>\
                                                </tr>\
                                            </table>\
                                        </div>\
                                    </div>\
                                    <div class="Privilege_en4">\
                                        <div class="border_b"></div>\
                                        <h2>امتياز 4</h2>\
                                        <span class="priv_tip">ستزيد فرصتك في الحصول على الهدايا المجانية خلال الأنشطة المقامة </span>\
                                        <div class="level_tipcal level_tipcal_ar">\
                                            <span>ما هو مستوى المستخدم ؟ </span>\
                                            <p>المستوى هو مكانتك داخل 7 نجوم ، يمكنك الوصول إلى مستوى أعلى عن طريق زيادة نقاط الخبرة لك حيث أنه كلما زاد المستوى زادت المكانة و كثرت الصلاحيات و المميزات التي سوف تتمتع بها .</p>>\
                                            <p>"المستوى "ينقسم إلى 50 رتبة  . </p>\
                                        </div>\
                                        <div class="level_list level_list_ar">\
                                            <span>لكل مرحلة شارات مختلفة ، وهي ترمز إلى مكانتك داخل الموقع  . </span>\
                                            <table>\
                                                <tr class="table_tit">\
                                                    <th class="table_l">المستوى</th>\
                                                    <th class="table_c">نقاط الخبرة </th>\
                                                    <th class="table_r">الشارات</th>\
                                                </tr>\
                                                <tr>\
                                                    <td class="table_l">LV 1～10</td>\
                                                    <td class="table_c table_img">52</td>\
                                                    <td class="table_r"><span class="lv1">LV 1</span></td>\
                                                </tr>\
                                                <tr>\
                                                    <td class="table_l">LV 11～20</td>\
                                                    <td class="table_c table_img">436</td>\
                                                    <td class="table_r"><span class="lv2">LV 20</span></td>\
                                                </tr>\
                                                <tr>\
                                                    <td class="table_l">LV 21～30</td>\
                                                    <td class="table_c table_img">1674</td>\
                                                    <td class="table_r"><span class="lv3">LV 30</span></td>\
                                                </tr>\
                                                <tr>\
                                                    <td class="table_l">LV 31～40</td>\
                                                    <td class="table_c table_img">4495</td>\
                                                    <td class="table_r"><span class="lv4">LV 40</span></td>\
                                                </tr>\
                                                <tr>\
                                                    <td class="table_l">LV 41～50</td>\
                                                    <td class="table_c table_img">9837</td>\
                                                    <td class="table_r"><span class="lv5">LV 50</span></td>\
                                                </tr>\
                                            </table>\
                                        </div>\
                                        <div class="Experience_tips Experience_tips_ar">\
                                            <span class="Exp_title">كيف يمكن الحصول على نقاط الخبرة ؟ </span>\
                                            <span>المهمة 1 : تسجيل الدخول مرة واحدة = 1 نقطة خبرة </span>\
                                            <span>المهمة 2 : إرسال أي 10 هدايا = 5 نقطة خبرة </span>\
                                            <span>المهمة 3 : إرسال أي هدية بقيمة 4 عملات ذهبية = 2 نقطة خبرة </span>\
                                            <span>المهمة 4 : إهداء وردة مجانية واحدة لأي مضيف = 2 نقطة خبرة </span>\
                                            <span>المهمة 5 : عمل دردشة مرة واحدة بأي أستوديو = 1 نقطة خبرة </span>\
                                            <span>المهمة 6 : وضع صورة للملف الشخصي الخاص بك = 2 نقطة خبرة </span>\
                                        </div>\
                                    </div>\
                                </div>\
                            </div>\
                            <div id="userMedals">\
                                {2}\
                                {3}\
                            </div>\
                         </div>',
                'Login_show':'<div id="canvas" class="canvas_login">\
                                <div class="login_show">\
                                    <div class="User_name User_name_ar">\
                                        <span class="">{0}</span>\
                                    </div>\
                                    <div class="levels">\
                                        <span class="level_l">{1}%</span>\
                                        <span class="level_r">Lv{2}</span>\
                                    </div>\
                                    <div class="{3}"></div>\
                                    <div class="level_tips_en level_tips_ar">\
                                        <span class="tips_en1">تحتاج إلى </span>\
                                        <span class="level_exp">{4}</span>\
                                        <span>نقطة خبرة إضافية كي تصل إلى المستوى </span>\
                                        <span class="level_next">{5}</span>\
                                        <span></span>\
                                    </div>\
                                    <div id="bg_cycle">\
                                        <img id="my_icon" src="{6}"/>\
                                    </div>\
                                    <canvas id="imgCanvas" width="130" height="130">\
                                        您的浏览器不支持HTML5，请尝试其他浏览器！\
                                    </canvas>\
                                </div>\
                             </div>',
                'Login_out':'<div id="canvas" >\
                                <div class="out_login">\
                                    <a class="login_btn login_tips_ar" href="javascript:;">بعد تسجيلك الدخول يمكنك معرفة المستوى الذي وصلت إليه والصلاحيات الخاصة التي حصلت عليها </a>\
                                </div>\
                             </div>',
                'MyMedalBox':'<div class="myMedalBox">\
                                    <div class="bindingLine">\
                                        <span class="l228px">أوسمتي </span>\
                                    </div>\
                                    <div class="maybeMedals">\
                                        <div class="PMBox">\
                                        {0}\
                                        {1}\
                                        </div>\
                                    </div>\
                                </div>',
                'MedalInfoBox':'<div class="medalInfoBox">\
                                    <div class="bindingLine">\
                                        <span class="l228px">الأوسمة </span>\
                                    </div>\
                                    <div>\
                                        {0}\
                                    </div>\
                               </div>',
                'HasPM':'<div style="display:block">\
                            <div class="greenTitleBox">\
                               <span class="greenTitle">الأوسمة المحتملة </span>\
                            </div>\
                            {0}\
                            {1}\
                            <div class="btnDiv">\
                               <a id="toPay">أريد وساماً</a>\
                            </div>\
                        </div>',
                'HasMedal':'<div>\
                                <div class="greenTitleBox ">\
                                   <span class="greenTitle">الأوسمة الحالية </span>\
                                </div>\
                                <div class="gotMedalBox">\
                                    {0}\
                                </div>\
                            </div>',
                'GotMedal':'<div class="gotMedal clearfix arabic">\
                               <div class="readStart w160px">\
                                   <img src="{0}"  width="130px"/>\
                               </div>\
                               <div class="readEnd w350px">\
                                   <h2>{1}</h2>\
                                   <p>صلاحية الوسام : {2}</p>\
                                   <p>متبقي عدد {3} يوم<p />\
                               </div>\
                            </div>',
                'UserMedal':'<div class="userMedals">\
                                <div class="medals_r_en medals_l_ar">\
                                    <h3 class="title">{0}</h3>\
                                    <span class="time"></span>\
                                    <p class="detal">{1}</p>\
                                </div>\
                                <span class="medals_c_en"></span>\
                                 <div class="medals_r_ar ">\
                                    <img src="{2}" alt=""/>\
                                </div>\
                            </div>',
                'PM':'<div class="potentialMedal clearfix arabic">\
                       <div class="readStart w160px">\
                           <img src="{0}" width="130px" height="130px" />\
                       </div>\
                       <div class="readEnd w350px">\
                           <h2>{1}</h2>\
                           <p>تبقى  {2} دولار و راح ينور الوسام اسمك</p>\
                           <p class="redChar" style="display:{3}">مبروك ! من بداية أول يوم في الشهر وسام التاج راح ينور اسمك.\
                           </p>\
                       </div>\
                    </div>',
                'progressBar':' <div class="progressBarBox2">\
                       <div class="progressBar2">\
                           <div class="progressNum2" style="width:{0}%"></div>\
                           <span class="curPointer2" style="left:{1}%">\
                                 ${2}\
                           </span>\
                       </div>\
                       <img src="{3}" class="moneyOne2 {4}"/>\
                       <img src="{5}" class="moneyTwo2 {6}" />\
                       <img src="{7}" class="moneyThree2 {8}"/>\
                    </div>'
            }
        };




    var Page={
        run:function(){
            this.load();
            this.render();
        },
        load:function(){
            var promise = new Promise(function(){
                Bussiness.getJSON('level/rich_level_data.json',function(data){
                    this.oLevels=data;
                    promise.resolve();
                }.bind(this));
            }.bind(this)).then(function(){
                Bussiness.getData('data/mobile/v3/?badge=&requestType=1',function(data){
                    if(data.code == 0)
                        this.oBadges = data.dataInfo.badge.d;
                        promise.resolve();
                }.bind(this),null,true);
            }.bind(this)).then(this.renderLevels.bind(this));
        },
        render:function(){
            this.container = $('#container');
        },
        renderLevels:function(){
            var oLevels=this.oLevels;
            var oBadges=this.oBadges;
            var loginKey = Utility.URL.queryString('login_key');
            var lg= Utility.URL.queryString('lg')?Utility.URL.queryString('lg'):'en';
            var oLg={
                    'en':'en',
                    'ar':'ar'
                };
            if(oLg[lg]==undefined){
               lg='en';
            }
            this.lg=lg;

            if(loginKey==''){   //URL 没有登录
                var oBadgesGet=null;
                this.renderBadges(oBadges,oBadgesGet);
                this.sMain =stringFormat(TEMPLATE[this.lg].MAIN,TEMPLATE[this.lg].Login_out,'0',this.MyMedalBox,this.MedalInfoBox);
                this.container.html( this.sMain );
                this.tagSwitch();
                this.toLogin();
            }else{              //URL 登录
                this.doLoginKey(loginKey,oLevels,oBadges);
            }
        },
        tagSwitch:function(){
            $(".top_levels").on("click",function(){
                $("#userLevels").show();
                $("#userMedals").hide();
                $(this).css("color","#41BD97");
                $(".top_medals").css("color","#B4B4B4");
            });
            $(".top_medals").on("click",function(){
                $("#userLevels").hide();
                $("#userMedals").show();
                $(this).css("color","#41BD97");
                $(".top_levels").css("color","#B4B4B4");
            });
            var height=$(".medals_c_en").parent(".userMedals").css('height');
            height=parseInt(height)*0.6;
            $(".medals_c_en").css("height",height);
        },
        mylevel_en:function (data) {
            if (data >= 0 && data <= 10) {
                var x = data * 8.8, y = 8 / 5 * data - 4;
                $(".my_level_exps_en").css({"left": 100 + x + "px", "bottom": 30 + y + "px"})
            } else if (data > 10 && data <= 20) {
                var x = data * 8.8, y = 6 / 5 * data;
                $(".my_level_exps_en").css({"left": 100 + x + "px", "bottom": 30 + y + "px"})
            } else if (data > 20 && data <= 30) {
                var x = data * 8.8, y = 14 / 5 * data - 33;
                $(".my_level_exps_en").css({"left": 100 + x + "px", "bottom": 30 + y + "px"})
            } else if (data > 30 && data <= 40) {
                var x = data * 8.8, y = 29 / 5 * data - 124;
                $(".my_level_exps_en").css({"left": 100 + x + "px", "bottom": 30 + y + "px"})
            } else {
                var x = data * 8.8, y = 53 / 5 * data - 314;
                $(".my_level_exps_en").css({"left": 100 + x + "px", "bottom": 30 + y + "px"})
            }
        },
        mylevel_ar:function(data) {
            if (data >= 0 && data <= 10) {
                var x = 442 - (data * 8.8), y = 8 / 5 * data - 4;
                $(".my_level_exps_ar").css({"left": 100 + x + "px", "bottom": 30 + y + "px"})
            } else if (data > 10 && data <= 20) {
                var x = 442 - data * 8.8, y = 6 / 5 * data;
                $(".my_level_exps_ar").css({"left": 100 + x + "px", "bottom": 30 + y + "px"})
            } else if (data > 20 && data <= 30) {
                var x = 442 - data * 8.8, y = 14 / 5 * data - 33;
                $(".my_level_exps_ar").css({"left": 100 + x + "px", "bottom": 30 + y + "px"})
            } else if (data > 30 && data <= 40) {
                var x = 442 - data * 8.8, y = 29 / 5 * data - 124;
                $(".my_level_exps_ar").css({"left": 100 + x + "px", "bottom": 30 + y + "px"})
            } else {
                var x = 442 - data * 8.8, y = 53 / 5 * data - 314;
                $(".my_level_exps_ar").css({"left": 100 + x + "px", "bottom": 30 + y + "px"})
            }
        },
        circle:function (percent) {
            var c = document.getElementById("imgCanvas");
            var cxt = c.getContext("2d");
            cxt.fillStyle = "white";
            cxt.beginPath();
            cxt.moveTo(65, 65);
            cxt.arc(65, 65, 65, 0, Math.PI * 2, false);
            cxt.closePath();
            cxt.fill();
            cxt.fillStyle = "#41BD97";
            cxt.beginPath();
            cxt.moveTo(65, 65);
            if (percent == 1) {
                cxt.arc(65, 65, 65, 0, Math.PI * 2, false);
            } else if (percent == 0) {
                cxt.arc(65, 65, 65, 0, 0, true);
            } else {
                cxt.arc(65, 65, 65, Math.PI * (3 / 2), Math.PI * 3 / 2 + Math.PI * 2 * percent, false);
            }
            cxt.closePath();
            cxt.fill();
            cxt.fillStyle = "#FFF";
            cxt.beginPath();
            cxt.moveTo(65, 65);
            cxt.arc(65, 65, 55, 0, Math.PI * 2, false);
            cxt.closePath();
            cxt.fill();
        },
        levels:function (lvExp) {
            window.setTimeout(function () {
                this.circle(this.startNum / 100);
                this.startNum++;
                if (this.startNum < lvExp + 1) {
                    this.levels(lvExp);
                }
            }.bind(this), 25);
        },
        toLogin:function(){
            var _this = this;
            $('.login_btn').on('click',function(){
                var sMakeLink= Bridge.link.logic('login',null,function(login_key){ //Bridge 登录
                    _this.doLoginKey(login_key,_this.oLevels,_this.oBadges);
                });
                Bridge.callNative(sMakeLink);
            });
        },
        renderBadges:function(oBadges,oData){
            //console.log(222222);
            //console.log(oData);
            //console.log(222222);

            //没有登录 或者 code=99
            if(!oData){
                this.MyMedalBox='';
            }else{
                //（1）如果用户当月没有充值 --潜在徽章模块为空
                if(!oData['monthtotal']){
                    this.HasPM="";
                }else{
                    //渲染潜在徽章
                    var iRecharge=oData['monthtotal']?(oData['monthtotal']/100).toFixed(2):0;
                    //iRecharge=800;
                    var iLeft=0;
                    var iPercent=0;
                    var sLevel1Img=this.oBadges['20003']['p']?DOMAIN_CONFIG['IMAGE_DOMAIN']+this.oBadges['20003']['p']:DOMAIN_CONFIG['IMAGE_DOMAIN']+'systemRes/img/default/nophoto.jpg';
                    var sLevel2Img=this.oBadges['20004']['p']?DOMAIN_CONFIG['IMAGE_DOMAIN']+this.oBadges['20004']['p']:DOMAIN_CONFIG['IMAGE_DOMAIN']+'systemRes/img/default/nophoto.jpg';
                    var sLevel3Img=this.oBadges['20005']['p']?DOMAIN_CONFIG['IMAGE_DOMAIN']+this.oBadges['20005']['p']:DOMAIN_CONFIG['IMAGE_DOMAIN']+'systemRes/img/default/nophoto.jpg';

                    if(this.lg=='ar'){
                        iPercent=iRecharge>1500?0:100-(iRecharge/1500).toFixed(2)*100;
                    }else{
                        iPercent=iRecharge>1500?100:(iRecharge/1500).toFixed(2)*100;
                    }

                    if(iRecharge>=1500){
                        this.PM=stringFormat(TEMPLATE[this.lg].PM,sLevel3Img,this.oBadges['20005']['lg'][this['lg']]['n'],iLeft,'block');
                        if(this.lg=='ar'){
                            this.PB=stringFormat(TEMPLATE[this.lg].progressBar,iPercent,iPercent-1,iRecharge,sLevel3Img,'',sLevel2Img,'',sLevel1Img,'');
                        }else{
                            this.PB=stringFormat(TEMPLATE[this.lg].progressBar,iPercent,iPercent-1,iRecharge,sLevel1Img,'',sLevel2Img,'',sLevel3Img,'');
                        }
                    }else if(iRecharge>=600){
                        iLeft=(1500-iRecharge).toFixed(2);
                        this.PM=stringFormat(TEMPLATE[this.lg].PM,sLevel3Img,this.oBadges['20005']['lg'][this['lg']]['n'],iLeft,'none');
                        if(this.lg=='ar'){
                            this.PB=stringFormat(TEMPLATE[this.lg].progressBar,iPercent,iPercent-1,iRecharge,sLevel3Img,'toGray',sLevel2Img,'',sLevel1Img,'');
                        }else{
                            this.PB=stringFormat(TEMPLATE[this.lg].progressBar,iPercent,iPercent-1,iRecharge,sLevel1Img,'',sLevel2Img,'',sLevel3Img,'toGray');
                        }
                    }else if(iRecharge>=200){
                        iLeft =(600-iRecharge).toFixed(2);
                        this.PM=stringFormat(TEMPLATE[this.lg].PM,sLevel2Img,this.oBadges['20004']['lg'][this['lg']]['n'],iLeft,'none');
                        if(this.lg=='ar'){
                            this.PB=stringFormat(TEMPLATE[this.lg].progressBar,iPercent,iPercent-1,iRecharge,sLevel3Img,'toGray',sLevel2Img,'toGray',sLevel1Img,'');
                        }else{
                            this.PB=stringFormat(TEMPLATE[this.lg].progressBar,iPercent,iPercent-1,iRecharge,sLevel1Img,'',sLevel2Img,'toGray',sLevel3Img,'toGray');
                        }
                    }else{
                        iLeft=(200-iRecharge).toFixed(2);
                        this.PM=stringFormat(TEMPLATE[this.lg].PM,sLevel1Img,this.oBadges['20003']['lg'][this['lg']]['n'],iLeft,'none');
                        if(this.lg=='ar'){
                            this.PB=stringFormat(TEMPLATE[this.lg].progressBar,iPercent,iPercent-1,iRecharge,sLevel3Img,'toGray',sLevel2Img,'toGray',sLevel1Img,'toGray');
                        }else{
                            this.PB=stringFormat(TEMPLATE[this.lg].progressBar,iPercent,iPercent-1,iRecharge,sLevel1Img,'toGray',sLevel2Img,'toGray',sLevel3Img,'toGray');
                        }
                    }
                    this.HasPM=stringFormat(TEMPLATE[this.lg].HasPM, this.PM,this.PB);
                }

                //(2) 如果用户没有获得的徽章 --当前徽章模块为空
                if(oData['badges'].length<=0){
                    this.HasMedal="";
                }else{
                    //渲染已得徽章
                    this.GotMedals='';

                    oData['badges'].forEach(function(item,index){
                        if(item['id'] in this.oBadges){
                            var sImgSrcBad2='';
                            var temp=this.oBadges[item['id']];
                            var leftDay=Math.ceil((new Date(item['expire'])-new Date().getTime())/(1000*60*60*24));
                            if(leftDay>0){
                                sImgSrcBad2=temp['p']?DOMAIN_CONFIG['IMAGE_DOMAIN']+temp['p']:DOMAIN_CONFIG['IMAGE_DOMAIN']+'systemRes/img/default/nophoto.jpg';
                                this.GotMedals+=stringFormat(TEMPLATE[this.lg].GotMedal,sImgSrcBad2,temp['lg'][this['lg']]['n'],DateTime.showtime(new Date(item['expire'])),leftDay);
                            }
                        }
                    }.bind(this));

                    if(this.GotMedals.length>0){
                        this.HasMedal=stringFormat(TEMPLATE[this.lg].HasMedal, this.GotMedals);
                    }else{
                        this.HasMedal="";
                    }

                }

                //如果（1）和（2）都成立，整个第一大模块为空
                if(oData['badges'].length<=0 && !oData['monthtotal']){
                    this.MyMedalBox='';
                }else{
                    if(this.HasPM=='' && this.HasMedal==''){
                        this.MyMedalBox='';
                    }else{
                        this.MyMedalBox=stringFormat(TEMPLATE[this.lg].MyMedalBox,this.HasPM,this.HasMedal);
                    }
                }
            }

            //渲染所有徽章
            this.sUserMedals='';
            var sImgSrcBad='';
            for(var index in oBadges){
                if(oBadges.hasOwnProperty(index)){
                    var item=oBadges[index];
                    sImgSrcBad=item['p']?DOMAIN_CONFIG['IMAGE_DOMAIN']+item['p']:DOMAIN_CONFIG['IMAGE_DOMAIN']+'systemRes/img/default/nophoto.jpg';
                    if(item['lg'][this['lg']] && item['lg'][this['lg']]['n']==undefined){
                        ['lg'][this['lg']]['n']="";
                    }
                    if(item['lg'][this['lg']] && item['lg'][this['lg']]['t']==undefined){
                        item['lg'][this['lg']]['t']="";
                    }

                    if(10013!=index && 10014!=index){
                        if(this['lg']=='en'){
                            (function(iTemp){
                                this.sUserMedals +=stringFormat(iTemp,sImgSrcBad,item['lg'][this['lg']]['n'],item['lg'][this['lg']]['t']);
                            }.bind(this))(TEMPLATE[this.lg].UserMedal);
                        }else if(this['lg']=='ar'){
                            (function(iTemp){
                                this.sUserMedals +=stringFormat(iTemp,item['lg'][this['lg']]['n'],item['lg'][this['lg']]['t'],sImgSrcBad);
                            }.bind(this))(TEMPLATE[this.lg].UserMedal);
                        }
                    }

                }
            }

            this.MedalInfoBox=stringFormat(TEMPLATE[this.lg].MedalInfoBox,this.sUserMedals);
        },
        doLoginKey:function(loginKey,oLevels,oBadges){
            var sUrl='service/user/v3/property?loginKey='+loginKey+'&user=""'+'&vip=""'+'&badge=""'+'&mrt=""';
            Bussiness.getData(sUrl,function(data){

                if(data['code']==0){ //code 0
                    data=data['dataInfo'];

                    var sVipType=data['vip']['type']==0?'vip_icon':'vip_icon Svip_icon';
                    var iCurLevel=data['user']['level'];
                    var iCurScore=data['user']['score'];
                    var iNextLevel=iCurLevel+1>=50?50:iCurLevel+1;
                    var iLeftEX=oLevels[iNextLevel]['score']-iCurScore;
                    var iCanvasDeg=parseInt(100*(iCurScore-oLevels[iCurLevel]['score'])/(oLevels[iNextLevel]['score']-oLevels[iCurLevel]['score']));
                    var sImgSrcL=data['user']['pic']?DOMAIN_CONFIG['IMAGE_DOMAIN']+data['user']['pic']:DOMAIN_CONFIG['IMAGE_DOMAIN']+'systemRes/img/default/nophoto.jpg';
                    if(data['user']['score']==0){
                        iCanvasDeg=0;
                    }
                    this.sLogin_show =stringFormat(TEMPLATE[this.lg].Login_show,data['user']['nk'],iCanvasDeg,data['user']['level'],sVipType,iLeftEX,iNextLevel,sImgSrcL);

                    this.renderBadges(oBadges,data);

                    this.sMain =stringFormat(TEMPLATE[this.lg].MAIN,this.sLogin_show,iCurScore,this.MyMedalBox,this.MedalInfoBox);
                    this.container.html( this.sMain );
                    this.startNum=0;
                    this.levels(iCanvasDeg);
                    this['mylevel_'+this['lg']](iCurLevel);
                    this.tagSwitch();
                    this.toPay();
                }else{ //code 99
                    var oBadgesGet=null;
                    this.renderBadges(oBadges,oBadgesGet);
                    this.sMain =stringFormat(TEMPLATE[this.lg].MAIN,TEMPLATE[this.lg].Login_out,'0',this.MyMedalBox,this.MedalInfoBox);
                    this.container.html( this.sMain );
                    this.tagSwitch();
                    this.toLogin();
                }
            }.bind(this),null,'isV3');
        },
        toPay:function(){
            $('#toPay').click(function(){
                var sMakeLink= Bridge.link.logic('pay',null);
                Bridge.callNative(sMakeLink);
            });
        }
    };

    Page.run();
});


