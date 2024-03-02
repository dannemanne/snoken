import type { MutableRefObject } from 'react';

export type BoardSize = [number, number];

export type Position = [number, number];

export type Snake = Position[];

export type DirectionAxis = -1 | 0 | 1;

export type Direction = [DirectionAxis, DirectionAxis];

export type Control = {
  left: () => void;
  up: () => void;
  right: () => void;
  down: () => void;
};

export type ControlRef = MutableRefObject<Control | null>;

export type BoardPainterOptions = { colors?: string | string[] | string[][] };

export type BoardPainter = (params: {
  boardPainterOptions?: BoardPainterOptions;
  boardSize: BoardSize;
  x: number;
  y: number;
}) => Pick<CanvasFillStrokeStyles, 'fillStyle' | 'strokeStyle'>;
