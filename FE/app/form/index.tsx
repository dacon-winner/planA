/**
 * Form Page
 * 웨딩 폼 페이지
 */

import React from "react";
import { WeddingForm } from "@/components/wedding-form/form/form";

export default function FormPage() {
  /**
   * 날짜 선택 완료 핸들러
   */
  const handleDateSelected = (date: Date) => {
    console.log("선택된 날짜:", date);
  };

  /**
   * 폼 제출 핸들러
   */
  const handleSubmit = (data: any) => {
    console.log("폼 데이터:", data);
  };

  return (
    <WeddingForm onDateSelected={handleDateSelected} onSubmit={handleSubmit} />
  );
}
