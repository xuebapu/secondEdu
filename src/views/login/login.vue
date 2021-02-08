<template>
  <div>
    <div class="section">
      <div class="login" v-if="showLogin">
        <div class="login-nav">
          <div
            class="login-nav_item"
            :class="[currentIndex == 0?'active' : '']"
            @click="changeType(0)"
          >手机登录</div>
          <div
            class="login-nav_item"
            :class="[currentIndex == 1?'active' : '']"
            @click="changeType(1)"
          >密码登录</div>
        </div>
        <div class="login-form">
          <el-form
            label-position="right"
            :model="formLabelAlign"
            v-show="currentIndex == 0"
          >
            <el-form-item >
              <el-input placeholder="请输入手机号"  prefix-icon="el-icon-mobile-phone" v-model="formLabelPhone.phone"></el-input>
            </el-form-item>
            <el-form-item  class="inline-item2" prop="captchaImg">
              <el-input placeholder="请输入验证码" prefix-icon="el-icon-c-scale-to-original"   v-model="formLabelPhone.phoneCaptchaImg"></el-input>
              <div class="captcha-box" @click="refresh">
                <img
                  :src="'data:image/png;base64,' + imgcode"
                  alt
                  width="90px"
                  height="37px"
                  class="captcha"
                />
              </div>
            </el-form-item>
            <el-form-item class="inline-item">
              <el-input placeholder="请输入手机验证码" prefix-icon="el-icon-tickets" v-model="formLabelPhone.phoneCaptcha"></el-input>
              <el-button style="display:inline-block" type="success" plain @click="getPhoneCode">获取验证码</el-button>
            </el-form-item>
            <el-button type="success" class="submit">登录</el-button>
          </el-form>
          <el-form
            label-position="right"
            v-show="currentIndex == 1"
            :rules="rulesFormAlign"
            :model="formLabelAlign"
            ref="ruleFormAlign"
            hide-required-asterisk
          >
            <el-form-item  prop="uname">
              <el-input  placeholder="请输入用户名"  prefix-icon="el-icon-user" v-model="formLabelAlign.uname"></el-input>
            </el-form-item>
            <el-form-item  prop="pwd">
              <el-input placeholder="请输入密码"  prefix-icon="el-icon-lock" v-model="formLabelAlign.pwd" type="password"></el-input>
            </el-form-item>
            <el-form-item  class="inline-item2" prop="captchaImg">
              <el-input placeholder="请输入验证码"  prefix-icon="el-icon-tickets" v-model="formLabelAlign.captchaImg"></el-input>
              <div class="captcha-box" @click="refresh">
                <img
                  :src="'data:image/png;base64,' + imgcode"
                  alt
                  width="90px"
                  height="38px"
                  class="captcha"
                />
              </div>
            </el-form-item>
            <el-button type="success" class="submit" @click="submitForm2()" :loading="loading2">登录</el-button>
          </el-form>
        </div>
        <div class="login-btngroup">
          <el-button
            @click="$router.push('sign')"
            plain
            type="success"
            size="mini"
            class="btn_flex"
            style="width:80px;"
          >点我注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  newsList,
  bannerList,
  courseList,
  boutiqueList,
  teacherList,
  getCaptcha,
} from "@/api/index";
import { login, userInfo,phoneCode } from "@/api/user";
export default {
  mounted() {
    var token = this.$store.getters.token;
    if (token) {
      this.showLogin = false;
      this.$store.dispatch("user/userInfo").then((res) => {
        console.log(this.$store.getters.userInfo);
        this.userInfo = res;
        this.header = res.header;
      });
    } else {
      this.refresh();
      this.showLogin = true;
    }
  },
  data() {
    return {
      imgcode: "",
      header: "",
      labelWidth: "85px",
      currentIndex: 1,
      showLogin: true,
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
    };
  },
  methods: {
    refresh() {
      getCaptcha().then((res) => {
        this.imgcode = res.data.img;
        this.uuid = res.data.uuid;
      });
    },
    changeType(type) {
      this.currentIndex = type;
    },
    //手机验证码
    getPhoneCode(){
      if(!/[1][3-9]\d{9}/ig.test(this.formLabelPhone.phone)){
        this.$message({
          message:'请输入手机号',
          type:'warning'
        })
        return
      }
      phoneCode({
        phone:this.formLabelPhone.phone
      }).then(res=>{
        console.log(res)
      })
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
                console.log(1)
                this.userInfo = res;
                this.header = res.header;
                this.showLogin = false;
                this.$router.push("/");
                let obj = JSON.parse(JSON.stringify(res));
                this.$emit("loged", obj);
              });
            })
            .catch((error) => {
              this.loading2 = false;
            });
        } else {
          console.log("error submit!!");
          this.loading2 = false;
          return false;
        }
      });
    },
  },
};
</script>
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
<style lang="scss" scoped>
$innerWidth: 600px;
.container {
  background: #fff;
  overflow: hidden;
  .inner-container {
    width: $innerWidth;
    margin: 10px auto 0;
  }
  .section {
    width: 100%;
    overflow: hidden;
    padding: 15px;
  }
}
.captcha-box {
  cursor: pointer;
  height: 40px;
}
.login {
  width: 400px;
  background: #fff;
  float: left;

  ::v-deep .el-button--success {
    background: #49af4f;
    color: #fff;
  }
  ::v-deep .el-button--success:hover{
    background: #38CF40;
     color: #fff;
  }
  .login-nav {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .login-nav_item {
    flex-grow: 1;
    font-size: 24px;
    color: #6d7278;
    text-align: center;
    height: 30px;
    line-height: 30px;
    padding-bottom: 15px;
    cursor: pointer;
     border-bottom: 3px solid #D8D8D8;

  }
  .active {
    border-bottom: 3px solid #49af4f;
    color: #2D323E;
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

.submit {
  width: 100%;
  margin-top: 10px;
}

#logout {
  width: 100%;
  margin-top: 40px;
}
.inline-item .el-input {
  width: 250px;
  margin-right: 5px;
}
.inline-item2 .el-input {
  margin-right: 10px;
}
</style>
