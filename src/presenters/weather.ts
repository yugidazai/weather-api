import { formatWeatherData } from "../core/formatters";
import { weather_controller } from "../controllers/weather";
import { IWeatherContent } from "../interfaces/weather";

class WeatherPresenter {

  public getWeatherInfo(params: any, done: ErrorResultCallback) {
    const { search = ``, days_to_forecast } = params;
    if (!search) return done(new Error("Invalid city!!!"));

    const searchParams = { city: search, days_to_forecast };
    weather_controller.getWeatherByCity(searchParams, (err, response: IWeatherContent) => {
      done(undefined, err
        ? { error: { message: err.message } }
        : formatWeatherData(response));
    });
  }
}

export const weather_presenter = new WeatherPresenter();
