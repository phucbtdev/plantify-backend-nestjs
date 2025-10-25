import { SubscriptionSeller } from '../../../../domain/subscription-seller';

import { PlanSellerMapper } from '../../../../../plan-sellers/infrastructure/persistence/relational/mappers/plan-seller.mapper';

import { UserMapper } from '../../../../../users/infrastructure/persistence/relational/mappers/user.mapper';

import { SubscriptionSellerEntity } from '../entities/subscription-seller.entity';

export class SubscriptionSellerMapper {
  static toDomain(raw: SubscriptionSellerEntity): SubscriptionSeller {
    const domainEntity = new SubscriptionSeller();
    domainEntity.transaction_id = raw.transaction_id;

    domainEntity.status = raw.status;

    domainEntity.payment_method = raw.payment_method;

    domainEntity.end_date = raw.end_date;

    domainEntity.start_date = raw.start_date;

    if (raw.plan_id) {
      domainEntity.plan_id = PlanSellerMapper.toDomain(raw.plan_id);
    }

    if (raw.user_id) {
      domainEntity.user_id = UserMapper.toDomain(raw.user_id);
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

    persistenceEntity.status = domainEntity.status;

    persistenceEntity.payment_method = domainEntity.payment_method;

    persistenceEntity.end_date = domainEntity.end_date;

    persistenceEntity.start_date = domainEntity.start_date;

    if (domainEntity.plan_id) {
      persistenceEntity.plan_id = PlanSellerMapper.toPersistence(
        domainEntity.plan_id,
      );
    }

    if (domainEntity.user_id) {
      persistenceEntity.user_id = UserMapper.toPersistence(
        domainEntity.user_id,
      );
    }

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
