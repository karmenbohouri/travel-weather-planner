# Travel Weather Planner

A responsive web application that helps users compare current weather conditions and currency values across 20 cities in 10 countries.

The application displays real-time weather information and shows how much foreign currency 1,000 XOF (West African CFA franc) is worth in each supported city.

Built with HTML, CSS, and vanilla JavaScript, using external REST APIs.

## Live Demo

- **Deployed application:** `[ADD LOAD BALANCER URL HERE]`
- **Demo video (maximum 2 minutes):** `[ADD VIDEO LINK HERE]`

## Project Overview

Travel Weather Planner helps users explore weather conditions and compare currency values across different international destinations.

It is designed for people who want a quick overview of weather conditions and an estimate of currency exchange values before travelling or comparing destinations.

### Main Features

- Weather information for 20 cities across 10 countries.
- Current temperature and weather conditions.
- Currency conversion based on 1,000 XOF.
- Search cities by name.
- Filter cities by country.
- Sort cities alphabetically.
- Sort cities by temperature in ascending or descending order.
- Dynamic statistics based on the displayed cities.
- Weather-related visual indicators and card styles.
- Responsive interface for desktop, tablet, and mobile devices.
- Error handling for unavailable weather data and exchange rates.

## Technologies Used

- **HTML5:** Application structure.
- **CSS3:** Styling, responsive layout, and visual presentation.
- **JavaScript (Vanilla):** Application logic, API requests, filtering, sorting, and rendering.
- **Open-Meteo API:** Weather information.
- **ExchangeRate-API:** Currency exchange rates.
- **Nginx:** Web server for deployment.

No frontend framework or backend framework is required.

## APIs Used

### 1. Open-Meteo API

**Purpose:** Retrieve current weather information for the supported cities.

- API website: https://open-meteo.com/
- Official documentation: https://open-meteo.com/en/docs
- Authentication: No API key required for the weather endpoint used by this project.
- Data retrieved: Current temperature and weather condition codes.

The application uses the geographical coordinates stored in `js/cities.js` to request weather information.

Weather requests are made for the supported cities when the application loads.

The Open-Meteo geocoding service was also used during development to verify city locations and coordinates. It is not required for the application's normal runtime because the coordinates are stored in the project.

### 2. ExchangeRate-API

**Purpose:** Retrieve exchange rates using XOF as the base currency.

- API website: https://www.exchangerate-api.com/
- Endpoint: https://open.er-api.com/v6/latest/XOF
- Authentication: No API key required for the endpoint used by this project.
- Data retrieved: Currency exchange rates and the next scheduled update timestamp.

The application retrieves the exchange-rate data once when the page loads and uses it to calculate the equivalent value of 1,000 XOF for each supported currency.

The application does not require users to enter API keys.

## How the Application Works

1. The application loads the list of supported cities from `js/cities.js`.
2. It requests exchange-rate information from ExchangeRate-API.
3. It requests weather information from Open-Meteo for the supported cities.
4. Weather requests are handled using `Promise.allSettled()` so that one failed request does not prevent other cities from displaying.
5. The retrieved information is combined with the city data and stored in memory.
6. The application renders the city cards and statistics.
7. Search, filtering, and sorting operations update the displayed results using the data already loaded.

## Running the Application Locally

### Requirements

- Git
- Python 3 installed on your computer
- A modern web browser
- Internet connection to access the external APIs

### Installation

Clone the repository:

```bash
git clone https://github.com/karmenbohouri/travel-weather-planner.git
```

Navigate into the project directory:

```bash
cd travel-weather-planner
```

Start a local development server:

```bash
python -m http.server 8000
```

Open the following address in your browser:

```text
http://localhost:8000
```

A local HTTP server is recommended because browsers may restrict network requests when an application is opened directly using the `file://` protocol.

## Project Structure

```text
travel-weather-planner/
│
├── index.html
├── README.md
├── .gitignore
│
├── css/
│   └── style.css
│
├── js/
│   ├── cities.js
│   ├── api.js
│   ├── ui.js
│   └── main.js
│
└── codevibe-reports/
```

### Main Files

- `index.html`: Main application page.
- `css/style.css`: Application styling and responsive layout.
- `js/cities.js`: City information, coordinates, countries, and currencies.
- `js/api.js`: External API requests and response validation.
- `js/ui.js`: Weather descriptions and city card rendering.
- `js/main.js`: Application initialization, data loading, search, filtering, and sorting.

## Error Handling

The application includes error handling for several situations:

- **Weather API failure:** A city can display a weather-unavailable message without preventing other cities from loading.
- **Exchange-rate API failure:** Currency values that cannot be retrieved are displayed as unavailable.
- **Invalid API responses:** The application checks HTTP responses and validates important data before using it.
- **Empty search results:** A message informs the user when no city matches the search or selected filter.

These measures help the application remain usable when some external data is unavailable.

## Testing

The application was tested locally to verify its main features.

The following checks were performed:

