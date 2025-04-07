import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
    {
      path: '/',
      redirect: '/login', // 添加重定向规则
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/loginInterface/LoginFaceView.vue'),
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/userHomePage/UserHomeView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/adminPage/AdminHomeView.vue'),
      children: [
        {
          path: 'PersonnelManagement',
          name: 'PersonnelManagement',
          component: () =>
            import('../views/adminPage/personnelManagement/PersonnelManagementView.vue'),
        },
        // 可以继续添加其他子路由
        {
          path: 'HouseManagement',
          name: 'HouseManagement',
          component: () => import('../views/adminPage/houseManagement/HouseManagementView.vue'),
        },
        {
          path: 'distributionHouse/:id',
          name: 'distributionHouse',
          component: () =>
            import('../views/adminPage/buttonform/buttonHouse/distributionHouseView.vue'),
        },
      ],
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
