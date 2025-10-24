import {
  // common
  Injectable,
} from '@nestjs/common';
import { CreatePlanSellerDto } from './dto/create-plan-seller.dto';
import { UpdatePlanSellerDto } from './dto/update-plan-seller.dto';
import { PlanSellerRepository } from './infrastructure/persistence/plan-seller.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { PlanSeller } from './domain/plan-seller';

@Injectable()
export class PlanSellersService {
  constructor(
    // Dependencies here
    private readonly planSellerRepository: PlanSellerRepository,
  ) {}

  async create(createPlanSellerDto: CreatePlanSellerDto) {
    // Do not remove comment below.
    // <creating-property />

    return this.planSellerRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      is_active: createPlanSellerDto.is_active,

      commission_rate: createPlanSellerDto.commission_rate,

      priority_support: createPlanSellerDto.priority_support,

      price_yearly: createPlanSellerDto.price_yearly,

      price_monthly: createPlanSellerDto.price_monthly,

      slug: createPlanSellerDto.slug,

      name: createPlanSellerDto.name,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.planSellerRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: PlanSeller['id']) {
    return this.planSellerRepository.findById(id);
  }

  findByIds(ids: PlanSeller['id'][]) {
    return this.planSellerRepository.findByIds(ids);
  }

  async update(
    id: PlanSeller['id'],

    updatePlanSellerDto: UpdatePlanSellerDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    return this.planSellerRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      is_active: updatePlanSellerDto.is_active,

      commission_rate: updatePlanSellerDto.commission_rate,

      priority_support: updatePlanSellerDto.priority_support,

      price_yearly: updatePlanSellerDto.price_yearly,

      price_monthly: updatePlanSellerDto.price_monthly,

      slug: updatePlanSellerDto.slug,

      name: updatePlanSellerDto.name,
    });
  }

  remove(id: PlanSeller['id']) {
    return this.planSellerRepository.remove(id);
  }
}
