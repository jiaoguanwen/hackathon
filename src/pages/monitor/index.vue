<template>
  <div>
    <h2>图像采集</h2>
    <div class="video-wrapper">
      <video src></video>
      <div v-show="isShowCutboard" class="cutboard" :style="cutboardStyle"></div>
    </div>
    <canvas id="liveCanvas"></canvas>
    <canvas id="snapCanvas"></canvas>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'monitor',
  data() {
    return {
      context: null,
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
      }
    }
  },
  methods: {
    imgPick() {
      this.snapContext.drawImage(this.video, 0, 0, 200, 113)
      // send
      axios
        .post('http://127.0.0.1:8080/face/search', {
          image: document.querySelector('#snapCanvas').toDataURL()
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
    }
  },
  mounted() {
    this.context = document.querySelector('#liveCanvas').getContext('2d')
    this.snapContext = document.querySelector('#snapCanvas').getContext('2d')
    const constraints = { audio: false, video: { width: 1280, height: 720 } }
    navigator.mediaDevices.getUserMedia(constraints).then(mediaStream => {
      this.steam = mediaStream
      this.video = document.querySelector('video')
      this.video.srcObject = mediaStream
      const self = this
      this.video.onloadedmetadata = function() {
        self.video.play()
        self.timer = setInterval(self.imgPick, 3000)
      }
    })
  },
  beforeDestroy() {
    this.context = null
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