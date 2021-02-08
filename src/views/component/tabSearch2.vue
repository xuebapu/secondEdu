<template>
  <div>
    <div @mouseleave="hide" class="con" :style="{left:left,top:top}">
      <div class="selectList">
        <div class="topHasNo">
          <span
            :class="elem.id==scienceActive?'scActive':''"
            @click="chooseScience(elem)"
            v-for="(elem,i) of lists "
            :key="i"
            v-show="elem.children==undefined"
          >{{elem.name}}</span>
        </div>
        <div v-show="elem.children!=undefined" class="details" v-for="(elem,i) of lists " :key="i">
          <div class="topHasChildren">
            <span
              :class="elem.id==scienceActive?'scActive':''"
              @click="chooseScience(elem)"
              class="firName"
            >{{elem.name}}</span>
            <span class="des">|</span>
            <span
              :class="el.id==scienceActive?'scActive':''"
              @click="chooseScience(el)"
              class="secName"
              v-for="(el,index) of elem.children"
              :key="index"
            >{{el.name}}</span>
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
      scienceActive: "",
      active: "",
    };
  },
  methods: {
    //学科分类
    chooseScience(elem) {
      this.$router.push({
        path: "/knowledgeNav/list",
        query: {
          sub: elem.id,
        },
      });
    },
    getScience(x) {
      sessionStorage.setItem("active", 2);
      this.$router.push({
        path: "/knowledgeNav/list",
        query: {
          sub: x,
        },
      });
    },
    hide() {
      this.$emit("showSe", false);
    },
    cSecList(x) {
      // console.log(x)
      if (x <= 4) {
        this.secList = this.lists.filter((elem, i, arr) => {
          return i < x * 3 && i >= (x - 1) * 3;
        });
      } else {
        this.secList = this.lists.filter((elem, i, arr) => {
          return i < (x - 4) * 2 + 12 && i >= (x - 5) * 2 + 12;
        });
      }
      this.se = x;
      // console.log(this.secList)
    },
  },
  watch: {
    $route(rout) {
      if (rout.query.sub) {
        this.scienceActive = rout.query.sub;
      }
    },
  },
  
};
</script>

<style lang="scss" scoped>
.active {
  border-bottom: 1px solid #49af4f !important;
  background: rgba(56, 207, 64, 0.1);
  color: #49af4f;
}
.con {
  width: 940px;
  border: 1px solid #ddd;
  background: #fff;
  font-weight: normal;
  position: absolute;
  z-index: 1000;
  text-align: left;
  color: #6d7278;
  padding: 20px 40px;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  overflow: hidden;
  .selectList {
    width: 100%;
    .details {
      
      display: flex;
      justify-content: start;
      margin: 5px 0;
      .firName {
        display: inline-block;
        cursor: pointer;
        width: 50px;
        font-size: 14px;
        padding: 5px 10px;
        font-size: 14px;
        color: #2d323e;
        font-weight: bold;
        margin: 0 10px;
        text-align: center;
        border-bottom: 1px solid #fff;
      }
      .firName:hover,
      .secName:hover {
        background: rgba(56, 207, 64, 0.1);
        color: #49af4f;
        border-bottom: 1px solid #49af4f;
      }
      .des {
        padding: 0 10px 0 0;
      }
      .secName {
        cursor: pointer;
        padding: 5px 10px;
        font-size: 14px;
        border-bottom: 1px solid #fff;
        color: #6d7278;
      }
    }
  }
  .topHasNo {
    font-size: 14px;
    color: #2d323e;
    margin-bottom: 20px;
    span {
      font-weight: bold;
      cursor: pointer;
      display: inline-block;
      padding: 5px 10px;
      margin: 5px 10px;
      border-bottom: 1px solid #fff;
    }
    span:hover {
      background: rgba(56, 207, 64, 0.1);
      color: #49af4f;
      border-bottom: 1px solid #49af4f;
    }
  }
}
   .scActive {
      background: rgba(56, 207, 64, 0.1);
      color: #49af4f !important;
      border-bottom: 1px solid #49af4f !important;
    }
</style>