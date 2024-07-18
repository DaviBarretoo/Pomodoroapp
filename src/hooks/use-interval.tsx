import { useEffect, useRef } from 'react';

// Create C is generic is flexible for anything  type of dados
export function useIntervall<C extends CallableFunction>(
  callback: C,
  delay: number | null,
): void {
  const savedCallback = useRef<C>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current) savedCallback.current();
    }
    if (delay != null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
