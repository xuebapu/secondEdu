<template>
  <div>
    <el-card class="con">
      <div class="title">
        <p>在线考试</p>
        <div class="sec">关于xxxxxxxxx</div>
      </div>
      <el-divider content-position="left">试题部分</el-divider>
      <div v-for="(elem,i) of list" :key="i">
        <div class="list" v-if="elem.questionType==1||elem.questionType==5">
          <div class="name">
            <el-tag
              size="mini"
              :type="elem.questionType==1?'':'warning'"
            >{{elem.questionType==1?'单选':'判断'}}</el-tag>
            {{i+1}}.{{elem.summary}}
          </div>
          <div class="line"></div>
          <div class="seList">
            <div class="item" v-for="(n,index) of elem.options" :key="n">
              <el-radio
                :disabled="canLeave"
                v-model="examSubList[i].value"
                :label="n"
              >{{numToEnglish(index+1)+'.'+n}}</el-radio>
            </div>
          </div>
          <div class="analysis" v-if="canLeave">
            <p class="right">
              <label>正确答案：</label>
              <span :style="{color:elem.answer==examSubList[i].value?'green':'red'}">{{elem.answer}}</span>
            </p>
            <div class="details">
              <label>解析 ：</label>
              <div class="de">{{elem.analysis}}</div>
            </div>
          </div>
        </div>
        <div class="list" v-if="elem.questionType==2">
          <div class="name">
            <el-tag size="mini" type="success">多选</el-tag>
            {{i+1}}.{{elem.summary}}
          </div>
          <div class="line"></div>
          <div class="seList">
            <el-checkbox-group :disabled="canLeave" v-model="examSubList[i].value">
              <el-checkbox
                v-for="(n,index) of elem.options"
                :key="n"
                :label="n"
              >{{numToEnglish(index+1)+'.'+n}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="analysis" v-if="canLeave">
            <p class="right">
              <label>正确答案：</label>
              <span :style="{color:elem.answer==examSubList[i].value?'green':'red'}">{{elem.answer}}</span>
            </p>
            <div class="details">
              <label>解析 ：</label>
              <div class="de">{{elem.analysis}}</div>
            </div>
          </div>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="sub">
        <el-button v-show="!canLeave" type="success" @click="submit">提交</el-button>
        <el-button v-show="canLeave" type="danger" @click="backToCourse">退出</el-button>
      </div>
      <div class="time" :style="{top:scrollTop+200+'px'}">
        <img :src="require('../../assets/daojishi.png')" alt />
        <div class="num">{{showNock}}</div>
      </div>
    </el-card>
    <el-dialog
      :close-on-click-modal="false"
      :show-close="false"
      :close-on-press-escape="false"
      title="成绩"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <div style="textAlign:center;fontSize:22px">
        用时{{300-nockTotal}}s，恭喜获得
        <span style="display:inlineBlock;color:red;margin:0 5px">{{score}}</span>分
      </div>
      <!-- <el-divider content-position="left">分数过低，请务必查看解析</el-divider> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="backToCourse" >退出</el-button>
        <!-- <el-button type="primary" @click="getAnalysis">查看答案解析</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { gotoExam, subExam } from "../../api/course";
import { formatDate } from "../../utils/index";
export default {
  created() {
    //监听页面刷新
    window.document.addEventListener("keydown", this.updateHandler);
    window.document.addEventListener("contextmenu", this.oncontextmenu);
    this.courseId = this.$route.query.courseId;
    this.userId = this.$route.query.userId;
    this.timer();
    this.getScroll();
    this.getExam();
  },
  data() {
    return {
      dialogVisible: false,
      radio: "", //单选
      checked: [], //多选
      list: [],
      userId: "",
      courseId: "",
      examSubList: [],
      nock: null,
      nockTotal: 300,
      canLeave: false, //是否可离开当前页
      scrollTop: 150,
      scroll: null,
      score: "",
    };
  },
  methods: {
    submit() {
      this.canLeave = false;
      clearInterval(this.nock);
      console.log(this.examSubList);
      let ex = this.examSubList.filter((elem) => {
        return elem.value != "";
      });
      console.log(ex);
      let mapExam = ex.map((elem) => {
        return {
          key: elem.key,
          value: Array.isArray(elem.value) ? elem.value : [elem.value],
        };
      });
      let obj = {
        courseId: this.courseId,
        userId: this.userId,
        mapExam: mapExam,
      };
      console.log(obj);
      subExam(obj).then((res) => {
        this.score = res.data.score;
        (this.dialogVisible = true), console.log(res);
      });
    },
    //查看答案解析
    getAnalysis() {
      this.canLeave = true;
      this.dialogVisible = false;
    },
    //返回课程列表
    backToCourse() {
       this.canLeave = true;
      window.document.removeEventListener("keydown", this.updateHandler);
      window.document.removeEventListener("contextmenu", this.oncontextmenu);
      this.$router.replace({
        path: "courseList",
        query: {
          id: this.courseId,
        },
      });
    },
    getExam() {
      gotoExam(this.courseId).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.list = JSON.parse(JSON.stringify(res.data));
          this.examSubList = res.data.map((elem, i) => {
            return {
              key: elem.id,
              value: [],
            };
          });
        } else {
          this.$message.error(res.msg);
           this.canLeave = true;
          this.backToCourse()
        }
        console.log(this.examSubList);
      });
    },
    //数字转ABC
    numToEnglish(num) {
      var alphabet = String.fromCharCode(64 + parseInt(num));
      return alphabet;
    },
    //禁止页面刷新
    updateHandler(e) {
      e = window.event || e;
      var k = e.keyCode;
      //屏蔽ctrl+R，F5键，ctrl+F5键  F3键！验证
      if (
        (e.ctrlKey == true && k == 82) ||
        k == 116 ||
        (e.ctrlKey == true && k == 116) ||
        k == 114
      ) {
        // e.keyCode = 0;
        alert("当前页面不能刷新！");
        e.preventDefault();
        e.returnValue = false;
        e.cancelBubble = true;
        return false;
      }
      if (k == 8) {
        alert("不能返回或后退！");
        e.preventDefault();
        e.returnValue = false;
        return false;
      }
      //屏蔽 Ctrl+n   验证可以实现效果
      if (e.ctrlKey && k == 78) {
        e.preventDefault();
        e.returnValue = false;
        e.cancelBubble = true;
        return false;
      }
      //屏蔽F11   验证可以实现效果
      if (k == 122) {
        e.preventDefault();
        e.returnValue = false;
        e.cancelBubble = true;
        return false;
      }
      //屏蔽 shift+F10  验证可以实现效果
      if ((e.shiftKey && k == 121) || (e.ctrlKey && k == 121)) {
        e.preventDefault();
        e.returnValue = false;
        e.cancelBubble = true;
        return false;
      }

      //屏蔽Alt+F4
      if (e.altKey && k == 115) {
        window.showModelessDialog(
          "about:blank",
          "",
          "dialogWidth:1px;dialogheight:1px"
        );
        e.preventDefault();
        e.returnValue = false;
        e.cancelBubble = true;
        return false;
      }
      //屏蔽 Alt+ 方向键 ← ;屏蔽 Alt+ 方向键 → ！验证
      if (e.altKey && (k == 37 || k == 39)) {
        alert("不准你使用ALT+方向键前进或后退网页！");
        e.preventDefault();
        e.returnValue = false;
        e.cancelBubble = true;
        return false;
      }
    },
    //屏蔽右键菜单，！验证
    oncontextmenu(event) {
      event.preventDefault();
      if (window.event) {
        event = window.event;
      }
      try {
        var the = event.srcElement;
        if (
          !(
            (the.tagName == "INPUT" && the.type.toLowerCase() == "text") ||
            the.tagName == "TEXTAREA"
          )
        ) {
          return false;
        }
        return true;
      } catch (e) {
        return false;
      }
    },
    //倒计时
    timer() {
      if (!this.nock) {
        this.nock = setInterval(() => {
          this.nockTotal--;

          if (this.nockTotal == 0) {
            clearInterval(this.nock);
            this.submit();
          }
        }, 1000);
      }
    },
    //定时器位置
    getScroll() {
      window.onscroll = () => {
        if (this.scroll != null) {
          clearTimeout(this.scroll);
          this.scroll = null;
        }
        this.scroll = setTimeout(() => {
          this.scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;
        }, 200);
      };
    },
    //秒转化
    changeSecond(seconds) {
      var min = Math.floor(seconds / 60);
      if (min <= 9 && min > 0) {
        min = "0" + min;
      } else if (min == 0) {
        min = "00";
      }
      var sec = seconds % 60;
      if (sec < 10) {
        sec = "0" + sec;
      }
      return min + ":" + sec;
    },
  },
  computed: {
    showNock() {
      return this.changeSecond(this.nockTotal);
    },
  },
  beforeRouteLeave(to, from, next) {
    if (!this.canLeave) {
      this.$message.error("请完成答题后离开当前页");
      console.log(from);
      next({
        path: from.path,
        query: from.query,
      });
    } else {
      next();
    }
  },
  destroyed() {
    clearInterval(this.nock);
    window.document.removeEventListener("keydown", this.updateHandler);
    window.document.removeEventListener("contextmenu", this.oncontextmenu);
  },
};
</script>
<style lang="scss" scoped>
.line {
  display: block;
  height: 1px;
  width: 100%;
  margin: 8px 0;
  background-color: #dcdfe6;
}
.con {
  width: 1200px;
  margin: 15px auto;
  padding: 20px 0;
  .title {
    p {
      text-align: center;
      font-size: 20px;
      font-weight: bold;
    }
    .sec {
      margin-top: 20px;
      font-size: 16px;
      text-align: center;
    }
  }
  .list {
    width: 800px;
    margin: 30px auto;
    .name {
      font-weight: bold;
      font-size: 14px;
    }
    .seList {
      display: flex;
      justify-content: start;
      flex-wrap: wrap;
      .item {
        width: 50%;
        margin-top: 30px;
      }
      .el-checkbox-group {
        width: 100%;
        display: flex;
        justify-content: start;
        flex-wrap: wrap;
        label {
          width: 40%;
          margin-top: 30px;
        }
      }
    }
  }
  .sub {
    text-align: center;
    margin: 30px 0;
  }
  .time {
    border-radius: 4px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 10px;
    transition: 0.4s;
    position: absolute;
    right: 70px;
    top: 300px;
    height: 64px;
    display: flex;
    justify-content: start;
    width: 250px;
    img {
      width: 64px;
      height: 64px;
    }
    .num {
      margin-left: 10px;
      font-size: 40px;
      height: 64px;
      line-height: 64px;
    }
  }
  .analysis {
    margin: 40px 0;
    .right {
      label {
        font-weight: bold;
        color: #000;
      }
    }
    .details {
      margin-top: 10px;
      label {
        font-weight: bold;
        color: #000;
      }
      .de {
        width: 80%;
        font-size: 14px;
        line-height: 20px;
      }
    }
  }
}
</style>