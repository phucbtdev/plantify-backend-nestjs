import { Seller } from '../../sellers/domain/seller';
import { Product } from '../../products/domain/product';
import { Cart } from '../../carts/domain/cart';
import { ApiProperty } from '@nestjs/swagger';

export class CartItem {
  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  unit_price: number;

  @ApiProperty({
    type: () => Number,
    nullable: false,
  })
  quantity: number;

  @ApiProperty({
    type: () => Seller,
    nullable: false,
  })
  seller: Seller;

  @ApiProperty({
    type: () => Product,
    nullable: false,
  })
  product: Product;

  @ApiProperty({
    type: () => Cart,
    nullable: false,
  })
  cart: Cart;

  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
