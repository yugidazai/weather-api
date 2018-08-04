import { Test, executeTest }  from "./helper/base";
import { weather_controller } from "../src/controllers/weather";

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
      done => (err: any, result: any) => {
        expect(err).toBeFalsy();
        expect(result).toBeDefined();
        expect(result.current).toBeDefined();
        expect(result.current.temp).toBeDefined();
        expect(result.current.temp.eve).toBeDefined();
        expect(result.current.weather[0]).toBeDefined();
        expect(result.current.weather[0].icon).toBeDefined();
        expect(result.city).toBeDefined();
        expect(result.city.name).toBe("Sydney");
        expect(result.city.country).toBe("AU");
        expect(result.forecast).toBeDefined();
        expect(result.forecast).toHaveLength(5);
        done();
      },
      { city: "Sydney" }
    );

    executeTest(`search weather by city: Melbourne`,
      weather_controller.getWeatherByCity,
      done => (err: any, result: any) => {
        expect(err).toBeFalsy();
        expect(result).toBeDefined();
        expect(result.current).toBeDefined();
        expect(result.current.temp).toBeDefined();
        expect(result.current.temp.eve).toBeDefined();
        expect(result.current.weather[0]).toBeDefined();
        expect(result.current.weather[0].icon).toBeDefined();
        expect(result.city).toBeDefined();
        expect(result.city.name).toBe("Melbourne");
        expect(result.city.country).toBe("AU");
        expect(result.forecast).toBeDefined();
        expect(result.forecast).toHaveLength(5);
        done();
      },
      { city: "Melbourne" }
    );
  });

});
