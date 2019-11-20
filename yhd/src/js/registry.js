(function(){

    $('#username').on('blur',function(){
        $.ajax({
            type:'post',
            url:'http://localhost/project/yhd/yhd/lib/registry.php',
            data:{
                xingming:$(this).val(),
            },
            success:function(res){ 
                if(!res){  //不存在
                    $('.user_info').html('√');
                }else{
                    $('.user_info').html('用户已存在');
                }
            }
        });
    });

    $('#rgt_btn').on('click',function(){
        $.ajax({
            type:'post',
            url:'http://localhost/project/yhd/yhd/lib/registry.php',
            data:{
                username:$('#username').val(),
                password:$.md5($('#password').val())
            },
            success:function(result){
                console.log(result);
            }
        });
    });

})();