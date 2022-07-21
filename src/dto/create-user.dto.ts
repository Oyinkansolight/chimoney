import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ description: "User's name", example: 'John Doe' })
  readonly name: string;

  @IsNumber()
  @ApiProperty({ description: "User's age", example: 30 })
  readonly age: number;
}
