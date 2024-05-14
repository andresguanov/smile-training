import { defineSetupVue3 } from '@histoire/plugin-vue';
import WrapperGlobal from '../wrapper/GlobalWrapper.vue';
import './assets/style.css';
import '../../index.css';

export const setupVue3 = defineSetupVue3(({ addWrapper, app }) => {
  addWrapper(WrapperGlobal);
});
