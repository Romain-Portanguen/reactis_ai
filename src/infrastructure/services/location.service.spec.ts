import { LocationService } from './location.service';

describe('The LocationService class', () => {
  let locationService: LocationService;

  beforeEach(() => {
    locationService = new LocationService();
  });

  it('should fetch the location successfully', async () => {
    const mockLocation = {
      latitude: '48.8566',
      longitude: '2.3522',
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockLocation),
      } as Response),
    );

    const location = await locationService.getLocation();
    expect(location).toEqual(mockLocation);
  });

  it('should throw an error if location data is missing', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      } as Response),
    );

    await expect(locationService.getLocation()).rejects.toThrow(
      'Location data is missing',
    );
  });
});
