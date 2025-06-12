<?php
include 'database/_dbconnect.php';
// include 'database/save-tea.php';
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Second page</title>
    <link rel="stylesheet" href="css files/second-page.css">
</head>

<body>
    <div id="container">
        <section class="heading">
            <img src="App Ladoo/Back Arrow.svg" alt="back-arrow">
            <h1>CHOOSE YOUR TEA</h1>
        </section>
        <section class="middle">
            <section class="left-side">
                <!-- <div id="line-17"></div> -->
                <h3>prefrence</h3>

                <button class="left-button milk ">Milk</button>
                <button class="left-button water ">water</button>


                <button class="left-button sugar">sugar</button>
                <input type="range" id="range" class="range" min="0" max="100">
                <div class="gp">
                    <img class="minus-range" src="App Ladoo/-.svg" alt="minus">
                    <img class="plus-range" src="App Ladoo/+.svg" alt="plus">
                </div>
                <button class="left-button go">Go</button>
                
            </section>
            <section class="right-side">
                <!-- <form action="payment.php" method="post"> -->
                    <button class="box">
                    </button>
                <!-- </form> -->
                <section class="bottom">
                    <h2>CANT CHOOSE? GET RECOMMEND FROM US!</h2>
                </section>

            </section>
        </section>
    </div>
</body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js" integrity="sha512-NcZdtrT77bJr4STcmsGAESr06BYGE8woZdSdEgqnpyqac7sugNO+Tr4bGwGF3MsnEkGKhU2KL2xh6Ec+BqsaHA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script src="javascript files/script.js"></script>

</html>