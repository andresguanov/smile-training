import { Directive, DirectiveBinding } from 'vue'

// function updateTooltip(el: HTMLElement, { value, modifiers }: DirectiveBinding<{value: string | null}>) {
//     if (typeof value === "string") {
//         el.setAttribute("sm-tooltip", value);
//         if (modifiers.show && modifiers.error ) {
//             // TODO: agregar iconos para los modificadores
//         }
//     }
//     // TODO: agregar re-calculo de posicion en base al espacio
// }
// // TODO: agregar doc
// const SmTooltip: Directive = {
//     mounted(el, bindings) {
//         el.classList.add("sm-tooltip")
//         updateTooltip(el, bindings);
//     },
//     updated(el, bindings) {
//         updateTooltip(el, bindings);
//     },
// };

function updateTooltip(el: HTMLElement, binding: DirectiveBinding) {
  console.log(binding)
  if (typeof binding.value === 'string') {
    let position = binding.arg || 'top'
    let tooltipText = binding.value || 'Tooltip text'
    el.setAttribute('position', position)
    el.setAttribute('tooltip', tooltipText)
  }
}
// TODO: agregar doc
const SmTooltip: Directive = {
  mounted(el, binding) {
    updateTooltip(el, binding)
  },
  updated(el, binding) {
    updateTooltip(el, binding)
  },
}

export default SmTooltip
