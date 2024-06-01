import { ApiProperty } from "@nestjs/swagger";
import { Double, PrimaryColumn } from "typeorm";

export class BaseBusStopDto {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    latitude: number;

    @ApiProperty()
    longitude: number;
    
    @ApiProperty()
    route_no: string;

    deleted: Boolean = false;
}

 