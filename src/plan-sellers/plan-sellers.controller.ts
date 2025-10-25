import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PlanSellersService } from './plan-sellers.service';
import { CreatePlanSellerDto } from './dto/create-plan-seller.dto';
import { UpdatePlanSellerDto } from './dto/update-plan-seller.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { PlanSeller } from './domain/plan-seller';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllPlanSellersDto } from './dto/find-all-plan-sellers.dto';

@ApiTags('Plansellers')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'plan-sellers',
  version: '1',
})
export class PlanSellersController {
  constructor(private readonly planSellersService: PlanSellersService) {}

  @Post()
  @ApiCreatedResponse({
    type: PlanSeller,
  })
  create(@Body() createPlanSellerDto: CreatePlanSellerDto) {
    return this.planSellersService.create(createPlanSellerDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(PlanSeller),
  })
  async findAll(
    @Query() query: FindAllPlanSellersDto,
  ): Promise<InfinityPaginationResponseDto<PlanSeller>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.planSellersService.findAllWithPagination({
        paginationOptions: {
          page,
          limit,
        },
      }),
      { page, limit },
    );
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: PlanSeller,
  })
  findById(@Param('id') id: string) {
    return this.planSellersService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: PlanSeller,
  })
  update(
    @Param('id') id: string,
    @Body() updatePlanSellerDto: UpdatePlanSellerDto,
  ) {
    return this.planSellersService.update(id, updatePlanSellerDto);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.planSellersService.remove(id);
  }
}
