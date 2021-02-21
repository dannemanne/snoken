export function buildBoard({ width, height, boardSize: [boardW, boardH] }) {
  const boardCanvas = document.createElement('canvas');
  boardCanvas.width = width;
  boardCanvas.height = height;

  const boardContext = boardCanvas.getContext('2d');

  const segWidth = width / boardW;
  const segHeight = height / boardH;

  // Draw board
  const checkeredStyles = ['#a2d149', '#aad751'];
  Array(boardW).fill(null).forEach((_, x) => {
    Array(boardH).fill(null).forEach((_, y) => {
      const idx = (x + y) % 2;
      boardContext.fillStyle = checkeredStyles[idx];

      boardContext.fillRect(x * segWidth, y * segHeight, segWidth, segHeight);
    });
  });

  return boardCanvas;
}
