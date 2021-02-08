export function formatDate(date) {
    var date = new Date(date);
    var YY = date.getFullYear() + '-';
    var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
    var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return YY + MM + DD +" "+ hh + mm + ss;
}
//递归判断列表，把最后的children设为undefined
export function getTreeData(data){
    for(var i=0;i<data.length;i++){
      if(data[i].children.length<1){
        // children若为空数组，则将children设为undefined
        data[i].children=undefined;
      }else {
        //   alert(1)
        // children若不为空数组，则继续 递归调用 本方法
        getTreeData(data[i].children);
      }
    }
    return data;
  }
  export function totalTime(result){
    var h = Math.floor(result / 3600) < 10 ? '0'+Math.floor(result / 3600) : Math.floor(result / 3600);
    var m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
    var s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
    return h + ":" + m + ":" + s;
    }