<template>
  <div>
    <div class="orderTop">
      <div class="step">
        <el-steps :active="step" finish-status="success">
          <el-step title="确认订单"></el-step>
          <el-step title="支付中心"></el-step>
          <el-step title="订单完成"></el-step>
        </el-steps>
      </div>
    </div>
    <div class="orderCon" v-if="resultBack">
      <div class="con">
        <div class="title">
          <p class="good-info">订单：{{details?details.orderNum:''}}</p>
        </div>
        <div class="courseList">
          <list :list="list"></list>
        </div>
        <div class="payWayTitle">
          <p>支付方式</p>
        </div>
        <div class="payWay">
          <div @click="choseType(101)" class="alipay item" :class="type==101?'active':''">
            <div class="bottomRight">
              <i class="right"></i>
            </div>
          </div>
          <div @click="choseType(102)" class="weChat item" :class="type==102?'active':''">
            <div class="bottomRight">
              <i class="right"></i>
            </div>
          </div>
        </div>
        <div class="orderSubmit">
          <div class="leftPayWay"></div>
          <div class="rightSub">
            <div class="row">
              <div class="final-total">应付金额：</div>
              <div class="final-price">￥{{details?details.projectPrice.toFixed(2):0}}</div>
            </div>
            <div class="sub">
              <button @click="pay">立即支付</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="loading" v-if="payShow">
      <div class="alipay" v-show="type==101">
        <div class="wait-img">
          <img :src="require('../../assets/59.png')" alt />
        </div>
        <h3>等待您完成支付...</h3>
        <p v-show="!orderFalse" class="tip">请在支付页面继续完成支付</p>
        <p v-show="orderFalse" class="tip" style="color:red">订单支付失败,请重新选择支付方式</p>
        <div class="payBtn">
          <button @click="payCheck" class="success-btn">支付完成</button>
        </div>
        <div class="payRechoose" @click="payShow=false;orderFalse=false">
          <i class="el-icon-refresh-left"></i>
          重新选择支付方式
        </div>
      </div>
      <div class="weChatPay" v-show="type==102">
        <h1 class="price">微信支付￥{{details.projectPrice.toFixed(2)}}</h1>
        <div class="img-code">
          <img :src="'data:image/png;base64,'+wxCode" alt />
        </div>
        <p>使用微信扫描二维码进行支付</p>
         <p v-show="orderFalse" class="tip" style="color:red">订单支付失败,请重新选择支付方式</p>
         <div class="payBtn">
          <button @click="payCheck" class="success-btn">支付完成</button>
        </div>
        <div class="payRechoose" @click="payShow=false;orderFalse=false">
          <i class="el-icon-refresh-left"></i>
          重新选择支付方式
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryPay, getOrderDetials,payOrder } from "../../api/order";
export default {
  components: {
    list: (resolve) => require(["./component/list"], resolve),
  },
  created() {
    this.num = this.$route.query.num;
    this.getList();
  },
  data() {
    return {
      payShow: false,
      resultBack: false,
      orderFalse:false,
      num: "",
      step: 1,
      type: 101,
      list: [], //商品列表
      details: [],
      wxCode:'',
    };
  },
  methods: {
    //支付完成检测
    payCheck(){
      let obj={
        orderNum:this.num,
        payType:this.type
      }
      queryPay(obj).then((res) => {
        console.log(res);
        if (res.code==200) {
         this.$router.push({
           path:'/payFinish',
           query:{
             out_trade_no:this.details.orderNum
           }
         })      
        }
         else { 
          this.orderFalse=true;
        }
      });
    },
    //支付方式
    choseType(x) {
      this.type = x;
    },
    getList() {
      this.resultBack = false;
      getOrderDetials(this.num).then((res) => {
        console.log(res);
        this.resultBack = true;
        if (res.code == 200) {
          this.details = res.data;
          this.list[0] ={
              picture: res.data.projectPicture,
              name: res.data.projectName,
              price: res.data.projectPrice,
            };
          
        } else {
          this.list = [];
        }
      });
    },
    //提交订单
    pay() {
      this.payShow=true
      let obj={
        orderNum:this.num,
        payType:this.type
      }
      payOrder(obj).then(res=>{
        if(res.code==101){
        let routerData = this.$router.resolve({path:'/payHtml',query:{ htmlData: res.data}})
     // 打开新页面
      window.open(routerData.href, '_ blank')
        }else if(res.code==102){
          this.wxCode=res.data
        }
        console.log(res)
      })
    },
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
       margin-bottom: 30px;
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
    .payWayTitle {
      height: 46px;
      line-height: 30px;
      font-size: 16px;
      color: #07111b;
      margin-top: 30px;
    }
    .payWay {
      width: 100%;
      padding-bottom: 36px;
      border-bottom: 1px solid #d9dde1;
      display: flex;
      justify-content: start;
      align-items: center;
      .item {
        background-color: #f3f5f7;
        margin-right: 18px;
        position: relative;
        border-radius: 6px;
        overflow: hidden;
        width: 192px;
        height: 86px;
        border: 2px solid #f3f5f7;
        position: relative;
        cursor: pointer;
        .bottomRight {
          display: none;
          width: 0;
          height: 0px;
          position: absolute;
          right: 0;
          bottom: 0;
          border-bottom: 20px solid red;
          border-left: 20px solid transparent;
          .right {
            display: block;
            position: absolute;
            left: -14px;
            top: 6px;
            width: 16px;
            height: 16px;
            background: url("../../assets/right.png");
          }
        }
      }
      .alipay {
        background-image: url("../../assets/pay_s.png");
        background-position: 33px -304px;
        background-repeat: no-repeat;
      }
      .weChat {
        background-image: url("../../assets/pay_s.png");
        background-position: 30px -423px;
        background-repeat: no-repeat;
      }
      .active {
        border-color: #f01414;
        .bottomRight {
          display: block;
        }
      }
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
          border-radius: 4px;
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
.loading {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 200;
  .alipay {
    background: #fff;
    position: absolute;
    box-shadow: 8px 0 16px 0 rgba(7, 17, 27, 0.2);
    border-radius: 4px;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
    width: 320px;
    text-align: center;
    padding: 36px 0 32px 0;
    .wait-img {
      width: 96px;
      height: 96px;
      background: #f3f5f6;
      border-radius: 50%;
      margin: 0 auto 12px;
      img {
        margin-top: 12px;
      }
    }
    h3 {
      font-size: 16px;
      font-weight: 700;
      color: #1c1f21;
      line-height: 24px;
    }
    .tip {
      margin: 4px auto 16px;
      font-size: 12px;
      color: #9199a1;
      line-height: 18px;
    }
    .payBtn {
      .success-btn {
        border: none;
        padding: 8px 52px;
        cursor: pointer;
        background: #383d42;
        border-radius: 24px;
        font-size: 14px;
        color: #fff;
        line-height: 20px;
        outline: none;
      }
      .success-btn:hover {
        background-color: #545c63;
      }
    }
  }
  .weChatPay {
    background: #fff;
    position: absolute;
    box-shadow: 8px 0 16px 0 rgba(7, 17, 27, 0.2);
    border-radius: 4px;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
    width: 320px;
    text-align: center;
    padding: 36px 0 32px 0;
    .price {
      font-size: 16px;
      color: #545c63;
      line-height: 24px;
      font-weight: 700;
    }
    .img-code {
      width: 180px;
      height: 180px;
      margin: 12px auto;
      img {
        // border: 1px solid #aaa;
        display: inline-block;
        width: 180px;
        height: 180px;
      }
    }
    .p{
      font-size: 12px;
    color: #545c63;
    line-height: 18px;
    }
     .payBtn {
       margin-top: 10px;
      .success-btn {
        border: none;
        padding: 8px 52px;
        cursor: pointer;
        background: #383d42;
        border-radius: 24px;
        font-size: 14px;
        color: #fff;
        line-height: 20px;
        outline: none;
      }
      .success-btn:hover {
        background-color: #545c63;
      }
    }
  }
}
 .payRechoose {
      margin-top: 16px;
      cursor: pointer;
      font-size: 14px;
      color: #9199a1;
      line-height: 24px;
    }
</style>