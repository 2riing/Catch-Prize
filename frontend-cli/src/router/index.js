import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

const checkAuth = (auth) => {
  // if (!auth) return { name: 'home'}
}

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/login/:name',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/redirect',
      name: 'redirect',
      component: () => import('../views/RedirectView.vue'),
    },
    {
      path: '/lobby',
      name: 'lobby',
      component: () => import('../views/LobbyView.vue'),
      beforeEnter: () => checkAuth(store.getters.isLoggedIn),
      children: [
        {
          path: '',
          name: 'lobbyMain',
          components: {
            default: () => import('../components/lobby/RoomList.vue'),
            notice: () => import('../components/lobby/Modal/LobbyNotice.vue'),
          }
        },
      ],
    },
    {
      path: '/game/:roomid',
      name: 'gameView',
      component: () => import('../views/OvView.vue'),
      beforeEnter: () => checkAuth(store.getters.isLoggedIn),
      children: [
        {
          path: 'wait',
          name: 'gameroom',
          component: () => import('../components/lobby/WaitingRoom.vue'),
        },
        {
          path: '',
          name: 'game',
          component: () => import('../views/GameView.vue'),
        },
        {
          path: ':myid',
          name: 'gameplayroom',
          component: () => import('../components/hobulho-game/HobulhoGame.vue')
        },
      ]
    },
    {
      path: '/notice',
      name: 'notice',
      component: () => import('../views/NoticeView.vue'),
      beforeEnter: () => checkAuth(store.getters.isAdmin),
      children: [
        {
          path: '',
          name: 'notices',
          component: () => import('../components/notice/NoticeList.vue'),
        },
        {
          path: 'new',
          name: 'noticeNew',
          component: () => import('../components/notice/NoticeNew.vue')
        },
        {
          path: ':noticeId/edit',
          name: 'noticeEdit',
          component: () => import('../components/notice/NoticeEdit.vue')
        },
        {
          path: ':noticeId',
          name: 'noticeDetail',
          component: () => import('../components/notice/NoticeDetail.vue'),
          // props: true,
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/404'
    },
    { 
      path: "/404",
      name: "notFound",
      component: () => import('../views/NotFoundView.vue'),
    } 
  ]
})

export default router
