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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseBusRouteDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
class BaseBusRouteDto {
    constructor() {
        this.number_of_buses = 0;
        this.deleted = false;
    }
}
exports.BaseBusRouteDto = BaseBusRouteDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Route number of the bus route (Primary Key)',
        example: '50',
    }),
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], BaseBusRouteDto.prototype, "route_no", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BaseBusRouteDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BaseBusRouteDto.prototype, "schedule", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BaseBusRouteDto.prototype, "operation_time", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BaseBusRouteDto.prototype, "ticket", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BaseBusRouteDto.prototype, "ticket_student", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BaseBusRouteDto.prototype, "route_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BaseBusRouteDto.prototype, "between_two_buses", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BaseBusRouteDto.prototype, "organization", void 0);
//# sourceMappingURL=base-bus-route-dto.js.map