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
exports.BusRoutesController = void 0;
const common_1 = require("@nestjs/common");
const bus_routes_service_1 = require("./bus-routes.service");
const create_bus_route_dto_1 = require("./dto/create-bus-route.dto");
const update_bus_route_dto_1 = require("./dto/update-bus-route.dto");
const swagger_1 = require("@nestjs/swagger");
let BusRoutesController = class BusRoutesController {
    constructor(busRoutesService) {
        this.busRoutesService = busRoutesService;
    }
    async create(createBusRouteDto) {
        try {
            return await this.busRoutesService.create(createBusRouteDto);
        }
        catch (err) {
            return { message: err.message || 'Internal Server Error' };
        }
    }
    async findAll() {
        try {
            return await this.busRoutesService.findAll();
        }
        catch (err) {
            return { message: err.message || 'Internal Server Error' };
        }
    }
    async findOneByName(route_no) {
        try {
            return await this.busRoutesService.findOneByRouteNo(route_no);
        }
        catch (err) {
            return { message: err.message || 'Internal Server Error' };
        }
    }
    async update(id, updateBusRouteDto) {
        try {
            return await this.busRoutesService.updateById(id, updateBusRouteDto);
        }
        catch (err) {
            return { message: err.message || 'Internal Server Error' };
        }
    }
    async remove(id) {
        try {
            return await this.busRoutesService.remove(id);
        }
        catch (err) {
            return { message: err.message || 'Internal Server Error' };
        }
    }
};
exports.BusRoutesController = BusRoutesController;
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bus_route_dto_1.CreateBusRouteDto]),
    __metadata("design:returntype", Promise)
], BusRoutesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BusRoutesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':route_no'),
    __param(0, (0, common_1.Param)('route_no')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BusRoutesController.prototype, "findOneByName", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_bus_route_dto_1.UpdateBusRouteDto]),
    __metadata("design:returntype", Promise)
], BusRoutesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], BusRoutesController.prototype, "remove", null);
exports.BusRoutesController = BusRoutesController = __decorate([
    (0, swagger_1.ApiTags)("BusRoutes"),
    (0, common_1.Controller)('bus-routes'),
    __metadata("design:paramtypes", [bus_routes_service_1.BusRoutesService])
], BusRoutesController);
//# sourceMappingURL=bus-routes.controller.js.map