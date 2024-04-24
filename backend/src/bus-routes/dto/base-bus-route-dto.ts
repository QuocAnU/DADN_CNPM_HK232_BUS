import { ApiProperty } from "@nestjs/swagger";
import { PrimaryColumn } from "typeorm";

export class BaseBusRouteDto {
    @ApiProperty({
        description: 'Route number of the bus route (Primary Key)',
        example: '50',
    })
    @PrimaryColumn()
    route_no: string

    @ApiProperty()
    name: string;

    number_of_buses: number =  0;

    @ApiProperty()
    schedule: string;
    @ApiProperty()
    operation_time: string;

    @ApiProperty()
    ticket: string;

    @ApiProperty()
    ticket_student: string;
    
    @ApiProperty()
    route_type: string;

    @ApiProperty()
    between_two_buses: string

    @ApiProperty()
    organization: string;



    deleted: Boolean = false;
}

 