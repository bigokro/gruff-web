<template>
  <!-- Always shows a header, even in smaller screens. -->
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <!-- Title -->
        <router-link to="/" class="mdl-layout-title" style="color:white; text-decoration: none;">
          Gruff
        </router-link>
        <!-- Add spacer, to align navigation to the right -->
        <div class="mdl-layout-spacer"></div>
        <!-- Navigation. We hide it in small screens. -->
        <nav class="mdl-navigation mdl-layout--large-screen-only">
          <nuxt-link class="mdl-navigation__link" to="/login" v-if="!$store.state.loggedIn">Log in to start your own debate!</nuxt-link>
          <nuxt-link class="mdl-navigation__link" to="/signup" v-if="!$store.state.loggedIn">Register</nuxt-link>
          <nuxt-link class="mdl-navigation__link" to="/login" v-if="!$store.state.loggedIn">Login</nuxt-link>
          <nuxt-link class="mdl-navigation__link" to="/user" v-if="$store.state.loggedIn">Hi, {{$store.state.authUser.user.name}}</nuxt-link>
          <nuxt-link class="mdl-navigation__link" to="/context" v-if="$store.state.loggedIn">Context</nuxt-link>
          <a class="mdl-navigation__link" @click="logout()" v-if="$store.state.loggedIn">Logout</a>
        </nav>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data () {
    return {
      user: this.$store.state.authUser,
      loggedIn: this.$store.state.loggedIn
    }
  },

  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$route.push('/')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mdl-navigation__link {
    cursor: pointer;
  }
</style>
