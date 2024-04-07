import type { Direction } from './types';

export type SnakeVelocity = {
  dir: Direction;
  hasChangedDir: boolean;
  speed: number;
};

export type DirectionPressedOptions = {
  speedIncrement: number;
  speedInitial: number;
  speedMax: number;
  speedMin: number;
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

export type DirectionKeyPressed = (
  snakeVelocity: SnakeVelocity,
  setSnakeVelocity: React.Dispatch<React.SetStateAction<SnakeVelocity>>,
  options: DirectionPressedOptions,
  e: KeyboardEvent,
) => void;
export const directionKeyPressed: DirectionKeyPressed = (snakeVelocity, setSnakeVelocity, options, e) => {
  const newDir = KEY_DIRECTIONS[e.code];
  if (!newDir) return;

  e.preventDefault();
  e.stopPropagation();
  directionPressed(snakeVelocity, setSnakeVelocity, options, newDir);
};

type DirectionPressed = (
  snakeVelocity: SnakeVelocity,
  setSnakeVelocity: React.Dispatch<React.SetStateAction<SnakeVelocity>>,
  options: DirectionPressedOptions,
  newDir: Direction,
) => void;
export const directionPressed: DirectionPressed = (snakeVelocity, setSnakeVelocity, options, newDir) => {
  const { dir, hasChangedDir, speed } = snakeVelocity;
  const { speedIncrement, speedInitial, speedMax, speedMin } = options;

  const [x, y] = dir;
  const cx = x + newDir[0];
  const cy = y + newDir[1];

  if (cx === 0 && cy === 0) {
    // Pressed opposite direction key. No turn but slow down
    if (speed > speedMin) setSnakeVelocity(v => ({ ...v, speed: Math.max(v.speed - speedIncrement, speedInitial) }));
  } else if (Math.abs(cx) === 2 || Math.abs(cy) === 2) {
    // Pressed same direction key. No turn but speed up
    if (speed < speedMax) setSnakeVelocity(v => ({ ...v, speed: speed + speedIncrement }));
  } else if (!hasChangedDir) {
    setSnakeVelocity(v => ({ ...v, dir: newDir, hasChangedDir: true }));
  }
};
