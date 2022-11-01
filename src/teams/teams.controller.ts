import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateTeamsRequestDto } from './dtos/create-teams-request.dto';
import { TeamsService } from './teams.service';
import * as _ from 'lodash';
import { CreateTeamsResponseDto } from './dtos/create-teams-response.dto';
import { query } from 'express';
import { GetTeamRequestDto } from './dtos/get-teams-request.dto';
import { GetTeamsResponseDto } from './dtos/get-teams-response.dto';
import { GetTeamsWithProjectsQueryRequestDto } from './dtos/get-teams-with-projects-request.dto';
import { GetTeamsWithProjectsQueryResponseDto } from './dtos/get-teams-with-projects-response.dto';

@Controller({ path: '/sa/teams', version: ['1'] })
@ApiTags('[Embedding] Teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}
  // nest 공식문서에서 생성자 활용 찾아보기

  @Post()
  //   @ApiConsumes('multupart/form-data')
  @ApiOperation({
    summary: '팀 생성 API',
    description:
      '팀을 생성하는 API입니다. 그런데 값으로는 모두 null 이 들어갑니다?! ',
  })
  @ApiOkResponse({ description: '생성 성공시 결과 예시' })
  //   @UseInterceptors(
  //     FileFieldsInterceptor([
  //       { name: 'logoImage', maxCount: 1 }, // fieldName, options
  //       { name: 'businessImage', maxCount: 1 },
  //     ]),
  //   )
  // 인터셉터 공식문서 참조
  public async createTeams(
    @Body() createTeamsRequestDto: CreateTeamsRequestDto,
    // @UploadedFiles()
    // files: {
    //   logoImage?: Express.Multer.File[];
    //   businessImage?: Express.Multer.File[];
    // },
  ) {
    console.log(createTeamsRequestDto);
    const { logoImage, businessImage, ...rest } = createTeamsRequestDto;

    const dto: CreateTeamsRequestDto = {
      ...rest,

      //   logoImage: _.isEmpty(files?.logoImage) ? null : files.logoImage[0],
      //   businessImage: _.isEmpty(files.businessImage)
      //     ? null
      //     : files.businessImage[0],
      logoImage: null,
      businessImage: null,
    };
    console.log(rest);
    return new CreateTeamsResponseDto({
      teams: await this.teamsService.create(dto),
    });
  }

  @Get()
  //   @SnaptagJwtAuth()
  @ApiOperation({
    summary: '팀 리스트 조회 API',
    description: '팀 리스트를 조회하는 API입니다.',
  })
  @ApiOkResponse({})
  public async getTeams(@Query() getTeamRequestDto: GetTeamRequestDto) {
    const result = await this.teamsService.getTeams(getTeamRequestDto);

    return new GetTeamsResponseDto({
      teams: result,
    });
  }

  @Get('/projects')
  //   @SnaptagJwtAuth()
  @ApiOperation({
    summary: '팀별 프로젝트 목록 조회 API',
    description: '',
  })
  @ApiOkResponse()
  public async getTeamsWithProjects(
    @Query()
    getTeamsWithProjectsQueryRequestDto: GetTeamsWithProjectsQueryRequestDto,
  ) {
    const result = await this.teamsService.getTeamsWithProjects(
      getTeamsWithProjectsQueryRequestDto,
    );

    return new GetTeamsWithProjectsQueryResponseDto({
      teams: result,
    });
  }

  // pagination cursor vs offset
  // snap-node-server 의 페이지네이션은 offset으로 구성되어있고,
  // offset은 어셈블리어 같은 저급언어에서 상대주고(relative address)로 부른다.

  // offset은 skip 값으로 200000을 줄 경우 20만의 레코드를 스킵하기 위해 20만의 레코드를 순회해야함
  // 따라서 팀, 국가 등 한정적인 레코드를 가진 테이블에 대해서는 offset을 적용해도 좋지만,
  // embedding 이미지 등이 대량으로 저장된 경우 커서기반 페이지네이션 적용하는 게 좋을 듯

  // 100이라는 주소를 가리키고 있을 때, +9를 가리키면, 109 주소가 나온다.
  // 여기서 +9가 오프셋 값이다.
}
