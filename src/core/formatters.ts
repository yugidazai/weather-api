import { weather_api } from "config";
import { countries } from "country-data";
import { IWeatherContent, IDailyWeather } from "../interfaces/weather";

const formatDailyWeather = (weather: IDailyWeather) => {
  let result = {
    temperature: Math.round(weather.temp.eve),
    description: ``,
    icon_class: ``,
    defaultIcon: ``
  };
  const data = weather.weather[0];
  if (!data) return result;
  return {
    ...result,
    description: data.main,
    icon_class: weather_api.weather_icon_mapping[data.icon],
    defaultIcon: weather_api.icon_url.replace(`{icon}`, data.icon)
  }
};

export const formatWeatherData = (weather_data: IWeatherContent) => {
  if (!weather_data) return weather_data;
  const { current, forecast, city } = weather_data;

  return {
    current: {
      ...(formatDailyWeather(current)),
      city: city.name,
      country: countries[city.country].name
    },
    forecast: forecast.map(formatDailyWeather)
  };
};
