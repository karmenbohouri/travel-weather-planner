
function describeWeather(code) {
    if (code === 0) return "☀️ Clear sky";

    if (code === 1) return "🌤️ Mostly clear";

    if (code === 2) return "⛅ Partly cloudy";

    if (code === 3) return "☁️ Overcast";

    if (code === 45 || code === 48) return "🌫️ Fog";

    if (
        code === 71 ||
        code === 73 ||
        code === 75 ||
        code === 77 ||
        code === 85 ||
        code === 86
    ) return "❄️ Snow";

    if (
        code === 56 ||
        code === 57 ||
        code === 66 ||
        code === 67
    ) return "🌧️ Freezing rain";

    if (code >= 51 && code <= 67) return "🌧️ Rain";

    if (code >= 80 && code <= 82) return "🌦️ Showers";

    if (code >= 95 && code <= 99) return "⛈️ Thunderstorm";

    return "Unknown";
}

function renderCities(items) {
    const container = document.getElementById("cities");

    if (!container) {
        throw new Error("Cities container not found");
    }

    container.innerHTML = "";

    if (items.length === 0) {
        container.textContent = "No city found";
        return;
    }

    items.forEach(city => {
        const card = document.createElement("div");
        card.className = "city-card";

        const temperatureValue = Number(city.temperature);
        const hasValidTemperature = Number.isFinite(temperatureValue);

        if (hasValidTemperature) {
            if (temperatureValue < 15) {
                card.classList.add("cool");
            } else if (temperatureValue < 25) {
                card.classList.add("mild");
            } else {
                card.classList.add("hot");
            }
        }

        const name = document.createElement("h2");
        name.textContent = city.name;

        const country = document.createElement("p");
        country.className = "country";
        country.textContent = city.country;

        const temperature = document.createElement("p");
        temperature.className = "temperature";

        if (!hasValidTemperature) {
            temperature.textContent = "Weather unavailable";
            temperature.classList.add("unavailable");
        } else {
            temperature.textContent = `${temperatureValue}°C`;
        }

        const weather = document.createElement("p");
        weather.className = "weather";
        weather.textContent = describeWeather(city.weatherCode);

        const exchange = document.createElement("p");
        exchange.className = "exchange";

        if (city.currency === "XOF") {
            exchange.textContent = "Local currency: FCFA";
        } else if (!Number.isFinite(city.exchangeRate)) {
            exchange.textContent = "Rate unavailable";
        } else {
            const convertedAmount = (city.exchangeRate * 1000)
                .toLocaleString("en-US", {
                    maximumFractionDigits: 2
                });

            exchange.textContent =
                `1,000 FCFA = ${convertedAmount} ${city.currency}`;
        }

        card.appendChild(name);
        card.appendChild(country);
        card.appendChild(temperature);
        card.appendChild(weather);
        card.appendChild(exchange);

        container.appendChild(card);
    });
}