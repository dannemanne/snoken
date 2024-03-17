import React, { useEffect, useRef, useState } from 'react';

import { createTarget, eatTarget, hasCollission, move } from './actions';
import { buildBoard } from './buildBoard';
import type { DirectionPressedParams } from './directionPressed';
import { directionKeyPressed, directionPressed } from './directionPressed';
import { draw } from './draw';
import type {
  BoardPainter,
  BoardPainterOptions,
  BoardSize,
  ControlRef,
  Direction,
  Snake,
  SnakePainter,
  SnakePainterOptions,
  TargetPainter,
  TargetPainterOptions,
} from './types';
import { useAnimationFrame } from './useAnimationFrame';

type Props = {
  boardPainter?: BoardPainter;
  boardPainterOptions?: BoardPainterOptions;
  boardSize?: BoardSize;
  ctrlRef?: ControlRef;
  defaultSnake?: Snake;
  height?: number;
  onGameOver?: (params: { score: number; speed: number; length: number }) => void;
  onGameUpdate?: (params: { score: number; snake: Snake; speed: number }) => void;
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
const Snoken: React.FC<Props> = props => {
  const {
    boardPainter,
    boardPainterOptions,
    boardSize = [20, 20],
    ctrlRef = null,
    defaultSnake = [
      [5, 9],
      [4, 9],
      [3, 9],
    ],
    height = 400,
    onGameOver = null,
    onGameUpdate = null,
    onStarted = null,
    snakePainter,
    snakePainterOptions,
    speedInitial = 1,
    speedIncrement = 1,
    speedMax = 100,
    speedMin = 1,
    start = true,
    targetPainter,
    targetPainterOptions,
    width = 400,
  } = props;

  const [snake, setSnake] = useState(defaultSnake);
  const [dir, setDir] = useState<Direction>([1, 0]);
  const [buffer, setBuffer] = useState(0);
  const [speed, setSpeed] = useState(speedInitial);
  const [target, setTarget] = useState(createTarget(boardSize, snake));
  const [score, setScore] = useState(0);
  const [hasChangedDir, setHasChangedDir] = useState(false);
  const [gameRunning, setGameRunning] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eventRef = useRef<(e: KeyboardEvent) => void>(() => {});

  useEffect(() => {
    const params: DirectionPressedParams = {
      dir,
      setDir,
      speed,
      setSpeed,
      hasChangedDir,
      setHasChangedDir,
      speedIncrement,
      speedInitial,
      speedMin,
      speedMax,
    };

    // If ctrlRef was passed to component,
    if (ctrlRef) {
      ctrlRef.current = {
        left: directionPressed.bind(null, params, [-1, 0]),
        up: directionPressed.bind(null, params, [0, -1]),
        right: directionPressed.bind(null, params, [1, 0]),
        down: directionPressed.bind(null, params, [0, 1]),
      };
    }

    // Add event listener with directionProps bound, to handle key down events.
    eventRef.current = directionKeyPressed.bind(null, params);
    if (gameRunning) {
      document.addEventListener('keydown', eventRef.current);
    }

    // Return function to remove event listener
    return () => document.removeEventListener('keydown', eventRef.current);
  }, [
    ctrlRef,
    dir,
    gameRunning,
    setDir,
    speed,
    setSpeed,
    hasChangedDir,
    setHasChangedDir,
    speedIncrement,
    speedInitial,
  ]);

  useEffect(() => {
    if (!gameRunning && start) {
      setScore(0);
      setSpeed(speedInitial);
      setDir([1, 0]);
      setSnake(defaultSnake);
      setTarget(createTarget(boardSize, defaultSnake));

      setGameRunning(true);
      onStarted && onStarted();
    }
  }, [start, gameRunning, onStarted]);

  useEffect(() => {
    onGameUpdate && onGameUpdate({ score, snake, speed });
  }, [onGameUpdate, score, snake, speed]);

  useAnimationFrame(timeDiffMilli => {
    if (!gameRunning) return;

    const movesPerMilli = speed * 0.001;
    const lapsed = buffer + timeDiffMilli;
    const cycles = Math.floor(lapsed * movesPerMilli);

    if (cycles > 0) {
      const newSnake = move(snake, dir, boardSize);
      setHasChangedDir(false);

      if (hasCollission(newSnake)) {
        setSnake(newSnake);
        setGameRunning(false);

        onGameOver && onGameOver({ score, speed, length: snake.length });
      } else if (eatTarget(newSnake, target)) {
        const grownSnake = [...newSnake, snake[snake.length - 1]];
        setScore(score + 10);
        setSnake(grownSnake);
        setTarget(createTarget(boardSize, grownSnake));
      } else {
        setSnake(newSnake);
      }
      setBuffer(lapsed - cycles / movesPerMilli);
    } else {
      setBuffer(lapsed);
    }
  });

  const boardRef = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    if (canvasRef.current) {
      const { width, height } = canvasRef.current;

      boardRef.current = buildBoard({ boardPainter, boardPainterOptions, boardSize, height, width });
    }
  }, [boardPainter, boardPainterOptions, boardSize, canvasRef.current]);

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d');
    if (context && boardRef.current) {
      draw(context, {
        boardCanvas: boardRef.current,
        boardSize,
        snake,
        snakePainter,
        snakePainterOptions,
        target,
        targetPainter,
        targetPainterOptions,
      });
    }
  }, [boardRef.current, snake, canvasRef, target]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default Snoken;
