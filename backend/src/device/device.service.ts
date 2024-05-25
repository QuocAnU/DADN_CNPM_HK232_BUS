import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { from, lastValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Device, DeviceDocument } from './entities/device.entities';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { DeviceDto } from './dto/accessTokenDto';

@Injectable()
export class DeviceService {
  constructor(@InjectModel(Device.name) private readonly model : Model<DeviceDocument>) {}

  async getAccessToken() {
    return await this.model.find().exec() 
  }

  async updateAccessToken(deviceDto: DeviceDto) {
    await this.model.deleteMany({});

    const newToken = await new this.model({
        ...deviceDto,
        createdAt: new Date(),
    }).save()

    return newToken;
  }

  async fetchDeviceData(): Promise<any> {
    const deviceId = process.env.DEVICEID
    // console.log(deviceId)
    const url = `https://demo.thingsboard.io/api/plugins/telemetry/DEVICE/${deviceId}/keys/timeseries`;
    const device: any = await this.getAccessToken()
    // console.log(device[0].accessToken)
    try{
        const response = await fetch(url,{
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'X-Authorization': `${device[0].accessToken}`
      }
        })
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    }catch(err) {
        console.error('Error fetching device data:', err);
    }

  }
}
