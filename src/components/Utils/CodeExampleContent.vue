<script>
// import Vue from "vue"
import Vue from "vue/dist/vue.js" //https://github.com/vuejs/vue-cli/issues/2754#issuecomment-522321907
export default {
  props: ["docTemplate", "config"],
  data() {
    return {
      templateDocConstructor: null
    }
  },
  watch: {
    docTemplate() {
      console.log("tem")
      this.createConstructor()
    },
    config() {
      console.log("con")
      this.createConstructor()
    }
  },
  created() {
    this.createConstructor()
  },
  methods: {
    createConstructor() {
      this.$nextTick(
        () =>
          (this.templateDocConstructor = Vue.extend({
            name: "templateDocConstructor",
            template: this.docTemplate,
            ...this.config
          }))
      )
    }
  },
  render(h) {
    if (this.docTemplate && !!this.templateDocConstructor) {
      // const templateDocConstructor = Vue.extend({
      //   name: "templateDocConstructor",
      //   template: this.docTemplate,
      //   ...this.config
      // })
      const instance = h(this.templateDocConstructor)
      return instance
    } else return h("h5", { class: "code-example-content loading" }, ["Loading..."])
  }
}
</script>

<style scoped>
.loading {
  margin: 20px auto;
  text-align: center;
}
</style>
