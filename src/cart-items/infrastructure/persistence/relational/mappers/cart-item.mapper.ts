import { CartItem } from '../../../../domain/cart-item';

import { SellerMapper } from '../../../../../sellers/infrastructure/persistence/relational/mappers/seller.mapper';

import { ProductMapper } from '../../../../../products/infrastructure/persistence/relational/mappers/product.mapper';

import { CartMapper } from '../../../../../carts/infrastructure/persistence/relational/mappers/cart.mapper';

import { CartItemEntity } from '../entities/cart-item.entity';

export class CartItemMapper {
  static toDomain(raw: CartItemEntity): CartItem {
    const domainEntity = new CartItem();
    domainEntity.unit_price = raw.unit_price;

    domainEntity.quantity = raw.quantity;

    if (raw.seller) {
      domainEntity.seller = SellerMapper.toDomain(raw.seller);
    }

    if (raw.product) {
      domainEntity.product = ProductMapper.toDomain(raw.product);
    }

    if (raw.cart) {
      domainEntity.cart = CartMapper.toDomain(raw.cart);
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: CartItem): CartItemEntity {
    const persistenceEntity = new CartItemEntity();
    persistenceEntity.unit_price = domainEntity.unit_price;

    persistenceEntity.quantity = domainEntity.quantity;

    if (domainEntity.seller) {
      persistenceEntity.seller = SellerMapper.toPersistence(
        domainEntity.seller,
      );
    }

    if (domainEntity.product) {
      persistenceEntity.product = ProductMapper.toPersistence(
        domainEntity.product,
      );
    }

    if (domainEntity.cart) {
      persistenceEntity.cart = CartMapper.toPersistence(domainEntity.cart);
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
