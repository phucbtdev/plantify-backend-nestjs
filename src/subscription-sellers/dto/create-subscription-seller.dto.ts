import { PlanSellerDto } from '../../plan-sellers/dto/plan-seller.dto';

import {
  // decorators here
  Type,
  Transform,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsDate,
  IsString,
  IsOptional,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import { UserDto } from '../../users/dto/user.dto';

export class CreateSubscriptionSellerDto {
  transaction_id?: string | null;

  status?: string | null;

  @ApiProperty({
    required: false,
    type: () => String,
  })
  @IsOptional()
  @IsString()
  payment_method?: string;

  @ApiProperty({
    required: true,
    type: () => Date,
  })
  @Transform(({ value }) => new Date(value))
  @IsDate()
  end_date: Date;

  start_date?: Date;

  @ApiProperty({
    required: true,
    type: () => PlanSellerDto,
  })
  @ValidateNested()
  @Type(() => PlanSellerDto)
  @IsNotEmptyObject()
  plan_id: PlanSellerDto;

  user_id?: UserDto;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
