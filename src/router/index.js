import Vue from 'vue'
import Router from 'vue-router'

// 홈 페이지
import Index from '@/components/Index'
// import Main from '@/components/Main'

// 회원 인증 페이지
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'

// 회원 페이지
import UserList from '@/components/user/List'
import UserInfo from '@/components/user/Info'

// 게시판 페이지
import Board from '@/components/board/Index'

// 음악 페이지
import Music from '@/components/music/Index'
import MusicSource from '@/components/music/Source'

// 일반 페이지
import NotFound from '@/components/page/NotFoundComponent'
import Loading from '@/components/page/Loading'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // 메인 페이지
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    // {
    //   path: '/main',
    //   name: 'Main',
    //   component: Main
    // },
    // 회원 인증 페이지
    {
      path: '/auth/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/auth/register',
      name: 'Register',
      component: Register
    },
    // 회원 페이지
    {
      path: '/user/list',
      name: 'UserList',
      component: UserList
    },
    {
      path: '/user/info',
      name: 'UserInfo',
      component: UserInfo
    },
    // 게시판 페이지
    {
      path: '/board',
      name: 'Board',
      component: Board
    },
    // 음악 페이지
    {
      path: '/music',
      name: 'Music',
      component: Music
    },
    {
      path: '/music/source',
      name: 'MusicSource',
      component: MusicSource
    },
    // 일반 페이지
    {
      path: '*',
      name: 'Not Found',
      component: NotFound
    },
    {
      path: '/page/loading',
      name: 'Loading',
      component: Loading
    }
  ]
})
