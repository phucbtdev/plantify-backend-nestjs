import { SellersModule } from '../sellers/sellers.module';
import { ProductsModule } from '../products/products.module';
import { CartsModule } from '../carts/carts.module';
import {
  // do not remove this comment
  Module,
} from '@nestjs/common';
import { CartItemsService } from './cart-items.service';
import { CartItemsController } from './cart-items.controller';
import { RelationalCartItemPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    SellersModule,

    ProductsModule,

    CartsModule,

    // do not remove this comment
    RelationalCartItemPersistenceModule,
  ],
  controllers: [CartItemsController],
  providers: [CartItemsService],
  exports: [CartItemsService, RelationalCartItemPersistenceModule],
})
export class CartItemsModule {}
