<template>
  <div>
    <div class="con">
      <div class="leftList" :style="{height:autoHeight}" v-if="!fullScreen">
        <el-scrollbar style="height:99%">
          <div
            class="item"
            v-for="(elem,i) of list"
            :key="i"
            :class="index==i?'active':''"
            @click="change(elem,i)"
          >
            <span>{{i+1}}</span>
            <img :src="elem" />
          </div>
        </el-scrollbar>
      </div>
      <div class="rightShow"  v-if="result" :style="{width:fullScreen?'100%':'80%',height:autoHeight}">
        <img class="currentPic" :src="current" :style="{height:fullScreen?'90%':'80%'}" />
        <div class="btns">
          <button @click="changeCurrent(-1)">上一页</button>
           <button @click="changeCurrent(+1)">下一页</button>
           <button @click="clickFullscreen">{{fullScreen?'退出全屏':'全屏'}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onlinePreview } from "../../api/admin";
import screenfull from 'screenfull'
export default {
  created() {
    this.autoHeight = window.screen.availHeight - 100 + "px";
    console.log(this.autoHeight);
    this.load();
  },
  data() {
    return {
      result: false,
      autoHeight: 500,
      list: [],
      index: 0,
      current: "",
      fullScreen:false,
    };
  },
  methods: {
     clickFullscreen(){
        screenfull.toggle()
        this.fullScreen=!this.fullScreen
        this.autoHeight=this.fullScreen?window.screen.height+'px': window.screen.availHeight - 100+'px'
        console.log(this.autoHeight)
      },
    change(x, y) {
      this.index = y;
      this.current = x;
    },
    changeCurrent(x){
      this.index+=x
      if(this.index<0){
        this.index=0
      }else if(this.index>=this.list.length){
         this.index=this.list.length-1
      }
      this.list.forEach((elem,i)=>{
        if(i==this.index){
          this.current=elem
        }
      })
    },
    load() {
      this.result = false;
      let obj = {
        url: this.$route.query.url,
        type: this.$route.query.type,
      };
      onlinePreview(obj).then((res) => {
        this.list = res.data.imageUrls;
        this.current = res.data.imageUrls[0];
        this.result = true;
        console.log(res);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.con {
  background: #0e0e0e;
  display: flex;
  justify-content: space-between;
  width: 100%;
  .leftList {
    width: 16%;
    overflow: hidden;
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    box-shadow: 0 0 17px 2px rgba(255, 255, 255, 0.5);
    .item {
      width: 99%;
      margin: 15px 0;
      padding: 15px 0;
      display: flex;
      justify-content: space-around;
      cursor: pointer;
      span {
        color: #666;
      }
      img {
        width: 80%;
      }
    }
    .item:hover {
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.5) inset;
    }
    .active {
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.5) inset;
    }
  }
  .rightShow {
    width: 80%;
    .currentPic {
      display: block;
      object-fit:fill;
      width: 90%;
      // height: 80%;
      margin: 30px auto 30px;
    }
    .btns{
      width: 70%;
      margin: 0 auto;
      text-align: center;
      button{
        width:20%;
      }
    }
  }
}
</style>