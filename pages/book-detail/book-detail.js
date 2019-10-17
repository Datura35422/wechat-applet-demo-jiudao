import { BookModel } from '../../models/book.js'
import { LikeModel } from '../../models/like-p.js'

const bookModel = new BookModel()
const likeModel = new LikeModel()
Page({
  data: {
    comments: [],
    book: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },

  onLoad(options) {
    const bid = options.bid
    const detail = bookModel.getDetail(bid)
    const comments = bookModel.getComments(bid)
    const likeStatus = bookModel.getLikeStatus(bid)
    wx.showLoading()
    Promise.all([detail, comments, likeStatus ]).then(res => {
      wx.hideLoading()
      this.setData({
        book: res[0],
        comments: res[1].comments,
        likeStatus: res[2].like_status,
        likeCount: res[2].fav_nums
      })
    })
  },
  onLike(event){
    const like_or_cancel = event.detail.behavior
    likeModel.like(like_or_cancel, this.data.book.id, 400)
  },
  onFakePost(event) {
    this.setData({
      posting: true
    })
  },
  onCancel(event) {
    this.setData({
      posting: false
    })
  },
  handleContainer (e) {
    console.log('handleContainer', e)
  },
  handleDescription (e) {
    console.log('handleDescription', e)
  },
  onPost(e) {
    const comment = e.detail.text || e.detail.value

    if (!comment) {
      return
    }

    if (comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }
    console.log(this.data.book.id, comment)
    bookModel.postComment(this.data.book.id, comment).then(res => {
      wx.showToast({
        title: '+ 1',
        icon: 'none'
      })

      this.data.comments.unshift({
        content: comment,
        nums: 1
      })

      this.setData({
        comments: this.data.comments,
        posting: false
      })
    })
  }
})