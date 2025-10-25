import { PlanSellerEntity } from '../../../../../plan-sellers/infrastructure/persistence/relational/entities/plan-seller.entity';

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

@Entity({
  name: 'subscription_seller',
})
export class SubscriptionSellerEntity extends EntityRelationalHelper {
  @Column({
    nullable: true,
    type: String,
  })
  transaction_id?: string | null;

  @Column({
    nullable: false,
    type: String,
  })
  payment_method: string;

  @Column({
    nullable: false,
    type: String,
  })
  status?: string;

  @Column({
    nullable: true,
    type: Date,
  })
  end_date?: Date | null;

  @Column({
    nullable: false,
    type: Date,
  })
  start_date?: Date;

  @ManyToOne(() => PlanSellerEntity, { eager: true, nullable: false })
  plan: PlanSellerEntity;

  @ManyToOne(() => UserEntity, { eager: true, nullable: false })
  user?: UserEntity;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
