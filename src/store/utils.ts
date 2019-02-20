import { RootState } from './types';

export const doIfDebug = (rootState: RootState, fn: () => any) => {
  if (rootState.debug) {
    fn();
  }
};
