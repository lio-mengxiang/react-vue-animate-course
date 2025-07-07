'use client';

import React from 'react';
import Metadata from './metadata';
import { Nav } from '@/_components/nav';
import { Geist } from 'next/font/google';

import './globals.css';
import './_theme/light.css';
import './_theme/dark.css';
import { type ThemeTypeProps } from './_theme';
import { config } from '../config';
import { NextLocalStorage } from './localstorage';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const script = (defaultTheme: ThemeTypeProps, themeKey: string) => {
    const theme = localStorage.getItem(themeKey) || defaultTheme;
    localStorage.setItem(themeKey, theme);
    document.documentElement.setAttribute('class', theme);
  };

  return (
    <html lang="zh" suppressHydrationWarning>
      <Metadata />
      <body className={`${geistSans.variable} antialiased text-color bg-color font-sans`}>
        <NextLocalStorage scriptContent={script} defaultTheme={config.defaultTheme}>
          <Nav />
          {children}
        </NextLocalStorage>
      </body>
    </html>
  );
}
