<template>
  <q-list>
    <q-item exact clickable v-ripple to="/">
      <q-item-section avatar>
        <q-icon name="fas fa-th-list" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Galeria</q-item-label>
        <q-item-label caption>Mostra todos os posts</q-item-label>
      </q-item-section>
    </q-item>
    <q-item exact clickable v-ripple to="/criar-post">
      <q-item-section avatar>
        <q-icon name="fas fa-pen-alt" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Novo Post</q-item-label>
        <q-item-label caption>Cria um novo post</q-item-label>
      </q-item-section>
    </q-item>
    <q-item exact clickable v-ripple to="/meus-posts">
      <q-item-section avatar>
        <q-icon name="fas fa-user-edit" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Meus Posts</q-item-label>
        <q-item-label caption>Gerenciamento dos posts</q-item-label>
      </q-item-section>
    </q-item>
    <q-item exact clickable v-ripple to="/logout">
      <q-item-section avatar>
        <q-icon name="fas fa-sign-out-alt" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Sair</q-item-label>
        <q-item-label caption>Desloga do sistema</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>
<style lang="stylus">
.q-list
  background-color $primary
  color $white
  .text-caption
    color $white
.q-router-link--active
  background-color $yellow-10
  div
    color $white
    font-weight: 500
</style>
