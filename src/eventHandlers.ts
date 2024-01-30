import { PADDLE_SPEED, INSTRUCTIONS, PADDLE_HEIGHT } from './constants';
import gameStatus from './gameStatus';
import getWindowSize from './getWindowSize';
import movePaddle from './movePaddle';
import showDialog from './showDialog';
import startGame from './startGame';
import startGameLoop from './startGameLoop';
import { Coords } from './types';

// This variable holds the ball speeds before the game pause, so that the game can be resumed later.
let ballSpeeds: Coords = { x: 0, y: 0 };

// This variable tells that whether the paddles can be moved with touch.
let isTouchPaddleMoveEnabled = false;

const pauseScreen = document.querySelector<HTMLElement>('.pause-screen');

export const pauseGame = (): void => {
  gameStatus.isPaused = true;
  ballSpeeds = { x: gameStatus.ballXSpeed, y: gameStatus.ballYSpeed };
  gameStatus.ballXSpeed = 0;
  gameStatus.ballYSpeed = 0;
};
export const handlePause = (): void => {
  if (document.getElementById('dialog')) return;
  if (gameStatus.isPaused || !pauseScreen) return;
  pauseScreen.classList.remove('hide');
  pauseGame();
};

export const resumeGame = (): void => {
  gameStatus.isPaused = false;
  gameStatus.ballXSpeed = ballSpeeds.x;
  gameStatus.ballYSpeed = ballSpeeds.y;
  ballSpeeds = { x: 0, y: 0 };
  startGameLoop();
};

export const handleResume = (): void => {
  if (!gameStatus.isPaused || !pauseScreen) return;
  pauseScreen.classList.add('hide');
  resumeGame();
};

export const handleTouchStart = (): void => {
  isTouchPaddleMoveEnabled = true;
};

export const handleTouchMove = (e: TouchEvent): void => {
  if (!isTouchPaddleMoveEnabled) return;
  const x = e.changedTouches[0].clientX;
  const y = e.changedTouches[0].clientY - PADDLE_HEIGHT / 2;
  const { windowWidth } = getWindowSize();
  const paddleIndex = x < windowWidth / 2 ? 0 : 1;
  movePaddle(paddleIndex, y);
};

export const handleTouchEnd = (): void => {
  isTouchPaddleMoveEnabled = false;
};

export const handleKeyDown = (e: KeyboardEvent): void => {
  const SPACE = ' ';
  const key = e.key.toUpperCase();
  if (key === SPACE && !gameStatus.isGameStarted && !gameStatus.isPaused)
    startGame();
  else if (key === 'P') handlePause();
  else if (key === 'I') {
    pauseGame();
    showDialog('Instructions', INSTRUCTIONS, { headingAlignment: 'center' });
  } else if (key === 'K') gameStatus.isMuted = true;
  else if (key === 'D') gameStatus.isMuted = false;
  gameStatus.paddles.forEach((paddle, index) => {
    const paddleYCoord = gameStatus.paddles[index].coords.y;
    if (key === paddle.upKey.toUpperCase())
      movePaddle(index, paddleYCoord - PADDLE_SPEED);
    else if (key === paddle.downKey.toUpperCase())
      movePaddle(index, paddleYCoord + PADDLE_SPEED);
  });
};
