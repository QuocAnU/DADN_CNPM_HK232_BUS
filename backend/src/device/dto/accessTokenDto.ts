import { ApiProperty } from "@nestjs/swagger";


export class DeviceDto {
    @ApiProperty()
    accessToken: string;
}
