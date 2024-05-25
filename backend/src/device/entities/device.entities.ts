import {  Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document } from 'mongoose';

export type DeviceDocument = Device & Document;


@Schema()
export class Device {
    @Prop({ required: true })
    accessToken : string;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
   


