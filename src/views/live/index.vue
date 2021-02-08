<template>
  <div class="container">
    <div class="section">
      <div class="title">会议直播</div>
      <div class="content">
        <div class="left">
          <div class="info">
            <div class="img-box" v-if="current">
              <el-image
                style="width: 300px; height: 250px"
                :src="`${bacBase}${current.picture}`"
                fit="fill"
              ></el-image>
            </div>
            <div class="word">
              <div class="word-row">会议名称：{{current.meetName}} </div>
              <div class="word-row">主办单位：{{current.host}}</div>
              <div class="word-row">协办单位：{{current.assist}}</div>
              <div class="word-row">承办单位：{{current.undertake}}</div>
              <div class="word-row">学科：{{current.subject}}</div>
              <div class="word-row">直播时间：{{current.stime}} ~ {{current.etime}}</div>
                 <div class="word-row"><button id="entranceLive" @click="entranceLive(current.link)">直播入口</button></div>
            </div>
          </div>
          <!-- <div class="link">
            <el-link type="danger" :href="current.link" target="_blank">直播入口</el-link>
          </div> -->
          <div class="left-section">
            <div class="left-title">会议简介</div>
            <div class="left-info" v-html="current.synopsis"></div>
          </div>
          <div class="left-section">
            <div class="left-title">
              精彩回放
              <!-- <span class="more">更多</span> -->
            </div>
            <div class="left-info">
              <div class="video-box" v-show="current.video">
                <video
                  class="video"
                  id="videoElement"
                  controls
                  :src="videoUrl"
                  ref="videoElement"
                  height="300px"
                ></video>
              </div>
              <div v-show="!current">暂无回放</div>
              <!-- <div class="info-row">
                                <el-link type="primary">2019第九届北京协和医院多学科协作(MDT)神经急重症高峰论坛</el-link>
                            </div>
                            <div class="info-row">
                                <el-link type="primary">2019第九届北京协和医院多学科协作(MDT)神经急重症高峰论坛</el-link>
                            </div>
                            <div class="info-row">
                                <el-link type="primary">2019第九届北京协和医院多学科协作(MDT)神经急重症高峰论坛</el-link>
              </div>-->
            </div>
          </div>
        </div>
        <div class="right">
          <div class="right-title">近期会议</div>
          <div class="list" v-if="lives.length">
            <!-- <el-scrollbar style="height:100%;width:100%"> -->
            <div
              class="item"
              :class="idSelect==item.id?'active':''"
              v-for="item in lives"
              :key="item.id"
            >
              <el-link type="success" @click="change(item)">{{item.meetName}}</el-link>
            </div>
            <!-- </el-scrollbar> -->
          </div>
          <div class="tip" v-else>暂无数据</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#entranceLive{
  padding: 3px 40px;
  font-size: 14px;
  font-weight: bold;
  background: #49af4f;
  color: #fff;
  border: 0;
  outline: 0;
  border-radius: 4px;
  cursor: pointer;
}
#entranceLive:hover{
  background: #38cf40;
}
.container {
  width: 1200px;
 margin: 20px auto;
  overflow: hidden;
}
.section {
  width: 100%;
  margin: 20px 0;
  font-size: 14px;
  .title {
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    background: #49af4f;
    color: #fff;
    padding-left: 11px;
  }
  .content {
    margin-top: 10px;
    overflow: hidden;
    .left {
      width: 70%;
      float: left;
      .left-section {
        margin: 15px 0;
      }
      .left-title {
        @extend .title;
        .more {
          display: block;
          float: right;
          margin-right: 8px;
          font-size: 14px;
          cursor: pointer;
        }
      }
      .left-info {
        padding: 11px;
        ::v-deep img{
            max-width: 100%;
        }
      }
      .info-row {
        margin: 10px 0;
      }
    }
    .right {
      float: right;
      width: 25%;
      height: 600px;
      border: 1px solid #ccc;
      .right-title {
        @extend .title;
        text-align: center;
        padding: 0;
      }
      .list {
        height: 540px;
        overflow-y: auto;
        .item {
          padding: 10px 10px;
        }
        .active {
          background: #deebf7;
        }
      }
      .tip {
        text-align: center;
        margin-top: 50px;
      }
    }
    .info {
      display: flex;
      justify-content: start;
      align-items: center;
      padding: 0 11px;
      .word {
        margin-left: 30px;
        .word-row {
          margin: 10px 0;
        }
      }
    }
    .link {
      margin: 10px 11px;
    }
  }
}
</style>
<script>
import { liveIndex,liveId } from "@/api/live";
import { formatDate,getTreeData } from "@/utils/index";
import flvjs from "flv.js";

export default {
  name: "helpIndex",
  data() {
    return {
      bacBase:this.$store.getters.bacBase,
      lives: [],
      pageNum:1,
      pageSize: 13,
      orderByColumn: "createTime",
      isAsc: "desc",
      current: false,
      videoUrl: "",
      idSelect: "",
      subjectId: "",
      meetName: "",
    };
  },
  created() {
    this.idSelect = this.$route.query.id;
    this.load();
  },
  methods: {
    //直播入口
    entranceLive(href){
      window.open(href,'_blank')
    },
    change(item) {
      //   console.log(item);
      if (item.id != this.idSelect) {
        this.$router.replace({
          path: "/live",
          query: { id: item.id }
        });
        this.idSelect = item.id;
        this.current = item;
        this.current.stime = formatDate(this.current.stTime);
        this.current.etime = formatDate(this.current.endTime);
         if (this.current.video) {
            let videoUrl = this.current.video;
            videoUrl = this.bacBase + videoUrl;
            let type = this.current.video.split(".")[1];
            if (flvjs.isSupported()) {
              var videoElement = this.$refs.videoElement;
              var flvPlayer = flvjs.createPlayer({
                type: type,
                url: videoUrl
              });
              flvPlayer.attachMediaElement(videoElement);
              flvPlayer.load();
            }
          }
      }
    },
    load() {

      liveId(this.idSelect).then(res => {
        console.log(res);
        this.current = res.data;
          console.log(this.current)
          this.current.stime = formatDate(this.current.stTime)
          this.current.etime = formatDate(this.current.endTime);
          if (this.current.video) {
            let videoUrl = this.current.video;
            videoUrl = this.bacBase + videoUrl;
            let type = this.current.video.split(".")[1];
            if (flvjs.isSupported()) {
              var videoElement = this.$refs.videoElement;
              var flvPlayer = flvjs.createPlayer({
                type: type,
                url: videoUrl
              });
              flvPlayer.attachMediaElement(videoElement);
              flvPlayer.load();
            }
          }
        })
        // console.log(this.lives);
  
        let data = { 
          meetName: this.meetName, 
          subjectId: this.subjectId,
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          orderByColumn:this.orderByColumn,
          isAsc:this.isAsc
          };
        console.log(data)
      liveIndex(data).then(res => {
        console.log(res);
        this.lives = res.data;
        // console.log(this.lives);
      });
    },
     handleChange(value) {
        this.subjectId=value[value.length-1]
    //   console.log(this.formLabelAlign.subject);
    },
  }
};
</script>