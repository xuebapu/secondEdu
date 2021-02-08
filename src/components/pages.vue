<template>
  <div>
    <div class="page">
      <el-pagination
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :current-page="index"
        :page-size="pageSize"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: ["index", "pageSize", "total"],
  methods: {
    handleCurrentChange(val) {
      this.$emit("givePageIndex", val);
    }
  }
};
</script>

<style scoped>
.page{
  display: inline-block;
  position: relative;
  left: 50%;
  transform: translate(-50%);
}
</style>