import {
  CurrentWeatherRawResponseDto,
  nullCurrentWeatherRawResponse,
} from './../dto/weather-service.dto';
import nock from 'nock';
import {WeatherType} from './WeatherTypes.interface';
import WeatherService from './WeatherService';

describe('WeatherService', () => {
  const mockResponse = {
    ...nullCurrentWeatherRawResponse,
    main: {
      ...nullCurrentWeatherRawResponse.main,
      temp: 10,
      humidity: 10,
      pressure: 10,
    },
    wind: {...nullCurrentWeatherRawResponse.wind, speed: 10},
    weather: [
      {
        description: 'mock-description',
        main: '',
        icon: 'mock-icon',
      },
    ],
    name: 'mock-city',
  };

  test('should return formatted current weather from api', async () => {
    const expectedWeather: WeatherType = {
      temperature: 10,
      humidity: 10,
      pressure: 10,
      windSpeed: 10,
      icon: 'http://openweathermap.org/img/wn/mock-icon@4x.png',
      description: 'mock-description',
      city: 'mock-city',
    };

    nock('https://api.openweathermap.org')
      .get('/data/2.5/weather')
      .query(true)
      .reply(200, mockResponse);

    const weather = await WeatherService.fetchCurrentWeather(0, 0);
    expect(weather).toEqual(expectedWeather);
  });

  test('should return formated CurrentWeather with empty weather', async () => {
    const mockResponseEmptyWeather: CurrentWeatherRawResponseDto = {
      ...mockResponse,
      weather: [],
    };

    nock('https://api.openweathermap.org')
      .get('/data/2.5/weather')
      .query(true)
      .reply(200, mockResponseEmptyWeather);

    const {icon, description} = await WeatherService.fetchCurrentWeather(0, 0);

    expect(icon).toBeNull();
    expect(description).toBeNull();
  });
});
