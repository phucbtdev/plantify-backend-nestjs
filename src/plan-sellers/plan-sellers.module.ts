import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { PlanSellersService } from './plan-sellers.service';
import { PlanSellersController } from './plan-sellers.controller';
import { RelationalPlanSellerPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    // do not remove this comment
    RelationalPlanSellerPersistenceModule,
  ],
  controllers: [PlanSellersController],
  providers: [PlanSellersService],
  exports: [PlanSellersService, RelationalPlanSellerPersistenceModule],
})
export class PlanSellersModule {}
