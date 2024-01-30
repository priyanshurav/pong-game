import gameStatus from './gameStatus';

const ball = document.querySelector<HTMLDivElement>('.ball');
const paddles = document.querySelectorAll<HTMLDivElement>('.paddle');
const player1Score = document.querySelector<HTMLSpanElement>('#player-1-score');
const player2Score = document.querySelector<HTMLSpanElement>('#player-2-score');

export default (): void => {
  if (!ball || !player1Score || !player2Score) return;
  ball.style.left = gameStatus.ballX + 'px';
  ball.style.top = gameStatus.ballY + 'px';
  player1Score.innerText = gameStatus.player1Score.toString();
  player2Score.innerText = gameStatus.player2Score.toString();
  paddles.forEach((paddle, index) => {
    paddle.style.top = gameStatus.paddles[index].coords.y + 'px';
    paddle.style.left = gameStatus.paddles[index].coords.x + 'px';
  });
};
