import React from 'react';
import { Anchor, AnchorProps } from '@t-headless-ui/react';
import { createNestedLink, type NestedAnchorLinkProps } from './utils';

interface CatalogProps extends AnchorProps {
  items: NestedAnchorLinkProps[];
}

export function Catalog({ items, ...restProps }: CatalogProps) {
  return (
    <Anchor.Root {...restProps} className="fixed top-27 overflow-y-auto h-[calc(100vh-100px)]">
      <div className="h-full">{createNestedLink(items)}</div>
    </Anchor.Root>
  );
}