- Loading all 20 supported cities.
- Checking the distribution of cities across 10 countries.
- Retrieving weather information.
- Retrieving currency exchange rates.
- Searching for cities by name.
- Filtering cities by country.
- Sorting cities alphabetically.
- Sorting cities by temperature in ascending and descending order.
- Handling unavailable data.
- Checking the responsive layout on mobile, tablet, and desktop screen sizes.

### Deployment Testing

The following deployment checks must be completed after configuring the two web servers and the load balancer:

| Test | Result |
|---|---|
| Application accessible on Web01 | `[PENDING TEST]` |
| Application accessible on Web02 | `[PENDING TEST]` |
| Load balancer accessible | `[PENDING TEST]` |
| Traffic distributed between Web01 and Web02 | `[PENDING TEST]` |
| Application functional through the load balancer | `[PENDING TEST]` |

## Deployment

The application is intended to run on two web servers, Web01 and Web02, behind a dedicated load balancer, Lb01.

The deployment information below must be completed with the actual commands, configurations, and test results after deployment.

### 1. Web01 Deployment

- Server: Web01
- Server address: `32.192.231.221`
- Application URL: `[ADD WEB01 URL HERE]`

**Deployment steps:**

`[ADD THE ACTUAL COMMANDS USED TO COPY OR CLONE THE PROJECT, CONFIGURE NGINX, AND DEPLOY THE APPLICATION.]`

**Verification:**

`[ADD THE COMMANDS AND RESULTS USED TO VERIFY THAT THE APPLICATION WORKS ON WEB01.]`

### 2. Web02 Deployment

- Server: Web02
- Server address: `98.93.200.142`
- Application URL: `[ADD WEB02 URL HERE]`

**Deployment steps:**

`[ADD THE ACTUAL COMMANDS USED TO DEPLOY THE APPLICATION AND CONFIGURE NGINX ON WEB02.]`

**Verification:**

`[ADD THE COMMANDS AND RESULTS USED TO VERIFY THAT THE APPLICATION WORKS ON WEB02.]`

### 3. Load Balancer Configuration

- Server: Lb01
- Server address: `35.175.242.143`
- Public application URL: `[ADD LOAD BALANCER URL HERE]`

**Configuration:**

`[ADD THE ACTUAL LOAD BALANCER CONFIGURATION, INCLUDING THE WEB01 AND WEB02 BACKEND SERVERS.]`

**Verification:**

`[EXPLAIN HOW THE LOAD BALANCER WAS TESTED AND HOW TRAFFIC DISTRIBUTION BETWEEN THE TWO WEB SERVERS WAS VERIFIED.]`

### Deployment Architecture

```text
                 User
                   |
                   v
             Load Balancer
                  Lb01
                   |
            ----------------
            |              |
            v              v
          Web01          Web02
            |              |
            v              v
       Travel Weather Planner
```

## Challenges and Solutions

### 1. Incorrect Geographical Coordinates

Some incorrect coordinate values caused HTTP 400 errors when requesting weather information.

**Solution:** The coordinates were checked and corrected using geographical information from Open-Meteo.

### 2. City Geocoding Ambiguities

Some city names returned alternative or historical location names during geocoding.

**Solution:** The geographical coordinates were verified before being stored in the city dataset.

### 3. JavaScript Template Literals

A formatting issue occurred because template variables were used inside ordinary quotation marks instead of template literals.

**Solution:** The affected strings were corrected using JavaScript backticks.

### 4. Handling Multiple API Requests

Using `Promise.all()` could cause the entire weather-loading operation to fail if one city request failed.

**Solution:** `Promise.allSettled()` was used to allow successful city requests to complete even when some requests fail.

### 5. Weather Condition Codes

The weather API returns numerical weather codes rather than descriptive weather names.

**Solution:** A `describeWeather()` function was implemented to translate the relevant weather codes into readable descriptions and visual indicators.

## API Keys and Credentials

This project uses public API endpoints that do not require API keys or user authentication.

- Open-Meteo weather endpoint: No API key required.
- ExchangeRate-API open-access endpoint: No API key required.

There are no application login credentials because the project does not implement user authentication.

Server access credentials are not stored in the source code or public repository.

## Security

- No API keys or passwords are hardcoded in the application.
- External API requests use HTTPS.
- API responses are checked before their data is used.
- City information is rendered using DOM methods and `textContent` rather than inserting untrusted API values directly as HTML.

## Credits and Resources

- [Open-Meteo](https://open-meteo.com/) — Weather data and documentation.
- [ExchangeRate-API](https://www.exchangerate-api.com/) — Currency exchange-rate data.
- [Inter Font](https://fonts.google.com/specimen/Inter) — Typography.

## AI Assistance

AI assistance was used during parts of the development process for explanations, code review, debugging support, and README preparation. The development and testing process included reviewing and verifying the application's functionality.

## Author

**Karmen Bohouri**

GitHub: https://github.com/karmenbohouri

---

**Project:** Travel Weather Planner  
**Type:** Responsive Web Application  
**Technologies:** HTML, CSS, JavaScript, REST APIs, Nginx