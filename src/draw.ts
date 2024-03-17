import { defaultSnakePainter, defaultTargetPainter } from './painters';
import type {
  BoardSize,
  Position,
  Snake,
  SnakePainter,
  SnakePainterOptions,
  TargetPainter,
  TargetPainterOptions,
} from './types';

type Draw = (
  ctx: CanvasRenderingContext2D,
  params: {
    boardCanvas: HTMLCanvasElement;
    boardSize: BoardSize;
    snake: Snake;
    snakePainter?: SnakePainter;
    snakePainterOptions?: SnakePainterOptions;
    target: Position;
    targetPainter?: TargetPainter;
    targetPainterOptions?: TargetPainterOptions;
  },
) => void;
export const draw: Draw = (ctx, params) => {
  const {
    boardCanvas,
    boardSize,
    snake,
    snakePainter = defaultSnakePainter,
    snakePainterOptions,
    target,
    targetPainter = defaultTargetPainter,
    targetPainterOptions,
  } = params;

  const { width, height } = ctx.canvas;
  const [boardW, boardH] = boardSize;

  const segWidth = width / boardW;
  const segHeight = height / boardH;

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(boardCanvas, 0, 0);

  snakePainter(ctx, { boardSize, snake, snakePainterOptions });
  targetPainter(ctx, { boardSize, target, targetPainterOptions });

  // Check for collission, in case we draw a red cross on top of it
  const [head, ...body] = snake;
  body.forEach(([x, y]) => {
    if (x === head[0] && y === head[1]) {
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#f00';
      ctx.beginPath();

      ctx.moveTo(x * segWidth, y * segHeight);
      ctx.lineTo((x + 1) * segWidth, (y + 1) * segHeight);
      ctx.stroke();

      ctx.moveTo((x + 1) * segWidth, y * segHeight);
      ctx.lineTo(x * segWidth, (y + 1) * segHeight);
      ctx.stroke();
    }
  });
};
