import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { Seller } from '../../domain/seller';

export abstract class SellerRepository {
  abstract create(
    data: Omit<Seller, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Seller>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Seller[]>;

  abstract findById(id: Seller['id']): Promise<NullableType<Seller>>;

  abstract findByIds(ids: Seller['id'][]): Promise<Seller[]>;

  abstract update(
    id: Seller['id'],
    payload: DeepPartial<Seller>,
  ): Promise<Seller | null>;

  abstract remove(id: Seller['id']): Promise<void>;
}
