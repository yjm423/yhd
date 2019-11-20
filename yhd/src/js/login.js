(function(){

    $('.login_btn').on('click',function(){
        
        if($('#username').val()!==''&&$('#password').val()!==''){
            

            $.ajax({
                type:'post',
                url:'http://localhost/project/yhd/yhd/lib/login.php',
                data:{
                    username:$('#username').val(),
                    password:$.md5($('#password').val())
                },
                success:function(result){
                    
                    if(result){
                        alert('登录成功');
                        location.href='http://localhost/project/yhd/yhd/src/html/index.html';
                    }else{
                        alert('用户名或者密码错误');
                    }
                    
                }
            });
        }else{
            alert('用户名或者密码为空');
        }
        
        
       


    });
})();