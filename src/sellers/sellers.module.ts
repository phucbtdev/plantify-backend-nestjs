import { UsersModule } from '../users/users.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { SellersService } from './sellers.service';
import { SellersController } from './sellers.controller';
import { RelationalSellerPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    UsersModule,

    // do not remove this comment
    RelationalSellerPersistenceModule,
  ],
  controllers: [SellersController],
  providers: [SellersService],
  exports: [SellersService, RelationalSellerPersistenceModule],
})
export class SellersModule {}
