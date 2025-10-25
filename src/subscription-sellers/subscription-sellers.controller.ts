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
import { SubscriptionSellersService } from './subscription-sellers.service';
import { CreateSubscriptionSellerDto } from './dto/create-subscription-seller.dto';
import { UpdateSubscriptionSellerDto } from './dto/update-subscription-seller.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { SubscriptionSeller } from './domain/subscription-seller';
import { AuthGuard } from '@nestjs/passport';
import {
  InfinityPaginationResponse,
  InfinityPaginationResponseDto,
} from '../utils/dto/infinity-pagination-response.dto';
import { infinityPagination } from '../utils/infinity-pagination';
import { FindAllSubscriptionSellersDto } from './dto/find-all-subscription-sellers.dto';

@ApiTags('Subscriptionsellers')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller({
  path: 'subscription-sellers',
  version: '1',
})
export class SubscriptionSellersController {
  constructor(
    private readonly subscriptionSellersService: SubscriptionSellersService,
  ) {}

  @Post()
  @ApiCreatedResponse({
    type: SubscriptionSeller,
  })
  create(@Body() createSubscriptionSellerDto: CreateSubscriptionSellerDto) {
    return this.subscriptionSellersService.create(createSubscriptionSellerDto);
  }

  @Get()
  @ApiOkResponse({
    type: InfinityPaginationResponse(SubscriptionSeller),
  })
  async findAll(
    @Query() query: FindAllSubscriptionSellersDto,
  ): Promise<InfinityPaginationResponseDto<SubscriptionSeller>> {
    const page = query?.page ?? 1;
    let limit = query?.limit ?? 10;
    if (limit > 50) {
      limit = 50;
    }

    return infinityPagination(
      await this.subscriptionSellersService.findAllWithPagination({
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
    type: SubscriptionSeller,
  })
  findById(@Param('id') id: string) {
    return this.subscriptionSellersService.findById(id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({
    type: SubscriptionSeller,
  })
  update(
    @Param('id') id: string,
    @Body() updateSubscriptionSellerDto: UpdateSubscriptionSellerDto,
  ) {
    return this.subscriptionSellersService.update(
      id,
      updateSubscriptionSellerDto,
    );
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  remove(@Param('id') id: string) {
    return this.subscriptionSellersService.remove(id);
  }
}
