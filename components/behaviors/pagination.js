import {
  HTTP
} from '../../utils/http.js'

const paginationBev = Behavior({
  data: {
    start: 0,
    count: 20,
    total: null,
    dataArray: [],
    empty: false,
    ending: false,
    loading: false
  },

  methods: {
    setMoreData: function (dataArray) {
      if (dataArray == false) {
        this.data.ending = true
        if (this.data.dataArray == false) {
          this.setData({
            empty: true
          })
        }
      }
      let temp = this.data.dataArray.concat(dataArray)
      this.data.start += this.data.count
      this.setData({
        dataArray: temp
      })
      return true
    },

    setTotal: function() {
      
    },

    hasMore: function () {
      return !this.data.ending
    },

    getCurrentStart: function () {
      return this.data.start
    },

    initialize: function () {
      this.data.ending = false
      this.data.start = 0
      this.data.total = null
      this.setData({
        dataArray: [],
        loading: false,
        empty: false
      })
    },

    isLocked() {
      return this.data.loading
    },
    locked() {
      this.setData({
        loading: true
      })
    },
    unLocked() {
      this.setData({
        loading: false
      })
    }
  }
})


export {
  paginationBev
}