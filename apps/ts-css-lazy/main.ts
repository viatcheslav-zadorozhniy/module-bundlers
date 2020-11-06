import { Seq } from 'immutable';
import { unusedObject, sum } from './utils';
import './style.css';

const oddSquares = Seq([ 1, 2, 3, 4, 5, 6, 7, 8 ])
  .filter(item => {
    console.log(item);
    return item % 2 !== 0;
  })
  .map(item => {
    console.log(item);
    return item * item;
  });

oddSquares.get(1);

console.log(sum(3, 3));

document.body.addEventListener(
  'click',
  () => import('./lazy.module').then(x => console.log(x.default))
);
