export default Vue => {
  Vue.directive("visible", function (el, binding) {
    if (binding.value === false) {
      el.style.visibility = "hidden"
    } else {
      el.style.removeProperty("visibility")
    }
    // el.style.visibility = !!binding.value ? "visible" : "hidden"
  })
}
