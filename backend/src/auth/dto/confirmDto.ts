import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CONFIRMDto {
  @ApiProperty({
    type: String,
    description: 'The email address of the user logging in',
    example: 'jane@example.com',
  })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  otp: string;
}