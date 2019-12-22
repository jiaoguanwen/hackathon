<template>
  <div>
    <h2>图像采集</h2>
    <div class="video-wrapper">
      <video src></video>
      <div v-show="isShowCutboard" class="cutboard" :style="cutboardStyle"></div>
    </div>
    <canvas id="snapCanvas" width="200" height="113"></canvas>
    <el-button @click="startSearch" type="primary">开始采集</el-button>
    <el-button @click="stopSearch">停止采集</el-button>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'monitor',
  data() {
    return {
      steam: null,
      video: null,
      snapContext: null,
      timer: null,
      isShowCutboard: false,
      cutboardStyle: {
        width: '',
        height: '',
        top: '',
        left: ''
      },
      snapCanvas: null
    }
  },
  methods: {
    imgPick() {
      this.snapContext.drawImage(this.video, 0, 0, 200, 113)
      // send
      console.log(this.snapCanvas.toDataURL())
      axios
        .post('http://127.0.0.1:8080/face/search', {
          image: this.snapCanvas.toDataURL()
        })
        .then(res => {
          if (Number(res.code) === 0 && res.data) {
            this.isShowCutboard = true
            let { height, left, top, width } = res.data
            this.$set(this, 'cutboardStyle', {
              top: `${top * 6.4}px`,
              left: `${left * 6.4}px`,
              width: `${width * 6.4}px`,
              height: `${height * 6.4}px`
            })
          } else {
            this.isShowCutboard = false
          }
        })
    },
    startSearch() {
      this.imgPick()
      this.timer = setInterval(this.imgPick, 3000)
    },
    stopSearch() {
      clearInterval(this.timer)
      this.isShowCutboard = false
    }
  },
  mounted() {
    this.snapCanvas = document.querySelector('#snapCanvas')
    this.snapContext = this.snapCanvas.getContext('2d')
    const constraints = { audio: false, video: { width: 1280, height: 720 } }
    navigator.mediaDevices.getUserMedia(constraints).then(mediaStream => {
      this.steam = mediaStream
      this.video = document.querySelector('video')
      this.video.srcObject = mediaStream
      const self = this
      this.video.onloadedmetadata = function() {
        self.video.play()
      }
    })
  },
  beforeDestroy() {
    this.steam.getVideoTracks()[0].stop()
    this.steam = null
    this.video = null
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>
#snapCanvas {
  visibility: hidden;
}
.video-wrapper {
  width: 1280px;
  height: 720px;
  position: relative;
  .cutboard {
    position: absolute;
    border: 1px solid green;
  }
}
</style>