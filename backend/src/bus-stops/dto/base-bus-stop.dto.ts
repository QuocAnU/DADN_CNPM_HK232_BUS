import { ApiProperty } from "@nestjs/swagger";
import { PrimaryColumn } from "typeorm";

export class BaseBusStopDto {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    address: string;
    
    @ApiProperty()
    route_no: string;

    deleted: Boolean = false;
}

 