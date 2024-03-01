import type { BoardPainter, BoardPainterOptions, BoardSize } from './types';

const DEFAULT_COLORS = ['#a2d149', '#aad751'];

const defaultBoardPainter: BoardPainter = ({ x, y, boardPainterOptions }) => {
  const colors = boardPainterOptions?.colors || DEFAULT_COLORS;

  const fillStyle = (() => {
    if (!Array.isArray(colors)) return colors;

    const idx = (x + y) % colors.length;
    if (!Array.isArray(colors[idx])) return colors[idx] as string;

    return colors[y][x] || DEFAULT_COLORS[0];
  })();

  return { fillStyle, strokeStyle: 'none' };
};

type BuildBoard = (params: {
  boardPainter?: BoardPainter;
  boardPainterOptions?: BoardPainterOptions;
  boardSize: BoardSize;
  height: number;
  width: number;
}) => HTMLCanvasElement;
export const buildBoard: BuildBoard = params => {
  const { boardPainter = defaultBoardPainter, boardPainterOptions, boardSize, width, height } = params;
  const [boardW, boardH] = boardSize;

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

  Array(boardW * boardH)
    .fill(null)
    .forEach((_, i) => {
      const x = i % boardW;
      const y = Math.floor(i / boardW);

      const { fillStyle, strokeStyle } = boardPainter({ x, y, boardPainterOptions, boardSize });
      boardContext.fillStyle = fillStyle;
      boardContext.strokeStyle = strokeStyle;

      boardContext.fillRect(x * segWidth, y * segHeight, segWidth, segHeight);
    });

  return boardCanvas;
};
