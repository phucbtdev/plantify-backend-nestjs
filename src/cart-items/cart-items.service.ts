import { SellersService } from '../sellers/sellers.service';
import { Seller } from '../sellers/domain/seller';

import { ProductsService } from '../products/products.service';
import { Product } from '../products/domain/product';

import { CartsService } from '../carts/carts.service';
import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateCartItemDto } from './dto/create-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { CartItemRepository } from './infrastructure/persistence/cart-item.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { CartItem } from './domain/cart-item';
import { Cart } from '../carts/domain/cart';

@Injectable()
export class CartItemsService {
  constructor(
    private readonly sellerService: SellersService,

    private readonly productService: ProductsService,

    private readonly cartService: CartsService,

    // Dependencies here
    private readonly cartItemRepository: CartItemRepository,
  ) {}

  async create(createCartItemDto: CreateCartItemDto) {
    // Do not remove comment below.
    // <creating-property />

    const sellerObject = await this.sellerService.findById(
      createCartItemDto.seller.id,
    );
    if (!sellerObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          seller: 'notExists',
        },
      });
    }
    const seller = sellerObject;

    const productObject = await this.productService.findById(
      createCartItemDto.product.id,
    );
    if (!productObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          product: 'notExists',
        },
      });
    }
    const product = productObject;

    const cartObject = await this.cartService.findById(
      createCartItemDto.cart.id,
    );
    if (!cartObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          cart: 'notExists',
        },
      });
    }
    const cart = cartObject;

    return this.cartItemRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      unit_price: createCartItemDto.unit_price,

      quantity: createCartItemDto.quantity,

      seller,

      product,

      cart,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.cartItemRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: CartItem['id']) {
    return this.cartItemRepository.findById(id);
  }

  findByIds(ids: CartItem['id'][]) {
    return this.cartItemRepository.findByIds(ids);
  }

  async update(
    id: CartItem['id'],

    updateCartItemDto: UpdateCartItemDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let seller: Seller | undefined = undefined;

    if (updateCartItemDto.seller) {
      const sellerObject = await this.sellerService.findById(
        updateCartItemDto.seller.id,
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
    }

    let product: Product | undefined = undefined;

    if (updateCartItemDto.product) {
      const productObject = await this.productService.findById(
        updateCartItemDto.product.id,
      );
      if (!productObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            product: 'notExists',
          },
        });
      }
      product = productObject;
    }

    let cart: Cart | undefined = undefined;

    if (updateCartItemDto.cart) {
      const cartObject = await this.cartService.findById(
        updateCartItemDto.cart.id,
      );
      if (!cartObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            cart: 'notExists',
          },
        });
      }
      cart = cartObject;
    }

    return this.cartItemRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      unit_price: updateCartItemDto.unit_price,

      quantity: updateCartItemDto.quantity,

      seller,

      product,

      cart,
    });
  }

  remove(id: CartItem['id']) {
    return this.cartItemRepository.remove(id);
  }
}
