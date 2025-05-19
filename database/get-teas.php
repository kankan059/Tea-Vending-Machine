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