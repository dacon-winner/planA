/**
 * Form Page
 * 웨딩 폼 페이지
 */

import React from "react";
import { WeddingForm } from "@/components/wedding-form/form/form";

export default function FormPage() {
  const handleDateSelected = (date: Date) => {
    console.log("선택된 날짜:", date);
  };

  const handleSubmit = (data: any) => {
    console.log("폼 데이터:", data);
  };

  return (
    <WeddingForm onDateSelected={handleDateSelected} onSubmit={handleSubmit} />
  );
}
