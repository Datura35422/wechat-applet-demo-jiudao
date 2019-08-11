import { BookModel } from '../../models/book.js'
import common from '../../utils/common.js'

const bookModel = new BookModel()

Page({
  data: {
    books: [],
    searching: false,
    searchMore: ''
  },

  onLoad: function (options) {
    // 多次api调用
    const hotList = bookModel.getHotList()
    hotList.then(res => {
        // 接受第一次的promise对象请求结果,api getHotList请求结果
        console.log(res)
        this.setData({
          books: res
        })
        return bookModel.getMyBookCount()
      }).then( res => {
        // 接受getMyBookCount请求结果
        console.log(res)
      })
  },
  onPullDownRefresh: function () {

  },
  onReachBottom() {
    this.setData({
      searchMore: common.random(16)
    })
  },
  onSearching() {
    this.setData({
      searching: true
    })
  },
  onCancel() {
    this.setData({
      searching: false
    })
  }
})
