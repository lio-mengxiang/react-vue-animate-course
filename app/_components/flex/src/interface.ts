import type { HTMLAttributes, CSSProperties, RefObject } from 'react';

export interface FlexProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  wrap?: CSSProperties['flexWrap'];
  direction?: CSSProperties['flexDirection'];
  basis?: CSSProperties['flexBasis'];
  grow?: CSSProperties['flexGrow'];
  shrink?: CSSProperties['flexShrink'];
  inline?: boolean;
  ref?: RefObject<HTMLDivElement>;
}
