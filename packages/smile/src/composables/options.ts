import { provide, WritableComputedRef, Ref } from 'vue';

export const OptionsProps = {
  selected: {
    type: String,
    default: '',
  },
};
/**
 * wrapper para proveer opcion seleccionada a grupos de opciones
 * funciona en conjunto con la directiva `v-sm-option`
 */
export function useOptions(selected: WritableComputedRef<string> | Ref<string>) {
  provide('selected', selected);

  return selected;
}
