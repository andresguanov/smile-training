<template>
  <div class="sm-pagination">
    <div class="left">
      <span>
        <slot name="first-page-icon" :goToFirstPage="goToFirstPage" :disabled="value === 0">
          <div
            :class="['icon-box', 'first-page-icon', { disabled: value === 0 }]"
            @click="goToFirstPage"
          />
        </slot>
        <slot name="prev-page-icon" :goToPrevPage="goToPrevPage" :disabled="value === 0">
          <div
            :class="['icon-box', 'prev-page-icon', { disabled: value === 0 }]"
            @click="goToPrevPage"
          />
        </slot>
      </span>
      <span class="text-primary">
        {{ texts.page }}
        <div class="page-input-wrapper">
          <sm-input
            class="page-input"
            :value="value + 1"
            size="small"
            name="page"
            :disabled="total <= itemsPerPage"
            @change="handlePageChange"
          />
        </div>
        {{ texts.of }} {{ Math.ceil(total / itemsPerPage) }}
      </span>
      <span>
        <slot
          name="next-page-icon"
          :goToNextPage="goToNextPage"
          :disabled="value === Math.ceil(total / itemsPerPage) - 1"
        >
          <div
            :class="[
              'icon-box',
              'next-page-icon',
              { disabled: value === Math.ceil(total / itemsPerPage) - 1 }
            ]"
            @click="goToNextPage"
          />
        </slot>
        <slot
          name="last-page-icon"
          :goToLastPage="goToLastPage"
          :disabled="value === Math.ceil(total / itemsPerPage) - 1"
        >
          <div
            :class="[
              'icon-box',
              'last-page-icon',
              { disabled: value === Math.ceil(total / itemsPerPage) - 1 }
            ]"
            @click="goToLastPage"
          />
        </slot>
      </span>
      <span v-if="showRefresh">
        <div class="icon-box refresh-icon" @click="refresh" />
      </span>
    </div>
    <div class="results-per-page-wrapper right">
      <span class="text-primary">
        {{ texts.showing }} {{ bottomB }}-{{ Math.min(topB, total) }} {{ texts.of }} {{ total }}
      </span>
      <span class="text-primary per-page-label" style="font-weight: normal">
        {{ texts.resultsPerPage }}
      </span>
      <div style="width: 60px">
        <sm-select
          size="small"
          class="results-per-page"
          :options="selectOptions"
          :filter="itemsPerPageFilter"
          name="item-per-page"
          :value="itemsPerPage"
          show-all-options
          @input="handleItemsPerPageChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @typedef {object} Option
 * @property {string} text
 * @property {any} value
 */

/**
 * @typedef {Object} Texts
 * @property {string} page String for 'page'
 * @property {string} of String for 'of'
 * @property {string} showing String for 'showing'
 * @property {string} resultsPerPage String for 'resultsPerPage'
 */

