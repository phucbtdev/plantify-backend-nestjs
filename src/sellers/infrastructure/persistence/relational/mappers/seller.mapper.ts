import { Seller } from '../../../../domain/seller';

import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { SellerEntity } from '../entities/seller.entity';

export class SellerMapper {
  static toDomain(raw: SellerEntity): Seller {
    const domainEntity = new Seller();
    domainEntity.slug = raw.slug;

    domainEntity.shop_name = raw.shop_name;

    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Seller): SellerEntity {
    const persistenceEntity = new SellerEntity();
    persistenceEntity.slug = domainEntity.slug;

    persistenceEntity.shop_name = domainEntity.shop_name;

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
