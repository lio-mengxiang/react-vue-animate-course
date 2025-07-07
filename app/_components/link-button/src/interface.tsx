import React, { type AnchorHTMLAttributes } from 'react';

export interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
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
  ref?: React.Ref<HTMLAnchorElement>;
}

/**
 * @title ButtonContext
 * @zh 可以使用 useContext(Button.Context) 以下状态
 * @en You can use useContext(MUI.ButtonContext) to get the following status
 */
export interface LinkButtonContextProps {
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
