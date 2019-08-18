import {
  ClassicModel
} from '../../models/classic.js'
import {
  BookModel
} from '../../models/book.js'

let classicModel = new ClassicModel()
let bookModel = new BookModel()

Page({
  data: {
    hasUserInfo: true,
    userInfo: null,
    classics: [],
    myBooksCount: 0
  },
  onShow() {
    this.getMyFavor()
    this.hasGottenUserInfo()
    this.getMyBookCount()
  },

  getMyBookCount() {
    bookModel.getMyBookCount().then(data => {
      this.setData({
        myBooksCount: data.count
      })
    })
  },

  hasGottenUserInfo() {
    wx.getSetting({
      success: (data) => {
        if (data.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: (data) => {
              this.setData({
                hasUserInfo: true,
                userInfo: data.userInfo
              })
            }
          })
        } else {
          this.setData({
            hasUserInfo: false
          })
        }
      }
    })
  },

  onGetUserInfo(event) {
    let userInfo = event.detail.userInfo
    if (userInfo) {
      this.setData({
        hasUserInfo: true,
        userInfo: userInfo
      })
    }
  },

  getMyFavor() {
    classicModel.getMyFavor((data) => {
      this.setData({
        classics: data
      })
    })
  },

  onPreviewTap: function (event) {
    wx.navigateTo({
      url: '/pages/classic-detail/classic-detail?cid=' + event.detail.cid + '&type=' + event.detail.type
    })
  },

  onShareAppMessage() {

  }
})