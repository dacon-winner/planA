import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../../entities/user.entity';
import { RegisterDto, LoginDto, AuthResponseDto, UserResponseDto } from './dto';
import { JwtPayload } from './interfaces';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * 회원가입
   */
  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    // 이메일 중복 체크
    const existingUser = await this.userRepository.findOne({
      where: { email: registerDto.email },
    });

    if (existingUser) {
      throw new ConflictException('이미 사용 중인 이메일입니다.');
    }

    // 비밀번호 해싱
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);

    // 사용자 생성 (필요한 필드만 명시적으로 지정)
    const user = this.userRepository.create({
      email: registerDto.email,
      name: registerDto.name,
      gender: registerDto.gender,
      phone: registerDto.phone,
      password_hash: hashedPassword,
      provider: 'EMAIL',
    });

    const savedUser: User = await this.userRepository.save(user);

    // JWT 토큰 생성
    const access_token: string = this.generateAccessToken(savedUser);
    const userResponse: UserResponseDto = this.toUserResponse(savedUser);

    const response: AuthResponseDto = {
      access_token,
      user: userResponse,
    };

    return response;
  }

  /**
   * 로그인
   */
  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    // 사용자 조회 (users_info 관계 포함)
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
      relations: ['users_info'],
    });

    if (!user) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    // 비밀번호 확인
    const isPasswordValid = await bcrypt.compare(loginDto.password, user.password_hash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    // JWT 토큰 생성
    const access_token: string = this.generateAccessToken(user);
    const userResponse: UserResponseDto = this.toUserResponse(user);

    const response: AuthResponseDto = {
      access_token,
      user: userResponse,
    };

    return response;
  }

  /**
   * JWT 페이로드로 사용자 조회 (인증)
   */
  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
      relations: ['users_info'],
    });

    if (!user) {
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    return user;
  }

  /**
   * 사용자 ID로 조회
   */
  async findUserById(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['users_info'],
    });

    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    return user;
  }

  /**
   * Access Token 생성
   */
  private generateAccessToken(user: User): string {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
    };

    return this.jwtService.sign(payload);
  }

  /**
   * User 엔티티를 UserResponseDto로 변환
   * users_info 중 is_main_plan=true인 것만 반환
   */
  private toUserResponse(user: User): UserResponseDto {
    // users_info 데이터 추출 (is_main_plan=true인 것만)
    let wedding_date: Date | null = null;
    let preferred_region: string | null = null;
    let budget_limit: number | null = null;

    // users_info가 로드되었고 배열인 경우에만 처리
    // TypeORM relations는 선택적으로 로드되므로 타입 단언 필요
    const usersInfoArray = user.users_info;
    if (usersInfoArray && Array.isArray(usersInfoArray) && usersInfoArray.length > 0) {
      // is_main_plan이 true인 users_info 찾기 (한 유저당 하나만 존재)
      const main_info = usersInfoArray.find((info) => info.is_main_plan === true);

      if (main_info) {
        wedding_date = main_info.wedding_date ?? null;
        preferred_region = main_info.preferred_region ?? null;
        budget_limit = main_info.budget_limit ?? null;
      }
    }

    const response: UserResponseDto = {
      id: user.id,
      email: user.email,
      name: user.name,
      gender: user.gender,
      phone: user.phone,
      wedding_date,
      preferred_region,
      budget_limit,
      provider: user.provider,
      is_push_on: user.is_push_on,
      created_at: user.created_at,
    };

    return response;
  }

  /**
   * 현재 로그인한 사용자 정보 조회
   */
  async getMe(userId: string): Promise<UserResponseDto> {
    const user: User = await this.findUserById(userId);
    const userResponse: UserResponseDto = this.toUserResponse(user);
    return userResponse;
  }

  /**
   * 토큰 재발급 (Refresh Token 로직)
   * 현재는 Access Token만 재발급
   */
  async refreshToken(userId: string): Promise<{ access_token: string }> {
    const user = await this.findUserById(userId);
    const access_token = this.generateAccessToken(user);

    return { access_token };
  }
}
