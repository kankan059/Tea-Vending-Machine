<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Second page</title>
        <link rel="stylesheet" href="css files/second-page.css">
        <link rel="stylesheet" href="css files/payment.css">
    </head>

    <body>
        <div id="container">

            <section class="heading">
                <img src="App Ladoo/Back Arrow.svg" alt="back-arrow">
                <h1>ready to pour?</h1>
            </section>
            <section class="payment">
                <div id="qr-code">
                    <div class="img">
                        <img src="" alt="qr code heere">
                    </div>
                </div>
                <div class="card">
                    <h3>your tea card</h3>
                    <div class="category">
                        <h4>items</h4>
                        <h4>quantity</h4>
                        <h4>price`</h4>
                    </div>
                    <div id="selected-list">

                        <div id="selected">
                            <h3>purple tea</h3>
                            <div id="quantity">
                                <img class="minusQuntity" src="App Ladoo/-.svg" alt="plus">
                                <span class="qt">1</span>
                                <img class="plusQuntity" src="App Ladoo/+.svg" alt="minus">
                            </div>
                            <h3><span class="rs" data-base="20">20</span> RS</h3>
                        </div>

                    </div>

                    <section class="approve">
                        <button class="cancelPayment">cancel</button>
                        <button class="donePayment">done</button>
                    </section>
                </div>
            </section>
        </div>
    </body>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.13.0/gsap.min.js" integrity="sha512-NcZdtrT77bJr4STcmsGAESr06BYGE8woZdSdEgqnpyqac7sugNO+Tr4bGwGF3MsnEkGKhU2KL2xh6Ec+BqsaHA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script src="javascript files/script.js"></script>

    </html>
</body>

</html>