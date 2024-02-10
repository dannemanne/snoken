import type { BoardSize, Position, Snake } from './types';

type Draw = (
  ctx: CanvasRenderingContext2D,
  params: {
    snake: Snake;
    boardCanvas: HTMLCanvasElement;
    boardSize: BoardSize;
    target: Position;
  },
) => void;
export const draw: Draw = (ctx, params) => {
  const { snake, boardCanvas, boardSize, target } = params;

  const { width, height } = ctx.canvas;
  const [boardW, boardH] = boardSize;
  const [targetX, targetY] = target;

  const segWidth = width / boardW;
  const segHeight = height / boardH;

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(boardCanvas, 0, 0);

  // Draw the snake
  const bodyStyles = ['rgb(44, 69, 13)', 'rgb(95, 142, 37)'];
  const tailStyle = 'rgb(167, 113, 37)';
  const [head, ...body] = snake;

  // Start with the head
  ctx.fillStyle = bodyStyles[1];
  const headMargin = 0.1;
  const startX = head[0] * segWidth + segWidth * headMargin;
  const startY = head[1] * segHeight + segWidth * headMargin;
  ctx.fillRect(startX, startY, segWidth * (1 - 2 * headMargin), segHeight * (1 - 2 * headMargin));

  // Eyes ...
  ctx.fillStyle = '#fff';
  const diffX = (head[0] - body[0][0]) % boardW;
  const diffY = (head[1] - body[0][1]) % boardH;

  if (diffX === 1 || diffX === -19) {
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
      ctx.fillStyle = 'rgb(187, 123, 119)';
      ctx.fillRect(
        head[0] * segWidth + segWidth * 0.9,
        head[1] * segHeight + segHeight * 0.45,
        segWidth * 0.1,
        segHeight * 0.1,
      );
    }
  } else if (diffX === -1 || diffX === 19) {
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
      ctx.fillStyle = 'rgb(187, 123, 119)';
      ctx.fillRect(head[0] * segWidth, head[1] * segHeight + segHeight * 0.45, segWidth * 0.1, segHeight * 0.1);
    }
  } else if (diffY === 1 || diffY === -19) {
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
      ctx.fillStyle = 'rgb(187, 123, 119)';
      ctx.fillRect(
        head[0] * segWidth + segWidth * 0.45,
        head[1] * segHeight + segHeight * 0.9,
        segWidth * 0.1,
        segHeight * 0.1,
      );
    }
  } else if (diffY === -1 || diffY === 19) {
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
      ctx.fillStyle = 'rgb(187, 123, 119)';
      ctx.fillRect(head[0] * segWidth + segWidth * 0.45, head[1] * segHeight, segWidth * 0.1, segHeight * 0.1);
    }
  }

  // ctx.fillRect(head[0] * segWidth + segWidth * 0.1, head[1] * segHeight + segWidth * 0.1, segWidth * 0.8, segHeight * 0.8)

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

    // Check for collission, in case we draw a red cross on top of it
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

    prev = [x, y];
  });

  ctx.fillStyle = '#e8481d';
  ctx.fillRect(
    targetX * segWidth + segWidth / 8,
    targetY * segHeight + segWidth / 8,
    segWidth * 0.75,
    segHeight * 0.75,
  );
};
