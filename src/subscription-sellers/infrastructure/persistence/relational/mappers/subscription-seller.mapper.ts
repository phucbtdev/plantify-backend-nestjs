import { SubscriptionSeller } from '../../../../domain/subscription-seller';

import { PlanSellerMapper } from '../../../../../plan-sellers/infrastructure/persistence/relational/mappers/plan-seller.mapper';

import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { SubscriptionSellerEntity } from '../entities/subscription-seller.entity';

export class SubscriptionSellerMapper {
  static toDomain(raw: SubscriptionSellerEntity): SubscriptionSeller {
    const domainEntity = new SubscriptionSeller();
    domainEntity.transaction_id = raw.transaction_id;

    domainEntity.payment_method = raw.payment_method;

    domainEntity.status = raw.status;

    domainEntity.end_date = raw.end_date;

    domainEntity.start_date = raw.start_date;

    if (raw.plan) {
      domainEntity.plan = PlanSellerMapper.toDomain(raw.plan);
    }

    if (raw.user) {
      domainEntity.user = UserMapper.toDomain(raw.user);
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(
    domainEntity: SubscriptionSeller,
  ): SubscriptionSellerEntity {
    const persistenceEntity = new SubscriptionSellerEntity();
    persistenceEntity.transaction_id = domainEntity.transaction_id;

    persistenceEntity.payment_method = domainEntity.payment_method;

    persistenceEntity.status = domainEntity.status;

    persistenceEntity.end_date = domainEntity.end_date;

    persistenceEntity.start_date = domainEntity.start_date;

    if (domainEntity.plan) {
      persistenceEntity.plan = PlanSellerMapper.toPersistence(
        domainEntity.plan,
      );
    }

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
