import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { SellerEntity } from '../entities/seller.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { Seller } from '../../../../domain/seller';
import { SellerRepository } from '../../seller.repository';
import { SellerMapper } from '../mappers/seller.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class SellerRelationalRepository implements SellerRepository {
  constructor(
    @InjectRepository(SellerEntity)
    private readonly sellerRepository: Repository<SellerEntity>,
  ) {}

  async create(data: Seller): Promise<Seller> {
    const persistenceModel = SellerMapper.toPersistence(data);
    const newEntity = await this.sellerRepository.save(
      this.sellerRepository.create(persistenceModel),
    );
    return SellerMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<Seller[]> {
    const entities = await this.sellerRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => SellerMapper.toDomain(entity));
  }

  async findById(id: Seller['id']): Promise<NullableType<Seller>> {
    const entity = await this.sellerRepository.findOne({
      where: { id },
    });

    return entity ? SellerMapper.toDomain(entity) : null;
  }

  async findByIds(ids: Seller['id'][]): Promise<Seller[]> {
    const entities = await this.sellerRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => SellerMapper.toDomain(entity));
  }

  async update(id: Seller['id'], payload: Partial<Seller>): Promise<Seller> {
    const entity = await this.sellerRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.sellerRepository.save(
      this.sellerRepository.create(
        SellerMapper.toPersistence({
          ...SellerMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return SellerMapper.toDomain(updatedEntity);
  }

  async remove(id: Seller['id']): Promise<void> {
    await this.sellerRepository.delete(id);
  }
}
