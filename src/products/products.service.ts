import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/domain/category';

import { SellersService } from '../sellers/sellers.service';
import { Seller } from '../sellers/domain/seller';

import {
  // common
  Injectable,
  HttpStatus,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductRepository } from './infrastructure/persistence/product.repository';
import { IPaginationOptions } from '../utils/types/pagination-options';
import { Product } from './domain/product';

@Injectable()
export class ProductsService {
  constructor(
    private readonly categoryService: CategoriesService,

    private readonly sellerService: SellersService,

    // Dependencies here
    private readonly productRepository: ProductRepository,
  ) {}

  async create(createProductDto: CreateProductDto) {
    // Do not remove comment below.
    // <creating-property />

    const categoryObject = await this.categoryService.findById(
      createProductDto.category.id,
    );
    if (!categoryObject) {
      throw new UnprocessableEntityException({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: {
          category: 'notExists',
        },
      });
    }
    const category = categoryObject;

    const sellerObject = await this.sellerService.findById(
      createProductDto.seller.id,
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

    return this.productRepository.create({
      // Do not remove comment below.
      // <creating-property-payload />
      seo_meta: createProductDto.seo_meta,

      is_rare: createProductDto.is_rare,

      is_feature: createProductDto.is_feature,

      stock: createProductDto.stock,

      price: createProductDto.price,

      description: createProductDto.description,

      short_description: createProductDto.short_description,

      slug: createProductDto.slug,

      name: createProductDto.name,

      category,

      seller,
    });
  }

  findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }) {
    return this.productRepository.findAllWithPagination({
      paginationOptions: {
        page: paginationOptions.page,
        limit: paginationOptions.limit,
      },
    });
  }

  findById(id: Product['id']) {
    return this.productRepository.findById(id);
  }

  findByIds(ids: Product['id'][]) {
    return this.productRepository.findByIds(ids);
  }

  async update(
    id: Product['id'],

    updateProductDto: UpdateProductDto,
  ) {
    // Do not remove comment below.
    // <updating-property />

    let category: Category | undefined = undefined;

    if (updateProductDto.category) {
      const categoryObject = await this.categoryService.findById(
        updateProductDto.category.id,
      );
      if (!categoryObject) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            category: 'notExists',
          },
        });
      }
      category = categoryObject;
    }

    let seller: Seller | undefined = undefined;

    if (updateProductDto.seller) {
      const sellerObject = await this.sellerService.findById(
        updateProductDto.seller.id,
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

    return this.productRepository.update(id, {
      // Do not remove comment below.
      // <updating-property-payload />
      seo_meta: updateProductDto.seo_meta,

      is_rare: updateProductDto.is_rare,

      is_feature: updateProductDto.is_feature,

      stock: updateProductDto.stock,

      price: updateProductDto.price,

      description: updateProductDto.description,

      short_description: updateProductDto.short_description,

      slug: updateProductDto.slug,

      name: updateProductDto.name,

      category,

      seller,
    });
  }

  remove(id: Product['id']) {
    return this.productRepository.remove(id);
  }
}
