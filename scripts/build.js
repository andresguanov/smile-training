const spawn = require('cross-spawn');

const target = process.argv[2];

const alias = {
  smile: '@alegradev/smile-ui-next',
};

const scope = alias[target] || target;

if (!target) {
  spawn(
    'npx',
    ['lerna', 'run', 'build', '--scope', '@alegradev/smile-ui-next', '--stream', '--verbose'],
    { stdio: 'inherit' }
  );
} else {
  spawn('npx', ['lerna', 'run', 'build', '--scope', scope, '--stream', '--verbose'], {
    stdio: 'inherit',
  });
}
