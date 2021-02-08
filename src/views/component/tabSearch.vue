<template>
  <div>
    <div @mouseleave="hide" class="con" :style="{left:left,top:top}">
      <div class="div">
        <div class="left">
          <div
            class="item"
            :class="se==num?'active':''"
            @mouseover="cSecList(num)"
            v-for="num of 4"
            :key="num"
          >
            <span v-for="n of 3" :key="n">
              {{lists[n-1+(num-1)*3].name}}
              <span v-if="n!=3" style="padding:0 5px">/</span>
            </span>
          </div>
           <div
            class="item"
            :class="se==num+4?'active':''"
            @mouseover="cSecList(num+4)"
              v-for="num of 4"
              :key="num+'1'"
          >
            <span v-for="n of 2" :key="n">
              {{lists[n-1+(num-1)*2+12].name}}
              <span v-if="n!=2" style="padding:0 5px">/</span>
            </span>
          </div>
        </div>
        <div class="right" :style="{height:se>4?'70px':'110px'}">
            <div class="list" v-for="(elem,i) of secList" :key="i">
              <span class="name" :class="elem.id==active?'active':''"  @click="getScience(elem.id)">{{elem.name}}</span>
              <div class="it">
                <span  :class="el.id==active?'active':''"  @click="getScience(el.id)" v-for="(el,index) of elem.children" :key="index">{{el.name}}</span>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    lists: {
      type: Array,
      defalut() {
        return [];
      },
    },
    left: {
      type: String,
      defalut() {
        return "0";
      },
    },
    top: {
      type: String,
      defalut() {
        return "0";
      },
    },
  },
  data() {
    return {
      secList: [],
      se: 0, //一级菜单hover
      active:'',
    };
  },
  methods: {
    getScience(x){
       sessionStorage.setItem("active", 2);
     this.$router.push({
       path:'/knowledgeNav/list',
       query:{
         sub:x
       }
     })
    },
    hide() {
      this.$emit("showSe", false);
    },
    cSecList(x) {
      // console.log(x)
      if(x<=4){
        this.secList = this.lists.filter((elem,i,arr)=>{
            return i<x*3&&i>=(x-1)*3
        })
      }else{
         this.secList = this.lists.filter((elem,i,arr)=>{
            return i<(x-4)*2+12&&i>=(x-5)*2+12
        })
      }
      this.se = x;
      // console.log(this.secList)
    },
  },
  watch:{
    $route(rout){
      if(rout.query.sub){
        this.active=rout.query.sub
      }
    }
  }
};
</script>

<style lang="scss" scoped>
 .active {
      border-left: 3px solid #49af4f !important;
      background: rgba(56, 207, 64, 0.1);
      color: #49af4f;
    }
.con {
  font-weight: normal;
  position: absolute;
  z-index: 1000;
  text-align: left;
  color: #6d7278;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
  .div {
    display: flex;
    justify-content: space-between;
  }
  .left {
    width: 220px;
    padding: 5px 5px 5px 0;
    border: 1px solid #ddd;
     background: #fff;
    overflow: hidden;
    .item {
      font-size: 14px;
      color: #6d7278;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 5px 5px 0 15px;
      margin: 0 auto 15px;
       border-left: 3px solid #fff;
      height: 20px;
      cursor: pointer;
    }
    .active {
      border-left: 3px solid #49af4f;
      background: rgba(56, 207, 64, 0.1);
      color: #49af4f;
    }
  }
  .right {
    // width: 410px;
     background: #fff;
      border: 1px solid #ddd;
      border-left: none;
      height: 110px;
    .list {
      padding: 5px 5px 0 0;
      display: flex;
      justify-content: start;
      align-items: center;
      .name {
        font-size: 14px;
        color: #333333;
        padding: 5px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
         border-left: 3px solid #fff;
        cursor: pointer;
        text-align: center;
        width: 70px;
      }
      .name:hover{
         border-left: 3px solid #49af4f;
      background: rgba(56, 207, 64, 0.1);
      color: #49af4f;
      }
    }
    .it {
         border-left: 2px solid #ddd;
      // width: 650px;
      span {
        display: inline-block;
        padding: 3px 5px;
        font-size: 12px;
        color: #6d7278;
          border-left: 3px solid #fff;
        cursor: pointer;
      }
      span:hover {
              border-left: 3px solid #49af4f;
      background: rgba(56, 207, 64, 0.1);
        color: #49af4f;
      }
    }
  }
}
</style>