import { config } from '../config.js'

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

class HTTP{
  request (params) {
    // url,data,methods
    if (!params) {
      params.method = 'GET'
    }
    wx.request({
      url: config.api_base_url + params.url,
      method: params.method,
      data: params.data,
      header: {
        'comtent-type': 'application/json',
        'appkey': config.appkey
      },
      success: (res) => {
        // ES6中startsWith和endWith判断字符串中的开始和结束字符
        let code = res.statusCode.toString()
        if (code.startsWith('2')) { //code以2开头
          params.success(res.data)
        }else{ // 服务器异常处理
          let error_code = res.data.error_code
          this._show_error(error_code)
        }
      },
      fail: (res) => {
        this._show_error(1)
      }
    })
  }

  _show_error (error_code) { //自主定义私有方法
  if (!error_code) { // 若error_code为空则默认为1
    error_code = 1
  }
    wx.showToast({
      title: tips[error_code],
      icon: 'none',
      duration: 2000
    })
  }
}

export {
  HTTP
}
