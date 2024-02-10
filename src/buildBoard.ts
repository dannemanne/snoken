import type { BoardSize } from './types';

const checkeredStyles = ['#a2d149', '#aad751'];

type BuildBoard = (params: { boardSize: BoardSize; height: number; width: number }) => HTMLCanvasElement;
export const buildBoard: BuildBoard = params => {
  const {
    width,
    height,
    boardSize: [boardW, boardH],
  } = params;

  const segWidth = width / boardW;
  const segHeight = height / boardH;

  const boardCanvas = document.createElement('canvas');
  boardCanvas.width = width;
  boardCanvas.height = height;

  const boardContext = boardCanvas.getContext('2d');
  if (!boardContext) {
    return boardCanvas;
  }

  // Draw board

  Array(boardW)
    .fill(null)
    .forEach((_, x) => {
      Array(boardH)
        .fill(null)
        .forEach((_, y) => {
          const idx = (x + y) % 2;
          boardContext.fillStyle = checkeredStyles[idx];

          boardContext.fillRect(x * segWidth, y * segHeight, segWidth, segHeight);
        });
    });

  return boardCanvas;
};
