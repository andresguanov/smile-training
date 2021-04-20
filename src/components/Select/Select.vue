<template>
  <div class="sm-container" v-click-outside="closeSelect">
    <div v-if="!!label || help || hasSlot('help')" class="label-container">
      <span
        v-if="!!label"
        :class="[
          'label',
          sizeClass,
          labelClass,
          {
            'has-error': error,
            required,
            disabled
          }
        ]"
        v-html="label"
      ></span>
      <sm-icon-help v-if="help || hasSlot('help')" :size="size">
        {{ help }}
        <slot v-if="!help" name="help" />
      </sm-icon-help>
    </div>

    <div
      :class="[
        'select',
        'input-wrapper',
        size,
        { 'is-full-width': block, open, disabled, ghost, 'has-error': error }
      ]"
      ref="inputWrapper"
    >
      <div :class="['input-wrapper-border']" :name="$id('input-wrapper')">
        <div class="before-inside-slot" v-if="hasScopedSlot('before-inside')">
          <slot name="before-inside" :selectedOption="value" />
        </div>
        <input
          v-if="autocomplete && !disabled"
          ref="input"
          v-bind="$attrs"
          autocomplete="false"
          v-model="inputText"
          v-on="{
            keyup: handleKeyUpOnInput,
            mouseup: handleMouseUp
          }"
        />
        <!-- ...listenersWithoutInput -->
        <p
          v-else
          :class="['input-holder', { fill: inputText }]"
          tabindex="0"
          @click.prevent="toggleMenu"
          :name="$id('input-holder')"
          @mouseenter="triggerTooltip"
          @mouseleave="closeTooltip"
        >
          {{ inputText || $attrs.placeholder }}
        </p>
        <sm-tooltip
          v-if="!autocomplete && !error"
          :to="$id('input-holder')"
          :visible="showTooltip"
          trigger="manual"
        >
          {{ inputText || $attrs.placeholder }}
        </sm-tooltip>
        <div class="after-inside-slot" v-if="hasScopedSlot('after-inside')">
          <slot name="after-inside" :selectedOption="value" />
        </div>
        <span @click.prevent="toggleMenu" :style="{ height: caretHeight }">
          <sm-icon class="caret" :icon="open ? 'caret-up' : 'caret-down'" :height="caretHeight" />
        </span>
        <sm-list-controller
          v-if="open"
          :list-length="currentOptions.length"
          @selected="index => selectOption(currentOptions[index])"
          @key-up="handleKeyUpOnList"
          @key-down="handleKeyDownOnList"
          ref="smListController"
        >
          <template v-slot="{ selectedIndex }">
            <div
              :class="[
                'select-menu',
                size,
                { loading, 'no-content': !currentOptions.length, multiple }
              ]"
            >
              <div class="option-header" v-if="hasSlot('optionHeader')">
                <slot name="optionHeader" />
              </div>
              <slot name="options" :options="currentOptions" :selectedIndex="selectedIndex">
                <ul :class="['options', selectClass]" :style="selectStyle">
                  <template v-for="(option, i) in currentOptions">
                    <sm-select-option
                      v-if="!option.optGroup"
                      :class="{ grouped }"
                      :key="typeof option === 'string' ? option : option[valueField]"
                      :selected="selectedIndex === i"
                      :checked="isChecked(option)"
                      :showCheckbox="multiple"
                      :text="getInputText(option)"
                      @click.prevent.stop="selectOption(option)"
                      @mouseover="setListSelected(i)"
                      @mouseleave="clearListSelected"
                      @check="setMultipleValues($event, option)"
                    >
                      <template>
                        <slot name="option" :option="option" />
                      </template>
                    </sm-select-option>
                    <li v-else :key="`opt-group-header-${i}`" class="opt-group-header">
                      {{ option.groupLabel }}
                    </li>
                  </template>
                </ul>
              </slot>
              <sm-inner-loading v-model="loading" :text="searchingText" />
              <template v-if="!currentOptions.length">
                <slot name="empty">
                  <p v-if="!currentOptions.length" class="no-content-text" v-html="noContentText" />
                </slot>
              </template>
              <div class="option-footer" v-if="hasSlot('optionFooter')">
                <slot name="optionFooter" />
              </div>
            </div>
          </template>
        </sm-list-controller>
      </div>

      <sm-tooltip
        v-if="!!error && showError"
        :to="$id('input-wrapper')"
        placement="right"
        boundary="window"
        :interactive="true"
      >
        <error-help-content :errorMessages="errorMessages" />
      </sm-tooltip>
      <!-- <sm-icon-help v-if="error && showError" type="info" class="error-help" :size="size">
        <error-help-content :errorMessages="errorMessages" />
      </sm-icon-help> -->
    </div>

    <p v-if="!!hint" :class="['hint', 'is-small', hintClass, { disabled }]" v-html="hint" />
  </div>
