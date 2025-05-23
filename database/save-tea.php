<?php
require '_dbconnect.php';
session_start();
$order_id = uniqid('order_');
$data = json_decode(file_get_contents('php://input'), true);
file_put_contents('teas.txt', print_r($data), true);
echo 'success fully recived';

if ($data) {
    foreach ($data as $tea) {
        $tea_name = $tea['name'];
        $quantity = $tea['quantity'];
        $sugar = $tea['sugar'];
        $price = $tea['price'];
        $cup = $tea['cup'];
        
        $sql = "INSERT INTO `tea_orders` (`sno`, `tea_name`, `quantity`,`cup`,`sugar`,`order_id`, `price`, `time`) VALUES (NULL, '$tea_name', '$quantity', '$cup' ,'$sugar','$order_id', '$price', current_timestamp())";
        
        $connect->query($sql);
    }
    echo "data saved";
    echo $order_id;
} else {
    echo "not saved";
}
