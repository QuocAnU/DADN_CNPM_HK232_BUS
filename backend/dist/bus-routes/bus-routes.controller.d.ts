import { BusRoutesService } from './bus-routes.service';
import { CreateBusRouteDto } from './dto/create-bus-route.dto';
import { UpdateBusRouteDto } from './dto/update-bus-route.dto';
export declare class BusRoutesController {
    private readonly busRoutesService;
    constructor(busRoutesService: BusRoutesService);
    create(createBusRouteDto: CreateBusRouteDto): Promise<import("./entities/bus-route.entity").BusRoute | {
        message: any;
    }>;
    findAll(): Promise<import("./entities/bus-route.entity").BusRoute[] | {
        message: any;
    }>;
    findOneByName(route_no: string): Promise<import("./entities/bus-route.entity").BusRoute | {
        message: any;
    } | null>;
    update(id: string, updateBusRouteDto: UpdateBusRouteDto): Promise<import("./entities/bus-route.entity").BusRoute | {
        message: any;
    }>;
    remove(id: string): Promise<import("./entities/bus-route.entity").BusRoute | {
        message: any;
    }>;
}
