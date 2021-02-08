<template>
  <div>
    <div class="de">
      <div class="title">
        <h2>订单中心</h2>
        <ul>
          <li
            :class="type==elem.state?'active':''"
            @click="getType(elem.state)"
            v-for="(elem,i) of stateList"
            :key="i"
          >{{elem.name}}</li>
        </ul>
      </div>
      <div class="con" v-show="list.length>0">
        <div class="items" v-for="(elem,i) of list" :key="i">
          <div class="order-title">
            <i class="el-icon-s-unfold tip"></i>
            订单编号：{{elem.orderNum}}
            <span class="date">{{elem.createTime}}</span>
            <i v-show="elem.orderState!='000'" class="el-icon-delete-solid delete" title="删除订单"></i>
          </div>
          <div class="details">
            <div class="info">
              <el-image :src="elem.projectPicture.indexOf('http')==-1?(bacBase+elem.projectPicture):elem.projectPicture" style="height:90px;width:160px" fit="fill"></el-image>
              <div class="course-info">
                <p class="course-name">{{elem.projectName}}</p>
                <p class="course-price">
                  实付
                  <span>￥{{elem.payPrice}}</span>
                </p>
              </div>
            </div>
            <div class="price">
              <div class="t-price">
                原价
                <span>￥{{elem.projectPrice}}</span>
              </div>
              <div class="discount">折扣 -￥0</div>
              <div class="final-price">
                实付
                <span>￥{{elem.payPrice}}</span>
              </div>
            </div>
            <div class="state">
              <div class="pay" v-show="elem.orderState=='000'" @click="goPay(elem.orderNum)">立即支付</div>
              <div
                class="cancel"
                v-show="elem.orderState=='000'"
                @click="loadingShow=true;orderId=elem.orderId"
              >取消订单</div>
              <div class="close" v-show="elem.orderState=='200'">已取消</div>
              <div class="close" v-show="elem.orderState=='100'">已购买</div>
              <div class="close" v-show="elem.orderState=='500'">已完成</div>
            </div>
          </div>
        </div>
        <div class="page" v-show="list.length>0">
          <page @givePageIndex="getpage" :index="pageNum" :pageSize="pageSize" :total="total"></page>
        </div>
      </div>
      <div class="no-result" v-show="list.length==0">
        <div>暂无任何订单</div>
      </div>
      <div class="loading" v-if="loadingShow">
        <div class="cancel-check">
          <div class="c-title">
            <img :src="require('../../assets/warn_icon.png')" alt />
          </div>
          <h3>订单取消后将无法恢复，确定继续吗？</h3>
          <div class="c-btns">
            <button @click="loadingShow=false">再想想</button>
            <button @click="cancelOrder">确认</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrderList, removeOrder } from "../../api/order";
