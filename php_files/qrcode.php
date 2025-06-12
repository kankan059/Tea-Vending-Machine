<?php
require '../database/_dbconnect.php'; // if needed
$key_id = 'rzp_test_JlrKGLOC7cXIgR';
$key_secret = '2ZbOOhF5PDjftkB7Ne5GR9Lu';

$input = json_decode(file_get_contents("php://input"), true);
$amount = $input['amount'];
$customer_name = $input['name'];
$contact = $input['contact'];

$data = [
  "amount" => $amount, // paise
  "currency" => "INR",
  "accept_partial" => false,
  "description" => "Tea Order Payment",
  "customer" => [
    "name" => $customer_name,
    "contact" => $contact
  ],
  "notify" => [
    "sms" => true,
    "email" => false
  ]
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://api.razorpay.com/v1/payment_links");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_USERPWD, $key_id . ":" . $key_secret);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
$response = curl_exec($ch);
curl_close($ch);

$resData = json_decode($response, true);
echo json_encode(['short_url' => $resData['short_url']]);