</template>

<script>
/**
 * @typedef {object} Option
 * @property {string} text
 * @property {any} value
 * @property {string} [groupLabel]
 * @property {boolean} [optGroup]
 */
import smIcon from "../Icon/Icon"
import ErrorHelpContent from "../Icon/ErrorHelpContent"
import smIconHelp from "../Icon/IconHelp"
import smInnerLoading from "../Loading/InnerLoading"
import smListController from "../Utils/ListController"
import smSelectOption from "./SelectOption"
import sizeMixin from "../../mixins/sizeMixin"
import stateMixin from "../../mixins/stateMixin"
import slotsMixin from "../../mixins/slotsMixin"
import { get, debounce, isEqual } from "lodash-es"
import TrieSearch from "trie-search"

export default {
  name: "sm-select",
  mixins: [stateMixin, sizeMixin, slotsMixin],
  components: {
    // smCheckbox,
    smIcon,
    smIconHelp,
    smInnerLoading,
    smListController,
    ErrorHelpContent,
    smSelectOption
  },
  inheritAttrs: false,
  props: {
    value: [String, Object, Number, Array],
    autocomplete: {
      type: Boolean,
      default: false
    },
    options: {
      /** @type {(string[] | Option[])} */
      type: Array,
      default: () => []
    },
    filterDelay: {
      type: Number,
      default: 500
    },
    help: {
      type: String,
      default: ""
    },
    hint: {
      type: String,
      default: ""
    },
    hintClass: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    labelClass: {
      type: String,
      default: ""
    },
    multiple: {
      type: Boolean,
      default: false
    },
    multipleSeparator: {
      type: String,
      default: ", "
    },
    noContentText: {
      type: String,
      default: "La búsqueda no obtuvo ningún resultado"
    },
    required: {
      type: Boolean,
      default: false
    },
    resetValueUponOptions: {
      type: Boolean,
      default: false
    },
    returnValue: {
      type: Boolean,
      default: false
    },
    searchingText: {
      type: String,
      default: "Buscando..."
    },
    selectClass: {
      type: String,
      default: ""
    },
    selectStyle: {
      type: [String, Object],
      default: ""
    },
    serverSide: {
      type: Boolean,
      default: false
    },
    showAllOptions: {
      type: Boolean,
      default: false
    },
    showError: {
      type: Boolean,
      default: true
    },
    textField: {
      type: String,
      default: "text"
    },
    valueField: {
      type: String,
      default: "value"
    },
    minimunFilterLength: {
      type: Number,
      default: 1
    },
    openOnClear: {
      type: Boolean,
      default: true
    },
    ghost: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputText: this.getInputText(this.value) || "",
      optionsTrie: null,
      internalOptions: [],
      open: false,
      justSelected: false,
      lastSelected: null,
      lastIndex: 0,
      // INVARIANT: each option is ALWAYS an object internally
      multipleValues: {},
      // multipleValues: new Set(),
      valuesForMultipleAutocomplete: [],
      showTooltip: false,
      valueChangedFromOutside: false
    }
  },
  computed: {
    currentOptions() {
      if (this.serverSide) {
        return this.options
      } else {
        // if not serverSide(options managed from outside) and should filter options
        if (this.autocomplete && !this.showAllOptions && this.inputText) {
          if (this.multiple) {
            const terms = this.inputText.split(this.multipleSeparator.trim())
            const selectedOptionsTexts = new Set(
              Array.from(this.valuesForMultipleAutocomplete).map(v => this.getInputText(v))
            )
            let searchTerms = []
            for (let i = terms.length - 1; i >= 0; i--) {
              const term = terms[i].trim()
              if (!term) continue
              if (selectedOptionsTexts.has(term)) break
              searchTerms.push(term)
            }
            if (searchTerms.length) return this.optionsTrie.get(searchTerms)
          } else {
            // if it is initialized without options, this.optionsTrie is null in the setup, so return an empty array
            if (!this.optionsTrie) {
              return []
            }
            return this.optionsTrie.get(this.inputText)
          }
        }
        if (this.minimunFilterLength > 1 && !this.inputText) {
          return []
        }
        // else return
        return this.internalOptions
      }
    },
    grouped() {
      for (const option of this.currentOptions) {
        if (option.optGroup) return true
      }
      return false
    },
    // listenersWithoutInput() {
    //   // FIXME:
    //   //eslint-disable-next-line
    //   // const { input, ...restListeners } = this.$listeners
    //   // return restListeners
    // },
    caretHeight() {
      switch (this.size) {
        case "small":
          return "18px"
        case "medium":
          return "21px"
        case "large":
          return "24px"
        default:
          return "21px"
      }
    }
  },
  watch: {
    // it is meant to dispatch filter when inputText change directly as user type
    // into the input. Not when value is set from outside
    inputText(newValue) {
      if (this.autocomplete && this.justSelected === false && !this.valueChangedFromOutside) {
        try {
          if (newValue) {
            this.open = true
            if (this.serverSide) {
              // Emit event to filter with a default debounce of 500
              this.$emit("update:loading", true)
              // Set the second parameter to true, as it needs to useActualValue (if it pushed backspace, it should)
              this.debouncedFilter(newValue, true)
            }
          } else {
            this.open = false
          }
        } catch (error) {
          // console.log("handling it", error)
        }
      }
      if (this.valueChangedFromOutside) this.valueChangedFromOutside = false
    },
    options(newValue) {
      if (!this.serverSide) {
        this.initOptionsTrie(newValue)
      } // no need to do something when is serverSide because, in that case, options are always showed from prop
      if (this.resetValueUponOptions) {
        if (this.multiple) {
          this.multipleValues = {}
          this.initValuesForMultipleAutocomplete()
        }
        this.$emit("input", null)
      }
    },
    value: {
      // Update inputText whenever value is changed from outside(i.e. !justSelected)
      // When this happen, there is no need to watch for inputText changes
      handler: function (newValue) {
        if (!this.justSelected) {
          this.valueChangedFromOutside = true
          if (this.multiple) {
            // newValue es un array
            // this.multipleValues = new Set(newValue)
            if (newValue && Array.isArray(newValue))
              this.multipleValues = newValue.reduce((acc, current) => {
                acc[this.getOptionValue(current)] = current
                return acc
              }, {})
            else this.multipleValues = {}
            // this.setInputTextMultiple(this.multipleValues.values())
            this.setInputTextMultiple(Object.values(this.multipleValues))
          } else {
            this.inputText = this.getInputText(newValue)
          }
        } else {
          this.justSelected = false
        }
      },
      immediate: true
    },
    currentOptions(newVal) {
      // When receiving new options and it's opened, "hover" the first element so if it push "TAB", it shoudl select it
      if (this.open && newVal && newVal.length) {
        this.restoreListPosition()
      }
    }
  },
  created() {
    if (!this.serverSide) {
      this.initOptionsTrie(this.options)
    } else {
      this.debouncedFilter = debounce(this.filter, this.filterDelay)
    }
  },
  methods: {
    closeSelect() {
      if (this.open) {
        this.open = false
        if (!this.currentOptions.length && this.inputText && this.lastSelected !== undefined) {
          this.selectOption(this.lastSelected)
        }
      }
    },
    initOptionsTrie(options) {
      const textFieldSplitted = this.textField.split(".")
      if (textFieldSplitted.length) {
        this.optionsTrie = new TrieSearch([textFieldSplitted], { min: this.minimunFilterLength })
      } else {
        //FIXME: THINK THIS ELSE HAS NO SENSE
        this.optionsTrie = new TrieSearch(this.textField, { min: this.minimunFilterLength })
      }
      this.internalOptions = options.map(option => {
        if (typeof option === "string") {
          return { [this.textField]: option, [this.valueField]: option }
        }
        return option
      })
      this.optionsTrie.addAll(this.internalOptions)
    },
    initValuesForMultipleAutocomplete() {
      this.valuesForMultipleAutocomplete = []
    },
    /**
     * Extract the text to show from option
     *
     * @param {string | Option} option
     */
    getInputText(option) {
      if (typeof option === "string") {
        return option
      } else if (typeof option === "number") {
        return option.toString()
      } else {
        return get(option, this.textField)
      }
    },
    getOption(option) {
      if (!this.returnValue) {
        return option
      }
      return this.getOptionValue(option)
    },
    getOptionValue(option) {
      return get(option, this.valueField)
    },
    /**
     * Set the selected value on input text and
     * emit a input event to update v-model
     *
     * @param {object} option
     * @returns {string} Text to show in input text
     */
    selectOption(option) {
      // IMPORTANT: justSelected remains true until value gets changed(value watcher is executed)
      // due to the $emit('input'). This means, whenever inputText watcher gets executed
      //right after an option is selected, it does nothing
      if (option) {
        this.lastIndex =
          typeof option === "string"
            ? this.currentOptions.findIndex(e => e === option)
            : this.currentOptions.findIndex(
                e =>
                  e[this.textField] === option[this.textField] &&
                  e[this.valueField] === option[this.valueField]
              )
      } else {
        this.lastIndex = 0
      }

      this.justSelected = true
      if (!this.multiple) {
        this.inputText = this.getInputText(option)
        this.lastSelected = option
        // if one option es selected (!= undefined), close the options list
        if (option !== undefined) {
          this.open = false
        } else {
          // if it's undefined (because it's clearing the option selected) then, ask for the flag openOnClear
          if (!this.openOnClear) this.open = false
        }
        this.$emit("input", this.getOption(option))
      } else {
        // multiple and autocomplete is a special case
        if (this.autocomplete) {
          this.selectOptionForMultipleAutocomplete(option)
        } else {
          const optionValue = this.getOptionValue(option)
          // rest of combinations
          if (this.multipleValues[optionValue]) delete this.multipleValues[optionValue]
          else this.multipleValues[optionValue] = option

          const selectedOptions = Object.values(this.multipleValues)

          this.setInputTextMultiple(selectedOptions)
          this.$emit(
            "input",
            selectedOptions.map(option => this.getOption(option)),
            this.getOption(option)
          )
        }
      }
    },
    selectOptionForMultipleAutocomplete(option) {
      const optionIndex = this.valuesForMultipleAutocomplete.findIndex(v =>
        isEqual(this.getOption(v), this.getOption(option))
      )
      if (optionIndex !== -1) {
        this.valuesForMultipleAutocomplete.splice(optionIndex, 1)
      } else {
        // INVARIANT: each option is ALWAYS an object internally
        this.valuesForMultipleAutocomplete.push(option)
      }
      // this.setInputTextMultipleAutocompleteAndEmit(option)

      this.inputText = this.valuesForMultipleAutocomplete
        .map(v => this.getInputText(v))
        .join(this.multipleSeparator)

      if (this.inputText.length > 0) this.inputText += this.multipleSeparator

      this.$emit(
        "input",
        this.valuesForMultipleAutocomplete.map(v => this.getOption(v)),
        this.getOption(option)
      )
    },
    setMultipleValues(value, option) {
      this.justSelected = true
      const optionValue = this.getOptionValue(option)
      if (value) this.multipleValues[optionValue] = option
      else delete this.multipleValues[optionValue]
      // const options =
      const selectedOptions = Object.values(this.multipleValues)
      this.setInputTextMultiple(selectedOptions)
      this.$emit(
        "input",
        selectedOptions.map(option => this.getOption(option)),
        this.getOption(option)
      )
    },
    setInputTextMultiple(options) {
      // let opt = options.next()
      // let text = ""
      // while (!opt.done) {
      //   text += this.getInputText(opt.value)
      //   text += this.multipleSeparator
      //   opt = options.next()
      // }
      // this.inputText = text.slice(0, text.length - this.multipleSeparator.length)
      this.inputText = options.map(opt => this.getInputText(opt)).join(this.multipleSeparator)
    },
    toggleMenu() {
      if (!this.disabled) {
        this.open = !this.open
        if (this.autocomplete) {
          this.$refs["input"].focus()
          // If it's opening and serverSide it's setted, call filter with the current value
          if (this.open && this.serverSide) {
            // Si ya selecciono algo, this.value != undefined (y != null, por las dudas). Entonces deberá filtrar para traer nuevos values
            if (this.value !== undefined && this.value !== null) {
              this.filter(this.getInputText(""))
            }
            // this.options.length===0 Esto soluciona el problema de que cargue inicialmente cuando abre
            else if (this.options.length === 0) {
              this.filter(this.getInputText(this.value) || "")
            }
          }
        }
        if (this.open) {
          // in the next frame, select the last option selected (if it is on the screen) or the first one
          this.restoreListPosition()
        }
      }
    },
    restoreListPosition() {
      this.$nextTick(() => {
        if (this.currentOptions && this.currentOptions.length) {
          // if currentOptions[lastIndex] exists (and  lastIndex not 0)
          if (this.lastIndex !== 0 && !!this.currentOptions[this.lastIndex]) {
            try {
              this.setListSelected(this.lastIndex)
              this.$refs.smListController.$children[this.lastIndex]?.$el?.scrollIntoView({
                block: "nearest",
                inline: "start"
              })
            } catch (e) {
              // console.log(e)
            }
          } else {
            this.setListSelected(0)
          }
        }
      })
    },
    handleKeyUpOnList(index) {
      let newIndex = index
      if (this.currentOptions[index].optGroup) {
        if (index === 0) {
          newIndex = this.currentOptions.length - 1
        } else {
          newIndex = index - 1
        }
        this.setListSelected(newIndex)
      }
      this.$refs.smListController.$children[newIndex]?.$el?.scrollIntoView({
        // behavior: "smooth",
        block: "nearest",
        inline: "start"
      })
    },
    handleKeyDownOnList(index) {
      let newIndex = index
      if (this.currentOptions[index].optGroup) {
        //this shouldn't happen, optGroup shouldn't be at the end of the list,
        //but just in case
        if (index === this.currentOptions.length - 1) {
          newIndex = 0
        } else {
          newIndex = index + 1
        }
        this.setListSelected(newIndex)
      }
      this.$refs.smListController.$children[newIndex]?.$el?.scrollIntoView({
        // behavior: "smooth",
        block: "nearest",
        inline: "start"
      })
    },
    setListSelected(index) {
      this.$refs.smListController && this.$refs.smListController.setSelectedIndex(index)
    },
    clearListSelected() {
      this.$refs.smListController && this.$refs.smListController.clearSelectedIndex()
    },
    filter(value, useActualValue = false) {
      // if the filter was called after the user typed, it should useActualValue, because it can be an empty value (ie, after pushing backspace)
      if (useActualValue) this.$emit("filter", this.inputText || "")
      else this.$emit("filter", value)
    },
    isChecked(option) {
      return this.autocomplete
        ? !!this.valuesForMultipleAutocomplete.find(v =>
            isEqual(this.getOption(v), this.getOption(option))
          )
        : this.isSelected(option)
    },
    // Para ser usado solo cuando es multiple y no autocomplete
    isSelected(option) {
      return !!this.multipleValues[this.getOptionValue(option)]
    },
    handleKeyUpOnInput(event) {
      // if not delete, backspace, tab key, return
      if (![8, 46].includes(event.keyCode)) return
      // if it's not autocomplete, return
      if (!this.autocomplete) return

      // if it hasn't got value, return
      const hasNotValue = this.value === undefined || this.value === null
      if (hasNotValue) return

      if (!this.multiple) {
        this.selectOption(undefined)
      } else {
        const hasOptions = this.valuesForMultipleAutocomplete.length > 0
        if (hasOptions) {
          // get the last option
          const lastOption = this.valuesForMultipleAutocomplete[
            this.valuesForMultipleAutocomplete.length - 1
          ]
          // unselect it (and process inputText)
          this.selectOption(lastOption)
        }
      }
    },
    handleMouseUp(event) {
      moveCursorToEnd(event.target)
      // const val = event.target.value.length
      // event.target.setSelectionRange(val, val)
    },
    triggerTooltip() {
      if (!this.autocomplete)
        this.$nextTick(() => {
          const inputHolder = this.$refs.inputWrapper.querySelector("p.input-holder")
          this.showTooltip = inputHolder.offsetWidth < inputHolder.scrollWidth
        })
    },
    closeTooltip() {
      this.showTooltip = false
    }
  }
}

