const teaVariants = [
  {
    name: "some tea",
    cup: 1,
    price: 20,
    quantity: 150, // in ml
    img: "https://i.postimg.cc/pdyLrTwS/Black-Tea.png",
    type: "water",
  },
  {
    name: "Geen tea",
    cup: 1,
    price: 20,
    quantity: 150, // in ml
    img: "https://i.postimg.cc/KYVvMbF8/Green-tea.png",
    type: "water",
  },
  {
    name: "herbal tea",
    cup: 1,
    price: 20,
    quantity: 150, // in ml
    img: "https://i.postimg.cc/vZYBRX3b/Herbal-Tea.png",
    type: "water",
  },
  {
    name: "lemon tea",
    cup: 1,
    price: 20,
    quantity: 150, // in ml
    img: "https://i.postimg.cc/ncZV708B/Lemon-Tea.png",
    type: "water",
  },
  {
    name: "red tea",
    cup: 1,
    price: 20,
    quantity: 150, // in ml
    img: "https://i.postimg.cc/wxDT7nr9/Red-Tea.png",
    type: "milk",
  },
  {
    name: "straw tea",
    cup: 1,
    price: 25,
    quantity: 150, // in ml
    img: "https://i.postimg.cc/nrfF31X8/Straw-Tea.png",
    type: "milk",
  },
  {
    name: "tulsi tea",
    cup: 1,
    price: 20,
    quantity: 150, // in ml
    img: "https://i.postimg.cc/Y0NpZmFv/Tulsi-Tea.png",
    type: "water",
  },
  {
    name: "violet tea",
    cup: 1,
    price: 30,
    quantity: 150, // in ml
    img: "https://i.postimg.cc/j57q61dQ/Violet-Tea.png",
    type: "milk",
  },
  {
    name: "yellow tea",
    cup: 1,
    price: 35,
    quantity: 150, // in ml
    img: "https://i.postimg.cc/bwmvqbBb/Yellow-Tea.png",
    type: "milk",
  },
];

let selectedArray = [];
let updatedArray = [];
let sugarLevel = 50;
let incrementPrice;
let totalPrice;
let updatedTeaName = [];
// UPDATE `tea_orders` SET `quantity` = '250', `cup` = '2', `price` = '50' WHERE `tea_orders`.`sno` = 63;
let updatePrice = () => {
  fetch("php_files/updateTea.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedArray),
  })
    .then((res) => res, json())
    .then((data) => console.log(data));
};

function buttonResponse() {
  const go = document.querySelector(".go"); //when the go button click
  if (go) {
    go.addEventListener("click", () => {
      if (selectedArray.length === 0) {
        alert("Please Select Atleast One Tea 🍵");
        return;
      }
      fetch("database/save-tea.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedArray),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("response:", data.order_id);
          window.location.href = `payment.php?order_id=${data.order_id}`;
        });
    });
  }

  const cancel = document.querySelector(".cancelPayment");
  if (cancel) {
    document.addEventListener("DOMContentLoaded", () => [
      cancel.addEventListener("click", () => {
        fetch("php_files/destroy.php", {
          method: "POST",
        }).then(() => {
          // window.location.href = "third-page.php";
          console.log("successfuly go destroyed the session form js");
          window.location.href = "second-page.php";
        });
      }),
    ]);
  }

  const don = document.querySelector(".donePayment");
  const qrBox = document.querySelector("#qr-code .img");
  const qrImg = document.querySelector("#qr-code .img img");

  if (don) {
    don.addEventListener("click", () => {
      //total price and store at the global total price
      fetch("php_files/total_price.php")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.total);
        totalPrice = data.total;
      });
      //fetch the updated tea
      fetch("php_files/updateTea.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedArray),
      })
      .then((res) => res.text())
      .then((data) => console.log(data));
      qrcode();
      
      //this is the animation use for qr code
      gsap.fromTo(
        qrBox,
        { y: -200, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
      );
      // qrBox.classList.add("active");
    });
    
    qrImg.addEventListener("click", () => {
      gsap.to(qrBox, {
        y: -200,
        opacity: 0,
        duration: 0.8,
        ease: "power2.in",
        // onComplete: () => {
        //   qrBox.classList.remove("active");
        // },
      });
    });
  }
}

let slide = () => {
  const plus = document.querySelector(".plus-range");
  const minus = document.querySelector(".minus-range");
  const range = document.querySelector("#range");
  if (plus && minus && range) {
    plus.addEventListener("click", () => {
      if (sugarLevel < 100) {
        sugarLevel += 25;
        range.value = sugarLevel;
      }
    });
    minus.addEventListener("click", () => {
      if (sugarLevel > 0) {
        sugarLevel -= 25;
        range.value = sugarLevel;
      }
    });

    range.addEventListener("input", () => {
      sugarLevel = parseInt(range.value);
    });
  }
};

function selectedteas() {
  document.addEventListener("click", (e) => {
    let box = e.target.closest(".box");
    if (box) {
      let name = box.querySelector("h3")?.textContent;

      let spans = box.querySelectorAll("h5 span");
      let quantity = spans[1]?.textContent.trim();
      let price = spans[0]?.textContent.split("/")[0].trim();
      let cup = 0;
      //for cup
      teaVariants.forEach((item) => {
        cup = item.cup;
      });

      // let duplicatte = selectedArray.some((selecttt) => selecttt.name === name); //it compare all element from the array even they wiill not met
      let index = selectedArray.findIndex((idx) => idx.name === name);
      console.log(index);
      if (index !== -1) {
        selectedArray.splice(index, 1); //delete one element from index 1
      } else {
        selectedArray.push({
          name,
          quantity,
          cup,
          price,
          sugar: sugarLevel + "%",
        });
      }

      // if (!duplicatte) {
      // }

      console.log(selectedArray);
    }
  });
}

