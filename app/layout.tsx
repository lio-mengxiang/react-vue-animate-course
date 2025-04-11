'use client';

import React, { useEffect, useState } from 'react';

import { darkTheme, lightTheme, setTheme } from './theme';
import Metadata from './metadata';
import { ConfigContext } from './context';

import './globals.css';
import type { themeTypeProps } from './theme';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [themeType, setThemeType] = useState<themeTypeProps>('light');

  useEffect(() => {
    if (themeType === 'light') {
      setTheme(lightTheme);
      return;
    }
    if (themeType === 'dark') {
      setTheme(darkTheme);
      return;
    }
  }, [themeType]);

  return (
    <html lang="en">
      <ConfigContext.Provider
        value={{
          themeType,
          setThemeType,
        }}
      >
        <Metadata />
        <body>{children}</body>
      </ConfigContext.Provider>
    </html>
  );
}
