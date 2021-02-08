<template>
  <div class="home">
    <el-backtop :bottom="100" :right="100">
      <div
        style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #49af4f;
        border-radius:50%;
      }"
      >UP</div>
    </el-backtop>
    <header>
      <div class="head">
        <div style="marginRight:30px">
          <img src="../assets/logo.png" style="height:80px;size:100%" alt />
          <!-- 衢州logo -->
          <!-- <img src="../assets/qzjj.png" style="height:90px;size:100%" alt /> -->
        </div>
         <div class="name">
          <span style="fontSize:20px;color:#fff;fontWeight:700;fontFamily:STFangsong">中华 继教</span>
          <br />
          <span
            style="fontStyle:italic;fontSize:15px;color:#fff;fontWeight:600;fontFamily:KaiTi"
          >CHINA CME</span>
        </div>
        <div class="course">
          <el-cascader
            @change="handleChange"
            v-model="subjectId"
            :options="courseTree"
            :props="defaultProps"
            placeholder="学科分类"
          ></el-cascader>
        </div>
<!--        <div class="liveName">-->
<!--          <span>会议直播</span>-->
<!--        </div>-->
        <div class="search">
          <div>
            <el-dropdown @command="handleCommand1">
              <span class="el-dropdown-link">
                {{type}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="课程">课程</el-dropdown-item>
                <el-dropdown-item command="直播">直播</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <input type="text" v-model="name" />
            <button @click="search">
              <i class="el-icon-search"></i> 搜索
            </button>
          </div>
        </div>
        <!-- <div class="tip">
          <span></span>
        </div>
        <div class="shop">
          <span></span>
        </div>-->
        <div class="user">
          <el-breadcrumb style="lineHeight:2" v-if="!token" separator="/">
            <el-breadcrumb-item>
              <span style="cursor:pointer" @click="sign">注册</span>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
              <span
                style="cursor:pointer"
                v-if="!token"
                size="mini"
                @click="centerDialogVisible=true;loginBac=true"
              >登录</span>
            </el-breadcrumb-item>
          </el-breadcrumb>
          <el-dropdown v-if="token" @command="handleCommand">
            <span class="el-dropdown-link">
              {{userInfo.username}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="个人中心">个人中心</el-dropdown-item>
              <el-dropdown-item command="修改信息">修改信息</el-dropdown-item>
              <el-dropdown-item command="订单管理">订单管理</el-dropdown-item>
              <el-dropdown-item command="学分查询">学分查询</el-dropdown-item>
              <el-dropdown-item command="在线购卡">在线购卡</el-dropdown-item>
              <el-dropdown-item command="购卡记录">购卡记录</el-dropdown-item>
              <el-dropdown-item command="在线绑卡">在线绑卡</el-dropdown-item>
              <el-dropdown-item command="退出">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="userImg">
          <el-avatar
            :size="30"
            :src="userInfo.header?(userInfo.header.indexOf('http')==-1?(bacBase+userInfo.header):userInfo.header):require('../assets/userDefault.png')"
          ></el-avatar>
        </div>
      </div>
    </header>
    <div class="nav-container" :style="{position:fixed?'fixed':''}">
      <div class="nav">
        <div class="btn" @mouseenter="showSe=true" @mouseleave="showSe=false;">
          学科分类
          <i class="el-icon-arrow-down"></i>
          <tab-select
            @showSe="closeSe"
            v-show="showSe"
            v-if="Bshow"
            left="0px"
            top="60px"
            :lists="courseTree"
          ></tab-select>
        </div>
        <router-link
          :style="{borderBottom:active==0? '3px solid #49af4f':'3px solid #fff',color:active==0?'#49af4f':' #2D323E'}"
          @click.native="activeC(0)"
          class="nav-item"
          to="/index"
        >首页</router-link>
        <router-link
          :style="{borderBottom:active==4? '3px solid #49af4f':'3px solid #fff',color:active==4?'#49af4f':' #2D323E'}"
          @click.native="activeC(4)"
          class="nav-item"
          to="/eduProject"
        >继教项目</router-link>
        <router-link
          :style="{borderBottom:active==2? '3px solid #49af4f':'3px solid #fff',color:active==2?'#49af4f':' #2D323E'}"
          @click.native="activeC(2)"
          class="nav-item"
          to="/knowledgeNav"
        >小白入门</router-link>
        <div
          class="nav-item college"
          :style="{ borderBottom:active==1? '3px solid #49af4f':'3px solid #fff',color:active==1?'#49af4f':' #2D323E'}"
        >
          专业研究
          <ul>
            <li v-for="(elem,i) of collegeList" :key="i" @click="gotocollege(elem.id)">{{elem.name}}</li>
          </ul>
        </div>
        <router-link
          :style="{borderBottom:active==3? '3px solid #49af4f':'3px solid #fff',color:active==3?'#49af4f':' #2D323E'}"
          @click.native="activeC(3)"
          class="nav-item"
          to="/liveList"
        >直播视频</router-link>
        <div class="search" v-show="fixed">
          <div>
            <el-dropdown @command="handleCommand1">
              <span class="el-dropdown-link">
                {{type}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="课程">课程</el-dropdown-item>
                <el-dropdown-item command="直播">直播</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <input type="text" v-model="name" />
            <button @click="search">
              <i class="el-icon-search"></i> 搜索
            </button>
          </div>
        </div>
        <div v-show="fixed">
          <div class="user">
            <el-breadcrumb style="lineHeight:2" v-if="!token" separator="/">
              <el-breadcrumb-item>
                <span style="cursor:pointer" @click="sign">注册</span>
              </el-breadcrumb-item>
              <el-breadcrumb-item>
                <span
                  style="cursor:pointer"
                  v-if="!token"
                  size="mini"
                  @click="centerDialogVisible=true;loginBac=true"
                >登录</span>
              </el-breadcrumb-item>
            </el-breadcrumb>
            <el-dropdown v-if="token" @command="handleCommand">
              <span class="el-dropdown-link">
                {{userInfo.username}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="个人中心">个人中心</el-dropdown-item>
                <el-dropdown-item command="修改信息">修改信息</el-dropdown-item>
                <el-dropdown-item command="订单管理">订单管理</el-dropdown-item>
                <el-dropdown-item command="学分查询">学分查询</el-dropdown-item>
                <el-dropdown-item command="在线购卡">在线购卡</el-dropdown-item>
                <el-dropdown-item command="购卡记录">购卡记录</el-dropdown-item>
                <el-dropdown-item command="在线绑卡">在线绑卡</el-dropdown-item>
                <el-dropdown-item command="退出">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div class="userImg">
            <el-avatar
              :size="30"
              :src="userInfo.header?(userInfo.header.indexOf('http')==-1?(bacBase+userInfo.header):userInfo.header):require('../assets/userDefault.png')"
            ></el-avatar>
          </div>
        </div>
      </div>
    </div>
    <main>
      <div id="lo" v-if="loginBac">
        <el-dialog :visible.sync="centerDialogVisible" width="440px" center>
          <div style="width:440px;height:350px">
            <login @loged="hasLog"></login>
          </div>
        </el-dialog>
      </div>
      <router-view />
    </main>
    <footer>
      <div class="foot">
        <div class="title">友情链接:</div>
        <div class="link">
          <el-link
            type="primary"
            v-for="item in link"
            :key="item.name"
            :href="item.href"
            target="_blank"
          >{{item.name}}</el-link>
        </div>
        <div class="ft">
          技术支持 学霸Pu ©2020 puyajun
          <br />联系电话：15023809146
        </div>
      </div>
    </footer>
  </div>
</template>
<style>
#lo .el-dialog__header {
  border: none;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
  font-size: 16px;
}
.el-icon-arrow-down {
  font-size: 17px;
}
</style>
<style lang="scss" scoped>
.btn {
  background: rgba(56, 207, 64, 0.1);
  font-family: PingFangSC-Medium;
  font-size: 17px;
  color: #49af4f;
  font-weight: bold;
  text-align: center;
  padding: 18px 30px;
  cursor: pointer;
  width: 95px;
}
.btn > i {
  transition: 0.3s;
}
.btn:hover i {
  transform: rotate(180deg);
}
.course ::v-deep .el-input__inner {
  border: none;
}
// .course ::v-deep .el-input__inner::-webkit-input-placeholder {
//   color: #000;
// }
.ft {
  text-align: center;
  margin: 10px 0;
  color: #999;
  line-height: 24px;
  font-size: 14px;
}
$innerWidth: 1200px;
.search {
  border-radius: 20px;
  height: 40px;
  width: 330px;
  margin-left: 10px;
  border: 2px solid #49af4f;
  white-space: nowrap;
  overflow: hidden;
  .el-dropdown {
    display: inline-block;
    width: 60px;
    vertical-align: top;
    margin-left: 20px;
    height: 40px;
    line-height: 40px;
    ::v-deep .el-dropdown-link {
      color: #000;
      font-weight: bold;
      font-size: 14px;
    }
  }
  input {
    vertical-align: top;
    border: none;
    background: inherit;
    height: 40px;
    outline: none;
    width: 160px;
    padding-left: 10px;
  }
  button {
    border: none;
    background: #49af4f;
    height: 40px;
    width: 85px;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #ffffff;
    outline: none;
    padding-right: 15px;
    cursor: pointer;
  }
  button:hover {
    background: #38cf40;
  }
}
header {
  width: 100%;
  background: #fff;
  height: 120px;
  .head {
    position: relative;
    width: $innerWidth;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name {
      width: 140px;
    }
    .course {
      width: 120px;
      ::v-deep .el-dropdown-link {
        color: #000;
        font-weight: bold;
      }
    }
    .liveName {
      width: 100px;
      font-size: 16px;
      color: #000;
    }
    .search {
      z-index: 101;
      top: 10px;
      right: 10%;
      border-radius: 20px;
      height: 40px;
      width: 550px;
      border: 2px solid #49af4f;
      overflow: hidden;
      .el-dropdown {
        width: 60px;
        vertical-align: top;
        margin-left: 20px;
        height: 40px;
        line-height: 40px;
        ::v-deep .el-dropdown-link {
          color: #000;
          font-weight: bold;
          font-size: 14px;
        }
      }
      input {
        border: none;
        background: inherit;
        height: 40px;
        font-size: 18px;
        outline: none;
        width: 340px;
        padding-left: 10px;
      }
      button {
        border: none;
        background: #49af4f;
        height: 40px;
        width: 130px;
        font-family: PingFangSC-Medium;
        font-size: 20px;
        color: #ffffff;
        outline: none;
        cursor: pointer;
      }
      button:hover {
        background: #38cf40;
      }
    }
    .my {
      width: 60px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      height: 20px;
      line-height: 20px;
      color: #222;
      margin-left: 20px;
      cursor: pointer;
    }
    .tip {
      width: 40px;
      span {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-image: url("../assets/img_message_white@2x.png");
        background-size: cover;
        margin-left: 20px;
        cursor: pointer;
      }
    }
    .shop {
      width: 40px;
      span {
        display: inline-block;
        width: 20px;
        height: 20px;
        background-image: url("../assets/img_shopping_white@2x.png");
        background-size: cover;
        margin-left: 20px;
        cursor: pointer;
      }
    }
    .user {
      margin-left: 20px;
      width: 120px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
      text-align: right;
      ::v-deep .el-dropdown-link {
        color: #666;
        font-weight: bold;
        font-size: 14px;
      }
      ::v-deep .el-breadcrumb {
        float: right;
      }
    }
  }
}

.user {
  margin-left: 20px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 12px;
  text-align: right;
  ::v-deep .el-dropdown-link {
    color: #666;
    vertical-align: super;
    font-weight: bold;
    font-size: 14px;
  }
  ::v-deep .el-breadcrumb {
    float: right;
  }
}
.userImg {
  margin-left: 5px;
  display: inline-block;
}
.nav-container {
  width: 100%;
  background: #fff;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  z-index: 1000;
  top: 0;
  // padding: 3px;
}
.nav {
  position: relative;
  width: $innerWidth;
  margin: 0 auto;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 17px;
  box-sizing: border-box;
  height: 60px;
  // overflow: hidden;
  .nav-item {
    display: block;
    font-weight: bold;
    height: 40px;
    margin: 15px 25px 0 25px;
    text-align: center;
    transition: 0.3s;
    position: relative;
  }
  .college > ul {
    font-size: 12px;
    display: none;
    list-style: none;
    position: absolute;
    top: 45px;
    z-index: 100;
    left: -30px;
    border: 1px solid #ddd;
    border-top: none;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    overflow: hidden;
    li {
      background: #fff;
      border-left: 3px solid #fff;
      color: #333;
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      width: 123px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    li:hover {
      background: #eee;
      border-left: 3px solid #49af4f;
      color: #49af4f;
    }
  }
  .college:hover ul {
    display: block;
  }
  .nav-item:hover {
    // transform: rotate(-4deg);
    // border: none;
    border-bottom: 3px solid #49af4f !important;
    color: #49af4f !important;
  }
}

footer {
  background: #2d323e;
  // border-top: 1px solid #ccc;
  .foot {
    width: $innerWidth;
    background: #2d323e;
    height: 100%;
    margin: 0 auto;
    padding: 10px 0;
    .title {
      background: #2d323e;
      font-size: 14px;
      height: 36px;
      color: #6d7278;
      line-height: 36px;
      padding-left: 20px;
    }
    .link {
      padding: 0 10px;
      text-align: center;
      .el-link {
        margin: 10px;
        color: #fff;
      }
    }
  }
}
.router-link-active {
  color: red;
}
</style>
<script>
// @ is an alias to /src
import { liveIndex } from "@/api/live";
import { collegeList } from "@/api/college";
import { courseTreeList } from "@/api/course";
import { getTreeData } from "@/utils/index";
export default {
  components: {
    login: (resolve) => require(["./login/login"], resolve),
    tabSelect: (resolve) => {
      require(["./component/tabSearch2"], resolve);
    },
  },
  created() {
    this.fixedTop();
    this.getInfo();
    this.Bshow = false;
    courseTreeList().then((res) => {
      // console.log(res);
      this.Bshow = true;
      this.courseTree = JSON.parse(JSON.stringify(getTreeData(res.data)));
    });
     collegeList().then(res=>{
      this.collegeList=res.data.map(elem=>{return{id:elem.id,name:elem.name}})
    })
  },
  updated() {
    this.active = sessionStorage.getItem("active");
    // console.log(this.active)
    // if(this.active==2){
    //   this.fixed=false
    // }else{
    //   this.fixed=true
    // }
  },
  name: "Home",
  data() {
    return {
      bacBase: this.$store.getters.bacBase,
      fixed: false, //吸顶
      loginBac: true,
      showSe: false,
      Bshow: false,
      header: "",
      token: false,
      userInfo: {},
      centerDialogVisible: false,
      link: [
        {
          name: "重庆工程学院",
          href: "http://www.cqie.edu.cn/",
        },
        {
          name: "GitHub",
          href: "https://github.com/xuebapu",
        },
        {
          name: "码云",
          href: "https://gitee.com/puyajun",
        },
        {
          name: "阿里云",
          href: "https://codeup.aliyun.com/",
        },
        {
          name: "学霸Pu博客",
          href: "https://xuebapu.github.io",
        },
      ],
      active: sessionStorage.getItem("active") || 0,
      courseTree: [],
      defaultProps: {
        children: "children",
        label: "name",
        value: "id",
      },
      subjectId: "",
      type: "课程",
      name: "",
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
    };
  },
  methods: {
    //进入专科学院
    gotocollege(x) {
      sessionStorage.setItem("active", 1);
      this.active = 1;
      this.$router.push({
        path: "/college",
        query: { collegeId: x },
      });
      // console.log(x)
    },
    sign() {
      this.$router.push("/sign");
    },
    //吸顶
    fixedTop() {
      window.addEventListener("scroll", () => {
        let scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (scrollTop > 180) {
          this.fixed = true;
          // if (this.active == 2) {
          //   this.fixed = false;
          // } else {
          //   this.fixed = true;
          // }
        } else {
          this.fixed = false;
        }
      });
    },
    closeSe(x) {
      this.showSe = x;
    },
    //获取用户信息
    getInfo() {
      if (this.$store.getters.token) {
        this.$store.dispatch("user/userInfo").then((res) => {
          this.userInfo = res;
          this.header = res.header;
          this.centerDialogVisible = false;
          this.token = true;
          this.loginBac = false;
        });
      }
    },
    hasLog(x) {
      this.getInfo();
    },
    activeC(x) {
      // console.log(x);
      sessionStorage.setItem("active", x);
      this.active = x;
    },
    handleCommand(command) {
      if (command == "个人中心") {
        this.$router.replace("/user");
        sessionStorage.setItem("active", -1);
        this.active = -1;
      } else if (command == "退出") {
        this.logout();
      } else if (command == "订单管理") {
        sessionStorage.setItem("active", -1);
        this.active = -1;
        this.$router.replace("/myOrder");
      }
    },
    handleCommand1(command) {
      this.type = command;
    },
    handleChange(value) {},
    search() {
      if (this.type == "课程") {
        var query = {};
        if (this.subjectId) {
          query.sub = this.subjectId[this.subjectId.length - 1];
        }
        if (this.name.trim() != "") {
          query.name = this.name;
        }
        this.$router.push({
          path: "/knowledgeNav/list",
          query: query,
        });
        sessionStorage.setItem("active", 2);
        this.active = 2;
      } else if (this.type == "直播") {
        var query = {};
        if (this.subjectId) {
          query.sub = this.subjectId;
        }
        if (this.name.trim() != "") {
          query.name = this.name;
        }
        this.$router.push({
          path: "liveList",
          query: query,
        });
        sessionStorage.setItem("active", 3);
        this.active = 3;
      }
    },
    //登出
    logout() {
      this.$store
        .dispatch("user/logout")
        .then(() => {
          this.$message({
            message: "退出成功",
            type: "success",
          });
          this.$router.replace("/index");
          this.token = false;
        })
        .catch((error) => {});
    },
  },
  watch: {
    $route(to, from) {
      this.centerDialogVisible = to.params.log ? true : false;
    },
  },
};
</script>
