<?php
    include('./conn.php');

    
    if($_REQUEST['id']){
        $id = $_REQUEST['id'];
        $sql = "select * from goods where sid in ($id)";

        $res = $mysqli->query($sql);
    
        $arr = array();
    
        while($row = $res->fetch_assoc()){
            array_push($arr,$row);
        }
    
        $json = json_encode($arr);
    
        echo $json;
    
    }
   
    $mysqli->close();
?>