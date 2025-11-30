module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // ★ 반드시 이 줄이 있어야 합니다! (그리고 목록의 맨 마지막에 있어야 안전함)
      "react-native-reanimated/plugin",
    ],
  };
};
