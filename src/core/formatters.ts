import { weather_api } from "config";
import { countries } from "country-data";

const formatDailyWeather = weather => {
  const data = weather.weather[0] || {};
  return {
    temperature: Math.round(weather.temp.eve),
    description: data.main,
    icon_class: weather_api.weather_icon_mapping[data.icon],
    defaultIcon: weather_api.icon_url.replace(`{icon}`, data.icon)
  };
};

export const formatWeatherData = (weather_data: any) => {
  if (!weather_data) return weather_data;
  if (weather_data.toObject) weather_data = weather_data.toObject();
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