function moveCursorToEnd(el) {
  if (typeof el.selectionStart == "number") {
    el.selectionStart = el.selectionEnd = el.value.length
  } else if (typeof el.createTextRange != "undefined") {
    el.focus()
    var range = el.createTextRange()
    range.collapse(false)
    range.select()
  }
}
</script>

<style lang="scss" scoped>
// .input-help {
//   position: absolute;
//   top: -25px;
//   right: 15%;
// }
.select {
  // position: relative;
  // display: flex;

  /* border: 1px solid #cccccc;
  border-radius: 4px;
  padding: 9px 26px 9px 8px;
  font-size: 14px;
  margin: 5px auto;
  font-size: 14px;
  background-color: white; */

  &.input-wrapper {
    display: flex;
    align-items: center;
  }

  .input-wrapper-border {
    position: relative;
    display: flex;
    flex: 1;
    min-width: 0; // in order to the text-elipsis be showed
    align-items: center;

    border: 1px solid #cccccc;
    border-radius: 4px;

    margin: 5px auto;
    background-color: white;
    outline: none;
  }

  .after-inside-slot,
  .before-inside-slot {
    display: inline-block;
    margin: 0 4px;
    user-select: none;
  }

  input,
  .input-holder {
    display: flex;
    flex: 1;
    min-width: 0;

    &.shrink-2.shrink-1 {
      flex: 0.8;
    }
    &.shrink-1 {
      flex: 0.9;
    }
  }

  input {
    border: none;
    outline: none;
    background: none;
    font-size: 14px;
    // min-width: 2em;
    color: #474747;
    max-width: 100%;
  }
  .input-holder {
    // min-width: 2em;
    font-size: 14px;
    min-height: calc(1em + 2px);
    line-height: 19px;
    color: #ccc;
    cursor: pointer;
    outline: none !important;
    // for some reason, this is not working
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    &.fill {
      color: #474747;
    }
  }

  .help-icon.error-help {
    // position: absolute;
    :deep(svg) {
      color: #e85e42;
    }
  }

  &.is-full-width {
    width: 100%;
  }

  &.open > .input-wrapper-border {
    border-color: $brand1 !important;
  }

  &.ghost > .input-wrapper-border {
    border: 1px solid transparent;
    &:focus-within {
      border: 1px solid $brand1;
    }
  }

  &.small {
    .input-wrapper-border {
      font-size: 12px;
      padding: 3px 0 3px 8px;
    }

    .after-inside-slot,
    .before-inside-slot,
    p.input-holder,
    input {
      line-height: 18px;
      height: 18px;
    }
    // Si usa un icono en el slot, fuerza a la altura del los mismos para no deformar el select
    .after-inside-slot .icon,
    .before-inside-slot .icon {
      height: 18px;
      width: 18px;
    }

    input,
    p.input-holder,
    .after-inside-slot p,
    .before-inside-slot p {
      font-size: 12px;
    }
  }

  &.medium {
    .input-wrapper-border {
      font-size: 14px;
      padding: 9px 0 9px 8px;
    }
    .after-inside-slot,
    .before-inside-slot,
    p.input-holder,
    input {
      line-height: 21px;
      height: 21px;
    }
    // Si usa un icono en el slot, fuerza a la altura del los mismos para no deformar el select
    .after-inside-slot .icon,
    .before-inside-slot .icon {
      height: 21px;
      width: 21px;
    }
  }

  &.large {
    .input-wrapper-border {
      font-size: 16px;
      padding: 12px 0 12px 8px;
    }
    .after-inside-slot,
    .before-inside-slot,
    p.input-holder,
    input {
      line-height: 24px;
      height: 24px;
    }
    // Si usa un icono en el slot, fuerza a la altura del los mismos para no deformar el select
    .after-inside-slot .icon,
    .before-inside-slot .icon {
      height: 24px;
      width: 24px;
    }

    input,
    p.input-holder,
    .after-inside-slot p,
    .before-inside-slot p {
      font-size: 16px;
    }
  }
  .caret.icon {
    cursor: pointer;
  }
  &.disabled .caret.icon:hover {
    color: #999999;
  }
  .select-menu {
    &.small {
      top: 23px;
    }
    &.medium {
      top: 38px;
    }
    &.large {
      top: 47px;
    }

    position: absolute;
    top: 35px;
    left: 0;
    right: 0;
    // max-height: 300px;
    // overflow-y: auto;
    z-index: 5;
    background-color: #fff;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    border: 1px solid #ccc;
    .option {
      padding: 1px 5px;
      cursor: pointer;
      &:hover,
      &.selected {
        background-color: rgba(0, 0, 0, 0.05);
        font-weight: bold;
      }
      > .sm-container {
        display: inline;
      }
    }
    &.loading {
      height: 150px;
      overflow: hidden;
    }
    > .loading {
      top: 0;
    }
    .no-content-text {
      padding: 3px 10px 10px !important;
      font-size: 12px;
      color: #666;
      line-height: 1.6;
      overflow: hidden;
    }
    &.multiple {
      .option {
        padding: 0;
        :deep(label.checkbox) {
          margin-right: 2px;
        }
      }
    }
    > ul {
      max-height: 260px;
      overflow-y: auto;
    }
    > .option-header {
      overflow: hidden;
    }
    > .option-footer {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      overflow: hidden;
    }
  }
}
.disabled {
  opacity: 0.4;
  > p.input-holder,
  .caret.icon {
    cursor: default;
  }
}
.sm-container .label.has-error {
  color: $brand7;
}
.sm-container .select.has-error .input-wrapper-border {
  border: 1px solid $brand7;
}

.icon-error {
  color: $brand7;
  &:hover {
    color: $brand7;
  }
  &.is-large {
    right: -32px;
  }
  &.is-medium {
    right: -24px;
  }
}

.opt-group-header {
  font: 12px tahoma, arial, helvetica, sans-serif;
  font-weight: bold !important;
  white-space: nowrap;
  text-overflow: ellipsis;
  border: 1px solid #fff;
  overflow: hidden;
  padding: 2px;
}
</style>
