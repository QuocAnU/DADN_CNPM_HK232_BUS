import {  Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document } from 'mongoose';

export type BusRouteDocument = BusRoute & Document;


@Schema()
export class BusRoute {

    @Prop({ required: true })
    route_no: string;

    @Prop({ required: true })
    name: string
    @Prop()
    number_of_buses: number

    @Prop({ required: true })
    schedule: string

    @Prop({ required: true })
    operation_time: string

    @Prop({ required: true })
    ticket: string

    @Prop({ required: true })
    ticket_student: string;
    @Prop({ required: true })
    route_type: string;
    @Prop({ required: true })
    between_two_buses: string
    
    @Prop({ required: true })
    createdAt: Date;

    @Prop()
    updatedAt?: Date;

    @Prop()
    deleted: Boolean
}


export const BusRouteSchema = SchemaFactory.createForClass(BusRoute);
