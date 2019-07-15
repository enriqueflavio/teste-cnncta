import { hasToken, clearToken, clearUserLogado } from 'src/services/userControl.js'

export default ({ router, store }) => {
  router.beforeEach((to, from, next) => {
    // Verifica se tem a flag de rota free
    if (!to.matched.some(record => record.meta.free)) {
      // Verifica se existe token no localstorage
      if (!hasToken()) {
        next('/login')
      } else if (to.name === 'logout') {
        clearToken()
        clearUserLogado()
        next()
      } else {
        next()
      }
    } else {
      next()
    }
  })
}
