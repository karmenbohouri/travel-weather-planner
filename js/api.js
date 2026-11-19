async function getWeather(latitude, longitude) {
    if (
        typeof latitude !== "number" ||
        typeof longitude !== "number" ||
        latitude < -90 || latitude > 90 ||
        longitude < -180 || longitude > 180
    ) {
        throw new Error("Invalid coordinates");
    }
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`;
    
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();

    if (!data.current ||
        typeof data.current.temperature_2m !== "number" ||
        typeof data.current.weather_code !== "number") {
        throw new Error("Invalid weather data received");
    }

    return {
        temperature: data.current.temperature_2m,
        weatherCode: data.current.weather_code
    };
}

async function getExchangeRates() {
    const url = "https://open.er-api.com/v6/latest/XOF";

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch exchange rates");
    }

    const data = await response.json();

    if (data.result !== "success") {
        throw new Error("Exchange rate API returned an error");
    }

    if (!data.rates || typeof data.rates !== "object") {
        throw new Error("Invalid exchange rate data received");
    }

    return {
        rates: data.rates,
        nextUpdate: data.time_next_update_unix
    };
}