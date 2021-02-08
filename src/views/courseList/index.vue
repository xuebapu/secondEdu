<template>
  <div class="outerCon">
    <div class="container">
      <div class="left">
        <div class="userinfo" v-if="getUser">
          <div class="content">
            <div class="top-flex">
              <div class="img-box">
                <el-avatar
                  :size="90"
                  :src="header.indexOf('http')==-1?(bacBase+header):header"
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
              <el-button plain size="mini" class="btn_flex">修改密码</el-button>
              <el-button plain size="mini" class="btn_flex">学分查询</el-button>
              <el-button plain size="mini" class="btn_flex" style="margin:0">在线购卡</el-button>
              <el-button plain size="mini" class="btn_flex" style="margin:0">购卡记录</el-button>
              <el-button plain size="mini" class="btn_flex" style="margin:0">在线绑卡</el-button>
            </div>
            <el-button type="primary" id="logout" @click="logout">退出登录</el-button>
          </div>
        </div>
      </div>
      <div class="right">
        <con></con>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    con: (resolve) => require(["./rightCon"], resolve),
  },
  created() {
    //登录
    this.getUser = false;
    this.$store.dispatch("user/userInfo").then((res) => {
      this.getUser = true;
      this.userInfo = res;
      this.header = res.header;
      console.log(this.header);
    });
  },
  data() {
    return {
      getUser: false,
      bacBase: this.$store.getters.bacBase,
      header: "",
      userInfo: "",
    };
  },
  methods: {
    //登出
    logout() {
      this.$store
        .dispatch("user/logout")
        .then(() => {
          this.$message({
            message: "退出成功",
            type: "success",
          });
          this.$router.push({ path: "/" });
          location.reload();
        })
        .catch((error) => {});
    },
  },
};
</script>

<style lang="scss" scoped>
$innerWidth: 1200px;
.outerCon {
  // background: #e8f0f4;
  overflow: hidden;
  .container {
    width: $innerWidth;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
    .left {
      width: 320px;
      background: rgba(56, 207, 64, 0.1);
    }
    .right {
      width: 880px;
    }
  }
}
.userinfo {
  width: 300px;
  background: #fff;
  border: 1px solid #ddd;
  border-top: 3px solid #49af4f;
  margin: 10px auto 50px;
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
#logout {
  width: 100%;
  margin-top: 40px;
}
</style>