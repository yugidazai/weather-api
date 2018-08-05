import { Test, executeTest }  from "./helper/base";
import { weather_controller } from "../src/controllers/weather";
import { IWeatherContent, IDailyWeather } from "../src/interfaces/weather";

const weather_test = new Test("Weather");

describe(`searchWeather`, () => {

  describe(`search with invalid city`, () => {
    executeTest(`search weather without "city" param`,
      weather_controller.getWeatherByCity,
      done => (err: any, result: any) => {
        expect(result).toBeFalsy();
        expect(err).toBeDefined();
        expect(err.message).toBe(`Invalid city!!!`);
        done();
      },
      {}
    );

    executeTest(`search weather with non-existing city`,
      weather_controller.getWeatherByCity,
      done => (err: any, result: any) => {
        expect(result).toBeFalsy();
        expect(err).toBeDefined();
        expect(err.message).toBe(`city not found`);
        done();
      },
      { city: "test-fake-city" }
    );
  });

  describe(`search with valid city`, () => {

    executeTest(`search weather by city: Sydney`,
      weather_controller.getWeatherByCity,
      done => (err: any, result: IWeatherContent) => {
        expect(err).toBeFalsy();
        expect(result).toBeDefined();

        const { current, city, forecast } = result;
        expect(city).toBeDefined();
        expect(city.name).toBe("Sydney");
        expect(city.country).toBe("AU");
        expect(forecast).toBeDefined();
        expect(forecast).toHaveLength(5);
        expect(current).toBeDefined();

        const { temp, weather } = current;
        expect(temp).toBeDefined();
        expect(temp.eve).toBeDefined();
        expect(weather[0]).toBeDefined();
        expect(weather[0].icon).toBeDefined();

        done();
      },
      { city: "Sydney" }
    );

    executeTest(`search weather by city: Melbourne, forecast 10 days`,
      weather_controller.getWeatherByCity,
      done => (err: any, result: IWeatherContent) => {
        expect(err).toBeFalsy();
        expect(result).toBeDefined();

        const { current, city, forecast } = result;
        expect(city).toBeDefined();
        expect(city.name).toBe("Melbourne");
        expect(city.country).toBe("AU");
        expect(forecast).toBeDefined();
        expect(forecast).toHaveLength(10);
        expect(current).toBeDefined();

        const { temp, weather } = current;
        expect(temp).toBeDefined();
        expect(temp.eve).toBeDefined();
        expect(weather[0]).toBeDefined();
        expect(weather[0].icon).toBeDefined();
        done();
      },
      { city: "Melbourne", days_to_forecast: 10 }
    );
  });

});
