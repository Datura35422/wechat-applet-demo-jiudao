import { HTTP } from '../utils/http-p.js'
class LikeModel extends HTTP {
  like(behavior, artID, category) {
    let url = behavior == 'like' ? 'like' : 'like/cancel'
    return this.request({ // 没有使用success回调函数
      url: url,
      method: 'POST',
      data: {
        art_id: artID,
        type: category
      }
    })
  }

  getClassicLikeStatus(artID, category, sCallback) {
    return this.request({
      url: `classic/${category}/${artID}/favor`,
    }).then(res => {
      sCallback && sCallback(res)
    })
  }
}

export {
  LikeModel
}