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

- [ ] Multiple location favorites
- [ ] Unit preferences (Celsius/Fahrenheit)
- [ ] Monthly Forecasts
- [ ] More error cases handled
- [ ] Display Weather warnings and alerts
- [ ] Display Historical weather data
- [ ] Weather radar maps

## Credits

- Weather data provided by [Open-Meteo](https://open-meteo.com/)
- Weather icons by [Bas Milius - Meteocons](https://github.com/basmilius/weather-icons)
- UI framework icons from [PrimeIcons](https://primeng.org/icons)
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

Once complete, run stop the service:
```bash
docker compose down
```
