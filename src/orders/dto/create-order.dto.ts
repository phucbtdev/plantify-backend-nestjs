import { SellerDto } from '../../sellers/dto/seller.dto';

import { UserDto } from '../../users/dto/user.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsOptional,
  IsNumber,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  shipping_fee: number;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  total_amount: number;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  sub_total: number;

  @ApiProperty({
    required: false,
    type: () => SellerDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => SellerDto)
  @IsNotEmptyObject()
  seller?: SellerDto | null;

  @ApiProperty({
    required: false,
    type: () => UserDto,
  })
  @IsOptional()
  @ValidateNested()
  @Type(() => UserDto)
  @IsNotEmptyObject()
  user?: UserDto | null;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
