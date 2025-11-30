/**
 * Typography Tokens
 * 피그마 파운데이션 노드ID: 4193:4398
 * 모든 typography는 토큰화되어 프로젝트 전체에서 사용됩니다.
 * 모바일/데스크톱 분기 및 영문 typography 지원 가능하도록 구조화되었습니다.
 * TypeScript, Tailwind CSS, CSS 변수에서 모두 사용 가능합니다.
 */

/**
 * Font Weight 타입
 * Typography에서 사용할 수 있는 모든 font weight 값
 */
export type FontWeight = 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';

/**
 * Typography 스타일 타입
 * Typography 토큰의 기본 구조를 정의합니다.
 */
export interface TypographyStyle {
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
  fontWeight: string;
}

/**
 * Typography Size 타입
 * Typography에서 사용할 수 있는 모든 사이즈 값
 */
export type TypographySize = 'xs' | 's' | 'm' | 'l' | 'xl' | '2xl' | '3xl' | '4xl';

/**
 * Mobile Typography
 * 모바일 환경에서 사용할 typography 토큰 (13px ~ 24px)
 * T-Shirt Sizes: XS, S, M, L, XL, 2XL, 3XL
 */
export const mobileTypography: Record<
  TypographySize,
  Record<FontWeight, TypographyStyle>
> = {
  xs: {
    light: {
      fontSize: '13px',
      lineHeight: '18px',
      letterSpacing: '0em',
      fontWeight: '300',
    },
    normal: {
      fontSize: '13px',
      lineHeight: '18px',
      letterSpacing: '0em',
      fontWeight: '400',
    },
    medium: {
      fontSize: '13px',
      lineHeight: '18px',
      letterSpacing: '0em',
      fontWeight: '500',
    },
    semibold: {
      fontSize: '13px',
      lineHeight: '18px',
      letterSpacing: '0em',
      fontWeight: '600',
    },
    bold: {
      fontSize: '13px',
      lineHeight: '18px',
      letterSpacing: '0em',
      fontWeight: '700',
    },
    extrabold: {
      fontSize: '13px',
      lineHeight: '18px',
      letterSpacing: '0em',
      fontWeight: '800',
    },
  },
  s: {
    light: {
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '0em',
      fontWeight: '300',
    },
    normal: {
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '0em',
      fontWeight: '400',
    },
    medium: {
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '0em',
      fontWeight: '500',
    },
    semibold: {
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '0em',
      fontWeight: '600',
    },
    bold: {
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '0em',
      fontWeight: '700',
    },
    extrabold: {
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '0em',
      fontWeight: '800',
    },
  },
  m: {
    light: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0em',
      fontWeight: '300',
    },
    normal: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0em',
      fontWeight: '400',
    },
    medium: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0em',
      fontWeight: '500',
    },
    semibold: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0em',
      fontWeight: '600',
    },
    bold: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0em',
      fontWeight: '700',
    },
    extrabold: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0em',
      fontWeight: '800',
    },
  },
  l: {
    light: {
      fontSize: '18px',
      lineHeight: '26px',
      letterSpacing: '0em',
      fontWeight: '300',
    },
    normal: {
      fontSize: '18px',
      lineHeight: '26px',
      letterSpacing: '0em',
      fontWeight: '400',
    },
    medium: {
      fontSize: '18px',
      lineHeight: '26px',
      letterSpacing: '0em',
      fontWeight: '500',
    },
    semibold: {
      fontSize: '18px',
      lineHeight: '26px',
      letterSpacing: '0em',
      fontWeight: '600',
    },
    bold: {
      fontSize: '18px',
      lineHeight: '26px',
      letterSpacing: '0em',
      fontWeight: '700',
    },
    extrabold: {
      fontSize: '18px',
      lineHeight: '26px',
      letterSpacing: '0em',
      fontWeight: '800',
    },
  },
  xl: {
    light: {
      fontSize: '20px',
      lineHeight: '28px',
      letterSpacing: '0em',
      fontWeight: '300',
    },
    normal: {
      fontSize: '20px',
      lineHeight: '28px',
      letterSpacing: '0em',
      fontWeight: '400',
    },
    medium: {
      fontSize: '20px',
      lineHeight: '28px',
      letterSpacing: '0em',
      fontWeight: '500',
    },
    semibold: {
      fontSize: '20px',
      lineHeight: '28px',
      letterSpacing: '0em',
      fontWeight: '600',
    },
    bold: {
      fontSize: '20px',
      lineHeight: '28px',
      letterSpacing: '0em',
      fontWeight: '700',
    },
    extrabold: {
      fontSize: '20px',
      lineHeight: '28px',
      letterSpacing: '0em',
      fontWeight: '800',
    },
  },
  '2xl': {
    light: {
      fontSize: '22px',
      lineHeight: '30px',
      letterSpacing: '-0.01em',
      fontWeight: '300',
    },
    normal: {
      fontSize: '22px',
      lineHeight: '30px',
      letterSpacing: '-0.01em',
      fontWeight: '400',
    },
    medium: {
      fontSize: '22px',
      lineHeight: '30px',
      letterSpacing: '-0.01em',
      fontWeight: '500',
    },
    semibold: {
      fontSize: '22px',
      lineHeight: '30px',
      letterSpacing: '-0.01em',
      fontWeight: '600',
    },
    bold: {
      fontSize: '22px',
      lineHeight: '30px',
      letterSpacing: '-0.01em',
      fontWeight: '700',
    },
    extrabold: {
      fontSize: '22px',
      lineHeight: '30px',
      letterSpacing: '-0.01em',
      fontWeight: '800',
    },
  },
  '3xl': {
    light: {
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '-0.01em',
      fontWeight: '300',
    },
    normal: {
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '-0.01em',
      fontWeight: '400',
    },
    medium: {
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '-0.01em',
      fontWeight: '500',
    },
    semibold: {
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '-0.01em',
      fontWeight: '600',
    },
    bold: {
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '-0.01em',
      fontWeight: '700',
    },
    extrabold: {
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '-0.01em',
      fontWeight: '800',
    },
  },
  '4xl': {
    light: {
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '-0.01em',
      fontWeight: '300',
    },
    normal: {
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '-0.01em',
      fontWeight: '400',
    },
    medium: {
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '-0.01em',
      fontWeight: '500',
    },
    semibold: {
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '-0.01em',
      fontWeight: '600',
    },
    bold: {
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '-0.01em',
      fontWeight: '700',
    },
    extrabold: {
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '-0.01em',
      fontWeight: '800',
    },
  },
} as const;

