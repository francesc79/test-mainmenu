import { useCallback, useRef } from 'react';

export const useInstance = <T = unknown>(value: T): (() => T) => {
  const ref = useRef<T>(value);
  ref.current = value;

  return useCallback<() => T>(() => {
    return ref.current;
  }, []);
};
