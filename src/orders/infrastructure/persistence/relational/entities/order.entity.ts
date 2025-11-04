import { SellerEntity } from '../../../../../sellers/infrastructure/persistence/relational/entities/seller.entity';

import { UserEntity } from '../../../../../users/infrastructure/persistence/relational/entities/user.entity';

import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';
import { StatusOrder } from '../../../../status.enum';

@Entity({
  name: 'order',
})
export class OrderEntity extends EntityRelationalHelper {
  @Column({
    type: 'enum',
    enum: StatusOrder,
    default: StatusOrder.PENDING,
  })
  status?: StatusOrder;

  @Column({
    nullable: true,
    type: Number,
    default: 0,
  })
  shipping_fee: number;

  @Column({
    nullable: false,
    type: Number,
  })
  total_amount: number;

  @Column({
    nullable: false,
    type: Number,
  })
  sub_total: number;

  @ManyToOne(() => SellerEntity, { eager: true, nullable: true })
  seller?: SellerEntity | null;

  @ManyToOne(() => UserEntity, { eager: true, nullable: true })
  user?: UserEntity | null;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
