import { SellerEntity } from '../../../../../sellers/infrastructure/persistence/relational/entities/seller.entity';

import { ProductEntity } from '../../../../../products/infrastructure/persistence/relational/entities/product.entity';

import { CartEntity } from '../../../../../carts/infrastructure/persistence/relational/entities/cart.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'cart_item',
})
export class CartItemEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: Number,
  })
  unit_price: number;

  @Column({
    nullable: false,
    type: Number,
    default: 1,
  })
  quantity: number;

  @ManyToOne(() => SellerEntity, { eager: true, nullable: false })
  seller: SellerEntity;

  @ManyToOne(() => ProductEntity, { eager: true, nullable: false })
  product: ProductEntity;

  @ManyToOne(() => CartEntity, { eager: true, nullable: false })
  cart: CartEntity;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
