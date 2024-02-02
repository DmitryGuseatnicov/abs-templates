import { createRouter, createWebHistory } from "vue-router";

import { HomeView} from "@/views/HomeView";

import { appRoutes } from "./appRoutes";

export const routes = [
  {
    path: appRoutes.home(),
    component: HomeView,
    name: 'clients'
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: appRoutes.home(),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router