<?php
require '../database/_dbconnect.php';
echo "sucess";
$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    foreach ($data as $item) {
        $name = $item['name'];
        $quantitycup = $item['quantitycup'];
        $quantityMl = $item['quantityml'];
        $price = $item['price'];
        session_start();
        $order_id = $_SESSION['order_id'];

        $sql = "UPDATE `tea_orders` SET `quantity` = '$quantityMl', `cup` = '$quantitycup', `price` = '$price' WHERE `tea_name` = '$name' and `order_id` = '$order_id'";
        $connect->query($sql);
    }
    echo "successfully updated";
}

