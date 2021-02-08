<template>
  <div   element-loading-background="rgba(0, 0, 0, 0.7)"  v-loading="loading" element-loading-text="订单生成中，请稍后">
    <div class="orderTop" >
      <div class="step">
        <el-steps :active="step" finish-status="success">
          <el-step title="确认订单"></el-step>
          <el-step title="支付中心"></el-step>
          <el-step title="订单完成"></el-step>
        </el-steps>
      </div>
    </div>
    <div class="orderCon">
      <div class="con" v-show="list.orderId">
      <div class="img">
        <img :src="require('../../assets/chenggong.png')" alt="">
      </div>
      <div class="suc-title">
        购买成功
      </div>
      <div class="name">
        课程名称：<span>{{list.projectName}}</span>
      </div>
      <div class="time">
          购买时间：<span>{{list.finishTime}}</span>
      </div>
      <div class="price">
         购买价格: <span>{{list.payPrice}}</span>
      </div>
      <div class="tip">
        温馨提示：<span> 课程状态可能会有3-5分钟延迟，请耐心等待</span> 
      </div>
      <div class="btns">
        <el-button @click="gotoIndex">返回首页</el-button>
        <el-button @click="gotoCourse(list.projectId)" type="success" plain>进入课程</el-button>
      </div>
      </div>
      <div class="con" v-show="!list.orderId">
       <div class="none">
         当前无支付信息
       </div>
       <div class="btns">
        <el-button @click="gotoIndex">返回首页</el-button>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getOrderDetials} from "../../api/order"
export default {
  created(){
    this.num=this.$route.query.out_trade_no
    this.getList()
  },
  data() {
    return {
      loading:false,
      courseId:'',
      step: 2,
      num:'',
      discount:0,
      list:[],
    };
  },
  methods:{
    //进入课程
    gotoCourse(x){
      this.$router.push({
        path: `/courseList`,
        query: { id: x },
      });
    },
    //返回首页
    gotoIndex(){
      this.$router.replace('/')
    },
    getList(){
      getOrderDetials(this.num).then(res=>{
        if(res.code==200){
         this.list=res.data
          console.log(this.list)
        }else{
          
        }
      })
    },

  },
  // beforeRouteEnter (to, from, next) {
  //   // ...
  //   console.log(to,from)
  // }
};
</script>

<style lang="scss" scoped>
.orderTop::before {
  content: "";
  display: block;
}
.orderTop {
  height: 160px;
  background-color: #e3e6e9;
  background: url("../../assets/cart-header-bg.jpg") repeat-x left bottom;
  position: relative;
  overflow: hidden;
  .step {
    width: 900px;
    margin: 60px auto;
    color: #fff;
  }
}
.orderCon {
  background: #f8fafc;
  min-height: 480px;
  .con {
    position: relative;
    width: 1152px;
    padding: 0 36px 32px;
    background-color: #fff;
    margin-top: -40px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 8px 16px 0 rgba(7, 17, 27, 0.1);
    border-radius: 8px;
    text-align: center;
    overflow: hidden;
    margin-bottom: 30px;
    min-height: 300px;
    .img{
      margin: 60px 0 20px 0;
    }
    .suc-title{
      font-size: 18px;
      font-weight: bold;
    }
    .time,.name,.tip{
      font-size: 14px;
      width: 350px;
      margin: 30px auto;
      text-align: left;
      span{
        color: #666;
      }
    }
    .price{
      font-size: 14px;
      width: 350px;
      margin: 30px auto;
      text-align: left;
      span{
        color: #000;
        font-size: 18px;
      }
    }
    .btns{
      margin: 70px auto 20px;
    }
  }
}
.none{
  margin: 100px auto;
  font-size: 18px;
  color: #666;

}
</style>