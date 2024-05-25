import { ApiProperty } from "@nestjs/swagger";
import { PrimaryColumn } from "typeorm";

export class BaseBusStopDto {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    latitude: string;

    @ApiProperty()
    longitute: string
    
    @ApiProperty()
    route_no: string;

    deleted: Boolean = false;
}

 