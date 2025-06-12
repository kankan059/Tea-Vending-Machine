<?php
require '_dbconnect.php';
session_start();
header('Content-type: application/json'); //its important for json
$order_id = uniqid('order_');
$_SESSION['order_id'] = $order_id;
$data = json_decode(file_get_contents('php://input'), true);
file_put_contents('teas.txt', print_r($data , true));
// echo 'success fully recived';

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
    echo json_encode(["order_id" => $order_id]); //i use this so the header is so important
    // header('location: payment.php?order_id=$order_id');
} 
