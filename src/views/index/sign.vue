<template>
  <div class="container">
    <div class="con">
      <div class="bread">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>注册</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="title">欢迎注册学霸Pu继教</div>
      <div class="tip">
        填写注册信息（
        <span style="color:red">*</span>为必填）
      </div>
      <el-divider></el-divider>
      <div class="signLists">
        <el-form
          :rules="rules"
          :label-position="labelPosition"
          label-width="100px"
          :model="formLabelAlign"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formLabelAlign.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="formLabelAlign.password"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="realname">
            <el-input v-model="formLabelAlign.realname"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="formLabelAlign.gender" label="1">男</el-radio>
            <el-radio v-model="formLabelAlign.gender" label="2">女</el-radio>
          </el-form-item>
          <el-form-item label="证件相关" class="card" prop="cardNo">
            <el-input
              placeholder="请输入证件号"
              v-model="formLabelAlign.cardNo"
              class="input-with-select"
            >
              <el-select
                class="se"
                v-model="formLabelAlign.cardType"
                slot="prepend"
                placeholder="请选择证件类型"
              >
                <el-option label="身份证" value="1"></el-option>
                <el-option label="军官证" value="2"></el-option>
                <el-option label="港澳台身份证" value="3"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="formLabelAlign.mobile"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="formLabelAlign.email"></el-input>
          </el-form-item>
          <el-form-item v-if="formLabelAlign.type!=1" label="单位" prop="unitId">
            <el-select @change="getProvince($event)" v-model="provinceValue" placeholder="请选择省">
              <el-option
                v-for="item in province"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <el-select @change="getCity($event)" v-model="cityValue" placeholder="请选择市">
              <el-option v-for="item in city" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
            <el-select @change="getDistrict($event)" v-model="districtValue" placeholder="请选择地区">
              <el-option
                v-for="item in district"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
            <!-- 单位 -->
            <el-select
              allow-create
              style="width:60%;marginTop:20px"
              v-model="formLabelAlign.unitId"
              filterable
              remote
              reserve-keyword
              placeholder="请输入单位名称"
              :remote-method="remoteMethod"
              @change="getoffice"
              :loading="loading"
            >
              <el-option
                v-for="item in unitLists"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="单位" prop="unitId">
            <el-select
              allow-create
              style="width:100%"
              v-model="formLabelAlign.unitId"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              @change="getoffice"
              :loading="loading"
            >
              <el-option
                v-for="item in unitLists"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item label="科室" prop="departId">
            <el-select
              allow-create

              style="width:100%"
              v-model="formLabelAlign.departId"
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词"
              :remote-method="getoffice"
              :loading="loading"
            >
              <el-option
                v-for="item in office"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单位地址">
            <el-input v-model="formLabelAlign.unitAddress"></el-input>
          </el-form-item>
          <el-form-item label="学历">
            <el-select v-model="formLabelAlign.education" placeholder="请选择学历">
              <el-option v-for="(item,i) of educationList" :key="i" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="头像" prop="header">
            <img v-show="imgList1.length>0" style="maxWidth:200px" :src="base+imgList1[0]" />
            <el-upload
              class="upload-demo"
              :action="picUrl"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :limit="1"
              accept=".jpg, .png"
              :on-exceed="handleExceed"
              :on-success="imgUpload1"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="头衔">
            <el-input v-model="formLabelAlign.title"></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="formLabelAlign.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">注 册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { area, unitList, sign } from "@/api/admin";
