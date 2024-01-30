import {
  BALL_SIZE,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
  TRANSITION_SPEED,
} from './constants';
import gameStatus from './gameStatus';
import setTransitionSpeed from './setTransitionSpeed';
import updateScene from './updateScene';

const ball = document.querySelector<HTMLDivElement>('.ball');
const paddles = document.querySelectorAll<HTMLDivElement>('.paddle');

export default (): void => {
  if (!ball) return;
  // prettier-ignore
  document.body.style.setProperty('--paddle-width', PADDLE_WIDTH + 'px')
  ball.style.width = BALL_SIZE + 'px';
  ball.style.height = BALL_SIZE + 'px';
  paddles.forEach((paddle, index) => {
    paddle.style.top = gameStatus.paddles[index].coords.y + 'px';
    paddle.style.left = gameStatus.paddles[index].coords.x + 'px';
    paddle.style.height = PADDLE_HEIGHT + 'px';
    paddle.style.width = PADDLE_WIDTH + 'px';
  });
  updateScene();
  setTransitionSpeed(TRANSITION_SPEED);
};
