// import type { DefineComponent, VNode, RendererElement, RendererNode } from 'vue';
import type { Component } from 'vue';

export interface smStepWizard {
  title: string;
  description: string;
  label: string;
  components: Component[];
}
