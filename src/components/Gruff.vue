<template>
  <div class="container-fluid">
    <div class="col-md-12">
      <h1>{{debate.title}}</h1>
      <h4>{{debate.description}}</h4>
    </div>
  </div>
</template>

<script>
const API_URL = 'http://localhost:8080/api';

export default {
  name: 'gruff',
  data() {
    return {
      debate: {},
    };
  },

  created() {
    this.get();
  },

  methods: {
    get() {
      this.$http.get(`${API_URL}/debates/${this.$route.params.id}`).then((data) => {
        this.debate = data.body;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