/**
 * Desktop Typography
 * 데스크톱 환경에서 사용할 typography 토큰 (16px ~ 64px)
 * T-Shirt Sizes: XS, S, M, L, XL, 2XL, 3XL, 4XL
 */
export const desktopTypography: Record<
  TypographySize,
  Record<FontWeight, TypographyStyle>
> = {
  xs: {
    light: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0em',
      fontWeight: '300',
    },
    normal: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0em',
      fontWeight: '400',
    },
    medium: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0em',
      fontWeight: '500',
    },
    semibold: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0em',
      fontWeight: '600',
    },
    bold: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0em',
      fontWeight: '700',
    },
    extrabold: {
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0em',
      fontWeight: '800',
    },
  },
  s: {
    light: {
      fontSize: '18px',
      lineHeight: '26px',
      letterSpacing: '0em',
      fontWeight: '300',
    },
    normal: {
      fontSize: '18px',
      lineHeight: '26px',
      letterSpacing: '0em',
      fontWeight: '400',
    },
    medium: {
      fontSize: '18px',
      lineHeight: '26px',
      letterSpacing: '0em',
      fontWeight: '500',
    },
    semibold: {
      fontSize: '18px',
      lineHeight: '26px',
      letterSpacing: '0em',
      fontWeight: '600',
    },
    bold: {
      fontSize: '18px',
      lineHeight: '26px',
      letterSpacing: '0em',
      fontWeight: '700',
    },
    extrabold: {
      fontSize: '18px',
      lineHeight: '26px',
      letterSpacing: '0em',
      fontWeight: '800',
    },
  },
  m: {
    light: {
      fontSize: '20px',
      lineHeight: '28px',
      letterSpacing: '0em',
      fontWeight: '300',
    },
    normal: {
      fontSize: '20px',
      lineHeight: '28px',
      letterSpacing: '0em',
      fontWeight: '400',
    },
    medium: {
      fontSize: '20px',
      lineHeight: '28px',
      letterSpacing: '0em',
      fontWeight: '500',
    },
    semibold: {
      fontSize: '20px',
      lineHeight: '28px',
      letterSpacing: '0em',
      fontWeight: '600',
    },
    bold: {
      fontSize: '20px',
      lineHeight: '28px',
      letterSpacing: '0em',
      fontWeight: '700',
    },
    extrabold: {
      fontSize: '20px',
      lineHeight: '28px',
      letterSpacing: '0em',
      fontWeight: '800',
    },
  },
  l: {
    light: {
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '0em',
      fontWeight: '300',
    },
    normal: {
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '0em',
      fontWeight: '400',
    },
    medium: {
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '0em',
      fontWeight: '500',
    },
    semibold: {
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '0em',
      fontWeight: '600',
    },
    bold: {
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '0em',
      fontWeight: '700',
    },
    extrabold: {
      fontSize: '24px',
      lineHeight: '32px',
      letterSpacing: '0em',
      fontWeight: '800',
    },
  },
  xl: {
    light: {
      fontSize: '28px',
      lineHeight: '36px',
      letterSpacing: '-0.01em',
      fontWeight: '300',
    },
    normal: {
      fontSize: '28px',
      lineHeight: '36px',
      letterSpacing: '-0.01em',
      fontWeight: '400',
    },
    medium: {
      fontSize: '28px',
      lineHeight: '36px',
      letterSpacing: '-0.01em',
      fontWeight: '500',
    },
    semibold: {
      fontSize: '28px',
      lineHeight: '36px',
      letterSpacing: '-0.01em',
      fontWeight: '600',
    },
    bold: {
      fontSize: '28px',
      lineHeight: '36px',
      letterSpacing: '-0.01em',
      fontWeight: '700',
    },
    extrabold: {
      fontSize: '28px',
      lineHeight: '36px',
      letterSpacing: '-0.01em',
      fontWeight: '800',
    },
  },
  '2xl': {
    light: {
      fontSize: '36px',
      lineHeight: '44px',
      letterSpacing: '-0.01em',
      fontWeight: '300',
    },
    normal: {
      fontSize: '36px',
      lineHeight: '44px',
      letterSpacing: '-0.01em',
      fontWeight: '400',
    },
    medium: {
      fontSize: '36px',
      lineHeight: '44px',
      letterSpacing: '-0.01em',
      fontWeight: '500',
    },
    semibold: {
      fontSize: '36px',
      lineHeight: '44px',
      letterSpacing: '-0.01em',
      fontWeight: '600',
    },
    bold: {
      fontSize: '36px',
      lineHeight: '44px',
      letterSpacing: '-0.01em',
      fontWeight: '700',
    },
    extrabold: {
      fontSize: '36px',
      lineHeight: '44px',
      letterSpacing: '-0.01em',
      fontWeight: '800',
    },
  },
  '3xl': {
    light: {
      fontSize: '48px',
      lineHeight: '56px',
      letterSpacing: '-0.02em',
      fontWeight: '300',
    },
    normal: {
      fontSize: '48px',
      lineHeight: '56px',
      letterSpacing: '-0.02em',
      fontWeight: '400',
    },
    medium: {
      fontSize: '48px',
      lineHeight: '56px',
      letterSpacing: '-0.02em',
      fontWeight: '500',
    },
    semibold: {
      fontSize: '48px',
      lineHeight: '56px',
      letterSpacing: '-0.02em',
      fontWeight: '600',
    },
    bold: {
      fontSize: '48px',
      lineHeight: '56px',
      letterSpacing: '-0.02em',
      fontWeight: '700',
    },
    extrabold: {
      fontSize: '48px',
      lineHeight: '56px',
      letterSpacing: '-0.02em',
      fontWeight: '800',
    },
  },
  '4xl': {
    light: {
      fontSize: '64px',
      lineHeight: '72px',
      letterSpacing: '-0.02em',
      fontWeight: '300',
    },
    normal: {
      fontSize: '64px',
      lineHeight: '72px',
      letterSpacing: '-0.02em',
      fontWeight: '400',
    },
    medium: {
      fontSize: '64px',
      lineHeight: '72px',
      letterSpacing: '-0.02em',
      fontWeight: '500',
    },
    semibold: {
      fontSize: '64px',
      lineHeight: '72px',
      letterSpacing: '-0.02em',
      fontWeight: '600',
    },
    bold: {
      fontSize: '64px',
      lineHeight: '72px',
      letterSpacing: '-0.02em',
      fontWeight: '700',
    },
    extrabold: {
      fontSize: '64px',
      lineHeight: '72px',
      letterSpacing: '-0.02em',
      fontWeight: '800',
    },
  },
} as const;

