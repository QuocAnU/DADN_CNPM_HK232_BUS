import {  Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document } from 'mongoose';

export type BusDocument = Bus & Document;


@Schema()
export class Bus {

    @Prop({ required: true })
    number_plate: string;

    @Prop({ required: true })
    route_no: string;
    
    @Prop({ required: true })
    createdAt: Date;

    @Prop()
    updatedAt?: Date;

    @Prop()
    deleted: Boolean
}


export const BusSchema = SchemaFactory.createForClass(Bus);
