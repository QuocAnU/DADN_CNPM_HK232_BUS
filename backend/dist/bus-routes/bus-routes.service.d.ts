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
import { CreateBusRouteDto } from './dto/create-bus-route.dto';
import { UpdateBusRouteDto } from './dto/update-bus-route.dto';
import { Model } from 'mongoose';
import { BusRoute, BusRouteDocument } from './entities/bus-route.entity';
export declare class BusRoutesService {
    private readonly model;
    constructor(model: Model<BusRouteDocument>);
    create(createBusRouteDto: CreateBusRouteDto): Promise<BusRoute>;
    findAll(): Promise<BusRoute[]>;
    findOneByRouteNo(route_no: string): Promise<BusRoute | null>;
    updateById(busRouteId: string, updateBusRouteDto: UpdateBusRouteDto): Promise<BusRoute>;
    remove(busRouteId: string): Promise<BusRoute>;
}
