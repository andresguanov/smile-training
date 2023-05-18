const spawn = require('cross-spawn');

const alias = {
  playground: 'app_alegra_smile_playground',
  smile: '@alegradev/smile-ui-next',
};

const scriptArgs = ['lerna', 'run', 'link', '--scope', alias['smile'], '--stream', '--verbose'];

const script2Args = [
  'lerna',
  'run',
  'link:smile',
  '--scope',
  alias['playground'],
  '--stream',
  '--verbose',
];

const isCi = process.env.CI !== undefined;

if (!isCi) {
  require('husky').install();
}

const prepare = async function () {
  try {
    await spawn('npx', scriptArgs, {
      stdio: 'inherit',
    });
    await spawn('npx', script2Args, {
      stdio: 'inherit',
    });
  } catch (error) {
    console.error(error);
  }
};

prepare();
