import { WindowSize } from './types';

export default (): WindowSize => {
  const height = document.documentElement.clientHeight;
  const width = document.documentElement.clientWidth;
  return { windowHeight: height, windowWidth: width };
};
