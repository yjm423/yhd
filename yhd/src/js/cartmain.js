// 主文件入口
require.config({
    paths:{
        jquery:'./jquery',
        cookie:"https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min",
        cart:'./cart'
    }
});

require(['jquery','cookie','cart'],function($,cookie,cart){
    cart.render();
    cart.numchange();
});
