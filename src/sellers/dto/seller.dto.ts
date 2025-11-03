import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SellerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
