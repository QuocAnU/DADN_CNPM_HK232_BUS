import { ApiProperty } from "@nestjs/swagger";
import { Double, PrimaryColumn } from "typeorm";

export class BaseBusStopDto {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    latitude: number;

    @ApiProperty()
    longitute: number;
    
    @ApiProperty()
    route_no: number;

    deleted: Boolean = false;
}

 