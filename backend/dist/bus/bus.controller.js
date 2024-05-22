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
exports.BusController = void 0;
const common_1 = require("@nestjs/common");
const bus_service_1 = require("./bus.service");
const create_bus_dto_1 = require("./dto/create-bus.dto");
const swagger_1 = require("@nestjs/swagger");
let BusController = class BusController {
    constructor(busService) {
        this.busService = busService;
    }
    async create(createBusDto) {
        try {
            return await this.busService.create(createBusDto);
        }
        catch (err) {
            return { message: err.message || 'Internal Server Error' };
        }
    }
    async findAll() {
        try {
            return await this.busService.findAll();
        }
        catch (err) {
            return { message: err.message || 'Internal Server Error' };
        }
    }
};
exports.BusController = BusController;
__decorate([
    (0, common_1.Post)("bus/create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_bus_dto_1.CreateBusDto]),
    __metadata("design:returntype", Promise)
], BusController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("bus/all"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BusController.prototype, "findAll", null);
exports.BusController = BusController = __decorate([
    (0, swagger_1.ApiTags)("Bus"),
    (0, common_1.Controller)('bus'),
    __metadata("design:paramtypes", [bus_service_1.BusService])
], BusController);
//# sourceMappingURL=bus.controller.js.map