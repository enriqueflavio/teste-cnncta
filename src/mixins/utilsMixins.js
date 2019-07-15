export default {
  methods: {
    notifyMixin ({ error, message, timeout, position, color }) {
      this.$q.notify({
        message: `${error || ''} ${message || 'Desculpe-nos o incoveniente mas ocorreu um erro enquanto tentavamos acessar nossos serviços, por favor aguarde e tente novamente mais tarde ou entre em contato conosco.'}`,
        timeout: timeout || 5000,
        position: position || 'top',
        color: color || 'negative',
        actions: [{ icon: 'close', color: 'white' }]
      })
    }
  }
}
