import { Controller, Post, Body, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  RegisterDto,
  LoginDto,
  AuthResponseDto,
  UserResponseDto,
  RefreshTokenResponseDto,
} from './dto';
import { Public } from '../../common/decorators/public.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApiCommonResponse } from '../../common/decorators/api-common-response.decorator';

@ApiTags('인증 (Authentication)')
@Controller('users/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: '회원가입',
    description: '새로운 사용자를 등록합니다.',
  })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: '이미 사용 중인 이메일',
  })
  @ApiCommonResponse(AuthResponseDto)
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponseDto> {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '로그인',
    description: '이메일과 비밀번호로 로그인합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '로그인 성공',
    type: AuthResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: '이메일 또는 비밀번호가 올바르지 않습니다.',
  })
  @ApiCommonResponse(AuthResponseDto)
  async login(@Body() loginDto: LoginDto): Promise<AuthResponseDto> {
    return this.authService.login(loginDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: '현재 사용자 정보 조회',
    description: '로그인한 사용자의 정보를 조회합니다.',
  })
  @ApiResponse({
    status: 200,
    description: '사용자 정보 조회 성공',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
  })
  @ApiCommonResponse(UserResponseDto)
  async getMe(@CurrentUser('id') userId: string): Promise<UserResponseDto> {
    return this.authService.getMe(userId);
  }

  @Post('refresh')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: '토큰 재발급',
    description: '새로운 Access Token을 발급받습니다.',
  })
  @ApiResponse({
    status: 200,
    description: '토큰 재발급 성공',
    type: RefreshTokenResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
  })
  @ApiCommonResponse(RefreshTokenResponseDto)
  async refreshToken(@CurrentUser('id') userId: string): Promise<RefreshTokenResponseDto> {
    return this.authService.refreshToken(userId);
  }
}
