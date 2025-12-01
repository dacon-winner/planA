import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';
import { UsersInfoService } from './users-info.service';
import { CreateUsersInfoDto } from './dto/create-users-info.dto';
import { CreateUsersInfoResponseDto } from './dto/create-users-info-response.dto';
import { UpdateUsersInfoDto } from './dto/update-users-info.dto';
import { UpdateUsersInfoResponseDto } from './dto/update-users-info-response.dto';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ApiCommonResponse } from '../../common/decorators/api-common-response.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

/**
 * 사용자 상세 정보 컨트롤러
 * - 결혼 계획 관련 상세 정보 관리
 * - JWT 인증 필수
 */
@ApiTags('UsersInfo')
@ApiBearerAuth()
@Controller('users-info')
@UseGuards(JwtAuthGuard)
export class UsersInfoController {
  constructor(private readonly usersInfoService: UsersInfoService) {}

  /**
   * 사용자 상세 정보 생성
   * - 2단계 회원가입 또는 새로운 플랜 시나리오 생성 시 사용
   * - 첫 번째 생성 시 자동으로 메인 플랜으로 설정 (is_main_plan=true)
   * - AI 기반 스드메(스튜디오, 드레스, 메이크업) 조합 자동 추천
   * - 추천 결과 기반 플랜 자동 생성
   * @returns AI 추천 플랜 (plan_items, vendor, service_item 포함)
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '사용자 상세 정보 생성 및 AI 추천 플랜 반환',
    description:
      '결혼 계획 관련 상세 정보를 생성하고, AI가 스드메 조합을 추천하여 자동으로 플랜을 생성하여 반환합니다. plan_items에는 vendor와 service_item 정보가 포함됩니다. AI 추천 실패 시 null을 반환합니다.',
  })
  @ApiCommonResponse(CreateUsersInfoResponseDto, {
    nullable: true,
    description: 'AI 추천 플랜 정보 (추천 실패 시 null)',
  })
  async create(
    @CurrentUser('id') userId: string,
    @Body() createUsersInfoDto: CreateUsersInfoDto,
  ): Promise<CreateUsersInfoResponseDto | null> {
    return await this.usersInfoService.create(userId, createUsersInfoDto);
  }

  /**
   * 사용자 상세 정보 수정
   * - 결혼 예정일, 선호 지역, 예산 한도를 수정
   * - 수정하고 싶은 필드만 전송하면 됩니다
   * @returns 수정 완료 메시지 및 수정된 정보
   */
  @Post(':id/update')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '사용자 상세 정보 수정',
    description:
      '결혼 예정일, 선호 지역, 예산 한도를 수정합니다.\n\n' +
      '- 수정하고 싶은 필드만 전송하면 됩니다.\n' +
      '- 전송하지 않은 필드는 기존 값이 유지됩니다.\n' +
      '- JWT 토큰의 사용자 ID와 users_info의 소유자가 일치해야 합니다.',
  })
  @ApiParam({
    name: 'id',
    description: '사용자 정보 ID',
    type: String,
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @ApiResponse({
    status: 200,
    description: '수정 성공',
    type: UpdateUsersInfoResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
  })
  @ApiResponse({
    status: 404,
    description: '사용자 정보를 찾을 수 없거나 권한이 없음',
  })
  async update(
    @CurrentUser('id') userId: string,
    @Param('id') usersInfoId: string,
    @Body() updateUsersInfoDto: UpdateUsersInfoDto,
  ): Promise<UpdateUsersInfoResponseDto> {
    return await this.usersInfoService.update(userId, usersInfoId, updateUsersInfoDto);
  }
}
