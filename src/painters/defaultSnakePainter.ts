import type { SnakePainter, SnakePainterOptions } from '../types';

const defaultSnakePainterOptions: SnakePainterOptions = {
  bodyColor: ['rgb(44, 69, 13)', 'rgb(95, 142, 37)'],
  eyeColor: 'rgb(255, 255, 255)',
  headColor: 'rgb(95, 142, 37)',
  tailColor: 'rgb(167, 113, 37)',
  toungueColor: 'rgb(187, 123, 119)',
};

export const defaultSnakePainter: SnakePainter = (
  ctx,
  { boardSize, snake, snakePainterOptions = defaultSnakePainterOptions },
) => {
  const { bodyColor, eyeColor, headColor, tailColor, toungueColor } = snakePainterOptions;
  // Determine the size of each segment
  const { width, height } = ctx.canvas;
  const [boardW, boardH] = boardSize;
  const segWidth = width / boardW;
  const segHeight = height / boardH;

  // Draw the snake
  const headStyle = headColor;
  const eyeStyle = eyeColor;
  const bodyStyles = Array.isArray(bodyColor) ? bodyColor : [bodyColor];
  const tailStyle = tailColor;
  const toungueStyle = toungueColor;

  const [head, ...body] = snake;

  // Start with the body
  let prev = head;
  body.forEach(([x, y], i) => {
    ctx.fillStyle = i === body.length - 1 ? tailStyle : bodyStyles[i % 2];
    let startX = x * segWidth + segWidth * 0.2;
    let startY = y * segHeight + segHeight * 0.2;
    let w = segWidth * 0.6;
    let h = segHeight * 0.6;

    if (prev[0] - x == 1) {
      // prev is to the right, just extend the width
      w += segWidth * 0.4;
    } else if (prev[0] - x == -1) {
      // prev is to the left, extend width and adjust x pos
      w += segWidth * 0.4;
      startX -= segWidth * 0.4;
    } else if (prev[1] - y == 1) {
      // prev is below, just extend the height
      h += segHeight * 0.4;
    } else if (prev[1] - y == -1) {
      // prev is above, extend height and adjust y pos
      h += segHeight * 0.4;
      startY -= segHeight * 0.4;
    }

    ctx.fillRect(startX, startY, w, h);

    prev = [x, y];
  });

  // End with the head to make it appear on top
  ctx.fillStyle = headStyle;
  const headMargin = 0.1;
  const startX = head[0] * segWidth + segWidth * headMargin;
  const startY = head[1] * segHeight + segWidth * headMargin;
  ctx.fillRect(startX, startY, segWidth * (1 - 2 * headMargin), segHeight * (1 - 2 * headMargin));

  // Eyes ...
  ctx.fillStyle = eyeStyle;
  const diffX = (head[0] - body[0][0]) % boardW;
  const diffY = (head[1] - body[0][1]) % boardH;

  if (diffX === 1 || diffX === -(boardW - 1)) {
    // Right
    ctx.fillRect(
      head[0] * segWidth + segWidth * 0.6,
      head[1] * segHeight + segHeight * 0.2,
      segWidth * 0.2,
      segHeight * 0.2,
    );
    ctx.fillRect(
      head[0] * segWidth + segWidth * 0.6,
      head[1] * segHeight + segHeight * 0.6,
      segWidth * 0.2,
      segHeight * 0.2,
    );
    if (Math.floor(Math.random() * 10) === 0) {
      ctx.fillStyle = toungueStyle;
      ctx.fillRect(
        head[0] * segWidth + segWidth * 0.9,
        head[1] * segHeight + segHeight * 0.45,
        segWidth * 0.1,
        segHeight * 0.1,
      );
    }
  } else if (diffX === -1 || diffX === boardW - 1) {
    // Left
    ctx.fillRect(
      head[0] * segWidth + segWidth * 0.2,
      head[1] * segHeight + segHeight * 0.2,
      segWidth * 0.2,
      segHeight * 0.2,
    );
    ctx.fillRect(
      head[0] * segWidth + segWidth * 0.2,
      head[1] * segHeight + segHeight * 0.6,
      segWidth * 0.2,
      segHeight * 0.2,
    );
    if (Math.floor(Math.random() * 10) === 0) {
      ctx.fillStyle = toungueStyle;
      ctx.fillRect(head[0] * segWidth, head[1] * segHeight + segHeight * 0.45, segWidth * 0.1, segHeight * 0.1);
    }
  } else if (diffY === 1 || diffY === -(boardH - 1)) {
    // Down
    ctx.fillRect(
      head[0] * segWidth + segWidth * 0.2,
      head[1] * segHeight + segHeight * 0.6,
      segWidth * 0.2,
      segHeight * 0.2,
    );
    ctx.fillRect(
      head[0] * segWidth + segWidth * 0.6,
      head[1] * segHeight + segHeight * 0.6,
      segWidth * 0.2,
      segHeight * 0.2,
    );
    if (Math.floor(Math.random() * 10) === 0) {
      ctx.fillStyle = toungueStyle;
      ctx.fillRect(
        head[0] * segWidth + segWidth * 0.45,
        head[1] * segHeight + segHeight * 0.9,
        segWidth * 0.1,
        segHeight * 0.1,
      );
    }
  } else if (diffY === -1 || diffY === boardH - 1) {
    // Up
    ctx.fillRect(
      head[0] * segWidth + segWidth * 0.6,
      head[1] * segHeight + segHeight * 0.2,
      segWidth * 0.2,
      segHeight * 0.2,
    );
    ctx.fillRect(
      head[0] * segWidth + segWidth * 0.2,
      head[1] * segHeight + segHeight * 0.2,
      segWidth * 0.2,
      segHeight * 0.2,
    );
    if (Math.floor(Math.random() * 10) === 0) {
      ctx.fillStyle = toungueStyle;
      ctx.fillRect(head[0] * segWidth + segWidth * 0.45, head[1] * segHeight, segWidth * 0.1, segHeight * 0.1);
    }
  }
};
