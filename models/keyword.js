import {
  HTTP
} from '../utils/http-p.js'

class KeywordModel extends HTTP{
  key = 'q'
  maxLength = 10
  getHistory() {
    return wx.getStorageSync(this.key) || []
  }

  getHot() {
    return this.request({
      url: 'book/hot_keyword'
    })
  }

  addToHistory(keyword) {
    let words = this.getHistory()
    if (!words.includes(keyword)) {
      words.unshift(keyword)
      wx.setStorageSync(this.key, words.slice(0, this.maxLength))
    }
  }
}

export {
  KeywordModel
}