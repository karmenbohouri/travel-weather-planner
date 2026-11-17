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
    if (items.lengh === 0) {
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
        temperature.textContent = `${city.temperature}°C`;

        const weather = document.createElement("p");
        weather.textContent = describeWeather(city.weatherCode);

        card.appendChild(name);
        card.appendChild(country);
        card.appendChild(temperature);
        card.appendChild(weather);

        container.appendChild(card);
    });
}