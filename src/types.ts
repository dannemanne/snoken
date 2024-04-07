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

export type SnakePainterOptions = {
  bodyColor: string | string[];
  eyeColor: string;
  headColor: string;
  tailColor: string;
  toungueColor: string;
};

export type SnakePainter = (
  ctx: CanvasRenderingContext2D,
  params: {
    boardSize: BoardSize;
    snake: Snake;
    snakePainterOptions?: SnakePainterOptions;
  },
) => void;

export type TargetPainterOptions = { fillColor: string; strokeColor: string };

export type TargetPainter = (
  ctx: CanvasRenderingContext2D,
  params: { boardSize: BoardSize; target: Position; targetPainterOptions?: TargetPainterOptions },
) => void;

export type ActionText = { text: string; x: number; y: number; timestamp: number };

export type ActionTextPainterOptions = { hideAfterMs: number };

export type ActionTextPainter = (
  ctx: CanvasRenderingContext2D,
  params: { actionText: ActionText; actionTextPainterOptions?: ActionTextPainterOptions; boardSize: BoardSize },
) => void;

export type CalculateScoreOptions = {
  baseScore?: number;
  movesPenaltyCap?: number;
  movesPenaltyMultiplier?: number;
  scoreMaxCap?: number;
  scoreMinCap?: number;
  speedBonusCap?: number;
  speedMultiplier?: number;
};

export type OnGameOver = (params: { score: number; speed: number; length: number; totalMoves: number }) => void;

export type OnGameUpdate = (params: {
  recentMoves: number;
  score: number;
  snake: Snake;
  speed: number;
  totalMoves: number;
}) => void;

export type SnokenProps = {
  actionTextPainter?: ActionTextPainter;
  actionTextPainterOptions?: ActionTextPainterOptions;
  boardPainter?: BoardPainter;
  boardPainterOptions?: BoardPainterOptions;
  boardSize?: BoardSize;
  calculateScoreOptions?: CalculateScoreOptions;
  ctrlRef?: ControlRef;
  defaultSnake?: Snake;
  height?: number;
  onGameOver?: OnGameOver;
  onGameUpdate?: OnGameUpdate;
  onStarted?: () => void;
  snakePainter?: SnakePainter;
  snakePainterOptions?: SnakePainterOptions;
  speedInitial?: number;
  speedIncrement?: number;
  speedMax?: number;
  speedMin?: number;
  start?: boolean;
  targetPainter?: TargetPainter;
  targetPainterOptions?: TargetPainterOptions;
  width?: number;
};
