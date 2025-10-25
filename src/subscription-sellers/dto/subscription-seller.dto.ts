import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SubscriptionSellerDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
}
