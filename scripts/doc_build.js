const spawn = require('cross-spawn');

const target = process.argv[2];

const alias = {
  playground: 'app_alegra_smile_playground',
  dev: '@alegradev/smile-ui-next',
};

const scope = alias[target] || target;

const build = async function () {
  try {
    if (!target) {
      spawn(
        'npx',
        [
          'lerna',
          'run',
          'story:build',
          '--scope',
          '@alegradev/smile-ui-next',
          '--stream',
          '--verbose',
        ],
        { stdio: 'inherit' }
      );
    } else {
      spawn('npx', ['lerna', 'run', 'story:build', '--scope', scope, '--stream', '--verbose'], {
        stdio: 'inherit',
      });
    }
  } catch (error) {
    console.error(error);
  }
};

build();
