import {Tool} from './tool.js';
var tool=new Tool();
class Login{
    constructor(){
        this.btn=tool.$('.login_btn');
        this.username=tool.$('#username');
        this.password=tool.$('#password');
    }
    init(){
        let _this=this;
        let baseurl='http://localhost/project/yhd/yhd/lib/'
        this.btn.onclick=function(){   
            if(_this.username.value!==''&&_this.password.value!==''){
                
    
                tool.$ajax({
                    type:'post',
                    url:baseurl+'login.php',
                    data:{
                        username:_this.username.value,
                        password:_this.password.value
                    },
                }).then(function(result){
                    if(result){
                        alert('登录成功');
                        location.href='http://localhost/project/yhd/yhd/src/html/index.html';
                    }else{
                        alert('用户名或者密码错误');
                    }
                });
            }else{
                alert('用户名或者密码为空');
            }
            
            
           
    
    
        };
    }
    
};
new Login().init();