import { PlanSeller } from '../../plan-sellers/domain/plan-seller';
import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class SubscriptionSeller {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  transaction_id?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  status?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  payment_method?: string;

  @ApiProperty({
    type: () => Date,
    nullable: false,
  })
  end_date: Date;

  @ApiProperty({
    type: () => Date,
    nullable: false,
  })
  start_date?: Date;

  @ApiProperty({
    type: () => PlanSeller,
    nullable: false,
  })
  plan_id: PlanSeller;

  @ApiProperty({
    type: () => User,
    nullable: false,
  })
  user_id?: User;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
