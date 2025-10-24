import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../utils/relational-entity-helper';

@Entity({
  name: 'plan_seller',
})
export class PlanSellerEntity extends EntityRelationalHelper {
  @Column({
    nullable: false,
    type: Boolean,
  })
  is_active: boolean;

  @Column({
    nullable: false,
    type: Boolean,
  })
  commission_rate: boolean;

  @Column({
    nullable: false,
    type: Boolean,
  })
  priority_support: boolean;

  @Column({
    nullable: true,
    type: Number,
  })
  price_yearly?: number | null;

  @Column({
    nullable: false,
    type: Number,
  })
  price_monthly: number;

  @Column({
    nullable: false,
    type: String,
  })
  slug: string;

  @Column({
    nullable: false,
    type: String,
  })
  name: string;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
