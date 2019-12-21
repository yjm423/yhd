let baseUrl = "http://localhost/project/yhd/yhd";

import { $ajax } from './lib/ajaxpromise.js';
function render() {

    $ajax({
        url: `${baseUrl}/lib/getall.php`,
        type: 'get',
        dataType: 'json',

    }).then(function (res) {

        // console.log(res);
        let temp = '';
        let temp2 = '';

        res.forEach((elm, index) => {
            // console.log(index);
            if (index < 9) {
                temp += `
                        <li grouponid="307680326" data-pricedone="1">
                        <a href="${baseUrl}/src/html/details.html?id=${elm.id}"
                            title="${elm.title}" class="single_li">
                            <div class="single_top">
                                <div class="s_bz"></div>
                                <img class="top_img lazyload"
                                data-src="${elm.url}"
                                    alt="">
                            </div>
                            <div class="single_bottom">
                                <div class="s_title">${elm.title}</div>
                                <div class="s_bar">
                                    <div class="s_progress" style="width:97% "></div>
                                </div>
                                <div class="s_con">
                                    <div class="s_num">
                                        <span class="s_num_unit">￥</span>
                                        <span class="s_num_act">${elm.pricenew}</span>
                                        <span class="s_num_underline">
                                            <span class="s_num_unit">￥</span>
                                            <span class="s_num_line">${elm.priceold}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>`;
            } else {
                // console.log(index);

                // console.log(elm.url);
                let url = elm.url.split(',')
                // console.log(url);
                temp2 += `
                        <li class="good">
                        <a href="${baseUrl}/src/html/details.html?sid=${elm.sid}"
                        <div class="pic">
                            <img class="good_img lazyload"
                            data-src="${url[0]}"
                                alt="">
                        </div>
                        <p class="good_text">${elm.title}</p>
                        <p class="price">￥<span>${elm.pricenew}</span></p>
                        <div class="pro_tag clearfix">
                            <div class="goods_icon ticket_icon">领券</div>
                            <div class="goods_icon off_icon">满折</div>
                        </div>
                        </a>
                    </li>
                        `;
            }

        });


        var a = document.createElement("a");
        a.innerHTML = temp;
        document.querySelector('.singlelist').appendChild(a);
        document.querySelector('.good_wrap').innerHTML = temp2;
        var img=document.querySelectorAll('.lazyload');

        lazyload(img);
    })
}




render();
export {render}




//         // 模块tab切换
//         ranktab:function(){
//            var i=0;

//                 $('.arr_r').on('click',function(){
//                     if(i<2){
//                         console.log($(this).parent().find('.rank_inner'));
//                         $(this).parent().find('.rank_inner').animate({left:'-=210'},600);
//                         i++;

//                     }else{
//                         i=2;
//                     }    
//                 });

//                 $('.arr_l').on('click',function(){
//                     if(i>0){
//                         $(this).parent().find('.rank_inner').animate({left:'+=210'},600);
//                         i--;
//                     }else{
//                         i=0;
//                     }

//                 });


//         }
//     }
// })