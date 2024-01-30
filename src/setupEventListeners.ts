import { INSTRUCTIONS } from './constants';
import {
  handleKeyDown,
  handlePause,
  handleResume,
  handleTouchEnd,
  handleTouchMove,
  handleTouchStart,
} from './eventHandlers';
import gameStatus from './gameStatus';
import resetGame from './resetGame';
import showDialog from './showDialog';
import startGame from './startGame';

const resumeBtn = document.querySelector<HTMLButtonElement>('.resume-btn');
const pauseBtn = document.querySelector<HTMLButtonElement>('.pause-btn');
const soundBtn = document.querySelector<HTMLButtonElement>('.sound-btn');
const startBtn = document.querySelector<HTMLButtonElement>('.start-btn');
const instructionsBtn =
  document.querySelector<HTMLButtonElement>('.instructions-btn');

export default (): void => {
  if (!resumeBtn || !pauseBtn || !instructionsBtn || !soundBtn || !startBtn)
    return;
  window.addEventListener('resize', () => resetGame(true));
  window.addEventListener('keydown', handleKeyDown);
  window.addEventListener('touchstart', handleTouchStart);
  window.addEventListener('touchmove', handleTouchMove);
  window.addEventListener('touchend', handleTouchEnd);
  resumeBtn.addEventListener('click', handleResume);
  pauseBtn.addEventListener('click', handlePause);
  startBtn.addEventListener('click', startGame);
  soundBtn.addEventListener('click', () => {
    gameStatus.isMuted = !gameStatus.isMuted;
  });
  instructionsBtn.addEventListener('click', () => {
    handlePause();
    showDialog('Instructions', INSTRUCTIONS, { headingAlignment: 'center' });
  });
};
