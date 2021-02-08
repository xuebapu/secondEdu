<template>
  <div v-loading="loading">
    <div class="list" v-if="total">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="img">
          <a class="img-box" @click="goDetail(item)">
            <el-image style="width: 225px; height: 125px"  :src="item.picture.indexOf('http')==-1?(bacBase+item.picture):item.picture" fit="fill"></el-image>
          </a>
        </div>
        <div class="title">
          <a :title="item.name" @click="goDetail(item)">{{item.name}}</a>
        </div>
        <div class="rate">
          <el-rate v-model="item.followCount" :colors="rateColors" disabled></el-rate>
        </div>
        <div class="row_item">
         <el-tag size="mini" effect="dark" :type="item.free==1?'primary':'warning'">{{item.free==1?'免费':'￥'+item.price.toFixed(2)}}</el-tag>
        </div>
        <div class="row_item">
          单位：
          <span class="data">{{item.unitName}}</span>
        </div>
        <div class="row_item">
          项目编号：
          <span class="data">{{item.number}}</span>
        </div>
      </div>
    </div>
    <div class="none" v-else>暂无数据</div>
  </div>
</template>
<style lang="scss" scoped>
.none {
  padding: 20px;
  text-align: center;
}
.list {
  width: 100%;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
}
.item:nth-child(4n+0){
  margin-right: 0;
}
.item {
  box-shadow: 0 0 3px 3px #eee;
  background: #fff;
  border-radius: 4px;
  overflow: hidden;
  margin: 0 18px 25px 0px;
  height: 245px;
  .img {
    width: 225px;
    .img-box {
      display: block;
      cursor: pointer;
      width: 225px;
      height: 125px;
      overflow: hidden;
      .el-image {
        transition: 0.4s;
      }
      .el-image:hover {
        transform: scale(1.2);
      }
    }
  }
  .title {
    padding-left: 10px;
    height: 20px;
    line-height: 20px;
    margin: 8px 0 0 0;
    font-size: 14px;
    color: #333333;
    width: 210px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    a {
      cursor: pointer;
    }
    a:hover {
      color: #49af4f;
    }
  }
  .rate {
    transform: scale(0.7) translate(-45px,0);
    padding-left: 10px;
    width: 210px;
  }
  .row_item {
    margin: 1px 0;
    height: 20px;
    line-height: 20px;
    padding-left: 10px;
    font-size: 14px;
    width: 210px;
    color: #ccc;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
<script>
import { courseList } from "@/api/course";
export default {
  name: "List",
  data() {
    return {
      bacBase: this.$store.getters.bacBase,
      page: 1,
      pageSize: 12,
      orderByColumn: "followCount",
      subjectId: "",
      typeIds: "",
      isAsc: "desc",
      list: [],
      rateColors: ["#49AF4F", "#49AF4F", "#49AF4F"],
      total: 0,
      loading:false,
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    goDetail(item) {
      this.$router.push({
        path: "/courseList",
        query: { id: item.id },
      });
    },
    initData() {
      let query = { ...this.$route.query };
      this.page = query.hasOwnProperty("pg") ? query.pg : 1;
      this.subjectId = query.hasOwnProperty("sub") ? query.sub : "";
      this.orderByColumn = query.hasOwnProperty("ord") ? query.ord : "followCount";
      this.typeIds = query.hasOwnProperty("typ") ? query.typ : "";
      this.isAsc = query.hasOwnProperty("asc") ? query.asc : "desc";
      this.name = query.hasOwnProperty("name") ? query.name : "";
      this.request();
    },
    request() {
      console.log(this.orderByColumn)
      this.loading=true
      let parmars = {
        pageNum: this.page,
        pageSize: this.pageSize,
        subjectId: this.subjectId,
        orderByColumn: this.orderByColumn,
        typeIds: this.typeIds,
        // type:2,
        isAsc: this.isAsc,
        name: this.name,
      };
      console.log(parmars);
      courseList(parmars).then((res) => {
        this.loading=false
        console.log(res);
        this.list = res.data;
        this.total = res.total;
        let { total, current } = res;
        this.$emit("getTotal", total, current);
      });
    },
  },
  watch: {
    $route(a, b) {
      this.initData();
    },
  },
};
</script>