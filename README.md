# Travel Weather Planner

A responsive web app that compares the current weather and the value of 1,000 FCFA (West African CFA franc) across 20 cities in 10 countries. It is built with plain HTML, CSS and JavaScript: no framework, no backend and no API keys.

## Features

- Current temperature and weather conditions for 20 cities (Côte d'Ivoire, Rwanda, Ghana, Nigeria, Kenya, Morocco, Egypt, South Africa, Canada, United Kingdom)
- Value of 1,000 FCFA in each city's local currency
- Search by city name
- Filter by country
- Sort by name or by temperature (lowest or highest first)
- Summary at the top of the page: number of destinations and countries, hottest and coldest city
- Weather icons and a card tint that reflects the temperature (cool, mild, hot)
- Clear error states: unavailable weather for a single city, unavailable exchange rates, and no search results
- Responsive layout that works on phones

## APIs used

### Open-Meteo (weather and geocoding)

- Website: https://open-meteo.com
- Used for: current temperature and weather code from a city's coordinates. The geocoding endpoint was also used during development to find accurate coordinates for each city.
- API key: none required.
- Terms: free for non-commercial use, which fits this educational project.
- Usage: the app sends one weather request per city (20) each time the page loads.

### ExchangeRate-API (exchange rates)

- Website: https://www.exchangerate-api.com
- Endpoint: `https://open.er-api.com/v6/latest/XOF`
- Used for: exchange rates from the CFA franc (XOF), converted for 1,000 FCFA.
- API key: none required for this open endpoint.
- Limits: rates are refreshed once per day, and clients that call the endpoint too often can be rate limited. The app sends a single request per page load.
- Attribution: required by the provider, and shown in the page footer.

### Why these APIs

Both are well documented, widely used, require no account or secret key (so nothing sensitive is stored in the repository), and return JSON over HTTPS. Their documentation and terms of use were read before use.

## How it works

1. On load, the app requests the exchange rates once.
2. It requests the weather for every city in parallel with `Promise.allSettled`, so one failing city does not block the others.
3. Each city is merged with its weather and exchange rate and kept in memory.
4. Search, filter and sort always start from the full in-memory list and re-render the cards, so changing a control never triggers new API calls.

## Run locally

```bash
git clone https://github.com/karmenbohouri/travel-weather-planner.git
cd travel-weather-planner
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

Use a local server instead of opening `index.html` directly: browsers block network requests from `file://` pages.

## Project structure

```
travel-weather-planner/
├── index.html          # page structure, controls and footer
├── css/
│   └── style.css       # theme, grid layout, cards, responsive rules
├── js/
│   ├── cities.js       # list of cities with coordinates, country and currency
│   ├── api.js          # getWeather() and getExchangeRates()
│   ├── ui.js           # weather descriptions/icons and card rendering
│   └── main.js         # loading, search, filter, sort and summary
├── codevibe-reports/   # CodeVibe report
└── README.md
```

## Error handling

- If the weather request fails for one city, its card shows "Weather unavailable" and the rest of the page keeps working.
- If the exchange rates cannot be loaded, the page shows a clear message instead of an empty screen.
- If a search or filter matches nothing, the page shows "No city found".
- Cities without a valid temperature are placed last when sorting by temperature.

## Challenges and solutions

- **Wrong coordinates.** A missing decimal point in one longitude produced an HTTP 400 error for Casablanca. Reading the failing URL in the browser console revealed it. Some place names were also ambiguous in the geocoding API (for example Musanze is returned as Ruhengeri, and one search for Rusizi returned a different district), so each city was checked by its region before being added.
- **Misleading CORS error.** An invalid request URL (template variables written inside normal quotes instead of backticks) caused a 403 response, and the browser reported it as a CORS problem. Checking the actual request URL showed the real cause.
- **Partial failures.** `Promise.all` would reject everything if one request failed, so `Promise.allSettled` is used to keep the other cities.
- **Weather codes.** Open-Meteo returns numeric WMO codes, so a small mapping translates them into readable descriptions and icons.

## Deployment (Part Two)

_To be completed after deployment._

- Web01: `<address or IP>`
- Web02: `<address or IP>`
- Load balancer (Lb01): `<address or IP>`
- Web server and load balancer configuration: `<short description>`

## Credits

- Weather data: [Open-Meteo](https://open-meteo.com)
- Exchange rates: [ExchangeRate-API](https://www.exchangerate-api.com)
- Font: [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts
- The application code was written manually. As allowed by the assignment, AI assistance was used only for this README.