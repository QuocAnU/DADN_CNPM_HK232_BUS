import { BusStopsService } from './bus-stops.service';
import { CreateBusStopDto } from './dto/create-bus-stop.dto';
export declare class BusStopsController {
    private readonly busStopService;
    constructor(busStopService: BusStopsService);
    create(createBusStopDto: CreateBusStopDto): Promise<import("./entities/bus-stop.entity").BusStop | {
        message: any;
    }>;
    findAll(): Promise<import("./entities/bus-stop.entity").BusStop[] | {
        message: any;
    }>;
    findByRouteNo(route_no: string): Promise<import("./entities/bus-stop.entity").BusStop[] | {
        message: any;
    }>;
}
