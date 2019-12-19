let baseUrl = "http://localhost/project/yhd/yhd/";

import { Tool } from './tool.js';
var tool = new Tool();
class CartRender {
    constructor() {
        this.add = tool.$('.num .add', 'all');
    }
    init() {
        let _this = this;
        let shop = tool.getcookie('shop');  //存储的是数组对象
        if (shop && shop !== '[]') {  //shop存在 且不为空数组
            shop = JSON.parse(shop);
            // console.log(shop);
            let id = shop.map(elm => elm.sid).join();
            // console.log(id);
            tool.$ajax({
                url: baseUrl + 'lib/cart.php',
                data: {
                    id: id
                },
                type: 'get',
                dataType: 'json',
            }).then(function (res) {
                let str = '';
                res.forEach((elm, index) => {
                    // console.log(elm,index);
                    str += `
                        <li class="clearfix" id=${elm.sid}>
                        <input type="checkbox" checked>
                        <img src="${elm.url.split(',')[0]}" alt="">
                        <p class="item_tit">${elm.title} </p>
                        <span class="price">${elm.pricenew}</span>
                        <div class="num">
                            <span class='reduce'>-</span>
                            <input type="text" value='${shop[index].num}'>
                            <span class='add'>+</span>
                        </div>
                        <div class="price_wrap">
                            <div class="all_price">${(elm.pricenew * shop[index].num).toFixed(2)}</div>
                        </div>
                        <div class="item_act"> <a href="javascript:location.reload();"><button class='del'>删除</button></a></div>

                        </li>
                    `;
                    tool.$('.cart_prod ul').innerHTML = str;
                });

                _this.numchange();
                _this.delgood();
                _this.selector();

            });

        }





    }
    numchange() {
        // 数量加
        let _this = this;
        let add = tool.$('.num .add', 'all');
        for (let i = 0; i < add.length; i++) {
            add[i].onclick = function () {
                this.parentNode.children[1].value++;

                //将cookie中的数量进行更改
                _this.numcookie(add[i]);
                _this.price(add[i]);
            }

        }

        // 数量减
        let reduce = tool.$('.num .reduce', 'all');
        for (let i = 0; i < reduce.length; i++) {
            reduce[i].onclick = function () {
                if (this.parentNode.children[1].value > 0) {
                    this.parentNode.children[1].value--;

                    _this.numcookie(reduce[i]);
                    _this.price(reduce[i]);
                }

            }
        }

        // 数量输入 失去焦点
        let numInputs = tool.$('.num input', 'all');
        for (let i = 0; i < numInputs.length; i++) {
            numInputs[i].onblur = function () {
                _this.price(numInputs[i]);
                _this.numcookie(numInputs[i]);
            }
        }

    }

    // 更改cookie中的数量
    numcookie(obj) {
        let shop = tool.getcookie('shop');
        shop = JSON.parse(shop);
        let id = obj.parentNode.parentNode.id;
        shop.forEach(elm => {
            elm.sid == id && (elm.num = obj.parentNode.children[1].value);
        });
        tool.setcookie('shop', JSON.stringify(shop));

    }

    // 单个商品的总价=单价*数量
    price(obj) {
        let S_price = obj.parentNode.previousElementSibling.innerHTML;
        let num = obj.parentNode.children[1].value;
        obj.parentNode.nextElementSibling.innerHTML = (S_price * num).toFixed(2);
    }

    // 所有商品的总价=单个商品的总价的和
    allprice() {

    }

    // 删除商品列表 ---删除cookie
    delgood() {
        let delbtns = tool.$('.del', 'all');
        for (let i = 0; i < delbtns.length; i++) {
            delbtns[i].onclick = function () {
                //删除cookie
                let id = this.parentNode.parentNode.parentNode.id;
                let shop = tool.getcookie('shop');
                shop = JSON.parse(shop);
                if (shop) {
                    shop.forEach((elm, i) => {
                        elm.sid == id && (shop.splice(i, 1));
                    });
                    tool.setcookie('shop', JSON.stringify(shop));
                }

            }
        }
    }

    //全选框
    selector() {
        //查找含有checkbox的元素
        let sel = tool.$('input', 'all');
        let newsel=[];
       for(let i=0;i<sel.length;i++){
        if(sel[i].type==='checkbox'){
            newsel.push(sel[i]);
        }
       }
       //点击事件
      for(let i=0;i<newsel.length;i++){
        newsel[i].onclick=function(){
            if(this.checked){

            }
            console.log(this.checked);
        }
      }
      
    }

}
new CartRender().init();
export { CartRender }











        //     // 商品总数量： 从cookie 中获取
        //     let shop = $.cookie('shop');
        //     if (shop) {
        //         shop = JSON.parse(shop);

        //         $('.num_count b').html(shop.length);
        //     }


        //     // 输入数量 价格与总价 改变
        //     $('.num input').on('blur', function () {
        //         single_price($(this));
        //         total_price();
        //     });

        //     // 点击删除商品
        //    

        //         window.location.reload;

        //     });

        //     // 封装函数 获取总价
        //     function total_price() {

        //         let total_s = 0
        //         let allprice=$('input:checked').not('.allselector').parents('li').find('.all_price');
        //     //    console.log(allprice);
        //         for (let i of allprice) {
        //             //   console.log($('.all_price'))
        //             total_s += Number($(i).html());
        //             // console.log(total_s);
        //         }
        //         $('.money b').html(total_s.toFixed(2));
        //     }
        //     total_price();




        //     //全选框效果
        //     $('.allselector').on('click',function(){

        //         if($(this).prop('checked')){  
        //             $('input').prop('checked',true);
        //         }else{
        //             $('input').prop('checked',false);
        //         }


        //     });
        //      //选中的复选框(不包括全选按钮)的个数和总共的复选框的个数(不包括全选按钮)长度一致。
        //      let inputslength=$("input[type='checkbox']").length;//复选框的个数(不包括全选按钮)

        //     //  console.log(inputslength);
        //      $('input').on('click',function(){
        //         if($('.cart_prod input:checked').not('.allselector').length===inputslength-1){
        //             $('.allselector').prop('checked',true);
        //         }else{
        //             $('.allselector').prop('checked',false);
        //         }
        //         total_price();
        //      });
        // }



// })