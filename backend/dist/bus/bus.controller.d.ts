import { BusService } from './bus.service';
import { CreateBusDto } from './dto/create-bus.dto';
export declare class BusController {
    private readonly busService;
    constructor(busService: BusService);
    create(createBusDto: CreateBusDto): Promise<import("./entities/bus.entity").Bus | {
        message: any;
    }>;
    findAll(): Promise<import("./entities/bus.entity").Bus[] | {
        message: any;
    }>;
}
