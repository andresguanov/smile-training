function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`
    }
    return `rgb(var(${variableName}))`
  }
}

const theme = colors => {
  return {
    colors: {
      'sm-primary-50': withOpacity('--sm-color-primary-50'),
      'sm-primary-100': withOpacity('--sm-color-primary-100'),
      'sm-primary-200': withOpacity('--sm-color-primary-200'),
      'sm-primary-300': withOpacity('--sm-color-primary-300'),
      'sm-primary-400': withOpacity('--sm-color-primary-400'),
      'sm-primary-500': withOpacity('--sm-color-primary-500'),
      'sm-primary-600': withOpacity('--sm-color-primary-600'),
      'sm-primary-700': withOpacity('--sm-color-primary-700'),
      'sm-primary-800': withOpacity('--sm-color-primary-800'),
      'sm-primary-900': withOpacity('--sm-color-primary-900'),

      'persian-green': '#00B19D',
      'eagle-green': '#00535E',
      'weldon-blue': '#809BB6',
      'tufts-blue': '#4A90E2',
      'columbia-blue': '#BDE3DC',
      pear: '#BFCD31',
      'naples-yellow': '#F9D863',
      'deep-safron': '#F99D36',
      'fire-opal': '#E85E42',
      // INFO: colores de alert stack actuales
      feijoa: '#AAD572',
      ceramic: '#FAFFF5',
      kournikova: '#FFD772',
      'orange-white': '#FEFAEA',
      salmon: '#ff8b73',
      chablis: '#fff2f3',
      'havelock-blue': '#4a90e2',
      'twilight-blue': '#eefcff',
      //Colores smile vue 2
      'sm-grey2': '#f7f7f7',
      'sm-brand4': '#bfcd31',
      'sm-grey6': '#707070',
      'sm-grey5': '#b3b3b3',
      'sm-grey9': '#1a1a1a',
      'sm-brand3': '#4a90e2',
      'sm-grey1': '#fafafa',
      'sm-black': '#000000',
      'sm-brand2': '#00535e',
      'sm-greyblue2': '#f0f2fa',
      'sm-white': '#ffffff',
      'sm-grey8': '#262626',
      'sm-grey7': '#474747',
      'sm-brand1': '#00b19d',
      'sm-grey4': '#cccccc',
      'sm-greyblue5': '#a3adc2',
      'sm-greyblue8': '#29303d',
      'sm-greyblue9': '#1f242e',
      'sm-brand9': '#fff2f3',
      'sm-grey3': '#ededed',
      'sm-greyblue1': '#f4f5fb',
      'sm-brand5': '#f9d863',
      'sm-brand6': '#f99d36',
      'sm-greyblue3': '#e4e9f6',
      'sm-greyblue6': '#8592ad',
      'sm-greyblue4': '#c2c9d6',
      'sm-greyblue7': '#47536b',
      'sm-brand7': '#e85e42',
      'sm-brand8': '#fefaea',
      ...colors,
    },
    fontFamily: {
      sans: ['Inter', 'Roboto', 'sans-serif'],
      // sans: ["Mulish", "Roboto", "sans-serif"]
    },
    extend: {
      strokeWidth: {
        8: '8px',
      },
      dropShadow: {
        'card-1': '0.063rem 0.126rem 0.313rem rgba(0, 0, 0, 0.1)',
        'card-2': '0 0.188rem 0.75rem rgba(0, 0, 0, 0.15)',
        'card-3': '0 0.5rem 1.25rem rgba(0, 0, 0, 0.25)',
        'card-4': '0 0.625rem 2.125rem rgba(0, 0, 0, 0.25)',
      },
      animation: {
        // "pop-in": "pop-in 0.8s ease",
        pulse: 'pulse 1.5s ease infinite',
        round: 'round 0.8s linear infinite',
      },
      keyframes: {
        round: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg)',
          },
        },
        pulse: {
          '0%, 100%': {
            'background-position': '100% 50%',
          },
          '50%': {
            'background-position': '0% 51%',
          },
        },
      },
    },
  }
}

module.exports = {
  theme,
}
