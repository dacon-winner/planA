import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { IErrorResponse } from '../interfaces';

/**
 * HTTP 예외 응답 인터페이스
 */
interface HttpExceptionResponse {
  error?: string;
  message: string | string[];
  details?: unknown;
  statusCode?: number;
}

/**
 * HTTP 예외를 처리하는 전역 필터
 * @description 모든 HTTP 예외를 잡아서 일관된 형식으로 응답합니다.
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const error: HttpExceptionResponse =
      typeof exceptionResponse === 'string'
        ? { message: exceptionResponse }
        : (exceptionResponse as HttpExceptionResponse);

    const errorResponse: IErrorResponse = {
      success: false,
      error: {
        code: error.error || HttpStatus[status],
        message: Array.isArray(error.message) ? error.message.join(', ') : error.message,
        details: error.details || null,
      },
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    // 에러 로깅
    this.logger.error(
      `${request.method} ${request.url} - ${status} - ${errorResponse.error.message}`,
      exception.stack,
    );

    response.status(status).json(errorResponse);
  }
}
