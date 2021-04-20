<template>
  <li
    :class="[
      'accordion-section',
      { 'has-submenu': hasSubmenu, 'is-active': isLinkActive(linkObj) }
    ]"
  >
    <input :id="id" name="main-nav" type="radio" ref="input" v-model="radioValue" :value="id" />
    <label :for="id" @click.prevent="sectionClick">
      <slot name="title" :title="title" :sectionLink="hasSectionLink ? sectionLink : null">
        <sm-icon v-if="icon" :icon="icon" />
        <span v-if="!hasSectionLink">{{ title }}</span>
        <a v-else :href="sectionLink">{{ title }}</a>
      </slot>
    </label>
    <ul class="accordion-submenu">
      <slot v-if="hasSubmenu" :submenu="submenu">
        <slot name="accordion-sub-item" v-for="(item, i) in submenu" :item="item">
          <sm-accordion-sub-item
            :key="`smAccordionSubItem_${i}`"
            :link="item.link"
            :title="item.title"
            :quick-action="item.quickAction"
            :quick-title="item.quickActionTitle"
          />
        </slot>
      </slot>
    </ul>
  </li>
</template>

<script>
import smAccordionSubItem from "./AccordionSubItem"
import accordionMixin from "../../mixins/accordionMixin"
import smIcon from "../Icon/Icon"
export default {
  name: "smAccordion",
  mixins: [accordionMixin],
  components: {
    smAccordionSubItem,
    smIcon
  },
  props: {
    id: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: false,
      default: ""
    },
    sectionLink: {
      type: String,
      required: false,
      default: "#"
    },
    title: {
      type: String,
      required: true
    },
    submenu: {
      type: Array,
      required: false
    },
    open: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      aux: false
      // sectionChecked: false
    }
  },
  computed: {
    radioValue: {
      get() {
        return this.open
      },
      set(newVal) {
        this.$emit("update:open", newVal)
      }
    },
    hasSectionLink() {
      return this.sectionLink !== "#"
    },
    hasSubmenu() {
      return Array.isArray(this.submenu) && this.submenu.length > 0
    },
    linkObj() {
      return {
        href: this.sectionLink,
        exactPath: false,
        child: this.submenu
      }
    }
  },
  methods: {
    isLinkActive(item) {
      const test = this.matchRoute(item) || this.isChildActive(item.child)
      return test
    },
    isChildActive(child) {
      if (!child) return false
      return child.some(item => {
        const linkMatched = this.matchRoute({
          href: item.link,
          exactPath: true
        })
        const qaMatched = this.matchRoute({
          href: item.quickAction,
          exactPath: true
        })
        return linkMatched || qaMatched
      })
    },
    sectionClick() {
      // When clicking on the label, the .prevent modifier prevents default behaviour.
      // So, it is implemented manually: Negates radio checked state value (normally, when radio is checked
      // and clicked again, nothing happens, But we want to uncheck it if it is checked)
      this.$refs.input.checked = !this.$refs.input.checked

      // Emit the corresponding value in order to inform the parent.
      if (!this.$refs.input.checked) {
        this.radioValue = ""
      } else {
        this.radioValue = this.id
      }

      // If the section clicked has (absolute) link (and no children), redirect to it.
      if (this.hasSectionLink) {
        window.location.href = this.sectionLink
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
