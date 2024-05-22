/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Document } from 'mongoose';
export type BusRouteDocument = BusRoute & Document;
export declare class BusRoute {
    route_no: string;
    name: string;
    number_of_buses: number;
    schedule: string;
    operation_time: string;
    ticket: string;
    ticket_student: string;
    route_type: string;
    between_two_buses: string;
    createdAt: Date;
    updatedAt?: Date;
    deleted: Boolean;
}
export declare const BusRouteSchema: import("mongoose").Schema<BusRoute, import("mongoose").Model<BusRoute, any, any, any, Document<unknown, any, BusRoute> & BusRoute & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BusRoute, Document<unknown, {}, import("mongoose").FlatRecord<BusRoute>> & import("mongoose").FlatRecord<BusRoute> & {
    _id: import("mongoose").Types.ObjectId;
}>;
