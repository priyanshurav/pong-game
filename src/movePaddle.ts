import { PADDLE_HEIGHT } from './constants';
import gameStatus from './gameStatus';
import getWindowSize from './getWindowSize';

export default (paddleIndex: number, y: number): void => {
  if (!gameStatus.isGameStarted || gameStatus.isPaused) return;
  const { windowHeight } = getWindowSize();
  if (y < 0 || y + PADDLE_HEIGHT > windowHeight) return;
  gameStatus.paddles[paddleIndex].coords.y = y;
};
