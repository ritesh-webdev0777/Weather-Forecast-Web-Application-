const apiKey = "bf4701e412f052e41675d547f3ff15ea"; // api key
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const themeSwitcher = document.getElementById("themeSwitcher");


themeSwitcher.addEventListener("change", () => {
    document.body.classList.toggle("light");
});


searchBtn.addEventListener("click", getWeather);

async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) return alert("Please enter a city");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();
    console.log("Full API response:", data);
    updateUI(data);
  } catch (err) {
    alert("City not found");
  }
}
function updateUI(data) {
  const condition = data.weather[0].main.toLowerCase(); // e.g., "clouds"

  document.getElementById("location").textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("temperature").textContent = `${Math.round(data.main.temp)}°C`;
  document.getElementById("condition").textContent = data.weather[0].description; // more detailed
  document.getElementById("humidity").textContent = `💧 Humidity: ${data.main.humidity}%`;
  document.getElementById("wind").textContent = `💨 Wind: ${data.wind.speed} km/h`;

  console.log("Matched condition:", condition); // Debug
  playAnimation(condition);
}
function playAnimation(condition) {
  const animContainer = document.getElementById("animationContainer");
  lottie.destroy();
  animContainer.innerHTML = "";

  // let animFile = "sunny.json";

  if (condition.includes("cloud")) animFile = "cloudy.json";
  else if (condition.includes("rain") || condition.includes("drizzle")) animFile = "rain.json";
  else if (condition.includes("storm") || condition.includes("thunder")) animFile = "storm.json";
  else if (condition.includes("clear")) animFile = "sunny.json";

  console.log("Selected animation:", animFile);

  lottie.loadAnimation({
    container: animContainer,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: `assets/${animFile}`,
  });
}
