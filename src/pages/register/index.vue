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
      <div class="video-wrapper">
        <video src></video>
        <div v-show="isShowCutboard" class="cutboard" :style="cutboardStyle"></div>
      </div>
      <div class="button-wrapper">
        <el-button @click="handleClick">截图</el-button>
        <!-- <el-button @click="stop">停止</el-button> -->
        <!-- <el-button @click="photo">上传</el-button> -->
      </div>
      <canvas id="liveCanvas"></canvas>
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
        phone: ''
      },
      context: null,
      steam: null,
      video: null,
      timer: null,
      isShowCutboard: false,
      cutboardStyle: {
        width: '50px',
        height: '50px',
        top: '50px',
        left: '50px'
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
      this.context.drawImage(this.video, 0, 0, 200, 150)
    },
    stop() {
      this.steam.getVideoTracks()[0].stop()
    }
  },
  mounted() {
    this.context = document.querySelector('#liveCanvas').getContext('2d')
    const constraints = { audio: false, video: true }
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
.video-wrapper {
  width: 640px;
  height: 480px;
  position: relative;
  .cutboard {
    position: absolute;
    border: 1px solid green;
  }
}
</style>