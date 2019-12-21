<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <h2>信息录入</h2>
      <el-form :model="form" @submit.native.prevent label-position="top">
        <el-form-item label="京东用户名">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="16">
      <h2>图像采集</h2>
      <video src></video>
      <div class="button-wrapper">
        <el-button @click="handleClick">截图</el-button>
        <!-- <el-button @click="stop">停止</el-button> -->
        <!-- <el-button @click="photo">上传</el-button> -->
      </div>
      <canvas id="liveCanvas" width="1280" height="720"></canvas>
      <canvas id="snapCanvas" width="1280" height="720"></canvas>
    </el-col>
  </el-row>
</template>

<script>
import axios from 'axios'

export default {
  name: 'register',
  data() {
    return {
      form: {
        name: '',
        context: null,
        steam: null,
        video: null,
        snapContext: null,
        timer: null
      }
    }
  },
  methods: {
    onSubmit() {
      const image = document.querySelector('#liveCanvas').toDataURL()
      const { name: userId, phone } = this.form
      axios
        .post('http://127.0.0.1:8080/face/register', { image, userId, phone })
        .then(res => {
          console.log(res)
        })
    },
    handleClick() {
      this.context.drawImage(this.video, 0, 0, 1280, 720, 0, 0, 1280, 720)
    },
    stop() {
      this.steam.getVideoTracks()[0].stop()
    },
    imgPick() {
      this.snapContext.drawImage(this.video, 0, 0, 1280, 720, 0, 0, 1280, 720)
      // send
      axios
        .post('http://127.0.0.1:8080/face/search', {
          image: document.querySelector('#snapCanvas').toDataURL()
        })
        .then(res => {
          console.log(res)
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
      }
    })
    this.timer = setInterval(this.imgPick, 3000)
  },
  beforeDestroy() {
    console.log('beforeDestory')
    this.context = null
    this.steam.getVideoTracks()[0].stop()
    this.steam = null
    this.video = null
    clearInterval(this.timer)
  }
}
</script>

<style lang="scss" scoped>
.button-wrapper {
  margin-top: 7px;
  margin-bottom: 10px;
}
#snapCanvas {
  visibility: hidden;
}
</style>