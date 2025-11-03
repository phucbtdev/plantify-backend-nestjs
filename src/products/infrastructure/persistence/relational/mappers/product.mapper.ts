import { Product } from '../../../../domain/product';

import { CategoryMapper } from '../../../../../categories/infrastructure/persistence/relational/mappers/category.mapper';

import { SellerMapper } from '../../../../../sellers/infrastructure/persistence/relational/mappers/seller.mapper';

import { ProductEntity } from '../entities/product.entity';

export class ProductMapper {
  static toDomain(raw: ProductEntity): Product {
    const domainEntity = new Product();
    domainEntity.seo_meta = raw.seo_meta;

    domainEntity.is_rare = raw.is_rare;

    domainEntity.is_feature = raw.is_feature;

    domainEntity.stock = raw.stock;

    domainEntity.price = raw.price;

    domainEntity.description = raw.description;

    domainEntity.short_description = raw.short_description;

    domainEntity.slug = raw.slug;

    domainEntity.name = raw.name;

    if (raw.category) {
      domainEntity.category = CategoryMapper.toDomain(raw.category);
    }

    if (raw.seller) {
      domainEntity.seller = SellerMapper.toDomain(raw.seller);
    }

    domainEntity.id = raw.id;
    domainEntity.createdAt = raw.createdAt;
    domainEntity.updatedAt = raw.updatedAt;

    return domainEntity;
  }

  static toPersistence(domainEntity: Product): ProductEntity {
    const persistenceEntity = new ProductEntity();
    persistenceEntity.seo_meta = domainEntity.seo_meta;

    persistenceEntity.is_rare = domainEntity.is_rare;

    persistenceEntity.is_feature = domainEntity.is_feature;

    persistenceEntity.stock = domainEntity.stock;

    persistenceEntity.price = domainEntity.price;

    persistenceEntity.description = domainEntity.description;

    persistenceEntity.short_description = domainEntity.short_description;

    persistenceEntity.slug = domainEntity.slug;

    persistenceEntity.name = domainEntity.name;

    if (domainEntity.category) {
      persistenceEntity.category = CategoryMapper.toPersistence(
        domainEntity.category,
      );
    }

    if (domainEntity.seller) {
      persistenceEntity.seller = SellerMapper.toPersistence(
        domainEntity.seller,
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