function teaOptions(teas) {
  const box = document.querySelector(".right-side");
  clutter = "";
  if (box) {
    teas.forEach((key, index) => {
      clutter += `   <button class="box">
                            <div id="choose${index}" class="options">
                                <img src="${key.img}" alt="">
                            </div>
                            <h3>${key.name}</h3>
                            <h5><span>${key.price}/-</span> | <span>${key.quantity} ml</span> | <span>1cup</span>
                            </h5>
                            </button>`;
    });
    box.innerHTML = clutter;
  }
}

function incrementQuantity() {
  //here we used event deligation
  if (document.querySelector("#selected-list")) {
    document.querySelector("#selected-list").addEventListener("click", (e) => {
      //when increment the price
      if (
        e.target.classList.contains("plusQuntity") ||
        e.target.classList.contains("minusQuntity")
      ) {
        const qt = e.target.parentElement.querySelector(".qt"); //this is quantity tag
        const rs = e.target.closest("#selected").querySelector(".rs"); //this is rupee tag
        const teaName = e.target
          .closest("#selected")
          .querySelector("h3").textContent; //this is name of the targeted tea
        //if same name exist
        const existingIndex = updatedTeaName.findIndex((item) => {
          item.name === teaName;
        });
        let quantityMl = 250;
        let count = parseInt(qt.textContent);
        if (e.target.classList.contains("plusQuntity")) {
          count++;
        }
        if (e.target.classList.contains("minusQuntity")) {
          if (count > 0) count--;
        }
        qt.textContent = count;
        let basePrice = parseInt(rs.getAttribute("data-base"));
        incrementPrice = basePrice * count;
        quantityMl *= count;
        rs.textContent = incrementPrice;

        //fetch and update the details
        if (existingIndex > -1) {
          updatedArray[existingIndex].quantitycup = count;
          updatedArray[existingIndex].quantityml = quantityMl;
          updatedArray[existingIndex].price = incrementPrice;
        } else {
          updatedArray.push({
            name: teaName,
            quantitycup: count,
            price: incrementPrice,
            quantityml: quantityMl,
          });
        }
      }
      console.log(updatedArray);
    });
  }
}

let filteringTea = () => {
  const milk = document.querySelector(".milk");
  const water = document.querySelector(".water");
  if (milk && water) {
    milk.addEventListener("click", () => {
      if (milk.classList.contains("all")) {
        teaOptions(teaVariants);
        milk.textContent = "milk";
        milk.classList.remove("all");
      } else {
        let milkTea = teaVariants.filter((item) => item.type === "milk");
        teaOptions(milkTea);
        milk.textContent = "ALL";
        milk.classList.add("all");
        water.classList.remove("all");
        water.textContent = "water";
      }
    });
    water.addEventListener("click", () => {
      if (water.classList.contains("all")) {
        teaOptions(teaVariants);
        water.textContent = "water";
        water.classList.remove("all");
      } else {
        let waterTea = teaVariants.filter((item) => item.type === "water");
        teaOptions(waterTea);
        water.textContent = "ALL";
        water.classList.add("all");
        milk.classList.remove("all");
        milk.textContent = "milk";
      }
    });
  }
};

//fetchin data from database and give to the payment page
function fetchTea() {
  fetch("database/get-teas.php")
    .then((res) => res.json())
    .then((data) => {
      const urlParams = new URLSearchParams(window.location.search);
      const currentOrderID = urlParams.get("order_id");
      let clutter = "";

      data.forEach((item) => {
        // console.log(item);
        if (item.order_id === currentOrderID)
          clutter += ` <div id="selected">
                            <h3>${item.tea_name}</h3>
                            <div id="quantity">
                                <img class="minusQuntity" src="App Ladoo/-.svg" alt="plus">
                                <span class="qt">${item.cup}</span>
                                <img class="plusQuntity" src="App Ladoo/+.svg" alt="minus">
                            </div>
                            <h3><span class="rs" data-base="${item.price}" >${item.price}</span> RS</h3>
                        </div>`;
      });
      if (document.querySelector("#selected-list")) {
        document.querySelector("#selected-list").innerHTML = clutter;
      }
    });
}

let gsappp = () => {
  let allBoxes = document.querySelector(".right-side");
  if(allBoxes){
    document.addEventListener("DOMContentLoaded", () => {
      allBoxes.addEventListener("click", (e) => {
        let theBox = e.target.closest(".box");
        // theBox.classList.add('activeBox');
        if (theBox && !e.target.classList.contains("activeButton")) {
          gsap.to(theBox, {
            backgroundColor: "#6d623a",
            scale: 0.98,
            duration: 0.32,
          });
          e.target.classList.add("activeButton");
        } else {
          gsap.to(theBox, {
            backgroundColor: "#f1dc8d",
            scale: 1,
            duration: 0.32,
          });
          e.target.classList.remove("activeButton");
        }
      });
    });
  }
};

let qrcode = () => {
  fetch("php_files/qrcode.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount: totalPrice * 100, // paise me bhejna hai
      name: "kongkon ray", // optional
      contact: "6003963538", // optional
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if(data.short_url){
        let qrLink = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
          data.short_url
        )}&size=200x200`;
        document.querySelector("#qr-code .img img").src = qrLink;
      }
      else {
        alert('not found')
      }
    });
};

teaOptions(teaVariants);
incrementQuantity();
buttonResponse();
selectedteas();
slide();
filteringTea();
fetchTea();
gsappp();
