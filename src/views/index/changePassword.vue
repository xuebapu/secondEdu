<template>
  <div>
    <div class="container">
      <div class="inner">
        <div class="top">
          <span class="cpwd">修改密码</span>
        </div>
        <div class="con">
          <el-form
            :rules="rules"
            label-position="right"
            label-width="100px"
            :model="formLabelAlign"
          >
            <el-form-item label="当前密码" prop="oldPassword">
              <el-input ref="oldP" show-password v-model="formLabelAlign.oldPassword"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input ref="newP" show-password v-model="formLabelAlign.newPassword"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="confirmNewPassword">
              <el-input ref="cNewP" show-password v-model="formLabelAlign.confirmNewPassword"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button :disabled="!canSubmit" type="primary" @click="submit">提交</el-button>
              <el-button type="warning" @click="backIndex">返回</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { changePassword } from "../../api/user";
export default {
  data() {
    return {
      canSubmit:true,
      formLabelAlign: {
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入当前密码", trigger: "blur" },
        ],
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
        ],
        confirmNewPassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    submit() {
      if (
        this.formLabelAlign.confirmNewPassword !==
        this.formLabelAlign.newPassword
      ) {
        this.$message({
          message: "密码不一致",
          type: "warning",
        });
        this.$refs.newP.focus();
      }else if(this.formLabelAlign.oldPassword.trim()==''){
         this.$message({
          message: "请输入当前密码",
          type: "warning",
        });
          this.$refs.oldP.focus();
      }else if(this.formLabelAlign.newPassword.trim()==''){
         this.$message({
          message: "请输入新密码",
          type: "warning",
        });
          this.$refs.newP.focus();
      }
      else {
        this.canSubmit=false
        let obj = {
          oldPassword: this.formLabelAlign.oldPassword,
          password: this.formLabelAlign.newPassword,
        };
        changePassword(obj).then((res) => {
          this.canSubmit=true
          if (res.code == 200) {
            this.$message({
              message:'修改成功',
              type:'success'
            })
          }else{
            this.$message.error(res.msg)
          }
        });
      }
    },
    backIndex() {
      this.$router.replace({
        path: "/index",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  background: #e8f0f4;
  min-height: 500px;
  padding: 50px ;
  .inner {
    border-radius: 4px;
    overflow: hidden;
    width: 900px;
    background: #fff;
    border: 1px solid #ddd;
    margin: 10px auto;
    .top {
      height: 50px;
      width: 100%;
      background: rgba(56, 207, 64, 0.1);
      span {
        display: inline-block;
        height: 50px;
        line-height: 50px;
        font-size: 24px;
        color: #49af4f;
        padding: 0 10px;
      }
      .cpwd {
        height: 50px;
        line-height: 50px;
        color: #fff;
        background: #49af4f;
      }
    }
    .con {
      padding: 50px 150px;
    }
  }
}
</style>