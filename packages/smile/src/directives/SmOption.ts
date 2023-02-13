import { Ref, Directive, watch } from 'vue';

enum statusClass {
  ACTIVE = 'sm-active',
}

/**
 * directiva para acceso rapido al composable `options` se encarga de definir selectores y objetivos y agregar la clase `active`
 * al ambos valores correspondientes
 */
const SmOption: Directive = {
  mounted: (el: HTMLElement, binding: any) => {
    const selected = binding.instance.$.provides?.selected as Ref<string>;
    if (!selected) throw new Error('sm-option directive called outside a `selected` provider');
    if (!binding.modifiers?.target) {
      el.addEventListener('click', () => {
        if (selected.value == binding.value && binding.modifiers?.toggle) {
          selected.value = '';
        } else {
          selected.value = binding.value;
        }
      });
    }
    function setActive(val: string) {
      if (val === binding.value) {
        el.classList.add(statusClass.ACTIVE);
      } else {
        el.classList.remove(statusClass.ACTIVE);
      }
    }
    setActive(selected.value);
    watch(selected, setActive);
  },
};

export default SmOption;
