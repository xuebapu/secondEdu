<template>
  <div>
    <div class="con">
      <div class="collegeHeader">
        <!-- <el-image class="logo" fit="cover" :src="require('../../assets/'+getLogo())"></el-image> -->
        <div class="carousel">
          <el-carousel v-if="list.carousels" direction="vertical" arrow="nerver" height="420px">
            <el-carousel-item v-for="item in list.carousels" :key="item">
              <el-image
                fit="fill"
                style="height:420px;width:100%"
                :src="item.indexOf('http')==-1?(bacBase+item):item"
              ></el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="section" v-if="list.experts&&list.experts.length!=0">
        <div class="section-title">讲师介绍</div>
        <div class="section-content">
          <div class="course-list" >
            <div class="teacher" v-for="elem in list.experts" :key="elem.id">
              <div class="teacher-img">
                <el-image
                  :src="elem.avatar.indexOf('http')==-1?(bacBase+elem.avatar):elem.avatar"
                  fit="fill"
                ></el-image>
              </div>
              <div class="right">
                <div class="name">
                  {{elem.name}}
                  <el-button type="warning" size="mini" plain>立即关注</el-button>
                </div>
                <div class="title">{{elem.branch}}</div>
                <div class="intro">{{elem.jobTitle}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section"  v-if="list.organizations">
        <div class="section-title">组织架构</div>
        <div class="orgMore">
          <div class="img-top" v-if="list.organizations[0]">
              <el-image
              style="width:100%"
                  :src="list.organizations[0].indexOf('http')==-1?(bacBase+list.organizations[0]):list.organizations[0]"
                  fit="fill"
                ></el-image>
            <!-- <img :src="require('../../assets/org-top.png')" alt /> -->
          </div>
          <div class="img-bot" v-if="list.organizations[1]">
              <el-image
              v-show="!orgMore"
              style="width:100%"
                  :src="list.organizations[1].indexOf('http')==-1?(bacBase+list.organizations[1]):list.organizations[1]"
                  fit="fill"
                ></el-image>
            <!-- <img v-show="!orgMore" :src="require('../../assets/org-bottom.png')" alt /> -->
            <el-button @click="orgMore=!orgMore" size="mini">{{orgMore?'查看更多':'收起'}}</el-button>
          </div>
        </div>
      </div>
      <div class="botInfo">
        <div>
          <h3>相关论文</h3>
          <ul v-if="list.meetings">
            <li v-for="(elem,i) of list.meetings" :key="i" @click="go(elem.url)">{{elem.name}}</li>

          </ul>
        </div>
        <div>
          <h3>相关直播</h3>
          <ul v-if="list.lives">
             <li v-for="(elem,i) of list.lives" :key="i" @click="go(elem.url)">{{elem.name}}</li>
          </ul>
        </div>
        <div>
          <h3>相关视频</h3>
          <ul v-if="list.videos">
             <li v-for="(elem,i) of list.videos" :key="i" @click="go(elem.url)">{{elem.name}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { collegeDetails } from "@/api/college";
export default {
  created() {
    this.collegeId = this.$route.query.collegeId;
  },
  data() {
    return {
      bacBase: this.$store.getters.bacBase,
      collegeId: "",
      collegeList: [
        { id: 1, name: "无敌java", img: "1.png" },
        { id: 2, name: "快乐python", img: "中华1学院.png" },
        { id: 3, name: "逻辑php", img: "中华乳腺1学院.png" },
        { id: 4, name: "基层c#", img: "中华1肠外科学院.png" },
        {
          id: 5,
          name: "复杂sql",
          img: "中华疝1外科学院.png",
        },
        {
          id: 6,
          name: "简单JavaScript",
          img: "中华医学科1理学院.png",
        },
        { id: 7, name: "快速vue", img: "中华呼吸1学院.png" },
      ],
      list: [],
      orgMore: true,
    };
  },
  mounted() {
    collegeDetails(this.collegeId).then((res) => {
      console.log(res);
      this.list = res.data;
    });
  },
  methods: {
    getLogo() {
      let x = "";
      this.collegeList.forEach((elem) => {
        if (this.collegeId == elem.id) {
          x = elem.img;
        }
      });
      return x;
    },
    go(url){
      console.log(url)
    }
  },
  watch: {
    $route(x) {
      this.collegeId = x.query.collegeId;
       collegeDetails(this.collegeId).then((res) => {
      console.log(res);
      this.list = res.data;
    });
    },
  },
};
</script>

<style lang="scss" scoped>
$innerWidth: 1200px;
.con {
  background-color: #fff;
  padding-bottom: 100px;
  .collegeHeader {
    width: 100%;
    margin: 0 auto;
    position: relative;
    .logo {
      position: absolute;
      height: 200px;
      width: 200px;
      top: 50px;
      left: 100px;
      z-index: 10;
    }
    .carousel {
      height: 420px;
    }
  }

  .orgMore {
    background: #fff;
    padding: 10px 5px;
    text-align: center;
  }
  .section {
    width: $innerWidth;
    margin: 0 auto;
    border-radius: 4px;
    overflow: hidden;
    & + .section {
      margin: 15px 0;
      width: $innerWidth;
      margin: 0 auto;
      border-radius: 4px;
      overflow: hidden;
    }
    .section-title {
      height: 40px;
      margin-top: 10px;
      line-height: 40px;
      font-size: 16px;
      font-size: 24px;
      font-weight: bold;
      color: #2d323e;
      padding-left: 5px;
      span {
        font-size: 14px;
        color: #888;
        cursor: pointer;
      }
    }
    .section-content {
      background: #fff;
      padding: 10px 5px;
    }
  }
  .teacher {
    width: 384px;
    height: 110px;
    background: #ffffff;
    border-radius: 4px;
    display: flex;
    padding: 5px;
    justify-content: start;
    flex-wrap: nowrap;
    .teacher-img {
      width: 100px;
      height: 100px;
      .el-image {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }
    .right {
      width: 270px;
      height: 100px;
      margin-left: 10px;
      .name {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
        margin-top: 10px;
        height: 30px;
        button {
          float: right;
          transform: scale(0.85);
        }
      }
      .title {
        font-family: PingFangSC-Medium;
        font-size: 14px;
        width: 250px;
        color: #2d323e;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 5px;
      }
      .intro {
        font-family: PingFangSC-Regular;
        width: 250px;
        font-size: 12px;
        color: #6d7278;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 5px;
      }
    }
  }
  .course-list {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
  }
  .botInfo {
    padding-top: 40px;
    display: flex;
    justify-content: space-between;
    width: $innerWidth;
    margin: 0 auto;
    border-radius: 4px;
    div {
      width: 380px;
      height: 250px;
      // border: 1px solid #ddd;
      box-shadow: 0 -2px 3px 3px #eee;
      h3 {
        border-bottom: 1px solid #ddd;
        border-left: 4px solid #49af4f;
        padding: 0 0 5px 10px;
        height: 30px;
        line-height: 30px;
      }
      ul {
        list-style: none;
        width: 100%;
        height: 210px;
        overflow: hidden;
        li {
          // border-bottom: 1px dashed #ddd;
          width: 370px;
          font-size: 14px;
          padding-left: 10px;
          height: 30px;
          line-height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #666;
          cursor: pointer;
          span {
            float: right;
            transform: scale(0.9);
            color: #999;
            margin-right: 10px;
          }
        }
        li:hover {
          background: rgba(56, 207, 64, 0.1);
        }
      }
    }
  }
}
</style>
