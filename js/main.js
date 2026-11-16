async function loadCities() {
    const container = document.getElementById("cities");

    // Display loading message
    container.textContent = "Loading...";

    try {
        // Fetch exchange rtes only once
        const exchangeData = await getExchangeRates();

        // Fetch weather for all cities
        const weatherResults = await Promise.allSettled(
            cities.map(city =>
                getWeather(city.latitude, city.longitude)
            )
        );

        // Combine city information with weather data
        const cityItems = cities.map((city, index) => {
            const result = weatherResults[index];

            if(result.status === "fulfilled") {
                return {
                    ...city,
                    temperature: result.value.temperature,
                    weatherCode: result.value.weatherCode,
                    exchangeRate: exchangeData.rates[city.currency]
                };
            }

            // Handle individual weather errors
            return {
                ...city,
                temperature: "N/A",
                weatherCode: -1,
                exchangeRate: exchangeData.rates[city.currency]
            };
        });

        // Display all cities
        renderCities(cityItems);

    } catch (error) {
        container.textContent =
             "Unable to load exchange rates. Please try again later.";

        console.error("Loading error:", error);
    }
}

loadCities();