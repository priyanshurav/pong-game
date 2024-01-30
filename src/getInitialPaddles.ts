import { cloneDeep } from 'lodash';
import { PADDLE_HEIGHT, PADDLE_WIDTH } from './constants';
import getWindowSize from './getWindowSize';
import { Paddle } from './types';

export default (): Paddle[] => {
  const { windowHeight, windowWidth } = getWindowSize();
  return cloneDeep([
    {
      coords: { x: 0, y: windowHeight / 2 - PADDLE_HEIGHT },
      upKey: 'W',
      downKey: 'S',
    },
    {
      coords: {
        x: windowWidth - PADDLE_WIDTH,
        y: windowHeight / 2 - PADDLE_HEIGHT,
      },
      upKey: 'ArrowUp',
      downKey: 'ArrowDown',
    },
  ]);
};
