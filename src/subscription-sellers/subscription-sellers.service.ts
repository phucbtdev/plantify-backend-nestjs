import { PlanSellersService } from '../plan-sellers/plan-sellers.service';
import { PlanSeller } from '../plan-sellers/domain/plan-seller';

import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateSubscriptionSellerDto } from './dto/create-subscription-seller.dto';
import { UpdateSubscriptionSellerDto } from './dto/update-subscription-seller.dto';
import { SubscriptionSellerRepository } from './infrastructure/persistence/subscription-seller.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { SubscriptionSeller } from './domain/subscription-seller';

@Injectable()
export class SubscriptionSellersService {
  constructor(
    private readonly planSellerService: PlanSellersService,

    private readonly userService: UsersService,

    // Dependencies here
    private readonly subscriptionSellerRepository: SubscriptionSellerRepository,
  ) {}

  async create(createSubscriptionSellerDto: CreateSubscriptionSellerDto) {
    // Do not remove comment below.
    // <creating-property />

    const plan_idObject = await this.planSellerService.findById(
      createSubscriptionSellerDto.plan_id.id,
    );
    if (!plan_idObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          plan_id: 'notExists',
        },
      });
    }
    const plan_id = plan_idObject;

    let user_id: User | undefined = undefined;

    if (createSubscriptionSellerDto.user_id) {
      const user_idObject = await this.userService.findById(
        createSubscriptionSellerDto.user_id.id,
      );
      if (!user_idObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user_id: 'notExists',
          },
        });
      }
      user_id = user_idObject;
    }

    return this.subscriptionSellerRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      transaction_id: createSubscriptionSellerDto.transaction_id,

      status: createSubscriptionSellerDto.status,

      payment_method: createSubscriptionSellerDto.payment_method,

      end_date: createSubscriptionSellerDto.end_date,

      start_date: createSubscriptionSellerDto.start_date,

      plan_id,

      user_id,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.subscriptionSellerRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: SubscriptionSeller['id']) {
    return this.subscriptionSellerRepository.findById(id);
  }

  findByIds(ids: SubscriptionSeller['id'][]) {
    return this.subscriptionSellerRepository.findByIds(ids);
  }

  async update(
    id: SubscriptionSeller['id'],

    updateSubscriptionSellerDto: UpdateSubscriptionSellerDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let plan_id: PlanSeller | undefined = undefined;

    if (updateSubscriptionSellerDto.plan_id) {
      const plan_idObject = await this.planSellerService.findById(
        updateSubscriptionSellerDto.plan_id.id,
      );
      if (!plan_idObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            plan_id: 'notExists',
          },
        });
      }
      plan_id = plan_idObject;
    }

    let user_id: User | undefined = undefined;

    if (updateSubscriptionSellerDto.user_id) {
      const user_idObject = await this.userService.findById(
        updateSubscriptionSellerDto.user_id.id,
      );
      if (!user_idObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user_id: 'notExists',
          },
        });
      }
      user_id = user_idObject;
    }

    return this.subscriptionSellerRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      transaction_id: updateSubscriptionSellerDto.transaction_id,

      status: updateSubscriptionSellerDto.status,

      payment_method: updateSubscriptionSellerDto.payment_method,

      end_date: updateSubscriptionSellerDto.end_date,

      start_date: updateSubscriptionSellerDto.start_date,

      plan_id,

      user_id,
    });
  }

  remove(id: SubscriptionSeller['id']) {
    return this.subscriptionSellerRepository.remove(id);
  }
}
