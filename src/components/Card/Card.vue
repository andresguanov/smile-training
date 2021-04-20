<script>
import { h } from "vue"

export default {
  name: "sm-card",
  props: {
    elevation: {
      type: [Number, String],
      default: 1
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { attrs, slots }) {
    const classes = ["card"]
    const elevation = Number(props.elevation)

    switch (elevation) {
      case 1:
        classes.push("shadow_small")
        break
      case 2:
        classes.push("shadow_medium")
        break
      case 3:
        classes.push("shadow_large")
        break
      case 4:
        classes.push("shadow_huge")
        break
      default:
        classes.push("shadow_medium")
        break
    }

    if (props.inline) {
      classes.push("inline-block")
    }

    if (attrs.class !== "") {
      classes.push(attrs.class)
    }

    const cardData = {
      ...attrs,
      class: classes.join(" ")
    }

    return () => h("div", cardData, slots)
  }
  /* render(h, { props, slots, data } ) {
    const classes = ["card"]
    console.log(ctx)
    debugger
    switch (props.elevation) {
      case 1:
      case "1":
        classes.push("shadow_small")
        break
      case 2:
      case "2":
        classes.push("shadow_medium")
        break
      case 3:
      case "3":
        classes.push("shadow_large")
        break
      case 4:
      case "4":
        classes.push("shadow_huge")
        break
      default:
        classes.push("shadow_medium")
        break
    }

    if (props.inline) {
      classes.push("inline-block")
    }

    if (data.staticClass !== "") {
      classes.push(data.staticClass)
    }

    const cardData = {
      class: classes.join(" "),
      style: data.staticStyle
    }

    return h("div", cardData, slots().default)
  } */
}
</script>

<style lang="scss" scoped>
.card {
  border-radius: 6px;
  background-color: white;
  padding: 30px;
}

.inline-block {
  display: inline-block;
}

.shadow_small {
  @include Shadow_small;
}
.shadow_medium {
  @include Shadow_medium;
}
.shadow_large {
  @include Shadow_large;
}
.shadow_huge {
  @include Shadow_huge;
}
</style>
