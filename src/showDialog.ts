import setAccurateTimeout from 'set-accurate-timeout';
import { resumeGame } from './eventHandlers';

interface Options {
  headingAlignment?: 'left' | 'right' | 'center';
  dialogBG?: string;
  fontColor?: string;
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const defaultOptions: Readonly<Options> = {
  fontColor: '#fff',
  headingAlignment: 'left',
  dialogBG: '#333',
  headingLevel: 'h2',
};

const ANIMATION_SPEED = 200;

export default function (
  heading: string,
  content: string,
  options: Options = defaultOptions,
): void {
  if (document.getElementById('dialog')) return;
  // prettier-ignore
  document.body.style.setProperty('--dialog-animation-speed', ANIMATION_SPEED + 'ms')
  options = { ...defaultOptions, ...options };
  const { fontColor, headingAlignment, headingLevel, dialogBG } =
    options as Required<Options>;
  const dialog = document.createElement('dialog');
  dialog.id = 'dialog';
  dialog.classList.add('dialog');
  dialog.style.backgroundColor = dialogBG;
  const headingEl = document.createElement(headingLevel);
  headingEl.classList.add('dialog-heading');
  headingEl.innerText = heading;
  headingEl.style.textAlign = headingAlignment;
  headingEl.style.color = fontColor;
  dialog.appendChild(headingEl);
  const contentEl = document.createElement('div');
  contentEl.classList.add('dialog-content');
  contentEl.innerText = content;
  contentEl.style.color = fontColor;
  const dialogCloseBtn = document.createElement('button');
  dialogCloseBtn.classList.add('dialog-close-btn');
  dialogCloseBtn.innerHTML = '&times;';
  dialog.appendChild(dialogCloseBtn);
  dialog.appendChild(contentEl);
  document.body.appendChild(dialog);
  dialog.showModal();
  dialogCloseBtn.addEventListener('click', () => dialog.classList.add('close'));
  const handleAnimationEnd = () => {
    dialog.close();
    dialog.classList.remove('close');
    dialog.removeEventListener('animationend', handleAnimationEnd);
    dialog.remove();
    if (heading === 'Instructions') resumeGame();
  };
  setAccurateTimeout(
    () => dialog.addEventListener('animationend', handleAnimationEnd),
    ANIMATION_SPEED + 50,
  );
  dialogCloseBtn.blur();
}
