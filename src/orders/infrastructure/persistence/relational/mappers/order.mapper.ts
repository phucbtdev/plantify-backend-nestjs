import { Order } from '../../../../domain/order';

import { SellerMapper } from '../../../../../sellers/infrastructure/persistence/relational/mappers/seller.mapper';

import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { OrderEntity } from '../entities/order.entity';

export class OrderMapper {
  static toDomain(raw: OrderEntity): Order {
    const domainEntity = new Order();
    domainEntity.status = raw.status;

    domainEntity.shipping_fee = raw.shipping_fee;

    domainEntity.total_amount = raw.total_amount;

    domainEntity.sub_total = raw.sub_total;

    if (raw.seller) {
      domainEntity.seller = SellerMapper.toDomain(raw.seller);
    } else if (raw.seller === null) {
      domainEntity.seller = null;
    }

    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    } else if (raw.user === null) {
      domainEntity.user = null;
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Order): OrderEntity {
    const persistenceEntity = new OrderEntity();
    persistenceEntity.status = domainEntity.status;

    persistenceEntity.shipping_fee = domainEntity.shipping_fee;

    persistenceEntity.total_amount = domainEntity.total_amount;

    persistenceEntity.sub_total = domainEntity.sub_total;

    if (domainEntity.seller) {
      persistenceEntity.seller = SellerMapper.toPersistence(
        domainEntity.seller,
      );
    } else if (domainEntity.seller === null) {
      persistenceEntity.seller = null;
    }

    if (domainEntity.user) {
      persistenceEntity.user = UserMapper.toPersistence(domainEntity.user);
    } else if (domainEntity.user === null) {
      persistenceEntity.user = null;
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
