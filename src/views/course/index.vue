<template>
  <div class="main">
    <div class="container">
      <div class="video-box">
        <video
          :class="examBool==0?'video':'beenWatched'"
          id="videoElement"
          controls
          :src="videoUrl"
          height="300px"
        ></video>
      </div>
      <div class="content">
        <div class="title">{{course.name}}</div>
        <div class="minor">
          <div class="row" style="display: block;">
            作者：
            <span class="data">{{course.realname}}</span>
            <span class="word">({{course.unitName}})</span>
          </div>
          <!-- <div class="row">视频来源：</div> -->
        </div>
        <div class="minor fs_small">
          <div class="row">
            <div class="row_item">发布时间：{{course.createTime}}</div>
          </div>
          <div class="row">
            <div class="row_item">时长：{{getTotalTime(course.time)}}</div>
          </div>
          <div class="row">
            <div class="row_item">分类： {{course.courseTypes}}</div>
          </div>
          <div class="row">
            <div class="row_item">关键词：{{course.keywords}}</div>
          </div>
          <div class="row" style="margin-top:30px">
            <div class="row_item">
              <el-button
                type="success"
                @click="getFile(course.fileUrl)"
                size="mini"
                icon="el-icon-notebook-1"
                :loading="courseLoading"
                :disabled="course.fileUrl==''"
              >课件</el-button>
              <el-button
                type="warning"
                icon="el-icon-star-off"
                size="mini"
                @click="star"
                :loading="loading"
              >
                <span v-show="!isStar">收藏</span>
                <span v-show="isStar">取消收藏</span>
              </el-button>
              <!-- <el-button
                :disabled="examBool==0"
                type="primary"
                icon="el-icon-document"
                size="mini"
                @click="goExam"
              >进入考试</el-button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.main {
  background: #f5f5f5;
}
.container {
  width: 1080px;
  margin: 0 auto;
  padding: 30px 0;
  overflow: hidden;
}
.video-box {
  width: 600px;
  float: left;
  padding: 30px;
  background: #fff;
  .video {
    width: 100%;
    margin: 0 auto;
    &::-webkit-media-controls-timeline {
      display: none;
    }
  }
  .beenWatched {
    width: 100%;
    margin: 0 auto;
  }
}
.content {
  width: 300px;
  height: 300px;
  margin-left: 30px;
  padding: 30px;
  background: #fff;
  font-size: 14px;
  color: #555;
  float: left;
  .title {
    font-size: 18px;
    margin-bottom: 20px;
  }
}
.minor {
  margin-bottom: 20px;
  .data {
    color: #165694;
  }
  .word {
    margin-left: 5px;
    color: gray;
  }
  .row {
    height: 24px;
    line-height: 24px;
    display: flex;
    justify-content: space-between;
  }
  .row_item {
    flex: 1;
  }
}
.fs_small {
  font-size: 12px;
}
</style>
<script>
import flvjs from "flv.js";
import {
  courseDetail,
  courseStatus,
  collectionCourse,
  isCollectionCourse,
  studyStatus,
} from "@/api/course";
import { onlinePreview } from "../../api/admin";
import { totalTime } from "../../utils/index";
export default {
  name: "CourseIndex",
  data() {
    return {
      bacBase: this.$store.getters.bacBase,
      id: "",
      courseId: "",
      userId: "",
      course: {},
      curTime: "0.0",
      MaxTime: "0.0",
      timer: null,
      videoUrl: "",
      isStar: false,
      loading: false,
      courseLoading: false,
      examBool: 0, //是否可进入考试
    };
  },
  created() {
    // window.addEventListener("beforeunload", (e) => this.continue(e));
  },
  mounted() {
    // window.addEventListener("beforeunload", (e) => this.continue(e));
    this.init();
  },
  methods: {
    getTotalTime(x) {
      return totalTime(x);
    },
    //进入考试
    goExam() {
      this.$router.push({
        path: "/exam",
        query: {
          userId: this.course.userId,
          courseId: this.course.id,
        },
      });
    },
    //课件
    getFile(x) {
      this.courseLoading = true;
      let obj = {
        url: x,
        type: "image",
      };
      onlinePreview(obj).then((res) => {
        this.courseLoading = false;
        if (res.data.msg != null) {
          this.$message.error("课件出错，无法访问");
        } else {
          let newPage = this.$router.resolve({
            path: "/preview",
            query: {
              url: x,
              type: "image",
            },
          });
          window.open(newPage.href, "_blank");
        }
      });
      // window.open(this.bacBase + x, "_blank");
    },
    timeInterval() {
      this.timer = setInterval(() => {
        courseStatus(this.id, 0, this.curTime).then((res) => {
          // console.log(res);
        });
      }, 5000);
    },
    // //断点续播，刷新或关闭
    // continue(e) {
    //   console.log(e)
    //   e = e || window.event;
    //   if (e) {
    //     e.returnValue = "您是否确认离开此页面-您输入的数据可能不会被保存";
    //   }
    //   return "您是否确认离开此页面-您输入的数据可能不会被保存";
    //   // ...
    // },
    viderRender() {
      var that = this;
      let dura = 0;
      let last = Number(this.curTime);
      var videoElement = document.getElementById("videoElement");
      videoElement.addEventListener("play", () => {
        //播放开始执行的函数
        console.log("开始播放");
        videoElement.currentTime = this.curTime;
        console.log(videoElement.currentTime);
        let cur = videoElement.currentTime.toFixed(1);
        this.timeInterval();
        if (cur == "0.0") {
          console.log("123");
          let id = this.id;
          courseStatus(id, 0, cur).then((res) => {
            console.log(res);
          });
        }
      });
      videoElement.addEventListener("loadedmetadata", () => {
        videoElement.currentTime = that.curTime;
        dura = videoElement.duration;
        videoElement.addEventListener("timeupdate", handle);
      });
      function handle() {
        let cur = videoElement.currentTime.toFixed(1);
        that.curTime = videoElement.currentTime.toFixed(1);
        that.MaxTime = cur >= that.MaxTime ? cur : that.MaxTime;
        // console.log(that.MaxTime);
        // console.log(last);
        // 禁止前进后退
        if (cur - last > 2 || cur - last < 0) {
          videoElement.currentTime = last;
        } else {
          last = cur;
        }
        if (dura - cur <= 0) {
          let id = that.id;
          clearInterval(that.timer);
          courseStatus(id, 1, that.curTime).then((res) => {
            this.examBool = 1;
            location.reload();
            console.log(res);
          });

          videoElement.removeEventListener("timeupdate", handle);
        }
      }
    },
    init() {
      this.id = this.$route.query.id;
      courseDetail(this.id).then((res) => {
        console.log(res);
        if (res.code == 567) {
          this.$router.push({
            path: "/courseList",
            query: { id: this.$route.query.courseId },
          });
          this.$message.error("请先购买该课程");
          return;
        } else if (res.code == 200) {
          this.course = res.data;
          let videoUrl = res.data.videoUrl;
          console.log(videoUrl);
          if (videoUrl.indexOf("http") == -1) {
            videoUrl = this.bacBase + videoUrl;
            // videoUrl='ftp://192.168.1.82/R443-0008-R.mp4'
            let type = this.course.videoUrl.split(".")[1];
            console.log(type, videoUrl);
            //   if (flvjs.isSupported()) {
            //     var videoElement = document.getElementById("videoElement");
            //     var flvPlayer = flvjs.createPlayer({
            //       type: type,
            //       url: videoUrl,
            //     });
            //     flvPlayer.attachMediaElement(videoElement);
            //     flvPlayer.load();
            //   }

            // 强制播放
            var videoElement = document.getElementById("videoElement");
            var flvPlayer = flvjs.createPlayer({
              type: type,
              url: videoUrl,
            });
            flvPlayer.attachMediaElement(videoElement);
            flvPlayer.load();
          } else {
            this.videoUrl = videoUrl;
          }
        }else{
          this.$message.error(res.msg)
        }
      });
      this.getStudyStatus();
      isCollectionCourse(this.id).then((res) => {
        this.isStar = res.data;
      });
    },
    //学习进度回显
    getStudyStatus() {
      studyStatus({ courseId: this.id }).then((res) => {
        console.log(res.data);
        this.examBool = res.data[0] ? res.data[0].status : 0;
        this.curTime = res.data[0]
          ? res.data[0].learningTime == "undefined"
            ? "0.0"
            : res.data[0].learningTime
          : "0.0";
        this.MaxTime = this.curTime;
        if (this.examBool == 0) {
          this.viderRender();
        }
      });
    },
    star() {
      this.loading = true;
      collectionCourse(this.id)
        .then((res) => {
          this.loading = false;
          this.isStar = res.data;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
  },
  beforeRouteLeave: (to, from, next) => {
    //断点续播跳转
    if (from.timer) {
      clearInterval(from.timer);
    }
    next();
  },
  destroyed() {
    // window.removeEventListener("beforeunload", (e) => this.test(e));
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
};
</script>