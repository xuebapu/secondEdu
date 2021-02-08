<template>
  <div>
    <div class="con">
      <el-card>
        <div class="search-form">
          <el-cascader
            class="fang"
            @change="handleChange"
            v-model="showSubjectId"
            :options="courseTree"
            :props="defaultProps"
          ></el-cascader>
          <el-input v-model="meetName" placeholder="请输入直播名称" class="fang" style="width:500px">
            <el-button class="fang" slot="append" icon="el-icon-search" @click="request"></el-button>
          </el-input>
        </div>
        <el-divider content-position="left">直播列表</el-divider>
        <div class="list" v-if="total">
            <div class="item" v-for="item in list" :key="item.id">
              <div class="left">
                <a class="img-box" @click="goDetail(item)">
                  <el-image
                    style="width: 150px; height: 90px"
                    :src="item.picture.indexOf('http')==-1?(bacBase+item.picture):item.picture"
                    fit="fill"
                  ></el-image>
                </a>
              </div>
              <div class="right">
                <div class="title">
                  <a class="cont" :title="item.meetName" @click="goDetail(item)">{{item.meetName}}</a>
                  
                </div>
                <div class="row">
                  <!-- <div class="row_item" :title="item.subject">{{item.subject}}</div> -->
                  <div class="row_item">
                    版权归属
                    <span class="data" :title="item.copyright">{{item.copyright}}</span>
                  </div>
                </div>
                <div class="row">
                  <div class="row_item">
                    主办方
                    <span class="data" :title="item.host">{{item.host}}</span>
                  </div>
                  <!-- <div class="row_item">
                    协办方：
                    <span class="data" :title="item.assist">{{item.assist}}</span>
                  </div> -->
                </div>
              </div>
            </div>
        </div>
        <div class="none" v-else>暂无数据</div>
        <div>
          <page @givePageIndex="getpage" :index="pageNum" :pageSize="pageSize" :total="total"></page>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { courseTreeList } from "@/api/course";
import { liveIndex } from "@/api/live";
import { formatDate, getTreeData } from "@/utils/index";
export default {
  components: {
    page: (resolve) => require(["../../components/pages"], resolve),
  },
  created(){
    this.showSubjectId=this.$route.query.subjectId||[]
    this.meetName=this.$route.query.name
    this.subjectId=this.showSubjectId[this.showSubjectId.length-1]
    console.log(this.subjectId)
  },
  name: "liveList",
  data() {
    return {
      bacBase: this.$store.getters.bacBase,
      courseTree: [],
      defaultProps: {
        children: "children",
        label: "name",
        value: "id",
      },
      meetName: "",
      pageNum: 1,
      pageSize: 6,
      total: 0,
      orderByColumn: "createTime",
      showSubjectId:'',
      subjectId: "",
      typeIds: "",
      isAsc: "desc",
      list: [],
      rateColors: ["#99A9BF", "#F7BA2A", "#FF9900"],
    };
  },
  mounted() {
    courseTreeList().then((res) => {
      // console.log(res);
      this.courseTree = JSON.parse(JSON.stringify(getTreeData(res.data)));
    });
    this.request();
  },
  methods: {
    goDetail(item) {
      this.$router.push({
        path: "live",
        query: { id: item.id },
      });
    },
    request() {
      let parmars = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        subjectId: this.subjectId,
        orderByColumn: this.orderByColumn,
        typeIds: this.typeIds,
        isAsc: this.isAsc,
        meetName: this.meetName,
      };
      console.log(parmars);
      liveIndex(parmars).then((res) => {
        console.log(res);
        this.list = res.data;
        this.total = res.total;
        let { total, current } = res;
        this.$emit("getTotal", total, current);
      });
    },
    handleChange(value) {
      this.subjectId = value[value.length - 1];
      //   console.log(this.formLabelAlign.subject);
    },
    getpage(x) {
      //分页
      // console.log(x);
      this.pageNum = x;
      this.request();
    },
  },
};
</script>
<style lang="scss" scoped>
.con {
  width: 1200px;
  min-height: 680px;
  margin: 20px auto;
  border-radius: 8px;
}
.none {
  padding: 20px;
  text-align: center;
}
.list {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  margin: 30px 0;
}
.item {
  width: 33%;
  display: flex;
  justify-content: space-between;
  padding: 30px 0;
  border-bottom: 1px solid #ccc;
  
  .left {
    margin-left: 10px;
  }
  .img-box {
    display: block;
    padding: 4px;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
  }
  .right {
    margin-left: 20px;
    width:200px;
    .title {
      width:90%;
      font-size: 14px;
      color: #555;
      margin-bottom: 10px;
      margin-top: 10px;
      font-weight: bold;
      a{
      height: 26px;
      line-height: 26px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 100%;
      }
    }
    .row {
       width:90%;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      height: 24px;
      line-height: 24px;
    }
    .row_item {
      width:100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .data {
      color: #165694;
    }
  }
}
.cont {
  cursor: pointer;
  display: block;
  
  &:hover {
    color: #0862a3;
    text-decoration: underline;
  }
}
.search-form {
  margin: 40px auto;
  width: 750px;
}
.fang ::v-deep input,
.section > .search-form ::v-deep .el-input-group__append {
  border-radius: 0;
}
</style>