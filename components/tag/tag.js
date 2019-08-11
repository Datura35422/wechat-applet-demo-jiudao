
Component({
  options: {
    multipleSlots: true // 启用插槽
  },
  properties: {
    text: String
  },
  methods: {
    onTap(e) {
      this.triggerEvent('tapping', {
        text: this.properties.text
      })
    }
  }
})
