export interface IWeatherService {
  getCurrentWeather(latitude: string, longitude: string): Promise<any>;
}
