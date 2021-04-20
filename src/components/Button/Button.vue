<template>
  <!-- FIXME: cuando esta disabled el button, no anda el cursor not-allowed-->
  <component
    :is="tag"
    :type="nativeType"
    :disabled="disabled || loading"
    :class="[
      'button',
      typeClass,
      shapeClass,
      sizeClass,
      {
        'icon-only': iconButton,
        disabled: disabled || loading,
        'is-full-width': block,
        dropdown: dropdownOptions.length
      },
      buttonClass
    ]"
    v-bind="$attrs"
  >
    <div
      v-if="loading"
      :class="['loading-icon', { 'loading-icon--animate': !$slots['loading-slot'] }]"
    >
      <template v-if="$slots['loading-slot']">
        <slot name="loading-slot" />
      </template>
      <sm-icon v-else icon="loading" v-bind="loadingIconProps" />
    </div>
    <span v-if="iconButton" v-visible="loading === false">
      <sm-icon v-if="!!icon" :icon="icon" :class="iconClass" :size="size" />
    </span>
    <span v-else v-visible="loading === false">
      <sm-icon
        v-if="!!iconLeft"
        :icon="iconLeft"
        :class="iconClass"
        @click="$emit('click-icon-left', $event)"
      />
      <img
        v-else-if="iconLeftSrc"
        class="icon left"
        :src="iconLeftSrc"
        @click="$emit('click-icon-left', $event)"
      />
      <template v-if="label">{{ label }}</template>
      <template v-else-if="$slots.default">
        <slot />
      </template>
      <sm-icon
        v-if="!!dropdownOptions.length"
        icon="caret-down"
        class="dropdown-caret"
        @click.stop.prevent="toggleDropdown"
      />
      <sm-icon
        v-else-if="!!iconRight"
        :icon="iconRight"
        :class="iconClass"
        @click="$emit('click-icon-right', $event)"
      />
      <img
        v-else-if="iconRightSrc"
        class="icon right"
        :src="iconRightSrc"
        @click="$emit('click-icon-right', $event)"
      />
    </span>

    <sm-list-controller
      v-if="showDropdown"
      :class="['btn-dropdown']"
      :list-length="2"
      ref="dropdownList"
      v-click-outside="closeDropdown"
    >
      <template v-slot="{ selectedIndex }">
        <ul class="btn-dropdown-list">
          <li
            v-for="(option, i) in dropdownOptions"
            :key="option.event"
            :class="{ selected: selectedIndex === i }"
            @mouseover="setListSelected(i)"
            @mouseleave="clearListSelected"
            @click.stop.prevent="emitEvent(option.event)"
          >
            {{ option.text }}
          </li>
        </ul>
      </template>
    </sm-list-controller>
  </component>
</template>

<script>
import smListController from "../Utils/ListController"
import typeMixin from "../../mixins/typeMixin"
import stateMixin from "../../mixins/stateMixin"
import shapeMixin from "../../mixins/shapeMixin"
import sizeMixin from "../../mixins/sizeMixin"
import smIcon from "../../components/Icon/Icon"

/**
 * @typedef {object} DropdownOption
 * @property {string} text
 * @property {string} event
 */

export default {
  name: "sm-button",
  mixins: [typeMixin, stateMixin, shapeMixin, sizeMixin],
  components: {
    smIcon,
    smListController
  },
  props: {
    // Markup
    tag: {
      type: String,
      default: "button",
      validator: value => {
        return ["button", "a", "input", "router-link"].includes(value)
      }
    },
    nativeType: {
      default: "button",
      validator: value => {
        return ["button", "submit", "reset"].includes(value)
      }
    },
    // Content
    label: {
      type: String,
      default: ""
    },
    iconLeft: String,
    iconLeftSrc: String,
    iconRight: String,
    iconRightSrc: String,
    icon: String,
    iconButton: {
      type: Boolean,
      default: false
    },
    buttonClass: String,
    iconClass: String,
    dropdownOptions: {
      /**@type {DropdownOption[]} */
      type: Array,
      default: () => []
    },
    loadingIconProps: {
      type: Object,
      default: undefined
    }
  },
  data() {
    return {
      openDropdown: false
    }
  },
  computed: {
    showDropdown() {
      return this.dropdownOptions.length && this.openDropdown
    }
  },
  methods: {
    closeDropdown() {
      this.openDropdown = false
    },
    clearListSelected() {
      this.$refs.dropdownList && this.$refs.dropdownList.clearSelectedIndex()
    },
    emitEvent(event) {
      this.closeDropdown()
      this.$emit("click", event)
    },
    toggleDropdown() {
      this.openDropdown = !this.openDropdown
    },
    setListSelected(index) {
      this.$refs.dropdownList && this.$refs.dropdownList.setSelectedIndex(index)
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
  position: relative;
  img.icon.left {
    margin-right: 4px;
  }
  img.icon.right {
    margin-left: 4px;
  }
}
.button.is-small .icon,
button.is-small .icon {
  width: 18px;
  height: 18px;
}

.dropdown {
  padding-right: 24px !important;
  &.is-medium {
    padding-right: 30px !important;
  }
  &.is-large {
    padding-right: 34px !important;
  }
}
.is-small .dropdown-caret {
  top: 2px;
}
.is-large .dropdown-caret {
  top: 4px;
}
.dropdown-caret {
  position: absolute;
  height: 86% !important;
  right: 0;
  top: 3px;
  /* padding: 3px 0; */
  border-left: 1px solid #cccccc;
}
.btn-dropdown {
  display: inline-block;
  position: absolute;
  left: 0px;
  top: 24px;
  z-index: 10;
  ul.btn-dropdown-list {
    text-align: left;
    list-style: none;
    background-color: white;
    padding: 2px;
    @include Shadow_medium;
    // @include Shadow_large;
    li {
      white-space: nowrap;
      padding-left: 24px;
      padding-right: 16px;
      line-height: 22px;
      font-size: 11px;
      color: #222;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
      &::before {
        content: "";
        border-right: solid 1px #e0e0e0;
        margin-right: 6px;
      }
      &.selected {
        background-color: #f2f2f2;
      }
    }
  }
}
.loading-icon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  top: 0;
  left: 0;
  right: 0;

  &--animate {
    animation: spinner 0.6s linear infinite;
  }
}
@keyframes spinner {
  to {
    transform: rotate(360deg);
  }
}
</style>
