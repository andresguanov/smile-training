import messages from "../assets/messages"

export default {
  props: {
    lang: {
      type: String,
      default: "sp"
    }
  },
  // data() {
  //   return {
  //     translations: messages
  //   }
  // },
  methods: {
    $trans(path) {
      return path.split(".").reduce((trans, i) => trans[i], messages[this.lang])
    }
  }
}
