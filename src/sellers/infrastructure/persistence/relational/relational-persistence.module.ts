import { Module } from '@nestjs/common';
import { SellerRepository } from '../seller.repository';
import { SellerRelationalRepository } from './repositories/seller.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerEntity } from './entities/seller.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SellerEntity])],
  providers: [
    {
      provide: SellerRepository,
      useClass: SellerRelationalRepository,
    },
  ],
  exports: [SellerRepository],
})
export class RelationalSellerPersistenceModule {}
