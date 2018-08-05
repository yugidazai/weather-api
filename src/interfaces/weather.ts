export interface IDailyWeather {
  temp: {
    eve: number
  }
  weather: [
    {
      main: string,
      icon: string
    }
  ]
}

export interface IWeatherContent {
  city: {
    name: string,
    country: string
  }
  current: IDailyWeather
  forecast: [ IDailyWeather ]
}
