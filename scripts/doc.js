const spawn = require('cross-spawn');

const target = process.argv[2];

const alias = {
  playground: 'app_alegra_smile_playground',
  dev: '@alegradev/smile-ui-next',
};

const scope = alias[target] || target;

if (!target) {
  spawn.sync('npx', ['lerna', 'run', 'story:dev', '--scope', alias.dev, '--stream', '--verbose'], {
    stdio: 'inherit',
  });
} else {
  spawn.sync('npx', ['lerna', 'run', 'story:dev', '--scope', scope, '--stream', '--verbose'], {
    stdio: 'inherit',
  });
}
