<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Log In</h2>
    <p>Log in to your account to get some great debates.</p>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="form-group">
      <input
        type="text"
        class="form-control"
        placeholder="Enter your email"
        v-model="credentials.email"
      >
    </div>
    <div class="form-group">
      <input
        type="password"
        class="form-control"
        placeholder="Enter your password"
        v-model="credentials.password"
      >
    </div>
    <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--accent" @click="submit()">Log In</button>
  </div>
</template>

<script>

export default {
  data () {
    return {
      credentials: {
        email: '',
        password: ''
      },
      error: ''
    }
  },

  methods: {
    submit () {
      this.$store.dispatch('login', {
        email: this.credentials.email,
        password: this.credentials.password
      })
      .then(() => {
        this.$router.push('/')
        this.credentials = {
          email: '',
          password: ''
        }
        this.error = ''
      })
      .catch((e) => {
        this.error = e.message
      })
    }
  }
}
</script>
