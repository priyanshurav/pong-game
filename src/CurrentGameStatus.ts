import { BALL_SIZE, BALL_SPEED, LOCAL_STORAGE_IS_MUTED_KEY } from './constants';
import getInitialPaddles from './getInitialPaddles';
import getWindowSize from './getWindowSize';
import { Paddle } from './types';
import updateScene from './updateScene';

const { windowHeight, windowWidth } = getWindowSize();
const soundBtn = document.querySelector<HTMLButtonElement>('.sound-btn');

export default class CurrentGameStatus {
  ballXSpeed = Math.random() > 0.5 ? BALL_SPEED : BALL_SPEED * -1;
  ballYSpeed = Math.random() > 0.5 ? BALL_SPEED : BALL_SPEED * -1;
  isGameStarted = false;
  isPaused = false;
  paddles: Paddle[] = getInitialPaddles();
  isFirstGameStart = true;
  private _player1Score = 0;
  private _player2Score = 0;
  private _ballX = windowWidth / 2 - BALL_SIZE;
  private _ballY = windowHeight / 2 - BALL_SIZE;
  private _isMuted = this.getMutedStateFromLocalStorage();

  get ballX(): number {
    return this._ballX;
  }
  set ballX(newBallX: number) {
    this._ballX = newBallX;
    updateScene();
  }
  get ballY(): number {
    return this._ballY;
  }
  set ballY(newBallY: number) {
    this._ballY = newBallY;
    updateScene();
  }
  get player1Score(): number {
    return this._player1Score;
  }
  set player1Score(newPlayer1Score: number) {
    this._player1Score = newPlayer1Score;
    updateScene();
  }
  get player2Score(): number {
    return this._player2Score;
  }
  set player2Score(newPlayer2Score: number) {
    this._player2Score = newPlayer2Score;
    updateScene();
  }
  get isMuted(): boolean {
    return this._isMuted;
  }
  set isMuted(newValue: boolean) {
    this._isMuted = newValue;
    if (newValue) soundBtn?.classList.add('mute');
    else soundBtn?.classList.remove('mute');
    localStorage.setItem(LOCAL_STORAGE_IS_MUTED_KEY, JSON.stringify(newValue));
  }
  private getMutedStateFromLocalStorage(): boolean {
    const value = localStorage.getItem(LOCAL_STORAGE_IS_MUTED_KEY);
    if (!value) {
      localStorage.setItem(LOCAL_STORAGE_IS_MUTED_KEY, JSON.stringify(false));
      return false;
    }
    const parsedValue = JSON.parse(value) as boolean;
    this.isMuted = parsedValue;
    return parsedValue;
  }
}
