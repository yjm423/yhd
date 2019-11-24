let baseUrl = "http://localhost/project/yhd/yhd/";
define(['jquery', 'cookie'], function ($, cookie) {

    return {
        render: function () {
            let shop = $.cookie('shop');
            if (shop) {
                shop = JSON.parse(shop);
                // console.log(shop);
                let id = shop.map(elm => elm.id).join();
                let _this = this;
                // console.log(id);
                $.ajax({
                    url: baseUrl + 'lib/cart.php',
                    data: {
                        id: id
                    },
                    type: 'get',
                    dataType: 'json',
                    success: function (res) {
                        // console.log(res);
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
                            <div class="item_act"> <a href="javascript:location.reload();"><button>删除</button></a></div>
                           
                            </li>
                            `;
                        });
                        $('.cart_prod ul').append(str);
                        _this.numchange();
                        
                    },

                })

            }

        },

        numchange: function () {

            // 数量添加
           
            $('.num .add').on('click', function () {
                var num = $(this).parent().children('input').val();
                num++;

                $(this).parent().children('input').val(num);

                // 单个商品总价
                single_price($(this));
                // 调用函数 获取总价
                total_price();

                // 点击添加 将数量存到cookie中
                // let shop =$.cookie('shop');
                // if(shop){
                //     shop=JSON.parse(shop);
                //     console.log(shop);


                // }





            });

            // 数量减少
            $('.num .reduce').on('click', function () {
                var num = $(this).parent().children('input').val();

                if (num <= 1) {
                    num = 0
                } else {
                    num--;
                    $(this).parent().children('input').val(num);

                    // 单个商品总价
                    single_price($(this));
                    // 总价
                    total_price();
                }
            });

            // 商品总数量： 从cookie 中获取
            let shop = $.cookie('shop');
            if (shop) {
                shop = JSON.parse(shop);

                $('.num_count b').html(shop.length);
            }


            // 输入数量 价格与总价 改变
            $('.num input').on('blur', function () {
                single_price($(this));
                total_price();
            });

            // 点击删除商品
            $('button').on('click', function () {

                $(this).parents('li').remove();
                // 渲染商品中属性绑定id  获取商品id
                let sid = $(this).parents('li').attr('id');

                // 删除cookie
                shop.forEach((elm, i) => {
                    // console.log(elm.id,i);
                    if (elm.id === sid) {

                        shop.splice(i, 1);

                    }
                    $.cookie('shop', JSON.stringify(shop));
                    console.log($.cookie('shop'));

                });
               
                window.location.reload;

            });

            // 封装函数 获取总价
            function total_price() {

                let total_s = 0
                let allprice=$('input:checked').not('.allselector').parents('li').find('.all_price');
            //    console.log(allprice);
                for (let i of allprice) {
                    //   console.log($('.all_price'))
                    total_s += Number($(i).html());
                    // console.log(total_s);
                }
                $('.money b').html(total_s.toFixed(2));
            }
            total_price();


            // 封装函数 获取单个商品总价
            function single_price(obj) {

                var sin_price = obj.parents('li').find('.price');
                var Price = ($(sin_price).html() * obj.parent().children('input').val()).toFixed(2);
                // console.log(Price);
                obj.parents('li').find('.all_price').html(Price);
            }

            //全选框效果
            $('.allselector').on('click',function(){
                
                if($(this).prop('checked')){  
                    $('input').prop('checked',true);
                }else{
                    $('input').prop('checked',false);
                }


            });
             //选中的复选框(不包括全选按钮)的个数和总共的复选框的个数(不包括全选按钮)长度一致。
             let inputslength=$("input[type='checkbox']").length;//复选框的个数(不包括全选按钮)
          
             console.log(inputslength);
             $('input').on('click',function(){
                if($('.cart_prod input:checked').not('.allselector').length===inputslength-1){
                    $('.allselector').prop('checked',true);
                }else{
                    $('.allselector').prop('checked',false);
                }
                total_price();
             });
        },

    
    }
})