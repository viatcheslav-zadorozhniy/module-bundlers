import { Seq } from 'immutable';
import { unusedObject, sum } from './utils';
import './style.css';

const oddSquares = Seq([ 1, 2, 3, 4, 5, 6, 7, 8 ])
  .filter(x => {
    console.log(x);
    return x % 2 !== 0;
  })
  .map(x => {
    console.log(x);
    return x * x;
  });

console.log(oddSquares);
oddSquares.get(1); // 9

console.log(sum(3, 3));

const lazyLoad = () => import('./lazy.module').then(x => console.log(x));

document.body.addEventListener('click', lazyLoad);
