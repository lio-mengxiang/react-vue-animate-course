import type { Func, StateEnum } from '@/interface';

export interface TitleProps {
  state: StateEnum;
}

export interface leaveTitleProps {
  leaveTitleA: ({ onCompleteCallback, onStartCallback }: { onCompleteCallback?: Func; onStartCallback?: Func }) => void;
  leaveTitleB: ({ onCompleteCallback, onStartCallback }: { onCompleteCallback?: Func; onStartCallback?: Func }) => void;
  leaveTitleC: ({ onCompleteCallback, onStartCallback }: { onCompleteCallback?: Func; onStartCallback?: Func }) => void;
}
