import { ApiProperty } from '@nestjs/swagger';

export class PlanSeller {
  @ApiProperty({
    type: () => Boolean,
    nullable: false,
  })
  is_active: boolean;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
  })
  commission_rate: boolean;

  @ApiProperty({
    type: () => Boolean,
    nullable: false,
  })
  priority_support: boolean;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  price_yearly?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  price_monthly: number;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  slug: string;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
