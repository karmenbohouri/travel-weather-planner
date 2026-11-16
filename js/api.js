async function getWeather(latitude, longitude) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`;
    
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();

    return {
        temperature: data.current.temperature_2m,
        weatherCode: data.current.weather_code
    };
}

//Test with Abidjan coodinates
getWeather(5.35, -4.02)
     .then(result => console.log(result))
     .catch(error => console.error(error));

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

    return {
        rates: data.rates,
        nextUpdate: data.time_next_update_unix
    };
}

//Test echange rates
getExchangeRates()
     .then(result => console.log(result))
     .catch(error => console.error(error));