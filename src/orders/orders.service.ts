import { SellersService } from '../sellers/sellers.service';
import { Seller } from '../sellers/domain/seller';

import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrderRepository } from './infrastructure/persistence/order.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Order } from './domain/order';

@Injectable()
export class OrdersService {
  constructor(
    private readonly sellerService: SellersService,

    private readonly userService: UsersService,

    // Dependencies here
    private readonly orderRepository: OrderRepository,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    // Do not remove comment below.
    // <creating-property />

    let seller: Seller | null | undefined = undefined;

    if (createOrderDto.seller) {
      const sellerObject = await this.sellerService.findById(
        createOrderDto.seller.id,
      );
      if (!sellerObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            seller: 'notExists',
          },
        });
      }
      seller = sellerObject;
    } else if (createOrderDto.seller === null) {
      seller = null;
    }

    let user: User | null | undefined = undefined;

    if (createOrderDto.user) {
      const userObject = await this.userService.findById(
        createOrderDto.user.id,
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
    } else if (createOrderDto.user === null) {
      user = null;
    }

    return this.orderRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      shipping_fee: createOrderDto.shipping_fee,

      total_amount: createOrderDto.total_amount,

      sub_total: createOrderDto.sub_total,

      seller,

      user,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.orderRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Order['id']) {
    return this.orderRepository.findById(id);
  }

  findByIds(ids: Order['id'][]) {
    return this.orderRepository.findByIds(ids);
  }

  async update(
    id: Order['id'],

    updateOrderDto: UpdateOrderDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let seller: Seller | null | undefined = undefined;

    if (updateOrderDto.seller) {
      const sellerObject = await this.sellerService.findById(
        updateOrderDto.seller.id,
      );
      if (!sellerObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            seller: 'notExists',
          },
        });
      }
      seller = sellerObject;
    } else if (updateOrderDto.seller === null) {
      seller = null;
    }

    let user: User | null | undefined = undefined;

    if (updateOrderDto.user) {
      const userObject = await this.userService.findById(
        updateOrderDto.user.id,
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
    } else if (updateOrderDto.user === null) {
      user = null;
    }

    return this.orderRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      shipping_fee: updateOrderDto.shipping_fee,

      total_amount: updateOrderDto.total_amount,

      sub_total: updateOrderDto.sub_total,

      seller,

      user,
    });
  }

  remove(id: Order['id']) {
    return this.orderRepository.remove(id);
  }
}
