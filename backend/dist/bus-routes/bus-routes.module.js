"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusRoutesModule = void 0;
const common_1 = require("@nestjs/common");
const bus_routes_service_1 = require("./bus-routes.service");
const bus_routes_controller_1 = require("./bus-routes.controller");
const mongoose_1 = require("@nestjs/mongoose");
const bus_route_entity_1 = require("./entities/bus-route.entity");
let BusRoutesModule = class BusRoutesModule {
};
exports.BusRoutesModule = BusRoutesModule;
exports.BusRoutesModule = BusRoutesModule = __decorate([
    (0, common_1.Module)({
        controllers: [bus_routes_controller_1.BusRoutesController],
        providers: [bus_routes_service_1.BusRoutesService],
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: bus_route_entity_1.BusRoute.name, schema: bus_route_entity_1.BusRouteSchema }])
        ],
        exports: [bus_routes_service_1.BusRoutesService]
    })
], BusRoutesModule);
//# sourceMappingURL=bus-routes.module.js.map