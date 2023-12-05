import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    name: "appLayout",
    path: "/app-layout",
    redirect: "/main-page",
    component: () => import("../views/AppLayout.vue"),

    children: [
      {
        name: "mainPage",
        path: "/main-page",
        component: () => import("../views/AppLayout.vue"),
        meta: { requiresAuth: true, title: "Main Page" },
      },
    ],
  },
  {
    name: "login",
    path: "/",
    component: () => import("../views/Login.vue"),
    meta: { requiresAuth: false, title: "Login" },
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem("token"))) {
        next({
          path: "/app-layout",
        });
      } else {
        next();
      }
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.name !== "login" && !JSON.parse(localStorage.getItem("token")))
//     next({ name: "login" });
//   else next();
// });
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!JSON.parse(localStorage.getItem("token"))) {
      next({
        path: "/",
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
