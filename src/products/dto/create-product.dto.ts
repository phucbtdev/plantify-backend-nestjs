import { CategoryDto } from '../../categories/dto/category.dto';

import { SellerDto } from '../../sellers/dto/seller.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsString,
  IsOptional,
  IsNumber,
  IsBoolean,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreateProductDto {
  seo_meta?: object | null;

  @ApiProperty({
    required: false,
    type: () => Boolean,
  })
  @IsOptional()
  @IsBoolean()
  is_rare?: boolean | null;

  @ApiProperty({
    required: false,
    type: () => Boolean,
  })
  @IsOptional()
  @IsBoolean()
  is_feature?: boolean | null;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  stock?: number | null;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  short_description?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  slug?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  name: string;

  @ApiProperty({
    required: true,
    type: () => CategoryDto,
  })
  @ValidateNested()
  @Type(() => CategoryDto)
  @IsNotEmptyObject()
  category: CategoryDto;

  @ApiProperty({
    required: true,
    type: () => SellerDto,
  })
  @ValidateNested()
  @Type(() => SellerDto)
  @IsNotEmptyObject()
  seller: SellerDto;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
