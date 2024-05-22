"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusStopsModule = void 0;
const common_1 = require("@nestjs/common");
const bus_stops_service_1 = require("./bus-stops.service");
const bus_stops_controller_1 = require("./bus-stops.controller");
const mongoose_1 = require("@nestjs/mongoose");
const bus_stop_entity_1 = require("./entities/bus-stop.entity");
let BusStopsModule = class BusStopsModule {
};
exports.BusStopsModule = BusStopsModule;
exports.BusStopsModule = BusStopsModule = __decorate([
    (0, common_1.Module)({
        controllers: [bus_stops_controller_1.BusStopsController],
        providers: [bus_stops_service_1.BusStopsService],
        imports: [
            mongoose_1.MongooseModule.forFeature([{
                    name: bus_stop_entity_1.BusStop.name,
                    schema: bus_stop_entity_1.BusStopSchema
                }])
        ],
        exports: [bus_stops_service_1.BusStopsService]
    })
], BusStopsModule);
//# sourceMappingURL=bus-stops.module.js.map