/**
 * 영문 Mobile Typography
 * 영문 환경에서 사용할 모바일 typography 토큰
 * 현재는 한글과 동일한 값을 사용하지만, 필요시 별도로 정의 가능
 */
export const mobileTypographyEn: Record<
  TypographySize,
  Record<FontWeight, TypographyStyle>
> = mobileTypography;

/**
 * 영문 Desktop Typography
 * 영문 환경에서 사용할 데스크톱 typography 토큰
 * 현재는 한글과 동일한 값을 사용하지만, 필요시 별도로 정의 가능
 */
export const desktopTypographyEn: Record<
  TypographySize,
  Record<FontWeight, TypographyStyle>
> = desktopTypography;

/**
 * 모든 Typography를 통합한 객체
 * 프로젝트 전체에서 사용할 수 있는 통합 typography 토큰
 */
export const typography = {
  mobile: {
    ko: mobileTypography,
    en: mobileTypographyEn,
  },
  desktop: {
    ko: desktopTypography,
    en: desktopTypographyEn,
  },
} as const;

/**
 * 타입 정의
 */

/** Mobile Typography 키 타입 */
export type MobileTypographyKey = keyof typeof mobileTypography;

/** Desktop Typography 키 타입 */
export type DesktopTypographyKey = keyof typeof desktopTypography;

/** Typography 로케일 타입 */
export type TypographyLocale = 'ko' | 'en';

/** Typography 디바이스 타입 */
export type TypographyDevice = 'mobile' | 'desktop';

