import {  Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document } from 'mongoose';

export type BusStopDocument = BusStop & Document;


@Schema()
export class BusStop {
    @Prop({ required: true })
    name : string;

    @Prop({ required: true })
    latitude: number;

    @Prop({ required: true })
    longitude: number
    
    @Prop({ required: true })
    route_no : string;

    @Prop({ required: true })
    createdAt: Date;

    @Prop()
    updatedAt?: Date;

    @Prop()
    deleted: Boolean
}

export const BusStopSchema = SchemaFactory.createForClass(BusStop);
   


