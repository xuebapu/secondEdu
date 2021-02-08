<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style>
body{
    overflow-x: none;
    min-width: 1200px;
}
</style>
<style lang="scss">
  #app {
   font-family: Helvetica Neue, Helvetica, Arial, PingFang SC, Hiragino Sans GB, Heiti SC, Microsoft YaHei, WenQuanYi Micro Hei, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 15px;
    color: #2c3e50;
  }
  *{
    margin: 0;
    padding: 0;
  }
  
  a{
    text-decoration: none;
    color: #2c3e50;
    
  }
  #app .el-scrollbar__wrap {
  overflow-x: hidden;

 }
#app .el-scrollbar__thumb{
  background: #49af4f;
}

// #app .el-input__inner:focus,#app .el-textarea__inner:hover{
//       border:1px solid #49af4f;
//     }
// #app .el-tabs__item.is-active {
//     color: #49af4f;
// }
// #app .el-tabs__item.is-active:hover{
//     color: #49af4f;
// }
// #app .el-tabs__item:hover {
//     color: #49af4f;
// }
// #app .el-pager li:hover{
//   color: #49af4f;
// }
// #app .el-pager li.active{
//    color: #49af4f;
// }
//  #app .el-radio__input.is-checked .el-radio__inner{
//         border-color: #49af4f;
//     background: #49af4f;
//   }
//  #app .el-radio__input .el-radio__inner:hover{
//         border-color: #49af4f;
//   }
// #app .el-radio__input.is-checked+.el-radio__label {
//     color: #49af4f;
// }
// #app .el-checkbox__input.is-checked .el-checkbox__inner,#app .el-checkbox__input.is-indeterminate .el-checkbox__inner {
//         border-color: #49af4f;
//     background: #49af4f;
// }
// #app .el-checkbox__input.is-checked .el-checkbox__inner,#app .el-checkbox__input.is-indeterminate .el-checkbox__inner {
//      color: #49af4f;
// }
// #app .el-checkbox__input .el-checkbox__inner:hover{
//     border-color: #49af4f;
// }
// #app .el-checkbox__input.is-checked+.el-checkbox__label {
//     color: #49af4f;
// }
</style>
