<template>
  <q-page class="flex flex-center column">
    <!-- <q-uploader
      url="javascript:;"
      @added="addedFile"
      accept=".jpg, image/*"
      label="Escolha uma foto"
      style="width: 270px;"
      class="no-shadow"
    /> -->
    <q-input
      class="q-mt-md input-styled"
      bg-color="white"
      rounded
      v-model="title"
      placeholder="Título do Post"
    />
    <q-input
      type="textarea"
      class="q-mt-md input-styled"
      bg-color="white"
      rounded
      v-model="text"
      placeholder="Texto do post"
    />
    <q-btn
      v-if="!edit"
      @click="createPost"
      :loading="loading.createPost"
      class="q-mt-xl"
      style="width: 230px; height: 40px"
      color="warning"
      text-color="dark"
      rounded
      label="Cadastrar"
    />
    <q-btn
      v-else
      @click="editPost"
      :loading="loading.editPost"
      class="q-mt-xl"
      style="width: 230px; height: 40px"
      color="warning"
      text-color="dark"
      rounded
      label="Editar"
    />
  </q-page>
</template>

<style>
</style>

<script>
import { newPost, editPost } from 'src/services/apiService'
import utilsMixins from 'src/mixins/utilsMixins.js'

export default {
  name: 'Home',
  mixins: [utilsMixins],
  created () {
    if (this.$route.params.post) {
      const post = this.$route.params.post
      this.title = post.title
      this.text = post.text
      this.id = post.id
      this.edit = true
    }
  },
  data () {
    return {
      edit: false,
      posts: undefined,
      id: '',
      title: '',
      text: '',
      file: '',
      loading: {
        createPost: false,
        editPost: false
      }
    }
  },
  methods: {
    async createPost () {
      this.loading.createPost = true
      try {
        const responseNewPost = await newPost(this.title, this.text)
        if (responseNewPost.status === 201) {
          this.notifyMixin({ message: 'Post criado com sucesso!', color: 'green' })
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading.createPost = false
      }
    },
    async editPost () {
      this.loading.editPost = true
      try {
        const responseNewPost = await editPost(this.id, this.title, this.text)
        if (responseNewPost.status === 200) {
          this.notifyMixin({ message: 'Post atualizado com sucesso!', color: 'green' })
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading.editPost = false
      }
    },
    addedFile (file) {
      console.log(file)
      this.file = file[0]
      const fd = new FormData()
      fd.append('image', this.file, this.file.name)
      console.log(fd)
    }
  }
}
</script>
<style lang="stylus" scoped>
>>>.q-uploader__list
  background $white
</style>
