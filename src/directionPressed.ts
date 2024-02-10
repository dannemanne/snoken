import type { Direction } from './types';

export type DirectionPressedParams = {
  dir: Direction;
  hasChangedDir: boolean;
  setDir: (dir: Direction) => void;
  setHasChangedDir: (hasChanged: boolean) => void;
  setSpeed: (speed: number) => void;
  speed: number;
  speedIncrement: number;
  speedInitial: number;
};

const KEY_DIRECTIONS: Record<string, Direction | undefined> = {
  ArrowLeft: [-1, 0],
  ArrowUp: [0, -1],
  ArrowRight: [1, 0],
  ArrowDown: [0, 1],
  KeyA: [-1, 0],
  KeyW: [0, -1],
  KeyD: [1, 0],
  KeyS: [0, 1],
};

export type DirectionKeyPressed = (params: DirectionPressedParams, e: KeyboardEvent) => void;
export const directionKeyPressed: DirectionKeyPressed = (params, e) => {
  const newDir = KEY_DIRECTIONS[e.code];

  newDir && directionPressed(params, newDir);
};

type DirectionPressed = (params: DirectionPressedParams, newDir: Direction) => void;
export const directionPressed: DirectionPressed = (params, newDir) => {
  const { dir, hasChangedDir, setDir, setHasChangedDir, setSpeed, speed, speedIncrement, speedInitial } = params;

  const [x, y] = dir;
  const cx = x + newDir[0];
  const cy = y + newDir[1];

  if (cx === 0 && cy === 0) {
    // Pressed opposite direction key. No turn but slow down
    setSpeed(Math.max(speed - speedIncrement, speedInitial));
  } else if (Math.abs(cx) === 2 || Math.abs(cy) === 2) {
    // Pressed same direction key. No turn but speed up
    setSpeed(speed + speedIncrement);
  } else if (!hasChangedDir) {
    setDir(newDir);
    setHasChangedDir(true);
  }
};
