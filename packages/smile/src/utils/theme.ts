import colors from 'tailwindcss/colors';

function withOpacity(variableName: string) {
  return ({ opacityValue }: { opacityValue: string }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

function convertHexToRgba(hex: string, opacity: number) {
  const hexValue = hex.replace('#', '');
  const r = parseInt(hexValue.substring(0, 2), 16);
  const g = parseInt(hexValue.substring(2, 4), 16);
  const b = parseInt(hexValue.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export const theme = () => {
  const primaryColors = {
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
  };
  return {
    fontFamily: {
      sans: ['Inter', 'Roboto', 'sans-serif'],
      // sans: ["Mulish", "Roboto", "sans-serif"]
    },
    extend: {
      colors: {
        ...primaryColors,
        // Smile Tokens Custom
        's-page': colors.slate[100],
        's-container': colors.white,
        's-overlay': convertHexToRgba(colors.slate[700], 0.6),
        // page:pseudo
        's-page-container-hover': convertHexToRgba(colors.slate[200], 0.45),
        's-page-container-pressed': convertHexToRgba(colors.slate[200], 0.7),
        // surface
        's-surface-subtle': colors.slate[50],
        's-surface-regular': convertHexToRgba(colors.slate[200], 0.45),
        's-surface-inverse': colors.slate[800],
        // surface:pseudo
        's-surface-subtle-hover': convertHexToRgba(colors.slate[200], 0.45),
        's-surface-regular-hover': convertHexToRgba(colors.slate[200], 0.7),
        's-surface-subtle-pressed': convertHexToRgba(colors.slate[200], 0.7),
        's-surface-regular-pressed': convertHexToRgba(colors.slate[200], 0.9),
        // text and icons
        's-txt-primary': colors.slate[900],
        's-txt-secondary': colors.slate[700],
        's-txt-tertiary': colors.slate[500],
        's-txt-placeholder': colors.slate[400],
        's-txt-disabled': colors.slate[300],
        's-txt-inverse': colors.white,
        // borders
        's-brd-subtle': colors.slate[200],
        's-brd-regular': colors.slate[300],
        's-brd-inverse': convertHexToRgba(colors.white, 0.2),
        // 's-brd-active': withOpacity('--sm-color-primary-600'),
        's-brd-active': primaryColors['sm-primary-600'],
        // borders:pseudo
        's-brd-subtle-hover': convertHexToRgba(colors.slate[400], 0.4),
        's-brd-regular-active': convertHexToRgba(colors.slate[500], 0.4),
        // primary
        // 's-primary-regular': withOpacity('--sm-color-primary-600'),
        's-primary-regular': primaryColors['sm-primary-600'],
        's-primary-on-regular': colors.white,
        // 's-primary-subtle': withOpacity('--sm-color-primary-100'),
        's-primary-subtle': primaryColors['sm-primary-100'],
        // 's-primary-on-subtle': withOpacity('--sm-color-primary-900'),
        's-primary-on-subtle': primaryColors['sm-primary-900'],
        // primary:pseudo
        // 's-primary-regular-hover': withOpacity('--sm-color-primary-700'),
        's-primary-regular-hover': primaryColors['sm-primary-700'],
        // 's-primary-subtle-hover': withOpacity('--sm-color-primary-200'),
        's-primary-subtle-hover': primaryColors['sm-primary-200'],

        // 's-primary-regular-active': withOpacity('--sm-color-primary-800'),
        's-primary-regular-active': primaryColors['sm-primary-800'],
        // 's-primary-subtle-active': withOpacity('--sm-color-primary-300'),
        's-primary-subtle-active': primaryColors['sm-primary-300'],

        // info
        's-info-regular': colors.indigo[600],
        's-info-on-regular': colors.white,
        's-info-subtle': colors.indigo[100],
        's-info-on-subtle': colors.indigo[700],
        // info:pseudo
        's-info-regular-hover': colors.indigo[700],
        's-info-subtle-hover': colors.indigo[200],

        's-info-regular-active': colors.indigo[800],
        's-info-subtle-active': colors.indigo[300],
        // success
        's-success-regular': colors.green[600],
        's-success-on-regular': colors.white,
        's-success-subtle': colors.green[100],
        's-success-on-subtle': colors.green[700],
        // success:pseudo
        's-success-regular-hover': colors.green[700],
        's-success-subtle-hover': colors.green[200],

        's-success-regular-active': colors.green[800],
        's-success-subtle-active': colors.green[300],

        // error
        's-error-regular': colors.rose[600],
        's-error-on-regular': colors.white,
        's-error-subtle': colors.rose[100],
        's-error-on-subtle': colors.rose[700],
        // error:pseudo
        's-error-regular-hover': colors.rose[700],
        's-error-subtle-hover': colors.rose[200],

        's-error-regular-active': colors.rose[800],
        's-error-subtle-active': colors.rose[300],

        // warning
        's-warning-regular': colors.amber[400],
        's-warning-on-regular': colors.slate[900],
        's-warning-subtle': colors.amber[100],
        's-warning-on-subtle': colors.amber[700],
        // warning:pseudo
        's-warning-regular-hover': colors.amber[500],
        's-warning-subtle-hover': colors.amber[200],

        's-warning-regular-active': colors.amber[600],
        's-warning-subtle-active': colors.amber[300],

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
        'sm-brand2': withOpacity('--sm-color-primary-700'),
        'sm-greyblue2': '#f0f2fa',
        'sm-white': '#ffffff',
        'sm-grey8': '#262626',
        'sm-grey7': '#474747',
        'sm-brand1': withOpacity('--sm-color-primary-500'),
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
      },
      borderWidth: {
        5: '5px',
      },
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
  };
};
