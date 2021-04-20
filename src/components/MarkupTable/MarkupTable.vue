<template>
  <table
    :style="{ '--separator-color': separatorColor }"
    :class="['markup-table', separator, { dense, 'hover-effect': hoverEffect }]"
  >
    <slot />
  </table>
</template>

<script>
export default {
  name: "sm-markup-table",
  props: {
    dense: {
      type: Boolean,
      default: false
    },
    separator: {
      type: String,
      default: "horizontal",
      validator: value => {
        return ["cell", "horizontal", "vertical", ""].includes(value)
      }
    },
    separatorColor: {
      type: String,
      default: "#ededed"
    },
    hoverEffect: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.markup-table {
  &.hover-effect :deep(tr:hover > td) {
    // border-top: 1px solid rgba(70, 70, 70, 0.1);
    // border-bottom: 1px solid rgba(70, 70, 70, 0.1);
    background-color: #efefef;
  }
  &.dense {
    :deep(td) {
      padding: 2px;
    }
    :deep(th) {
      padding: 4px;
    }
  }
  &.cell {
    border-spacing: 0;
    :deep(td),
    :deep(th) {
      border-width: 0.5px;
      border-style: solid;
      border-color: var(--separator-color);
    }
  }
  &.horizontal {
    border-spacing: 0;
    :deep(td) {
      border-color: var(--separator-color);
    }
  }
  &.vertical {
    border-spacing: 0;
    :deep(td) {
      border-bottom: none;
    }
    :deep(td:not(:last-child)),
    :deep(th:not(:last-child)) {
      border-right: 0.5px solid var(--separator-color);
    }
  }
}
</style>
