import { Module } from '@nestjs/common';
import { SubscriptionSellerRepository } from '../subscription-seller.repository';
import { SubscriptionSellerRelationalRepository } from './repositories/subscription-seller.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionSellerEntity } from './entities/subscription-seller.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionSellerEntity])],
  providers: [
    {
      provide: SubscriptionSellerRepository,
      useClass: SubscriptionSellerRelationalRepository,
    },
  ],
  exports: [SubscriptionSellerRepository],
})
export class RelationalSubscriptionSellerPersistenceModule {}
