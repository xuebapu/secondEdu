<template>
  <div>
    <div class="con">
      <div class="inner">
        <div class="leftSlide">
          <h1>订单中心</h1>
          <ul class="nav-menu">
            <li class="nav-item" v-for="(elem,i) of slideList" :key="i">
              <p @click="slideChoose(elem.id)" :style="{color:leftSlide==elem.id?'#f01414':''}">{{elem.name}}</p>
               <i :style="{color:leftSlide==elem.id?'#f01414':''}" :class="leftSlide==elem.id?'el-icon-caret-right':'el-icon-caret-bottom'"></i>
            </li>
          </ul>
        </div>
        <div class="right">
         <my-order></my-order>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components:{
    myOrder:resolve=>require(['./myOrder'],resolve),
  },
  data(){return{
    leftSlide:'1',
    slideList:[
      {name:'我的订单',id:1},
      // {name:'我的余额',id:2},
      // {name:'电子兑换码',id:3},
      // {name:'我的优惠券',id:4},
      // {name:'消费记录',id:5},
    ],
  }},
  methods:{
    slideChoose(id){
      this.$router.push({
        path:'/myOrder',
        query:{
          leftSlide:id
        }
      })
    }
  },
  watch:{
    $route(router){
      if(router.query.leftSlide){
        this.leftSlide=router.query.leftSlide
        console.log(router.query.leftSlide)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.con {
  min-height: 750px;
  background: #f3f5f7;
  width: 100%;
  .inner {
    width: 1200px;
    margin: 0 auto;
    padding: 36px 0;
    display: flex;
    justify-content: space-between;
    .leftSlide {
      width: 130px;
      h1 {
        padding-bottom: 16px;
        font-size: 14px;
        color: #4d555d;
        line-height: 32px;
        border-bottom: 1px solid #d9dde1;
      }
      .nav-menu {
        width: 100%;
        list-style: none;
        .nav-item {
          margin-top: 16px;
          width: 100%;
          height: 32px;
          line-height: 32px;
          box-sizing: border-box;
          cursor: pointer;
          font-size: 14px;
          color: #4d555d;
          display: flex;
          justify-content: space-between;
          align-items: center;
          i{
            transform: scale(0.8);
          }
        }
      }
    }
    .right {
      width: 1020px;
    }
  }
}
</style>