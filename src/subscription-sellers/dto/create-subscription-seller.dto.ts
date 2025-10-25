import { PlanSellerDto } from '../../plan-sellers/dto/plan-seller.dto';

import {
  // decorators here
  Type,
} from 'class-transformer';

import {
  // decorators here

  ValidateNested,
  IsNotEmptyObject,
  IsString,
} from 'class-validator';

import {
  // decorators here
  ApiProperty,
} from '@nestjs/swagger';

import { UserDto } from '../../users/dto/user.dto';

export class CreateSubscriptionSellerDto {
  transaction_id?: string | null;

  @ApiProperty({
    required: true,
    type: () => String,
  })
  @IsString()
  payment_method: string;

  status?: string;

  end_date?: Date | null;

  start_date?: Date;

  @ApiProperty({
    required: true,
    type: () => PlanSellerDto,
  })
  @ValidateNested()
  @Type(() => PlanSellerDto)
  @IsNotEmptyObject()
  plan: PlanSellerDto;

  user?: UserDto;

  // Don't forget to use the class-validator decorators in the DTO properties.
}
