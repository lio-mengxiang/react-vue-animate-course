import { createContext } from 'react';
import type { ConfigProviderProps } from './interface';

export const ConfigContext = createContext<ConfigProviderProps>({
  setThemeType: () => {},
  themeType: 'light',
});
