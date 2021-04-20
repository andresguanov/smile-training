// Generate a new uniqe id for each componente created
export default app => {
  let uuid = 0
  // Creates a mixin, so every componente created has it's own id
  app.mixin({
    beforeCreate() {
      this.uuid = uuid.toString()
      uuid += 1
    }
  })
  // Extend vue prototype, so it is accesible in every component
  app.config.globalProperties.$id = function (id) {
    return `uid-${this.uuid}-${id}`
  }
}
