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

    const planObject = await this.planSellerService.findById(
      createSubscriptionSellerDto.plan.id,
    );
    if (!planObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          plan: 'notExists',
        },
      });
    }
    const plan = planObject;

    let user: User | undefined = undefined;

    if (createSubscriptionSellerDto.user) {
      const userObject = await this.userService.findById(
        createSubscriptionSellerDto.user.id,
      );
      if (!userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'notExists',
          },
        });
      }
      user = userObject;
    }

    return this.subscriptionSellerRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      transaction_id: createSubscriptionSellerDto.transaction_id,

      payment_method: createSubscriptionSellerDto.payment_method,

      status: createSubscriptionSellerDto.status,

      end_date: createSubscriptionSellerDto.end_date,

      start_date: createSubscriptionSellerDto.start_date,

      plan,

      user,
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

    let plan: PlanSeller | undefined = undefined;

    if (updateSubscriptionSellerDto.plan) {
      const planObject = await this.planSellerService.findById(
        updateSubscriptionSellerDto.plan.id,
      );
      if (!planObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            plan: 'notExists',
          },
        });
      }
      plan = planObject;
    }

    let user: User | undefined = undefined;

    if (updateSubscriptionSellerDto.user) {
      const userObject = await this.userService.findById(
        updateSubscriptionSellerDto.user.id,
      );
      if (!userObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'notExists',
          },
        });
      }
      user = userObject;
    }

    return this.subscriptionSellerRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      transaction_id: updateSubscriptionSellerDto.transaction_id,

      payment_method: updateSubscriptionSellerDto.payment_method,

      status: updateSubscriptionSellerDto.status,

      end_date: updateSubscriptionSellerDto.end_date,

      start_date: updateSubscriptionSellerDto.start_date,

      plan,

      user,
    });
  }

  remove(id: SubscriptionSeller['id']) {
    return this.subscriptionSellerRepository.remove(id);
  }
}
