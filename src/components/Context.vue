<template>

  <div class="container-fluid">
   
  </div>
  
</template>

<script>
import axios from 'axios';
import router from '../main';

const API_URL = 'http://localhost:8080/api';

export default {
  name: 'context',
  data() {
    return {
      claims: [],
      claimsTop: [],
    };
  },

  created() {
  },

  methods: {
    gruff(id) {
      router.push(`/gruff/${id}`);
    },

    list() {
      axios.get(`${API_URL}/claims`).then((response) => {
        this.claims = response.data;
      });
    },

    listTop() {
      axios.get(`${API_URL}/claims/top`).then((response) => {
        this.claimsTop = response.data;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
