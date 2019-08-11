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
  behavioris: [],
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
    finished: false,
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
      this.triggerEvent('cancel')
    },
    onDelete() {
      this.setData({
        q: '',
        finished: false
      })
    },
    onConfirm(e) {
      const value = e.detail.value || e.detail.text
      this.setData({
        q: value,
        finished: true,
        loadingCenter: true
      })
      bookModel.search(0, value).then(res => {
        console.log(res)
        keywordModel.addToHistory(value)
        this.setData({
          dataArray: res.books,
          loadingCenter: false
        })
      })
    },
    loadMore() {
      if (!this.data.q || this.data.loading) {
        return
      }
      this.setData({
        loading: true
      })
      this.data.loading && bookModel.search(this.data.dataArray.length, this.data.q).then(res => {
        console.log(res)
        this.setData({
          dataArray: this.data.dataArray.concat(res.books),
          loading: false
        })
      })
    }
  }
})
