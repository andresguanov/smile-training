const spawn = require('cross-spawn');

const target = process.argv[2];

const alias = {
  playground: 'app_alegra_smile_playground',
  dev: '@alegradev/smile-ui-next',
};

const scope = alias[target] || target;

if (!target) {
  spawn(
    'npx',
    ['lerna', 'run', 'story:dev', '--scope', '@alegradev/smile-ui-next', '--stream', '--verbose'],
    { stdio: 'inherit' }
  );
} else {
  spawn('npx', ['lerna', 'run', 'story:dev', '--scope', scope, '--stream', '--verbose'], {
    stdio: 'inherit',
  });
}
