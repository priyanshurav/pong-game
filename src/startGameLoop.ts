import checkCollision from './checkCollision';
import { BALL_SIZE, BALL_SPEED } from './constants';
import gameStatus from './gameStatus';
import getWindowSize from './getWindowSize';
import resetGame from './resetGame';
import updateScene from './updateScene';

const { windowHeight, windowWidth } = getWindowSize();
const startScreen = document.querySelector<HTMLElement>('.start-screen');

export default function startGameLoop(): void {
  if (!startScreen) return;
  if (!gameStatus.isGameStarted || gameStatus.isPaused) return;
  if (gameStatus.ballX < 0) {
    gameStatus.player2Score++;
    startScreen.classList.remove('hide');
    return resetGame();
  }
  if (gameStatus.ballY < 0) gameStatus.ballYSpeed = BALL_SPEED;
  if (gameStatus.ballX + BALL_SIZE > windowWidth) {
    gameStatus.player1Score++;
    startScreen.classList.remove('hide');
    return resetGame();
  }
  if (gameStatus.ballY + BALL_SIZE > windowHeight)
    gameStatus.ballYSpeed = BALL_SPEED * -1;
  updateScene();
  gameStatus.ballX += gameStatus.ballXSpeed;
  gameStatus.ballY += gameStatus.ballYSpeed;
  checkCollision();
  requestAnimationFrame(startGameLoop);
}
