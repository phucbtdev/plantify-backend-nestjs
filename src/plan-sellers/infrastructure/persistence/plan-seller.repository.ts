import { DeepPartial } from '../../../utils/types/deep-partial.type';
import { NullableType } from '../../../utils/types/nullable.type';
import { IPaginationOptions } from '../../../utils/types/pagination-options';
import { PlanSeller } from '../../domain/plan-seller';

export abstract class PlanSellerRepository {
  abstract create(
    data: Omit<PlanSeller, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<PlanSeller>;

  abstract findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PlanSeller[]>;

  abstract findById(id: PlanSeller['id']): Promise<NullableType<PlanSeller>>;

  abstract findByIds(ids: PlanSeller['id'][]): Promise<PlanSeller[]>;

  abstract update(
    id: PlanSeller['id'],
    payload: DeepPartial<PlanSeller>,
  ): Promise<PlanSeller | null>;

  abstract remove(id: PlanSeller['id']): Promise<void>;
}
