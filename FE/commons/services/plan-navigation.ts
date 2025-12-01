/**
 * 플랜 초기 라우팅 서비스
 */

import { client } from "@/commons/api/client";
import { URL_PATHS } from "@/commons/enums/url";

type PlanListResponse = {
  success: boolean;
  data: {
    items: {
      plan: {
        id: string;
      } | null;
    }[];
  };
};

/**
 * 사용자의 초기 진입 경로 결정
 * 플랜이 하나라도 있으면 HOME, 없으면 FORM으로 이동
 */
export async function resolveInitialPlanRoute() {
  const response = await client.get<PlanListResponse>("/api/v1/plans");
  const items = response.data.data.items ?? [];
  const hasPlan = items.some((item) => item.plan !== null);

  return hasPlan ? URL_PATHS.HOME : URL_PATHS.FORM;
}


