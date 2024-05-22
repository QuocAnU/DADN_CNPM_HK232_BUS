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
exports.BusStopsController = void 0;
const common_1 = require("@nestjs/common");
const bus_stops_service_1 = require("./bus-stops.service");
const create_bus_stop_dto_1 = require("./dto/create-bus-stop.dto");
const swagger_1 = require("@nestjs/swagger");
let BusStopsController = class BusStopsController {
    constructor(busStopService) {
        this.busStopService = busStopService;
    }
    async create(createBusStopDto) {
        try {
            return await this.busStopService.create(createBusStopDto);
        }
        catch (err) {
            return { message: err.message || 'Internal Server Error' };
        }
    }
    async findAll() {
        try {
            return await this.busStopService.findAll();
        }
        catch (err) {
            return { message: err.message || 'Internal Server Error' };
        }
    }
    async findByRouteNo(route_no) {
        try {
            return await this.busStopService.findByRouteNo(route_no);
        }
        catch (err) {
            return { message: err.message || 'Internal Server Error' };
        }
    }
};
exports.BusStopsController = BusStopsController;
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bus_stop_dto_1.CreateBusStopDto]),
    __metadata("design:returntype", Promise)
], BusStopsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BusStopsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':route_no'),
    __param(0, (0, common_1.Param)('route_no')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BusStopsController.prototype, "findByRouteNo", null);
exports.BusStopsController = BusStopsController = __decorate([
    (0, swagger_1.ApiTags)("BusStops"),
    (0, common_1.Controller)('bus-stop'),
    __metadata("design:paramtypes", [bus_stops_service_1.BusStopsService])
], BusStopsController);
//# sourceMappingURL=bus-stops.controller.js.map