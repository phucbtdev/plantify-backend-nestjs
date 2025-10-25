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
    nullable: false,
  })
  payment_method: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  status?: string;

  @ApiProperty({
    type: () => Date,
    nullable: true,
  })
  end_date?: Date | null;

  @ApiProperty({
    type: () => Date,
    nullable: false,
  })
  start_date?: Date;

  @ApiProperty({
    type: () => PlanSeller,
    nullable: false,
  })
  plan: PlanSeller;

  @ApiProperty({
    type: () => User,
    nullable: false,
  })
  user?: User;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
