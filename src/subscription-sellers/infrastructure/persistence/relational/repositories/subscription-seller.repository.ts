import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { SubscriptionSellerEntity } from '../entities/subscription-seller.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { SubscriptionSeller } from '../../../../domain/subscription-seller';
import { SubscriptionSellerRepository } from '../../subscription-seller.repository';
import { SubscriptionSellerMapper } from '../mappers/subscription-seller.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class SubscriptionSellerRelationalRepository
  implements SubscriptionSellerRepository
{
  constructor(
    @InjectRepository(SubscriptionSellerEntity)
    private readonly subscriptionSellerRepository: Repository<SubscriptionSellerEntity>,
  ) {}

  async create(data: SubscriptionSeller): Promise<SubscriptionSeller> {
    const persistenceModel = SubscriptionSellerMapper.toPersistence(data);
    const newEntity = await this.subscriptionSellerRepository.save(
      this.subscriptionSellerRepository.create(persistenceModel),
    );
    return SubscriptionSellerMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<SubscriptionSeller[]> {
    const entities = await this.subscriptionSellerRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => SubscriptionSellerMapper.toDomain(entity));
  }

  async findById(
    id: SubscriptionSeller['id'],
  ): Promise<NullableType<SubscriptionSeller>> {
    const entity = await this.subscriptionSellerRepository.findOne({
      where: { id },
    });

    return entity ? SubscriptionSellerMapper.toDomain(entity) : null;
  }

  async findByIds(
    ids: SubscriptionSeller['id'][],
  ): Promise<SubscriptionSeller[]> {
    const entities = await this.subscriptionSellerRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => SubscriptionSellerMapper.toDomain(entity));
  }

  async update(
    id: SubscriptionSeller['id'],
    payload: Partial<SubscriptionSeller>,
  ): Promise<SubscriptionSeller> {
    const entity = await this.subscriptionSellerRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.subscriptionSellerRepository.save(
      this.subscriptionSellerRepository.create(
        SubscriptionSellerMapper.toPersistence({
          ...SubscriptionSellerMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return SubscriptionSellerMapper.toDomain(updatedEntity);
  }

  async remove(id: SubscriptionSeller['id']): Promise<void> {
    await this.subscriptionSellerRepository.delete(id);
  }
}
