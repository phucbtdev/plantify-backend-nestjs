import { PlanSeller } from '../../../../domain/plan-seller';

import { PlanSellerEntity } from '../entities/plan-seller.entity';

export class PlanSellerMapper {
  static toDomain(raw: PlanSellerEntity): PlanSeller {
    const domainEntity = new PlanSeller();
    domainEntity.is_active = raw.is_active;

    domainEntity.commission_rate = raw.commission_rate;

    domainEntity.priority_support = raw.priority_support;

    domainEntity.price_yearly = raw.price_yearly;

    domainEntity.price_monthly = raw.price_monthly;

    domainEntity.slug = raw.slug;

    domainEntity.name = raw.name;

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: PlanSeller): PlanSellerEntity {
    const persistenceEntity = new PlanSellerEntity();
    persistenceEntity.is_active = domainEntity.is_active;

    persistenceEntity.commission_rate = domainEntity.commission_rate;

    persistenceEntity.priority_support = domainEntity.priority_support;

    persistenceEntity.price_yearly = domainEntity.price_yearly;

    persistenceEntity.price_monthly = domainEntity.price_monthly;

    persistenceEntity.slug = domainEntity.slug;

    persistenceEntity.name = domainEntity.name;

    if (domainEntity.id) {
      persistenceEntity.id = domainEntity.id;
    }
    persistenceEntity.createdAt = domainEntity.createdAt;
    persistenceEntity.updatedAt = domainEntity.updatedAt;

    return persistenceEntity;
  }
}
