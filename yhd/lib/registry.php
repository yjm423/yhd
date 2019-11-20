<?php

include "conn.php";//引入数据库连接文件

if(isset($_POST['xingming'])){//获取用户名
    $name=@$_POST['xingming'];//取值
    $result=$mysqli->query("select * from user where username='$name'");//如果能够找到记录，用户名存在的
    if($result->fetch_assoc()){//如果$result->fetch_assoc()有值，返回true,否则就是false;
        echo true;//1 存在
    }else{
        echo false;
    }
}else if(isset($_POST['username'])&&isset($_POST['password'])){//获取用户名
    $username=@$_POST['username'];//取值
    $password=@$_POST['password'];
    $mysqli->query("insert user values(null,'$username','$password')");
}
