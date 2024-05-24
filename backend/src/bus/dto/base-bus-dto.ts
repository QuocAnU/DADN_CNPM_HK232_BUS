import { ApiProperty } from "@nestjs/swagger";
import { PrimaryColumn } from "typeorm";

export class BaseBusDto {
    @ApiProperty()
    @PrimaryColumn()
    number_plate: string

    @ApiProperty()
    route_no: string

    createdAt: Date
    deleted: Boolean = false;
}
