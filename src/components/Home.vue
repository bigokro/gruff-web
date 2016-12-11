<template>
  <div class="container-fluid">
    <div class="col-md-9">
      <h1>Recent Debates</h1>
      <div class="col-md-12 demo-card-wide mdl-card mdl-shadow--2dp" style="margin:20px;" v-for="item in debates">
        <div class="mdl-card__title">
          <input type="checkbox" id="list-checkbox-1" class="mdl-checkbox__input" v-model="item.active"
          style="margin-right: 20px;"/>
          <h2 class="mdl-card__title-text">{{item.title}}</h2>
        </div>
        <div class="mdl-card__supporting-text" style="font-size: 2rem; text-align: left; line-height: 1.5;">
         {{item.description}}
        </div>
        <div class="mdl-card__actions mdl-card--border" style="text-align: left;">
          <a class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" @click="gruff()">
            Gruff it
          </a>
        </div>
      </div>
    </div>
    <div class="col-md-3">
      <h2>Tags</h2>
    </div>
  </div>
</template>

<script>
import router from '../main';

export default {
  name: 'home',
  data() {
    return {
      debates: [
        {
          title: 'Is Donald Trump packing his cabinet with white supremacists?',
          description: 'Donal Trump has appointed several cabinet members that are accused of being white supremacists. It that true, and is that a unique occurrence?',
          active: true,
        },
        {
          title: 'Is Donald Trump packing his cabinet with white supremacists?',
          description: 'Donal Trump has appointed several cabinet members that are accused of being white supremacists. It that true, and is that a unique occurrence?',
          active: true,
        },
        {
          title: 'Is Donald Trump packing his cabinet with white supremacists?',
          description: 'Donal Trump has appointed several cabinet members that are accused of being white supremacists. It that true, and is that a unique occurrence?',
          active: true,
        },
        {
          title: 'Is Donald Trump packing his cabinet with white supremacists?',
          description: 'Donal Trump has appointed several cabinet members that are accused of being white supremacists. It that true, and is that a unique occurrence?',
          active: false,
        },
      ],
    };
  },

  methods: {
    gruff() {
      router.push('/gruff');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