export default {
  name: "add",
  created() {
    this.picUrl = this.$store.getters.bacBase + "/common/upload";
    this.getarea();
  },
  data() {
    return {
      base: this.$store.getters.bacBase,
      picUrl: "",
      labelPosition: "right",
      rules: {
        cardNo: [{ required: true, message: "请输入证件", trigger: "blur" }],
        unitId: [{ required: true, message: "请输入机构", trigger: "blur" }],
        departId: [{ required: true, message: "请输入科室", trigger: "blur" }],
        realname: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        header: [{ required: true, message: "请上传头像", trigger: "blur" }],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        mobile: [{ required: true, message: "请输入手机号", trigger: "blur" }],
      },
      formLabelAlign: {
        cardNo: "", //证件号1
        cardType: "", //证件类型 1身份证 2军官证 3港澳台身份证2
        unitId: "", //机构id16
        unitName: "", //机构名称
        realname: "", //真实名称14
        city: "", //城市3
        province: "", //省13
        district: "", //地区6
        departId: "", //科室id4
        departName: "", //科室名称
        desc: "", //简介介绍5
        gender: "1", //性别9
        mobile: "", //手机号码11
        education: "", //学历7
        email: "", //8
        username: "", //用户名17
        password: "", //密码12
        title: "", //头衔15
        header: "", //头像10
        unitAddress: "", //单位地址
      },
      typeList: ["机构", "科室", "其他"],
      educationList: ["大专", "本科", "硕士", "博士", "博士后"],
      province: [],
      city: [],
      district: [],
      provinceValue: "",
      cityValue: "",
      districtValue: "",
      unitLists: [],
      loading: false,
      office: [],
      imgList: [], //封面
      imgList1: [], //头像
    };
  },
  methods: {
    //图片上传
    imgUpload(res, file, fileList) {
      console.log(fileList);
      this.imgList = fileList.map((x) => x.response.data.fileName);
    },
    imgUpload1(res, file, fileList) {
      console.log(fileList);
      this.imgList1 = fileList.map((x) => x.response.data.fileName);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      this.imgList1 = [];
      // return this.$confirm(`确定移除 ${file.name}？`);
    },
    getunit() {
      let obj = {
        type: 0,
        city: this.formLabelAlign.city,
        district: this.formLabelAlign.district,
        province: this.formLabelAlign.province,
      };
      unitList(obj).then((res) => {
        if (res.code == 200) {
          this.unitLists = res.data.map((item) => {
            return {
              label: item.name,
              value: item.id,
            };
          });
        }
      });
    },
    //远程搜索会议名称
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        let obj = {
          name: query,
          type: 0,
          city: this.formLabelAlign.city,
          district: this.formLabelAlign.district,
          province: this.formLabelAlign.province,
        };
        unitList(obj).then((res) => {
          if (res.code == 200) {
            console.log(res);
            this.loading = false;
            this.unitLists = res.data.map((item) => {
              return {
                label: item.name,
                value: item.id,
              };
            });
          }
        });
      }
    },
    getoffice() {
      let obj = { type: 1,};
      this.loading = true;
      unitList(obj).then((res) => {
        if (res.code == 200) {
          this.loading = false;
            var arr = this.uniqueAr(res.data);
          this.office = arr.map((item) => {
            return {
              label: item.name,
              value: item.id,
            };
          });
        }
      });
    },
    //远程搜索会议名称
    officeRemoteMethod(query) {
      var obj = { name: query, type: 1};
      this.loading = true;
      unitList(obj).then((res) => {
        if (res.code == 200) {
          this.loading = false;
             var arr = this.uniqueAr(res.data);
          this.office = arr.map((item) => {
            return {
              label: item.name,
              value: item.id,
            };
          });
        }
      });
    },
    getarea() {
      area({ pid: 1 }).then((res) => {
        console.log(res);
        this.province = res.data;
      });
    },
    getProvince(x) {
      this.province.forEach((elem) => {
        if (elem.id == x) {
          this.formLabelAlign.province = elem.name;
          this.formLabelAlign.unitAddress = elem.name;
        }
      });
      this.city = [];
      this.district = [];
      this.cityValue = "";
      this.districtValue = "";
      area({ pid: x }).then((res) => {
        this.city = res.data;
      });
    },
    getCity(x) {
      this.city.forEach((elem) => {
        if (elem.id == x) {
          this.formLabelAlign.city = elem.name;
          this.formLabelAlign.unitAddress =
            this.formLabelAlign.province + elem.name;
        }
      });
      this.district = [];
      this.districtValue = "";
      area({ pid: x }).then((res) => {
        this.district = res.data;
      });
    },
    getDistrict(x) {
      this.district.forEach((elem) => {
        if (elem.id == x) {
          this.formLabelAlign.district = elem.name;
          this.formLabelAlign.unitAddress =
            this.formLabelAlign.province + this.formLabelAlign.city + elem.name;
        }
      });
      this.getunit();
    },
    onSubmit() {
      let data = { ...this.formLabelAlign };
      data.header = this.imgList1.length > 0 ? this.imgList1[0] : null;
      let departName = null;
      let unitName = null;
      this.office.forEach((elem) => {
        if (elem.value == data.departId) {
          departName = elem.label;
        }
      });
      this.unitLists.forEach((elem) => {
        if (elem.value == data.unitId) {
          unitName = elem.label;
        }
      });
      data.departName = departName != null ? departName : data.departId;
      data.unitName = unitName != null ? unitName : data.unitId;
      console.log(data);
      sign(data).then((res) => {
        if (res.code == 200) {
          this.$message({
            message: "注册成功",
            type: "success",
          });
          this.$router.replace("/index");
        } else {
          this.$message.error(res.msg);
        }
      });
    },
     //科室去重
    uniqueAr(arr) {
      for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i].name == arr[j].name) {
            arr.splice(j, 1);
            j--;
          }
        }
      }
      return arr;
    },
  },
};
</script>

<style lang='scss' scoped>
$innerWidth: 1200px;
.container {
  background: #e8f0f4;
  overflow: hidden;
  .con {
    ::v-deep .se .el-input {
      width: 130px;
    }
    width: $innerWidth;
    background: #fff;
    border: 1px solid #ddd;
    margin: 10px auto;
    .bread {
      padding: 10px 0 20px 10px;
    }
    .title {
      font-size: 24px;
      color: #465646;
      padding: 40px 0;
      text-align: center;
    }
    .tip {
      font-size: 12px;
      color: #124aa2;
      float: left;
      margin-left: 10px;
    }
    .signLists {
      width: 800px;
      margin: 0 auto;
    }
  }
}
</style>
