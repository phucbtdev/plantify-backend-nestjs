import {
  // decorators here

  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

export class CreatePlanSellerDto {
  @ApiProperty({
    required: true,
    type: () => Boolean,
  })
  @IsBoolean()
  is_active: boolean;

  @ApiProperty({
    required: true,
    type: () => Boolean,
  })
  @IsBoolean()
  commission_rate: boolean;

  @ApiProperty({
    required: true,
    type: () => Boolean,
  })
  @IsBoolean()
  priority_support: boolean;

  @ApiProperty({
    required: false,
    type: () => Number,
  })
  @IsOptional()
  @IsNumber()
  price_yearly?: number | null;

  @ApiProperty({
    required: true,
    type: () => Number,
  })
  @IsNumber()
  price_monthly: number;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  slug: string;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  name: string;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
