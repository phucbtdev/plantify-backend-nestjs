import { UsersService } from '../users/users.service';
import { User } from '../users/domain/user';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { SellerRepository } from './infrastructure/persistence/seller.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Seller } from './domain/seller';

@Injectable()
export class SellersService {
  constructor(
    private readonly userService: UsersService,

    // Dependencies here
    private readonly sellerRepository: SellerRepository,
  ) {}

  async create(createSellerDto: CreateSellerDto) {
    // Do not remove comment below.
    // <creating-property />

    const userObject = await this.userService.findById(createSellerDto.user.id);
    if (!userObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          user: 'notExists',
        },
      });
    }
    const user = userObject;

    return this.sellerRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      slug: createSellerDto.slug,

      shop_name: createSellerDto.shop_name,

      user,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.sellerRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Seller['id']) {
    return this.sellerRepository.findById(id);
  }

  findByIds(ids: Seller['id'][]) {
    return this.sellerRepository.findByIds(ids);
  }

  async update(
    id: Seller['id'],

    updateSellerDto: UpdateSellerDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let user: User | undefined = undefined;

    if (updateSellerDto.user) {
      const userObject = await this.userService.findById(
        updateSellerDto.user.id,
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

    return this.sellerRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      slug: updateSellerDto.slug,

      shop_name: updateSellerDto.shop_name,

      user,
    });
  }

  remove(id: Seller['id']) {
    return this.sellerRepository.remove(id);
  }
}
