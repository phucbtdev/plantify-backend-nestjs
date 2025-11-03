import { User } from '../../users/domain/user';
import { ApiProperty } from '@nestjs/swagger';

export class Cart {
  @ApiProperty({
    type: () => Object,
    nullable: true,
  })
  meta?: object | null;

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
