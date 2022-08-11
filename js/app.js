// Fetch API data
const myHeaders = new Headers();
myHeaders.append("apikey", "4qPoxHo7Ts98HByicCoX4SXkudt5pSgh");

const requestOptions = {
  method: "GET",
  redirect: "follow",
  headers: myHeaders,
};

fetch(
  "https://api.apilayer.com/exchangerates_data/latest?base=USD&symbols=EUR,USD,CAD,GBP,AUD",
  requestOptions
)
  .then((response) => {
    return response.json();
  })
  .then((currencyData) => {
    // Get html elements
    let cols = document.querySelectorAll(".graph-col");
    let labelTags = document.querySelectorAll(".graph--col-label");
    let data = currencyData["rates"];
    let labels = Object.keys(currencyData["rates"]);

    // Function to display exchange rate on click event
    const displayExchangeRate = (currency) => {
      rateMenu.classList.remove("graph--hidden");
      document.querySelector(
        ".graph--exchange-rate"
      ).innerText = `${currencyData["rates"][currency]} ${currency}`;
    };

    // Style retrieved elements
    for (let i = 0; i < cols.length; i++) {
      cols[i].classList.add(`col-${i}`);
      cols[i].style.height = `${Math.round(data[labels[i]] * 50)}%`;
      cols[i].style.animation = "show 3s ease-in-out";

      labelTags[i].innerText = labels[i];
      labelTags[i].addEventListener("click", () =>
        displayExchangeRate(labels[i])
      );
    }
  })
  .catch((error) => console.log("error", error));

// Close menu on button press
const rateMenu = document.querySelector(".graph-rate");

const closeMenu = () => {
  rateMenu.classList.add("graph--hidden");
};