import smInput from "../Input/Input"
import smSelect from "../Select/Select"
export default {
  name: "sm-pagination",
  components: {
    smInput,
    smSelect
  },
  model: {
    event: "change"
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: true
    },
    itemsPerPageOptions: {
      /** @type {(string[] | Option[])} */
      type: Array,
      default: () => null
    },
    itemsPerPageFilter: {
      /**
       * @param {string} inputText
       * @returns {(string[] | Option[])}
       */
      type: Function,
      default: null
    },
    total: {
      type: Number,
      default: 0
    },
    showRefresh: {
      type: Boolean,
      default: true
    },
    texts: {
      /** @type {Texts} */
      type: Object,
      default: () => ({
        page: "Página",
        of: "de",
        showing: "Mostrando",
        resultsPerPage: "Resultados por página"
      })
    }
  },
  data() {
    return {
      options: [
        { value: 10, text: "10" },
        { value: 20, text: "20" },
        { value: 40, text: "40" },
        { value: 60, text: "60" },
        { value: 80, text: "80" }
      ],
      lastValidPageValue: this.value || 1
    }
  },
  computed: {
    bottomB() {
      return this.value * this.itemsPerPage + 1
    },
    selectOptions() {
      return this.itemsPerPageOptions || this.options
    },
    topB() {
      return (this.value + 1) * this.itemsPerPage
    }
  },
  methods: {
    refresh(value) {
      this.$emit("refresh")
    },
    changePage(value) {
      this.lastValidPageValue = parseInt(value)
      this.$emit("change", value)
    },
    goToFirstPage() {
      this.value !== 0 && this.changePage(0)
    },
    goToPrevPage() {
      this.value !== 0 && this.changePage(this.value - 1)
    },
    goToNextPage() {
      this.value !== Math.ceil(this.total / this.itemsPerPage) - 1 &&
        this.changePage(this.value + 1)
    },
    goToLastPage() {
      this.value !== Math.ceil(this.total / this.itemsPerPage) - 1 &&
        this.changePage(Math.ceil(this.total / this.itemsPerPage) - 1)
    },
    handleItemsPerPageChange(option) {
      if (!option) return
      this.$emit("update:itemsPerPage", option.value)
    },
    handlePageChange(event) {
      const value = event.target.value
      if (this.isValidPageValue(value)) {
        this.changePage(parseInt(value - 1))
      } else {
        event.target.value = this.lastValidPageValue
      }
    },
    isValidPageValue(value) {
      const parsedValue = parseInt(value)
      const lastPageValue = Math.ceil(this.total / this.itemsPerPage)
      if (!isNaN(parsedValue) && parsedValue > 0 && parsedValue <= lastPageValue) {
        return true
      }
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.sm-pagination {
  width: 100%;
  height: 38px;
  display: flex;
  flex-direction: row;
  padding: 3px;
  > div {
    display: flex;
    flex: 1;
    flex-direction: row;
    font-size: 11px;
    font-weight: bold;
    padding: 3px 0;

    span {
      padding: 0 5px;
    }
    &.right {
      justify-content: flex-end;
      .text-primary {
        padding: 7px 5px;
      }
      .per-page-label {
        border-left: 1px solid #aca899;
      }
    }
    &.left {
      > span:not(:last-child) {
        border-right: 1px solid #aca899;
      }
    }
  }
  .icon-box {
    display: inline-block;
    width: 22px;
    height: 22px;
    border: 1px solid #e6e6e6;
    border-radius: 0.4rem;
    padding: 2px;
    cursor: pointer;
    margin: 2px 1px 0;
    background-position: center;
    background-repeat: no-repeat;
    &:not(.disabled) {
      background-color: #ffffffb3;
    }
    &:hover {
      border-color: #cac9c9;
    }
  }
  .page-input-wrapper {
    width: 30px;
    display: inline-block;
    .page-input {
      :deep(input) {
        width: 100%;
        min-width: unset;
      }
      :deep(.input-wrapper) {
        margin: 0;
      }
    }
  }
  .results-per-page-wrapper :deep(.select .input-wrapper-border) {
    margin: 0;
  }
  .first-page-icon {
    background-image: url("../../assets/page-first.png");
  }
  .first-page-icon.disabled {
    background-image: url("../../assets/page-first-disabled.png");
  }
  .last-page-icon {
    background-image: url("../../assets/page-last.png");
  }
  .last-page-icon.disabled {
    background-image: url("../../assets/page-last-disabled.png");
  }
  .prev-page-icon {
    background-image: url("../../assets/page-prev.png");
  }
  .prev-page-icon.disabled {
    background-image: url("../../assets/page-prev-disabled.png");
  }
  .next-page-icon {
    background-image: url("../../assets/page-next.png");
  }
  .next-page-icon.disabled {
    background-image: url("../../assets/page-next-disabled.png");
  }
  .refresh-icon {
    background-image: url("../../assets/refresh.png");
  }
}
</style>
