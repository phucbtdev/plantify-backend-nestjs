import { Seller } from '../../sellers/domain/seller';
import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';
import { StatusOrder } from '../status.enum';

export class Order {
  @ApiProperty({
    type: () => String,
  })
  status?: StatusOrder;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  shipping_fee: number;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  total_amount: number;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  sub_total: number;

  @ApiProperty({
    type: () => Seller,
    nullable: true,
  })
  seller?: Seller | null;

  @ApiProperty({
    type: () => User,
    nullable: true,
  })
  user?: User | null;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
