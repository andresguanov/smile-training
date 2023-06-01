import type { Directive, DirectiveBinding } from 'vue';
import { simpleUid } from '~/utils/uid';

const Uid: Directive = {
  created(el: Element, binding: DirectiveBinding) {
    const prefix = binding.value || 'id';
    el.setAttribute('id', prefix + '-' + simpleUid());
  },
};

export default Uid;
