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
    longitute: number
    
    @Prop({ required: true })
    route_no : number;

    @Prop({ required: true })
    createdAt: Date;

    @Prop()
    updatedAt?: Date;

    @Prop()
    deleted: Boolean
}

export const BusStopSchema = SchemaFactory.createForClass(BusStop);
   


