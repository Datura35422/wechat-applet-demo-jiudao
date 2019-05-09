// components/classic/music/music.js
import { classicBeh } from '../classic-beh.js'

// 音乐管理对象
const mMgr = wx.getBackgroundAudioManager()

Component({
  behaviors: [classicBeh],
  properties: {
    url: String,
    title: String
  },
  data: {
    play: false,
    playSrc: 'images/player@playing.png',
    pauseSrc: 'images/player@waitting.png'
  },
  // 
  detached: function (event) {
    mMgr.stop()
  },
  methods: {
    onPlay: function (event) {
      // 图片要切换
      if (!this.data.play) {
        this.setData({
          play: true
        })
        mMgr.title = this.properties.title
        // 音乐src为空，当赋值给了src，音乐会自动播放
        mMgr.src = this.properties.url
      } else {
        this.setData({
          play: false
        })
        // mMgr.stop() // 停止播放
        mMgr.pause() // 暂停播放
      }
    }
  }
})
