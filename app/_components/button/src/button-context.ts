'use client';

import { createContext } from 'react';
import type { ButtonContextProps } from './interface';

export const ButtonContext = createContext<ButtonContextProps>({});
