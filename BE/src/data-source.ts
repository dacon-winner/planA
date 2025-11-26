import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

// .env 파일 로드
config();

const configService = new ConfigService();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('DB_HOST') || 'localhost',
  port: configService.get('DB_PORT') || 5432,
  username: configService.get('DB_USERNAME') || 'postgres',
  password: configService.get('DB_PASSWORD') || 'password',
  database: configService.get('DB_DATABASE') || 'plana',
  entities: ['dist/entities/**/*.entity.js'],
  migrations: ['dist/migrations/**/*.js'],
  synchronize: false, // 프로덕션에서는 반드시 false
  logging: configService.get('NODE_ENV') === 'development',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
