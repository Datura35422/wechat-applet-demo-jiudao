import { config } from '/config.js'

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
        // ES6中startWith和endWith判断字符串中的开始和结束字符
        let code = res.statusCode
        if (code.startsWith('2')) { //code以2开头

        }else{ // 异常处理

        }
      },
      fail: (res) => {

      }
    })
  }
}

export {
  HTTP
}
