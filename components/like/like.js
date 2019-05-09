Component({
  properties: {
    like: Boolean,
    count: Number,
    readOnly: Boolean
  },
  data: {
    yes_url: 'images/like.png',
    no_url: 'images/like@dis.png'
  },
  methods: {
    onLike (event) {
      if(this.properties.readOnly){
        return
      }
      let count = this.properties.count
      let like = this.properties.like
      count = like ? count - 1 : count + 1
      this.setData({
        count: count,
        like: !like
      })
      // 通知用户点击了like组件和组件状态
      let behavior = this.properties.like ? 'like' : 'cancel'
      // 激活事件，参数自定义事件名称，自定义属性，
      this.triggerEvent('like',{
        behavior: behavior
      },{})
    }
  }
})
