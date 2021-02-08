<template>
  <div class="container">
    <div class="ban">
      <el-carousel trigger="click" height="393px">
        <el-carousel-item v-for="(item,index) in banner1" :key="index">
          <a target="_blank" style="display: block;">
            <el-image style="width: 100%; height: 393px" :src="item.img" fit="fill"></el-image>
          </a>
        </el-carousel-item>
      </el-carousel>
      <div class="news">
        <div class="news-title">最新资讯</div>
        <div class="news-list">
          <el-image style="width: 100%; height: 200px" :src="url" fit="fill"></el-image>
          <a class="news-item" v-for="(item,index) in news1" :key="index">
            <span>{{item}}</span>
          </a>
        </div>
      </div>
    </div>
    <div class="inner-container">
      <div class="section">

      </div>
     <div class="ssection">
        <div class="section-title">系统化学习路径</div>
        <div class="section-content">
          <div class="systemList">
            <div class="item" v-for="(elem,i) of sysTemList" :key="i">
              <img :src="require('../../assets/'+elem.img)" />
              <div class="intro">
                <div class="title">{{elem.title}}</div>
                <div class="secTitle">{{elem.secTitle}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="section se1">
        <div class="section-title" style="marginBottom:10px">
          继教学院
          <span @click="projectMore(0)">学习的乐园，获取更多实践知识</span>
        </div>
        <div class="listName">
          <span
            :style="{color:activeProject==i?'#fff':'#888',background:activeProject==i?'#49af4f':'rgba(56, 207, 64, 0.1)'}"
            @mouseenter="changeActive(i)"
            v-for="(item,i) in courseType"
            :key="item.id"
          >{{item.name}}</span>
        </div>
        <div  class="course-list">
          <div
            class="course1"
            v-for="course in projectList"
            :key="course.id"
            @click="goCourseList(course)"
          >
          <span class="topTip">
            最新
          </span>
            <a href="javascript:;" class="course-img">
              <div class="cover">
                <img :src="require('../../assets/bofang_huaban.png')" alt />
              </div>
              <el-image
                :src="course.picture.indexOf('http')==-1?(bacBase+course.picture):course.picture"
                fit="fill"
              ></el-image>
            </a>
            <a href="javascript:;" class="course-tit">{{course.name}}</a>
            <p class="course-p">主讲人：{{course.realname}}</p>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">
          入门视频
          <span @click="projectMore(2)">MORE</span>
        </div>
        <div class="section-content">
          <div class="course-list">
            <div
              class="course"
              v-for="course in boutique"
              :key="course.id"
              @click="goCourse(course)"
            >
              <span class="topTip">
            最热
          </span>
              <a href="javascript:;" class="course-img">
                <el-image
                  :src="course.picture.indexOf('http')==-1?(bacBase+course.picture):course.picture"
                  fit="fill"
                ></el-image>
              </a>
              <a href="javascript:;" class="course-tit">{{course.name}}</a>
              <p class="course-p">主讲人：{{course.realname}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="section-title">
          知识宝库
          <span @click="projectMore(2)">名院、名师推荐课程体系，让学习思路更明确</span>
        </div>
        <div class="section-content">
          <div class="course-list">
            <div
              class="college"
              v-for="item in collegeRecommendList"
              :key="item.id"
              @click="goCollege(item.id)"
            >
              <a href="javascript:;" class="college-img">
                 <el-image
                  :src="item.logo.indexOf('http')==-1?(bacBase+item.logo):item.logo"
                  fit="fill"
                ></el-image>
              </a>
              <a href="javascript:;" class="college-tit">{{item.name}}</a>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">
          会议直播
          <span @click="liveMore">MORE</span>
        </div>
        <div class="section-content">
          <div class="course-list">
            <div class="course" v-for="item in liveList" :key="item.id" @click="goLive(item)">
              <a href="javascript:;" class="course-img">
                <el-image
                  :src="item.picture.indexOf('http')==-1?(bacBase+item.picture):item.picture"
                  fit="fill"
                ></el-image>
              </a>
              <a href="javascript:;" class="course-tit">{{item.meetName}}</a>
              <p class="course-p">主办方：{{item.host}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.se1 {
  ::v-deep .el-tabs__item {
    width: 400px;
    color: #6d7278;
    text-align: center;
    background: rgba(56, 207, 64, 0.1);
  }
  ::v-deep .is-active {
    color: #fff !important;
    background: #49af4f !important;
  }
}
$innerWidth: 1200px;
.ban {
  position: relative;
}
.ban > .news {
  position: absolute;
  top: 0%;
  right: 20%;
  z-index: 9;
  background: rgba(0, 0, 0, 0.5);
  width: 300px;
  border-radius: 4px;
}
.ban::v-deep .el-image {
  display: block;
}
.container {
  background: #fff;
  overflow: hidden;
  .inner-container {
    width: $innerWidth;
    margin: 10px auto 0;
  }
  .section {
    width: 100%;
    // border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
    & + .section {
      margin: 15px 0;
    }
  }
}
.captcha-box {
  cursor: pointer;
  height: 29px;
}
.login {
  width: 300px;
  background: #fff;
  border: 1px solid #ddd;
  border-top: 3px solid #1277af;
  float: left;
  .login-nav {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .login-nav_item {
    flex-grow: 1;
    font-size: 16px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    background: #1277af;
    color: #fff;
  }
  .active {
    background: #fff;
    color: #555;
  }
  .login-form {
    padding: 15px;
  }
  .login-btngroup {
    padding: 0 15px 15px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .btn_flex {
      margin-left: 0;
      margin-bottom: 10px;
    }
  }
}
.userinfo {
  width: 300px;
  background: #fff;
  border: 1px solid #ddd;
  border-top: 3px solid #1277af;
  float: left;
  height: 393px;
  box-sizing: border-box;
  .content {
    padding: 15px;
  }
  .top-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    .top-row {
      flex-grow: 1;
      margin-left: 30px;
      .row {
        height: 24px;
        line-height: 24px;
      }
      .label {
        color: #898989;
        margin-right: 10px;
      }
    }
  }
  .minor {
    margin-top: 20px;
    font-size: 14px;
    .row {
      height: 24px;
      line-height: 24px;
    }
    .label {
      color: #898989;
      margin-right: 30px;
    }
  }
  .info-btngroup {
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .btn_flex {
      margin-left: 0;
      margin-bottom: 10px;
    }
  }
}
.submit {
  width: 100%;
  margin-top: 10px;
}

#logout {
  width: 100%;
  margin-top: 40px;
}
.inline-item .el-input {
  width: 80px;
  margin-right: 5px;
}
.inline-item2 .el-input {
  width: 105px;
  margin-right: 10px;
}
.banner {
  float: left;
  margin-left: 15px;
  width: 570px;
  .el-image {
    width: 570px;
    height: 393px;
  }
}
.listName {
  display: flex;
  justify-content: start;
  border: 1px solid #ddd;
  span {
    background: rgba(56, 207, 64, 0.1);
    flex: 1;
    text-align: center;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
  }
}
.news {
  .news-title {
    background: #479ff2;
    height: 40px;
    line-height: 40px;
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
  }
  .news-list {
    padding: 20px;
    height: 313px;
    font-size: 14px;
    .news-item {
      display: block;
      height: 26px;
      line-height: 26px;
      color: #fff;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      & + .news-item {
        margin-top: 10px;
      }
    }
    .news-item:hover {
      color: #49af4f;
    }
  }
}
.systemList {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  .item {
    width: 180px;
    height: 120px;
    border-radius: 4px;
    position: relative;
    cursor: pointer;
    img {
      border-radius: 4px;
      position: absolute;
      left: 0;
      top: 0;
    }
    .intro {
      position: absolute;
      z-index: 10;
      top: 30%;
      width: 100%;
      .title {
        font-family: PingFangSC-Medium;
        font-size: 24px;
        color: #ffffff;
        text-align: center;
        margin: 0 auto;
      }
      .secTitle {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #ddd;
        text-align: center;
        margin: 5px auto;
      }
    }
  }
}
.college {
  margin: 5px 8px;
  &:hover {
    box-shadow: 0 0 3px 5px #eee;
    border-radius: 8px;
  }
  &:hover .college-tit {
    color: #e90101;
  }
  .college-img {
    display: block;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    width: 182px;
    height: 132px;
    text-align: center;
    .el-image {
      // border: 1px solid #ddd;
      margin-top: 20px;
      width: 90px;
      height: 90px;
      transition: 0.7s;
    }
  }
  .college-img:hover .cover {
    top: 0px;
  }
  .college-img:hover .el-image {
    transform: rotate3d(50, 50, 50, 360deg) scale(1.4);
  }
  .college-tit {
    width: 182px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
    font-size: 14px;
    font-weight: bold;
    color: #525252;
    cursor: pointer;
  }
}

.course-list {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  padding: 0 0 15px 0;
}
.course1:nth-child(4n+0){
  margin-right: 0;
}
.course1 {
  border: 1px solid #eee;
  position: relative;
  // margin-right: 10px;
  padding: 2px;
  margin-right: 12px;
  height: 215px;
  &:hover {
    box-shadow: 0 0 3px 3px #eee;
  }
  &:hover .course-tit {
    color: #e90101;
  }
  .course-img {
    display: block;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    width: 285px;
    height: 160px;
    .cover {
      transition: 0.3s;
      width: 285px;
      height: 160px;
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      top: -160px;
      z-index: 2;
      text-align: center;
      img {
        width: 64px;
        height: 64px;
        margin-top: 50px;
      }
    }
    .el-image {
      border: 1px solid #ddd;
      width: 285px;
      height: 160px;
      transition: 0.3s;
    }
  }
  .course-img:hover .cover {
    top: 0px;
  }
  .course-img:hover .el-image {
    transform: scale(1.1);
  }
  .course-tit {
    width: 265px;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
    font-size: 14px;
    color: #525252;
    margin-top: 2px;
    margin-left: 10px;
    cursor: pointer;
  }
  .course-p {
    height: 14px;
    line-height: 14px;
    color: #bfbebe;
    font-size: 12px;
    width: 265px;
     margin-top: 2px;
    margin-left: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.course {
  border: 1px solid #ddd;
  border-radius: 4px;
  // margin-right: 18px;
  position: relative;
  margin: 2px 8px 20px;
  height: 205px;
  padding: 2px 0;
  &:hover {
    box-shadow: 0 0 3px 3px #eee;
  }
  &:hover .course-tit {
    color: #e90101;
  }
  .course-img {
    border-radius: 4px;
    display: block;
    cursor: pointer;
    width: 220px;
    height: 150px;
    overflow: hidden;
    .el-image {
      width: 220px;
      height: 150px;
      transition: 0.3s;
    }
    .el-image:hover {
      transform: scale(1.1);
    }
  }
  .course-tit {
    width: 200px;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
    font-size: 14px;
    color: #525252;
    margin-top: 2px;
    margin-left: 10px;
    cursor: pointer;
  }
  .course-p {
    height: 14px;
    line-height: 14px;
    color: #bfbebe;
    font-size: 12px;
    margin-top: 2px;
      margin-left: 10px;
    width: 200px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
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
    color: #6D7278;
    cursor: pointer;
  }
}
.section-content {
  background: #fff;
  padding: 10px 5px;
}
.course-tit {
  width: 230px;
}
.topTip{
  position: absolute;
  display: inline-block;
  background: #DD1515;
box-shadow: 0 2px 4px 0 rgba(214,0,0,0.20);
border-radius: 0 0 4px 4px;
font-family: PingFangSC-Medium;
font-size: 12px;
color: #FFFFFF;
padding: 2px 10px;
top:2px;
left: 10px;
z-index: 100;
}
</style>
<style lang="scss">
.inline-item2 .el-form-item__content {
  display: flex;
}
.login-form {
  .el-input--mini .el-input__inner {
    height: 31px;
    line-height: 31px;
    .el-form-item--mini .el-form-item__label {
      height: 31px;
      line-height: 31px;
    }
  }
}
</style>
<script>
import {
  newsList,
  bannerList,
  courseList,
  boutiqueList,
  getCaptcha,
  collegeRecommend,
} from "@/api/index";
import { login, userInfo } from "@/api/user";
import { liveIndex } from "@/api/live";
export default {
  name: "Index",
  data() {
    return {
      bacBase: this.$store.getters.bacBase,
      imgcode: "",
      header: "",
      userInfo: {},
      labelWidth: "85px",
      currentIndex: 1,
      showLogin: true,
      banner1:[{img:require('../../assets/banner/11.jpg')},{img:require('../../assets/banner/22.jpg')},{img:require('../../assets/banner/33.jpg')},{img:require('../../assets/banner/44.jpg')},],
      formLabelAlign: {
        uname: "",
        pwd: "",
        captchaImg: "",
      },
      rulesFormAlign: {
        uname: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pwd: [{ required: true, message: "请输入密码", trigger: "blur" }],
        captchaImg: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
      loading2: false,
      logoutLoading: false,
      formLabelPhone: {
        phone: "",
        phoneCaptcha: "",
        phoneCaptchaImg: "",
      },
      banner: [],
      url:require('../../assets/banner/23.gif'),
      news1: ['1111111111','222222222222222222','33333333333333333333','444444444444444444444444'],
      courseType: [],
      activeProject: 0,
      projectList: [],
      collegeRecommendList:[],
      boutique: [],
      liveList: [],
      sysTemList: [
        {
          title: "小白入门",
          secTitle: "名师授课，高效无忧",
          img: "bg3.png",
        },
        {
          title: "讲师分析难点",
          secTitle: "突出重点，轻松备考",
          img: "bg6.png",
        },
        {
          title: "考试规格",
          secTitle: "独家辅导，考点透析",
          img: "bg1.png",
        },
        {
          title: "深入底层",
          secTitle: "高效学习，通关无忧",
          img: "bg5.png",
        },
        {
          title: "消化结构",
          secTitle: "名师授课，通关无忧",
          img: "bg4.png",
        },
        {
          title: "掌握流程",
          secTitle: "名师授课，通关无忧",
          img: "bg2.png",
        },
      ],
    };
  },
  methods: {
    changeActive(i) {
      this.activeProject = i;
      this.projectList = this.courseType[i].projectList;
    },
    refresh() {
      getCaptcha().then((res) => {
        this.imgcode = res.data.img;
        this.uuid = res.data.uuid;
      });
    },
    goCourseList(item) {
      let id = item.id;
      this.$router.push({
        path: `/courseList`,
        query: { id: id },
      });
    },
    projectMore(i) {
      sessionStorage.setItem("active", i);
      if(i==2){
        this.$router.push({
          path: `knowledgeNav/list`,
        });
      }else{
        this.$router.push({
          path: `college`,
        });
      }
    },
    goCourse(item) {
      let id = item.id;
      let courseId = item.projectId;
      console.log(item);
      this.$router.push({
        path: `/course`,
        query: {
          id: id,
          courseId: courseId,
        },
      });
    },
    liveMore() {
      sessionStorage.setItem("active", 3);
      this.$router.push({
        path: `liveList`,
      });
    },
    goLive(item) {
      let id = item.id;
      this.$router.push({
        path: `/live`,
        query: { id: id },
      });
    },
    //专科学院
    goCollege(x) {
      sessionStorage.setItem("active", 1);
      this.$router.push({
        path: `/college`,
        query: {
          collegeId: x,
        },
      });
    },
    logout() {
      this.logoutLoading = true;
      this.$store
        .dispatch("user/logout")
        .then(() => {
          this.logoutLoading = false;
          this.refresh();
          this.showLogin = true;
        })
        .catch((error) => {
          this.logoutLoading = false;
        });
    },
    changeType(type) {
      this.currentIndex = type;
    },
    submitForm2() {
      this.$refs["ruleFormAlign"].validate((valid) => {
        if (valid) {
          this.loading2 = true;
          var formData = {};
          formData.loginName = this.formLabelAlign.uname;
          formData.password = this.formLabelAlign.pwd;
          formData.code = this.formLabelAlign.captchaImg;
          formData.uuid = this.uuid;
          this.$store
            .dispatch("user/login", formData)
            .then(() => {
              this.loading2 = false;
              this.$refs["ruleFormAlign"].resetFields();
              this.$store.dispatch("user/userInfo").then((res) => {
                this.userInfo = res;
                this.header = res.header;
                this.showLogin = false;
              });
            })
            .catch((error) => {
              this.loading2 = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  // mounted() {
  //   const num = 5;
  //   const courseNum = 4;
  //   var token = this.$store.getters.token;
  //   if (token) {
  //     this.showLogin = false;
  //     this.$store.dispatch("user/userInfo").then((res) => {
  //       console.log(this.$store.getters.userInfo);
  //       this.userInfo = res;
  //       this.header = res.header;
  //     });
  //   } else {
  //     this.refresh();
  //     this.showLogin = true;
  //   }
  //   newsList(10).then((res) => {
  //     this.news = res.data;
  //   });
  //   bannerList(num).then((res) => {
  //     this.banner = res.data;
  //   });
  //   courseList({ num: courseNum, topNum: 5 }).then((res) => {
  //     console.log(res);
  //     this.courseType = res.data;
  //     this.projectList = this.courseType[0].projectList;
  //   });
  //   boutiqueList(10).then((res) => {
  //     this.boutique = res.data;
  //   });
  //   collegeRecommend(6).then(res=>{
  //     this.collegeRecommendList=res.data
  //   })
  //   liveIndex({
  //     pageNum: 1,
  //     pageSize: 5,
  //   }).then((res) => {
  //     this.liveList = res.data;
  //     console.log(this.liveList);
  //   });
  // },
};
</script>
