import {
  KeywordModel
} from '../../models/keyword.js'
import {
  BookModel
} from '../../models/book.js'

import { paginationBev } from '../behaviors/pagination.js'

const keywordModel = new KeywordModel()
const bookModel = new BookModel()

Component({
  behaviors: [paginationBev],
  properties: {
    more: {
      type: String,
      value: '',
      observer: function(more) {
        this.data.dataArray.length > 0 && this.loadMore()
      }
    }
  },
  data: {
    q: '',
    historyKeys: [],
    hotKeys: [],
    searching: false,
    loading: false,
    loadingCenter: false
  },

  attached() {
    keywordModel.getHot().then(res => {
      this.setData({
        historyKeys: keywordModel.getHistory(),
        hotKeys: res.hot
      })
    })
  },

  methods: {
    onCancel() {
      this.initialize()
      this.triggerEvent('cancel')
    },
    onDelete() {
      this.initialize()
      this._closeResult()
    },
    onConfirm(e) {
      const value = e.detail.value || e.detail.text
      this._showResult()
      this._showLoadingCenter()
      this.setData({
        q: value
      })
      bookModel.search(0, value).then(res => {
        this.setMoreData(res.books)
        this.setTotal(res.total)
        this._hideLoadingCenter()
        keywordModel.addToHistory(value)
      })
    },
    loadMore() {
      if (!this.data.q) {
        return
      }
      if (this.isLocked()) {
        return
      }
      if (this.hasMore()) {
        this.locked()
        bookModel.search(this.getCurrentStart(), this.data.q).then(res => {
          this.unLocked()
          this.setMoreData(res.books)
        }, () => {
          this.unLocked()
        })
      }
    },
   
    _showLoadingCenter() {
      this.setData({
        loadingCenter: true
      })
    },
    _hideLoadingCenter() {
      this.setData({
        loadingCenter: false
      })
    },
    _showResult() {
      this.setData({
        searching: true
      })
    },
    _closeResult() {
      this.setData({
        searching: false,
        q: ''
      })
    }
  }
})
