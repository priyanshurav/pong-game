import gameStatus from './gameStatus';
import showSnackbar from './showSnackbar';
import startGameLoop from './startGameLoop';

const startScreen = document.querySelector<HTMLElement>('.start-screen');

export default (): void => {
  if (!startScreen || gameStatus.isGameStarted) return;
  gameStatus.isGameStarted = true;
  startScreen.classList.add('hide');
  if (gameStatus.isFirstGameStart)
    showSnackbar(`Press 'I' to view instructions.`);
  gameStatus.isFirstGameStart = false;
  startGameLoop();
};
