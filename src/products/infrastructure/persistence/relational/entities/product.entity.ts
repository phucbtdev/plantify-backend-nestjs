import { CategoryEntity } from '../../../../../categories/infrastructure/persistence/relational/entities/category.entity';

import { SellerEntity } from '../../../../../sellers/infrastructure/persistence/relational/entities/seller.entity';

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
  name: 'product',
})
export class ProductEntity extends EntityRelationalHelper {
  @Column('jsonb')
  seo_meta?: object | null;

  @Column({
    nullable: true,
    type: Boolean,
  })
  is_rare?: boolean | null;

  @Column({
    nullable: true,
    type: Boolean,
  })
  is_feature?: boolean | null;

  @Column({
    nullable: true,
    type: Number,
  })
  stock?: number | null;

  @Column({
    nullable: false,
    type: Number,
  })
  price: number;

  @Column({
    nullable: true,
    type: String,
  })
  description?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  short_description?: string | null;

  @Column({
    nullable: true,
    type: String,
  })
  slug?: string | null;

  @Column({
    nullable: false,
    type: String,
  })
  name: string;

  @ManyToOne(() => CategoryEntity, { eager: true, nullable: false })
  category: CategoryEntity;

  @ManyToOne(() => SellerEntity, { eager: true, nullable: false })
  seller: SellerEntity;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
