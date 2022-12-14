import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProjectsBodyRequestDto } from './dtos/snaptag/create-projects-request.dto';
import { CreateProjectsResponseDto } from './dtos/snaptag/create-projects-response.dto';
import { GetProjectsQueryRequestDto } from './dtos/snaptag/get-projects-request.dto';
import { GetProjectsResponseDto } from './dtos/snaptag/get-projects-response.dto';
import { ProjectsService } from './service';

@Controller({ path: '/sa/projects', version: ['1'] })
@ApiTags('[Embedding] Projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  // @SnaptagJwtAuth()
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: '프로젝트 생성 API',
    description:
      'swagger multipart/form-data 데이터 전송 시 Validation 이 제대로 되지 않는 문제로 Postman API Test 를 권장합니다',
  })
  @ApiCreatedResponse({
    type: CreateProjectsResponseDto,
  }) // 왜 type을 사용하는지 모르겠음
  @UseInterceptors(FileInterceptor('bannerImage'))
  public async createProjects(
    @Body() { bannerImage, ...dto }: CreateProjectsBodyRequestDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const projects = await this.projectsService.create(dto, file);

    return new CreateProjectsResponseDto({
      projects,
    });
  }

  @Get()
  // @SnaptagJwtAuth()
  @ApiOperation({
    summary: '조건별 프로젝트들 조회 API',
  })
  @ApiOkResponse({
    type: GetProjectsResponseDto,
  })
  public async getProjects(
    @Query() getProjectsQueryRequestDto: GetProjectsQueryRequestDto,
  ) {
    const result = await this.projectsService.findByConditions(
      getProjectsQueryRequestDto,
    );

    return new GetProjectsResponseDto(result);
  }
}
