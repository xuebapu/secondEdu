import Vue from "vue";
import VueRouter from "vue-router";
import home from "../views/home.vue";
import knowledgeNav from "@/views/knowledge-nav/index.vue";
import store from "@/store/index";
import { MessageBox } from "element-ui";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: home,
    redirect: "/index",
    children: [
      {
        path: "index",
        name: "主页",
        component: () => import("@/views/index/index.vue"),
      },
      {
        path: "user",
        name: "个人中心",
        component: () => import("@/views/user/index.vue"),
      },
      {
        path: "college",
        name: "继教学院",
        component: () => import("@/views/college/index.vue"),
      },
      {
        path: "sign",
        name: "注册",
        component: () => import("@/views/index/sign.vue"),
      },
      {
        path: "order",
        name: "订单",
        component: () => import("@/views/order/index.vue"),
      },
      {
        path: "payOrder",
        name: "支付订单",
        component: () => import("@/views/order/payOrder.vue"),
      },
      {
        path: "payFinish",
        name: "订单完成",
        component: () => import("@/views/order/payFinish.vue"),
      },
      {
        path: "myOrder",
        name: "订单管理",
        component: () => import("@/views/myOrder/index.vue"),
      },
      {
        path: "changePassword",
        name: "修改密码",
        component: () => import("@/views/index/changePassword.vue"),
      },
      {
        path: "eduProject",
        name: "继教项目",
        component: () => import("@/views/eduProject/index.vue"),
      },
      {
        path: "eduProject",
        redirect: "/eduProject/list",
        component: knowledgeNav,
        children: [
          {
            path: "list",
            component: () => import("@/views/knowledge-nav copy/list.vue"),
          },
        ],
      },
      {
        path: "knowledgeNav",
        redirect: "/knowledgeNav/list",
        component: knowledgeNav,
        children: [
          {
            path: "list",
            component: () => import("@/views/knowledge-nav/list.vue"),
          },
        ],
      },
      {
        path: "live",
        name: "直播详情",
        component: () => import("@/views/live/index.vue"),
      },
      {
        path: "liveList",
        component: () => import("@/views/live/liveList.vue"),
      },
      {
        path: "course",
        name: "课程播放",
        component: () => import("@/views/course/index.vue"),
      },
      {
        path: "courseList",
        name: "项目列表",
        component: () => import("@/views/courseList/index.vue"),
      },
      {
        path: "404",
        component: () => import("@/views/error-page/404.vue"),
      },
      {
        path: "/exam",
        name: "考试",
        component: () => import("@/views/exam/index.vue"),
      },
    ],
  },
  {
    path: "/preview",
    name: "在线浏览ppt",
    component: () => import("@/views/onlinePreview/index.vue"),
  },
  {
    path: "/payHtml",
    name: "支付宝支付",
    component: () => import("@/views/order/payHtml.vue"),
  },
  {
    path: "*",
    redirect: "/404",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
router.beforeEach((to, from, next) => {
  //动态滚动条
  let n = 0;
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  if (to.path == "/knowledgeNav/list") {
    scrollTop = scrollTop - 180;
  }
  let timer1 = setInterval(() => {
    n++;
    window.scrollBy(100, -scrollTop / 20);
    if (n == 20) {
      clearInterval(timer1);
    }
  }, 20);

  if (
    !store.getters.token &&
    (to.name == "个人中心" || to.name == "课程播放" || to.name == "项目列表")
  ) {
    MessageBox.alert("您尚未登录或登录已过期，请前往登录", "提示", {
      confirmButtonText: "确定",
      callback: () => {
        next({
          name: "主页",
          params: { log: true },
        });
      },
    });
  } else {
    next();
  }
});
export default router;
