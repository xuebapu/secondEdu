<template>
  <div>
    <div class="lists" v-for="(elem,i) of list" :key="i">
      <div class="img">
        <el-image  :src="elem.picture.indexOf('http')==-1?(bacBase+elem.picture):elem.picture" fit="fill"></el-image>
      </div>
      <div class="info">{{elem.name}}</div>
      <div class="price">￥{{elem.price.toFixed(2)}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data(){return{
    bacBase:this.$store.getters.bacBase
  }}
};
</script>

<style lang="scss" scoped>
.lists {
  padding: 24px;
  box-sizing: border-box;
  background: #f3f5f7;
  display: flex;
  justify-content: space-between;
  .img {
    width: 160px;
    border: 1px solid #ddd;
    height: 90px;
    .el-image{
      width: 160px;
    height: 90px;
    }
  }
  .info {
    width: 462px;
    height: 90px;
    font-size: 16px;
    color: #07111b;
    line-height: 24px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .price{
      width: 302px;
    font-size: 16px;
    color: #f01414;
    padding-top: 30px;
  }
}
</style>