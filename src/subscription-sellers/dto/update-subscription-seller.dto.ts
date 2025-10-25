// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';

import { PartialType } from '@nestjs/swagger';
import { CreateSubscriptionSellerDto } from './create-subscription-seller.dto';

export class UpdateSubscriptionSellerDto extends PartialType(
  CreateSubscriptionSellerDto,
) {}
