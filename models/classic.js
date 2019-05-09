import {
  HTTP
} from '../utils/http.js'
// 发送http请求
class ClassicModel extends HTTP { // 使用继承的方式就不需要进行实例化了
  getLatest(sCallBack) {
    this.request({
      url: 'classic/latest',
      success: (res) => {
        sCallBack(res) // 成功后调用函数
        this._setLatestIndex(res.index)
        let key = this._getKey(res.index)
        wx.setStorageSync(key, res)
      }
    })
  }
  getClassic(index, nextOrPrevious, sCallback) {
    // 在获取到期刊时存到缓存中，需要查询期刊时先在缓存中寻找，然后再从服务器中加载，新数据写入缓存中
    let key = nextOrPrevious == 'next' ? this._getKey(index + 1):this._getKey(index - 1)
    let classic = wx.getStorageSync(key)
    if (!classic) {
      this.request({
        url: `classic/${index}/${nextOrPrevious}`,
        success: (res) => {
          wx.setStorageSync(this._getKey(res.index), res)
          sCallback(res)
        }
      })
    }else{
      sCallback(classic)
    }
    
  }

  isFirst(index) {
    return index == 1 ? true : false
  }

  isLatest(index) {
    let latestIndex = this._getLatestIndex()
    return index == latestIndex ? true : false
  }

  _setLatestIndex(index) {
    wx.setStorageSync('latest', index)
  }

  _getLatestIndex() {
    let index = wx.getStorageSync('latest')
    return index
  }

  _getKey(index) { // 定制特殊的key值表示唯一的期刊
    let key = 'classic-' + index
    return key
  }
}

export {
  ClassicModel
}