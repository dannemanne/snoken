import React, { useEffect, useRef, useState } from 'react';

import { buildBoard } from './buildBoard';
import { directionKeyPressed, directionPressed } from './directionPressed';
import { draw } from './draw';
import { createTarget, eatTarget, hasCollission, move } from './actions';
import { useAnimationFrame } from './useAnimationFrame';

const Snoken = (props) => {
  const {
    boardSize = [20, 20],
    ctrlRef = null,
    defaultSnake = [[5, 9], [4, 9], [3, 9]],
    onGameOver = null,
    onGameUpdate = null,
    onStarted = null,
    speedInitial = 0.001,
    speedIncrement = 0.001,
    start = true,
   } = props;

  const [snake, setSnake] = useState(defaultSnake)
  const [dir, setDir] = useState([1, 0]);
  const [buffer, setBuffer] = useState(0);
  const [speed, setSpeed] = useState(speedInitial);
  const [target, setTarget] = useState(createTarget(boardSize, snake));
  const [score, setScore] = useState(0);
  const [hasChangedDir, setHasChangedDir] = useState(false);
  const [gameRunning, setGameRunning] = useState(false);

  const canvasRef = useRef(null);
  const eventRef = useRef(null);

  useEffect(() => {
    const directionProps = { dir, setDir, speed, setSpeed, hasChangedDir, setHasChangedDir, speedIncrement, speedInitial };

    // If ctrlRef was passed to component, 
    if (ctrlRef) {
      ctrlRef.current = {
        left:   directionPressed.bind(null, directionProps, [-1, 0]),
        up:     directionPressed.bind(null, directionProps, [0, -1]),
        right:  directionPressed.bind(null, directionProps, [1, 0]),
        down:   directionPressed.bind(null, directionProps, [0, 1]),
      };
    }

    // Add event listener with directionProps bound, to handle key down events.
    eventRef.current = directionKeyPressed.bind(null, directionProps);
    document.addEventListener('keydown', eventRef.current);

    // Return function to remove event listener
    return () => document.removeEventListener('keydown', eventRef.current);
  }, [ctrlRef, dir, setDir, speed, setSpeed, hasChangedDir, setHasChangedDir, speedIncrement, speedInitial]);

  useEffect(() => {
    if (!gameRunning && start) {
      setScore(0);
      setSpeed(speedInitial);
      setDir([1, 0]);
      setSnake(defaultSnake);
      setTarget(createTarget(boardSize, defaultSnake));
      
      setGameRunning(true);
      onStarted && onStarted();
    }
  }, [start, gameRunning, onStarted]);

  useEffect(() => {
    onGameUpdate && onGameUpdate({ score, snake, speed: Math.round(speed * 1000) });
  }, [onGameUpdate, score, snake, speed])

  useAnimationFrame(timeDiffMilli => {
    if (!gameRunning) return;

    let lapsed = buffer + timeDiffMilli;
    let cycles = Math.floor(lapsed * speed);

    if (cycles > 0) {
      const newSnake = move(snake, dir, boardSize);
      setHasChangedDir(false);

      if (hasCollission(newSnake)) {
        setSnake(newSnake);
        setGameRunning(false);

        onGameOver && onGameOver({ score, speed, length: snake.length })

      } else if (eatTarget(newSnake, target)) {
        const grownSnake = [...newSnake, snake[snake.length-1]];
        setScore(score + 10);
        setSnake(grownSnake);
        setTarget(createTarget(boardSize, grownSnake));

      } else {
        setSnake(newSnake);
      }
      setBuffer(lapsed - cycles / speed);
    } else {
      setBuffer(lapsed);
    }
  });

  const boardRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const { width, height } = canvas;

    boardRef.current = buildBoard({ boardSize, height, width });
  }, [boardSize, canvasRef.current]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    draw(context, { boardCanvas: boardRef.current, boardSize, snake, target });
  }, [boardRef.current, snake, canvasRef, target]);

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={400}
    />
  );
};

export default Snoken;
