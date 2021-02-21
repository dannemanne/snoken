import { useEffect, useRef } from 'react';

export function useAnimationFrame(callback) {
  const callbackRef = useRef(callback);
  const timestampRef = useRef(null);

  useEffect(
    () => {
      callbackRef.current = callback;
    },
    [callback]
  );

  const loop = (timestamp) => {
    frameRef.current = requestAnimationFrame(loop);
    const cb = callbackRef.current;

    let diff = timestamp - timestampRef.current;
    timestampRef.current = timestamp;
    cb(diff);
  };

  const frameRef = useRef();
  useEffect(() => {
    frameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);
};
