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
      children: [
        {
          path: 'AddRepair',
          name: 'AddRepair',
          component: () => import('../views/userHomePage/operateForm/AddRepairView.vue'),
        },
        {
          path: 'BuyCarport',
          name: 'BuyCarport',
          component: () => import('../views/userHomePage/operateForm/BuyCarportView.vue'),
        },
        {
          path: 'UserBill',
          name: 'UserBill',
          component: () => import('../views/userHomePage/operateForm/BillView.vue'),
        },
        {
          path: 'editUser',
          name: 'editUser',
          component: () => import('../views/userHomePage/operateForm/EditUserView.vue'),
        },
        {
          path: 'ShowCarport',
          name: 'ShowCarport',
          component: () => import('../views/userHomePage/showData/ShowCarportView.vue'),
        },
        {
          path: 'ShowHouse',
          name: 'ShowHouse',
          component: () => import('../views/userHomePage/showData/ShowHouseView.vue'),
        },
      ],
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
        {
          path: 'carManagement',
          name: 'carManagement',
          component: () => import('../views/adminPage/carManagement/carManagementView.vue'),
        },
        {
          path: 'BillManagement',
          name: 'BillManagement',
          component: () => import('../views/adminPage/billManagement/BillManagementView.vue'),
        },
        {
          path: 'RepairManagement',
          name: 'RepairManagement',
          component: () => import('../views/adminPage/repairManagement/RepairManagementView.vue'),
        },
        {
          path: 'NoticeManagement',
          name: 'NoticeManagement',
          component: () => import('../views/adminPage/noticeManagement/NoticeManagementView.vue'),
        },
        {
          path: 'EditPersonnerButton',
          name: 'EditPersonnerButton',
          component: () =>
            import(
              '../views/adminPage/buttonform/personnerManagementButton/EditPersonnerButton.vue'
            ),
        },
        {
          path: 'DelectPersonnerButton',
          name: 'DelectPersonnerButton',
          component: () =>
            import(
              '../views/adminPage/buttonform/personnerManagementButton/DelectPersonnerButton.vue'
            ),
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
