import { SellerDto } from '../../sellers/dto/seller.dto';

import { ProductDto } from '../../products/dto/product.dto';

import { CartDto } from '../../carts/dto/cart.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsNumber,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateCartItemDto {
  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  unit_price: number;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    required: true,
    type: () => SellerDto,
  })
  @ValidateNested()
  @Type(() => SellerDto)
  @IsNotEmptyObject()
  seller: SellerDto;

  @ApiProperty({
    required: true,
    type: () => ProductDto,
  })
  @ValidateNested()
  @Type(() => ProductDto)
  @IsNotEmptyObject()
  product: ProductDto;

  @ApiProperty({
    required: true,
    type: () => CartDto,
  })
  @ValidateNested()
  @Type(() => CartDto)
  @IsNotEmptyObject()
  cart: CartDto;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
