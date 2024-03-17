import type { TargetPainter, TargetPainterOptions } from '../types';

const defaultTargetPainterOptions: TargetPainterOptions = {
  fillColor: 'rgb(232, 72, 29)',
  strokeColor: 'rgb(0,0,0)',
};

export const defaultTargetPainter: TargetPainter = (
  ctx,
  { boardSize, target, targetPainterOptions = defaultTargetPainterOptions },
) => {
  const { fillColor, strokeColor } = targetPainterOptions;
  const [boardW, boardH] = boardSize;
  const [targetX, targetY] = target;

  const { width, height } = ctx.canvas;
  const segWidth = width / boardW;
  const segHeight = height / boardH;

  ctx.fillStyle = fillColor;
  ctx.fillRect(
    targetX * segWidth + segWidth / 8,
    targetY * segHeight + segWidth / 8,
    segWidth * 0.75,
    segHeight * 0.75,
  );

  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 1;
  ctx.strokeRect(
    targetX * segWidth + segWidth / 8,
    targetY * segHeight + segWidth / 8,
    segWidth * 0.75,
    segHeight * 0.75,
  );
};
