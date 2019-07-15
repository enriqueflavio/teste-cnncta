<template>
  <q-page class="q-pa-md flex">
    <posts :posts="posts" :loadingPosts="loading.posts" />
  </q-page>
</template>

<style>
</style>

<script>
import Posts from 'src/components/Posts'
import { getGalery } from 'src/services/apiService'

export default {
  name: 'Home',
  created () {
    this.getPosts()
  },
  data () {
    return {
      posts: undefined,
      loading: {
        posts: false
      }
    }
  },
  methods: {
    getPosts () {
      this.loading.posts = true
      getGalery().then(responseGetGalery => {
        if (responseGetGalery.status === 200) {
          this.posts = responseGetGalery.data.data.posts
          this.loading.posts = false
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
