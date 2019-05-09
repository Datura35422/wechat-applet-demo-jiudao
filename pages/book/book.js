import { BookModel } from '../../models/book.js'

const bookModel = new BookModel()

Page({
  data: {
    books: []
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

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
