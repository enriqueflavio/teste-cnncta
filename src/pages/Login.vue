<template>
  <q-page :class="`${isDesktop? 'flex':''} flex-center bg-primary`">
    <div class="flex-center column">
      <!-- <img :class="isDesktop? '':'q-mt-xl'" src="statics/logo.png" alt="Logo Dibsclub"> -->
      <div class="q-mt-xl text-h5 text-white text-uppercase text-bold">Faça seu login</div>
      <div class="q-mt-sm text-caption text-white">Seja bem vindo!</div>
      <login-form :logar="logar" :loadingLoginButton="loading.login"></login-form>
      <div class="q-mt-xl text-caption text-white">Primeira vez?!</div>
      <q-btn
        to="/cadastrar"
        class="q-mt-xs"
        style="width: 230px; height: 40px"
        color="warning"
        text-color="dark"
        rounded
        label="Cadastre-se"
      />
    </div>
  </q-page>
</template>
<script>
import LoginForm from 'src/components/LoginForm'
import { autenticationUser } from 'src/services/apiService.js'
import { addToken, addUserLogado } from 'src/services/userControl.js'
import utilsMixins from 'src/mixins/utilsMixins.js'

export default {
  name: 'Login',
  mixins: [utilsMixins],
  data () {
    return {
      isDesktop: this.$q.platform.is.desktop,
      loading: {
        login: false
      }
    }
  },
  methods: {
    async logar (username, password) {
      this.loading.login = true
      try {
        const responseAutenticationUser = await autenticationUser(username.trim().toLowerCase(), password.trim())
        if (responseAutenticationUser.status === 200) {
          // Definindo Usuario logado no localstorage
          addUserLogado(username.trim().toLowerCase())
          // Colocando token encryptado no localstorage
          addToken(responseAutenticationUser.data.data.user.token)
          // Redirecionando para dashboard
          this.$router.push({ name: 'home' })
        }
      } catch (error) {
        if (error.response.status === 400) {
          this.notifyMixin({ message: 'username ou senha incorretos. Por favor verifique se digitou corretamente e tente novamente.' })
        } else {
          this.notifyMixin({ error: '[ERROR - 0001]' })
        }
      } finally {
        this.loading.login = false
      }
    }
  },
  components: {
    LoginForm
  }
}
</script>
