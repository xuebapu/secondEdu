<template>
  <div>
    <div class="con" v-if="resultBack">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="fontSize:18px;float:left">课程列表</span>
           <span :style="{color:list.free==1?'#49af4f':'#e6a23c'}" style="fontSize:16px;vertical-align: middle;marginRight:10px">{{list.free==1?'免费':'￥'+list.price.toFixed(2)}}</span>
           <el-button @click="goToOrder(list.id)" :disabled="list.isBuy" v-show="list.free==0" size="mini" type="primary">{{list.isBuy?'您已购买':'点击购买'}}</el-button>
        </div>
        <div class="intro">
          <div class="img">
            <img :src=" list.picture.indexOf('http') == -1? bacBase + list.picture: list.picture" alt="无图" />
          </div>
          <div class="details">
            <div class="title">
              <div class="name">{{list.name}}</div>
              <div class="rate">
                <el-rate v-model="list.followCount" :colors="rateColors" disabled></el-rate>
              </div>
            </div>
            <div class="charge">
              <span>项目负责人：{{list.realname}}</span>
              <span style="marginLeft:10px">单位：{{list.unitName}}</span>
            </div>
            <div class="point">学分： &nbsp;{{list.credit}}分</div>
            <div class="intro">简介：{{list.brief.length>50?list.brief.slice(0,50):list.brief}}</div>
             <el-button
             style="float:right"
                :disabled="!list.needExam"
                type="primary"
                icon="el-icon-document"
                size="mini"
                @click="goExam"
              >进入考试</el-button>
          </div>
        </div>
          <el-divider content-position="left">视频列表<i style="marginLeft:5px" class="el-icon-video-camera"></i></el-divider>
        <div v-for="(elem,i) of list.courseList" :key="i" class="text item">
          <div class="con-name">
            <div class="tName" @click="goDetail(elem)">{{elem.name}}</div>  
            <div class="state">
              <el-button type="warning" size="mini">{{courseState(elem.progress)}}</el-button>
            </div>
          </div>
          <div class="info">
            <div class="teacher">授课老师：{{elem.realname}}</div>
            <div class="where">单位：{{elem.unitName}}</div>
          </div>
          <el-divider></el-divider>
        </div>
        <div class="page"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { projectDetail } from "@/api/course";
export default {
  components: {
    // page:resolve=>require(['../../components/pages'],resolve)
  },
  created() {
    this.id = this.$route.query.id ? this.$route.query.id : "";
    this.load();
  },
  data() {
    return {
      bacBase: this.$store.getters.bacBase,
      rateColors: ["#49af4f", "#49af4f", "#49af4f"],
      id: "",
      list: [],
      resultBack: false,
    };
  },
  methods: {
    //进入考试
     //进入考试
    goExam() {
      this.$router.push({
        path: "/exam",
        query: {
          userId: this.list.userId,
          courseId: this.list.id,
        },
      });
    },
    //课程购买
    goToOrder(id){
      this.$router.push({
        path:'/order',
        query:{
          id:id
        }
      })
    },
    goDetail(elem) {
      console.log(elem)
      this.$router.push({
        path: "/course/",
        query:{
          id:elem.id,
          courseId:elem.projectId
        }
      });
    },
    load() {
      this.resultBack = false;
      projectDetail(this.id).then((res) => {
        if (res.code == 200) {
          this.resultBack = true;
          this.list = res.data;
        }
        console.log(res);
      });
    },
    //学习状态
    courseState(x) {
      if(x==null){
        return "未学习";
      }else if(x.status==0){
          return "学习中";
      }else if(x.status==1){
          return "已学习";
      }else if(x.status==2){
          return "待考试";
      }else if(x.status==3){
          return "已完成";
      }
      
    },
  },
};
</script>

<style lang="scss" scoped>
.clearfix{
  text-align: right;
}
.intro {
  display: flex;
  justify-content: space-between;
  .img {
    width: 205px;
    img {
      padding: 2px;
      border: #dcdcdc solid 1px;
      height: 100px;
    }
  }
  .details {
    width: calc(100% - 210px);
    font-size: 12px;
    div {
      margin: 3px 0;
    }
    .title {
      cursor: pointer;
      color: #506eaa;
      font-size: 14px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      .name {
        width: 70%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .charge {
      color: #0075b7;
    }
    .point {
      color: #0075b7;
    }
    .intro {
      // text-indent: 20px;
      height: 66px;
    }
  }
}
.con-name {
  display: flex;
  justify-content: space-between;
  color: #506eaa;
  font-size: 14px;
  font-weight: bold;
  .tName:hover {
    color: #49af4f;
  }
  .tName {
    cursor: pointer;
    width: 580px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.info {
  color: #1277af;
  font-size: 12px;
  display: flex;
  justify-content: start;
  .teacher {
    width: 30%;
  }
  .where {
    width: 60%;
  }
}
</style>