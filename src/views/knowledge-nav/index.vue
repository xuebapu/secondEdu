<template>
  <div class="container">
    <div class="topTab">
      <div class="inner">
        <div class="left">
          <div class="currentSci">
            当前学科：
            <span>{{ScienceAciiveName}}</span>
          </div>
          <div class="studyPoint">
            学分：
            <el-select size="mini" v-model="pointValue">
              <el-option v-for="item in pointList" :key="item" :value="item" :label="item"></el-option>
            </el-select>
          </div>
          <div class="price">
            价格：
            <el-select size="mini" v-model="priceValue">
              <el-option v-for="item in priceList" :key="item" :value="item"></el-option>
            </el-select>
          </div>
          <div class="time">
            时间：
            <el-select size="mini" v-model="timeValue">
              <el-option v-for="item in yearList" :key="item" :value="item"></el-option>
            </el-select>
          </div>
        </div>
        <div class="right" @click="showSe=!showSe;showSeCon=!showSeCon">
          {{showSeCon?'展开':'收起'}}
          <i :class="showSeCon?'el-icon-arrow-down':'el-icon-arrow-up'"></i>
        </div>
      </div>
    </div>
    <div class="select">
      <div class="selectCon" :class="showSe?'active':''">
        <div class="science">
          <div class="label">学科：</div>
          <div class="selectList">
            <div class="topHasNo">
              <span
                :class="elem.id==scienceActive?'scActive':''"
                @click="chooseScience(elem)"
                v-for="(elem,i) of courseTree "
                :key="i"
                v-show="elem.children==undefined"
              >{{elem.name}}</span>
            </div>
            <div
              v-show="elem.children!=undefined"
              class="details"
              v-for="(elem,i) of courseTree "
              :key="i"
            >
              <div class="topHasChildren">
                <span
                  :class="elem.id==scienceActive?'scActive':''"
                  @click="chooseScience(elem)"
                  class="firName"
                >{{elem.name}}</span>
                <span class="des">|</span>
                <span
                  :class="el.id==scienceActive?'scActive':''"
                  @click="chooseScience(el)"
                  class="secName"
                  v-for="(el,index) of elem.children"
                  :key="index"
                >{{el.name}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="price">
          <div class="label">价格：</div>
          <div class="priceCon">
            <span @click="priceValue=elem"  :class="elem==priceValue?'scActive':''" v-for="elem of priceList" :key="elem">{{elem}}</span>
          </div>
        </div>
        <div class="point">
          <div class="label">学分：</div>
          <div class="pointCon">
            <span @click="pointValue=elem" :class="elem==pointValue?'scActive':''" v-for="elem of pointList" :key="elem">{{elem}}</span>
          </div>
        </div>
        <div class="onlineTime">
          <div class="label">上架时间：</div>
          <div class="onlineTimeCon">
            <span @click="timeValue=elem" :class="elem==timeValue?'scActive':''" v-for="elem of yearList" :key="elem">{{elem}}</span>
          </div>
        </div>
        <div class="keyword">
          <div class="label">关键词：</div>
          <div class="keywordCon">
            <input placeholder="请输入关键词" type="text" v-model="searchName" />
            <button @click="doSearch">
              <i class="el-icon-search"></i> 搜索
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="inner-container">
      <div class="snav">
        <div class="item">
          <div class="snav-title">项目类型：</div>
          <div class="lists">
            <el-radio-group @change="ch" v-model="tags[0]">
              <el-radio label>全部</el-radio>
              <el-radio :label="item.id" v-for="item in project" :key="item.id">{{item.name}}</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="item">
          <div class="snav-title">学分类型：</div>
          <div class="lists">
            <el-radio-group @change="ch" v-model="tags[1]">
              <el-radio label>全部</el-radio>
              <el-radio :label="item.id" v-for="item in credit" :key="item.id">{{item.name}}</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>
      <div class="main">
        <div class="search-container">
          <div class="topSearch">
            <div class="radios">
              <span class="tip">排列顺序：</span>
              <el-radio-group v-model="tabValue" @change="tabChange">
                <el-radio label="weight">综合</el-radio>
                <el-radio label="credit">学分</el-radio>
                <el-radio label="createTime">时间</el-radio>
                <el-radio label="followCount">关注</el-radio>
              </el-radio-group>
            </div>
            <div class="topSearchCon">
              <input placeholder="请输入课程名称" type="text" v-model="searchName" />
              <button @click="doSearch">
                <i class="el-icon-search"></i> 搜索
              </button>
            </div>
          </div>
        </div>
        <div class="list-container">
          <router-view v-on:getTotal="getTotal"></router-view>
          <el-pagination
            @current-change="handleCurrentChange"
            :total="total"
            hide-on-single-page
            :page-size="pageSize"
            :current-page="page"
            layout="prev, pager, next, jumper,total"
            v-if="elpageShow"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  courseTreeList,
  courseSecondList,
  courseProjectList,
  courseCreditList,
} from "@/api/course";
import { getTreeData } from "../../utils/index";
export default {
  components: {
    tabSelect: (resolve) => {
      require(["../component/tabSearch"], resolve);
    },
  },
  created() {
    if (this.$route.query.typ) {
      this.tags = this.$route.query.typ.split(",");
      this.tags.forEach((elem, i, arr) => {
        if (elem >= 1) {
          arr[i] = Number(elem);
        }
      });
    }
  },
  name: "knowledgeNavIndex",
  data() {
    return {
      scienceActive: "",
      ScienceAciiveName: "全部",
      allScience: [],
      showSe: false,
      showSeCon: true,
      Bshow: false,
      radio: "",
      tabValue: "weight",
      dialogFormVisible: false,
      dialogWidth: "800px",
      courseSecondType: {
        name: "全部学科",
        id: "",
      },
      searchName: "",
      courseTree: [],
      project: [],
      credit: [],
      courseSecond: [],
      tags: ["", ""],
      total: 0,
      pageSize: 12,
      page: 1,
      elpageShow: true,
      tag1: "",
      tag2: "",
      pointList: ["全部", "1", "2", "3", "4", "5"],
      pointValue: "全部",
      yearList: ["全部", "2020", "2019", "2018"],
      priceValue: "全部",
      priceList: ["全部", "免费", "收费"],
      timeValue: "全部",
    };
  },
  mounted() {
    var name = "";
    courseTreeList().then((res) => {
      this.courseTree = getTreeData(res.data);
      console.log(this.courseTree);
      this.courseTree.unshift({
        name: "全部",
        id: "",
      });
      this.changeScience(this.courseTree);
      if (this.$route.query.sub) {
        this.scienceActive = this.$route.query.sub;
        this.allScience.forEach((elem) => {
          if (elem.id == this.scienceActive) {
            this.ScienceAciiveName = elem.name;
          }
        });
      }
    });
    courseSecondList(name).then((res) => {
      console.log(res);
      this.courseSecond = res.data;
    });
    courseProjectList().then((res) => {
      console.log(res);
      this.project = res.data;
    });
    courseCreditList().then((res) => {
      console.log(res);
      this.credit = res.data;
    });
  },
  methods: {
    //学分筛选
    handlePoint(command) {
      this.pointValue = command;
    },
    //价格筛选
    handlePrice(command) {
      this.priceValue = command;
    },
    //学科分类
    chooseScience(elem) {
      this.$router.push({
        path: "/knowledgeNav/list",
        query: {
          sub: elem.id,
        },
      });
    },
    //左侧导航
    ch(val) {
      //   console.log(val);
      let typ = this.tags.join(",");
      console.log(this.tags);
      this.page = 1;
      let query = { ...this.$route.query, pg: 1, typ };
      this.$router.push({ path: "list", query });
    },
    //顶部筛选
    tabChange() {
      this.page = 1;
      let query = { ...this.$route.query, ord: this.tabValue, pg: 1 };
      this.$router.push({ path: "list", query });
    },
    doSearch() {
      if (this.searchName === "") {
        this.page = 1;
        let query = {};
        if (this.courseSecondType.id != "") {
          query.sub = this.courseSecondType.id;
        }
        this.$router.push({ path: "list", query });
      } else {
        this.page = 1;
        let query = { pg: 1, name: this.searchName };
        if (this.courseSecondType.id != "") {
          query.sub = this.courseSecondType.id;
        }
        this.$router.push({ path: "list", query });
      }
    },
    handleCurrentChange(val) {
      let query = { ...this.$route.query, pg: val };
      this.$router.push({ path: "list", query });
    },
    getTotal(total, current) {
      this.elpageShow = false;
      this.total = total;
      this.page = current;
      this.$nextTick(() => {
        this.elpageShow = true;
      });
      console.log(this.elpageShow);
    },
    //递归学科数组
    changeScience(arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].children == undefined) {
          this.allScience.push(arr[i]);
        } else {
          this.allScience.push({
            id: arr[i].id,
            name: arr[i].name,
            code: arr[i].code,
            parentId: arr[i].parentId,
          });
          this.changeScience(arr[i].children);
        }
      }
    },
  },
  watch: {
    $route(rout) {
      this.scienceActive = rout.query.sub;
      this.allScience.forEach((elem) => {
        if (elem.id == this.scienceActive) {
          console.log(123);
          this.ScienceAciiveName = elem.name;
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
$innerWidth: 1200px;
$dialogWidth: 700px;
.container {
  background: #f6f6f6;
  overflow: hidden;
  margin: 0 auto;
  min-height: 600px;
  .inner-container {
    width: $innerWidth;
    margin: 0 auto 0;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
  }
}
.topTab {
  width: 100%;
  height: 44px;
  background: #fff;
  border: 1px solid #eee;
  .inner {
    width: $innerWidth;
    height: 44px;
    margin: 0 auto 0;
    font-size: 14px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      justify-content: start;
      align-items: center;
      height: 44px;
      .currentSci {
        width: 150px;
        color: #2d323e;
        height: 28px;
        line-height: 28px;
        span {
          color: #49af4f;
        }
      }
      .studyPoint,
      .price,
      .time {
        margin-left: 30px;
        ::v-deep .el-input__inner {
          border: none;
          width: 60px;
          color: #49af4f;
          padding: 0;
          font-size: 14px;
        }
      }
    }
    .right {
      cursor: pointer;
    }
  }
}
.select {
  width: $innerWidth;
  margin: 0 auto 10px;
  overflow: hidden;
  .selectCon {
    .scActive {
      background: rgba(56, 207, 64, 0.1);
      color: #49af4f !important;
      // border-bottom: 1px solid #49af4f !important;
    }
    height: 0px;
    position: relative;
    transition: 0.3s;
    .science {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ddd;
      padding: 0 0 10px 0;
      .label {
        width: 90px;
        padding: 10px 0 0 10px;
      }
      .currentPlace {
        height: 30px;
        line-height: 30px;
        .scienceSe {
          font-weight: bold;
          cursor: pointer;
          .sel {
            display: inline-block;
            margin-left: 3px;
            width: 16px;
            height: 16px;
            vertical-align: middle;
            background: url("../../assets/2.png");
            background-size: 16px 16px;
          }
        }
        .scienceSe:hover {
          color: #49af4f;
        }
        .secScienceSe {
          cursor: pointer;
          color: #49af4f;
        }
      }
    }
    .price,
    .point,
    .onlineTime {
      border-bottom: 1px solid #ddd;
      margin: 10px 0;
      padding: 0 0 10px 0;
      display: flex;
      justify-content: start;
      align-items: center;
      .label {
        width: 90px;
        padding: 0 0 0 10px;
      }
      .priceCon,
      .pointCon,
      .onlineTimeCon {
        margin-left: 5px;
        span {
          display: inline-block;
          font-size: 14px;
          padding: 5px 20px;
          color: #6d7278;
          cursor: pointer;
          border-bottom: 1px solid #fff;
        }
        span:hover {
          background: rgba(56, 207, 64, 0.1);
          color: #49af4f;
          border-bottom: 1px solid #49af4f;
        }
      }
    }
    .keyword {
      margin: 10px 0 10px;
      padding: 0 0 10px 0;
      display: flex;
      justify-content: start;
      align-items: center;
      .label {
        width: 90px;
        padding: 0 0 0 10px;
      }
      .keywordCon {
        margin-left: 20px;
        input {
          height: 44px;
          width: 400px;
          background: #ffffff;
          border: 1px solid #49af4f;
          border-radius: 2px;
          padding-left: 20px;
          box-sizing: border-box;
          font-size: 15px;
          outline: none;
        }
        button {
          outline: none;
          height: 44px;
          width: 100px;
          background: #49af4f;
          border-radius: 2px;
          font-family: PingFangSC-Regular;
          font-size: 17px;
          border: 0;
          color: #ffffff;
          vertical-align: bottom;
          margin-left: 20px;
          cursor: pointer;
        }
        button:hover {
        background: #38cf40;
      }
      }
    }
  }
  .selectList {
    width: 100%;
    .details {
      display: flex;
      justify-content: start;
      margin: 5px 0;
      .firName {
        display: inline-block;
        cursor: pointer;
        width: 50px;
        font-size: 14px;
        padding: 5px 10px;
        font-size: 14px;
        color: #2d323e;
        font-weight: bold;
        margin: 0 10px;
        text-align: center;
        border-bottom: 1px solid #fff;
      }
      .firName:hover,
      .secName:hover {
        background: rgba(56, 207, 64, 0.1);
        color: #49af4f;
        border-bottom: 1px solid #49af4f;
      }
      .des {
        color: #ddd;
        padding: 0 10px 0 0;
      }
      .secName {
        cursor: pointer;
        padding: 5px 10px;
        font-size: 14px;
        border-bottom: 1px solid #fff;
        color: #6d7278;
      }
    }
  }
  .topHasNo {
    font-size: 14px;
    color: #2d323e;
    margin-bottom: 20px;
    span {
      font-weight: bold;
      cursor: pointer;
      display: inline-block;
      padding: 5px 10px;
      margin: 5px 10px;
      border-bottom: 1px solid #fff;
    }
    span:hover {
      background: rgba(56, 207, 64, 0.1);
      color: #49af4f;
      border-bottom: 1px solid #49af4f;
    }
  }
}
.active {
  margin-bottom: 10px;
  border: 1px solid #ddd;
  box-shadow: 0 0 3px 3px #eee;
  background: #fff;
  width: 1178px;
  padding: 15px 10px 0 10px;
  height: 480px !important;
}
.snav {
  transition: 0.3s;
  width: 224px;
  height: 400px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #fff;
  .item {
    margin: 10px 0;
    .snav-title {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: #6d7278;
      padding-left: 20px;
    }
    .lists .el-radio {
      display: block;
      padding-left: 50px;
      margin: 10px 0;
    }
  }
}
.snav:hover {
  border: 1px solid #ddd;
  box-shadow: 0 0 3px 3px #eee;
}
.main {
  width: 956px;
}
.search-container {
  .topSearch {
    transition: 0.3s;
    border: 1px solid #fff;
    border-radius: 8px;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    height: 60px;
    background: #fff;
    .radios {
      .el-radio {
        margin-right: 10px;
      }
      .tip {
        color: #6d7278;
        margin-right: 10px;
      }
    }
    .topSearchCon {
      border-radius: 20px;
      height: 40px;
      width: 400px;
      margin-left: 10px;
      border: 1px solid #666;
      white-space: nowrap;
      overflow: hidden;
      input {
        vertical-align: top;
        border: none;
        background: inherit;
        height: 40px;
        outline: none;
        width: 300px;
        font-size: 15px;
        padding-left: 30px;
      }
      button {
        border: none;
        background: #49af4f;
        height: 40px;
        width: 78px;
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
  }
  .topSearch:hover {
    border: 1px solid #ddd;
    box-shadow: 0 0 3px 3px #eee;
  }
}
.list-container {
  margin: 20px 0;
}
.el-pagination {
  text-align: center;
  // margin-top: 10px;
  padding: 3px 0;
  background: #fff;
}
</style>
<style lang="scss">
.el-tree-node__content {
  padding-top: 10px;
  padding-bottom: 10px;
}
.el-tree-node__label {
  font-size: 16px;
}
.left .el-input__inner {
  cursor: pointer;
}
.el-dialog__header {
  border-bottom: 1px solid #ccc;
}
</style>