export default {
  components: {
    page: (resolve) => require(["../../components/pages"], resolve),
  },
  created() {
    this.load();
  },
  data() {
    return {
      bacBase: this.$store.getters.bacBase,
      stateList: [
      {name:"全部",state:''},
       {name:"未支付",state:'000'},
         {name:"已支付",state:'100'},
        {name:"已取消",state:'200'},
         {name:"已完成",state:'500'},
      ],
      type: '',
      list: [],
      orderId: "",
      loadingShow: false,
      pageNum: 1,
      pageSize: 4,
      total: 0,
    };
  },
  methods: {
    getpage(x) {
      //分页
      this.pageNum = x;
      this.load();
    },
    getType(x) {
      this.type = x;
      this.pageNum=1
       this.load();
    },
    load() {
      let obj = {
        orderByColumn: "create_time",
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        isAsc: "desc",
        orderState: this.type,
      };
      getOrderList(obj).then((res) => {
        console.log(res);
        this.list = res.data;
        this.pageNum = res.current;
        this.total = res.total;
        this.pageSize = res.size;
      });
    },
    //前往支付
    goPay(orderNum) {
      this.$router.push({
        path: "payOrder",
        query: {
          num: orderNum,
        },
      });
    },
    //取消订单
    cancelOrder() {
      removeOrder(this.orderId).then((res) => {
        this.loadingShow = false;
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: "取消成功",
          });
          this.load();
        } else {
          this.$message({
            type: "error",
            message: res.msg,
          });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 24px;
  h2 {
    margin-right: 24px;
    float: left;
    font-size: 16px;
    color: #07111b;
    line-height: 32px;
    font-weight: 700;
  }
  h2::after {
    margin-top: 2px;
    margin-left: 20px;
    content: "|";
    color: #d9dde1;
  }
  ul {
    list-style: none;
    float: left;
    li {
      float: left;
      width: 95px;
      line-height: 32px;
      text-align: center;
      font-size: 12px;
      cursor: pointer;
    }
    .active {
      background: #4d555d;
      border-radius: 16px;
      color: #fff;
    }
  }
}
.title::after {
  content: "";
  display: block;
  clear: both;
}
.con {
  width: 100%;
  .items {
    padding: 32px;
    padding-top: 0;
    -webkit-box-shadow: 0 2px 8px 2px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 2px 8px 2px rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 8px 2px rgba(0, 0, 0, 0.1);
    margin-bottom: 24px;
    background: #fff;
    border-radius: 8px;
    position: relative;
    .order-title {
      padding: 28px 0 19px;
      font-weight: 700;
      color: #4d555d;
      border-bottom: 1px solid #b7bbbf;
      font-size: 12px;
      line-height: 12px;
      box-sizing: border-box;
      .tip {
        color: red;
        margin-top: -2px;
        margin-right: 10px;
        font-size: 16px;
        color: #f01414;
      }
      .date {
        color: #93999f;
        font-weight: 500;
        margin-left: 24px;
      }
      .delete {
        float: right;
        margin-left: 28px;
        color: #93999f;
        cursor: pointer;
        display: none;
      }
    }
    .details {
      margin-top: 25px;
      display: flex;
      justify-content: space-between;
      .info {
        width: 520px;
        height: 90px;
        border-right: 1px solid #d9dde1;
        display: flex;
        justify-content: space-between;
        .course-info {
          width: 340px;
          .course-name {
            word-break: break-word;
            color: #07111b;
            font-size: 14px;
            margin-bottom: 8px;
            line-height: 22px;
          }
          .course-price {
            font-size: 12px;
            line-height: 12px;
            span {
              color: #f01414;
            }
          }
        }
      }
      .price {
        width: 150px;
        height: 100%;

        color: #93999f;
        font-size: 16px;
        box-sizing: border-box;
        line-height: 16px;
        padding-top: 15px;
        div {
          width: 120px;
          font-size: 12px;
          margin-bottom: 5px;
        }
        .t-price > span {
          text-decoration: line-through;
        }
        .final-price {
          span {
            color: red;
            font-size: 16px;
          }
        }
      }
      .state {
        height: 90px;
        width: 200px;
        border-left: 1px solid #d9dde1;
        text-align: center;
        color: #93999f;
        box-sizing: border-box;
        line-height: 14px;
        .pay {
          margin: 12px auto;
          display: block;
          width: 120px;
          height: 36px;
          color: #fff;
          background: rgba(240, 20, 20, 0.8);
          border-radius: 18px;
          line-height: 36px;
          cursor: pointer;
        }
        .pay:hover {
          background: red;
        }
        .cancel {
          cursor: pointer;
          font-size: 12px;
        }
        .cancel:hover {
          color: #4d555d;
        }
        .close {
          margin-top: 36px;
        }
      }
    }
  }
  .items:hover {
    -webkit-box-shadow: 0 2px 16px 2px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 0 2px 16px 2px rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 16px 2px rgba(0, 0, 0, 0.1);
  }
  .items:hover .delete {
    display: block;
  }
}
.no-result {
  width: 100%;
  padding: 96px 0 0;
  height: 360px;
  text-align: center;
  background: #fff;
  border-radius: 8px;
  font-size: 16px;
  color: #93999f;
  line-height: 24px;
}
.loading {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 200;
  .cancel-check {
    box-sizing: border-box;
    background: #fff;
    position: absolute;
    box-shadow: 8px 0 16px 0 rgba(7, 17, 27, 0.2);
    border-radius: 4px;
    top: 50% !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
    width: 340px;
    text-align: center;
    padding: 32px;
    .c-title img {
      width: 80px;
      height: 80px;
      overflow: hidden;
      display: block;
      margin: 0 auto 16px;
    }
    h3 {
      font-size: 16px;
      color: #1c1f21;
      line-height: 24px;
      font-weight: 700;
      margin-top: 50px;
    }
    .c-btns {
      width: 100%;
      text-align: center;
      margin-top: 50px;
      button {
        outline: none;
        display: inline-block;
        width: 76px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        color: #fff;
        background: #383d42;
        cursor: pointer;
        border-radius: 18px;
        font-size: 14px;
        border: none;
        margin: 0 6px;
      }
    }
  }
}
.page {
  background: #fff;
  border-radius: 4px;
}
</style>