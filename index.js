const base_url = "https://api.exchangerate-api.com/v4/latest/USD"
const dropdowns = document.querySelectorAll(".dropdown select")
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")



for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOptions = document.createElement("option")
    newOptions.innerText = currCode;
    newOptions.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOptions.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOptions.selected = "selected";
    }
    select.append(newOptions);
  }
  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  })
}
const updateflag = (element) => {
  let currCode = element.value;
  let countrycode = countryList[currCode]
  let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`
  let img = element.parentElement.querySelector("img")
  img.src = newSrc;
}
const updateExchangeRate = async () => {
  const amount = document.querySelector(".amount input")
  const amtval = amount.value;


  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = 1;
  }
  const curr_one = fromCurr.value;
  const curr_two = toCurr.value;
  fetch(`https://v6.exchangerate-api.com/v6/b71ba5a6f69833fe3ac900ec/latest/${curr_one}`)
    .then((res) => res.json())
    .then((data) => {
      //   console.log(data);
      const rate = data.conversion_rates[curr_two];
      let finalAmount = amtval * rate;
      msg.innerText = `${amtval} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;


      // console.log(rate);

    });
}



btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});
window.addEventListener("load", () => {
  updateExchangeRate();
});