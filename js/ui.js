function describeWeather(code) {
    if (code === 0) return "Clear sky";
    
    if (code >= 1 && code <= 3) return "Cloudy";
    
    if (code === 45 || code === 48) return "Fog";
    
    if (code >= 51 && code <=67) return "Rain";
    
    if (code >= 80 && code <= 82) return "Showers";
    
    if (code >= 95 && code <= 99) return "Thunderstorm";

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

        const name = document.createElement("h2");
        name.textContent = city.name;

        const country = document.createElement("p");
        country.textContent = city.country;

        const temperature = document.createElement("p");

        if (city.temperature === "N/A") {
            temperature.textContent = "Weather unavailable";
        } else {
            temperature.textContent = `${city.temperature}°C`;
        }

        const weather = document.createElement("p");
        weather.textContent = describeWeather(city.weatherCode);

        const exchange = document.createElement("p");

        if (city.currency === "XOF") {
            exchange.textContent = "Local currency: FCFA";
        } else if (city.exchangeRate === undefined) {
            exchange.textContent = "Rate unavailable";
        } else {
            const convertedAmount = (city.exchangeRate * 1000)
                .toLocaleString("en-US", { maximumFractionDigits: 2 });

            exchange.textContent =  `1,000 FCFA = ${convertedAmount} ${city.currency}`;   
        }

        card.appendChild(name);
        card.appendChild(country);
        card.appendChild(temperature);
        card.appendChild(weather);
        card.appendChild(exchange);

        container.appendChild(card);
    });
}