<template>
  <sm-card :elevation="elevation" :inline="inline" style="margin: 0px; padding: 0px">
    <div class="card-group">
      <slot />
    </div>
  </sm-card>
</template>

<script>
import smCard from "../Card/Card"

export default {
  name: "sm-card-group",

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

  components: {
    smCard
  }
}
</script>

<style lang="scss" scoped>
.card-group {
  display: flex;
  flex-wrap: wrap;
}

.card-group > div {
  align-items: center;
  border-right: 1px solid $grey3;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  margin: 12px 18px;
  margin-right: 0px;
  padding: 10px 0px;
  padding-right: 18px;
  width: 157px;
}
</style>
