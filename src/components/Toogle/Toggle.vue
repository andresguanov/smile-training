<template>
  <sm-checkbox-base class="sm-toggle-container" v-bind="$attrs" :value="value" @input="input">
    <div class="sm-toggle">
      <span />
    </div>
    <template v-slot:help>
      <slot name="help" />
    </template>
  </sm-checkbox-base>
</template>

<script>
import smCheckboxBase from "../Checkbox/CheckboxBase"

export default {
  name: "sm-toggle",
  components: {
    smCheckboxBase
  },
  inheritAttrs: false,
  props: {
    value: [String, Number, Boolean, Object, Array] //Function,
  },
  methods: {
    input(value) {
      this.$emit("input", value)
    }
  }
}
</script>

<style lang="scss">
.sm-toggle-container label.checkbox {
  padding-left: 0;
}
.sm-toggle {
  display: inline-block;
  width: 48px;
  height: 24px;
  background-color: $grey3;
  border-radius: 20px;
  transition: background-color 0.2s ease;
  border: 0.5px solid $grey4;
  > span {
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 20px;
    margin: 2px;
    margin-top: 1px;
    box-shadow: 3px 0px 3px 0px rgba(0, 0, 0, 0.18);
    display: block;
  }
}
.is-small .sm-toggle {
  width: 32px;
  height: 16px;
  border: 0.333852px solid $grey4;
  > span {
    width: 12px;
    height: 12px;
    border-radius: 13px;
    // margin: 1.5px;
    // margin-top: 0.2px;
    box-shadow: 2px 0px 2px 0px rgba(0, 0, 0, 0.15);
  }
}
.is-large .sm-toggle {
  width: 64px;
  height: 32px;
  border: 0.671875px solid $grey4;
  > span {
    width: 26px;
    height: 26px;
    border-radius: 27px;
    margin: 2.5px;
    margin-top: 1.5px;
    box-shadow: 3px 0px 4px 0px rgba(0, 0, 0, 0.2);
  }
}
input:checked ~ .sm-toggle {
  background-color: $brand1;
  border: none;
  > span {
    margin-top: 1.5px;
    margin-left: auto;
    // float: right;
    box-shadow: -1px 0px 3px rgba(0, 0, 0, 0.35);
  }
}
.is-small input:checked ~ .sm-toggle {
  > span {
    box-shadow: -1px 0px 2px rgba(0, 0, 0, 0.35);
  }
}
.is-large input:checked ~ .sm-toggle {
  border: none;
  > span {
    margin-top: 2.5px;
    box-shadow: -1px 0px 4px rgba(0, 0, 0, 0.35);
  }
}
</style>
