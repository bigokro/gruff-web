export default function ({ isServer, store, req }) {
   // If nuxt generate, pass this middleware
  // if (isServer && !req) return

  console.log(isServer, store, req)
  // const storage = window.localStorage.getItem('gruff_token')
  // if (storage !== null) {
  //   store.commit('SET_USER', storage)
  //   console.log(this.$store.state.SET_USER)
  // }
}
