import * as request from "request";
import { weather_api } from "config";

class WeatherController {

  public getWeatherByCity({ city, days_to_forecast }, done) {
    if (!city) return done(new Error("Invalid city!!!"));

    days_to_forecast = days_to_forecast || weather_api.days_to_forecast || 5;
    const { api_key, url, query_string } = weather_api;
    const qs = query_string.replace(`{api_key}`, api_key)
                           .replace(`{search}`, city)
                           .replace(`{days_to_forecast}`, days_to_forecast + 1);
    request({
      url: `${url}?${qs}`,
      json: true
    }, (err, resp, body) => {
      const { list = [], city, message, cod } = body;
      if (!err && cod != 200) err = new Error(message);
      if (err) return done(err);
      done(undefined, {
        forecast: list.slice(1, days_to_forecast + 1),
        city,
        current: list[0]
      });
    });
  }
}

export const weather_controller = new WeatherController();
