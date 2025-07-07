import React, { type ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * @zh 按钮的类型
   * @en The type of the button
   * @default button
   */
  htmlType?: 'button' | 'submit' | 'reset';
  /**
   * @zh 是否禁用
   * @en Whether to disable the button
   */
  disabled?: boolean;
  /**
   * @zh 按钮是否是加载状态
   * @en Whether the button is in the loading state
   */
  loading?: boolean;
  /**
   * @zh 点击按钮的回调
   * @en Callback fired when the button is clicked
   */
  onClick?: (e: React.MouseEvent<Element, MouseEvent>) => void;
  ref?: React.Ref<HTMLButtonElement>;
}

/**
 * @title ButtonContext
 * @zh 可以使用 useContext(Button.Context) 以下状态
 * @en You can use useContext(MUI.ButtonContext) to get the following status
 */
export interface ButtonContextProps {
  /**
   * @zh 是否禁用
   * @en Whether to disable the button
   */
  disabled?: boolean;
  /**
   * @zh 按钮是否是加载状态
   * @en Whether the button is in the loading state
   */
  loading?: boolean;
}
