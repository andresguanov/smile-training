<script>
import { h } from "vue"
export default {
  name: "component-extended",
  inheritAttrs: false,
  props: {
    component: {
      type: Object,
      default: () => null
    }
  },
  render() {
    // FIXME: Revisar estos atributos, no tods funcionan (ej, no sería slot: this.$attrs.slot,  sino:  slot: this.$slots,)
    return h(
      this.component,
      {
        // // Same API as `v-bind:class`, accepting either
        // // a string, object, or array of strings and objects.
        class: this.$attrs.class,
        // // Same API as `v-bind:style`, accepting either
        // // a string, object, or array of objects.
        style: this.$attrs.style,
        // // Normal HTML attributes
        attrs: this.$attrs.attrs,
        // // Component props
        props: this.$attrs.props,
        // // DOM properties
        domProps: this.$attrs.domProps,
        // Event handlers are nested under `on`, though
        // modifiers such as in `v-on:keyup.enter` are not
        // supported. You'll have to manually check the
        // keyCode in the handler instead.
        // on: { ...this.$listeners, ...this.$attrs.on },
        on: { ...this.$attrs.on },
        // // For components only. Allows you to listen to
        // // native events, rather than events emitted from
        // // the component using `vm.$emit`.
        nativeOn: this.$attrs.nativeOn,
        // // Custom directives. Note that the `binding`'s
        // // `oldValue` cannot be set, as Vue keeps track
        // // of it for you.
        directives: this.$attrs.directives,
        // Scoped slots in the form of
        // { name: props => VNode | Array<VNode> }
        // scopedSlots: { ...this.$attrs.scopedSlots, ...this.$scopedSlots },
        // The name of the slot, if this component is the
        // child of another component
        // slot: this.$attrs.slot,
        slots: this.$slots,
        // // Other special top-level properties
        key: this.$attrs.key,
        ref: this.$attrs.ref,
        // // If you are applying the same ref name to multiple
        // // elements in the render function. This will make `$refs.myRef` become an
        // // array
        refInFor: this.$attrs.refInFor
      },
      this.$attrs.children
    )
  }
}
</script>
