export interface ILocationService {
  getLocation(): Promise<{ latitude: string; longitude: string }>;
}
