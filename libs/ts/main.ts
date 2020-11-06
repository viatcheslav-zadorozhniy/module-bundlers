import { a } from './a';
import { b } from './b';
import { c } from './c';

console.log(Object.assign({}, a, b, c));
document.addEventListener('click', () => console.log(Object.assign({}, a, b, c)));