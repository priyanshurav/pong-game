export default (speed: number): void => {
  document.body.style.setProperty('--transition-speed', `${speed}ms`);
};
