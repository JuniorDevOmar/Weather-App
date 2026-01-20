# Skywatcher

## Features

- **Current Weather**: Real-time temperature, weather conditions, humidity, wind speed, visibility, and pressure
- **Hourly Forecast**: 24-hour weather predictions with temperature and conditions
- **Air Quality**: Current air quality index, pollutants, and pollen levels
- **Location Search**: Search for weather by city or location with autocomplete
- **Natural Language Summaries**: AI-generated weather narratives and recommendations

## Tech Stack

- **Framework**: Angular 21 (Standalone Components)
- **UI Library**: PrimeNG
- **Styling**: Tailwind CSS
- **State Management**: Angular Signals
- **API**: Open-Meteo Weather API (free, no API key required)

## API Integration

This app uses the [Open-Meteo API](https://open-meteo.com/), a free weather API that doesn't require an API key:

- **Current Weather**: Temperature, conditions, humidity, wind, pressure
- **Hourly Forecast**: 24-48 hour predictions
- **Air Quality**: AQI, pollutants, pollen data
- **Geocoding**: Location search and coordinates
- Integration with WMO weather codes

## Constraints

- City search only

## Example Usage

- You could try any city in your country. Example for South Africa could be "Pretoria", "Kimberley" or "Cape Town"

## Future Improvements

- [ ] Ability to add favorite locations for quick access
- [ ] Small AI Model for summary cards and description details
- [ ] An auto refresh in the interval(15 minutes) specified by the API
- [ ] Unit preferences (Celsius/Fahrenheit)
- [ ] Monthly Forecasts
- [ ] Navigation to selected forecasts
- [ ] More error cases handled
- [ ] Display Weather warnings and alerts
- [ ] Display Historical weather data
- [ ] Weather radar maps
- [ ] Improve icons

## Credits

- Weather data provided by [Open-Meteo](https://open-meteo.com/)
- Weather icons by [Bas Milius - Meteocons](https://github.com/basmilius/weather-icons)
- UI components from [PrimeNG](https://primeng.org/)

## To Run

Clone the repo and run the following in the base directory where the `compose.yaml` file is.

```bash
docker compose up -d --build
```

Verify that the service is up under the name `weather-app` using

```bash
docker ps
```

Navigate to `localhost:1151` on your browser to begin usage.
- The port number was a random one. Don't think too much about it (～￣▽￣)～

Once complete, stop the service:

```bash
docker compose down
```
