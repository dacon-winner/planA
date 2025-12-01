import { VendorCategory } from "@/commons/providers/plan-state/plan-state.provider";

export const VENDOR_CATEGORY_ORDER: readonly VendorCategory[] = [
  "스튜디오",
  "드레스",
  "메이크업",
  "웨딩홀",
] as const;

export const VENDOR_CATEGORY_TO_API: Record<VendorCategory, string> = {
  스튜디오: "STUDIO",
  드레스: "DRESS",
  메이크업: "MAKEUP",
  웨딩홀: "VENUE",
};

const API_CATEGORY_MAP: Record<string, VendorCategory> = {
  STUDIO: "스튜디오",
  DRESS: "드레스",
  MAKEUP: "메이크업",
  WEDDING_HALL: "웨딩홀",
  "헤어/메이크업": "메이크업",
  VENUE: "웨딩홀",
};

export const mapApiCategoryToVendorCategory = (
  category: string | null | undefined
): VendorCategory | null => {
  if (!category) {
    return null;
  }

  if (API_CATEGORY_MAP[category]) {
    return API_CATEGORY_MAP[category];
  }

  if ((VENDOR_CATEGORY_ORDER as readonly string[]).includes(category)) {
    return category as VendorCategory;
  }

  return null;
};

export const getVendorCategoryByIndex = (
  index: number
): VendorCategory | null => {
  return VENDOR_CATEGORY_ORDER[index] ?? null;
};

export const vendorCategoryFromLabel = (
  label: string | null | undefined
): VendorCategory | null => {
  if (!label) return null;
  if ((VENDOR_CATEGORY_ORDER as readonly string[]).includes(label)) {
    return label as VendorCategory;
  }
  return null;
};

export const isVendorCategory = (value: string): value is VendorCategory => {
  return (VENDOR_CATEGORY_ORDER as readonly string[]).includes(value);
};

export const getApiCategoryByVendorCategory = (
  category: VendorCategory
): string => {
  return VENDOR_CATEGORY_TO_API[category];
};


