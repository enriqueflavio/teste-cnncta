<template>
  <div class="flex-center column">
    <q-input
      class="q-mt-xl input-styled text-lowercase"
      bg-color="white"
      rounded
      v-model="login.username"
      bottom-slots
      error-message="username válido"
      :error="$v.login.username.$invalid"
      placeholder="Username"
    />
    <q-input
      class="q-mt-lg input-styled"
      bg-color="white"
      rounded
      v-model="login.senha"
      bottom-slots
      error-message="mínimo 6 caracteres "
      :error="$v.login.senha.$invalid"
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
      @click="logar(login.username, login.senha)"
      :loading="loadingLoginButton"
      :disable="$v.login.$invalid"
      class="q-mt-lg"
      style="width: 230px; height: 40px"
      color="secondary"
      text-color="white"
      rounded
      label="Login"
    />
  </div>
</template>
<script>
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  name: 'LoginForm',
  props: ['logar', 'loadingLoginButton'],
  data () {
    return {
      login: {
        username: '',
        senha: ''
      },
      isPwd: true
    }
  },
  validations: {
    login: {
      username: { required },
      senha: {
        required,
        minLength: minLength(6)
      }
    }
  }
}
</script>
