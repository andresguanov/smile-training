import type { DefineComponent } from 'vue';

export interface smStepWizard {
  title: string;
  description: string;
  label: string;
  components: DefineComponent<{}, {}, any>[];
}
