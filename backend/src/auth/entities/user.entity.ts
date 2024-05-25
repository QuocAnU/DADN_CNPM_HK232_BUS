import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
  })
  @Prop()
  fullname: string;

  @ApiProperty({
    example: true,
    description: 'Whether the user account is active or not',
    default: false,
  })
  @Prop({ default: null })
  otp: string;
  
  @Prop({
    default: false,
  })
  active: boolean;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'The email address of the user',
  })
  @Prop()
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'The password of the user',
  })
  @Prop()
  password: string;

  @ApiProperty({
    example: '2022-05-13T08:00:00.000Z',
    description: 'The date and time when the user account was created',
  })
  @Prop()
  createdAt?: Date;

  @ApiProperty({
    example: '2022-05-13T08:00:00.000Z',
    description: 'The date and time when the user account was last updated',
  })
  @Prop()
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);