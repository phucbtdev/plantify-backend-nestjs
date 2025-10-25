import { PlanSellersModule } from '../plan-sellers/plan-sellers.module';
import { UsersModule } from '../users/users.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { SubscriptionSellersService } from './subscription-sellers.service';
import { SubscriptionSellersController } from './subscription-sellers.controller';
import { RelationalSubscriptionSellerPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    PlanSellersModule,

    UsersModule,

    // do not remove this comment
    RelationalSubscriptionSellerPersistenceModule,
  ],
  controllers: [SubscriptionSellersController],
  providers: [SubscriptionSellersService],
  exports: [
    SubscriptionSellersService,
    RelationalSubscriptionSellerPersistenceModule,
  ],
})
export class SubscriptionSellersModule {}
