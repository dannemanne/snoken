import type { ActionTextPainter, ActionTextPainterOptions } from '../types';

export const defaultHideAfterMs = 1000;

const defaultActionTextPainterOptions: ActionTextPainterOptions = {
  hideAfterMs: defaultHideAfterMs,
};

export const defaultActionTextPainter: ActionTextPainter = (
  ctx,
  { actionTextPainterOptions = defaultActionTextPainterOptions, actionText, boardSize },
) => {
  const { text, x, y, timestamp } = actionText;
  const { hideAfterMs } = actionTextPainterOptions;

  // Determine the size of each segment
  const { width, height } = ctx.canvas;
  const [boardW, boardH] = boardSize;
  const segWidth = width / boardW;
  const segHeight = height / boardH;

  // Check hide progress
  const timeDiff = Date.now() - timestamp;
  const fadeProgress = 1 - Math.max(Math.min(1, timeDiff / hideAfterMs), 0);
  const fadeYPos = segHeight * 0.2 * fadeProgress;

  ctx.fillStyle = `rgba(15, 10, 47, ${fadeProgress})`;
  ctx.beginPath();
  ctx.roundRect(x * segWidth + segWidth * 0.1, y * segHeight + fadeYPos, segWidth * 0.8, segHeight * 0.5, 4);
  ctx.fill();

  ctx.font = 'bold 12px Arial';
  ctx.fillStyle = `rgba(255, 255, 255, ${fadeProgress})`;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText(text, x * segWidth + 0.5 * segWidth, y * segHeight + 0.3 * segHeight + fadeYPos, segWidth * 0.8);
};
