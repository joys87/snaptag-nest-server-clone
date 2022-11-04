import { Controller, Get, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetIndustriesQueryRequestDto } from './dtos/snaptag/get-industries-request.dto';
import { GetIndustriesResponseDto } from './dtos/snaptag/get-industries-response-dto';
import { IndustriesService } from './industries.service';

@Controller({ path: '/sa/industry', version: ['1'] })
@ApiTags('[Embedding] Industry')
export class IndustriesController {
  constructor(private readonly industriesService: IndustriesService) {}

  //   @Get('/')
  //   //   @SnaptagJwtAuth()
  //   @ApiOperation({
  //     summary: '산업군 조회 API',
  //   })
  //   @ApiOkResponse({
  //     type: GetIndustriesResponseDto,
  //   })
  //   public async getIndustries(@Query() query: GetIndustriesQueryRequestDto) {
  //     const industries = await this.industriesService.findIndustries(query);

  //     return new GetIndustriesResponseDto({
  //       industries,
  //     });
  //   }
}
