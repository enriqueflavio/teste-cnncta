<template>
  <div class="row items-start q-gutter-md">
    <q-card v-for="(post, index) in posts" :key="index" bordered class="bg-primary my-card">
      <div @click="apagarPost(post.id)" v-if="edit" class="delete-post">
        <i class="fas fa-times"></i>
      </div>
      <img v-if="post.image" :src="`http://desenvolvimento.cnncta.com.br${post.image}`" alt="Imagem">
      <q-card-section>
        <div class="text-h6">{{post.title}}</div>
        <div class="text-subtitle2">por {{post.user.username}}</div>
        <div class="text-caption">{{formataData(post.created_at)}}</div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        {{ post.text }}
      </q-card-section>

      <q-card-actions v-if="edit">
        <q-btn @click="editarPost(post)" flat class="text-yellow-10">Editar</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>
<script>
import { deletePost } from 'src/services/apiService.js'
import { date } from 'quasar'
import utilsMixins from 'src/mixins/utilsMixins.js'

export default {
  name: 'Posts',
  props: {
    posts: {
      required: true
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  mixins: [utilsMixins],
  data () {
    return {
      loading: {
        deletePost: false
      }
    }
  },
  methods: {
    async apagarPost (id) {
      this.loading.deletePost = true
      try {
        const responseDeletePost = await deletePost(id)
        if (responseDeletePost.status === 200) {
          this.notifyMixin({ message: 'Post deletado com sucesso!!', color: 'green' })
          this.$emit('refreshGetPosts')
        }
      } catch (error) {
        this.notifyMixin({ message: 'Ocorreu um erro e nao foi possivel deletar o post.' })
      } finally {
        this.loading.deletePost = false
      }
    },
    editarPost (post) {
      this.$router.push({ name: 'createPost', params: { post } })
    },
    formataData (data) {
      return date.formatDate(new Date(data), 'DD/MM/YY HH:mm')
    }
  }
}
</script>
<style lang="stylus" scoped>
.delete-post
  position absolute
  background-color $yellow-10
  top -10px
  right -10px
  line-height 40px
  width 40px
  height 40px
  border-radius 20px!important
  text-align center
  font-weight 700
  font-size 18px
  box-shadow: 11px 18px 35px -15px rgba(0,0,0,0.75)
  cursor pointer
  z-index 999
.text-caption
  font-size 9px
.my-card
  color $white
  min-width 250px
  max-width 250px
  min-height 205px
  >>>.q-separator
    background-color $yellow-10
</style>
