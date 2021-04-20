export default Vue => {
  Vue.directive("focus", {
    // Cuando el elemento enlazado se inserta en el DOM...
    inserted: function (el, binding) {
      const searchFor = binding?.value ?? "input"
      const childEl = el.querySelectorAll(searchFor)[0]
      childEl?.focus()
    }
  })
}
