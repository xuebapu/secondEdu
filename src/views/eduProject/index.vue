<template>
  <div>
    <div class="top-img">
      <div class="top-list">
        <div class="item" v-for="(elem,i) of projectList" :key="i">{{elem}}</div>
      </div>
    </div>
    <!-- 推荐 -->
    <div class="recommend">
      <div class="section">
        <div class="section-title">
          <h2>
            推荐项目
            <span class="intro">针对工作的体系化学习课程</span>
          </h2>
        </div>
        <div class="section-con">
          <div class="it" v-for="(item,index) of tujList" :key="index">
            <el-image :src="item.img" fit="contain"></el-image>
            <div class="title">vue前端</div>
            <div class="info">根据vue框架用h5,css快速搭建前端页面</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 项目筛选 -->
    <div class="pro-nav">
      <div class="pro-nav-con">
        <div class="item" v-for="(elem,i) of projectList" :key="i">{{elem}}</div>
      </div>
    </div>
    <div class="con">
      <div class="con-inner">
        <div class="left-list">
          <div class="item"  v-for="(item,index) of tujList" :key="index">
            <el-image :src="item.img" fit="contain"></el-image>
            <div class="right">
              <div class="title">H5</div>
              <div class="tips">
                <span>javaScript</span>
                <span>css</span>
                <span>共9课时</span>
                <span>授予学分 9 分</span>
              </div>
              <div class="abs">
                Vue 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。
                Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。
                另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。
              </div>
            </div>
          </div>
          <div class="pages">
            <page @givePageIndex="getpage" :index="pageNum" :pageSize="pageSize" :total="total"></page>
          </div>
        </div>
        <div class="right-sel">
          <div class="select">
            <div class="select-title">类别筛选：</div>
            <div class="select-con">
              <el-select style="width:100%" size="mini" v-model="typeValue" placeholder="请选择">
                <el-option v-for="(elem,i) of typeList" :key="i" :label="elem" :value="i"></el-option>
              </el-select>
            </div>
          </div>
          <div class="select">
            <div class="select-title">项目筛选：</div>
            <div class="select-con">
              <el-select style="width:100%" size="mini" v-model="projectValue" placeholder="请选择">
                <el-option v-for="(elem,i) of projectList" :key="i" :label="elem" :value="i"></el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
    page: (resolve) => require(["../../components/pages"], resolve),
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 6,
      total: 0,
      projectList: [
        "处级项目· I 类学分",
        "中级项目· II 类学分",
        "高级项目· I 类学分",
        "终级项目· II 类学分",
      ],
      typeValue: "",
      typeList: ["全部", "1", "2", "3"],
      projectValue: "",
      tujList:[{img:require('../../assets/tuijian/1.png')},{img:require('../../assets/tuijian/2.jpg')},{img:require('../../assets/tuijian/3.png')},{img:require('../../assets/tuijian/4.jpg')},{img:require('../../assets/tuijian/5.jpg')},{img:require('../../assets/tuijian/6.jpg')}],
    };
  },
  created() {
  },
  methods: {
    //分页
    getpage(x) {
      // console.log(x);
      this.pageNum = x;
      // this.request();
    },
  },
};
</script>

<style lang="scss" scoped>
$innderWidth: 1200px;
.top-img {
  width: 100%;
  height: 360px;
  background: url("../../assets/jjxm.jpg");
  background-size: cover;
  position: relative;
  .top-list {
    width: 1200px;
    position: absolute;
    bottom: -60px;
    left: 50%;
    transform: translate(-50%, 0);
    background: #ffffff;
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.25);
    border-radius: 4px;
    height: 120px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .item {
      font-family: PingFangSC-Medium;
      font-size: 24px;
      color: #2d323e;
      width: 227px;
      text-align: center;
    }
  }
}
.recommend {
  width: 100%;
  background: #ffffff;
  box-shadow: inset 0 -1px 0 0 #dddddd;
  padding-bottom: 60px;
  .section {
    width: $innderWidth;
    margin: 120px auto 0;
    .section-title {
      margin-bottom: 18px;
      .intro {
        margin-left: 10px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #6d7278;
      }
    }
    .section-con {
      display: flex;
      justify-content: start;
      flex-wrap: wrap;
      .it {
        box-sizing: border-box;
        background: #ffffff;
        border: 1px solid #dddddd;
        border-radius: 4px;
        width: 386px;
        height: 300px;
        margin-right: 21px;
        margin-bottom: 20px;
        .el-image {
          height: 220px;
          width: 384px;
        }
        .title {
          font-family: PingFangSC-Regular;
          font-size: 20px;
          color: #2d323e;
          margin: 12px 0 5px 10px;
          width: 360px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .info {
          margin: 0 10px 12px 10px;
          width: 360px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #6d7278;
        }
      }
      .it:nth-child(3n + 0) {
        margin-right: 0;
      }
    }
  }
}
.pro-nav {
  background: #ffffff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
  .pro-nav-con {
    width: $innderWidth;
    margin: 0 auto;
    display: flex;
    justify-content: start;
    align-items: center;
    height: 80px;
    .item {
      font-family: PingFangSC-Medium;
      font-size: 17px;
      cursor: pointer;
      color: #2d323e;
      margin-right: 60px;
      padding-bottom: 10px;
      border-radius: 1.5px;
      transition: 0.3s;
    }
    .item:hover,
    .active {
      color: #49af49;
      border-bottom: 3px solid #49af49;
    }
  }
}
.con {
  width: 100%;
  background: #efefef;
  padding-top: 20px;
  .con-inner {
    width: $innderWidth;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .left-list {
      width: 940px;
      .item {
        box-sizing: border-box;
        width: 100%;
        height: 160px;
        background: #ffffff;
        border: 1px solid #dddddd;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        .left-img {
          width: 280px;
        }
        .right {
          width: 660px;
          padding: 20px;
          .title {
            font-family: PingFangSC-Regular;
            font-size: 20px;
            color: #2d323e;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 620px;
          }
          .tips {
            font-family: PingFangSCRegular;
            font-size: 12px;
            color: #6d7278;
            line-height: 17px;
            height: 17px;
            margin: 5px 0 15px 0;
            width: 620px;
            span+span::before{
              content: "|";
              display: inline-block;
              padding: 0 10px;
              color: #CCCCCC;
            }

          }
          .abs {
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #6d7278;
            width: 620px;
            max-height: 57px;
            overflow: hidden;
          }
        }
      }
    }
    .right-sel {
      height: 200px;
      box-sizing: border-box;
      width: 240px;
      background: #ffffff;
      border: 1px solid #dddddd;
      border-radius: 4px;
      padding: 18px 20px 20px 20px;
      .select {
        width: 200px;
        margin-bottom: 20px;
        .select-title {
          font-family: PingFangSC-Regular;
          font-size: 16px;
          color: #2d323e;
          margin-bottom: 12px;
        }
        .select-con {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #6d7278;
        }
      }
    }
  }
}
.con .pages{
  width: 100%;
  background: #fff;
  margin-bottom: 20px;
}
</style>
