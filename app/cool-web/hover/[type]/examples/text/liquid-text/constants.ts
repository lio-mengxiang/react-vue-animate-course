import { LiquidTextExample } from './liquid-text';
import { type DemoComponentProps } from '@/cool-web/interface';

export const catalogInfo = {
  text: '水波文字',
  level: 2,
};

export const LiquidText: DemoComponentProps = {
  catalogInfo,
  Component: LiquidTextExample,
};
