import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { PlanSellerEntity } from '../entities/plan-seller.entity';
import { NullableType } from '../../../../../utils/types/nullable.type';
import { PlanSeller } from '../../../../domain/plan-seller';
import { PlanSellerRepository } from '../../plan-seller.repository';
import { PlanSellerMapper } from '../mappers/plan-seller.mapper';
import { IPaginationOptions } from '../../../../../utils/types/pagination-options';

@Injectable()
export class PlanSellerRelationalRepository implements PlanSellerRepository {
  constructor(
    @InjectRepository(PlanSellerEntity)
    private readonly planSellerRepository: Repository<PlanSellerEntity>,
  ) {}

  async create(data: PlanSeller): Promise<PlanSeller> {
    const persistenceModel = PlanSellerMapper.toPersistence(data);
    const newEntity = await this.planSellerRepository.save(
      this.planSellerRepository.create(persistenceModel),
    );
    return PlanSellerMapper.toDomain(newEntity);
  }

  async findAllWithPagination({
    paginationOptions,
  }: {
    paginationOptions: IPaginationOptions;
  }): Promise<PlanSeller[]> {
    const entities = await this.planSellerRepository.find({
      skip: (paginationOptions.page - 1) * paginationOptions.limit,
      take: paginationOptions.limit,
    });

    return entities.map((entity) => PlanSellerMapper.toDomain(entity));
  }

  async findById(id: PlanSeller['id']): Promise<NullableType<PlanSeller>> {
    const entity = await this.planSellerRepository.findOne({
      where: { id },
    });

    return entity ? PlanSellerMapper.toDomain(entity) : null;
  }

  async findByIds(ids: PlanSeller['id'][]): Promise<PlanSeller[]> {
    const entities = await this.planSellerRepository.find({
      where: { id: In(ids) },
    });

    return entities.map((entity) => PlanSellerMapper.toDomain(entity));
  }

  async update(
    id: PlanSeller['id'],
    payload: Partial<PlanSeller>,
  ): Promise<PlanSeller> {
    const entity = await this.planSellerRepository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new Error('Record not found');
    }

    const updatedEntity = await this.planSellerRepository.save(
      this.planSellerRepository.create(
        PlanSellerMapper.toPersistence({
          ...PlanSellerMapper.toDomain(entity),
          ...payload,
        }),
      ),
    );

    return PlanSellerMapper.toDomain(updatedEntity);
  }

  async remove(id: PlanSeller['id']): Promise<void> {
    await this.planSellerRepository.delete(id);
  }
}
