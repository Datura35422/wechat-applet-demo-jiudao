import {
  HTTP
} from '../utils/http-p.js'

class LoginModel extends HTTP {
  getToken(code) {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.request({
          url: `token`,
          method: 'POST',
          data: {
            account: res.code,
            type: 100
          }
        }).then(data => {
          wx.setStorageSync('token', data.token)
        })
      }
    })
  }

  verifyToken(token) {
    return this.request({
      url: `token/verify`,
      method: 'POST',
      data: {
        token
      }
    })
  }
}

export {
  LoginModel
}