const billInput = document.querySelector("#bill-input");
const peopleInput = document.querySelector(".people-input");
const outputAmount = document.querySelector("#tip-amount");
const totalAmount = document.querySelector("#tip-total");
const tips = document.querySelectorAll(".tip-btn");
const tipCustom = document.querySelector(".custom-tip");
const error = document.querySelector(".error");
const resetBtn = document.querySelector(".btn");

billInput.addEventListener("input", billInputFun);
peopleInput.addEventListener("input", peopleInputFun);
tips.forEach(function (e) {
  e.addEventListener("click", handleClick);
});
tipCustom.addEventListener("input", tipInputFun);
resetBtn.addEventListener("click", reset);

billInput.value = "0";
peopleInput.value = "0";
outputAmount.innerHTML = "$" + (0.0).toFixed(2);
totalAmount.innerHTML = "$" + (0.0).toFixed(2);

let billValue = 0;
let peopleValue = 0;
let tipValue = 0.15;

function billInputFun() {
  billValue = parseFloat(billInput.value);
  calculateTip();
}

function peopleInputFun() {
  peopleValue = parseFloat(peopleInput.value);
  calculateTip();

  if (peopleValue < 1) {
    error.innerHTML = `Can't be zero`;
    peopleInput.classList.add("border");
  } else {
    error.innerHTML = ``;
    peopleInput.classList.remove("border");
  }
}


function handleClick(e) {
  tips.forEach(function (val) {
    val.classList.remove("active-tip");
    val.classList.add("tip-percentage");

    if (e.target.innerHTML == val.innerHTML) {
      val.classList.add("active-tip");
      val.classList.remove("tip-percentage");
      tipValue = parseFloat(val.innerHTML) / 100;
    }
  });
  calculateTip();
}

function calculateTip() {
  if (peopleValue >= 1) {
    let tipAmount = (billValue * tipValue) / peopleValue;
    let total = billValue / peopleValue + tipAmount;
    outputAmount.innerHTML = "$" + tipAmount.toFixed(2);
    totalAmount.innerHTML = "$" + total.toFixed(2);
  }
}

function tipInputFun() {
  tipValue = parseFloat(tipCustom.value) / 100;
  calculateTip();
}

function reset() {
  billInput.value = "0";
  billInputFun();
  peopleInput.value = "0";
  peopleInputFun();
  tipCustom.value = "";
  peopleInput.classList.remove("border");
  error.innerHTML = ``;
  outputAmount.innerHTML = "$" + (0.0).toFixed(2);
  totalAmount.innerHTML = "$" + (0.0).toFixed(2);
}
