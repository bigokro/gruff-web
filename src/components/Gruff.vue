<template>
  <div class="container-fluid">
    <div class="col-md-12">
      <h1>{{debate.title}}</h1>
      <h4>{{debate.description}}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: 'gruff',
  data() {
    return {
      debate: {
        title: 'Is Donald Trump packing his cabinet with white supremacists?',
        description: 'Donal Trump has appointed several cabinet members that are accused of being white supremacists. It that true, and is that a unique occurrence?',
        active: true,
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
