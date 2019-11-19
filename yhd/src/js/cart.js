let baseUrl = "http://localhost/project/yhd/yhd/";
define(['jquery','cookie'],function($,cookie){

    return {
        render:function(){
            let shop =$.cookie('shop');
            if(shop){
                shop=JSON.parse(shop);
                // console.log(shop);
                let id=shop.map(elm=>elm.id).join();
                let _this=this;
                // console.log(id);
                $.ajax({
                    url:baseUrl+'lib/cart.php',
                    data:{
                        id:id
                    },
                    type:'get',
                    dataType:'json',
                    success:function(res){
                        // console.log(res);
                        let str='';
                        res.forEach((elm,index) => {
                            // console.log(elm,index);
                            str+=`
                            <li class="clearfix">
                            <input type="checkbox">
                            <img src="${elm.url.split(',')[0]}" alt="">
                            <p class="item_tit">${elm.title} </p>
                            <span class="price">${elm.pricenew}</span>
                            <div class="num">
                                <span class='reduce'>-</span>
                                <input type="text" value='${shop[index].num}'>
                                <span class='add'>+</span>
                            </div>
                            <div class="price_wrap">
                                <div class="price">${elm.pricenew*shop[index].num}</div>
                            </div>
                            <div class="item_act"><button>删除</button></div>
                            </li>
                            `;
                        });
                      $('.cart_prod ul').append(str);  
                      _this.numchange();
                    },
                    
                })

            }
            
        },

        numchange:function(){
           
           
            $('.num .add').on('click',function(){
                var num=$(this).parent().children('input').val();
                num++;
                
                $(this).parent().children('input').val(num)
                console.log(num);
 
            });
            $('.num .reduce').on('click',function(){
                var num=$(this).parent().children('input').val();
               
                if(num<=1){
                    num=0
                }else{
                    num--;
                
                    $(this).parent().children('input').val(num)
                    console.log(num);
                }
 
            });
        }
    }
})