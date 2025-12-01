import { Controller, Body, Sse, UseGuards, MessageEvent } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { RecommendationRequest } from './interfaces';

/**
 * AI 추천 API 컨트롤러
 * @description Server-Sent Events (SSE)를 사용한 실시간 AI 추천 스트리밍
 */
@ApiTags('AI 추천 (AI)')
@Controller('ai')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AiController {
  constructor(private readonly aiService: AiService) {}

  /**
   * 스트리밍 방식 AI 추천 API
   * @description Server-Sent Events (SSE)를 통해 실시간으로 AI 추천 진행 상황을 전송합니다.
   *
   * @param userId - 사용자 ID (JWT에서 자동 추출)
   * @param request - 추천 요청 파라미터
   * @returns Observable<MessageEvent> - SSE 스트림
   *
   * @example
   * POST /api/v1/ai/recommend/stream
   * Body: {
   *   "wedding_date": "2025-06-15",
   *   "preferred_region": "서울 강남구",
   *   "budget_limit": 50000000
   * }
   *
   * // 스트림 응답 예시
   * data: {"type":"progress","message":"후보 업체를 찾았습니다...","data":{"studio":5,"dress":8,"makeup":6,"venue":4}}
   *
   * data: {"type":"progress","message":"AI가 최적의 조합을 찾고 있습니다..."}
   *
   * data: {"type":"chunk","data":"{\n  \"studio\": {\n"}
   *
   * data: {"type":"chunk","data":"    \"vendor_id\": \"123\",\n"}
   *
   * data: {"type":"complete","message":"추천이 완료되었습니다!","data":{...}}
   *
   * @throws 401 Unauthorized - 인증 실패
   */
  @Sse('recommend/stream')
  @ApiOperation({
    summary: 'AI 추천 (스트리밍)',
    description:
      'Server-Sent Events (SSE)를 통해 실시간으로 AI 추천을 생성합니다.\n\n' +
      '**스트림 이벤트 타입:**\n' +
      '- `progress`: 진행 상황 업데이트\n' +
      '- `chunk`: AI 응답의 일부분 (실시간)\n' +
      '- `complete`: 추천 완료 (최종 데이터 포함)\n' +
      '- `error`: 에러 발생\n\n' +
      '**장점:**\n' +
      '- 실시간 진행 상황 확인\n' +
      '- 더 나은 사용자 경험 (로딩 상태 표시 가능)\n' +
      '- AI 응답을 점진적으로 받아볼 수 있음',
  })
  @ApiResponse({
    status: 200,
    description: 'SSE 스트림 시작',
  })
  @ApiResponse({
    status: 401,
    description: '인증 실패',
  })
  streamRecommendation(
    @CurrentUser('id') userId: string,
    @Body() request: RecommendationRequest,
  ): Observable<MessageEvent> {
    return new Observable<MessageEvent>((subscriber) => {
      void (async () => {
        try {
          // AsyncGenerator를 통해 스트리밍 데이터를 받아옴
          const stream = this.aiService.streamRecommendation(request, userId);

          for await (const chunk of stream) {
            // SSE 형식으로 전송
            subscriber.next({
              data: chunk,
            } as MessageEvent);
          }

          // 스트림 완료
          subscriber.complete();
        } catch (error) {
          subscriber.error(error);
        }
      })();
    });
  }
}
