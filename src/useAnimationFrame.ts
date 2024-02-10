import { useEffect, useRef } from 'react';

type UseAnimationFrame = (callback: (timestamp: number) => void) => void;
export const useAnimationFrame: UseAnimationFrame = callback => {
  const callbackRef = useRef(callback);
  const timestampRef = useRef<DOMHighResTimeStamp>(new Date().valueOf());

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const loop = (timestamp: DOMHighResTimeStamp): void => {
    frameRef.current = requestAnimationFrame(loop);
    const cb = callbackRef.current;

    const diff = timestamp - timestampRef.current;
    timestampRef.current = timestamp;
    cb(diff);
  };

  const frameRef = useRef(0);
  useEffect(() => {
    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);
};
