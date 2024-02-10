import type { MutableRefObject } from 'react';

export type BoardSize = [number, number];

export type Position = [number, number];

export type Snake = Position[];

export type DirectionAxis = -1 | 0 | 1;

export type Direction = [DirectionAxis, DirectionAxis];

export type ControlRef = MutableRefObject<{
  left: () => void;
  up: () => void;
  right: () => void;
  down: () => void;
} | null>;
