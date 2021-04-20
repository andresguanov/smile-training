<template>
  <nav :class="navClass">
    <!-- ADD A FORM TAG TO ISOLATE INPUT[TYPE=RADIO] -->
    <form>
      <ul class="accordion">
        <sm-accordion-item
          v-for="(section, i) in menu"
          :key="`smAccordionItem_${i}`"
          :id="section.id"
          :icon="section.icon"
          :sectionLink="section.sectionLink"
          :title="section.title"
          :submenu="section.submenu"
          v-model:open="open"
        >
          <template v-slot:title="{ title, sectionLink }">
            <slot name="title" :title="title" :sectionLink="sectionLink" />
          </template>
          <template v-slot:default="{ submenu }">
            <slot :submenu="submenu" />
          </template>
          <template v-slot:accordion-sub-item="{ item }">
            <slot name="accordion-sub-item" :item="item" />
          </template>
        </sm-accordion-item>
      </ul>
    </form>
  </nav>
</template>

<script>
/**
 * @typedef {object} MenuLink
 * @property {string} id
 * TODO: Define rest
 */
import smAccordionItem from "./AccordionItem"
export default {
  name: "smAccordionWithLinks",
  components: {
    smAccordionItem
  },
  props: {
    lang: {
      type: String,
      default: "sp"
    },
    navClass: {
      type: String,
      default: "bg-brand1"
    },
    defaultOpen: {
      type: String,
      default: ""
    },
    menu: {
      /**@type {MenuLink[]}  */
      type: Array,
      required: true
    }
  },
  data() {
    return {
      open: this.defaultOpen
    }
  }
}
</script>

<style lang="scss" scoped></style>
