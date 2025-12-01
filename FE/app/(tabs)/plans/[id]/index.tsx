import React from "react";
import { useLocalSearchParams } from "expo-router";
import { PlanDetailContainer } from "@/components/plan-detail/plan-detail-container";

export default function PlanDetail() {
  const { id: planId } = useLocalSearchParams<{ id: string }>();

  return <PlanDetailContainer planId={planId as string} />;
}
