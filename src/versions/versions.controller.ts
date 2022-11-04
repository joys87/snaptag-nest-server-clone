import { User } from '@app/utils/decorator/user.decorator';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserStatus } from '@prisma/client';
import { UserRequestDto } from 'src/shared/dtos/user-request.dto';
import { GetVersionsResponseDto } from './dto/snaptag/get-versions-response.dto';
import { VersionsService } from './versions.service';

@Controller({ path: '/sa/versions', version: ['1'] })
@ApiTags('[Embedding Version]')
export class VersionsController {
  constructor(private readonly versionsService: VersionsService) {}

  @Get('/')
  // @SanptagJwtAuth()
  @ApiOperation({
    summary: '버전 리스트 조회 API',
    description: '버전 리스트를 조회하는 API 입니다.',
  })
  @ApiOkResponse({
    type: GetVersionsResponseDto,
  })
  public async getVersion(@User() user: UserRequestDto) {
    return new GetVersionsResponseDto({
      versions: await this.versionsService.getVersions(),
    });
  }
}
