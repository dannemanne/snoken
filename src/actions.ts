import type { BoardSize, Direction, Position, Snake } from './types';

type CreateTarget = (boardSize: BoardSize, snake: Snake) => Position;
export const createTarget: CreateTarget = (boardSize, snake) => {
  const [boardW, boardH] = boardSize;

  const target: Position = [Math.floor(Math.random() * boardW), Math.floor(Math.random() * boardH)];

  const collission = snake.some(([x, y]) => x === target[0] && y === target[1]);

  if (collission) {
    return createTarget(boardSize, snake);
  } else {
    return target;
  }
};

type EatTarget = (snake: Snake, target: Position) => boolean;
export const eatTarget: EatTarget = (snake, target) => {
  return snake[0][0] == target[0] && snake[0][1] == target[1];
};

type HasCollission = (snake: Snake) => boolean;
export const hasCollission: HasCollission = snake => {
  const [head, ...body] = snake;

  return body.some(([x, y]) => x === head[0] && y === head[1]);
};

type Move = (snake: Snake, dir: Direction, boardSize: BoardSize) => Snake;
export const move: Move = (snake, dir, boardSize) => {
  const [boardW, boardH] = boardSize;
  const [firstX, firstY] = snake[0];
  const [dirX, dirY] = dir;

  let nextX = firstX + dirX;
  if (nextX < 0) nextX = boardW - 1;
  else if (nextX >= boardW) nextX = 0;

  let nextY = firstY + dirY;
  if (nextY < 0) nextY = boardH - 1;
  else if (nextY >= boardH) nextY = 0;

  const body = snake.slice(0, snake.length - 1);
  return [[nextX, nextY], ...body];
};
