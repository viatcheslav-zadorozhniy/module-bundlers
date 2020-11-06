const a = require('./a');
const b = require('./b');
const c = require('./c');

console.log(Object.assign({}, a, b, c));
document.body.addEventListener('click', () => console.log(Object.assign({}, a, b, c)));