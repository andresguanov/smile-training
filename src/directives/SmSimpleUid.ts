import type { Directive, DirectiveBinding } from 'vue'

const simpleUid = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })

const Uid: Directive = {
  created(el: Element, binding: DirectiveBinding) {
    const prefix = binding.value || 'id'
    el.setAttribute('id', prefix + '-' + simpleUid())
  },
}

export default Uid
