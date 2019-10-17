import { myConfig as config } from '../config.js'
import { Base64 } from './base64.min.js'

const tips = {
  1: '抱歉。出现了一个错误',
  1000: '输入参数错误',
  1001: '输入的json格式不正确',
  1002: '找不到资源',
  1003: '未知错误',
  1004: '禁止访问',
  1005: '不正确的开发者key',
  1006: '服务器内部错误',
  2000: '你已经点过赞了',
  2001: '你还没点过赞',
  3000: '该期内容不存在'
}

// promise写法

class HTTP{
  // 对象解构
  request({url, data={}, method='GET'}){ // 默认参数在必填参数之前
    // promise的精髓在于使用对象保存异步请求返回的状态和结果，promise可以将回调的结果赋值给变量，能够灵活取值 
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method )
    })
  }
  _request(url, resolve, reject, data = {}, method = 'GET', noRefetch = false) { // 必填参数在默认参数之前
    wx.request({
      url: config.api_base_url + url,
      method: method,
      data: data,
      header: {
        'comtent-type': 'application/json',
        // 'appkey': config.appkey
        Authorization: this._encode()
      },
      success: (res) => {
        // ES6中startsWith和endWith判断字符串中的开始和结束字符
        const code = res.statusCode.toString()
        if (code.startsWith('2')) { //code以2开头
          resolve(res.data) // 已成功回调函数将请求到的数据传出
        }else{ // 服务器异常处理
          // 二次重发
          if (code == '403') {
            if (!noRefetch) {
              this._refetch(url, resolve, reject, data, method)
            }
          } else {
            reject() // 内部处理不需要传参，但是改变promise的状态
            const error_code = res.data.error_code
            this._show_error(error_code)
          }
        }
      },
      fail: (res) => {
        reject()
        this._show_error(1)
      }
    })
  }

  _refetch(url, resolve, reject, data, method) {
    const { LoginModel } = require('../models/login.js')
    const loginModel = new LoginModel()
    loginModel.get
  }

  _show_error (error_code) { //自主定义私有方法
    if (!error_code) { // 若error_code为空则默认为1
      error_code = 1
    }
    const tip = tips[error_code]
    wx.showToast({
      title: tip ? tip : tips[1],
      icon: 'none',
      duration: 2000
    })
  }

  _encode() {
    // Authorization: 'Basic base64(account:password)'
    const token = wx.getStorageSync('token')
    const base64 = Base64.encode(token + ':')
    return `Basic ${base64}`
  }
}

export {
  HTTP
}
