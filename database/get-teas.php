<?php 
require '_dbconnect.php';

$sql = 'select * from `tea_orders`';

$result = $connect->query($sql);

$teas =[];
while($row = $result->fetch_assoc()){
    $teas[] = $row;
}
echo json_encode($teas);
?>

<?php
// $priceSql = "select price from `tea_orders` where `order_id` = '$order_id'";

// $priceeEach = $connect->query($priceSql);
// $total_price = 0;
// while($row = $priceeEach->fetch_assoc()){
//     $total_price += $row['price'];
// }
// echo json_encode([
//     "item" => $teas,
//     "total" => $total_price
// ]);
?>