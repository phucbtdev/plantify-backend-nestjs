import { Cart } from '../../../../domain/cart';

import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { CartEntity } from '../entities/cart.entity';

export class CartMapper {
  static toDomain(raw: CartEntity): Cart {
    const domainEntity = new Cart();
    domainEntity.meta = raw.meta;

    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Cart): CartEntity {
    const persistenceEntity = new CartEntity();
    persistenceEntity.meta = domainEntity.meta;

    if (domainEntity.user) {
      persistenceEntity.user = UserMapper.toPersistence(domainEntity.user);
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
