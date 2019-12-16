let baseUrl = "http://localhost/project/yhd/yhd/";

define(['jquery', 'cookie'], function ($, cookie) {
    return {
        render: function () {
            console.log(location.search.split('='));
            let id = location.search.split('=')[1];
            // console.log(1);
            $.ajax({
                url: baseUrl + 'lib/details.php',
                type: 'get',
                data: {
                    id: id
                },
                dataType: 'json',
                success: function (res) {
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
                    $('.sImg').attr({ src: urlarr[1] });  //小图
                    $('.bImg').attr({ src: urlarr[1] });  //大图

                    $('.pics ul').append(renderstr);
                    $('.main_content  h1').html(res.title)
                    $('.main_content  .price').html(res.pricenew);
                    $('.sel .item').append(typestr);

                }

            });



        },

        // 放大镜效果
        amplify: function () {

            $('.img_wrap ul').on('click', 'li', function () {
                $('.sImg').attr({ src: $(this).find('img').attr('src') });
                $('.bImg').attr({ src: $(this).find('img').attr('src') });

            });

            $('.s_img').on('mouseover', function () {
                $('.sf').css('display', 'block')
                $('.bf').css('display', 'block')


                // 小放跟随鼠标
                $(document).on('mousemove', function (ev) {

                    var l = ev.clientX - $('.s_img').offset().left - $('.sf').width() / 2;
                    var t = ev.clientY - $('.s_img').offset().top - $('.sf').width() / 2 + $(document).scrollTop();


                    $('.sf').css('top', t);
                    if (l < 0) {
                        l = 0;
                    } else if (l >= $('.s_img').width() - $('.sf').width()) {
                        l = $('.s_img').width() - $('.sf').width();
                    }
                    $('.sf').css('left', l);
                    if (t < 0) {
                        t = 0;
                    } else if (t >= $('.s_img').height() - $('.sf').height()) {
                        t = $('.s_img').height() - $('.sf').height();
                    }
                    $('.sf').css('top', t);

                    // 大图跟随小图移动

                    $('.bImg').css('left', -$('.bf').width() / $('.sf').width() * l);
                    $('.bImg').css('top', -$('.bf').width() / $('.sf').width() * t);

                });

            });
            $('.s_img').on('mouseout', function () {
                $('.sf').css('display', 'none')
                $('.bf').css('display', 'none')
            });


        },

        tabSwitch: function () {
            let l = '-=68';
            let r = '+=68';
            $('.pics .next').on('click', function () {

                let len = $('.img_wrap li').length;
                $('.img_wrap ul').css('left', l);

                if ($('.img_wrap ul').offset().left < -(len - 5) * 68) {
                    $('.img_wrap ul').css('left', -(len - 5) * 68);
                }

                console.log($('.img_wrap ul').offset().left);

            });
            $('.pics .prev').on('click', function () {
                if ($('.img_wrap ul').offset().left > 0) {
                    $('.img_wrap ul').css('left', 0);
                } else {
                    $('.img_wrap ul').css('left', r);
                }
                // console.log($('.img_wrap ul').offset().left);

            });

        },

        // 购物车添加
        addgood: function () {
            // 点击按钮 数量添加 减少
            var num = 1
            $('.num_btn .add').on('click', function () {
                num++
                console.log($('.num').val(num));
            });
            $('.num_btn .reduce').on('click', function () {
                num--
                if (num < 1) {
                    num = 1
                }
                console.log($('.num').val(num));
            });

            // 点击添加到购物车
            $('.join_cart .btn').on('click', function () {


                let id = location.search.split('=')[1]
                let shop = $.cookie('shop'); // 获取cookie数据 判断是否存在
                console.log(shop);
                let product = {
                    id: id,
                    price: $('.main_content  .price').html(),
                    num: $('.num').val()
                };
                // 将product 放入cookie中



                if (shop) {
                    shop = JSON.parse(shop);

                    if (shop.some(elm => elm.id == id)) {
                        //   根据id判断商品是否存在 
                        shop.forEach(elm => {
                            elm.id == id ? elm.num = num : null;
                        });
                    } else {
                        shop.push(product);
                    }
                } else {
                    shop = [];
                    shop.push(product);
                }
                $.cookie('shop', JSON.stringify(shop));
            });

        }

    }

});