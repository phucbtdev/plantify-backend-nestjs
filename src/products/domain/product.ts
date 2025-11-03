import { Category } from '../../categories/domain/category';
import { Seller } from '../../sellers/domain/seller';
import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({
    type: () => Object,
    nullable: true,
  })
  seo_meta?: object | null;

  @ApiProperty({
    type: () => Boolean,
    nullable: true,
  })
  is_rare?: boolean | null;

  @ApiProperty({
    type: () => Boolean,
    nullable: true,
  })
  is_feature?: boolean | null;

  @ApiProperty({
    type: () => Number,
    nullable: true,
  })
  stock?: number | null;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  price: number;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  short_description?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: true,
  })
  slug?: string | null;

  @ApiProperty({
    type: () => String,
    nullable: false,
  })
  name: string;

  @ApiProperty({
    type: () => Category,
    nullable: false,
  })
  category: Category;

  @ApiProperty({
    type: () => Seller,
    nullable: false,
  })
  seller: Seller;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
