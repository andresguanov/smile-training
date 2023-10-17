// import type { DefineComponent, VNode, RendererElement, RendererNode } from 'vue';
import type { Component } from 'vue';
import type { IconType } from './sm-icon.interface';

export interface smStepWizard {
  title: string;
  description: string;
  label: string;
  components: Component[];
}

export interface sUserMenu {
  avatar: string;
  hasLogout?: boolean;
  showElectronicInvoicingStatus?: boolean;
  userData: {
    name: string;
    id: string;
  };
  electronicInvoicingText?: {
    label: string;
    active: string;
  };
  items: {
    id: string;
    text: string;
    icon: IconType;
    external?: boolean;
  }[];
}
