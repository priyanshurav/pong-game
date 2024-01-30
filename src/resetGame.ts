import { BALL_SIZE, BALL_SPEED, TRANSITION_SPEED } from './constants';
import gameStatus from './gameStatus';
import getInitialPaddles from './getInitialPaddles';
import getWindowSize from './getWindowSize';
import setTransitionSpeed from './setTransitionSpeed';
import updateScene from './updateScene';
import setAccurateTimeout from 'set-accurate-timeout';

export default (isResize?: boolean): void => {
  if (!gameStatus.isGameStarted && !isResize) return;
  const { windowHeight, windowWidth } = getWindowSize();
  setTransitionSpeed(0);
  gameStatus.isGameStarted = false;
  gameStatus.ballX = windowWidth / 2 - BALL_SIZE;
  gameStatus.ballY = windowHeight / 2 - BALL_SIZE;
  gameStatus.paddles = getInitialPaddles();
  gameStatus.ballXSpeed = Math.random() > 0.5 ? BALL_SPEED : BALL_SPEED * -1;
  gameStatus.ballYSpeed = Math.random() > 0.5 ? BALL_SPEED : BALL_SPEED * -1;
  // prettier-ignore
  setAccurateTimeout(() => setTransitionSpeed(TRANSITION_SPEED), TRANSITION_SPEED);
  updateScene();
};
