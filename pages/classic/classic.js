import { LoginModel } from '../../models/login.js'
import { ClassicModel } from '../../models/classic-p.js'
import { LikeModel } from '../../models/like-p.js'

const loginModel = new LoginModel()
let classicModel = new ClassicModel() // 实例化对象
let likeModel = new LikeModel()

Page({
  data: {
    classic: null,
    first: false,
    latest: true,
    likeCount: 0,
    likeStatus: false
  },

  onLoad() {
    loginModel.getToken()
    classicModel.getLatest((res) => {
      this.setData({
        classic: res,
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
      if (res.index === 1) {
        this.setData({
          first: true
        })
      }
    })
  },

  onLike (event) {
    let behavior = event.detail.behavior
    likeModel.like(behavior, this.data.classic.id, this.data.classic.type)
  },

  onNext (event) {
    this._updateClassic('next')
  },

  onPrevious (event) {
    this._updateClassic('previous')
  },

  _updateClassic (nextOrPrevious) {
    let index = this.data.classic.index
    classicModel.getClassic(index, nextOrPrevious, (res) => {
      console.log(res)
      this._getLikeStatus(res.id, res.type)
      let isFirst =
        this.setData({
          classic: res,
          latest: classicModel.isLatest(res.index),
          first: classicModel.isFirst(res.index)
        })
    })
  },

  _getLikeStatus (artID, category) {
    likeModel.getClassicLikeStatus(artID, category, (res) => {
      this.setData({
        likeCount: res.fav_nums,
        likeStatus: res.like_status
      })
    })
  }
})