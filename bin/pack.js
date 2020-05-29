const cwd = process.cwd();
const packge = require('../package.json')
const { mkdir, cp, rm, exec, echo, cd } = require('shelljs');
const { resolve } = require('path');

cd(resolve(__dirname, 'dist'));
echo('clean');
rm('-rf', ' ');
rm('-rf', '*.gz');


echo('install rely on...');
exec(
  `cd dist && cnpm install --production`
);

echo('start packing...');
exec(`tar czf ${packge.name}.tar.gz dist`);
echo(`done build ${packge.name}.tar.gz`);
