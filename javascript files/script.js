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
    price: 20,
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
    price: 20,
    quantity: 150, // in ml
    img: "https://i.postimg.cc/j57q61dQ/Violet-Tea.png",
    type: "milk",
  },
  {
    name: "yellow tea",
    cup: 1,
    price: 20,
    quantity: 150, // in ml
    img: "https://i.postimg.cc/bwmvqbBb/Yellow-Tea.png",
    type: "milk",
  },
];

let selectedArray = [];
let sugarLevel = 50;

function buttonResponse() {
  const go = document.querySelector(".go");
  if(go){
    go.addEventListener("click", () => {
      fetch('database/save-tea.php',{
        method : 'POST',
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(selectedArray),
      }).then((res)=> res.text())
      .then(data => console.log("response:", data))
      
      window.location.href = "payment.php";
    });
  }
}

let slide = () => {
  const plus = document.querySelector(".plus-range");
  const minus = document.querySelector(".minus-range");
  const range = document.querySelector("#range");
  if(plus && minus && range){
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
      let cup = 0
      //for cup 
      teaVariants.forEach(item=>{
        cup = item.cup;
      })

      let duplicatte = selectedArray.some((selecttt) => selecttt.name === name);
      if (!duplicatte) {
        selectedArray.push({ name, quantity, cup, price, sugar: sugarLevel + "%"});
      }
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
  const plusSymbol = document.querySelector(".plusQuntity");
  const minusSymbol = document.querySelector(".minusQuntity");
  const quantity = document.querySelector(".qt");
  const pricee = document.querySelector(".rs");
  let price = 20;
  let count = 1;
  let clutter = "";
  function updateHtm() {
    clutter += `<div id="selected"><h3>purple tea</h3>
                            <div id="quantity">
                                <img class="minusQuntity" src="App Ladoo/-.svg" alt="plus">
                                <span class="qt">${count}</span>
                                <img class="plusQuntity" src="App Ladoo/+.svg" alt="minus">
                            </div>
                            <h3>300 RS</h3></div>`;
    document.querySelector("#selected-list").innerHTML = clutter;
  }
  if (plusSymbol && minusSymbol) {
    plusSymbol.addEventListener("click", () => {
      count++;
      quantity.textContent = count;
      pricee.textContent = price * count;
    });
    minusSymbol.addEventListener("click", () => {
      if (count == 0) {
        count = 0;
        quantity.textContent = count;
        pricee.textContent = price * count;
      } else {
        count--;
        pricee.textContent = price * count;
        quantity.textContent = count;
      }
    });
  }
}

let filteringTea = () => {
  const milk = document.querySelector(".milk");
  const water = document.querySelector(".water");
  if(milk && water){
    milk.addEventListener("click", () => {
      if (milk.classList.contains("all")) {
        teaOptions(teaVariants);
        milk.textContent = "milk";
        milk.classList.remove("all");
      }
      else {
        let milkTea = teaVariants.filter((item) => item.type === "milk");
        teaOptions(milkTea);
        milk.textContent = "ALL";
        milk.classList.add("all");
        water.classList.remove('all');
        water.textContent = 'water';
      }
    });
    water.addEventListener("click", () => {
      if(water.classList.contains('all')){
        teaOptions(teaVariants);
        water.textContent = 'water';
        water.classList.remove('all')
      }
      else {
        let waterTea = teaVariants.filter((item) => item.type === "water");
        teaOptions(waterTea);
        water.textContent = "ALL";
        water.classList.add("all");
        milk.classList.remove('all');
        milk.textContent = 'milk';
      }
    });
  }
};

function fetchTea() {

  fetch('database/get-teas.php')
  .then(res => res.json())
  .then(data => {
    let clutter = '';
    data.forEach(item =>{
      clutter += ` <div id="selected">
                            <h3>${item.tea_name}</h3>
                            <div id="quantity">
                                <img class="minusQuntity" src="App Ladoo/-.svg" alt="plus">
                                <span class="qt">${item.cup}</span>
                                <img class="plusQuntity" src="App Ladoo/+.svg" alt="minus">
                            </div>
                            <h3><span class="rs">${item.price}</span> RS</h3>
                        </div>`
    });
    if(document.querySelector('#selected-list')){
      document.querySelector('#selected-list').innerHTML = clutter;

    }
  })

}

teaOptions(teaVariants);
incrementQuantity();
buttonResponse();
selectedteas();
slide();
filteringTea();
fetchTea();
