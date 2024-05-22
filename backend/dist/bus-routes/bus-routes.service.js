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
exports.BusRoutesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bus_route_entity_1 = require("./entities/bus-route.entity");
let BusRoutesService = class BusRoutesService {
    constructor(model) {
        this.model = model;
    }
    async create(createBusRouteDto) {
        try {
            const newBusRoute = await new this.model({
                ...createBusRouteDto,
                createdAt: new Date(),
                number_of_buses: 0,
                deleted: false,
            }).save();
            return newBusRoute;
        }
        catch (error) {
            console.error("Error creating bus route:", error);
            throw new Error("Failed to create bus route");
        }
    }
    async findAll() {
        return await this.model.find().exec();
    }
    async findOneByRouteNo(route_no) {
        try {
            const busRoute = await this.model.findOne({ route_no: route_no }).exec();
            return busRoute;
        }
        catch (error) {
            console.error("Error finding bus route by name:", error);
            throw new Error("Failed to find bus route by name");
        }
    }
    async updateById(busRouteId, updateBusRouteDto) {
        try {
            const updateUser = await this.model
                .findByIdAndUpdate(busRouteId, { ...updateBusRouteDto, updatedAt: new Date() }, { new: true })
                .exec();
            if (!updateUser) {
                throw new Error("User not found");
            }
            return updateUser;
        }
        catch (error) {
            console.error("Error updating bus route by ID:", error);
            throw new Error("Failed to update bus route by ID");
        }
    }
    async remove(busRouteId) {
        try {
            const updatedBusRoute = await this.model.findByIdAndUpdate(busRouteId, { deleted: true }, { new: true }).exec();
            if (!updatedBusRoute) {
                throw new Error("Failed to remove bus route");
            }
            else
                return updatedBusRoute;
        }
        catch (error) {
            console.error("Error removing bus route:", error);
            throw new Error("Failed to remove bus route");
        }
    }
};
exports.BusRoutesService = BusRoutesService;
exports.BusRoutesService = BusRoutesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(bus_route_entity_1.BusRoute.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BusRoutesService);
//# sourceMappingURL=bus-routes.service.js.map