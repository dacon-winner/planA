/**
 * API 응답 공통 인터페이스
 */
export interface IResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  timestamp: string;
}

/**
 * 에러 응답 인터페이스
 */
export interface IErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  timestamp: string;
  path: string;
}

/**
 * 페이지네이션 응답 인터페이스
 */
export interface IPaginationResponse<T> {
  items: T[];
  meta: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

