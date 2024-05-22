"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusStopsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bus_stop_entity_1 = require("./entities/bus-stop.entity");
const mongoose_2 = require("mongoose");
let BusStopsService = class BusStopsService {
    constructor(model) {
        this.model = model;
    }
    async create(createBusStopDto) {
        try {
            const newBusStop = await new this.model({
                ...createBusStopDto,
                createdAt: new Date(),
                deleted: false,
            }).save();
            return newBusStop;
        }
        catch (error) {
            console.error("Error creating bus stop:", error);
            throw new Error("Failed to create bus stop");
        }
    }
    async findAll() {
        return await this.model.find().exec();
    }
    async findByRouteNo(route_no) {
        try {
            return await this.model.find({ route_no: route_no }).exec();
        }
        catch (error) {
            console.error("Error finding bus route by route no:", error);
            throw new Error("Failed to find bus route by route no");
        }
    }
};
exports.BusStopsService = BusStopsService;
exports.BusStopsService = BusStopsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bus_stop_entity_1.BusStop.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BusStopsService);
//# sourceMappingURL=bus-stops.service.js.map