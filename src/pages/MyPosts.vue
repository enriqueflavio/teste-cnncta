<template>
  <q-page class="q-pa-md flex">
    <posts :posts="posts" edit @refreshGetPosts="getPosts" />
  </q-page>
</template>

<style>
</style>

<script>
import Posts from 'src/components/Posts'
import { getGalery } from 'src/services/apiService'
import { getUserLogado } from '../services/userControl'

export default {
  name: 'MyPosts',
  created () {
    this.getPosts()
  },
  data () {
    return {
      posts: undefined
    }
  },
  methods: {
    getPosts () {
      getGalery().then(responseGetGalery => {
        if (responseGetGalery.status === 200) {
          this.posts = responseGetGalery.data.data.posts.filter(post => {
            if (post.user.username === getUserLogado()) {
              return post
            }
          })
        }
      })
    }
  },
  components: {
    Posts
  }
}
</script>
<style lang="stylus" scoped>
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
