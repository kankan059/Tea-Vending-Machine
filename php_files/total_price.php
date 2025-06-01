<?php
require '../database/_dbconnect.php';

session_start();
$order_id = $_SESSION['order_id'];

$priceSql = "select price from `tea_orders` where `order_id` = '$order_id'";

$priceeEach = $connect->query($priceSql);
$total_price = 0;
while($row = $priceeEach->fetch_assoc()){
    $total_price += $row['price'];
}
echo json_encode(["total" => $total_price]); 
