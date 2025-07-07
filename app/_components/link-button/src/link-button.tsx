'use client';

import React, { PropsWithChildren, forwardRef, MouseEventHandler, type Context } from 'react';
import { LinkButtonContext } from './link-button-context';
import type { LinkButtonContextProps, LinkButtonProps } from './interface';

function _LinkButton(props: PropsWithChildren<LinkButtonProps>, ref: React.Ref<HTMLAnchorElement> | undefined) {
  const { children, disabled, loading, onClick, ...restProps } = props;

  const handleClick: MouseEventHandler = (event): void => {
    if (loading || disabled) {
      event?.preventDefault?.();
      return;
    }
    onClick?.(event);
  };

  return (
    <LinkButtonContext.Provider value={{ loading, disabled }}>
      <a {...restProps} ref={ref} onClick={handleClick}>
        {children}
      </a>
    </LinkButtonContext.Provider>
  );
}

const ForwardRefLinkButton = forwardRef<HTMLAnchorElement, PropsWithChildren<LinkButtonProps>>(_LinkButton);

export const LinkButton = ForwardRefLinkButton as typeof ForwardRefLinkButton & {
  LinkButtonContext: Context<LinkButtonContextProps>;
};

LinkButton.LinkButtonContext = LinkButtonContext;

LinkButton.displayName = 'MUI.Button';
