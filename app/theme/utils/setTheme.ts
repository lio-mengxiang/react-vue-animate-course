import type { ThemeProps } from '../interface';

export const setTheme = (theme: ThemeProps) => {
  const root = document.documentElement;

  // 遍历 theme 对象的每个键值对
  Object.keys(theme).forEach((key) => {
    // 确保 key 是 ThemeProps 的键
    const typedKey = key as keyof ThemeProps;
    root.style.setProperty(key, theme[typedKey]);
  });
};
