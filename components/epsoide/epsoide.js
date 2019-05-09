// components/epsoide/epsoide.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      observer: function(newVal, oldVal, changedPath) { // newVal, oldVal, changedPath
        let val = newVal < 10 ? ('0' + newVal) : newVal
        console.log(val)
        this.setData({
          _index: val
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    year: 0,
    month: '',
    months: [{
      index: 0,
      item: '一月'
    }, {
      index: 1,
      item: '二月'
    }, {
      index: 2,
      item: '三月'
    }, {
      index: 3,
      item: '四月'
    }, {
      index: 4,
      item: '五月'
    }, {
      index: 5,
      item: '六月'
    }, {
      index: 6,
      item: '七月'
    }, {
      index: 7,
      item: '八月'
    }, {
      index: 8,
      item: '九月'
    }, {
      index: 9,
      item: '十月'
    }, {
      index: 10,
      item: '十一月'
    }, {
      index: 11,
      item: '十二月'
    }],
    _index: ''
  },

  attached() {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth()

    this.setData({
      year: year,
      month: this.data.months[month].item
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})