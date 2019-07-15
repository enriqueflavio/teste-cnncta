
const routes = [
  {
    path: '/login',
    component: () => import('layouts/NoLayout.vue'),
    children: [
      { path: '/login', name: 'login', component: () => import('pages/Login.vue'), meta: { free: true } }
    ]
  },
  {
    path: '/cadastrar',
    component: () => import('layouts/NoLayout.vue'),
    children: [
      { path: '/cadastrar', name: 'cadastrar', component: () => import('pages/Register.vue'), meta: { free: true } }
    ]
  },
  {
    path: '/logout',
    component: () => import('layouts/NoLayout.vue'),
    children: [
      { path: '/logout', name: 'logout', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/DrawerLayout.vue'),
    children: [
      { path: '/', name: 'home', component: () => import('pages/Home.vue') },
      { path: '/criar-post', name: 'createPost', component: () => import('pages/NewPost.vue') },
      { path: '/meus-posts', name: 'myPost', component: () => import('pages/MyPosts.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
