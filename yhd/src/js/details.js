let baseUrl = "http://localhost/project/yhd/yhd/";
import { Tool } from './tool.js';
var tool = new Tool();
class Detailrender {

    init() {
        let id = location.search.split('=')[1];
        tool.$ajax({
            url: baseUrl + 'lib/details.php',
            type: 'get',
            data: {
                id: id
            },
            dataType: 'json',

        }).then(function (res) {
            // console.log(res);
            let urlarr = res.url.split(',');
            let typelist = res.typelist.split(',');
            var renderstr = '';
            var typestr = '';

            for (let i = 0; i < urlarr.length; i++) {

                renderstr += `
            <li><img src='${urlarr[i]}'
                    alt=""></li>
            `;
            }

            for (let j of typelist) {
                typestr += `
            <li style="border: 1px solid #e60021;">
                    <img src="${urlarr[0]}"
                        alt="">
                    <span>${j}</span>
                    <b></b>
                </li>
            `;
            }

            tool.$('.sImg').src = urlarr[1];  //小图
            tool.$('.bImg').src = urlarr[1];  //大图

            tool.$('.pics ul').innerHTML = renderstr;
            tool.$('.main_content  h1').innerHTML = res.title;
            tool.$('.main_content  .price').innerHTML = res.pricenew;
            tool.$('.sel .item').innerHTMl = typestr;
        });

    }



}



// 放大镜效果
class Amplify {
    constructor() {
        this.sIMG = tool.$('.s_img'); //小图的外框
    }
    init() {
        //点击图片列表 显示到小图中
        let _this = this;
        tool.$('.img_wrap ul').onclick = function (ev) {
            var ev = ev || window.event;
            if (ev.target.nodeName === 'IMG') {
                let url = ev.target.src;
                tool.$('.sImg').src = url;
                tool.$('.bImg').src = url;
            }
        }

        // 鼠标移入 显示小放 大放
        this.sIMG.onmouseover = function () {

            tool.$('.sf').style.display = 'block';
            tool.$('.bf').style.display = 'block';


            // 小放跟随鼠标
            document.onmousemove = function (ev) {
                var ev = ev || window.event;
                var l = ev.clientX - tool.$('.detail_item').offsetLeft - 19 - tool.$('.sf').offsetWidth / 2;
                var t = ev.clientY - tool.$('header').offsetHeight - tool.$('.crumb').offsetHeight - 29 - tool.$('.sf').offsetHeight / 2 + document.documentElement.scrollTop;

                tool.$('.sf').style.left = l + 'px';
                tool.$('.sf').style.top = t + 'px';


                if (l < 0) {
                    l = 0;
                } else if (l >= tool.$('.s_img').offsetWidth - tool.$('.sf').offsetWidth) {
                    l = tool.$('.s_img').offsetWidth - tool.$('.sf').offsetWidth;
                }
                tool.$('.sf').style.left = l + 'px';
                if (t < 0) {
                    t = 0;
                } else if (t >= tool.$('.s_img').offsetHeight - tool.$('.sf').offsetHeight) {
                    t = tool.$('.s_img').offsetHeight - tool.$('.sf').offsetHeight;
                }
                tool.$('.sf').style.top = t + 'px';



                // 大图跟随小图移动
                tool.$('.bImg').style.left = -tool.$('.bf').offsetWidth / tool.$('.sf').offsetWidth * l + 'px'
                tool.$('.bImg').style.top = -tool.$('.bf').offsetWidth / tool.$('.sf').offsetWidth * t + 'px';


            }

            _this.sIMG.onmouseout = function () {
                tool.$('.sf').style.display = 'none';
                tool.$('.bf').style.display = 'none';
            };



        }

    }

}




class TabSwitch {
    constructor() {
        this.prev=tool.$('.pics .prev');  //前一张
        this.next=tool.$('.pics .next');  //后一张
        this.oUL=tool.$('.img_wrap ul');  //移动的ul
    }
    init() {
        let _this=this;
        let l = '-=68';
        let r = '+=68';
        this.next.onclick=function(){
            let len = tool.$('.img_wrap li').length;
            _this.oUL.style.left=-68+'px';

            // if ($('.img_wrap ul').offset().left < -(len - 5) * 68) {
            //     $('.img_wrap ul').css('left', -(len - 5) * 68);
            // }

            // console.log($('.img_wrap ul').offset().left);
        }
        // $('.pics .prev').on('click', function () {
        //     if ($('.img_wrap ul').offset().left > 0) {
        //         $('.img_wrap ul').css('left', 0);
        //     } else {
        //         $('.img_wrap ul').css('left', r);
        //     }
        //     // console.log($('.img_wrap ul').offset().left);

        // });
    }
}

new Detailrender().init();
new Amplify().init();
new TabSwitch().init();
export { Detailrender, Amplify ,TabSwitch}
    // return {
    //    

    //    
    //   

    //     tabSwitch: function () {
    //         

    //     },

    //     // 购物车添加
    //     addgood: function () {
    //         // 点击按钮 数量添加 减少
    //         var num = 1
    //         $('.num_btn .add').on('click', function () {
    //             num++
    //             console.log($('.num').val(num));
    //         });
    //         $('.num_btn .reduce').on('click', function () {
    //             num--
    //             if (num < 1) {
    //                 num = 1
    //             }
    //             console.log($('.num').val(num));
    //         });

    //         // 点击添加到购物车
    //         $('.join_cart .btn').on('click', function () {


    //             let id = location.search.split('=')[1]
    //             let shop = $.cookie('shop'); // 获取cookie数据 判断是否存在
    //             console.log(shop);
    //             let product = {
    //                 id: id,
    //                 price: $('.main_content  .price').html(),
    //                 num: $('.num').val()
    //             };
    //             // 将product 放入cookie中



    //             if (shop) {
    //                 shop = JSON.parse(shop);

    //                 if (shop.some(elm => elm.id == id)) {
    //                     //   根据id判断商品是否存在 
    //                     shop.forEach(elm => {
    //                         elm.id == id ? elm.num = num : null;
    //                     });
    //                 } else {
    //                     shop.push(product);
    //                 }
    //             } else {
    //                 shop = [];
    //                 shop.push(product);
    //             }
    //             $.cookie('shop', JSON.stringify(shop));
    //         });

    //     }

    // }

