<template>
  <div class="container">
    <main>
      <div class="userinfo">
        <div class="content">
          <div class="top-flex">
            <div class="img-box">
              <el-avatar
                :size="90"
                :src="header?(header.indexOf('http')==-1?(bacBase+header):header):require('../../assets/userDefault.png')"
                fit="fill"
              ></el-avatar>
            </div>
            <div class="top-row">
              <div class="row">
                <span class="label">姓名：</span>
                <span class="data">{{userInfo.realname}}</span>
              </div>
              <div class="row">
                <span class="label">职称：</span>
                <span class="data">{{userInfo.title}}</span>
              </div>
              <div class="row">
                <span class="label">科室：</span>
                <span class="data">{{userInfo.departName}}</span>
              </div>
            </div>
          </div>
          <div class="minor">
            <div class="row">
              <span class="label">单位名称：</span>
              <span class="data">{{userInfo.unitName}}</span>
            </div>
            <div class="row">
              <span class="label">单位地址：</span>
              <span class="data">{{userInfo.unitAddress}}</span>
            </div>
          </div>
          <div class="info-btngroup">
            <el-button plain size="mini" class="btn_flex">修改信息</el-button>
            <el-button plain size="mini" class="btn_flex" @click="changePassword">修改密码</el-button>
            <el-button plain size="mini" class="btn_flex">学分查询</el-button>
            <el-button plain size="mini" class="btn_flex" style="margin:0">在线购卡</el-button>
            <el-button plain size="mini" class="btn_flex" style="margin:0">购卡记录</el-button>
            <el-button plain size="mini" class="btn_flex" style="margin:0">在线绑卡</el-button>
          </div>
          <el-button type="success" id="logout" @click="logout" :loading="logoutLoading">退出登录</el-button>
        </div>
      </div>
      <div class="tab">
        <el-tabs @tab-click="handleClick" v-model="tabIndex">
          <el-tab-pane label="学分查询" name="0">
            <div class="list">
              <el-table
                size="mini"
                :data="learning"
                stripe
                :height="tableHeight"
                style="width: 100%"
              >
                <el-table-column prop="courseName" label="项目名称"></el-table-column>
                <el-table-column sortable prop="credit" label="学分"></el-table-column>
                <el-table-column align="left" label="考试分数">
                  <template slot-scope="scope">
                    <span>{{ scope.row.score }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="status" label="学习状态" :formatter="formatter"></el-table-column>
                <el-table-column prop="certNo" label="证书编号"></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="课程收藏" name="1">
            <div class="list">
              <el-table
                size="mini"
                :data="collect"
                stripe
                :height="tableHeight"
                style="width: 100%"
              >
                <el-table-column prop="name" label="项目名称"></el-table-column>
                <el-table-column prop="realname" label="项目负责人"></el-table-column>
                <el-table-column label="操作">
                  <template v-slot="scope">
                    <el-button size="mini" @click="handleNav(scope.$index,scope.row)">前往学习</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleRemove(scope.$index,scope.row,scope)"
                    >取消收藏</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="学习统计" name="2">
            <div class="list">
              <el-table
                size="mini"
                :data="statement"
                stripe
                :height="tableHeight"
                style="width: 100%"
              >
                <el-table-column align="left" label="课程名称">
                  <template slot-scope="scope">
                    <span>{{ scope.row.courseName }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="left" label="学习进度">
                  <template slot-scope="scope">
                    <el-progress
                      :text-inside="true"
                      :stroke-width="16"
                      status="success"
                      :color="color"
                      :percentage="scope.row.learningTime?Math.floor(scope.row.learningTime*100/scope.row.totalTime):0"
                    ></el-progress>
                  </template>
                </el-table-column>

                <el-table-column align="left" label="已学习时长">
                  <template slot-scope="scope">
                    <span>{{ getTotal(scope.row.learningTime) }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="left" label="状态" width="80">
                  <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                      <p>状态: {{getType(scope.row.status)}}</p>
                      <div slot="reference" class="name-wrapper">
                        <el-tag
                          :type="scope.row.status==3?'success':'warning'"
                          size="medium"
                        >{{ getType(scope.row.status)}}</el-tag>
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </main>
    <div class="section">
      <div class="section-title">学习历史</div>
      <div class="section-content">
        <div class="course-list">
          <div class="course" v-for="item in history" :key="item.id" @click="goCourse(item)">
            <a href="javascript:;" class="course-img">
              <el-image :src="item.picture" fit="fill"></el-image>
            </a>
            <a href="javascript:;" class="course-tit">{{item.name}}</a>
            <p class="course-p">主讲人：{{item.realname}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  width: 1200px;
  margin: 20px auto;
  overflow: hidden;
}
main {
  width: 100%;
  display: flex;
}
.userinfo {
  width: 300px;
  background: #fff;
  border-top: 3px solid #49af4f;
  background: rgba(56, 207, 64, 0.1);
  height: 393px;
  box-sizing: border-box;
  margin-left: 5px;
  padding: 6px;
  .content {
    padding: 15px;
    background: #fff;
    border: 1px solid #ddd;
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
.tab {
  border: 1px solid #ddd;
  flex-grow: 1;
  padding: 5px;
  width: 760px;
}
#logout {
  width: 100%;
  margin-top: 10px;
}
.course-list {
  display: flex;
  justify-content: start;
}
.course {
  padding: 10px;
  &:hover {
    box-shadow: 0 0 3px 3px #eee;
  }
  &:hover .course-tit {
    color: #e90101;
  }
  .course-img {
    display: block;
    cursor: pointer;

    .el-image {
      width: 230px;
      height: 150px;
    }
  }
  .course-tit {
    width: 230px;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
    font-size: 14px;
    color: #525252;
    margin-top: 6px;
    cursor: pointer;
  }
  .course-p {
    height: 14px;
    line-height: 14px;
    color: #bfbebe;
    font-size: 12px;
    margin-top: 6px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}

.section {
  margin: 15px 0;
}
.section-title {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  font-weight: bold;
  color: #2d323e;
  padding-left: 11px;
  border-bottom: 1px solid #ddd;
}
.section-content {
  background: #fff;
  padding: 15px;
}
.course-tit {
  width: 230px;
}
</style>
<style lang="scss">
main .el-tabs__item {
  font-size: 16px;
  height: 50px;
  line-height: 50px;
}
</style>
<script>
import {
  learningList,
  collectList,
  historyList,
  collect,
  statementList,
} from "@/api/user";
import { totalTime } from "../../utils/index";
export default {
  name: "UserIndex",
  data() {
    return {
      bacBase: this.$store.getters.bacBase,
      userInfo: {},
      logoutLoading: false,
      header: "",
      learning: [],
      collect: [],
      statement: [],
      orderList: [],
      tabIndex: "0",
      tableHeight: "310",
      history: [],
      color: [
        { color: "#909399", percentage: 30 },
        { color: "#e6a23c", percentage: 80 },
        { color: "#67c23a", percentage: 100 },
      ],
    };
  },
  mounted() {
    this.tabIndex = this.$route.query.userActive
      ? this.$route.query.userActive
      : "0";
    this.getUserInfo();
    learningList().then((res) => {
      this.learning = res.data;
    });
    collectList().then((res) => {
      console.log(res);
      this.collect = res.data;
    });
    historyList().then((res) => {
      console.log(res);
      this.history = res.data;
    });
    statementList().then((res) => {
      console.log(res);
      this.statement = res.data;
    });
  },
  methods: {
    //修改密码
    changePassword() {
      this.$router.push({
        path: "/changePassword",
      });
    },
    getTotal(x) {
      return totalTime(x);
    },
    getType(x) {
      if (x == 0) {
        return "学习中";
      } else if (x == 1) {
        return "已经完成";
      }
      if (x == 2) {
        return "待测试";
      }
      if (x == 3) {
        return "全部完成";
      }
    },
    goCourse(item) {
      let id = item.id;
      this.$router.push({ path: `/course/${id}` });
    },
    handleClick(tab, e) {
      console.log(tab);
      this.$router.push({
        path: "user",
        query: {
          userActive: tab.name,
        },
      });
      if (this.tabIndex == "0") {
        learningList().then((res) => {
          this.learning = res.data;
        });
      } else if (this.tabIndex == "1") {
        collectList().then((res) => {
          console.log(res);
          this.collect = res.data;
        });
      } else if (this.tabIndex == "2") {
        statementList().then((res) => {
          console.log(res);
          this.statement = res.data;
        });
      }
    },
    handleNav(index, row) {
      let id = row.id;
      this.$router.push({ path: `/course/${id}` });
    },
    handleRemove(index, row, scope) {
      collect(row.id).then((res) => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "成功取消",
          });
          collectList().then((res) => {
            console.log(res);
            this.collect = res.data;
          });
        }
      });
      console.log(scope);
      console.log(index, row);
    },
    formatter(row, column, cellValue, index) {
      var value = row.status ? "已完成" : "学习中";
      return value;
    },
    getUserInfo() {
      this.$store.dispatch("user/userInfo").then((res) => {
        this.userInfo = res;
        this.header = res.header;
      });
    },
    logout() {
      this.logoutLoading = true;
      this.$store
        .dispatch("user/logout")
        .then(() => {
          this.logoutLoading = false;
          this.$router.push({ path: "/" });
          location.reload();
        })
        .catch((error) => {
          this.logoutLoading = false;
        });
    },
  },
  watch: {
    $route(rout) {
      if (rout.query.userActive) {
        this.tabIndex = rout.query.userActive;
      }
    },
  },
};
</script>