import type { StateEnum } from '@/interface';
import type { Dispatch, SetStateAction } from 'react';

export interface IndicatorProps {
  state: StateEnum;
  setState: Dispatch<SetStateAction<StateEnum>>;
}

export interface leaveIndicatorProps {
  leaveIndicatorA: () => void;
  leaveIndicatorB: () => void;
  leaveIndicatorC: () => void;
}
