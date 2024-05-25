import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class OsmService {
  constructor(private readonly httpService: HttpService) {}

  async fetchOSMBusStops(latitude: number, longitude: number, radius: number): Promise<any[]> {
    const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:${radius},${latitude},${longitude})[highway=bus_stop];out;`;
    
    try {
      const response: AxiosResponse = await lastValueFrom(this.httpService.get(overpassUrl));
      console.log("Response: ", response.data.elements);
      return response.data.elements;
    } catch (error) {
      console.error('Error fetching bus stops from OSM:', error);
      return [];
    }
  }
}
