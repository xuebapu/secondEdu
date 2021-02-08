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
      <div class="con">
        <div class="title">
          <p class="good-info">商品信息</p>
        </div>
        <div class="courseList">
          <list :list="list"></list>
        </div>
        <div class="orderSubmit">
          <div class="leftPayWay">
            <span>支持花呗</span>
            <span>可开发票</span>
          </div>
          <div class="rightSub">
            <div class="row">
              <div class="good-total">共{{list.length}}件商品，商品总金额：</div>
              <div class="good-total-price">￥{{total.toFixed(2)}}</div>
            </div>
            <div class="row">
              <div class="discount">优惠折扣：</div>
              <div class="discount-price">-￥{{discount.toFixed(2)}}</div>
            </div>
            <div class="row">
              <div class="final-total">应付：</div>
              <div class="final-price">￥{{finalPrice.toFixed(2)}}</div>
            </div>
            <div class="sub">
              <button  @click="submitOrder">提交订单</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {projectDetail} from "../../api/course"
import {checkOrder} from "../../api/order"
export default {
  components:{
    list:resolve=>require(['./component/list'],resolve)
  },
  created(){
    this.courseId=this.$route.query.id
    this.getList()
  },
  data() {
    return {
      loading:false,
      courseId:'',
      step: 0,
      discount:0,
      list:[],
    };
  },
  methods:{
    getList(){
      projectDetail(this.courseId).then(res=>{
        if(res.code==200){
          this.list.push(res.data)

        }else{
          this.list=[]
        }
      })
    },
    //提交订单
    submitOrder(){
      this.loading=true
      let obj={
        projectId:this.courseId
      }
      checkOrder(obj).then(res=>{
        console.log(res)
        this.loading=false
        if(res.code==200){
          this.$router.push({
            path:'payOrder',
            query:{
              num:res.data.orderNum
            }
          })
        }else if(res.code==678){
        //  前往个人中心
         this.$confirm('此课程已存在未支付订单，请移步订单中心完成支付或取消未支付订单！', res.msg, {
          confirmButtonText: '前往用户中心',
          showCancelButton:false,
          closeOnClickModal:false,
          closeOnPressEscape:false,
          showClose:false,
          type: 'warning'
        }).then(() => {
          this.$router.push({
            path:'/myOrder'
          })
          console.log('前往个人中心')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
        }else{
          this.$message.error(res.msg)
        }
        })
    }
  },
  computed: {
    total(){
      var total=0
      this.list.forEach(elem=>{
        total+=elem.price
      })
      return total
    },
    finalPrice(){
      return this.total-this.discount
    }
  },
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
       margin-bottom: 30px;
    position: relative;
    width: 1152px;
    padding: 0 36px 32px;
    background-color: #fff;
    margin-top: -40px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 8px 16px 0 rgba(7, 17, 27, 0.1);
    border-radius: 8px;
    .title {
      padding-top: 36px;
      padding-bottom: 24px;
      .good-info {
        margin-left: 12px;
        color: #07111b;
        font-size: 16px;
        line-height: 16px;
      }
    }
    .courseList {
      width: 100%;
      padding-bottom: 36px;
      border-bottom: 1px solid #d9dde1;
    }
    .orderSubmit {
      margin-top: 36px;
      display: flex;
      justify-content: space-between;
    }
    .leftPayWay {
      span {
        display: inline-block;
        padding: 0 12px;
        height: 26px;
        line-height: 26px;
        border: 1px solid #f01414;
        border-radius: 18px;
        font-size: 12px;
        color: #f01414;
        margin-right: 15px;
      }
    }
    .rightSub {
      .row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        line-height: 26px;
        width: 400px;
        font-size: 14px;
        color: #07111b;
        .good-total,
        .discount,
        .final-total {
          width: 260px;
          text-align: right;
        }
        .good-total-price,
        .discount-price,
        .final-price {
          width: 130px;
          text-align: right;
        }
        .final-price {
          font-weight: 700;
          color: #f01414;
          font-size: 24px;
        }
      }
      .sub {
        float: right;
        button {
          border-radius: 18px;
          padding: 0;
          width: 140px;
          height: 40px;
          margin-top: 12px;
          text-align: center;
          font-size: 14px;
          line-height: 40px;
          border-style: solid;
          border-width: 1px;
          cursor: pointer;
          color: #fff;
          background-color: #f20d0d;
          border-color: #f20d0d;
        }
        button:hover {
          color: #fff;
          border-color: #c20a0a;
          background: #c20a0a;
        }
      }
    }
  }
}
</style>