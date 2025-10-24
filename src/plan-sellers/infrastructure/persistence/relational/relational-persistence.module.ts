import { Module } from '@nestjs/common';
import { PlanSellerRepository } from '../plan-seller.repository';
import { PlanSellerRelationalRepository } from './repositories/plan-seller.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanSellerEntity } from './entities/plan-seller.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlanSellerEntity])],
  providers: [
    {
      provide: PlanSellerRepository,
      useClass: PlanSellerRelationalRepository,
    },
  ],
  exports: [PlanSellerRepository],
})
export class RelationalPlanSellerPersistenceModule {}
