<?php
    include('./conn.php');

    $id = $_REQUEST['id'];

    $sql = "select * from goods where sid= '$id'";

    $res = $mysqli->query($sql);

    $row = $res->fetch_assoc();

    $json = json_encode($row);

    echo $json;

    $mysqli->close();

?>