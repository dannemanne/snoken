const KEY_DIRECTIONS = {
  'ArrowLeft':  [-1, 0],
  'ArrowUp':    [0, -1],
  'ArrowRight': [1, 0],
  'ArrowDown':  [0, 1],
  'KeyA':       [-1, 0],
  'KeyW':       [0, -1],
  'KeyD':       [1, 0],
  'KeyS':       [0, 1],
};

export const directionKeyPressed = (props, e) => {
  const newDir = KEY_DIRECTIONS[e.code];

  newDir && directionPressed(props, newDir);
}

export const directionPressed = (props, newDir) => {
  const {
    dir,
    hasChangedDir,
    setDir,
    setHasChangedDir,
    setSpeed,
    speed,
    speedIncrement,
    speedInitial,
  } = props;

  const [x,y] = dir;
  const cx = x + newDir[0];
  const cy = y + newDir[1];

  if (cx === 0 && cy === 0) {
    // Pressed opposite direction key. No turn but slow down
    setSpeed(Math.max(speed - speedIncrement, speedInitial));

  } else if (Math.abs(cx) === 2 || Math.abs(cy) === 2) {
    // Pressed same direction key. No turn but speed up
    setSpeed(speed + speedIncrement);

  } else if (!hasChangedDir) {
    setDir(newDir);
    setHasChangedDir(true);
  }
};
