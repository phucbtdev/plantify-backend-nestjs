import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class Seller {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  slug?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  shop_name: string;

  @ApiProperty({
    type: () => User,
    nullable: false,
  })
  user: User;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
