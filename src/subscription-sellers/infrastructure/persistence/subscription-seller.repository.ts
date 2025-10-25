import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { SubscriptionSeller } from '../../domain/subscription-seller';

export abstract class SubscriptionSellerRepository {
  abstract create(
    data: Omit<SubscriptionSeller, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<SubscriptionSeller>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SubscriptionSeller[]>;

  abstract findById(
    id: SubscriptionSeller['id'],
  ): Promise<NullableType<SubscriptionSeller>>;

  abstract findByIds(
    ids: SubscriptionSeller['id'][],
  ): Promise<SubscriptionSeller[]>;

  abstract update(
    id: SubscriptionSeller['id'],
    payload: DeepPartial<SubscriptionSeller>,
  ): Promise<SubscriptionSeller | null>;

  abstract remove(id: SubscriptionSeller['id']): Promise<void>;
}
