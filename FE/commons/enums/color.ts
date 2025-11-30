/**
 * Color Tokens
 * 피그마 파운데이션 노드ID: 4193:3751
 * 모든 색상은 토큰화되어 프로젝트 전체에서 사용됩니다.
 * TypeScript, Tailwind CSS, CSS 변수에서 모두 사용 가능합니다.
 */

/**
 * Root 레벨 색상
 * 프로젝트의 기본 색상 팔레트
 */
export const rootColors = {
  brand: '#ff5c8d',
  text: '#524a4e',
  navigation: '#e5e7eb',
  vector98: '#1f2024',
  blue: '#2b7fff',
  red: '#fb2c36',
} as const;

/**
 * Foundation/Red 색상 팔레트
 * 빨간색 계열의 10단계 색상 팔레트 (1: 가장 밝음, 10: 가장 어두움)
 */
export const redColors = {
  'red-1': '#ffeff4',
  'red-2': '#ffd8e4',
  'red-3': '#ffb9ce',
  'red-4': '#ff98b7',
  'red-5': '#ff79a2',
  'red-6': '#ff5c8d',
  'red-7': '#d94e78',
  'red-8': '#b54164',
  'red-9': '#913450',
  'red-10': '#73293f',
} as const;

/**
 * Foundation/Brown 색상 팔레트
 * 갈색 계열의 10단계 색상 팔레트 (1: 가장 밝음, 10: 가장 어두움)
 */
export const brownColors = {
  'brown-1': '#eeeded',
  'brown-2': '#d5d4d5',
  'brown-3': '#b5b1b3',
  'brown-4': '#928d8f',
  'brown-5': '#716b6e',
  'brown-6': '#524a4e',
  'brown-7': '#463f42',
  'brown-8': '#3a3537',
  'brown-9': '#2f2a2c',
  'brown-10': '#252123',
} as const;

/**
 * Foundation/Blue 색상 팔레트
 * 파란색 계열의 10단계 색상 팔레트 (1: 가장 밝음, 10: 가장 어두움)
 */
export const blueColors = {
  'blue-1': '#e9eaeb',
  'blue-2': '#c9cccf',
  'blue-3': '#9fa3a9',
  'blue-4': '#727881',
  'blue-5': '#47505b',
  'blue-6': '#1f2937',
  'blue-7': '#1a232f',
  'blue-8': '#161d27',
  'blue-9': '#12171f',
  'blue-10': '#0e1219',
} as const;

/**
 * Secondary 색상 팔레트
 * 뉴트럴 컬러 (블랙-화이트 스펙트럼)
 */
export const secondaryColors = {
  'secondary-50': '#FFFDFE',
  'secondary-100': '#FFF0F6',
  'secondary-200': '#E9D7DE',
  'secondary-300': '#D2BEC7',
  'secondary-400': '#BBA6AF',
  'secondary-500': '#A58F98',
  'secondary-600': '#8E7982',
  'secondary-700': '#77646C',
  'secondary-800': '#614F57',
  'secondary-900': '#4A3B41',
  'secondary-950': '#4A3B41',
} as const;

/**
 * Foundation/Black 색상 팔레트
 * 검정색 계열의 13단계 색상 팔레트 (1: 흰색, 13: 검정색)
 */
export const blackColors = {
  'black-1': '#ffffff',
  'black-2': '#fcfcfc',
  'black-3': '#f5f5f5',
  'black-4': '#f0f0f0',
  'black-5': '#d9d9d9',
  'black-6': '#bfbfbf',
  'black-7': '#8c8c8c',
  'black-8': '#595959',
  'black-9': '#454545',
  'black-10': '#262626',
  'black-11': '#1f1f1f',
  'black-12': '#141414',
  'black-13': '#000000',
} as const;

/**
 * Modal 관련 색상
 */
export const modalColors = {
  backdrop: 'rgba(0, 0, 0, 0.8)', // 반투명 검은색 배경
  shadow: '#800C3A', // 모달 그림자 색상 (피그마: Drop shadow Color)
} as const;

/**
 * 구분선 색상
 */
export const dividerColors = {
  default: 'rgba(173, 162, 162, 0.2)', // #ADA2A233
} as const;

/**
 * 모든 색상을 통합한 객체
 * 프로젝트 전체에서 사용할 수 있는 통합 색상 토큰
 */
export const colors = {
  root: rootColors,
  secondary: secondaryColors,
  red: redColors,
  brown: brownColors,
  blue: blueColors,
  black: blackColors,
  modal: modalColors,
  divider: dividerColors,
} as const;

/**
 * 타입 정의
 */

/** Root 색상 키 타입 */
export type RootColorKey = keyof typeof rootColors;

/** Secondary 색상 키 타입 */
export type SecondaryColorKey = keyof typeof secondaryColors;

/** Red 색상 키 타입 */
export type RedColorKey = keyof typeof redColors;

/** Brown 색상 키 타입 */
export type BrownColorKey = keyof typeof brownColors;

/** Blue 색상 키 타입 */
export type BlueColorKey = keyof typeof blueColors;

/** Black 색상 키 타입 */
export type BlackColorKey = keyof typeof blackColors;

/** Modal 색상 키 타입 */
export type ModalColorKey = keyof typeof modalColors;

/** Divider 색상 키 타입 */
export type DividerColorKey = keyof typeof dividerColors;

/**
 * 모든 색상 값의 유니온 타입
 * 모든 색상 토큰의 실제 hex 값 타입
 */
export type ColorValue =
  | typeof rootColors[keyof typeof rootColors]
  | typeof secondaryColors[keyof typeof secondaryColors]
  | typeof redColors[keyof typeof redColors]
  | typeof brownColors[keyof typeof brownColors]
  | typeof blueColors[keyof typeof blueColors]
  | typeof blackColors[keyof typeof blackColors]
  | typeof modalColors[keyof typeof modalColors]
  | typeof dividerColors[keyof typeof dividerColors];

