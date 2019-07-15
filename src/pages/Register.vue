<template>
  <q-page :class="`${isDesktop? 'flex':''} flex-center bg-primary`">
    <div class="flex-center column">
      <!-- <img :class="isDesktop? '':'q-mt-xl'" src="statics/logo.png" alt="Logo Dibsclub"> -->
      <div class="q-mt-xl text-h5 text-white text-uppercase text-bold">Cadastro</div>
      <div class="q-mt-sm text-caption text-white">Simples e rápido</div>
      <q-input
        class="q-mt-md input-styled"
        bg-color="white"
        rounded
        v-model="firstName"
        bottom-slots
        error-message="um ou dois nomes"
        :error="$v.firstName.$invalid"
        placeholder="Primeiro Nome"
      />
      <q-input
        class="q-mt-md input-styled"
        bg-color="white"
        rounded
        v-model="lastName"
        bottom-slots
        error-message="um ou 2 nomes"
        :error="$v.lastName.$invalid"
        placeholder="Sobrenome"
      />
      <q-input
        class="q-mt-md input-styled text-lowercase"
        bg-color="white"
        rounded
        v-model="email"
        bottom-slots
        error-message="email válido"
        :error="$v.email.$invalid"
        placeholder="Email"
      />
      <q-input
        class="q-mt-md input-styled text-lowercase"
        bg-color="white"
        rounded
        v-model="username"
        mask="aaaaaaaa"
        bottom-slots
        error-message="mínimo 4, máximo 8 caracteres"
        :error="$v.username.$invalid"
        placeholder="Username"
      />
      <q-input
        class="q-mt-lg input-styled"
        bg-color="white"
        rounded
        v-model="password"
        bottom-slots
        error-message="mínimo 6 caracteres "
        :error="$v.password.$invalid"
        placeholder="senha"
        :type="isPwd ? 'password' : 'text'"
      >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer icon-password"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
      <q-btn
        @click="cadastrar"
        :disable="$v.$invalid"
        :loading="loading.cadastrar"
        class="q-mt-xl"
        style="width: 230px; height: 40px"
        color="warning"
        text-color="dark"
        rounded
        label="Cadastrar"
      />
    </div>
  </q-page>
</template>
<script>
import { signUp } from 'src/services/apiService.js'
import { addToken, addUserLogado } from 'src/services/userControl.js'
import utilsMixins from 'src/mixins/utilsMixins.js'
import { required, email, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'Login',
  mixins: [utilsMixins],
  data () {
    return {
      isDesktop: this.$q.platform.is.desktop,
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      loading: {
        cadastrar: false
      },
      isPwd: true
    }
  },
  methods: {
    async cadastrar () {
      this.loading.cadastrar = true
      try {
        const responseRegisterUser = await signUp(this.firstName, this.lastName, this.email, this.username, this.password)
        if (responseRegisterUser.status === 201) {
          // Definindo Usuario logado no localstorage
          addUserLogado(this.username.trim().toLowerCase())
          // Colocando token encryptado no localstorage
          addToken(responseRegisterUser.data.data.user.token)
          // Redirecionando para dashboard
          this.$router.push({ name: 'home' })
        }
      } catch (error) {
        if (error.response.status === 400) {
          this.notifyMixin({ message: 'username ou senha incorretos. Por favor verifique se digitou corretamente e tente novamente.' })
        } else {
          this.notifyMixin({ error: '[ERROR - 0002]' })
        }
      } finally {
        this.loading.cadastrar = false
      }
    }
  },
  validations: {
    firstName: { required },
    lastName: { required },
    email: { required, email },
    username: {
      required,
      minLength: minLength(4)
    },
    password: {
      required,
      minLength: minLength(6)
    }
  }
}
</script>
