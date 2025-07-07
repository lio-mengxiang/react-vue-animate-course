import React from 'react';
import { Anchor } from '@t-headless-ui/react';
import { cs } from '@/_utils';

export interface NestedAnchorLinkProps {
  level: number;
  text: string;
  items?: NestedAnchorLinkProps[];
}

export function createNestedLink(items?: NestedAnchorLinkProps[]) {
  return Array.isArray(items)
    ? items.map((item, index) => (
        <Anchor.Link targetId={item.text} key={item.text || index}>
          <div
            className={cs('text-color-500 text-sm cursor-pointer hover:text-color mb-2', {
              ['ml-2']: item.level === 3,
            })}
          >
            {item.text}
          </div>
          {createNestedLink(item.items)}
        </Anchor.Link>
      ))
    : null;
}
