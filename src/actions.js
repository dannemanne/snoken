export const createTarget = (boardSize, snake) => {
  const [boardW, boardH] = boardSize;
  
  const target = [
    Math.floor(Math.random() * boardW),
    Math.floor(Math.random() * boardH),
  ];

  const collission = snake.some(([x,y]) => x === target[0] && y === target[1]);

  if (collission) {
    return createTarget(boardSize, snake);
  } else {
    return target;
  }
};

export const eatTarget = (snake, target) => {
  return snake[0][0] == target[0] && snake[0][1] == target[1];
};


export const hasCollission = (snake) => {
  const [head, ...body] = snake;

  return body.some(([x,y]) => x === head[0] && y === head[1]);
};

export const move = (snake, dir, boardSize) => {
  const [boardW, boardH] = boardSize;
  const [firstX, firstY] = snake[0];
  const [dirX, dirY] = dir;

  let nextX = firstX + dirX;
  if (nextX < 0) nextX = boardW-1;
  else if (nextX >= boardW) nextX = 0;

  let nextY = firstY + dirY;
  if (nextY < 0) nextY = boardH-1;
  else if (nextY >= boardH) nextY = 0;

  const body = snake.slice(0, snake.length-1);
  return [ [nextX, nextY], ...body ];
};
