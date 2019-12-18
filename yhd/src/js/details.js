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
        this.prev = tool.$('.pics .prev');  //前一张
        this.next = tool.$('.pics .next');  //后一张
        this.oUL = tool.$('.img_wrap ul');  //移动的ul
    }
    init() {
        let _this = this;
        let i = 0;  //记录点击的次数


        this.next.onclick = function () {

            let len = tool.$('.img_wrap li', 'all').length;
            let num = len - 5;// 点击次数
            if (len > 5) {

                i++;
                console.log("r" + i);
                if (i >= num) {
                    _this.next.style.display = 'none';
                }
                _this.oUL.style.left = -i * 68 + 'px';
                _this.prev.style.display = 'block';
            } else {
                _this.oUL.style.left = 0;
            }

        }
        this.prev.onclick = function () {
            let len = tool.$('.img_wrap li', 'all').length;

            if (len > 5) {
                i--;
                console.log('l' + i);
                if (i <= 0) {
                    i = 0;
                    _this.prev.style.display = 'none';
                }
                _this.oUL.style.left = -i * 68 + 'px';
                _this.next.style.display = 'block';
            }

        }

    }
}


class Addgood {
    constructor() {
        this.add = tool.$('.num_btn .add');
        this.num = tool.$('.num');
        this.reduce = tool.$('.num_btn .reduce');
        this.addbtn = tool.$('.join_cart .btn');
    }
    init() {
        let _this = this;
        var n = 1;
        // 数量加
        this.add.onclick = function () {
            n++;
            _this.num.value = n;

        }
        // 数量减
        this.reduce.onclick = function () {
            n--;
            if (n < 0) {
                n = 0;
            }
            _this.num.value = n;
        }

        //添加到cookie
        this.addbtn.onclick = function () {
            let id = location.search.split('=')[1];
            //查找是否存在cookie
            let shop = tool.getcookie('shop');  //获取的字符串

            let product = {
                sid: id,
                num: _this.num.value
            };
            // console.log(product);
            //将product存入cookie中
            if (shop) { //如果shop存在 转对象
                shop = JSON.parse(shop);  //对象
                //判断是否存在同一件商品 根据sid值判断 some方法返回值为布尔值
                // if(shop.some(ele=>ele.id==sid)){  

                // }
                // console.log(shop);
                // for (let i = 0; i < shop.length; i++) {
                //     console.log(shop[i].sid,id);
                // if (shop[i].sid == id) { //如果商品存在  

                //     shop[i].num = parseInt(shop[i].num) + parseInt(_this.num.value) ;
                //     tool.setcookie('shop', JSON.stringify(shop));

                // } else {  //不存在 

                //     shop.push(product);
                //     break;
                // }

                // }
                if (shop.some(elm => elm.sid == id)) {
                    //   根据id判断商品是否存在 
                    shop.forEach(elm => {
                        elm.sid == id && (elm.num = parseInt(elm.num)+parseInt(_this.num.value)) ;
                    });
                } else {
                    shop.push(product);
                }


                //    console.log(shop);
            } else {
                shop = [];
                shop.push(product);
            }
            tool.setcookie('shop', JSON.stringify(shop));
        }
    }
}
new Detailrender().init();
new Amplify().init();
new TabSwitch().init();
new Addgood().init();
export { Detailrender, Amplify, TabSwitch, Addgood }

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

