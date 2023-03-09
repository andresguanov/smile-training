const spawn = require('cross-spawn');

const alias = {
  playground: 'app_alegra_smile_playground',
  smile: '@alegradev/smile-ui-next',
};

const scriptArgs = ['lerna', 'run', 'build', '--scope', alias['smile'], '--stream', '--verbose'];

const publish = async function () {
  try {
    await spawn('npx', scriptArgs, {
      stdio: 'inherit',
    });
    await spawn('npx', ['lerna', 'publish', '--scope', alias['smile'], '--stream', '--verbose'], {
      stdio: 'inherit',
    });
  } catch (error) {
    console.error(error);
  }
};

publish();
