let allCities = [];
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

        // Store all cities
        allCities = cityItems;

        // Display cities using current filters
        updateDisplay();

    } catch (error) {
        container.textContent =
             "Unable to load exchange rates. Please try again later.";

        console.error("Loading error:", error);
    }
}
// Search when the user types
document.getElementById("search")
    .addEventListener("input", updateDisplay);

// Filter when the country changes
document.getElementById("country-filter")
    .addEventListener("change", updateDisplay);

// Sort when the sorting option changes
document.getElementById("sort")
    .addEventListener("change", updateDisplay);

// Start the application
loadCities();

function updateDisplay() {
    const searchInput = document.getElementById("search");
    const countryFilter = document.getElementById("country-filter");
    const sortSelect = document.getElementById("sort");

    const searchText = searchInput.value.toLowerCase();
    const selectedCountry = countryFilter.value;
    const sortOption = sortSelect.value;

    // Start with all cities
    let filteredCities = [...allCities];

    // Search by city name
    filteredCities = filteredCities.filter(city =>
        city.name.toLowerCase().includes(searchText)
    );

    // Filter by country
    if (selectedCountry !== "All countries") {
        filteredCities = filteredCities.filter(city =>
            city.country == selectedCountry
        );
    }

    // Sort cities
    if (sortOption === "name") {
        filteredCities.sort((a, b) =>
            a.name.localeCompare(b.name)
        );
    }

    if (sortOption === "temp-asc") {
        filteredCities.sort((a, b) => {
            const tempA = Number(a.temperature); 
            const tempB = Number(b.temperature);
           
            const validA = Number.isFinite(tempA);
            const validB = Number.isFinite(tempB);

            if (!validA && !validB) return 0;
            if (!validA) return 1;
            if (!validB) return -1;

            
            return tempA - tempB;
    });
    }

    if (sortOption === "temp-desc") {
        filteredCities.sort((a, b) => {
            const tempA = Number(a.temperature);
            const tempB = Number(b.temperature);
            
            const validA = Number.isFinite(tempA);
            const validB = Number.isFinite(tempB);

            if (!validA && !validB) return 0;
            if (!validA) return 1;
            if (!validB) return -1;
           
            
            return tempB - tempA;
        });
    }

    // Display filtered and sorted cities
    renderCities(filteredCities);
}