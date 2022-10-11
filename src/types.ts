// TODO: exportar este archivo usando una convencion para la version final
import { Ref } from 'vue'
import { icons } from './components/SmIcon/icons'

export interface Accordion {
  select: (uid: number) => void;
  selected: Ref<number>;
}

export type IconType = typeof icons[number]