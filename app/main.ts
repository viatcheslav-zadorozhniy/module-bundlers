import { firstValueFrom, fromEvent } from 'rxjs';
import { unused } from './unused';

import './style.scss';

const textarea = document.querySelector<HTMLTextAreaElement>('#textarea');

fromEvent(document.querySelector('#button'), 'click').subscribe(async () => {
  const lazyModule = await import('./lazy');
  textarea.value = await firstValueFrom(lazyModule.greeting$);
});
