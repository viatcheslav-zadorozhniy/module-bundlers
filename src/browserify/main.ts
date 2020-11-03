const utils = require('./utils.ts');
require('../style.css');

interface User {
  name: string;
  email: string;
}

const user: User = {
  name: 'Viatcheslav',
  email: 'test@test.com'
};

console.log(
  `User name - ${user.name}\n`,
  `User email - ${user.email}`,
);
console.log(utils.sum(3, 3));
