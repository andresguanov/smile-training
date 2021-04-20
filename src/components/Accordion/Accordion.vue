<template>
  <form :class="navClass">
    <ul class="accordion">
      <li
        v-for="(section, i) in sections"
        :key="section.title"
        :class="['accordion-section', { 'has-submenu': section.content }]"
      >
        <input
          :id="$id('smAccordion-' + i)"
          name="main-nav"
          type="radio"
          :value="section.title"
          v-model="open"
        />
        <label :for="$id('smAccordion-' + i)" @click.prevent="sectionClick(section.title)">
          <!-- <svg class="icon">
            <use xlink:href="dist/smile-icons.svg#input" />
          </svg> -->
          <slot name="title" :title="section.title">
            <span style="margin-left: 0">{{ section.title }}</span>
          </slot>
        </label>
        <ul class="accordion-submenu">
          <slot :content="section.content">
            <div style="padding: 16px 24px">
              {{ section.content }}
            </div>
          </slot>
        </ul>
      </li>
    </ul>
  </form>
</template>

<script>
/**
 * @typedef {object} AccordionSection
 * @property {string} title
 * @property {string} content
 */
export default {
  name: "sm-accordion",
  props: {
    navClass: {
      type: String,
      default: "bg-brand1"
    },
    defaultOpen: {
      type: String,
      default: ""
    },
    sections: {
      /**@type {AccordionSection[]} */
      type: Array,
      required: true
    }
  },
  data() {
    return {
      open: this.defaultOpen
    }
  },
  methods: {
    sectionClick(id) {
      // When clicking on the label, the .prevent modifier prevents default behaviour.
      // So, it is implemented manually: Negates radio checked state value (normally, when radio is checked
      // and clicked again, nothing happens, But we want to uncheck it if it is checked)
      if (id !== this.open) {
        this.open = id
      } else {
        this.open = ""
      }
    }
  }
}
</script>
