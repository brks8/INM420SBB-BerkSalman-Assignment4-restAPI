const checkbox_wrapper = document.querySelector("form .flexbox");
const checkbox = document.querySelector("form .flexbox span");

checkbox_wrapper.addEventListener("click", function () {
  checkbox.classList.toggle("checked");
});

async function loadWeather(city) {
  const apiUrl = `http://api.weatherapi.com/v1/forecast.json?q=${encodeURIComponent(
    city
  )}&key=4d4ca9e2e7574c02b96155304250906`;

  try {
    const apiRes = await fetch(apiUrl);
    const result = await apiRes.json();

    const currentTempInCelcius = result.current.temp_c;
    const cityName = result.location.name;
    const countryName = result.location.country;
    const weatherText = result.current.condition.text;
    const weatherIcon = result.current.condition.icon;

    const placeHolder = document.querySelector("#weather-info");
    placeHolder.style.display = "flex";
    placeHolder.innerHTML = `
      <p>${cityName}, ${countryName}</p>
      <p>${currentTempInCelcius} °C</p>
      <p><img src="${weatherIcon}" alt="${weatherText}" /><br>${weatherText}</p>
    `;
  } catch (err) {
    document.querySelector(
      "#weather-info"
    ).innerHTML = `<p>Could not retrieve weather data for "${city}".</p>`;
    console.error(err);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  loadWeather("Barcelona");
});

document.getElementById("get-weather").addEventListener("click", () => {
  const city = document.getElementById("city-input").value.trim();
  if (city) loadWeather(city);
});

document.getElementById("city-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = e.target.value.trim();
    if (city) loadWeather(city);
  }
});
