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
import { CreateBusDto } from './dto/create-bus.dto';
import { Model } from 'mongoose';
import { Bus, BusDocument } from './entities/bus.entity';
import { BusRouteDocument } from '../bus-routes/entities/bus-route.entity';
export declare class BusService {
    private readonly busModel;
    private readonly busRouteModel;
    constructor(busModel: Model<BusDocument>, busRouteModel: Model<BusRouteDocument>);
    create(CreateBusDto: CreateBusDto): Promise<Bus>;
    findAll(): Promise<Bus[]>;
}
