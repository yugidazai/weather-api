import { formatWeatherData } from "../core/formatters";
import { weather_controller } from "../controllers/weather";

class WeatherPresenter {

  public getWeatherInfo(params: any, done: ErrorResultCallback) {
    const { search = `` } = params;
    if (!search) return done(new Error("Invalid city!!!"));
    weather_controller.getWeatherByCity({ city: search }, (err, response) => {
      done(undefined, err
        ? { error: { message: err.message } }
        : formatWeatherData(response));
    });
  }
}

export const weather_presenter = new WeatherPresenter();
