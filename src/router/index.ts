import { createRouter, createWebHistory } from "vue-router";
import indexPage from "@/pages/index.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "index",
      component: indexPage,
    },
    {
      path: "/edit/:id",
      name: "edit",
      component: () => import("@/pages/edit.vue"),
    },
  ],
});

export default router;
