/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Primary Colors - Plan A 메인 브랜드 컬러 (핑크)
        primary: {
          50: "#fdf4ff",
          100: "#fae8ff",
          200: "#f5d0fe",
          300: "#f0abfc",
          400: "#e879f9",
          500: "#d946ef",
          600: "#c026d3", // Main brand color (핑크)
          700: "#a21caf",
          800: "#86198f",
          900: "#701a75",
          950: "#701a75",
        },
        // Secondary Colors - 뉴트럴 컬러 (블랙-화이트 스펙트럼)
        secondary: {
          50: "#FFFDFE", // 거의 흰색
          100: "#FFF0F6", // 매우 연한 핑크
          200: "#E9D7DE", // 연한 핑크회색
          300: "#D2BEC7", // 핑크회색
          400: "#BBA6AF", // 회핑크
          500: "#A58F98", // 중간 회보라
          600: "#8E7982", // 회보라
          700: "#77646C", // 진한 회보라
          800: "#614F57", // 회갈색
          900: "#4A3B41", // 다크 그레이
          950: "#4A3B41", // 다크 그레이
        },
        // Accent Colors - 포인트 컬러
        accent: {
          pink: "#f9a8d4",
          rose: "#fda4af",
          gold: "#fbbf24",
          sage: "#86efac",
        },
        // Status Colors
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        info: "#3b82f6",
        // 피그마 파운데이션 노드ID: 4193:3751
        // Root 레벨 색상
        root: {
          brand: "#ff5c8d",
          text: "#524a4e",
          navigation: "#e5e7eb",
          vector98: "#1f2024",
          blue: "#2b7fff",
          red: "#fb2c36",
        },
        // Foundation/Red 색상 팔레트
        foundationRed: {
          1: "#ffeff4",
          2: "#ffd8e4",
          3: "#ffb9ce",
          4: "#ff98b7",
          5: "#ff79a2",
          6: "#ff5c8d",
          7: "#d94e78",
          8: "#b54164",
          9: "#913450",
          10: "#73293f",
        },
        // Foundation/Brown 색상 팔레트
        foundationBrown: {
          1: "#eeeded",
          2: "#d5d4d5",
          3: "#b5b1b3",
          4: "#928d8f",
          5: "#716b6e",
          6: "#524a4e",
          7: "#463f42",
          8: "#3a3537",
          9: "#2f2a2c",
          10: "#252123",
        },
        // Foundation/Blue 색상 팔레트
        foundationBlue: {
          1: "#e9eaeb",
          2: "#c9cccf",
          3: "#9fa3a9",
          4: "#727881",
          5: "#47505b",
          6: "#1f2937",
          7: "#1a232f",
          8: "#161d27",
          9: "#12171f",
          10: "#0e1219",
        },
        // Foundation/Black 색상 팔레트
        foundationBlack: {
          1: "#ffffff",
          2: "#fcfcfc",
          3: "#f5f5f5",
          4: "#f0f0f0",
          5: "#d9d9d9",
          6: "#bfbfbf",
          7: "#8c8c8c",
          8: "#595959",
          9: "#454545",
          10: "#262626",
          11: "#1f1f1f",
          12: "#141414",
          13: "#000000",
        },
        // 구분선 색상
        divider: {
          default: "#ADA2A233", // rgba(173, 162, 162, 0.2)
        },
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "SF Pro",
          "Apple SD Gothic Neo",
          "Noto Sans KR",
          "sans-serif",
        ],
        display: ["Pretendard", "SF Pro Display", "sans-serif"],
        body: ["Pretendard", "SF Pro Text", "sans-serif"],
      },
      fontSize: {
        // 피그마 파운데이션 노드ID: 4193:4398
        // Mobile Typography (13px ~ 24px)
        // T-Shirt Sizes: 3XL, 2XL, XL, L, M, S, XS

        "mobile-3xl-light": [
          "24px",
          { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "300" },
        ],
        "mobile-3xl": [
          "24px",
          { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "400" },
        ],
        "mobile-3xl-medium": [
          "24px",
          { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "500" },
        ],
        "mobile-3xl-semibold": [
          "24px",
          { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        "mobile-3xl-bold": [
          "24px",
          { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        "mobile-3xl-extrabold": [
          "24px",
          { lineHeight: "32px", letterSpacing: "-0.01em", fontWeight: "800" },
        ],

        "mobile-2xl-light": [
          "22px",
          { lineHeight: "30px", letterSpacing: "-0.01em", fontWeight: "300" },
        ],
        "mobile-2xl": [
          "22px",
          { lineHeight: "30px", letterSpacing: "-0.01em", fontWeight: "400" },
        ],
        "mobile-2xl-medium": [
          "22px",
          { lineHeight: "30px", letterSpacing: "-0.01em", fontWeight: "500" },
        ],
        "mobile-2xl-semibold": [
          "22px",
          { lineHeight: "30px", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        "mobile-2xl-bold": [
          "22px",
          { lineHeight: "30px", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        "mobile-2xl-extrabold": [
          "22px",
          { lineHeight: "30px", letterSpacing: "-0.01em", fontWeight: "800" },
        ],

        "mobile-xl-light": [
          "20px",
          { lineHeight: "28px", letterSpacing: "0em", fontWeight: "300" },
        ],
        "mobile-xl": [
          "20px",
          { lineHeight: "28px", letterSpacing: "0em", fontWeight: "400" },
        ],
        "mobile-xl-medium": [
          "20px",
          { lineHeight: "28px", letterSpacing: "0em", fontWeight: "500" },
        ],
        "mobile-xl-semibold": [
          "20px",
          { lineHeight: "28px", letterSpacing: "0em", fontWeight: "600" },
        ],
        "mobile-xl-bold": [
          "20px",
          { lineHeight: "28px", letterSpacing: "0em", fontWeight: "700" },
        ],
        "mobile-xl-extrabold": [
          "20px",
          { lineHeight: "28px", letterSpacing: "0em", fontWeight: "800" },
        ],

        "mobile-l-light": [
          "18px",
          { lineHeight: "26px", letterSpacing: "0em", fontWeight: "300" },
        ],
        "mobile-l": [
          "18px",
          { lineHeight: "26px", letterSpacing: "0em", fontWeight: "400" },
        ],
        "mobile-l-medium": [
          "18px",
          { lineHeight: "26px", letterSpacing: "0em", fontWeight: "500" },
        ],
        "mobile-l-semibold": [
          "18px",
          { lineHeight: "26px", letterSpacing: "0em", fontWeight: "600" },
        ],
        "mobile-l-bold": [
          "18px",
          { lineHeight: "26px", letterSpacing: "0em", fontWeight: "700" },
        ],
        "mobile-l-extrabold": [
          "18px",
          { lineHeight: "26px", letterSpacing: "0em", fontWeight: "800" },
        ],

        "mobile-m-light": [
          "16px",
          { lineHeight: "24px", letterSpacing: "0em", fontWeight: "300" },
        ],
        "mobile-m": [
          "16px",
          { lineHeight: "24px", letterSpacing: "0em", fontWeight: "400" },
        ],
        "mobile-m-medium": [
          "16px",
          { lineHeight: "24px", letterSpacing: "0em", fontWeight: "500" },
        ],
        "mobile-m-semibold": [
          "16px",
          { lineHeight: "24px", letterSpacing: "0em", fontWeight: "600" },
        ],
        "mobile-m-bold": [
          "16px",
          { lineHeight: "24px", letterSpacing: "0em", fontWeight: "700" },
        ],
        "mobile-m-extrabold": [
          "16px",
          { lineHeight: "24px", letterSpacing: "0em", fontWeight: "800" },
        ],

        "mobile-s-light": [
          "14px",
          { lineHeight: "20px", letterSpacing: "0em", fontWeight: "300" },
        ],
        "mobile-s": [
          "14px",
          { lineHeight: "20px", letterSpacing: "0em", fontWeight: "400" },
        ],
        "mobile-s-medium": [
          "14px",
          { lineHeight: "20px", letterSpacing: "0em", fontWeight: "500" },
        ],
        "mobile-s-semibold": [
          "14px",
          { lineHeight: "20px", letterSpacing: "0em", fontWeight: "600" },
        ],
        "mobile-s-bold": [
          "14px",
          { lineHeight: "20px", letterSpacing: "0em", fontWeight: "700" },
        ],
        "mobile-s-extrabold": [
          "14px",
          { lineHeight: "20px", letterSpacing: "0em", fontWeight: "800" },
        ],

        "mobile-xs-light": [
          "13px",
          { lineHeight: "18px", letterSpacing: "0em", fontWeight: "300" },
        ],
        "mobile-xs": [
          "13px",
          { lineHeight: "18px", letterSpacing: "0em", fontWeight: "400" },
        ],
        "mobile-xs-medium": [
          "13px",
          { lineHeight: "18px", letterSpacing: "0em", fontWeight: "500" },
        ],
        "mobile-xs-semibold": [
          "13px",
          { lineHeight: "18px", letterSpacing: "0em", fontWeight: "600" },
        ],
        "mobile-xs-bold": [
          "13px",
          { lineHeight: "18px", letterSpacing: "0em", fontWeight: "700" },
        ],
        "mobile-xs-extrabold": [
          "13px",
          { lineHeight: "18px", letterSpacing: "0em", fontWeight: "800" },
        ],

        // 피그마 파운데이션 노드ID: 4193:4398
        // PC Typography (16px ~ 64px)
        // T-Shirt Sizes: 4XL, 3XL, 2XL, XL, L, M, S, XS

        "pc-4xl-light": [
          "64px",
          { lineHeight: "72px", letterSpacing: "-0.02em", fontWeight: "300" },
        ],
        "pc-4xl": [
          "64px",
          { lineHeight: "72px", letterSpacing: "-0.02em", fontWeight: "400" },
        ],
        "pc-4xl-medium": [
          "64px",
          { lineHeight: "72px", letterSpacing: "-0.02em", fontWeight: "500" },
        ],
        "pc-4xl-semibold": [
          "64px",
          { lineHeight: "72px", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        "pc-4xl-bold": [
          "64px",
          { lineHeight: "72px", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "pc-4xl-extrabold": [
          "64px",
          { lineHeight: "72px", letterSpacing: "-0.02em", fontWeight: "800" },
        ],

        "pc-3xl-light": [
          "48px",
          { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "300" },
        ],
        "pc-3xl": [
          "48px",
          { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "400" },
        ],
        "pc-3xl-medium": [
          "48px",
          { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "500" },
        ],
        "pc-3xl-semibold": [
          "48px",
          { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        "pc-3xl-bold": [
          "48px",
          { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "700" },
        ],
        "pc-3xl-extrabold": [
          "48px",
          { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "800" },
        ],

        "pc-2xl-light": [
          "36px",
          { lineHeight: "44px", letterSpacing: "-0.01em", fontWeight: "300" },
        ],
        "pc-2xl": [
          "36px",
          { lineHeight: "44px", letterSpacing: "-0.01em", fontWeight: "400" },
        ],
        "pc-2xl-medium": [
          "36px",
          { lineHeight: "44px", letterSpacing: "-0.01em", fontWeight: "500" },
        ],
        "pc-2xl-semibold": [
          "36px",
          { lineHeight: "44px", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        "pc-2xl-bold": [
          "36px",
          { lineHeight: "44px", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        "pc-2xl-extrabold": [
          "36px",
          { lineHeight: "44px", letterSpacing: "-0.01em", fontWeight: "800" },
        ],

        "pc-xl-light": [
          "28px",
          { lineHeight: "36px", letterSpacing: "-0.01em", fontWeight: "300" },
        ],
        "pc-xl": [
          "28px",
          { lineHeight: "36px", letterSpacing: "-0.01em", fontWeight: "400" },
        ],
        "pc-xl-medium": [
          "28px",
          { lineHeight: "36px", letterSpacing: "-0.01em", fontWeight: "500" },
        ],
        "pc-xl-semibold": [
          "28px",
          { lineHeight: "36px", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        "pc-xl-bold": [
          "28px",
          { lineHeight: "36px", letterSpacing: "-0.01em", fontWeight: "700" },
        ],
        "pc-xl-extrabold": [
          "28px",
          { lineHeight: "36px", letterSpacing: "-0.01em", fontWeight: "800" },
        ],

        "pc-l-light": [
          "24px",
          { lineHeight: "32px", letterSpacing: "0em", fontWeight: "300" },
        ],
        "pc-l": [
          "24px",
          { lineHeight: "32px", letterSpacing: "0em", fontWeight: "400" },
        ],
        "pc-l-medium": [
          "24px",
          { lineHeight: "32px", letterSpacing: "0em", fontWeight: "500" },
        ],
        "pc-l-semibold": [
          "24px",
          { lineHeight: "32px", letterSpacing: "0em", fontWeight: "600" },
        ],
        "pc-l-bold": [
          "24px",
          { lineHeight: "32px", letterSpacing: "0em", fontWeight: "700" },
        ],
        "pc-l-extrabold": [
          "24px",
          { lineHeight: "32px", letterSpacing: "0em", fontWeight: "800" },
        ],

        "pc-m-light": [
          "20px",
          { lineHeight: "28px", letterSpacing: "0em", fontWeight: "300" },
        ],
        "pc-m": [
          "20px",
          { lineHeight: "28px", letterSpacing: "0em", fontWeight: "400" },
        ],
        "pc-m-medium": [
          "20px",
          { lineHeight: "28px", letterSpacing: "0em", fontWeight: "500" },
        ],
        "pc-m-semibold": [
          "20px",
          { lineHeight: "28px", letterSpacing: "0em", fontWeight: "600" },
        ],
        "pc-m-bold": [
          "20px",
          { lineHeight: "28px", letterSpacing: "0em", fontWeight: "700" },
        ],
        "pc-m-extrabold": [
          "20px",
          { lineHeight: "28px", letterSpacing: "0em", fontWeight: "800" },
        ],

        "pc-s-light": [
          "18px",
          { lineHeight: "26px", letterSpacing: "0em", fontWeight: "300" },
        ],
        "pc-s": [
          "18px",
          { lineHeight: "26px", letterSpacing: "0em", fontWeight: "400" },
        ],
        "pc-s-medium": [
          "18px",
          { lineHeight: "26px", letterSpacing: "0em", fontWeight: "500" },
        ],
        "pc-s-semibold": [
          "18px",
          { lineHeight: "26px", letterSpacing: "0em", fontWeight: "600" },
        ],
        "pc-s-bold": [
          "18px",
          { lineHeight: "26px", letterSpacing: "0em", fontWeight: "700" },
        ],
        "pc-s-extrabold": [
          "18px",
          { lineHeight: "26px", letterSpacing: "0em", fontWeight: "800" },
        ],

        "pc-xs-light": [
          "16px",
          { lineHeight: "24px", letterSpacing: "0em", fontWeight: "300" },
        ],
        "pc-xs": [
          "16px",
          { lineHeight: "24px", letterSpacing: "0em", fontWeight: "400" },
        ],
        "pc-xs-medium": [
          "16px",
          { lineHeight: "24px", letterSpacing: "0em", fontWeight: "500" },
        ],
        "pc-xs-semibold": [
          "16px",
          { lineHeight: "24px", letterSpacing: "0em", fontWeight: "600" },
        ],
        "pc-xs-bold": [
          "16px",
          { lineHeight: "24px", letterSpacing: "0em", fontWeight: "700" },
        ],
        "pc-xs-extrabold": [
          "16px",
          { lineHeight: "24px", letterSpacing: "0em", fontWeight: "800" },
        ],
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
      letterSpacing: {
        tighter: "-0.02em",
        tight: "-0.01em",
        normal: "0em",
        wide: "0.01em",
        wider: "0.02em",
        widest: "0.04em",
      },
      lineHeight: {
        none: "1",
        tight: "1.25",
        snug: "1.375",
        normal: "1.5",
        relaxed: "1.625",
        loose: "2",
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
      },
      borderColor: {
        // Primary Border Colors - 한 톤 진하게
        "primary-border": {
          50: "#fae8ff", // primary-100
          100: "#f5d0fe", // primary-200
          200: "#f0abfc", // primary-300
          300: "#e879f9", // primary-400
          400: "#d946ef", // primary-500
          500: "#c026d3", // primary-600
          600: "#a21caf", // primary-700
          700: "#86198f", // primary-800
          800: "#701a75", // primary-900
          900: "#701a75", // primary-950
          950: "#5a1459", // 더 진한 핑크
        },
        // Secondary Border Colors - 한 톤 진하게
        "secondary-border": {
          50: "#FFF0F6", // secondary-100
          100: "#E9D7DE", // secondary-200
          200: "#D2BEC7", // secondary-300
          300: "#BBA6AF", // secondary-400
          400: "#A58F98", // secondary-500
          500: "#8E7982", // secondary-600
          600: "#77646C", // secondary-700
          700: "#614F57", // secondary-800
          800: "#4A3B41", // secondary-900
          900: "#4A3B41", // secondary-950
          950: "#332A2E", // 더 진한 다크
        },
      },
      borderRadius: {
        none: "0",
        sm: "4px",
        md: "8px",
        DEFAULT: "10px",
        lg: "12px",
        xl: "16px",
        full: "9999px",
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        DEFAULT:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
