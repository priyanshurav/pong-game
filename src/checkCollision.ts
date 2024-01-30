import {
  BALL_SIZE,
  BALL_SPEED,
  PADDLE_HEIGHT,
  PADDLE_WIDTH,
} from './constants';
import gameStatus from './gameStatus';
import beep from './assets/audio/beep.mp3';

function checkFirstPaddleCollision(): boolean {
  const paddle = gameStatus.paddles[0];
  return (
    gameStatus.ballX < paddle.coords.x + PADDLE_WIDTH &&
    gameStatus.ballY >= paddle.coords.y &&
    gameStatus.ballY - BALL_SIZE < paddle.coords.y + PADDLE_HEIGHT
  );
}

function checkSecondPaddleCollision(): boolean {
  const paddle = gameStatus.paddles[1];
  return (
    gameStatus.ballX + BALL_SIZE > paddle.coords.x &&
    gameStatus.ballY >= paddle.coords.y &&
    gameStatus.ballY - BALL_SIZE < paddle.coords.y + PADDLE_HEIGHT
  );
}

const audio = new Audio(beep);

export default (): void => {
  if (checkFirstPaddleCollision()) {
    gameStatus.ballXSpeed = BALL_SPEED;
    gameStatus.ballYSpeed = Math.random() > 0.5 ? BALL_SPEED : BALL_SPEED * -1;
    if (!gameStatus.isMuted) audio.play();
  } else if (checkSecondPaddleCollision()) {
    gameStatus.ballXSpeed = BALL_SPEED * -1;
    gameStatus.ballYSpeed = Math.random() > 0.5 ? BALL_SPEED : BALL_SPEED * -1;
    if (!gameStatus.isMuted) audio.play();
  }
};
