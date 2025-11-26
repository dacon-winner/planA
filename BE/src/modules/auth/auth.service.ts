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

    // 사용자 생성
    const user = this.userRepository.create({
      ...registerDto,
      password_hash: hashedPassword,
      provider: 'EMAIL',
    });

    const savedUser = await this.userRepository.save(user);

    // JWT 토큰 생성
    const access_token = this.generateAccessToken(savedUser);

    return {
      access_token,
      user: this.toUserResponse(savedUser),
    };
  }

  /**
   * 로그인
   */
  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    // 사용자 조회
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
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
    const access_token = this.generateAccessToken(user);

    return {
      access_token,
      user: this.toUserResponse(user),
    };
  }

  /**
   * JWT 페이로드로 사용자 조회 (인증)
   */
  async validateUser(payload: JwtPayload): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
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
   */
  private toUserResponse(user: User): UserResponseDto {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      wedding_date: user.wedding_date,
      preferred_region: user.preferred_region,
      budget_limit: user.budget_limit,
      provider: user.provider,
      is_push_on: user.is_push_on,
      created_at: user.created_at,
    };
  }

  /**
   * 현재 로그인한 사용자 정보 조회
   */
  async getMe(userId: string): Promise<UserResponseDto> {
    const user = await this.findUserById(userId);
    return this.toUserResponse(user);
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
