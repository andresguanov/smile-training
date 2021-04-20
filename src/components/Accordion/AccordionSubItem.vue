<template>
  <li :class="{ 'is-active': isActive }">
    <router-link v-if="isVueLink" :to="link">{{ title }}</router-link>
    <a v-else :href="link">{{ title }}</a>

    <router-link
      v-if="isVueQALink"
      :to="quickAction"
      :title="quickActionTitle"
      class="accordion-quick-action"
    >
      <sm-icon icon="add-outline" />
    </router-link>
    <a v-else :href="quickAction" :title="quickActionTitle" class="accordion-quick-action">
      <sm-icon icon="add-outline" />
    </a>
  </li>
</template>

<script>
import accordionMixin from "../../mixins/accordionMixin"
import smIcon from "../Icon/Icon"

export default {
  name: "smAccordionSubItem",
  components: {
    smIcon
  },
  mixins: [accordionMixin],
  props: {
    link: {
      type: [String, Object],
      required: true
    },
    title: {
      type: String,
      required: true
    },
    quickAction: {
      type: [String, Object],
      default: ""
    },
    quickActionTitle: {
      type: String,
      required: false
    }
  },
  computed: {
    isVueLink() {
      return typeof this.link === "object"
    },
    isVueQALink() {
      return typeof this.quickAction === "object"
    },
    isActive() {
      const isLinkActive = this.matchRoute({
        href: this.link,
        exactPath: true
      })
      const isQAActive = this.matchRoute({
        href: this.quickAction,
        exactPath: true
      })
      return isLinkActive || isQAActive
    }
  }
}
</script>

<style lang="scss" scoped>
.accordion-quick-action {
  // color: rgba(255, 255, 255, 0.8);
  border: 0;
  & :hover :deep(.icon) {
    color: #fff;
  }
}
.accordion-quick-action :deep(.icon) {
  // color: hsla(0, 0%, 100%, 0.8);
  color: rgba(255, 255, 255, 0.5);
  width: 20px;
  height: 20px;
  right: 2px;
  bottom: 4px;
  position: relative;
}
.accordion-quick-action:hover :deep(.icon) {
  color: #fff;
}
</style>
