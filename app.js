const myApiKey = "bf3e93429f89eaa838c79b663ea56ff9";

const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");

// <figcaption>${main.pressure} hpa/mbar</figcaption>

function moreInfo() {
  console.log("werks");
  let li = document.getElementsByTagName("li");
  for (i = 0; i < li.length; i++) {
    li[i].classList.add("expanded");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputVal = input.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${myApiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const { main, wind, name, sys, weather } = data;
      const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
      console.log(url);

      const li = document.createElement("li");
      li.classList.add("city");
      const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
        <figure>
          <img class="city-icon" src="${icon}" alt="${
        weather[0]["description"]
      }">
          <figcaption>${weather[0]["description"]}</figcaption></br>
          <small onclick="moreInfo()">°°° </small>          

          <div class="expandedInfo">
          <p>Minimum temperature: <span>${main.temp_min}</span>°C</p>          
          <p>maximum temperature: <span>${main.temp_max}</span>°C</p>
          <p>Pressure <span>${main.pressure} kpa/mbar</span></p>
          <p>Windspeed <span>${wind.speed} m/s</span></p>        
        </div>
        </figure>
      `;
      li.innerHTML = markup;

      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city!";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
});

//TODO

//HTML ✓
//CSS ✓
//fetch JSON ✓
//Custom input ✓
//grid array ✓
//responsive display ✓

//change colour on hover
//expand view on (°°°) click X
//popup on (°°°) click

//add all info to expanded view
//add a graph
//finish UI
//history??

//Hack COGNISM and blame Ernest...
