export * from './components';
export * from './utils';
export * from './directives';
export * from './interfaces';
export * from './types';

// import 'package/styles/dist/main.css'
import './index.css';
import 'tippy.js/dist/tippy.css';
// import 'tippy.js/themes/light-border.css'
// import 'vue-datepicker-next/index.css'

import { setDefaultProps } from 'vue-tippy';

setDefaultProps({
  placement: 'right',
  theme: 'light-border',
  arrow: true,
  interactive: true,
});

/* Comentar al compilar */
/*
import { createApp } from 'vue';
import App from './components/App.vue';
import { $SmAlert, ISmAlertProvide, useSmAlert } from './utils/alerts';

createApp(App).provide<ISmAlertProvide>($SmAlert, useSmAlert()).mount('#app');
*/
