import { Injectable } from '@nestjs/common';
import * as request from 'request-promise-native';

@Injectable()
export class AdafruitService {
  private readonly baseUrl = 'https://io.adafruit.com/api/v2/';
  private readonly feeds = ["humidity", "latitude", "longitude", "people-num", "temperature"];

  async getLastData(): Promise<string> {
    const promises = this.feeds.map(feed => this.fetchLastDataForFeed(feed));
    const results = await Promise.all(promises);
    const data = results.reduce((acc, value, index) => {
      const feedName = this.feeds[index].replace('-', '_'); 
      acc[feedName] = parseFloat(value);
      return acc;
    }, {});

    data.route_no = "50"
    data.number_plate = "51B1-00172"
    return JSON.stringify(data, null, 2);
  }

  private async fetchLastDataForFeed(feed: string): Promise<any> {
    console.log(process.env.USER_NAME)
    const url = `${this.baseUrl}${process.env.USER_NAME}/feeds/${feed}/data/last`;
    const options = {
      headers: {
        'X-AIO-Key': process.env.AIO_KEY,
      },
      json: true,
    };
    const response = await request.get(url, options);

    return response.value; // Return only the 'value' field
  }
}
