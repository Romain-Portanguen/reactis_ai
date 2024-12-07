import { Injectable, Logger } from '@nestjs/common';
import { ILocationService } from '../../domain/interfaces/location-service.interface';

@Injectable()
export class LocationService implements ILocationService {
  public async getLocation(): Promise<{ latitude: string; longitude: string }> {
    const response = await fetch('https://ipapi.co/json/');
    const locationData = await response.json();

    Logger.log(`Fetched location: ${JSON.stringify(locationData)}`);

    if (!locationData.latitude || !locationData.longitude) {
      throw new Error('Location data is missing');
    }

    return {
      latitude: locationData.latitude,
      longitude: locationData.longitude,
    };
  }
}
