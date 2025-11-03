import { ApiProperty } from '@nestjs/swagger';

export class Category {
  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  parent_id?: string | null;

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
