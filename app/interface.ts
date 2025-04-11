import type { Dispatch, SetStateAction } from 'react';
import type { themeTypeProps } from './theme';

export interface ConfigProviderProps {
  themeType: themeTypeProps;
  setThemeType: Dispatch<SetStateAction<themeTypeProps>>;
}

export type StateEnum = 'A' | 'B' | 'C';

export type Func = (...args: any[]) => any;
